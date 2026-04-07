"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const SKILL_GROUPS = [
  {
    label: "Development",
    icon: "{ }",
    color: "cyan" as const,
    skills: [
      "Flutter",
      "React",
      "React Native",
      "Next.js",
      "Node.js",
      "NestJS",
      "TypeScript",
      "Prisma ORM",
      "SQL",
      "REST APIs",
    ],
  },
  {
    label: "Infrastructure",
    icon: ">>",
    color: "violet" as const,
    skills: ["Supabase", "Firebase", "PostgreSQL", "GCP", "Vercel", "Neon"],
  },
  {
    label: "AI & Automation",
    icon: "AI",
    color: "cyan" as const,
    skills: [
      "AI Agents",
      "Claude API",
      "Prompt Engineering",
      "LLM Integration",
      "n8n",
      "MCP",
    ],
  },
  {
    label: "Data & Analytics",
    icon: "//",
    color: "violet" as const,
    skills: ["Power BI", "Python", "KPI Design", "Business Intelligence"],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

const tagVariants = {
  hidden: { opacity: 0, scale: 0.6, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 200, damping: 15 },
  },
};

export default function Skills() {
  return (
    <section id="skills" className="py-32 px-6 grid-bg relative overflow-hidden">
      {/* Section glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-violet/[0.03] blur-[150px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-cyan/[0.03] blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative">
        <SectionHeading label="// skills" title="Tech Stack" />

        <div className="grid sm:grid-cols-2 gap-6">
          {SKILL_GROUPS.map((group, gi) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 40, rotateX: 5 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: gi * 0.12 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="glass glass-hover rounded-xl p-6 relative overflow-hidden group"
            >
              {/* Background icon */}
              <span
                className={`absolute top-3 right-4 text-4xl font-[family-name:var(--font-mono)] font-bold opacity-[0.04] group-hover:opacity-[0.08] transition-opacity ${
                  group.color === "cyan" ? "text-cyan" : "text-violet"
                }`}
              >
                {group.icon}
              </span>

              <div className="flex items-center gap-2 mb-5">
                <span
                  className={`w-1.5 h-6 rounded-full ${
                    group.color === "cyan" ? "bg-cyan/60" : "bg-violet/60"
                  }`}
                />
                <h3 className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-text">
                  {group.label}
                </h3>
              </div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className="flex flex-wrap gap-2"
              >
                {group.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    variants={tagVariants}
                    whileHover={{
                      scale: 1.08,
                      boxShadow:
                        group.color === "cyan"
                          ? "0 0 15px rgba(0,229,255,0.25)"
                          : "0 0 15px rgba(124,58,237,0.25)",
                    }}
                    className={`tag cursor-default ${
                      group.color === "violet"
                        ? "!bg-violet/[0.06] !border-violet/15 !text-violet"
                        : ""
                    }`}
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom stat line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 flex justify-center gap-12 text-center"
        >
          {[
            { value: "10+", label: "Technologies" },
            { value: "3", label: "Platforms" },
            { value: "∞", label: "Learning" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-[family-name:var(--font-syne)] font-bold text-xl text-cyan">
                {stat.value}
              </p>
              <p className="text-[11px] font-[family-name:var(--font-mono)] text-text-muted">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
