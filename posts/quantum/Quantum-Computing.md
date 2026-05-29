---
title: "Quantum Computing"
---

# Quantum Computing

## Basic gates:

{% raw %}
$$
\begin{aligned}
X &= \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix} \quad , \quad Y = \begin{pmatrix} 0 & -i \\ i & 0 \end{pmatrix} \quad , \quad Z = \begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix} \quad , \quad H = \frac{1}{\sqrt{2}} \begin{pmatrix} 1 & 1 \\ 1 & -1 \end{pmatrix} \quad , \\
P(\theta) &= \begin{pmatrix} 1 & 0 \\ 0 & e^{i\theta} \end{pmatrix} \quad \\
Rx(\theta) &= \text{exp}\left(-i\frac{\theta}{2} \sigma_x\right) = \begin{pmatrix} \cos(\theta/2) & -i\sin(\theta/2) \\ -i\sin(\theta/2) & \cos(\theta/2) \end{pmatrix} \quad \\
Ry(\theta) &= \text{exp}\left(-i\frac{\theta}{2} \sigma_y\right) = \begin{pmatrix} \cos(\theta/2) & -\sin(\theta/2) \\ \sin(\theta/2) & \cos(\theta/2) \end{pmatrix} \quad \\
Rz(\phi) &= \text{exp}\left(-i\frac{\phi}{2} \sigma_z\right) = \begin{pmatrix} e^{-i\phi/2} & 0 \\ 0 & e^{i\phi/2} \end{pmatrix}
\end{aligned}
$$
{% endraw %}

## Basic States
- Bell State: $\frac{1}{\sqrt{2}}(|000\rangle + |111\rangle)$
- GHZ State: $\frac{1}{\sqrt{2}}(|000\rangle + |111\rangle)$


## Stabilizer Code

### Qubit encoding
The rationale of encoding one abstract or logical qubit into a set of many on-device physical qubits is that, if some external factor changes the state of one of those physical qubits (which happens frequently in current (2026/04) quantum devices), the remaining qubits still provide valid information about the original logical qubit. For example, in the three-qubit repetition code, the logical basis-state qubits, or logical codewords, 
$|\bar{0} \rangle$ (“logical 0”) and $|\bar{1} \rangle$
 ("logical 1") are encoded into three physical qubits via

{% raw %}
$$
|\bar{0} \rangle \rightarrow |000 \rangle, \quad |\bar{1} \rangle \rightarrow |111 \rangle
$$
{% endraw %}


A general qubit $|\psi \rangle \alpha |0 \rangle + \beta |1 \rangle$ is then encoded as

{% raw %}
$$
|\psi \rangle =  \alpha |0 \rangle + \beta |1 \rangle \rightarrow \alpha |000 \rangle + \beta |111 \rangle = \alpha |\bar{0} \rangle + \beta |\bar{1} \rangle = |\bar{\psi} \rangle
$$
{% endraw %}

### Error detection
We suppose that a bit-flip error occurs on the second qubit, meaning that the qubit is randomly flipped. This can be modelled as an unwanted Pauli-$X$
 operator being applied on $|\bar{\psi} \rangle$:

{% raw %}
$$
X_{2}|\bar{\psi} \rangle = \alpha |010 \rangle + \beta |101 \rangle 
$$
{% endraw %}

How do we detect this error? As we already know, measuring the state collapses it, so we cannot measure the state to detect the error.

To detect a bit-flip error on one of the physical qubits without disturbing the encoded logical state, we perform a parity measurement. This checks whether all physical qubits are in the same state by comparing them two at a time, without directly measuring them. Instead, auxiliary qubits are used and measured. For the three-qubit repetition code, this involves measuring two auxiliary qubits in the computational basis after applying a series of 
 gates, as illustrated in the circuit below. The auxiliary qubits record whether each pair of data qubits are the same or different: if they are the same, the auxiliary stays at 0, and if they differ, the auxiliary flips to 1. Thus, if all physical qubits are identical, the auxiliary qubits remain at 0. This is the parity measurement.
