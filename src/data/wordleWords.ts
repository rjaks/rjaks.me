// src/data/wordleWords.ts

/**
 * Curated list of common, recognizable 5-letter words for Wordle targets.
 * Includes fun tech/CS staples mixed with everyday English words.
 */
export const TARGET_WORDS: string[] = [
  // Tech & CS Staples
  "STACK", "QUEUE", "ARRAY", "GRAPH", "BYTES", "LOGIC", "DEBUG", "PROXY",
  "PATCH", "ASYNC", "REACT", "LINUX", "BUILD", "QUERY", "SHELL", "PIXEL",
  "CACHE", "TOKEN", "ROUTE", "INDEX", "CONST", "PARSE", "FETCH", "CLONE",
  "RESET", "INPUT", "PRINT", "FLOAT", "CLASS", "SCOPE", "WHILE", "EVENT",
  "CLICK", "DRIVE", "CLOUD", "CRONX", "CYBER", "MODEM", "SERIF", "PANEL",
  "CRASH", "MACRO", "MEDIA", "LOGIN", "TRACK", "TABLE", "THEME", "SHIFT",
  "FLASH", "STYLE", "FONTS", "FRAME", "BLOCK", "LAYER", "CLEAN", "SMART",

  // Everyday Classic Wordle Words
  "ABOUT", "ABOVE", "ABUSE", "ACTOR", "ACUTE", "ADAPT", "ADMIT", "ADOPT",
  "ADULT", "AFTER", "AGAIN", "AGENT", "AGREE", "AHEAD", "ALARM", "ALBUM",
  "ALERT", "ALIKE", "ALIVE", "ALLOW", "ALONE", "ALONG", "ALTER", "AMONG",
  "ANGEL", "ANGER", "ANGLE", "ANGRY", "APART", "APPLE", "APPLY", "ARENA",
  "ARGUE", "ARISE", "ARMOR", "ARROW", "ASIDE", "ASSET", "AUDIO", "AUDIT",
  "AVOID", "AWAIT", "AWAKE", "AWARD", "AWARE", "BADLY", "BAKER", "BASIC",
  "BASIS", "BEACH", "BEAST", "BEGAN", "BEGIN", "BEING", "BELOW", "BENCH",
  "BIRTH", "BLACK", "BLADE", "BLAME", "BLANK", "BLAST", "BLIND", "BLINK",
  "BLOOD", "BOARD", "BOAST", "BOOST", "BOOTH", "BOUND", "BRAIN", "BRAKE",
  "BRAND", "BRASS", "BRAVE", "BREAD", "BREAK", "BRICK", "BRIEF", "BRING",
  "BROAD", "BROWN", "BRUSH", "BUDDY", "BUNCH", "BURST", "CABIN", "CABLE",
  "CANDY", "CANAL", "CANDY", "CARGO", "CARRY", "CATCH", "CAUSE", "CHAIN",
  "CHAIR", "CHALK", "CHAMP", "CHART", "CHASE", "CHEAP", "CHECK", "CHEST",
  "CHIEF", "CHILD", "CHILL", "CHOIR", "CHOSE", "CIVIC", "CIVIL", "CLAIM",
  "CLASH", "CLERK", "CLIFF", "CLIMB", "CLOCK", "CLOSE", "CLOTH", "COACH",
  "COAST", "COUNT", "COURT", "COVER", "CRAFT", "CRANE", "CRASH", "CRAZY",
  "CREAM", "CREEK", "CRIME", "CRISP", "CROWD", "CROWN", "CRUSH", "CURVE",
  "CYCLE", "DAILY", "DANCE", "DEALT", "DEATH", "DEBUT", "DELAY", "DELTA",
  "DEPTH", "DIARY", "DIRTY", "DODGE", "DRAFT", "DRAIN", "DRAMA", "DREAM",
  "DRESS", "DRIFT", "DRILL", "DRINK", "DRIVE", "EARLY", "EARTH", "EIGHT",
  "ELITE", "EMPTY", "ENEMY", "ENJOY", "ENTER", "ENTRY", "EQUAL", "EQUIP",
  "ERROR", "ESSAY", "EVENT", "EVERY", "EXACT", "EXIST", "EXTRA", "FAINT",
  "FAITH", "FALSE", "FAULT", "FAVOR", "FEAST", "FIBER", "FIELD", "FIFTH",
  "FIFTY", "FIGHT", "FINAL", "FIRST", "FIXED", "FLAME", "FLEET", "FLOOR",
  "FLUID", "FOCUS", "FORCE", "FORTH", "FORTY", "FORUM", "FOUND", "FRAME",
  "FRESH", "FRONT", "FROST", "FRUIT", "GIANT", "GIVEN", "GLASS", "GLOBE",
  "GLORY", "GRACE", "GRADE", "GRAIN", "GRAND", "GRANT", "GRASS", "GRAVE",
  "GREAT", "GREET", "GRIEF", "GRILL", "GROUP", "GUARD", "GUESS", "GUEST",
  "GUIDE", "HABIT", "HAPPY", "HARSH", "HEART", "HEAVY", "HONOR", "HORSE",
  "HOTEL", "HOUSE", "HUMAN", "HUMOR", "IDEAL", "IMAGE", "IMPLY", "INDEX",
  "INNER", "INPUT", "ISSUE", "JEWEL", "JOINT", "JUDGE", "JUICE", "KNIFE",
  "KNOCK", "KNOWN", "LABEL", "LABOR", "LARGE", "LASER", "LATER", "LAUGH",
  "LAYER", "LEARN", "LEASE", "LEAST", "LEAVE", "LEGAL", "LEMON", "LEVEL",
  "LEVER", "LIGHT", "LIMIT", "LOCAL", "LODGE", "LOGIC", "LOOSE", "LOVER",
  "LOWER", "LOYAL", "LUCKY", "LUNAR", "LUNCH", "MAGIC", "MAJOR", "MAKER",
  "MANGO", "MARCH", "MATCH", "MAYOR", "MEDAL", "METAL", "MIGHT", "MINOR",
  "MODEL", "MONEY", "MONTH", "MORAL", "MOTOR", "MOUNT", "MOUSE", "MOUTH",
  "MOVIE", "MUSIC", "NAIVE", "NERVE", "NIGHT", "NOBLE", "NOISE", "NORTH",
  "NOVEL", "NURSE", "OCEAN", "OFFER", "OFTEN", "OLIVE", "ONSET", "OPERA",
  "ORBIT", "ORDER", "ORGAN", "OTHER", "OUGHT", "OUTER", "OWNER", "PAINT",
  "PANEL", "PANIC", "PAPER", "PARTY", "PEACE", "PENNY", "PHASE", "PHONE",
  "PHOTO", "PIANO", "PIECE", "PILOT", "PITCH", "PIVOT", "PLACE", "PLAIN",
  "PLANE", "PLANT", "PLATE", "POINT", "POLAR", "POLIC", "POWER", "PRESS",
  "PRICE", "PRIDE", "PRIME", "PRINT", "PRIOR", "PRIZE", "PROBE", "PROUD",
  "PROVE", "PUPIL", "QUEEN", "QUICK", "QUIET", "QUITE", "RADIO", "RAISE",
  "RANGE", "RAPID", "RATIO", "REACH", "READY", "REALM", "REBEL", "REFER",
  "RELAX", "REPLY", "RIDER", "RIDGE", "RIGHT", "RIVAL", "RIVER", "ROBOT",
  "ROUGH", "ROUND", "ROUTE", "ROYAL", "RULER", "RURAL", "SCALE", "SCENE",
  "SCOPE", "SCORE", "SCOUT", "SEDAN", "SENSE", "SERVE", "SEVEN", "SHADE",
  "SHAKE", "SHALL", "SHAME", "SHAPE", "SHARE", "SHARP", "SHEEP", "SHEET",
  "SHELF", "SHELL", "SHIFT", "SHINE", "SHIRT", "SHOCK", "SHOOT", "SHORE",
  "SHORT", "SHOUT", "SIGHT", "SINCE", "SKILL", "SKIRT", "SLATE", "SLEEP",
  "SLICE", "SLIDE", "SMALL", "SMART", "SMILE", "SMOKE", "SOLAR", "SOLID",
  "SOLVE", "SOUND", "SOUTH", "SPACE", "SPARK", "SPEAK", "SPEED", "SPELL",
  "SPEND", "SPICE", "SPILL", "SPINE", "SPITE", "SPLIT", "SPOKE", "SPORT",
  "SQUAD", "STAFF", "STAGE", "STAKE", "STAND", "START", "STATE", "STEAM",
  "STEEL", "STEEP", "STEER", "STICK", "STILL", "STOCK", "STONE", "STORM",
  "STORY", "STRIP", "STUDY", "STUFF", "STYLE", "SUGAR", "SUITE", "SUPER",
  "SWEET", "SWIFT", "SWING", "TABLE", "TAKEN", "TASTE", "TEACH", "TEETH",
  "TEMPO", "THANK", "THEFT", "THEIR", "THEME", "THERE", "THESE", "THICK",
  "THING", "THINK", "THIRD", "THOSE", "THREE", "THREW", "THROW", "TIGER",
  "TIGHT", "TIMER", "TITLE", "TODAY", "TOOTH", "TOPIC", "TOTAL", "TOUCH",
  "TOUGH", "TOWER", "TRACK", "TRADE", "TRAIL", "TRAIN", "TRAIT", "TREND",
  "TRIAL", "TRIBE", "TRICK", "TRUCK", "TRULY", "TRUNK", "TRUST", "TRUTH",
  "TWICE", "UNCLE", "UNDER", "UNION", "UNITE", "UNITY", "UNTIL", "UPPER",
  "UPSET", "URBAN", "USAGE", "USUAL", "VALID", "VALUE", "VAPOR", "VAULT",
  "VENUE", "VERVE", "VIDEO", "VIGOR", "VIRUS", "VISIT", "VITAL", "VOICE",
  "VOTER", "WAGON", "WASTE", "WATCH", "WATER", "WHEAT", "WHEEL", "WHERE",
  "WHICH", "WHILE", "WHITE", "WHOLE", "WHOSE", "WIDOW", "WIDTH", "WOMAN",
  "WORLD", "WORRY", "WORSE", "WORST", "WORTH", "WOULD", "WOUND", "WRIST",
  "WRITE", "WRONG", "YACHT", "YIELD", "YOUNG", "YOUTH", "ZEBRA"
];

