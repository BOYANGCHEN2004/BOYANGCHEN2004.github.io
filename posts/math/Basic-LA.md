## Matrix

### Hermitian Matrix
- Matrix $A$ is Hermitian if $A = A^*$, where $A^*$ is the conjugate transpose of $A$.
- Properties:
  - All eigenvalues of a Hermitian matrix are real.
  - Hermitian matrices are diagonalizable by a unitary matrix.
  - The eigenvectors corresponding to distinct eigenvalues of a Hermitian matrix are orthogonal.
  - The determinant of a Hermitian matrix is real.


### Unitary Matrix
- Matrix $U$ is unitary if $U^* U = U U^* = I$, where $U^*$ is the conjugate transpose of $U$ and $I$ is the identity matrix.
- Properties:
  - The inverse of a unitary matrix is its conjugate transpose.

### Orthogonal Matrix
- Matrix $Q$ is orthogonal if $Q^T Q = Q Q^T = I$, where $Q^T$ is the transpose of $Q$ and $I$ is the identity matrix.
- Properties:
  - The inverse of an orthogonal matrix is its transpose.
  - The eigenvalue of a orthogonal matrix has absolute value 1.


### Matrix Trace

- The trace of a square matrix $A$, denoted as $\text{tr}(A)$, is the sum of its diagonal elements, i.e. 
$$\text{tr}(A) = \sum_{i=1}^{n} a_{ii}$$
- Properties:
  - $Tr(A) = \sum_{i=1}^{n} \lambda_i$, where $\lambda_i$ are the eigenvalues of $A$. 
  - For matrices $A = (a_{ij})_{n \times m} \in M_{n \times m}(\mathbb{C})$ and $B = (b_{ij})_{m \times n} \in M_{m \times n}(\mathbb{C})$, $\text{tr}(AB) = \text{tr}(BA) = \sum_{i=1}^{n} \sum_{j=1}^{m} a_{ij} b_{ji}$.
  - For matrix $A \in M_{n \times n}(\mathbb{C})$, $|\psi\rangle \in M_{n \times 1}(\mathbb{C})$, we have $\langle \psi | A | \psi \rangle = \text{tr}(A |\psi\rangle \langle \psi|)$.

### Determinant
- The determinant of a square matrix $A=(a_{ij})_{n \times n}$, denoted as $\det(A)$, is defined as follow:
$$\det(A) = \sum_{\sigma \in S_n} \text{sgn}(\sigma) \prod_{i=1}^{n} a_{i, \sigma(i)}$$
- Properties:
  - $\det(AB) = \det(A)\det(B)$
  
### Matrix similarity
-Two square matrices $A$ and $B$ of the same size are called similar if there exists an invertible matrix $P$ such that $B = P^{-1}AP$.

- Properties: 
  - They have the same characteristic polynomial, and hence the same eigenvalues (with the same algebraic multiplicities). 
  - They have the same trace. 
  - They have the same determinant.  
  
