/**
 * =============================================================================
 * MARTÍN FIERRO: ENTRE EL FUEGO Y LA PAMPA — MOTOR 3D TÁCTICO & NARRATIVO
 * Versión Extendida: Campaña de 5 Niveles 3D y 4 Finales Alternativos
 * =============================================================================
 */

// -----------------------------------------------------------------------------
// 1. SISTEMA DE AUDIO PROCEDURAL PAMPEANO (Web Audio API)
// -----------------------------------------------------------------------------
class GauchoAudioEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
  }

  playFaconSlash() {
    if (!this.enabled || !this.ctx) return;
    const now = this.ctx.currentTime;
    
    const bufferSize = this.ctx.sampleRate * 0.18;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(2400, now);
    filter.frequency.exponentialRampToValueAtTime(700, now + 0.15);
    filter.Q.value = 3.5;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.16);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    noise.start(now);

    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(920, now);
    osc.frequency.exponentialRampToValueAtTime(460, now + 0.18);
    oscGain.gain.setValueAtTime(0.18, now);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    osc.connect(oscGain);
    oscGain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.18);
  }

  playGunshot() {
    if (!this.enabled || !this.ctx) return;
    const now = this.ctx.currentTime;

    const bufferSize = this.ctx.sampleRate * 0.45;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.08));
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1600, now);
    filter.frequency.exponentialRampToValueAtTime(140, now + 0.4);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.75, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    noise.start(now);
  }

  playBolas() {
    if (!this.enabled || !this.ctx) return;
    const now = this.ctx.currentTime;
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(360 + i * 90, now);
        osc.frequency.exponentialRampToValueAtTime(180, now + 0.1);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.12);
      }, i * 70);
    }
  }

  playDiceRoll() {
    if (!this.enabled || !this.ctx) return;
    for (let i = 0; i < 4; i++) {
      setTimeout(() => {
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(320 + Math.random() * 220, now);
        gain.gain.setValueAtTime(0.14, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.06);
      }, i * 65);
    }
  }

  playChord(frequencies = [164.81, 246.94, 329.63]) {
    if (!this.enabled || !this.ctx) return;
    const now = this.ctx.currentTime;
    frequencies.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, now + idx * 0.03);
      gain.gain.setValueAtTime(0.12, now + idx * 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + idx * 0.03);
      osc.stop(now + 1.25);
    });
  }

  playExplosion() {
    if (!this.enabled || !this.ctx) return;
    const now = this.ctx.currentTime;
    const bufferSize = this.ctx.sampleRate * 0.8;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.18));
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(900, now);
    filter.frequency.exponentialRampToValueAtTime(70, now + 0.7);
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.9, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    noise.start(now);

    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(120, now);
    osc.frequency.exponentialRampToValueAtTime(35, now + 0.6);
    oscGain.gain.setValueAtTime(0.5, now);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);
    osc.connect(oscGain);
    oscGain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.7);
  }

  playLoot() {
    if (!this.enabled || !this.ctx) return;
    const now = this.ctx.currentTime;
    [523.25, 659.25, 783.99].forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + i * 0.06);
      gain.gain.setValueAtTime(0.1, now + i * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.25);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + i * 0.06);
      osc.stop(now + i * 0.06 + 0.25);
    });
  }

  playLevelUp() {
    if (!this.enabled || !this.ctx) return;
    this.playChord([261.63, 329.63, 392.0, 523.25, 659.25]);
  }

  playWarning() {
    if (!this.enabled || !this.ctx) return;
    const now = this.ctx.currentTime;
    [220, 185].forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(freq, now + i * 0.18);
      gain.gain.setValueAtTime(0.09, now + i * 0.18);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.18 + 0.3);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + i * 0.18);
      osc.stop(now + i * 0.18 + 0.3);
    });
  }

  playReload() {
    if (!this.enabled || !this.ctx) return;
    const now = this.ctx.currentTime;
    [0, 0.12].forEach((offset) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "square";
      osc.frequency.setValueAtTime(140, now + offset);
      gain.gain.setValueAtTime(0.06, now + offset);
      gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + offset);
      osc.stop(now + offset + 0.08);
    });
  }
}

const audio = new GauchoAudioEngine();

// -----------------------------------------------------------------------------
// 2. CONFIGURACIÓN DEL MUNDO 3D
// -----------------------------------------------------------------------------
const TILE_SIZE = 2.0;
const GRID_COLS = 24;
const GRID_ROWS = 16;
const HALF_WIDTH = (GRID_COLS * TILE_SIZE) / 2;
const HALF_HEIGHT = (GRID_ROWS * TILE_SIZE) / 2;

const COVER = {
  NONE: 0,
  HALF: 1, // Carretas, rocas bajas (50% de cobertura)
  FULL: 2  // Adobe, empalizadas, ombúes (100% de bloqueo de línea)
};

function gridToWorld(gx, gy) {
  return {
    x: (gx * TILE_SIZE) - HALF_WIDTH + TILE_SIZE / 2,
    z: (gy * TILE_SIZE) - HALF_HEIGHT + TILE_SIZE / 2
  };
}

function worldToGrid(x, z) {
  return {
    x: Math.floor((x + HALF_WIDTH) / TILE_SIZE),
    y: Math.floor((z + HALF_HEIGHT) / TILE_SIZE)
  };
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

// Clima: modifica la puntería y el ambiente visual de cada capítulo.
const WEATHER = {
  clear: { label: "Cielo claro", icon: "☀️", hitMod: 0, sun: 1.35, ambient: 0.72, fog: 0.012 },
  dusk: { label: "Atardecer", icon: "🌅", hitMod: 0, sun: 1.05, ambient: 0.6, fog: 0.015 },
  night: { label: "Noche cerrada", icon: "🌙", hitMod: -0.06, sun: 0.35, ambient: 0.4, fog: 0.022 },
  rain: { label: "Lluvia", icon: "🌧️", hitMod: -0.1, sun: 0.7, ambient: 0.5, fog: 0.024 },
  dust: { label: "Viento de tierra", icon: "🌪️", hitMod: -0.14, sun: 0.95, ambient: 0.62, fog: 0.03 },
  fire: { label: "Cielo de ceniza", icon: "🔥", hitMod: -0.05, sun: 0.55, ambient: 0.5, fog: 0.02 }
};

// Estados tácticos. Cada uno se muestra en la UI y afecta el combate.
const STATUS = {
  burning: { name: "Ardiendo", icon: "🔥", color: "#e67e22", damage: 6, turns: 2 },
  bleeding: { name: "Sangrando", icon: "🩸", color: "#c0392b", damage: 4, turns: 3 },
  marked: { name: "Marcado", icon: "🎯", color: "#f1c40f" },
  demoralized: { name: "Desmoralizado", icon: "🎵", color: "#af7ac5", damageMod: -0.25, turns: 2 },
  inspired: { name: "Arengado", icon: "⚔️", color: "#2ecc71", damageMod: 0.25, turns: 2 },
  stunned: { name: "Aturdido", icon: "💫", color: "#9b59b6", turns: 1 },
  exposed: { name: "Expuesto", icon: "🛡️", color: "#e59866", turns: 2 }
};

// Pericias elegibles al subir de nivel. Cambian el estilo de juego.
const PERKS = [
  { id: "mano_fierro", name: "Mano de Fierro", desc: "+20% de daño con el facón y 10% de golpe crítico extra." },
  { id: "ojo_halcon", name: "Ojo de Halcón", desc: "+12% de acierto con el trabuco y +1 de alcance de tiro." },
  { id: "cuero_duro", name: "Cuero de Ñandú", desc: "+25 HP máximos y +10% de resistencia al daño recibido." },
  { id: "baqueano", name: "Baqueano del Salitral", desc: "+1 casilla de movimiento y +1 AP cada tres rondas." },
  { id: "payador", name: "Payador de Ley", desc: "+2 CARISMA y +2 SUPERVIVENCIA. La payada afecta dos turnos más." },
  { id: "cazador", name: "Cazador de Matreros", desc: "+25% de daño contra enemigos con menos de la mitad de su vida." },
  { id: "sangre_fria", name: "Sangre Fría", desc: "+1 AP máximo en el primer turno de cada combate y +10% evasión." },
  { id: "segundo_aliento", name: "Segundo Aliento", desc: "Recupera 20 HP al comenzar cada capítulo y al ganar un combate." }
];

const SAVE_KEY = "martin_fierro_pampa_save_v2";

// -----------------------------------------------------------------------------
// 3. ESTADO GLOBAL Y SEGUIMIENTO MORAL PARA FINALES
// -----------------------------------------------------------------------------
const Game = {
  state: "TITLE", // "TITLE", "EXPLORATION", "DIALOGUE", "DICE_ROLL", "COMBAT", "TRAVEL_MAP", "EPILOGUE"
  currentLevel: 1, // Campaña de 8 capítulos
  activeUnitIndex: 0,
  selectedAction: "move",
  hoverCell: { x: -1, y: -1 },
  hoverInteractable: null,
  combatQueue: [],
  levelUnits: [],
  currentObstacles: [],
  interactables: [],
  hazards: [],
  activeLevelData: null,
  combatRound: 1,
  combatLock: false,
  waveIndex: 0,
  testimonies: [],
  chapterStartSnapshot: null,
  weather: "clear",
  levelCamera: null,
  lastCombatResolved: false,
  levelCompletionHandled: false,
  defeatShown: false,
  chapterCardTimer: null,

  inventory: {
    ammo: 6,
    drinks: 2,
    bandages: 2
  },

  progression: {
    level: 1,
    xp: 0,
    nextXp: 100,
    maxLevel: 10,
    skillPoints: 0,
    perkPoints: 0,
    perks: [],
    scrap: 0,
    completedChapters: [],
    weapons: { facon: 0, trabuco: 0 }
  },

  cruzLoyalty: 85, // 0 - 100%

  // Registro de Decisiones Morales (determinan el final del juego)
  morality: {
    diplomaticWins: 0, // Resoluciones pacíficas por Carisma
    combatWins: 0,     // Victorias a puro filo y pólvora
    intimidations: 0,  // Resoluciones por miedo/fuerza
    savedPicardia: false, // Misión secundaria del Nivel 2
    foundLevyOrders: false, // Prueba opcional de investigación del Nivel 1
    payadaWon: false,
    cruzSacrificed: false
  },

  stats: {
    fuerza: 15,
    agilidad: 14,
    resistencia: 16,
    percepcion: 13,
    carisma: 12,
    supervivencia: 15
  },

  quest: {
    title: "Tensión en la Pulpería",
    step: "Habla con Don Claudio en la pulpería o inspecciona el fogón antes del arribo de la partida militar."
  }
};

// -----------------------------------------------------------------------------
// 4. ENTIDADES Y CLASE UNIT 3D
// -----------------------------------------------------------------------------
class Unit3D {
  constructor(config) {
    this.id = config.id;
    this.name = config.name;
    this.faction = config.faction; // 'player', 'ally', 'enemy', 'neutral'
    this.gridX = config.gridX;
    this.gridY = config.gridY;

    this.maxHp = config.maxHp;
    this.hp = config.hp || config.maxHp;
    this.maxAp = config.maxAp || 4;
    this.ap = this.maxAp;

    this.color = config.color;
    this.role = config.role;
    this.variant = config.variant || "gaucho";
    this.archetype = config.archetype || "soldier";
    this.initiative = config.initiative || (config.faction === "enemy" ? 10 : 12);
    this.damageBonus = config.damageBonus || 0;
    this.dialogue = config.dialogue || null;
    this.isBoss = !!config.isBoss;
    this.statusResist = config.statusResist || 0;
    this.loot = config.loot || null;

    this.ponchoGuarded = false;
    this.immobilized = false;
    this.rooted = false;
    this.overwatch = false;
    this.statuses = {};
    this.isDead = false;
    this.flashTimer = 0;
    this.intent = "";
    this.phase2 = false;
    this.phase3 = false;

    this.mesh = this.createMesh(config);
    const pos = gridToWorld(this.gridX, this.gridY);
    this.mesh.position.set(pos.x, 0, pos.z);

    this.targetPos = new THREE.Vector3(pos.x, 0, pos.z);
    this.isMoving = false;
    this.animTime = 0;

    // Personajes animados (GLB). Si no se pueden cargar, quedan los primitivos.
    this.modelKind = resolveCharacterKind(this);
    this.modelRoot = null;
    this.mixer = null;
    this.modelActions = {};
    this.currentModelAction = null;
    this.actionLock = 0;
    this.modelMaterials = [];
    // Piezas primitivas que se ocultan cuando llega el modelo animado.
    this.primitiveParts = this.mesh.children.filter(child => {
      if (child === this.selectionRing || child === this.shieldMesh) return false;
      if (child === this.bolasMesh || child === this.bossAura || child === this.groundShadow) return false;
      if (child === this.modelAnchor) return false;
      return true;
    });
    requestCharacterModel(this.modelKind, gltf => this.applyCharacterModel(gltf));

    this.overlayEl = this.createOverlay();
  }

  applyCharacterModel(gltf) {
    if (!gltf || this.modelRoot || !this.modelAnchor) return;
    const model = THREE.SkeletonUtils && THREE.SkeletonUtils.clone
      ? THREE.SkeletonUtils.clone(gltf.scene)
      : gltf.scene.clone(true);

    model.updateMatrixWorld(true);
    const rawBox = new THREE.Box3().setFromObject(model);
    const rawHeight = Math.max(0.001, rawBox.max.y - rawBox.min.y);
    const targetHeight = this.isBoss ? 2.45 : 2.1;
    const scale = targetHeight / rawHeight;
    model.scale.setScalar(scale);
    model.updateMatrixWorld(true);

    const box = new THREE.Box3().setFromObject(model);
    model.position.x -= (box.min.x + box.max.x) / 2;
    model.position.z -= (box.min.z + box.max.z) / 2;
    model.position.y -= box.min.y;

    model.traverse(object => {
      if (!object.isMesh) return;
      object.castShadow = true;
      object.receiveShadow = true;
      object.frustumCulled = false;
      const materials = Array.isArray(object.material) ? object.material : [object.material];
      materials.forEach(mat => {
        if (!mat) return;
        mat.side = THREE.FrontSide;
        if (mat.map) {
          mat.map.anisotropy = 4;
          // El renderer no usa salida sRGB: compensamos para que el modelo no quede negro.
          mat.map.encoding = THREE.LinearEncoding;
          mat.map.needsUpdate = true;
        }
        if (mat.isMeshStandardMaterial) {
          // Los GLB vienen con metallicFactor 1 y sin entorno: quedarían casi negros.
          mat.metalness = 0.04;
          mat.roughness = 0.82;
        }
        if (mat.emissive) this.modelMaterials.push(mat);
        mat.needsUpdate = true;
      });
    });

    this.modelAnchor.add(model);
    this.modelRoot = model;
    this.modelAnchor.rotation.y = CHARACTER_MODEL_YAW;
    this.primitiveParts.forEach(part => { part.visible = false; });

    if (gltf.animations && gltf.animations.length) {
      this.mixer = new THREE.AnimationMixer(model);
      const findClip = pattern => gltf.animations.find(clip => pattern.test(clip.name));
      const idleClip = findClip(/standing_relax|idle/i) || gltf.animations[0];
      const walkClip = findClip(/walk|caminar/i) || idleClip;
      let slashClip = findClip(/slash|attack|ataque/i) || null;
      // El clip original dura 6,6 s con una larga cola: recortamos el golpe.
      if (slashClip && THREE.AnimationUtils && THREE.AnimationUtils.subclip) {
        const trimmed = THREE.AnimationUtils.subclip(slashClip, "slash_strike", 10, 112, 30);
        if (trimmed && trimmed.duration > 0.3) slashClip = trimmed;
      }
      const makeAction = (clip, timeScale = 1) => {
        const action = this.mixer.clipAction(clip);
        action.enabled = true;
        action.timeScale = timeScale;
        action.setEffectiveWeight(1);
        return action;
      };
      this.modelActions.idle = makeAction(idleClip);
      this.modelActions.walk = makeAction(walkClip, 1.35);
      if (slashClip) this.modelActions.slash = makeAction(slashClip, 2.6);
      this.modelActions.idle.play();
      this.currentModelAction = this.modelActions.idle;
      this.mixer.addEventListener("finished", event => {
        if (event.action === this.modelActions.slash) {
          this.actionLock = 0;
          this.playModelAction("idle");
        }
      });
    }

    this.updateOverlay();
  }

  playModelAction(name) {
    if (!this.mixer) return;
    const next = this.modelActions[name];
    if (!next) return;
    if (next === this.currentModelAction && name !== "slash") return;

    next.reset();
    next.enabled = true;
    next.setEffectiveWeight(1);
    if (name === "slash") {
      next.setLoop(THREE.LoopOnce, 1);
      next.clampWhenFinished = true;
      this.actionLock = Math.max(0.45, (next.getClip().duration / Math.max(0.1, next.timeScale)) * 0.85);
    } else {
      next.setLoop(THREE.LoopRepeat, Infinity);
      next.clampWhenFinished = false;
    }
    next.play();
    if (this.currentModelAction && this.currentModelAction !== next) {
      next.crossFadeFrom(this.currentModelAction, name === "slash" ? 0.08 : 0.22, false);
    }
    this.currentModelAction = next;
  }

  createOverlay() {
    const el = document.createElement("div");
    el.className = "unit-overlay";
    if (this.faction === "enemy") el.classList.add("hostile");
    if (this.isBoss) el.classList.add("boss");
    if (this.faction === "neutral") el.classList.add("neutral");
    el.innerHTML = `
      <div class="unit-overlay-name"><span>${this.name}</span><span class="unit-overlay-intent"></span></div>
      <div class="unit-overlay-hp"><span></span></div>
      <div class="unit-overlay-statuses"></div>
    `;
    return el;
  }

  attachOverlay() {
    const layer = document.getElementById("unit-overlays");
    if (layer && this.overlayEl && !this.overlayEl.isConnected) layer.appendChild(this.overlayEl);
  }

  detachOverlay() {
    if (this.overlayEl && this.overlayEl.isConnected) this.overlayEl.remove();
  }

  updateOverlay() {
    if (!this.overlayEl) return;
    const hpPct = clamp((this.hp / this.maxHp) * 100, 0, 100);
    const bar = this.overlayEl.querySelector(".unit-overlay-hp > span");
    if (bar) bar.style.width = `${hpPct}%`;
    const nameEl = this.overlayEl.querySelector(".unit-overlay-name > span");
    if (nameEl) nameEl.innerText = this.name;
    const intentEl = this.overlayEl.querySelector(".unit-overlay-intent");
    if (intentEl) intentEl.innerText = this.intent || "";
    const statusEl = this.overlayEl.querySelector(".unit-overlay-statuses");
    if (statusEl) {
      const active = Object.keys(this.statuses);
      statusEl.innerHTML = active.map(key => {
        const st = STATUS[key];
        if (!st) return "";
        return `<span title="${st.name}" style="color:${st.color}">${st.icon}</span>`;
      }).join("");
    }
    this.overlayEl.style.display = this.isDead ? "none" : "";
  }

  addStatus(type, turns = null) {
    if (!STATUS[type]) return false;
    if (this.isDead) return false;
    if (this.statusResist > 0 && (type === "stunned" || type === "demoralized") && Math.random() < this.statusResist) {
      return false;
    }
    const def = STATUS[type];
    const duration = turns || def.turns || 2;
    this.statuses[type] = Math.max(this.statuses[type] || 0, duration);
    this.updateOverlay();
    return true;
  }

  removeStatus(type) {
    delete this.statuses[type];
    this.updateOverlay();
  }

  hasStatus(type) {
    return !!this.statuses[type];
  }

  tickStatuses() {
    let totalDamage = 0;
    let skipTurn = false;
    const summary = [];

    Object.keys(this.statuses).forEach(type => {
      const def = STATUS[type];
      if (!def) return;
      if (def.damage) {
        totalDamage += def.damage;
        summary.push(`${def.icon} ${def.name}`);
      }
      if (type === "stunned") skipTurn = true;
      this.statuses[type] -= 1;
      if (this.statuses[type] <= 0) delete this.statuses[type];
    });

    this.updateOverlay();
    return { damage: totalDamage, skipTurn, summary };
  }

  getDamageModifier() {
    let mod = 1;
    if (this.hasStatus("inspired")) mod += 0.25;
    if (this.hasStatus("demoralized")) mod -= 0.25;
    if (this.ponchoGuarded) mod -= 0.1;
    return Math.max(0.4, mod);
  }

  clearTransientStates() {
    this.ponchoGuarded = false;
    this.overwatch = false;
    this.rooted = false;
    this.immobilized = false;
    this.intent = "";
    this.updateOverlay();
  }

  createMesh(config) {
    const group = new THREE.Group();

    const matSkin = new THREE.MeshLambertMaterial({ color: 0xdfa178 });
    const matDark = new THREE.MeshLambertMaterial({ color: 0x1f1915 });
    const matSilver = new THREE.MeshStandardMaterial({ color: 0xd0d3d4, metalness: 0.9, roughness: 0.2 });

    // Sombra del personaje
    const shadowGeo = new THREE.CircleGeometry(0.5, 16);
    const shadowMat = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.35 });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = 0.02;
    group.add(shadowMesh);
    this.groundShadow = shadowMesh;

    // Ancla para el personaje GLB animado
    this.modelAnchor = new THREE.Group();
    group.add(this.modelAnchor);

    // Anillo de selección táctica
    const ringGeo = new THREE.RingGeometry(0.55, 0.65, 24);
    const ringMat = new THREE.MeshBasicMaterial({ 
      color: config.faction === "player" ? 0xf39c12 : (config.faction === "ally" ? 0x3498db : (config.faction === "enemy" ? 0xe74c3c : 0xf1c40f)),
      side: THREE.DoubleSide
    });
    this.selectionRing = new THREE.Mesh(ringGeo, ringMat);
    this.selectionRing.rotation.x = -Math.PI / 2;
    this.selectionRing.position.y = 0.03;
    group.add(this.selectionRing);

    // Torso / Ropa
    let bodyMat;
    if (config.id === "fierro") {
      bodyMat = new THREE.MeshLambertMaterial({ color: 0x8a2418 }); // Poncho bordó
    } else if (config.id === "cruz") {
      bodyMat = new THREE.MeshLambertMaterial({ color: 0x1b4f72 }); // Chaqueta militar
    } else if (config.id === "baigorria") {
      bodyMat = new THREE.MeshLambertMaterial({ color: 0x5b2c6f }); // Poncho oscuro de cuatrero
    } else if (config.id === "juez" || config.id === "escribano" || config.id === "lagos") {
      bodyMat = new THREE.MeshLambertMaterial({ color: 0x111111 }); // Levita negra
    } else if (config.variant === "bandit") {
      bodyMat = new THREE.MeshLambertMaterial({ color: 0x6e2c00 });
    } else if (config.variant === "civilian") {
      bodyMat = new THREE.MeshLambertMaterial({ color: 0x7d6608 });
    } else if (config.faction === "enemy") {
      bodyMat = new THREE.MeshLambertMaterial({ color: 0x2e4053 }); // Uniforme de línea
    } else {
      bodyMat = new THREE.MeshLambertMaterial({ color: 0x784212 }); // Don Claudio / Cautivo
    }

    const bodyGeo = new THREE.CylinderGeometry(0.3, 0.4, 0.9, 12);
    this.bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
    this.bodyMesh.position.y = 0.65;
    this.bodyMesh.castShadow = true;
    group.add(this.bodyMesh);

    // Cabeza
    const headGeo = new THREE.SphereGeometry(0.24, 16, 16);
    const headMesh = new THREE.Mesh(headGeo, matSkin);
    headMesh.position.y = 1.25;
    headMesh.castShadow = true;
    group.add(headMesh);

    // Sombrero Gaucho / Galera / Kepis
    if (config.id === "fierro") {
      const brimGeo = new THREE.CylinderGeometry(0.58, 0.58, 0.04, 20);
      const brimMesh = new THREE.Mesh(brimGeo, matDark);
      brimMesh.position.y = 1.38;
      group.add(brimMesh);

      const crownGeo = new THREE.CylinderGeometry(0.28, 0.32, 0.22, 16);
      const crownMesh = new THREE.Mesh(crownGeo, matDark);
      crownMesh.position.y = 1.48;
      group.add(crownMesh);

      const faconBladeGeo = new THREE.BoxGeometry(0.04, 0.5, 0.08);
      const faconMesh = new THREE.Mesh(faconBladeGeo, matSilver);
      faconMesh.position.set(0.35, 0.6, 0.05);
      faconMesh.rotation.z = -0.4;
      group.add(faconMesh);

    } else if (config.id === "juez" || config.id === "escribano" || config.id === "lagos") {
      // Galera negra del Juez / Escribano / Coronel
      const galeraBrimGeo = new THREE.CylinderGeometry(0.48, 0.48, 0.04, 16);
      const galeraBrim = new THREE.Mesh(galeraBrimGeo, matDark);
      galeraBrim.position.y = 1.38;
      group.add(galeraBrim);

      const galeraCylinderGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.45, 16);
      const galeraCylinder = new THREE.Mesh(galeraCylinderGeo, matDark);
      galeraCylinder.position.y = 1.62;
      group.add(galeraCylinder);

    } else if (config.id === "cruz" || config.faction === "enemy") {
      const kepisGeo = new THREE.CylinderGeometry(0.26, 0.26, 0.2, 16);
      const kepisMesh = new THREE.Mesh(kepisGeo, new THREE.MeshLambertMaterial({ color: 0x152238 }));
      kepisMesh.position.y = 1.42;
      group.add(kepisMesh);

      const visorGeo = new THREE.BoxGeometry(0.3, 0.03, 0.18);
      const visorMesh = new THREE.Mesh(visorGeo, matDark);
      visorMesh.position.set(0, 1.38, 0.22);
      group.add(visorMesh);

      const gunGeo = new THREE.CylinderGeometry(0.03, 0.03, 1.1, 8);
      const gunMesh = new THREE.Mesh(gunGeo, matDark);
      gunMesh.position.set(0.35, 0.75, -0.1);
      gunMesh.rotation.x = 0.25;
      group.add(gunMesh);
    } else {
      const boinaGeo = new THREE.CylinderGeometry(0.32, 0.28, 0.1, 16);
      const boinaMesh = new THREE.Mesh(boinaGeo, matDark);
      boinaMesh.position.y = 1.4;
      group.add(boinaMesh);
    }

    const ponchoShieldGeo = new THREE.SphereGeometry(0.85, 16, 16);
    const ponchoShieldMat = new THREE.MeshBasicMaterial({ 
      color: 0x3498db, 
      transparent: true, 
      opacity: 0.0, 
      wireframe: true 
    });
    this.shieldMesh = new THREE.Mesh(ponchoShieldGeo, ponchoShieldMat);
    this.shieldMesh.position.y = 0.8;
    group.add(this.shieldMesh);

    const bolasIndicatorGeo = new THREE.TorusGeometry(0.4, 0.06, 8, 16);
    const bolasIndicatorMat = new THREE.MeshLambertMaterial({ color: 0xd35400 });
    this.bolasMesh = new THREE.Mesh(bolasIndicatorGeo, bolasIndicatorMat);
    this.bolasMesh.rotation.x = Math.PI / 2;
    this.bolasMesh.position.y = 0.2;
    this.bolasMesh.visible = false;
    group.add(this.bolasMesh);

    if (this.isBoss) {
      group.scale.setScalar(1.16);
      const auraGeo = new THREE.RingGeometry(0.72, 0.9, 32);
      const auraMat = new THREE.MeshBasicMaterial({ color: 0xf5b041, transparent: true, opacity: 0.5, side: THREE.DoubleSide });
      this.bossAura = new THREE.Mesh(auraGeo, auraMat);
      this.bossAura.rotation.x = -Math.PI / 2;
      this.bossAura.position.y = 0.04;
      group.add(this.bossAura);

      const plumeGeo = new THREE.ConeGeometry(0.12, 0.5, 8);
      const plume = new THREE.Mesh(plumeGeo, new THREE.MeshLambertMaterial({ color: 0xc0392b }));
      plume.position.y = 1.82;
      group.add(plume);
    }

    return group;
  }

  flash(color = 0xff5544) {
    if (!this.bodyMesh || !this.bodyMesh.material) return;
    this.bodyMesh.material.emissive = new THREE.Color(color);
    this.modelMaterials.forEach(mat => { mat.emissive.setHex(color); mat.emissiveIntensity = 0.65; });
    this.flashTimer = 0.16;
  }

  die() {
    if (this.isDead) return;
    this.isDead = true;
    this.intent = "";
    if (this.mixer) this.mixer.stopAllAction();
    this.updateOverlay();
    if (this.overlayEl) this.overlayEl.style.display = "none";
  }

  setIntent(text) {
    this.intent = text || "";
    this.updateOverlay();
  }

  moveTo(gx, gy) {
    this.gridX = gx;
    this.gridY = gy;
    const target = gridToWorld(gx, gy);
    this.targetPos.set(target.x, 0, target.z);
    this.isMoving = true;

    const angle = Math.atan2(target.x - this.mesh.position.x, target.z - this.mesh.position.z);
    this.mesh.rotation.y = angle;
  }

  update(dt) {
    if (this.isMoving) {
      this.mesh.position.lerp(this.targetPos, 0.16);
      this.animTime += dt * 10;
      this.bodyMesh.position.y = 0.65 + Math.sin(this.animTime) * 0.06;

      if (this.mesh.position.distanceTo(this.targetPos) < 0.05) {
        this.mesh.position.copy(this.targetPos);
        this.isMoving = false;
        this.bodyMesh.position.y = 0.65;
      }
    }

    if (this.mixer) {
      this.mixer.update(dt);
      if (this.actionLock > 0) {
        this.actionLock -= dt;
      } else if (this.isMoving) {
        this.playModelAction("walk");
      } else {
        this.playModelAction("idle");
      }
    }

    if (this.ponchoGuarded) {
      this.shieldMesh.material.opacity = 0.45 + Math.sin(Date.now() * 0.008) * 0.15;
      this.shieldMesh.rotation.y += dt * 1.5;
    } else {
      this.shieldMesh.material.opacity = 0.0;
    }

    this.bolasMesh.visible = this.immobilized || this.rooted;
    if (this.bolasMesh.visible) this.bolasMesh.rotation.z += dt * 2;

    if (this.flashTimer > 0) {
      this.flashTimer -= dt;
      if (this.flashTimer <= 0) {
        if (this.bodyMesh && this.bodyMesh.material) {
          this.bodyMesh.material.emissive = new THREE.Color(0x000000);
        }
        this.modelMaterials.forEach(mat => {
          mat.emissive.setHex(0x000000);
          mat.emissiveIntensity = 1;
        });
      }
    }

    if (this.bossAura) {
      this.bossAura.rotation.z += dt * 0.7;
      this.bossAura.material.opacity = 0.35 + Math.sin(Date.now() * 0.004) * 0.2;
    }

    if (this.hasStatus("burning")) {
      this.bodyMesh.position.y = 0.65 + Math.sin(Date.now() * 0.02) * 0.03;
    }
    if (this.hasStatus("stunned")) {
      this.mesh.rotation.y += dt * 2.5;
    }

    if (this.isDead) {
      this.mesh.rotation.z = THREE.MathUtils.lerp(this.mesh.rotation.z, Math.PI / 2, 0.12);
      this.mesh.position.y = THREE.MathUtils.lerp(this.mesh.position.y, -0.2, 0.1);
      this.selectionRing.visible = false;
    } else {
      if (Math.abs(this.mesh.rotation.z) > 0.001) {
        this.mesh.rotation.z = THREE.MathUtils.lerp(this.mesh.rotation.z, 0, 0.15);
      }
      if (Math.abs(this.mesh.position.y) > 0.001) {
        this.mesh.position.y = THREE.MathUtils.lerp(this.mesh.position.y, 0, 0.15);
      }
      this.selectionRing.visible = true;
    }
  }
}

