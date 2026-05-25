import { useState, useEffect, useRef } from "react";

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

const MODES = {
  REVEAL: "reveal",    // show word, think, reveal answer
  TYPE: "type",        // type what you think it means
  RECONSTRUCT: "reconstruct", // rearrange scrambled letters
};

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
  const nb = normalize(b.split("/")[0]);
  if (na === nb) return true;
  // check each alternative answer
  return b.split("/").some(part => normalize(part) === na);
}

export default function App() {
  const [screen, setScreen] = useState("home"); // home | select | learn | result
  const [lang, setLang] = useState(null);
  const [mode, setMode] = useState(MODES.REVEAL);
  const [cards, setCards] = useState([]);
  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [typed, setTyped] = useState("");
  const [feedback, setFeedback] = useState(null); // null | 'correct' | 'wrong'
  const [score, setScore] = useState({ correct: 0, wrong: 0 });
  const [wrongCards, setWrongCards] = useState([]);
  const [scrambled, setScrambled] = useState("");
  const inputRef = useRef(null);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [thinking, setThinking] = useState(false);
  const [thinkTime, setThinkTime] = useState(0);
  const thinkTimerRef = useRef(null);

  const card = cards[idx];

  useEffect(() => {
    if (mode === MODES.RECONSTRUCT && card) {
      setScrambled(scramble(card.answer));
    }
  }, [idx, card, mode]);

  useEffect(() => {
    if (screen === "learn" && !revealed && feedback === null) {
      setThinking(true);
      setThinkTime(0);
      thinkTimerRef.current = setInterval(() => {
        setThinkTime(t => t + 1);
      }, 1000);
    } else {
      setThinking(false);
      clearInterval(thinkTimerRef.current);
    }
    return () => clearInterval(thinkTimerRef.current);
  }, [screen, idx, revealed, feedback]);

  function startSession(language, selectedMode) {
    const wordList = [...LANGUAGES[language].words].sort(() => Math.random() - 0.5);
    setCards(wordList);
    setLang(language);
    setMode(selectedMode);
    setIdx(0);
    setRevealed(false);
    setTyped("");
    setFeedback(null);
    setScore({ correct: 0, wrong: 0 });
    setWrongCards([]);
    setStreak(0);
    setBestStreak(0);
    setScreen("learn");
    setTimeout(() => inputRef.current?.focus(), 100);
  }

  function handleReveal() {
    setRevealed(true);
    clearInterval(thinkTimerRef.current);
  }

  function handleGrade(correct) {
    if (correct) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      setBestStreak(s => Math.max(s, newStreak));
      setScore(s => ({ ...s, correct: s.correct + 1 }));
    } else {
      setStreak(0);
      setScore(s => ({ ...s, wrong: s.wrong + 1 }));
      setWrongCards(w => [...w, card]);
    }
    next();
  }

  function handleType() {
    if (!typed.trim()) return;
    const correct = isClose(typed, card.answer);
    setFeedback(correct ? "correct" : "wrong");
    if (correct) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      setBestStreak(s => Math.max(s, newStreak));
      setScore(s => ({ ...s, correct: s.correct + 1 }));
    } else {
      setStreak(0);
      setScore(s => ({ ...s, wrong: s.wrong + 1 }));
      setWrongCards(w => [...w, card]);
    }
  }

  function next() {
    if (idx + 1 >= cards.length) {
      setScreen("result");
    } else {
      setIdx(i => i + 1);
      setRevealed(false);
      setTyped("");
      setFeedback(null);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      if (mode === MODES.TYPE && !feedback) handleType();
      else if (feedback) next();
    }
  }

  const progress = cards.length ? (idx / cards.length) * 100 : 0;

  // ── HOME ──
  if (screen === "home") return (
    <div style={styles.root}>
      <div style={styles.noise} />
      <div style={styles.homeWrap}>
        <div style={styles.homeGlyph}>語</div>
        <h1 style={styles.homeTitle}>RECALL</h1>
        <p style={styles.homeSubtitle}>Language learning through<br />active memory — not passive review</p>
        <div style={styles.homePillRow}>
          {["Think first", "Then reveal", "True recall"].map(p => (
            <span key={p} style={styles.pill}>{p}</span>
          ))}
        </div>
        <button style={styles.bigBtn} onClick={() => setScreen("select")}>
          Begin →
        </button>
        <p style={styles.footnote}>No multiple choice. No hints until you struggle.</p>
      </div>
    </div>
  );

  // ── SELECT ──
  if (screen === "select") return (
    <div style={styles.root}>
      <div style={styles.noise} />
      <div style={styles.selectWrap}>
        <button style={styles.back} onClick={() => setScreen("home")}>← back</button>
        <h2 style={styles.selectTitle}>Choose a language</h2>
        <div style={styles.langGrid}>
          {Object.entries(LANGUAGES).map(([name, data]) => (
            <button key={name} style={styles.langCard} onClick={() => setLang(name)}>
              <span style={{ fontSize: 36 }}>{data.flag}</span>
              <span style={styles.langName}>{name}</span>
              <span style={styles.langCount}>{data.words.length} words</span>
            </button>
          ))}
        </div>

        {lang && (
          <>
            <h2 style={{ ...styles.selectTitle, marginTop: 32 }}>Choose a mode</h2>
            <div style={styles.modeGrid}>
              {[
                { id: MODES.REVEAL, label: "Think & Reveal", desc: "See the word, recall the meaning, then grade yourself honestly." },
                { id: MODES.TYPE, label: "Type It Out", desc: "Force your brain to produce the answer — no choices given." },
                { id: MODES.RECONSTRUCT, label: "Reconstruct", desc: "Unscramble the answer letters to rebuild the word from memory." },
              ].map(m => (
                <button key={m.id} style={{ ...styles.modeCard, ...(mode === m.id ? styles.modeCardActive : {}) }}
                  onClick={() => setMode(m.id)}>
                  <span style={styles.modeLabel}>{m.label}</span>
                  <span style={styles.modeDesc}>{m.desc}</span>
                </button>
              ))}
            </div>
            <button style={styles.bigBtn} onClick={() => startSession(lang, mode)}>
              Start {lang} — {mode === MODES.REVEAL ? "Think & Reveal" : mode === MODES.TYPE ? "Type It" : "Reconstruct"} →
            </button>
          </>
        )}
      </div>
    </div>
  );

  // ── LEARN ──
  if (screen === "learn" && card) return (
    <div style={styles.root}>
      <div style={styles.noise} />

      {/* Top bar */}
      <div style={styles.topBar}>
        <button style={styles.back} onClick={() => setScreen("select")}>✕</button>
        <div style={styles.progressWrap}>
          <div style={{ ...styles.progressBar, width: `${progress}%` }} />
        </div>
        <div style={styles.scoreChip}>
          <span style={{ color: "#7BF5A0" }}>✓{score.correct}</span>
          <span style={{ color: "#F57B7B" }}>✗{score.wrong}</span>
          {streak >= 3 && <span style={{ color: "#FFD166" }}>🔥{streak}</span>}
        </div>
      </div>

      {/* Card */}
      <div style={styles.cardArea}>
        <div style={{ ...styles.card, ...(feedback === "correct" ? styles.cardCorrect : feedback === "wrong" ? styles.cardWrong : {}) }}>

          <div style={styles.langTag}>{LANGUAGES[lang]?.flag} {lang}</div>

          <div style={styles.wordDisplay}>{card.word}</div>

          <div style={styles.hintBox}>
            <span style={styles.hintLabel}>hint</span>
            <span style={styles.hintText}>{card.hint}</span>
          </div>

          {thinking && !revealed && feedback === null && mode !== MODES.TYPE && (
            <div style={styles.thinkTimer}>⏱ {thinkTime}s — thinking...</div>
          )}

          {/* REVEAL MODE */}
          {mode === MODES.REVEAL && !revealed && (
            <button style={styles.revealBtn} onClick={handleReveal}>
              I've thought about it — reveal
            </button>
          )}

          {mode === MODES.REVEAL && revealed && (
            <div style={styles.answerReveal}>
              <div style={styles.answerWord}>{card.answer}</div>
              <div style={styles.sentenceBox}><em>{card.sentence}</em></div>
              <div style={styles.gradeRow}>
                <span style={styles.gradeLabel}>Did you get it?</span>
                <div style={styles.gradeBtns}>
                  <button style={styles.gradeYes} onClick={() => handleGrade(true)}>Yes ✓</button>
                  <button style={styles.gradeNo} onClick={() => handleGrade(false)}>No ✗</button>
                </div>
              </div>
            </div>
          )}

          {/* TYPE MODE */}
          {mode === MODES.TYPE && feedback === null && (
            <div style={styles.typeArea}>
              <input
                ref={inputRef}
                style={styles.typeInput}
                value={typed}
                onChange={e => setTyped(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="type the meaning..."
                autoComplete="off"
                spellCheck={false}
              />
              <button style={styles.revealBtn} onClick={handleType}>Check →</button>
            </div>
          )}

          {mode === MODES.TYPE && feedback && (
            <div style={styles.answerReveal}>
              <div style={{ ...styles.feedbackBanner, background: feedback === "correct" ? "#0D3320" : "#330D0D", color: feedback === "correct" ? "#7BF5A0" : "#F57B7B" }}>
                {feedback === "correct" ? "✓ Correct! " : "✗ Not quite — "}
                <strong>{card.answer}</strong>
              </div>
              {typed && feedback === "wrong" && <div style={styles.yourAnswer}>You wrote: <em>{typed}</em></div>}
              <div style={styles.sentenceBox}><em>{card.sentence}</em></div>
              <button style={styles.revealBtn} onClick={next}>
                {idx + 1 >= cards.length ? "See Results →" : "Next →"}
              </button>
            </div>
          )}

          {/* RECONSTRUCT MODE */}
          {mode === MODES.RECONSTRUCT && feedback === null && (
            <div style={styles.typeArea}>
              <div style={styles.scrambleBox}>{scrambled}</div>
              <input
                ref={inputRef}
                style={styles.typeInput}
                value={typed}
                onChange={e => setTyped(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="unscramble the answer..."
                autoComplete="off"
                spellCheck={false}
              />
              <button style={styles.revealBtn} onClick={handleType}>Check →</button>
            </div>
          )}

          {mode === MODES.RECONSTRUCT && feedback && (
            <div style={styles.answerReveal}>
              <div style={{ ...styles.feedbackBanner, background: feedback === "correct" ? "#0D3320" : "#330D0D", color: feedback === "correct" ? "#7BF5A0" : "#F57B7B" }}>
                {feedback === "correct" ? "✓ Reconstructed! " : "✗ Answer: "}
                <strong>{card.answer}</strong>
              </div>
              <div style={styles.sentenceBox}><em>{card.sentence}</em></div>
              <button style={styles.revealBtn} onClick={next}>
                {idx + 1 >= cards.length ? "See Results →" : "Next →"}
              </button>
            </div>
          )}
        </div>

        <div style={styles.counter}>{idx + 1} / {cards.length}</div>
      </div>
    </div>
  );

  // ── RESULT ──
  if (screen === "result") {
    const total = score.correct + score.wrong;
    const pct = total ? Math.round((score.correct / total) * 100) : 0;
    const grade = pct >= 80 ? "Excellent" : pct >= 60 ? "Good" : pct >= 40 ? "Keep going" : "More practice needed";
    return (
      <div style={styles.root}>
        <div style={styles.noise} />
        <div style={styles.resultWrap}>
          <div style={styles.resultGlyph}>{pct >= 80 ? "🏆" : pct >= 60 ? "⚡" : "🌱"}</div>
          <h2 style={styles.resultTitle}>{grade}</h2>
          <div style={styles.resultScore}>{pct}%</div>
          <div style={styles.resultStats}>
            <div style={styles.statBox}><span style={{ color: "#7BF5A0" }}>✓</span> {score.correct} correct</div>
            <div style={styles.statBox}><span style={{ color: "#F57B7B" }}>✗</span> {score.wrong} wrong</div>
            <div style={styles.statBox}><span style={{ color: "#FFD166" }}>🔥</span> {bestStreak} best streak</div>
          </div>
          {wrongCards.length > 0 && (
            <div style={styles.wrongSection}>
              <div style={styles.wrongTitle}>Review these again:</div>
              {wrongCards.map((c, i) => (
                <div key={i} style={styles.wrongItem}>
                  <span style={styles.wrongWord}>{c.word}</span>
                  <span style={styles.wrongAnswer}>{c.answer}</span>
                </div>
              ))}
            </div>
          )}
          <div style={styles.resultBtns}>
            <button style={styles.bigBtn} onClick={() => startSession(lang, mode)}>Practice again →</button>
            <button style={{ ...styles.bigBtn, background: "transparent", border: "1px solid #444", color: "#aaa" }}
              onClick={() => setScreen("select")}>Change settings</button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

const styles = {
  root: {
    minHeight: "100vh",
    background: "#0A0A0A",
    color: "#E8E0D0",
    fontFamily: "'Georgia', 'Times New Roman', serif",
    position: "relative",
    overflow: "hidden",
  },
  noise: {
    position: "fixed", inset: 0, zIndex: 0,
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
    pointerEvents: "none",
  },
  homeWrap: {
    position: "relative", zIndex: 1,
    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
    minHeight: "100vh", padding: "40px 24px", textAlign: "center",
  },
  homeGlyph: {
    fontSize: 80, lineHeight: 1, marginBottom: 8,
    background: "linear-gradient(135deg, #C9A96E, #E8D5A3)",
    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
    filter: "drop-shadow(0 0 24px rgba(201,169,110,0.3))",
  },
  homeTitle: {
    fontSize: 64, fontWeight: 400, letterSpacing: "0.3em",
    margin: "0 0 12px 0", color: "#E8E0D0",
    fontFamily: "'Georgia', serif",
  },
  homeSubtitle: {
    fontSize: 17, color: "#888", lineHeight: 1.7, margin: "0 0 28px 0",
    fontFamily: "'Georgia', serif", fontStyle: "italic",
  },
  homePillRow: {
    display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center", marginBottom: 40,
  },
  pill: {
    padding: "6px 16px", border: "1px solid #333", borderRadius: 99,
    fontSize: 13, color: "#888", fontFamily: "monospace", letterSpacing: "0.05em",
  },
  bigBtn: {
    padding: "16px 40px",
    background: "linear-gradient(135deg, #C9A96E, #9A7040)",
    border: "none", borderRadius: 4, color: "#0A0A0A",
    fontSize: 16, fontWeight: 700, cursor: "pointer", letterSpacing: "0.05em",
    fontFamily: "monospace", transition: "opacity 0.2s",
    marginBottom: 12,
  },
  footnote: { fontSize: 12, color: "#444", fontFamily: "monospace", marginTop: 8 },
  selectWrap: {
    position: "relative", zIndex: 1,
    maxWidth: 680, margin: "0 auto", padding: "24px 20px 60px",
  },
  back: {
    background: "none", border: "none", color: "#666", fontSize: 14,
    cursor: "pointer", padding: "8px 0", fontFamily: "monospace", letterSpacing: "0.05em",
    marginBottom: 24, display: "block",
  },
  selectTitle: {
    fontSize: 13, letterSpacing: "0.2em", color: "#888",
    textTransform: "uppercase", fontFamily: "monospace", marginBottom: 16, fontWeight: 400,
  },
  langGrid: {
    display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 12,
  },
  langCard: {
    background: "#111", border: "1px solid #222", borderRadius: 8,
    padding: "20px 16px", cursor: "pointer", textAlign: "center",
    display: "flex", flexDirection: "column", gap: 6, alignItems: "center",
    transition: "border-color 0.2s, background 0.2s",
    fontFamily: "inherit",
    ":hover": { borderColor: "#C9A96E" }
  },
  langName: { fontSize: 15, color: "#E8E0D0", fontFamily: "'Georgia', serif" },
  langCount: { fontSize: 11, color: "#555", fontFamily: "monospace" },
  modeGrid: { display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 },
  modeCard: {
    background: "#111", border: "1px solid #222", borderRadius: 8,
    padding: "16px 20px", cursor: "pointer", textAlign: "left",
    display: "flex", flexDirection: "column", gap: 6, transition: "border-color 0.2s",
    fontFamily: "inherit",
  },
  modeCardActive: { borderColor: "#C9A96E", background: "#171207" },
  modeLabel: { fontSize: 15, color: "#E8E0D0", fontFamily: "'Georgia', serif" },
  modeDesc: { fontSize: 13, color: "#666", lineHeight: 1.5, fontFamily: "'Georgia', serif", fontStyle: "italic" },

  // Learn screen
  topBar: {
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 10,
    display: "flex", alignItems: "center", gap: 12, padding: "12px 16px",
    background: "rgba(10,10,10,0.95)", borderBottom: "1px solid #1A1A1A",
  },
  progressWrap: {
    flex: 1, height: 3, background: "#1A1A1A", borderRadius: 99, overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    background: "linear-gradient(90deg, #C9A96E, #9A7040)",
    borderRadius: 99, transition: "width 0.4s ease",
  },
  scoreChip: {
    display: "flex", gap: 10, fontSize: 13, fontFamily: "monospace",
  },
  cardArea: {
    position: "relative", zIndex: 1,
    display: "flex", flexDirection: "column", alignItems: "center",
    paddingTop: 80, paddingBottom: 40, minHeight: "100vh",
    justifyContent: "center",
  },
  card: {
    background: "#111", border: "1px solid #222", borderRadius: 12,
    padding: "36px 28px", maxWidth: 540, width: "calc(100% - 32px)",
    transition: "border-color 0.3s, background 0.3s",
  },
  cardCorrect: { borderColor: "#2A5C3A", background: "#0D1A12" },
  cardWrong: { borderColor: "#5C2A2A", background: "#1A0D0D" },
  langTag: { fontSize: 12, color: "#555", fontFamily: "monospace", letterSpacing: "0.1em", marginBottom: 20 },
  wordDisplay: {
    fontSize: 52, textAlign: "center", marginBottom: 20, lineHeight: 1.1,
    fontFamily: "'Georgia', 'Noto Serif', serif",
    color: "#E8D5A3",
  },
  hintBox: {
    background: "#0D0D0D", border: "1px solid #1A1A1A", borderRadius: 6,
    padding: "12px 16px", marginBottom: 24, display: "flex", gap: 10, alignItems: "flex-start",
  },
  hintLabel: {
    fontSize: 10, letterSpacing: "0.15em", color: "#555",
    textTransform: "uppercase", fontFamily: "monospace", paddingTop: 2,
    flexShrink: 0,
  },
  hintText: { fontSize: 14, color: "#888", fontStyle: "italic", lineHeight: 1.5 },
  thinkTimer: { fontSize: 11, color: "#444", fontFamily: "monospace", textAlign: "center", marginBottom: 16 },
  revealBtn: {
    width: "100%", padding: "14px 24px",
    background: "transparent", border: "1px solid #333", borderRadius: 4,
    color: "#C9A96E", fontSize: 14, cursor: "pointer", fontFamily: "monospace",
    letterSpacing: "0.08em", transition: "border-color 0.2s, background 0.2s",
  },
  answerReveal: { display: "flex", flexDirection: "column", gap: 16 },
  answerWord: {
    fontSize: 36, textAlign: "center", color: "#E8D5A3",
    fontFamily: "'Georgia', serif",
  },
  sentenceBox: {
    background: "#0D0D0D", borderLeft: "2px solid #2A2A2A",
    padding: "10px 16px", fontSize: 14, color: "#666", lineHeight: 1.6,
  },
  gradeRow: {
    display: "flex", flexDirection: "column", gap: 10,
  },
  gradeLabel: { fontSize: 11, color: "#555", fontFamily: "monospace", letterSpacing: "0.1em", textTransform: "uppercase" },
  gradeBtns: { display: "flex", gap: 10 },
  gradeYes: {
    flex: 1, padding: "12px", background: "#0D3320", border: "1px solid #2A5C3A",
    borderRadius: 4, color: "#7BF5A0", fontSize: 15, cursor: "pointer", fontFamily: "monospace",
  },
  gradeNo: {
    flex: 1, padding: "12px", background: "#330D0D", border: "1px solid #5C2A2A",
    borderRadius: 4, color: "#F57B7B", fontSize: 15, cursor: "pointer", fontFamily: "monospace",
  },
  typeArea: { display: "flex", flexDirection: "column", gap: 12 },
  typeInput: {
    background: "#0D0D0D", border: "1px solid #2A2A2A", borderRadius: 4,
    padding: "14px 16px", color: "#E8E0D0", fontSize: 18, outline: "none",
    fontFamily: "'Georgia', serif", textAlign: "center",
    transition: "border-color 0.2s",
  },
  scrambleBox: {
    textAlign: "center", fontSize: 22, letterSpacing: "0.2em",
    color: "#C9A96E", fontFamily: "monospace", padding: "16px",
    background: "#0D0D0D", borderRadius: 4, border: "1px dashed #2A2A2A",
  },
  feedbackBanner: {
    padding: "12px 16px", borderRadius: 4, fontSize: 15, fontFamily: "monospace",
  },
  yourAnswer: { fontSize: 13, color: "#666", fontStyle: "italic" },
  counter: { fontSize: 12, color: "#333", fontFamily: "monospace", marginTop: 16 },

  // Result screen
  resultWrap: {
    position: "relative", zIndex: 1,
    display: "flex", flexDirection: "column", alignItems: "center",
    padding: "60px 24px", minHeight: "100vh", justifyContent: "center",
    maxWidth: 480, margin: "0 auto",
  },
  resultGlyph: { fontSize: 56, marginBottom: 12 },
  resultTitle: {
    fontSize: 32, fontWeight: 400, fontFamily: "'Georgia', serif",
    color: "#E8E0D0", margin: "0 0 4px 0",
  },
  resultScore: {
    fontSize: 72, fontFamily: "'Georgia', serif",
    background: "linear-gradient(135deg, #C9A96E, #E8D5A3)",
    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
    marginBottom: 24, lineHeight: 1,
  },
  resultStats: { display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center", marginBottom: 32 },
  statBox: {
    background: "#111", border: "1px solid #1A1A1A", borderRadius: 6,
    padding: "10px 18px", fontSize: 14, fontFamily: "monospace", display: "flex", gap: 8,
  },
  wrongSection: { width: "100%", marginBottom: 28 },
  wrongTitle: { fontSize: 11, color: "#555", fontFamily: "monospace", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 },
  wrongItem: {
    display: "flex", justifyContent: "space-between", padding: "10px 14px",
    borderBottom: "1px solid #1A1A1A", alignItems: "baseline",
  },
  wrongWord: { fontSize: 20, color: "#E8D5A3", fontFamily: "'Georgia', serif" },
  wrongAnswer: { fontSize: 13, color: "#888", fontFamily: "monospace" },
  resultBtns: { display: "flex", flexDirection: "column", gap: 10, width: "100%", alignItems: "center" },
};
