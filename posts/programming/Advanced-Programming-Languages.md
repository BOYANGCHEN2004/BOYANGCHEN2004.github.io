---
title: "Advanced Programming Languages"
---

# 型とそのオーダー

## 木
- Unlabeled tree: An (unlabeled, possibly infinite) tree S is 
a non-empty set of sequences consisting of 
positive integers such that:
    - (i) closed under prefix: $s \\: n \in S \\Rightarrow s \in S$
    - (ii) $s \\: n \in S \\Rightarrow s \\: 1, \\dots, s \\: (n-1) \\in S$
- L-labeled tree: An L-labeled tree T is a map from an (unlabeled) tree to L.
- Ranked alphabet: A ranked alphabet $\\sigma$ is a map from a set of symbols to the set of natural numbers. $\\Sigma(a)$ is called the arity of $a$.
- A $\\Sigma$-labeled ranked tree T is a dom($\\Sigma$)-labeled 
tree such that:
$$T(s) = a \Rightarrow \{i \\\:|\\\: s \\: i\\in dom(T)\\} = \\{1,..., \\Sigma(a)\\}$$
（つまり、ノード$a$はちょうど$\\Sigma(a)$個の子どもを持つ)
- expression of tree:
```
   a
  / \\
 /   \\
c     b
      |
      |
      c                          
```
This tree can be expressed as $a \\: c \\:(b \\: c)$
## HORS
* 型:
$$\\kappa ::= o \text{ (木の型) }| \\: \\kappa_{1} \\rightarrow \\kappa_{2} \text{ (関数型) }$$
* 型のオーダーとarity
    - order $(o) = 0$
    - order $(\\kappa_{1} \\rightarrow \\kappa_{2}) = \\text{max}(\\text{order}(\\kappa_{1})+1, \\text{order}(\\kappa_{2}))$ (つまり、 order $(\\kappa_{1} \\rightarrow \\dots \\rightarrow \\kappa_{n} \\rightarrow o)$=1+max(order(\\kappa1),..., order(\\kappan)) )
    - arity($o$) =0 
    - arity($\\kappa_{1} \\rightarrow \\kappa_{2}$) = arity($\\kappa_{1}$) + 1 (つまり、arity(\\kappa1→\\kappa2)=arity(\\kappa2)+1 (e.g. order((o→o)→o) = order(o→o)+1=2, order(o→o→o) = 1))
    
* $G=(\\Sigma, N, R, S^{0})$のオーダー: $N$中の非終端記号の型のオーダーの最大値

## Bottom-up finite tree automaton
A bottom-up finite tree automaton over $\\Sigma$ is defined as a tuple $(Q, \\Sigma, F, \\Delta)$, where 
- $\\Sigma$: ranked alphabet (i.e., an alphabet whose symbols have an associated arity)
- $Q$: a finite set of states
- $\\Delta$: a set of transition rules of the form $f(q_{1}(x_{1}),\\dots,q_{n}(x_{n})) \\rightarrow q(f(x_{1},\\dots,x_{n}))$
- $F$: a set of final states

### Example:
- $\\Sigma = \\{a/2,b/1,e/0\\}$
- $ Q = \\{\\text{even}, \\text{odd}\\}$
- $ \\Delta = \\{a(\\text{odd}, \\text{even}) \\rightarrow \\text{even}, a(\\text{even}, \\text{odd}) \\rightarrow \\text{even}, a(\\text{even}, \\text{even}) \\rightarrow \\text{odd}, a(\\text{odd}, \\text{odd}) \\rightarrow \\text{odd}, b(\\text{even}) \\rightarrow \\text{even}, b(\\text{odd}) \\rightarrow \\text{odd}, e() \\rightarrow \\text{even}\\}$
- $F = \\{\\text{even}\\}$

The transition rule set $\\Delta$ can also be denoted as following:
- $\\Delta = \\{\\text{odd}, \\text{even} \\rightarrow_{a} \\text{even}, \\text{even}, \\text{odd} \\rightarrow_{a} \\text{even}, \\text{even}, \\text{even} \\rightarrow_{a} \\text{odd}, \\text{odd}, \\text{odd} \\rightarrow_{a} \\text{odd}, \\text{even} \\rightarrow_{b} \\text{even}, \\text{odd} \\rightarrow_{b} \\text{odd},  \\rightarrow_{e} \\text{even}\\}$

![Alt text](../images/Language-Processing/tree_automaton.png)


## Top-down finite tree automaton
A top-down finite tree automaton over $F$ is defined as a tuple $(\\Sigma, Q, \\Delta, F)$ where:
- $\\Sigma$: ranked alphabet (i.e., an alphabet whose symbols have an associated arity)
- $Q$: a finite set of states
- $\\Delta$: a set of transition rules of the form f(q1(x1),...,qn(xn)) \\rightarrow q(f(x1,...,xn)),
- $F$: a set of final states

with two differences with bottom-up tree automata. First, Qi \\subseteq Q, the set of its initial states, replaces Qf; second, its transition rules are oriented conversely: q(f(x1,...,xn)) \\rightarrow f(q1(x1),...,qn(xn)), for an n-ary f \\in F, q, qi \\in Q, and xi variables denoting subtrees. That is, members of \\Delta are here rewrite rules from nodes whose roots are states to nodes whose children's roots are states. A top-down automaton starts in some of its initial states at the root and moves downward along branches of the tree, associating along a run a state with each subterm inductively. A tree is accepted if every branch can be gone through this way.[2]


## Deterministic Finite Tree Automata
- Top Down Tree automaton is deterministic $\\Leftrightarrow$ For each $q,a$, there exists at most 1 rule $q \\rightarrow_{a} q_{1} \\dots q_{\\text{arity}(a)}$.

## Parity Tree Automaton
A Parity tree automaton over $\\Sigma$ is $A = (S, s_{0}, T, p)$, where 
- $S$ is a finite set of states
- $s_0 \\in S$ is an initial state
- $T : S \\times Σ \\rightarrow 2S\\times S$ is a transition function
- $p : S \\rightarrow \\{0, \\dots , k\\}$ is a priority function.
