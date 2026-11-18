// =====================================================================
// Mini games: four short games, each practicing one interview skill.
// No AI calls: every round is hand-written in data/games/*.json, so the
// games are free, instant and work offline once loaded.
//
// A set is 5 rounds. Stars: 5 right = 3, 3-4 = 2, 1-2 = 1, 0 = 0.
// Saved in one key (groundwork:games): per game, best stars, sets played,
// total stars earned (for XP) and the ids of rounds already seen. Nothing
// about individual answers is saved.
//
// This file loads before the main script and only defines things; it uses
// the main script's helpers (el, escapeHTML, starsHTML, t, go, ...) at run time.
// =====================================================================

const GAMES_KEY = 'groundwork:games';
const GAME_SET_SIZE = 5;
const GAME_STAR_XP = 2;
const GAME_TRACKS = ['all', 'job', 'college'];

// The hub shows these in order. To add a game later: add an entry here,
// a module in GAME_MODULES and a data file in data/games/.
// Points: 100 for a right round, plus a combo bonus of 25 for each right
// answer in a row after the first. Almost-right rounds get a little partial credit.
const GAME_POINTS = 100;
const GAME_COMBO_BONUS = 25;

// Small illustrations for the hub and start screens (colors from the site palette).
const GAME_ART = {
  rank:
    '<svg viewBox="0 0 120 84" aria-hidden="true" focusable="false">' +
      '<rect x="26" y="6" width="88" height="20" rx="7" fill="#fff" stroke="#8f7015" stroke-opacity=".35"/><rect x="34" y="13" width="56" height="6" rx="3" fill="#8f7015" opacity=".55"/>' +
      '<circle cx="13" cy="16" r="10" fill="#1C2321"/><text x="13" y="20.5" text-anchor="middle" font-size="12" font-weight="700" fill="#F7F8F5" font-family="Inter,sans-serif">1</text>' +
      '<rect x="26" y="32" width="76" height="20" rx="7" fill="#fff" stroke="#8f7015" stroke-opacity=".35"/><rect x="34" y="39" width="42" height="6" rx="3" fill="#8f7015" opacity=".35"/>' +
      '<circle cx="13" cy="42" r="10" fill="#8f7015"/><text x="13" y="46.5" text-anchor="middle" font-size="12" font-weight="700" fill="#F7F8F5" font-family="Inter,sans-serif">2</text>' +
      '<rect x="26" y="58" width="62" height="20" rx="7" fill="#fff" stroke="#8f7015" stroke-opacity=".35"/><rect x="34" y="65" width="30" height="6" rx="3" fill="#8f7015" opacity=".2"/>' +
      '<circle cx="13" cy="68" r="10" fill="#C9A227"/><text x="13" y="72.5" text-anchor="middle" font-size="12" font-weight="700" fill="#1C2321" font-family="Inter,sans-serif">3</text>' +
    '</svg>',
  'really-asking':
    '<svg viewBox="0 0 120 84" aria-hidden="true" focusable="false">' +
      '<path d="M10 10h66a8 8 0 0 1 8 8v28a8 8 0 0 1-8 8H38l-14 12v-12H10a8 8 0 0 1-8-8V18a8 8 0 0 1 8-8z" fill="#fff" stroke="#2B4C4A" stroke-opacity=".4"/>' +
      '<rect x="14" y="22" width="52" height="6" rx="3" fill="#2B4C4A" opacity=".3"/><rect x="14" y="34" width="38" height="6" rx="3" fill="#2B4C4A" opacity=".3"/>' +
      '<circle cx="86" cy="50" r="17" fill="#E2EBE9" stroke="#2B4C4A" stroke-width="5"/><path d="M98 63l14 14" stroke="#2B4C4A" stroke-width="7" stroke-linecap="round"/>' +
      '<text x="86" y="57" text-anchor="middle" font-size="20" font-weight="700" fill="#2B4C4A" font-family="Fraunces,serif">?</text>' +
    '</svg>',
  build:
    '<svg viewBox="0 0 120 84" aria-hidden="true" focusable="false">' +
      '<rect x="8" y="58" width="58" height="20" rx="6" fill="#9A5B3C"/><rect x="16" y="65" width="30" height="6" rx="3" fill="#fff" opacity=".6"/>' +
      '<rect x="30" y="33" width="58" height="20" rx="6" fill="#fff" stroke="#9A5B3C" stroke-opacity=".5"/><rect x="38" y="40" width="34" height="6" rx="3" fill="#9A5B3C" opacity=".45"/>' +
      '<rect x="54" y="6" width="58" height="20" rx="6" fill="#fff" stroke="#9A5B3C" stroke-opacity=".5" stroke-dasharray="4 3" transform="rotate(-6 83 16)"/><rect x="62" y="13" width="28" height="6" rx="3" fill="#9A5B3C" opacity=".3" transform="rotate(-6 83 16)"/>' +
      '<path d="M98 32v14M91 39h14" stroke="#C9A227" stroke-width="4" stroke-linecap="round"/>' +
    '</svg>',
  trim:
    '<svg viewBox="0 0 120 84" aria-hidden="true" focusable="false">' +
      '<rect x="6" y="10" width="76" height="6" rx="3" fill="#4A3B5C" opacity=".55"/>' +
      '<rect x="6" y="24" width="64" height="6" rx="3" fill="#4A3B5C" opacity=".2"/><path d="M4 27h70" stroke="#B23A48" stroke-width="2.5" stroke-linecap="round"/>' +
      '<rect x="6" y="38" width="80" height="6" rx="3" fill="#4A3B5C" opacity=".55"/>' +
      '<rect x="6" y="52" width="52" height="6" rx="3" fill="#4A3B5C" opacity=".2"/><path d="M4 55h58" stroke="#B23A48" stroke-width="2.5" stroke-linecap="round"/>' +
      '<rect x="6" y="66" width="40" height="6" rx="3" fill="#4A3B5C" opacity=".55"/>' +
      '<g stroke="#4A3B5C" stroke-width="3.5" fill="none" stroke-linecap="round"><circle cx="96" cy="62" r="7"/><circle cx="110" cy="56" r="7"/><path d="M101 57l14-30M105 61l-12-34"/></g>' +
    '</svg>'
};

const GAME_LIST = [
  { id:'rank', name:'Rank the answers', line:'Three answers to one question. Put them in order, best to worst.', skill:'Answer quality',
    accent:'#8f7015', tint:'#F6F1E2',
    how:['Read the interview question.', 'Tap the best answer, then the next best, then the weakest.', 'Check it, and see why the best one wins.'] },
  { id:'really-asking', name:'What are they really asking?', line:'Find what the interviewer actually wants to know.', skill:'The real question',
    accent:'#2B4C4A', tint:'#EAF0EE',
    how:['Read the interview question.', 'Pick what the interviewer really wants to find out.', 'Get a tip for answering it well.'] },
  { id:'build', name:'Build the answer', line:'Put the pieces of a strong answer in the right order.', skill:'Structure',
    accent:'#9A5B3C', tint:'#F3EEE9',
    how:['Read the interview question.', 'Tap the pieces in the order you’d say them.', 'Watch out: in harder rounds, one piece doesn’t belong.'] },
  { id:'trim', name:'Trim it', line:'Cut a rambling answer down to what matters.', skill:'Conciseness',
    accent:'#4A3B5C', tint:'#EFEBF2',
    how:['Read a long, rambling answer.', 'Tap the parts to cut until you’re under the word target.', 'Keep the main point and the best example.'] }
];
function gameInfo(id){ return GAME_LIST.find(g => g.id === id) || null; }

