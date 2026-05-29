---
title: "Fourier series and Fourier transform"
---

# Fourier series and Fourier transform

## Fourier series
The Fourier series is a way to represent a periodic function as a sum of sine and cosine functions. The Fourier series of a function $f(x)$ with period $2L$ is given by:
$$f(x) = a_0 + \sum_{n=1}^{\infty} \left( a_n \cos\left(\frac{n\pi x}{L}\right) + b_n \sin\left(\frac{n\pi x}{L}\right) \right){% raw %}
$$
where the coefficients $a_n$ and $b_n$ are calculated as follows:
$$
{% endraw %}

a_0 = \frac{1}{2L} \int_{-L}^{L} f(x) \, dx{% raw %}
$$
$$a_n = \frac{1}{L} \int_{-L}^{L} f(x) \cos\left(\frac{n\pi x}{L}\right) \, dx$$
$$
{% endraw %}

b_n = \frac{1}{L} \int_{-L}^{L} f(x) \sin\left(\frac{n\pi x}{L}\right) \, dx$$
