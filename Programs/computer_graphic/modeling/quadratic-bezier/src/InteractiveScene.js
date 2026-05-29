import * as THREE from 'three';
import { BezierCurve } from './BezierCurve';

export class InteractiveScene {
  constructor(container) {
    this.container = container;
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0a0e27);

    this.setupCamera();
    this.setupRenderer();
    this.setupLighting();

    // Control points
    this.p0 = new THREE.Vector3(-5, 2, 0);
    this.p1 = new THREE.Vector3(0, 5, 3);
    this.p2 = new THREE.Vector3(5, 2, 0);

    this.bezierCurve = new BezierCurve(this.p0, this.p1, this.p2);
    this.resolution = 200;

    this.setupScene();
    this.setupInteraction();

    this.autoRotate = false;
    this.draggedPoint = null;

    this.animate();
  }

  setupCamera() {
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    this.camera = new THREE.PerspectiveCamera(
      75,
      width / height,
      0.1,
      1000
    );
    this.camera.position.set(0, 0, 15);
    this.camera.lookAt(0, 0, 0);
  }

  setupRenderer() {
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.container.appendChild(this.renderer.domElement);

    window.addEventListener('resize', () => this.onWindowResize());
  }

  setupLighting() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 10);
    this.scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x4a90e2, 0.4);
    pointLight.position.set(-10, 5, 10);
    this.scene.add(pointLight);
  }

  setupScene() {
    // Grid helper
    const gridHelper = new THREE.GridHelper(20, 20, 0x444444, 0x222222);
    this.scene.add(gridHelper);

    // Axes helper
    const axesHelper = new THREE.AxesHelper(8);
    this.scene.add(axesHelper);

    this.updateCurve();
    this.createControlPoints();
  }

  updateCurve() {
    // Remove old curve
    if (this.curveObject) {
      this.scene.remove(this.curveObject);
    }

    // Generate curve points
    const points = this.bezierCurve.generatePoints(this.resolution);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const material = new THREE.LineBasicMaterial({
      color: 0x4a90e2,
      linewidth: 2,
    });

    this.curveObject = new THREE.Line(geometry, material);
    this.scene.add(this.curveObject);

    this.updateControlPointPositions();
  }

  createControlPoints() {
    const geometry = new THREE.SphereGeometry(0.3, 32, 32);

    // P0 - Red
    const material0 = new THREE.MeshStandardMaterial({ color: 0xff6b6b });
    this.p0Mesh = new THREE.Mesh(geometry, material0);
    this.p0Mesh.position.copy(this.p0);
    this.p0Mesh.userData.index = 0;
    this.scene.add(this.p0Mesh);

    // P1 - Green
    const material1 = new THREE.MeshStandardMaterial({ color: 0x51cf66 });
    this.p1Mesh = new THREE.Mesh(geometry, material1);
    this.p1Mesh.position.copy(this.p1);
    this.p1Mesh.userData.index = 1;
    this.scene.add(this.p1Mesh);

    // P2 - Blue
    const material2 = new THREE.MeshStandardMaterial({ color: 0x4a90e2 });
    this.p2Mesh = new THREE.Mesh(geometry, material2);
    this.p2Mesh.position.copy(this.p2);
    this.p2Mesh.userData.index = 2;
    this.scene.add(this.p2Mesh);

    // Draw lines connecting control points
    this.drawControlLines();
  }

  drawControlLines() {
    if (this.controlLines) {
      this.scene.remove(this.controlLines);
    }

    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array([
      this.p0.x, this.p0.y, this.p0.z,
      this.p1.x, this.p1.y, this.p1.z,
      this.p1.x, this.p1.y, this.p1.z,
      this.p2.x, this.p2.y, this.p2.z,
    ]);
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x888888,
      linewidth: 1,
      transparent: true,
      opacity: 0.5,
    });

    this.controlLines = new THREE.LineSegments(lineGeometry, lineMaterial);
    this.scene.add(this.controlLines);
  }

  updateControlPointPositions() {
    this.p0Mesh.position.copy(this.p0);
    this.p1Mesh.position.copy(this.p1);
    this.p2Mesh.position.copy(this.p2);
    this.drawControlLines();
  }

  setupInteraction() {
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    document.addEventListener('mousedown', (e) => this.onMouseDown(e));
    document.addEventListener('mousemove', (e) => this.onMouseMove(e));
    document.addEventListener('mouseup', (e) => this.onMouseUp(e));
    document.addEventListener('dblclick', (e) => this.onDoubleClick(e));
  }

  onMouseDown(event) {
    this.mouse.x = (event.clientX / this.container.clientWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / this.container.clientHeight) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);

    const meshes = [this.p0Mesh, this.p1Mesh, this.p2Mesh];
    const intersects = this.raycaster.intersectObjects(meshes);

    if (intersects.length > 0) {
      this.draggedPoint = intersects[0].object;
    }
  }

  onMouseMove(event) {
    if (!this.draggedPoint) return;

    this.mouse.x = (event.clientX / this.container.clientWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / this.container.clientHeight) * 2 + 1;

    // Create a plane perpendicular to camera
    const plane = new THREE.Plane(
      this.camera.getWorldDirection(new THREE.Vector3()),
      0
    );
    plane.normal.negate();

    const intersection = new THREE.Vector3();
    this.raycaster.setFromCamera(this.mouse, this.camera);
    this.raycaster.ray.intersectPlane(plane, intersection);

    const index = this.draggedPoint.userData.index;
    if (index === 0) {
      this.p0.copy(intersection);
    } else if (index === 1) {
      this.p1.copy(intersection);
    } else if (index === 2) {
      this.p2.copy(intersection);
    }

    this.bezierCurve.setControlPoints(this.p0, this.p1, this.p2);
    this.updateCurve();
    this.updateDisplay();
  }

  onMouseUp(event) {
    this.draggedPoint = null;
  }

  onDoubleClick(event) {
    // Reset to initial positions
    this.p0.set(-5, 2, 0);
    this.p1.set(0, 5, 3);
    this.p2.set(5, 2, 0);

    this.bezierCurve.setControlPoints(this.p0, this.p1, this.p2);
    this.updateCurve();
    this.updateDisplay();
  }

  setResolution(segments) {
    this.resolution = Math.max(10, segments);
    this.updateCurve();
  }

  setAutoRotate(enabled) {
    this.autoRotate = enabled;
  }

  updateDisplay() {
    // Update UI with control point positions
    const formatVector = (v) => {
      return `x: ${v.x.toFixed(2)}, y: ${v.y.toFixed(2)}, z: ${v.z.toFixed(2)}`;
    };

    const p0Display = document.getElementById('p0Display');
    const p1Display = document.getElementById('p1Display');
    const p2Display = document.getElementById('p2Display');

    if (p0Display) p0Display.textContent = formatVector(this.p0);
    if (p1Display) p1Display.textContent = formatVector(this.p1);
    if (p2Display) p2Display.textContent = formatVector(this.p2);
  }

  onWindowResize() {
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }

  animate = () => {
    requestAnimationFrame(this.animate);

    if (this.autoRotate && !this.draggedPoint) {
      this.scene.rotation.z += 0.001;
      this.scene.rotation.x += 0.0005;
    }

    this.renderer.render(this.scene, this.camera);
  };
}
