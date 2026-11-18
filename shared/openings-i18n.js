// Groundwork: the scripted first lines in other languages, shared by the page
// and the server (like interview-data.js). English lives in interview-data.js.
// Draft translations (reviewed: false): have a fluent speaker check them.
//
// Each interviewer's line takes c, the student's first name ('' if none).
// "sunshine-job" and "sunshine-college" are the grumpy interviewer.

const OPENINGS_I18N = {
  es: {
    'warm': c => 'Hola' + (c ? ' ' + c : '') + ', soy Riley. Gracias por venir. Cuéntame un poco sobre ti.',
    'formal': c => 'Mucho gusto' + (c ? ', ' + c : '') + '. Soy Morgan. Empecemos. Háblame de ti.',
    'rapidFire': c => 'Hola' + (c ? ' ' + c : '') + ', soy Devon. Gracias por venir. Háblame de ti.',
    'skeptical': c => 'Hola' + (c ? ' ' + c : '') + ', soy Taylor. Gracias por venir. Háblame de ti y de por qué te postulaste.',
    'alum-priya': c => 'Hola' + (c ? ' ' + c : '') + ', soy Priya. Gracias por reunirte conmigo. Cuéntame un poco sobre ti.',
    'alum-marcus': c => 'Hola' + (c ? ' ' + c : '') + ', encantado de conocerte. Soy Marcus. ¿Por qué no empezamos contigo? Háblame de ti.',
    'alum-jen': c => 'Hola' + (c ? ' ' + c : '') + ', soy Jen. ¿Me oyes bien? Perfecto. Esto es bastante informal, así que simplemente charlemos. Cuéntame un poco sobre ti.',
    'adm-dana': c => 'Buenas tardes' + (c ? ', ' + c : '') + '. Soy Dana Whitfield, de la oficina de admisiones. Gracias por venir. Empecemos contigo. Háblame de ti.',
    'adm-luis': c => 'Hola' + (c ? ' ' + c : '') + ', soy Luis Moreno. Leo las solicitudes de tu zona. Gracias por hacer un hueco. Cuéntame un poco sobre ti.',
    'adm-elena': c => 'Bienvenido' + (c ? ', ' + c : '') + '. Soy Elena Brooks. Siéntate. Empecemos por lo sencillo: háblame de ti.',
    'sunshine-job': c => '*suspira* Hola' + (c ? ' ' + c : '') + '. Soy Sunshine. Sí, en serio. Empecemos de una vez. Háblame de ti.',
    'sunshine-college': c => 'Hola' + (c ? ' ' + c : '') + '. Soy Sunshine. Tengo muchas de estas hoy, así que vamos rápido. Háblame de ti.',
    coach: '¡Hola! Estoy aquí para ayudarte a descubrir qué decir sobre ti en una entrevista. Empecemos por algo fácil: ¿a qué dedicas mucho tiempo fuera de clase? Todo cuenta: un deporte, un trabajo, ayudar en casa, los videojuegos o el arte.',
    coachMore: '¡Hola de nuevo! ¿Qué añadimos a tu página? Puede ser algo nuevo que hayas hecho o una historia que no alcanzamos a contar la última vez.'
  },
  zh: {
    'warm': c => '你好' + (c ? '，' + c : '') + '，我是 Riley。谢谢你过来。先简单介绍一下你自己吧。',
    'formal': c => '很高兴见到你' + (c ? '，' + c : '') + '。我是 Morgan。我们开始吧。请介绍一下你自己。',
    'rapidFire': c => '你好' + (c ? '，' + c : '') + '，我是 Devon。谢谢你过来。介绍一下你自己。',
    'skeptical': c => '你好' + (c ? '，' + c : '') + '，我是 Taylor。谢谢你过来。介绍一下你自己，再说说你为什么申请这份工作。',
    'alum-priya': c => '你好' + (c ? '，' + c : '') + '，我是 Priya。谢谢你来见我。先简单介绍一下你自己吧。',
    'alum-marcus': c => '你好' + (c ? '，' + c : '') + '，很高兴认识你。我是 Marcus。我们先从你开始吧？介绍一下你自己。',
    'alum-jen': c => '你好' + (c ? '，' + c : '') + '，我是 Jen。听得清楚吗？好的。今天比较随意，我们就聊聊天。先介绍一下你自己吧。',
    'adm-dana': c => '下午好' + (c ? '，' + c : '') + '。我是招生办公室的 Dana Whitfield。谢谢你过来。我们先从你开始，请介绍一下你自己。',
    'adm-luis': c => '你好' + (c ? '，' + c : '') + '，我是 Luis Moreno，负责审阅你们地区的申请。谢谢你抽出时间。先简单介绍一下你自己吧。',
    'adm-elena': c => '欢迎' + (c ? '，' + c : '') + '。我是 Elena Brooks。请坐。我们从简单的开始：介绍一下你自己。',
    'sunshine-job': c => '*叹气* 你好' + (c ? '，' + c : '') + '。我叫 Sunshine。对，真的叫这个。我们赶紧开始吧。介绍一下你自己。',
    'sunshine-college': c => '你好' + (c ? '，' + c : '') + '。我叫 Sunshine。今天要面试的人很多，我们抓紧时间。介绍一下你自己。',
    coach: '你好！我来帮你想想面试时可以怎么介绍自己。先从简单的开始：课外你花很多时间在做什么？什么都算，比如运动、打工、帮家里做事、打游戏或者画画。',
    coachMore: '欢迎回来！我们给你的页面再加点什么？可以是你最近做的新事情，也可以是上次没来得及讲的故事。'
  },
  de: {
    'warm': c => 'Hallo' + (c ? ' ' + c : '') + ', ich bin Riley. Danke, dass du gekommen bist. Erzähl mir doch ein bisschen von dir.',
    'formal': c => 'Schön, Sie kennenzulernen' + (c ? ', ' + c : '') + '. Ich bin Morgan. Fangen wir an. Erzählen Sie mir von sich.',
    'rapidFire': c => 'Hallo' + (c ? ' ' + c : '') + ', ich bin Devon. Danke, dass du gekommen bist. Erzähl mir von dir.',
    'skeptical': c => 'Hallo' + (c ? ' ' + c : '') + ', ich bin Taylor. Danke, dass du gekommen bist. Erzähl mir von dir und warum du dich beworben hast.',
    'alum-priya': c => 'Hallo' + (c ? ' ' + c : '') + ', ich bin Priya. Danke, dass du dich mit mir triffst. Erzähl mir doch ein bisschen von dir.',
    'alum-marcus': c => 'Hallo' + (c ? ' ' + c : '') + ', schön, dich kennenzulernen. Ich bin Marcus. Wollen wir mit dir anfangen? Erzähl mir von dir.',
    'alum-jen': c => 'Hallo' + (c ? ' ' + c : '') + ', ich bin Jen. Hörst du mich gut? Super. Das hier ist ganz locker, also lass uns einfach reden. Erzähl mir ein bisschen von dir.',
    'adm-dana': c => 'Guten Tag' + (c ? ', ' + c : '') + '. Ich bin Dana Whitfield vom Zulassungsbüro. Danke, dass Sie gekommen sind. Fangen wir mit Ihnen an. Erzählen Sie mir von sich.',
    'adm-luis': c => 'Hallo' + (c ? ' ' + c : '') + ', ich bin Luis Moreno. Ich lese die Bewerbungen aus deiner Region. Danke, dass du dir Zeit nimmst. Erzähl mir ein bisschen von dir.',
    'adm-elena': c => 'Willkommen' + (c ? ', ' + c : '') + '. Ich bin Elena Brooks. Setzen Sie sich. Fangen wir einfach an: Erzählen Sie mir von sich.',
    'sunshine-job': c => '*seufzt* Hallo' + (c ? ' ' + c : '') + '. Ich bin Sunshine. Ja, wirklich. Bringen wir es hinter uns. Erzähl mir von dir.',
    'sunshine-college': c => 'Hallo' + (c ? ' ' + c : '') + '. Ich bin Sunshine. Ich habe heute viele davon, also machen wir zügig. Erzähl mir von dir.',
    coach: 'Hi! Ich helfe dir herauszufinden, was du im Vorstellungsgespräch über dich erzählen kannst. Fangen wir leicht an: Womit verbringst du außerhalb der Schule viel Zeit? Alles zählt, zum Beispiel ein Sport, ein Job, im Haushalt helfen, Gaming oder Kunst.',
    coachMore: 'Willkommen zurück! Was sollen wir auf deiner Seite ergänzen? Vielleicht etwas Neues, das du gemacht hast, oder eine Geschichte, zu der wir letztes Mal nicht gekommen sind.'
  },
  fr: {
    'warm': c => 'Bonjour' + (c ? ' ' + c : '') + ', je suis Riley. Merci d’être venu. Parle-moi un peu de toi.',
    'formal': c => 'Enchanté' + (c ? ', ' + c : '') + '. Je suis Morgan. Commençons. Parlez-moi de vous.',
    'rapidFire': c => 'Bonjour' + (c ? ' ' + c : '') + ', je suis Devon. Merci d’être venu. Parle-moi de toi.',
    'skeptical': c => 'Bonjour' + (c ? ' ' + c : '') + ', je suis Taylor. Merci d’être venu. Parle-moi de toi et de la raison de ta candidature.',
    'alum-priya': c => 'Bonjour' + (c ? ' ' + c : '') + ', je suis Priya. Merci de me rencontrer. Parle-moi un peu de toi.',
    'alum-marcus': c => 'Bonjour' + (c ? ' ' + c : '') + ', ravi de te rencontrer. Je suis Marcus. Et si on commençait par toi ? Parle-moi de toi.',
    'alum-jen': c => 'Bonjour' + (c ? ' ' + c : '') + ', je suis Jen. Tu m’entends bien ? Parfait. C’est assez informel, alors discutons simplement. Parle-moi un peu de toi.',
    'adm-dana': c => 'Bonjour' + (c ? ', ' + c : '') + '. Je suis Dana Whitfield, du bureau des admissions. Merci d’être venu. Commençons par vous. Parlez-moi de vous.',
    'adm-luis': c => 'Bonjour' + (c ? ' ' + c : '') + ', je suis Luis Moreno. Je lis les dossiers de ta région. Merci de prendre le temps. Parle-moi un peu de toi.',
    'adm-elena': c => 'Bienvenue' + (c ? ', ' + c : '') + '. Je suis Elena Brooks. Asseyez-vous. Commençons simplement : parlez-moi de vous.',
    'sunshine-job': c => '*soupire* Bonjour' + (c ? ' ' + c : '') + '. Je suis Sunshine. Oui, vraiment. Allons-y. Parle-moi de toi.',
    'sunshine-college': c => 'Bonjour' + (c ? ' ' + c : '') + '. Je suis Sunshine. J’en ai beaucoup aujourd’hui, alors on avance. Parle-moi de toi.',
    coach: 'Salut ! Je suis là pour t’aider à trouver quoi dire sur toi en entretien. Commençons simplement : à quoi passes-tu beaucoup de temps en dehors des cours ? Tout compte : un sport, un petit boulot, aider à la maison, les jeux vidéo ou l’art.',
    coachMore: 'Re-bonjour ! Qu’est-ce qu’on ajoute à ta page ? Ça peut être quelque chose de nouveau que tu as fait, ou une histoire qu’on n’a pas eu le temps de raconter la dernière fois.'
  }
};

// The first line for an interviewer in a language, or null for English.
function openingFor(lang, persona, track, c){
  const set = OPENINGS_I18N[lang];
  if(!set) return null;
  const key = persona.id === 'sunshine' ? 'sunshine-' + (track === 'college' ? 'college' : 'job') : persona.id;
  return set[key] ? set[key](c) : null;
}
function coachOpeningFor(lang, more){
  const set = OPENINGS_I18N[lang];
  return set ? (more ? set.coachMore : set.coach) : null;
}
