---
title: "Fundamentals of Information Theory"
---

# Fundamentals of Information Theory

## Alphabet and Encoding
For data in any language, there are fundamental units that compose it. For example, in English, lowercase letters (or uppercase letters) such as $a,b,c,\dots$ are basic units; in Japanese, hiragana, katakana, and kanji are basic units. In computers, what is commonly used is the ASCII code, which adds various control symbols to English letters. Let such a set of symbols be represented by
$$A=\{a_{1},a_{2},\dots,a_{\alpha}\}{% raw %}
$$
Then we can call the set $A$ an alphabet. An alphabet is a set; we do not call each individual element in $A$ an alphabet. The elements of alphabet $A$ are called symbols, and the total number of symbols in $A$, $\alpha = |A|$, is called the size of the alphabet.
Examples of alphabets include $\{\text{White},\text{ black}\}, \{\text{True}, \text{ False}\}, \{W, E, N, S\}$. However, for example, $\{White,black\}$ and $\{True, False\}$ are both essentially the same in the sense that they are alphabets of size 2; what differs is only their interpretation. 
In information theory, it is normal to represent alphabet of size 2 using $\{0,1\}$, and seperate the interpretation from the alphabet itself. We call $\{0,1\}$ binary alphabet, and call the data on that binary sequence or **binary data**.
When we have a alphabet A, we call the set consist of symbol sequence 
## Channel Encoding
From here on we mainly consider words on binary Alphabet $A=\{0,1\}$
### Hammming distance
the **Hamming distance** between two binary strings $\mathbf{x}, \mathbf{y}$ 
$$
{% endraw %}
\begin{align*}
\mathbf{x} &= x_1 x_2 \dots x_n \text{, where } x_i \in \{0,1\} \:\: i \in \{1,2,\dots,n\} \\
\mathbf{y} &= y_1 y_2 \dots y_n \text{, where } y_i \in \{0,1\} \:\: i \in \{1,2,\dots,n\} 
\end{align*}
{% raw %}
$$
can be defined as follows:
$$
{% endraw %}
d_{Hamming}(\mathbf{x}, \mathbf{y}) = \sum^{n}_{i=1}\delta(x_{i}, y_{i}) \text{, where } \delta(x_{i},y_{i}) = \begin{cases} 0 & (x_{i} = y_{i}) \\ 1 & (x_{i} \ne y_{i}) \end{cases}
{% raw %}
$$
This $\delta$ function is actually $\texttt{XOR}$, which will be discuss later.
### Error pattern
We define the error pattern $\mathbf{e}$ between 2 words $\mathbf{x}=x_1x_2\dots x_n$ and $\mathbf{y}=y_1y_2\dots y_n$ as follows:
$$
{% endraw %}
\begin{align*}
\mathbf{e} &= \mathbf{x} + \mathbf{y} \\
            &= x_1x_2\dots x_n + y_1y_2\dots y_n \\
            &=e_{1}e_{2}\dots e_{n} \text{, where } e_{i} = x_{i} \oplus y_{i}
\in \{0,1\} \:\: i \in \{1,2,\dots,n\} 
\end{align*}
$$

the $\oplus$ is also called **exclusive or ($\texttt{XOR}$)** and is defined as $x \oplus y = (x+y)\mod 2$ where $x,y \in \{0,1\}$


### Hamming code

## Field
A set (such as the set of rational numbers $\mathbb{Q}$ or the set of real numbers $\mathbb{R}$) together with operations defined on it is called an algebraic structure. A field is one kind of algebraic structure and is defined as follows:

For $K$ to be a field, addition $+$ and multiplication $\cdot$ must be defined on $K$ ($K$ is the initial of "körper", which means "field, body" in German), and the following conditions must be satisfied:
- **Associativity of addition and multiplication**: $\forall a, b, c \in K, \: a + (b + c) = (a + b) + c,\text{ and } a \u22c7 (b \u22c7 c) = (a \u22c7 b) \u22c7 c$.
- **Commutativity of addition and multiplication**: $\forall a, b \in K, \:a + b = b + a,\text{ and } a \u22c7 b = b \u22c7 a$.
- **Additive and multiplicative identity**: there exist distinct elements $0$ and $1$ in $K$ such that $a + 0 = a$ and $a \u22c7 1 = a$. The mentioned element $0$ and $1$ are called "zero element" and "unit element", respectively.
- **Additive inverses**: for every $a$ in $K$, there exists an element in $K$, denoted $\u2212a$, called the additive inverse of $a$, such that $a + (\u2212a) = 0$.
- **Multiplicative inverses**: for every $a \neq 0$ in $K$, there exists an element in $K$, denoted by $a^{\u22121}$ or $\frac{1}{a}$, called the multiplicative inverse of $a$, such that $a \u22c7 a^{\u22121} = 1$
- **Distributivity of multiplication over addition**: $\forall a, b, c \in K, \:a \u22c7 (b + c) = (a \u22c7 b) + (a \u22c7 c)$. 
