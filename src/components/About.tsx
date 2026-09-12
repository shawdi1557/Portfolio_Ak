import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { personal, education, achievements } from "@/data/portfolio";
import ScrollReveal from "@/components/ScrollReveal";

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 28, filter: "blur(4px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, delay },
});

export default function About() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section id="about" className="pt-16 pb-32 px-6 relative overflow-hidden" style={{ background: "var(--c-bg)" }}>
      {/* Ambient orb */}
      <div className="absolute pointer-events-none" style={{
        width: "40vw", height: "40vw",
        left: "60%", top: "-10%",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(45,90,39,0.1) 0%, transparent 65%)",
        filter: "blur(60px)",
      }} />
      <div className="max-w-7xl mx-auto">
        {/* Label */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, x: -20 }}
          animate={headerInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="text-xs tracking-widest uppercase font-semibold" style={{ color: "var(--c-fg35)" }}>
            02 / About
          </span>
          <motion.div
            className="flex-1 h-px origin-left"
            style={{ background: "var(--c-border)" }}
            initial={{ scaleX: 0 }}
            animate={headerInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-20">
          {/* Left */}
          <div>
            <motion.h2
              {...reveal(0)}
              className="font-display text-[clamp(2rem,4vw,3.5rem)] leading-tight mb-8"
              style={{ color: "var(--c-fg)" }}
            >
              Developer,<br />
              <span style={{ fontStyle: "italic", color: "var(--c-fg50)" }}>Designer,</span><br />
              Creator.
            </motion.h2>

            <ScrollReveal
              baseOpacity={0}
              baseRotation={0}
              blurStrength={4}
              enableBlur
              containerClassName="mb-6 text-base leading-relaxed"
              style={{ color: "var(--c-fg65)" }}
            >
              {personal.bio}
            </ScrollReveal>

            {/* spacing between the two bio paragraphs */}
            <div className="mb-4" />

            <ScrollReveal
              baseOpacity={0}
              baseRotation={0}
              blurStrength={4}
              enableBlur
              containerClassName="mb-10 text-base leading-relaxed"
              style={{ color: "var(--c-fg65)" }}
            >
              Currently, I’m working as a Software Developer Intern at MINTS GLOBAL, where I contribute to the MINTS ERP System and gain hands-on experience working on real-world software solutions. I’m driven by curiosity, creativity, and a constant desire to build better things. Outside of development, I enjoy football, gaming, and creative editing with After Effects.
            </ScrollReveal>
    
            <motion.div {...reveal(0.2)}>
              <br></br>
              <div className="text-xs tracking-widest uppercase mb-4 font-semibold" style={{ color: "var(--c-fg35)" }}>
                Interests
              </div>
              <div className="flex flex-wrap gap-2">
                {personal.interests.map((interest, i) => (
                  <motion.span
                    key={interest}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: 0.25 + i * 0.05 }}
                    className="text-sm px-3 py-1.5 border transition-all duration-200 cursor-default"
                    style={{ borderColor: "var(--c-border)", color: "var(--c-fg65)" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "var(--c-fg)";
                      e.currentTarget.style.color = "var(--c-bg)";
                      e.currentTarget.style.borderColor = "var(--c-fg)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "var(--c-fg65)";
                      e.currentTarget.style.borderColor = "var(--c-border)";
                    }}
                  >
                    {interest}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right */}
          <div>
            <motion.div {...reveal(0.05)} className="mb-12">
              <div className="text-xs tracking-widest uppercase mb-6 font-semibold" style={{ color: "var(--c-fg35)" }}>Education</div>
              <div className="space-y-6">
                {education.map((edu, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: i * 0.1 }}
                    className="pb-6"
                    style={{ borderBottom: "1px solid var(--c-muted)" }}
                  >
                    <div className="flex items-start justify-between gap-4 mb-1">
                      <span className="text-sm font-semibold" style={{ color: "var(--c-fg)" }}>{edu.degree}</span>
                      <span className="text-xs whitespace-nowrap" style={{ color: "var(--c-fg40)" }}>{edu.year}</span>
                    </div>
                    <div className="text-sm" style={{ color: "var(--c-fg55)" }}>{edu.institution}</div>
                    <div className="text-xs mt-1 font-medium" style={{ color: "var(--c-accent)" }}>{edu.grade}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div {...reveal(0.12)}>
              <div className="text-xs tracking-widest uppercase mb-6 font-semibold" style={{ color: "var(--c-fg35)" }}>
                Leadership & Achievements
              </div>
              <div className="space-y-4">
                {achievements.map((a, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="text-xs font-semibold mt-0.5 tabular-nums" style={{ color: "var(--c-fg25)" }}>
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div>
                      <div className="text-sm font-semibold mb-0.5" style={{ color: "var(--c-fg)" }}>{a.title}</div>
                      <div className="text-sm leading-relaxed" style={{ color: "var(--c-fg55)" }}>{a.description}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
