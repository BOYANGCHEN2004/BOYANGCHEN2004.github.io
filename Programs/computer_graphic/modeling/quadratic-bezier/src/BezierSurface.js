/**
 * Cubic Bezier Surface: S(u,v) = Σ Σ B_i^3(u) * B_j^3(v) * P_ij
 * Control points are a 4x4 grid.
 */
export default class BezierSurface {
  constructor(controlPoints) {
    this.setControlPoints(controlPoints);
  }

  setControlPoints(controlPoints) {
    this.controlPoints = controlPoints.map(row =>
      row.map(p => ({ x: p.x, y: p.y, z: p.z }))
    );
  }

  binomial(n, k) {
    if (k > n) return 0;
    if (k === 0 || k === n) return 1;
    let result = 1;
    for (let i = 0; i < k; i++) {
      result *= (n - i) / (i + 1);
    }
    return result;
  }

  bernstein(n, i, t) {
    return this.binomial(n, i) * Math.pow(1 - t, n - i) * Math.pow(t, i);
  }

  pointAt(u, v) {
    const n = this.controlPoints.length - 1;
    let x = 0;
    let y = 0;
    let z = 0;

    for (let i = 0; i <= n; i++) {
      const bu = this.bernstein(n, i, u);
      for (let j = 0; j <= n; j++) {
        const bv = this.bernstein(n, j, v);
        const p = this.controlPoints[i][j];
        const coeff = bu * bv;
        x += coeff * p.x;
        y += coeff * p.y;
        z += coeff * p.z;
      }
    }

    return { x, y, z };
  }
}
