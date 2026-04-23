// Render a branded PNG of a user's map (My Map or World Map) and trigger
// a browser download. Uses the Canvas 2D API directly — no html2canvas —
// so SVG styling survives serialization.
//
// Exports:
//   TEMPLATES               — list of { id, name, palette } for pickers
//   renderMapCardCanvas(o)  — async; returns an HTMLCanvasElement
//   prepareMapImage(svg, o) — async; returns an <img> that can be reused
//                             across template re-renders (avoids re-parsing)
//   downloadMapCard(o)      — async; renders + downloads a PNG

const CARD_WIDTH = 1200;
const CARD_HEIGHT = 1500;

const FONT_STACK = 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

// ---------- Template definitions ----------

export const TEMPLATES = [
  {
    id: 'midnight',
    name: 'Midnight',
    palette: ['#1e1b4b', '#13103a', '#fbbf24'],
    config: {
      bg: ['#1e1b4b', '#13103a', '#0a0820'],
      glows: [
        { x: 230, y: 140, color: 'rgba(167, 139, 250, 0.32)', radius: 720 },
        { x: CARD_WIDTH - 230, y: CARD_HEIGHT - 140, color: 'rgba(236, 72, 153, 0.22)', radius: 720 },
      ],
      text: { primary: '#ffffff', muted: 'rgba(255,255,255,0.72)', faint: 'rgba(255,255,255,0.45)', divider: 'rgba(255,255,255,0.12)' },
      eyebrow: '#fbbf24',
      titleGradient: ['#ffffff', '#d6ccff'],
      panel: { bg: 'rgba(255,255,255,0.04)', border: 'rgba(255,255,255,0.10)', legend: 'rgba(15,10,40,0.6)' },
      halo: 'rgba(167, 139, 250, 0.14)',
      statAccents: ['#34d399', '#a78bfa', '#fbbf24'],
      pillBg: 'rgba(255, 255, 255, 0.08)',
      pillBorder: 'rgba(255, 255, 255, 0.18)',
      pendingFill: 'rgba(167, 139, 250, 0.38)',
      pendingStroke: 'rgba(196, 181, 253, 0.7)',
    },
  },
  {
    id: 'sunset',
    name: 'Sunset',
    palette: ['#fb923c', '#db2777', '#fef3c7'],
    config: {
      bg: ['#7c2d12', '#be185d', '#431407'],
      glows: [
        { x: 230, y: 140, color: 'rgba(254, 215, 170, 0.38)', radius: 720 },
        { x: CARD_WIDTH - 200, y: CARD_HEIGHT - 200, color: 'rgba(251, 113, 133, 0.28)', radius: 720 },
      ],
      text: { primary: '#fef3c7', muted: 'rgba(254,243,199,0.85)', faint: 'rgba(254,243,199,0.55)', divider: 'rgba(254,243,199,0.2)' },
      eyebrow: '#fef3c7',
      titleGradient: ['#fef3c7', '#fed7aa'],
      panel: { bg: 'rgba(67, 20, 7, 0.25)', border: 'rgba(254, 215, 170, 0.22)', legend: 'rgba(67, 20, 7, 0.55)' },
      halo: 'rgba(254, 215, 170, 0.22)',
      statAccents: ['#34d399', '#fde68a', '#fb923c'],
      pillBg: 'rgba(255,255,255,0.14)',
      pillBorder: 'rgba(254, 215, 170, 0.3)',
      pendingFill: 'rgba(254, 215, 170, 0.48)',
      pendingStroke: 'rgba(254, 243, 199, 0.7)',
    },
  },
  {
    id: 'ocean',
    name: 'Ocean',
    palette: ['#0c4a6e', '#0369a1', '#67e8f9'],
    config: {
      bg: ['#0c4a6e', '#0369a1', '#082f49'],
      glows: [
        { x: 230, y: 140, color: 'rgba(103, 232, 249, 0.32)', radius: 720 },
        { x: CARD_WIDTH - 230, y: CARD_HEIGHT - 140, color: 'rgba(14, 165, 233, 0.22)', radius: 720 },
      ],
      text: { primary: '#ffffff', muted: 'rgba(186,230,253,0.85)', faint: 'rgba(186,230,253,0.55)', divider: 'rgba(186,230,253,0.2)' },
      eyebrow: '#67e8f9',
      titleGradient: ['#ffffff', '#bae6fd'],
      panel: { bg: 'rgba(255,255,255,0.04)', border: 'rgba(186, 230, 253, 0.18)', legend: 'rgba(8, 47, 73, 0.6)' },
      halo: 'rgba(103, 232, 249, 0.14)',
      statAccents: ['#34d399', '#67e8f9', '#fbbf24'],
      pillBg: 'rgba(255, 255, 255, 0.08)',
      pillBorder: 'rgba(186, 230, 253, 0.25)',
      pendingFill: 'rgba(125, 211, 252, 0.45)',
      pendingStroke: 'rgba(186, 230, 253, 0.75)',
    },
  },
  {
    id: 'forest',
    name: 'Forest',
    palette: ['#064e3b', '#065f46', '#a7f3d0'],
    config: {
      bg: ['#064e3b', '#065f46', '#022c22'],
      glows: [
        { x: 230, y: 140, color: 'rgba(167, 243, 208, 0.3)', radius: 720 },
        { x: CARD_WIDTH - 230, y: CARD_HEIGHT - 140, color: 'rgba(52, 211, 153, 0.18)', radius: 720 },
      ],
      text: { primary: '#ffffff', muted: 'rgba(209,250,229,0.85)', faint: 'rgba(209,250,229,0.55)', divider: 'rgba(209,250,229,0.2)' },
      eyebrow: '#a7f3d0',
      titleGradient: ['#ffffff', '#d1fae5'],
      panel: { bg: 'rgba(255,255,255,0.04)', border: 'rgba(167, 243, 208, 0.18)', legend: 'rgba(6, 44, 34, 0.6)' },
      halo: 'rgba(167, 243, 208, 0.12)',
      statAccents: ['#34d399', '#a7f3d0', '#fbbf24'],
      pillBg: 'rgba(255, 255, 255, 0.08)',
      pillBorder: 'rgba(167, 243, 208, 0.25)',
      pendingFill: 'rgba(167, 243, 208, 0.35)',
      pendingStroke: 'rgba(209, 250, 229, 0.7)',
    },
  },
  {
    id: 'aurora',
    name: 'Aurora',
    palette: ['#065f46', '#7c3aed', '#f472b6'],
    config: {
      bg: ['#065f46', '#4c1d95', '#831843'],
      glows: [
        { x: 230, y: 140, color: 'rgba(110, 231, 183, 0.32)', radius: 720 },
        { x: CARD_WIDTH - 230, y: CARD_HEIGHT - 140, color: 'rgba(244, 114, 182, 0.26)', radius: 720 },
      ],
      text: { primary: '#ffffff', muted: 'rgba(255,255,255,0.85)', faint: 'rgba(255,255,255,0.6)', divider: 'rgba(255,255,255,0.2)' },
      eyebrow: '#fde68a',
      titleGradient: ['#ffffff', '#bbf7d0'],
      panel: { bg: 'rgba(255,255,255,0.06)', border: 'rgba(255,255,255,0.14)', legend: 'rgba(22, 11, 57, 0.55)' },
      halo: 'rgba(124, 58, 237, 0.22)',
      statAccents: ['#34d399', '#f472b6', '#fde047'],
      pillBg: 'rgba(255, 255, 255, 0.12)',
      pillBorder: 'rgba(255, 255, 255, 0.22)',
      pendingFill: 'rgba(196, 181, 253, 0.40)',
      pendingStroke: 'rgba(244, 114, 182, 0.7)',
    },
  },
  {
    id: 'polaroid',
    name: 'Polaroid',
    palette: ['#fffbeb', '#d6a266', '#1f2937'],
    isLight: true,
    config: {
      bg: ['#fffbeb', '#fef3c7', '#fde68a'],
      glows: [
        { x: 230, y: 140, color: 'rgba(212, 163, 115, 0.25)', radius: 720 },
      ],
      text: { primary: '#1f2937', muted: 'rgba(120, 53, 15, 0.85)', faint: 'rgba(120, 53, 15, 0.6)', divider: 'rgba(120, 53, 15, 0.2)' },
      eyebrow: '#b45309',
      titleGradient: ['#78350f', '#b45309'],
      panel: { bg: 'rgba(255,255,255,0.4)', border: 'rgba(120, 53, 15, 0.2)', legend: 'rgba(255, 247, 237, 0.9)' },
      halo: 'rgba(212, 163, 115, 0.22)',
      statAccents: ['#059669', '#b45309', '#c2410c'],
      pillBg: 'rgba(120, 53, 15, 0.08)',
      pillBorder: 'rgba(120, 53, 15, 0.2)',
      pendingFill: 'rgba(212, 163, 115, 0.72)',
      pendingStroke: 'rgba(120, 53, 15, 0.6)',
    },
  },
  {
    id: 'minimal',
    name: 'Minimal',
    palette: ['#ffffff', '#0f172a', '#6366f1'],
    isLight: true,
    config: {
      bg: ['#ffffff', '#f8fafc', '#e2e8f0'],
      glows: [
        { x: 230, y: 140, color: 'rgba(99, 102, 241, 0.10)', radius: 700 },
      ],
      text: { primary: '#0f172a', muted: 'rgba(51, 65, 85, 0.88)', faint: 'rgba(71, 85, 105, 0.7)', divider: 'rgba(148, 163, 184, 0.3)' },
      eyebrow: '#6366f1',
      titleGradient: ['#0f172a', '#334155'],
      panel: { bg: 'rgba(255,255,255,0.7)', border: 'rgba(148, 163, 184, 0.3)', legend: 'rgba(255, 255, 255, 0.9)' },
      halo: 'rgba(99, 102, 241, 0.10)',
      statAccents: ['#059669', '#6366f1', '#d97706'],
      pillBg: 'rgba(99, 102, 241, 0.06)',
      pillBorder: 'rgba(99, 102, 241, 0.22)',
      pendingFill: 'rgba(148, 163, 184, 0.55)',
      pendingStroke: 'rgba(51, 65, 85, 0.65)',
    },
  },
  {
    id: 'neon',
    name: 'Neon',
    palette: ['#0b0218', '#a21caf', '#22d3ee'],
    config: {
      bg: ['#0b0218', '#1e1038', '#000000'],
      glows: [
        { x: 230, y: 140, color: 'rgba(217, 70, 239, 0.38)', radius: 720 },
        { x: CARD_WIDTH - 230, y: CARD_HEIGHT - 140, color: 'rgba(34, 211, 238, 0.30)', radius: 720 },
      ],
      text: { primary: '#ffffff', muted: 'rgba(253, 224, 255, 0.8)', faint: 'rgba(191, 219, 254, 0.55)', divider: 'rgba(255, 255, 255, 0.16)' },
      eyebrow: '#22d3ee',
      titleGradient: ['#ffffff', '#67e8f9'],
      panel: { bg: 'rgba(34, 211, 238, 0.04)', border: 'rgba(217, 70, 239, 0.25)', legend: 'rgba(11, 2, 24, 0.7)' },
      halo: 'rgba(217, 70, 239, 0.22)',
      statAccents: ['#22d3ee', '#d946ef', '#fde047'],
      pillBg: 'rgba(217, 70, 239, 0.14)',
      pillBorder: 'rgba(217, 70, 239, 0.36)',
      pendingFill: 'rgba(103, 232, 249, 0.30)',
      pendingStroke: 'rgba(217, 70, 239, 0.75)',
    },
  },
  {
    id: 'mono',
    name: 'Monochrome',
    palette: ['#0a0a0a', '#404040', '#fafafa'],
    config: {
      bg: ['#0a0a0a', '#171717', '#000000'],
      glows: [
        { x: 230, y: 140, color: 'rgba(255, 255, 255, 0.08)', radius: 700 },
      ],
      text: { primary: '#fafafa', muted: 'rgba(229, 229, 229, 0.82)', faint: 'rgba(163, 163, 163, 0.7)', divider: 'rgba(255, 255, 255, 0.14)' },
      eyebrow: '#fafafa',
      titleGradient: ['#ffffff', '#d4d4d4'],
      panel: { bg: 'rgba(255, 255, 255, 0.03)', border: 'rgba(255, 255, 255, 0.14)', legend: 'rgba(10, 10, 10, 0.72)' },
      halo: 'rgba(255, 255, 255, 0.08)',
      statAccents: ['#fafafa', '#a3a3a3', '#737373'],
      pillBg: 'rgba(255, 255, 255, 0.06)',
      pillBorder: 'rgba(255, 255, 255, 0.18)',
      pendingFill: 'rgba(212, 212, 212, 0.30)',
      pendingStroke: 'rgba(245, 245, 245, 0.65)',
    },
  },
  {
    id: 'retro',
    name: 'Retro',
    palette: ['#0f766e', '#facc15', '#fef3c7'],
    config: {
      bg: ['#0f766e', '#134e4a', '#0a1514'],
      glows: [
        { x: 230, y: 140, color: 'rgba(250, 204, 21, 0.26)', radius: 720 },
        { x: CARD_WIDTH - 230, y: CARD_HEIGHT - 140, color: 'rgba(20, 184, 166, 0.28)', radius: 720 },
      ],
      text: { primary: '#fef3c7', muted: 'rgba(254, 243, 199, 0.8)', faint: 'rgba(254, 243, 199, 0.55)', divider: 'rgba(254, 243, 199, 0.2)' },
      eyebrow: '#facc15',
      titleGradient: ['#fef3c7', '#fde047'],
      panel: { bg: 'rgba(250, 204, 21, 0.06)', border: 'rgba(250, 204, 21, 0.24)', legend: 'rgba(15, 118, 110, 0.55)' },
      halo: 'rgba(250, 204, 21, 0.20)',
      statAccents: ['#34d399', '#facc15', '#fed7aa'],
      pillBg: 'rgba(250, 204, 21, 0.1)',
      pillBorder: 'rgba(250, 204, 21, 0.32)',
      pendingFill: 'rgba(110, 231, 183, 0.32)',
      pendingStroke: 'rgba(250, 204, 21, 0.7)',
    },
  },
  {
    id: 'rosegold',
    name: 'Rose Gold',
    palette: ['#fed7d7', '#d4a373', '#92400e'],
    isLight: true,
    config: {
      bg: ['#fff1f2', '#fed7d7', '#fce7f3'],
      glows: [
        { x: 230, y: 140, color: 'rgba(212, 163, 115, 0.28)', radius: 720 },
        { x: CARD_WIDTH - 230, y: CARD_HEIGHT - 140, color: 'rgba(244, 114, 182, 0.20)', radius: 720 },
      ],
      text: { primary: '#78350f', muted: 'rgba(146, 64, 14, 0.85)', faint: 'rgba(146, 64, 14, 0.6)', divider: 'rgba(146, 64, 14, 0.2)' },
      eyebrow: '#be185d',
      titleGradient: ['#78350f', '#be185d'],
      panel: { bg: 'rgba(255, 255, 255, 0.55)', border: 'rgba(146, 64, 14, 0.22)', legend: 'rgba(255, 255, 255, 0.92)' },
      halo: 'rgba(212, 163, 115, 0.22)',
      statAccents: ['#059669', '#be185d', '#d97706'],
      pillBg: 'rgba(146, 64, 14, 0.08)',
      pillBorder: 'rgba(146, 64, 14, 0.22)',
      pendingFill: 'rgba(251, 113, 133, 0.55)',
      pendingStroke: 'rgba(146, 64, 14, 0.6)',
    },
  },
  {
    id: 'cinema',
    name: 'Cinema',
    palette: ['#0a0a0a', '#b45309', '#f5e6c8'],
    config: {
      bg: ['#0a0a0a', '#451a03', '#000000'],
      glows: [
        { x: 230, y: 140, color: 'rgba(245, 230, 200, 0.18)', radius: 720 },
        { x: CARD_WIDTH - 230, y: CARD_HEIGHT - 140, color: 'rgba(180, 83, 9, 0.28)', radius: 720 },
      ],
      text: { primary: '#f5e6c8', muted: 'rgba(245, 230, 200, 0.8)', faint: 'rgba(245, 230, 200, 0.5)', divider: 'rgba(245, 230, 200, 0.18)' },
      eyebrow: '#f5e6c8',
      titleGradient: ['#f5e6c8', '#d4a373'],
      panel: { bg: 'rgba(245, 230, 200, 0.04)', border: 'rgba(245, 230, 200, 0.18)', legend: 'rgba(10, 10, 10, 0.74)' },
      halo: 'rgba(180, 83, 9, 0.24)',
      statAccents: ['#34d399', '#f5e6c8', '#b45309'],
      pillBg: 'rgba(245, 230, 200, 0.08)',
      pillBorder: 'rgba(245, 230, 200, 0.22)',
      pendingFill: 'rgba(245, 230, 200, 0.40)',
      pendingStroke: 'rgba(180, 83, 9, 0.75)',
    },
  },
  {
    id: 'galaxy',
    name: 'Galaxy',
    palette: ['#0b0425', '#6d28d9', '#f472b6'],
    config: {
      bg: ['#0b0425', '#2e1065', '#000000'],
      glows: [
        { x: 300, y: 180, color: 'rgba(139, 92, 246, 0.38)', radius: 820 },
        { x: CARD_WIDTH - 260, y: CARD_HEIGHT - 180, color: 'rgba(244, 114, 182, 0.26)', radius: 820 },
        { x: CARD_WIDTH / 2, y: CARD_HEIGHT / 2, color: 'rgba(56, 189, 248, 0.12)', radius: 900 },
      ],
      text: { primary: '#ffffff', muted: 'rgba(221, 214, 254, 0.82)', faint: 'rgba(221, 214, 254, 0.55)', divider: 'rgba(221, 214, 254, 0.2)' },
      eyebrow: '#f0abfc',
      titleGradient: ['#ffffff', '#c4b5fd'],
      panel: { bg: 'rgba(124, 58, 237, 0.08)', border: 'rgba(196, 181, 253, 0.22)', legend: 'rgba(11, 4, 37, 0.7)' },
      halo: 'rgba(139, 92, 246, 0.22)',
      statAccents: ['#34d399', '#c4b5fd', '#f472b6'],
      pillBg: 'rgba(196, 181, 253, 0.10)',
      pillBorder: 'rgba(196, 181, 253, 0.3)',
      pendingFill: 'rgba(196, 181, 253, 0.38)',
      pendingStroke: 'rgba(240, 171, 252, 0.7)',
    },
  },
  {
    id: 'coral',
    name: 'Coral',
    palette: ['#fb7185', '#fda4af', '#fff1f2'],
    isLight: true,
    config: {
      bg: ['#ffe4e6', '#fecdd3', '#fed7aa'],
      glows: [
        { x: 260, y: 150, color: 'rgba(251, 113, 133, 0.26)', radius: 720 },
        { x: CARD_WIDTH - 220, y: CARD_HEIGHT - 180, color: 'rgba(253, 164, 175, 0.24)', radius: 720 },
      ],
      text: { primary: '#881337', muted: 'rgba(159, 18, 57, 0.85)', faint: 'rgba(159, 18, 57, 0.6)', divider: 'rgba(159, 18, 57, 0.22)' },
      eyebrow: '#e11d48',
      titleGradient: ['#881337', '#e11d48'],
      panel: { bg: 'rgba(255, 255, 255, 0.55)', border: 'rgba(159, 18, 57, 0.22)', legend: 'rgba(255, 241, 242, 0.92)' },
      halo: 'rgba(251, 113, 133, 0.22)',
      statAccents: ['#059669', '#e11d48', '#f97316'],
      pillBg: 'rgba(159, 18, 57, 0.08)',
      pillBorder: 'rgba(159, 18, 57, 0.22)',
      pendingFill: 'rgba(253, 164, 175, 0.68)',
      pendingStroke: 'rgba(159, 18, 57, 0.6)',
    },
  },
  {
    id: 'terracotta',
    name: 'Terracotta',
    palette: ['#9a3412', '#c2410c', '#fde68a'],
    config: {
      bg: ['#7c2d12', '#9a3412', '#44190b'],
      glows: [
        { x: 250, y: 170, color: 'rgba(253, 186, 116, 0.30)', radius: 760 },
        { x: CARD_WIDTH - 230, y: CARD_HEIGHT - 150, color: 'rgba(251, 146, 60, 0.22)', radius: 760 },
      ],
      text: { primary: '#fef3c7', muted: 'rgba(254, 243, 199, 0.82)', faint: 'rgba(254, 243, 199, 0.55)', divider: 'rgba(254, 243, 199, 0.22)' },
      eyebrow: '#fdba74',
      titleGradient: ['#fff7ed', '#fdba74'],
      panel: { bg: 'rgba(254, 215, 170, 0.05)', border: 'rgba(254, 215, 170, 0.22)', legend: 'rgba(44, 15, 8, 0.68)' },
      halo: 'rgba(253, 186, 116, 0.22)',
      statAccents: ['#34d399', '#fdba74', '#fef3c7'],
      pillBg: 'rgba(254, 215, 170, 0.10)',
      pillBorder: 'rgba(254, 215, 170, 0.28)',
      pendingFill: 'rgba(253, 186, 116, 0.45)',
      pendingStroke: 'rgba(254, 215, 170, 0.75)',
    },
  },
  {
    id: 'passport',
    name: 'Passport',
    palette: ['#052e16', '#166534', '#f59e0b'],
    config: {
      bg: ['#052e16', '#14532d', '#022c22'],
      glows: [
        { x: 230, y: 180, color: 'rgba(245, 158, 11, 0.18)', radius: 760 },
        { x: CARD_WIDTH - 230, y: CARD_HEIGHT - 150, color: 'rgba(34, 197, 94, 0.2)', radius: 760 },
      ],
      text: { primary: '#f7fee7', muted: 'rgba(220, 252, 231, 0.82)', faint: 'rgba(220, 252, 231, 0.55)', divider: 'rgba(220, 252, 231, 0.22)' },
      eyebrow: '#fbbf24',
      titleGradient: ['#f7fee7', '#fde68a'],
      panel: { bg: 'rgba(245, 158, 11, 0.05)', border: 'rgba(245, 158, 11, 0.22)', legend: 'rgba(5, 46, 22, 0.7)' },
      halo: 'rgba(245, 158, 11, 0.20)',
      statAccents: ['#fbbf24', '#86efac', '#fcd34d'],
      pillBg: 'rgba(245, 158, 11, 0.10)',
      pillBorder: 'rgba(245, 158, 11, 0.3)',
      pendingFill: 'rgba(134, 239, 172, 0.32)',
      pendingStroke: 'rgba(245, 158, 11, 0.7)',
    },
  },
  {
    id: 'candy',
    name: 'Candy',
    palette: ['#f0abfc', '#22d3ee', '#fef08a'],
    config: {
      bg: ['#701a75', '#155e75', '#831843'],
      glows: [
        { x: 250, y: 150, color: 'rgba(240, 171, 252, 0.32)', radius: 780 },
        { x: CARD_WIDTH - 220, y: CARD_HEIGHT - 150, color: 'rgba(34, 211, 238, 0.26)', radius: 780 },
      ],
      text: { primary: '#ffffff', muted: 'rgba(254, 240, 138, 0.88)', faint: 'rgba(254, 240, 138, 0.6)', divider: 'rgba(254, 240, 138, 0.2)' },
      eyebrow: '#fef08a',
      titleGradient: ['#ffffff', '#f0abfc'],
      panel: { bg: 'rgba(240, 171, 252, 0.08)', border: 'rgba(254, 240, 138, 0.22)', legend: 'rgba(112, 26, 117, 0.7)' },
      halo: 'rgba(240, 171, 252, 0.22)',
      statAccents: ['#34d399', '#f0abfc', '#fef08a'],
      pillBg: 'rgba(240, 171, 252, 0.12)',
      pillBorder: 'rgba(240, 171, 252, 0.30)',
      pendingFill: 'rgba(240, 171, 252, 0.38)',
      pendingStroke: 'rgba(254, 240, 138, 0.7)',
    },
  },
];

