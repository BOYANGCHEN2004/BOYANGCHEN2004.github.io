## Nabla

Nabla $\nabla$ is a vector differential operator used in vector calculus to calculate the gradient $\nabla f$ of a scalar function $f: \mathbb{R}^n \to \mathbb{R}$ as 
$$\nabla = \left( \frac{\partial}{\partial x_1}, \frac{\partial}{\partial x_2}, \ldots, \frac{\partial}{\partial x_n} \right)$$
where $x_1, x_2, \ldots, x_n$ are the coordinates of the space in which the operator is applied.

## Divergence

The divergence of a vector field $\mathbf{F}: \mathbb{R}^n \to \mathbb{R}^n$ is defined as the scalar field
$$\text{div}(\mathbf{F}) = \nabla \cdot \mathbf{F} = \sum_{i=1}^{n} \frac{\partial F_i}{\partial x_i}$$
where $F_i$ is the $i$-th component of the vector field $\mathbf{F}$ (i.e. $\mathbf{F} = (F_1, F_2, \ldots, F_n)^T$).

## Laplacian
The Laplacian $\Delta$ is a scalar differential operator defined as the divergence of the gradient of a function. It is given by:
$$\Delta f = \nabla \cdot \nabla f = \sum_{i=1}^{n} \frac{\partial^2 f}{\partial x_i^2}$$
where $f$ is a scalar function and $x_i$ are the coordinates of the space in which the operator is applied. The Laplacian is used in various fields such as physics, engineering, and mathematics to describe phenomena like diffusion, heat conduction, and wave propagation.