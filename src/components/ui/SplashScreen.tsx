// Splash screen — seluruh timeline animasi dijalankan CSS keyframes
// (globals.css: blok "SPLASH"), jadi mulai dari paint pertama dan tidak
// menunggu hydration. Urutan & durasi sama dengan versi framer-motion:
// garis melebar 0.6s → teks muncul 0.5s → reveal 1.8s → fade out 2.6s.
// Komponen murni render: tanpa "use client", state, timer, maupun JS.

export default function SplashScreen() {
  return (
    <div
      className="splash fixed inset-0 z-[100] overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* ====== GLOW TENGAH ====== */}
      <div
        className="splash-glow absolute rounded-full pointer-events-none"
        style={{
          width: "60vw",
          height: "60vw",
          maxWidth: "600px",
          maxHeight: "600px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "var(--accent)",
          opacity: 0.12,
          filter: "blur(80px)",
        }}
      />

      {/* ====== GARIS ATAS ====== */}
      {/* wrapper geser ke atas saat reveal, anak melebar (scaleX) */}
      <div
        className="splash-line-y-top absolute left-0 right-0"
        style={{ top: "50%", height: "1px" }}
      >
        <div
          className="splash-line-grow"
          style={{
            height: "100%",
            background: "var(--accent)",
            transformOrigin: "center",
          }}
        />
      </div>

      {/* ====== GARIS BAWAH ====== */}
      <div
        className="splash-line-y-bottom absolute left-0 right-0"
        style={{ top: "50%", height: "1px" }}
      >
        <div
          className="splash-line-grow"
          style={{
            height: "100%",
            background: "var(--accent)",
            transformOrigin: "center",
          }}
        />
      </div>

      {/* ====== TITIK-TITIK DI SEPANJANG GARIS ====== */}
      {/* Titik di garis atas — 5 titik, muncul saat fase teks */}
      {[10, 25, 50, 75, 90].map((left, i) => (
        <div
          key={`dot-top-${i}`}
          className="splash-dot"
          style={{
            top: "50%",
            left: `${left}%`,
            width: "4px",
            height: "4px",
            marginTop: "-2px",
            background: "var(--accent)",
            transform: "translateX(-50%)",
            animationDelay: `calc(var(--sp-text) + ${(i * 0.15).toFixed(2)}s)`,
            animationDuration: `calc(var(--sp-reveal) - var(--sp-text) - ${(i * 0.15).toFixed(2)}s)`,
          }}
        />
      ))}

      {/* Titik di garis bawah — 4 titik, warna mauve */}
      {[15, 40, 60, 85].map((left, i) => (
        <div
          key={`dot-bottom-${i}`}
          className="splash-dot"
          style={{
            top: "50%",
            left: `${left}%`,
            width: "3px",
            height: "3px",
            marginTop: "-1.5px",
            background: "var(--mauve)",
            transform: "translateX(-50%)",
            animationDelay: `calc(var(--sp-text) + ${(0.5 + i * 0.2).toFixed(2)}s)`,
            animationDuration: `calc(var(--sp-reveal) - var(--sp-text) - ${(0.5 + i * 0.2).toFixed(2)}s)`,
          }}
        />
      ))}

      {/* ====== LABEL "LOADING" ATAS ====== */}
      <div
        className="splash-badge absolute top-10 left-1/2 -translate-x-1/2 flex items-center gap-2"
      >
        <span
          className="splash-blink w-1.5 h-1.5 rounded-full"
          style={{ background: "var(--accent)" }}
        />
        <span
          className="text-[9px] tracking-[0.4em] uppercase font-mono"
          style={{ color: "var(--text-muted)" }}
        >
          Loading
        </span>
        <span
          className="splash-blink w-1.5 h-1.5 rounded-full"
          style={{ background: "var(--accent)", animationDelay: "calc(var(--sp-text) + 0.3s)" }}
        />
      </div>

      {/* ====== NOMOR 01 — KIRI BAWAH ====== */}
      <div className="splash-num absolute bottom-10 left-10 lg:bottom-12 lg:left-16">
        <div
          className="text-3xl sm:text-4xl font-medium leading-none italic"
          style={{
            fontFamily: "var(--font-cormorant)",
            color: "var(--accent)",
          }}
        >
          01
        </div>
        <div
          className="text-[8px] tracking-[0.3em] uppercase mt-2"
          style={{ color: "var(--text-muted)" }}
        >
          Splash
        </div>
      </div>

      {/* ====== NOMOR 02 — KANAN BAWAH ====== */}
      <div className="splash-num-right absolute bottom-10 right-10 lg:bottom-12 lg:right-16 text-right">
        <div
          className="text-3xl sm:text-4xl font-medium leading-none italic"
          style={{
            fontFamily: "var(--font-cormorant)",
            color: "var(--accent)",
          }}
        >
          02
        </div>
        <div
          className="text-[8px] tracking-[0.3em] uppercase mt-2"
          style={{ color: "var(--text-muted)" }}
        >
          2026
        </div>
      </div>

      {/* ====== TEKS TENGAH ====== */}
      <div className="splash-center absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        {/* Label kecil "PORTFOLIO" */}
        <p
          className="splash-portfolio text-[10px] tracking-[0.5em] uppercase mb-5"
          style={{ color: "var(--text-muted)" }}
        >
          Portfolio
        </p>

        {/* Nama — efek blur reveal */}
        <h1
          className="splash-title text-3xl sm:text-4xl lg:text-5xl font-medium text-center leading-tight"
          style={{
            fontFamily: "var(--font-cormorant)",
            color: "var(--text)",
          }}
        >
          Desvita <span style={{ color: "var(--accent)" }}>Putri</span>
          <br />
          <span className="italic" style={{ color: "var(--text-muted)" }}>
            Wulandari
          </span>
        </h1>

        {/* Garis dekoratif kecil */}
        <div className="splash-deco mt-6 flex items-center gap-2">
          <span
            style={{
              width: "20px",
              height: "1px",
              background: "var(--border)",
            }}
          />
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "var(--accent)" }}
          />
          <span
            style={{
              width: "20px",
              height: "1px",
              background: "var(--border)",
            }}
          />
        </div>
      </div>

      {/* ====== SUDUT VIEWFINDER (4 sudut) ====== */}
      <div
        className="splash-corner absolute pointer-events-none"
        style={{
          top: "24px",
          left: "24px",
          width: "20px",
          height: "20px",
          borderTop: "1.5px solid var(--accent)",
          borderLeft: "1.5px solid var(--accent)",
        }}
      />
      <div
        className="splash-corner absolute pointer-events-none"
        style={{
          top: "24px",
          right: "24px",
          width: "20px",
          height: "20px",
          borderTop: "1.5px solid var(--accent)",
          borderRight: "1.5px solid var(--accent)",
        }}
      />
      <div
        className="splash-corner absolute pointer-events-none"
        style={{
          bottom: "24px",
          left: "24px",
          width: "20px",
          height: "20px",
          borderBottom: "1.5px solid var(--accent)",
          borderLeft: "1.5px solid var(--accent)",
        }}
      />
      <div
        className="splash-corner absolute pointer-events-none"
        style={{
          bottom: "24px",
          right: "24px",
          width: "20px",
          height: "20px",
          borderBottom: "1.5px solid var(--accent)",
          borderRight: "1.5px solid var(--accent)",
        }}
      />
    </div>
  );
}