export function getTemplate(id) {
  return TEMPLATES.find(t => t.id === id) || TEMPLATES[0];
}

// ---------- SVG cloning & rasterization ----------

// Recognise a path as a country/state so we can theme it.
//   - World-map SVG: paths are siblings of a <title>, or inside a <g> with one
//   - react-svg-map (country maps): paths use class="svg-map__location"
// Decorative paths (ocean, sphere outline) won't match either test.
function isRegionPath(el) {
  if (!el || el.tagName !== 'path') return false;
  if (el.classList?.contains('svg-map__location')) return true;
  if (el.previousElementSibling?.tagName === 'title') return true;
  if (el.nextElementSibling?.tagName === 'title') return true;
  let p = el.parentElement;
  while (p && p.tagName !== 'svg') {
    if (p.tagName === 'g') {
      for (let i = 0; i < p.children.length; i++) {
        if (p.children[i].tagName === 'title') return true;
      }
    }
    p = p.parentElement;
  }
  return false;
}

function inlineSvgStyles(svgEl, opts = {}) {
  const { pendingFill, pendingStroke } = opts;
  const clone = svgEl.cloneNode(true);
  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  clone.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');

  clone.style.transform = '';
  clone.style.transformOrigin = '';
  clone.style.transition = '';
  clone.style.willChange = '';
  clone.removeAttribute('style');

  const bounds = svgEl.getBoundingClientRect();
  const viewBox = svgEl.getAttribute('viewBox');
  let vbW = 1000;
  let vbH = 600;
  if (!viewBox && bounds.width && bounds.height) {
    vbW = bounds.width;
    vbH = bounds.height;
    clone.setAttribute('viewBox', `0 0 ${vbW} ${vbH}`);
  }
  if (viewBox) {
    const parts = viewBox.split(/\s+/).map(Number);
    vbW = parts[2] || vbW;
    vbH = parts[3] || vbH;
    if (vbW) clone.setAttribute('width', vbW);
    if (vbH) clone.setAttribute('height', vbH);
  } else {
    clone.setAttribute('width', Math.round(bounds.width));
    clone.setAttribute('height', Math.round(bounds.height));
  }

  // Pick a stroke-width that's proportional to the viewBox so borders read
  // consistently across wildly different source SVGs. 0.2% of the longest
  // dimension lands at roughly 1.5-2px in the final render for any source.
  const boundaryStrokeW = Math.max(vbW, vbH) * 0.002;
  const selectedStrokeW = boundaryStrokeW * 1.4;

  // "3D" lift for stamped regions via a drop shadow rendered as a second
  // path layer. Using real paths instead of an SVG <filter> — filter
  // effects behave inconsistently when the SVG is loaded as an <img> and
  // some complex country paths render as solid black shadow only.
  const shadowDy = Math.max(vbW, vbH) * 0.004;

  const liveNodes = [svgEl, ...svgEl.querySelectorAll('*')];
  const cloneNodes = [clone, ...clone.querySelectorAll('*')];
  const PAINT_TAGS = ['path', 'circle', 'polygon', 'rect', 'g', 'ellipse', 'line', 'polyline'];
  for (let i = 0; i < liveNodes.length && i < cloneNodes.length; i++) {
    const live = liveNodes[i];
    const dst = cloneNodes[i];
    if (!(live instanceof Element)) continue;
    const tag = live.tagName && live.tagName.toLowerCase();
    if (!PAINT_TAGS.includes(tag)) continue;

    const cs = window.getComputedStyle(live);
    const isSelected = live.classList?.contains('selected');
    const isCountryPath = tag === 'path' && isRegionPath(live);
    const isPendingCountry = !isSelected && isCountryPath && pendingFill;

    if (isPendingCountry) {
      dst.setAttribute('fill', pendingFill);
      dst.setAttribute('stroke', pendingStroke || 'rgba(251, 191, 36, 0.55)');
      dst.setAttribute('stroke-width', String(boundaryStrokeW));
    } else if (isSelected && isCountryPath) {
      // Selected countries keep their computed green fill, get a thicker
      // outline, and get tagged so we can drop a shadow path beneath them
      // in a second pass.
      if (cs.fill && cs.fill !== 'none') dst.setAttribute('fill', cs.fill);
      if (cs.stroke && cs.stroke !== 'none') dst.setAttribute('stroke', cs.stroke);
      dst.setAttribute('stroke-width', String(selectedStrokeW));
      dst.setAttribute('data-smp-stamped', '1');
    } else {
      if (cs.fill && cs.fill !== 'none') dst.setAttribute('fill', cs.fill);
      if (cs.stroke && cs.stroke !== 'none') dst.setAttribute('stroke', cs.stroke);
      if (cs.strokeWidth) dst.setAttribute('stroke-width', cs.strokeWidth);
    }
    if (cs.opacity && cs.opacity !== '1') dst.setAttribute('opacity', cs.opacity);
    if (cs.fillOpacity && cs.fillOpacity !== '1') dst.setAttribute('fill-opacity', cs.fillOpacity);
    if (cs.strokeOpacity && cs.strokeOpacity !== '1') dst.setAttribute('stroke-opacity', cs.strokeOpacity);
    dst.removeAttribute('class');
  }

  // Second pass — for every stamped path, insert a dark clone just behind
  // it, offset downward. Two layers at different offsets give a soft
  // "floating off the map" look without relying on SVG filters (which
  // render unreliably inside <img>-loaded SVGs in some browsers).
  const stamped = Array.from(clone.querySelectorAll('[data-smp-stamped]'));
  stamped.forEach(p => {
    [
      { dy: shadowDy * 1.6, opacity: 0.28 },
      { dy: shadowDy * 0.9, opacity: 0.38 },
    ].forEach(layer => {
      const shadow = p.cloneNode(true);
      shadow.setAttribute('fill', '#000000');
      shadow.setAttribute('fill-opacity', String(layer.opacity));
      shadow.setAttribute('stroke', 'none');
      shadow.setAttribute('transform', `translate(0 ${layer.dy})`);
      shadow.removeAttribute('data-smp-stamped');
      p.parentNode.insertBefore(shadow, p);
    });
    p.removeAttribute('data-smp-stamped');
  });

  return clone;
}

