---
title: 'Understanding Grounding DINO'
date: '2023-11-13'
tags: ['machine learning', 'object detection', 'zero-shot learning']
featured: true
summary: "Grounding DINO is a zero-shot object detection model that combines the powerful vision transfomer model for close-set objection with the grounding language model for open-set object detection. In this article, I will present a summary of the Grounding DINO paper, and the main concepts and ideas from other relevant papers that Grounding DINO is built up on."
socialImage: '/images/machine-learning/20220813-detection-fb-og.png'
---

Grounding DINO is a zero-shot object detection model that combines the powerful vision transfomer model for close-set objection with the grounding language model for open-set object detection. In this article, I will present a summary of the Grounding DINO [paper](https://arxiv.org/abs/2303.05499), and the main concepts and ideas from other relevant papers that Grounding DINO is built up on. Hopefully, by the end of this article, you'll gain a clear understanding of how Grounding DINO works and can start using it to build [interesting applications](https://github.com/IDEA-Research/Grounded-Segment-Anything)

<em class="text-sm">Disclaimer: The DINO in Grounding DINO refers to the DETR with Improved Denoising Anchor Boxes, which is a variant of the DETR - Detection Transformer model, which will be discussed below. This is not to be confused with the [DINO (distillation with no label)](https://arxiv.org/abs/2104.14294) proposed by Meta AI in another line of work, self-supervised vision transformer.</em>

<figure class="figure mx-auto w-full flex flex-col items-center">
  <img src="/images/machine-learning/20231113_grounding_dino_herofig.png" />
  <figcaption>Illustration of close-set and open-set object detection from the Grounding DINO <a href="https://arxiv.org/abs/2303.05499" target="_blank">paper</a></figcaption>
</figure>

## Open-set object detection
Open-set object detection refers to the setting in which the detection model is able to detect and potentially categorize objects of classes that are not presented in training data. Indeed, this is a very challenging problem since the model has to be robust enough to not misclassify unseen objects as one of the seen classes, while maintaining high performance on known classes.

In the context of Grounding DINO, open-set object detection is defined as object detection in respond to human language query. A general strategy to extend closed-set object detectors to open-set object detection is to learn language-aware region embeddings so that each region can be classified into novel categories in the language-aware semantic space. To do so, we need to fuse the language embeddings to different phase of the object detection network, e.g.,

<figure class="figure mx-auto w-full md:w-4/5 flex flex-col items-center">
  <img src="/images/machine-learning/20231113_grounding_dino_csd2osd.png" />
  <figcaption>Illustration of close-set and open-set object detection from the Grounding DINO</figcaption>
</figure>

The authors of the paper argue that <em>the key to open-set detection is introducing language for unseen object generalization</em>.

## Architecture of Grounding DINO

The Grounding DINO model is consisted of 3 main components: image encoder for extracting image features, text encoder for extracting query features, and a cross-modality box decoder for predicting bounding boxes and labels. Addtionally, it also contains a feature enhancer for text and image feature fusion, and a language-quided query selector for query initialization.

## Technical interlude: Transformer for object detection

### DETR: Detection Transformer

### Deformable attention

### DINO: DETER with Improved Denoising Anchor Boxes

##
