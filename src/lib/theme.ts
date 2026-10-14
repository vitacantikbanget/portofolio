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
 * --accent, --accent-soft, --accent-hover, --mauve, --lavender, --grid-color-1, --grid-color-2
 * baik untuk mode terang (:root) maupun mode gelap (.dark, html.dark).
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
  const lightAccent = cleanHex;
  const lightAccentSoft = `hsl(${h}, ${Math.min(s, 65)}%, 91%)`;
  const lightAccentHover = `hsl(${h}, ${s}%, ${Math.max(15, l - 10)}%)`;
  const lightMauve = `hsl(${secondaryHue}, ${Math.min(s, 40)}%, 42%)`;
  const lightLavender = `hsl(${secondaryHue}, ${Math.min(s, 35)}%, 74%)`;
  const lightGrid1 = cleanHex;
  const lightGrid2 = `hsl(${secondaryHue}, ${Math.min(s, 40)}%, 42%)`;

  // --- Palet Dark Mode ---
  // Di mode gelap dengan background #1a1714, teks & aksen membutuhkan kontras tinggi.
  const darkL = Math.max(68, Math.min(82, l + 16));
  const darkS = Math.min(95, Math.max(50, Math.round(s * 1.15)));
  const darkAccent = `hsl(${h}, ${darkS}%, ${darkL}%)`;
  const darkAccentSoft = `hsl(${h}, ${Math.min(s, 35)}%, 24%)`;
  const darkAccentHover = `hsl(${h}, ${s}%, ${Math.min(90, l + 22)}%)`;
  const darkMauve = `hsl(${secondaryHue}, ${Math.min(s, 35)}%, 72%)`;
  const darkLavender = `hsl(${secondaryHue}, ${Math.min(s, 30)}%, 65%)`;
  const darkGrid1 = darkAccent;
  const darkGrid2 = `hsl(${secondaryHue}, ${Math.min(s, 35)}%, 70%)`;

  return `
    :root {
      --accent: ${lightAccent} !important;
      --accent-soft: ${lightAccentSoft} !important;
      --accent-hover: ${lightAccentHover} !important;
      --mauve: ${lightMauve} !important;
      --lavender: ${lightLavender} !important;
      --grid-color-1: ${lightGrid1} !important;
      --grid-color-2: ${lightGrid2} !important;
    }

    html.dark, .dark {
      --accent: ${darkAccent} !important;
      --accent-soft: ${darkAccentSoft} !important;
      --accent-hover: ${darkAccentHover} !important;
      --mauve: ${darkMauve} !important;
      --lavender: ${darkLavender} !important;
      --grid-color-1: ${darkGrid1} !important;
      --grid-color-2: ${darkGrid2} !important;
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