// ---------------------------------------------------------------------
// Saving
// ---------------------------------------------------------------------
function cleanGames(s){
  const out = { v:1, track:null, games:{} };
  if(!s || typeof s !== 'object') return out;
  if(GAME_TRACKS.includes(s.track)) out.track = s.track;
  const src = s.games && typeof s.games === 'object' ? s.games : {};
  GAME_LIST.forEach(g => {
    const x = src[g.id];
    if(!x || typeof x !== 'object') return;
    const n = (v, max) => { v = Math.floor(Number(v) || 0); return Math.max(0, max != null ? Math.min(max, v) : v); };
    out.games[g.id] = {
      best: n(x.best, 3),
      sets: n(x.sets),
      stars: n(x.stars),
      topScore: n(x.topScore, 100000),
      seen: Array.isArray(x.seen) ? [...new Set(x.seen.filter(i => typeof i === 'string' && i.length < 60))].slice(-300) : []
    };
  });
  return out;
}
function loadGames(){
  try{ return cleanGames(JSON.parse(localStorage.getItem(GAMES_KEY) || 'null')); } catch(e){ return cleanGames(null); }
}
function saveGames(s){
  try{ localStorage.setItem(GAMES_KEY, JSON.stringify(cleanGames(s))); } catch(e){}
  if(typeof scheduleSync === 'function') scheduleSync();
}
function gameRecord(s, id){
  if(!s.games[id]) s.games[id] = { best:0, sets:0, stars:0, topScore:0, seen:[] };
  return s.games[id];
}
// Sync merge: highest best stars, higher sets played and stars earned,
// union of seen rounds. The filter choice: this device's, else the other's.
function mergeGames(a, b){
  a = cleanGames(a); b = cleanGames(b);
  const m = { v:1, track: a.track || b.track, games:{} };
  GAME_LIST.forEach(g => {
    const x = a.games[g.id], y = b.games[g.id];
    if(!x && !y) return;
    if(!x || !y){ m.games[g.id] = x || y; return; }
    m.games[g.id] = {
      best: Math.max(x.best, y.best), sets: Math.max(x.sets, y.sets), stars: Math.max(x.stars, y.stars),
      topScore: Math.max(x.topScore, y.topScore),
      seen: [...new Set([...x.seen, ...y.seen])].slice(-300)
    };
  });
  return m;
}
// For XP: every star earned in a finished set.
function gameStarsEarned(){
  const s = loadGames();
  return Object.values(s.games).reduce((sum, g) => sum + g.stars, 0);
}
// Best stars across the four games, for the Get ready card ("7 of 12 stars").
function gameBestTotals(){
  const s = loadGames();
  const played = GAME_LIST.filter(g => s.games[g.id] && s.games[g.id].sets > 0);
  return { played: played.length, stars: played.reduce((sum, g) => sum + s.games[g.id].best, 0), max: GAME_LIST.length * 3 };
}

function gameTrack(){
  const s = loadGames();
  if(s.track) return s.track;
  const p = typeof preferredTrack === 'function' ? preferredTrack() : null;
  return p === 'job' || p === 'college' ? p : 'all';
}
function setGameTrack(track){
  if(!GAME_TRACKS.includes(track)) return;
  const s = loadGames();
  s.track = track;
  saveGames(s);
}

// ---------------------------------------------------------------------
// Content: English is the source (data/games/<id>.json). Other languages
// are overlays keyed by round id (data/games/<lang>/<id>.json) holding only
// the text, so the structure (tracks, orders, tags) lives in one place.
// ---------------------------------------------------------------------
const gameData = {};      // id -> English file
const gameOverlays = {};  // lang -> id -> overlay file | null (missing)
const gameDaily = {};     // lang -> { questionId: { q, note } } (for Really asking)

function fetchJSON(url){
  return fetch(url).then(r => { if(!r.ok) throw new Error(r.status); return r.json(); });
}
async function loadGameEnglish(id){
  if(!gameData[id]) gameData[id] = fetchJSON('data/games/' + id + '.json').catch(e => { delete gameData[id]; throw e; });
  return gameData[id];
}
async function loadGameOverlay(lang, id){
  if(lang === 'en') return null;
  gameOverlays[lang] = gameOverlays[lang] || {};
  if(!(id in gameOverlays[lang])) gameOverlays[lang][id] = fetchJSON('data/games/' + lang + '/' + id + '.json').catch(() => null);
  return gameOverlays[lang][id];
}
async function loadGameDaily(lang){
  if(!gameDaily.en){
    gameDaily.en = fetchJSON('data/daily-questions.json').then(d => {
      const map = {};
      (d.questions || []).forEach(q => { map[q.id] = { q:q.q, note:q.note }; });
      return map;
    }).catch(() => ({}));
  }
  if(lang !== 'en' && !gameDaily[lang]) gameDaily[lang] = fetchJSON('data/daily/' + lang + '.json').then(d => d.items || {}).catch(() => ({}));
  const en = await gameDaily.en;
  const tr = lang === 'en' ? {} : await gameDaily[lang];
  return { en, tr };
}

// Returns { rounds, lang, reviewed, fallback } for this game in `lang`,
// with each round's text in that language when a translation exists.
async function loadGameContent(id, lang){
  const base = await loadGameEnglish(id);
  const overlay = await loadGameOverlay(lang, id);
  const items = overlay && overlay.items ? overlay.items : null;
  const useLang = items ? lang : 'en';
  let daily = null;
  if(id === 'really-asking') daily = await loadGameDaily(useLang);
  const rounds = (base.rounds || []).map(r => {
    const tr = items && items[r.id] ? items[r.id] : null;
    const round = mergeRoundText(r, tr);
    // Trim: the English length, so other languages can scale the target.
    if(r.segments) round.enStart = countUnits(r.segments.map(s => s.t).join(' '), 'en');
    if(daily && r.daily){
      const de = daily.en[r.daily] || {}, dt = (daily.tr && daily.tr[r.daily]) || {};
      // The question and the right answer come from the question of the day,
      // so the two features always say the same thing.
      round.q = (useLang !== 'en' && dt.q) || de.q || round.q;
      round.right = (useLang !== 'en' && dt.note) || de.note || round.right;
    }
    return round;
  }).filter(r => r.q);
  return {
    rounds, lang: useLang,
    reviewed: items ? !(overlay.meta && overlay.meta.reviewed === false) : true,
    fallback: lang !== 'en' && !items
  };
}
// Copy translated text onto a round without touching its structure.
function mergeRoundText(r, tr){
  const out = JSON.parse(JSON.stringify(r));
  if(!tr) return out;
  ['q', 'why', 'tip', 'right'].forEach(k => { if(typeof tr[k] === 'string' && tr[k]) out[k] = tr[k]; });
  if(Array.isArray(tr.wrong) && tr.wrong.length === (out.wrong || []).length) out.wrong = tr.wrong.slice();
  if(Array.isArray(tr.answers) && out.answers && tr.answers.length === out.answers.length){
    out.answers.forEach((a, i) => { const x = tr.answers[i] || {}; if(x.text) a.text = x.text; if(x.reason) a.reason = x.reason; });
  }
  if(tr.pieces && out.pieces){
    out.pieces.forEach(p => { if(typeof tr.pieces[p.id] === 'string') p.text = tr.pieces[p.id]; });
  }
  if(typeof tr.decoyWhy === 'string' && tr.decoyWhy) out.decoyWhy = tr.decoyWhy;
  if(Array.isArray(tr.segments) && out.segments && tr.segments.length === out.segments.length){
    out.segments.forEach((s, i) => { if(typeof tr.segments[i] === 'string') s.t = tr.segments[i]; });
  }
  return out;
}

