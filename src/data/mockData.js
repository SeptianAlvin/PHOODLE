/**
 * PHOODLE Data Store (Client-Side Mock Data)
 * 5 Template Photo Strip Lokal Anti-Error dengan Masking SVG Transparan
 */

// Helper to create clean, URL-encoded SVG Data URL
const createSvgDataUrl = (svgContent) => {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgContent.trim())}`;
};

// 1. PHOODLE Classic White (Free) dengan Transparent Cutout Holes Mask
const svgClassicWhite = createSvgDataUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 900" width="300" height="900">
  <defs>
    <mask id="classicHoles">
      <rect width="100%" height="100%" fill="white"/>
      <rect x="25" y="80" width="250" height="200" rx="10" fill="black"/>
      <rect x="25" y="300" width="250" height="200" rx="10" fill="black"/>
      <rect x="25" y="520" width="250" height="200" rx="10" fill="black"/>
    </mask>
  </defs>
  <!-- Background with transparent cutouts -->
  <rect width="300" height="900" fill="#FFFFFF" mask="url(#classicHoles)"/>
  <rect x="12" y="12" width="276" height="876" fill="none" stroke="#1E293B" stroke-width="2" rx="12"/>
  <text x="150" y="55" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="800" font-size="12" fill="#1E293B" text-anchor="middle" letter-spacing="3">PHOODLE • SEOUL MINIMALIST</text>
  <!-- Borders only for the 3 Photo Slots (Transparent inside) -->
  <rect x="25" y="80" width="250" height="200" fill="none" stroke="#CBD5E1" stroke-width="2" rx="10"/>
  <rect x="25" y="300" width="250" height="200" fill="none" stroke="#CBD5E1" stroke-width="2" rx="10"/>
  <rect x="25" y="520" width="250" height="200" fill="none" stroke="#CBD5E1" stroke-width="2" rx="10"/>
  <!-- Footer & Barcode -->
  <text x="150" y="770" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="15" fill="#0F172A" text-anchor="middle" letter-spacing="4">PHOODLE PHOTOBOOTH</text>
  <text x="150" y="792" font-family="monospace" font-weight="600" font-size="9" fill="#64748B" text-anchor="middle">2026.11.22 • STUDIO EDITION</text>
  <!-- Mini Barcode -->
  <g transform="translate(60, 815)">
    <rect x="0" y="0" width="3" height="30" fill="#1E293B"/>
    <rect x="6" y="0" width="2" height="30" fill="#1E293B"/>
    <rect x="12" y="0" width="6" height="30" fill="#1E293B"/>
    <rect x="22" y="0" width="2" height="30" fill="#1E293B"/>
    <rect x="28" y="0" width="4" height="30" fill="#1E293B"/>
    <rect x="36" y="0" width="8" height="30" fill="#1E293B"/>
    <rect x="48" y="0" width="3" height="30" fill="#1E293B"/>
    <rect x="55" y="0" width="5" height="30" fill="#1E293B"/>
    <rect x="64" y="0" width="2" height="30" fill="#1E293B"/>
    <rect x="70" y="0" width="7" height="30" fill="#1E293B"/>
    <rect x="81" y="0" width="4" height="30" fill="#1E293B"/>
    <rect x="90" y="0" width="2" height="30" fill="#1E293B"/>
    <rect x="96" y="0" width="6" height="30" fill="#1E293B"/>
    <rect x="106" y="0" width="3" height="30" fill="#1E293B"/>
    <rect x="113" y="0" width="5" height="30" fill="#1E293B"/>
    <rect x="122" y="0" width="2" height="30" fill="#1E293B"/>
    <rect x="128" y="0" width="6" height="30" fill="#1E293B"/>
    <rect x="138" y="0" width="4" height="30" fill="#1E293B"/>
    <rect x="146" y="0" width="3" height="30" fill="#1E293B"/>
    <rect x="153" y="0" width="7" height="30" fill="#1E293B"/>
    <rect x="164" y="0" width="2" height="30" fill="#1E293B"/>
    <rect x="170" y="0" width="5" height="30" fill="#1E293B"/>
  </g>
</svg>
`);

