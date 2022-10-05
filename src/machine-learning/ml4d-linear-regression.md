---
title: 'Linear Regression'
date: '2022-10-05'
tags: ['ml4d', 'machine learning', 'interview prep']
featured: true
summary: "Linear regression is the simplest method for regression analysis. With current state of machine learning and deep learning, we might often overlook linear regression, but it remains a popular method in practice. In this article, we're going through the formulation of linear regression, implement it from scratch in Python, and look at a simple example where the method is used."
socialImage: '/images/machine-learning/20221005_linear_regression_fb_img.png'
---

Linear regression is the simplest method for regression analysis. With current state of machine learning and deep learning, we might often overlook linear regression, but it remains a popular method in practice. For instance, a linear regression model can be used to predict the sale price for an apartment from its properties after being trained on data about housing price. In this article, we're going through the formulation of linear regression, implement it from scratch in Python, and look at a simple example where the method is used.

## Formulation
### Problem statement
Linear regression is a supervised learning method that learns to model a dependent variable $$y$$ as a function of some independent variables, a.k.a, **features**, by finding the straight line that best fits the data. The data for linear regression comes as input/output pairs
<div class="block-equation">
  $$\mathcal{D} = \{ \left( \mathbf{x_1}, y_1 \right), \left( \mathbf{x_2}, y_2 \right), \dots, \left( \mathbf{x_N}, y_N \right)\}$$
</div>
where each input sample $$\mathbf{x}_i$$ is a vector of $$p$$ features, and the ouput $$y_i$$ is scalar-valued. In the simplest case, $$p = 1$$, i.e., the input has one feature, linear regression is like to drawing a straight trend line in a scatter plot. In general, however, $$p > 1$$ in which case the linear regression problem is analogous to fitting a hyperplane to a scatter points in $$p + 1$$ dimensional space.

<figure class="figure mx-auto w-full md:w-3/5 p-2 flex flex-col items-center">
  <img src="/images/machine-learning/20221005_linear_regression_1d_example.png" alt="Linear regression 1D example">
  <figcaption class="text-sm font-sans text-gray-600 mt-4">A simple example in which the input data is 1-dimensional</figcaption>
</figure>

<br />
Generally, the equation for linear regression for each data point is
<div class="block-equation">
  $$y = w_0 + w_1 x_1 + w_2 x_2 + \dots + w_p x_p + \epsilon$$
</div>
where $$w_j$$ is the coefficient of the model. The first coefficient $$w_0$$ is often called the *intercept* of the model. $$\epsilon$$ is the irreducable error that cannot be expressed by our model. As a side note, other people might denote the coefficient as $$\beta_j$$.

Since we have $$N$$ data points, the equation is often written in matrix form
<div class="block-equation">
  $$\mathbf{y} = \mathbf{XW} + \mathbf{\epsilon}$$
</div>
where $$X$$ is the matrix of input data, and $$\mathbf{W}$$ is the coefficient matrix, or the weight matrix. You might have realized that there is something off about this equation. $$X$$ is of dimension $$(N, p)$$, while $$\mathbf{W}$$ is of the dimension $$(p+1,)$$; hence, matrix multiplication won't work here. To solve this issue, we can insert a constant $$1$$ as the first column of the matrix $$\mathbf{X}$$. And now our matrices look like followings

<div class="block-equation">
$$\mathbf{X} = \begin{bmatrix} 1 & x_{11} & x_{12} & \dots & x_{1p} \\\\ 1 & x_{21} & x_{22} & \dots & x_{2p}\\\\ \vdots & \vdots & \vdots & \ddots & \vdots \\\\ 1 & x_{N1} & x_{N2} & \dots & x_{Np} \end{bmatrix}$$ $$\quad \mathbf{W} = \begin{bmatrix} \beta_0 \\\\ \beta_1 \\\\ \vdots \\\\ \beta_p \end{bmatrix}$$ $$\quad \mathbf{y} = \begin{bmatrix} y_1 \\\\ y_2 \\\\ \vdots \\\\ y_N \end{bmatrix}$$ $$\quad \mathbf{\epsilon} = \begin{bmatrix} \epsilon_1 \\\\ \epsilon_2 \\\\ \vdots \\\\ \epsilon_N \end{bmatrix}$$
</div>

Fitting a linear regression model is all about finding the best weights $$\mathbf{W}$$ that best model $$y$$ as a function of the input features. While we might never find the "true" weights, we can estimate them. We are going to look into two methods for estimating the weights below. But first, let's look at the loss function for our linear regression model.

### Loss function
The loss function quantifies how good or bad our linear regression model is. To train the model, we employ the **mean squared error** (MSE) as our loss function.
<div class="block-equation">
  $$\displaystyle MSE = \mathcal{L}\left(\mathbf{W}\right) = \frac{1}{2} \sum_{i=1}^N \left\vert y_i - \sum_{j=0}^p x_{ij} w_{j} \right\vert ^2 = \frac{1}{2} \lVert \mathbf{y} - \mathbf{X W} \rVert ^2_2 $$
