// Groundwork: page translations.
//
// English is written directly in index.html. Each other language has a file,
// i18n/<code>.json, that maps English text to its translation:
//   { "meta": { "name", "reviewed" },
//     "strings":  { "English text": "Translation" },
//     "patterns": { "Round {1} of {2}": "Ronda {1} de {2}" } }
// While a language is on, every piece of text on the page (and placeholder,
// aria-label, title and alt attributes) that matches an English entry is
// swapped for its translation, including text added later by the app. Text
// with no entry stays in English. Files with "reviewed": false haven't been
// checked by a fluent speaker yet and show as "Beta" in the language menu.
//
// Skipped: anything inside [translate="no"], textareas, and chat messages,
// because those hold the student's own words or AI replies.

const LANGS = {
  en: { name:'English', html:'en', speech:'en-US', locale:'en-US', english:'English' },
  es: { name:'Español', html:'es', speech:'es-ES', locale:'es-ES', english:'Spanish' },
  zh: { name:'中文（简体）', html:'zh-CN', speech:'zh-CN', locale:'zh-CN', english:'Chinese (Simplified)' },
  de: { name:'Deutsch', html:'de', speech:'de-DE', locale:'de-DE', english:'German' },
  fr: { name:'Français', html:'fr', speech:'fr-FR', locale:'fr-FR', english:'French' }
};
const SITE_LANG_KEY = 'groundwork:lang';

const I18N = {
  lang: 'en', strings: {}, patterns: [], rawPatterns: {}, meta: null,
  nodes: new Set(), src: new WeakMap(), out: new WeakMap(),
  attrEls: new Set(), attrSrc: new WeakMap(),
  files: {}
};
const I18N_ATTRS = ['placeholder', 'aria-label', 'title', 'alt'];
const I18N_SKIP = 'script,style,textarea,noscript,[translate="no"],.msg-text';

function i18nNorm(s){ return String(s).replace(/\s+/g, ' ').trim(); }

// Translate one English string (exact match first, then patterns).
function i18nLookup(en){
  if(I18N.lang === 'en') return null;
  const key = i18nNorm(en);
  if(!key || !/\p{L}/u.test(key)) return null;
  if(Object.prototype.hasOwnProperty.call(I18N.strings, key)) return I18N.strings[key];
  // Lowercased labels inside sentences ("job path"): try the capitalized entry.
  const cap = key.charAt(0).toUpperCase() + key.slice(1);
  if(cap !== key && Object.prototype.hasOwnProperty.call(I18N.strings, cap)) return I18N.strings[cap];
  for(const p of I18N.patterns){
    const m = key.match(p.re);
    if(m) return p.to.replace(/\{(\d+)\}/g, (_, i) => { const part = m[Number(i)] || ''; const tr = i18nLookup(part); return tr == null ? part : tr; });
  }
  return null;
}

// For code: t('Saved.') or t('Round {1} of {2}', 2, 5).
function t(en, ...vars){
  const fill = s => s.replace(/\{(\d+)\}/g, (_, i) => vars[Number(i) - 1] == null ? '' : vars[Number(i) - 1]);
  if(I18N.lang !== 'en'){
    const key = i18nNorm(en);
    if(Object.prototype.hasOwnProperty.call(I18N.strings, key)) return fill(I18N.strings[key]);
    if(Object.prototype.hasOwnProperty.call(I18N.rawPatterns, key)) return fill(I18N.rawPatterns[key]);
  }
  return fill(en);
}

function i18nApplyText(n){
  const en = I18N.src.get(n);
  const tr = i18nLookup(en);
  let val = en;
  if(tr != null){
    const lead = en.match(/^\s*/)[0], trail = en.match(/\s*$/)[0];
    val = lead + tr + trail;
  }
  I18N.out.set(n, val);
  if(n.data !== val) n.data = val;
}
function i18nText(n){
  if(I18N.out.get(n) === n.data) return; // our own change
  const p = n.parentElement;
  if(!p || p.closest(I18N_SKIP)) return;
  I18N.src.set(n, n.data);
  I18N.nodes.add(n);
  i18nApplyText(n);
}
function i18nApplyAttrs(e){
  const src = I18N.attrSrc.get(e);
  if(!src) return;
  for(const a of Object.keys(src)){
    const tr = i18nLookup(src[a].en);
    const val = tr == null ? src[a].en : tr;
    src[a].out = val;
    if(e.getAttribute(a) !== val) e.setAttribute(a, val);
  }
}
function i18nAttrs(e){
  if(e.closest(I18N_SKIP)) return;
  let src = I18N.attrSrc.get(e);
  let touched = false;
  for(const a of I18N_ATTRS){
    if(!e.hasAttribute(a)) continue;
    const v = e.getAttribute(a);
    if(src && src[a] && src[a].out === v) continue;
    if(!src){ src = {}; I18N.attrSrc.set(e, src); }
    src[a] = { en: v, out: null };
    touched = true;
  }
  if(touched){ I18N.attrEls.add(e); i18nApplyAttrs(e); }
}
function i18nWalk(root){
  if(root.nodeType === 3){ i18nText(root); return; }
  if(root.nodeType !== 1) return;
  if(root.matches && root.matches(I18N_SKIP)) return;
  i18nAttrs(root);
  const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, {
    acceptNode: n => n.nodeType === 1 && n.matches(I18N_SKIP) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT
  });
  let n;
  while((n = w.nextNode())){
    if(n.nodeType === 3) i18nText(n); else i18nAttrs(n);
  }
}