// -----------------------------------------------------------------------------
// 5. MOTOR THREE.JS Y ESCENA PRINCIPAL
// -----------------------------------------------------------------------------
const container = document.getElementById("three-container");
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x18120e);
scene.fog = new THREE.FogExp2(0x18120e, 0.015);

const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.5, 300);
function resetCamera() {
  const conf = Game.levelCamera;
  const position = conf && conf.position ? conf.position : [0, 24, 26];
  const target = conf && conf.target ? conf.target : [0, 0, 0];
  camera.position.set(position[0], position[1], position[2]);
  if (controls) {
    controls.target.set(target[0], target[1], target[2]);
    controls.update();
  } else {
    camera.lookAt(target[0], target[1], target[2]);
  }
}

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
container.appendChild(renderer.domElement);

let controls;
if (typeof THREE.OrbitControls !== "undefined") {
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.maxPolarAngle = Math.PI / 2.15;
  controls.minDistance = 10;
  controls.maxDistance = 60;
  controls.mouseButtons = {
    LEFT: THREE.MOUSE.NONE,
    MIDDLE: THREE.MOUSE.DOLLY,
    RIGHT: THREE.MOUSE.ROTATE
  };
}

resetCamera();

// -----------------------------------------------------------------------------
// 5.b MODOS DE CÁMARA: TÁCTICA / TERCERA PERSONA / PRIMERA PERSONA (FIERRO)
// -----------------------------------------------------------------------------
const CAMERA_MODES = {
  tactical: {
    label: "TÁCTICA",
    icon: "🎥",
    fov: 40,
    hint: "🖱️ <strong>Click Izq:</strong> Mover / Acción | <strong>Click Der + Arrastrar:</strong> Orbitar Cámara 3D | <strong>Rueda:</strong> Zoom | <strong>Q:</strong> Cambiar cámara"
  },
  third: {
    label: "3ª PERSONA",
    icon: "🧍",
    fov: 56,
    hint: "🖱️ <strong>Click Izq:</strong> Mover / Acción | <strong>Click Der + Arrastrar:</strong> Girar cámara | <strong>Rueda:</strong> Acercar / Alejar | <strong>Flechas:</strong> Mirar | <strong>Q:</strong> Cambiar cámara"
  },
  first: {
    label: "1ª PERSONA",
    icon: "👁️",
    fov: 70,
    hint: "👁️ <strong>Vista de Martín Fierro</strong> | <strong>Click Izq:</strong> Mover / Acción | <strong>Click Der + Arrastrar:</strong> Mirar alrededor | <strong>Flechas:</strong> Mirar | <strong>Q:</strong> Cambiar cámara"
  }
};
const CAMERA_MODE_ORDER = ["tactical", "third", "first"];

const cameraRig = {
  mode: "tactical",
  yawOffset: 0,
  pitch: 0.26,
  smoothPitch: 0.26,
  distance: 6.2,
  lookYaw: 0,
  snap: true,
  keys: new Set(),
  pointer: null
};

function cameraModeConfig(mode = cameraRig.mode) {
  return CAMERA_MODES[mode] || CAMERA_MODES.tactical;
}

function shortestAngleDelta(from, to) {
  let delta = (to - from) % (Math.PI * 2);
  if (delta > Math.PI) delta -= Math.PI * 2;
  if (delta < -Math.PI) delta += Math.PI * 2;
  return delta;
}

function updateCameraUI() {
  const cfg = cameraModeConfig();
  const label = document.getElementById("camera-mode-label");
  if (label) label.innerText = cfg.label;
  const icon = document.getElementById("camera-mode-icon");
  if (icon) icon.innerText = cfg.icon;
  const button = document.getElementById("btn-camera-mode");
  if (button) {
    button.title = `Cámara: ${cfg.label} — click o [Q] para cambiar`;
    button.classList.toggle("active-mode", cameraRig.mode !== "tactical");
  }
  const hint = document.getElementById("camera-hint-text");
  if (hint) hint.innerHTML = cfg.hint;
  document.body.dataset.camera = cameraRig.mode;
}

function resetCameraLook() {
  cameraRig.yawOffset = 0;
  cameraRig.pitch = cameraRig.mode === "third" ? 0.26 : -0.04;
  cameraRig.smoothPitch = cameraRig.pitch;
  if (fierroUnit && fierroUnit.mesh) cameraRig.lookYaw = fierroUnit.mesh.rotation.y;
  cameraRig.snap = true;
}

function setCameraMode(mode, options = {}) {
  if (!CAMERA_MODES[mode]) return;
  cameraRig.mode = mode;
  cameraRig.keys.clear();
  cameraRig.pointer = null;

  if (mode === "tactical") {
    if (controls) controls.enabled = true;
    if (fierroUnit && fierroUnit.mesh) fierroUnit.mesh.visible = true;
    camera.near = 0.5;
    camera.fov = CAMERA_MODES.tactical.fov;
    camera.updateProjectionMatrix();
    resetCamera();
  } else {
    if (controls) controls.enabled = false;
    if (fierroUnit && fierroUnit.mesh) fierroUnit.mesh.visible = mode !== "first";
    camera.near = 0.08;
    camera.fov = CAMERA_MODES[mode].fov;
    camera.updateProjectionMatrix();
    cameraRig.distance = mode === "third" ? 6.2 : cameraRig.distance;
    resetCameraLook();
  }

  updateCameraUI();
  if (options.announce) {
    showToast(`Cámara: ${cameraModeConfig().label}`, "normal");
  }
}

function cycleCameraMode() {
  const current = CAMERA_MODE_ORDER.indexOf(cameraRig.mode);
  const next = CAMERA_MODE_ORDER[(current + 1) % CAMERA_MODE_ORDER.length];
  setCameraMode(next, { announce: true });
}

function nudgeCameraLook(deltaYaw, deltaPitch) {
  if (cameraRig.mode === "tactical") return;
  cameraRig.yawOffset += deltaYaw;
  cameraRig.pitch += deltaPitch;
  cameraRig.pitch = cameraRig.mode === "third"
    ? clamp(cameraRig.pitch, -0.12, 1.05)
    : clamp(cameraRig.pitch, -1.15, 1.15);
}

function applyCameraRig(dt) {
  if (cameraRig.mode === "tactical" || !fierroUnit || !fierroUnit.mesh) return;

  if (cameraRig.keys.size) {
    const turn = (cameraRig.keys.has("arrowleft") ? 1 : 0) + (cameraRig.keys.has("arrowright") ? -1 : 0);
    const tilt = (cameraRig.keys.has("arrowup") ? 1 : 0) + (cameraRig.keys.has("arrowdown") ? -1 : 0);
    nudgeCameraLook(turn * dt * 1.8, tilt * dt * 1.1);
  }

  const unit = fierroUnit;
  const pos = unit.mesh.position;
  const wantedYaw = unit.mesh.rotation.y + cameraRig.yawOffset;

  if (cameraRig.snap) {
    cameraRig.lookYaw = wantedYaw;
    cameraRig.smoothPitch = cameraRig.pitch;
  } else {
    const turnSpeed = cameraRig.mode === "first" ? 14 : 8;
    cameraRig.lookYaw += shortestAngleDelta(cameraRig.lookYaw, wantedYaw) * Math.min(1, dt * turnSpeed);
    cameraRig.smoothPitch += (cameraRig.pitch - cameraRig.smoothPitch) * Math.min(1, dt * 10);
  }

  const heading = cameraRig.lookYaw;
  const pitch = cameraRig.smoothPitch;

  if (cameraRig.mode === "first") {
    const bob = unit.isMoving ? Math.sin(unit.animTime * 2.1) * 0.025 : 0;
    const eye = new THREE.Vector3(
      pos.x + Math.sin(heading) * 0.18,
      1.7 + bob,
      pos.z + Math.cos(heading) * 0.18
    );
    const dir = new THREE.Vector3(
      Math.sin(heading) * Math.cos(pitch),
      Math.sin(pitch),
      Math.cos(heading) * Math.cos(pitch)
    );
    camera.position.copy(eye);
    camera.lookAt(eye.x + dir.x * 12, eye.y + dir.y * 12, eye.z + dir.z * 12);
  } else {
    const cosPitch = Math.cos(pitch);
    const desired = new THREE.Vector3(
      pos.x - Math.sin(heading) * cosPitch * cameraRig.distance,
      1.35 + Math.sin(pitch) * cameraRig.distance + 0.55,
      pos.z - Math.cos(heading) * cosPitch * cameraRig.distance
    );
    desired.y = Math.max(0.7, desired.y);
    if (cameraRig.snap) {
      camera.position.copy(desired);
    } else {
      camera.position.lerp(desired, 1 - Math.pow(0.0015, dt));
    }
    camera.lookAt(pos.x, 1.25, pos.z);
  }

  cameraRig.snap = false;
}

// Arrastre con botón derecho para mirar (en 1ª y 3ª persona).
renderer.domElement.addEventListener("pointerdown", event => {
  if (cameraRig.mode === "tactical" || event.button !== 2) return;
  cameraRig.pointer = { id: event.pointerId, x: event.clientX, y: event.clientY };
  renderer.domElement.setPointerCapture(event.pointerId);
  event.preventDefault();
});

renderer.domElement.addEventListener("pointermove", event => {
  if (!cameraRig.pointer || cameraRig.pointer.id !== event.pointerId) return;
  const dx = event.clientX - cameraRig.pointer.x;
  const dy = event.clientY - cameraRig.pointer.y;
  cameraRig.pointer.x = event.clientX;
  cameraRig.pointer.y = event.clientY;
  nudgeCameraLook(-dx * 0.006, -dy * 0.005);
});

function endCameraPointer(event) {
  if (cameraRig.pointer && cameraRig.pointer.id === event.pointerId) {
    cameraRig.pointer = null;
  }
}
renderer.domElement.addEventListener("pointerup", endCameraPointer);
renderer.domElement.addEventListener("pointercancel", endCameraPointer);

renderer.domElement.addEventListener("contextmenu", event => {
  if (cameraRig.mode !== "tactical") event.preventDefault();
});

// Rueda: acerca / aleja la cámara en 3ª persona.
renderer.domElement.addEventListener("wheel", event => {
  if (cameraRig.mode === "tactical") return;
  event.preventDefault();
  if (cameraRig.mode === "third") {
    cameraRig.distance = clamp(cameraRig.distance + event.deltaY * 0.004, 2.4, 13);
  }
}, { passive: false });

const ambientLight = new THREE.AmbientLight(0xffecd9, 0.7);
scene.add(ambientLight);

const sunLight = new THREE.DirectionalLight(0xffa257, 1.4);
sunLight.position.set(-25, 35, 20);
sunLight.castShadow = true;
sunLight.shadow.mapSize.width = 2048;
sunLight.shadow.mapSize.height = 2048;
sunLight.shadow.camera.near = 0.5;
sunLight.shadow.camera.far = 100;
sunLight.shadow.camera.left = -30;
sunLight.shadow.camera.right = 30;
sunLight.shadow.camera.top = 30;
sunLight.shadow.camera.bottom = -30;
sunLight.shadow.bias = -0.0005;
scene.add(sunLight);

const campfireLight = new THREE.PointLight(0xff6600, 2.5, 14);
campfireLight.castShadow = true;
scene.add(campfireLight);

const terrainGeo = new THREE.PlaneGeometry(120, 90, 32, 32);
const terrainMat = new THREE.MeshStandardMaterial({ color: 0x3d3122, roughness: 0.95 });
const terrainMesh = new THREE.Mesh(terrainGeo, terrainMat);
terrainMesh.rotation.x = -Math.PI / 2;
terrainMesh.receiveShadow = true;
scene.add(terrainMesh);

const gridHelper = new THREE.GridHelper(GRID_COLS * TILE_SIZE, GRID_COLS, 0xc89d4f, 0x4a3c2a);
gridHelper.position.y = 0.01;
scene.add(gridHelper);

const rangeVisualGroup = new THREE.Group();
scene.add(rangeVisualGroup);

const hoverCellGeo = new THREE.PlaneGeometry(TILE_SIZE * 0.95, TILE_SIZE * 0.95);
const hoverCellMat = new THREE.MeshBasicMaterial({ color: 0xf39c12, transparent: true, opacity: 0.35, side: THREE.DoubleSide });
const hoverCellMesh = new THREE.Mesh(hoverCellGeo, hoverCellMat);
hoverCellMesh.rotation.x = -Math.PI / 2;
hoverCellMesh.position.y = 0.02;
hoverCellMesh.visible = false;
scene.add(hoverCellMesh);

const environmentGroup = new THREE.Group();
scene.add(environmentGroup);

const interactiveGroup = new THREE.Group();
scene.add(interactiveGroup);

const hazardGroup = new THREE.Group();
scene.add(hazardGroup);

const weatherGroup = new THREE.Group();
scene.add(weatherGroup);

let weatherParticles = null;
let camTween = null;

// -----------------------------------------------------------------------------
// 4.b MODELOS ANIMADOS (GLB) CON RESPALDO PRIMITIVO
// -----------------------------------------------------------------------------
// Los GLB exportados miran hacia +X en su espacio local; los giramos para que
// su frente coincida con +Z y las rotaciones de grid/movimiento sean correctas.
const CHARACTER_MODEL_YAW = -Math.PI / 2;
const CHARACTER_ASSETS = {
  martin: { url: "assets/models/martin-fierro.glb", gltf: null, status: "idle", subscribers: [] },
  gaucha: { url: "assets/models/companion-gaucha.glb", gltf: null, status: "idle", subscribers: [] },
  guard: { url: "assets/models/frontier-guard.glb", gltf: null, status: "idle", subscribers: [] }
};
let characterModelWarningShown = false;

function resolveCharacterKind(unit) {
  if (unit.id === "fierro") return "martin";
  if (["mora", "ramona", "juana", "picardia", "clara"].includes(unit.id)) return "gaucha";
  return "guard";
}

function requestCharacterModel(kind, callback) {
  const key = CHARACTER_ASSETS[kind] ? kind : "guard";
  const asset = CHARACTER_ASSETS[key];
  if (asset.gltf) {
    callback(asset.gltf);
    return;
  }
  asset.subscribers.push(callback);
  if (asset.status === "loading" || asset.status === "failed") return;
  if (typeof THREE.GLTFLoader !== "function") {
    asset.status = "failed";
    return;
  }
  asset.status = "loading";
  const loader = new THREE.GLTFLoader();
  loader.load(
    asset.url,
    gltf => {
      asset.gltf = gltf;
      asset.status = "ready";
      const pending = asset.subscribers.splice(0);
      pending.forEach(fn => {
        try { fn(gltf); } catch (err) { console.warn("No se pudo montar el modelo", key, err); }
      });
    },
    undefined,
    () => {
      asset.status = "failed";
      asset.subscribers.length = 0;
      if (!characterModelWarningShown) {
        characterModelWarningShown = true;
        console.info("Modelos GLB no disponibles con file://. Usá JUGAR.bat (servidor local) para ver los personajes animados.");
      }
    }
  );
}

// Expuesto para pruebas automatizadas.
window.__characterAssets = CHARACTER_ASSETS;

// Unidades fijas del jugador
let fierroUnit = new Unit3D({
  id: "fierro",
  name: "Martín Fierro",
  faction: "player",
  gridX: 6,
  gridY: 9,
  maxHp: 100,
  maxAp: 4,
  role: "Gaucho Cantor & Rebelde"
});

let cruzUnit = new Unit3D({
  id: "cruz",
  name: "Sargento Cruz",
  faction: "ally",
  gridX: 5,
  gridY: 10,
  maxHp: 90,
  maxAp: 4,
  role: "Compañero Renegado del Fortín"
});

// -----------------------------------------------------------------------------
// 6. DISEÑO DE NIVELES Y CARGA DINÁMICA 3D
// -----------------------------------------------------------------------------
const LEVELS = {
  1: {
    title: "Capítulo I: La Pulpería 'La Colorada'",
    questTitle: "Tensión en la Pulpería",
    questStep: "Habla con Don Claudio en la pulpería o inspecciona el fogón antes del arribo de la partida militar.",
    ambientColor: 0x3d3122,
    skyColor: 0x18120e,
    obstacles: [
      { type: "building", gx: 15, gy: 2, gw: 6, gh: 4, cover: COVER.FULL, label: "Pulpería 'La Colorada'" },
      { type: "campfire", gx: 8, gy: 8, gw: 1, gh: 1, cover: COVER.NONE, label: "Fogón Pampeano" },
      { type: "wagon", gx: 12, gy: 8, gw: 2, gh: 1, cover: COVER.HALF, label: "Carreta con cueros" },
      { type: "wagon", gx: 16, gy: 10, gw: 2, gh: 1, cover: COVER.HALF, label: "Carreta rota" },
      { type: "tree", gx: 3, gy: 4, gw: 2, gh: 2, cover: COVER.FULL, label: "Ombú Centenario" },
      { type: "tree", gx: 10, gy: 13, gw: 2, gh: 2, cover: COVER.FULL, label: "Ombú de la cañada" },
      { type: "post", gx: 14, gy: 7, gw: 1, gh: 1, cover: COVER.HALF, label: "Palenque" }
    ],
    units: [
      new Unit3D({ id: "pulpero", name: "Don Claudio", faction: "neutral", gridX: 17, gridY: 4, maxHp: 70, role: "Pulpero" }),
      new Unit3D({ id: "comandante", name: "Comandante Mayorga", faction: "enemy", gridX: 19, gridY: 11, maxHp: 95, role: "Jefe de Partida" }),
      new Unit3D({ id: "soldado1", name: "Milico Riquelme", faction: "enemy", gridX: 20, gridY: 9, maxHp: 65, role: "Fusilero" }),
      new Unit3D({ id: "soldado2", name: "Milico Sosa", faction: "enemy", gridX: 21, gridY: 12, maxHp: 65, role: "Lancero" })
    ]
  },
  2: {
    title: "Capítulo II: El Cañadón de los Cuatreros",
    questTitle: "El Desfiladero de las Sombras",
    questStep: "Negocia el paso al desierto con el líder matrero 'El Pardo Baigorria' o libera a los prisioneros por la fuerza.",
    ambientColor: 0x3a2c20,
    skyColor: 0x241108,
    obstacles: [
      { type: "rock", gx: 11, gy: 6, gw: 2, gh: 2, cover: COVER.HALF, label: "Roca de Cañadón" },
      { type: "rock", gx: 17, gy: 9, gw: 2, gh: 2, cover: COVER.HALF, label: "Roca de Cañadón" },
      { type: "campfire", gx: 14, gy: 8, gw: 1, gh: 1, cover: COVER.NONE, label: "Fuego de Campamento" },
      { type: "wagon", gx: 8, gy: 4, gw: 2, gh: 1, cover: COVER.HALF, label: "Carreta Asaltada" },
      { type: "tree", gx: 5, gy: 12, gw: 2, gh: 2, cover: COVER.FULL, label: "Chañar Espinoso" },
      { type: "tree", gx: 20, gy: 4, gw: 2, gh: 2, cover: COVER.FULL, label: "Chañar Espinoso" }
    ],
    units: [
      new Unit3D({ id: "baigorria", name: "Pardo Baigorria", faction: "neutral", gridX: 15, gridY: 8, maxHp: 110, role: "Líder de Cuatreros" }),
      new Unit3D({ id: "cuatrero1", name: "Chajá Gómez", faction: "enemy", gridX: 18, gridY: 6, maxHp: 75, role: "Tirador Matrero" }),
      new Unit3D({ id: "cuatrero2", name: "El Zorro Videla", faction: "enemy", gridX: 18, gridY: 10, maxHp: 80, role: "Cuchillero Feroz" }),
      new Unit3D({ id: "picardia", name: "Picardía (Cautivo)", faction: "neutral", gridX: 16, gridY: 12, maxHp: 60, role: "Gaucho Amigo" })
    ]
  },
  3: {
    title: "Capítulo III: El Bastión del Fortín de Frontera",
    questTitle: "La Última Resistencia en la Línea",
    questStep: "Enfrenta al Juez de Paz y decide el destino final de Fierro y Cruz: libertad en el desierto o justicia por mano propia.",
    ambientColor: 0x2b221a,
    skyColor: 0x110804,
    obstacles: [
      { type: "palisade", gx: 12, gy: 1, gw: 1, gh: 14, cover: COVER.FULL, label: "Empalizada del Fortín" },
      { type: "building", gx: 18, gy: 5, gw: 5, gh: 6, cover: COVER.FULL, label: "Comandancia Militar" },
      { type: "wagon", gx: 9, gy: 8, gw: 2, gh: 1, cover: COVER.HALF, label: "Trinchera de Sacos" },
      { type: "post", gx: 16, gy: 4, gw: 1, gh: 1, cover: COVER.HALF, label: "Garita de Vigilancia" }
    ],
    units: [
      new Unit3D({ id: "juez", name: "Juez Don Zoilo", faction: "enemy", gridX: 20, gridY: 8, maxHp: 85, role: "Juez de Paz Corrupto" }),
      new Unit3D({ id: "capitan", name: "Capitán Albornoz", faction: "enemy", gridX: 17, gridY: 8, maxHp: 105, role: "Veterano de Línea" }),
      new Unit3D({ id: "soldado3", name: "Fusilero del Fortín", faction: "enemy", gridX: 15, gridY: 4, maxHp: 70, role: "Tirador de Garita" }),
      new Unit3D({ id: "soldado4", name: "Soldado de Trinchera", faction: "enemy", gridX: 15, gridY: 12, maxHp: 70, role: "Guardia del Foso" })
    ]
  },
  4: {
    title: "Capítulo IV: El Salitral de las Ánimas",
    questTitle: "Rastros bajo la luna",
    questStep: "Encuentra a Mora, la baqueana, y consigue cruzar el salitral antes de que los rastreadores cierren el paso.",
    ambientColor: 0x443a2d,
    skyColor: 0x17191a,
    obstacles: [
      { type: "rock", gx: 8, gy: 5, gw: 2, gh: 2, cover: COVER.HALF, label: "Piedras salitrosas" },
      { type: "tree", gx: 4, gy: 11, gw: 2, gh: 2, cover: COVER.FULL, label: "Algarrobo seco" },
      { type: "wagon", gx: 11, gy: 9, gw: 2, gh: 1, cover: COVER.HALF, label: "Carreta abandonada" },
      { type: "campfire", gx: 14, gy: 7, gw: 1, gh: 1, cover: COVER.NONE, label: "Fogón apagado" },
      { type: "rock", gx: 19, gy: 11, gw: 2, gh: 2, cover: COVER.HALF, label: "Rocas del paso estrecho" }
    ],
    units: [
      new Unit3D({ id: "mora", name: "Mora, baqueana", faction: "neutral", gridX: 17, gridY: 5, maxHp: 75, role: "Guía del Salitral" }),
      new Unit3D({ id: "rastreador1", name: "Rastreador Vera", faction: "enemy", gridX: 19, gridY: 7, maxHp: 78, role: "Rastreador de la partida" }),
      new Unit3D({ id: "rastreador2", name: "Cabo Funes", faction: "enemy", gridX: 20, gridY: 10, maxHp: 82, role: "Cabo de frontera" }),
      new Unit3D({ id: "rastreador3", name: "Lancerito", faction: "enemy", gridX: 22, gridY: 6, maxHp: 68, role: "Lanzero montado" })
    ]
  },
  5: {
    title: "Capítulo V: El Regreso a la Tapera",
    questTitle: "La tierra que dejaron atrás",
    questStep: "Llega a la tapera de Fierro y enfrenta a Don Evaristo, el estanciero que tomó las tierras durante la leva.",
    ambientColor: 0x493324,
    skyColor: 0x21120d,
    obstacles: [
      { type: "building", gx: 17, gy: 3, gw: 5, gh: 4, cover: COVER.FULL, label: "Casa de la estancia" },
      { type: "wagon", gx: 12, gy: 9, gw: 2, gh: 1, cover: COVER.HALF, label: "Carreta de la estancia" },
      { type: "tree", gx: 8, gy: 4, gw: 2, gh: 2, cover: COVER.FULL, label: "Ombú del pago" },
      { type: "tree", gx: 5, gy: 12, gw: 2, gh: 2, cover: COVER.FULL, label: "Monte de tala" },
      { type: "post", gx: 15, gy: 8, gw: 1, gh: 1, cover: COVER.HALF, label: "Palenque" }
    ],
    units: [
      new Unit3D({ id: "evaristo", name: "Don Evaristo", faction: "enemy", gridX: 20, gridY: 8, maxHp: 115, role: "Estanciero de la tapera" }),
      new Unit3D({ id: "capataz", name: "Capataz Molina", faction: "enemy", gridX: 17, gridY: 9, maxHp: 90, role: "Jefe de la guardia" }),
      new Unit3D({ id: "guardia1", name: "Guardia de la estancia", faction: "enemy", gridX: 21, gridY: 11, maxHp: 75, role: "Fusilero" }),
      new Unit3D({ id: "guardia2", name: "Peón de armas", faction: "enemy", gridX: 15, gridY: 5, maxHp: 72, role: "Guardia de la estancia" })
    ]
  }
};

// -----------------------------------------------------------------------------
// 6.b DISEÑO EXTENDIDO: METADATOS DE CAPÍTULO, ROLES Y TRES NUEVOS NIVELES
// -----------------------------------------------------------------------------

function assignUnitProps(levelIndex, unitId, props) {
  const unit = LEVELS[levelIndex].units.find(u => u.id === unitId);
  if (unit) Object.assign(unit, props);
}

Object.assign(LEVELS[1], {
  subtitle: "Donde la pampa y la ley se miran de reojo.",
  weather: "dusk",
  camera: { position: [0, 24, 27], target: [2, 0, 1] },
  playerStart: { fierro: { x: 4, y: 9 }, cruz: { x: 3, y: 10 } },
  objective: { type: "eliminate", label: "Derrotar o disuadir a la partida militar" },
  interactables: [
    { id: "l1_barrel", type: "barrel", gx: 7, gy: 11, label: "Barril de pólvora", solid: true },
    { id: "l1_crate", type: "crate", gx: 9, gy: 6, label: "Cajón de provisiones", solid: true },
    { id: "l1_well", type: "well", gx: 13, gy: 12, label: "Aljibe de la pulpería", solid: true }
  ],
  inspections: [
    { gx: 8, gy: 8, dialogue: "fogon_inspect", label: "Inspeccionar el fogón" }
  ]
});
assignUnitProps(1, "pulpero", { dialogue: "pulpero_intro", variant: "civilian", initiative: 6 });
assignUnitProps(1, "comandante", { dialogue: "comandante_encounter", archetype: "chief", initiative: 14, damageBonus: 3, statusResist: 0.15 });
assignUnitProps(1, "soldado1", { archetype: "musketeer", initiative: 11 });
assignUnitProps(1, "soldado2", { archetype: "lancer", initiative: 12, damageBonus: 2 });

