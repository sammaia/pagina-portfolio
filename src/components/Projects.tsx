"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const PROJECTS = [
  {
    title: "Toronto Housing Insights",
    description:
      "Interactive dashboard displaying Canadian housing market data from CMHC with real-time charts and an AI-powered chat feature for natural language queries about vacancy rates, rental prices, and housing starts.",
    stack: ["NestJS", "React", "Prisma", "PostgreSQL", "Claude API", "Recharts"],
    link: "https://toronto-housing.vercel.app/",
    github: "https://github.com/sammaia/toronto-housing",
    status: "live" as const,
    accent: "cyan" as const,
    mockup: {
      type: "dashboard" as const,
      features: ["KPI Cards", "Interactive Charts", "AI Chat", "Data Sync"],
    },
  },
  {
    title: "PetCare",
    description:
      "SaaS platform connecting pet owners with dog daycares. Tutors book and track services via mobile app, while daycares manage operations, daily reports, and payments through a web dashboard.",
    stack: ["Next.js", "Flutter", "Supabase", "Prisma", "Asaas", "Firebase"],
    link: "https://daily-pet-ebon.vercel.app/login",
    github: "https://github.com/sammaia/daily-pet",
    status: "live" as const,
    accent: "violet" as const,
    mockup: {
      type: "mobile" as const,
      features: ["Mobile App", "Web Dashboard", "Payments", "Push Notifications"],
    },
  },
  {
    title: "API Monitor",
    description:
      "Health monitoring and alerting tool for APIs. Tracks endpoint availability, response times, and status codes with automated checks and notification workflows.",
    stack: ["NestJS", "React", "PostgreSQL", "Prisma", "Cron Jobs"],
    link: null,
    github: null,
    status: "dev" as const,
    accent: "cyan" as const,
    mockup: {
      type: "monitor" as const,
      features: ["Health Checks", "Response Times", "Alerts", "Status Page"],
    },
  },
];

function MockupDashboard({ accent }: { accent: "cyan" | "violet" }) {
  return (
    <div className="w-full h-full bg-surface rounded-lg p-3 flex flex-col gap-2 overflow-hidden">
      {/* Title bar */}
      <div className="flex items-center gap-1.5 mb-1">
        <div className="w-2 h-2 rounded-full bg-red-500/60" />
        <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
        <div className="w-2 h-2 rounded-full bg-green-500/60" />
        <div className="ml-2 h-2 w-24 rounded-full bg-white/5" />
      </div>
      {/* KPI row */}
      <div className="grid grid-cols-4 gap-1.5">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="rounded-md bg-white/[0.03] p-2 border border-white/5">
            <div className="h-1.5 w-8 rounded bg-white/10 mb-1.5" />
            <div className={`h-3 w-12 rounded ${accent === "cyan" ? "bg-cyan/20" : "bg-violet/20"}`} />
          </div>
        ))}
      </div>
      {/* Chart area */}
      <div className="flex-1 rounded-md bg-white/[0.03] border border-white/5 p-2 flex items-end gap-[3px]">
        {[40, 65, 45, 80, 55, 70, 90, 60, 75, 85, 50, 68].map((h, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            whileInView={{ height: `${h}%` }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + i * 0.05, duration: 0.4, ease: "easeOut" }}
            className={`flex-1 rounded-sm ${
              accent === "cyan"
                ? "bg-gradient-to-t from-cyan/40 to-cyan/10"
                : "bg-gradient-to-t from-violet/40 to-violet/10"
            }`}
          />
        ))}
      </div>
      {/* Chat snippet */}
      <div className="rounded-md bg-white/[0.03] border border-white/5 p-2 flex flex-col gap-1">
        <div className="h-1.5 w-20 rounded bg-white/10" />
        <div className={`h-1.5 w-32 rounded ${accent === "cyan" ? "bg-cyan/15" : "bg-violet/15"}`} />
      </div>
    </div>
  );
}

