// ── DATA ──
const LANGUAGES = {
  Spanish: {
    flag: "🇪🇸",
    words: [
      { word: "el fuego", hint: "flames, warmth, destruction", answer: "fire", sentence: "El fuego quema." },
      { word: "la luna", hint: "night sky, tides, wolves howl at it", answer: "moon", sentence: "La luna brilla." },
      { word: "el tiempo", hint: "can mean two things: weather & ___", answer: "time", sentence: "El tiempo vuela." },
      { word: "la sombra", hint: "where the sun doesn't reach", answer: "shadow", sentence: "Vivo en la sombra." },
      { word: "el sueño", hint: "what happens when you close your eyes", answer: "dream / sleep", sentence: "Tuve un sueño extraño." },
      { word: "la voz", hint: "you use it to speak or sing", answer: "voice", sentence: "Su voz es hermosa." },
      { word: "el camino", hint: "a route, a path, a journey", answer: "path / road", sentence: "El camino es largo." },
      { word: "el miedo", hint: "what horror movies give you", answer: "fear", sentence: "No tengo miedo." },
      { word: "la fuerza", hint: "strength, power, force", answer: "strength", sentence: "Tiene mucha fuerza." },
      { word: "el cielo", hint: "above the clouds, blue by day", answer: "sky / heaven", sentence: "El cielo es azul." },
    ]
  },
  Japanese: {
    flag: "🇯🇵",
    words: [
      { word: "木漏れ日", hint: "sunlight filtering through tree leaves", answer: "komorebi", sentence: "森の木漏れ日が美しい。" },
      { word: "侘寂", hint: "beauty found in imperfection and transience", answer: "wabi-sabi", sentence: "侘寂の美学。" },
      { word: "木", hint: "it grows, has roots and branches", answer: "tree / wood", sentence: "木が高い。" },
      { word: "海", hint: "vast, salty, where ships sail", answer: "sea / ocean", sentence: "海が見える。" },
      { word: "空", hint: "look up — what do you see?", answer: "sky / emptiness", sentence: "空が青い。" },
      { word: "夢", hint: "your mind's cinema at night", answer: "dream", sentence: "夢を見た。" },
      { word: "雨", hint: "falls from clouds, everything gets wet", answer: "rain", sentence: "雨が降る。" },
      { word: "火", hint: "hot, bright, dangerous", answer: "fire", sentence: "火が熱い。" },
      { word: "心", hint: "not in your chest — in your feelings", answer: "heart / mind", sentence: "心が痛い。" },
      { word: "道", hint: "a path, a way, a philosophy", answer: "road / way / path", sentence: "道を歩く。" },
    ]
  },
  French: {
    flag: "🇫🇷",
    words: [
      { word: "l'aube", hint: "the very first light of day", answer: "dawn", sentence: "L'aube se lève." },
      { word: "le vertige", hint: "looking down from great heights", answer: "vertigo / dizziness", sentence: "J'ai le vertige." },
      { word: "la lumière", hint: "what a candle gives in darkness", answer: "light", sentence: "La lumière brille." },
      { word: "le silence", hint: "the absence of all sound", answer: "silence", sentence: "Le silence règne." },
      { word: "la mer", hint: "vast, blue, full of salt and secrets", answer: "sea", sentence: "La mer est calme." },
      { word: "le cœur", hint: "pumps blood, also holds feelings", answer: "heart", sentence: "Mon cœur bat vite." },
      { word: "l'espoir", hint: "what you have when things might get better", answer: "hope", sentence: "L'espoir est là." },
      { word: "la nuit", hint: "after sunset, before sunrise", answer: "night", sentence: "La nuit tombe." },
      { word: "le regard", hint: "more than a glance — a gaze with intention", answer: "gaze / look", sentence: "Son regard m'attire." },
      { word: "la tempête", hint: "wind, rain, chaos in the sky", answer: "storm", sentence: "La tempête arrive." },
    ]
  },
  Mandarin: {
    flag: "🇨🇳",
    words: [
      { word: "缘分", hint: "the fate that brings two people together", answer: "yuánfèn — destiny/fate in relationships", sentence: "我们有缘分。" },
      { word: "山", hint: "very tall, rocky, often has snow at top", answer: "mountain", sentence: "山很高。" },
      { word: "水", hint: "you drink it, rivers are made of it", answer: "water", sentence: "水很冷。" },
      { word: "风", hint: "you can't see it, but you feel it move", answer: "wind", sentence: "风很大。" },
      { word: "梦", hint: "your sleeping mind's storyteller", answer: "dream", sentence: "我做了一个梦。" },
      { word: "爱", hint: "what you feel for those you treasure most", answer: "love", sentence: "我爱你。" },
      { word: "光", hint: "what makes darkness disappear", answer: "light", sentence: "光很亮。" },
      { word: "心", hint: "physically pumps blood; emotionally holds feelings", answer: "heart / mind", sentence: "我心里很高兴。" },
      { word: "道", hint: "a path, a way, or a philosophy of life", answer: "way / path / Tao", sentence: "道可道，非常道。" },
      { word: "花", hint: "blooms in spring, people buy them as gifts", answer: "flower", sentence: "花很美。" },
    ]
  }
};

