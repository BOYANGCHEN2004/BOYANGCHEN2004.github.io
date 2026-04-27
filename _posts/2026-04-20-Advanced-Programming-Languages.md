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
- expression of tree:
```
   a
  / \
 /   \
c     b
      |
      |
      c                          
```
This tree can be expressed as $a \: c \:(b \: c)$
## HORS
* 型:
$$\kappa ::= o \text{ (木の型) }| \: \kappa_{1} \rightarrow \kappa_{2} \text{ (関数型) }$$
* 型のオーダーとarity
    - order $(o) = 0$
    - order $(\kappa_{1} \rightarrow \kappa_{2}) = \text{max}(\text{order}(\kappa_{1})+1, \text{order}(\kappa_{2}))$ (つまり、 order $(\kappa_{1} \rightarrow \dots \rightarrow \kappa_{n} \rightarrow o)$=1+max(order(κ1),..., order(κn)) )
    - arity($o$) =0 
    - arity($\kappa_{1} \rightarrow \kappa_{2}$) = arity($\kappa_{1}$) + 1 (つまり、arity(κ1→κ2)=arity(κ2)+1 (e.g. order((o→o)→o) = order(o→o)+1=2, order(o→o→o) = 1))
    
* $G=(\Sigma, N, R, S^{0})$のオーダー: $N$中の非終端記号の型のオーダーの最大値

## Parity Tree Automaton
A Parity tree automaton over $\Sigma$ is $A = (S, s_{0}, T, p)$, where 
- $S$ is a finite set of states
- $s_0 \in S$ is an initial state
- $T : S \times Σ → 2S×S$ is a transition function
- $p : S → \{0, \dots , k\}$ is a priority function.
