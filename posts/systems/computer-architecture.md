## Basic Concepts:

- OPS (Operations per second)

- FLOPS: Floating Point Operations Per Second. 

- Memory Bandwidth: the rate at which data can be read from or stored into a semiconductor memory by a processor. The unit is Bytes per second. For instance, the GPU Memory Bandwidth of Nvidia H200 GPU is $4.8$ TB/s.

- Arithmetic Intensity: the amount of computation (FLOP, OP) performed per amount of data (byte) moved between processor and memory. It is calculated using following formula:$$I = \frac{\text{Number of Operations}}{\text{Total Bytes Transferred}}$$
For example, when we consider Vector-Vector Addition (we consider FP32 here).:
    - Number of operations: $N$ 
    - Bytes transferred: $12N$ ($8N$ bytes for read, $4N$ bytes for write)
    - AI = $N/12N = 1/12$.
