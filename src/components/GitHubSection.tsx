import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { personal, githubContributions, githubPinnedRepos } from "@/data/portfolio";
import GlareHover from "@/components/GlareHover";

const levelColors = (isDarkMode: boolean) => isDarkMode
  ? ["#252220", "#1A4A2A", "#236B33", "#2D8A3E", "#3AAD50"]
  : ["#E4DFD5", "#C0D9B6", "#7FBA65", "#4A9A35", "#2D6620"];

export default function GitHubSection({ isDark }: { isDark: boolean }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const colors = levelColors(isDark);

  return (
    <section
      id="github"
      className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 relative overflow-hidden"
      style={{ background: "var(--c-bg)" }}
      ref={ref}
    >
      <div className="absolute pointer-events-none" style={{
        width: "40vw", height: "40vw",
        right: "0%", top: "-5%",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(45,90,39,0.1) 0%, transparent 65%)",
        filter: "blur(60px)",
      }} />

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="flex items-center gap-4 mb-10 sm:mb-16"
        >
          <span className="text-xs tracking-widest uppercase font-semibold" style={{ color: "var(--c-fg35)" }}>
            06 / GitHub
          </span>
          <div className="flex-1 h-px" style={{ background: "var(--c-border)" }} />
        </motion.div>

        {/* 1 col on mobile => 2 cols on lg+ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">

          {/* Left: text + stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <h2
              className="font-display leading-tight mb-4 sm:mb-6"
              style={{ fontSize: "clamp(1.8rem, 6vw, 3rem)", color: "var(--c-fg)" }}
            >
              Building in<br />
              <span style={{ fontStyle: "italic", color: "var(--c-fg50)" }}>the open.</span>
            </h2>

            <p className="text-sm sm:text-base leading-relaxed mb-6 sm:mb-8" style={{ color: "var(--c-fg65)" }}>
              Active on GitHub under{" "}
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold underline underline-offset-2"
                style={{ color: "var(--c-fg)" }}
              >
                @{personal.githubUsername}
              </a>
              , contributing across personal projects, internship work, and open-source explorations.
            </p>

            {/* Stats cards */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
              {[
                { value: 56, label: "Contributions · 2026" },
                { value: 14, label: "Public Repos" },
              ].map((stat) => (
                <GlareHover
                  key={stat.label}
                  width="100%"
                  height="auto"
                  background="var(--glass-bg)"
                  borderRadius="var(--r-md)"
                  borderColor="var(--glass-border)"
                  glareColor="#ffffff"
                  glareOpacity={0.08}
                  glareAngle={-45}
                  glareSize={220}
                  transitionDuration={600}
                  style={{
                    backdropFilter: "blur(var(--glass-blur))",
                    WebkitBackdropFilter: "blur(var(--glass-blur))",
                    boxShadow: "var(--glass-shadow)",
                  } as React.CSSProperties}
                >
                  <div className="p-4 sm:p-5">
                    <div
                      className="font-display mb-1"
                      style={{ fontSize: "clamp(1.4rem, 5vw, 1.875rem)", color: "var(--c-fg)" }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-xs tracking-widest uppercase" style={{ color: "var(--c-fg45)" }}>
                      {stat.label}
                    </div>
                  </div>
                </GlareHover>
              ))}
            </div>

            {/* CTA button */}
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide px-5 py-2.5 sm:px-6 sm:py-3 border transition-all duration-300"
              style={{ borderColor: "var(--c-fg)", color: "var(--c-fg)", borderRadius: "var(--r-md)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--c-fg)";
                e.currentTarget.style.color = "var(--c-bg)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "var(--c-fg)";
              }}
            >
              View GitHub Profile ↗
            </a>
          </motion.div>

          {/* Right: heatmap + pinned repos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div
              className="mb-3 sm:mb-4 text-xs tracking-widest uppercase font-semibold"
              style={{ color: "var(--c-fg35)" }}
            >
              Contributions · 2026
            </div>

            {/* Heatmap - horizontally scrollable on mobile, flush to screen edges */}
            <div className="mb-4 sm:mb-6 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
              <div className="flex gap-[3px] sm:gap-1 min-w-fit pb-2">
                {githubContributions.map((week, i) => (
                  <div key={i} className="flex flex-col gap-[3px] sm:gap-1">
                    {/* Month label */}
                    <div
                      className="text-center mb-1 sm:mb-2"
                      style={{
                        color: "var(--c-fg35)",
                        fontSize: "9px",
                        height: 10,
                        lineHeight: "10px",
                      }}
                    >
                      {week.date}
                    </div>
                    {/* 7 day cells */}
                    {week.cells.map((cellLevel, j) => (
                      <motion.div
                        key={j}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.35, delay: 0.25 + i * 0.025 + j * 0.01 }}
                        className="contribution-cell"
                        style={{
                          width: "clamp(10px, 2vw, 14px)",
                          height: "clamp(10px, 2vw, 14px)",
                          background: colors[cellLevel],
                          borderRadius: 3,
                        }}
                        title={cellLevel > 0 ? "Contribution" : "No contributions"}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-1.5 sm:gap-2 mb-6 sm:mb-8">
              <span className="text-xs" style={{ color: "var(--c-fg40)" }}>Less</span>
              {colors.map((color, i) => (
                <div key={i} style={{ width: 10, height: 10, background: color, borderRadius: 3 }} />
              ))}
              <span className="text-xs" style={{ color: "var(--c-fg40)" }}>More</span>
            </div>

            {/* Pinned Repositories */}
            <div
              className="mb-3 text-xs tracking-widest uppercase font-semibold"
              style={{ color: "var(--c-fg35)" }}
            >
              Pinned Repositories
            </div>
            <div className="space-y-3">
              {githubPinnedRepos.map((repo, i) => (
                <motion.a
                  key={repo.name}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.07 }}
                  className="flex items-center justify-between py-2.5 group"
                  style={{ borderBottom: "1px solid var(--c-muted)", textDecoration: "none" }}
                >
                  <div className="flex flex-col gap-0.5 min-w-0 pr-2">
                    <span
                      className="text-xs font-semibold truncate group-hover:underline transition-colors duration-200"
                      style={{ color: "var(--c-fg)" }}
                    >
                      {repo.name}
                    </span>
                    <span className="text-xs truncate" style={{ color: "var(--c-fg45)" }}>
                      {repo.description}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: repo.languageColor,
                        flexShrink: 0,
                      }}
                    />
                    <span className="text-xs whitespace-nowrap" style={{ color: "var(--c-fg45)" }}>
                      {repo.language}
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
