---
title: 'Gentle Introduction to Markov Chain'
date: '2021-11-08'
tags: ['machine learning', 'reinforcement learning', 'markov chain']
featured: false
summary: "Markov Chain is a mathematical system to model a stochastic process in which the future state of the system depends only on the current state but not the past states."
# socialImage: '/images/life/20210417_stockholm_slussen.jpeg'
---
A Markov chain is a stochastic model describing a sequence of random events in which the future state of the system depends only on the current state, but not the past ones. It has many real-world applications such as in information theory, in the pagerank algorithm by Google, to, for instance, modeling the currency exchange rate.

Before we start diving into the details of Markov Chain, let's agree on some terminologies. Consider a Markov model describing a sequence of random variable $$X$$, the state of the model at time $$t = n$$ is denoted as $$X_n$$. The set of all possible states is $$S = \{s_1, s_2, \dots, s_n\}$$. We also denote $$\mathbb{P}$$ as the probability measure, this is different from the state transition matrix $$P$$ which we will go into below.

## Markov Property
In a nutshell, **Markov property**, a.k.a. *memoryless property*, says that the state of the system at time $$t = n+1$$ depends only on that at $$t = n$$ and not the others, i.e., $$t=0,\dots,n-1$$. It is expressed in terms of probability as below:
<div class="block-equation">
  $$\mathbf{P}\left(X_{n+1}=s_j \vert X_n = s_{n}\right) = \mathbf{P}\left(X_{n+1}=s_j \vert X_n = s_{n}, X_1=s_{1}, \dots, X_{n-1}=s_{n-1}\right)$$
</div>

<figure class="figure mx-auto w-full sm:w-1/2 p-2 flex flex-col items-center">
  <img src="/images/machine-learning/20211108-mc-fig1.png" alt="Markov chain transition graph">
  <figcaption class="text-sm font-sans text-gray-600 mt-4">Transition graph</figcaption>
</figure>

**Transition graph** is the graphical representation of a Markov chain in which the nodes are the states and the weights of the edges are probabilities of the transitions between states. In the graph above, when the system is in state $$s_1 = \text{sunny}$$, it has $$50\\%$$ chance to move to state $$s_2 = \text{rainy}$$, only $$10\\%$$ moving to state $$s_3 = \text{snowy}$$, and $$40\\%$$ chance of staying in the same state.
## Transition matrix

Let's consider a the weather prediction problem. And since I'm living in Stockholm, let's call it the *Stockholm weather* problem. For simplicity, let's assume that there are only three kinds of weather: sunny, rainy, and snowy. Sometimes, the weather of the next day can be predicted from the weather of the current day. This is an example of a Markov chain that has 3 states.

Some properties of $$P_{i,j}$$
* It is a square matrix where each of its rows sum to 1
* It is a [diagonalizable matrix](https://en.wikipedia.org/wiki/Diagonalizable_matrix)

## Irreducibility and aperiodicity

## Stationary distributions
A state distribution (i.e., a row in the transition matrix $$P$$) is said to be a **stationary distribution** if it satisfies
1. $$\pi_i \geq 0 $$ for $$i = 1, \dots, k$$ and $$\sum_{i=1}^k \pi_i = 1$$, and
2. $$\pi P = \pi$$, meaning that $$\sum_{i=1}^k \pi_i P_{i,j} = \pi_j$$ for $$j = 1, \dots, k$$

If a Markov chain is irreducible and aperiodic, it has exactly one stationary distribution. If so, how do we find this stationary distribution? If you look closer at the (2) property $$\pi P = \pi$$, you can see that
<div class="block-equation">
  $$\pi P = \pi \Leftrightarrow \left(\pi P \right)^T = \pi^T \Leftrightarrow = \pi^T P^T = \pi^T$$
</div>
This looks similar to $$M v = \lambda v$$, doesn't it? Indeed, $$v$$ is the eigenvector and $$\lambda$$ is the eigenvalue of the matrix $$M$$. Similarly, in this case $$\lambda = 1$$, $$\pi^T$$ is the eigenvector of the $$P^T$$. In other words, the stationary distribution $$\pi$$ is the left eigenvector of the state transition matrix $$P$$.

The stationary distribution gives information about the stability of the Markov chain, i.e., as the time $$t$$ goes to infinity, the chain converges to a distribution.

### References
This post is inspired by the following great videos, articles
1. But what is the Fourier Transform? A visual introduction.
