#!/usr/bin/env node

/**
 * Generate audio files for essays using OpenAI Text-to-Speech API
 *
 * Usage:
 *   node scripts/generate-audio.js <essay-slug>
 *   node scripts/generate-audio.js evolution-of-attention
 *
 * Or generate all:
 *   node scripts/generate-audio.js --all
 *
 * Requires OPENAI_API_KEY environment variable
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  console.error('Error: OPENAI_API_KEY environment variable is required');
  console.error('Set it with: export OPENAI_API_KEY=your-api-key');
  process.exit(1);
}

// Configuration
const VOICE = 'alloy'; // Options: alloy, echo, fable, onyx, nova, shimmer
const MODEL = 'tts-1-hd'; // Use tts-1-hd for best quality, then compress with FFmpeg
const MAX_FILE_SIZE_MB = 25; // Maximum file size in MB (enforced after compression)
const ESSAYS_DIR = path.join(__dirname, '../ml-wiki/src/pages/essays');
const AUDIO_OUTPUT_DIR = path.join(__dirname, '../ml-wiki/public/audio');

/**
 * Extract text content from MDX file
 */
function extractTextFromMDX(mdxPath) {
  const content = fs.readFileSync(mdxPath, 'utf-8');

  // Remove the imports and exports
  let text = content
    .replace(/^import .+$/gm, '')
    .replace(/^export .+$/gm, '')
    .replace(/<EssayLayout[\s\S]*?>/g, '')
    .replace(/<\/EssayLayout>/g, '')
    .replace(/export default .+$/gm, '');

  // Remove MDX/JSX syntax
  text = text
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, '') // Remove JSX comments
    .replace(/<[^>]+>/g, '') // Remove HTML/JSX tags
    .replace(/\{[^}]+\}/g, ''); // Remove JSX expressions

  // Clean up markdown
  text = text
    .replace(/^#{1,6}\s+/gm, '') // Remove markdown headers
    .replace(/\*\*(.+?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.+?)\*/g, '$1') // Remove italic
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Convert links to text
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`([^`]+)`/g, '$1'); // Remove inline code

  // Clean up citations format for better speech
  text = text.replace(/\[([^\]]+), (\d{4}), p\. (\d+)\]/g, '($1, $2, page $3)');

  // Clean up extra whitespace
  text = text
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  return text;
}

/**
 * Split text into chunks at sentence boundaries
 * OpenAI TTS has a 4096 character limit per request
 */
function chunkText(text, maxLength = 3500) {
  const chunks = [];
  let currentChunk = '';

  // Split by sentences (look for period followed by space or newline)
  const sentences = text.split(/(?<=\.\s)/);

  for (const sentence of sentences) {
    // If a single sentence is too long, split it by word
    if (sentence.length > maxLength) {
      if (currentChunk) {
        chunks.push(currentChunk.trim());
        currentChunk = '';
      }

      const words = sentence.split(' ');
      for (const word of words) {
        if ((currentChunk + ' ' + word).length > maxLength) {
          chunks.push(currentChunk.trim());
          currentChunk = word;
        } else {
          currentChunk += (currentChunk ? ' ' : '') + word;
        }
      }
    } else if ((currentChunk + sentence).length > maxLength) {
      chunks.push(currentChunk.trim());
      currentChunk = sentence;
    } else {
      currentChunk += sentence;
    }
  }

  if (currentChunk) {
    chunks.push(currentChunk.trim());
  }

  return chunks;
}

/**
 * Generate audio for a single chunk
 */
async function generateAudioChunk(text, chunkIndex, totalChunks) {
  console.log(`  Generating chunk ${chunkIndex + 1}/${totalChunks} (${text.length} characters)...`);

  const response = await fetch('https://api.openai.com/v1/audio/speech', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL,
      input: text,
      voice: VOICE,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenAI API error: ${response.status} - ${error}`);
  }

  return Buffer.from(await response.arrayBuffer());
}

/**
 * Compress MP3 file using FFmpeg for smaller file size
 * Uses lower bitrate (64k) which is perfect for speech
 */
function compressAudio(inputPath, outputPath) {
  const tempPath = inputPath + '.temp.mp3';

  try {
    console.log(`  Compressing audio with FFmpeg...`);

    // Use FFmpeg to compress the audio
    // -b:a 64k = 64 kbps bitrate (excellent for speech, much smaller than default)
    // -ac 1 = mono (speech doesn't need stereo)
    // -ar 22050 = 22.05 kHz sample rate (sufficient for speech)
    execSync(
      `ffmpeg -i "${inputPath}" -b:a 64k -ac 1 -ar 22050 "${tempPath}" -y -loglevel error`,
      { stdio: 'inherit' }
    );

    // Replace original with compressed version
    fs.renameSync(tempPath, outputPath);

    return true;
  } catch (error) {
    console.error(`  Warning: FFmpeg compression failed: ${error.message}`);
    // Clean up temp file if it exists
    if (fs.existsSync(tempPath)) {
      fs.unlinkSync(tempPath);
    }
    return false;
  }
}