Object.assign(LEVELS[2], {
  subtitle: "El monte guarda a los que la ley olvidó.",
  weather: "night",
  camera: { position: [0, 25, 26], target: [3, 0, 0] },
  playerStart: { fierro: { x: 4, y: 9 }, cruz: { x: 3, y: 10 } },
  objective: { type: "eliminate", label: "Abrir el paso del cañadón" },
  interactables: [
    { id: "l2_crate", type: "crate", gx: 6, gy: 6, label: "Alforjas abandonadas", solid: true },
    { id: "l2_barrel", type: "barrel", gx: 19, gy: 12, label: "Barril de aguardiente", solid: true },
    { id: "l2_well", type: "well", gx: 7, gy: 14, label: "Ojo de agua del cañadón", solid: true }
  ]
});
assignUnitProps(2, "baigorria", { dialogue: "baigorria_intro", archetype: "chief", variant: "bandit", initiative: 15, damageBonus: 3 });
assignUnitProps(2, "cuatrero1", { archetype: "musketeer", variant: "bandit", initiative: 11 });
assignUnitProps(2, "cuatrero2", { archetype: "brute", variant: "bandit", initiative: 13, damageBonus: 2 });
assignUnitProps(2, "picardia", { dialogue: "picardia_free", variant: "civilian", initiative: 8 });

Object.assign(LEVELS[3], {
  subtitle: "La empalizada divide el mundo en dos.",
  weather: "fire",
  camera: { position: [0, 26, 25], target: [2, 0, 0] },
  playerStart: { fierro: { x: 4, y: 8 }, cruz: { x: 3, y: 9 } },
  objective: { type: "eliminate", label: "Quebrar la defensa del fortín" },
  interactables: [
    { id: "l3_barrel", type: "barrel", gx: 9, gy: 3, label: "Barril de pólvora del fortín", solid: true },
    { id: "l3_crate", type: "crate", gx: 8, gy: 12, label: "Arcón de municiones", solid: true },
    { id: "l3_barrel2", type: "barrel", gx: 16, gy: 12, label: "Polvorín de trinchera", solid: true }
  ],
  hazards: [{ gx: 10, gy: 6, type: "fire", turns: 99 }]
});
assignUnitProps(3, "juez", { dialogue: "juez_encounter", archetype: "chief", initiative: 15, damageBonus: 3, statusResist: 0.2 });
assignUnitProps(3, "capitan", { dialogue: "juez_encounter", archetype: "brute", initiative: 13, damageBonus: 4, statusResist: 0.15 });
assignUnitProps(3, "soldado3", { archetype: "musketeer", initiative: 12 });
assignUnitProps(3, "soldado4", { archetype: "lancer", initiative: 11 });

Object.assign(LEVELS[4], {
  subtitle: "Bajo la luna, el salitral borra las huellas.",
  weather: "dust",
  camera: { position: [0, 24, 27], target: [3, 0, 1] },
  playerStart: { fierro: { x: 4, y: 8 }, cruz: { x: 3, y: 9 } },
  objective: { type: "eliminate", label: "Cruzar el salitral antes del alba" },
  interactables: [
    { id: "l4_crate", type: "crate", gx: 12, gy: 3, label: "Carga de la carreta", solid: true },
    { id: "l4_barrel", type: "barrel", gx: 16, gy: 11, label: "Barril de pólvora", solid: true },
    { id: "l4_well", type: "well", gx: 6, gy: 7, label: "Jagüey de agua salobre", solid: true }
  ]
});
assignUnitProps(4, "mora", { dialogue: "mora_intro", variant: "civilian", initiative: 14 });
assignUnitProps(4, "rastreador1", { archetype: "musketeer", initiative: 12 });
assignUnitProps(4, "rastreador2", { archetype: "lancer", initiative: 11, damageBonus: 2 });
assignUnitProps(4, "rastreador3", { archetype: "lancer", initiative: 10, damageBonus: 1 });

Object.assign(LEVELS[5], {
  subtitle: "La tapera sigue en pie, pero ya no es tu casa.",
  weather: "dusk",
  camera: { position: [0, 25, 27], target: [3, 0, 0] },
  playerStart: { fierro: { x: 4, y: 8 }, cruz: { x: 3, y: 9 } },
  objective: { type: "eliminate", label: "Recuperar la tapera de la estancia" },
  interactables: [
    { id: "l5_barrel", type: "barrel", gx: 11, gy: 6, label: "Barril de la estancia", solid: true },
    { id: "l5_crate", type: "crate", gx: 9, gy: 10, label: "Cajón del capataz", solid: true },
    { id: "l5_well", type: "well", gx: 14, gy: 13, label: "Aljibe del patio", solid: true }
  ]
});
assignUnitProps(5, "evaristo", { dialogue: "evaristo_encounter", archetype: "chief", initiative: 15, damageBonus: 4, statusResist: 0.2 });
assignUnitProps(5, "capataz", { dialogue: "evaristo_encounter", archetype: "brute", initiative: 13, damageBonus: 3 });
assignUnitProps(5, "guardia1", { archetype: "musketeer", initiative: 11 });
assignUnitProps(5, "guardia2", { archetype: "brute", initiative: 12 });

// --- CAPÍTULO VI: EL VADO DEL RÍO SALADO ---
LEVELS[6] = {
  title: "Capítulo VI: El Vado del Río Salado",
  subtitle: "El río no perdona a quien duda.",
  questTitle: "La crecida y los que cruzan",
  questStep: "Doña Ramona espera junto al vado con los colonos. Hablá con ella y resistí las cinco rondas de la partida de Ferreyra.",
  ambientColor: 0x2c3528,
  skyColor: 0x141c20,
  weather: "rain",
  camera: { position: [0, 26, 28], target: [1, 0, 0] },
  playerStart: { fierro: { x: 4, y: 8 }, cruz: { x: 3, y: 10 } },
  objective: { type: "survive", rounds: 5, label: "Resistir 5 rondas en el vado" },
  obstacles: [
    { type: "river", gx: 11, gy: 0, gw: 2, gh: 5, cover: COVER.NONE, label: "Río Salado" },
    { type: "river", gx: 11, gy: 11, gw: 2, gh: 5, cover: COVER.NONE, label: "Río Salado" },
    { type: "reeds", gx: 8, gy: 5, gw: 2, gh: 2, cover: COVER.HALF, label: "Juncos del vado" },
    { type: "reeds", gx: 15, gy: 9, gw: 2, gh: 2, cover: COVER.HALF, label: "Juncos altos" },
    { type: "wagon", gx: 5, gy: 13, gw: 2, gh: 1, cover: COVER.HALF, label: "Carreta de los colonos" },
    { type: "tree", gx: 18, gy: 12, gw: 2, gh: 2, cover: COVER.FULL, label: "Sauce del río" },
    { type: "rock", gx: 18, gy: 3, gw: 2, gh: 2, cover: COVER.HALF, label: "Rocas del vado" },
    { type: "post", gx: 7, gy: 4, gw: 1, gh: 1, cover: COVER.HALF, label: "Mojón del camino" }
  ],
  interactables: [
    { id: "l6_barrel", type: "barrel", gx: 9, gy: 13, label: "Barril de pólvora de la carreta", solid: true },
    { id: "l6_crate", type: "crate", gx: 5, gy: 5, label: "Carga de los colonos", solid: true },
    { id: "l6_campfire", type: "campfire", gx: 9, gy: 9, label: "Fogón del vado", solid: false },
    { id: "l6_well", type: "well", gx: 3, gy: 13, label: "Pozo de la orilla", solid: true }
  ],
  units: [
    new Unit3D({ id: "ramona", name: "Doña Ramona", faction: "neutral", gridX: 7, gridY: 7, maxHp: 60, role: "Colona del vado", variant: "civilian", dialogue: "ramona_vado", initiative: 7 }),
    new Unit3D({ id: "ferreyra", name: "Capitán Ferreyra", faction: "enemy", gridX: 20, gridY: 8, maxHp: 125, role: "Jefe de la partida", archetype: "chief", initiative: 15, damageBonus: 4, statusResist: 0.2, dialogue: "ferreyra_encounter" }),
    new Unit3D({ id: "miliciano1", name: "Miliciano Cárdenas", faction: "enemy", gridX: 19, gridY: 5, maxHp: 70, role: "Fusilero de la crecida", archetype: "musketeer", initiative: 11 }),
    new Unit3D({ id: "miliciano2", name: "Miliciano Paz", faction: "enemy", gridX: 20, gridY: 11, maxHp: 75, role: "Lancero de la crecida", archetype: "lancer", initiative: 12, damageBonus: 2 })
  ],
  waves: [
    { round: 2, units: [
      { id: "refuerzo6a", name: "Lancero Toledo", faction: "enemy", gridX: 22, gridY: 4, maxHp: 65, role: "Refuerzo", archetype: "lancer", initiative: 10 },
      { id: "refuerzo6b", name: "Fusilero Ibarra", faction: "enemy", gridX: 22, gridY: 12, maxHp: 60, role: "Refuerzo", archetype: "musketeer", initiative: 9 }
    ] },
    { round: 4, units: [
      { id: "refuerzo6c", name: "Sargento Duarte", faction: "enemy", gridX: 21, gridY: 7, maxHp: 90, role: "Refuerzo veterano", archetype: "brute", initiative: 13, damageBonus: 3 },
      { id: "refuerzo6d", name: "Miliciano Rojas", faction: "enemy", gridX: 21, gridY: 13, maxHp: 65, role: "Refuerzo", archetype: "lancer", initiative: 9 }
    ] }
  ]
};

// --- CAPÍTULO VII: LA NOCHE DE LA PAYADA ---
LEVELS[7] = {
  title: "Capítulo VII: La Noche de la Payada",
  subtitle: "Hay verdades que solo salen cantando.",
  questTitle: "El escribano de las tierras",
  questStep: "Reuní tres testimonios en la pulpería contra el Escribano Isidro. La Parda Juana, el Viejo Vizcacha y el Cantor Aurelio conocen la verdad.",
  ambientColor: 0x3b2d22,
  skyColor: 0x151016,
  weather: "night",
  camera: { position: [0, 23, 25], target: [1, 0, 1] },
  playerStart: { fierro: { x: 4, y: 12 }, cruz: { x: 3, y: 13 } },
  objective: { type: "investigate", required: 3, label: "Reunir 3 testimonios contra el escribano" },
  obstacles: [
    { type: "building", gx: 8, gy: 1, gw: 8, gh: 3, cover: COVER.FULL, label: "Pulpería del Clavel Colorado" },
    { type: "table", gx: 14, gy: 5, gw: 1, gh: 1, cover: COVER.HALF, label: "Mesa de taba" },
    { type: "table", gx: 6, gy: 8, gw: 2, gh: 1, cover: COVER.HALF, label: "Mesa de los parroquianos" },
    { type: "wagon", gx: 16, gy: 11, gw: 2, gh: 1, cover: COVER.HALF, label: "Carreta del almacén" },
    { type: "tree", gx: 20, gy: 2, gw: 2, gh: 2, cover: COVER.FULL, label: "Ombú del camino" },
    { type: "post", gx: 12, gy: 8, gw: 1, gh: 1, cover: COVER.HALF, label: "Palenque de los caballos" }
  ],
  interactables: [
    { id: "l7_guitar", type: "guitar", gx: 13, gy: 4, label: "Guitarra del cantor", solid: false },
    { id: "l7_crate", type: "crate", gx: 6, gy: 6, label: "Cajón de la pulpería", solid: true },
    { id: "l7_barrel", type: "barrel", gx: 12, gy: 11, label: "Barril de ginebra", solid: true },
    { id: "l7_well", type: "well", gx: 4, gy: 5, label: "Aljibe del patio", solid: true }
  ],
  units: [
    new Unit3D({ id: "juana", name: "La Parda Juana", faction: "neutral", gridX: 6, gridY: 5, maxHp: 55, role: "Cantinera y memoria del pago", variant: "civilian", dialogue: "juana_testimony", initiative: 8 }),
    new Unit3D({ id: "vizcacha", name: "El Viejo Vizcacha", faction: "neutral", gridX: 17, gridY: 8, maxHp: 50, role: "Baquiano de la pulpería", variant: "civilian", dialogue: "vizcacha_testimony", initiative: 6 }),
    new Unit3D({ id: "cantor", name: "El Cantor Aurelio", faction: "neutral", gridX: 15, gridY: 3, maxHp: 65, role: "Payador de la frontera", variant: "civilian", dialogue: "cantor_payada", initiative: 9 }),
    new Unit3D({ id: "escribano", name: "Escribano Isidro", faction: "neutral", gridX: 9, gridY: 6, maxHp: 85, role: "Falsificador de títulos", archetype: "chief", variant: "civilian", dialogue: "escribano_encounter", initiative: 10 }),
    new Unit3D({ id: "guardia7a", name: "Matón Barrientos", faction: "enemy", gridX: 18, gridY: 7, maxHp: 75, role: "Guardia del escribano", archetype: "brute", initiative: 12, damageBonus: 2 }),
    new Unit3D({ id: "guardia7b", name: "Matón Ferro", faction: "enemy", gridX: 20, gridY: 9, maxHp: 70, role: "Guardia del escribano", archetype: "lancer", initiative: 11 })
  ]
};

// --- CAPÍTULO VIII: EL ÚLTIMO CANTO ---
LEVELS[8] = {
  title: "Capítulo VIII: El Último Canto",
  subtitle: "La frontera arde y solo queda una canción.",
  questTitle: "El Coronel de la frontera",
  questStep: "Entrá al Fortín San Martín, sobreviví al fuego y derrotá al Coronel Lagos. Es la última carta de la frontera.",
  ambientColor: 0x3a261a,
  skyColor: 0x1d0d07,
  weather: "fire",
  camera: { position: [0, 27, 26], target: [1, 0, 0] },
  playerStart: { fierro: { x: 3, y: 8 }, cruz: { x: 2, y: 9 } },
  objective: { type: "eliminate", boss: true, label: "Derrotar al Coronel Lagos y tomar el fortín" },
  obstacles: [
    { type: "palisade", gx: 13, gy: 0, gw: 1, gh: 6, cover: COVER.FULL, label: "Empalizada norte" },
    { type: "palisade", gx: 13, gy: 9, gw: 1, gh: 6, cover: COVER.FULL, label: "Empalizada sur" },
    { type: "building", gx: 19, gy: 4, gw: 4, gh: 5, cover: COVER.FULL, label: "Comandancia de Lagos" },
    { type: "wagon", gx: 9, gy: 7, gw: 2, gh: 1, cover: COVER.HALF, label: "Carreta volcada" },
    { type: "wagon", gx: 15, gy: 12, gw: 2, gh: 1, cover: COVER.HALF, label: "Trinchera de sacos" },
    { type: "post", gx: 15, gy: 3, gw: 1, gh: 1, cover: COVER.HALF, label: "Mástil de la bandera" },
    { type: "tree", gx: 7, gy: 13, gw: 2, gh: 2, cover: COVER.FULL, label: "Ombú seco" }
  ],
  interactables: [
    { id: "l8_barrel1", type: "barrel", gx: 15, gy: 5, label: "Polvorín del fortín", solid: true },
    { id: "l8_barrel2", type: "barrel", gx: 17, gy: 10, label: "Barril de metralla", solid: true },
    { id: "l8_crate", type: "crate", gx: 10, gy: 11, label: "Arcón de municiones", solid: true },
    { id: "l8_well", type: "well", gx: 6, gy: 4, label: "Aljibe del fortín", solid: true }
  ],
  hazards: [
    { gx: 16, gy: 6, type: "fire", turns: 99 },
    { gx: 17, gy: 11, type: "fire", turns: 99 },
    { gx: 11, gy: 4, type: "fire", turns: 99 }
  ],
  units: [
    new Unit3D({ id: "lagos", name: "Coronel Lagos", faction: "enemy", gridX: 21, gridY: 8, maxHp: 240, role: "Comandante del Fortín San Martín", archetype: "boss", variant: "military", isBoss: true, initiative: 16, damageBonus: 6, statusResist: 0.35, dialogue: "lagos_encounter" }),
    new Unit3D({ id: "capitan8", name: "Capitán Sarmiento", faction: "enemy", gridX: 18, gridY: 8, maxHp: 110, role: "Segundo de Lagos", archetype: "brute", initiative: 14, damageBonus: 4 }),
    new Unit3D({ id: "fusilero8a", name: "Fusilero del muro", faction: "enemy", gridX: 16, gridY: 2, maxHp: 75, role: "Tirador de empalizada", archetype: "musketeer", initiative: 12 }),
    new Unit3D({ id: "fusilero8b", name: "Fusilero de la garita", faction: "enemy", gridX: 16, gridY: 13, maxHp: 75, role: "Tirador de garita", archetype: "musketeer", initiative: 11 }),
    new Unit3D({ id: "lancero8", name: "Lancero Quiroga", faction: "enemy", gridX: 15, gridY: 9, maxHp: 85, role: "Guardia de la comandancia", archetype: "lancer", initiative: 10, damageBonus: 3 })
  ]
};

LEVELS[6].title = "Capítulo VI: El Vado del Río Salado";
LEVELS[7].title = "Capítulo VII: La Noche de la Payada";
LEVELS[8].title = "Capítulo VIII: El Último Canto";

function clearGroup(group) {
  while (group.children.length > 0) {
    const child = group.children[0];
    group.remove(child);
    child.traverse(obj => {
      if (obj.geometry && obj.geometry.dispose) obj.geometry.dispose();
    });
  }
}

function createPropRing(color = 0xf1c40f) {
  const ring = new THREE.Mesh(
    new THREE.RingGeometry(0.5, 0.62, 24),
    new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.55, side: THREE.DoubleSide })
  );
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = 0.03;
  return ring;
}

function loadLevel(levelIndex) {
  Game.currentLevel = levelIndex;
  const levelData = LEVELS[levelIndex];
  if (!levelData) return;

  Game.activeLevelData = levelData;
  Game.combatRound = 1;
  Game.combatLock = false;
  Game.combatQueue = [];
  Game.activeUnitIndex = 0;
  Game.waveIndex = 0;
  Game.levelCompletionHandled = false;
  Game.defeatShown = false;
  // Los testimonios del capítulo VII viajan con Fierro hasta el fortín.
  if (levelIndex !== 8) Game.testimonies = [];
  Game.interactables = [];
  Game.hazards = [];
  if (!levelData.objective) levelData.objective = { type: "eliminate", label: "Derrotar a todos los enemigos" };

  // Actualizar indicadores del HUD
  document.getElementById("level-indicator-text").innerText = levelData.title.toUpperCase();
  document.getElementById("current-quest-title").innerText = `Misión: ${levelData.questTitle}`;
  document.getElementById("current-quest-step").innerText = levelData.questStep;
  document.getElementById("mode-badge").innerText = "EXPLORACIÓN LIBRE 3D";
  document.getElementById("mode-badge").style.color = "#f39c12";
  document.getElementById("combat-banner").classList.add("hidden");
  document.getElementById("turn-order-bar").classList.add("hidden");
  document.getElementById("btn-end-turn").disabled = true;
  document.getElementById("round-counter").innerText = "RONDA 1";
  updateObjectiveUI();

  // Colores de atmósfera 3D
  scene.background.setHex(levelData.skyColor);
  scene.fog.color.setHex(levelData.skyColor);
  terrainMat.color.setHex(levelData.ambientColor);
  scene.fog.density = WEATHER[levelData.weather || "clear"].fog;
  sunLight.intensity = WEATHER[levelData.weather || "clear"].sun;
  ambientLight.intensity = WEATHER[levelData.weather || "clear"].ambient;
  sunLight.color.setHex(levelData.weather === "night" ? 0x8fa9d6 : (levelData.weather === "rain" ? 0x9fb8c9 : 0xffa257));

  // Limpiar escenografía previa
  clearGroup(environmentGroup);
  clearGroup(interactiveGroup);
  clearGroup(hazardGroup);
  clearGroup(rangeVisualGroup);
  hoverCellMesh.visible = false;
  hideTacticalTooltip();
  Game.currentObstacles = levelData.obstacles || [];

  const matWood = new THREE.MeshLambertMaterial({ color: 0x5d4037 });
  const matRoof = new THREE.MeshLambertMaterial({ color: 0x922b21 });
  const matAdobe = new THREE.MeshLambertMaterial({ color: 0xd7ccc8 });
  const matLeaves = new THREE.MeshLambertMaterial({ color: 0x194d1f });
  const matTrunk = new THREE.MeshLambertMaterial({ color: 0x3e2723 });
  const matRock = new THREE.MeshStandardMaterial({ color: 0x5a5046, roughness: 0.9 });
  const matWater = new THREE.MeshPhongMaterial({ color: 0x2e6f8e, transparent: true, opacity: 0.72, shininess: 90, side: THREE.DoubleSide });
  const matReed = new THREE.MeshLambertMaterial({ color: 0x6d7f3a });

  Game.currentObstacles.forEach(obs => {
    const p1 = gridToWorld(obs.gx, obs.gy);
    const p2 = gridToWorld(obs.gx + obs.gw - 1, obs.gy + obs.gh - 1);
    const centerX = (p1.x + p2.x) / 2;
    const centerZ = (p1.z + p2.z) / 2;
    const width = obs.gw * TILE_SIZE;
    const depth = obs.gh * TILE_SIZE;

    if (obs.type === "building") {
      const bGroup = new THREE.Group();
      bGroup.position.set(centerX, 0, centerZ);
      const wallMesh = new THREE.Mesh(new THREE.BoxGeometry(width - 0.2, 4.0, depth - 0.2), matAdobe);
      wallMesh.position.y = 2.0;
      wallMesh.castShadow = true;
      wallMesh.receiveShadow = true;
      bGroup.add(wallMesh);

      const roofMesh = new THREE.Mesh(new THREE.ConeGeometry(Math.max(width, depth) * 0.75, 2.2, 4), matRoof);
      roofMesh.position.y = 4.8;
      roofMesh.rotation.y = Math.PI / 4;
      roofMesh.castShadow = true;
      bGroup.add(roofMesh);

      const door = new THREE.Mesh(new THREE.BoxGeometry(0.85, 1.7, 0.08), matTrunk);
      door.position.set(0, 0.85, depth / 2 - 0.05);
      bGroup.add(door);
      environmentGroup.add(bGroup);

    } else if (obs.type === "palisade") {
      const palGroup = new THREE.Group();
      palGroup.position.set(centerX, 0, centerZ);
      const posts = Math.max(2, obs.gh * 2);
      for (let i = 0; i < posts; i++) {
        const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.17, 3.2, 8), matWood);
        trunk.position.set(0, 1.6, ((i / (posts - 1)) - 0.5) * (depth - 0.5));
        trunk.castShadow = true;
        palGroup.add(trunk);
        const tip = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.3, 8), matWood);
        tip.position.set(0, 3.3, trunk.position.z);
        palGroup.add(tip);
      }
      environmentGroup.add(palGroup);

    } else if (obs.type === "rock") {
      const rockMesh = new THREE.Mesh(new THREE.DodecahedronGeometry(Math.min(width, depth) * 0.55, 1), matRock);
      rockMesh.position.set(centerX, 0.85, centerZ);
      rockMesh.rotation.set(Math.random(), Math.random(), Math.random());
      rockMesh.castShadow = true;
      environmentGroup.add(rockMesh);

    } else if (obs.type === "wagon") {
      const wGroup = new THREE.Group();
      wGroup.position.set(centerX, 0, centerZ);
      const bed = new THREE.Mesh(new THREE.BoxGeometry(width - 0.4, 0.4, depth - 0.4), matWood);
      bed.position.y = 0.9;
      bed.castShadow = true;
      wGroup.add(bed);

      const canopy = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.8, width - 0.4, 16, 1, true, 0, Math.PI), new THREE.MeshLambertMaterial({ color: 0xc4b59d, side: THREE.DoubleSide }));
      canopy.rotation.z = Math.PI / 2;
      canopy.position.y = 1.25;
      wGroup.add(canopy);

      [-1, 1].forEach(side => {
        const wheel = new THREE.Mesh(new THREE.TorusGeometry(0.36, 0.09, 8, 16), matTrunk);
        wheel.rotation.y = Math.PI / 2;
        wheel.position.set((width / 2) - 0.35, 0.42, side * (depth / 2 - 0.2));
        wGroup.add(wheel);
      });
      environmentGroup.add(wGroup);

    } else if (obs.type === "tree") {
      const tGroup = new THREE.Group();
      tGroup.position.set(centerX, 0, centerZ);
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 1.1, 3.2, 10), matTrunk);
      trunk.position.y = 1.6;
      trunk.castShadow = true;
      tGroup.add(trunk);
      const leaves = new THREE.Mesh(new THREE.DodecahedronGeometry(2.2, 1), matLeaves);
      leaves.position.y = 3.9;
      leaves.castShadow = true;
      tGroup.add(leaves);
      const leaves2 = new THREE.Mesh(new THREE.DodecahedronGeometry(1.45, 1), matLeaves);
      leaves2.position.set(0.8, 4.7, 0.4);
      tGroup.add(leaves2);
      environmentGroup.add(tGroup);

    } else if (obs.type === "campfire") {
      campfireLight.position.set(centerX, 1.2, centerZ);

    } else if (obs.type === "river") {
      const water = new THREE.Mesh(new THREE.PlaneGeometry(width, depth, 1, 1), matWater);
      water.rotation.x = -Math.PI / 2;
      water.position.set(centerX, 0.07, centerZ);
      environmentGroup.add(water);
      const bank = new THREE.Mesh(new THREE.BoxGeometry(width + 0.4, 0.08, 0.16), matRock);
      bank.position.set(centerX, 0.05, centerZ - depth / 2);
      environmentGroup.add(bank);

    } else if (obs.type === "reeds") {
      const reedGroup = new THREE.Group();
      reedGroup.position.set(centerX, 0, centerZ);
      for (let i = 0; i < 26; i++) {
        const h = 0.8 + Math.random() * 1.2;
        const reed = new THREE.Mesh(new THREE.ConeGeometry(0.035, h, 4), matReed);
        reed.position.set((Math.random() - 0.5) * (width - 0.3), h / 2, (Math.random() - 0.5) * (depth - 0.3));
        reedGroup.add(reed);
      }
      environmentGroup.add(reedGroup);

    } else if (obs.type === "table") {
      const table = new THREE.Group();
      table.position.set(centerX, 0, centerZ);
      const top = new THREE.Mesh(new THREE.BoxGeometry(width - 0.25, 0.12, depth - 0.25), matWood);
      top.position.y = 0.85;
      top.castShadow = true;
      table.add(top);
      [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([sx, sz]) => {
        const leg = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.8, 0.09), matTrunk);
        leg.position.set(sx * (width / 2 - 0.25), 0.4, sz * (depth / 2 - 0.25));
        table.add(leg);
      });
      environmentGroup.add(table);
    }
  });

  // Construir objetos interactivos
  (levelData.interactables || []).forEach(data => {
    const pos = gridToWorld(data.gx, data.gy);
    const group = new THREE.Group();
    group.position.set(pos.x, 0, pos.z);

    if (data.type === "barrel") {
      const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.38, 0.82, 12), new THREE.MeshLambertMaterial({ color: 0x8e3b1f }));
      barrel.position.y = 0.41;
      barrel.castShadow = true;
      group.add(barrel);
      [0.22, 0.62].forEach(y => {
        const band = new THREE.Mesh(new THREE.TorusGeometry(0.36, 0.025, 6, 14), new THREE.MeshLambertMaterial({ color: 0x3e2723 }));
        band.rotation.x = Math.PI / 2;
        band.position.y = y;
        group.add(band);
      });
    } else if (data.type === "crate") {
      const crate = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.62, 0.78), new THREE.MeshLambertMaterial({ color: 0x8d6e3f }));
      crate.position.y = 0.31;
      crate.castShadow = true;
      group.add(crate);
      const strap = new THREE.Mesh(new THREE.BoxGeometry(0.82, 0.08, 0.82), new THREE.MeshLambertMaterial({ color: 0x4e342e }));
      strap.position.y = 0.32;
      group.add(strap);
    } else if (data.type === "well") {
      const base = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.7, 0.8, 12), matRock);
      base.position.y = 0.4;
      base.castShadow = true;
      group.add(base);
      const water = new THREE.Mesh(new THREE.CircleGeometry(0.45, 14), new THREE.MeshBasicMaterial({ color: 0x1c4d68 }));
      water.rotation.x = -Math.PI / 2;
      water.position.y = 0.82;
      group.add(water);
      const roof = new THREE.Mesh(new THREE.ConeGeometry(0.85, 0.5, 4), matRoof);
      roof.position.y = 1.65;
      group.add(roof);
      [-1, 1].forEach(s => {
        const post = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.1, 0.08), matWood);
        post.position.set(s * 0.42, 1.1, 0);
        group.add(post);
      });
    } else if (data.type === "campfire") {
      const logs = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.22, 8), matTrunk);
      logs.rotation.x = Math.PI / 2;
      logs.position.y = 0.12;
      group.add(logs);
      const flame = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.65, 7), new THREE.MeshBasicMaterial({ color: 0xff8a1f }));
      flame.position.y = 0.45;
      group.add(flame);
    } else if (data.type === "guitar") {
      const body = new THREE.Mesh(new THREE.SphereGeometry(0.32, 12, 10), new THREE.MeshLambertMaterial({ color: 0x9c5a1e }));
      body.scale.set(1, 1.2, 0.4);
      body.position.y = 0.35;
      group.add(body);
      const neck = new THREE.Mesh(new THREE.BoxGeometry(0.09, 1.1, 0.08), matTrunk);
      neck.position.set(0, 1.0, 0);
      group.add(neck);
      group.rotation.z = 0.35;
    }

    const ring = createPropRing(data.type === "guitar" ? 0xf7dc6f : 0xf1c40f);
    group.add(ring);
    data.group = group;
    data.ring = ring;
    data.used = false;
    data.mesh = group;
    group.userData.interactable = data;
    group.traverse(child => { child.userData.interactable = data; });
    interactiveGroup.add(group);
    Game.interactables.push(data);
  });

  // Construir fuegos y peligros del escenario
  (levelData.hazards || []).forEach(h => {
    const pos = gridToWorld(h.gx, h.gy);
    const group = new THREE.Group();
    group.position.set(pos.x, 0, pos.z);
    const glow = new THREE.Mesh(
      new THREE.PlaneGeometry(TILE_SIZE * 0.9, TILE_SIZE * 0.9),
      new THREE.MeshBasicMaterial({ color: 0xff6b1a, transparent: true, opacity: 0.35, side: THREE.DoubleSide })
    );
    glow.rotation.x = -Math.PI / 2;
    glow.position.y = 0.03;
    group.add(glow);
    for (let i = 0; i < 3; i++) {
      const flame = new THREE.Mesh(
        new THREE.ConeGeometry(0.16 + Math.random() * 0.12, 0.55 + Math.random() * 0.4, 6),
        new THREE.MeshBasicMaterial({ color: i === 0 ? 0xffc300 : 0xff6b1a, transparent: true, opacity: 0.85 })
      );
      flame.position.set((Math.random() - 0.5) * 0.9, 0.35, (Math.random() - 0.5) * 0.9);
      group.add(flame);
    }
    h.group = group;
    h.turnsLeft = h.turns || 3;
    Game.hazards.push(h);
    hazardGroup.add(group);
  });

  // Atmósfera y partículas
  setupWeather(levelData.weather || "clear");

  // Limpiar unidades previas
  Game.levelUnits.forEach(u => {
    scene.remove(u.mesh);
    u.detachOverlay();
  });
  Game.levelUnits = levelData.units;
  Game.levelUnits.forEach(u => {
    u.statuses = {};
    u.isDead = false;
    u.hp = u.maxHp;
    u.clearTransientStates();
    u.updateOverlay();
    scene.add(u.mesh);
    u.attachOverlay();
  });

  // Posicionar a Fierro y Cruz al inicio del nivel
  const start = levelData.playerStart || { fierro: { x: 4, y: 8 }, cruz: { x: 3, y: 9 } };
  fierroUnit.statuses = {};
  cruzUnit.statuses = {};
  fierroUnit.isDead = false;
  cruzUnit.isDead = false;
  fierroUnit.clearTransientStates();
  cruzUnit.clearTransientStates();
  fierroUnit.moveTo(start.fierro.x, start.fierro.y);
  cruzUnit.moveTo(start.cruz.x, start.cruz.y);
  const chapterHeal = 20 + (hasPerk("segundo_aliento") ? 20 : 0);
  fierroUnit.hp = Math.min(fierroUnit.maxHp, Math.max(1, fierroUnit.hp) + chapterHeal);
  cruzUnit.hp = Math.min(cruzUnit.maxHp, Math.max(1, cruzUnit.hp) + chapterHeal);
  if (hasPerk("segundo_aliento") && fierroUnit.hp > 0) {
    addCombatLog("Tu experiencia de campaña te devuelve el aliento (+20 HP).", "success");
  }
  Game.inventory.bandages = 2 + (Game.progression.level >= 3 ? 1 : 0);

  scene.add(fierroUnit.mesh);
  scene.add(cruzUnit.mesh);

  Game.state = "EXPLORATION";
  Game.levelCamera = levelData.camera || null;
  resetCamera();
  updateHUD();
  updateObjectiveUI();
  showChapterCard(levelIndex, levelData);
  addCombatLog(`<strong>Entrando a: ${levelData.title}</strong>. Explora el entorno, habla con los personajes o inspecciona el escenario.`);
  addCombatLog(`<strong>Objetivo:</strong> ${getObjectiveText()}`, "success");
  saveGame(levelIndex);
}