function svgToImage(svgEl) {
  return new Promise((resolve, reject) => {
    const xml = new XMLSerializer().serializeToString(svgEl);
    const encoded = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(xml);
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(new Error('Failed to load SVG image: ' + (e?.message || 'unknown')));
    img.src = encoded;
  });
}

// Public helper: prepare a cached image once, reuse it across template re-renders.
// The returned image is tagged with its bake-in colors so callers can detect
// when the cache is stale for the active template.
export async function prepareMapImage(svgElement, opts = {}) {
  const inlined = inlineSvgStyles(svgElement, opts);
  const img = await svgToImage(inlined);
  img.__pendingFill = opts.pendingFill;
  img.__pendingStroke = opts.pendingStroke;
  return img;
}

// ---------- Canvas drawing helpers ----------

function roundRect(ctx, x, y, w, h, r) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y,     x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x,     y + h, radius);
  ctx.arcTo(x,     y + h, x,     y,     radius);
  ctx.arcTo(x,     y,     x + w, y,     radius);
  ctx.closePath();
}

function circle(ctx, cx, cy, r) {
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.closePath();
}

function centeredText(ctx, text, cx, y, options = {}) {
  const { font, color, align = 'center', maxWidth } = options;
  if (font) ctx.font = font;
  if (color) ctx.fillStyle = color;
  ctx.textAlign = align;
  ctx.textBaseline = 'top';
  if (maxWidth) ctx.fillText(text, cx, y, maxWidth);
  else ctx.fillText(text, cx, y);
  ctx.textAlign = 'left';
}

