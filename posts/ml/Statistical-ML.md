---
title: "statistical ML"
---

# statistical ML

## Basic Concepts
### Variance:
The variance of a random variable $X$ is defined as
$$
V(X) = \langle  (X-\langle X \rangle)^2 \rangle = \langle X^2 \rangle - \langle X \rangle^2
$$

### Covariance: 

Covariance provides a measure of the strength of the correlation between two or more sets of random variates. The covariance for two random variates X and Y, each with sample size N, is defined by the expectation value
$$
\begin{align*}
cov(X,Y) &=\langle (X-\mu_X)(Y-\mu_{Y}) \rangle 	\\
 &= \langle XY \rangle - \mu_X \mu_Y
\end{align*}
$$

where $\mu_x=\langle X \rangle$ and $\mu_y=\langle Y \rangle$ are the respective means, which can be written out explicitly as


$$
 cov(X,Y)=\sum_{i=1}^N \frac{(x_i-\bar{x})(y_i-\bar{y})}{N}. 
$$
For uncorrelated variates,

$$
 cov(X,Y)=\langle XY \rangle-\mu_X\mu_Y=\langle X \rangle\langle Y \rangle-\mu_X\mu_Y=0, 
$$

When the dimension of the random variate is greater than one, the random variable vector can be represented as $X = (X_1, X_2, \ldots, X_d)^T$, and $Y = (Y_1, Y_2, \ldots, Y_d)^T$ the covariance is represented by a covariance matrix $\Sigma$, which is defined as

$$
\begin{align*}
\Sigma &= E[(X-E[X])(Y-E[Y])^T] \\
       &= \begin{bmatrix}
cov(X_1, Y_1) & cov(X_1, Y_2) & \cdots & cov(X_1, Y_d) \\
cov(X_2, Y_1) & cov(X_2, Y_2) & \cdots & cov(X_2, Y_d) \\
\vdots & \vdots & \ddots & \vdots \\
cov(X_d, Y_1) & cov(X_d, Y_2) & \cdots & cov(X_d, Y_d)
\end{bmatrix}
\end{align*}
$$

### Total Variation Distance:
The total variation distance between two probability distributions $p(x)$ and $q(x)$ is defined as
$$
D_{TV}(p(x), q(x)) = \frac{1}{2} \sum_{x \in X} |p(x) - q(x)|
$$
when $x$ is discrete, and as
$$
D_{TV}(p(x), q(x)) = \frac{1}{2} \int_{-\infty}^{\infty} |p(x) - q(x)| dx
$$
when $x$ is continuous. The total variation distance is an example of a distance between two probability distributions, and it ranges from 0 to 1, where 0 indicates that the two distributions are identical and 1 indicates that they are completely different.
### Gaussian function:
In mathematics, a Gaussian function, often simply referred to as a Gaussian, is a function of the base form
$$
f(x) = a \: \text{exp}\left(-\frac{(x-b)^2}{2c^2}\right)
$$
where $a$ is the height of the curve's peak, $b$ is is the horizontal position of the center of the peak, and $c$ (the standard deviation, sometimes called the Gaussian RMS width) controls the width of the "bell".
When we set $a = \frac{1}{\sqrt{2\pi}\sigma}$ and $b = \mu$,  the Gaussian function becomes a probability density function of the normal distribution with mean $\mu$ and standard deviation $\sigma$, which is given by
$$     
f(x) = \frac{1}{\sqrt{2\pi}\sigma} \\ \: \text{exp}\left(-\frac{(x-\mu)^2}{2\sigma^2}\right)
$$
and the multivariate Gaussian distribution is given by
$$
f(x) = \frac{1}{(2\pi)^{d/2} |\Sigma|^{1/2}} \\ \: \text{exp}\left(-\frac{1}{2}(x-\mu)^T \Sigma^{-1} (x-\mu)\right)
$$
where $\Sigma$ is the covariance matrix of the distribution.

### Activation function

#### Sigmoid function
The sigmoid function, also known as the logistic function, is a mathematical function that is widely used in machine learning and artificial intelligence. It is a non-linear function that is defined as:
$$
\sigma(x) = \frac{1}{1 + e^{-x}}
$$
The sigmoid function takes a real-valued number as input and outputs a value between 0 and 1. This makes it a useful function for tasks such as classification, where the output can be interpreted as a probability. The sigmoid function is also used in neural networks as an activation function, which is a function that is applied to the output of a neuron to introduce non-linearity into the network.

