---
title: 'Linear Regression'
date: '2022-10-01'
tags: ['ml4d', 'machine learning', 'interview prep']
featured: true
summary: "In this article, we're going through several popular metrics used to evaluate the performance of object detection models for images."
socialImage: '/images/machine-learning/20220813-detection-fb-og.png'
---

This is an article in the ML4D &mdash; Cracking the Machine Learning Interview series

Linear regression is a simple model to predict a numeric response from a set of independent variables. In the era of deep learning, linear regression might be overlooked. Nonetheless, it's still widely used in practice due to its simplicity. In this article, we're going to explain some important ideas behind this model, and implement it from scratch in Python.

## Overview
Linear regression is a supervised learning method that learns to model a dependent variable $$y$$ as a function of some independent variables, a.k.a, **features**, $$x_i$$ by finding the best straight line that fits the data.

Generally, the equation for linear regression is
<div class="block-equation">
  $$y = \beta_0 + \beta_1 x_1 + \beta_2 x_2 + \dots + \beta_p x_p + \epsilon$$
</div>

We can insert a constant $$1$$ as the first column of the features, and the equation above can be rewritten in matrix form as

<div class="block-equation">
  $$\mathbf{y} = \mathbf{XW} + \epsilon$$
</div>

where
* $$\mathbf{X} = \begin{bmatrix} 1 & x_{11} & x_{12} & \dots & x_{1p} \\\\ 1 & x_{21} & x_{22} & \dots & x_{2p}\\\\ \vdots & \vdots & \vdots & \ddots & \vdots \\\\ 1 & x_{n1} & x_{n2} & \dots & x_{np} \end{bmatrix}$$ $$\quad \mathbf{W} = \begin{bmatrix} \beta_0 \\\\ \beta_1 \\\\ \vdots \\\\ \beta_p \end{bmatrix}$$ $$\quad \mathbf{y} = \begin{bmatrix} y_1 \\\\ y_2 \\\\ \vdots \\\\ y_n \end{bmatrix}$$

Fitting a linear regression model is all about finding the set of coefficients that best model $$y$$ w.r.t to $$x_i$$. While we might not find the true set of coefficients (i.e., parameters), we can estimate them using different approaches. In the next sections, I'll present two of those approaches, namely _ordinary least square_ and _gradient descent_ .

<div class="block-equation">
  $$\hat{\mathbf{W}} = \underset{\mathbf{W}}{\arg\min}~ S\left(\mathbf{W}\right)$$
</div>
where the loss function $$S(.)$$ is the mean squared error function
<div class="block-equation">
  $$\displaystyle MSE = S\left(\mathbf{W}\right) = \sum_{i=1}^n \left\vert y_i - \sum_{j=1}^p x_{ij} \beta_{j} \right\vert ^2 = \lVert \mathbf{y} - \mathbf{X W} \rVert ^2_2 $$
</div>


## Parameter estimation with Ordinary Least Square
Let's look closer at the loss function
<div class="block-equation">
  $$\begin{align*} S\left(\mathbf{W}\right) &= \lVert \mathbf{y} - \mathbf{X W} \rVert ^2_2 \\\\ &= \left(\mathbf{y} - \mathbf{X W}\right)^{\top} \left(\mathbf{y} - \mathbf{X W}\right) \end{align*}$$
</div>