function getCoverAt(gx, gy) {
  for (const obs of Game.currentObstacles) {
    if (gx >= obs.gx && gx < obs.gx + obs.gw && gy >= obs.gy && gy < obs.gy + obs.gh) {
      return obs.cover;
    }
  }
  return COVER.NONE;
}

function isCellBlocked(gx, gy, ignoreUnit = null) {
  if (gx < 0 || gx >= GRID_COLS || gy < 0 || gy >= GRID_ROWS) return true;
  for (const obs of Game.currentObstacles) {
    const inside = gx >= obs.gx && gx < obs.gx + obs.gw && gy >= obs.gy && gy < obs.gy + obs.gh;
    if (!inside) continue;
    if (obs.cover === COVER.FULL || obs.type === "river") return true;
  }
  for (const prop of Game.interactables) {
    if (prop.solid && !prop.used && prop.gx === gx && prop.gy === gy) return true;
  }
  const allCurrentUnits = [fierroUnit, cruzUnit, ...Game.levelUnits];
  for (const u of allCurrentUnits) {
    if (u !== ignoreUnit && !u.isDead && u.gridX === gx && u.gridY === gy) return true;
  }
  return false;
}

// -----------------------------------------------------------------------------
// 7. VISUALIZADOR DE RANGO TÁCTICO 3D
// -----------------------------------------------------------------------------
function updateTacticalRangeDisplay() {
  while (rangeVisualGroup.children.length > 0) {
    rangeVisualGroup.remove(rangeVisualGroup.children[0]);
  }

  if (Game.state !== "COMBAT") return;

  const currentUnit = Game.combatQueue[Game.activeUnitIndex];
  if (!currentUnit || (currentUnit.faction !== "player" && currentUnit.faction !== "ally")) return;

  let maxRange = 0;
  let color = 0x3498db;

  if (Game.selectedAction === "move") {
    maxRange = getMoveRange(currentUnit);
    color = 0x27ae60;
  } else if (Game.selectedAction === "facon") {
    maxRange = 1.5;
    color = 0xf39c12;
  } else if (Game.selectedAction === "shoot") {
    maxRange = getShootRange(currentUnit);
    color = 0xe74c3c;
  } else if (Game.selectedAction === "bolas") {
    maxRange = 4.5;
    color = 0x9b59b6;
  } else if (Game.selectedAction === "payada") {
    maxRange = 5;
    color = 0xaf7ac5;
  } else if (Game.selectedAction === "overwatch") {
    maxRange = getShootRange(currentUnit);
    color = 0x5dade2;
  }

  const rangeTileGeo = new THREE.PlaneGeometry(TILE_SIZE * 0.9, TILE_SIZE * 0.9);
  const rangeTileMat = new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: 0.22, side: THREE.DoubleSide });

  for (let c = 0; c < GRID_COLS; c++) {
    for (let r = 0; r < GRID_ROWS; r++) {
      const dist = Math.hypot(c - currentUnit.gridX, r - currentUnit.gridY);
      if (dist <= maxRange && dist > 0.1) {
        if (Game.selectedAction === "move" && isCellBlocked(c, r, currentUnit)) continue;
        const pos = gridToWorld(c, r);
        const tile = new THREE.Mesh(rangeTileGeo, rangeTileMat);
        tile.rotation.x = -Math.PI / 2;
        tile.position.set(pos.x, 0.015, pos.z);
        rangeVisualGroup.add(tile);
      }
    }
  }
}

// -----------------------------------------------------------------------------
// 8. RAYCASTING, TOOLTIP TÁCTICO FLOTANTE Y CLICKS
// -----------------------------------------------------------------------------
const raycaster = new THREE.Raycaster();
const mouseVec = new THREE.Vector2();
const tacticalTooltip = document.getElementById("target-tactical-tooltip");

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function setTacticalTooltip(title, rows) {
  document.getElementById("tt-target-name").innerText = title;
  rows.forEach((row, index) => {
    const label = document.getElementById(`tt-label-${index + 1}`);
    const value = document.getElementById(`tt-${index === 0 ? "hit-chance" : index === 1 ? "cover-status" : "damage-est"}`);
    if (!label || !value) return;
    label.innerText = row[0];
    value.innerText = row[1];
  });
  tacticalTooltip.classList.remove("hidden");
}

function hideTacticalTooltip() {
  tacticalTooltip.classList.add("hidden");
}

function getInteractableAtPointer() {
  raycaster.setFromCamera(mouseVec, camera);
  const intersects = raycaster.intersectObjects(interactiveGroup.children, true);
  for (const hit of intersects) {
    let node = hit.object;
    while (node && !node.userData.interactable) node = node.parent;
    if (node && node.userData.interactable && !node.userData.interactable.used) {
      return node.userData.interactable;
    }
  }
  return null;
}

function findInspectionAt(gx, gy) {
  const level = LEVELS[Game.currentLevel];
  if (!level || !level.inspections) return null;
  return level.inspections.find(i => i.gx === gx && i.gy === gy) || null;
}

function getUnitAt(gx, gy) {
  return [fierroUnit, cruzUnit, ...Game.levelUnits].find(u => !u.isDead && u.gridX === gx && u.gridY === gy) || null;
}

renderer.domElement.addEventListener("mousemove", (e) => {
  const rect = renderer.domElement.getBoundingClientRect();
  mouseVec.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
  mouseVec.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

  const prop = getInteractableAtPointer();
  if (prop) {
    Game.hoverInteractable = prop;
    const pos = gridToWorld(prop.gx, prop.gy);
    hoverCellMesh.position.set(pos.x, 0.02, pos.z);
    hoverCellMesh.visible = true;
    Game.hoverCell = { x: prop.gx, y: prop.gy };
    const actionText = prop.type === "barrel" ? "Click: Explosión (1 AP)"
      : prop.type === "crate" ? "Click: Saquear botín"
      : prop.type === "well" ? "Click: Recuperar 22 HP"
      : prop.type === "guitar" ? "Click: Tocar una payada"
      : prop.type === "campfire" ? "Click: Avivar el fuego"
      : "Click: Usar";
    const activeUnit = Game.state === "COMBAT" ? Game.combatQueue[Game.activeUnitIndex] : fierroUnit;
    const distance = activeUnit ? Math.hypot(prop.gx - activeUnit.gridX, prop.gy - activeUnit.gridY) : 0;
    setTacticalTooltip(prop.label, [
      ["Acción:", actionText],
      ["Distancia:", `${distance.toFixed(1)} casillas${distance > 2.05 ? " · acercate" : " · al alcance"}`],
      ["Tipo:", prop.type.toUpperCase()]
    ]);
    document.getElementById("tt-label-1").innerText = "Acción:";
    return;
  }
  Game.hoverInteractable = null;

  raycaster.setFromCamera(mouseVec, camera);
  const intersects = raycaster.intersectObject(terrainMesh);

  if (intersects.length > 0) {
    const hit = intersects[0].point;
    const grid = worldToGrid(hit.x, hit.z);

    if (grid.x >= 0 && grid.x < GRID_COLS && grid.y >= 0 && grid.y < GRID_ROWS) {
      Game.hoverCell = grid;
      const worldPos = gridToWorld(grid.x, grid.y);
      hoverCellMesh.position.set(worldPos.x, 0.02, worldPos.z);
      hoverCellMesh.visible = true;

      const hoveredUnit = getUnitAt(grid.x, grid.y);
      const inspection = findInspectionAt(grid.x, grid.y);
      if (hoveredUnit && hoveredUnit.faction === "enemy" && Game.state === "COMBAT") {
        const currentUnit = Game.combatQueue[Game.activeUnitIndex];
        const hitChance = currentUnit ? Math.round(getHitChance(currentUnit, hoveredUnit) * 100) : 0;
        const cover = getCoverAt(hoveredUnit.gridX, hoveredUnit.gridY);
        const coverText = cover === COVER.FULL ? "Total (bloquea línea)" : cover === COVER.HALF ? "Parcial (-50%)" : "Sin cobertura";
        const dmg = currentUnit ? estimateDamage(currentUnit, hoveredUnit, Game.selectedAction) : null;
        setTacticalTooltip(`${hoveredUnit.name} [${hoveredUnit.hp}/${hoveredUnit.maxHp} HP]`, [
          [Game.selectedAction === "facon" ? "Prob. Impacto:" : "Prob. Disparo:", `${Math.max(5, hitChance)}%`],
          ["Cobertura:", coverText],
          ["Daño Estimado:", dmg ? dmg : "Control / Estado"]
        ]);
        tacticalTooltip.classList.remove("hidden");
      } else if (hoveredUnit) {
        const hint = hoveredUnit.dialogue ? "Click: iniciar conversación" : (hoveredUnit.faction === "enemy" ? "Click: provocar combate" : "Sin interacción");
        setTacticalTooltip(hoveredUnit.name, [
          ["Rol:", hoveredUnit.role],
          ["Facción:", hoveredUnit.faction === "neutral" ? "Neutral" : hoveredUnit.faction === "enemy" ? "Enemigo" : "Aliado"],
          ["Acción:", hint]
        ]);
      } else if (inspection) {
        setTacticalTooltip(inspection.label, [
          ["Acción:", "Click: inspeccionar"],
          ["Pista:", "Puede revelar objetos"],
          ["Tipo:", "ESCENARIO"]
        ]);
      } else {
        hideTacticalTooltip();
      }
      return;
    }
  }
  hoverCellMesh.visible = false;
  Game.hoverCell = { x: -1, y: -1 };
  hideTacticalTooltip();
});

renderer.domElement.addEventListener("click", () => {
  audio.init();

  const hx = Game.hoverCell.x;
  const hy = Game.hoverCell.y;

  // Interacción directa con props del escenario
  if (Game.hoverInteractable) {
    useInteractable(Game.hoverInteractable);
    return;
  }

  if (hx < 0 || hx >= GRID_COLS || hy < 0 || hy >= GRID_ROWS) return;

  // 1. MODO EXPLORACIÓN 3D
  if (Game.state === "EXPLORATION") {
    const inspection = findInspectionAt(hx, hy);
    if (inspection) {
      openDialogue(inspection.dialogue);
      return;
    }

    const clickedUnit = getUnitAt(hx, hy);
    if (clickedUnit && clickedUnit !== fierroUnit && clickedUnit !== cruzUnit) {
      if (clickedUnit.dialogue) {
        openDialogue(clickedUnit.dialogue);
        return;
      }
      if (clickedUnit.faction === "enemy") {
        showToast("¡La partida te descubre! A las armas.", "warning");
        startCombatSequence();
        return;
      }
      addCombatLog(`<strong>${clickedUnit.name}</strong> no tiene nada más que decir por ahora.`);
      return;
    }

    if (!isCellBlocked(hx, hy, fierroUnit)) {
      fierroUnit.moveTo(hx, hy);
    }
    return;
  }

  // 2. MODO COMBATE TÁCTICO POR TURNOS 3D
  if (Game.state === "COMBAT") {
    const currentUnit = Game.combatQueue[Game.activeUnitIndex];
    if (!currentUnit || (currentUnit.faction !== "player" && currentUnit.faction !== "ally")) return;

    const clickedEnemy = Game.levelUnits.find(e => !e.isDead && e.faction === "enemy" && e.gridX === hx && e.gridY === hy);

    if (clickedEnemy) {
      if (Game.selectedAction === "facon") {
        performAttack(currentUnit, clickedEnemy, "facon");
      } else if (Game.selectedAction === "shoot") {
        performAttack(currentUnit, clickedEnemy, "shoot");
      } else if (Game.selectedAction === "bolas") {
        performAttack(currentUnit, clickedEnemy, "bolas");
      } else if (Game.selectedAction === "payada") {
        performAttack(currentUnit, clickedEnemy, "payada");
      } else {
        const dist = Math.hypot(clickedEnemy.gridX - currentUnit.gridX, clickedEnemy.gridY - currentUnit.gridY);
        if (dist <= 1.5) performAttack(currentUnit, clickedEnemy, "facon");
        else performAttack(currentUnit, clickedEnemy, "shoot");
      }
      updateTacticalRangeDisplay();
      return;
    }

    // Moverse
    if (currentUnit.rooted) {
      addCombatLog(`<strong>${currentUnit.name}</strong> está inmovilizado este turno, pero puede atacar.`, "crit");
      return;
    }
    if (Game.selectedAction === "move" || !clickedEnemy) {
      if (currentUnit.ap >= 1) {
        const dist = Math.hypot(hx - currentUnit.gridX, hy - currentUnit.gridY);
        if (dist <= getMoveRange(currentUnit) && !isCellBlocked(hx, hy, currentUnit)) {
          currentUnit.moveTo(hx, hy);
          currentUnit.ap -= 1;
          if (isHazardAt(hx, hy)) {
            const burned = currentUnit.addStatus("burning");
            if (burned) {
              addCombatLog(`<strong>${currentUnit.name}</strong> pisa las brasas y comienza a arder.`, "crit");
              spawnDamageNumber(currentUnit, "🔥", "status");
            }
          }
          addCombatLog(`<strong>${currentUnit.name}</strong> se reposiciona (${currentUnit.ap} AP restantes).`);
          updateHUD();
          updateTacticalRangeDisplay();
        } else if (dist > getMoveRange(currentUnit)) {
          addCombatLog("¡Esa posición excede el rango de paso!", "crit");
        }
      } else {
        addCombatLog("¡Sin Puntos de Acción! Pasa turno con [Espacio].", "crit");
      }
    }
  }
});

// -----------------------------------------------------------------------------
// 9. LOGS Y SECUENCIA DE COMBATE TÁCTICO
// -----------------------------------------------------------------------------
function addCombatLog(text, type = "normal") {
  const container = document.getElementById("log-entries");
  if (!container) return;
  const entry = document.createElement("div");
  entry.className = `log-entry ${type}`;
  entry.innerHTML = text;
  container.prepend(entry);
  if (container.children.length > 5) container.removeChild(container.lastChild);
}

function getObjectiveText() {
  const level = Game.activeLevelData;
  const obj = level ? level.objective : null;
  if (!obj) return "Derrotar a los enemigos";
  if (obj.type === "survive") {
    return `Resistir ${obj.rounds} rondas en el vado (${Math.min(Game.combatRound, obj.rounds)}/${obj.rounds})`;
  }
  if (obj.type === "investigate") {
    return `Reunir testimonios contra el escribano (${Game.testimonies.length}/${obj.required})`;
  }
  if (obj.boss) {
    const boss = Game.levelUnits.find(u => u.isBoss && !u.isDead);
    return boss ? `Derrotar al Coronel Lagos (${boss.hp}/${boss.maxHp} HP)` : "El Coronel Lagos ha caído";
  }
  const alive = Game.levelUnits.filter(u => u.faction === "enemy" && !u.isDead).length;
  return `${obj.label} — enemigos restantes: ${alive}`;
}

function updateObjectiveUI() {
  const el = document.getElementById("objective-progress");
  if (!el) return;
  el.innerText = getObjectiveText();
}

function showToast(text, type = "normal") {
  const container = document.getElementById("toast-container");
  if (!container) return;
  const toast = document.createElement("div");
  toast.className = `game-toast ${type}`;
  toast.innerText = text;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3800);
}

function romanNumeral(num) {
  const map = [[10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]];
  let result = "";
  for (const [value, symbol] of map) {
    while (num >= value) {
      result += symbol;
      num -= value;
    }
  }
  return result;
}

function showChapterCard(levelIndex, levelData) {
  const card = document.getElementById("chapter-card");
  if (!card) return;
  document.getElementById("chapter-kicker").innerText = `CAPÍTULO ${romanNumeral(levelIndex)}`;
  const titleParts = levelData.title.split(":");
  document.getElementById("chapter-card-title").innerText = titleParts.length > 1 ? titleParts.slice(1).join(":").trim() : levelData.title;
  document.getElementById("chapter-card-subtitle").innerText = levelData.subtitle || levelData.questTitle;
  card.classList.remove("hidden");
  card.style.animation = "none";
  void card.offsetWidth;
  card.style.animation = "";
  if (Game.chapterCardTimer) clearTimeout(Game.chapterCardTimer);
  Game.chapterCardTimer = setTimeout(() => card.classList.add("hidden"), 2700);
}

function setupWeather(type) {
  Game.weather = type;
  const data = WEATHER[type] || WEATHER.clear;
  document.getElementById("weather-icon").innerText = data.icon;
  document.getElementById("weather-label").innerText = data.label;

  clearGroup(weatherGroup);
  weatherParticles = null;

  const particleCount = type === "rain" ? 900 : type === "dust" ? 480 : type === "fire" ? 220 : type === "night" ? 90 : 0;
  if (particleCount === 0) return;

  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 60;
    positions[i * 3 + 1] = Math.random() * (type === "night" ? 10 : 22);
    positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
  }
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const color = type === "rain" ? 0xa9d0e2 : type === "dust" ? 0xc9a36a : type === "fire" ? 0xff8c42 : 0xf7dc6f;
  const material = new THREE.PointsMaterial({ color, size: type === "rain" ? 0.09 : 0.14, transparent: true, opacity: type === "night" ? 0.65 : 0.55, depthWrite: false });
  weatherParticles = new THREE.Points(geometry, material);
  weatherParticles.userData.kind = type;
  weatherGroup.add(weatherParticles);
}

function projectToScreen(object3D, yOffset = 1.8) {
  const vector = new THREE.Vector3();
  object3D.getWorldPosition(vector);
  vector.y += yOffset;
  vector.project(camera);
  return {
    x: (vector.x * 0.5 + 0.5) * window.innerWidth,
    y: (-vector.y * 0.5 + 0.5) * window.innerHeight,
    visible: vector.z < 1
  };
}

function spawnDamageNumber(unit, text, type = "") {
  if (!unit || !unit.mesh) return;
  const screen = projectToScreen(unit.mesh);
  const el = document.createElement("div");
  el.className = `damage-number ${type}`;
  el.innerText = text;
  el.style.left = `${screen.x + (Math.random() - 0.5) * 24}px`;
  el.style.top = `${screen.y}px`;
  document.getElementById("damage-layer").appendChild(el);
  setTimeout(() => el.remove(), 1100);
}

function updateUnitOverlays() {
  const units = [fierroUnit, cruzUnit, ...Game.levelUnits];
  units.forEach(unit => {
    if (!unit.overlayEl) return;
    if (unit.isDead) {
      unit.overlayEl.style.display = "none";
      return;
    }
    // En primera persona no mostramos la ficha flotante de Fierro sobre la propia cámara.
    if (cameraRig.mode === "first" && unit === fierroUnit) {
      unit.overlayEl.style.display = "none";
      return;
    }
    const screen = projectToScreen(unit.mesh, 2.05);
    if (!screen.visible) {
      unit.overlayEl.style.display = "none";
      return;
    }
    unit.overlayEl.style.display = "";
    const half = Math.min(96, (unit.overlayEl.offsetWidth || 92) / 2 + 6);
    const x = clamp(screen.x, half, window.innerWidth - half);
    const y = clamp(screen.y, 36, window.innerHeight - 8);
    unit.overlayEl.style.left = `${x}px`;
    unit.overlayEl.style.top = `${y}px`;
  });
}

function spawnTracer(attacker, target) {
  const start = attacker.mesh.position.clone();
  start.y += 1.15;
  const end = target.mesh.position.clone();
  end.y += 1.0;
  const geometry = new THREE.BufferGeometry().setFromPoints([start, end]);
  const line = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: 0xffd166, transparent: true, opacity: 0.95 }));
  scene.add(line);
  setTimeout(() => {
    scene.remove(line);
    geometry.dispose();
    line.material.dispose();
  }, 110);
}

function renderStatusChips(unit, elementId) {
  const el = document.getElementById(elementId);
  if (!el) return;
  const active = Object.keys(unit.statuses);
  el.innerHTML = active.map(key => {
    const st = STATUS[key];
    if (!st) return "";
    return `<span class="status-chip" style="color:${st.color}" title="${st.name} (${unit.statuses[key]} turnos)">${st.icon} ${st.name}</span>`;
  }).join("");
}

function renderPerks() {
  const list = document.getElementById("perk-list");
  if (!list) return;
  const pointsLabel = document.getElementById("perk-points-label");
  if (pointsLabel) pointsLabel.innerText = `Puntos de pericias: ${Game.progression.perkPoints}`;
  list.innerHTML = "";
  PERKS.forEach(perk => {
    const owned = Game.progression.perks.includes(perk.id);
    const button = document.createElement("button");
    button.className = `perk-card${owned ? " owned" : ""}`;
    button.disabled = owned || Game.progression.perkPoints <= 0;
    button.innerHTML = `<strong>${perk.name}</strong><span>${perk.desc}</span>${owned ? '<span class="perk-owned-tag">✔ Adquirida</span>' : ""}`;
    button.onclick = () => applyPerk(perk.id);
    list.appendChild(button);
  });
}

function applyPerk(perkId) {
  if (Game.progression.perkPoints <= 0 || Game.progression.perks.includes(perkId)) return;
  const perk = PERKS.find(p => p.id === perkId);
  if (!perk) return;
  Game.progression.perks.push(perkId);
  Game.progression.perkPoints--;

  if (perkId === "cuero_duro") {
    fierroUnit.maxHp += 25;
    fierroUnit.hp += 25;
  } else if (perkId === "payador") {
    Game.stats.carisma += 2;
    Game.stats.supervivencia += 2;
  }

  audio.playLevelUp();
  showToast(`Pericia adquirida: ${perk.name}`, "success");
  addCombatLog(`<strong>Nueva pericia:</strong> ${perk.name}. ${perk.desc}`, "success");
  updateHUD();
  renderPerks();
}

function hasPerk(perkId) {
  return Game.progression.perks.includes(perkId);
}

function getMoveRange(unit) {
  let range = 3.5;
  if (hasPerk("baqueano") && (unit === fierroUnit || unit === cruzUnit)) range += 1;
  if (unit === fierroUnit) range += Math.floor((Game.stats.agilidad - 14) / 4) * 0.5;
  return range;
}

function getShootRange(unit) {
  let range = 6.5;
  if (unit === fierroUnit && hasPerk("ojo_halcon")) range += 1;
  if (unit === cruzUnit) range += 0.5;
  return range;
}

function getHitChance(attacker, target) {
  let chance = 0.82;
  const cover = target.hasStatus("exposed") ? COVER.NONE : getCoverAt(target.gridX, target.gridY);
  if (cover === COVER.HALF) chance -= 0.4;
  if (cover === COVER.FULL) chance -= 0.65;
  if (attacker === fierroUnit) {
    chance += Math.floor((Game.stats.percepcion - 10) / 2) * 0.015;
    if (hasPerk("ojo_halcon")) chance += 0.12;
  }
  if (target.hasStatus("marked")) chance += 0.15;
  if (target.ponchoGuarded) chance -= 0.25;
  if (target === fierroUnit && hasPerk("sangre_fria")) chance -= 0.1;
  const weather = WEATHER[Game.weather] || WEATHER.clear;
  chance += weather.hitMod;
  return clamp(chance, 0.1, 0.95);
}

function estimateDamage(attacker, target, action) {
  if (action === "bolas" || action === "payada") return "Inmovilizar / Marcar";
  const weapon = action === "shoot" ? Game.progression.weapons.trabuco : Game.progression.weapons.facon;
  const base = action === "shoot" ? 30 : 23;
  let damage = base + weapon * 6;
  if (attacker === fierroUnit) {
    damage += action === "shoot" ? 0 : Math.floor((Game.stats.fuerza - 10) / 2);
    if (action === "facon" && hasPerk("mano_fierro")) damage = Math.floor(damage * 1.2);
  }
  const low = Math.max(1, Math.floor(damage * 0.8));
  const high = Math.max(low + 1, Math.floor(damage * 1.25));
  return `${low} - ${high} HP`;
}

function hasLineOfSight(fromX, fromY, toX, toY) {
  const dx = Math.abs(toX - fromX);
  const dy = Math.abs(toY - fromY);
  const sx = fromX < toX ? 1 : -1;
  const sy = fromY < toY ? 1 : -1;
  let err = dx - dy;
  let x = fromX;
  let y = fromY;
  let guard = 0;

  while (guard++ < 80) {
    if (x === toX && y === toY) return true;
    const e2 = 2 * err;
    if (e2 > -dy) { err -= dy; x += sx; }
    if (e2 < dx) { err += dx; y += sy; }
    if (x === toX && y === toY) return true;
    for (const obs of Game.currentObstacles) {
      if (obs.cover !== COVER.FULL || obs.type === "river") continue;
      if (x >= obs.gx && x < obs.gx + obs.gw && y >= obs.gy && y < obs.gy + obs.gh) return false;
    }
  }
  return true;
}

function isHazardAt(gx, gy) {
  return Game.hazards.some(h => h.turnsLeft > 0 && h.gx === gx && h.gy === gy);
}

function applyHazardDamage(unit) {
  if (!isHazardAt(unit.gridX, unit.gridY)) return false;
  const damage = 5;
  unit.hp = Math.max(0, unit.hp - damage);
  unit.addStatus("burning");
  spawnDamageNumber(unit, `-${damage}`, "status");
  addCombatLog(`🔥 El fuego del fortín quema a <strong>${unit.name}</strong> (-${damage} HP).`, "crit");
  return true;
}

