## Basic Concepts
- Component: a component of an undirected graph is a connected subgraph that is not part of any larger connected subgraph.

- Planer graph: A planar graph is a graph that can be embedded in the plane in such a way that no edges cross each other.

- Directed Acylic Graph (DAG): a directed graph with no directed cycles. 

- Spanning Tree: A spanning tree of a connected graph is a subgraph that satisfies the follow:
    - it is a tree
    - it includes all of the vertices of the original graph.

- $k$-connected: a graph is called $k$-connected if it requires the removal of at least $k$ vertices to disconnect the remaining graph.

- Clique: A clique is a subset of the vertices of a graph such that every two distinct vertices in the subset are adjacent.

## Notation:
- $O(n)$ (Big $O$): Provides the upper bound (worst-case scenario) for the algorithm's growth. It means that for a large enough input, the algorithm will take at most a time proportional to $n$ steps.

- $\tilde{O}(n)$ (Soft-Big $O$): Provides the upper bound (worst-case scenario) for the algorithm's growth. It means that for a large enough input, the algorithm will take at most a time proportional to $n \log n$ steps. (or $n \log^c n$ for some constant $c$)

- $\Theta(n)$: Provides the tight bound (worst-case scenario) for the algorithm's growth. It means that for a large enough input, the algorithm will take at least a time proportional to $n$ steps. i.e. there are constants $c_{1}, c_{2} > 0$ and a natural number $n_{0}$ such that $c_{1} \cdot n \leq f(n) \leq c_{2} \cdot n$ for all $n \geq n_{0}$.

## Matching
In graph theory, a matching in a graph is a set of edges that do not have a set of common vertices. In other words, a matching is a graph where each node has either zero or one edge incident to it.

- Maximum Matching: A maximum matching is a matching that contains the largest possible number of edges. The size of a maximum matching is called the matching number of the graph.
    - Size of Maximum Matching: The size of a maximum matching is the number of edges in the matching. It is denoted by $\nu(G)$ for a graph $G$.

- Maximal Matching: A maximal matching is a matching to which no more edges can be added without violating the matching property. In other words, it is a matching where every edge is incident to at least one vertex that is not covered by any edge in the matching.

- Perfect Matching: A perfect matching is a matching that covers all vertices of the graph. That is, every vertex of the graph is incident to exactly one edge of the matching.

- Argumenting Path: An argumenting path is a path that starts and ends with unmatched vertices and alternates between edges that are in the matching and edges that are not in the matching.

### Hall's Marriage Theorem
Given a bipartite graph $G = (U, W ;E)$, the following statements are equivalent:
1. $|U| = |W|$ has a perfect matching.
2. For every subset $S$ of $U$, the number of neighbors of $S$ in $W$ is at least as large as the number of vertices in $S$. In other words, $|N(S)| \geq |S|$ for all $S \subseteq U$.

### Kuratowski's Theorem
A graph is planar if and only if it does not contain a subgraph that is a subdivision of $K_5$ or $K_{3,3}$.

## Cut
a cut is a partition of the vertices of a graph into two disjoint subsets. Any cut determines a cut-set, the set of edges that have one endpoint in each subset of the partition. These edges are said to cross the cut.

### Max Cut
For a cut $(S, T)$, it is the number of edges between $S$ and $T$. Finding such a cut is known as the max-cut problem. The size of the max cut is denoted by $\nu(G)$.