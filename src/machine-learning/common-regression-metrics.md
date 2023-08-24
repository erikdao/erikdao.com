---
title: 'Common metrics for evaluating regression models'
date: '2023-08-22'
tags: ['machine learning', 'ml fundamentals', 'metrics']
featured: true
summary: "In this article, we're going to look at some of the most popular evaluation metrics for regression models, and what they indicates. Those metrics include Mean Absolute Error, Mean Squared Error and R-Squared."
socialImage: '/images/machine-learning/20220813-detection-fb-og.png'
---

Regression is common machine learning problem in which the model tries to predict outputs of continuous values from the inputs.

## Mean Absolute Error

As its name indicates, Mean Absolute Error is the mean of the absolute residuals in the whole data set.
<div class="block-equation">
  $$\text{MAE} = \displaystyle \frac{1}{N} \sum_{i=1}^{N} \lvert \hat{y_i} - y_i \rvert$$
</div>

Some properties of MAE:
* Because of the absolution, underforcasting and overforecast errors are the same
* Also because of absolution, it's tricky to differentiate MAE, making it not a good choice as a loss function for optimizing regression models.
*
## Mean Squared Error

## R-Squared
