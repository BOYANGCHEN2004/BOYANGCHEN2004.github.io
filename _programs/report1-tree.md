---
layout: single
title: "Tree Playground"
permalink: /programs/report1-tree/
author_profile: false
classes: wide
---

<style>
  .tree-playground {
    --bg: #f6efe6;
    --panel: rgba(255, 255, 255, 0.82);
    --panel-border: rgba(45, 38, 24, 0.12);
    --text: #1f1a15;
    --muted: #6b6258;
    --accent: #1f7a70;
    --accent-2: #d97706;
    --shadow: 0 24px 60px rgba(57, 46, 30, 0.16);
    color: var(--text);
    background:
      radial-gradient(circle at top left, rgba(31, 122, 112, 0.14), transparent 36%),
      radial-gradient(circle at top right, rgba(217, 119, 6, 0.16), transparent 32%),
      linear-gradient(180deg, #faf4ea 0%, #f7f1e8 100%);
    border: 1px solid rgba(60, 50, 35, 0.08);
    border-radius: 28px;
    padding: 1.5rem;
    box-shadow: var(--shadow);
    overflow: hidden;
    width: min(1700px, calc(100vw - 2rem));
    max-width: none;
    margin-left: 50%;
    transform: translateX(-50%);
  }

  .tree-playground h2,
  .tree-playground p {
    margin-top: 0;
  }

  .tree-hero {
    display: grid;
    grid-template-columns: 0.9fr 2.1fr;
    gap: 1.25rem;
    align-items: stretch;
  }

  .tree-copy {
    background: var(--panel);
    border: 1px solid var(--panel-border);
    border-radius: 24px;
    padding: 1.2rem;
    backdrop-filter: blur(12px);
  }

  .tree-copy .kicker {
    display: inline-flex;
    gap: 0.5rem;
    align-items: center;
    font-size: 0.82rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--accent);
    background: rgba(31, 122, 112, 0.08);
    border-radius: 999px;
    padding: 0.35rem 0.75rem;
    margin-bottom: 0.9rem;
  }

  .tree-copy h1 {
    font-size: clamp(2rem, 4vw, 3.4rem);
    line-height: 0.98;
    margin-bottom: 0.9rem;
  }

  .tree-copy p {
    color: var(--muted);
    line-height: 1.7;
    margin-bottom: 1rem;
  }

  .tree-notes {
    display: grid;
    gap: 0.65rem;
    margin-top: 1rem;
  }

  .note-card {
    border-radius: 18px;
    background: rgba(255, 255, 255, 0.72);
    border: 1px solid rgba(60, 50, 35, 0.09);
    padding: 0.85rem 0.95rem;
    color: var(--muted);
  }

  .control-card {
    background: rgba(25, 20, 15, 0.06);
    border-radius: 24px;
    padding: 1rem;
    border: 1px solid rgba(60, 50, 35, 0.08);
    display: grid;
    gap: 1rem;
  }

  .controls {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.85rem;
  }

  .control {
    display: grid;
    gap: 0.45rem;
  }

  .control label {
    font-size: 0.9rem;
    color: var(--muted);
  }

  .control input[type="range"],
  .control input[type="number"],
  .control select {
    width: 100%;
    border-radius: 14px;
    border: 1px solid rgba(60, 50, 35, 0.14);
    background: rgba(255, 255, 255, 0.86);
    padding: 0.7rem 0.8rem;
    color: var(--text);
  }

  .control input[type="range"] {
    padding: 0;
    accent-color: var(--accent);
  }

  .button-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    align-items: center;
  }

  .button-row button {
    border: 0;
    border-radius: 999px;
    padding: 0.72rem 1rem;
    font-weight: 700;
    cursor: pointer;
    transition: transform 150ms ease, box-shadow 150ms ease, background 150ms ease;
  }

  .button-row button:hover {
    transform: translateY(-1px);
  }

  .button-primary {
    background: linear-gradient(135deg, #1f7a70, #155e57);
    color: white;
    box-shadow: 0 12px 30px rgba(31, 122, 112, 0.28);
  }

  .button-secondary {
    background: white;
    color: var(--text);
    border: 1px solid rgba(60, 50, 35, 0.12);
  }

  .tree-stage {
    background: rgba(18, 14, 10, 0.9);
    border-radius: 24px;
    position: relative;
    min-height: 720px;
    border: 1px solid rgba(255, 255, 255, 0.07);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
    overflow: hidden;
  }

  .tree-stage::before {
    content: "";
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at 20% 20%, rgba(79, 209, 197, 0.15), transparent 24%),
      radial-gradient(circle at 80% 10%, rgba(251, 191, 36, 0.12), transparent 22%),
      linear-gradient(180deg, rgba(255,255,255,0.04), transparent 30%);
    pointer-events: none;
  }

  #tree-svg {
    width: 100%;
    height: 100%;
    display: block;
  }

  .stats {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    color: var(--muted);
    font-size: 0.94rem;
  }

  .stat-pill {
    background: rgba(255, 255, 255, 0.72);
    border: 1px solid rgba(60, 50, 35, 0.09);
    border-radius: 999px;
    padding: 0.45rem 0.8rem;
  }

  .tree-caption {
    margin-top: 0.9rem;
    color: var(--muted);
    font-size: 0.92rem;
  }

  .tree-node {
    filter: drop-shadow(0 6px 14px rgba(0, 0, 0, 0.22));
    transform-origin: center;
    transition: transform 240ms ease, opacity 240ms ease;
  }

  .tree-node circle {
    stroke: rgba(255,255,255,0.22);
    stroke-width: 2;
  }

  .tree-edge {
    stroke-linecap: round;
    stroke-width: 3;
    opacity: 0.9;
  }

  .hint {
    color: var(--muted);
    font-size: 0.88rem;
  }

  @media (max-width: 980px) {
    .tree-playground {
      width: 100%;
      margin-left: 0;
      transform: none;
    }

    .tree-hero {
      grid-template-columns: 1fr;
    }

    .controls {
      grid-template-columns: 1fr;
    }

    .tree-stage {
      min-height: 560px;
    }
  }
