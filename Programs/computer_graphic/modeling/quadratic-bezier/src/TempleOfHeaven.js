const createCylinderSurface = (radius, y0, y1) => (u, v) => {
  const theta = Math.PI * 2 * u;
  const y = y0 + (y1 - y0) * v;
  return {
    x: radius * Math.cos(theta),
    y,
    z: radius * Math.sin(theta),
  };
};

const createConeSurface = (r0, r1, y0, y1) => (u, v) => {
  const theta = Math.PI * 2 * u;
  const radius = r0 + (r1 - r0) * v;
  const y = y0 + (y1 - y0) * v;
  return {
    x: radius * Math.cos(theta),
    y,
    z: radius * Math.sin(theta),
  };
};

const cubicBezierScalar = (p0, p1, p2, p3, t) => {
  const u = 1 - t;
  return (
    u * u * u * p0 +
    3 * u * u * t * p1 +
    3 * u * t * t * p2 +
    t * t * t * p3
  );
};

const createBezierRadiusSurface = (r0, r1, r2, r3, y0, y1) => (u, v) => {
  const theta = Math.PI * 2 * u;
  const radius = cubicBezierScalar(r0, r1, r2, r3, v);
  const y = y0 + (y1 - y0) * v;
  return {
    x: radius * Math.cos(theta),
    y,
    z: radius * Math.sin(theta),
  };
};

const createDiskSurface = (rInner, rOuter, y) => (u, v) => {
  const theta = Math.PI * 2 * v;
  const radius = rInner + (rOuter - rInner) * u;
  return {
    x: radius * Math.cos(theta),
    y,
    z: radius * Math.sin(theta),
  };
};

const createDomeSurface = (radius, yBase, height) => {
  const cappedHeight = Math.min(height, radius * 2);
  const centerY = yBase + radius - cappedHeight;
  const phiMax = Math.acos((radius - cappedHeight) / radius);
  return (u, v) => {
    const theta = Math.PI * 2 * u;
    const phi = phiMax * v;
    const r = radius * Math.sin(phi);
    return {
      x: r * Math.cos(theta),
      y: centerY + radius * Math.cos(phi),
      z: r * Math.sin(theta),
    };
  };
};

export const createTempleSurfaces = () => {
  const surfaces = [];
  const addSurface = (pointAt, style) => surfaces.push({ pointAt, style });
  const baseColor = '#e6dfe0';
  const roofColor = '#4a90e2';
  const roofAccent = '#6fb4ff';
  const detailColor = '#d9b65a';

  const addCylinder = (r, y0, y1, color) => addSurface(createCylinderSurface(r, y0, y1), { color });
  const addCone = (r0, r1, y0, y1, color) => addSurface(createConeSurface(r0, r1, y0, y1), { color });
  const addBezierRoof = (r0, r1, r2, r3, y0, y1, color) =>
    addSurface(createBezierRadiusSurface(r0, r1, r2, r3, y0, y1), { color });
  const addDisk = (rInner, rOuter, y, color) => addSurface(createDiskSurface(rInner, rOuter, y), { color, lineWidth: 1 });
  const addDome = (r, yBase, height, color) => addSurface(createDomeSurface(r, yBase, height), { color });

  addCylinder(240, -170, -160, baseColor);
  addDisk(0, 220, -160, baseColor);
  addCylinder(180, -160, -150, baseColor);
  addDisk(0, 180, -150, baseColor);
  addCylinder(140, -150, -140, baseColor);
  addDisk(0, 140, -140, baseColor);

  addCylinder(120, -140, -50, baseColor);

  addBezierRoof(160, 125, 115, 110, -50, -20, roofColor);
  addDisk(0, 110, -20, roofAccent);
  addCylinder(100, -20, -12, baseColor);
  addDisk(0, 100, -12, roofAccent);
  addBezierRoof(120, 90, 82, 80, -12, 5, roofColor);
  addDisk(0, 80, 5, roofAccent);
  addCylinder(72, 5, 12, baseColor);
  addDisk(0, 72, 12, roofAccent);
  addBezierRoof(90, 65, 50, 45, 12, 25, roofColor);
  addDisk(0, 45, 25, roofAccent);

  addDome(20, 25, 16, detailColor);
  addCylinder(6, 41, 60, detailColor);
  addCone(6, 0, 60, 72, detailColor);

  return surfaces;
};
