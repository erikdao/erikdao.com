---
title: 'Linear Regression (Revisited)'
date: '2023-10-02'
tags: ['machine learning', 'interview prep']
featured: true
summary: "In this post, we're revisiting linear regression as a basic model used as a baseline for many machine learning problems. We'll see two different point of views on linear regression, i.e., the machine learning point of view and the statistics one."
socialImage: '/images/machine-learning/20221005_linear_regression_fb_img.png'
---

Linear regression, a fundamental and popular tools used in data science, can be looked at through two different lenses: that of machine learning and statistics. In this blog post, weäll explore linear regression from both these engles, dissecting how it's ultilized in both worlds. Whether you're more inclined towards data-driven algorithms or traditional statistical methods, let's dive into it together through the key differences and similarities.

## Linear Regression as a Statistical method
In statistic, linear regression is a method to model the relationship between observed variables. Given an input vector $$\mathbf{X}^\top = \left( X_1, X_2, \dots, X_p \right)$$, and a real-value output $$Y$$, the model has the form
<div class="block-equation">
  $$Y = f\left(\mathbf{X}\right) = \displaystyle \beta_0 + \sum_{j=1}^{p} X_j \beta_j$$
</div>
where $$\beta_j$$ are unknown parameters or <em>coefficients</em> for which we want to estimate from the data. The input $$X_j$$ can come from different sources:

* quantitative inputs
* transformations of quantitive inputs, e.g., log, square or square-root
* basic expansions, e.g., $$X_2 = X_1 ^2, X_3 = X_1^3$$
* interaction between variables, e.g., $$X_3 = X_1 . X_2 $$


In a typical setting, we want to estimate the coefficients from some training data $$\left(x_1, y_1\right), \dots, \left(x_N, y_N\right)$$. Each sample $$x_i = \left( x_{i1}, x_{i2}, \dots, x_{ip}\right)^\top$$ is a vector containing $$p$$ features. The most popular method for estimating $$\beta$$ is <em>least square</em>, in which we pick the coefficients $$\beta_0, \beta_1, \dots, \beta_p$$ to minimize the residual sum of squares (RSS)
<div class="block-equation">
  $$\text{RSS} \left( \beta \right) = \displaystyle \sum_{i=1}^N \left( y_i - \hat{y}_i \right)^2 = \sum_{i=1}^N \left( y_i - f\left(x_i\right) \right)^2 \\ = \displaystyle \sum_{i=1}^N \left( y_i -  \beta_0 - \sum_{j=1}^{p} x_{ij} \beta_j\right)^2$$
</div>
As we can see from the equation above, the <em>residual</em> is simply the difference between the predicted and actual output.

How do we minimize the RSS? Let's get hands-on with some maths. First denote $$\mathbf{X}$$ as matrix of dimension $$N \times (p + 1)$$ whose each row represents an input vector, and $$\mathbf{y}$$ is the output vector of size $$N$$.
<div class="block-equation">
  $$\text{RSS} \left( \beta \right) = \displaystyle \left(\mathbf{y} - \mathbf{X} \beta \right)^\top \left(\mathbf{y} - \mathbf{X} \beta \right)$$
</div>
This is a quadratic function; hence, to find the parameter $$\beta$$ that minimizes the function, we find the solution $$\beta$$ when setting the first derivative of the function to $$0$$. Differentiating RSS w.r.t to $$\beta$$, we have
<div class="block-equation">
  $$\displaystyle \frac{\partial \text{RSS}}{\partial \beta} = -2 \mathbf{X}^\top \left(\mathbf{y} - \mathbf{X} \beta \right)$$
</div>
Setting the first derivative to $$0$$, and solve for $$\beta$$ we obtain
<div class="block-equation">
  $$\begin{aligned} \displaystyle \frac{\partial \text{RSS}}{\partial \beta} = -2 \mathbf{X}^\top \left(\mathbf{y} - \mathbf{X} \beta \right) &= 0 \\ \mathbf{X}^\top \mathbf{y} -  \mathbf{X}^\top \mathbf{X} \beta &= 0 \\ \mathbf{X}^\top \mathbf{X} \beta &= \mathbf{X}^\top \mathbf{y} \\ \beta &= \left( \mathbf{X}^\top \mathbf{X} \right)^{-1} \mathbf{X}^\top \mathbf{y} \end{aligned} \\ $$
