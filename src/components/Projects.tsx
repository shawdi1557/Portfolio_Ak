import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { projects } from "@/data/portfolio";

export default function Projects() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section id="projects" className="py-32 px-6 relative overflow-hidden" style={{ background: "var(--c-bg2)" }}>
      <div className="absolute pointer-events-none" style={{
        width: "45vw", height: "45vw",
        left: "-5%", top: "30%",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(196,145,42,0.07) 0%, transparent 65%)",
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
            05 / Projects
          </span>
          <motion.div
            className="flex-1 h-px origin-left"
            style={{ background: "var(--c-border)" }}
            initial={{ scaleX: 0 }}
            animate={headerInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 28, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="font-display text-[clamp(2rem,4vw,3.5rem)] leading-tight mb-20"
          style={{ color: "var(--c-fg)" }}
        >
          Selected work<br />
          <span style={{ fontStyle: "italic", color: "var(--c-fg50)" }}>& experiments.</span>
        </motion.h2>

        <div>
          {projects.map((project, i) => (
            <ProjectRow key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectRow({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [-12, 12]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.05 }}
      className="group relative py-10"
      style={{ borderTop: "1px solid var(--c-border)" }}
    >
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Index */}
        <div className="lg:col-span-1">
          <span className="font-display text-4xl" style={{ color: "var(--c-fg10)", fontStyle: "italic" }}>
            {project.id}
          </span>
        </div>

        {/* Info */}
        <div className="lg:col-span-6">
          <div className="flex items-center gap-3 mb-3 flex-wrap">
            <h3 className="text-2xl font-semibold transition-colors duration-300" style={{ color: "var(--c-fg)" }}>
              {project.name}
            </h3>
            <span className="text-xs tracking-widest font-medium" style={{ color: "var(--c-fg35)" }}>
              {project.tagline}
            </span>
          </div>
          <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--c-fg65)" }}>{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((t) => (
              <span key={t} className="text-xs px-2 py-1 font-medium" style={{ background: "var(--c-muted)", color: "var(--c-fg65)", borderRadius: "var(--r-sm)" }}>
                {t}
              </span>
            ))}
          </div>
          <ul className="space-y-1">
            {project.features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-xs" style={{ color: "var(--c-fg50)" }}>
                <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: project.color }} />
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* Visual + links */}
        <div className="lg:col-span-5 flex flex-col items-end gap-6">
          <div
            className="w-full aspect-video relative overflow-hidden"
            style={{ background: project.color, border: "1px solid var(--c-border)", borderRadius: "var(--r-md)" }}
          >
            {project.image ? (
              <>
                {/* Screenshot with subtle parallax — no gradient overlay */}
                <motion.div className="absolute inset-0" style={{ y: imgY }}>
                  <img
                    src={project.image}
                    alt={`${project.name} screenshot`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ display: "block" }}
                    loading="lazy"
                  />
                </motion.div>
              </>
            ) : (
              <>
                {/* Subtle parallax on the label inside */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ y: imgY }}
                >
                  <span
                    className="font-display text-[5rem] font-bold select-none"
                    style={{ color: "rgba(255,255,255,0.06)", fontStyle: "italic", lineHeight: 1 }}
                  >
                    {project.name[0]}
                  </span>
                </motion.div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="font-display text-xl font-semibold text-center px-4 transition-transform duration-500 group-hover:scale-105"
                    style={{ color: "rgba(255,255,255,0.7)" }}
                  >
                    {project.name}
                  </span>
                </div>
              </>
            )}
            {/* Hover shine */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 60%)" }}
            />
          </div>

          <div className="flex gap-3">
            {project.live && (
              <a
                href={project.live} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-semibold px-5 py-2.5 transition-all duration-300"
                style={{ background: "transparent", color: "var(--c-fg)", border: "1px solid var(--c-border)", borderRadius: "var(--r-md)" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--c-fg)"; e.currentTarget.style.background = "var(--glass-bg)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--c-border)"; e.currentTarget.style.background = "transparent"; }}
              >
                Live Demo ↗
              </a>
            )}
            {project.github && (
              <a
                href={project.github} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-semibold px-5 py-2.5 border transition-all duration-300"
                style={{ borderColor: "var(--c-border)", color: "var(--c-fg)", borderRadius: "var(--r-sm)" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--c-fg)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--c-border)"; }}
              >
                GitHub ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