function drawEyebrow(ctx, text, y, cfg) {
  ctx.save();
  const cx = CARD_WIDTH / 2;
  ctx.font = `600 18px ${FONT_STACK}`;
  const w = ctx.measureText(text).width;
  const lineLen = 120;
  const gap = 18;
  const totalW = lineLen * 2 + gap * 2 + w;
  const startX = cx - totalW / 2;

  const grL = ctx.createLinearGradient(startX, 0, startX + lineLen, 0);
  grL.addColorStop(0, 'rgba(255, 255, 255, 0)');
  grL.addColorStop(1, cfg.eyebrow);
  ctx.fillStyle = grL;
  ctx.fillRect(startX, y + 9, lineLen, 2);

  ctx.fillStyle = cfg.eyebrow;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillText(text, cx, y);

  const grR = ctx.createLinearGradient(startX + lineLen + gap * 2 + w, 0, startX + lineLen + gap * 2 + w + lineLen, 0);
  grR.addColorStop(0, cfg.eyebrow);
  grR.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = grR;
  ctx.fillRect(startX + lineLen + gap * 2 + w, y + 9, lineLen, 2);
  ctx.restore();
}

function drawBackground(ctx, cfg) {
  const [c0, c1, c2] = cfg.bg;
  const bg = ctx.createLinearGradient(0, 0, CARD_WIDTH, CARD_HEIGHT);
  bg.addColorStop(0, c0);
  bg.addColorStop(0.55, c1);
  bg.addColorStop(1, c2);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT);

  (cfg.glows || []).forEach(g => {
    const grad = ctx.createRadialGradient(g.x, g.y, 0, g.x, g.y, g.radius);
    grad.addColorStop(0, g.color);
    grad.addColorStop(1, g.color.replace(/[\d.]+\)$/, '0)'));
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT);
  });
}

