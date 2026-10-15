/**
 * Coons Surface patch from four boundary cubic Bezier curves.
 * C0(u), C1(u) for v=0 and v=1; D0(v), D1(v) for u=0 and u=1.
 */
export default class CoonsSurface {
  constructor(c0, c1, d0, d1) {
    this.setControlPoints(c0, c1, d0, d1);
  }

  setControlPoints(c0, c1, d0, d1) {
    this.c0 = c0.map(p => ({ x: p.x, y: p.y, z: p.z }));
    this.c1 = c1.map(p => ({ x: p.x, y: p.y, z: p.z }));
    this.d0 = d0.map(p => ({ x: p.x, y: p.y, z: p.z }));
    this.d1 = d1.map(p => ({ x: p.x, y: p.y, z: p.z }));
  }

  cubicBezierPoint(p0, p1, p2, p3, t) {
    const u = 1 - t;
    const b0 = u * u * u;
    const b1 = 3 * u * u * t;
    const b2 = 3 * u * t * t;
    const b3 = t * t * t;

    return {
      x: b0 * p0.x + b1 * p1.x + b2 * p2.x + b3 * p3.x,
      y: b0 * p0.y + b1 * p1.y + b2 * p2.y + b3 * p3.y,
      z: b0 * p0.z + b1 * p1.z + b2 * p2.z + b3 * p3.z,
    };
  }

  curvePoint(curve, t) {
    return this.cubicBezierPoint(curve[0], curve[1], curve[2], curve[3], t);
  }

  pointAt(u, v) {
    const c0 = this.curvePoint(this.c0, u);
    const c1 = this.curvePoint(this.c1, u);
    const d0 = this.curvePoint(this.d0, v);
    const d1 = this.curvePoint(this.d1, v);

    const p00 = this.c0[0];
    const p10 = this.c0[3];
    const p01 = this.c1[0];
    const p11 = this.c1[3];

    const bilinear = {
      x: (1 - u) * (1 - v) * p00.x + u * (1 - v) * p10.x + (1 - u) * v * p01.x + u * v * p11.x,
      y: (1 - u) * (1 - v) * p00.y + u * (1 - v) * p10.y + (1 - u) * v * p01.y + u * v * p11.y,
      z: (1 - u) * (1 - v) * p00.z + u * (1 - v) * p10.z + (1 - u) * v * p01.z + u * v * p11.z,
    };

    return {
      x: (1 - v) * c0.x + v * c1.x + (1 - u) * d0.x + u * d1.x - bilinear.x,
      y: (1 - v) * c0.y + v * c1.y + (1 - u) * d0.y + u * d1.y - bilinear.y,
      z: (1 - v) * c0.z + v * c1.z + (1 - u) * d0.z + u * d1.z - bilinear.z,
    };
  }
}
