import BezierCurve from './BezierCurve.js';
import HermiteCurve from './HermiteCurve.js';
import BezierSurface from './BezierSurface.js';
import CoonsSurface from './CoonsSurface.js';
import { createTempleSurfaces } from './TempleOfHeaven.js';

export default class BezierVisualizer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.resizeCanvas();

    this.shapeType = 'bezier-curve';
    this.degree = 2;
    this.controlPoints = this.getInitialControlPoints(2);
    this.bezier = new BezierCurve(this.controlPoints);

    // Hermite curve parameters
    this.hermiteP0 = { x: 100, y: 300 };
    this.hermiteP1 = { x: 700, y: 300 };
    this.hermiteT0 = { x: 200, y: -100 };
    this.hermiteT1 = { x: -200, y: -100 };
    this.hermite = new HermiteCurve(this.hermiteP0, this.hermiteP1, this.hermiteT0, this.hermiteT1);

    // Bezier surface control points (4x4)
    this.surfaceControlPoints = this.getInitialSurfaceControlPoints();
    this.bezierSurface = new BezierSurface(this.surfaceControlPoints);

    // Coons surface boundary curves
    const coonsEdges = this.getInitialCoonsEdges();
    this.coonsC0 = coonsEdges.c0;
    this.coonsC1 = coonsEdges.c1;
    this.coonsD0 = coonsEdges.d0;
    this.coonsD1 = coonsEdges.d1;
    this.coonsSurface = new CoonsSurface(this.coonsC0, this.coonsC1, this.coonsD0, this.coonsD1);
    this.templeSurfaces = createTempleSurfaces();

    this.resolution = 200;
    this.draggedPoint = null;
    this.draggedTangent = null;
    this.draggedSurfacePoint = null;
    this.selectedSurfacePoint = null;
    this.animating = false;
    this.animationT = 0;

    this.surfaceRotation = { x: -0.4, y: 0.6 };
    this.surfaceDrag = null;
    this.surfaceTransform = this.getSurfaceTransform();

    this.setupEventListeners();
    this.updateDisplay();
    this.draw();
  }

  getInitialControlPoints(degree) {
    const basePoints = [
      { x: 100, y: 300 },   // P0
      { x: 400, y: 50 },    // P1
      { x: 700, y: 300 },   // P2
      { x: 900, y: 150 },   // P3
      { x: 200, y: 150 },   // P4
      { x: 600, y: 450 },   // P5
    ];
    return basePoints.slice(0, degree + 1);
  }

  getInitialSurfaceControlPoints() {
    const width = 320;
    const height = 220;
    const depth = 80;
    const points = [];

    for (let i = 0; i < 4; i++) {
      const row = [];
      for (let j = 0; j < 4; j++) {
        const x = (i / 3 - 0.5) * width;
        const y = (j / 3 - 0.5) * height;
        const z = Math.sin((i + j) * Math.PI / 3) * depth * 0.5;
        row.push({ x, y, z });
      }
      points.push(row);
    }

    return points;
  }

  getInitialCoonsEdges() {
    const p00 = { x: -160, y: -100, z: 20 };
    const p10 = { x: 160, y: -100, z: -10 };
    const p01 = { x: -160, y: 100, z: -20 };
    const p11 = { x: 160, y: 100, z: 30 };

    const c0 = [
      p00,
      { x: -60, y: -160, z: 60 },
      { x: 60, y: -40, z: -30 },
      p10,
    ];

    const c1 = [
      p01,
      { x: -60, y: 160, z: -40 },
      { x: 60, y: 40, z: 50 },
      p11,
    ];

    const d0 = [
      p00,
      { x: -220, y: -30, z: 70 },
      { x: -100, y: 30, z: -50 },
      p01,
    ];

    const d1 = [
      p10,
      { x: 100, y: -30, z: -40 },
      { x: 220, y: 30, z: 60 },
      p11,
    ];

    return { c0, c1, d0, d1 };
  }


  setDegree(degree) {
    if (degree < 2 || degree > 5) return;
    this.degree = degree;
    this.controlPoints = this.getInitialControlPoints(degree);
    this.bezier.setControlPoints(this.controlPoints);
    this.updateDisplay();
    this.draw();
  }

  setShapeType(type) {
    const validTypes = ['bezier-curve', 'hermite-curve', 'bezier-surface', 'coons-surface', 'temple-of-heaven'];
    if (!validTypes.includes(type)) return;
    this.shapeType = type;

    const bezierPanel = document.getElementById('bezierCoordinates');
    const hermitePanel = document.getElementById('hermiteCoordinates');
    const surfacePanel = document.getElementById('surfaceCoordinates');
    if (bezierPanel && hermitePanel && surfacePanel) {
      bezierPanel.style.display = type === 'bezier-curve' ? 'grid' : 'none';
      hermitePanel.style.display = type === 'hermite-curve' ? 'grid' : 'none';
      surfacePanel.style.display = this.isControlSurfaceType() ? 'grid' : 'none';
    }

    const degreeSelect = document.getElementById('degreeSelect');
    if (degreeSelect) {
      degreeSelect.disabled = type !== 'bezier-curve';
    }

    const animateBtn = document.getElementById('animateBtn');
    if (animateBtn) {
      animateBtn.disabled = this.isSurfaceType();
      animateBtn.textContent = '▶ Animate';
      this.animating = false;
    }

    const curveTypeInfo = document.getElementById('curveTypeInfo');
    if (curveTypeInfo) {
      const labels = {
        'bezier-curve': 'Bezier curve',
        'hermite-curve': 'Hermite curve',
        'bezier-surface': 'Cubic Bezier surface',
        'coons-surface': 'Coons surface',
        'temple-of-heaven': 'Temple of Heaven',
      };
      curveTypeInfo.textContent = labels[type];
    }

    const title = document.querySelector('h1');
    if (title) {
      const titleLabels = {
        'bezier-curve': 'Bezier Curve',
        'hermite-curve': 'Hermite Curve',
        'bezier-surface': 'Cubic Bezier Surface',
        'coons-surface': 'Coons Surface',
        'temple-of-heaven': 'Temple of Heaven',
      };
      title.textContent = titleLabels[type];
    }

    const equationGroup = document.getElementById('curveEquationGroup');
    if (equationGroup) {
      equationGroup.style.display = this.isSurfaceType() ? 'none' : 'flex';
    }

    this.selectedSurfacePoint = null;
    this.updateResolutionDisplay();
    this.updateDisplay();
    this.draw();
  }

  isSurfaceType() {
    return this.shapeType === 'bezier-surface' || this.shapeType === 'coons-surface' || this.shapeType === 'temple-of-heaven';
  }

  isControlSurfaceType() {
    return this.shapeType === 'bezier-surface' || this.shapeType === 'coons-surface';
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight - 200;
  }

  setupEventListeners() {
    window.addEventListener('resize', () => this.onResize());
    this.canvas.addEventListener('mousedown', (e) => this.onMouseDown(e));
    this.canvas.addEventListener('mousemove', (e) => this.onMouseMove(e));
    this.canvas.addEventListener('mouseup', (e) => this.onMouseUp(e));
    window.addEventListener('mouseup', () => this.onMouseUp());
    this.canvas.addEventListener('dblclick', (e) => this.onDoubleClick(e));
    this.canvas.addEventListener('wheel', (e) => this.onWheel(e), { passive: false });

    const degreeSelect = document.getElementById('degreeSelect');
    if (degreeSelect) {
      degreeSelect.addEventListener('change', (e) => {
        this.setDegree(parseInt(e.target.value));
      });
    }

    const curveTypeSelect = document.getElementById('curveTypeSelect');
    if (curveTypeSelect) {
      curveTypeSelect.addEventListener('change', (e) => {
        this.setShapeType(e.target.value);
      });
    }

    document.getElementById('resolution').addEventListener('input', (e) => {
      this.resolution = parseInt(e.target.value);
      this.updateResolutionDisplay();
      this.draw();
    });

    document.getElementById('resetBtn').addEventListener('click', () => {
      if (this.shapeType === 'bezier-curve') {
        this.controlPoints = this.getInitialControlPoints(this.degree);
        this.bezier.setControlPoints(this.controlPoints);
      } else if (this.shapeType === 'hermite-curve') {
        this.hermiteP0 = { x: 100, y: 300 };
        this.hermiteP1 = { x: 700, y: 300 };
        this.hermiteT0 = { x: 200, y: -100 };
        this.hermiteT1 = { x: -200, y: -100 };
        this.hermite.setControlPoints(this.hermiteP0, this.hermiteP1, this.hermiteT0, this.hermiteT1);
      } else if (this.shapeType === 'bezier-surface') {
        this.surfaceControlPoints = this.getInitialSurfaceControlPoints();
        this.bezierSurface.setControlPoints(this.surfaceControlPoints);
        this.resetSurfaceView();
      } else if (this.shapeType === 'coons-surface') {
        const coonsEdges = this.getInitialCoonsEdges();
        this.coonsC0 = coonsEdges.c0;
        this.coonsC1 = coonsEdges.c1;
        this.coonsD0 = coonsEdges.d0;
        this.coonsD1 = coonsEdges.d1;
        this.coonsSurface.setControlPoints(this.coonsC0, this.coonsC1, this.coonsD0, this.coonsD1);
        this.resetSurfaceView();
      } else if (this.shapeType === 'temple-of-heaven') {
        this.resetSurfaceView();
      }
      this.selectedSurfacePoint = null;
      this.updateDisplay();
      this.draw();
    });

    document.getElementById('animateBtn').addEventListener('click', () => {
      if (this.isSurfaceType()) return;
      this.animating = !this.animating;
      if (this.animating) {
        this.animationT = 0;
      }
      document.getElementById('animateBtn').textContent = this.animating ? '⏸ Pause' : '▶ Animate';
    });
  }

  onResize() {
    this.resizeCanvas();
    this.draw();
  }

  onMouseDown(event) {
    const rect = this.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const threshold = 15;

    this.draggedPoint = null;
    this.draggedTangent = null;
    this.draggedSurfacePoint = null;
    this.surfaceDrag = null;

    if (this.shapeType === 'bezier-curve') {
      for (let i = 0; i < this.controlPoints.length; i++) {
        if (this.distance(x, y, this.controlPoints[i].x, this.controlPoints[i].y) < threshold) {
          this.draggedPoint = i;
          break;
        }
      }
    } else if (this.shapeType === 'hermite-curve') {
      if (this.distance(x, y, this.hermiteP0.x, this.hermiteP0.y) < threshold) {
        this.draggedPoint = 'p0';
      } else if (this.distance(x, y, this.hermiteP1.x, this.hermiteP1.y) < threshold) {
        this.draggedPoint = 'p1';
      } else {
        const t0End = { x: this.hermiteP0.x + this.hermiteT0.x, y: this.hermiteP0.y + this.hermiteT0.y };
        const t1End = { x: this.hermiteP1.x + this.hermiteT1.x, y: this.hermiteP1.y + this.hermiteT1.y };

        if (this.distance(x, y, t0End.x, t0End.y) < threshold) {
          this.draggedTangent = 't0';
        } else if (this.distance(x, y, t1End.x, t1End.y) < threshold) {
          this.draggedTangent = 't1';
        }
      }
    } else if (this.isSurfaceType()) {
      if (this.isControlSurfaceType()) {
        const hit = this.pickSurfaceControlPoint(x, y, threshold);
        if (hit) {
          this.draggedSurfacePoint = hit.point;
          this.selectedSurfacePoint = hit;
        } else {
          this.selectedSurfacePoint = null;
          this.surfaceDrag = {
            startX: x,
            startY: y,
            startRotX: this.surfaceRotation.x,
            startRotY: this.surfaceRotation.y,
          };
        }
      } else {
        this.selectedSurfacePoint = null;
        this.surfaceDrag = {
          startX: x,
          startY: y,
          startRotX: this.surfaceRotation.x,
          startRotY: this.surfaceRotation.y,
        };
      }
      this.updateDisplay();
      this.draw();
    }
  }

  onMouseMove(event) {
    if (this.draggedPoint === null && this.draggedTangent === null && !this.draggedSurfacePoint && !this.surfaceDrag) return;

    const rect = this.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (this.isSurfaceType() && this.surfaceDrag && !this.draggedSurfacePoint) {
      const dx = x - this.surfaceDrag.startX;
      const dy = y - this.surfaceDrag.startY;
      const sensitivity = 0.005;
      this.surfaceRotation.y = this.surfaceDrag.startRotY + dx * sensitivity;
      this.surfaceRotation.x = this.surfaceDrag.startRotX + dy * sensitivity;
      this.draw();
      return;
    }

    if (this.shapeType === 'bezier-curve' && this.draggedPoint !== null) {
      this.controlPoints[this.draggedPoint] = { x, y };
      this.bezier.setControlPoints(this.controlPoints);
    } else if (this.shapeType === 'hermite-curve') {
      if (this.draggedPoint === 'p0') {
        this.hermiteP0 = { x, y };
      } else if (this.draggedPoint === 'p1') {
        this.hermiteP1 = { x, y };
      } else if (this.draggedTangent === 't0') {
        this.hermiteT0 = { x: x - this.hermiteP0.x, y: y - this.hermiteP0.y };
      } else if (this.draggedTangent === 't1') {
        this.hermiteT1 = { x: x - this.hermiteP1.x, y: y - this.hermiteP1.y };
      }
      this.hermite.setControlPoints(this.hermiteP0, this.hermiteP1, this.hermiteT0, this.hermiteT1);
    } else if (this.isSurfaceType() && this.draggedSurfacePoint) {
      const rotated = this.rotatePoint(this.draggedSurfacePoint);
      const world = this.screenToWorld(x, y, rotated.z);
      this.draggedSurfacePoint.x = world.x;
      this.draggedSurfacePoint.y = world.y;
      this.draggedSurfacePoint.z = world.z;
      this.updateSurfaceFromControlPoints();
    }

    this.updateDisplay();
    this.draw();
  }

  onMouseUp() {
    this.draggedPoint = null;
    this.draggedTangent = null;
    this.draggedSurfacePoint = null;
    this.surfaceDrag = null;
  }

  onDoubleClick() {
    if (this.shapeType === 'bezier-curve') {
      this.controlPoints = this.getInitialControlPoints(this.degree);
      this.bezier.setControlPoints(this.controlPoints);
    } else if (this.shapeType === 'hermite-curve') {
      this.hermiteP0 = { x: 100, y: 300 };
      this.hermiteP1 = { x: 700, y: 300 };
      this.hermiteT0 = { x: 200, y: -100 };
      this.hermiteT1 = { x: -200, y: -100 };
      this.hermite.setControlPoints(this.hermiteP0, this.hermiteP1, this.hermiteT0, this.hermiteT1);
    } else if (this.shapeType === 'bezier-surface') {
      this.surfaceControlPoints = this.getInitialSurfaceControlPoints();
      this.bezierSurface.setControlPoints(this.surfaceControlPoints);
      this.resetSurfaceView();
    } else if (this.shapeType === 'coons-surface') {
      const coonsEdges = this.getInitialCoonsEdges();
      this.coonsC0 = coonsEdges.c0;
      this.coonsC1 = coonsEdges.c1;
      this.coonsD0 = coonsEdges.d0;
      this.coonsD1 = coonsEdges.d1;
      this.coonsSurface.setControlPoints(this.coonsC0, this.coonsC1, this.coonsD0, this.coonsD1);
      this.resetSurfaceView();
    } else if (this.shapeType === 'temple-of-heaven') {
      this.resetSurfaceView();
    }
    this.selectedSurfacePoint = null;
    this.updateDisplay();
    this.draw();
  }

  onWheel(event) {
    if (!this.isControlSurfaceType() || !this.selectedSurfacePoint) return;
    event.preventDefault();
    const delta = -event.deltaY * 0.2;
    this.selectedSurfacePoint.point.z += delta;
    this.updateSurfaceFromControlPoints();
    this.updateDisplay();
    this.draw();
  }

  distance(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
  }

  updateDisplay() {
    if (this.shapeType === 'bezier-curve') {
      const displayIds = ['p0Display', 'p1Display', 'p2Display', 'p3Display', 'p4Display', 'p5Display'];
      const degreeLabel = ['Degree 2', 'Degree 3', 'Degree 4', 'Degree 5'][this.degree - 2];

      for (let i = 0; i < displayIds.length; i++) {
        const element = document.getElementById(displayIds[i]);
        if (!element) continue;
        if (i < this.controlPoints.length) {
          const p = this.controlPoints[i];
          element.textContent = `x: ${Math.round(p.x)}, y: ${Math.round(p.y)}`;
          element.style.display = 'block';
        } else {
          element.style.display = 'none';
        }
      }

      const degreeInfo = document.getElementById('degreeInfo');
      if (degreeInfo) {
        degreeInfo.textContent = `${degreeLabel} (control points: ${this.controlPoints.length})`;
      }
    } else if (this.shapeType === 'hermite-curve') {
      const p0El = document.getElementById('hermiteP0Display');
      const p1El = document.getElementById('hermiteP1Display');
      const t0El = document.getElementById('hermiteT0Display');
      const t1El = document.getElementById('hermiteT1Display');

      if (p0El) p0El.textContent = `x: ${Math.round(this.hermiteP0.x)}, y: ${Math.round(this.hermiteP0.y)}`;
      if (p1El) p1El.textContent = `x: ${Math.round(this.hermiteP1.x)}, y: ${Math.round(this.hermiteP1.y)}`;
      if (t0El) t0El.textContent = `x: ${Math.round(this.hermiteT0.x)}, y: ${Math.round(this.hermiteT0.y)}`;
      if (t1El) t1El.textContent = `x: ${Math.round(this.hermiteT1.x)}, y: ${Math.round(this.hermiteT1.y)}`;
    } else if (this.isSurfaceType()) {
      const surfacePointDisplay = document.getElementById('surfacePointDisplay');
      if (surfacePointDisplay) {
        if (this.selectedSurfacePoint) {
          const p = this.selectedSurfacePoint.point;
          surfacePointDisplay.textContent = `${this.selectedSurfacePoint.label} x: ${p.x.toFixed(1)}, y: ${p.y.toFixed(1)}, z: ${p.z.toFixed(1)}`;
        } else {
          surfacePointDisplay.textContent = 'None';
        }
      }
    }
  }

  updateResolutionDisplay() {
    const resolutionValue = document.getElementById('resolutionValue');
    if (!resolutionValue) return;
    if (this.isSurfaceType()) {
      const segments = this.getSurfaceSegments();
      resolutionValue.textContent = `${segments}x${segments}`;
    } else {
      resolutionValue.textContent = this.resolution;
    }
  }

  draw() {
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;

    ctx.fillStyle = '#0a0e27';
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = '#1a2040';
    ctx.lineWidth = 1;
    for (let i = 0; i < w; i += 50) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, h);
      ctx.stroke();
    }
    for (let i = 0; i < h; i += 50) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(w, i);
      ctx.stroke();
    }

    if (this.shapeType === 'bezier-curve') {
      this.drawBezier();
    } else if (this.shapeType === 'hermite-curve') {
      this.drawHermite();
    } else if (this.shapeType === 'bezier-surface') {
      this.drawBezierSurface();
    } else if (this.shapeType === 'coons-surface') {
      this.drawCoonsSurface();
    } else if (this.shapeType === 'temple-of-heaven') {
      this.drawTempleOfHeaven();
    }
  }

  drawBezier() {
    const ctx = this.ctx;

    ctx.strokeStyle = '#444466';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(this.controlPoints[0].x, this.controlPoints[0].y);
    for (let i = 1; i < this.controlPoints.length; i++) {
      ctx.lineTo(this.controlPoints[i].x, this.controlPoints[i].y);
    }
    ctx.stroke();
    ctx.setLineDash([]);

    const points = this.bezier.generatePoints(this.resolution);
    ctx.strokeStyle = '#4a90e2';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.stroke();

    const pointRadius = 8;
    const colors = ['#ff6b6b', '#51cf66', '#4a90e2', '#ffa94d', '#b197fc', '#ff8787'];
    this.controlPoints.forEach((pt, i) => {
      ctx.fillStyle = colors[i];
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, pointRadius, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();
    });

    if (this.animating) {
      this.animationT += 0.005;
      if (this.animationT > 1) this.animationT = 0;

      const animPoint = this.bezier.pointAt(this.animationT);
      ctx.fillStyle = '#ffdd33';
      ctx.beginPath();
      ctx.arc(animPoint.x, animPoint.y, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    this.updateEquationDisplay();
  }

  drawHermite() {
    const ctx = this.ctx;

    const points = this.hermite.generatePoints(this.resolution);
    ctx.strokeStyle = '#4a90e2';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.stroke();

    this.drawArrow(ctx, this.hermiteP0.x, this.hermiteP0.y,
      this.hermiteP0.x + this.hermiteT0.x, this.hermiteP0.y + this.hermiteT0.y,
      '#ff6b6b', 2);
    this.drawArrow(ctx, this.hermiteP1.x, this.hermiteP1.y,
      this.hermiteP1.x + this.hermiteT1.x, this.hermiteP1.y + this.hermiteT1.y,
      '#4a90e2', 2);

    const pointRadius = 8;
    ctx.fillStyle = '#ff6b6b';
    ctx.beginPath();
    ctx.arc(this.hermiteP0.x, this.hermiteP0.y, pointRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#4a90e2';
    ctx.beginPath();
    ctx.arc(this.hermiteP1.x, this.hermiteP1.y, pointRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();

    if (this.animating) {
      this.animationT += 0.005;
      if (this.animationT > 1) this.animationT = 0;

      const animPoint = this.hermite.pointAt(this.animationT);
      ctx.fillStyle = '#ffdd33';
      ctx.beginPath();
      ctx.arc(animPoint.x, animPoint.y, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    this.updateEquationDisplay();
  }

  drawBezierSurface() {
    this.surfaceTransform = this.getSurfaceTransform();
    const pointAt = (u, v) => this.bezierSurface.pointAt(u, v);
    this.drawSurfaceMesh(pointAt);
    this.drawBezierSurfaceControlNet();

    const list = this.getBezierSurfaceControlPointList();
    this.drawSurfaceControlPoints(list);
  }

  drawCoonsSurface() {
    this.surfaceTransform = this.getSurfaceTransform();
    const pointAt = (u, v) => this.coonsSurface.pointAt(u, v);
    this.drawSurfaceMesh(pointAt);
    this.drawCoonsBoundaryCurves();

    const list = this.getCoonsControlPointList();
    this.drawSurfaceControlPoints(list);
  }

  drawSurfaceMesh(pointAt, options = {}) {
    const ctx = this.ctx;
    const segments = options.segments ?? this.getSurfaceSegments();
    const color = options.color ?? '#4a90e2';
    const lineWidth = options.lineWidth ?? 1.5;
    const alpha = options.alpha ?? 0.8;

    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.globalAlpha = alpha;

    for (let i = 0; i <= segments; i++) {
      const u = i / segments;
      ctx.beginPath();
      for (let j = 0; j <= segments; j++) {
        const v = j / segments;
        const p = pointAt(u, v);
        const s = this.projectPoint(p);
        if (j === 0) {
          ctx.moveTo(s.x, s.y);
        } else {
          ctx.lineTo(s.x, s.y);
        }
      }
      ctx.stroke();
    }

    for (let j = 0; j <= segments; j++) {
      const v = j / segments;
      ctx.beginPath();
      for (let i = 0; i <= segments; i++) {
        const u = i / segments;
        const p = pointAt(u, v);
        const s = this.projectPoint(p);
        if (i === 0) {
          ctx.moveTo(s.x, s.y);
        } else {
          ctx.lineTo(s.x, s.y);
        }
      }
      ctx.stroke();
    }

    ctx.globalAlpha = 1;
  }

  drawTempleOfHeaven() {
    this.surfaceTransform = this.getSurfaceTransform();
    this.templeSurfaces.forEach((surface) => {
      this.drawSurfaceMesh(surface.pointAt, surface.style);
    });
  }

  drawBezierSurfaceControlNet() {
    const ctx = this.ctx;
    const rows = this.surfaceControlPoints.length;
    const cols = this.surfaceControlPoints[0].length;

    ctx.strokeStyle = '#444466';
    ctx.lineWidth = 1.2;
    ctx.setLineDash([5, 5]);

    for (let i = 0; i < rows; i++) {
      ctx.beginPath();
      for (let j = 0; j < cols; j++) {
        const p = this.projectPoint(this.surfaceControlPoints[i][j]);
        if (j === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
    }

    for (let j = 0; j < cols; j++) {
      ctx.beginPath();
      for (let i = 0; i < rows; i++) {
        const p = this.projectPoint(this.surfaceControlPoints[i][j]);
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
    }

    ctx.setLineDash([]);
  }

  drawCoonsBoundaryCurves() {
    const ctx = this.ctx;
    const curves = [
      { points: this.coonsC0, color: '#ff6b6b' },
      { points: this.coonsC1, color: '#4a90e2' },
      { points: this.coonsD0, color: '#51cf66' },
      { points: this.coonsD1, color: '#ffa94d' },
    ];

    ctx.setLineDash([5, 5]);
    curves.forEach((curve) => {
      ctx.strokeStyle = '#444466';
      ctx.lineWidth = 1;
      ctx.beginPath();
      curve.points.forEach((p, idx) => {
        const s = this.projectPoint(p);
        if (idx === 0) ctx.moveTo(s.x, s.y);
        else ctx.lineTo(s.x, s.y);
      });
      ctx.stroke();
    });
    ctx.setLineDash([]);

    curves.forEach((curve) => {
      ctx.strokeStyle = curve.color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let i = 0; i <= 40; i++) {
        const t = i / 40;
        const p = this.cubicBezierPoint(curve.points, t);
        const s = this.projectPoint(p);
        if (i === 0) ctx.moveTo(s.x, s.y);
        else ctx.lineTo(s.x, s.y);
      }
      ctx.stroke();
    });
  }

  drawSurfaceControlPoints(list) {
    const ctx = this.ctx;
    const pointRadius = 6;

    list.forEach(({ point }) => {
      const projected = this.projectPoint(point);
      const isSelected = this.selectedSurfacePoint && this.selectedSurfacePoint.point === point;
      ctx.fillStyle = isSelected ? '#ffdd33' : '#ffffff';
      ctx.beginPath();
      ctx.arc(projected.x, projected.y, isSelected ? 7 : pointRadius, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#0a0e27';
      ctx.lineWidth = 2;
      ctx.stroke();
    });
  }

  cubicBezierPoint(points, t) {
    const u = 1 - t;
    const b0 = u * u * u;
    const b1 = 3 * u * u * t;
    const b2 = 3 * u * t * t;
    const b3 = t * t * t;

    return {
      x: b0 * points[0].x + b1 * points[1].x + b2 * points[2].x + b3 * points[3].x,
      y: b0 * points[0].y + b1 * points[1].y + b2 * points[2].y + b3 * points[3].y,
      z: b0 * points[0].z + b1 * points[1].z + b2 * points[2].z + b3 * points[3].z,
    };
  }

  getBezierSurfaceControlPointList() {
    const list = [];
    for (let i = 0; i < this.surfaceControlPoints.length; i++) {
      for (let j = 0; j < this.surfaceControlPoints[i].length; j++) {
        list.push({ point: this.surfaceControlPoints[i][j], label: `P[${i},${j}]` });
      }
    }
    return list;
  }

  getCoonsControlPointList() {
    const list = [];
    const seen = new Set();
    const add = (point, label) => {
      if (seen.has(point)) return;
      seen.add(point);
      list.push({ point, label });
    };

    this.coonsC0.forEach((p, i) => add(p, `C0[${i}]`));
    this.coonsC1.forEach((p, i) => add(p, `C1[${i}]`));
    this.coonsD0.forEach((p, i) => add(p, `D0[${i}]`));
    this.coonsD1.forEach((p, i) => add(p, `D1[${i}]`));

    return list;
  }

  pickSurfaceControlPoint(x, y, threshold) {
    const list = this.isControlSurfaceType() ? (
      this.shapeType === 'bezier-surface'
        ? this.getBezierSurfaceControlPointList()
        : this.getCoonsControlPointList()
    ) : [];

    let closest = null;
    let minDist = threshold;

    list.forEach((item) => {
      const projected = this.projectPoint(item.point);
      const dist = this.distance(x, y, projected.x, projected.y);
      if (dist < minDist) {
        minDist = dist;
        closest = item;
      }
    });

    return closest;
  }

  updateSurfaceFromControlPoints() {
    if (this.shapeType === 'bezier-surface') {
      this.bezierSurface.setControlPoints(this.surfaceControlPoints);
    } else if (this.shapeType === 'coons-surface') {
      this.coonsSurface.setControlPoints(this.coonsC0, this.coonsC1, this.coonsD0, this.coonsD1);
    }
  }

  getSurfaceSegments() {
    return Math.max(6, Math.floor(this.resolution / 10));
  }

  getSurfaceTransform() {
    const size = Math.min(this.canvas.width, this.canvas.height);
    const scale = size / 520;
    return {
      originX: this.canvas.width / 2,
      originY: this.canvas.height / 2 + 40,
      scale,
      zScale: scale * 0.7,
    };
  }

  resetSurfaceView() {
    this.surfaceRotation = { x: -0.4, y: 0.6 };
  }

  rotateAroundX(point, angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return {
      x: point.x,
      y: point.y * cos - point.z * sin,
      z: point.y * sin + point.z * cos,
    };
  }

  rotateAroundY(point, angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return {
      x: point.x * cos + point.z * sin,
      y: point.y,
      z: -point.x * sin + point.z * cos,
    };
  }

  rotatePoint(point) {
    const rotatedX = this.rotateAroundX(point, this.surfaceRotation.x);
    return this.rotateAroundY(rotatedX, this.surfaceRotation.y);
  }

  inverseRotatePoint(point) {
    const rotatedY = this.rotateAroundY(point, -this.surfaceRotation.y);
    return this.rotateAroundX(rotatedY, -this.surfaceRotation.x);
  }

  projectPoint(point) {
    const { originX, originY, scale, zScale } = this.surfaceTransform;
    const rotated = this.rotatePoint(point);
    return {
      x: originX + rotated.x * scale + rotated.z * zScale,
      y: originY + rotated.y * scale - rotated.z * zScale,
    };
  }

  screenToWorld(screenX, screenY, rotatedZ) {
    const { originX, originY, scale, zScale } = this.surfaceTransform;
    const rotatedPoint = {
      x: (screenX - originX - rotatedZ * zScale) / scale,
      y: (screenY - originY + rotatedZ * zScale) / scale,
      z: rotatedZ,
    };
    return this.inverseRotatePoint(rotatedPoint);
  }

  binomial(n, k) {
    if (k < 0 || k > n) return 0;
    if (k === 0 || k === n) return 1;
    let result = 1;
    for (let i = 1; i <= k; i++) {
      result *= (n - (k - i)) / i;
    }
    return result;
  }

  getBezierPowerCoefficients(values) {
    const n = values.length - 1;
    const coeffs = new Array(n + 1).fill(0);
    for (let i = 0; i <= n; i++) {
      const binomNI = this.binomial(n, i);
      for (let k = 0; k <= n - i; k++) {
        const m = i + k;
        const sign = k % 2 === 0 ? 1 : -1;
        const coeff = binomNI * this.binomial(n - i, k) * sign;
        coeffs[m] += coeff * values[i];
      }
    }
    return coeffs;
  }

  getHermitePowerCoefficientsY() {
    const p0 = this.hermiteP0.y;
    const p1 = this.hermiteP1.y;
    const t0 = this.hermiteT0.y;
    const t1 = this.hermiteT1.y;
    const c3 = 2 * p0 - 2 * p1 + t0 + t1;
    const c2 = -3 * p0 + 3 * p1 - 2 * t0 - t1;
    const c1 = t0;
    const c0 = p0;
    return [c0, c1, c2, c3];
  }

  formatPolynomial(coeffs, variable = 'x') {
    const terms = [];
    for (let i = coeffs.length - 1; i >= 0; i--) {
      const coeff = coeffs[i];
      if (Math.abs(coeff) < 1e-6) continue;
      const sign = coeff >= 0 ? (terms.length ? ' + ' : '') : (terms.length ? ' - ' : '-');
      const absCoeff = Math.abs(coeff);
      let coeffStr = absCoeff.toFixed(3).replace(/\.?0+$/, '');
      if (coeffStr === '') coeffStr = '0';
      let term = '';
      if (i === 0) {
        term = coeffStr;
      } else if (i === 1) {
        term = `${coeffStr}${variable}`;
      } else {
        term = `${coeffStr}${variable}^${i}`;
      }
      terms.push(`${sign}${term}`);
    }
    return terms.length ? terms.join('') : '0';
  }

  updateEquationDisplay() {
    const equationDisplay = document.getElementById('equationDisplay');
    const tValueDisplay = document.getElementById('tValueDisplay');

    if (equationDisplay) {
      if (this.shapeType === 'bezier-curve') {
        const values = this.controlPoints.map((p) => p.y);
        const coeffs = this.getBezierPowerCoefficients(values);
        equationDisplay.textContent = `y = ${this.formatPolynomial(coeffs)}`;
      } else if (this.shapeType === 'hermite-curve') {
        const coeffs = this.getHermitePowerCoefficientsY();
        equationDisplay.textContent = `y = ${this.formatPolynomial(coeffs)}`;
      } else {
        equationDisplay.textContent = 'y = N/A';
      }
    }

    if (tValueDisplay) {
      tValueDisplay.textContent = `t = ${this.animationT.toFixed(3)}`;
    }
  }

  drawArrow(ctx, fromX, fromY, toX, toY, color, width) {
    const headlen = 15;
    const angle = Math.atan2(toY - fromY, toX - fromX);

    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.lineTo(toX - headlen * Math.cos(angle - Math.PI / 6), toY - headlen * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(toX - headlen * Math.cos(angle + Math.PI / 6), toY - headlen * Math.sin(angle + Math.PI / 6));
    ctx.closePath();
    ctx.fill();
  }

  animate() {
    this.draw();
    requestAnimationFrame(() => this.animate());
  }
}
