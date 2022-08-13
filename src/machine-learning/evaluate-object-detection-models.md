---
title: 'Evaluating Object Detection Models'
date: '2022-08-12'
tags: ['machine learning', 'object detection', 'metrics']
featured: true
summary: "In this article, we're going through several popular metrics used to evaluate the performance of object detection models for images."
---

Object detection is one of the most fundamental tasks in computer vision. The goal of a detection model is to place bounding boxes correctly around objects of predefined classes in an image. A detection is consisted of three components: a **bounding box**, a **class label** and a **confidence score**. The class label often belongs to a set of predefined object categories, and the confidence score is the probability of the bounding box belonged to that class. Examples of detection results are visualized below.

<figure class="figure mx-auto w-full p-2 flex flex-col items-center">
  <img src="/images/machine-learning/20220813-detection-visualization.png" alt="Detection result">
  <figcaption class="text-sm font-sans text-gray-600 mt-4">Visualization of detection result for <a href="http://images.cocodataset.org/val2017/000000350405.jpg" target="_blank">an image</a> in the COCO validation set</figcaption>
</figure>

As the field has been studied extensively over the past several decades, the research community seems to have agreed on several standard evaluation metrics. The detection evaluation metrics quantify the performance of the detection algorithms/models. They measure how close the detected bounding boxes are to the ground-truth bounding boxes.

## Bounding box format

The bounding box is a rectangle covering the area of an object. *I mean, it sounds pretty trivial, doesn't it?* However, there is no consensus of a standard format of what a bounding box is represented in practice. In fact, each dataset defines their own format of bounding boxes. There are at least three popular format:

* The Pascal VOC dataset presents each bounding box with its top-left and bottom-right pixel coordinates.
* In the COCO dataset, each bounding box is in the format of $$[x, y, w, h]$$ where $$[x, y]$$ is the top-left pixel coordinate, and $$w$$ and $$h$$ are the absolute width and height of the box, respectively.
* Other datasets, such as Open Image, defines the format of their bounding boxes as $$[x_c, y_c, w_{\mathrm{rel}}, h_{\mathrm{rel}}]$$, where $$[x_c, y_c]$$ is the normalized coordinates of the center of the box, and $$w_{\mathrm{rel}}$$ and $$h_{\mathrm{rel}}$$ are the relative width and height of box, normalized by the width and height of the image respectively.

These nuances often create confusions and require extra attention when working with different datatsets, as well as interpreting the detection results of the models on the corresponding dataset.

## Intersection over Union

Let's ignore the confidence score for a moment, a perfect detection is the one whose predicted bounding box has the area and location exactly same as the ground-truth bounding box. **Intersection over Union (IoU)** is the measure to characterize these two conditions of a predicted bounding box. It is the base metric for most of the evaluation metrics for object detection.

As its name indicates, IoU is the ratio between the area of intersection and the area of union between a predicted box $$\hat{b}$$ and a ground-truth box $$b$$, as illustrated in the figure below
<figure class="figure mx-auto w-full sm:w-2/3 p-2 flex flex-col items-center">
  <img src="/images/machine-learning/20220813-iou.svg" alt="Intersection over Union">
  <figcaption class="text-sm font-sans text-gray-600 mt-4">Illustration of the Intersection over Union (IoU)</figcaption>
</figure>

IoU is stemmed from the Jaccard Index, a coefficient measure the similarity between two finite sample sets.

<div class="block-equation">
  $$J \left( b, \hat{b} \right) = \mathrm{IoU} = \displaystyle \frac{\mathrm{area} \left( b \cap \hat{b} \right)}{\mathrm{area} \left( b \cup \hat{b} \right)}$$
</div>

IoU varies between $$0$$ and $$1$$. An $$\mathrm{IoU} = 1$$ means a perfect match between prediction and ground-truth, while $$\mathrm{IoU} = 0$$ means the predicted and the ground-truth boxes do not overlap. By varying the threshold $$\mathrm{IoU} = \epsilon$$ we can control how restrictive or relaxing the metric is. Moreover, this threshold is used to decide if a detection is correct or not. A correct, or positive, detection has $$\mathrm{IoU} \geq \epsilon$$, otherwise, the detection is an incorrect, or negative one. More formally, predictions are classified as **True Positive** (TP), **False Positive** (FP) and **False Negative** (FN)

* True positive (TP): A correct detection of the ground-truth bounding box;
* False positive (FP): An incorrect detection of a non-existing object or a misplaced detection of an existing object;
* False negative (FN): An undetected ground-truth bounding box.

<figure class="figure mx-auto w-full p-2 flex flex-col items-center">
  <img src="/images/machine-learning/20220813-tpfpfn.png" alt="Intersection over Union">
  <figcaption class="text-sm font-sans text-gray-600 mt-4">Illustration of the Intersection over Union (IoU)</figcaption>
</figure>

## Precision and Recall

These two concepts are originated from information retrieval
