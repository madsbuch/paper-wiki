import { useEffect } from 'react';
import WikiLayout from "../../components/WikiLayout";

export default function Tokenization() {
  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.typesetPromise?.([document.body]).catch((err: Error) =>
        console.error('MathJax typesetting failed:', err)
      );
    }
  }, []);

  const meta = {
  title: "Tokenization",
  category: "Fundamentals",
  description: "The process of converting text into discrete units (tokens) that language models can process. Essential preprocessing step for all NLP systems.",
  relatedConcepts: ["byte-pair-encoding", "subword-tokenization", "vocabulary", "embeddings"],
  citations: [
    {
      paper: "Attention Is All You Need",
      authors: "Vaswani et al.",
      year: "2017",
      pages: "5"
    },
    {
      paper: "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding",
      authors: "Devlin et al.",
      year: "2019",
      pages: "4"
    }
  ]
};

  return (
    <WikiLayout {...meta}>
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">What is Tokenization?</h2>
          <p className="text-slate-700 mb-4">Tokenization is the process of breaking down text into smaller units called tokens. These tokens are the basic building blocks that language models operate on. Without tokenization, models would need to work directly with raw text, which is inefficient and difficult to learn from.</p>
          <p className="text-slate-700 mb-4">Think of tokenization like breaking speech into words. When you hear someone speak, your brain doesn't process one continuous stream—it segments the audio into discrete words that have meaning. Tokenization does the same thing for text, creating discrete units that a model can process.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Why Tokenization Matters</h2>
          <p className="text-slate-700 mb-4">Language models don't understand text directly. They work with numbers. Tokenization bridges this gap by:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Converting text to numbers</strong>: Each token maps to a unique integer ID</li>
            <li><strong>Defining vocabulary</strong>: The set of all possible tokens the model can process</li>
            <li><strong>Handling unknown words</strong>: Strategies for dealing with words not seen during training</li>
            <li><strong>Balancing granularity</strong>: Too coarse (word-level) misses patterns, too fine (character-level) loses meaning</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Tokenization Strategies</h2>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Character-Level Tokenization</h3>
          <p className="text-slate-700 mb-4">The simplest approach: each character is a token.</p>
          <p className="text-slate-700 mb-4"><strong>Example:</strong></p>
          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto"><code className="text-sm">
            Text: "hello"
            Tokens: ["h", "e", "l", "l", "o"]
          </code></pre>
          <p className="text-slate-700 mb-4"><strong>Advantages:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Tiny vocabulary (26 letters + punctuation + special chars)</li>
            <li>No unknown tokens</li>
            <li>Can represent any text</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>Disadvantages:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Very long sequences</li>
            <li>Loses word-level semantics</li>
            <li>Harder to capture long-range dependencies</li>
          </ul>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Word-Level Tokenization</h3>
          <p className="text-slate-700 mb-4">Split text by spaces and punctuation.</p>
          <p className="text-slate-700 mb-4"><strong>Example:</strong></p>
          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto"><code className="text-sm">
            Text: "Hello, world!"
            Tokens: ["Hello", ",", "world", "!"]
          </code></pre>
          <p className="text-slate-700 mb-4"><strong>Advantages:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Natural semantic units</li>
            <li>Shorter sequences than character-level</li>
            <li>Intuitive and interpretable</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>Disadvantages:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Huge vocabulary (hundreds of thousands of words)</li>
            <li>Out-of-vocabulary problem: what about "supercalifragilisticexpialidocious"?</li>
            <li>No way to represent rare or new words</li>
            <li>Different forms of same word are separate (run, running, ran)</li>
          </ul>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Subword Tokenization</h3>
          <p className="text-slate-700 mb-4">A middle ground: break words into meaningful subunits.</p>
          <p className="text-slate-700 mb-4"><strong>Example:</strong></p>
          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto"><code className="text-sm">
            Text: "unhappiness"
            Tokens: ["un", "happi", "ness"]
          </code></pre>
          <p className="text-slate-700 mb-4">This approach balances vocabulary size and representation power. Common words stay intact, rare words split into recognizable pieces.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Byte-Pair Encoding (BPE)</h2>
          <p className="text-slate-700 mb-4">BPE is the most popular subword tokenization method, used in GPT, BERT, and most modern language models.</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">How BPE Works</h3>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Start with characters</strong>: Initialize vocabulary with all individual characters</li>
            <li><strong>Find most frequent pair</strong>: Look at your training corpus and find the most common adjacent token pair</li>
            <li><strong>Merge the pair</strong>: Add the merged pair as a new token to vocabulary</li>
            <li><strong>Repeat</strong>: Continue merging until you reach desired vocabulary size</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>Example training process:</strong></p>
          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto"><code className="text-sm">
            Corpus: "low", "low", "low", "lower", "newest"
            
            Initial: ['l', 'o', 'w', 'e', 'r', 'n', 's', 't']
            
            Step 1: Most frequent pair is 'l' + 'o' → add 'lo'
            Step 2: Most frequent pair is 'lo' + 'w' → add 'low'
            Step 3: Most frequent pair is 'e' + 's' → add 'es'
            Step 4: Most frequent pair is 'es' + 't' → add 'est'
            
            Final vocabulary: ['l', 'o', 'w', 'e', 'r', 'n', 's', 't', 'lo', 'low', 'es', 'est']
          </code></pre>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Applying BPE</h3>
          <p className="text-slate-700 mb-4">Once trained, apply BPE greedily: always use the longest matching token from vocabulary.</p>
          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto"><code className="text-sm">
            Text: "lowest"
            Process:
              - Check if "lowest" is in vocab → no
              - Check if "lowes" is in vocab → no
              - Check if "lowe" is in vocab → no
              - Check if "low" is in vocab → yes! Take it
              - Remaining: "est"
              - Check if "est" is in vocab → yes! Take it
            
            Result: ["low", "est"]
          </code></pre>
          <p className="text-slate-700 mb-4">The Transformer paper uses BPE: "We used byte-pair encoding with a shared source-target vocabulary of about 37000 tokens" [Vaswani et al., 2017, p. 5].</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">WordPiece Tokenization</h2>
          <p className="text-slate-700 mb-4">Similar to BPE but with a different merge criterion. Used in BERT.</p>
          <p className="text-slate-700 mb-4">Instead of merging the most frequent pair, WordPiece merges the pair that maximizes the likelihood of the training data.</p>
          <p className="text-slate-700 mb-4">BERT uses WordPiece: "We use WordPiece embeddings with a 30,000 token vocabulary" [Devlin et al., 2019, p. 4].</p>
          <p className="text-slate-700 mb-4"><strong>Key difference from BPE:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>BPE: Merge most frequent pair</li>
            <li>WordPiece: Merge pair that best explains training data (likelihood-based)</li>
          </ul>
          <p className="text-slate-700 mb-4">In practice, results are similar, but WordPiece can be slightly better at preserving meaningful subwords.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Special Tokens</h2>
          <p className="text-slate-700 mb-4">All tokenization schemes include special tokens for control:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong><code className="bg-slate-100 px-1 rounded">&lt;PAD&gt;</code></strong>: Padding token for batching sequences of different lengths</li>
            <li><strong><code className="bg-slate-100 px-1 rounded">&lt;UNK&gt;</code></strong>: Unknown token for words outside vocabulary</li>
            <li><strong><code className="bg-slate-100 px-1 rounded">&lt;BOS&gt;</code>/<code className="bg-slate-100 px-1 rounded">&lt;SOS&gt;</code></strong>: Beginning/start of sequence</li>
            <li><strong><code className="bg-slate-100 px-1 rounded">&lt;EOS&gt;</code></strong>: End of sequence</li>
            <li><strong><code className="bg-slate-100 px-1 rounded">&lt;SEP&gt;</code></strong>: Separator between segments (used in BERT)</li>
            <li><strong><code className="bg-slate-100 px-1 rounded">&lt;CLS&gt;</code></strong>: Classification token (used in BERT)</li>
            <li><strong><code className="bg-slate-100 px-1 rounded">&lt;MASK&gt;</code></strong>: Mask token for masked language modeling</li>
          </ul>
          <p className="text-slate-700 mb-4">Example BERT input:</p>
          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto"><code className="text-sm">
            Text: "Hello world" and "How are you"
            Tokenized: [&lt;CLS&gt;, "Hello", "world", &lt;SEP&gt;, "How", "are", "you", &lt;SEP&gt;]
          </code></pre>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Vocabulary Size Trade-offs</h2>
          <p className="text-slate-700 mb-4">Choosing vocabulary size is a key design decision:</p>
          <p className="text-slate-700 mb-4"><strong>Small vocabulary (1,000-5,000 tokens):</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Pros: Fewer parameters in embedding matrix, faster training</li>
            <li>Cons: Longer sequences, words split into many pieces</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>Medium vocabulary (30,000-50,000 tokens):</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Most common choice</li>
            <li>Good balance between sequence length and model size</li>
            <li>BERT uses 30K [Devlin et al., 2019, p. 4]</li>
            <li>GPT-2 uses ~50K</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>Large vocabulary (100,000+ tokens):</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Pros: Shorter sequences, common words stay intact</li>
            <li>Cons: Huge embedding matrix, many rare tokens</li>
          </ul>
          <p className="text-slate-700 mb-4">The Transformer paper chose 37K tokens for translation [Vaswani et al., 2017, p. 5], representing a practical balance.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">From Tokens to Embeddings</h2>
          <p className="text-slate-700 mb-4">After tokenization, each token ID is mapped to a dense vector (embedding):</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Tokenize</strong>: "Hello world" → [15496, 995]</li>
            <li><strong>Embed</strong>: Look up vectors in embedding matrix</li>
            <li>Token 15496 → [0.23, -0.45, 0.67, ..., 0.12]  (d_model dimensions)</li>
            <li>Token 995 → [-0.34, 0.89, -0.23, ..., 0.45]</li>
          </ul>
          <p className="text-slate-700 mb-4">These embeddings are learned during training and capture semantic meaning. Similar tokens have similar embeddings.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Practical Considerations</h2>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Case Sensitivity</h3>
          <p className="text-slate-700 mb-4">Different approaches to capitalization:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Case-sensitive</strong>: "Apple" and "apple" are different tokens</li>
            <li>Larger vocabulary</li>
            <li>Can distinguish proper nouns</li>
            <li><strong>Lowercase everything</strong>: Normalize to lowercase before tokenization</li>
            <li>Smaller vocabulary</li>
            <li>Loses capitalization information</li>
          </ul>
          <p className="text-slate-700 mb-4">BERT uses case-sensitive (actually offers both cased and uncased models).</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Handling Whitespace</h3>
          <p className="text-slate-700 mb-4">Subword tokenization needs to track word boundaries:</p>
          <p className="text-slate-700 mb-4"><strong>Approach 1: Special marker</strong></p>
          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto"><code className="text-sm">
            Text: "playing"
            Tokens: ["play", "##ing"]  # ## indicates continuation
          </code></pre>
          <p className="text-slate-700 mb-4"><strong>Approach 2: Leading space</strong></p>
          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto"><code className="text-sm">
            Text: "playing games"
            Tokens: ["play", "ing", " games"]  # space indicates new word
          </code></pre>
          <p className="text-slate-700 mb-4">GPT models use leading space approach. BERT uses ## continuation marker.</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Unicode and Multiple Languages</h3>
          <p className="text-slate-700 mb-4">Modern tokenizers handle Unicode properly:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Support for non-Latin scripts (Chinese, Arabic, etc.)</li>
            <li>Emoji and special characters</li>
            <li>Consistent handling across languages</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Analogy: Digital Audio</h2>
          <p className="text-slate-700 mb-4">Tokenization is like converting analog audio to digital:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Analog audio</strong> = continuous waveform (like raw text)</li>
            <li><strong>Sampling</strong> = taking discrete measurements (like tokenization)</li>
            <li><strong>Sample rate</strong> = granularity (like token size: character vs subword vs word)</li>
            <li><strong>Quantization</strong> = mapping to discrete values (like token IDs)</li>
          </ul>
          <p className="text-slate-700 mb-4">Just as audio sampling must balance quality (fine-grained) with file size (coarse-grained), tokenization must balance semantic granularity with computational efficiency.</p>
          <p className="text-slate-700 mb-4">Too coarse (word-level): misses morphological patterns, huge vocabulary</p>
          <p className="text-slate-700 mb-4">Too fine (character-level): loses semantic meaning, very long sequences</p>
          <p className="text-slate-700 mb-4">Just right (subword-level): captures patterns, manageable vocabulary, reasonable sequence length</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Implementation Tips</h2>
          <p className="text-slate-700 mb-4">When building a tokenization system:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Choose vocabulary size based on</strong>:</li>
            <li>Available compute (larger vocab = more parameters)</li>
            <li>Language characteristics (morphologically rich languages benefit from subwords)</li>
            <li>Task requirements (generation tasks prefer shorter sequences)</li>
          </ul>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Train tokenizer on diverse data</strong>:</li>
            <li>Should represent the domain you'll deploy on</li>
            <li>Include rare but important terms</li>
            <li>Balance across languages if multilingual</li>
          </ul>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Handle normalization carefully</strong>:</li>
            <li>Decide on case handling early</li>
            <li>Consistent preprocessing (spaces, punctuation)</li>
            <li>Unicode normalization (NFD, NFC, etc.)</li>
          </ul>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Test edge cases</strong>:</li>
            <li>Very long words</li>
            <li>Multiple languages mixed</li>
            <li>Special characters and emoji</li>
            <li>Numbers and dates</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Key Takeaways</h2>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Tokenization bridges text and models</strong>: Converts strings to numbers</li>
            <li><strong>Subword tokenization is dominant</strong>: BPE and WordPiece offer best trade-offs</li>
            <li><strong>Vocabulary size matters</strong>: Affects model size, sequence length, and performance</li>
            <li><strong>Special tokens provide control</strong>: Padding, masking, separators, etc.</li>
            <li><strong>Learned during training</strong>: Tokenizer and embeddings are trained together</li>
          </ul>
          <p className="text-slate-700 mb-4">Every language model starts with tokenization. Getting it right is crucial for everything that follows.</p>
        </section>
      </div>
    </WikiLayout>
  );
}
