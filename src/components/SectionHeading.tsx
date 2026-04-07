"use client";

import { motion } from "framer-motion";

interface Props {
  label: string;
  title: string;
}

export default function SectionHeading({ label, title }: Props) {
  return (
    <div className="mb-16 text-center">
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="inline-block text-xs font-[family-name:var(--font-mono)] text-cyan tracking-[0.3em] uppercase mb-3"
      >
        {label}
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="font-[family-name:var(--font-syne)] font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight text-text"
      >
        {title}
      </motion.h2>
    </div>
  );
}