function drawTopBar(ctx, cfg) {
  const padding = 60;
  const y = 56;

  ctx.fillStyle = cfg.text.primary;
  ctx.textBaseline = 'top';
  ctx.textAlign = 'left';
  ctx.font = `800 32px ${FONT_STACK}`;
  ctx.fillText('🗺️  StampYourMap', padding, y);

  // URL pill — larger, higher contrast, with a globe mark so it reads as a
  // destination not an afterthought.
  const globe = '🌐';
  const urlText = 'stampyourmap.com';
  ctx.font = `800 22px ${FONT_STACK}`;
  const urlTextW = ctx.measureText(urlText).width;
  ctx.font = `400 22px ${FONT_STACK}`;
  const globeW = ctx.measureText(globe).width;
  const pillPadX = 22;
  const pillGap = 10;
  const pillH = 46;
  const pillW = urlTextW + globeW + pillGap + pillPadX * 2;
  const pillX = CARD_WIDTH - padding - pillW;
  const pillY = y - 6;

  ctx.fillStyle = cfg.pillBg;
  roundRect(ctx, pillX, pillY, pillW, pillH, pillH / 2);
  ctx.fill();
  ctx.strokeStyle = cfg.pillBorder;
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Globe
  ctx.textBaseline = 'middle';
  ctx.font = `400 22px ${FONT_STACK}`;
  ctx.fillStyle = cfg.text.primary;
  ctx.fillText(globe, pillX + pillPadX, pillY + pillH / 2 + 2);

  // URL — bold, primary color for max legibility
  ctx.font = `800 22px ${FONT_STACK}`;
  ctx.fillStyle = cfg.text.primary;
  ctx.fillText(urlText, pillX + pillPadX + globeW + pillGap, pillY + pillH / 2 + 1);
  ctx.textBaseline = 'top';

  ctx.fillStyle = cfg.text.divider;
  ctx.fillRect(padding, y + 62, CARD_WIDTH - padding * 2, 1);
}

