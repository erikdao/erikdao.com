---
title: 'Evaluate semantic segmentation models'
date: '2021-09-11'
tags: ['machine learning']
featured: true
displayOrder: 1
summary: "Semantic segmentation is a dense-prediction task. When evaluating segmentation models, common evaluation metrics such as classification accuracy is not useful. In this post, I'm going to show you two metrics for evaluating image segmentation models."
socialImage: '/images/life/20210417_stockholm_slussen.jpeg'
---
Semantic segmentation is a dense-prediction task where the model assigns class-label for every pixel in the input image. However, we can't use classification accuracy to measure how well a segmentation model performs. In this post, I'll discuss several methods for evaluating semantic image segmentation models.

## Semantic segmentation
Let's first recall what semantic image segmentation is. In this task, the model predicts the label for each pixel in the image, thus, drawing semantic boundaries between objects in the image. It can output either the predicted class-label or class probabilities of each pixel in the image. In the later case, a threshold is then applied to turn probabilities into class label.

The prediction output shape matches with the spatial resolution (i.e., width and height) of the input image, with a depth channel equals to the number of possible classes to be predicted. Each channel consists of a binary mask which labels areas where a specific class is present.

<figure class="figure mx-auto w-full p-2 flex flex-col items-center">
  <img src="/images/machine-learning/2021-09-11-1-semantic-figure.png" alt="semantic segmentation">
  <figcaption class="text-sm font-sans text-gray-600 mt-4">Semantic segmentation</figcaption>
</figure>

## Intersection over Union (IoU)
The Intersection over Union (IoU) metric, also referred as the Jaccard index, is essentially a way to measure the quotient of the intersection and union of the prediction and the groundtruth.

Normally

## Dice