function addHazardAt(gx, gy, turns = 3) {
  if (Game.hazards.some(h => h.gx === gx && h.gy === gy && h.turnsLeft > 0)) return;
  const hazard = { gx, gy, type: "fire", turnsLeft: turns };
  const pos = gridToWorld(gx, gy);
  const group = new THREE.Group();
  group.position.set(pos.x, 0, pos.z);

  const glow = new THREE.Mesh(
    new THREE.PlaneGeometry(TILE_SIZE * 0.9, TILE_SIZE * 0.9),
    new THREE.MeshBasicMaterial({ color: 0xff6b1a, transparent: true, opacity: 0.35, side: THREE.DoubleSide })
  );
  glow.rotation.x = -Math.PI / 2;
  glow.position.y = 0.03;
  group.add(glow);

  for (let i = 0; i < 3; i++) {
    const flame = new THREE.Mesh(
      new THREE.ConeGeometry(0.16 + Math.random() * 0.12, 0.55 + Math.random() * 0.4, 6),
      new THREE.MeshBasicMaterial({ color: i === 0 ? 0xffc300 : 0xff6b1a, transparent: true, opacity: 0.85 })
    );
    flame.position.set((Math.random() - 0.5) * 0.9, 0.35, (Math.random() - 0.5) * 0.9);
    group.add(flame);
  }

  hazard.group = group;
  Game.hazards.push(hazard);
  hazardGroup.add(group);
}

function useInteractable(prop) {
  if (!prop || prop.used) return;
  if (Game.state !== "EXPLORATION" && Game.state !== "COMBAT") return;

  let actor = fierroUnit;
  if (Game.state === "COMBAT") {
    actor = Game.combatQueue[Game.activeUnitIndex];
    if (!actor || (actor.faction !== "player" && actor.faction !== "ally")) return;
    if (actor.ap < 1) {
      addCombatLog("No tenés AP para manipular el entorno este turno.", "crit");
      return;
    }
  }

  const distance = Math.hypot(prop.gx - actor.gridX, prop.gy - actor.gridY);
  if (distance > 2.05) {
    addCombatLog(`<strong>${prop.label}</strong> queda fuera de alcance. Acercate para usarlo.`, "normal");
    showToast("Acercate al objeto para interactuar.", "warning");
    return;
  }

  if (prop.type === "guitar") {
    if (Game.state !== "EXPLORATION") {
      addCombatLog("No es momento de cantar en medio del combate.", "normal");
      return;
    }
    if (Game.testimonies.includes("cantor")) {
      showToast("Aurelio ya te confió su testimonio.", "normal");
      return;
    }
    openDialogue("cantor_payada");
    return;
  }

  if (Game.state === "COMBAT") actor.ap -= 1;

  if (prop.type === "barrel") {
    prop.used = true;
    prop.group.visible = false;
    audio.playExplosion();
    showToast("¡El barril de pólvora estalla!", "warning");

    const victims = [fierroUnit, cruzUnit, ...Game.levelUnits].filter(u => !u.isDead);
    victims.forEach(victim => {
      if (Math.hypot(victim.gridX - prop.gx, victim.gridY - prop.gy) > 2.4) return;
      const damage = 18 + Math.floor(Math.random() * 10);
      victim.hp = Math.max(0, victim.hp - damage);
      victim.flash(0xff7a2f);
      victim.addStatus("burning", 2);
      spawnDamageNumber(victim, `-${damage}`, "crit");
      if (victim.hp <= 0) {
        victim.die();
        addCombatLog(`<strong>${victim.name}</strong> cae alcanzado por la explosión.`, "crit");
        if (victim.faction === "enemy") {
          awardExperience(35 + Game.currentLevel * 3, "Enemigo alcanzado por la pólvora");
          dropLoot(victim);
        }
      }
    });

    addCombatLog("La pólvora abre un cráter y enciende las brasas del suelo.", "crit");
    addHazardAt(prop.gx, prop.gy, 3);
    if (fierroUnit.hp <= 0) {
      showDefeat();
      return;
    }
    if (cruzUnit.hp <= 0 && !Game.morality.cruzSacrificed) {
      Game.morality.cruzSacrificed = true;
      addCombatLog("¡El Sargento Cruz ha caído en la explosión!", "crit");
    }
    if (Game.state === "COMBAT") checkCombatResolution();
  } else if (prop.type === "crate") {
    prop.used = true;
    prop.group.visible = false;
    const ammo = 2 + (Math.random() < 0.35 ? 1 : 0);
    const drinks = Math.random() < 0.4 ? 1 : 0;
    Game.inventory.ammo += ammo;
    Game.inventory.drinks += drinks;
    Game.progression.scrap += 1;
    audio.playLoot();
    addCombatLog(`Saqueás el cajón: ${ammo} cartuchos, ${drinks ? "1 ginebra y " : ""}1 pieza de metal.`, "success");
    showToast(`Botín: +${ammo} munición, +1 metal`, "success");
  } else if (prop.type === "well") {
    prop.used = true;
    prop.ring.visible = false;
    const patients = [fierroUnit, cruzUnit].filter(u => !u.isDead).sort((a, b) => (a.hp / a.maxHp) - (b.hp / b.maxHp));
    const patient = patients[0];
    if (patient) {
      const heal = 22;
      patient.hp = Math.min(patient.maxHp, patient.hp + heal);
      spawnDamageNumber(patient, `+${heal}`, "heal");
      audio.playChord([329.63, 440, 523.25]);
      addCombatLog(`<strong>${patient.name}</strong> bebe agua fresca del aljibe y recupera ${heal} HP.`, "success");
    }
  } else if (prop.type === "campfire") {
    prop.used = true;
    prop.ring.visible = false;
    addHazardAt(prop.gx, prop.gy, 4);
    audio.playWarning();
    addCombatLog("Avivás el fogón: las llamas cierran ese paso durante varias rondas.", "success");
    showToast("El fuego bloquea esa casilla.", "normal");
  } else {
    prop.used = true;
    prop.ring.visible = false;
    showToast(`${prop.label} ya no tiene nada útil.`, "normal");
  }

  updateHUD();
  updateObjectiveUI();
  updateTacticalRangeDisplay();
}

function buildTurnOrder() {
  const units = [fierroUnit, cruzUnit, ...Game.levelUnits.filter(u => u.faction === "enemy" && !u.isDead)];
  return units.sort((a, b) => {
    const aInit = a.initiative + (a === fierroUnit ? Math.floor((Game.stats.agilidad - 10) / 2) : 0);
    const bInit = b.initiative + (b === fierroUnit ? Math.floor((Game.stats.agilidad - 10) / 2) : 0);
    return bInit - aInit;
  });
}

function renderTurnOrder() {
  const bar = document.getElementById("turn-order-bar");
  if (!bar) return;
  if (Game.state !== "COMBAT") {
    bar.classList.add("hidden");
    return;
  }
  bar.classList.remove("hidden");
  bar.innerHTML = "";
  const total = Game.combatQueue.length;
  for (let offset = 0; offset < total; offset++) {
    const index = (Game.activeUnitIndex + offset) % total;
    const unit = Game.combatQueue[index];
    if (!unit || unit.isDead) continue;
    const chip = document.createElement("div");
    chip.className = `turn-order-chip ${unit.faction}${offset === 0 ? " current" : ""}`;
    const initials = unit.name.split(" ").filter(Boolean).slice(0, 2).map(part => part[0]).join("");
    chip.innerHTML = `<span>${initials}</span><span class="chip-init">${unit.initiative}</span>`;
    chip.title = `${unit.name} · Iniciativa ${unit.initiative}`;
    bar.appendChild(chip);
  }
}

function startCombatSequence() {
  if (Game.state === "COMBAT") return;
  Game.state = "COMBAT";
  Game.combatRound = 1;
  Game.combatLock = false;
  Game.waveIndex = 0;
  Game.combatQueue = buildTurnOrder();
  Game.activeUnitIndex = 0;

  document.getElementById("mode-badge").innerText = "COMBATE TÁCTICO POR TURNOS 3D";
  document.getElementById("mode-badge").style.color = "#e74c3c";
  document.getElementById("combat-banner").classList.remove("hidden");
  document.getElementById("btn-end-turn").disabled = false;
  document.getElementById("round-counter").innerText = "RONDA 1";

  addCombatLog("<strong>¡INICIA EL COMBATE TÁCTICO 3D!</strong> Iniciativa calculada por Agilidad y pericias.", "crit");
  const objective = Game.activeLevelData ? Game.activeLevelData.objective : { type: "eliminate" };
  if (objective.type === "survive") {
    addCombatLog(`<strong>Objetivo:</strong> resistir ${objective.rounds} rondas. Los refuerzos enemigos llegarán en oleadas.`, "success");
  }
  renderTurnOrder();
  startCurrentTurn();
}

function handleStatusDeath(unit) {
  if (!unit.isDead) {
    unit.hp = 0;
    unit.die();
    addCombatLog(`<strong>${unit.name}</strong> cae por las heridas y el fuego.`, "crit");
    if (unit.faction === "enemy") awardExperience(30 + Game.currentLevel * 4, "Enemigo neutralizado");
  }
  if (unit === fierroUnit) {
    showDefeat();
    return true;
  }
  if (unit === cruzUnit && !Game.morality.cruzSacrificed) {
    Game.morality.cruzSacrificed = true;
    addCombatLog("¡El Sargento Cruz ha caído cubriendo tu espalda!", "crit");
  }
  return false;
}

function startCurrentTurn() {
  if (Game.state !== "COMBAT" || Game.combatLock) return;
  const currentUnit = Game.combatQueue[Game.activeUnitIndex];
  if (!currentUnit || currentUnit.isDead) {
    nextTurn();
    return;
  }

  currentUnit.clearTransientStates();
  currentUnit.ap = currentUnit.maxAp;
  if (currentUnit === fierroUnit && Game.combatRound === 1 && hasPerk("sangre_fria")) {
    currentUnit.ap += 1;
  }
  if (currentUnit === fierroUnit && hasPerk("baqueano") && Game.combatRound % 3 === 0) {
    currentUnit.ap += 1;
    addCombatLog("Baqueano del Salitral: conocés el terreno y ganás 1 AP extra esta ronda.", "success");
  }
  if (currentUnit.immobilized) {
    currentUnit.rooted = true;
    currentUnit.immobilized = false;
    addCombatLog(`<strong>${currentUnit.name}</strong> se desata de las boleadoras, pero pierde el movimiento este turno.`, "normal");
  }

  const statusResult = currentUnit.tickStatuses();
  if (statusResult.damage > 0) {
    currentUnit.hp = Math.max(0, currentUnit.hp - statusResult.damage);
    spawnDamageNumber(currentUnit, `-${statusResult.damage}`, "status");
    addCombatLog(`<strong>${currentUnit.name}</strong> sufre ${statusResult.damage} de daño por ${statusResult.summary.join(", ")}.`, "crit");
    if (currentUnit.hp <= 0) {
      if (handleStatusDeath(currentUnit)) return;
      setTimeout(() => nextTurn(), 900);
      return;
    }
  }

  if (applyHazardDamage(currentUnit)) {
    if (currentUnit.hp <= 0) {
      if (handleStatusDeath(currentUnit)) return;
      setTimeout(() => nextTurn(), 900);
      return;
    }
  }

  if (statusResult.skipTurn) {
    const banner = document.getElementById("turn-owner-text");
    banner.innerText = `TURNO PERDIDO (${currentUnit.name.toUpperCase()})`;
    banner.style.color = "#9b59b6";
    currentUnit.setIntent("ATURDIDO");
    addCombatLog(`<strong>${currentUnit.name}</strong> está aturdido y pierde el turno.`, "normal");
    updateHUD();
    renderTurnOrder();
    setTimeout(() => nextTurn(), 900);
    return;
  }

  const allActive = [fierroUnit, cruzUnit, ...Game.levelUnits];
  allActive.forEach(u => {
    if (u.selectionRing) u.selectionRing.visible = (u === currentUnit);
  });

  const banner = document.getElementById("turn-owner-text");

  if (currentUnit.faction === "player") {
    banner.innerText = "TU TURNO (MARTÍN FIERRO)";
    banner.style.color = "#f5b041";
    document.getElementById("card-fierro").classList.add("active");
    document.getElementById("card-cruz").classList.remove("active");
    document.getElementById("btn-end-turn").disabled = false;
    addCombatLog(`Es el turno de <strong>${currentUnit.name}</strong> (${currentUnit.ap} AP disponibles).`);
  } else if (currentUnit.faction === "ally") {
    banner.innerText = "TU TURNO (SARGENTO CRUZ)";
    banner.style.color = "#5dade2";
    document.getElementById("card-cruz").classList.add("active");
    document.getElementById("card-fierro").classList.remove("active");
    document.getElementById("btn-end-turn").disabled = false;
    addCombatLog(`Turno del compañero <strong>${currentUnit.name}</strong> (${currentUnit.ap} AP).`);
  } else {
    banner.innerText = `TURNO ENEMIGO (${currentUnit.name.toUpperCase()})`;
    banner.style.color = "#e74c3c";
    document.getElementById("card-fierro").classList.remove("active");
    document.getElementById("card-cruz").classList.remove("active");
    document.getElementById("btn-end-turn").disabled = true;
    const target = getClosestTarget(currentUnit);
    if (target) {
      const dist = Math.hypot(target.gridX - currentUnit.gridX, target.gridY - currentUnit.gridY);
      currentUnit.setIntent(currentUnit.archetype === "musketeer" && dist <= getShootRange(currentUnit) ? "DISPARAR" : "AVANZAR");
    }
    setTimeout(() => executeEnemyAI(currentUnit), 780);
  }

  updateHUD();
  renderTurnOrder();
  updateObjectiveUI();
  updateTacticalRangeDisplay();
}

function nextTurn() {
  if (Game.state !== "COMBAT" || Game.combatLock) return;
  if (checkCombatResolution()) return;

  Game.activeUnitIndex++;
  if (Game.activeUnitIndex >= Game.combatQueue.length) {
    endCombatRound();
  } else {
    startCurrentTurn();
  }
}

function endCombatRound() {
  if (Game.state !== "COMBAT" || Game.combatLock) return;
  const objective = Game.activeLevelData ? Game.activeLevelData.objective : { type: "eliminate" };

  if (objective.type === "survive" && Game.combatRound >= objective.rounds) {
    completeCombatVictory("Resististe el vado hasta que bajó la crecida");
    return;
  }

  Game.combatRound++;
  document.getElementById("round-counter").innerText = `RONDA ${Game.combatRound}`;
  addCombatLog(`<strong>Ronda ${Game.combatRound}</strong> — la pólvora vuelve a cargarse.`, "normal");

  // Avanzar peligros de fuego
  Game.hazards.forEach(h => {
    if (h.turnsLeft < 90) h.turnsLeft--;
    if (h.turnsLeft <= 0) h.group.visible = false;
  });

  spawnWavesForRound(Game.combatRound);

  Game.combatQueue = buildTurnOrder();
  Game.activeUnitIndex = 0;
  renderTurnOrder();
  updateObjectiveUI();
  startCurrentTurn();
}

function spawnWavesForRound(round) {
  const level = Game.activeLevelData;
  if (!level || !level.waves) return;
  level.waves.filter(w => w.round === round).forEach(wave => {
    wave.units.forEach(cfg => {
      let gx = cfg.gridX;
      let gy = cfg.gridY;
      if (isCellBlocked(gx, gy)) {
        const free = findFreeCellNear(gx, gy);
        if (!free) return;
        gx = free.x;
        gy = free.y;
      }
      const unit = new Unit3D(Object.assign({}, cfg, { gridX: gx, gridY: gy }));
      unit.statuses = {};
      unit.hp = unit.maxHp;
      Game.levelUnits.push(unit);
      scene.add(unit.mesh);
      unit.attachOverlay();
      addCombatLog(`<strong>¡Refuerzos enemigos!</strong> ${unit.name} entra en la refriega.`, "crit");
    });
  });
  showToast("¡Llegan refuerzos enemigos!", "warning");
  audio.playWarning();
}

function findFreeCellNear(gx, gy) {
  for (let radius = 1; radius <= 5; radius++) {
    for (let dx = -radius; dx <= radius; dx++) {
      for (let dy = -radius; dy <= radius; dy++) {
        const x = gx + dx;
        const y = gy + dy;
        if (x < 0 || x >= GRID_COLS || y < 0 || y >= GRID_ROWS) continue;
        if (!isCellBlocked(x, y)) return { x, y };
      }
    }
  }
  return null;
}

function getClosestTarget(unit) {
  return [fierroUnit, cruzUnit]
    .filter(t => !t.isDead)
    .sort((a, b) => {
      const da = Math.hypot(a.gridX - unit.gridX, a.gridY - unit.gridY);
      const db = Math.hypot(b.gridX - unit.gridX, b.gridY - unit.gridY);
      return da - db;
    })[0] || null;
}

function checkCombatResolution() {
  const objective = Game.activeLevelData ? Game.activeLevelData.objective : { type: "eliminate" };

  if (fierroUnit.isDead) {
    showDefeat();
    return true;
  }

  const enemiesAlive = Game.levelUnits.filter(u => u.faction === "enemy" && !u.isDead);
  if (cruzUnit.isDead && !Game.morality.cruzSacrificed) {
    Game.morality.cruzSacrificed = true;
    addCombatLog("¡El Sargento Cruz ha caído cubriendo tu espalda!", "crit");
  }

  if (objective.type === "investigate") {
    if (enemiesAlive.length === 0) {
      const escribano = Game.levelUnits.find(u => u.id === "escribano");
      if (escribano && escribano.isDead) {
        completeCombatVictory("La verdad se impuso por la fuerza y el escribano cayó");
        return true;
      }
      returnToExploration();
      return true;
    }
    return false;
  }

  if (objective.type === "survive") {
    return false;
  }

  if (enemiesAlive.length === 0) {
    completeCombatVictory("La partida enemiga fue derrotada");
    return true;
  }
  return false;
}

function returnToExploration() {
  Game.combatLock = false;
  Game.state = "EXPLORATION";
  Game.combatQueue = [];
  document.getElementById("combat-banner").classList.add("hidden");
  document.getElementById("turn-order-bar").classList.add("hidden");
  document.getElementById("btn-end-turn").disabled = true;
  document.getElementById("mode-badge").innerText = "EXPLORACIÓN LIBRE 3D";
  document.getElementById("mode-badge").style.color = "#f39c12";
  document.querySelectorAll(".character-card").forEach(c => c.classList.remove("active"));
  updateHUD();
  updateObjectiveUI();
  addCombatLog("El ruido de la refriega se apaga. Podés seguir investigando.", "success");
}

function completeCombatVictory(reason) {
  if (Game.combatLock) return;
  Game.combatLock = true;
  Game.morality.combatWins++;
  addCombatLog(`<strong>${reason}.</strong>`, "success");
  showToast("¡Victoria! La frontera queda en silencio.", "success");
  audio.playLevelUp();
  if (hasPerk("segundo_aliento")) {
    fierroUnit.hp = Math.min(fierroUnit.maxHp, fierroUnit.hp + 20);
    addCombatLog("Segundo Aliento: recuperás 20 HP tras el combate.", "success");
  }
  setTimeout(() => {
    if (Game.state === "COMBAT") onLevelCompleted();
  }, 950);
}

async function executeEnemyAI(unit) {
  if (Game.state !== "COMBAT" || Game.combatLock || unit.isDead) return;
  await wait(520);
  if (Game.state !== "COMBAT" || Game.combatLock || unit.isDead) return;

  let target = getClosestTarget(unit);
  if (!target) return;

  // Los jefes arengan a su tropa una vez por combate.
  if (unit.archetype === "boss" && !unit.usedRally) {
    unit.usedRally = true;
    const allies = Game.levelUnits.filter(u => u.faction === "enemy" && !u.isDead);
    allies.forEach(ally => ally.addStatus("inspired", 3));
    addCombatLog(`<strong>${unit.name}</strong> arenga a su tropa: los enemigos quedan inspirados.`, "crit");
    showToast("¡El Coronel arenga a sus soldados!", "warning");
    audio.playWarning();
    unit.setIntent("ARENGA");
    await wait(700);
    if (Game.state !== "COMBAT") return;
  }

  let actions = 0;
  while (unit.ap > 0 && actions < 4 && Game.state === "COMBAT" && !Game.combatLock && !unit.isDead) {
    actions++;
    target = getClosestTarget(unit);
    if (!target) break;
    const dist = Math.hypot(target.gridX - unit.gridX, target.gridY - unit.gridY);
    const canShoot = (unit.archetype === "musketeer" || unit.archetype === "raider" || unit.archetype === "boss") && hasLineOfSight(unit.gridX, unit.gridY, target.gridX, target.gridY);

    if (canShoot && dist <= getShootRange(unit) && dist > 1.5 && unit.ap >= 2) {
      performAttack(unit, target, "shoot", { enemy: true });
      await wait(650);
      break;
    }

    if (dist <= 1.5 && unit.ap >= 2) {
      performAttack(unit, target, "facon", { enemy: true });
      await wait(650);
      break;
    }

    if (unit.rooted) {
      addCombatLog(`<strong>${unit.name}</strong> forcejea con las boleadoras y no puede avanzar.`, "normal");
      break;
    }

    if (unit.ap < 1) break;
    const step = findPathStep(unit.gridX, unit.gridY, target.gridX, target.gridY, unit);
    if (!step) break;
    unit.moveTo(step.x, step.y);
    unit.ap -= 1;
    updateHUD();
    await wait(340);
    if (isHazardAt(step.x, step.y)) {
      applyHazardDamage(unit);
      if (unit.hp <= 0) {
        if (handleStatusDeath(unit)) return;
        break;
      }
    }
    triggerOverwatch(unit);
    if (unit.isDead) break;
    if (fierroUnit.isDead) {
      showDefeat();
      return;
    }
  }

  if (Game.state !== "COMBAT" || Game.combatLock) return;
  updateHUD();
  updateObjectiveUI();
  await wait(480);
  if (Game.state === "COMBAT" && !Game.combatLock) nextTurn();
}

function findPathStep(fromX, fromY, toX, toY, unit) {
  const directions = [{ x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }];
  const queue = [{ x: fromX, y: fromY, first: null }];
  const visited = new Set([`${fromX},${fromY}`]);

  while (queue.length > 0) {
    const node = queue.shift();
    if (Math.hypot(node.x - toX, node.y - toY) <= 1.5 && node.first) return node.first;
    if (Math.hypot(node.x - toX, node.y - toY) <= 1.5 && !node.first) {
      // Ya está en rango; no necesita moverse.
      return null;
    }
    for (const dir of directions) {
      const nx = node.x + dir.x;
      const ny = node.y + dir.y;
      const key = `${nx},${ny}`;
      if (visited.has(key)) continue;
      if (isCellBlocked(nx, ny, unit)) continue;
      visited.add(key);
      queue.push({ x: nx, y: ny, first: node.first || { x: nx, y: ny } });
    }
  }
  return null;
}

function triggerOverwatch(movedUnit) {
  if (Game.state !== "COMBAT" || movedUnit.isDead) return;
  const guards = [fierroUnit, cruzUnit].filter(u => !u.isDead && u.overwatch);
  for (const guard of guards) {
    const dist = Math.hypot(movedUnit.gridX - guard.gridX, movedUnit.gridY - guard.gridY);
    if (dist <= getShootRange(guard) && hasLineOfSight(guard.gridX, guard.gridY, movedUnit.gridX, movedUnit.gridY)) {
      guard.overwatch = false;
      guard.updateOverlay();
      addCombatLog(`<strong>¡Vigilancia de ${guard.name}!</strong> Disparo de reacción contra ${movedUnit.name}.`, "success");
      performAttack(guard, movedUnit, "shoot", { free: true, overwatch: true });
      if (movedUnit.isDead) break;
    }
  }
}

// -----------------------------------------------------------------------------
// 10. ATAQUES, BOLEADORAS Y DAÑO
// -----------------------------------------------------------------------------
function performAttack(attacker, target, type, options = {}) {
  if (!target || target.isDead) return false;
  const cost = type === "payada" ? 1 : 2;
  if (!options.free && attacker.ap < cost) {
    addCombatLog("¡No tienes suficientes Puntos de Acción (AP)!", "crit");
    return false;
  }

  const dist = Math.hypot(target.gridX - attacker.gridX, target.gridY - attacker.gridY);
  const isPlayerSide = attacker.faction === "player" || attacker.faction === "ally";

  if (type === "facon") {
    if (dist > 1.5) {
      addCombatLog("¡Demasiado lejos para el facón!", "crit");
      return false;
    }
    if (!options.free) attacker.ap -= cost;

    audio.playFaconSlash();
    attacker.playModelAction("slash");
    attacker.bodyMesh.rotation.x = -0.5;
    setTimeout(() => { attacker.bodyMesh.rotation.x = 0; }, 250);

    const weaponBonus = isPlayerSide ? Game.progression.weapons.facon * 6 : 0;
    const strengthBonus = attacker === fierroUnit ? Math.floor((Game.stats.fuerza - 10) / 2) : 0;
    let damage = Math.floor(Math.random() * 12) + 23 + weaponBonus + strengthBonus + attacker.damageBonus;
    if (attacker === fierroUnit && hasPerk("mano_fierro")) damage = Math.floor(damage * 1.2);

    const alliesAdjacent = [fierroUnit, cruzUnit].filter(u => u !== attacker && !u.isDead && Math.hypot(u.gridX - target.gridX, u.gridY - target.gridY) <= 1.5);
    if (alliesAdjacent.length > 0) {
      damage = Math.floor(damage * 1.25);
      addCombatLog(`<strong>¡Flanqueo!</strong> ${attacker.name} ataca mientras ${target.name} está trabado.`, "success");
    }

    const critical = Math.random() < (attacker === fierroUnit && hasPerk("mano_fierro") ? 0.2 : 0.08);
    if (critical) {
      damage = Math.floor(damage * 1.6);
      addCombatLog("¡GOLPE CRÍTICO DEL FACÓN!", "crit");
    }

    damage = Math.floor(damage * attacker.getDamageModifier());
    if (target.ponchoGuarded) {
      damage = Math.floor(damage * 0.55);
      addCombatLog(`<strong>${target.name}</strong> amortigua con el poncho.`);
    }
    if (target === fierroUnit && hasPerk("cuero_duro")) damage = Math.floor(damage * 0.9);

    target.hp = Math.max(0, target.hp - damage);
    target.flash(0xff6644);
    spawnDamageNumber(target, `-${damage}`, critical ? "crit" : "");
    addCombatLog(`<strong>${attacker.name}</strong> acierta un corte de facón a <strong>${target.name}</strong> por <span style="color:#e74c3c">-${damage} HP</span>.`, "crit");

  } else if (type === "shoot") {
    if (isPlayerSide) {
      if (Game.inventory.ammo <= 0) {
        addCombatLog("¡Te quedaste sin munición de trabuco!", "crit");
        return false;
      }
      if (!hasLineOfSight(attacker.gridX, attacker.gridY, target.gridX, target.gridY)) {
        addCombatLog("¡La cobertura bloquea la línea de tiro! Buscá otro ángulo.", "crit");
        return false;
      }
      Game.inventory.ammo--;
    }
    if (!options.free) attacker.ap -= cost;

    audio.playGunshot();
    attacker.playModelAction("slash");
    const gunFlash = new THREE.PointLight(0xffeedd, 5.0, 8);
    gunFlash.position.copy(attacker.mesh.position).add(new THREE.Vector3(0, 1.2, 0));
    scene.add(gunFlash);
    setTimeout(() => scene.remove(gunFlash), 80);
    spawnTracer(attacker, target);

    const cover = target.hasStatus("exposed") ? COVER.NONE : getCoverAt(target.gridX, target.gridY);
    const hitChance = getHitChance(attacker, target);
    if (Math.random() <= hitChance) {
      const weaponBonus = isPlayerSide ? Game.progression.weapons.trabuco * 6 : 0;
      let damage = Math.floor(Math.random() * 15) + 28 + weaponBonus + attacker.damageBonus;
      if (attacker === fierroUnit && hasPerk("cazador") && target.hp < target.maxHp * 0.5) {
        damage = Math.floor(damage * 1.25);
        addCombatLog("Cazador de Matreros: el disparo remata a la presa herida.", "success");
      }
      damage = Math.floor(damage * attacker.getDamageModifier());
      if (target.ponchoGuarded) damage = Math.floor(damage * 0.55);
      if (target === fierroUnit && hasPerk("cuero_duro")) damage = Math.floor(damage * 0.9);
      target.hp = Math.max(0, target.hp - damage);
      target.flash(0xff6644);
      spawnDamageNumber(target, `-${damage}`, "");
      addCombatLog(`¡DISPARO CERTERO! <strong>${attacker.name}</strong> impacta a <strong>${target.name}</strong> por <span style="color:#e74c3c">-${damage} HP</span>.`, "crit");
    } else {
      spawnDamageNumber(target, "FALLO", "miss");
      const coverText = cover === COVER.HALF ? "contra la cobertura" : cover === COVER.FULL ? "contra el parapeto" : "al aire";
      addCombatLog(`El disparo de <strong>${attacker.name}</strong> se pierde ${coverText}.`, "normal");
    }
  } else if (type === "bolas") {
    if (dist > 4.5) {
      addCombatLog("¡Excede el alcance de tiro de boleadoras!", "crit");
      return false;
    }
    if (!options.free) attacker.ap -= cost;

    audio.playBolas();
    attacker.playModelAction("slash");
    if (target.statusResist > 0 && Math.random() < target.statusResist) {
      addCombatLog(`<strong>${target.name}</strong> esquiva las boleadoras con un salto.`, "normal");
      spawnDamageNumber(target, "ESQUIVA", "miss");
    } else {
      target.immobilized = true;
      target.addStatus("exposed", 2);
      spawnDamageNumber(target, "INMOVILIZADO", "status");
      addCombatLog(`¡BOLEADORAS! Las tres marías inmovilizan a <strong>${target.name}</strong> por 1 turno y lo dejan expuesto.`, "success");
    }
  } else if (type === "payada") {
    if (dist > 5) {
      addCombatLog("¡El viento se lleva tu copla! Acercate para que te escuchen.", "crit");
      return false;
    }
    if (!options.free) attacker.ap -= cost;
    audio.playChord([220, 277.18, 329.63, 440]);

    const charisma = attacker === fierroUnit ? Game.stats.carisma : 12;
    const statMod = Math.floor((charisma - 10) / 2);
    const roll = Math.floor(Math.random() * 20) + 1;
    const total = roll + statMod + (attacker === fierroUnit && hasPerk("payador") ? 3 : 0);
    if (total >= 13) {
      target.addStatus("marked", 2);
      target.addStatus("demoralized", attacker === fierroUnit && hasPerk("payador") ? 4 : 2);
      spawnDamageNumber(target, "MARCADO", "status");
      addCombatLog(`<strong>¡Payada certera!</strong> ${attacker.name} canta una copla que deja a <strong>${target.name}</strong> marcado y desmoralizado. (${roll} + ${statMod} = ${total})`, "success");
      if (attacker === fierroUnit) Game.morality.payadaWon = true;
    } else {
      spawnDamageNumber(target, "SORDO", "miss");
      addCombatLog(`La copla de <strong>${attacker.name}</strong> no encuentra eco. (${roll} + ${statMod} = ${total} vs 13)`, "normal");
    }
  }

  if (target.hp <= 0 && !target.isDead) {
    target.hp = 0;
    target.die();
    addCombatLog(`<strong>${target.name}</strong> ha caído en la pampa.`, "crit");
    if (target.faction === "enemy") {
      awardExperience(35 + Game.currentLevel * 3, `Victoria sobre ${target.name}`);
      dropLoot(target);
      if (target.isBoss) triggerBossPhase(target);
    }
    if (target === fierroUnit) {
      showDefeat();
      return true;
    }
    if (target === cruzUnit && !Game.morality.cruzSacrificed) {
      Game.morality.cruzSacrificed = true;
      addCombatLog("¡El Sargento Cruz ha caído cubriendo tu espalda!", "crit");
    }
  } else {
    triggerBossPhase(target);
  }

  updateHUD();
  updateObjectiveUI();
  updateTacticalRangeDisplay();
  if (target.faction === "enemy" && target.isDead) {
    checkCombatResolution();
  }
  return true;
}