// 2. PHOODLE Soft Pastel (Free) dengan Mask Transparan
const svgSoftPastel = createSvgDataUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 900" width="300" height="900">
  <defs>
    <linearGradient id="pastelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FDF2F8"/>
      <stop offset="50%" stop-color="#F3E8FF"/>
      <stop offset="100%" stop-color="#E0E7FF"/>
    </linearGradient>
    <mask id="pastelHoles">
      <rect width="100%" height="100%" fill="white"/>
      <rect x="25" y="80" width="250" height="200" rx="14" fill="black"/>
      <rect x="25" y="300" width="250" height="200" rx="14" fill="black"/>
      <rect x="25" y="520" width="250" height="200" rx="14" fill="black"/>
    </mask>
  </defs>
  <!-- Background with transparent cutouts -->
  <rect width="300" height="900" fill="url(#pastelGrad)" mask="url(#pastelHoles)"/>
  <rect x="12" y="12" width="276" height="876" fill="none" stroke="#D8B4FE" stroke-width="3" rx="18"/>
  <text x="150" y="55" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="12" fill="#7E22CE" text-anchor="middle" letter-spacing="2">♡ PHOODLE SOFT PASTEL ♡</text>
  <!-- Borders only (Transparent inside) -->
  <rect x="25" y="80" width="250" height="200" fill="none" stroke="#D8B4FE" stroke-width="2.5" rx="14"/>
  <rect x="25" y="300" width="250" height="200" fill="none" stroke="#D8B4FE" stroke-width="2.5" rx="14"/>
  <rect x="25" y="520" width="250" height="200" fill="none" stroke="#D8B4FE" stroke-width="2.5" rx="14"/>
  <!-- Floating Hearts Decor -->
  <circle cx="270" cy="70" r="4" fill="#EC4899"/>
  <circle cx="30" cy="760" r="4" fill="#A855F7"/>
  <circle cx="265" cy="780" r="5" fill="#F472B6"/>
  <!-- Footer -->
  <text x="150" y="770" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="15" fill="#6B21A8" text-anchor="middle" letter-spacing="3">SWEET MEMORIES</text>
  <text x="150" y="792" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="700" font-size="10" fill="#A855F7" text-anchor="middle">BESTIES FOREVER • 2026</text>
  <g transform="translate(135, 815)">
    <circle cx="15" cy="15" r="5" fill="#DB2777"/>
    <path d="M15 15 C3 5 0 25 15 15 Z" fill="#F472B6"/>
    <path d="M15 15 C27 5 30 25 15 15 Z" fill="#F472B6"/>
  </g>