// Watch the page from the very start, so nothing shows untranslated.
const i18nObserver = new MutationObserver(records => {
  for(const r of records){
    if(r.type === 'characterData') i18nText(r.target);
    else if(r.type === 'attributes') i18nAttrs(r.target);
    else r.addedNodes.forEach(i18nWalk);
  }
  if(I18N.nodes.size > 8000){ I18N.nodes.forEach(n => { if(!n.isConnected) I18N.nodes.delete(n); }); I18N.attrEls.forEach(e => { if(!e.isConnected) I18N.attrEls.delete(e); }); }
});
i18nObserver.observe(document.documentElement, { childList:true, subtree:true, characterData:true, attributes:true, attributeFilter:I18N_ATTRS });

function i18nCompile(file){
  I18N.strings = {};
  I18N.patterns = [];
  I18N.rawPatterns = {};
  if(!file) return;
  Object.entries(file.patterns || {}).forEach(([k, v]) => { I18N.rawPatterns[i18nNorm(k).replace(/\{#/g, '{')] = v; });
  Object.entries(file.strings || {}).forEach(([k, v]) => { I18N.strings[i18nNorm(k)] = v; });
  // In pattern keys, {1} matches any text and {#1} matches only a number.
  // Translations refer to both as {1}.
  Object.entries(file.patterns || {}).forEach(([k, v]) => {
    const key = i18nNorm(k);
    const parts = key.split(/\{#?\d+\}/);
    const tokens = key.match(/\{#?\d+\}/g) || [];
    const groups = tokens.map(g => Number(g.replace(/[{}#]/g, '')));
    // Build a regex where each placeholder captures, and remember which group is which number.
    let src = '^';
    parts.forEach((p, i) => {
      src += p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      if(i < tokens.length) src += tokens[i].includes('#') ? '([\\d.,]+)' : '(.+?)';
    });
    src += '$';
    const re = new RegExp(src, 'u');
    // Re-map {n} in the translation to capture positions.
    const to = v.replace(/\{(\d+)\}/g, (_, n) => '{' + (groups.indexOf(Number(n)) + 1) + '}');
    I18N.patterns.push({ re, to });
  });
}

async function i18nLoadFile(code){
  if(code === 'en') return null;
  if(I18N.files[code]) return I18N.files[code];
  const r = await fetch('i18n/' + code + '.json');
  if(!r.ok) throw new Error('Missing translation file for ' + code);
  const file = await r.json();
  I18N.files[code] = file;
  try{ localStorage.setItem('groundwork:i18nCache', JSON.stringify({ code, file })); } catch(e){}
  return file;
}

// Fonts with Chinese characters, only when Chinese is on. They're added under
// the same family names the page already uses (for Chinese characters only),
// so every heading and paragraph picks them up.
let i18nCjkFonts = false;
async function i18nLoadChineseFonts(){
  if(i18nCjkFonts) return;
  i18nCjkFonts = true;
  try{
    const r = await fetch('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;600&family=Noto+Serif+SC:wght@500;600&display=swap');
    const css = (await r.text())
      .replace(/font-family:\s*'Noto Serif SC'/g, "font-family: 'Fraunces'")
      .replace(/font-family:\s*'Noto Sans SC'/g, "font-family: 'Inter'");
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
  } catch(e){
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;600&family=Noto+Serif+SC:wght@500;600&display=swap';
    document.head.appendChild(link);
  }
}

function i18nRefreshAll(){
  I18N.nodes.forEach(n => { if(n.isConnected) i18nApplyText(n); else I18N.nodes.delete(n); });
  I18N.attrEls.forEach(e => { if(e.isConnected) i18nApplyAttrs(e); else I18N.attrEls.delete(e); });
}

// Switch the site language. Returns once the new text is showing.
async function setSiteLang(code, opts){
  if(!LANGS[code]) code = 'en';
  let file = null;
  try{ file = await i18nLoadFile(code); }
  catch(e){ console.error(e); code = 'en'; }
  I18N.lang = code;
  I18N.meta = file ? file.meta : null;
  i18nCompile(file);
  document.documentElement.lang = LANGS[code].html;
  document.documentElement.classList.toggle('lang-long', code === 'de' || code === 'fr');
  if(code === 'zh') i18nLoadChineseFonts();
  if(!(opts && opts.noSave)){ try{ localStorage.setItem(SITE_LANG_KEY, code); } catch(e){} }
  i18nRefreshAll();
  document.dispatchEvent(new CustomEvent('langchange', { detail:{ lang:code } }));
  return code;
}
function siteLang(){ return I18N.lang; }

// On load: use the saved language. A cached copy of its file lets the page
// show translated right away; a fresh copy is fetched in the background.
(function i18nBoot(){
  let code = 'en';
  try{ code = localStorage.getItem(SITE_LANG_KEY) || 'en'; } catch(e){}
  if(!LANGS[code] || code === 'en') return;
  try{
    const cached = JSON.parse(localStorage.getItem('groundwork:i18nCache') || 'null');
    if(cached && cached.code === code && cached.file){
      I18N.files[code] = cached.file;
      I18N.lang = code;
      I18N.meta = cached.file.meta;
      i18nCompile(cached.file);
    }
  } catch(e){}
  document.documentElement.lang = LANGS[code].html;
  document.documentElement.classList.toggle('lang-long', code === 'de' || code === 'fr');
  if(code === 'zh') i18nLoadChineseFonts();
  const cachedFile = I18N.files[code];
  delete I18N.files[code];
  i18nLoadFile(code).then(file => {
    if(JSON.stringify(file) !== JSON.stringify(cachedFile)) setSiteLang(code, { noSave:true });
  }).catch(() => { if(!cachedFile) setSiteLang('en', { noSave:true }); else I18N.files[code] = cachedFile; });
})();
