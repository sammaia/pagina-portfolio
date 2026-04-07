"use client";

import { motion } from "framer-motion";

const ELEMENTS = [
  // Physics formulas
  { text: "E = mc²", x: "8%", y: "15%", size: "text-lg", delay: 0 },
  { text: "F = ma", x: "85%", y: "22%", size: "text-base", delay: 2 },
  { text: "∇ × E = -∂B/∂t", x: "75%", y: "65%", size: "text-sm", delay: 4 },
  { text: "ΔxΔp ≥ ℏ/2", x: "12%", y: "72%", size: "text-sm", delay: 1 },
  { text: "∫ψ*ψ dV = 1", x: "90%", y: "45%", size: "text-base", delay: 3 },
  { text: "λ = h/mv", x: "5%", y: "45%", size: "text-sm", delay: 5 },
  { text: "S = k ln Ω", x: "70%", y: "85%", size: "text-xs", delay: 2.5 },

  // Code snippets
  { text: "const app = await NestFactory.create()", x: "15%", y: "88%", size: "text-xs", delay: 1.5, mono: true },
  { text: "async function deploy() {}", x: "60%", y: "12%", size: "text-xs", delay: 3.5, mono: true },
  { text: "npm run build", x: "82%", y: "78%", size: "text-xs", delay: 0.5, mono: true },
  { text: "git push origin main", x: "25%", y: "35%", size: "text-xs", delay: 4.5, mono: true },
  { text: "<Component />", x: "92%", y: "55%", size: "text-sm", delay: 2, mono: true },
  { text: "return response.json()", x: "3%", y: "58%", size: "text-xs", delay: 3, mono: true },

  // Symbols
  { text: "{ }", x: "45%", y: "8%", size: "text-lg", delay: 1, mono: true },
  { text: "=>", x: "55%", y: "92%", size: "text-base", delay: 4, mono: true },
  { text: "∞", x: "35%", y: "75%", size: "text-xl", delay: 2 },
  { text: "π", x: "65%", y: "38%", size: "text-lg", delay: 0.5 },
];

export default function FloatingElements() {
  return (
    <div className="fixed inset-0 -z-5 overflow-hidden pointer-events-none">
      {ELEMENTS.map((el, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.12, 0.08, 0.12, 0],
            y: [0, -15, -5, -20, 0],
          }}
          transition={{
            duration: 12,
            delay: el.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`absolute ${el.size} ${
            el.mono
              ? "font-[family-name:var(--font-fira-code)] text-cyan/30"
              : "font-[family-name:var(--font-syne)] text-violet/25"
          } select-none whitespace-nowrap`}
          style={{ left: el.x, top: el.y }}
        >
          {el.text}
        </motion.span>
      ))}
    </div>
  );
}
