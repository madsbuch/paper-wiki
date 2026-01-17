# Wiki Scripts

This directory contains utility scripts for the ML Wiki project.

## MDX Validator (`validate-mdx.js`)

Validates MDX files for common syntax errors that cause runtime issues. **Run this before committing any MDX changes!**

### What It Checks

1. **Unescaped Comparison Operators**: `<` and `>` in regular text must be escaped as `&lt;` and `&gt;`
2. **Unescaped Curly Braces**: `{` and `}` in regular text must be escaped as `\{` and `\}` (unless they're JSX)
3. **Incorrect Layout Component Props**: Must use spread syntax `<Layout {...meta}>` not `<Layout meta={meta}>`

### Usage

```bash
# Validate all MDX files in the project
node scripts/validate-mdx.js

# Validate specific files
node scripts/validate-mdx.js path/to/file.mdx path/to/another.mdx
```

### Exit Codes

- `0`: All files valid (no errors)
- `1`: Errors found (must be fixed)

### Common Fixes

**Problem**: `Unescaped '<' character found`
```mdx
<!-- WRONG -->
Performance is < 50% on this task

<!-- CORRECT -->
Performance is &lt; 50% on this task

<!-- ALSO CORRECT -->
Performance is `< 50%` on this task
```

**Problem**: `Unescaped '>' character found`
```mdx
<!-- WRONG -->
Values > 100 are outliers

<!-- CORRECT -->
Values &gt; 100 are outliers
```

**Problem**: `Unescaped '{' character found`
```mdx
<!-- WRONG -->
The set {1, 2, 3} contains three elements

<!-- CORRECT -->
The set \{1, 2, 3\} contains three elements
```

**Why This Matters**: MDX errors like "K is not defined" or "Unexpected character" are caused by unescaped special characters. The validator catches these before they cause runtime failures.

---

## Audio Generation (`generate-audio.js`)

Generates audio versions of essays using OpenAI's Text-to-Speech API.

## Prerequisites

1. **OpenAI API Key**: You need an OpenAI API key with access to the TTS API
2. **Node.js**: Ensure you have Node.js 18+ installed

## Setup

1. Set your OpenAI API key as an environment variable:
```bash
export OPENAI_API_KEY=your-api-key-here
```

Or add it to your `.env` file:
```bash
echo "OPENAI_API_KEY=your-api-key" >> .env
```

## Usage

### Generate audio for a single essay

```bash
node scripts/generate-audio.js <essay-slug>
```

Example:
```bash
node scripts/generate-audio.js evolution-of-attention
```

### Generate audio for all essays

```bash
node scripts/generate-audio.js --all
```

## How it works

1. The script reads the MDX file for the specified essay
2. Extracts the text content (removing MDX/JSX syntax and metadata)
3. Calls the OpenAI TTS API to generate audio
4. Saves the MP3 file to `/public/audio/`

## Configuration

You can customize the voice and model in `generate-audio.js`:

- **Voice options**: `alloy`, `echo`, `fable`, `onyx`, `nova`, `shimmer`
- **Model options**:
  - `tts-1`: Standard quality, faster, cheaper
  - `tts-1-hd`: HD quality (recommended, used by default)

Current settings:
- Voice: `alloy`
- Model: `tts-1-hd`
- Compression: Enabled (FFmpeg)

## Audio Compression

All generated audio is automatically compressed using FFmpeg to reduce file size while maintaining excellent quality for speech:

- **Bitrate**: 64 kbps (perfect for speech)
- **Channels**: Mono (speech doesn't need stereo)
- **Sample rate**: 22.05 kHz (sufficient for speech clarity)
- **Size reduction**: ~75% smaller than original TTS output
- **Quality**: Excellent for voice content

### File Size Limits

- Maximum file size: 25MB
- Typical sizes after compression:
  - 1,000 words: ~1.5-2 MB
  - 3,000 words: ~5-6 MB
  - 5,000 words: ~8-10 MB

The script will warn if a file exceeds 25MB after compression.

### Requirements

FFmpeg must be installed for compression to work:
```bash
# macOS
brew install ffmpeg

# Ubuntu/Debian
sudo apt-get install ffmpeg

# Windows (using Chocolatey)
choco install ffmpeg
```

If FFmpeg is not installed, the script will generate uncompressed audio (which may exceed 25MB for longer essays).

## Cost

OpenAI TTS pricing (as of 2024):
- **tts-1**: $15.00 per 1M characters
- **tts-1-hd**: $30.00 per 1M characters

A typical 4,000-word essay (~25,000 characters) costs approximately:
- tts-1: $0.38
- tts-1-hd: $0.75 (recommended for best quality)

## Adding audio to an essay

1. Generate the audio file:
```bash
node scripts/generate-audio.js your-essay-slug
```

2. Add the `audioPath` to your essay's meta:
```typescript
export const meta = {
  title: "Your Essay Title",
  description: "...",
  readingTime: "25 min read",
  audioPath: "/audio/your-essay-slug.mp3",  // Add this line
  // ... rest of meta
};
```

3. The audio player will automatically appear on the essay page

## Audio Player Features

The audio player includes:
- Standard HTML5 audio controls (play, pause, seek, volume)
- Download button for offline listening
- Visual indicator that audio is available
- Optimized for mobile and desktop

## Regenerating audio

If you've edited an essay and want to regenerate its audio:

1. Delete the existing audio file:
```bash
rm public/audio/essay-slug.mp3
```

2. Run the generation script again:
```bash
node scripts/generate-audio.js essay-slug
```

## Troubleshooting

### "OPENAI_API_KEY environment variable is required"
- Make sure you've set the API key: `export OPENAI_API_KEY=your-key`

### "Audio already exists"
- The script won't overwrite existing files
- Delete the file manually first if you want to regenerate

### "Extracted text is too short"
- Check that your MDX file has proper content
- Ensure the file structure matches the expected format

### Audio file is too large
- Ensure FFmpeg is installed and working
- Check if compression is being applied (you should see "Compressed: X MB → Y MB" in output)
- If still too large, consider splitting the essay into multiple parts

## Voice Samples

To help choose a voice, here are the characteristics:

- **alloy**: Neutral, balanced, professional
- **echo**: Clear, expressive, slightly deeper
- **fable**: Warm, engaging, storytelling quality
- **onyx**: Deep, authoritative, rich
- **nova**: Bright, energetic, youthful
- **shimmer**: Soft, gentle, calming

Listen to samples at: https://platform.openai.com/docs/guides/text-to-speech

## Best Practices

1. **Generate in batches**: Use `--all` to generate all essays at once
2. **Version control**: Don't commit audio files to git (they're large)
3. **CDN storage**: For production, upload audio files to a CDN
4. **Caching**: The script checks for existing files to avoid redundant API calls
5. **Testing**: Listen to the first few seconds to verify quality before generating many files
