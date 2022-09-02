---
title: 'RL101 - What is Reinforcement Learning?'
date: '2021-11-29'
tags: ['machine learning', 'reinforcement learning']
featured: false
summary: "Reinforcement Learning has been an exciting and fast-growing field within the machine learning community over the past decade. The idea is to teach an agent (e.g., a robot) to learn to perform actions by itself through a system of rewards. In this first post of a series on reinforcement learning, I'm going through some basic and popular concepts, learning algorithms in reinforcement learning."
---

Reinforcement Learning has been an exciting and fast-growing field within the machine learning community over the past decade. The idea is to teach an agent (e.g., a robot) to learn to perform actions by itself through a system of rewards. In this first post of a series on reinforcement learning, I'm going through some basic and popular concepts, learning algorithms in reinforcement learning.

trial-and-error and delayed rewards
trade-off between exploration and exploitation

## Elements of Reinforcement Learning
### Agent

### Environment

### Policy
A *policy* - $$\pi$$ - is a mapping from states to actions at given a time. The policy is the core of an agent in the sense that it's sufficient to determine the behavior of the agent. Policy is often stochastic, and is expressed in term of probabilities.

### Reward
The *reward* is the goal of a reinforcement learning problem. At each time step, by taking an action, the agent obtains some rewards from the environment. The agent's objective is to maximize the total rewards it receives in the long run. Generally, the reward is often a function of state and action and is denoted as $$r_t(s_t, a_t)$$. The reward can be *stationary*, i.e., independent of time, which is sometimes denoted at $$r(s, a)$$.

### Value Function

### Model
