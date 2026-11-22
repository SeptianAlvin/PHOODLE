/**
 * 18 Pilihan Stiker Vektor Estetik & Tajam untuk PHOODLE Canvas Studio
 * Dirender 100% lokal memakai SVG string murni tanpa gambar eksternal
 */

export const STICKER_ITEMS = [
  // 1. Tipografi & Badges
  {
    id: 'badge-surabaya',
    name: 'Surabaya Vibes',
    category: 'Text',
    svg: `<svg viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="196" height="56" rx="28" fill="#F59E0B" stroke="#000000" stroke-width="4"/>
      <text x="100" y="38" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="19" fill="#000000" text-anchor="middle" letter-spacing="1">SURABAYA VIBES</text>
    </svg>`,
    preview: 'Surabaya Vibes',
    isText: true,
    bg: 'bg-amber-400 text-black',
  },
  {
    id: 'badge-bestie',
    name: 'Bestie Forever',
    category: 'Text',
    svg: `<svg viewBox="0 0 190 60" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="186" height="56" rx="28" fill="#F472B6" stroke="#9D174D" stroke-width="3"/>
      <text x="95" y="38" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="19" fill="#FFFFFF" text-anchor="middle">BESTIE FOREVER ♡</text>
    </svg>`,
    preview: 'Bestie Forever ♡',
    isText: true,
    bg: 'bg-pink-400 text-white',
  },
  {
    id: 'badge-seoul',
    name: 'Seoul Style',
    category: 'Text',
    svg: `<svg viewBox="0 0 170 60" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="166" height="56" rx="28" fill="#6366F1" stroke="#312E81" stroke-width="3"/>
      <text x="85" y="38" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="18" fill="#FFFFFF" text-anchor="middle">SEOUL STYLE ★</text>
    </svg>`,
    preview: 'Seoul Style ★',
    isText: true,
    bg: 'bg-indigo-600 text-white',
  },
  {
    id: 'badge-phoodle',
    name: 'Phoodle 2026',
    category: 'Text',
    svg: `<svg viewBox="0 0 180 54" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="176" height="50" rx="14" fill="#0F172A" stroke="#F59E0B" stroke-width="3"/>
      <text x="90" y="34" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="17" fill="#FDE047" text-anchor="middle" letter-spacing="2">PHOODLE 2026</text>
    </svg>`,
    preview: 'PHOODLE 2026',
    isText: true,
    bg: 'bg-slate-900 text-amber-300',
  },
  {
    id: 'badge-campus',
    name: 'Campus Life',
    category: 'Text',
    svg: `<svg viewBox="0 0 180 56" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="176" height="52" rx="16" fill="#1E3A8A" stroke="#F59E0B" stroke-width="3"/>
      <text x="90" y="35" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="18" fill="#FEF3C7" text-anchor="middle">CAMPUS LIFE 🎓</text>
    </svg>`,
    preview: 'CAMPUS LIFE 🎓',
    isText: true,
    bg: 'bg-blue-900 text-amber-200',
  },
  {
    id: 'badge-vibes',
    name: 'Good Vibes',
    category: 'Text',
    svg: `<svg viewBox="0 0 170 54" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="166" height="50" rx="25" fill="#10B981" stroke="#064E3B" stroke-width="3"/>
      <text x="85" y="34" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="18" fill="#FFFFFF" text-anchor="middle">GOOD VIBES ✌</text>
    </svg>`,
    preview: 'Good Vibes ✌',
    isText: true,
    bg: 'bg-emerald-500 text-white',
  },
  {
    id: 'badge-photodump',
    name: 'Photo Dump',
    category: 'Text',
    svg: `<svg viewBox="0 0 180 56" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="176" height="52" rx="14" fill="#E11D48" stroke="#881337" stroke-width="3"/>
      <text x="90" y="35" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="17" fill="#FFFFFF" text-anchor="middle">PHOTO DUMP 📸</text>
    </svg>`,
    preview: 'PHOTO DUMP 📸',
    isText: true,
    bg: 'bg-rose-600 text-white',
  },

  // 2. Grafis Vektor Estetik
  {
    id: 'svg-heart-red',
    name: 'Heart Love',
    category: 'Doodle',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 88 C20 65 5 45 5 28 C5 12 18 2 32 2 C42 2 48 8 50 14 C52 8 58 2 68 2 C82 2 95 12 95 28 C95 45 80 65 50 88 Z" fill="#EF4444" stroke="#7F1D1D" stroke-width="4"/>
    </svg>`,
    preview: '❤️',
  },
  {
    id: 'svg-sparkle-star',
    name: 'Magic Star',
    category: 'Sparkle',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 0 L58 35 L95 42 L65 65 L75 100 L50 78 L25 100 L35 65 L5 42 L42 35 Z" fill="#FBBF24" stroke="#D97706" stroke-width="4"/>
    </svg>`,
    preview: '⭐',
  },
  {
    id: 'svg-glitter-sparkles',
    name: 'Glitter Sparkle',
    category: 'Sparkle',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 5 Q50 50 95 50 Q50 50 50 95 Q50 50 5 50 Q50 50 50 5 Z" fill="#6366F1" stroke="#4338CA" stroke-width="3"/>
      <circle cx="80" cy="20" r="8" fill="#F43F5E"/>
      <circle cx="20" cy="80" r="6" fill="#F59E0B"/>
    </svg>`,
    preview: '✨',
  },
  {
    id: 'svg-crown-vip',
    name: 'Crown VIP',
    category: 'VIP',
    svg: `<svg viewBox="0 0 100 80" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 70 L90 70 L95 25 L65 48 L50 15 L35 48 L5 25 Z" fill="#F59E0B" stroke="#78350F" stroke-width="4"/>
      <circle cx="50" cy="15" r="5" fill="#EF4444"/>
      <circle cx="95" cy="25" r="5" fill="#3B82F6"/>
      <circle cx="5" cy="25" r="5" fill="#3B82F6"/>
    </svg>`,
    preview: '👑',
  },
  {
    id: 'svg-sun-glasses',
    name: 'Retro Sunglasses',
    category: 'Accessory',
    svg: `<svg viewBox="0 0 120 50" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="10" width="48" height="32" rx="8" fill="#0F172A" stroke="#F59E0B" stroke-width="3"/>
      <rect x="67" y="10" width="48" height="32" rx="8" fill="#0F172A" stroke="#F59E0B" stroke-width="3"/>
      <line x1="53" y1="20" x2="67" y2="20" stroke="#F59E0B" stroke-width="4"/>
      <path d="M12 18 L30 18" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
      <path d="M74 18 L92 18" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
    </svg>`,
    preview: '🕶️',
  },
  {
    id: 'svg-sakura-flower',
    name: 'Sakura Blossom',
    category: 'Doodle',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="25" r="18" fill="#FBCFE8"/>
      <circle cx="75" cy="45" r="18" fill="#FBCFE8"/>
      <circle cx="65" cy="75" r="18" fill="#FBCFE8"/>
      <circle cx="35" cy="75" r="18" fill="#FBCFE8"/>
      <circle cx="25" cy="45" r="18" fill="#FBCFE8"/>
      <circle cx="50" cy="50" r="14" fill="#FDE047" stroke="#D97706" stroke-width="2"/>
    </svg>`,
    preview: '🌸',
  },
  {
    id: 'svg-y2k-cherries',
    name: 'Y2K Cherries',
    category: 'Doodle',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="35" cy="70" r="20" fill="#DC2626" stroke="#7F1D1D" stroke-width="3"/>
      <circle cx="70" cy="65" r="20" fill="#DC2626" stroke="#7F1D1D" stroke-width="3"/>
      <path d="M35 50 C40 25 50 15 60 10 C60 25 65 40 70 45" fill="none" stroke="#15803D" stroke-width="4" stroke-linecap="round"/>
      <circle cx="30" cy="65" r="4" fill="#FFFFFF"/>
      <circle cx="65" cy="60" r="4" fill="#FFFFFF"/>
    </svg>`,
    preview: '🍒',
  },
  {
    id: 'svg-ribbon-bow',
    name: 'Cute Bow Ribbon',
    category: 'Accessory',
    svg: `<svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
      <path d="M60 40 C30 20 10 20 10 40 C10 60 30 60 60 40 Z" fill="#F472B6" stroke="#9D174D" stroke-width="3"/>
      <path d="M60 40 C90 20 110 20 110 40 C110 60 90 60 60 40 Z" fill="#F472B6" stroke="#9D174D" stroke-width="3"/>
      <path d="M60 40 L40 75 L52 72 L60 55" fill="#DB2777"/>
      <path d="M60 40 L80 75 L68 72 L60 55" fill="#DB2777"/>
      <circle cx="60" cy="40" r="10" fill="#BE185D"/>
    </svg>`,
    preview: '🎀',
  },
  {
    id: 'svg-camera-doodle',
    name: 'Retro Camera',
    category: 'Doodle',
    svg: `<svg viewBox="0 0 100 80" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="20" width="80" height="55" rx="10" fill="#64748B" stroke="#0F172A" stroke-width="4"/>
      <rect x="25" y="10" width="25" height="12" rx="3" fill="#334155"/>
      <circle cx="50" cy="48" r="18" fill="#0F172A" stroke="#94A3B8" stroke-width="4"/>
      <circle cx="50" cy="48" r="8" fill="#38BDF8"/>
      <circle cx="75" cy="32" r="4" fill="#F43F5E"/>
    </svg>`,
    preview: '📸',
  },
  {
    id: 'svg-cute-smiley',
    name: 'Happy Smile',
    category: 'Doodle',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="44" fill="#FDE047" stroke="#000000" stroke-width="4"/>
      <circle cx="35" cy="40" r="6" fill="#000000"/>
      <circle cx="65" cy="40" r="6" fill="#000000"/>
      <path d="M30 60 Q50 82 70 60" fill="none" stroke="#000000" stroke-width="5" stroke-linecap="round"/>
    </svg>`,
    preview: '😊',
  },
  {
    id: 'svg-film-roll',
    name: 'Film Roll',
    category: 'Doodle',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect x="25" y="15" width="50" height="70" rx="8" fill="#0F172A" stroke="#F59E0B" stroke-width="3"/>
      <rect x="35" y="8" width="30" height="8" rx="2" fill="#F59E0B"/>
      <rect x="32" y="32" width="36" height="36" fill="#F59E0B" rx="4"/>
      <text x="50" y="55" font-family="monospace" font-weight="900" font-size="11" fill="#000000" text-anchor="middle">400</text>
    </svg>`,
    preview: '🎞️',
  },
];

export const DOODLE_PALETTE = [
  { id: 'black', color: '#0F172A', label: 'Hitam' },
  { id: 'white', color: '#FFFFFF', label: 'Putih' },
  { id: 'pink', color: '#F472B6', label: 'Pink Pastel' },
  { id: 'purple', color: '#C084FC', label: 'Lavender' },
  { id: 'blue', color: '#38BDF8', label: 'Sky Blue' },
  { id: 'mint', color: '#34D399', label: 'Mint Green' },
  { id: 'yellow', color: '#FDE047', label: 'Butter' },
  { id: 'orange', color: '#FB923C', label: 'Coral' },
  { id: 'red', color: '#EF4444', label: 'Cherry Red' },
  { id: 'gold', color: '#F59E0B', label: 'Neon Gold' },
];
