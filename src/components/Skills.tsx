import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { skills } from "@/data/portfolio";

const categoryHoverColors: Record<string, string> = {
  Frontend: "#1A4A3A",
  Backend: "#2D1A4A",
  Database: "#4A2D1A",
  Tools: "#1A2D4A",
  Creative: "#4A1A2D",
};

export default function Skills() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="py-32 px-6 relative overflow-hidden" style={{ background: "var(--c-bg)" }}>
      <div className="absolute pointer-events-none" style={{
        width: "50vw", height: "50vw",
        right: "-10%", top: "20%",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(100,60,180,0.08) 0%, transparent 65%)",
        filter: "blur(70px)",
      }} />
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, x: -20 }}
          animate={headerInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="text-xs tracking-widest uppercase font-semibold" style={{ color: "var(--c-fg35)" }}>
            04 / Skills
          </span>
          <motion.div
            className="flex-1 h-px origin-left"
            style={{ background: "var(--c-border)" }}
            initial={{ scaleX: 0 }}
            animate={headerInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 28, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-display text-[clamp(2rem,3.5vw,3rem)] leading-tight" style={{ color: "var(--c-fg)" }}>
              Tools of<br />
              <span style={{ fontStyle: "italic", color: "var(--c-fg50)" }}>the craft.</span>
            </h2>
            <p className="mt-6 text-sm leading-relaxed" style={{ color: "var(--c-fg55)" }}>
              A versatile stack spanning frontend, backend, databases, and creative tooling —
              built through real projects and professional work.
            </p>
          </motion.div>

          <div className="lg:col-span-2 space-y-8">
            {Object.entries(skills).map(([category, items], catIdx) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: catIdx * 0.07 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-xs tracking-widest uppercase font-semibold" style={{ color: "var(--c-fg40)" }}>
                    {category}
                  </span>
                  <div className="flex-1 h-px" style={{ background: "var(--c-muted)" }} />
                </div>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill, si) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.88 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: catIdx * 0.07 + si * 0.04 }}
                      className="text-sm px-4 py-2 font-medium transition-all duration-200 cursor-default"
                      style={{ background: "var(--c-muted)", color: "var(--c-fg)", borderRadius: "var(--r-sm)" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = categoryHoverColors[category] || "var(--c-fg)";
                        e.currentTarget.style.color = "#F7F4EE";
                        e.currentTarget.style.transform = "translateY(-2px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "var(--c-muted)";
                        e.currentTarget.style.color = "var(--c-fg)";
                        e.currentTarget.style.transform = "translateY(0)";
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
