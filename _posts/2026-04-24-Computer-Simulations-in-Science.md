## Terminology


## HPC system
* Memory: DRAM (コンデンサーに電荷あり/なし)
    - Memory Module:
        - コモディティ: Unbuffered

* 性能パラメータ: "B/F値" Byte/Flop
$$\frac{\text{メモリバンド幅(Bytes/s)}}{\text{浮動小数演算能力(Flops/s)}}$$

### Poisson's Equation
The following equation is called Poisson's equation:
 $$ 
 \Delta \phi (x) = -f(x)
 $$
The $\Delta$ operator is called Laplace operator and defined as follows:
$$
{\displaystyle \Delta \phi =\frac{\partial ^2 \phi }{\partial {x^2}} +\frac{\partial ^2 \phi }{\partial {y^2}} + \frac{\partial ^2 \phi }{\partial {z^2}} }= \nabla  \cdot  \nabla \phi = \nabla ^2 \phi
$$

## software
### ノイズのタイミングが問題
そのままのOS: ノイズがランダム $\rightarrow$ 周期待ち時間がノード数大で無視できなくなる（最悪が同期では問題）

- 対策1： ノイズ源を同期させる = 割り込み、デーモンプロセス
- 対策2：ノイズの発生源から、計算処理を隔離する

        OSサービス用コア（富岳はCMG単位で12計算コア+4/2サービスコア）
- 対策3：ノイズの発生を抑えた軽量なOSを使用。問題はアプリの移植性

対策3のための工夫の一つ: Linux Kernel + 軽量Kernelで同居。軽量KernelでできないことはLinux Kernelに投げる。（e.g. 富岳McKernel）

### ネットワークの低水準API（MPIはこの上）
ソケット $\times$ レイテンシ大

HPC用InfiniBand verbs他、Remote direct memory accessを使える

### MPIの内部実装（動作）
Eager通信とRendezvous（ランデブー）通信
- Eager通信：送信側は受信の完了を待たない。バッファにメッセージが入るほど小さい
    - 良：レイテンシが短い
    - 悪：バッファへのコピーが必要 $\rightarrow$ 実効バンド幅が低い
    - 短いメッセージ向け
- Rendzvous：最初に送受信の合意をとる、合意したら転送

### 計算科学のアプリ $\rightarrow$ 速いアプリを作る工夫
* 個別コアのレベル: 演算器の利用効率 $\rightarrow$ データがなければ進まない $\rightarrow$ B/F値が小さい（レイテンシも数百サイクル）