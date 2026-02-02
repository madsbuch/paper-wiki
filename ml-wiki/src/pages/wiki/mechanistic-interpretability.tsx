import { useEffect, useState } from 'react';
import WikiLayout from "../../components/WikiLayout";
import type { WikiMeta } from "../../types/wiki";

function InterpretabilityExercise() {
  const [selectedLayer, setSelectedLayer] = useState(1);
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const [steering, setSteering] = useState(0);

  const layers = [
    { id: 1, name: "Layer 1 (Early)", features: ["edge detection", "basic patterns", "word boundaries"] },
    { id: 2, name: "Layer 8 (Middle)", features: ["syntax", "entity types", "conversation markers"] },
    { id: 3, name: "Layer 15 (Deep)", features: ["reasoning strategies", "personality traits", "domain expertise"] },
  ];

  const currentLayer = layers.find(l => l.id === selectedLayer)!;

  const getSteeringEffect = () => {
    if (!selectedFeature) return null;
    if (selectedFeature === "conversation markers") {
      return steering > 0
        ? "Model shows more question-answering and perspective shifts"
        : steering < 0
        ? "Model produces linear, monologue-like reasoning"
        : "Normal conversational behavior";
    }
    if (selectedFeature === "reasoning strategies") {
      return steering > 0
        ? "More verification, backtracking, and subgoal setting"
        : steering < 0
        ? "Fewer cognitive strategies, more direct responses"
        : "Balanced strategy use";
    }
    return steering > 0
      ? `Feature "${selectedFeature}" amplified`
      : steering < 0
      ? `Feature "${selectedFeature}" suppressed`
      : `Feature "${selectedFeature}" at baseline`;
  };

  return (
    <section>
      <h2 className="text-2xl font-bold text-slate-900 mb-4">Exercise: Explore Model Internals</h2>
      <p className="text-slate-700 mb-4">
        Select different layers to see what features are represented, then try "steering" a feature
        to see how it affects model behavior. This simulates what researchers do with real models.
      </p>

      <div className="grid grid-cols-3 gap-2 mb-4">
        {layers.map(layer => (
          <button
            key={layer.id}
            onClick={() => { setSelectedLayer(layer.id); setSelectedFeature(null); setSteering(0); }}
            className={`p-3 rounded-lg border-2 text-left ${
              selectedLayer === layer.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="font-medium text-slate-900 text-sm">{layer.name}</div>
          </button>
        ))}
      </div>

      <div className="bg-slate-50 p-4 rounded-lg mb-4">
        <h3 className="font-medium text-slate-900 mb-2">Features in {currentLayer.name}</h3>
        <div className="flex flex-wrap gap-2">
          {currentLayer.features.map(feature => (
            <button
              key={feature}
              onClick={() => setSelectedFeature(feature)}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedFeature === feature
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {feature}
            </button>
          ))}
        </div>
      </div>

      {selectedFeature && (
        <div className="bg-white border border-slate-200 p-4 rounded-lg mb-4">
          <h3 className="font-medium text-slate-900 mb-2">Steering: {selectedFeature}</h3>
          <div className="flex items-center gap-4 mb-2">
            <span className="text-sm text-slate-500">Suppress</span>
            <input
              type="range"
              min="-10"
              max="10"
              value={steering}
              onChange={(e) => setSteering(parseInt(e.target.value))}
              className="flex-1"
            />
            <span className="text-sm text-slate-500">Amplify</span>
          </div>
          <p className="text-center text-sm text-slate-600">Steering strength: {steering}</p>
        </div>
      )}

      {selectedFeature && (
        <div className={`p-4 rounded-lg ${
          steering > 0 ? 'bg-green-50 border border-green-200' :
          steering < 0 ? 'bg-red-50 border border-red-200' :
          'bg-slate-50 border border-slate-200'
        }`}>
          <p className={`text-sm ${
            steering > 0 ? 'text-green-800' :
            steering < 0 ? 'text-red-800' :
            'text-slate-700'
          }`}>
            <strong>Effect:</strong> {getSteeringEffect()}
          </p>
          {selectedFeature === "conversation markers" && steering > 0 && (
            <p className="text-green-700 text-xs mt-2">
              In real experiments, steering this feature doubled accuracy on arithmetic tasks!
            </p>
          )}
        </div>
      )}
    </section>
  );
}

const meta: WikiMeta = {
  title: "Mechanistic Interpretability",
  description: "A field of AI safety research focused on reverse-engineering neural networks to understand how they perform computations at a mechanistic level.",
  category: "AI Safety",
  difficulty: "Advanced",
  tags: ["interpretability", "ai-safety", "neural-networks", "reverse-engineering", "features"],
  relatedConcepts: ["sparse-autoencoders", "transformer-architecture", "attention-mechanism"],
  citations: [
    {
      paper: "A Mathematical Framework for Transformer Circuits",
      authors: "Elhage, N., et al.",
      year: "2021",
      pages: "1-52"
    },
    {
      paper: "Scaling Monosemanticity: Extracting Interpretable Features from Claude 3 Sonnet",
      authors: "Templeton, A., et al.",
      year: "2024",
      pages: "1-100"
    },
    {
      paper: "Reasoning Models Generate Societies of Thought",
      authors: "Kim, J., Lai, S., Scherrer, N., Agüera y Arcas, B., & Evans, J.",
      year: "2025",
      pages: "7-12"
    }
  ]
};

export default function MechanisticInterpretability() {
  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.typesetPromise?.([document.body]).catch((err: Error) =>
        console.error('MathJax typesetting failed:', err)
      );
    }
  }, []);

  return (
    <WikiLayout {...meta}>
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Overview</h2>
          <p className="text-slate-700 mb-4">
            Mechanistic interpretability is a research approach that aims to reverse-engineer neural
            networks by identifying the algorithms and representations they use internally [Elhage et al., 2021].
            Rather than treating models as black boxes or relying on behavioral tests, mechanistic
            interpretability seeks to understand the actual computations happening inside the network.
          </p>
          <p className="text-slate-700">
            This field has become increasingly important as language models are deployed in high-stakes
            applications. By understanding what features models represent and how they combine them,
            researchers can better predict model behavior, identify potential failure modes, and develop
            interventions to improve model safety.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Problem It Solves</h2>
          <p className="text-slate-700 mb-4">
            Modern neural networks are powerful but opaque. A language model might produce a correct
            answer, but we don't know if it "understood" the question, got lucky, or memorized
            a similar example. This opacity creates several problems:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Safety</strong>: We can't verify that models won't behave harmfully in novel situations</li>
            <li><strong>Debugging</strong>: When models fail, we can't easily identify why</li>
            <li><strong>Trust</strong>: Users can't verify that model reasoning is sound</li>
            <li><strong>Improvement</strong>: We can't systematically improve specific capabilities</li>
          </ul>
          <p className="text-slate-700">
            Mechanistic interpretability provides tools to open the black box and examine the
            computational mechanisms inside.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">How It Works</h2>

          <h3 className="text-xl font-semibold text-slate-800 mb-2">Key Techniques</h3>

          <p className="text-slate-700 mb-4">
            <strong>1. Activation Patching</strong>: Replace activations from one forward pass with
            activations from another to identify which components are causally responsible for behavior.
          </p>

          <p className="text-slate-700 mb-4">
            <strong>2. Sparse Autoencoders (SAEs)</strong>: Train autoencoders to decompose model
            activations into interpretable features. SAEs enforce sparsity so each feature tends
            to represent a single concept [Templeton et al., 2024].
          </p>

          <p className="text-slate-700 mb-4">
            <strong>3. Probing</strong>: Train simple classifiers on model activations to test what
            information is linearly represented at different layers.
          </p>

          <p className="text-slate-700 mb-4">
            <strong>4. Feature Steering</strong>: Add or subtract feature vectors from activations
            during inference to causally test their role. For example, steering a "conversation marker"
            feature in DeepSeek-R1-Llama-8B doubled accuracy on reasoning tasks [Kim et al., 2025].
          </p>

          <h3 className="text-xl font-semibold text-slate-800 mb-2 mt-6">What Researchers Have Found</h3>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700">
            <li>Transformers implement identifiable algorithms for tasks like modular addition</li>
            <li>Features exist for abstract concepts like "deception" and "the Golden Gate Bridge"</li>
            <li>Reasoning models develop features for conversational behaviors that improve accuracy</li>
            <li>Models use "induction heads" to copy patterns from context</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Engine Mechanic</h2>
          <p className="text-slate-700 mb-4">
            Imagine you have a mysterious car that works extremely well—it wins races, handles
            perfectly, never breaks down. But the hood is welded shut. You can test how it
            responds to different inputs (steering, gas, brakes), but you can't see the engine.
          </p>
          <p className="text-slate-700 mb-4">
            Behavioral testing tells you what the car does. But if you're racing it at high speed,
            you really want to know how it works. What if there's a flaw that only appears at
            220 mph? What if the brakes have a subtle weakness?
          </p>
          <p className="text-slate-700 mb-4">
            Mechanistic interpretability is like finally getting tools to open that hood. You can
            trace where the fuel goes, how the transmission engages, what the computer is calculating.
            You might discover the engine has an elegant design—or you might find a ticking time bomb.
          </p>
          <p className="text-slate-700">
            When researchers applied these techniques to reasoning models, they found something
            unexpected: the engine was running what looked like an internal committee meeting,
            with different "voices" debating solutions. And amplifying the "surprise" circuit
            made the whole engine run better [Kim et al., 2025].
          </p>
        </section>

        <hr className="my-8 border-slate-300" />

        <InterpretabilityExercise />

        <hr className="my-8 border-slate-300" />

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Impact</h2>
          <p className="text-slate-700 mb-4">
            Mechanistic interpretability has matured from a niche research area to a central pillar
            of AI safety research. Major labs including Anthropic, OpenAI, and DeepMind have
            dedicated interpretability teams.
          </p>
          <p className="text-slate-700 mb-4">
            Practical applications include:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4 text-slate-700 mb-4">
            <li>Identifying features related to deception and manipulation</li>
            <li>Understanding how models process sensitive topics</li>
            <li>Improving reasoning by steering beneficial features</li>
            <li>Debugging unexpected model behaviors</li>
          </ul>
          <p className="text-slate-700">
            The discovery that reasoning models develop interpretable "society of thought"
            structures internally represents a major advance—it suggests that good reasoning
            may have an identifiable mechanistic signature that can be measured and improved
            [Kim et al., 2025].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Related Concepts</h2>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700">
            <li><a href="/wiki/sparse-autoencoders" className="text-blue-600 hover:text-blue-800 underline">Sparse Autoencoders</a> - Key tool for decomposing model activations</li>
            <li><a href="/wiki/transformer-architecture" className="text-blue-600 hover:text-blue-800 underline">Transformer Architecture</a> - The architecture most interpretability research focuses on</li>
            <li><a href="/wiki/attention-mechanism" className="text-blue-600 hover:text-blue-800 underline">Attention Mechanism</a> - A component that's been extensively studied</li>
            <li><a href="/wiki/ai-alignment" className="text-blue-600 hover:text-blue-800 underline">AI Alignment</a> - The broader goal interpretability serves</li>
          </ul>
        </section>
      </div>
    </WikiLayout>
  );
}
