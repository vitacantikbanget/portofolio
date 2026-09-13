"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SplashScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1a1714]"
        >
          {/* Blob kiri atas */}
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: "40vw",
              height: "40vw",
              maxWidth: "500px",
              maxHeight: "500px",
              top: "-15%",
              left: "-10%",
              background: "#d4a5a0",
              opacity: 0.18,
              filter: "blur(100px)",
            }}
          />
          {/* Blob kanan bawah */}
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: "36vw",
              height: "36vw",
              maxWidth: "460px",
              maxHeight: "460px",
              bottom: "-15%",
              right: "-10%",
              background: "#a89bbd",
              opacity: 0.18,
              filter: "blur(100px)",
            }}
          />

          <div className="relative text-center px-6">
            {/* Label kecil */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-[10px] tracking-[0.5em] uppercase mb-6 text-[#b8ab9c]"
            >
              Portfolio
            </motion.p>

            {/* Nama */}
            <motion.h1
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
              className="text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.1] text-[#f3ece3]"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Desvita
              <br />
              <span className="text-[#d4a5a0]">Putri</span>{" "}
              <span className="italic text-[#b8ab9c]">Wulandari</span>
            </motion.h1>

            {/* Garis dekoratif */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.7, delay: 0.9 }}
              className="flex items-center justify-center gap-2 mt-6 mb-8"
            >
              <span className="w-8 h-[1px] bg-[#3a322c]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4a5a0]" />
              <span className="w-8 h-[1px] bg-[#3a322c]" />
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="text-xs sm:text-sm tracking-[0.2em] uppercase text-[#b8ab9c]"
            >
              Personal Portfolio
            </motion.p>

            {/* Loading bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.3 }}
              className="mt-10 mx-auto w-32 h-[2px] rounded-full overflow-hidden bg-[#3a322c]"
            >
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.8, delay: 1.3, ease: "easeInOut" }}
                className="h-full rounded-full bg-[#d4a5a0]"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}