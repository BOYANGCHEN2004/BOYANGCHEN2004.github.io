/**
 * n-degree Bezier Curve: B(t) = Σ C(n,i) * (1-t)^(n-i) * t^i * P_i
 * Supports degrees 2-5
 */
export default class BezierCurve {
  constructor(controlPoints) {
    this.controlPoints = controlPoints.map(p => ({ x: p.x, y: p.y }));
    this.degree = controlPoints.length - 1;
  }

  // Compute binomial coefficient C(n, k)
  binomial(n, k) {
    if (k > n) return 0;
    if (k === 0 || k === n) return 1;
    let result = 1;
    for (let i = 0; i < k; i++) {
      result *= (n - i) / (i + 1);
    }
    return result;
  }

  pointAt(t) {
    const n = this.degree;
    let x = 0, y = 0;

    for (let i = 0; i <= n; i++) {
      const coeff = this.binomial(n, i) * Math.pow(1 - t, n - i) * Math.pow(t, i);
      x += coeff * this.controlPoints[i].x;
      y += coeff * this.controlPoints[i].y;
    }

    return { x, y };
  }

  generatePoints(segments = 100) {
    const points = [];
    for (let i = 0; i <= segments; i++) {
      points.push(this.pointAt(i / segments));
    }
    return points;
  }

  setControlPoints(controlPoints) {
    this.controlPoints = controlPoints.map(p => ({ x: p.x, y: p.y }));
    this.degree = controlPoints.length - 1;
  }
}