#### Softmax function
The softmax function is a mathematical function that is widely used in machine learning and artificial intelligence. It is a non-linear function that is defined as:
$$
\text{softmax}(x) = \frac{e^{x_i}}{\sum_{j=1}^n e^{x_j}}
$$
The softmax function takes a real-valued number as input and outputs a value between 0 and 1. This makes it a useful function for tasks such as classification, where the output can be interpreted as a probability. The softmax function is also used in neural networks as an activation function, which is a function that is applied to the output of a neuron to introduce non-linearity into the network.


## Kullback-Leibler (KL) Divergence
The KL divergence is a non-symmetric measure of the difference between two probability distributions $p(x)$ and $ q(x)$.
Specifically, the Kullback-Leibler (KL) divergence of $q(x)$ from $p(x)$, denoted $D_{KL}(p(x) || q(x))$, is a measure of the information lost when $q(x)$ is used to approximate $p(x)$.
### Definition
Let $p(x)$ and $q(x)$ be two probability distributions of a random variable $x$. The KL divergence is defined as:
$$
D_{KL}(p(x) || q(x)) = \sum_{x \in X} p(x) \ln \frac{p(x)}{q(x)} \\ : (= \mathbb{E}_{p(x)}[\ln \frac{p(x)}{q(x)}]
$$
when $x$ is discrete, and as:
$$
D_{KL}(p(x) || q(x)) = \int_{-\infty}^{\infty} p(x) \ln \frac{p(x)}{q(x)} dx
$$

## Jensen-Shannon (JS) Divergence
Let $p(x)$ and $q(x)$ be two probability distributions of a random variable $x$. The JS divergence is defined as:
$$
JS(p(x) || q(x)) = \frac{1}{2} D_{KL}(p(x) || m(x)) + \frac{1}{2} D_{KL}(q(x) || m(x)),
$$
where $m(x) = \frac{1}{2} (p(x) + q(x))$.
The JS divergence satisfies the following:
1. $2JS(p||q)=KL(p||m)+KL(q||m)=KL(q||m)+KL(p||m)=2JS(q||p)$ (Symmetric Property)
2. $JS(p||q) \ge 0$ (Non-negativity)
3. $JS(p||q) = 0$ if and only if $p(x) = q(x)$ (Identity of Indiscernibles)
4. $\sqrt{JS(p||q)} \le \frac{1}{2} D_{TV}(p||q) \le \sqrt{2JS(p||q)}$ (triangle inequality)


## Centering and Whitening
### Centering
Centering is the process of subtracting the mean from each data point in a dataset, resulting in a new dataset with a mean of zero.
$$
\bm{\bar{x}_{i}} = \bm{x_{i}} - \frac{1}{N} \sum_{i=1}^N \bm{x_i}
$$
 This is often done as a preprocessing step in machine learning and data analysis to ensure that the data is centered around the origin, which can help improve the performance of certain algorithms, such as principal component analysis (PCA) and linear regression.
### Whitening
Whitening is a data preprocessing technique that transforms a dataset to have a covariance matrix equal to the identity matrix. This is often done as a preprocessing step in machine learning and data analysis to ensure that the data is whitened, which can help improve the performance of certain algorithms.

## classic distribution models

### Normal distribution
The probability density function of a univariate normal distribution with mean $\mu$ and variance $\sigma^2$ is given by:
$$p(x | \mu, \sigma^2) = \frac{1}{\sqrt{2\pi\sigma^2}} \exp\left(-\frac{(x-\mu)^2}{2\sigma^2}\right)$$
The probability density function of a multivariate normal distribution with mean vector $\mu$ and covariance matrix $\Sigma$ is given by:
$$p(x | \mu, \Sigma) = \frac{1}{\sqrt{(2\pi)^k |\Sigma|}} \exp\left(-\frac{1}{2}(x-\mu)^T \Sigma^{-1} (x-\mu)\right)$$

### Gaussian distribution
The probability density function of a univariate normal distribution with mean $\mu$ and variance $\sigma^2$ is given by:
$$
\phi_{\mu, \Sigma}(x) = \frac{1}{\sqrt{2\pi\sigma^2}} \text{exp}(-\frac{(x-\mu)^2}{2\sigma^2})
$$
The probability density function of a multivariate normal distribution with mean vector $\mu$ and covariance matrix $\Sigma$ is given by:
$$
\phi_{\mu, \Sigma}(x) = \frac{1}{\sqrt{\det(2\pi \Sigma)}} \text{exp}(-\frac{1}{2}(x-\mu)^T \Sigma^{-1} (x-\mu))
$$

### Binomial Distribution
The probability distribution of number of successes
in a sequence of $n$ independent Bernoulli trials with a probability of success $p$ is given by:

## Inequations

### Markov's Inequation