function triggerBossPhase(boss) {
  if (!boss.isBoss || boss.isDead) return;
  if (boss.hp <= boss.maxHp * 0.5 && !boss.phase2) {
    boss.phase2 = true;
    boss.addStatus("inspired", 4);
    addCombatLog(`<strong>¡${boss.name} ruge y llama a la última guardia!</strong>`, "crit");
    showToast("¡El Coronel llama a la última guardia!", "warning");
    audio.playWarning();
    const spawns = [
      { id: `bossguard_${Date.now()}_a`, name: "Guardia de Lagos", faction: "enemy", maxHp: 75, role: "Guardia de élite", archetype: "brute", initiative: 12, damageBonus: 3 },
      { id: `bossguard_${Date.now()}_b`, name: "Fusilero de la reserva", faction: "enemy", maxHp: 65, role: "Guardia de élite", archetype: "musketeer", initiative: 11 }
    ];
    spawns.forEach((cfg, index) => {
      const near = findFreeCellNear(17 + index, 8);
      if (!near) return;
      const unit = new Unit3D(Object.assign({}, cfg, { gridX: near.x, gridY: near.y }));
      Game.levelUnits.push(unit);
      scene.add(unit.mesh);
      unit.attachOverlay();
      if (Game.state === "COMBAT") Game.combatQueue.push(unit);
    });
  }
  if (boss.hp <= boss.maxHp * 0.25 && !boss.phase3) {
    boss.phase3 = true;
    boss.damageBonus += 4;
    boss.addStatus("inspired", 10);
    addCombatLog(`<strong>${boss.name} está acorralado y pelea como un desesperado.</strong>`, "crit");
    showToast("¡El Coronel está acorralado!", "warning");
  }
}

function dropLoot(unit) {
  const loot = unit.loot || (unit.isBoss
    ? { ammo: 4, scrap: 2, drinks: 1 }
    : { ammo: Math.random() < 0.5 ? 1 : 0, scrap: Math.random() < 0.35 ? 1 : 0 });
  if (loot.ammo) Game.inventory.ammo += loot.ammo;
  if (loot.drinks) Game.inventory.drinks += loot.drinks;
  if (loot.scrap) Game.progression.scrap += loot.scrap;
  const parts = [];
  if (loot.ammo) parts.push(`${loot.ammo} cartuchos`);
  if (loot.drinks) parts.push(`${loot.drinks} ginebra`);
  if (loot.scrap) parts.push(`${loot.scrap} metal`);
  if (parts.length) {
    addCombatLog(`Botín recuperado: ${parts.join(", ")}.`, "success");
    audio.playLoot();
  }
}

// -----------------------------------------------------------------------------
// 11. ACCIONES DE JUGADOR
// -----------------------------------------------------------------------------
function selectAction(actionKey) {
  Game.selectedAction = actionKey;
  document.querySelectorAll(".action-btn").forEach(b => b.classList.remove("active"));
  const btn = document.getElementById(`btn-act-${actionKey}`);
  if (btn) btn.classList.add("active");

  const currentUnit = Game.combatQueue[Game.activeUnitIndex];
  const isCombatTurn = Game.state === "COMBAT" && currentUnit && (currentUnit.faction === "player" || currentUnit.faction === "ally");

  if (["poncho", "heal", "overwatch", "bandage"].includes(actionKey) && !isCombatTurn) {
    addCombatLog("Esa acción solo puede usarse durante tu turno de combate.", "normal");
    Game.selectedAction = "move";
    return;
  }

  if (actionKey === "poncho") {
    if (currentUnit.ap >= 1) {
      currentUnit.ap -= 1;
      currentUnit.ponchoGuarded = true;
      audio.playChord([293.66, 369.99, 440]);
      addCombatLog(`<strong>${currentUnit.name}</strong> en guardia con el poncho: +25% evasión y menor daño recibido.`, "success");
      updateHUD();
      selectAction("move");
    } else {
      addCombatLog("¡No tienes AP suficiente!", "crit");
    }
  } else if (actionKey === "overwatch") {
    if (currentUnit.ap >= 1 && Game.inventory.ammo > 0) {
      currentUnit.ap -= 1;
      currentUnit.overwatch = true;
      currentUnit.setIntent("VIGILANDO");
      audio.playReload();
      addCombatLog(`<strong>${currentUnit.name}</strong> queda en vigilancia: disparará al primer enemigo que cruce su línea de tiro.`, "success");
      updateHUD();
      selectAction("move");
    } else {
      addCombatLog("Necesitás 1 AP y munición para vigilar.", "crit");
    }
  } else if (actionKey === "bandage") {
    if (Game.inventory.bandages > 0 && currentUnit.ap >= 1) {
      const heal = 24 + Math.floor((Game.stats.supervivencia - 10) / 2) * 2;
      currentUnit.ap -= 1;
      Game.inventory.bandages--;
      currentUnit.hp = Math.min(currentUnit.maxHp, currentUnit.hp + heal);
      spawnDamageNumber(currentUnit, `+${heal}`, "heal");
      audio.playChord([329.63, 440, 523.25]);
      addCombatLog(`<strong>${currentUnit.name}</strong> se venda las heridas: +${heal} HP.`, "success");
      updateHUD();
      selectAction("move");
    } else {
      addCombatLog("No quedan vendas o falta 1 AP.", "crit");
    }
  } else if (actionKey === "heal") {
    if (Game.inventory.drinks > 0 && currentUnit.ap >= 1) {
      currentUnit.ap -= 1;
      Game.inventory.drinks--;
      currentUnit.hp = Math.min(currentUnit.maxHp, currentUnit.hp + 35);
      spawnDamageNumber(currentUnit, "+35", "heal");
      audio.playChord([329.63, 440, 523.25]);
      addCombatLog(`<strong>${currentUnit.name}</strong> bebe caña: recupera 35 HP.`, "success");
      updateHUD();
      selectAction("move");
    } else {
      addCombatLog("No tienes ginebra o falta 1 AP.", "crit");
    }
  } else if (actionKey === "payada") {
    addCombatLog("Elegí un enemigo a menos de 5 casillas para dedicarle la copla.", "normal");
  } else {
    updateTacticalRangeDisplay();
  }

  updateTacticalRangeDisplay();
}

function collectTestimony(id, name) {
  if (Game.testimonies.includes(id)) return;
  Game.testimonies.push(id);
  const required = (Game.activeLevelData && Game.activeLevelData.objective && Game.activeLevelData.objective.required) || 3;
  addCombatLog(`<strong>Testimonio de ${name}.</strong> La verdad del pago suma una prueba más (${Game.testimonies.length}/${required}).`, "success");
  showToast(`Testimonio reunido: ${name} (${Game.testimonies.length}/${required})`, "success");
  audio.playLoot();
  updateObjectiveUI();
  if (Game.testimonies.length >= required) {
    addCombatLog("Ya tenés pruebas suficientes para encarar al Escribano Isidro.", "success");
    showToast("¡Podés confrontar al escribano!", "success");
    document.getElementById("current-quest-step").innerText = "Tenés los tres testimonios. Confrontá al Escribano Isidro o seguí investigando la pulpería.";
  }
}

function forceHostile(...ids) {
  ids.forEach(id => {
    const unit = Game.levelUnits.find(u => u.id === id);
    if (!unit) return;
    unit.faction = "enemy";
    unit.isDead = false;
    unit.hp = unit.maxHp;
    if (unit.overlayEl) {
      unit.overlayEl.classList.remove("neutral");
      unit.overlayEl.classList.add("hostile");
    }
    unit.updateOverlay();
  });
}

function desertEnemyUnit(id, reason) {
  const unit = Game.levelUnits.find(u => u.id === id);
  if (!unit || unit.isDead) return;
  unit.isDead = true;
  unit.detachOverlay();
  scene.remove(unit.mesh);
  addCombatLog(`<strong>${unit.name}</strong> ${reason}.`, "success");
}

function inspireParty(turns = 2) {
  [fierroUnit, cruzUnit].forEach(u => {
    if (!u.isDead) u.addStatus("inspired", turns);
  });
  addCombatLog("El pago entero te acompaña: Fierro y Cruz quedan inspirados (+25% daño).", "success");
}

// -----------------------------------------------------------------------------
// 12. DIÁLOGOS NARRATIVOS Y TIRADAS D20
// -----------------------------------------------------------------------------
const DIALOGUE_NODES = {
  // --- NIVEL 1 ---
  fogon_inspect: {
    speaker: "Fogón de la pulpería",
    role: "Rastros junto al camino",
    avatar: "🔥",
    text: "Entre las cenizas encontrás un papel chamuscado: una lista de nombres para la leva, corregida a mano y sin sello oficial. La partida parece estar reclutando hombres por fuera de la orden escrita.",
    choices: [
      { text: "«Guardar la lista. Puede servir para exigir explicaciones.»", tag: "PRUEBA ENCONTRADA", type: "supervivencia", action: () => {
        Game.morality.foundLevyOrders = true;
        Game.inventory.ammo += 2;
        document.getElementById("current-quest-step").innerText = "Encontraste una lista irregular junto al fogón. Enfrenta al Comandante con la prueba o busca otra salida.";
        updateHUD();
        addCombatLog("La lista de la leva podría darle peso a tus palabras. También encontraste 2 cartuchos.", "success");
        closeDialogue();
      } }
    ]
  },
  pulpero_intro: {
    speaker: "Don Claudio",
    role: "Dueño de la Pulpería",
    avatar: "🧉",
    text: "Gaucho Fierro... qué bueno que llegaste con Cruz. Pero guardá la guitarra: por el bajo viene el Comandante Mayorga con orden de leva para mandarte a servir gratis al fortín.",
    choices: [
      { text: "«¿Cuántos soldados trae esa partida militar?»", tag: "NORMAL", type: "normal", next: "pulpero_details" },
      { text: "«Que vengan nomás. El facón y el trabuco están prontos.»", tag: "INTIMIDACIÓN", type: "intimidacion", loyaltyBonus: 10, next: "pulpero_brave" },
      { text: "«Dame un trago de ginebra y munición Don Claudio.»", tag: "SUPERVIVENCIA", type: "supervivencia", action: () => { Game.inventory.ammo += 3; Game.inventory.drinks += 1; updateHUD(); addCombatLog("¡Don Claudio te entrega 3 cartuchos y 1 botella!", "success"); }, next: "pulpero_ready" }
    ]
  },
  pulpero_details: {
    speaker: "Don Claudio",
    role: "Dueño de la Pulpería",
    avatar: "🧉",
    text: "Vienen tres: el Comandante y dos milicos. Si usás las carretas y los ombúes de cobertura, podés acortarles el tiro.",
    choices: [
      { text: "«Tomaremos posiciones.»", tag: "NORMAL", type: "normal", action: () => { closeDialogue(); startCombatSequence(); } }
    ]
  },
  pulpero_brave: {
    speaker: "Don Claudio",
    role: "Dueño de la Pulpería",
    avatar: "🧉",
    text: "Tenés agallas, Fierro. Pero el plomo no respeta bravuras si te agarran a campo abierto. ¡Ahí vienen!",
    choices: [
      { text: "«¡Desenvainá Cruz, que no nacimos para esclavos!»", tag: "COMBATE", type: "intimidacion", action: () => { closeDialogue(); startCombatSequence(); } }
    ]
  },
  pulpero_ready: {
    speaker: "Don Claudio",
    role: "Dueño de la Pulpería",
    avatar: "🧉",
    text: "¡Salud, gaucho! Ya siento el galope en el bajo... ¡Están aquí!",
    choices: [
      { text: "«A las posiciones de combate.»", tag: "COMBATE", type: "supervivencia", action: () => { closeDialogue(); startCombatSequence(); } }
    ]
  },
  comandante_encounter: {
    speaker: "Comandante Mayorga",
    role: "Partida de la Frontera",
    avatar: "🎖️",
    text: "¡Fierro! Quedás bajo arresto para cumplir servicio forzado en el Fortín San Martín. ¡Tirad los facones al suelo u ordeno fuego!",
    choices: [
      { text: "«Comandante, somos hombres de trabajo libre y no hemos cometido delito alguno.»", tag: "CARISMA (DC 13)", type: "carisma", dc: 13, statKey: "carisma", onSuccess: "comandante_peace", onFail: "comandante_angry" },
      { text: "«Esta lista no tiene sello ni autorización. No puede llevarse a estos hombres.»", tag: "PRUEBA DEL FOGÓN", type: "supervivencia", requires: "foundLevyOrders", action: () => {
        closeDialogue();
        addCombatLog("La prueba de la leva irregular obliga a Mayorga a retirar la partida.", "success");
        Game.morality.diplomaticWins++;
        onLevelCompleted();
      } },
      { text: "«¡Un paso más y el filo de mi facón le enseña respeto a la ley del más fuerte!»", tag: "INTIMIDACIÓN (DC 14)", type: "intimidacion", dc: 14, statKey: "fuerza", loyaltyBonus: 15, onSuccess: "comandante_retreat", onFail: "comandante_angry" },
      { text: "«¡Cruz, a las carretas! ¡De aquí no nos saca ningún milico!»", tag: "COMBATE INMEDIATO", type: "normal", loyaltyBonus: 10, action: () => { closeDialogue(); startCombatSequence(); } }
    ]
  },
  comandante_peace: {
    speaker: "Comandante Mayorga",
    role: "Partida de la Frontera",
    avatar: "🎖️",
    text: "Mmm... hablás con aplomo y firmeza, Fierro. Esta vez los dejaré en paz, pero no se crucen por la línea de fortines.",
    choices: [
      { text: "«Así será. Que tenga buen viaje.»", tag: "RESOLUCIÓN PACÍFICA", type: "carisma", action: () => { closeDialogue(); Game.morality.diplomaticWins++; onLevelCompleted(); } }
    ]
  },
  comandante_retreat: {
    speaker: "Comandante Mayorga",
    role: "Partida de la Frontera",
    avatar: "🎖️",
    text: "¡Malditos bárbaros! Su reputación los precede... No vale la pena morir por un gaucho alzado. ¡Media vuelta, partida!",
    choices: [
      { text: "«Se han marchado. Sigamos adelante, Cruz.»", tag: "INTIMIDACIÓN EXITOSA", type: "intimidacion", action: () => { closeDialogue(); Game.morality.intimidations++; onLevelCompleted(); } }
    ]
  },
  comandante_angry: {
    speaker: "Comandante Mayorga",
    role: "Partida de la Frontera",
    avatar: "🎖️",
    text: "¡Basta de insolencias gauchas! ¡Preparen armas y apunten! ¡FUEGO!",
    choices: [
      { text: "«¡A cubierto! ¡Al combate!»", tag: "INICIAR COMBATE", type: "normal", action: () => { closeDialogue(); startCombatSequence(); } }
    ]
  },

  journey_to_cañadon: {
    speaker: "Sargento Cruz",
    role: "Camino al Cañadón",
    avatar: "🐎",
    text: "La noche se estira sobre la llanura. Cruz cabalga en silencio hasta que el resplandor de la pulpería desaparece. «Yo también tuve un rancho, Fierro. Me fui cuando entendí que la leva no iba a dejarme volver a él». Por primera vez, habla de lo que perdió al desertar.",
    choices: [
      { text: "«Ninguno de los dos va a volver a obedecer una orden injusta.»", tag: "HERMANOS DE CAMINO", type: "carisma", action: () => {
        Game.cruzLoyalty = Math.min(100, Game.cruzLoyalty + 10);
        updateHUD();
        continueJourney(2);
      } },
      { text: "«Guardemos fuerzas. El cañadón nos espera al amanecer.»", tag: "SEGUIR LA MARCHA", type: "supervivencia", action: () => continueJourney(2) }
    ]
  },
  journey_to_fortin: {
    speaker: "Sargento Cruz",
    role: "Víspera del Fortín",
    avatar: "🐎",
    text: () => Game.morality.savedPicardia
      ? "Picardía arrima unos mates al fogón. «Si salimos de esta, voy a contar que una vez tres gauchos le hicieron frente a un fortín entero». Cruz sonríe apenas, pero enseguida mira hacia las luces del puesto militar."
      : "Cruz observa las luces del fortín desde la loma. «Ahí adentro me enseñaron a marchar y a no preguntar. Si mañana me ves dudar, acordate de quiénes somos ahora». La voz se le quiebra un instante y vuelve a endurecerse.",
    choices: [
      { text: "«Mañana decidimos juntos. Como hermanos.»", tag: "AFIANZAR LA HERMANDAD", type: "carisma", action: () => {
        Game.cruzLoyalty = Math.min(100, Game.cruzLoyalty + 10);
        updateHUD();
        continueJourney(3);
      } },
      { text: "«Descansá. Al alba cruzamos la empalizada.»", tag: "PREPARARSE PARA EL ASALTO", type: "normal", action: () => continueJourney(3) },
      { text: "«Picardía, contanos por dónde se puede entrar sin que nos vean.»", tag: "AYUDA DE PICARDÍA", type: "supervivencia", requires: "savedPicardia", action: () => {
        Game.inventory.ammo += 2;
        updateHUD();
        addCombatLog("Picardía señala un paso protegido y te entrega 2 cartuchos.", "success");
        continueJourney(3);
      } }
    ]
  },
  journey_to_salitral: {
    speaker: "Sargento Cruz",
    role: "A la salida del Fortín",
    avatar: "🐎",
    text: "La guarnición quedó atrás, pero las luces del fortín siguen a sus espaldas. Cruz señala una franja blanca bajo la luna: el salitral. «Si seguimos las huellas viejas, los rastreadores no van a encontrarnos. Necesitamos a alguien que conozca ese suelo».",
    choices: [
      { text: "«Sigamos las huellas. Confío en tu ojo, Cruz.»", tag: "RUMBO AL SALITRAL", type: "supervivencia", action: () => continueJourney(4) },
      { text: "«Si nos persiguen, esta vez no nos separan.»", tag: "HERMANOS DE CAMINO", type: "carisma", action: () => {
        Game.cruzLoyalty = Math.min(100, Game.cruzLoyalty + 10);
        updateHUD();
        continueJourney(4);
      } }
    ]
  },
  journey_to_tapera: {
    speaker: "Mora, baqueana",
    role: "Camino de regreso al pago",
    avatar: "🧭",
    text: "Mora se detiene ante una huella casi borrada. «El camino del norte lleva a la tapera de Fierro. Dicen que un estanciero se quedó con esas tierras cuando mandaron a los hombres al fortín». Cruz mira a Martín: el regreso ya no es una promesa lejana.",
    choices: [
      { text: "«Volvemos por lo nuestro. Que esta vez nos escuchen.»", tag: "VOLVER A LA TAPERA", type: "carisma", action: () => continueJourney(5) },
      { text: "«Primero vamos a sacar a su gente del medio.»", tag: "PLAN DE RESCATE", type: "supervivencia", action: () => {
        Game.inventory.drinks += 1;
        updateHUD();
        addCombatLog("Mora te entrega una botella para el último tramo.", "success");
        continueJourney(5);
      } }
    ]
  },

  // --- NIVEL 2: CAÑADÓN DE LOS CUATREROS ---
  baigorria_intro: {
    speaker: "El Pardo Baigorria",
    role: "Líder de Cuatreros del Monte",
    avatar: "🤠",
    text: "¡Alto ahí, forasteros! Nadie cruza el cañadón del monte sin pagar peaje al Pardo Baigorria. ¿Qué pilchas o pólvora traen?",
    choices: [
      { text: "«Soy Martín Fierro, y este es el Sargento Cruz. Buscamos paso libre al desierto.»", tag: "CARISMA (DC 13)", type: "carisma", dc: 13, statKey: "carisma", onSuccess: "baigorria_respect", onFail: "baigorria_fight" },
      { text: "«Conocemos cada rastro de este monte. Si nos unimos, podemos cruzar la frontera juntos.»", tag: "SUPERVIVENCIA (DC 12)", type: "supervivencia", dc: 12, statKey: "supervivencia", loyaltyBonus: 10, onSuccess: "baigorria_ally", onFail: "baigorria_fight" },
      { text: "«No le pago peaje a nadie. O abres el paso o hablamos con el acero.»", tag: "DESAFÍO TÁCTICO", type: "intimidacion", action: () => { closeDialogue(); startCombatSequence(); } }
    ]
  },
  baigorria_respect: {
    speaker: "El Pardo Baigorria",
    role: "Líder de Cuatreros del Monte",
    avatar: "🤠",
    text: "¡Martín Fierro! He oído las payadas que cuentan tus cantos. Un gaucho de ley no paga peaje en mi campamento. Pasen y llévense municiones.",
    choices: [
      { text: "«Liberen a ese muchacho atado y sellamos la amistad.»", tag: "RESCATAR PICARDÍA", type: "carisma", action: () => { Game.morality.savedPicardia = true; Game.inventory.ammo += 4; closeDialogue(); Game.morality.diplomaticWins++; onLevelCompleted(); } }
    ]
  },
  baigorria_ally: {
    speaker: "El Pardo Baigorria",
    role: "Líder de Cuatreros del Monte",
    avatar: "🤠",
    text: "Tenés buen ojo baqueano, Fierro. La partida del fortín también me persigue. Tomen este atajo por la cañada y llévense a Picardía.",
    choices: [
      { text: "«Gracias amigo. Marchamos hacia el Fortín.»", tag: "ALIANZA FRONTERIZA", type: "supervivencia", action: () => { Game.morality.savedPicardia = true; closeDialogue(); Game.morality.diplomaticWins++; onLevelCompleted(); } }
    ]
  },
  baigorria_fight: {
    speaker: "El Pardo Baigorria",
    role: "Líder de Cuatreros del Monte",
    avatar: "🤠",
    text: "¡Nadie me da órdenes en mi propio cañadón! ¡Muchachos, a las armas!",
    choices: [
      { text: "«¡A las rocas, Cruz!»", tag: "COMBATE", type: "normal", action: () => { closeDialogue(); startCombatSequence(); } }
    ]
  },
  picardia_free: {
    speaker: "Picardía",
    role: "Gaucho Joven",
    avatar: "🪢",
    text: "¡Gaucho Fierro, don Cruz! Me tenían amarrado por no querer robar hacienda con ellos. ¡Si me desatan, les daré 3 botellas de ginebra y cartuchos!",
    choices: [
      { text: "«Desatar a Picardía.»", tag: "SALVAR PRISIONERO", type: "supervivencia", action: () => { Game.morality.savedPicardia = true; Game.inventory.drinks += 2; Game.inventory.ammo += 3; updateHUD(); addCombatLog("¡Picardía libre te agradece y entrega provisiones!", "success"); closeDialogue(); } }
    ]
  },

  // --- NIVEL 3: EL FORTÍN DE FRONTERA ---
  juez_encounter: {
    speaker: "Juez Don Zoilo",
    role: "Juez de Paz de la Frontera",
    avatar: "⚖️",
    text: "¡Fierro! ¡Desertor Cruz! Han llegado al final del camino. Esta es la línea de fortines de la República. Aquí se somete la barbarie o se paga con la vida.",
    choices: [
      { text: "«Don Zoilo: ha mandado gauchos a morir gratis mientras se quedaba con sus haciendas. ¡Ríndase ante la verdadera justicia!»", tag: "CARISMA (DC 15)", type: "carisma", dc: 15, statKey: "carisma", onSuccess: "juez_law_victory", onFail: "juez_final_fight" },
      { text: "«¡No hay ley en la frontera más que la del corazón gaucho! ¡Cruz, a la carga!»", tag: "COMBATE FINAL", type: "intimidacion", action: () => { closeDialogue(); startCombatSequence(); } },
      { text: "«Cruz... cúbreme mientras forzamos el portón hacia el desierto indígena.»", tag: "PLAN DE HUIDA AL DESIERTO", type: "supervivencia", loyaltyBonus: 20, action: () => { closeDialogue(); startCombatSequence(); } }
    ]
  },
  juez_law_victory: {
    speaker: "Juez Don Zoilo",
    role: "Juez de Paz de la Frontera",
    avatar: "⚖️",
    text: "¡No... los soldados bajan los fusiles! ¡Saben que lo que dices es verdad! La tropa se rehúsa a disparar... ¡Están libres por ley de Dios!",
    choices: [
      { text: "«Se acabó la tiranía en este puesto. Ahora vamos a volver a nuestro pago.»", tag: "SEGUIR EL CAMINO", type: "carisma", action: () => { closeDialogue(); Game.morality.diplomaticWins++; onLevelCompleted(); } }
    ]
  },
  juez_final_fight: {
    speaker: "Juez Don Zoilo",
    role: "Juez de Paz de la Frontera",
    avatar: "⚖️",
    text: "¡Insolentes! ¡Pelotón de garita, fuego a discreción! ¡Que no quede ni uno vivo!",
    choices: [
      { text: "«¡Por la libertad de la pampa!»", tag: "ABRIRSE PASO", type: "normal", action: () => { closeDialogue(); startCombatSequence(); } }
    ]
  },
  mora_intro: {
    speaker: "Mora, baqueana",
    role: "Guía del Salitral",
    avatar: "🧭",
    text: "Mora los espera junto a una carreta volcada. «Los hombres del fortín vienen siguiendo el rastro. Puedo llevarlos por un paso firme, pero no voy a arriesgar el cuero por dos desconocidos».",
    choices: [
      { text: "«Ayudanos a cruzar y no vamos a dejar que te persigan sola.»", tag: "CARISMA (DC 12)", type: "carisma", dc: 12, statKey: "carisma", onSuccess: "mora_ally", onFail: "mora_fight" },
      { text: "«Conozco el rastro de una patrulla. Podemos pasar sin que nos vean.»", tag: "SUPERVIVENCIA (DC 13)", type: "supervivencia", dc: 13, statKey: "supervivencia", onSuccess: "mora_ally", onFail: "mora_fight" },
      { text: "«No hay tiempo para discutir. ¡Cruz, cubrime!»", tag: "COMBATE", type: "intimidacion", action: () => { closeDialogue(); startCombatSequence(); } }
    ]
  },
  mora_ally: {
    speaker: "Mora, baqueana",
    role: "Guía del Salitral",
    avatar: "🧭",
    text: "«Bien. Al amanecer los rastreadores van a buscar nuestras huellas en el bajo, mientras nosotros cruzamos por la piedra». Mora comparte una botella y los guía al otro lado del salitral.",
    choices: [
      { text: "«Te debemos una. El camino al pago sigue abierto.»", tag: "CRUZAR EN PAZ", type: "supervivencia", action: () => {
        closeDialogue();
        Game.inventory.drinks += 1;
        Game.morality.diplomaticWins++;
        updateHUD();
        onLevelCompleted();
      } }
    ]
  },
  mora_fight: {
    speaker: "Mora, baqueana",
    role: "Guía del Salitral",
    avatar: "🧭",
    text: "Mora distingue el uniforme de Cruz y retrocede. Los rastreadores aparecen entre las piedras antes de que nadie pueda explicar nada.",
    choices: [
      { text: "«¡A las rocas! ¡Que no nos cierren el paso!»", tag: "COMBATE", type: "normal", action: () => { closeDialogue(); startCombatSequence(); } }
    ]
  },
  evaristo_encounter: {
    speaker: "Don Evaristo",
    role: "Estanciero de la tapera",
    avatar: "🐎",
    text: "En el patio de la estancia, Don Evaristo reconoce a Fierro. «Tu rancho ya no existe. La tierra es mía por derecho y los hombres armados que ves detrás mío están de acuerdo». Cruz baja la mano hacia el facón; Fierro puede exigir justicia o abrirse paso hasta la tapera.",
    choices: [
      { text: "«La leva no le dio derecho a quedarse con lo que era de mi familia.»", tag: "CARISMA (DC 14)", type: "carisma", dc: 14, statKey: "carisma", onSuccess: "evaristo_peace", onFail: "evaristo_fight" },
      { text: "«Tengo la lista de la leva irregular. El juez va a saber cómo consiguió estas tierras.»", tag: "PRUEBA DE LA PULPERÍA", type: "supervivencia", requires: "foundLevyOrders", action: () => {
        closeDialogue();
        Game.morality.diplomaticWins++;
        addCombatLog("La prueba del fogón relaciona la leva con el despojo de la tapera.", "success");
        onLevelCompleted();
      } },
      { text: "«Cruz, saquemos a su guardia del medio.»", tag: "DUELO FINAL", type: "intimidacion", action: () => { closeDialogue(); startCombatSequence(); } }
    ]
  },
  evaristo_peace: {
    speaker: "Don Evaristo",
    role: "Estanciero de la tapera",
    avatar: "🐎",
    text: "La gente del pago se reúne en el patio. Al verlos, varios peones cuentan que la tierra fue tomada mientras Fierro cumplía la leva. Don Evaristo pierde el apoyo de su guardia y entrega los papeles del rancho.",
    choices: [
      { text: "«La tierra vuelve a quienes la trabajan.»", tag: "RESOLUCIÓN PACÍFICA", type: "carisma", action: () => {
        closeDialogue();
        Game.morality.diplomaticWins++;
        onLevelCompleted();
      } }
    ]
  },
  evaristo_fight: {
    speaker: "Don Evaristo",
    role: "Estanciero de la tapera",
    avatar: "🐎",
    text: "«¡Que nadie salga del patio!». La guardia cierra filas frente a la casa.",
    choices: [
      { text: "«¡Por el pago y por los que no volvieron!»", tag: "COMBATE FINAL", type: "normal", action: () => { closeDialogue(); startCombatSequence(); } }
    ]
  },

  // --- VIAJES HACIA LOS NUEVOS CAPÍTULOS ---
  journey_to_vado: {
    speaker: "Sargento Cruz",
    role: "Camino al Río Salado",
    avatar: "🐎",
    text: "La tapera queda atrás con las puertas abiertas y el patio lleno de gente que volvió a llamarla propia. Pero la lluvia arrecia sobre el camino del sur: en el vado del Río Salado, una carreta de colonos está atascada y la partida de Ferreyra avanza con la crecida.",
    choices: [
      { text: "«No hay tierra libre si dejamos que se ahogue gente en el camino.»", tag: "RUMBO AL VADO", type: "carisma", action: () => {
        Game.cruzLoyalty = Math.min(100, Game.cruzLoyalty + 10);
        updateHUD();
        continueJourney(6);
      } },
      { text: "«Ensillá. Si hay que pelear en el barro, mejor llegar temprano.»", tag: "MARCHAR", type: "supervivencia", action: () => continueJourney(6) }
    ]
  },
  journey_to_payada: {
    speaker: "Mora, baqueana",
    role: "Pulpería del Clavel Colorado",
    avatar: "🧭",
    text: "El vado quedó atrás y los colonos cruzan el río cantando bajito. Mora les señala una luz en el camino: «La pulpería del Clavel Colorado. Ahí se junta el pago a cantar, y dicen que el escribano que movió los papeles de la tapera duerme con una copa de ginebra al lado».",
    choices: [
      { text: "«Entremos sin llamar la atención. Primero se escucha, después se canta.»", tag: "INVESTIGAR", type: "supervivencia", action: () => continueJourney(7) },
      { text: "«Esta noche la verdad se canta delante de todos.»", tag: "PAYADA", type: "carisma", action: () => {
        Game.cruzLoyalty = Math.min(100, Game.cruzLoyalty + 5);
        updateHUD();
        continueJourney(7);
      } }
    ]
  },
  journey_to_ultimo: {
    speaker: "Sargento Cruz",
    role: "Víspera del Fortín San Martín",
    avatar: "🐎",
    text: "Los testimonios viajan envueltos en cuero y la pulpería arde de rumores. Cruz mira las luces del Fortín San Martín sobre la loma: «Lagos no va a entregar la frontera sin pelear. Si esta es la última copla, que la escuche todo el pago».",
    choices: [
      { text: "«Entramos juntos. Ni un paso atrás.»", tag: "HERMANDAD", type: "carisma", action: () => {
        Game.cruzLoyalty = Math.min(100, Game.cruzLoyalty + 10);
        inspireParty(3);
        updateHUD();
        continueJourney(8);
      } },
      { text: "«Primero los papeles. Que la tropa sepa a quién obedece.»", tag: "PREPARAR LA PRUEBA", type: "supervivencia", action: () => {
        Game.inventory.ammo += 3;
        updateHUD();
        addCombatLog("Cruz reparte cartuchos y copias de los testimonios entre la tropa.", "success");
        continueJourney(8);
      } }
    ]
  },

  // --- NIVEL 6: EL VADO DEL RÍO SALADO ---
  ramona_vado: {
    speaker: "Doña Ramona",
    role: "Colona del vado",
    avatar: "🧣",
    text: "«Gaucho Fierro, la crecida se llevó el camino y mis hijos están del otro lado. La partida de Ferreyra viene a cobrarnos el paso con la culata de los fusiles. Si nos ayudan a cruzar, este pago no lo va a olvidar».",
    choices: [
      { text: "«Preparad las carretas. Vamos a cruzar aunque llueva plomo.»", tag: "PREPARAR EL VADO", type: "supervivencia", action: () => {
        [fierroUnit, cruzUnit].forEach(u => { u.hp = Math.min(u.maxHp, u.hp + 20); u.addStatus("inspired", 2); });
        Game.inventory.ammo += 3;
        updateHUD();
        addCombatLog("Ramona reparte provisiones y abrigo: el grupo queda inspirado.", "success");
        closeDialogue();
        startCombatSequence();
      } },
      { text: "«¿Qué sabemos de Ferreyra y de sus hombres?»", tag: "NORMAL", type: "normal", next: "ramona_details" },
      { text: "«Resistiremos cinco rondas. Cuando baje el agua, cruzamos todos.»", tag: "ACEPTAR EL DESAFÍO", type: "carisma", action: () => {
        Game.cruzLoyalty = Math.min(100, Game.cruzLoyalty + 5);
        updateHUD();
        closeDialogue();
        startCombatSequence();
      } }
    ]
  },
  ramona_details: {
    speaker: "Doña Ramona",
    role: "Colona del vado",
    avatar: "🧣",
    text: "«Ferreyra pelea de lejos y manda a los lanceros por el vado. Los juncos aguantan balas, pero el barro no perdona a quien corre. Cruzaremos por la parte baja, donde el agua rompe contra las piedras».",
    choices: [
      { text: "«Entonces que vengan por el barro. Nosotros defendemos la orilla.»", tag: "A LAS ARMAS", type: "normal", action: () => { closeDialogue(); startCombatSequence(); } }
    ]
  },
  ferreyra_encounter: {
    speaker: "Capitán Ferreyra",
    role: "Partida del Río Salado",
    avatar: "🎖️",
    text: "«Nadie cruza el vado sin pagar peaje a la República. Esa carreta es contrabando de colonos, y ustedes dos son desertores con precio en la frontera. Bajen las armas o el río se lleva los cuerpos».",
    choices: [
      { text: "«Estos colonos cruzan porque tienen derecho. Con la ley o sin ella.»", tag: "CARISMA (DC 14)", type: "carisma", dc: 14, statKey: "carisma", onSuccess: "ferreyra_shaken", onFail: "ferreyra_angry" },
      { text: "«La única crecida que va a llevarse algo es la de tu partida.»", tag: "INTIMIDACIÓN (DC 15)", type: "intimidacion", dc: 15, statKey: "fuerza", onSuccess: "ferreyra_shaken", onFail: "ferreyra_angry" },
      { text: "«Cruz, a la orilla. ¡Que cruce el que se anime!»", tag: "COMBATE", type: "normal", action: () => { closeDialogue(); startCombatSequence(); } }
    ]
  },
  ferreyra_shaken: {
    speaker: "Capitán Ferreyra",
    role: "Partida del Río Salado",
    avatar: "🎖️",
    text: "Ferreyra duda. Sus hombres miran el agua y después a los colonos. «Una sola ronda —dice—. Si aguantan hasta que baje la crecida, el vado es suyo». La partida se despliega entre los juncos.",
    choices: [
      { text: "«¡A la orilla, Cruz! ¡Que la crecida decida!»", tag: "COMBATE", type: "normal", action: () => { inspireParty(2); closeDialogue(); startCombatSequence(); } }
    ]
  },
  ferreyra_angry: {
    speaker: "Capitán Ferreyra",
    role: "Partida del Río Salado",
    avatar: "🎖️",
    text: "«¡Insolentes! ¡Lanceros al vado, fusileros a las rocas!». El primer disparo parte una rama sobre la cabeza de Fierro y el barro empieza a moverse.",
    choices: [
      { text: "«¡A las carretas! ¡No dejemos pasar a nadie!»", tag: "COMBATE", type: "normal", action: () => { closeDialogue(); startCombatSequence(); } }
    ]
  },

  // --- NIVEL 7: LA NOCHE DE LA PAYADA ---
  juana_testimony: {
    speaker: "La Parda Juana",
    role: "Cantinera y memoria del pago",
    avatar: "🌺",
    text: "«El escribano Isidro entró a la pulpería con la levita llena de barro y los papeles de tu tapera bajo el brazo. Le pidió a mi difunto marido que firmara con una cruz. El viejo sabía leer, Fierro. Y se negó. Al otro día ya no estaba».",
    choices: [
      { text: "«Ese testimonio vale más que una firma. Contalo delante del escribano.»", tag: "TESTIMONIO", type: "carisma", action: () => { collectTestimony("juana", "La Parda Juana"); Game.inventory.drinks += 1; updateHUD(); closeDialogue(); } }
    ]
  },
  vizcacha_testimony: {
    speaker: "El Viejo Vizcacha",
    role: "Baquiano de la pulpería",
    avatar: "🧉",
    text: "«Yo vi mover los mojones de la tapera una noche sin luna. El que movía las estacas tenía manos de escribano y un farol de la estancia. Pero nadie me cree a mí, viejo y medio sordo».",
    choices: [
      { text: "«Leé las marcas del papel, Vizcacha. Tu ojo vale más que una firma.»", tag: "SUPERVIVENCIA (DC 12)", type: "supervivencia", dc: 12, statKey: "supervivencia", onSuccess: "vizcacha_success", onFail: "vizcacha_fail" },
      { text: "«Contame igual. En el pago te conocen y te van a escuchar.»", tag: "ESCUCHAR", type: "normal", action: () => { collectTestimony("vizcacha", "El Viejo Vizcacha"); closeDialogue(); } }
    ]
  },
  vizcacha_success: {
    speaker: "El Viejo Vizcacha",
    role: "Baquiano de la pulpería",
    avatar: "🧉",
    text: "«¡Ahá! Mirá vos. Estas marcas son del plano viejo, anteriores a la estancia. Si se lo mostramos al juez, Isidro no tiene por dónde escaparse». Vizcacha guarda el papel entre el poncho y escupe de costado.",
    choices: [
      { text: "«Con esto alcanza. Vamos a cantarle la verdad en la cara.»", tag: "PRUEBA REUNIDA", type: "supervivencia", action: () => { collectTestimony("vizcacha", "El Viejo Vizcacha"); Game.progression.scrap += 1; updateHUD(); closeDialogue(); } }
    ]
  },
  vizcacha_fail: {
    speaker: "El Viejo Vizcacha",
    role: "Baquiano de la pulpería",
    avatar: "🧉",
    text: "«No me hagas leer, muchacho. Los ojos ya no me siguen las letras». Pero el viejo igual se acomoda el poncho y empieza a contar lo que vio, con la voz firme de quien no tiene miedo.",
    choices: [
      { text: "«Tu palabra basta. Contala delante de todos.»", tag: "TESTIMONIO", type: "normal", action: () => { collectTestimony("vizcacha", "El Viejo Vizcacha"); closeDialogue(); } }
    ]
  },
  cantor_payada: {
    speaker: "El Cantor Aurelio",
    role: "Payador de la frontera",
    avatar: "🎸",
    text: "«Fierro, me han dicho que tu guitarra sabe de ausencias. Si me ganás una payada, te doy el testimonio que buscas y una copla que va a arder en la pulpería. Si no, te quedás con mi silencio y con la ginebra».",
    choices: [
      { text: "«Acepto. Que la pampa escuche y decida.»", tag: "CARISMA (DC 15)", type: "carisma", dc: 15, statKey: "carisma", onSuccess: "payada_success", onFail: "payada_fail" },
      { text: "«No vine a ganar. Vine a que la verdad se escuche. Cantá vos y yo respondo.»", tag: "HUMILDAD", type: "normal", action: () => { collectTestimony("cantor", "El Cantor Aurelio"); closeDialogue(); } }
    ]
  },
  payada_success: {
    speaker: "El Cantor Aurelio",
    role: "Payador de la frontera",
    avatar: "🎸",
    text: "La pulpería se queda muda. Aurelio deja la guitarra sobre la mesa y se limpia la boca. «Nadie cantó así desde que murió el viejo Hernández. Llevate el testimonio, Fierro. Y llevate también esta copla: el que canta su verdad no muere en el olvido».",
    choices: [
      { text: "«Gracias, cantor. La copla va a sonar en el fortín.»", tag: "PAYADA GANADA", type: "carisma", action: () => {
        Game.morality.payadaWon = true;
        Game.progression.perkPoints++;
        Game.cruzLoyalty = Math.min(100, Game.cruzLoyalty + 10);
        collectTestimony("cantor", "El Cantor Aurelio");
        updateHUD();
        showToast("¡Payada ganada! +1 punto de pericia", "success");
        closeDialogue();
      } }
    ]
  },
  payada_fail: {
    speaker: "El Cantor Aurelio",
    role: "Payador de la frontera",
    avatar: "🎸",
    text: "«Te faltó pampa, Fierro. La guitarra no miente». Aurelio sonríe sin crueldad y llena dos vasos. «Pero tu copla tenía verdad. El testimonio es tuyo igual. Aprendé la segunda parte y volvé cuando quieras».",
    choices: [
      { text: "«Me quedo con la lección y con el testimonio.»", tag: "TESTIMONIO", type: "normal", action: () => { collectTestimony("cantor", "El Cantor Aurelio"); closeDialogue(); } }
    ]
  },
  escribano_encounter: {
    speaker: "Escribano Isidro",
    role: "Falsificador de títulos",
    avatar: "🖋️",
    text: "«¿Martín Fierro? Ah, el gaucho de la tapera. Los papeles están en regla, muchacho. Las tierras pasaron a manos de quien supo trabajarlas mientras ustedes andaban de vagos por la frontera». Los matones se acomodan detrás del escribano.",
    choices: [
      { text: "«Tengo tres testimonios que prueban que esos papeles son falsos. La noche se terminó, Isidro.»", tag: "PRUEBA DE TESTIMONIOS", type: "carisma", requiresTestimonies: 3, action: () => {
        Game.morality.diplomaticWins++;
        Game.progression.scrap += 2;
        updateHUD();
        addCombatLog("Los parroquianos rodean al escribano. La verdad del pago queda escrita en el libro de la pulpería.", "success");
        closeDialogue();
        showToast("La verdad quedó escrita en el libro de la pulpería.", "success");
        onLevelCompleted();
      } },
      { text: "«La ley del pago también se escribe con el filo del facón.»", tag: "COMBATE", type: "intimidacion", action: () => {
        forceHostile("escribano", "guardia7a", "guardia7b");
        closeDialogue();
        startCombatSequence();
      } },
      { text: "«Todavía no tengo todas las pruebas. Volveré cuando las tenga.»", tag: "RETIRARSE", type: "normal", action: () => { closeDialogue(); } }
    ]
  },

  // --- NIVEL 8: EL ÚLTIMO CANTO ---
  lagos_encounter: {
    speaker: "Coronel Lagos",
    role: "Comandante del Fortín San Martín",
    avatar: "⚔️",
    text: "«Fierro. Cruz. Los dos desertores que la frontera no pudo domar». Lagos baja del caballo sin apuro. «El fortín está cerrado. La tropa obedece. Y mañana, cuando salga el sol, sus nombres van a ser un ejemplo de lo que pasa con los gauchos que se alzan».",
    choices: [
      { text: "«Estos papeles muestran cómo se quedó con las tierras de la tapera. Su propia tropa merece saberlo.»", tag: "PRUEBA DE LA LEVA", type: "supervivencia", requires: "foundLevyOrders", requiresTestimonies: 3, action: () => {
        desertEnemyUnit("fusilero8a", "baja el fusil y se niega a disparar contra los colonos");
        desertEnemyUnit("fusilero8b", "rompe filas al escuchar los testimonios del pago");
        const lagos = Game.levelUnits.find(u => u.id === "lagos");
        if (lagos) lagos.addStatus("demoralized", 3);
        inspireParty(3);
        Game.morality.diplomaticWins++;
        updateHUD();
        closeDialogue();
        startCombatSequence();
      } },
      { text: "«Lagos, la frontera ya no le obedece. Baje el sable y deje pasar a la gente.»", tag: "CARISMA (DC 16)", type: "carisma", dc: 16, statKey: "carisma", onSuccess: "lagos_shaken", onFail: "lagos_fight" },
      { text: "«¡Por la tapera, por Cruz y por todos los que no volvieron!»", tag: "COMBATE FINAL", type: "intimidacion", action: () => { closeDialogue(); startCombatSequence(); } }
    ]
  },
  lagos_shaken: {
    speaker: "Coronel Lagos",
    role: "Comandante del Fortín San Martín",
    avatar: "⚔️",
    text: "Lagos aprieta la empuñadura del sable. Por un instante, sus ojos buscan a los soldados que ya no lo miran. «No todos los gauchos cantan igual», murmura. «Pero un fortín no se entrega con una copla». El fuego de los braseros crece a su espalda.",
    choices: [
      { text: "«No vine a que se rinda. Vine a que escuche. ¡A las armas, Cruz!»", tag: "COMBATE FINAL", type: "carisma", action: () => { inspireParty(3); closeDialogue(); startCombatSequence(); } }
    ]
  },
  lagos_fight: {
    speaker: "Coronel Lagos",
    role: "Comandante del Fortín San Martín",
    avatar: "⚔️",
    text: "«¡Basta de coplas! ¡Cierren el portón y que no quede un gaucho vivo en el patio!». Los fusileros suben a la empalizada. El fortín entero se convierte en una boca de fuego.",
    choices: [
      { text: "«¡Cruz, a las carretas! ¡Esta noche termina la frontera!»", tag: "COMBATE FINAL", type: "normal", action: () => { closeDialogue(); startCombatSequence(); } }
    ]
  }
};