function drawHero(ctx, { title, subtitle, userName, showUserName, eyebrow }, cfg) {
  const cx = CARD_WIDTH / 2;
  let y = 148;

  drawEyebrow(ctx, (eyebrow || 'JUST STAMPED').toUpperCase(), y, cfg);
  y += 54;

  ctx.save();
  const [g0, g1] = cfg.titleGradient;
  const titleGrad = ctx.createLinearGradient(0, y, 0, y + 90);
  titleGrad.addColorStop(0, g0);
  titleGrad.addColorStop(1, g1);
  centeredText(ctx, title, cx, y, {
    font: `900 72px ${FONT_STACK}`,
    color: titleGrad,
  });
  ctx.restore();
  y += 94;

  centeredText(ctx, subtitle, cx, y, {
    font: `500 22px ${FONT_STACK}`,
    color: cfg.text.muted,
  });
  y += 36;

  if (userName && showUserName !== false) {
    centeredText(ctx, `by ${userName}`, cx, y, {
      font: `500 18px ${FONT_STACK}`,
      color: cfg.text.faint,
    });
  }
}

// Word-wrap and centre a short block of custom text (a user tagline).
function drawTagline(ctx, text, y, cfg, maxLines = 2) {
  if (!text || !text.trim()) return y;
  const padding = 80;
  const cx = CARD_WIDTH / 2;
  const maxW = CARD_WIDTH - padding * 2;

  ctx.save();
  ctx.font = `italic 500 24px ${FONT_STACK}`;
  ctx.fillStyle = cfg.text.muted;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';

  const words = text.trim().split(/\s+/);
  const lines = [];
  let line = '';
  for (const w of words) {
    const test = line ? line + ' ' + w : w;
    if (ctx.measureText(test).width > maxW && line) {
      lines.push(line);
      line = w;
      if (lines.length >= maxLines - 1) break;
    } else {
      line = test;
    }
  }
  if (line && lines.length < maxLines) lines.push(line);

  // Leading + trailing quote mark for the first/last line
  const first = lines.length ? '"' + lines[0] : '';
  const rest = lines.slice(1, -1);
  const last = lines.length > 1 ? lines[lines.length - 1] + '"' : (lines.length === 1 ? first + '"' : '');
  const finalLines = lines.length > 1 ? [first, ...rest, last] : [last];

  finalLines.forEach((l, i) => ctx.fillText(l, cx, y + i * 32));
  ctx.restore();
  return y + finalLines.length * 32;
}

