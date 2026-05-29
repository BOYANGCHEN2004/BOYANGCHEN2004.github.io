# statistical ML

## Basic Concepts
### Covariance: 

Covariance provides a measure of the strength of the correlation between two or more sets of random variates. The covariance for two random variates X and Y, each with sample size N, is defined by the expectation value
$$
\begin{align*}
cov(X,Y)	=	\langle (X-\mu_X)(Y-\mu_{Y}) \rangle	
	=	\langle XY \rangle - \mu_X \mu_Y
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

### Gaussian function:
In mathematics, a Gaussian function, often simply referred to as a Gaussian, is a function of the base form
$$f(x) = a \: \text{exp}\left(-\frac{(x-b)^2}{2c^2}\right)$$
where $a$ is the height of the curve's peak, $b$ is is the horizontal position of the center of the peak, and $c$ (the standard deviation, sometimes called the Gaussian RMS width) controls the width of the "bell".

When we set $a = \frac{1}{\sqrt{2\pi}\sigma}$ and $b = \mu$,  the Gaussian function becomes a probability density function of the normal distribution with mean $\mu$ and standard deviation $\sigma$, which is given by
$$f(x) = \frac{1}{\sqrt{2\pi}\sigma} \: \text{exp}\left(-\frac{(x-\mu)^2}{2\sigma^2}\right)$$

and the multivariate Gaussian distribution is given by
$$f(x) = \frac{1}{(2\pi)^{d/2} |\Sigma|^{1/2}} \: \text{exp}\left(-\frac{1}{2}(x-\mu)^T \Sigma^{-1} (x-\mu)\right)$$
where $\Sigma$ is the covariance matrix of the distribution.

## Kullback-Leibler (KL) Divergence

The KL divergence is a non-symmetric measure of the difference between two probability distributions $p(x)$ and $ q(x)$.
Specifically, the Kullback-Leibler (KL) divergence of $q(x)$ from $p(x)$, denoted $D_{KL}(p(x) || q(x))$, is a measure of the information lost when $q(x)$ is used to approximate $p(x)$.

### Definition

Let $p(x)$ and $q(x)$ be two probability distributions of a  random variable $x$. The KL divergence is defined as:

$$
D_{KL}(p(x) || q(x)) = \sum_{x \in X} p(x) \ln \frac{p(x)}{q(x)} \: (= \mathbb{E}_{p(x)}[\ln \frac{p(x)}{q(x)}])
$$
when $x$ is discrete, and as:

$$
D_{KL}(p(x) || q(x)) = \int_{-\infty}^{\infty} p(x) \ln \frac{p(x)}{q(x)} dx
$$
when $x$ is continuous.

