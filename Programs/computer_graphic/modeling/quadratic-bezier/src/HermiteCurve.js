/**
 * Cubic Hermite Curve: H(t) = h₀(t)·P₀ + h₁(t)·P₁ + h₂(t)·T₀ + h₃(t)·T₁
 * P0, P1: end points
 * T0, T1: tangent vectors at P0 and P1
 */
export default class HermiteCurve {
  constructor(p0, p1, t0, t1) {
    this.p0 = { x: p0.x, y: p0.y };
    this.p1 = { x: p1.x, y: p1.y };
    this.t0 = { x: t0.x, y: t0.y };
    this.t1 = { x: t1.x, y: t1.y };
  }

  // Hermite basis functions
  h0(t) { return 2 * t * t * t - 3 * t * t + 1; }
  h1(t) { return -2 * t * t * t + 3 * t * t; }
  h2(t) { return t * t * t - 2 * t * t + t; }
  h3(t) { return t * t * t - t * t; }

  pointAt(t) {
    const h0 = this.h0(t);
    const h1 = this.h1(t);
    const h2 = this.h2(t);
    const h3 = this.h3(t);

    return {
      x: h0 * this.p0.x + h1 * this.p1.x + h2 * this.t0.x + h3 * this.t1.x,
      y: h0 * this.p0.y + h1 * this.p1.y + h2 * this.t0.y + h3 * this.t1.y,
    };
  }

  generatePoints(segments = 100) {
    const points = [];
    for (let i = 0; i <= segments; i++) {
      points.push(this.pointAt(i / segments));
    }
    return points;
  }

  setControlPoints(p0, p1, t0, t1) {
    this.p0 = { x: p0.x, y: p0.y };
    this.p1 = { x: p1.x, y: p1.y };
    this.t0 = { x: t0.x, y: t0.y };
    this.t1 = { x: t1.x, y: t1.y };
  }
}
