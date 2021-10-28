---
title: 'Evaluate semantic segmentation models'
date: '2021-09-11'
tags: ['machine learning']
featured: true
summary: "Semantic segmentation is a dense-prediction task. When evaluating segmentation models, common evaluation metrics such as classification accuracy is not useful. In this post, I'm going to show you two metrics for evaluating image segmentation models."
socialImage: '/images/life/20210417_stockholm_slussen.jpeg'
---
Semantic segmentation is a dense-prediction task in which a model assigns class label to every pixel of a given input image. It is one of the popular, well-studied computer vision problems and has many pratical applications. For instance, self-driving cars use segmentation model to perceives the world around them; iOS camera portrait mode uses ML segmentation model to separate foreground and background of images, etc.

In a classification problem, *accuracy* is often used to measure the performance of the model (i.e., what is the percentage of the correctly labeled data the model can provide). However, it isn't straightforward to apply pixel-level accuracy to semantic segmentation.

<figure class="figure mx-auto w-full p-2 flex flex-col items-center">
  <img src="/images/machine-learning/2021-09-11-1-semantic-figure.png" alt="semantic segmentation">
  <figcaption class="text-sm font-sans text-gray-600 mt-4">Semantic segmentation</figcaption>
</figure>

## Intersection over Union (IoU)
The Intersection over Union (IoU) metric, also referred as the Jaccard index, is essentially a way to measure the quotient of the intersection and union of the prediction and the groundtruth.

Normally

## Dice