// ── STATE ──
let state = {
  screen: "home",
  lang: null,
  mode: "reveal",
  cards: [],
  idx: 0,
  revealed: false,
  typed: "",
  feedback: null,
  score: { correct: 0, wrong: 0 },
  wrongCards: [],
  scrambled: "",
  streak: 0,
  bestStreak: 0,
  thinkTime: 0,
};
let thinkTimer = null;

// ── HELPERS ──
function scramble(word) {
  const chars = word.replace(/[^a-zA-Z]/g, " ").trim().split("");
  for (let i = chars.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }
  return chars.join("");
}

function normalize(str) {
  return str.toLowerCase().replace(/[^a-z]/g, "").trim();
}

function isClose(a, b) {
  const na = normalize(a);
  return b.split("/").some(part => normalize(part) === na);
}

function showScreen(name) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(name).classList.add("active");
  state.screen = name;
}

// ── RENDER ──
function render() {
  const { screen, lang, mode, cards, idx, revealed, feedback, score, streak, thinkTime, scrambled } = state;
  const card = cards[idx];

  if (screen === "home") {
    renderHome();
  } else if (screen === "select") {
    renderSelect();
  } else if (screen === "learn" && card) {
    renderLearn(card);
  } else if (screen === "result") {
    renderResult();
  }
}