function drawMapPanel(ctx, img, cfg) {
  const padding = 60;
  const mapBoxX = padding;
  const mapBoxY = 370;
  const mapBoxW = CARD_WIDTH - padding * 2;
  const mapBoxH = 700;

  const halo = ctx.createRadialGradient(
    mapBoxX + mapBoxW / 2, mapBoxY + mapBoxH / 2, 0,
    mapBoxX + mapBoxW / 2, mapBoxY + mapBoxH / 2, mapBoxW * 0.55
  );
  halo.addColorStop(0, cfg.halo);
  halo.addColorStop(1, cfg.halo.replace(/[\d.]+\)$/, '0)'));
  ctx.fillStyle = halo;
  ctx.fillRect(0, mapBoxY - 40, CARD_WIDTH, mapBoxH + 80);

  ctx.fillStyle = cfg.panel.bg;
  roundRect(ctx, mapBoxX, mapBoxY, mapBoxW, mapBoxH, 28);
  ctx.fill();
  ctx.strokeStyle = cfg.panel.border;
  ctx.lineWidth = 1;
  ctx.stroke();

  const pad = 40;
  const innerX = mapBoxX + pad;
  const innerY = mapBoxY + pad;
  const innerW = mapBoxW - pad * 2;
  const innerH = mapBoxH - pad * 2;
  const imgW = img.naturalWidth || img.width || innerW;
  const imgH = img.naturalHeight || img.height || innerH;
  const scale = Math.min(innerW / imgW, innerH / imgH);
  const drawW = imgW * scale;
  const drawH = imgH * scale;
  const drawX = innerX + (innerW - drawW) / 2;
  const drawY = innerY + (innerH - drawH) / 2;
  ctx.drawImage(img, drawX, drawY, drawW, drawH);

  const legendItems = [
    { label: 'Visited', color: '#34d399' },
    { label: 'Pending', color: '#fbbf24' },
  ];
  const itemW = 120;
  const gap = 16;
  const legendH = 38;
  const legendW = legendItems.length * itemW + (legendItems.length - 1) * gap;
  const legendX = mapBoxX + (mapBoxW - legendW) / 2;
  const legendY = mapBoxY + mapBoxH - legendH - 18;

  legendItems.forEach((item, i) => {
    const x = legendX + i * (itemW + gap);
    ctx.fillStyle = cfg.panel.legend;
    roundRect(ctx, x, legendY, itemW, legendH, 19);
    ctx.fill();
    ctx.strokeStyle = cfg.panel.border;
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = item.color;
    circle(ctx, x + 20, legendY + legendH / 2, 6);
    ctx.fill();

    ctx.fillStyle = cfg.text.primary;
    ctx.font = `600 14px ${FONT_STACK}`;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'left';
    ctx.fillText(item.label, x + 34, legendY + legendH / 2 + 1);
  });
  ctx.textBaseline = 'top';

  return mapBoxY + mapBoxH;
}

function drawStatsRow(ctx, y, stats, cfg) {
  const padding = 60;
  const gap = 20;
  const blockW = (CARD_WIDTH - padding * 2 - gap * (stats.length - 1)) / stats.length;
  const h = 140;

  stats.forEach((s, i) => {
    const x = padding + i * (blockW + gap);
    const accent = s.accent || cfg.statAccents[i % cfg.statAccents.length];

    ctx.fillStyle = accent;
    roundRect(ctx, x, y, blockW, 4, 2);
    ctx.fill();

    ctx.fillStyle = cfg.panel.bg;
    roundRect(ctx, x, y + 4, blockW, h - 4, 18);
    ctx.fill();
    ctx.strokeStyle = cfg.panel.border;
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = accent;
    ctx.font = `900 54px ${FONT_STACK}`;
    ctx.textBaseline = 'top';
    ctx.textAlign = 'center';
    ctx.fillText(String(s.value), x + blockW / 2, y + 24);

    ctx.fillStyle = cfg.text.muted;
    ctx.font = `600 16px ${FONT_STACK}`;
    ctx.fillText(s.label.toUpperCase(), x + blockW / 2, y + 88);
    ctx.textAlign = 'left';
  });
  return y + h;
}

