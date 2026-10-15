import BezierVisualizer from './Visualizer.js';

window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('canvas');
  if (canvas && canvas.getContext) {
    const visualizer = new BezierVisualizer(canvas);
    const curveTypeSelect = document.getElementById('curveTypeSelect');
    if (curveTypeSelect) {
      visualizer.setShapeType(curveTypeSelect.value);
    }
    visualizer.animate();
    console.log('✓ Bezier curve, Hermite curve, and surface visualization initialized successfully');
  } else {
    alert('Canvas is not supported in your browser');
  }
});
