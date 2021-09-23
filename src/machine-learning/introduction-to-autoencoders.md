---
title: 'Introduction to Autoencoders'
date: '2021-09-13'
tags: ['machine learning']
featured: true  # Update later
summary: "Autoencoders are a type of neural network that learns lower-dimensional representation of the input."
socialImage: '/images/machine-learning/20210922-autoencoders-fbimg.png'
---

An **autoencoder** is a neural network that learns to copy its input to its output. The architecture of autoencoders follows the encoder-decoder framework in which the encoder maps the input $$\mathbf{x}$$ to a hidden representation or ***code*** $$\mathbf{z}$$, and the decoder uses this code to produce output $$\mathbf{\hat{x}}$$ - the reconstruction of $$\mathbf{x}$$. One might think that learning to copy input to output is useless, but we're generally not interested in the output of the autoencoder. Instead, we hope that by training an autoencoder to perform this task, it can learning useful representation $$\mathbf{z}$$.

<figure class="figure mx-auto w-full sm:w-2/3 p-2 flex flex-col items-center">
  <img src="/images/machine-learning/20210922-autoencoders-fig1.png" alt="Autoencoder architecture">
  <figcaption class="text-sm font-sans text-gray-600 mt-4">Architecture of Autoencoder</figcaption>
</figure>

Autoencoder is a way to use supervised learning to do unsupervised learing.
## Undercomplete Autoencoders

## Sparse Autoencoders

## Denoising Autoencoders