/**
 * Generate audio using OpenAI TTS API
 * Handles chunking for texts longer than 4096 characters
 */
async function generateAudio(text, outputPath) {
  console.log(`Generating audio (${text.length} characters)...`);

  try {
    // Check if text needs to be chunked
    if (text.length <= 4000) {
      // Single request for short text
      const audioBuffer = await generateAudioChunk(text, 0, 1);
      fs.writeFileSync(outputPath, audioBuffer);
    } else {
      // Chunk long text
      const chunks = chunkText(text);
      console.log(`  Text split into ${chunks.length} chunks`);

      // Generate audio for each chunk
      const audioBuffers = [];
      for (let i = 0; i < chunks.length; i++) {
        const audioBuffer = await generateAudioChunk(chunks[i], i, chunks.length);
        audioBuffers.push(audioBuffer);
      }

      // Concatenate all audio buffers
      console.log(`  Concatenating ${audioBuffers.length} audio chunks...`);
      const finalAudio = Buffer.concat(audioBuffers);
      fs.writeFileSync(outputPath, finalAudio);
    }

    const originalSizeMB = (fs.statSync(outputPath).size / (1024 * 1024)).toFixed(2);
    console.log(`✓ Audio generated: ${outputPath} (${originalSizeMB} MB)`);

    // Compress the audio using FFmpeg
    compressAudio(outputPath, outputPath);

    const finalSizeMB = (fs.statSync(outputPath).size / (1024 * 1024)).toFixed(2);
    const savings = ((1 - parseFloat(finalSizeMB) / parseFloat(originalSizeMB)) * 100).toFixed(1);
    console.log(`✓ Compressed: ${originalSizeMB} MB → ${finalSizeMB} MB (${savings}% smaller)`);

    // Check file size after compression
    if (parseFloat(finalSizeMB) > MAX_FILE_SIZE_MB) {
      console.error(`⚠ WARNING: File size (${finalSizeMB} MB) exceeds maximum (${MAX_FILE_SIZE_MB} MB)`);
      console.error(`  Consider reducing essay length or splitting into multiple parts.`);
      return false;
    }

    return true;
  } catch (error) {
    console.error(`✗ Error generating audio: ${error.message}`);
    return false;
  }
}

/**
 * Process a single essay
 */
async function processEssay(essaySlug) {
  const mdxPath = path.join(ESSAYS_DIR, `${essaySlug}.mdx`);
  const audioPath = path.join(AUDIO_OUTPUT_DIR, `${essaySlug}.mp3`);

  if (!fs.existsSync(mdxPath)) {
    console.error(`Error: Essay not found: ${mdxPath}`);
    return false;
  }

  // Check if audio already exists
  if (fs.existsSync(audioPath)) {
    console.log(`Audio already exists: ${audioPath}`);
    console.log('To regenerate, delete the existing file first.');
    return true;
  }

  console.log(`\nProcessing essay: ${essaySlug}`);
  console.log(`Reading: ${mdxPath}`);

  const text = extractTextFromMDX(mdxPath);

  if (text.length < 100) {
    console.error('Error: Extracted text is too short. Check MDX parsing.');
    return false;
  }

  console.log(`Extracted ${text.length} characters`);

  // Estimate cost (OpenAI charges $30 per 1M characters for tts-1-hd)
  const estimatedCost = (text.length / 1000000) * 30;
  console.log(`Estimated cost: $${estimatedCost.toFixed(4)}`);

  return await generateAudio(text, audioPath);
}

/**
 * Process all essays
 */
async function processAllEssays() {
  const files = fs.readdirSync(ESSAYS_DIR)
    .filter(f => f.endsWith('.mdx') && f !== 'index.mdx');

  console.log(`Found ${files.length} essays to process`);

  let successCount = 0;
  let failCount = 0;

  for (const file of files) {
    const slug = file.replace('.mdx', '');
    const success = await processEssay(slug);
    if (success) successCount++;
    else failCount++;
  }

  console.log(`\n=== Summary ===`);
  console.log(`Success: ${successCount}`);
  console.log(`Failed: ${failCount}`);
  console.log(`Total: ${files.length}`);
}

/**
 * Main
 */
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('Usage:');
    console.log('  node scripts/generate-audio.js <essay-slug>');
    console.log('  node scripts/generate-audio.js --all');
    console.log('\nExample:');
    console.log('  node scripts/generate-audio.js evolution-of-attention');
    process.exit(1);
  }

  // Ensure audio directory exists
  if (!fs.existsSync(AUDIO_OUTPUT_DIR)) {
    fs.mkdirSync(AUDIO_OUTPUT_DIR, { recursive: true });
  }

  if (args[0] === '--all') {
    await processAllEssays();
  } else {
    const essaySlug = args[0];
    await processEssay(essaySlug);
  }
}

main();