</style>

<div class="tree-playground">
  <div class="tree-hero">
    <section class="tree-copy">
      <div class="kicker">Report 1 interactive tree</div>
      <h1>木の生成を、そのまま動かす。</h1>
      <p>
        ここでは report 1 で出てくる木のイメージを、段階的に成長するアニメーションとして見られます。
        生成規則を変えると、同じ根から別の木が育ちます。
      </p>
      <div class="tree-notes">
        <div class="note-card">Grow を押すと 1 層ずつ展開します。Auto play を使うと自動で成長します。</div>
        <div class="note-card">Branching は各ノードの子の数の上限、Depth は木の深さを決めます。</div>
        <div class="note-card">Seed を変えると、同じ設定でも別の木が生成されます。</div>
      </div>
    </section>

    <section class="control-card">
      <div class="controls">
        <div class="control">
          <label for="seed">Seed</label>
          <input id="seed" type="number" min="1" max="9999" step="1" value="7" />
        </div>
        <div class="control">
          <label for="depth">Depth: <span id="depthValue">5</span></label>
          <input id="depth" type="range" min="2" max="7" step="1" value="5" />
        </div>
        <div class="control">
          <label for="branching">Max branching: <span id="branchingValue">3</span></label>
          <input id="branching" type="range" min="1" max="4" step="1" value="3" />
        </div>
        <div class="control">
          <label for="speed">Speed: <span id="speedValue">700 ms</span></label>
          <input id="speed" type="range" min="250" max="1400" step="50" value="700" />
        </div>
        <div class="control">
          <label for="style">Style</label>
          <select id="style">
            <option value="balanced">Balanced</option>
            <option value="spiky">Spiky</option>
            <option value="bushy">Bushy</option>
          </select>
        </div>
        <div class="control">
          <label for="labels">Labels</label>
          <select id="labels">
            <option value="numbers">Numbers</option>
            <option value="letters">Letters</option>
            <option value="symbols">Symbols</option>
          </select>
        </div>
      </div>

      <div class="button-row">
        <button class="button-primary" id="growBtn" type="button">Grow one level</button>
        <button class="button-secondary" id="resetBtn" type="button">Reset</button>
        <button class="button-secondary" id="autoBtn" type="button">Auto play</button>
        <span class="hint" id="statusText">Ready.</span>
      </div>

      <div class="stats">
        <div class="stat-pill">Visible nodes: <strong id="visibleNodes">1</strong></div>
        <div class="stat-pill">Total nodes: <strong id="totalNodes">1</strong></div>
        <div class="stat-pill">Current depth: <strong id="currentDepth">0</strong></div>
      </div>
    </section>
  </div>

  <div class="tree-stage" aria-label="Interactive tree animation">
    <svg id="tree-svg" viewBox="0 0 1200 720" role="img" aria-labelledby="tree-title tree-desc">
      <title id="tree-title">Animated tree generator</title>
      <desc id="tree-desc">A tree grows level by level with animated nodes and connecting edges.</desc>
    </svg>
  </div>

  <p class="tree-caption">
    このページは _programs に置いたまま、サイトから直接開けるようにしています。
  </p>
