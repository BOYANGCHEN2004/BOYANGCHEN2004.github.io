## Separation of Variables (変数分離法)

次のように、左右両辺に$x$だけ、$y$だけの変数になるように分離して両辺を積分する

$$
\frac{dy}{dx} = f(x)g(y) \implies \int \frac{dy}{g(y)} = \int f(x)dx
$$

一般解(General solution)は次の通り。

$$
\frac{dy}{dx} = y \implies \int \frac{dy}{y} = \int dx \implies y = Ce^x
$$

### 変数分離型に変換できるもの

#### 同次型微分方程式 (Homogeneous Differential Equation)

「同次」とは？全ての項の次数が等しい多項式を同次式（どうじしき；同次多項式）あるいは斉次式（せいじしき；斉次多項式；homogeneous polynomial）という。例えば:
$x^2 + 5xy + 2y^2$ (2変数2次)、$x^2 + 2y^2 + z^2 + 3xy - 5xz$ (3変数2次)。

微分方程式が、
$$
\frac{dy}{dx}=f\left(\frac{y}{x}\right)
$$
のように、微分以外の項が$
y/x$
の関数として書き換えられるとき、同次型微分方程式と呼ばれる。

解き方は、
$$
u(x) = \frac{y(x)}{x} \text{ i.e. } y=xu
$$
と置換すればよい。
### 