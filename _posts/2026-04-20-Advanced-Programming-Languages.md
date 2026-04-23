# 型とそのオーダー

## 木
- Unlabeled tree: An (unlabeled, possibly infinite) tree S is 
a non-empty set of sequences consisting of 
positive integers such that:
    - (i) closed under prefix: $s \: n \in S \Rightarrow s \in S$
    - (ii) $s \: n \in S \Rightarrow s \: 1, \dots, s \: (n-1) \in S$
- L-labeled tree: An L-labeled tree T is a map from an (unlabeled) tree to L.
- Ranked alphabet: A ranked alphabet $\sigma$ is a map from a set of symbols to the set of natural numbers. $\Sigma(a)$ is called the arity of $a$.
- A $\Sigma$-labeled ranked tree T is a dom($\Sigma$)-labeled 
tree such that:
$$T(s) = a \Rightarrow \{i \:|\: s \: i\in dom(T)\} = \{1,..., Σ(a)\}$$
（つまり、ノード$a$はちょうど$\Sigma(a)$個の子どもを持つ)
## HORS
$G=(\Sigma, N, R, S^{0})$