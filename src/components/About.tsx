"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

export default function About() {
  return (
    <section id="about" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeading label="// about" title="Who I Am" />

        <div className="grid md:grid-cols-[280px_1fr] gap-12 items-start">
          {/* Photo + quick info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center gap-6"
          >
            {/* Photo */}
            <div className="relative group">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-cyan/30 to-violet/30 blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative w-56 h-56 rounded-2xl overflow-hidden border border-white/10">
                <Image
                  src="/samantha.jpg"
                  alt="Samantha Maia Saldanha"
                  fill
                  className="object-cover object-top"
                  sizes="224px"
                  priority
                />
              </div>
            </div>

            {/* Quick info card */}
            <div className="glass rounded-xl p-5 space-y-3 w-full">
              <div>
                <span className="text-[10px] font-[family-name:var(--font-mono)] text-text-muted uppercase tracking-wider">
                  Location
                </span>
                <p className="text-sm text-text font-medium">Toronto, ON</p>
              </div>
              <div>
                <span className="text-[10px] font-[family-name:var(--font-mono)] text-text-muted uppercase tracking-wider">
                  Current Role
                </span>
                <p className="text-sm text-text font-medium">Software Developer</p>
                <p className="text-xs text-text-muted">@ DoubleX</p>
              </div>
              <div>
                <span className="text-[10px] font-[family-name:var(--font-mono)] text-text-muted uppercase tracking-wider">
                  Focus
                </span>
                <p className="text-sm text-text font-medium">
                  Full-Stack &middot; AI &middot; Mobile
                </p>
              </div>
              <div>
                <span className="text-[10px] font-[family-name:var(--font-mono)] text-text-muted uppercase tracking-wider">
                  Languages
                </span>
                <p className="text-sm text-text font-medium">English &middot; Portuguese</p>
              </div>
            </div>
          </motion.div>

          {/* Bio text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-5 text-text-muted leading-relaxed"
          >
            <p className="text-xl text-text font-[family-name:var(--font-syne)] font-semibold leading-snug">
              I build software that solves real problems &mdash; from AI agents
              that automate workflows to full-stack platforms shipped end-to-end.
            </p>
            <p>
              With experience across logistics, B2B, and AI-powered products, I
              work comfortably across the entire stack: Flutter and React Native
              on mobile, React and Next.js on the web, Node.js and NestJS on the
              backend, with Prisma, Supabase, and Firebase powering the data
              layer.
            </p>
            <p>
              Before becoming a developer, I led sales teams, built Power BI
              dashboards for executive decision-making, and grew revenue 67% in a
              single period. That business background means I don&apos;t just write
              code &mdash; I understand what users need and what stakeholders
              expect.
            </p>
            <p>
              Currently pursuing an MBA in Innovation, Technology and
              Entrepreneurship at International Business University in Toronto.
            </p>

            {/* Fun stats */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/5">
              <div>
                <p className="font-[family-name:var(--font-syne)] font-bold text-2xl text-cyan">
                  3+
                </p>
                <p className="text-xs text-text-muted">Years coding</p>
              </div>
              <div>
                <p className="font-[family-name:var(--font-syne)] font-bold text-2xl text-violet">
                  5+
                </p>
                <p className="text-xs text-text-muted">Projects shipped</p>
              </div>
              <div>
                <p className="font-[family-name:var(--font-syne)] font-bold text-2xl text-cyan">
                  67%
                </p>
                <p className="text-xs text-text-muted">Revenue growth</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
