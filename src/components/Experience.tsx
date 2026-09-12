import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { experience, certifications } from "@/data/portfolio";

export default function Experience() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);

  return (
    <section id="experience" className="py-32 px-6" style={{ background: "var(--c-bg2)" }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, x: -20 }}
          animate={headerInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="text-xs tracking-widest uppercase font-semibold" style={{ color: "var(--c-fg35)" }}>
            03 / Experience
          </span>
          <motion.div
            className="flex-1 h-px origin-left"
            style={{ background: "var(--c-border)" }}
            initial={{ scaleX: 0 }}
            animate={headerInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <motion.h2
              initial={{ opacity: 0, y: 28, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
              className="font-display text-[clamp(2rem,3.5vw,3rem)] leading-tight mb-10"
              style={{ color: "var(--c-fg)" }}
            >
              Where I&apos;ve<br />
              <span style={{ fontStyle: "italic", color: "var(--c-fg50)" }}>made an impact.</span>
            </motion.h2>

            <div className="space-y-1">
              {experience.map((exp, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.1 }}
                  onClick={() => setActive(i)}
                  className="w-full text-left px-6 py-4 transition-all duration-300"
                  style={{
                    background: active === i ? "var(--c-fg)" : "transparent",
                    color: active === i ? "var(--c-bg)" : "var(--c-fg50)",
                    borderLeft: `2px solid ${active === i ? "var(--c-fg)" : "transparent"}`,
                  }}
                >
                  <div className="text-xs tracking-widest uppercase mb-1 font-semibold" style={{ opacity: 0.6 }}>
                    {exp.duration}
                  </div>
                  <div className="font-semibold text-sm">{exp.company}</div>
                  <div className="text-xs mt-0.5" style={{ opacity: 0.7 }}>{exp.role}</div>
                </motion.button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            {experience.map((exp, i) => (
              <motion.div
                key={i}
                initial={false}
                animate={active === i ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 8, filter: "blur(2px)" }}
                transition={{ duration: 0.35 }}
                style={{
                  display: active === i ? "block" : "none",
                  position: "relative",
                  padding: "2rem",
                  background: "var(--glass-bg)",
                  backdropFilter: "blur(var(--glass-blur))",
                  WebkitBackdropFilter: "blur(var(--glass-blur))",
                  border: "1px solid var(--glass-border)",
                  boxShadow: "var(--glass-shadow)",
                  borderRadius: "var(--r-lg)",
                }}
              >
                <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
                  <div>
                    <h3 className="text-2xl font-semibold mb-1" style={{ color: "var(--c-fg)" }}>{exp.role}</h3>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-sm font-semibold" style={{ color: "var(--c-accent)" }}>{exp.company}</span>
                      <span className="text-xs px-2 py-0.5 border" style={{ borderColor: "var(--c-border)", color: "var(--c-fg50)", borderRadius: "var(--r-sm)" }}>
                        {exp.type}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs tracking-widest" style={{ color: "var(--c-fg40)" }}>{exp.duration}</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {exp.highlights.map((h, j) => (
                    <motion.li
                      key={j}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: j * 0.06 }}
                      className="flex gap-3 text-sm leading-relaxed"
                      style={{ color: "var(--c-fg65)" }}
                    >
                      <span className="mt-2 flex-shrink-0 w-1 h-1 rounded-full" style={{ background: "var(--c-accent)" }} />
                      {h}
                    </motion.li>
                  ))}
                </ul>

                <div className="mb-6">
                  <div className="text-xs tracking-widest uppercase mb-3 font-semibold" style={{ color: "var(--c-fg35)" }}>Technologies</div>
                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((t) => (
                      <span key={t} className="text-xs px-3 py-1.5 font-medium" style={{ background: "var(--c-muted)", color: "var(--c-fg)", borderRadius: "var(--r-sm)" }}>{t}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-xs tracking-widest uppercase mb-3 font-semibold" style={{ color: "var(--c-fg35)" }}>Key Projects</div>
                  <div className="flex flex-wrap gap-2">
                    {exp.projects.map((p) => (
                      <span key={p} className="text-xs px-3 py-1.5 border font-medium" style={{ borderColor: "var(--c-fg)", color: "var(--c-fg)", borderRadius: "var(--r-sm)" }}>{p}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mt-20 pt-12"
          style={{ borderTop: "1px solid var(--c-border)" }}
        >
          <div className="text-xs tracking-widest uppercase mb-6 font-semibold" style={{ color: "var(--c-fg35)" }}>Certifications</div>
          <div className="grid sm:grid-cols-2 gap-4">
            {certifications.map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="flex gap-4 p-5"
                style={{ background: "var(--c-muted)", borderRadius: "var(--r-md)" }}
              >
                <div className="text-xl">📜</div>
                <div>
                  <div className="text-sm font-semibold mb-0.5" style={{ color: "var(--c-fg)" }}>{cert.name}</div>
                  <div className="text-xs" style={{ color: "var(--c-fg55)" }}>{cert.issuer}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
