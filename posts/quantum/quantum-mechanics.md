---
title: "Quantum Mechanics"
---

# Quantum Mechanics

## Schrödinger Equation
$$i \hbar \frac{\partial \psi(\mathbf{r},t)}{\partial t} = \hat{H} \psi(\mathbf{r},t), \text{ where } \hbar = \frac{h}{2\pi},\: \hat{H} = -\frac{\hbar^2}{2m}\nabla^2 + V(\mathbf{r})$$
The constant $\hbar$ is called reduced Planck constant.
## Hilbert Space
A Hilbert space is a vector space $\mathcal{H}$ with an inner product $\langle f,g \rangle$ such that the norm defined by
 $$|f|=\sqrt{\langle f,f \rangle} $$
turns $\mathcal{H}$ into a complete metric space. If the metric defined by the norm is not complete, then $\mathcal{H}$ is instead known as an inner product space.
Examples of finite-dimensional Hilbert spaces include
1. The real numbers $\mathbb{R}^n$ with $\langle v,u \rangle$ the vector dot product of $v$ and $u$.
2. The complex numbers $\mathbb{C}^n$ with $\langle v,u\rangle$ the vector dot product of $v$ and the complex conjugate of $u$.
An example of an infinite-dimensional Hilbert space is $L^2$, the set of all functions $f:\mathbb{R} \rightarrow \mathbb{R}$ such that the integral of $f^2$ over the whole real line is finite. In this case, the inner product is
$$\langle f,g \rangle=\int_{-\infty}^{\infty}f(x)g(x)dx $$
A Hilbert space is always a Banach space, but the converse need not hold.
## Projection Operators
なぜユニタリ変換　$\Rightarrow$ probability is preserved
## Schrödinger and Heisenberg Representations
We have described the dynamics by propagating the wavefunction, which encodes probability densities. Ultimately, since we cannot measure a wavefunction, we are interested in observables, which are probability amplitudes associated with Hermitian operators. Since operators and wavefunctions can be both be time-dependent, there are different representations of quantum dynamics that emerge. Consider the time-dependent expectation value for an operator $\hat{A}$
 applied to a wavefunction beginning in the initial state $|\psi_{0}\rangle$: 
$$
\begin{array}{rlll}

\left\langle \hat A( t ) \right\rangle \kern-.8em &= \left\langle \psi_0 \right|{\hat U}^{\dagger}\hat A\hat U\left| \psi_0 \right\rangle & & & \\n+
\u00A0&= \left( \langle \psi_0|{\hat U}^{\dagger} \right) \hat A \left( \hat U|\psi_0\rangle \right) & \longrightarrow &\u00A0\left\langle \psi (t) \right| \! \hat A \! \left| \psi (t) \right\rangle & \text{ Schrödinger } \\

\u00A0&= \left\langle \psi_0 \right|\left( {\hat U}^{\dagger}\hat A\hat U \right)\left| \psi_0 \right\rangle & \longrightarrow &\u00A0\left\langle \psi_0 \right| \!\hat A(t) \! \left| \psi_0 \right\rangle & \text{ Heisenberg }

\end{array}
$$