// ---------------------------------------------------------------------
// Picking rounds: 5 at random from the filter, skipping rounds already seen
// until that game's pool runs out, then starting over.
// ---------------------------------------------------------------------
function shuffled(arr){
  const a = arr.slice();
  for(let i = a.length - 1; i > 0; i--){ const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
function roundsForTrack(rounds, track){
  return rounds.filter(r => track === 'all' || r.track === 'general' || r.track === track);
}
function pickGameRounds(id, rounds, track){
  const pool = roundsForTrack(rounds, track);
  const s = loadGames();
  const rec = gameRecord(s, id);
  const seen = new Set(rec.seen);
  let chosen = shuffled(pool.filter(r => !seen.has(r.id))).slice(0, GAME_SET_SIZE);
  if(chosen.length < GAME_SET_SIZE){
    // Seen everything in this pool: start over (but don't repeat within the set).
    const poolIds = new Set(pool.map(r => r.id));
    rec.seen = rec.seen.filter(i => !poolIds.has(i));
    saveGames(s);
    const ids = new Set(chosen.map(r => r.id));
    chosen = chosen.concat(shuffled(pool.filter(r => !ids.has(r.id))).slice(0, GAME_SET_SIZE - chosen.length));
  }
  // Build: hard rounds (with a piece that doesn't belong) come after the first two.
  if(id === 'build'){
    const easy = chosen.filter(r => !r.hard), hard = chosen.filter(r => r.hard);
    chosen = easy.slice(0, 2).concat(shuffled(easy.slice(2).concat(hard)));
  }
  return chosen;
}
function markRoundSeen(id, roundId){
  const s = loadGames();
  const rec = gameRecord(s, id);
  if(!rec.seen.includes(roundId)){ rec.seen.push(roundId); saveGames(s); }
}

// ---------------------------------------------------------------------
// Shared helpers for the game modules
// ---------------------------------------------------------------------
const GAME_RIGHT_LINES = ['Nice, that’s the one.', 'Yes, exactly.', 'That’s it.', 'Spot on.', 'Nice work.'];
const GAME_WRONG_LINES = ['Not quite. Here’s why.', 'Close, but not this time.', 'Not this one. Here’s the thinking.'];
const ORDINALS = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth'];
const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];
function pickLine(list){ return list[Math.floor(Math.random() * list.length)]; }
function gameLive(text){
  const live = el('game-live');
  if(!live) return;
  live.textContent = '';
  setTimeout(() => { live.textContent = t(text); }, 30);
}
function isZh(lang){ return lang === 'zh'; }
// Chinese counts characters; everything else counts words.
function countUnits(text, lang){
  if(isZh(lang)){
    const cjk = (text.match(/[㐀-鿿豈-﫿]/g) || []).length;
    const latin = (text.replace(/[㐀-鿿豈-﫿]/g, ' ').match(/[A-Za-z0-9]+/g) || []).length;
    return cjk + latin;
  }
  return (text.trim().match(/\S+/g) || []).length;
}

// Small drag-to-reorder helper for desktop (tap and keyboard always work too).
// `onDrop(fromKey, toKey, after)` is called when an item is dropped on another.
function enableDrag(container, selector, onDrop, onDropZone){
  let dragKey = null;
  container.querySelectorAll(selector).forEach(item => {
    item.setAttribute('draggable', 'true');
    item.addEventListener('dragstart', e => {
      dragKey = item.dataset.key;
      item.classList.add('dragging');
      try{ e.dataTransfer.effectAllowed = 'move'; e.dataTransfer.setData('text/plain', dragKey); } catch(err){}
    });
    item.addEventListener('dragend', () => { item.classList.remove('dragging'); dragKey = null; container.querySelectorAll('.drop-before,.drop-after').forEach(x => x.classList.remove('drop-before', 'drop-after')); });
  });
  container.querySelectorAll('[data-drop]').forEach(zone => {
    zone.addEventListener('dragover', e => {
      if(!dragKey) return;
      e.preventDefault();
      const target = e.target.closest(selector);
      zone.querySelectorAll('.drop-before,.drop-after').forEach(x => x.classList.remove('drop-before', 'drop-after'));
      if(target && target.dataset.key !== dragKey && zone.contains(target)){
        const r = target.getBoundingClientRect();
        target.classList.add(e.clientY > r.top + r.height / 2 ? 'drop-after' : 'drop-before');
      }
    });
    zone.addEventListener('drop', e => {
      if(!dragKey) return;
      e.preventDefault();
      const key = dragKey;
      const target = e.target.closest(selector);
      if(target && zone.contains(target)){
        if(target.dataset.key === key) return;
        const r = target.getBoundingClientRect();
        onDrop(key, target.dataset.key, e.clientY > r.top + r.height / 2, zone.dataset.drop);
      } else if(onDropZone){
        onDropZone(key, zone.dataset.drop);
      }
    });
  });
}

// ---------------------------------------------------------------------
// The four games. Each module:
//   init(round)          -> fresh round state
//   render(ctx)          -> HTML for the round (ctx: { round, st, checked, lang })
//   bind(root, ctx)      -> wire up taps/keys; call ctx.update() after a change
//   ready(st, round)     -> can the student press Check?
//   check(st, round)     -> true if right
//   reveal(ctx)          -> HTML for the answer (the "why" and skill are added by the shell)
//   missLine(round)      -> the line to remember from a missed round
// ---------------------------------------------------------------------
const GAME_MODULES = {};

// ---- Rank the answers ----
GAME_MODULES.rank = {
  init(round){
    return { shown: shuffled(round.answers.map((_, i) => i)), order: [] };
  },
  render({ round, st, checked }){
    const items = st.shown.map((ai, pos) => {
      const a = round.answers[ai];
      const rank = st.order.indexOf(ai);
      const letter = LETTERS[pos];
      const label = rank >= 0 ? t('Answer {1}, ranked {2}.', letter, rank + 1) : t('Answer {1}, not ranked yet.', letter);
      return '<li class="rank-item' + (rank >= 0 ? ' ranked' : '') + '" data-key="' + ai + '">' +
        '<button type="button" class="rank-btn" data-ans="' + ai + '"' + (checked ? ' disabled' : '') + ' aria-label="' + escapeHTML(label + ' ' + a.text) + '">' +
          '<span class="rank-badge" aria-hidden="true">' + (rank >= 0 ? rank + 1 : '') + '</span>' +
          '<span class="rank-body"><span class="rank-letter" aria-hidden="true">' + letter + '</span>' +
          '<span class="rank-text" translate="no">' + escapeHTML(a.text) + '</span></span>' +
        '</button></li>';
    }).join('');
    return '<p class="game-instr">Tap the best answer first, then the next best, then the weakest. Tap again to undo.</p>' +
      '<ol class="rank-list" data-drop="rank" aria-label="Answers">' + items + '</ol>' +
      '<p class="game-hint drag-hint">On a computer you can also drag them into order, best at the top.</p>';
  },
  bind(root, ctx){
    const { st } = ctx;
    root.querySelectorAll('.rank-btn').forEach(btn => btn.addEventListener('click', () => {
      const ai = Number(btn.dataset.ans);
      const pos = st.shown.indexOf(ai);
      const at = st.order.indexOf(ai);
      if(at >= 0){
        st.order.splice(at, 1);
        gameLive(t('Answer {1} unranked.', LETTERS[pos]));
      } else {
        st.order.push(ai);
        // {2} is the English word ("second"); translations use the number, {3}.
        gameLive(t('Answer {1} placed {2}.', LETTERS[pos], ORDINALS[st.order.length - 1], st.order.length));
      }
      ctx.update('[data-ans="' + ai + '"]', null, at >= 0 ? null : '.rank-item[data-key="' + ai + '"]');
    }));
    if(!ctx.checked) enableDrag(root, '.rank-item', (from, to, after) => {
      const f = Number(from), tIdx = Number(to);
      const list = st.shown.filter(x => x !== f);
      let at = list.indexOf(tIdx) + (after ? 1 : 0);
      list.splice(at, 0, f);
      st.shown = list;
      st.order = list.slice(); // dragging puts all three in order, top = best
      gameLive(t('Order set: {1}.', list.map((_, i) => LETTERS[i]).join(', ')));
      ctx.update();
    });
  },
  ready(st){ return st.order.length === 3; },
  check(st, round){
    const want = ['strong', 'okay', 'weak'];
    return st.order.every((ai, i) => round.answers[ai].quality === want[i]);
  },
  // Picked the best answer first: some credit.
  partial(st, round){ return round.answers[st.order[0]] && round.answers[st.order[0]].quality === 'strong' ? 40 : 0; },
  reveal({ round, st }){
    const want = ['strong', 'okay', 'weak'];
    const labels = { strong:'Best', okay:'Okay', weak:'Weakest' };
    return '<ol class="reveal-list">' + want.map((q, i) => {
      const ai = round.answers.findIndex(a => a.quality === q);
      const a = round.answers[ai];
      const yours = st.order.indexOf(ai);
      const ok = yours === i;
      return '<li class="reveal-item ' + (ok ? 'ok' : 'miss') + '">' +
        '<span class="reveal-num" aria-hidden="true">' + (i + 1) + '</span>' +
        '<div><p class="reveal-role">' + labels[q] + ' <span class="reveal-mark">' + (ok ? '✓ You had this one right' : t('✗ You ranked this {1}', yours + 1)) + '</span></p>' +
        '<p class="reveal-text" translate="no">' + escapeHTML(a.text) + '</p>' +
        '<p class="reveal-reason" translate="no">' + escapeHTML(a.reason) + '</p></div></li>';
    }).join('') + '</ol>';
  },
  missLine(round){ return round.why; }
};

// ---- What are they really asking? ----
GAME_MODULES['really-asking'] = {
  init(round){
    const opts = [{ text: round.right, right: true }].concat((round.wrong || []).map(w => ({ text: w, right: false })));
    return { opts: shuffled(opts), pick: -1 };
  },
  render({ st, checked }){
    return '<p class="game-instr">What does the interviewer actually want to know?</p>' +
      '<div class="ra-options" role="radiogroup" aria-label="What they’re really asking">' + st.opts.map((o, i) => {
        const on = st.pick === i;
        let cls = 'ra-option' + (on ? ' picked' : '');
        let mark = '';
        if(checked){
          if(o.right){ cls += ' right'; mark = '<span class="ra-mark">✓ Right answer</span>'; }
          else if(on){ cls += ' wrong'; mark = '<span class="ra-mark">✗ Your pick</span>'; }
        }
        return '<button type="button" class="' + cls + '" role="radio" aria-checked="' + on + '" data-opt="' + i + '"' + (checked ? ' disabled' : '') + '>' +
          '<span class="ra-dot" aria-hidden="true"></span><span class="ra-text"><span translate="no">' + escapeHTML(o.text) + '</span>' + mark + '</span></button>';
      }).join('') + '</div>';
  },
  bind(root, ctx){
    const btns = [...root.querySelectorAll('.ra-option')];
    btns.forEach((btn, i) => {
      btn.addEventListener('click', () => {
        ctx.st.pick = i;
        gameLive(t('Option {1} chosen.', i + 1));
        ctx.update('[data-opt="' + i + '"]', null, '[data-opt="' + i + '"]');
      });
      btn.addEventListener('keydown', e => {
        const k = e.key;
        if(!['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft'].includes(k)) return;
        e.preventDefault();
        const next = (i + (k === 'ArrowDown' || k === 'ArrowRight' ? 1 : -1) + btns.length) % btns.length;
        btns[next].focus();
      });
    });
  },
  ready(st){ return st.pick >= 0; },
  check(st){ return !!(st.opts[st.pick] && st.opts[st.pick].right); },
  reveal({ round }){
    return '<p class="reveal-answer"><span class="reveal-role">They really want to know</span> <span translate="no">' + escapeHTML(round.right) + '</span></p>' +
      (round.tip ? '<p class="reveal-tip"><span class="reveal-role">So a good answer…</span> <span translate="no">' + escapeHTML(round.tip) + '</span></p>' : '');
  },
  missLine(round){ return round.tip || round.why; }
};

// ---- Build the answer ----
const BUILD_ROLES = { answer:'Answer first', situation:'Situation', did:'What I did', result:'Result', learned:'What I learned', decoy:'Doesn’t belong' };
GAME_MODULES.build = {
  init(round){ return { placed: [], pool: shuffled(round.pieces.map(p => p.id)) }; },
  needed(round){ return round.pieces.filter(p => p.role !== 'decoy').length; },
  render({ round, st, checked }){
    const byId = id => round.pieces.find(p => p.id === id);
    const placed = st.placed.map((id, i) => {
      const p = byId(id);
      return '<li class="build-item" data-key="' + id + '">' +
        '<span class="build-num" aria-hidden="true">' + (i + 1) + '</span>' +
        '<button type="button" class="build-text" data-back="' + id + '"' + (checked ? ' disabled' : '') + ' aria-label="' + escapeHTML(t('Piece {1}: {2}. Tap to take it out.', i + 1, p.text)) + '"><span translate="no">' + escapeHTML(p.text) + '</span></button>' +
        (checked ? '' : '<span class="build-moves">' +
          '<button type="button" class="build-move" data-up="' + id + '"' + (i === 0 ? ' disabled' : '') + ' aria-label="' + escapeHTML(t('Move piece {1} up', i + 1)) + '">↑</button>' +
          '<button type="button" class="build-move" data-down="' + id + '"' + (i === st.placed.length - 1 ? ' disabled' : '') + ' aria-label="' + escapeHTML(t('Move piece {1} down', i + 1)) + '">↓</button>' +
        '</span>') + '</li>';
    }).join('');
    const pool = st.pool.map(id => {
      const p = byId(id);
      return '<li class="build-piece" data-key="' + id + '"><button type="button" class="build-add" data-add="' + id + '"' + (checked ? ' disabled' : '') + ' aria-label="' + escapeHTML(t('Add to your answer: {1}', p.text)) + '"><span translate="no">' + escapeHTML(p.text) + '</span></button></li>';
    }).join('');
    const need = this.needed(round);
    return '<p class="game-instr">Tap the pieces in the order you’d say them. Tap a piece in your answer to send it back.</p>' +
      (round.hard ? '<p class="game-hint hard-hint">One piece doesn’t belong. Leave it out.</p>' : '') +
      '<div class="build-cols">' +
        '<div class="build-zone"><h3 class="build-label">Your answer <span class="build-count">' + st.placed.length + ' of ' + need + '</span></h3>' +
          '<ol class="build-answer" data-drop="answer" aria-label="Your answer">' + (placed || '<li class="build-empty">Tap a piece to start.</li>') + '</ol></div>' +
        '<div class="build-zone"><h3 class="build-label">' + (round.hard ? 'Pieces (one stays here)' : 'Pieces') + '</h3>' +
          '<ul class="build-pool" data-drop="pool" aria-label="Pieces">' + (pool || '<li class="build-empty">All placed.</li>') + '</ul></div>' +
      '</div>' +
      '<p class="game-hint drag-hint">On a computer you can also drag pieces into place.</p>';
  },
  bind(root, ctx){
    const { st, round } = ctx;
    const text = id => (round.pieces.find(p => p.id === id) || {}).text || '';
    root.querySelectorAll('[data-add]').forEach(b => b.addEventListener('click', () => {
      const id = b.dataset.add;
      st.pool = st.pool.filter(x => x !== id);
      st.placed.push(id);
      gameLive(t('Added as piece {1}.', st.placed.length));
      const next = st.pool[0];
      ctx.update(next ? '[data-add="' + next + '"]' : '[data-back="' + id + '"]', null, '.build-item[data-key="' + id + '"]');
    }));
    root.querySelectorAll('[data-back]').forEach(b => b.addEventListener('click', () => {
      const id = b.dataset.back;
      const at = st.placed.indexOf(id);
      st.placed = st.placed.filter(x => x !== id);
      st.pool.push(id);
      gameLive(t('Piece sent back.'));
      const next = st.placed[Math.min(at, st.placed.length - 1)];
      ctx.update(next ? '[data-back="' + next + '"]' : '[data-add="' + id + '"]');
    }));
    const move = (id, d) => {
      const i = st.placed.indexOf(id), j = i + d;
      if(i < 0 || j < 0 || j >= st.placed.length) return;
      [st.placed[i], st.placed[j]] = [st.placed[j], st.placed[i]];
      gameLive(t('Moved to position {1}.', j + 1));
      const sel = (d < 0 ? '[data-up="' : '[data-down="') + id + '"]';
      ctx.update(sel, '[data-back="' + id + '"]', '.build-item[data-key="' + id + '"]');
    };
    root.querySelectorAll('[data-up]').forEach(b => b.addEventListener('click', () => move(b.dataset.up, -1)));
    root.querySelectorAll('[data-down]').forEach(b => b.addEventListener('click', () => move(b.dataset.down, 1)));
    if(ctx.checked) return;
    enableDrag(root, '.build-item, .build-piece', (from, to, after, zone) => {
      st.placed = st.placed.filter(x => x !== from);
      st.pool = st.pool.filter(x => x !== from);
      const list = zone === 'answer' ? st.placed : st.pool;
      const at = list.indexOf(to) + (after ? 1 : 0);
      list.splice(Math.max(0, at), 0, from);
      if(zone === 'answer') gameLive(t('Moved to position {1}.', st.placed.indexOf(from) + 1));
      else gameLive(t('Piece sent back.'));
      ctx.update();
    }, (from, zone) => {
      st.placed = st.placed.filter(x => x !== from);
      st.pool = st.pool.filter(x => x !== from);
      (zone === 'answer' ? st.placed : st.pool).push(from);
      gameLive(zone === 'answer' ? t('Added as piece {1}.', st.placed.length) : t('Piece sent back.'));
      ctx.update();
    });
  },
  ready(st, round){ return st.placed.length === this.needed(round); },
  check(st, round){ return (round.orders || []).some(o => o.length === st.placed.length && o.every((id, i) => st.placed[i] === id)); },
  // 10 points for each piece in a right spot (best matching order), 10 for leaving the decoy out.
  partial(st, round){
    const spots = Math.max(0, ...(round.orders || []).map(o => o.filter((id, i) => st.placed[i] === id).length));
    const decoyOut = round.hard && !round.pieces.some(p => p.role === 'decoy' && st.placed.includes(p.id)) ? 10 : 0;
    return Math.min(60, spots * 10 + decoyOut);
  },
  reveal({ round, st }){
    const model = round.orders[0];
    const decoys = round.pieces.filter(p => p.role === 'decoy');
    const rows = model.map((id, i) => {
      const p = round.pieces.find(x => x.id === id);
      const ok = st.placed[i] === id;
      return '<li class="reveal-item ' + (ok ? 'ok' : 'miss') + '"><span class="reveal-num" aria-hidden="true">' + (i + 1) + '</span>' +
        '<div><p class="reveal-role">' + (BUILD_ROLES[p.role] || '') + ' <span class="reveal-mark">' + (ok ? '✓' : '✗ <span>Not in this spot</span>') + '</span></p>' +
        '<p class="reveal-text" translate="no">' + escapeHTML(p.text) + '</p></div></li>';
    }).join('');
    const out = decoys.map(p => {
      const used = st.placed.includes(p.id);
      return '<li class="reveal-item decoy ' + (used ? 'miss' : 'ok') + '"><span class="reveal-num" aria-hidden="true">–</span>' +
        '<div><p class="reveal-role">' + BUILD_ROLES.decoy + ' <span class="reveal-mark">' + (used ? '✗ You used this one' : '✓ You left it out') + '</span></p>' +
        '<p class="reveal-text" translate="no">' + escapeHTML(p.text) + '</p>' +
        (round.decoyWhy ? '<p class="reveal-reason" translate="no">' + escapeHTML(round.decoyWhy) + '</p>' : '') + '</div></li>';
    }).join('');
    const others = round.orders.length > 1 ? '<p class="game-hint">Other orders work too. This is one strong one.</p>' : '';
    return '<ol class="reveal-list">' + rows + out + '</ol>' + others;
  },
  missLine(round){ return round.why; }
};

// ---- Trim it ----
GAME_MODULES.trim = {
  init(round){ return { cut: round.segments.map(() => false) }; },
  joiner(lang){ return isZh(lang) ? '' : ' '; },
  counts(round, st, lang){
    const all = round.segments.map(s => s.t).join(this.joiner(lang));
    const kept = round.segments.filter((s, i) => !st.cut[i]).map(s => s.t).join(this.joiner(lang));
    return { start: countUnits(all, lang), now: countUnits(kept, lang), target: this.target(round, lang) };
  },
  // English rounds store a target. Other languages scale it by the same
  // ratio, but never below what the model answer needs.
  target(round, lang){
    if(lang === 'en' || !round.enStart) return round.target;
    const all = countUnits(round.segments.map(s => s.t).join(this.joiner(lang)), lang);
    const model = countUnits(round.segments.filter(s => s.tag !== 'cut').map(s => s.t).join(this.joiner(lang)), lang);
    return Math.max(model, Math.ceil(all * round.target / round.enStart));
  },
  render({ round, st, checked, lang }){
    const c = this.counts(round, st, lang);
    const unit = isZh(lang) ? 'characters' : 'words';
    const segs = round.segments.map((s, i) => {
      const cut = st.cut[i];
      let cls = 'trim-seg' + (cut ? ' cut' : '');
      if(checked && cut && s.tag !== 'cut') cls += ' lost';
      // A span (not a <button>) so the answer wraps like a normal paragraph;
      // role, tabindex and the key handler in bind() make it act like a button.
      return '<span class="' + cls + '" role="button" data-seg="' + i + '" aria-pressed="' + cut + '"' +
        (checked ? ' aria-disabled="true"' : ' tabindex="0"') + ' translate="no">' + escapeHTML(s.t) + '</span>';
    }).join(isZh(lang) ? '' : ' ');
    const under = c.now <= c.target;
    return '<p class="game-instr">Tap the parts to cut. Keep the main point and the best example.</p>' +
      '<p class="trim-counter' + (under ? ' under' : '') + '" id="trim-counter">' +
        '<span>' + t('{1} → {2} ' + unit, c.start, c.now) + '</span> <span class="trim-target">' + t('Target: {1} or fewer', c.target) + '</span>' +
        '<span class="sr-only"> ' + t(isZh(lang) ? '{1} characters left.' : '{1} words left.', c.now) + '</span>' +
        (under ? ' <span class="trim-ok">✓ Under the target</span>' : '') + '</p>' +
      '<div class="trim-text' + (isZh(lang) ? ' zh' : '') + '">' + segs + '</div>';
  },
  bind(root, ctx){
    const { st, round, lang } = ctx;
    if(ctx.checked) return;
    root.querySelectorAll('[data-seg]').forEach(b => b.addEventListener('keydown', e => {
      if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); b.click(); }
    }));
    root.querySelectorAll('[data-seg]').forEach(b => b.addEventListener('click', () => {
      const i = Number(b.dataset.seg);
      st.cut[i] = !st.cut[i];
      const c = this.counts(round, st, lang);
      const unitLeft = isZh(lang) ? '{1} characters left.' : '{1} words left.';
      gameLive((st.cut[i] ? t('Crossed out.') : t('Put back.')) + ' ' + t(unitLeft, c.now));
      ctx.update('[data-seg="' + i + '"]', null, '[data-seg="' + i + '"]');
    }));
  },
  ready(st, round, lang){ const c = this.counts(round, st, lang); return c.now <= c.target && c.now > 0; },
  readyNote(st, round, lang){
    const c = this.counts(round, st, lang);
    if(c.now <= c.target) return '';
    return isZh(lang) ? t('Cut {1} more characters to check.', c.now - c.target) : t('Cut {1} more words to check.', c.now - c.target);
  },
  check(st, round){ return round.segments.every((s, i) => s.tag === 'cut' || !st.cut[i]); },
  // Kept the main point but lost the example (or the other way round): some credit.
  partial(st, round){
    const keep = round.segments.map((s, i) => ({ s, i })).filter(x => x.s.tag !== 'cut');
    const kept = keep.filter(x => !st.cut[x.i]).length;
    return keep.length ? Math.round(40 * kept / keep.length) : 0;
  },
  reveal({ round, st, lang }){
    const model = round.segments.filter(s => s.tag !== 'cut').map(s => s.t).join(this.joiner(lang));
    const lost = round.segments.map((s, i) => ({ s, i })).filter(x => st.cut[x.i] && x.s.tag !== 'cut');
    return '<p class="reveal-answer"><span class="reveal-role">A strong trim</span></p>' +
      '<p class="trim-model" translate="no">' + escapeHTML(model) + '</p>' +
      (lost.length ? '<div class="trim-lost">' + lost.map(x =>
        '<p><span class="reveal-mark">✗ ' + (x.s.tag === 'core' ? 'You cut the main point' : 'You cut the part that proves it') + '</span> <span translate="no">' + escapeHTML(x.s.t) + '</span></p>').join('') + '</div>' : '');
  },
  missLine(round){ return round.why; }
};

