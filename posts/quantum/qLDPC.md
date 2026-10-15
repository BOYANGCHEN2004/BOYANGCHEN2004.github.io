---
title: "qLDPC"
---

# qLDPC (quantum Low Density Parity Check)

## LDPC?

## qLDPC?

## Belief Propagation

## Check Matrix $\rightarrow$ BP Graph
The "Tanner Graph" is the mathematical concept that bridges Check Matrix and BP graph. To understand this, we need to break down the three parts of that sentence: the Parity-Check Matrix ($H$), the Error Nodes, and the Check Nodes.
1. The Parity-Check Matrix $H$ on $GF(2)$: The matrix $H$ acts as the "rulebook." It defines which physical qubits are being monitored by which measurements. It is a grid made entirely of $1$ s and $0$ s.
    - Columns: Each column represents a physical location where an error could happen (a qubit).
    - Rows: Each row represents a "parity check"—a measurement we perform to see if an error happened in a specific group of qubits.
    - The $1$s and $0$s: If there is a $1$ at row $i$, column $j$, it means "Check $i$ is monitoring Qubit $j$ for an error." If it is a $0$, they are not connected.
2. Translating $H$ into the Decoding Graph ($G$): 
Algorithms like Belief Propagation don't like looking at grids of numbers. They prefer to look at networks (graphs) where information can flow. The sentence you quoted is simply the instruction manual for drawing that network based on the matrix $H$.Because $H$ has rows and columns, the graph $G$ will have two distinct types of nodes (making it a "bipartite" graph):Error Nodes (Circles): For every column in $H$, we draw an Error Node. These represent the unknown errors we are trying to find.Check Nodes (Squares): For every row in $H$, we draw a Check Node. These hold the "syndrome" data—the actual measurement results we got from the quantum computer.The Edges (Lines): We draw a line connecting a Check Node to an Error Node only if there is a $1$ in the matrix at that row and column intersection.
* An Example: Let's look at a very simple error correction setup with 4 qubits (4 possible errors, $e_1$ to $e_4$) and 2 measurements (2 checks, $c_1$ and $c_2$).Our rulebook matrix $H$ looks like this:

{% raw %}
$$
H = \begin{bmatrix} 1 & 1 & 1 & 0 \\ 0 & 1 & 1 & 1 \end{bmatrix}
$$
{% endraw %}
- Row 1 (Check 1): Has $1$ s in columns 1, 2, and 3. This means Check 1 monitors qubits 1, 2, and 3.
- Row 2 (Check 2): Has $1$ s in columns 2, 3, and 4. This means Check 2 monitors qubits 2, 3, and 4.
- When Belief Propagation runs, the Check Nodes and Error Nodes "talk" to each other exclusively along these connected lines, passing probabilities back and forth until they agree on which qubits actually have errors.