function MockupMobile({ accent }: { accent: "cyan" | "violet" }) {
  const isCyan = accent === "cyan";
  return (
    <div className="w-full h-full flex items-center justify-center gap-3">
      {/* Phone frame */}
      <div className="w-[45%] h-[85%] rounded-2xl border-2 border-white/10 bg-surface p-2 flex flex-col gap-1.5 overflow-hidden">
        <div className="w-12 h-1 rounded-full bg-white/10 mx-auto mb-1" />
        <div className={`rounded-lg p-2 flex-1 flex flex-col gap-1.5 ${isCyan ? "bg-cyan/10" : "bg-violet/10"}`}>
          <div className="h-2 w-16 rounded bg-white/10" />
          <div className="h-2 w-24 rounded bg-white/5" />
          <div className="flex-1 rounded-md bg-white/[0.04] mt-1 flex items-center justify-center">
            <div className={`w-8 h-8 rounded-full ${isCyan ? "bg-cyan/20 border border-cyan/30" : "bg-violet/20 border border-violet/30"}`} />
          </div>
          <div className={`h-6 rounded-md mt-auto ${isCyan ? "bg-cyan/20" : "bg-violet/20"}`} />
        </div>
      </div>
      {/* Browser frame */}
      <div className="w-[50%] h-[75%] rounded-lg border border-white/10 bg-surface p-2 flex flex-col gap-1 overflow-hidden">
        <div className="flex items-center gap-1 mb-1">
          <div className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
          <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/50" />
          <div className="w-1.5 h-1.5 rounded-full bg-green-500/50" />
        </div>
        <div className="flex-1 grid grid-rows-3 gap-1">
          <div className="rounded bg-white/[0.03] border border-white/5 p-1.5">
            <div className="h-1.5 w-12 rounded bg-white/10" />
          </div>
          <div className={`rounded row-span-2 p-1.5 flex flex-col gap-1 ${isCyan ? "bg-cyan/[0.06] border border-cyan/10" : "bg-violet/[0.06] border border-violet/10"}`}>
            <div className="h-1.5 w-16 rounded bg-white/10" />
            <div className="h-1.5 w-10 rounded bg-white/5" />
            <div className={`h-4 rounded mt-auto ${isCyan ? "bg-cyan/10" : "bg-violet/10"}`} />
          </div>
        </div>
      </div>
    </div>
  );
}

function MockupMonitor({ accent }: { accent: "cyan" | "violet" }) {
  return (
    <div className="w-full h-full bg-surface rounded-lg p-3 flex flex-col gap-2 overflow-hidden">
      <div className="flex items-center gap-1.5 mb-1">
        <div className="w-2 h-2 rounded-full bg-red-500/60" />
        <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
        <div className="w-2 h-2 rounded-full bg-green-500/60" />
      </div>
      {/* Status rows */}
      {[
        { status: "up", name: "Production API", ms: "124ms" },
        { status: "up", name: "Auth Service", ms: "89ms" },
        { status: "warn", name: "Payment Gateway", ms: "450ms" },
        { status: "up", name: "Database", ms: "12ms" },
        { status: "down", name: "CDN Cache", ms: "timeout" },
      ].map((row, i) => (
        <motion.div
          key={row.name}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 + i * 0.1 }}
          className="flex items-center gap-2 rounded-md bg-white/[0.03] border border-white/5 px-2 py-1.5"
        >
          <div
            className={`w-2 h-2 rounded-full ${
              row.status === "up"
                ? "bg-green-400"
                : row.status === "warn"
                ? "bg-yellow-400"
                : "bg-red-400"
            }`}
          />
          <span className="text-[9px] text-white/40 font-[family-name:var(--font-mono)] flex-1">
            {row.name}
          </span>
          <span
            className={`text-[9px] font-[family-name:var(--font-mono)] ${
              row.status === "up"
                ? "text-green-400/60"
                : row.status === "warn"
                ? "text-yellow-400/60"
                : "text-red-400/60"
            }`}
          >
            {row.ms}
          </span>
        </motion.div>
      ))}
      {/* Mini chart */}
      <div className="flex-1 rounded-md bg-white/[0.03] border border-white/5 p-2 flex items-end gap-px">
        {[30, 32, 28, 35, 90, 40, 33, 29, 31, 34, 28, 30, 55, 32, 29].map(
          (h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              whileInView={{ height: `${Math.min(h, 100)}%` }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + i * 0.03 }}
              className={`flex-1 rounded-sm ${
                h > 50 ? "bg-yellow-400/30" : accent === "cyan" ? "bg-cyan/25" : "bg-violet/25"
              }`}
            />
          )
        )}
      </div>
    </div>
  );
}