// ---------------------------------------------------------------------
// Little effects. All of them are skipped when the device asks for less motion.
// ---------------------------------------------------------------------
function gameMotion(){ return !(typeof reduceMotion === 'function' && reduceMotion()); }
function countUp(node, from, to, ms){
  if(!node) return;
  if(!gameMotion() || from === to){ node.textContent = to; return; }
  const t0 = performance.now();
  const step = now => {
    const k = Math.min(1, (now - t0) / ms);
    node.textContent = Math.round(from + (to - from) * (1 - Math.pow(1 - k, 3)));
    if(k < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
  // Background tabs pause animation frames; make sure the final number lands.
  setTimeout(() => { if(node.isConnected) node.textContent = to; }, ms + 150);
}
function replayClass(node, cls){
  if(!node || !gameMotion()) return;
  node.classList.remove('pop', 'shake', 'flash-ok', 'enter', 'ready-pulse');
  void node.offsetWidth; // restart the animation
  node.classList.add(cls);
}
function floatPoints(anchor, text){
  if(!anchor || !gameMotion()) return;
  const r = anchor.getBoundingClientRect();
  const pop = document.createElement('div');
  pop.className = 'game-float';
  pop.textContent = text;
  pop.style.left = (r.left + r.width / 2) + 'px';
  pop.style.top = (r.top + window.scrollY) + 'px';
  document.body.appendChild(pop);
  setTimeout(() => pop.remove(), 1300);
}

// ---------------------------------------------------------------------
// Hub (#/games)
// ---------------------------------------------------------------------
function renderGamesHub(){
  const s = loadGames();
  const track = gameTrack();
  document.querySelectorAll('#games-filter [data-track]').forEach(b => b.setAttribute('aria-pressed', b.dataset.track === track ? 'true' : 'false'));
  el('games-grid').innerHTML = GAME_LIST.map(g => {
    const rec = s.games[g.id];
    const played = rec && rec.sets > 0;
    const meta = played
      ? '<span class="game-card-stars" aria-label="' + escapeHTML(t('Best: {1} of 3 stars', rec.best)) + '">' + starsHTML(rec.best) + '</span>' +
        (rec.topScore ? ' <span>' + t('Top score: {1}', rec.topScore) + '</span>' : '')
      : '<span>Not played yet</span>';
    return '<div class="card game-card" data-game="' + g.id + '" style="--g-accent:' + g.accent + ';--g-tint:' + g.tint + '">' +
      '<div class="game-card-art">' + GAME_ART[g.id] + '</div>' +
      '<div class="game-card-body">' +
        '<p class="game-card-skill">' + escapeHTML(g.skill) + '</p>' +
        '<h2>' + escapeHTML(g.name) + '</h2>' +
        '<p>' + escapeHTML(g.line) + '</p>' +
        '<p class="game-card-meta">' + meta + '</p>' +
        '<div class="tool-foot"><a class="btn btn-primary game-play-btn" href="#/games/' + g.id + '">' + (played ? 'Play again' : 'Play') + '</a></div>' +
      '</div>' +
    '</div>';
  }).join('');
  el('games-grid').querySelectorAll('.game-card').forEach(card => card.addEventListener('click', e => {
    if(e.target.closest('a')) return;
    go('#/games/' + card.dataset.game);
  }));
}

// ---------------------------------------------------------------------
// The shell: start screen, header, round, Check / reveal / Next, end screen
// ---------------------------------------------------------------------
let gameRun = null; // { id, rounds, i, results, points, st, checked, lang, reviewed, fallback, done, track, score, combo, bestCombo }

function setGameTheme(info){
  const view = el('view-game');
  view.style.setProperty('--g-accent', info.accent);
  view.style.setProperty('--g-tint', info.tint);
}

async function openGame(id){
  const info = gameInfo(id);
  if(!info || !GAME_MODULES[id]){ go('#/games', true); return; }
  setGameTheme(info);
  // Coming back to a set in progress (same game): keep playing it.
  if(gameRun && gameRun.id === id && !gameRun.done){ renderGame(); return; }
  gameRun = null;
  renderGameIntro(id);
}

function renderGameIntro(id){
  const info = gameInfo(id);
  const rec = loadGames().games[id];
  el('game-title').textContent = info.name;
  el('game-hud').hidden = true;
  el('game-lang-note').hidden = true;
  const stats = rec && rec.sets > 0
    ? '<p class="game-intro-stats"><span class="game-card-stars" aria-label="' + escapeHTML(t('Best: {1} of 3 stars', rec.best)) + '">' + starsHTML(rec.best) + '</span>' +
      (rec.topScore ? ' <span>' + t('Top score: {1}', rec.topScore) + '</span>' : '') + '</p>'
    : '';
  el('game-stage').innerHTML =
    '<div class="game-intro">' +
      '<div class="game-intro-art">' + GAME_ART[id] + '</div>' +
      '<p class="game-intro-line">' + escapeHTML(info.line) + '</p>' +
      '<ol class="game-how">' + info.how.map(h => '<li>' + escapeHTML(h) + '</li>').join('') + '</ol>' +
      '<p class="game-intro-rules">5 rounds. 100 points for each right answer, and bonus points for answers right in a row.</p>' +
      stats +
      '<button type="button" class="btn btn-primary game-start-btn" id="game-start">Start</button>' +
    '</div>';
  el('game-start').addEventListener('click', () => startGameSet(id));
  el('game-start').focus({ preventScroll:true });
}

async function startGameSet(id){
  const info = gameInfo(id);
  setGameTheme(info);
  el('game-title').textContent = info.name;
  el('game-stage').innerHTML = '<p class="game-loading" role="status"><span class="spinner" aria-hidden="true"></span> <span>Loading…</span></p>';
  el('game-hud').hidden = true;
  el('game-lang-note').hidden = true;
  let content;
  try{ content = await loadGameContent(id, interviewLang()); }
  catch(e){
    el('game-stage').innerHTML = '<p class="error-banner" role="alert">This game didn’t load. Check your connection and try again.</p>' +
      '<div class="game-actions"><button type="button" class="btn btn-primary" id="game-retry">Try again</button></div>';
    el('game-retry').addEventListener('click', () => startGameSet(id));
    return;
  }
  // The student may have left while it loaded.
  if(location.hash !== '#/games/' + id) return;
  const track = gameTrack();
  const rounds = pickGameRounds(id, content.rounds, track);
  if(!rounds.length){ el('game-stage').innerHTML = '<p class="error-banner" role="alert">No rounds found for this game yet.</p>'; return; }
  gameRun = { id, rounds, i:0, results:[], points:[], st:null, checked:false, lang:content.lang, reviewed:content.reviewed, fallback:content.fallback,
    done:false, track, record:null, score:0, combo:0, bestCombo:0 };
  gameRun.st = GAME_MODULES[id].init(rounds[0]);
  renderGame(true);
}

function renderHud(){
  const run = gameRun;
  el('game-hud').hidden = false;
  el('game-round-label').textContent = run.done ? 'Set complete' : t('Round {1} of {2}', run.i + 1, run.rounds.length);
  el('game-pips').innerHTML = run.rounds.map((r, i) => {
    const res = run.results[i];
    const cls = res === true ? 'ok' : res === false ? 'miss' : (i === run.i && !run.done ? 'now' : '');
    return '<li class="' + cls + '">' + (res === true ? '✓' : res === false ? '✗' : '') + '</li>';
  }).join('');
  el('game-score').textContent = run.score;
  const combo = el('game-combo');
  combo.hidden = run.combo < 2 || run.done;
  combo.textContent = t('{1} in a row', run.combo);
}

function renderGame(focusTop){
  const run = gameRun;
  if(!run) return;
  const info = gameInfo(run.id);
  setGameTheme(info);
  el('game-title').textContent = info.name;
  const note = el('game-lang-note');
  if(run.fallback){ note.hidden = false; note.textContent = t('This game is in English for now.'); }
  else if(!run.reviewed){ note.hidden = false; note.innerHTML = '<span class="lang-beta">Beta</span> <span>This translation hasn’t been checked by a fluent speaker yet.</span>'; }
  else note.hidden = true;
  renderHud();
  if(run.done){ renderGameEnd(); return; }
  renderGameRound();
  if(focusTop){
    const h = el('game-q');
    if(h) h.focus({ preventScroll:true });
    replayClass(el('game-stage'), 'enter');
  }
}

function renderGameRound(focusSel, fallbackSel, popSel){
  const run = gameRun;
  const mod = GAME_MODULES[run.id];
  const round = run.rounds[run.i];
  const ctx = { round, st: run.st, checked: run.checked, lang: run.lang };
  const ready = mod.ready(run.st, round, run.lang);
  const readyNote = !run.checked && !ready && mod.readyNote ? mod.readyNote(run.st, round, run.lang) : '';
  const last = run.i === run.rounds.length - 1;
  let reveal = '';
  if(run.checked){
    const ok = run.results[run.i];
    const info = gameInfo(run.id);
    const pts = run.points[run.i] || 0;
    reveal = '<div class="game-reveal ' + (ok ? 'ok' : 'miss') + '" id="game-reveal">' +
      '<div class="game-verdict-row">' +
        '<p class="game-verdict"><span aria-hidden="true">' + (ok ? '✓' : '✗') + '</span> ' + escapeHTML(run.line) + '</p>' +
        '<p class="game-round-points' + (pts ? '' : ' zero') + '" id="game-round-points">+' + pts + '</p>' +
      '</div>' +
      (ok && run.combo >= 2 ? '<p class="game-combo-line">' + t('{1} in a row! +{2} bonus', run.combo, (run.combo - 1) * GAME_COMBO_BONUS) + '</p>' : '') +
      (!ok && pts ? '<p class="game-combo-line partial">' + t('Partly right: +{1}', pts) + '</p>' : '') +
      mod.reveal(ctx) +
      (round.why ? '<p class="game-why"><span class="reveal-role">Why</span> <span translate="no">' + escapeHTML(round.why) + '</span></p>' : '') +
      '<p class="game-skill"><span>Skill:</span> <span>' + escapeHTML(info.skill) + '</span></p>' +
    '</div>';
  }
  el('game-stage').innerHTML =
    '<h2 class="game-q" id="game-q" tabindex="-1" translate="no" lang="' + escapeHTML(LANGS[run.lang] ? LANGS[run.lang].html : 'en') + '">' + escapeHTML(round.q) + '</h2>' +
    '<div class="game-round" id="game-round" lang="' + escapeHTML(LANGS[run.lang] ? LANGS[run.lang].html : 'en') + '">' + mod.render(ctx) + '</div>' +
    reveal +
    '<div class="game-actions">' +
      (run.checked
        ? '<button type="button" class="btn btn-primary game-go-btn" id="game-next">' + (last ? 'See results' : 'Next') + '</button>'
        : '<button type="button" class="btn btn-primary game-go-btn" id="game-check"' + (ready ? '' : ' disabled') + '>Check</button>' +
          (readyNote ? '<span class="game-ready-note">' + escapeHTML(readyNote) + '</span>' : '')) +
    '</div>';
  ctx.update = (sel, alt, pop) => renderGameRound(sel, alt, pop);
  mod.bind(el('game-round'), ctx);
  if(run.checked) el('game-next').addEventListener('click', nextGameRound);
  else el('game-check').addEventListener('click', checkGameRound);
  if(popSel) replayClass(document.querySelector('#game-round ' + popSel), 'pop');
  if(!run.checked && ready && focusSel) replayClass(el('game-check'), 'ready-pulse');
  if(focusSel){
    const f = document.querySelector('#game-round ' + focusSel + ':not(:disabled)') || (fallbackSel && document.querySelector('#game-round ' + fallbackSel + ':not(:disabled)'));
    if(f) f.focus({ preventScroll:true });
    else if(!run.checked && ready) el('game-check').focus({ preventScroll:true });
  }
}

function checkGameRound(){
  const run = gameRun;
  if(!run || run.checked) return;
  const mod = GAME_MODULES[run.id];
  const round = run.rounds[run.i];
  if(!mod.ready(run.st, round, run.lang)) return;
  const ok = mod.check(run.st, round, run.lang);
  const before = run.score;
  run.combo = ok ? run.combo + 1 : 0;
  run.bestCombo = Math.max(run.bestCombo, run.combo);
  const pts = ok ? GAME_POINTS + (run.combo - 1) * GAME_COMBO_BONUS : (mod.partial ? mod.partial(run.st, round, run.lang) : 0);
  run.results[run.i] = ok;
  run.points[run.i] = pts;
  run.score += pts;
  run.checked = true;
  run.line = pickLine(ok ? GAME_RIGHT_LINES : GAME_WRONG_LINES);
  markRoundSeen(run.id, round.id);
  renderGame();
  el('game-score').textContent = before;
  countUp(el('game-score'), before, run.score, 700);
  replayClass(el('game-stage'), ok ? 'flash-ok' : 'shake');
  if(pts) floatPoints(el('game-round-points'), '+' + pts);
  if(ok && run.combo >= 2) replayClass(el('game-combo'), 'pop');
  replayClass(document.querySelector('#game-pips li:nth-child(' + (run.i + 1) + ')'), 'pop');
  gameLive((ok ? t('Correct.') : t('Not quite.')) + ' ' + t(run.line) + ' ' + t('+{1} points. Score: {2}.', pts, run.score));
  const next = el('game-next');
  if(next) next.focus({ preventScroll:true });
  const rev = el('game-reveal');
  if(rev && rev.scrollIntoView) rev.scrollIntoView({ behavior: gameMotion() ? 'smooth' : 'auto', block:'nearest' });
}

function nextGameRound(){
  const run = gameRun;
  if(!run || !run.checked) return;
  if(run.i >= run.rounds.length - 1){ finishGameSet(); return; }
  run.i++;
  run.checked = false;
  run.st = GAME_MODULES[run.id].init(run.rounds[run.i]);
  renderGame(true);
  window.scrollTo(0, 0);
}

function gameStars(right){ return right >= 5 ? 3 : right >= 3 ? 2 : right >= 1 ? 1 : 0; }

function finishGameSet(){
  const run = gameRun;
  const right = run.results.filter(Boolean).length;
  const stars = gameStars(right);
  const before = gameState();
  const s = loadGames();
  const rec = gameRecord(s, run.id);
  const newBest = rec.sets > 0 && stars > rec.best;
  const newHigh = rec.sets > 0 && run.score > (rec.topScore || 0);
  rec.best = Math.max(rec.best, stars);
  rec.topScore = Math.max(rec.topScore || 0, run.score);
  rec.sets += 1;
  rec.stars += stars;
  saveGames(s);
  recordActivity(); // a finished set counts as practice for the streak
  run.done = true;
  run.record = { right, stars, newBest, newHigh };
  renderGame();
  window.scrollTo(0, 0);
  celebrate(before, el('game-end-stars'), false);
  const h = el('game-end-title');
  if(h) h.focus({ preventScroll:true });
}

const GAME_END_TITLES = { 3: 'Perfect set!', 2: 'Nice work!', 1: 'Good start', 0: 'Keep going' };
const GAME_END_LINES = {
  3: 'Every round right. That’s a sharp eye.',
  2: 'Solid set. A couple more and you’ll have it down.',
  1: 'A start. Read the “why” lines, then try another set.',
  0: 'Tough set. The reveals are the best part, so give them a read and try again.'
};

function renderGameEnd(){
  const run = gameRun;
  const r = run.record;
  const missed = run.rounds.find((round, i) => !run.results[i]);
  const mod = GAME_MODULES[run.id];
  const remember = missed ? mod.missLine(missed) : (run.rounds[0] && run.rounds[0].why);
  const starSpans = [0, 1, 2].map(i => '<span class="end-star' + (i < r.stars ? ' on' : '') + '" style="animation-delay:' + (0.25 + i * 0.3) + 's">' + (i < r.stars ? '★' : '☆') + '</span>').join('');
  el('game-stage').innerHTML =
    '<div class="game-end">' +
      '<p class="game-end-kicker">' + escapeHTML(GAME_END_TITLES[r.stars]) + '</p>' +
      '<p class="game-end-stars" id="game-end-stars" role="img" aria-label="' + escapeHTML(t('{1} of 3 stars', r.stars)) + '">' + starSpans + '</p>' +
      '<p class="game-end-score"><b id="game-end-score">0</b> <span>points</span></p>' +
      (r.newHigh ? '<p class="game-best">New high score!</p>' : r.newBest ? '<p class="game-best">New best!</p>' : '') +
      '<h2 class="game-end-title" id="game-end-title" tabindex="-1">' + t('You got {1} of {2}', r.right, run.rounds.length) + '</h2>' +
      (run.bestCombo >= 2 ? '<p class="game-end-combo">' + t('Best streak: {1} in a row', run.bestCombo) + '</p>' : '') +
      '<p class="game-end-line">' + escapeHTML(GAME_END_LINES[r.stars]) + '</p>' +
      (remember ? '<div class="fb-block gold"><h4>Worth remembering</h4><p translate="no">' + escapeHTML(remember) + '</p></div>' : '') +
      '<p class="fine">' + (r.stars > 0 ? t('+{1} XP. Counts toward your streak.', r.stars * GAME_STAR_XP) : 'Counts toward your streak.') + '</p>' +
      '<div class="game-actions">' +
        '<button type="button" class="btn btn-primary game-go-btn" id="game-again">Play again</button>' +
        '<a class="btn btn-secondary" href="#/games">Back to games</a>' +
      '</div>' +
    '</div>';
  countUp(el('game-end-score'), 0, run.score, 1100);
  el('game-again').addEventListener('click', () => startGameSet(run.id));
}

function quitGame(){
  gameRun = null; // nothing is lost but the current set
  go('#/games');
}