function drawVisitedList(ctx, y, visitedNames, cfg) {
  if (!visitedNames?.length) return y;
  const padding = 60;
  const maxW = CARD_WIDTH - padding * 2;
  const cx = CARD_WIDTH / 2;

  ctx.textAlign = 'center';
  ctx.fillStyle = cfg.text.faint;
  ctx.font = `700 14px ${FONT_STACK}`;
  ctx.textBaseline = 'top';
  ctx.fillText('STAMPED', cx, y);
  y += 26;

  ctx.fillStyle = cfg.text.primary;
  ctx.font = `500 20px ${FONT_STACK}`;

  const display = visitedNames.slice(0, 30);
  const extra = visitedNames.length - display.length;
  const tokens = display.map((n, i) => (i < display.length - 1 || extra > 0) ? n + ', ' : n);
  if (extra > 0) tokens.push(`+${extra} more`);

  let line = '';
  const lines = [];
  for (const t of tokens) {
    const test = line + t;
    if (ctx.measureText(test).width > maxW && line) {
      lines.push(line.trim().replace(/,$/, ''));
      line = t;
      if (lines.length >= 2) break;
    } else {
      line = test;
    }
  }
  if (line && lines.length < 2) lines.push(line.trim().replace(/,$/, ''));

  lines.slice(0, 2).forEach((l, i) => {
    ctx.fillText(l, cx, y + i * 30);
  });
  ctx.textAlign = 'left';
  return y + lines.length * 30;
}

function drawFooter(ctx, cfg) {
  const padding = 60;
  const y = CARD_HEIGHT - 60;

  ctx.fillStyle = cfg.text.divider;
  ctx.fillRect(padding, y - 20, CARD_WIDTH - padding * 2, 1);

  ctx.fillStyle = cfg.text.faint;
  ctx.font = `500 15px ${FONT_STACK}`;
  ctx.textBaseline = 'top';

  ctx.textAlign = 'center';
  ctx.fillText('Stamp every country you\'ve visited', CARD_WIDTH / 2, y);
  ctx.textAlign = 'left';
}

// Decorative outer frame — double stroke, theme-aware. Makes the export feel
// like a framed print/postcard instead of a raw gradient poster.
function drawFrame(ctx, cfg) {
  const outerInset = 24;
  const innerInset = 38;
  const radiusOuter = 22;
  const radiusInner = 14;

  ctx.save();
  // Outer stroke — slightly brighter
  ctx.strokeStyle = cfg.text.divider;
  ctx.lineWidth = 1.5;
  roundRect(ctx, outerInset, outerInset, CARD_WIDTH - outerInset * 2, CARD_HEIGHT - outerInset * 2, radiusOuter);
  ctx.stroke();

  // Inner stroke — subtler, creates the double-border effect
  ctx.strokeStyle = cfg.text.divider;
  ctx.lineWidth = 1;
  ctx.globalAlpha = 0.55;
  roundRect(ctx, innerInset, innerInset, CARD_WIDTH - innerInset * 2, CARD_HEIGHT - innerInset * 2, radiusInner);
  ctx.stroke();
  ctx.restore();
}

// ---------- Public rendering API ----------

export async function renderMapCardCanvas(opts) {
  const {
    svgElement, mapImage,
    title, subtitle, userName, stats, visitedNames,
    pendingFill, pendingStroke,
    templateId = 'midnight',
    customTagline = '',
    eyebrow,
    showUserName = true,
    showStats = true,
    showVisitedList = true,
  } = opts;

  const template = getTemplate(templateId);
  const cfg = template.config;

  // The template's own pending palette wins — that's what keeps each card
  // feeling cohesive. Caller-supplied values are just a fallback.
  const effectivePendingFill = cfg.pendingFill || pendingFill;
  const effectivePendingStroke = cfg.pendingStroke || pendingStroke;

  const canvas = document.createElement('canvas');
  canvas.width = CARD_WIDTH;
  canvas.height = CARD_HEIGHT;
  const ctx = canvas.getContext('2d');

  drawBackground(ctx, cfg);
  drawTopBar(ctx, cfg);
  drawHero(ctx, { title, subtitle, userName, showUserName, eyebrow }, cfg);

  // If a pre-prepared image was passed in, it's only valid when its bake-in
  // colors match the template's. Otherwise re-rasterize with the right tint.
  let img = mapImage;
  if (!img || (mapImage && (mapImage.__pendingFill !== effectivePendingFill || mapImage.__pendingStroke !== effectivePendingStroke))) {
    img = await prepareMapImage(svgElement, {
      pendingFill: effectivePendingFill,
      pendingStroke: effectivePendingStroke,
    });
  }
  drawMapPanel(ctx, img, cfg);

  let cursorY = 370 + 700 + 30;
  if (showStats && stats?.length) {
    cursorY = drawStatsRow(ctx, cursorY, stats, cfg);
    cursorY += 24;
  }
  if (customTagline) {
    cursorY = drawTagline(ctx, customTagline, cursorY, cfg);
    cursorY += 18;
  }
  if (showVisitedList) {
    drawVisitedList(ctx, cursorY, visitedNames, cfg);
  }

  drawFooter(ctx, cfg);
  drawFrame(ctx, cfg);
  return canvas;
}

export async function downloadMapCard(opts) {
  const canvas = await renderMapCardCanvas(opts);
  const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
  if (!blob) throw new Error('toBlob returned null');

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const safe = (opts.filename || 'stampyourmap-map')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60);
  a.download = `${safe}.png`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}
