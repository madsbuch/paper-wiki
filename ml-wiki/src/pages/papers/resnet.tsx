import PaperLayout from "../../components/PaperLayout";

export default function ResNet() {
  return (
    <PaperLayout
      title="Deep Residual Learning for Image Recognition"
      authors="He, K., Zhang, X., Ren, S., & Sun, J."
      year="2015"
      venue="IEEE Conference on Computer Vision and Pattern Recognition (CVPR 2016)"
      arxivId="1512.03385v1"
      arxivUrl="https://arxiv.org/abs/1512.03385"
      abstract="Deeper neural networks are more difficult to train. We present a residual learning framework to ease the training of networks that are substantially deeper than those used previously. We explicitly reformulate the layers as learning residual functions with reference to the layer inputs, instead of learning unreferenced functions. We provide comprehensive empirical evidence showing that these residual networks are easier to optimize, and can gain accuracy from considerably increased depth. On the ImageNet dataset we evaluate residual nets with a depth of up to 152 layers—8× deeper than VGG nets but still having lower complexity. An ensemble of these residual nets achieves 3.57% error on the ImageNet test set. This result won the 1st place on the ILSVRC 2015 classification task. We also present analysis on CIFAR-10 with 100 and 1000 layers."
      keyContributions={[
        "Introduced residual connections (skip connections) to enable training of very deep networks",
        "Solved the degradation problem where deeper networks perform worse than shallower ones",
        "Demonstrated that identity mappings via skip connections ease optimization",
        "Achieved state-of-the-art on ImageNet with 152-layer networks",
        "Introduced bottleneck architecture for efficient deep networks"
      ]}
      relatedConcepts={[
        { name: "Residual Connections", slug: "residual-connections" },
        { name: "Identity Mapping", slug: "identity-mapping" },
        { name: "Bottleneck Architecture", slug: "bottleneck-architecture" },
        { name: "Layer Normalization", slug: "layer-normalization" }
      ]}
      impact="ResNet revolutionized deep learning by enabling training of extremely deep neural networks (100+ layers). The residual connection concept has been adopted universally across deep learning, including in Transformers (which use residual connections around every sub-layer). This paper won ILSVRC 2015 and has been cited over 150,000 times, making it one of the most influential papers in deep learning history. Residual connections are now a standard component in virtually all modern neural architectures."
    />
  );
}