</div>

<script>
document.addEventListener('DOMContentLoaded', function () {
  const svg = document.getElementById('tree-svg');
  const seedInput = document.getElementById('seed');
  const depthInput = document.getElementById('depth');
  const branchingInput = document.getElementById('branching');
  const speedInput = document.getElementById('speed');
  const styleInput = document.getElementById('style');
  const labelsInput = document.getElementById('labels');
  const depthValue = document.getElementById('depthValue');
  const branchingValue = document.getElementById('branchingValue');
  const speedValue = document.getElementById('speedValue');
  const growBtn = document.getElementById('growBtn');
  const resetBtn = document.getElementById('resetBtn');
  const autoBtn = document.getElementById('autoBtn');
  const statusText = document.getElementById('statusText');
  const visibleNodes = document.getElementById('visibleNodes');
  const totalNodes = document.getElementById('totalNodes');
  const currentDepth = document.getElementById('currentDepth');

  const palette = ['#1f7a70', '#2b5f95', '#8a5cf6', '#d97706', '#db2777'];
  const symbols = ['α', 'β', 'γ', 'δ', 'ε', 'ζ', 'η', 'θ'];

  let model = null;
  let revealDepth = 0;
  let autoTimer = null;
  let animationFrames = [];

  function makeRng(seed) {
    let state = Math.max(1, seed | 0) % 2147483647;
    return function () {
      state = state * 16807 % 2147483647;
      return (state - 1) / 2147483646;
    };
  }

  function labelFor(index, mode) {
    if (mode === 'letters') {
      return String.fromCharCode(65 + (index % 26));
    }
    if (mode === 'symbols') {
      return symbols[index % symbols.length];
    }
    return String(index + 1);
  }

  function decideChildren(rng, depth, maxDepth, maxBranching, style) {
    if (depth >= maxDepth) {
      return 0;
    }

    const roll = rng();
    if (style === 'spiky') {
      if (roll < 0.2) return 0;
      if (roll < 0.48) return 1;
      if (roll < 0.82) return Math.min(maxBranching, 2);
      return maxBranching;
    }

    if (style === 'bushy') {
      if (roll < 0.08) return 0;
      if (roll < 0.24) return 1;
      if (roll < 0.62) return Math.min(maxBranching, 2 + (maxBranching > 2 && rng() > 0.45 ? 1 : 0));
      return maxBranching;
    }

    if (roll < 0.1) return 0;
    if (roll < 0.32) return 1;
    if (roll < 0.7) return Math.min(maxBranching, 2);
    return maxBranching;
  }

  function buildTree() {
    const seed = Number(seedInput.value) || 1;
    const maxDepth = Number(depthInput.value);
    const maxBranching = Number(branchingInput.value);
    const style = styleInput.value;
    const labelsMode = labelsInput.value;
    const rng = makeRng(seed);

    let nextId = 0;

    function createNode(depth, parentId) {
      const node = {
        id: nextId++,
        depth,
        parentId,
        label: labelFor(nextId - 1, labelsMode),
        children: []
      };
      let childCount = decideChildren(rng, depth, maxDepth, maxBranching, style);

      // Ensure the animation actually grows from the root for any seed.
      if (depth === 0 && maxDepth > 0 && childCount === 0) {
        childCount = Math.min(Math.max(1, maxBranching), 2);
      }

      for (let i = 0; i < childCount; i += 1) {
        node.children.push(createNode(depth + 1, node.id));
      }
      return node;
    }

    const root = createNode(0, null);
    const nodes = [];
    const edges = [];

    function collect(node) {
      nodes.push(node);
      node.children.forEach((child) => {
        edges.push({ from: node.id, to: child.id });
        collect(child);
      });
    }

    collect(root);

    const layers = [];
    nodes.forEach((node) => {
      if (!layers[node.depth]) {
        layers[node.depth] = [];
      }
      layers[node.depth].push(node);
    });

    return { root, nodes, edges, layers, maxDepth };
  }

  function countLeaves(node) {
    if (node.children.length === 0) {
      return 1;
    }
    return node.children.reduce((sum, child) => sum + countLeaves(child), 0);
  }

  function measureLayout(node, left, right, result) {
    const span = right - left;
    const center = left + span / 2;
    result.set(node.id, center);

    if (node.children.length === 0) {
      return;
    }

    const totalWeight = countLeaves(node);
    let cursor = left;
    node.children.forEach((child) => {
      const childWeight = countLeaves(child);
      const childSpan = span * (childWeight / totalWeight);
      measureLayout(child, cursor, cursor + childSpan, result);
      cursor += childSpan;
    });
  }

  function visibleNodesForDepth(limitDepth) {
    return model.nodes.filter((node) => node.depth <= limitDepth);
  }

  function visibleEdgesForDepth(limitDepth) {
    return model.edges.filter((edge) => {
      const fromNode = model.nodes.find((node) => node.id === edge.from);
      const toNode = model.nodes.find((node) => node.id === edge.to);
      return fromNode && toNode && fromNode.depth <= limitDepth && toNode.depth <= limitDepth;
    });
  }

  function clearSvg() {
    while (svg.firstChild) {
      svg.removeChild(svg.firstChild);
    }
  }

  function element(name, attrs) {
    const el = document.createElementNS('http://www.w3.org/2000/svg', name);
    Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value));
    return el;
  }

  function render() {
    animationFrames.forEach(cancelAnimationFrame);
    animationFrames = [];

    clearSvg();

    const width = 1200;
    const height = 720;
    const paddingX = 70;
    const paddingTop = 70;
    const paddingBottom = 80;
    const availableHeight = height - paddingTop - paddingBottom;
    const visible = visibleNodesForDepth(revealDepth);
    const edges = visibleEdgesForDepth(revealDepth);
    const positions = new Map();

    measureLayout(model.root, paddingX, width - paddingX, positions);

    const depthGap = Math.max(95, availableHeight / Math.max(2, depthInput.value));

    const defs = element('defs', {});
    const gradient = element('linearGradient', { id: 'nodeGradient', x1: '0%', y1: '0%', x2: '100%', y2: '100%' });
    gradient.appendChild(element('stop', { offset: '0%', 'stop-color': '#1f7a70' }));
    gradient.appendChild(element('stop', { offset: '100%', 'stop-color': '#d97706' }));
    defs.appendChild(gradient);
    svg.appendChild(defs);

    edges.forEach((edge, index) => {
      const from = model.nodes.find((node) => node.id === edge.from);
      const to = model.nodes.find((node) => node.id === edge.to);
      if (!from || !to) {
        return;
      }
      const x1 = positions.get(from.id);
      const x2 = positions.get(to.id);
      const y1 = paddingTop + from.depth * depthGap;
      const y2 = paddingTop + to.depth * depthGap;
      const line = element('line', {
        x1,
        y1,
        x2,
        y2,
        class: 'tree-edge',
        stroke: palette[(from.depth + index) % palette.length],
        'stroke-dasharray': '8 16',
        'stroke-dashoffset': '24'
      });
      line.style.opacity = '0';
      svg.appendChild(line);
      animationFrames.push(requestAnimationFrame(() => {
        line.style.transition = 'opacity 280ms ease, stroke-dashoffset 700ms ease';
        line.style.opacity = '0.95';
        line.style.strokeDashoffset = '0';
      }));
    });

    visible.forEach((node) => {
      const x = positions.get(node.id);
      const y = paddingTop + node.depth * depthGap;
      const group = element('g', {
        class: 'tree-node',
        transform: 'translate(' + x + ',' + y + ') scale(0.75)'
      });
      group.style.opacity = '0';

      const color = palette[node.depth % palette.length];
      group.appendChild(element('circle', {
        r: node.depth === 0 ? 23 : 18,
        fill: node.depth === 0 ? 'url(#nodeGradient)' : color
      }));

      group.appendChild(element('text', {
        x: 0,
        y: 5,
        'text-anchor': 'middle',
        fill: '#fff',
        'font-size': node.depth === 0 ? '16' : '13',
        'font-weight': '700',
        'font-family': 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
      }));
      group.lastChild.textContent = node.label;

      const meta = element('text', {
        x: 0,
        y: 40,
        'text-anchor': 'middle',
        fill: 'rgba(255,255,255,0.72)',
        'font-size': '11',
        'font-family': 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
      });
      meta.textContent = 'd=' + node.depth;
      group.appendChild(meta);

      svg.appendChild(group);

      animationFrames.push(requestAnimationFrame(() => {
        group.style.transition = 'transform 340ms cubic-bezier(0.2, 0.9, 0.2, 1), opacity 340ms ease';
        group.style.opacity = '1';
        group.style.transform = 'translate(' + x + 'px,' + y + 'px) scale(1)';
      }));
    });

    visibleNodes.textContent = String(visible.length);
    totalNodes.textContent = String(model.nodes.length);
    currentDepth.textContent = String(revealDepth);
    depthValue.textContent = depthInput.value;
    branchingValue.textContent = branchingInput.value;
    speedValue.textContent = speedInput.value + ' ms';
    statusText.textContent = revealDepth >= model.maxDepth ? 'The tree is fully grown.' : 'Ready to grow.';
  }

  function reset(autoGenerate = true) {
    if (autoTimer) {
      clearInterval(autoTimer);
      autoTimer = null;
      autoBtn.textContent = 'Auto play';
    }
    revealDepth = 0;
    model = buildTree();
    if (autoGenerate) {
      render();
    }
  }

  function growOneLevel() {
    if (revealDepth >= model.maxDepth) {
      statusText.textContent = 'Already at the final level.';
      return;
    }
    revealDepth += 1;
    render();
  }

  function toggleAuto() {
    if (autoTimer) {
      clearInterval(autoTimer);
      autoTimer = null;
      autoBtn.textContent = 'Auto play';
      statusText.textContent = 'Auto play stopped.';
      return;
    }

    autoBtn.textContent = 'Stop';
    statusText.textContent = 'Auto play running.';
    autoTimer = setInterval(() => {
      if (revealDepth >= model.maxDepth) {
        clearInterval(autoTimer);
        autoTimer = null;
        autoBtn.textContent = 'Auto play';
        statusText.textContent = 'The tree is fully grown.';
        return;
      }
      growOneLevel();
    }, Number(speedInput.value));
  }

  [seedInput, depthInput, branchingInput, speedInput, styleInput, labelsInput].forEach((input) => {
    input.addEventListener('input', () => {
      reset(true);
    });
    input.addEventListener('change', () => {
      reset(true);
    });
  });

  growBtn.addEventListener('click', growOneLevel);
  resetBtn.addEventListener('click', () => reset(true));
  autoBtn.addEventListener('click', toggleAuto);

  reset(true);
});
</script>