</svg>
`);

// 3. Y2K Silver Chrome (PRO) dengan Mask Transparan
const svgY2kChrome = createSvgDataUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 900" width="300" height="900">
  <defs>
    <linearGradient id="chromeBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#09090B"/>
      <stop offset="50%" stop-color="#18181B"/>
      <stop offset="100%" stop-color="#09090B"/>
    </linearGradient>
    <linearGradient id="metalStroke" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E2E8F0"/>
      <stop offset="25%" stop-color="#64748B"/>
      <stop offset="50%" stop-color="#FFFFFF"/>
      <stop offset="75%" stop-color="#475569"/>
      <stop offset="100%" stop-color="#E2E8F0"/>
    </linearGradient>
    <mask id="chromeHoles">
      <rect width="100%" height="100%" fill="white"/>
      <rect x="25" y="85" width="250" height="200" rx="8" fill="black"/>
      <rect x="25" y="305" width="250" height="200" rx="8" fill="black"/>
      <rect x="25" y="525" width="250" height="200" rx="8" fill="black"/>
    </mask>
  </defs>
  <!-- Background with transparent cutouts -->
  <rect width="300" height="900" fill="url(#chromeBg)" mask="url(#chromeHoles)"/>
  <rect x="12" y="12" width="276" height="876" fill="none" stroke="url(#metalStroke)" stroke-width="3" rx="10"/>
  <!-- Cyber Corner Tech Marks -->
  <path d="M18 35 L18 18 L35 18" stroke="#38BDF8" stroke-width="3" fill="none"/>
  <path d="M282 35 L282 18 L265 18" stroke="#38BDF8" stroke-width="3" fill="none"/>
  <path d="M18 865 L18 882 L35 882" stroke="#F43F5E" stroke-width="3" fill="none"/>
  <path d="M282 865 L282 882 L265 882" stroke="#F43F5E" stroke-width="3" fill="none"/>
  <!-- Chrome 4-point Stars -->
  <path d="M150 40 Q150 52 162 52 Q150 52 150 64 Q150 52 138 52 Q150 52 150 40 Z" fill="#E2E8F0"/>
  <text x="150" y="70" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="11" fill="#38BDF8" text-anchor="middle" letter-spacing="3">★ Y2K SILVER CHROME ★</text>
  <!-- Borders only (Transparent inside) -->
  <rect x="25" y="85" width="250" height="200" fill="none" stroke="url(#metalStroke)" stroke-width="2.5" rx="8"/>
  <rect x="25" y="305" width="250" height="200" fill="none" stroke="url(#metalStroke)" stroke-width="2.5" rx="8"/>
  <rect x="25" y="525" width="250" height="200" fill="none" stroke="url(#metalStroke)" stroke-width="2.5" rx="8"/>
  <!-- Footer -->
  <text x="150" y="775" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="16" fill="#F8FAFC" text-anchor="middle" letter-spacing="5">CYBER CORE 2000</text>
  <text x="150" y="798" font-family="monospace" font-weight="700" font-size="10" fill="#F43F5E" text-anchor="middle">PHOODLE VIP • CHROME EDITION</text>
  <rect x="70" y="818" width="160" height="26" rx="13" fill="#09090B" stroke="#38BDF8" stroke-width="1.5"/>
  <text x="150" y="835" font-family="monospace" font-weight="800" font-size="10" fill="#E2E8F0" text-anchor="middle" letter-spacing="2">VER 2.0 • VIP ACCESS</text>
</svg>
`);

