---
layout: single
title: "Chemistry Quiz"
permalink: /programs/chemistry_quiz/
author_profile: false
classes: wide
---

<div id="chemistry-quiz" class="chem-quiz"></div>

<style>
  .chem-quiz {
    --bg: #f4efe7;
    --panel: rgba(255, 255, 255, 0.84);
    --panel-strong: rgba(255, 255, 255, 0.95);
    --panel-border: rgba(51, 44, 34, 0.12);
    --text: #1f1a16;
    --muted: #6d6258;
    --accent: #0f766e;
    --accent-2: #b45309;
    --accent-3: #7c3aed;
    --good: #0f8b63;
    --bad: #c2410c;
    --shadow: 0 28px 70px rgba(53, 42, 27, 0.16);
    color: var(--text);
    background:
      radial-gradient(circle at top left, rgba(15, 118, 110, 0.16), transparent 34%),
      radial-gradient(circle at top right, rgba(180, 83, 9, 0.14), transparent 30%),
      linear-gradient(180deg, #fbf7f0 0%, #f4ede2 100%);
    border: 1px solid rgba(70, 55, 36, 0.08);
    border-radius: 28px;
    padding: 1.25rem;
    box-shadow: var(--shadow);
    overflow: hidden;
  }

  .chem-hero {
    display: grid;
    grid-template-columns: minmax(0, 1.2fr) minmax(280px, 0.8fr);
    gap: 1rem;
    align-items: stretch;
    margin-bottom: 1rem;
  }

  .chem-hero__panel,
  .chem-card,
  .chem-results,
  .chem-email {
    background: var(--panel);
    backdrop-filter: blur(10px);
    border: 1px solid var(--panel-border);
    border-radius: 22px;
    box-shadow: 0 14px 36px rgba(56, 43, 24, 0.08);
  }

  .chem-hero__panel {
    padding: 1.3rem 1.35rem;
  }

  .chem-kicker {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.4rem 0.75rem;
    border-radius: 999px;
    background: rgba(15, 118, 110, 0.12);
    color: var(--accent);
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .chem-title {
    margin: 0.75rem 0 0.4rem;
    font-size: clamp(2rem, 4vw, 3.4rem);
    line-height: 1.02;
    letter-spacing: -0.04em;
  }

  .chem-subtitle {
    margin: 0;
    max-width: 68ch;
    color: var(--muted);
    font-size: 1rem;
    line-height: 1.6;
  }

  .chem-meta {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.75rem;
  }

  .chem-metric {
    padding: 1rem;
    border-radius: 18px;
    background: var(--panel-strong);
    border: 1px solid rgba(50, 40, 28, 0.08);
  }

  .chem-metric__label {
    display: block;
    color: var(--muted);
    font-size: 0.82rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 0.35rem;
  }

  .chem-metric__value {
    font-size: 1.18rem;
    font-weight: 800;
  }

  .chem-board {
    display: grid;
    gap: 1rem;
  }

  .chem-toolbar {
    display: flex;
    flex-wrap: wrap;
    gap: 0.65rem;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.1rem;
    background: rgba(255, 255, 255, 0.74);
    border: 1px solid var(--panel-border);
    border-radius: 20px;
  }

  .chem-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 0.55rem;
  }

  .chem-tab {
    border: 1px solid rgba(25, 22, 18, 0.12);
    background: #fff;
    color: var(--text);
    border-radius: 999px;
    padding: 0.65rem 0.95rem;
    font-weight: 700;
    cursor: pointer;
    transition: transform 0.16s ease, background 0.16s ease, color 0.16s ease, border-color 0.16s ease;
  }

  .chem-tab:hover {
    transform: translateY(-1px);
  }

  .chem-tab[aria-selected="true"] {
    background: linear-gradient(135deg, var(--accent), #115e59);
    border-color: transparent;
    color: #fff;
  }

  .chem-actions {
    display: flex;
    gap: 0.55rem;
    flex-wrap: wrap;
  }

  .chem-btn {
    border: 0;
    border-radius: 999px;
    padding: 0.72rem 1rem;
    font-weight: 700;
    cursor: pointer;
    transition: transform 0.16s ease, box-shadow 0.16s ease, opacity 0.16s ease;
  }

  .chem-btn:hover {
    transform: translateY(-1px);
  }

  .chem-btn--primary {
    background: linear-gradient(135deg, var(--accent), #115e59);
    color: #fff;
    box-shadow: 0 10px 24px rgba(15, 118, 110, 0.22);
  }

  .chem-btn--secondary {
    background: #f4f0eb;
    color: var(--text);
  }

  .chem-btn--ghost {
    background: transparent;
    color: var(--accent-2);
    border: 1px solid rgba(180, 83, 9, 0.22);
  }

  .chem-card {
    padding: 1.15rem;
  }

  .chem-test-header {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    justify-content: space-between;
    align-items: start;
    margin-bottom: 1rem;
  }

  .chem-test-title {
    margin: 0;
    font-size: 1.45rem;
  }

  .chem-test-note {
    margin: 0.25rem 0 0;
    color: var(--muted);
  }

  .chem-timer {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.7rem 0.9rem;
    border-radius: 999px;
    background: rgba(15, 118, 110, 0.1);
    color: var(--accent);
    font-weight: 700;
  }

  .chem-questions {
    display: grid;
    gap: 0.9rem;
  }

  .chem-question {
    padding: 1rem;
    border: 1px solid rgba(50, 40, 28, 0.08);
    border-radius: 18px;
    background: rgba(255, 255, 255, 0.82);
  }

  .chem-question__title {
    margin: 0 0 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
  }

  .chem-options {
    display: grid;
    gap: 0.45rem;
  }

  .chem-option {
    display: flex;
    align-items: flex-start;
    gap: 0.6rem;
    padding: 0.7rem 0.8rem;
    border-radius: 14px;
    border: 1px solid rgba(70, 55, 36, 0.1);
    background: #fff;
    color: var(--text) !important;
  }

  .chem-option input {
    margin-top: 0.15rem;
  }

  .chem-option span {
    line-height: 1.45;
    color: var(--text) !important;
  }

  .chem-option strong {
    color: var(--text) !important;
  }

  .chem-results,
  .chem-email {
    padding: 1.15rem;
  }

  .chem-results {
    display: none;
    margin-top: 1rem;
  }

  .chem-results.is-visible {
    display: grid;
    gap: 0.9rem;
  }

  .chem-score {
    display: grid;
    gap: 0.35rem;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .chem-score__box {
    padding: 1rem;
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid rgba(50, 40, 28, 0.08);
  }

  .chem-score__label {
    display: block;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-size: 0.8rem;
    margin-bottom: 0.3rem;
  }

  .chem-score__value {
    font-size: 1.45rem;
    font-weight: 800;
  }

  .chem-review {
    display: grid;
    gap: 0.7rem;
  }

  .chem-review__item {
    padding: 0.95rem 1rem;
    border-radius: 16px;
    background: #fff;
    border: 1px solid rgba(50, 40, 28, 0.08);
  }

  .chem-review__item.is-correct {
    border-color: rgba(15, 139, 99, 0.28);
    background: rgba(15, 139, 99, 0.06);
  }

  .chem-review__item.is-wrong {
    border-color: rgba(194, 65, 12, 0.24);
    background: rgba(194, 65, 12, 0.05);
  }

  .chem-review__question {
    margin: 0 0 0.35rem;
    font-weight: 700;
  }

  .chem-review__line {
    margin: 0.2rem 0;
    color: var(--muted);
  }

  .chem-review__line strong {
    color: var(--text);
  }

  .chem-email {
    display: none;
    margin-top: 0.9rem;
  }

  .chem-email.is-visible {
    display: grid;
    gap: 0.8rem;
  }

  .chem-email__row {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 0.75rem;
    align-items: center;
  }

  .chem-email input {
    width: 100%;
    padding: 0.85rem 0.95rem;
    border-radius: 14px;
    border: 1px solid rgba(70, 55, 36, 0.16);
    background: #fff;
    font: inherit;
  }

  .chem-help {
    color: var(--muted);
    font-size: 0.95rem;
    margin: 0;
    line-height: 1.5;
  }

  .chem-status {
    margin: 0;
    font-size: 0.95rem;
    color: var(--muted);
  }

  .chem-status.is-error {
    color: var(--bad);
  }

  .chem-status.is-success {
    color: var(--good);
  }

  @media (max-width: 900px) {
    .chem-hero {
      grid-template-columns: 1fr;
    }

    .chem-meta,
    .chem-score,
    .chem-email__row {
      grid-template-columns: 1fr;
    }

    .chem-toolbar {
      align-items: stretch;
    }

    .chem-actions {
      width: 100%;
    }

    .chem-actions .chem-btn {
      flex: 1 1 auto;
    }
  }
</style>

<script>
  const TESTS = [
    {
      title: 'Test 1',
      focus: 'Atomic structure, periodic trends, and bonding',
      questions: [
        {
          prompt: '1. What is the atomic number of an element?',
          options: ['The number of neutrons', 'The number of protons', 'The number of electrons plus neutrons', 'The mass number minus the atomic mass'],
          answer: 1,
          explanation: 'Atomic number equals the number of protons in the nucleus; it uniquely identifies an element.',
        },
        {
          prompt: '2. Which element is a noble gas?',
          options: ['Chlorine', 'Neon', 'Sodium', 'Fluorine'],
          answer: 1,
          explanation: 'Noble gases occupy Group 18 and are inert; Neon (Ne) is one of them.',
        },
        {
          prompt: '3. Which group in the periodic table contains the halogens?',
          options: ['Group 1', 'Group 2', 'Group 17', 'Group 18'],
          answer: 2,
          explanation: 'Halogens are in Group 17 (formerly Group VIIA) and include F, Cl, Br, I.',
        },
        {
          prompt: '4. Which compound is most likely ionic?',
          options: ['H2O', 'CO2', 'NaCl', 'CH4'],
          answer: 2,
          explanation: 'NaCl is formed from a metal (Na) and a nonmetal (Cl) and typically forms ionic bonds.',
        },
        {
          prompt: '5. What is the pH of pure water at 25 C?',
          options: ['0', '3', '7', '14'],
          answer: 2,
          explanation: 'Pure water is neutral at 25°C with pH 7 (equal H+ and OH- concentrations).',
        },
        {
          prompt: '6. Which element has the highest electronegativity?',
          options: ['Sodium', 'Oxygen', 'Fluorine', 'Carbon'],
          answer: 2,
          explanation: 'Fluorine is the most electronegative element, attracting electrons strongly in bonds.',
        },
        {
          prompt: '7. Which is a chemical change?',
          options: ['Melting ice', 'Boiling water', 'Rusting iron', 'Cutting paper'],
          answer: 2,
          explanation: 'Rusting iron involves formation of new compounds (oxides) — a chemical change; melting/boiling are physical.',
        },
        {
          prompt: '8. The formula H2O2 is for which substance?',
          options: ['Hydrogen peroxide', 'Hydrogen hydroxide', 'Water', 'Ozone'],
          answer: 0,
          explanation: 'H2O2 is hydrogen peroxide (one extra oxygen compared to water, H2O).',
        },
        {
          prompt: '9. What is the electron configuration of sodium (Na)?',
          options: ['2, 8', '2, 8, 1', '2, 7, 2', '1, 8, 2'],
          answer: 1,
          explanation: 'Sodium has 11 electrons: distribution is 2 in first shell, 8 in second, 1 in third (2,8,1).',
        },
        {
          prompt: '10. A covalent bond is formed when atoms',
          options: ['transfer electrons', 'share electrons', 'exchange neutrons', 'lose protons'],
          answer: 1,
          explanation: 'Covalent bonds involve sharing electron pairs between atoms (typical between nonmetals).',
        },
      ],
    },
    {
      title: 'Test 2',
      focus: 'Moles, gases, solutions, and energy changes',
      questions: [
        {
          prompt: '1. One mole of a substance contains approximately',
          options: ['6.02 x 10^23 particles', '3.00 x 10^8 particles', '1.00 x 10^2 particles', '9.81 x 10^1 particles'],
          answer: 0,
          explanation: 'Avogadro\'s number (~6.02×10^23) is the number of particles in one mole of substance.',
        },
        {
          prompt: '2. What is the molar mass of carbon dioxide (CO2)?',
          options: ['28 g/mol', '32 g/mol', '44 g/mol', '48 g/mol'],
          answer: 2,
          explanation: 'CO2 has one C (12 g/mol) and two O (2×16 g/mol) → 12 + 32 = 44 g/mol.',
        },
        {
          prompt: '3. If temperature is constant and volume decreases, gas pressure usually',
          options: ['decreases', 'stays the same', 'increases', 'becomes zero'],
          answer: 2,
          explanation: "Boyle's law: at constant temperature, pressure and volume are inversely related, so decreasing volume raises pressure.",
        },
        {
          prompt: '4. Which equation is used for dilution problems?',
          options: ['PV = nRT', 'M1V1 = M2V2', 'F = ma', 'E = mc^2'],
          answer: 1,
          explanation: 'Dilution conserves moles of solute: M1V1 = M2V2 relates initial and final concentrations and volumes.',
        },
        {
          prompt: '5. An exothermic reaction',
          options: ['absorbs heat', 'releases heat', 'creates mass', 'stops at equilibrium'],
          answer: 1,
          explanation: 'Exothermic reactions release heat to the surroundings (temperature of surroundings rises).',
        },
        {
          prompt: '6. A solution concentration in mol/L is called',
          options: ['density', 'molarity', 'normality', 'solubility'],
          answer: 1,
          explanation: 'Molarity (M) is moles of solute per liter of solution (mol/L).',
        },
        {
          prompt: '7. Which statement best describes a saturated solution?',
          options: ['It contains no solute', 'It can dissolve more solute at the same temperature', 'It contains the maximum dissolved solute at that temperature', 'It is always a gas'],
          answer: 2,
          explanation: 'A saturated solution holds the maximum amount of dissolved solute at that temperature; adding more causes precipitation.',
        },
        {
          prompt: '8. Which factor generally increases the solubility of most solid solutes in water?',
          options: ['Lowering temperature', 'Raising temperature', 'Reducing the amount of solvent to zero', 'Reducing pressure dramatically'],
          answer: 1,
          explanation: 'For many solids, solubility in water increases with temperature (though there are exceptions).',
        },
        {
          prompt: '9. What does the ideal gas law relate?',
          options: ['Force, mass, and acceleration', 'Pressure, volume, temperature, and amount of gas', 'Heat, work, and entropy only', 'Density, viscosity, and flow rate'],
          answer: 1,
          explanation: 'PV = nRT links pressure (P), volume (V), temperature (T), and amount in moles (n) for ideal gases.',
        },
        {
          prompt: '10. An endothermic process',
          options: ['releases heat to the surroundings', 'absorbs heat from the surroundings', 'has no energy change', 'must always be spontaneous'],
          answer: 1,
          explanation: 'Endothermic processes absorb heat from their surroundings (e.g., ice melting absorbs heat).',
        },
      ],
    },
    {
      title: 'Test 3',
      focus: 'Acids, bases, redox, equilibrium, and reaction rates',
      questions: [
        {
          prompt: '1. A strong acid example is',
          options: ['HCl', 'NaOH', 'NaCl', 'CH4'],
          answer: 0,
          explanation: 'Hydrochloric acid (HCl) is a common strong acid that fully dissociates in water.',
        },
        {
          prompt: '2. An acid turns blue litmus paper',
          options: ['red', 'green', 'white', 'black'],
          answer: 0,
          explanation: 'Acids turn blue litmus paper red due to increased H+ concentration.',
        },
        {
          prompt: '3. A base turns red litmus paper',
          options: ['red', 'blue', 'yellow', 'orange'],
          answer: 1,
          explanation: 'Bases turn red litmus paper blue because they produce OH- which changes the indicator.',
        },
        {
          prompt: '4. Oxidation means',
          options: ['gain of electrons', 'loss of electrons', 'gain of protons', 'loss of neutrons'],
          answer: 1,
          explanation: 'Oxidation is loss of electrons; reduction is gain of electrons (OIL RIG mnemonic).',
        },
        {
          prompt: '5. Reduction means',
          options: ['gain of electrons', 'loss of electrons', 'gain of heat', 'loss of mass'],
          answer: 0,
          explanation: 'Reduction is gain of electrons; in redox pairs one species is oxidized and the other reduced.',
        },
        {
          prompt: '6. A catalyst',
          options: ['raises activation energy', 'lowers activation energy', 'changes the equilibrium constant', 'is consumed permanently'],
          answer: 1,
          explanation: 'A catalyst lowers the activation energy and speeds up both forward and reverse reactions without being consumed.',
        },
        {
          prompt: '7. At chemical equilibrium, the system is',
          options: ['completely stopped', 'dynamic, with forward and reverse reactions continuing', 'always pure product', 'always pure reactant'],
          answer: 1,
          explanation: 'Equilibrium is dynamic: forward and reverse rates are equal, so concentrations stay constant.',
        },
        {
          prompt: '8. If pressure increases for a gas equilibrium, the system usually shifts toward',
          options: ['the side with more gas molecules', 'the side with fewer gas molecules', 'the side with more liquid', 'no shift ever occurs'],
          answer: 1,
          explanation: "Le Châtelier's principle: increasing pressure favors the side with fewer gas molecules to reduce pressure.",
        },
        {
          prompt: '9. A buffer solution is used to',
          options: ['increase temperature quickly', 'resist changes in pH', 'make a solution pure', 'force complete precipitation'],
          answer: 1,
          explanation: 'A buffer resists pH changes by neutralizing added acid or base (contains a weak acid/base and its conjugate).',
        },
        {
          prompt: '10. In the reaction Zn + Cu2+ -> Zn2+ + Cu, zinc is the',
          options: ['oxidizing agent', 'reducing agent', 'catalyst', 'neutral salt'],
          answer: 1,
          explanation: 'Zinc loses electrons (Zn → Zn2+) so it is oxidized and thus acts as the reducing agent for Cu2+.',
        },
      ],
    },
  ];

  const EMAIL_ENDPOINT = window.CHEMISTRY_QUIZ_EMAIL_ENDPOINT || '';
  const root = document.getElementById('chemistry-quiz');

  const state = {
    testIndex: 0,
    startedAt: null,
    timer: null,
    submitted: false,
    answers: Array(10).fill(null),
    result: null,
    status: '',
    statusType: '',
  };

  function pad(value) {
    return String(value).padStart(2, '0');
  }

  function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.max(0, totalSeconds % 60);
    return `${pad(minutes)}:${pad(seconds)}`;
  }

  function currentElapsedSeconds() {
    if (!state.startedAt) {
      return 0;
    }
    return Math.floor((Date.now() - state.startedAt) / 1000);
  }

  function setStatus(message, kind = '') {
    state.status = message;
    state.statusType = kind;
  }

  function updateTimerText() {
    document.querySelectorAll('[data-timer]').forEach((timer) => {
      timer.textContent = `Time: ${formatTime(currentElapsedSeconds())}`;
    });
  }

  function stopTimer() {
    if (state.timer) {
      clearInterval(state.timer);
      state.timer = null;
    }
  }

  function startTimer() {
    stopTimer();
    state.startedAt = Date.now();
    updateTimerText();
    state.timer = setInterval(updateTimerText, 1000);
  }

  function startTest(index) {
    state.testIndex = index;
    state.answers = Array(10).fill(null);
    state.submitted = false;
    state.result = null;
    setStatus('Test ready. Answer all questions, then submit.', '');
    startTimer();
    render();
  }

  function selectAnswer(questionIndex, value) {
    if (state.submitted) {
      return;
    }
    state.answers[questionIndex] = Number(value);
    renderQuestions();
  }

  function getScore() {
    const questions = TESTS[state.testIndex].questions;
    let score = 0;
    const review = questions.map((question, index) => {
      const selected = state.answers[index];
      const correct = selected === question.answer;
      if (correct) {
        score += 1;
      }
      return {
        question: question.prompt,
        selected,
        correctIndex: question.answer,
        correct,
        selectedText: selected === null ? 'No answer selected' : question.options[selected],
        correctText: question.options[question.answer],
        explanation: question.explanation || '',
      };
    });
    return { score, review };
  }

  function renderTabs() {
    return TESTS.map((test, index) => {
      const selected = index === state.testIndex;
      return `<button class="chem-tab" type="button" aria-selected="${selected}" data-test-tab="${index}">${test.title}</button>`;
    }).join('');
  }

  function renderQuestions() {
    const questionsHost = document.querySelector('[data-questions]');
    if (!questionsHost) {
      return;
    }
    const test = TESTS[state.testIndex];
    questionsHost.innerHTML = test.questions.map((question, qIndex) => {
      const optionsHtml = question.options.map((option, optionIndex) => {
        const checked = state.answers[qIndex] === optionIndex ? 'checked' : '';
        const disabled = state.submitted ? 'disabled' : '';
        return `
          <label class="chem-option">
            <input type="radio" name="q-${qIndex}" value="${optionIndex}" ${checked} ${disabled} />
            <span><strong>${String.fromCharCode(65 + optionIndex)}.</strong> ${option}</span>
          </label>
        `;
      }).join('');

      return `
        <section class="chem-question" id="question-${qIndex}">
          <h3 class="chem-question__title">${question.prompt}</h3>
          <div class="chem-options">${optionsHtml}</div>
        </section>
      `;
    }).join('');

    questionsHost.querySelectorAll('input[type="radio"]').forEach((input) => {
      input.addEventListener('change', (event) => {
        const target = event.currentTarget;
        const questionIndex = Number(target.name.replace('q-', ''));
        selectAnswer(questionIndex, target.value);
      });
    });
  }

  function renderResults() {
    const resultsHost = document.querySelector('[data-results]');
    const emailHost = document.querySelector('[data-email]');
    const summaryHost = document.querySelector('[data-summary]');
    if (!resultsHost || !emailHost || !summaryHost) {
      return;
    }

    if (!state.submitted || !state.result) {
      resultsHost.classList.remove('is-visible');
      emailHost.classList.remove('is-visible');
      summaryHost.innerHTML = '';
      return;
    }

    const test = TESTS[state.testIndex];
    const { score, review } = state.result;

    summaryHost.innerHTML = `
      <div class="chem-score">
        <div class="chem-score__box">
          <span class="chem-score__label">Score</span>
          <div class="chem-score__value">${score} / ${test.questions.length}</div>
        </div>
        <div class="chem-score__box">
          <span class="chem-score__label">Time Taken</span>
          <div class="chem-score__value">${formatTime(currentElapsedSeconds())}</div>
        </div>
      </div>
      <div class="chem-review">
        ${review.map((item, index) => `
          <article class="chem-review__item ${item.correct ? 'is-correct' : 'is-wrong'}">
            <p class="chem-review__question">${index + 1}. ${item.question}</p>
            <p class="chem-review__line"><strong>Your answer:</strong> ${item.selectedText}</p>
            <p class="chem-review__line"><strong>Correct answer:</strong> ${item.correctText}</p>
            ${!item.correct && item.explanation ? `<p class="chem-review__line"><strong>Explanation:</strong> ${item.explanation}</p>` : ''}
          </article>
        `).join('')}
      </div>
    `;

    resultsHost.classList.add('is-visible');
    emailHost.classList.add('is-visible');
  }

  function setButtonState() {
    const submitButton = document.querySelector('[data-submit]');
    const retakeButton = document.querySelector('[data-retake]');
    if (submitButton) {
      submitButton.disabled = state.submitted;
    }
    if (retakeButton) {
      retakeButton.disabled = !state.submitted;
    }
  }

  function renderToolbar() {
    const tabsHost = document.querySelector('[data-tabs]');
    const testTitleHosts = document.querySelectorAll('[data-test-title]');
    const testNoteHosts = document.querySelectorAll('[data-test-note]');
    if (!tabsHost || !testTitleHosts.length || !testNoteHosts.length) {
      return;
    }
    tabsHost.innerHTML = renderTabs();
    testTitleHosts.forEach((host) => {
      host.textContent = TESTS[state.testIndex].title;
    });
    testNoteHosts.forEach((host) => {
      host.textContent = TESTS[state.testIndex].focus;
    });

    tabsHost.querySelectorAll('[data-test-tab]').forEach((button) => {
      button.addEventListener('click', () => {
        startTest(Number(button.getAttribute('data-test-tab')));
      });
    });
  }

  function renderStatus() {
    const statusHost = document.querySelector('[data-status]');
    if (!statusHost) {
      return;
    }
    statusHost.textContent = state.status;
    statusHost.className = 'chem-status';
    if (state.statusType === 'error') {
      statusHost.classList.add('is-error');
    }
    if (state.statusType === 'success') {
      statusHost.classList.add('is-success');
    }
  }

  function renderEmailPanel() {
    const endpointHost = document.querySelector('[data-endpoint-note]');
    const sendButton = document.querySelector('[data-send-email]');
    if (!endpointHost || !sendButton) {
      return;
    }

    if (EMAIL_ENDPOINT) {
      endpointHost.textContent = 'Email relay is enabled. Enter an address and send the result.';
      sendButton.disabled = false;
    } else {
      endpointHost.textContent = 'Email relay is not configured yet. Connect a serverless endpoint to enable sending.';
      sendButton.disabled = true;
    }
  }

  async function sendEmail() {
    const input = document.querySelector('[data-email-input]');
    if (!input) {
      return;
    }

    const email = input.value.trim();
    if (!email) {
      setStatus('Enter an email address first.', 'error');
      renderStatus();
      return;
    }

    if (!EMAIL_ENDPOINT) {
      setStatus('Email sending is disabled until a serverless endpoint is configured.', 'error');
      renderStatus();
      return;
    }

    const payload = {
      email,
      testTitle: TESTS[state.testIndex].title,
      score: state.result.score,
      total: TESTS[state.testIndex].questions.length,
      timeTaken: formatTime(currentElapsedSeconds()),
      answers: state.result.review,
    };

    const sendButton = document.querySelector('[data-send-email]');
    if (sendButton) {
      sendButton.disabled = true;
      sendButton.textContent = 'Sending...';
    }

    try {
      const response = await fetch(EMAIL_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      setStatus('Result sent by email.', 'success');
    } catch (error) {
      setStatus(`Could not send email: ${error.message}`, 'error');
      if (sendButton) {
        sendButton.disabled = false;
      }
    } finally {
      if (sendButton) {
        sendButton.textContent = 'Send result';
      }
      renderStatus();
    }
  }

  function submitTest() {
    if (state.submitted) {
      return;
    }

    stopTimer();
    state.submitted = true;
    state.result = getScore();
    setStatus(`Submitted ${TESTS[state.testIndex].title}. Review your answers below.`, 'success');
    render();
  }

  function resetCurrentTest() {
    startTest(state.testIndex);
  }

  function render() {
    const test = TESTS[state.testIndex];
    root.innerHTML = `
      <section class="chem-hero">
        <div class="chem-hero__panel">
          <span class="chem-kicker">Interactive Chemistry Quiz</span>
          <h1 class="chem-title">Three 10-question tests, timed and auto-reviewed.</h1>
          <p class="chem-subtitle">
            Practice high-school chemistry with a built-in score report, per-question review, and a configurable email relay for static hosting.
          </p>
        </div>
        <div class="chem-hero__panel chem-meta">
          <div class="chem-metric">
            <span class="chem-metric__label">Current test</span>
            <div class="chem-metric__value" data-test-title>${test.title}</div>
          </div>
          <div class="chem-metric">
            <span class="chem-metric__label">Focus</span>
            <div class="chem-metric__value" data-test-note>${test.focus}</div>
          </div>
          <div class="chem-metric">
            <span class="chem-metric__label">Timer</span>
            <div class="chem-metric__value" data-timer>Time: 00:00</div>
          </div>
        </div>
      </section>

      <section class="chem-board">
        <div class="chem-toolbar">
          <div class="chem-tabs" data-tabs>${renderTabs()}</div>
          <div class="chem-actions">
            <button class="chem-btn chem-btn--secondary" type="button" data-retake ${state.submitted ? '' : 'disabled'}>Retake test</button>
            <button class="chem-btn chem-btn--ghost" type="button" data-submit ${state.submitted ? 'disabled' : ''}>Submit test</button>
          </div>
        </div>

        <div class="chem-card">
          <div class="chem-test-header">
            <div>
              <h2 class="chem-test-title" data-test-title>${test.title}</h2>
              <p class="chem-test-note" data-test-note>${test.focus}</p>
            </div>
            <div class="chem-timer" data-timer>Time: 00:00</div>
          </div>
          <div class="chem-questions" data-questions></div>
        </div>

        <div class="chem-results" data-results>
          <div data-summary></div>
        </div>

        <div class="chem-email" data-email>
          <p class="chem-help">Optional email delivery. This uses a serverless endpoint, which is the recommended approach for GitHub Pages or any other static host.</p>
          <p class="chem-help" data-endpoint-note></p>
          <div class="chem-email__row">
            <input data-email-input type="email" placeholder="name@example.com" aria-label="Email address" />
            <button class="chem-btn chem-btn--primary" type="button" data-send-email>Send result</button>
          </div>
        </div>

        <p class="chem-status" data-status></p>
      </section>
    `;

    renderToolbar();
    renderQuestions();
    setButtonState();
    renderResults();
    renderEmailPanel();
    renderStatus();

    const submitButton = document.querySelector('[data-submit]');
    const retakeButton = document.querySelector('[data-retake]');
    const sendButton = document.querySelector('[data-send-email]');

    if (submitButton) {
      submitButton.addEventListener('click', submitTest);
    }

    if (retakeButton) {
      retakeButton.addEventListener('click', resetCurrentTest);
    }

    if (sendButton) {
      sendButton.addEventListener('click', sendEmail);
    }

    updateTimerText();
  }

  startTest(0);
</script>
