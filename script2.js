// ── DATA ──
const LANGUAGES = {
  Spanish: {
    flag: "🇪🇸",
    lesson: [
      { word: "Hola", translation: "Hello", pronunciation: "OH-lah", example: "¡Hola! ¿Cómo estás?" },
      { word: "Adiós", translation: "Goodbye", pronunciation: "ah-DYOS", example: "¡Adiós! Hasta luego." },
      { word: "Mucho gusto", translation: "Nice to meet you", pronunciation: "MOO-cho GOOS-toh", example: "Mucho gusto, me llamo Ana." },
      { word: "Por favor", translation: "Please", pronunciation: "por fah-VOR", example: "Un café, por favor." },
      { word: "Gracias", translation: "Thank you", pronunciation: "GRAH-syahs", example: "¡Muchas gracias!" },
      { word: "De nada", translation: "You're welcome", pronunciation: "deh NAH-dah", example: "—Gracias. —De nada." },
      { word: "Sí / No", translation: "Yes / No", pronunciation: "see / no", example: "¿Hablas inglés? Sí." },
      { word: "Lo siento", translation: "I'm sorry", pronunciation: "loh SYEN-toh", example: "Lo siento mucho." },
      { word: "¿Cómo te llamas?", translation: "What's your name?", pronunciation: "KOH-moh teh YAH-mahs", example: "¿Cómo te llamas? Me llamo Carlos." },
      { word: "No entiendo", translation: "I don't understand", pronunciation: "no en-TYEN-doh", example: "No entiendo, ¿puedes repetir?" },
    ],
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
    lesson: [
      { word: "こんにちは", translation: "Hello", pronunciation: "kon-ni-chi-wa", example: "こんにちは！" },
      { word: "さようなら", translation: "Goodbye", pronunciation: "sa-yo-na-ra", example: "さようなら、またね。" },
      { word: "はじめまして", translation: "Nice to meet you", pronunciation: "ha-ji-me-ma-shi-te", example: "はじめまして、田中です。" },
      { word: "おねがいします", translation: "Please", pronunciation: "o-ne-gai-shi-mas", example: "みずをおねがいします。" },
      { word: "ありがとう", translation: "Thank you", pronunciation: "a-ri-ga-tou", example: "ありがとうございます！" },
      { word: "すみません", translation: "Excuse me / Sorry", pronunciation: "su-mi-ma-sen", example: "すみません、トイレは？" },
      { word: "はい / いいえ", translation: "Yes / No", pronunciation: "hai / ii-e", example: "はい、わかります。" },
      { word: "わかりません", translation: "I don't understand", pronunciation: "wa-ka-ri-ma-sen", example: "すみません、わかりません。" },
      { word: "おはよう", translation: "Good morning", pronunciation: "o-ha-you", example: "おはようございます！" },
      { word: "おやすみ", translation: "Good night", pronunciation: "o-ya-su-mi", example: "おやすみなさい。" },
    ],
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
    lesson: [
      { word: "Bonjour", translation: "Hello / Good day", pronunciation: "bon-ZHOOR", example: "Bonjour, comment ça va?" },
      { word: "Au revoir", translation: "Goodbye", pronunciation: "oh reh-VWAR", example: "Au revoir, à bientôt!" },
      { word: "Enchanté(e)", translation: "Nice to meet you", pronunciation: "on-shon-TAY", example: "Enchanté, je m'appelle Marie." },
      { word: "S'il vous plaît", translation: "Please", pronunciation: "seel voo PLEH", example: "Un café, s'il vous plaît." },
      { word: "Merci", translation: "Thank you", pronunciation: "mer-SEE", example: "Merci beaucoup!" },
      { word: "De rien", translation: "You're welcome", pronunciation: "deh RYEN", example: "—Merci! —De rien." },
      { word: "Oui / Non", translation: "Yes / No", pronunciation: "wee / no", example: "Oui, je comprends." },
      { word: "Excusez-moi", translation: "Excuse me", pronunciation: "ex-koo-zay MWAH", example: "Excusez-moi, où est la gare?" },
      { word: "Je ne comprends pas", translation: "I don't understand", pronunciation: "zheh neh kom-PRON pah", example: "Pardon, je ne comprends pas." },
      { word: "Bonne nuit", translation: "Good night", pronunciation: "bon NWEE", example: "Bonne nuit, dors bien!" },
    ],
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
    lesson: [
      { word: "你好", translation: "Hello", pronunciation: "nǐ hǎo", example: "你好！很高兴认识你。" },
      { word: "再见", translation: "Goodbye", pronunciation: "zài jiàn", example: "再见！明天见。" },
      { word: "幸会", translation: "Nice to meet you", pronunciation: "xìng huì", example: "幸会，我叫李明。" },
      { word: "请", translation: "Please", pronunciation: "qǐng", example: "请坐。" },
      { word: "谢谢", translation: "Thank you", pronunciation: "xiè xiè", example: "谢谢你的帮助！" },
      { word: "不客气", translation: "You're welcome", pronunciation: "bù kè qì", example: "—谢谢。—不客气。" },
      { word: "是 / 不是", translation: "Yes / No", pronunciation: "shì / bù shì", example: "是的，我明白。" },
      { word: "对不起", translation: "Sorry", pronunciation: "duì bù qǐ", example: "对不起，我迟到了。" },
      { word: "我不懂", translation: "I don't understand", pronunciation: "wǒ bù dǒng", example: "对不起，我不懂。" },
      { word: "晚安", translation: "Good night", pronunciation: "wǎn ān", example: "晚安，好梦！" },
    ],
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
  },
  Russian: {
    flag: "🇷🇺",
    lesson: [
      { word: "Привет", translation: "Hello / Hi", pronunciation: "pri-VYET", example: "Привет! Как дела?" },
      { word: "До свидания", translation: "Goodbye", pronunciation: "da svi-DA-ni-ya", example: "До свидания, увидимся!" },
      { word: "Очень приятно", translation: "Nice to meet you", pronunciation: "O-chen pri-YAT-na", example: "Очень приятно, меня зовут Иван." },
      { word: "Пожалуйста", translation: "Please / You're welcome", pronunciation: "pa-ZHA-lus-ta", example: "Чай, пожалуйста." },
      { word: "Спасибо", translation: "Thank you", pronunciation: "spa-SI-ba", example: "Большое спасибо!" },
      { word: "Да / Нет", translation: "Yes / No", pronunciation: "da / nyet", example: "Да, я понимаю." },
      { word: "Извините", translation: "Excuse me / Sorry", pronunciation: "iz-vi-NI-tye", example: "Извините, где туалет?" },
      { word: "Я не понимаю", translation: "I don't understand", pronunciation: "ya nye pa-ni-MA-yu", example: "Я не понимаю, повторите?" },
      { word: "Доброе утро", translation: "Good morning", pronunciation: "DOB-ra-ye OO-tra", example: "Доброе утро! Как спали?" },
      { word: "Спокойной ночи", translation: "Good night", pronunciation: "spa-KOY-nay NO-chi", example: "Спокойной ночи, сладких снов!" },
    ],
    words: [
      { word: "душа", hint: "what makes you who you are, deep inside", answer: "soul", sentence: "У неё добрая душа." },
      { word: "судьба", hint: "the force that decides your life path", answer: "fate / destiny", sentence: "Такова судьба." },
      { word: "мечта", hint: "a hope so big it becomes a vision", answer: "dream / aspiration", sentence: "Моя мечта — путешествовать." },
      { word: "буря", hint: "violent weather, wind and chaos", answer: "storm", sentence: "Началась буря." },
      { word: "свет", hint: "what a candle gives in the dark", answer: "light", sentence: "Свет в окне." },
      { word: "тишина", hint: "the complete absence of sound", answer: "silence", sentence: "Тишина в лесу." },
      { word: "звезда", hint: "shines at night, far away in space", answer: "star", sentence: "Яркая звезда." },
      { word: "сила", hint: "physical or inner power", answer: "strength / power", sentence: "У него большая сила." },
      { word: "память", hint: "where the past lives in your mind", answer: "memory", sentence: "Память о детстве." },
      { word: "надежда", hint: "what you hold onto when things are hard", answer: "hope", sentence: "Надежда есть всегда." },
    ]
  },
  Arabic: {
    flag: "🇸🇦",
    lesson: [
      { word: "مرحبا", translation: "Hello", pronunciation: "mar-HA-ban", example: "مرحبا! كيف حالك؟" },
      { word: "مع السلامة", translation: "Goodbye", pronunciation: "ma'a s-sa-LA-ma", example: "مع السلامة، إلى اللقاء!" },
      { word: "تشرّفت بمعرفتك", translation: "Nice to meet you", pronunciation: "ta-SHAR-raf-tu bi-ma'ri-fa-tik", example: "تشرّفت بمعرفتك، أنا سارة." },
      { word: "من فضلك", translation: "Please", pronunciation: "min FAD-lak", example: "كوب ماء من فضلك." },
      { word: "شكراً", translation: "Thank you", pronunciation: "SHUK-ran", example: "شكراً جزيلاً!" },
      { word: "عفواً", translation: "You're welcome / Sorry", pronunciation: "AF-wan", example: "—شكراً. —عفواً." },
      { word: "نعم / لا", translation: "Yes / No", pronunciation: "na'am / laa", example: "نعم، أفهم." },
      { word: "لا أفهم", translation: "I don't understand", pronunciation: "laa af-HAM", example: "عذراً، لا أفهم." },
      { word: "صباح الخير", translation: "Good morning", pronunciation: "sa-BAH al-KHAYR", example: "صباح الخير! صباح النور." },
      { word: "مساء الخير", translation: "Good evening", pronunciation: "ma-SA' al-KHAYR", example: "مساء الخير، كيف يومك؟" },
    ],
    words: [
      { word: "نور", hint: "what the sun and stars give off", answer: "light / radiance", sentence: "نور الشمس جميل." },
      { word: "قلب", hint: "beats in your chest, holds your emotions", answer: "heart", sentence: "قلبي يحبّك." },
      { word: "بحر", hint: "vast, deep, full of salt water", answer: "sea", sentence: "البحر هادئ اليوم." },
      { word: "حلم", hint: "what your sleeping mind creates", answer: "dream", sentence: "رأيت حلماً جميلاً." },
      { word: "روح", hint: "the invisible essence of a living being", answer: "soul / spirit", sentence: "روحه طيّبة." },
      { word: "صبر", hint: "waiting calmly without breaking", answer: "patience", sentence: "الصبر مفتاح الفرج." },
      { word: "سماء", hint: "above you, blue by day, full of stars by night", answer: "sky", sentence: "السماء صافية." },
      { word: "عشق", hint: "a love so deep it becomes obsession", answer: "passionate love", sentence: "العشق يعمي القلوب." },
      { word: "وقت", hint: "always moving forward, never backward", answer: "time", sentence: "الوقت من ذهب." },
      { word: "أمل", hint: "a wish that tomorrow will be better", answer: "hope", sentence: "الأمل لا يموت." },
    ]
  },
  German: {
    flag: "🇩🇪",
    lesson: [
      { word: "Hallo", translation: "Hello", pronunciation: "HA-lo", example: "Hallo! Wie geht's?" },
      { word: "Auf Wiedersehen", translation: "Goodbye", pronunciation: "owf VEE-der-zayn", example: "Auf Wiedersehen, bis morgen!" },
      { word: "Schön, Sie kennenzulernen", translation: "Nice to meet you", pronunciation: "shern zee KEN-en-tsoo-ler-nen", example: "Schön, Sie kennenzulernen. Ich heiße Max." },
      { word: "Bitte", translation: "Please / You're welcome", pronunciation: "BI-te", example: "Ein Kaffee, bitte." },
      { word: "Danke", translation: "Thank you", pronunciation: "DAN-ke", example: "Vielen Dank!" },
      { word: "Ja / Nein", translation: "Yes / No", pronunciation: "yah / nine", example: "Ja, ich verstehe." },
      { word: "Entschuldigung", translation: "Excuse me / Sorry", pronunciation: "ent-SHUL-di-gung", example: "Entschuldigung, wo ist der Bahnhof?" },
      { word: "Ich verstehe nicht", translation: "I don't understand", pronunciation: "ich fer-SHTAY-e nicht", example: "Ich verstehe nicht, können Sie wiederholen?" },
      { word: "Guten Morgen", translation: "Good morning", pronunciation: "GOO-ten MOR-gen", example: "Guten Morgen! Gut geschlafen?" },
      { word: "Gute Nacht", translation: "Good night", pronunciation: "GOO-te nakht", example: "Gute Nacht, schlaf gut!" },
    ],
    words: [
      { word: "Sehnsucht", hint: "a deep longing for something you can't quite name", answer: "longing / yearning", sentence: "Ich fühle Sehnsucht." },
      { word: "Weltschmerz", hint: "pain caused by how imperfect the world is", answer: "world-weariness / world pain", sentence: "Er leidet an Weltschmerz." },
      { word: "Schadenfreude", hint: "joy felt at someone else's misfortune", answer: "pleasure from others' misfortune", sentence: "Schadenfreude ist gemein." },
      { word: "das Feuer", hint: "hot, bright, burns everything it touches", answer: "fire", sentence: "Das Feuer brennt hell." },
      { word: "der Traum", hint: "images your mind creates while sleeping", answer: "dream", sentence: "Ich hatte einen Traum." },
      { word: "die Stille", hint: "when everything goes quiet", answer: "stillness / silence", sentence: "Die Stille ist friedlich." },
      { word: "das Licht", hint: "makes the dark disappear", answer: "light", sentence: "Das Licht leuchtet." },
      { word: "die Kraft", hint: "physical or mental power", answer: "strength / power", sentence: "Sie hat viel Kraft." },
      { word: "der Mut", hint: "what you need to face something scary", answer: "courage", sentence: "Er hat großen Mut." },
      { word: "die Hoffnung", hint: "believing things will get better", answer: "hope", sentence: "Die Hoffnung stirbt zuletzt." },
    ]
  },
  Hebrew: {
    flag: "🇮🇱",
    lesson: [
      { word: "שלום", translation: "Hello / Goodbye / Peace", pronunciation: "sha-LOM", example: "שלום! מה שלומך?" },
      { word: "להתראות", translation: "See you / Goodbye", pronunciation: "le-hit-ra-OT", example: "להתראות, נתדבר מחר!" },
      { word: "נעים מאוד", translation: "Nice to meet you", pronunciation: "na-IM me-OD", example: "נעים מאוד, אני דנה." },
      { word: "בבקשה", translation: "Please / You're welcome", pronunciation: "be-va-ka-SHA", example: "כוס מים, בבקשה." },
      { word: "תודה", translation: "Thank you", pronunciation: "to-DA", example: "תודה רבה!" },
      { word: "כן / לא", translation: "Yes / No", pronunciation: "ken / lo", example: "כן, אני מבין." },
      { word: "סליחה", translation: "Sorry / Excuse me", pronunciation: "sli-HA", example: "סליחה, איפה השירותים?" },
      { word: "אני לא מבין/ה", translation: "I don't understand", pronunciation: "a-NI lo me-VIN/me-VI-na", example: "אני לא מבין, תוכל לחזור?" },
      { word: "בוקר טוב", translation: "Good morning", pronunciation: "BO-ker tov", example: "בוקר טוב! איך ישנת?" },
      { word: "לילה טוב", translation: "Good night", pronunciation: "LAI-la tov", example: "לילה טוב, חלומות פז!" },
    ],
    words: [
      { word: "נשמה", hint: "the invisible essence inside every person", answer: "soul", sentence: "יש לה נשמה יפה." },
      { word: "גורל", hint: "the force that decides what happens to you", answer: "fate / destiny", sentence: "זה היה הגורל שלנו." },
      { word: "חלום", hint: "your mind creates it while you sleep — or it's a big wish", answer: "dream", sentence: "יש לי חלום גדול." },
      { word: "אור", hint: "what a candle or the sun gives", answer: "light", sentence: "האור בעיניה מרגש." },
      { word: "שקט", hint: "the absence of all noise", answer: "silence / quiet", sentence: "הייתה שקט מוחלט." },
      { word: "כוח", hint: "physical or inner strength", answer: "strength / power", sentence: "יש לו כוח רצון עצום." },
      { word: "תקווה", hint: "what you hold when things might get better", answer: "hope", sentence: "תמיד יש תקווה." },
      { word: "זיכרון", hint: "where the past lives in your mind", answer: "memory", sentence: "יש לי זיכרון טוב." },
      { word: "לב", hint: "pumps blood — and holds your feelings", answer: "heart", sentence: "הוא שבר לי את הלב." },
      { word: "דרך", hint: "a road, a path, or a way of life", answer: "path / road / way", sentence: "זו הדרך הנכונה." },
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

// ── HOME ──
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
  document.getElementById("begin-btn").onclick = renderSelectScreen;
}

// ── SELECT ──
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
        { id: "lesson", label: "📖 Lesson 1 — Basics", desc: "Learn essential phrases first: hello, bye, thank you, sorry. No pressure, just absorb." },
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
      Start ${state.lang} — ${state.mode === "lesson" ? "Lesson 1" : state.mode === "reveal" ? "Think & Reveal" : state.mode === "type" ? "Type It" : "Reconstruct"} →
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

  document.getElementById("back-home").onclick = renderHome;
  document.querySelectorAll(".lang-card").forEach(btn => {
    btn.onclick = () => { state.lang = btn.dataset.lang; renderSelectScreen(); };
  });
  document.querySelectorAll(".mode-card").forEach(btn => {
    btn.onclick = () => { state.mode = btn.dataset.mode; renderSelectScreen(); };
  });
  const startBtn = document.getElementById("start-btn");
  if (startBtn) startBtn.onclick = startSession;
}

// ── START SESSION ──
function startSession() {
  state.idx = 0;
  state.revealed = false;
  state.typed = "";
  state.feedback = null;
  state.score = { correct: 0, wrong: 0 };
  state.wrongCards = [];
  state.streak = 0;
  state.bestStreak = 0;
  state.thinkTime = 0;

  if (state.mode === "lesson") {
    state.cards = LANGUAGES[state.lang].lesson;
    renderLessonScreen();
  } else {
    const wordList = [...LANGUAGES[state.lang].words].sort(() => Math.random() - 0.5);
    state.cards = wordList;
    if (state.mode === "reconstruct") state.scrambled = scramble(wordList[0].answer);
    renderLearnScreen();
  }
}

// ── LESSON MODE ──
function renderLessonScreen() {
  const { cards, idx, lang } = state;
  const card = cards[idx];
  if (!card) { renderLessonComplete(); return; }

  const progress = Math.round((idx / cards.length) * 100);
  const isLast = idx + 1 >= cards.length;

  document.getElementById("app").innerHTML = `
    <div class="screen active" id="learn">
      <div class="top-bar">
        <button class="back-btn" id="close-btn" style="margin:0">✕</button>
        <div class="progress-wrap">
          <div class="progress-bar" style="width:${progress}%"></div>
        </div>
        <div class="score-chip">
          <span style="color:#888;font-family:monospace;font-size:12px">${idx + 1}/${cards.length}</span>
        </div>
      </div>
      <div class="card-area">
        <div class="card lesson-card">
          <div class="lesson-badge">📖 Lesson 1 — Basics</div>
          <div class="lang-tag">${LANGUAGES[lang].flag} ${lang}</div>
          <div class="word-display">${card.word}</div>
          <div class="lesson-translation">${card.translation}</div>
          <div class="lesson-pronunciation">🔊 ${card.pronunciation}</div>
          <div class="sentence-box">${card.example}</div>
          <button class="reveal-btn" id="next-lesson-btn">
            ${isLast ? "Finish Lesson →" : "Got it, next →"}
          </button>
        </div>
        <div class="card-counter">${idx + 1} / ${cards.length}</div>
      </div>
    </div>
  `;

  document.getElementById("close-btn").onclick = () => { clearInterval(thinkTimer); renderSelectScreen(); };
  document.getElementById("next-lesson-btn").onclick = () => {
    if (isLast) { renderLessonComplete(); }
    else { state.idx++; renderLessonScreen(); }
  };
}

function renderLessonComplete() {
  document.getElementById("app").innerHTML = `
    <div class="screen active" id="result">
      <div class="result-inner">
        <div class="result-glyph">🎓</div>
        <h2 class="result-title">Lesson Complete!</h2>
        <p style="color:#888;font-style:italic;margin-bottom:32px;font-size:15px">
          You've seen all the basics.<br>Now let's test your memory.
        </p>
        <div class="result-btns">
          <button class="big-btn" id="practice-btn">Practice now →</button>
          <button class="big-btn-outline" id="change-btn">Back to menu</button>
        </div>
      </div>
    </div>
  `;
  document.getElementById("practice-btn").onclick = () => { state.mode = "reveal"; startSession(); };
  document.getElementById("change-btn").onclick = renderSelectScreen;
}

// ── LEARN MODE ──
function renderLearnScreen() {
  const { cards, idx, revealed, feedback, score, streak, thinkTime, mode, lang, scrambled } = state;
  const card = cards[idx];
  if (!card) return;

  const progress = Math.round((idx / cards.length) * 100);
  const streakHtml = streak >= 3 ? `<span class="score-streak">🔥${streak}</span>` : "";
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

  document.getElementById("close-btn").onclick = () => { clearInterval(thinkTimer); renderSelectScreen(); };

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
  if (correct) { state.streak++; state.bestStreak = Math.max(state.bestStreak, state.streak); state.score.correct++; }
  else { state.streak = 0; state.score.wrong++; state.wrongCards.push(state.cards[state.idx]); }
  renderLearnScreen();
}

function handleGrade(correct) {
  if (correct) { state.streak++; state.bestStreak = Math.max(state.bestStreak, state.streak); state.score.correct++; }
  else { state.streak = 0; state.score.wrong++; state.wrongCards.push(state.cards[state.idx]); }
  nextCard();
}

function nextCard() {
  if (state.idx + 1 >= state.cards.length) { renderResult(); return; }
  state.idx++;
  state.revealed = false;
  state.typed = "";
  state.feedback = null;
  if (state.mode === "reconstruct") state.scrambled = scramble(state.cards[state.idx].answer);
  renderLearnScreen();
}

// ── RESULT ──
function renderResult() {
  clearInterval(thinkTimer);
  const { score, bestStreak, wrongCards } = state;
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