function renderHome() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <div class="screen active" id="home">
      <div class="home-glyph">語</div>
      <h1 class="home-title">RECALL</h1>
      <p class="home-subtitle">Language learning through<br>active memory — not passive review</p>
      <div class="pill-row">
        <span class="pill">Think first</span>
        <span class="pill">Then reveal</span>
        <span class="pill">True recall</span>
      </div>
      <button class="big-btn" id="begin-btn">Begin →</button>
      <p class="footnote">No multiple choice. No hints until you struggle.</p>
    </div>
  `;
  document.getElementById("begin-btn").onclick = () => {
    state.screen = "select";
    renderSelectScreen();
  };
}

function renderSelectScreen() {
  const app = document.getElementById("app");
  const langButtons = Object.entries(LANGUAGES).map(([name, data]) => `
    <button class="lang-card ${state.lang === name ? 'selected' : ''}" data-lang="${name}">
      <span class="flag">${data.flag}</span>
      <span class="lang-name">${name}</span>
      <span class="lang-count">${data.words.length} words</span>
    </button>
  `).join("");

  const modeSection = state.lang ? `
    <p class="section-title" style="margin-top:32px">Choose a mode</p>
    <div class="mode-grid">
      ${[
        { id: "reveal", label: "Think & Reveal", desc: "See the word, recall the meaning, then grade yourself honestly." },
        { id: "type", label: "Type It Out", desc: "Force your brain to produce the answer — no choices given." },
        { id: "reconstruct", label: "Reconstruct", desc: "Unscramble the answer letters to rebuild the word from memory." },
      ].map(m => `
        <button class="mode-card ${state.mode === m.id ? 'selected' : ''}" data-mode="${m.id}">
          <span class="mode-label">${m.label}</span>
          <span class="mode-desc">${m.desc}</span>
        </button>
      `).join("")}
    </div>
    <button class="big-btn" id="start-btn">
      Start ${state.lang} — ${state.mode === "reveal" ? "Think & Reveal" : state.mode === "type" ? "Type It" : "Reconstruct"} →
    </button>
  ` : "";

  app.innerHTML = `
    <div class="screen active" id="select">
      <button class="back-btn" id="back-home">← back</button>
      <p class="section-title">Choose a language</p>
      <div class="lang-grid">${langButtons}</div>
      ${modeSection}
    </div>
  `;

  document.getElementById("back-home").onclick = () => renderHome();

  document.querySelectorAll(".lang-card").forEach(btn => {
    btn.onclick = () => {
      state.lang = btn.dataset.lang;
      renderSelectScreen();
    };
  });

  document.querySelectorAll(".mode-card").forEach(btn => {
    btn.onclick = () => {
      state.mode = btn.dataset.mode;
      renderSelectScreen();
    };
  });

  const startBtn = document.getElementById("start-btn");
  if (startBtn) startBtn.onclick = startSession;
}

function startSession() {
  const wordList = [...LANGUAGES[state.lang].words].sort(() => Math.random() - 0.5);
  state.cards = wordList;
  state.idx = 0;
  state.revealed = false;
  state.typed = "";
  state.feedback = null;
  state.score = { correct: 0, wrong: 0 };
  state.wrongCards = [];
  state.streak = 0;
  state.bestStreak = 0;
  state.thinkTime = 0;
  if (state.mode === "reconstruct") state.scrambled = scramble(wordList[0].answer);
  renderLearnScreen();
}

function renderLearnScreen() {
  const { cards, idx, revealed, feedback, score, streak, thinkTime, mode, lang, scrambled } = state;
  const card = cards[idx];
  if (!card) return;

  const progress = Math.round((idx / cards.length) * 100);
  const streakHtml = streak >= 3 ? `<span class="score-streak">🔥${streak}</span>` : "";

  // Action area based on mode + state
  let actionHtml = "";

  if (mode === "reveal") {
    if (!revealed) {
      actionHtml = `
        <p class="think-timer" id="think-timer">⏱ ${thinkTime}s — thinking...</p>
        <button class="reveal-btn" id="reveal-btn">I've thought about it — reveal</button>
      `;
    } else {
      actionHtml = `
        <div class="answer-section">
          <div class="answer-word">${card.answer}</div>
          <div class="sentence-box">${card.sentence}</div>
          <div>
            <p class="grade-label">Did you get it?</p>
            <div class="grade-btns">
              <button class="grade-yes" id="grade-yes">Yes ✓</button>
              <button class="grade-no" id="grade-no">No ✗</button>
            </div>
          </div>
        </div>
      `;
    }
  } else if (mode === "type") {
    if (!feedback) {
      actionHtml = `
        <div class="type-area">
          <input class="type-input" id="type-input" placeholder="type the meaning..." autocomplete="off" spellcheck="false" value="${state.typed}" />
          <button class="reveal-btn" id="check-btn">Check →</button>
        </div>
      `;
    } else {
      actionHtml = `
        <div class="answer-section">
          <div class="feedback-banner ${feedback}">${feedback === "correct" ? "✓ Correct! " : "✗ Not quite — "}<strong>${card.answer}</strong></div>
          ${feedback === "wrong" && state.typed ? `<p class="your-answer">You wrote: <em>${state.typed}</em></p>` : ""}
          <div class="sentence-box">${card.sentence}</div>
          <button class="reveal-btn" id="next-btn">${idx + 1 >= cards.length ? "See Results →" : "Next →"}</button>
        </div>
      `;
    }
  } else if (mode === "reconstruct") {
    if (!feedback) {
      actionHtml = `
        <div class="type-area">
          <div class="scramble-box">${scrambled}</div>
          <input class="type-input" id="type-input" placeholder="unscramble the answer..." autocomplete="off" spellcheck="false" value="${state.typed}" />
          <button class="reveal-btn" id="check-btn">Check →</button>
        </div>
      `;
    } else {
      actionHtml = `
        <div class="answer-section">
          <div class="feedback-banner ${feedback}">${feedback === "correct" ? "✓ Reconstructed! " : "✗ Answer: "}<strong>${card.answer}</strong></div>
          <div class="sentence-box">${card.sentence}</div>
          <button class="reveal-btn" id="next-btn">${idx + 1 >= cards.length ? "See Results →" : "Next →"}</button>
        </div>
      `;
    }
  }

  document.getElementById("app").innerHTML = `
    <div class="screen active" id="learn">
      <div class="top-bar">
        <button class="back-btn" id="close-btn" style="margin:0">✕</button>
        <div class="progress-wrap">
          <div class="progress-bar" style="width:${progress}%"></div>
        </div>
        <div class="score-chip">
          <span class="score-correct">✓${score.correct}</span>
          <span class="score-wrong">✗${score.wrong}</span>
          ${streakHtml}
        </div>
      </div>
      <div class="card-area">
        <div class="card ${feedback || ""}">
          <div class="lang-tag">${LANGUAGES[lang].flag} ${lang}</div>
          <div class="word-display">${card.word}</div>
          <div class="hint-box">
            <span class="hint-label">hint</span>
            <span class="hint-text">${card.hint}</span>
          </div>
          ${actionHtml}
        </div>
        <div class="card-counter">${idx + 1} / ${cards.length}</div>
      </div>
    </div>
  `;

  // Wire up events
  document.getElementById("close-btn").onclick = () => {
    clearInterval(thinkTimer);
    renderSelectScreen();
  };

  if (mode === "reveal" && !revealed) {
    startThinkTimer();
    document.getElementById("reveal-btn").onclick = () => {
      clearInterval(thinkTimer);
      state.revealed = true;
      renderLearnScreen();
    };
  }

  if (mode === "reveal" && revealed) {
    document.getElementById("grade-yes").onclick = () => handleGrade(true);
    document.getElementById("grade-no").onclick = () => handleGrade(false);
  }

  if ((mode === "type" || mode === "reconstruct") && !feedback) {
    const input = document.getElementById("type-input");
    input.focus();
    input.addEventListener("input", e => { state.typed = e.target.value; });
    input.addEventListener("keydown", e => { if (e.key === "Enter") handleCheck(); });
    document.getElementById("check-btn").onclick = handleCheck;
  }

  if (feedback && document.getElementById("next-btn")) {
    document.getElementById("next-btn").onclick = nextCard;
  }
}

function startThinkTimer() {
  clearInterval(thinkTimer);
  state.thinkTime = 0;
  thinkTimer = setInterval(() => {
    state.thinkTime++;
    const el = document.getElementById("think-timer");
    if (el) el.textContent = `⏱ ${state.thinkTime}s — thinking...`;
  }, 1000);
}

function handleCheck() {
  if (!state.typed.trim()) return;
  const correct = isClose(state.typed, state.cards[state.idx].answer);
  state.feedback = correct ? "correct" : "wrong";
  if (correct) {
    state.streak++;
    state.bestStreak = Math.max(state.bestStreak, state.streak);
    state.score.correct++;
  } else {
    state.streak = 0;
    state.score.wrong++;
    state.wrongCards.push(state.cards[state.idx]);
  }
  renderLearnScreen();
}

function handleGrade(correct) {
  if (correct) {
    state.streak++;
    state.bestStreak = Math.max(state.bestStreak, state.streak);
    state.score.correct++;
  } else {
    state.streak = 0;
    state.score.wrong++;
    state.wrongCards.push(state.cards[state.idx]);
  }
  nextCard();
}

function nextCard() {
  if (state.idx + 1 >= state.cards.length) {
    renderResult();
    return;
  }
  state.idx++;
  state.revealed = false;
  state.typed = "";
  state.feedback = null;
  if (state.mode === "reconstruct") {
    state.scrambled = scramble(state.cards[state.idx].answer);
  }
  renderLearnScreen();
}

function renderResult() {
  clearInterval(thinkTimer);
  const { score, bestStreak, wrongCards, lang, mode } = state;
  const total = score.correct + score.wrong;
  const pct = total ? Math.round((score.correct / total) * 100) : 0;
  const grade = pct >= 80 ? "Excellent" : pct >= 60 ? "Good" : pct >= 40 ? "Keep going" : "More practice needed";
  const glyph = pct >= 80 ? "🏆" : pct >= 60 ? "⚡" : "🌱";

  const wrongHtml = wrongCards.length ? `
    <div class="wrong-section">
      <p class="wrong-title">Review these again:</p>
      ${wrongCards.map(c => `
        <div class="wrong-item">
          <span class="wrong-word">${c.word}</span>
          <span class="wrong-answer">${c.answer}</span>
        </div>
      `).join("")}
    </div>
  ` : "";

  document.getElementById("app").innerHTML = `
    <div class="screen active" id="result">
      <div class="result-inner">
        <div class="result-glyph">${glyph}</div>
        <h2 class="result-title">${grade}</h2>
        <div class="result-score">${pct}%</div>
        <div class="result-stats">
          <div class="stat-box"><span class="score-correct">✓</span> ${score.correct} correct</div>
          <div class="stat-box"><span class="score-wrong">✗</span> ${score.wrong} wrong</div>
          <div class="stat-box"><span class="score-streak">🔥</span> ${bestStreak} best streak</div>
        </div>
        ${wrongHtml}
        <div class="result-btns">
          <button class="big-btn" id="again-btn">Practice again →</button>
          <button class="big-btn-outline" id="change-btn">Change settings</button>
        </div>
      </div>
    </div>
  `;

  document.getElementById("again-btn").onclick = startSession;
  document.getElementById("change-btn").onclick = renderSelectScreen;
}

// ── INIT ──
renderHome();