// 4. Retro Film Strip (PRO) dengan Mask Transparan
const svgRetroFilm = createSvgDataUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 900" width="300" height="900">
  <defs>
    <mask id="filmHoles">
      <rect width="100%" height="100%" fill="white"/>
      <rect x="35" y="80" width="230" height="200" rx="4" fill="black"/>
      <rect x="35" y="300" width="230" height="200" rx="4" fill="black"/>
      <rect x="35" y="520" width="230" height="200" rx="4" fill="black"/>
    </mask>
  </defs>
  <!-- Background with transparent cutouts -->
  <rect width="300" height="900" fill="#0C0A09" mask="url(#filmHoles)"/>
  <!-- Film Sprocket Holes along left and right -->
  <g fill="#FFFFFF" opacity="0.85">
    <rect x="8" y="25" width="14" height="20" rx="3"/>
    <rect x="8" y="70" width="14" height="20" rx="3"/>
    <rect x="8" y="115" width="14" height="20" rx="3"/>
    <rect x="8" y="160" width="14" height="20" rx="3"/>
    <rect x="8" y="205" width="14" height="20" rx="3"/>
    <rect x="8" y="250" width="14" height="20" rx="3"/>
    <rect x="8" y="295" width="14" height="20" rx="3"/>
    <rect x="8" y="340" width="14" height="20" rx="3"/>
    <rect x="8" y="385" width="14" height="20" rx="3"/>
    <rect x="8" y="430" width="14" height="20" rx="3"/>
    <rect x="8" y="475" width="14" height="20" rx="3"/>
    <rect x="8" y="520" width="14" height="20" rx="3"/>
    <rect x="8" y="565" width="14" height="20" rx="3"/>
    <rect x="8" y="610" width="14" height="20" rx="3"/>
    <rect x="8" y="655" width="14" height="20" rx="3"/>
    <rect x="8" y="700" width="14" height="20" rx="3"/>
    <rect x="8" y="745" width="14" height="20" rx="3"/>
    <rect x="8" y="790" width="14" height="20" rx="3"/>
    <rect x="8" y="835" width="14" height="20" rx="3"/>
    <rect x="278" y="25" width="14" height="20" rx="3"/>
    <rect x="278" y="70" width="14" height="20" rx="3"/>
    <rect x="278" y="115" width="14" height="20" rx="3"/>
    <rect x="278" y="160" width="14" height="20" rx="3"/>
    <rect x="278" y="205" width="14" height="20" rx="3"/>
    <rect x="278" y="250" width="14" height="20" rx="3"/>
    <rect x="278" y="295" width="14" height="20" rx="3"/>
    <rect x="278" y="340" width="14" height="20" rx="3"/>
    <rect x="278" y="385" width="14" height="20" rx="3"/>
    <rect x="278" y="430" width="14" height="20" rx="3"/>
    <rect x="278" y="475" width="14" height="20" rx="3"/>
    <rect x="278" y="520" width="14" height="20" rx="3"/>
    <rect x="278" y="565" width="14" height="20" rx="3"/>
    <rect x="278" y="610" width="14" height="20" rx="3"/>
    <rect x="278" y="655" width="14" height="20" rx="3"/>
    <rect x="278" y="700" width="14" height="20" rx="3"/>
    <rect x="278" y="745" width="14" height="20" rx="3"/>
    <rect x="278" y="790" width="14" height="20" rx="3"/>
    <rect x="278" y="835" width="14" height="20" rx="3"/>
  </g>
  <text x="150" y="55" font-family="monospace" font-weight="900" font-size="12" fill="#F59E0B" text-anchor="middle" letter-spacing="3">🎞️ 35MM RETRO FILM • ISO 400</text>
  <!-- Borders only (Transparent inside) -->
  <rect x="35" y="80" width="230" height="200" fill="none" stroke="#F59E0B" stroke-width="2" rx="4"/>
  <rect x="35" y="300" width="230" height="200" fill="none" stroke="#F59E0B" stroke-width="2" rx="4"/>
  <rect x="35" y="520" width="230" height="200" fill="none" stroke="#F59E0B" stroke-width="2" rx="4"/>
  <text x="40" y="292" font-family="monospace" font-size="9" fill="#EA580C">▶ 24A</text>
  <text x="235" y="292" font-family="monospace" font-size="9" fill="#EA580C">KODAK</text>
  <text x="40" y="512" font-family="monospace" font-size="9" fill="#EA580C">▶ 25</text>
  <text x="235" y="512" font-family="monospace" font-size="9" fill="#EA580C">SAFETY</text>
  <text x="150" y="765" font-family="monospace" font-weight="900" font-size="15" fill="#F59E0B" text-anchor="middle" letter-spacing="4">PHOODLE FILM CO.</text>
  <text x="150" y="788" font-family="monospace" font-weight="700" font-size="10" fill="#D97706" text-anchor="middle">ANALOG EMULSION • 2026</text>
  <text x="150" y="825" font-family="monospace" font-weight="900" font-size="13" fill="#EA580C" text-anchor="middle">▲ 26 PHOODLE 400 ▲</text>
