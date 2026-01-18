#!/bin/bash

# Script to fix markdown bold (**text**) in TSX files by converting to <strong> tags
# This handles the common case of **text** appearing in bullet points

for file in ml-wiki/src/pages/wiki/bottleneck-architecture.tsx \
            ml-wiki/src/pages/wiki/identity-mapping.tsx \
            ml-wiki/src/pages/wiki/in-context-learning.tsx \
            ml-wiki/src/pages/wiki/io-aware-algorithms.tsx \
            ml-wiki/src/pages/wiki/kernel-fusion.tsx \
            ml-wiki/src/pages/wiki/layer-normalization.tsx \
            ml-wiki/src/pages/wiki/meta-learning.tsx \
            ml-wiki/src/pages/wiki/operator-splitting.tsx \
            ml-wiki/src/pages/wiki/positional-encoding.tsx \
            ml-wiki/src/pages/wiki/residual-connections.tsx \
            ml-wiki/src/pages/wiki/rlhf.tsx \
            ml-wiki/src/pages/wiki/seq2seq.tsx \
            ml-wiki/src/pages/wiki/soft-alignment.tsx \
            ml-wiki/src/pages/wiki/tiling-techniques.tsx \
            ml-wiki/src/pages/wiki/tokenization.tsx; do

  if [ -f "$file" ]; then
    echo "Processing $file..."
    # Replace **text** with <strong>text</strong>
    sed -i '' 's/\*\*\([^*]*\)\*\*/<strong>\1<\/strong>/g' "$file"
  fi
done

echo "Done! Fixed markdown bold syntax in 15 files."