</div>
We add a constant $$\frac{1}{2}$$ to the equation above to simplify the calculation of the gradient of this loss function, as shall be shown below. The square of the errors give more weight to points that are further from the regression line, thus, punishing more the outliners.

<figure class="figure mx-auto w-full md:w-3/5 p-2 flex flex-col items-center">
  <img src="/images/machine-learning/20221005_linear_regression_mse_illustration.png" alt="Linear regression 1D example">
  <figcaption class="text-sm font-sans text-gray-600 mt-4">A visual illustration of the MSE, the black points are the predictions, the size of the red squares indicates the magnitude of the MSE</figcaption>
</figure>

The optimal set of weights $$\mathbf{\hat{W}}$$ is the one that minize the loss function.
<div class="block-equation">
  $$\hat{\mathbf{W}} = \underset{\mathbf{W}}{\arg\min}~ \mathcal{L}\left(\mathbf{W}\right)$$
</div>


Our MSE loss function is a convex function; hence, we can find the optimal weights that minize the loss using methods such as Ordinary Least Squares (OLS) or Gradient Descent (GD).

### Parameter estimation with Ordinary Least Squares
Let's look closer at the loss function
<div class="block-equation">
  $$\begin{aligned} \mathcal{L}\left(\mathbf{W}\right) &= \frac{1}{2} \lVert \mathbf{y} - \mathbf{X W} \rVert ^2_2 \\\\ &= \frac{1}{2} \left(\mathbf{y} - \mathbf{X W}\right)^{\top} \left(\mathbf{y} - \mathbf{X W}\right) \\\\ &= \frac{1}{2} \left(\mathbf{y}^{\top} - \mathbf{W}^{\top}\mathbf{X}^{\top} \right) \left(\mathbf{y} - \mathbf{X W}\right) \\\\ &= \frac{1}{2} \left(\mathbf{y}^{\top}\mathbf{y} - \mathbf{y}^{\top}\mathbf{XW} - \mathbf{W}^{\top}\mathbf{X}^{\top}\mathbf{y} + \mathbf{W}^{\top}\mathbf{X}^{\top}\mathbf{X W}\right)\end{aligned}$$
</div>
Since the loss function is convex, the optimum solution lies at gradient zero. So now we derive the gradient of the loss function w.r.t to $$\mathbf{W}$$
<div class="block-equation">
  $$\begin{aligned}\displaystyle \frac{\partial \mathcal{L}}{\partial \mathbf{W}} &= \frac{1}{2} \frac{\partial \left( \mathbf{y}^{\top}\mathbf{y} - \mathbf{y}^{\top}\mathbf{XW} - \mathbf{W}^{\top}\mathbf{X}^{\top}\mathbf{y} + \mathbf{W}^{\top}\mathbf{X}^{\top}\mathbf{X W} \right)}{\partial \mathbf{W}} \\\\ &= \frac{1}{2} \left( -\mathbf{y}^{\top}\mathbf{X} - \mathbf{X}^{\top}\mathbf{y} + 2\mathbf{X}^{\top}\mathbf{X W} \right) \\\\ &= \frac{1}{2} \left( -2\mathbf{X}^{\top}\mathbf{y} + 2\mathbf{X}^{\top}\mathbf{X W} \right) \\\\ &=  \mathbf{X}^{\top}\mathbf{y} + \mathbf{X}^{\top}\mathbf{X W} \end{aligned}$$
</div>
Solve this equation equals to $$0$$, we get
<div class="block-equation">
  $$\begin{aligned} -\mathbf{X}^{\top}\mathbf{y} + \mathbf{X}^{\top}\mathbf{X W} &= 0 \\\\ \mathbf{X}^{\top}\mathbf{X W} &= \mathbf{X}^{\top}\mathbf{y} \\\\ \mathbf{W} &=  \left(\mathbf{X}^{\top}\mathbf{X}\right)^{-1}\mathbf{X}^{\top}\mathbf{y} \end{aligned}$$
</div>
If you're still mathematically curious, we can use the Gauss-Markov theorem to prove that the set of coefficients $$\mathbf{W}$$ obtained in the equation above is optimal.

### Parameter estimation with Gradient Descent
Again, as the MSE loss function is a convex function; GD can have a chance to find the optimal minimum. Let's modify the equation for the gradient a bit
<div class="block-equation">
  $$\begin{aligned}\displaystyle \frac{\partial \mathcal{L}}{\partial \mathbf{W}} &= -\mathbf{X}^{\top}\mathbf{y} + \mathbf{X}^{\top}\mathbf{X W} \\\\ \nabla \mathbf{W} &= -\mathbf{X}^{\top} \left(\mathbf{y} + \mathbf{XW} \right) = -\left( \mathbf{XW} - \mathbf{y} \right)^{\top} \mathbf{X} \\\\ \nabla \mathbf{W} &= \left(\hat{\mathbf{y}} - \mathbf{y}\right)^{\top}\mathbf{X}\end{aligned}$$