// Deduplicate and ensure uppercase
const UNIQUE_TARGETS = Array.from(new Set(TARGET_WORDS.map(w => w.toUpperCase())));
export const TARGET_SET = new Set(UNIQUE_TARGETS);

/**
 * Common valid 5-letter words allowed as guesses (superset of target words)
 */
export const VALID_GUESSES_EXTRA = [
  "AAHED", "ABACA", "ABACI", "ABACK", "ABAFT", "ABAMP", "ABAND", "ABASH",
  "ABATE", "ABBEY", "ABBOT", "ABEAM", "ABEAR", "ABELE", "ABETS", "ABHOR",
  "ABIDE", "ABIES", "ABLED", "ABLER", "ABLES", "ABLET", "ABLOW", "ABMHO",
  "ABODE", "ABOHM", "ABOIL", "ABOMA", "ABOON", "ABORD", "ABORE", "ABORT",
  "ABOUT", "ABOVE", "ABRAY", "ABRIM", "ABRIN", "ABRIS", "ABSEY", "ABSIT",
  "ABUNA", "ABUNE", "ABUSE", "ABUTS", "ABUZZ", "ABYDE", "ABYSM", "ABYSS",
  "ACARI", "ACCAS", "ACCOY", "ACERB", "ACERS", "ACETA", "ACHAR", "ACHED",
  "ACHES", "ACHOO", "ACIDS", "ACIDY", "ACING", "ACINI", "ACKEE", "ACKER",
  "ACMES", "ACMIC", "ACNED", "ACNES", "ACOCK", "ACOLD", "AALII", "AARGH"
];

