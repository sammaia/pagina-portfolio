"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ROLES = [
  "web applications",
  "mobile apps",
  "AI agents",
  "dashboards",
  "full-stack platforms",
];

function TypewriterRole() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = ROLES[roleIndex];

    if (!deleting && displayed.length < current.length) {
      const timeout = setTimeout(
        () => setDisplayed(current.slice(0, displayed.length + 1)),
        80
      );
      return () => clearTimeout(timeout);
    }

    if (!deleting && displayed.length === current.length) {
      const timeout = setTimeout(() => setDeleting(true), 2000);
      return () => clearTimeout(timeout);
    }

    if (deleting && displayed.length > 0) {
      const timeout = setTimeout(
        () => setDisplayed(displayed.slice(0, -1)),
        40
      );
      return () => clearTimeout(timeout);
    }

    if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }
  }, [displayed, deleting, roleIndex]);

  return (
    <span className="text-cyan">
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
        className="inline-block w-[3px] h-[1em] bg-cyan ml-0.5 align-middle"
      />
    </span>
  );
}

const letterVariants = {
  hidden: { opacity: 0, y: 40, rotateX: -40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: 0.4 + i * 0.04,
      duration: 0.5,
      ease: [0.215, 0.61, 0.355, 1] as const,
    },
  }),
};

function AnimatedName({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className}>
      {text.split("").map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          custom={i}
          variants={letterVariants}
          initial="hidden"
          animate="visible"
          className="inline-block"
          style={{ display: char === " " ? "inline" : "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-6">
      {/* Radial gradient accent behind hero */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cyan/[0.04] blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-violet/[0.05] blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative">
        {/* Status line */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan" />
          </span>
          <span className="text-xs font-[family-name:var(--font-mono)] text-text-muted tracking-wider uppercase">
            Toronto, ON &mdash; Available for work
          </span>
        </motion.div>

        {/* Name — letter by letter */}
        <h1 className="font-[family-name:var(--font-syne)] font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95] mb-6">
          <AnimatedName text="Samantha" className="text-text block" />
          <AnimatedName
            text="Maia Saldanha"
            className="bg-gradient-to-r from-cyan to-violet bg-clip-text text-transparent block"
          />
        </h1>

        {/* Title */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="font-[family-name:var(--font-mono)] text-sm sm:text-base text-text-muted tracking-widest uppercase mb-8"
        >
          Full-Stack Developer
        </motion.p>

        {/* Typewriter subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-lg sm:text-xl text-text-muted max-w-2xl mx-auto leading-relaxed mb-12"
        >
          <span>I build </span>
          <TypewriterRole />
          <br className="hidden sm:block" />
          <span className="text-base">
            From concept to production &mdash; end to end.
          </span>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="group relative px-8 py-3.5 rounded-lg font-[family-name:var(--font-syne)] font-semibold text-sm tracking-wide overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(0,229,255,0.4)]"
          >
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-cyan to-violet"
              whileHover={{ scale: 1.05 }}
            />
            <span className="relative text-void flex items-center gap-2">
              View Projects
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </a>
          <a
            href="#contact"
            className="group px-8 py-3.5 rounded-lg font-[family-name:var(--font-syne)] font-semibold text-sm tracking-wide border border-cyan/30 text-cyan hover:bg-cyan/10 hover:border-cyan/60 hover:shadow-[0_0_20px_rgba(0,229,255,0.15)] transition-all"
          >
            Get in Touch
          </a>
        </motion.div>

        {/* Tech line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="mt-16 flex items-center justify-center gap-6 flex-wrap"
        >
          {["React", "Node.js", "Flutter", "TypeScript", "AI"].map((tech, i) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.4, y: 0 }}
              transition={{ delay: 2.2 + i * 0.15 }}
              whileHover={{ opacity: 1, y: -2 }}
              className="text-xs font-[family-name:var(--font-mono)] text-text-muted tracking-wider cursor-default"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-[family-name:var(--font-mono)] text-text-muted uppercase tracking-[0.3em]">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-cyan/60 via-violet/30 to-transparent"
        />
      </motion.div>
    </section>
  );
}