</div>

Having devised the gradient of our loss function, the update equation of the GD algorithm is
<div class="block-equation">
  $$\mathbf{W} = \mathbf{W} - \eta * \left( \hat{\mathbf{y}} - \mathbf{y} \right)^{\top} \mathbf{W}$$
</div>
where $$\eta$$ is the learning rate.

### Assumptions of Linear Regression model
For completeness of the topic, we list several assumptions made by the linear regression model. It is, however, worth to note that in machine learning, we often care about how well our model generalizes on unseen data rather than which assumptions it makes.

*

## Implementation in Python
I hope that at this point you can convince yourself that implementing linear regression in Python is simple. Indeed, the main work is to implement the estimation of the weights $$\mathbf{W}$$.

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
            grad_w = (y_pred - y).dot(X)
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

As a small note, you probably see that in the code above, when computing the gradient of $$\mathbf{W}$$, the equation is $$(\hat{\mathbf{y}} - \mathbf{y})\mathbf{X}$$, i.e., there is no transpose. This is because $$(\hat{\mathbf{y}} - \mathbf{y})$$ is a column vector, and in Jax (or numpy), it is the same as its transpose.

Let's test our implementation by comparing the performance of our model with sklearn linear regression. To that end, we'll generate a synthetic regression dataset containing of $$100$$ samples, each has 5 features. To make it a bit more realistic, we add some noise to our data. We then train our model and sklearn model on this dataset, and compare their MSE loss on the test data.

```python
# Create the dataset, and split into train/test
import jax.numpy as jnp
from sklearn import linear_model
from sklearn.datasets import make_regression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error

# Create the dataset
X, y = make_regression(n_samples=100, n_features=5, n_targets=1, noise=10, n_informative=3, random_state=0)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=0)
```

It is worth to note that for linear regression to work well, the data (both indepedent and dependent variables) is expected to be standardized so that it has zero mean and unit variance. For the sake of simplicity, our naive implementation doesn't preprocess or normalize the input data as done by sklearn internally. Thus, if you try to fit both models with the original data, our implementation will perform much worse than the sklearn model.

```python
from sklearn.preprocessing import StandardScaler

scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
y_train = scaler.fit_transform(y_train.reshape(-1,1)).squeeze()
X_test = scaler.fit_transform(X_test)
y_test = scaler.fit_transform(y_test.reshape(-1,1)).squeeze()
```

Now let's fit our models and compare their MSE losses
```python
our_model = LinearRegression(gradient_descent=False)
our_model.fit(X_train, y_train)
y_pred = our_model.predict(X_test)
our_mse = mean_squared_error(y_test, y_pred)

sk_model = linear_model.LinearRegression()
sk_model.fit(X_train, y_train)
y_pred = sk_model.predict(X_test)
sk_mse = mean_squared_error(y_test, y_pred)

print("Our MSE", our_mse)
print("sklearn MSE", sk_mse)
```

You will see
```bash
Our MSE 0.05489263561901949
sklearn MSE 0.05489265388693939
```
And voila! Our implementation has comparable MSE loss with the sklearn linear regression model. So we can be more confident that our implementation is correct.

Let's take one step further and compare the weights (a.k.a, coefficients) estimated by our model and sklearn model. Another small detail before we see the results, in our implementation, the intercept term $$w_0$$ is included in the first column the weight matrix $$\mathbf{W}$$. However, in sklearn implementation, the intercept and the coefficients are two separate properties of the model. This is just small implementation difference, both our model and sklearn model use OLS to estimate the parameters of the model.

```python
our_W = our_model.W
sk_W = jnp.insert(sk_model.coef_, 0, sk_model.intercept_)

# Check if they are close enough
assert jnp.allclose(our_W, sk_W, atol=1e-6)
# Let's see them
print(our_W)
print(sk_W)

# Result
# [-1.4901161e-08, 3.8675654e-01, 1.1661135e-02, 9.1414082e-01, -1.2352731e-02, 3.9635855e-01]
# [9.2858104e-18,  3.8675651e-01, 1.1661145e-02, 9.1414082e-01, -1.2352731e-02, 3.9635855e-01]
```
Indeed, the weights are almost similar, except for the intercept terms. But they are very small, close to 0.

That's it for the implementation of Linear Regression from scratch. I hope you would also feel the joy of understanding an algorithm and implementing it from scratch and seeing it works.

## Real-world problem