function openDialogue(nodeKey) {
  const node = DIALOGUE_NODES[nodeKey];
  if (!node) {
    addCombatLog("La pampa guarda silencio: ese diálogo no está disponible.", "normal");
    return;
  }

  Game.state = "DIALOGUE";

  const overlay = document.getElementById("dialogue-overlay");
  document.getElementById("dialogue-speaker-name").innerText = node.speaker;
  document.getElementById("dialogue-speaker-role").innerText = node.role;
  document.getElementById("dialogue-avatar").innerText = node.avatar;
  document.getElementById("dialogue-text").innerText = typeof node.text === "function" ? node.text() : node.text;

  const choicesContainer = document.getElementById("dialogue-choices");
  choicesContainer.innerHTML = "";

  const availableChoices = node.choices.filter(choice => {
    if (choice.requires && !Game.morality[choice.requires]) return false;
    if (choice.requiresTestimonies && Game.testimonies.length < choice.requiresTestimonies) return false;
    return true;
  });

  availableChoices.forEach(choice => {
    const btn = document.createElement("button");
    btn.className = "dialogue-btn";
    btn.innerHTML = `<span class="check-tag ${choice.type}">[${choice.tag}]</span> <span>${choice.text}</span>`;
    btn.onclick = () => {
      audio.playChord([220, 277.18, 329.63]);
      
      if (choice.loyaltyBonus) {
        Game.cruzLoyalty = Math.min(100, Game.cruzLoyalty + choice.loyaltyBonus);
        addCombatLog(`<strong>Sargento Cruz aprueba tu decisión</strong> (+${choice.loyaltyBonus}% Confianza).`, "success");
        updateHUD();
      }

      if (choice.dc) {
        triggerDiceCheck(choice);
      } else {
        if (choice.action) choice.action();
        if (choice.next) openDialogue(choice.next);
      }
    };
    choicesContainer.appendChild(btn);
  });

  if (availableChoices.length === 0) {
    const btn = document.createElement("button");
    btn.className = "dialogue-btn";
    btn.innerHTML = `<span class="check-tag normal">[SIN OPCIONES]</span> <span>Volver a la exploración.</span>`;
    btn.onclick = () => closeDialogue();
    choicesContainer.appendChild(btn);
  }

  overlay.classList.remove("hidden");
}

function closeDialogue() {
  document.getElementById("dialogue-overlay").classList.add("hidden");
  if (Game.state === "DIALOGUE") Game.state = "EXPLORATION";
}

function triggerDiceCheck(choice) {
  Game.state = "DICE_ROLL";
  document.getElementById("dialogue-overlay").classList.add("hidden");
  const modal = document.getElementById("dice-roll-modal");
  const title = document.getElementById("dice-check-title");
  const dcText = document.getElementById("dice-target-dc");
  const formula = document.getElementById("dice-formula");
  const visual = document.getElementById("d20-visual");
  const numberElem = document.getElementById("d20-number");
  const msg = document.getElementById("dice-result-msg");
  const continueBtn = document.getElementById("btn-dice-continue");

  const statScore = Game.stats[choice.statKey] || 10;
  const mod = Math.floor((statScore - 10) / 2);

  title.innerText = `Chequeo de ${choice.statKey.toUpperCase()}`;
  dcText.innerText = choice.dc;
  formula.innerText = `Tirada (D20) + Modificador (${mod >= 0 ? "+" + mod : mod})`;
  msg.innerText = "¡Lanzando los dados en la pampa...!";
  msg.className = "dice-result-msg";
  continueBtn.classList.add("hidden");
  visual.classList.add("rolling");
  modal.classList.remove("hidden");

  audio.playDiceRoll();

  let rolls = 0;
  const interval = setInterval(() => {
    numberElem.innerText = Math.floor(Math.random() * 20) + 1;
    rolls++;
    if (rolls > 12) {
      clearInterval(interval);
      visual.classList.remove("rolling");

      const rawRoll = Math.floor(Math.random() * 20) + 1;
      const total = rawRoll + mod;
      numberElem.innerText = rawRoll;

      const isSuccess = total >= choice.dc || rawRoll === 20;

      if (isSuccess) {
        msg.innerText = `¡ÉXITO! (${rawRoll} + ${mod} = ${total} vs CD ${choice.dc})`;
        msg.classList.add("success");
        audio.playChord([261.63, 329.63, 392.00, 523.25]);
      } else {
        msg.innerText = `FALLASTE (${rawRoll} + ${mod} = ${total} vs CD ${choice.dc})`;
        msg.classList.add("failure");
        audio.playChord([196, 233.08, 277.18]);
      }

      continueBtn.classList.remove("hidden");
      continueBtn.onclick = () => {
        modal.classList.add("hidden");
        if (isSuccess) {
          openDialogue(choice.onSuccess);
        } else {
          openDialogue(choice.onFail);
        }
      };
    }
  }, 90);
}

// -----------------------------------------------------------------------------
// 13. PROGRESIÓN ENTRE NIVELES Y MAPA DE VIAJE PAMPEANO
// -----------------------------------------------------------------------------
function awardExperience(amount, source) {
  const progression = Game.progression;
  if (progression.level >= progression.maxLevel) {
    progression.xp = Math.min(progression.xp, progression.nextXp);
    updateHUD();
    return;
  }

  progression.xp += amount;
  addCombatLog(`${source}: +${amount} experiencia.`, "success");

  while (progression.level < progression.maxLevel && progression.xp >= progression.nextXp) {
    progression.xp -= progression.nextXp;
    progression.level++;
    progression.skillPoints++;
    progression.perkPoints++;
    fierroUnit.maxHp += 10;
    fierroUnit.hp = Math.min(fierroUnit.maxHp, fierroUnit.hp + 10);
    progression.nextXp = progression.level * 100;
    addCombatLog(`¡Martín alcanzó el nivel ${progression.level}! +10 salud máxima, 1 punto de atributo y 1 punto de pericia.`, "success");
    showToast(`¡Nivel ${progression.level}! Elegí atributo y pericia en la ficha 📊.`, "success");
    audio.playLevelUp();
  }

  updateHUD();
}

function awardChapterProgress() {
  if (Game.progression.completedChapters.includes(Game.currentLevel)) return;

  Game.progression.completedChapters.push(Game.currentLevel);
  awardExperience(Game.currentLevel * 100, `Capítulo ${Game.currentLevel} superado`);
  Game.progression.scrap += 1;
  addCombatLog("Recuperaste 1 pieza de metal para el taller.", "success");
  refreshProgressionUI();
}

function spendSkillPoint(stat) {
  if (Game.progression.skillPoints <= 0) return;
  Game.progression.skillPoints--;
  Game.stats[stat] += 2;

  if (stat === "resistencia") {
    fierroUnit.maxHp += 8;
    fierroUnit.hp = Math.min(fierroUnit.maxHp, fierroUnit.hp + 8);
  }

  addCombatLog(`Fierro mejora ${stat}: +2 puntos${stat === "resistencia" ? " y +8 salud máxima" : ""}.`, "success");
  updateHUD();
}

function upgradeWeapon(weapon) {
  const weaponData = Game.progression.weapons;
  if (Game.progression.scrap <= 0 || weaponData[weapon] >= 2) return;

  Game.progression.scrap--;
  weaponData[weapon]++;
  const name = weapon === "facon" ? "facón" : "trabuco";
  addCombatLog(`Mejoraste el ${name}. Ahora causa +${weaponData[weapon] * 6} de daño.`, "success");
  updateHUD();
}

function refreshProgressionUI() {
  const levelText = document.getElementById("progression-level");
  if (!levelText) return;

  const p = Game.progression;
  const progressText = `Nivel ${p.level} · ${p.level >= p.maxLevel ? "Nivel máximo" : `${p.xp}/${p.nextXp} EXP`}`;
  levelText.innerText = progressText;
  const pointsText = `Puntos de atributo: ${p.skillPoints} · Pericias: ${p.perkPoints}`;
  document.getElementById("progression-points").innerText = pointsText;
  const characterProgress = document.getElementById("character-progression-summary");
  if (characterProgress) characterProgress.innerText = `${progressText} · ${pointsText}`;
  document.getElementById("progression-scrap").innerText = `Piezas de metal: ${p.scrap}`;

  const statButtons = document.querySelectorAll("[data-stat-upgrade]");
  statButtons.forEach(button => { button.disabled = p.skillPoints <= 0; });
  ["fuerza", "resistencia", "carisma", "supervivencia"].forEach((stat, index) => {
    const value = document.getElementById(`stat-value-${stat}`);
    if (value) value.innerHTML = `${Game.stats[stat]} <span class="stat-mod">(${Game.stats[stat] >= 10 ? "+" : ""}${Math.floor((Game.stats[stat] - 10) / 2)})</span>`;
    if (statButtons[index]) statButtons[index].title = `Mejorar ${stat} en 2 puntos`;
  });
  const agilityValue = document.getElementById("stat-value-agilidad");
  if (agilityValue) agilityValue.innerHTML = `${Game.stats.agilidad} <span class="stat-mod">(${Game.stats.agilidad >= 10 ? "+" : ""}${Math.floor((Game.stats.agilidad - 10) / 2)})</span>`;
  const perceptionValue = document.getElementById("stat-value-percepcion");
  if (perceptionValue) perceptionValue.innerHTML = `${Game.stats.percepcion} <span class="stat-mod">(${Game.stats.percepcion >= 10 ? "+" : ""}${Math.floor((Game.stats.percepcion - 10) / 2)})</span>`;

  const faconButton = document.getElementById("btn-upgrade-facon");
  const trabucoButton = document.getElementById("btn-upgrade-trabuco");
  faconButton.innerText = p.weapons.facon >= 2 ? "Facón · nivel máximo" : `Templar facón (+${(p.weapons.facon + 1) * 6} daño)`;
  trabucoButton.innerText = p.weapons.trabuco >= 2 ? "Trabuco · nivel máximo" : `Ajustar trabuco (+${(p.weapons.trabuco + 1) * 6} daño)`;
  faconButton.disabled = p.scrap <= 0 || p.weapons.facon >= 2;
  trabucoButton.disabled = p.scrap <= 0 || p.weapons.trabuco >= 2;

  renderPerks();
}

function continueJourney(nextLevel) {
  closeDialogue();
  loadLevel(nextLevel);
}

// -----------------------------------------------------------------------------
// 13.b GUARDADO AUTOMÁTICO Y CONTINUACIÓN DE CAMPAÑA
// -----------------------------------------------------------------------------
function readSave() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (!data || typeof data !== "object") return null;
    return data;
  } catch (error) {
    console.warn("No se pudo leer la partida guardada.", error);
    return null;
  }
}

function clearSave() {
  try {
    localStorage.removeItem(SAVE_KEY);
  } catch (error) {
    console.warn("No se pudo borrar la partida guardada.", error);
  }
  updateContinueButton();
}

