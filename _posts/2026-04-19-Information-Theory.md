# Fundamentals of Information Theory

## Alphabet and Encoding
For data in any language, there are fundamental units that compose it. For example, in English, lowercase letters (or uppercase letters) such as $a,b,c,\dots$ are basic units; in Japanese, hiragana, katakana, and kanji are basic units. In computers, what is commonly used is the ASCII code, which adds various control symbols to English letters. Let such a set of symbols be represented by
$$A=\{a_{1},a_{2},\dots,a_{\alpha}\}$$
Then we can call the set $A$ an alphabet. An alphabet is a set; we do not call each individual element in $A$ an alphabet. The elements of alphabet $A$ are called symbols, and the total number of symbols in $A$, $\alpha = |A|$, is called the size of the alphabet.

Examples of alphabets include $\{\text{White},\text{ black}\}, \{\text{True}, \text{ False}\}, \{W, E, N, S\}$. However, for example, $\{White,black\}$ and $\{True, False\}$ are both essentially the same in the sense that they are alphabets of size 2; what differs is only their interpretation.

In information theory, it is normal to represent alphabet of size 2 using $\{0,1\}$, and seperate the interpretation from the alphabet itself. We call $\{0,1\}$ binary alphabet, and call the data on that binary sequence or **binary data**.
When we have a alphabet A, we call the set consist of symbol sequence 
## Channel Encoding
### Hammming distance
the **Hamming distance** between two binary strings $\mathbf{x}, \mathbf{y}$ 

$$
\begin{align*}
\mathbf{x} &= x_1 x_2 \dots x_n \text{, where } x_i \in \{0,1\} \:\: i \in \{1,2,\dots,n\} \\
\mathbf{y} &= y_1 y_2 \dots y_n \text{, where } y_i \in \{0,1\} \:\: i \in \{1,2,\dots,n\} 
\end{align*}
$$
can be defined as follows:

$$
d_{Hamming}(\mathbf{x}, \mathbf{y}) = \sum^{n}_{i=1}\delta(x_{i}, y_{i}) \text{, where } \delta(x_{i},y_{i}) = \begin{cases} 0 & (x_{i} = y_{i}) \\ 1 & (x_{i} \ne y_{i}) \end{cases}
$$
### Hamming code
0 & (x \le 0) \end{cases}
$$
## Field
A set (such as the set of rational numbers $\mathbb{Q}$ or the set of real numbers $\mathbb{R}$) together with operations defined on it is called an algebraic structure. A field is one kind of algebraic structure and is defined as follows:

For $K$ to be a field, addition and multiplication must be defined on $K$, and the following conditions must be satisfied:
1. For any elements $a,b,c$ in $K$, $(a+b)+c=a+(b+c)$ holds (associative law for addition).
2. There exists exactly one element $0$ in $K$ such that for any element $a$ in $K$, $a+0=0+a=a$ (additive identity).
3. For any element $a$ in $K$, there exists exactly one element $b$ in $K$ such that $a+b=b+a=0$.
4. 
5. 
6. 
7. 