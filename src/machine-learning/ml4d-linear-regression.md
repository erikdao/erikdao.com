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
  $$\displaystyle MSE = S\left(\mathbf{W}\right) = \frac{1}{2} \sum_{i=1}^n \left\vert y_i - \sum_{j=1}^p x_{ij} \beta_{j} \right\vert ^2 = \frac{1}{2} \lVert \mathbf{y} - \mathbf{X W} \rVert ^2_2 $$
</div>
We add a constant $$\frac{1}{2}$$ to the equation above to simplify the calculation of the gradient of this loss function, as shall be shown below.

## Parameter estimation with Ordinary Least Square
Let's look closer at the loss function
<div class="block-equation">
  $$\begin{aligned} S\left(\mathbf{W}\right) &= \frac{1}{2} \lVert \mathbf{y} - \mathbf{X W} \rVert ^2_2 \\\\ &= \frac{1}{2} \left(\mathbf{y} - \mathbf{X W}\right)^{\top} \left(\mathbf{y} - \mathbf{X W}\right) \\\\ &= \frac{1}{2} \left(\mathbf{y}^{\top} - \mathbf{W}^{\top}\mathbf{X}^{\top} \right) \left(\mathbf{y} - \mathbf{X W}\right) \\\\ &= \frac{1}{2} \left(\mathbf{y}^{\top}\mathbf{y} - \mathbf{y}^{\top}\mathbf{XW} - \mathbf{W}^{\top}\mathbf{X}^{\top}\mathbf{y} + \mathbf{W}^{\top}\mathbf{X}^{\top}\mathbf{X W}\right)\end{aligned}$$
</div>
It turns out that this loss function is a convex function, which means that the optimall solution lies at the point where the gradient is zero. Let's look at the gradient of the function w.r.t to $$\mathbf{W}$$ then
<div class="block-equation">
  $$\begin{aligned}\displaystyle \frac{\partial S}{\partial \mathbf{W}} &= \frac{1}{2} \frac{\partial \left( \mathbf{y}^{\top}\mathbf{y} - \mathbf{y}^{\top}\mathbf{XW} - \mathbf{W}^{\top}\mathbf{X}^{\top}\mathbf{y} + \mathbf{W}^{\top}\mathbf{X}^{\top}\mathbf{X W} \right)}{\partial \mathbf{W}} \\\\ &= \frac{1}{2} \left( -\mathbf{y}^{\top}\mathbf{X} - \mathbf{X}^{\top}\mathbf{y} + 2\mathbf{X}^{\top}\mathbf{X W} \right) \\\\ &= \frac{1}{2} \left( -2\mathbf{X}^{\top}\mathbf{y} + 2\mathbf{X}^{\top}\mathbf{X W} \right) \\\\ &=  \mathbf{X}^{\top}\mathbf{y} + \mathbf{X}^{\top}\mathbf{X W} \end{aligned}$$
</div>
Solve this equation equals to $$0$$, we get
<div class="block-equation">
  $$\begin{aligned} -\mathbf{X}^{\top}\mathbf{y} + \mathbf{X}^{\top}\mathbf{X W} &= 0 \\\\ \mathbf{X}^{\top}\mathbf{X W} &= \mathbf{X}^{\top}\mathbf{y} \\\\ \mathbf{W} &=  \left(\mathbf{X}^{\top}\mathbf{X}\right)^{-1}\mathbf{X}^{\top}\mathbf{y} \end{aligned}$$
</div>
If you're still mathematically curious, we can use the Gauss-Markov theorem to prove that the set of coefficients $$\mathbf{W}$$ obtained in the equation above is optimal.

## Parameter estimation with Gradient Descent
The main reason I include this section about GD is that it seems to be more reasonable in an interview to ask a candidate to implement Linear Regression from scratch using GD rather than testing if they remember the least squares solution.
As shown above, the loss function, MSE, is a convex function; therefore, GD can have a chance to find the optimal minimum. To use GD, we need to know the form of the gradient of the loss function w.r.t to the parameter $$\mathbf{W}$$. Let's look at it again

<div class="block-equation">
  $$\begin{aligned}\displaystyle \frac{\partial S}{\partial \mathbf{W}} &= -\mathbf{X}^{\top}\mathbf{y} + \mathbf{X}^{\top}\mathbf{X W} \\\\ \nabla \mathbf{W} &= -\mathbf{X}^{\top} \left(\mathbf{y} + \mathbf{XW} \right) = -\left( \mathbf{XW} - \mathbf{y} \right)^{\top} \mathbf{X} \\\\ \nabla \mathbf{W} &= \left(\hat{\mathbf{y}} - \mathbf{y}\right)^{\top}\mathbf{X}\end{aligned}$$
</div>

Having devised the gradient of our loss function, the update equation of the GD algorithm is
<div class="block-equation">
  $$\mathbf{W} = \mathbf{W} - \eta * \left( \hat{\mathbf{y}} - \mathbf{y} \right)^{\top} \mathbf{W}$$
</div>
where $$\eta$$ is the learning rate.

## Implementation in Python
```python
import jax.numpy as jnp
from jax import random

class LinearRegression():

  def __init__(self, seed=0, gradient_descent=True, lr=0.01, n_iterations=100):
    self.gradient_descent = gradient_descent
    self.lr = lr
    self.n_iterations = n_iterations
  
    self._key = random.PRNGKey(seed)

  def _initialize_weights(self, X, y):
    N, m = X.shape
    self.W = random.uniform(self._key, shape=(m,), minval=-1 / N, maxval=1 / N)

  def fit(self, X, y):
    X = jnp.insert(X, 0, 1, axis=1)
    self._initialize_weights(X, y)
    if self.gradient_descent:
        for _ in range(self.n_iterations):
            y_pred = X.dot(self.W)
            grad_w = -(y - y_pred).dot(X)
            self.W = self.W - self.lr * grad_w
    else:
        # Least-square to estimate model's parameters
        X_T_inv = jnp.linalg.inv(jnp.dot(X.T, X))
        self.W = X_T_inv.dot(X.T).dot(y)

  def predict(self, X):
    # insert constant 1 at the beginning of each row in X for the biases
    X = jnp.insert(X, 0, 1, axis=1)
    return jnp.dot(X, self.W)
```

## Interview questions