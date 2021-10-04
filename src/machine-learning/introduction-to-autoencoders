---
title: 'Introduction to Autoencoders'
date: '2021-09-13'
tags: ['machine learning']
featured: true  # Update later
summary: "Autoencoders are a type of neural network that learns lower-dimensional representation of the input."
socialImage: '/images/machine-learning/20210922-autoencoders-fbimg.png'
---

An **autoencoder** is a neural network for unsupervised learning that learns to attempt to copy its input to its output. Essentially, it tries to learn an identity function. This might sound trivial, even useless. However, by training autoencoders to perform this task, we hope they will also learn useful **hidden representation** or **code** $$\mathbf{z}$$ of the data.
<!-- An **autoencoder** is a neural network that learns to copy its input to its output. The architecture of autoencoders follows the encoder-decoder framework in which the encoder maps the input $$\mathbf{x}$$ to a hidden representation or ***code*** $$\mathbf{z}$$, and the decoder uses this code to produce output $$\mathbf{\hat{x}}$$ - the reconstruction of $$\mathbf{x}$$. One might think that learning to copy input to output is useless, but we're generally not interested in the output of the autoencoder. Instead, we hope that by training an autoencoder to perform this task, it can learning useful representation $$\mathbf{z}$$. -->

<figure class="figure mx-auto w-full sm:w-2/3 p-2 flex flex-col items-center">
  <img src="/images/machine-learning/20210922-autoencoders-fig1.png" alt="Autoencoder architecture">
  <figcaption class="text-sm font-sans text-gray-600 mt-4">Architecture of Autoencoder</figcaption>
</figure>

The general architecture of an autoencoder is shown in the figure above. Specifically, it is comprised of an encoder function $$f\left(\mathbf{x}\right)$$ that maps the input $$\mathbf{x}$$ to the code $$\mathbf{z}$$, and a decoder function $$g\left(\mathbf{z}\right)$$ that produces the output $$\mathbf{\hat{x}}$$, a **reconstruction of $$\mathbf{x}$$**. The network learns to minize a reconstruction loss $$\mathcal{L}\left(\mathbf{x}, \mathbf{\hat{x}}\right)$$ such as the $$\mathcal{L}_2$$ norm, i.e., $$\mathcal{L}\left(\mathbf{x}, \mathbf{\hat{x}}\right) = \text{\textbardbl} \mathbf{x} - \mathbf{\hat{x}} \text{\textbardbl} ^2$$.

The choice of $$f$$ and $$g$$ determines the complexity of code $$\mathbf{z}$$ that the autoencoder an learn. In their simplist form, i.e. $$f$$ and $$g$$ are single-layer feedforward neural networks with linear activation, autoencoder learns a representation that is similar to that of a PCA (i.e., the principal components of the data). Once we introduce nonlinear activation to $$f$$ and $$g$$, the autoencoder can learn richer representation of code $$\mathbf{z}$$.

In this post, I'm going to cover some typical types of autoencoders.

## Undercomplete Autoencoders
An autoencoder is **undercomplete** if the dimensionality of the code $$\mathbf{z}$$ is smaller than $$\mathbf{x}$$. In this case, the autoencoder learns to *compress* the information from the input by selecting the most salient features in $$\mathbf{x}$$.

While autoencoder can compress data, its compression is **data-dependent**. An autoencoder trained to compress images of cat would not perform well on images of dog since the features it learns are specific to cat. This is different to a general compression algorithm such as <a href="https://en.wikipedia.org/wiki/JPEG" target="_blank" class="link">JPEG</a>, which holds general concept about "images" but not any particular type of image. Therefore, autoencoder is rarely used to compress data. It is the hidden code $$\mathbf{z}$$ that we're interested in, and can be used for other tasks such as classification.

To learn a good representation, an autoencoder must balance between
* Simple
* Ignorance

One way to achieve this trade-off is to introduce a *regularizer* term to encourage the model to learn other properties besides copying data.

<div class="block-equation">
  $$\mathcal{L}\left(\mathbf{x}, \mathbf{\hat{x}}\right) + \text{regularizer}$$
</div>

The *regularizer* term can be used to

## Sparsed Autoencoders

## Contractive Autoencoders

## Denoising Autoencoders

### References
This blog post is greatly inspired by the following articles, tutorials and lectures:
1. <a href="https://www.jeremyjordan.me/autoencoders/" target="_blank" class="hover-link">Introduction to Autoencoders</a> by Jeremy Jordan
2. <a href="https://blog.keras.io/building-autoencoders-in-keras.html" target="_blank" class="hover-link">Building Autoencoders in Keras</a> by Francois Chollet