</svg>
`);

// 5. Campus Event Edition (PRO) dengan Mask Transparan
const svgCampusEvent = createSvgDataUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 900" width="300" height="900">
  <defs>
    <linearGradient id="navyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0F172A"/>
      <stop offset="100%" stop-color="#1E1B4B"/>
    </linearGradient>
    <mask id="campusHoles">
      <rect width="100%" height="100%" fill="white"/>
      <rect x="25" y="85" width="250" height="200" rx="8" fill="black"/>
      <rect x="25" y="305" width="250" height="200" rx="8" fill="black"/>
      <rect x="25" y="525" width="250" height="200" rx="8" fill="black"/>
    </mask>
  </defs>
  <!-- Background with transparent cutouts -->
  <rect width="300" height="900" fill="url(#navyGrad)" mask="url(#campusHoles)"/>
  <rect x="12" y="12" width="276" height="876" fill="none" stroke="#F59E0B" stroke-width="3" rx="14"/>
  <path d="M40 25 L260 25 L245 65 L55 65 Z" fill="#F59E0B"/>
  <text x="150" y="50" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="12" fill="#0F172A" text-anchor="middle" letter-spacing="2">🎓 TECHNO FEST 2026 🎓</text>
  <!-- Borders only (Transparent inside) -->
  <rect x="25" y="85" width="250" height="200" fill="none" stroke="#F59E0B" stroke-width="2" rx="8"/>
  <rect x="25" y="305" width="250" height="200" fill="none" stroke="#F59E0B" stroke-width="2" rx="8"/>
  <rect x="25" y="525" width="250" height="200" fill="none" stroke="#F59E0B" stroke-width="2" rx="8"/>
  <g fill="#FDE047">
    <circle cx="45" cy="740" r="3"/>
    <circle cx="255" cy="740" r="3"/>
    <polygon points="150,735 153,743 161,743 155,748 157,756 150,751 143,756 145,748 139,743 147,743"/>
  </g>
  <text x="150" y="780" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="15" fill="#FEF3C7" text-anchor="middle" letter-spacing="3">CAMPUS EDITION</text>
  <text x="150" y="802" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="700" font-size="10" fill="#F59E0B" text-anchor="middle">COLLEGE MEMORIES • PHOODLE</text>
  <rect x="80" y="822" width="140" height="26" rx="13" fill="#F59E0B"/>
  <text x="150" y="839" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="10" fill="#0F172A" text-anchor="middle" letter-spacing="2">OFFICIAL EVENT</text>
</svg>
`);

export const PHOTO_LAYOUTS = [
  {
    id: 'strip-3',
    name: '3-Pose Classic Strip',
    shortName: '3 Pose',
    slots: 3,
    aspectRatio: '1:3',
    description: 'Format strip vertikal legendaris photobox Korea. Ringkas & estetik.',
    popular: true,
    gridCols: 1,
    rows: 3,
    badge: 'Paling Populer',
  },
  {
    id: 'strip-4',
    name: '4-Pose Vertical Strip',
    shortName: '4 Pose',
    slots: 4,
    aspectRatio: '1:4',
    description: 'Format memanjang dengan 4 ekspresi berbeda untuk cerita foto lebih lengkap.',
    popular: false,
    gridCols: 1,
    rows: 4,
    badge: 'Ekspresif',
  },
  {
    id: 'grid-2x2',
    name: '2x2 Grid Collage',
    shortName: '2x2 Grid',
    slots: 4,
    aspectRatio: '1:1',
    description: 'Format kotak ala album vinyl. Cocok untuk feed Instagram & postingan square.',
    popular: false,
    gridCols: 2,
    rows: 2,
    badge: 'Instagram Ready',
  },
];

/**
 * 5 Template Photo Strip PHOODLE Resmi (2 FREE + 3 PRO)
 * Seluruh slot foto ber-alpha = 0 (transparan)
 */