const EXTENDED_SET = new Set([...UNIQUE_TARGETS, ...VALID_GUESSES_EXTRA]);

/**
 * Validates if a guess is a valid 5-letter word
 */
export function isValidGuess(guess: string): boolean {
  if (!guess || guess.length !== 5) return false;
  const upper = guess.toUpperCase();
  // Any target word or in extended set, or valid 5-letter alpha string
  return EXTENDED_SET.has(upper) || TARGET_SET.has(upper) || /^[A-Z]{5}$/.test(upper);
}

/**
 * Get daily word deterministic for today's date
 */
export function getDailyWord(date: Date = new Date()): { word: string; index: number } {
  // Epoch anchor: Jan 1, 2024
  const anchor = new Date(2024, 0, 1).getTime();
  const current = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
  const daysDiff = Math.max(0, Math.floor((current - anchor) / (1000 * 60 * 60 * 24)));
  const index = daysDiff % UNIQUE_TARGETS.length;
  return {
    word: UNIQUE_TARGETS[index],
    index: daysDiff + 1,
  };
}

/**
 * Get a random target word for practice mode
 */
export function getRandomWord(): string {
  const index = Math.floor(Math.random() * UNIQUE_TARGETS.length);
  return UNIQUE_TARGETS[index];
}

export type TileState = 'correct' | 'present' | 'absent' | 'empty' | 'tbd';

/**
 * Evaluates a 5-letter guess against the target word.
 * Correctly accounts for duplicate letters (standard Wordle algorithm).
 */
export function evaluateGuess(guess: string, target: string): TileState[] {
  const g = guess.toUpperCase().split('');
  const t = target.toUpperCase().split('');
  const result: TileState[] = Array(5).fill('absent');
  const targetCounts: Record<string, number> = {};

  // First pass: mark correct positions and tally remaining target characters
  for (let i = 0; i < 5; i++) {
    if (g[i] === t[i]) {
      result[i] = 'correct';
    } else {
      targetCounts[t[i]] = (targetCounts[t[i]] || 0) + 1;
    }
  }

  // Second pass: mark misplaced (present) letters
  for (let i = 0; i < 5; i++) {
    if (result[i] !== 'correct') {
      const letter = g[i];
      if (targetCounts[letter] && targetCounts[letter] > 0) {
        result[i] = 'present';
        targetCounts[letter]--;
      }
    }
  }

  return result;
}
