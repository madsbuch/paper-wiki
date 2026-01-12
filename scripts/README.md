# Audio Generation for Essays

This directory contains scripts for generating audio versions of essays using OpenAI's Text-to-Speech API.

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
  - `tts-1-hd`: HD quality (recommended)

Current settings:
- Voice: `alloy`
- Model: `tts-1-hd`

## Cost

OpenAI TTS pricing (as of 2024):
- **tts-1**: $15.00 per 1M characters
- **tts-1-hd**: $30.00 per 1M characters

A typical 4,000-word essay (~25,000 characters) costs approximately:
- tts-1: $0.38
- tts-1-hd: $0.75

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
- Consider using `tts-1` instead of `tts-1-hd` for smaller files
- The quality difference is minimal for most use cases

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