function ProjectMockup({
  type,
  accent,
}: {
  type: "dashboard" | "mobile" | "monitor";
  accent: "cyan" | "violet";
}) {
  const Component = {
    dashboard: MockupDashboard,
    mobile: MockupMobile,
    monitor: MockupMonitor,
  }[type];
  return <Component accent={accent} />;
}

export default function Projects() {
  return (
    <section id="projects" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading label="// projects" title="What I've Built" />

        <div className="grid gap-10">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="group glass glass-hover rounded-2xl overflow-hidden glow-border"
            >
              <div className="grid md:grid-cols-[1fr_340px] gap-0">
                {/* Text content */}
                <div className="p-8 sm:p-10 relative">
                  {/* Corner glow */}
                  <div
                    className={`absolute -top-20 -left-20 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-700 ${
                      project.accent === "cyan" ? "bg-cyan" : "bg-violet"
                    }`}
                  />

                  <div className="relative">
                    <div className="flex items-center gap-3 mb-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-[family-name:var(--font-mono)] uppercase tracking-wider ${
                          project.status === "live"
                            ? "bg-cyan/10 text-cyan border border-cyan/20"
                            : "bg-violet/10 text-violet border border-violet/20"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            project.status === "live"
                              ? "bg-cyan animate-pulse"
                              : "bg-violet"
                          }`}
                        />
                        {project.status === "live" ? "Live" : "In Development"}
                      </span>
                    </div>

                    <h3
                      className={`font-[family-name:var(--font-syne)] font-bold text-2xl sm:text-3xl tracking-tight mb-3 ${
                        project.accent === "cyan" ? "text-cyan" : "text-violet"
                      }`}
                    >
                      {project.title}
                    </h3>

                    <p className="text-text-muted leading-relaxed mb-6 text-sm sm:text-base">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.stack.map((tech) => (
                        <span key={tech} className="tag">
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Feature pills */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.mockup.features.map((feat) => (
                        <span
                          key={feat}
                          className="text-[11px] font-[family-name:var(--font-mono)] text-text-muted/60 bg-white/[0.03] border border-white/5 rounded px-2 py-0.5"
                        >
                          {feat}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-4">
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-[family-name:var(--font-mono)] text-cyan hover:text-glow-cyan transition-all group/link"
                        >
                          Live Demo
                          <svg
                            className="w-4 h-4 transition-transform group-hover/link:translate-x-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                            />
                          </svg>
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-[family-name:var(--font-mono)] text-text-muted hover:text-text transition-all"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                          </svg>
                          Source
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Mockup visual */}
                <div className="relative h-[280px] md:h-auto bg-white/[0.01] border-t md:border-t-0 md:border-l border-white/5 p-4 overflow-hidden">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    whileHover={{ scale: 1.02 }}
                    className="w-full h-full"
                  >
                    <ProjectMockup type={project.mockup.type} accent={project.accent} />
                  </motion.div>
                  {/* Glow behind mockup */}
                  <div
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full blur-3xl opacity-10 ${
                      project.accent === "cyan" ? "bg-cyan" : "bg-violet"
                    }`}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