</div>
The solution above is made with an assumption that matrix $$\mathbf{X}$$ has full column rank, i.e., there is no column in $$\mathbf{X}$$ that depends on any other column. (For those who want to entertain with the step-by-step explainations of the result, see the Supplementary section at the end of this post.)


Once we have estimated the coefficients $$\beta$$, given a new input vector $$x_0$$, the output is computed as $$f\left( x_0 \right) = \left( 1: x_0 \right) \beta$$. Note that we prepend a column containing $$1$$ to $$x_0$$.

For curious readers, there are mulitiple methods to estimate parameters $$\beta$$. However, the [Gauss-Markov theorem](https://en.wikipedia.org/wiki/Gauss%E2%80%93Markov_theorem) states that least squares estimates of the paramters $$\beta$$ have lowest variance amongst all linear unbiased estimates. Therefore, least square estimation is a common statistical method for estimating the parameters of the linear regression model. For this method to work, there are several assumptions made:

1. **Linearity**
2. **Full rank**
3. **Zero Conditional Mean of Error**
4. **Homoscedascity**
5. **Non-autocorrelation**
6. **Normality**


## Linear Regression as a Machine Learning model


## Supplementary

### Derivative of RSS w.r.t. to $$\beta$$

* Start by expanding the equation for RSS, and utilizing a simple rule when multiplying the transpose of matrices $$(\mathbf{A}\mathbf{B})^\top = \mathbf{B}^\top \mathbf{A}^\top$$
<div class="block-equation">
  $$\begin{aligned} \text{RSS} \left( \beta \right) &= \displaystyle \left(\mathbf{y} - \mathbf{X} \beta \right)^\top \left(\mathbf{y} - \mathbf{X} \beta \right) \\ &= \mathbf{y}^\top \mathbf{y} - \mathbf{y}^\top \mathbf{X} \beta - \beta^\top \mathbf{X}^\top \mathbf{y} + \beta^\top \mathbf{X}^\top \mathbf{X} \beta \end{aligned}$$
</div>

* Compute the partial derivative of RSS w.r.t to $$\beta$$. Note that the partial derivative w.r.t $$\beta$$ of a term that doesn't contain $$\beta$$ is $$0$$.
<div class="block-equation">
$$\begin{aligned} \frac{\partial \text{RSS}}{\partial \beta} &= \frac{\partial \left( \mathbf{y}^\top \mathbf{y} - \mathbf{y}^\top \mathbf{X} \beta - \beta^\top \mathbf{X}^\top \mathbf{y} + \beta^\top \mathbf{X}^\top \mathbf{X} \beta \right)}{\partial \beta} \\ &= - \mathbf{y}^\top \mathbf{X} - \mathbf{X}^\top \mathbf{y} + 2 \mathbf{X}^\top \mathbf{X} \beta \\ &= -2 \mathbf{X}^\top \mathbf{y} + 2 \mathbf{X}^\top \mathbf{X} \beta \end{aligned}$$
</div>

The partial derivative $$\frac{\partial \beta^\top \mathbf{X}^\top \mathbf{X} \beta}{\partial \beta} = 2 \mathbf{X}^\top \mathbf{X} \beta$$ as the matrix $$\mathbf{X}^\top \mathbf{X}$$ is a symmetric matrix (See [this link](https://en.wikipedia.org/wiki/Matrix_calculus#Scalar-by-vector_identities) and [this link](https://en.wikipedia.org/wiki/Transpose#Products))

* Set the first derivative to $$0$$
<div class="block-equation">
$$\begin{aligned} -2 \mathbf{X}^\top \mathbf{y} + 2 \mathbf{X}^\top \mathbf{X} \beta &= 0 \\ \mathbf{X}^\top \mathbf{X} \beta &= \mathbf{X}^\top \mathbf{y} \end{aligned}$$
</div>

## References
* [Assumptions in OLS Regression](https://towardsdatascience.com/assumptions-in-ols-regression-why-do-they-matter-9501c800787d) - Ayan Ghosh