export const FRAME_TEMPLATES = [
  {
    id: 'frame-phoodle-classic-white',
    name: 'PHOODLE Classic White',
    category: 'Minimalist',
    tier: 'free',
    bgColor: '#FFFFFF',
    borderColor: '#1E293B',
    textColor: '#0F172A',
    accentColor: '#6366F1',
    description: 'Gaya monokrom bersih khas photobox Seoul dengan barcode dan garis presisi.',
    tagline: 'PHOODLE • SEOUL MINIMALIST',
    svgDataUrl: svgClassicWhite,
  },
  {
    id: 'frame-phoodle-soft-pastel',
    name: 'PHOODLE Soft Pastel',
    category: 'Pastel',
    tier: 'free',
    bgColor: '#FAF5FF',
    borderColor: '#D8B4FE',
    textColor: '#6B21A8',
    accentColor: '#EC4899',
    description: 'Sentuhan gradasi ungu-pink pastel lembut yang manis untuk foto bareng sahabat.',
    tagline: '♡ PHOODLE SOFT PASTEL ♡',
    svgDataUrl: svgSoftPastel,
  },
  {
    id: 'frame-y2k-silver-chrome',
    name: 'Y2K Silver Chrome',
    category: 'Y2K & Cyber',
    tier: 'pro',
    bgColor: '#09090B',
    borderColor: '#E2E8F0',
    textColor: '#F8FAFC',
    accentColor: '#38BDF8',
    description: 'Estetika metalik silver chrome tahun 2000-an dengan ornamen bintang 4-sudut neon.',
    tagline: '★ Y2K SILVER CHROME • VIP ★',
    svgDataUrl: svgY2kChrome,
    isPro: true,
  },
  {
    id: 'frame-retro-film-strip',
    name: 'Retro Film Strip',
    category: 'Vintage Analog',
    tier: 'pro',
    bgColor: '#0C0A09',
    borderColor: '#44403C',
    textColor: '#F59E0B',
    accentColor: '#EA580C',
    description: 'Nuansa rol klise film analog 35mm asli lengkap dengan lubang gerigi sprocket.',
    tagline: '🎞️ 35MM RETRO FILM • ISO 400',
    svgDataUrl: svgRetroFilm,
    isPro: true,
  },
  {
    id: 'frame-campus-event-edition',
    name: 'Campus Event Edition',
    category: 'Event & Varsity',
    tier: 'pro',
    bgColor: '#0F172A',
    borderColor: '#F59E0B',
    textColor: '#FEF3C7',
    accentColor: '#F59E0B',
    description: 'Edisi spesial kampus Techno Fest dengan pita pennant dan medali emas kampus.',
    tagline: '🎓 TECHNO FEST 2026 • CAMPUS EDITION',
    svgDataUrl: svgCampusEvent,
    isPro: true,
  },
];

export const SUBSCRIPTION_PLANS = {
  free: {
    id: 'free',
    name: 'Free Member',
    price: 'Rp 0',
    period: '/selamanya',
    badge: 'Akses Standar',
    features: [
      { text: 'Akses kamera live & upload galeri tanpa batas', included: true },
      { text: 'Fitur Unlimited Retake sepuasnya', included: true },
      { text: '3 Pilihan Layout (Strip 3, Strip 4, Grid 2x2)', included: true },
      { text: '2 Template Dasar (Classic White & Soft Pastel)', included: true },
      { text: 'Alat doodling kuas standar (10 pilihan warna)', included: true },
      { text: 'Koleksi stiker dasar gratis', included: true },
      { text: 'Download kualitas standar (ada watermark PHOODLE)', included: true },
      { text: 'Akses 3 Template PRO (Chrome, Film, Campus)', included: false },
      { text: 'Download Ultra-HD tanpa watermark', included: false },
    ],
  },
  pro: {
    id: 'pro',
    name: 'Pro Member VIP',
    price: 'Rp 29.000',
    period: '/bulan',
    badge: 'Paling Direkomendasikan',
    highlight: true,
    features: [
      { text: 'Semua fitur paket Free Member', included: true },
      { text: 'Akses 100% UNLOCKED ke 5 Template PHOODLE', included: true },
      { text: 'Bebas pakai Y2K Silver Chrome & Retro Film Strip', included: true },
      { text: 'Bebas pakai Campus Event Edition eksklusif', included: true },
      { text: 'Palet warna lengkap + kuas ketebalan fleksibel', included: true },
      { text: '18+ Stiker vektor tajam & badge tipografi estetik', included: true },
      { text: 'Ekspor Resolusi Tinggi (2x Ultra-HD)', included: true },
      { text: '100% Bersih TANPA Watermark PHOODLE', included: true },
    ],
  },
};