function saveGame(levelToResume = Game.currentLevel) {
  const data = {
    version: 2,
    savedAt: Date.now(),
    currentLevel: clamp(levelToResume, 1, Object.keys(LEVELS).length),
    progression: {
      level: Game.progression.level,
      xp: Game.progression.xp,
      nextXp: Game.progression.nextXp,
      maxLevel: Game.progression.maxLevel,
      skillPoints: Game.progression.skillPoints,
      perkPoints: Game.progression.perkPoints,
      perks: [...Game.progression.perks],
      scrap: Game.progression.scrap,
      completedChapters: [...Game.progression.completedChapters],
      weapons: { ...Game.progression.weapons }
    },
    stats: { ...Game.stats },
    inventory: { ...Game.inventory },
    morality: { ...Game.morality },
    cruzLoyalty: Game.cruzLoyalty,
    testimonies: [...Game.testimonies],
    fierroHp: fierroUnit ? fierroUnit.hp : 100,
    cruzHp: cruzUnit ? cruzUnit.hp : 90
  };

  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(data));
  } catch (error) {
    console.warn("No se pudo guardar la campaña.", error);
  }
  updateContinueButton();
}

function updateContinueButton() {
  const button = document.getElementById("btn-continue-game");
  if (!button) return;
  const save = readSave();
  if (!save) {
    button.classList.add("hidden");
    return;
  }
  const level = clamp(Number(save.currentLevel) || 1, 1, Object.keys(LEVELS).length);
  button.classList.remove("hidden");
  button.innerHTML = `<span class="icon">🐎</span> CONTINUAR · CAP. ${romanNumeral(level)}`;
}

function showGameView() {
  document.getElementById("title-screen").classList.remove("active");
  document.getElementById("game-view").classList.add("active");
}

function resetGameState(options = {}) {
  if (options.clearStorage !== false) clearSave();

  Game.state = "TITLE";
  Game.currentLevel = 1;
  Game.activeUnitIndex = 0;
  Game.selectedAction = "move";
  Game.hoverCell = { x: -1, y: -1 };
  Game.hoverInteractable = null;
  Game.combatQueue = [];
  Game.levelUnits.forEach(unit => {
    scene.remove(unit.mesh);
    unit.detachOverlay();
  });
  Game.levelUnits = [];
  scene.remove(fierroUnit.mesh);
  scene.remove(cruzUnit.mesh);
  Game.currentObstacles = [];
  Game.interactables = [];
  Game.hazards = [];
  Game.activeLevelData = null;
  Game.combatRound = 1;
  Game.combatLock = false;
  Game.waveIndex = 0;
  Game.testimonies = [];
  Game.levelCamera = null;
  Game.levelCompletionHandled = false;
  Game.defeatShown = false;
  Game.lastCombatResolved = false;

  Game.inventory = { ammo: 6, drinks: 2, bandages: 2 };
  Game.progression = {
    level: 1,
    xp: 0,
    nextXp: 100,
    maxLevel: 10,
    skillPoints: 0,
    perkPoints: 0,
    perks: [],
    scrap: 0,
    completedChapters: [],
    weapons: { facon: 0, trabuco: 0 }
  };
  Game.cruzLoyalty = 85;
  Game.morality = {
    diplomaticWins: 0,
    combatWins: 0,
    intimidations: 0,
    savedPicardia: false,
    foundLevyOrders: false,
    payadaWon: false,
    cruzSacrificed: false
  };
  Game.stats = {
    fuerza: 15,
    agilidad: 14,
    resistencia: 16,
    percepcion: 13,
    carisma: 12,
    supervivencia: 15
  };

  [fierroUnit, cruzUnit].forEach(unit => {
    unit.isDead = false;
    unit.hp = unit.maxHp;
    unit.ap = unit.maxAp;
    unit.statuses = {};
    unit.phase2 = false;
    unit.phase3 = false;
    unit.usedRally = false;
    unit.clearTransientStates();
    unit.moveTo(unit === fierroUnit ? 6 : 5, unit === fierroUnit ? 9 : 10);
    if (unit.overlayEl) unit.overlayEl.style.display = "none";
  });
  fierroUnit.maxHp = 100;
  fierroUnit.hp = 100;
  cruzUnit.maxHp = 90;
  cruzUnit.hp = 90;

  Object.values(LEVELS).forEach(level => {
    (level.units || []).forEach(unit => {
      unit.isDead = false;
      unit.hp = unit.maxHp;
      unit.statuses = {};
      unit.clearTransientStates();
      unit.mesh.position.y = 0;
      unit.mesh.rotation.z = 0;
    });
  });

  clearGroup(environmentGroup);
  clearGroup(interactiveGroup);
  clearGroup(hazardGroup);
  clearGroup(weatherGroup);
  clearGroup(rangeVisualGroup);
  const overlays = document.getElementById("unit-overlays");
  if (overlays) overlays.innerHTML = "";
  const log = document.getElementById("log-entries");
  if (log) log.innerHTML = "";

  ["result-modal", "travel-map-modal", "dice-roll-modal", "dialogue-overlay", "character-sheet-modal", "guide-modal"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.add("hidden");
  });
  document.getElementById("combat-banner").classList.add("hidden");
  document.getElementById("turn-order-bar").classList.add("hidden");
  document.getElementById("btn-end-turn").disabled = true;
  document.querySelectorAll(".action-btn").forEach(btn => btn.classList.remove("active"));
  const moveBtn = document.getElementById("btn-act-move");
  if (moveBtn) moveBtn.classList.add("active");

  setCameraMode("tactical");
}

function continueSavedGame() {
  const save = readSave();
  if (!save) {
    showToast("No hay una campaña guardada para continuar.", "warning");
    return;
  }

  resetGameState({ clearStorage: false });

  const p = save.progression || {};
  Game.progression.level = clamp(Number(p.level) || 1, 1, 10);
  Game.progression.xp = Math.max(0, Number(p.xp) || 0);
  Game.progression.nextXp = Math.max(100, Number(p.nextXp) || Game.progression.level * 100);
  Game.progression.maxLevel = 10;
  Game.progression.skillPoints = Math.max(0, Number(p.skillPoints) || 0);
  Game.progression.perkPoints = Math.max(0, Number(p.perkPoints) || 0);
  Game.progression.perks = Array.isArray(p.perks) ? [...p.perks] : [];
  Game.progression.scrap = Math.max(0, Number(p.scrap) || 0);
  Game.progression.completedChapters = Array.isArray(p.completedChapters) ? [...p.completedChapters] : [];
  Game.progression.weapons = {
    facon: clamp(Number(p.weapons && p.weapons.facon) || 0, 0, 2),
    trabuco: clamp(Number(p.weapons && p.weapons.trabuco) || 0, 0, 2)
  };

  if (save.stats) {
    Object.keys(Game.stats).forEach(stat => {
      if (Number.isFinite(Number(save.stats[stat]))) Game.stats[stat] = Number(save.stats[stat]);
    });
  }
  if (save.inventory) {
    Game.inventory.ammo = Math.max(0, Number(save.inventory.ammo) || 0);
    Game.inventory.drinks = Math.max(0, Number(save.inventory.drinks) || 0);
    Game.inventory.bandages = Math.max(0, Number(save.inventory.bandages) || 0);
  }
  if (save.morality) {
    Object.keys(Game.morality).forEach(key => {
      if (typeof save.morality[key] === typeof Game.morality[key]) Game.morality[key] = save.morality[key];
    });
  }
  Game.cruzLoyalty = clamp(Number(save.cruzLoyalty) || 85, 0, 100);
  Game.testimonies = Array.isArray(save.testimonies) ? [...save.testimonies] : [];

  const hpBonus = (Game.progression.level - 1) * 10 + (Game.progression.perks.includes("cuero_duro") ? 25 : 0);
  fierroUnit.maxHp = 100 + hpBonus;
  fierroUnit.hp = clamp(Number(save.fierroHp) || fierroUnit.maxHp, 1, fierroUnit.maxHp);
  cruzUnit.maxHp = 90;
  cruzUnit.hp = clamp(Number(save.cruzHp) || cruzUnit.maxHp, 1, cruzUnit.maxHp);

  const levelToLoad = clamp(Number(save.currentLevel) || 1, 1, Object.keys(LEVELS).length);
  showGameView();
  loadLevel(levelToLoad);
  showToast(`Campaña retomada · Capítulo ${romanNumeral(levelToLoad)}`, "success");
}

function onLevelCompleted() {
  if (Game.levelCompletionHandled) return;
  Game.levelCompletionHandled = true;

  awardChapterProgress();
  audio.playChord([261.63, 329.63, 392.00, 523.25]);
  Game.combatLock = true;

  const totalLevels = Object.keys(LEVELS).length;
  if (Game.currentLevel >= totalLevels) {
    clearSave();
    evaluateFinalEnding();
    return;
  }

  const nextLvl = Game.currentLevel + 1;
  saveGame(nextLvl);

  // Abrir Modal de Mapa de Viaje Pampeano
  Game.state = "TRAVEL_MAP";
  const travelModal = document.getElementById("travel-map-modal");
  const travelTitle = document.getElementById("travel-map-title");
  const travelDesc = document.getElementById("travel-map-desc");
  const nextBtn = document.getElementById("btn-travel-next");

  travelTitle.innerText = `Hacia el ${LEVELS[nextLvl].title}`;
  travelDesc.innerText = `Has superado los peligros del ${LEVELS[Game.currentLevel].title}. Con el sol cayendo sobre el horizonte, ensillan los caballos y galopan hacia nuevas tierras de frontera.`;

  // Actualizar todos los nodos del mapa de campaña.
  for (let level = 1; level <= totalLevels; level++) {
    const node = document.getElementById(`node-level-${level}`);
    if (!node) continue;
    const status = node.querySelector(".node-status");
    if (level < nextLvl) {
      node.className = "map-node completed";
      status.innerText = "COMPLETADO";
    } else if (level === nextLvl) {
      node.className = "map-node current";
      status.innerText = "SIGUIENTE DESTINO";
    } else {
      node.className = "map-node locked";
      status.innerText = "BLOQUEADO";
    }
  }

  refreshProgressionUI();
  const journeyScenes = {
    2: "journey_to_cañadon",
    3: "journey_to_fortin",
    4: "journey_to_salitral",
    5: "journey_to_tapera",
    6: "journey_to_vado",
    7: "journey_to_payada",
    8: "journey_to_ultimo"
  };
  nextBtn.onclick = () => {
    travelModal.classList.add("hidden");
    const scene = journeyScenes[nextLvl];
    if (scene && DIALOGUE_NODES[scene]) openDialogue(scene);
    else continueJourney(nextLvl);
  };

  travelModal.classList.remove("hidden");
}

// -----------------------------------------------------------------------------
// 14. EVALUACIÓN Y DESPLIEGUE DE FINALES ALTERNATIVOS (4 FINALES)
// -----------------------------------------------------------------------------
function evaluateFinalEnding() {
  const morality = Game.morality;
  if (morality.cruzSacrificed) {
    triggerEpilogue("sacrifice");
  } else if (morality.payadaWon && Game.testimonies.length >= 3) {
    triggerEpilogue("payada_legend");
  } else if (morality.diplomaticWins >= 2) {
    triggerEpilogue("diplomatic");
  } else if (morality.intimidations >= 2 && Game.cruzLoyalty >= 90) {
    triggerEpilogue("caudillo");
  } else if (morality.combatWins >= 2) {
    triggerEpilogue("vengeance");
  } else {
    triggerEpilogue("desert_freedom"); // Final Canónico de José Hernández
  }
}

function triggerEpilogue(endingType) {
  Game.state = "EPILOGUE";
  Game.combatLock = true;
  clearSave();

  const modal = document.getElementById("result-modal");
  const tag = document.getElementById("epilogue-ending-tag");
  const title = document.getElementById("result-title");
  const verse = document.getElementById("result-verse");
  const narrative = document.getElementById("result-narrative");
  const summary = document.getElementById("result-summary");

  document.getElementById("combat-banner").classList.add("hidden");
  document.getElementById("turn-order-bar").classList.add("hidden");
  document.getElementById("btn-end-turn").disabled = true;

  if (endingType === "desert_freedom") {
    tag.innerText = "FINAL CANÓNICO 1 DE 6: LA HUIDA AL DESIERTO LIBRE";
    title.innerText = "CRUZANDO LA ÚLTIMA FRONTERA";
    title.style.color = "#f39c12";
    verse.innerText = "«Y siguiendo el fiel rumbo, / que aquel rumbo les marcaba, / entraron en el desierto, / donde nadie los hallaba.»";
    narrative.innerText = "Después de cruzar el cañadón, el fortín y el salitral, Fierro y Cruz recuperan la tapera. Pero la justicia sigue obedeciendo a los poderosos: al caer la noche, ensillan de nuevo y se internan en el desierto pampeano, libres e indómitos.";
  } else if (endingType === "diplomatic") {
    tag.innerText = "FINAL ALTERNATIVO 2 DE 6: EL PACTO DE LA LEY CRIOLLA";
    title.innerText = "LA JUSTICIA DE LA PALABRA";
    title.style.color = "#2ecc71";
    verse.innerText = "«Los hermanos sean unidos, / porque ésa es la ley primera; / tengan unión verdadera / en cualquier tiempo que sea...»";
    narrative.innerText = "Con la prueba de la leva, los testimonios del pago y el apoyo de la gente, Fierro y Cruz desenmascararon a los comandantes, al escribano y a Don Evaristo. Las tierras fueron restituidas y la leva quedó bajo investigación. Mora y los peones regresaron a sus hogares con ellos.";
  } else if (endingType === "vengeance") {
    tag.innerText = "FINAL ALTERNATIVO 3 DE 6: LA FURIA DEL FACÓN";
    title.innerText = "LEYENDA SANGRIENTA DE LA PAMPA";
    title.style.color = "#e74c3c";
    verse.innerText = "«El que pelea en la frontera / no tiene descanso ni abrigo; / donde pisa no hay amigo / ni perdón para el matrero...»";
    narrative.innerText = "El patio de la estancia quedó cubierto de humo. Fierro y Cruz recuperaron la tapera por la fuerza y se marcharon antes del amanecer. Desde entonces, sus nombres resonaron en cada fogón: temidos por los poderosos y celebrados en secreto por los gauchos alzados.";
  } else if (endingType === "sacrifice") {
    tag.innerText = "FINAL ALTERNATIVO 4 DE 6: EL SACRIFICIO DE CRUZ";
    title.innerText = "CRUZ NO CONSINTIÓ EL CRIMEN";
    title.style.color = "#3498db";
    verse.innerText = "«¡Cruz no consiente / que se cometa el delito / de matar a un valiente! / y al punto desenvainó...»";
    narrative.innerText = "En el patio de la estancia, Cruz se interpuso ante la guardia para salvar a Fierro. En su último aliento le pidió a su hermano que volviera al pago y cuidara a los suyos. Fierro cruzó solo el salitral, llevando la memoria imborrable del amigo que dio la vida por él.";
  } else if (endingType === "payada_legend") {
    tag.innerText = "FINAL ALTERNATIVO 5 DE 6: EL CANTO QUE QUEDÓ EN LA FRONTERA";
    title.innerText = "LA VERDAD SE CANTA Y NO SE OLVIDA";
    title.style.color = "#af7ac5";
    verse.innerText = "«Y aquí me pongo a cantar / por la memoria del pago, / para que sepan los malos / que la verdad tiene estrago.»";
    narrative.innerText = "Los tres testimonios y la payada de la pulpería viajaron de fogón en fogón hasta el Fortín San Martín. Cuando Lagos cayó, ya no quedaba un solo soldado que creyera en sus papeles. Fierro colgó el facón y siguió cantando por los caminos: desde entonces, cada copla suya fue una sentencia contra los que roban la tierra y la memoria.";
  } else if (endingType === "caudillo") {
    tag.innerText = "FINAL ALTERNATIVO 6 DE 6: EL CAUDILLO DE LOS PAGOS";
    title.innerText = "LA FRONTERA APRENDIÓ A OBEDECER OTRA LEY";
    title.style.color = "#e67e22";
    verse.innerText = "«Los hermanos sean unidos, / y el pago será su casa; / que la fuerza de los muchos / quiebra la ley de los amos.»";
    narrative.innerText = "La fama de Fierro y Cruz creció más rápido que la de cualquier comandante. Los colonos del vado, los paisanos de la pulpería y los peones de la tapera les juraron lealtad. No hubo coronel capaz de imponer una leva en aquellos pagos: la frontera quedó en manos de los gauchos que se atrevieron a defenderla.";
  }

  const totalLevels = Object.keys(LEVELS).length;
  summary.innerHTML = `
    <div class="epilogue-stat-item"><strong>Capítulos Completados:</strong> ${totalLevels} de ${totalLevels}</div>
    <div class="epilogue-stat-item"><strong>Nivel de Fierro:</strong> ${Game.progression.level}</div>
    <div class="epilogue-stat-item"><strong>Armas reforzadas:</strong> Facón +${Game.progression.weapons.facon * 6} · Trabuco +${Game.progression.weapons.trabuco * 6} daño</div>
    <div class="epilogue-stat-item"><strong>Lealtad de Cruz:</strong> ${Game.cruzLoyalty}% (Hermandad)</div>
    <div class="epilogue-stat-item"><strong>Resoluciones Pacíficas:</strong> ${Game.morality.diplomaticWins}</div>
    <div class="epilogue-stat-item"><strong>Combates Ganados:</strong> ${Game.morality.combatWins}</div>
    <div class="epilogue-stat-item"><strong>Testimonios Reunidos:</strong> ${Game.testimonies.length} / 3</div>
    <div class="epilogue-stat-item"><strong>Payada Ganada:</strong> ${Game.morality.payadaWon ? "Sí" : "No"}</div>
    <div class="epilogue-stat-item"><strong>Picardía Rescatado:</strong> ${Game.morality.savedPicardia ? "Sí (Aliado)" : "No"}</div>
    <div class="epilogue-stat-item"><strong>Salud Final de Fierro:</strong> ${fierroUnit.hp} HP</div>
  `;

  modal.classList.remove("hidden");
}

function showDefeat() {
  if (Game.defeatShown) return;
  Game.defeatShown = true;
  Game.state = "EPILOGUE";
  Game.combatLock = true;
  clearSave();

  const modal = document.getElementById("result-modal");
  document.getElementById("combat-banner").classList.add("hidden");
  document.getElementById("turn-order-bar").classList.add("hidden");
  document.getElementById("btn-end-turn").disabled = true;
  document.getElementById("epilogue-ending-tag").innerText = "DERROTA EN LA FRONTERA";
  document.getElementById("result-title").innerText = "LA PAMPA NO PERDONA";
  document.getElementById("result-title").style.color = "#c0392b";
  document.getElementById("result-verse").innerText = "«Malo es vivir en la frontera, / pero peor es sucumbir...»";
  document.getElementById("result-narrative").innerText = "Martín Fierro cayó antes de recuperar su hogar. Cruz siguió su rastro hasta que la frontera se cerró sobre ambos y el camino de regreso quedó sin terminar.";
  document.getElementById("result-summary").innerHTML = `
    <div class="epilogue-stat-item"><strong>Capítulo alcanzado:</strong> ${Game.currentLevel} de ${Object.keys(LEVELS).length}</div>
    <div class="epilogue-stat-item"><strong>Nivel de Fierro:</strong> ${Game.progression.level}</div>
    <div class="epilogue-stat-item"><strong>Puntos de Vida:</strong> 0 HP</div>
  `;
  audio.playWarning();
  modal.classList.remove("hidden");
}

// -----------------------------------------------------------------------------
// 15. ACTUALIZACIÓN DE HUD Y BRÚJULA DINÁMICA
// -----------------------------------------------------------------------------
function updateHUD() {
  if (!fierroUnit || !cruzUnit) return;

  document.getElementById("fierro-hp-fill").style.width = `${Math.max(0, (fierroUnit.hp / fierroUnit.maxHp) * 100)}%`;
  document.getElementById("fierro-hp-text").innerText = `${fierroUnit.hp} / ${fierroUnit.maxHp}`;
  document.getElementById("fierro-ap-badge").innerText = `${fierroUnit.ap}/${fierroUnit.maxAp} AP`;

  document.getElementById("cruz-hp-fill").style.width = `${Math.max(0, (cruzUnit.hp / cruzUnit.maxHp) * 100)}%`;
  document.getElementById("cruz-hp-text").innerText = `${cruzUnit.hp} / ${cruzUnit.maxHp}`;
  document.getElementById("cruz-ap-badge").innerText = `${cruzUnit.ap}/${cruzUnit.maxAp} AP`;
  document.getElementById("cruz-loyalty-text").innerText = `Hermandad (${Game.cruzLoyalty}%)`;

  renderStatusChips(fierroUnit, "fierro-status");
  renderStatusChips(cruzUnit, "cruz-status");

  document.getElementById("res-ammo").innerText = Game.inventory.ammo;
  document.getElementById("res-drink").innerText = Game.inventory.drinks;
  const bandageRes = document.getElementById("res-bandage");
  if (bandageRes) bandageRes.innerText = Game.inventory.bandages;
  const bandageCount = document.getElementById("bandage-count");
  if (bandageCount) bandageCount.innerText = Game.inventory.bandages;

  const weather = WEATHER[Game.weather] || WEATHER.clear;
  const weatherIcon = document.getElementById("weather-icon");
  const weatherLabel = document.getElementById("weather-label");
  if (weatherIcon) weatherIcon.innerText = weather.icon;
  if (weatherLabel) weatherLabel.innerText = weather.label;

  const roundCounter = document.getElementById("round-counter");
  if (roundCounter) roundCounter.innerText = `RONDA ${Game.combatRound}`;

  const levelBadge = document.getElementById("hero-level-badge");
  if (levelBadge) levelBadge.innerText = `NIVEL ${Game.progression.level}`;
  const faconLevel = document.getElementById("facon-upgrade-level");
  const trabucoLevel = document.getElementById("trabuco-upgrade-level");
  if (faconLevel) faconLevel.innerText = `+${Game.progression.weapons.facon * 6}`;
  if (trabucoLevel) trabucoLevel.innerText = `+${Game.progression.weapons.trabuco * 6}`;

  renderTurnOrder();
  updateObjectiveUI();
  refreshProgressionUI();
}

function updateCompass() {
  const dir = new THREE.Vector3();
  camera.getWorldDirection(dir);
  const angle = Math.atan2(dir.x, dir.z) * (180 / Math.PI);

  let bearing = "SUR";
  if (angle > -22.5 && angle <= 22.5) bearing = "NORTE";
  else if (angle > 22.5 && angle <= 67.5) bearing = "NO";
  else if (angle > 67.5 && angle <= 112.5) bearing = "OESTE";
  else if (angle > 112.5 && angle <= 157.5) bearing = "SO";
  else if (angle > -67.5 && angle <= -22.5) bearing = "NE";
  else if (angle > -112.5 && angle <= -67.5) bearing = "ESTE";
  else if (angle > -157.5 && angle <= -112.5) bearing = "SE";

  const compassEl = document.getElementById("compass-bearing");
  if (compassEl) compassEl.innerText = bearing;
}

// -----------------------------------------------------------------------------
// 16. BUCLE PRINCIPAL DE ANIMACIÓN Y RENDER 3D
// -----------------------------------------------------------------------------
let clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  const dt = clock.getDelta();

  if (document.body.dataset.state !== Game.state) {
    document.body.dataset.state = Game.state;
  }

  campfireLight.intensity = 2.5 + Math.sin(Date.now() * 0.012) * 0.45 + (Math.random() - 0.5) * 0.2;

  fierroUnit.update(dt);
  cruzUnit.update(dt);
  Game.levelUnits.forEach(u => u.update(dt));

  if (weatherParticles && weatherParticles.geometry) {
    const positions = weatherParticles.geometry.attributes.position;
    const kind = weatherParticles.userData.kind;
    for (let i = 0; i < positions.count; i++) {
      let x = positions.getX(i);
      let y = positions.getY(i);
      const z = positions.getZ(i);
      if (kind === "rain") {
        y -= dt * 18;
        x += dt * 2.5;
        if (y < 0) y = 20;
      } else if (kind === "dust") {
        x += dt * 6;
        y += Math.sin(Date.now() * 0.001 + i) * dt * 0.6;
        if (x > 30) x = -30;
      } else if (kind === "fire") {
        y += dt * 2.2;
        if (y > 20) y = 0;
      } else {
        y += Math.sin(Date.now() * 0.001 + i) * dt * 0.15;
      }
      positions.setXYZ(i, x, y, z);
    }
    positions.needsUpdate = true;
  }

  updateUnitOverlays();
  applyCameraRig(dt);
  if (controls && cameraRig.mode === "tactical") controls.update();
  updateCompass();

  renderer.render(scene, camera);
}
animate();

// -----------------------------------------------------------------------------
// 17. EVENT LISTENERS Y CONFIGURACIÓN INICIAL
// -----------------------------------------------------------------------------
window.addEventListener("keydown", (e) => {
  if (e.repeat) return;

  const key = e.key.toLowerCase();
  const tag = e.target && e.target.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || (e.target && e.target.isContentEditable)) return;

  if (key === "q") {
    e.preventDefault();
    cycleCameraMode();
    return;
  }

  if (key === "r") {
    e.preventDefault();
    if (cameraRig.mode === "tactical") resetCamera();
    else resetCameraLook();
    return;
  }

  if (cameraRig.mode !== "tactical" && ["arrowleft", "arrowright", "arrowup", "arrowdown"].includes(key)) {
    e.preventDefault();
    cameraRig.keys.add(key);
    return;
  }

  const actionKeys = {
    "1": "move", "m": "move",
    "2": "facon", "f": "facon",
    "3": "shoot", "t": "shoot",
    "4": "poncho", "g": "poncho",
    "5": "bolas", "b": "bolas",
    "6": "heal", "h": "heal",
    "7": "overwatch", "v": "overwatch",
    "8": "payada", "p": "payada",
    "9": "bandage", "c": "bandage"
  };

  if (actionKeys[key] && (Game.state === "COMBAT" || Game.state === "EXPLORATION")) {
    e.preventDefault();
    selectAction(actionKeys[key]);
    return;
  }

  if (key === " " && Game.state === "COMBAT") {
    e.preventDefault();
    const currentUnit = Game.combatQueue[Game.activeUnitIndex];
    if (currentUnit && (currentUnit.faction === "player" || currentUnit.faction === "ally")) {
      nextTurn();
    }
  }
});

window.addEventListener("keyup", (e) => {
  cameraRig.keys.delete(e.key.toLowerCase());
});

window.addEventListener("blur", () => {
  cameraRig.keys.clear();
  cameraRig.pointer = null;
});

document.getElementById("btn-start-game").onclick = () => {
  audio.init();
  resetGameState();
  audio.playChord([196, 246.94, 392.00]);
  showGameView();
  loadLevel(1);
};

const continueButton = document.getElementById("btn-continue-game");
if (continueButton) {
  continueButton.onclick = () => {
    audio.init();
    audio.playChord([196, 246.94, 392.00]);
    continueSavedGame();
  };
}

document.getElementById("btn-how-to-play").onclick = () => {
  document.getElementById("guide-modal").classList.remove("hidden");
};
document.getElementById("btn-close-guide").onclick = () => {
  document.getElementById("guide-modal").classList.add("hidden");
};

document.getElementById("btn-toggle-stats").onclick = () => {
  renderPerks();
  document.getElementById("character-sheet-modal").classList.remove("hidden");
};
document.getElementById("btn-close-stats").onclick = () => {
  document.getElementById("character-sheet-modal").classList.add("hidden");
};

document.querySelectorAll("[data-stat-upgrade]").forEach(button => {
  button.onclick = () => spendSkillPoint(button.dataset.statUpgrade);
});
document.getElementById("btn-upgrade-facon").onclick = () => upgradeWeapon("facon");
document.getElementById("btn-upgrade-trabuco").onclick = () => upgradeWeapon("trabuco");

document.getElementById("btn-camera-mode").onclick = () => {
  cycleCameraMode();
};

document.getElementById("btn-reset-cam").onclick = () => {
  if (cameraRig.mode === "tactical") resetCamera();
  else resetCameraLook();
};

document.getElementById("btn-toggle-sound").onclick = () => {
  audio.enabled = !audio.enabled;
  document.getElementById("sound-icon").innerText = audio.enabled ? "🔊" : "🔇";
};

document.getElementById("btn-act-move").onclick = () => selectAction("move");
document.getElementById("btn-act-facon").onclick = () => selectAction("facon");
document.getElementById("btn-act-shoot").onclick = () => selectAction("shoot");
document.getElementById("btn-act-poncho").onclick = () => selectAction("poncho");
document.getElementById("btn-act-bolas").onclick = () => selectAction("bolas");
document.getElementById("btn-act-heal").onclick = () => selectAction("heal");
document.getElementById("btn-act-overwatch").onclick = () => selectAction("overwatch");
document.getElementById("btn-act-payada").onclick = () => selectAction("payada");
document.getElementById("btn-act-bandage").onclick = () => selectAction("bandage");

document.getElementById("btn-end-turn").onclick = () => {
  if (Game.state === "COMBAT") {
    const currentUnit = Game.combatQueue[Game.activeUnitIndex];
    if (currentUnit && (currentUnit.faction === "player" || currentUnit.faction === "ally")) {
      nextTurn();
    }
  }
};

document.getElementById("btn-restart").onclick = () => {
  clearSave();
  location.reload();
};

updateContinueButton();
renderPerks();
updateHUD();
updateCameraUI();
