export type HSL = {
  h: number; // 0 - 360
  s: number; // 0 - 100
  l: number; // 0 - 100
};

export type RGB = {
  r: number;
  g: number;
  b: number;
};

export function hexToRgb(hex: string): RGB | null {
  const clean = hex.replace("#", "").trim();
  if (![3, 6].includes(clean.length)) return null;

  let fullHex = clean;
  if (clean.length === 3) {
    fullHex = clean
      .split("")
      .map((c) => c + c)
      .join("");
  }

  const num = parseInt(fullHex, 16);
  if (Number.isNaN(num)) return null;

  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

export function rgbToHsl({ r, g, b }: RGB): HSL {
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;

  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  const delta = max - min;

  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (delta !== 0) {
    s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);
    switch (max) {
      case rNorm:
        h = ((gNorm - bNorm) / delta + (gNorm < bNorm ? 6 : 0)) * 60;
        break;
      case gNorm:
        h = ((bNorm - rNorm) / delta + 2) * 60;
        break;
      case bNorm:
        h = ((rNorm - gNorm) / delta + 4) * 60;
        break;
    }
  }

  return {
    h: Math.round(h),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

export function hexToHsl(hex: string): HSL | null {
  const rgb = hexToRgb(hex);
  if (!rgb) return null;
  return rgbToHsl(rgb);
}

/**
 * Menghasilkan blok CSS lengkap yang menyetel seluruh variabel warna tema:
 * Memastikan kontras teks sangat tajam (jelas dan terbaca 100%) baik di lightmode maupun darkmode,
 * serta memastikan lightmode memiliki tampilan solid, modern, dan seimbang seperti di darkmode.
 */
export function generateThemeCss(accentHex: string): string {
  const cleanHex = accentHex.startsWith("#") ? accentHex : `#${accentHex}`;
  const hsl = hexToHsl(cleanHex);

  if (!hsl) {
    return "";
  }

  const { h, s, l } = hsl;
  const secondaryHue = (h + 35) % 360;

  // --- Palet Light Mode ---
  // Pastikan warna aksen di latar terang memiliki keterbacaan tinggi (lightness <= 38% bila teks)
  const lightL = l > 42 ? Math.min(38, Math.max(26, l - 14)) : l;
  const lightAccent = `hsl(${h}, ${Math.min(95, Math.max(50, Math.round(s * 1.05)))}%, ${lightL}%)`;
  const lightAccentSoft = `hsl(${h}, ${Math.min(s, 60)}%, 92%)`;
  const lightAccentHover = `hsl(${h}, ${s}%, ${Math.max(15, lightL - 10)}%)`;
  const lightMauve = `hsl(${secondaryHue}, ${Math.min(s, 40)}%, 38%)`;
  const lightLavender = `hsl(${secondaryHue}, ${Math.min(s, 35)}%, 72%)`;
  const lightGrid1 = lightAccent;
  const lightGrid2 = `hsl(${secondaryHue}, ${Math.min(s, 40)}%, 42%)`;

  // --- Palet Dark Mode ---
  // Di latar gelap (#141210 / #1c1916), aksen dan teks dibuat cerah dan tajam agar bersinar dan mudah dibaca
  const darkL = Math.max(72, Math.min(84, l + 18));
  const darkS = Math.min(95, Math.max(55, Math.round(s * 1.15)));
  const darkAccent = `hsl(${h}, ${darkS}%, ${darkL}%)`;
  const darkAccentSoft = `hsl(${h}, ${Math.min(s, 35)}%, 24%)`;
  const darkAccentHover = `hsl(${h}, ${s}%, ${Math.min(90, l + 22)}%)`;
  const darkMauve = `hsl(${secondaryHue}, ${Math.min(s, 35)}%, 74%)`;
  const darkLavender = `hsl(${secondaryHue}, ${Math.min(s, 30)}%, 68%)`;
  const darkGrid1 = darkAccent;
  const darkGrid2 = `hsl(${secondaryHue}, ${Math.min(s, 35)}%, 72%)`;

  return `
    :root {
      --bg: #faf7f2 !important;
      --bg-soft: #f2ece3 !important;
      --surface: #ffffff !important;
      --surface-2: #f7f3eb !important;
      --border: #dcd3c5 !important;
      --text: #12100e !important;
      --text-muted: #383028 !important;
      --accent: ${lightAccent} !important;
      --accent-soft: ${lightAccentSoft} !important;
      --accent-hover: ${lightAccentHover} !important;
      --mauve: ${lightMauve} !important;
      --lavender: ${lightLavender} !important;
      --grid-color-1: ${lightGrid1} !important;
      --grid-color-2: ${lightGrid2} !important;
      --nav-bg: rgba(250, 247, 242, 0.88) !important;
    }

    html.dark, .dark {
      --bg: #141210 !important;
      --bg-soft: #1c1916 !important;
      --surface: #221e1a !important;
      --surface-2: #2a2521 !important;
      --border: #423932 !important;
      --text: #ffffff !important;
      --text-muted: #d4c8b9 !important;
      --accent: ${darkAccent} !important;
      --accent-soft: ${darkAccentSoft} !important;
      --accent-hover: ${darkAccentHover} !important;
      --mauve: ${darkMauve} !important;
      --lavender: ${darkLavender} !important;
      --grid-color-1: ${darkGrid1} !important;
      --grid-color-2: ${darkGrid2} !important;
      --nav-bg: rgba(20, 18, 16, 0.85) !important;
    }

    ::selection {
      background: var(--accent) !important;
      color: #ffffff !important;
    }

    ::-webkit-scrollbar-thumb {
      background: var(--accent) !important;
    }
  `.trim();
}
