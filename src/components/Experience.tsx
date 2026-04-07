"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const TIMELINE = [
  {
    role: "Software Developer",
    company: "DoubleX",
    location: "Remote",
    period: "Apr 2023 - Present",
    highlights: [
      "Built and deployed AI agents that reduced repetitive task time by 40%",
      "Shipped mobile and web apps end-to-end across 3-5 concurrent projects (Flutter, Node.js, NestJS, Prisma)",
      "Created Power BI dashboards adopted by client leadership for decision-making",
      "Implemented n8n automation workflows integrating third-party APIs",
    ],
  },
  {
    role: "Head of Sales",
    company: "Alfred Delivery",
    location: "Sao Paulo, Brazil",
    period: "Jan 2022 - Mar 2023",
    highlights: [
      "Drove 67% month-over-month revenue growth (R$111k to R$186k)",
      "Built Power BI dashboards used by 10 people daily",
      "Identified that 70% of lost leads were due to contact failures and redesigned the qualification process",
    ],
  },
  {
    role: "Sales Team Lead",
    company: "Alfred Delivery",
    location: "Sao Paulo, Brazil",
    period: "Dec 2019 - Jan 2022",
    highlights: [
      "Progressed through three roles in 2 years based on results",
      "Built the KPI framework for the sales team and coached junior reps",
    ],
  },
];

const EDUCATION = [
  {
    degree: "MBA in Innovation, Technology and Entrepreneurship",
    school: "International Business University",
    location: "Toronto, Canada",
    period: "Sep 2024 - Apr 2026",
  },
  {
    degree: "Bachelor of Medical Physics",
    school: "University of Sao Paulo",
    location: "Brazil",
    period: "2015 - 2021",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeading label="// experience" title="Where I've Worked" />

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-cyan/40 via-violet/40 to-transparent hidden sm:block" />

          <div className="space-y-12">
            {TIMELINE.map((item, i) => (
              <motion.div
                key={item.period}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="relative sm:pl-10"
              >
                {/* Dot on timeline */}
                <div className="absolute left-0 top-2 hidden sm:block">
                  <div className="w-[23px] h-[23px] rounded-full border-2 border-cyan/50 bg-void flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-cyan" />
                  </div>
                </div>

                <div className="glass rounded-xl p-6 glass-hover">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
                    <div>
                      <h3 className="font-[family-name:var(--font-syne)] font-bold text-lg text-text">
                        {item.role}
                      </h3>
                      <p className="text-sm text-cyan font-[family-name:var(--font-mono)]">
                        {item.company}{" "}
                        <span className="text-text-muted">
                          &middot; {item.location}
                        </span>
                      </p>
                    </div>
                    <span className="text-xs font-[family-name:var(--font-mono)] text-text-muted tracking-wider shrink-0">
                      {item.period}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {item.highlights.map((h) => (
                      <li
                        key={h}
                        className="text-sm text-text-muted leading-relaxed flex gap-2"
                      >
                        <span className="text-cyan/60 mt-1.5 shrink-0">
                          &rsaquo;
                        </span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="mt-24">
          <SectionHeading label="// education" title="Where I've Studied" />

          <div className="grid sm:grid-cols-2 gap-6">
            {EDUCATION.map((edu, i) => (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="glass rounded-xl p-6"
              >
                <h3 className="font-[family-name:var(--font-syne)] font-bold text-base text-text mb-1">
                  {edu.degree}
                </h3>
                <p className="text-sm text-cyan font-[family-name:var(--font-mono)]">
                  {edu.school}
                </p>
                <p className="text-xs text-text-muted font-[family-name:var(--font-mono)] mt-1">
                  {edu.location} &middot; {edu.period}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
