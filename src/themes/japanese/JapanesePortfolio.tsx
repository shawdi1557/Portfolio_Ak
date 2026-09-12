import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { personal, experience, skills, projects } from "@/data/portfolio";
import profileImg from "@/imports/AK_PROFESSIONAL.png";

const gold = "#C4912A";
const crimson = "#8B1515";
const paper = "#E2D5BE";
const dark = "#0B0906";
const darkMid = "#140E09";

const chapters = [
  { jp: "序章", en: "Preface", id: "hero" },
  { jp: "経歴", en: "Chronicle", id: "experience" },
  { jp: "技術", en: "Technique", id: "skills" },
  { jp: "作品", en: "Works", id: "projects" },
  { jp: "連絡", en: "Contact", id: "contact" },
];

function FloatingKanji() {
  const chars = ["刀", "剣", "武", "道", "心", "技", "力", "志", "魂", "誠"];
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {chars.map((char, i) => (
        <div
          key={i}
          className="absolute font-japanese select-none"
          style={{
            left: `${10 + (i * 9) % 80}%`,
            top: `${100 + i * 120}px`,
            color: "rgba(196,145,42,0.04)",
            fontSize: `${40 + (i * 13) % 60}px`,
            fontWeight: 700,
            animation: `floatUp ${18 + i * 4}s linear ${i * 2}s infinite`,
          }}
        >
          {char}
        </div>
      ))}
    </div>
  );
}

function JapaneseNav({ onToggle }: { onToggle: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      style={{
        background: scrolled ? "rgba(11,9,6,0.96)" : "transparent",
        borderBottom: scrolled ? `1px solid rgba(196,145,42,0.15)` : "none",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        transition: "all 0.5s ease",
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <button onClick={() => scrollTo("hero")} style={{ color: gold }}>
          <span className="font-japanese text-sm tracking-widest">暁</span>
          <span className="ml-2 text-xs tracking-[0.3em] font-sans" style={{ color: "rgba(196,145,42,0.6)" }}>
            ✦
          </span>
        </button>

        <div className="hidden md:flex items-center gap-8">
          {chapters.map((ch) => (
            <button
              key={ch.id}
              onClick={() => scrollTo(ch.id)}
              className="group flex flex-col items-center gap-0.5"
            >
              <span className="font-japanese text-xs" style={{ color: gold, opacity: 0.8 }}>{ch.jp}</span>
              <span className="text-[10px] tracking-widest font-sans" style={{ color: "rgba(226,213,190,0.35)" }}>
                {ch.en}
              </span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onToggle}
            className="hidden md:block text-xs tracking-widest px-4 py-2 border font-sans transition-all duration-300"
            style={{ borderColor: `rgba(196,145,42,0.4)`, color: gold }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(196,145,42,0.1)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
          >
            ✦ Back
          </button>
          <button
            className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span className="block w-5 h-px" style={{ background: gold }} />
            <span className="block w-3 h-px" style={{ background: gold, opacity: 0.6 }} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden px-4 pb-6 pt-4"
          >
            {chapters.map((ch) => (
              <button
                key={ch.id}
                onClick={() => scrollTo(ch.id)}
                className="flex items-center gap-4 w-full py-3 border-b"
                style={{ borderColor: "rgba(196,145,42,0.1)" }}
              >
                <span className="font-japanese text-base" style={{ color: gold }}>{ch.jp}</span>
                <span className="text-xs tracking-widest" style={{ color: paper, opacity: 0.5 }}>{ch.en}</span>
              </button>
            ))}
            <button onClick={onToggle} className="mt-4 text-xs tracking-widest" style={{ color: "rgba(226,213,190,0.4)" }}>
              Switch to Back
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

function JapaneseHero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden"
      style={{ background: dark }}
    >
      {/* Top border line */}
      <div className="absolute top-24 left-0 right-0 px-12">
        <div className="h-px" style={{ background: `linear-gradient(to right, transparent, ${gold}, transparent)` }} />
      </div>

      {/* Left kanji column */}
      <div
        className="absolute left-8 top-1/2 -translate-y-1/2 font-japanese text-xs tracking-[0.5em] select-none hidden lg:block"
        style={{ color: `rgba(196,145,42,0.25)`, writingMode: "vertical-rl" }}
      >
        武士道 · 技術 · 創造
      </div>

      {/* Right vertical text */}
      <div
        className="absolute right-8 top-1/2 -translate-y-1/2 text-xs tracking-[0.5em] select-none hidden lg:block font-sans"
        style={{ color: `rgba(226,213,190,0.15)`, writingMode: "vertical-rl" }}
      >
        SOFTWARE · DESIGN · SECURITY
      </div>

      {/* Center content */}
      <div className="relative z-10 text-center px-8">
        {/* Chapter marker */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center gap-4 mb-12"
        >
          <div className="h-px w-12" style={{ background: gold }} />
          <span className="font-japanese text-xs tracking-widest" style={{ color: gold }}>序章 · PREFACE</span>
          <div className="h-px w-12" style={{ background: gold }} />
        </motion.div>

        {/* Name in large display */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9, ease: "easeOut" }}
        >
          <div className="font-japanese text-2xl mb-4 tracking-widest" style={{ color: `rgba(196,145,42,0.6)` }}>
            暁 比壽
          </div>
          <h1
            className="font-sans font-bold leading-none mb-6"
            style={{
              fontSize: "clamp(3.5rem, 12vw, 9rem)",
              color: paper,
              letterSpacing: "-0.02em",
              textShadow: `0 0 60px rgba(196,145,42,0.15)`,
            }}
          >
            AKSHAY<br />
            <span style={{ color: gold, WebkitTextStroke: `1px ${gold}`, WebkitTextFillColor: "transparent" }}>
              BIJU
            </span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="flex items-center justify-center gap-6 mb-12"
        >
          <span className="text-xs tracking-[0.4em] uppercase font-sans" style={{ color: `rgba(226,213,190,0.4)` }}>
            Software Developer
          </span>
          <span style={{ color: crimson }}>·</span>
          <span className="text-xs tracking-[0.4em] uppercase font-sans" style={{ color: `rgba(226,213,190,0.4)` }}>
            Creative Technologist
          </span>
          <span style={{ color: crimson }}>·</span>
          <span className="text-xs tracking-[0.4em] uppercase font-sans" style={{ color: `rgba(226,213,190,0.4)` }}>
            Kerala, India
          </span>
        </motion.div>

        {/* Profile photo with frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="relative inline-block mb-12"
        >
          <div className="absolute inset-0" style={{ border: `1px solid rgba(196,145,42,0.3)`, transform: "translate(8px, 8px)" }} />
          <div
            className="relative overflow-hidden"
            style={{ width: 200, height: 240, margin: "0 auto" }}
          >
            <img src={profileImg} alt="Akshay Biju" className="w-full h-full object-cover object-top" />
            <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent 50%, rgba(11,9,6,0.8))`, mixBlendMode: "multiply" }} />
            <div className="absolute inset-0" style={{ background: `rgba(139,21,21,0.1)` }} />
          </div>
          {/* Corner ornaments */}
          <div className="absolute top-0 left-0 w-4 h-4" style={{ borderTop: `2px solid ${gold}`, borderLeft: `2px solid ${gold}` }} />
          <div className="absolute top-0 right-0 w-4 h-4" style={{ borderTop: `2px solid ${gold}`, borderRight: `2px solid ${gold}` }} />
          <div className="absolute bottom-0 left-0 w-4 h-4" style={{ borderBottom: `2px solid ${gold}`, borderLeft: `2px solid ${gold}` }} />
          <div className="absolute bottom-0 right-0 w-4 h-4" style={{ borderBottom: `2px solid ${gold}`, borderRight: `2px solid ${gold}` }} />
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="flex items-center justify-center gap-4 flex-wrap"
        >
          <a
            href="#projects"
            onClick={(e) => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }}
            className="px-8 py-3 text-xs tracking-[0.3em] uppercase font-sans font-semibold transition-all duration-300"
            style={{ background: gold, color: dark }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#E0A830"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = gold; }}
          >
            View Works
          </a>
          <a
            href={`mailto:${personal.email}`}
            className="px-8 py-3 text-xs tracking-[0.3em] uppercase font-sans font-semibold border transition-all duration-300"
            style={{ borderColor: `rgba(196,145,42,0.4)`, color: gold }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = gold; e.currentTarget.style.background = "rgba(196,145,42,0.08)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(196,145,42,0.4)"; e.currentTarget.style.background = "transparent"; }}
          >
            Contact
          </a>
        </motion.div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-16 left-0 right-0 px-12">
        <div className="h-px" style={{ background: `linear-gradient(to right, transparent, ${gold}, transparent)` }} />
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.4em] uppercase font-sans" style={{ color: `rgba(226,213,190,0.25)` }}>Scroll</span>
        <div className="w-px h-8" style={{ background: `linear-gradient(to bottom, ${gold}, transparent)` }} />
      </motion.div>
    </section>
  );
}

function JapaneseExperience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" className="py-32 px-6 relative" style={{ background: darkMid }} ref={ref}>
      {/* Chapter header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        className="max-w-7xl mx-auto mb-16"
      >
        <div className="flex items-center gap-4 mb-2">
          <div className="h-px w-12" style={{ background: crimson }} />
          <span className="font-japanese text-sm" style={{ color: crimson }}>経歴</span>
          <div className="flex-1 h-px" style={{ background: "rgba(139,21,21,0.3)" }} />
        </div>
        <h2 className="font-sans text-xs tracking-[0.4em] uppercase" style={{ color: `rgba(226,213,190,0.3)` }}>
          Chronicle of Experience
        </h2>
      </motion.div>

      <div className="max-w-7xl mx-auto space-y-12">
        {experience.map((exp, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: i * 0.15, ease: "easeOut" }}
            className="relative p-8"
            style={{ border: "1px solid rgba(196,145,42,0.12)", background: "rgba(196,145,42,0.02)" }}
          >
            {/* Chapter number */}
            <div
              className="absolute -top-4 left-8 px-3 py-1 font-japanese text-sm"
              style={{ background: darkMid, color: gold }}
            >
              {["壱", "弐", "参"][i]}
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="text-xs tracking-widest uppercase mb-2 font-sans" style={{ color: `rgba(226,213,190,0.3)` }}>
                  {exp.duration}
                </div>
                <h3 className="text-xl font-bold mb-1 font-sans" style={{ color: paper }}>{exp.role}</h3>
                <div className="text-sm font-medium font-sans" style={{ color: gold }}>{exp.company}</div>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {exp.tech.map((t) => (
                    <span key={t} className="text-xs px-2 py-1 font-sans" style={{ border: `1px solid rgba(196,145,42,0.2)`, color: `rgba(196,145,42,0.7)` }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="md:col-span-2">
                <ul className="space-y-2.5">
                  {exp.highlights.map((h, j) => (
                    <li key={j} className="flex gap-3 text-sm leading-relaxed font-sans" style={{ color: `rgba(226,213,190,0.6)` }}>
                      <span className="mt-2 flex-shrink-0 w-1 h-1" style={{ background: crimson }} />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function JapaneseSkills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="py-32 px-6" style={{ background: dark }} ref={ref}>
      <div className="max-w-7xl mx-auto mb-16">
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}>
          <div className="flex items-center gap-4 mb-2">
            <div className="h-px w-12" style={{ background: crimson }} />
            <span className="font-japanese text-sm" style={{ color: crimson }}>技術</span>
            <div className="flex-1 h-px" style={{ background: "rgba(139,21,21,0.3)" }} />
          </div>
          <h2 className="font-sans text-xs tracking-[0.4em] uppercase" style={{ color: `rgba(226,213,190,0.3)` }}>
            Technical Disciplines
          </h2>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Object.entries(skills).map(([category, items], i) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            className="p-6"
            style={{ border: "1px solid rgba(196,145,42,0.1)" }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-px h-4" style={{ background: gold }} />
              <span className="text-xs tracking-[0.3em] uppercase font-sans font-semibold" style={{ color: gold }}>
                {category}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {items.map((skill) => (
                <span
                  key={skill}
                  className="text-xs px-3 py-1.5 font-sans transition-all duration-200"
                  style={{ border: "1px solid rgba(226,213,190,0.1)", color: `rgba(226,213,190,0.6)` }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `rgba(196,145,42,0.4)`;
                    e.currentTarget.style.color = gold;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(226,213,190,0.1)";
                    e.currentTarget.style.color = `rgba(226,213,190,0.6)`;
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function JapaneseProjects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" className="py-32 px-6" style={{ background: darkMid }} ref={ref}>
      <div className="max-w-7xl mx-auto mb-16">
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}>
          <div className="flex items-center gap-4 mb-2">
            <div className="h-px w-12" style={{ background: crimson }} />
            <span className="font-japanese text-sm" style={{ color: crimson }}>作品</span>
            <div className="flex-1 h-px" style={{ background: "rgba(139,21,21,0.3)" }} />
          </div>
          <h2 className="font-sans text-xs tracking-[0.4em] uppercase" style={{ color: `rgba(226,213,190,0.3)` }}>
            Selected Works
          </h2>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto space-y-1">
        {projects.map((proj, i) => (
          <motion.div
            key={proj.id}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: i * 0.12 }}
            className="group flex items-start gap-8 py-8 cursor-default"
            style={{ borderBottom: "1px solid rgba(196,145,42,0.08)" }}
          >
            <div className="font-japanese text-3xl flex-shrink-0" style={{ color: `rgba(196,145,42,0.2)` }}>
              {["壱", "弐", "参"][i]}
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between gap-6 flex-wrap mb-3">
                <div>
                  <h3 className="text-xl font-bold font-sans mb-1 transition-colors duration-300" style={{ color: paper }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = gold; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = paper; }}
                  >
                    {proj.name}
                  </h3>
                  <div className="text-xs tracking-widest font-sans" style={{ color: `rgba(226,213,190,0.3)` }}>
                    {proj.tagline}
                  </div>
                </div>
                <div className="flex gap-3">
                  {proj.live && (
                    <a href={proj.live} target="_blank" rel="noopener noreferrer"
                      className="text-xs px-4 py-2 font-sans tracking-widest transition-all duration-200"
                      style={{ border: `1px solid rgba(196,145,42,0.3)`, color: gold }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(196,145,42,0.1)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                    >
                      Live ↗
                    </a>
                  )}
                  {proj.github && (
                    <a href={proj.github} target="_blank" rel="noopener noreferrer"
                      className="text-xs px-4 py-2 font-sans tracking-widest transition-all duration-200"
                      style={{ border: `1px solid rgba(226,213,190,0.15)`, color: `rgba(226,213,190,0.5)` }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = `rgba(196,145,42,0.3)`; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = `rgba(226,213,190,0.15)`; }}
                    >
                      GitHub ↗
                    </a>
                  )}
                </div>
              </div>
              <p className="text-sm leading-relaxed mb-4 max-w-2xl font-sans" style={{ color: `rgba(226,213,190,0.5)` }}>
                {proj.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {proj.tech.map((t) => (
                  <span key={t} className="text-xs px-2 py-1 font-sans" style={{ background: "rgba(196,145,42,0.06)", color: `rgba(196,145,42,0.6)`, border: "1px solid rgba(196,145,42,0.1)" }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function JapaneseContact({ onToggle }: { onToggle: () => void }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" className="py-32 px-6 relative overflow-hidden" style={{ background: dark }} ref={ref}>
      {/* Background motif */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        style={{ opacity: 0.025 }}
      >
        <span className="font-japanese text-[40vw] font-bold" style={{ color: gold }}>武</span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} className="mb-16">
          <div className="flex items-center gap-4 mb-2">
            <div className="h-px w-12" style={{ background: crimson }} />
            <span className="font-japanese text-sm" style={{ color: crimson }}>連絡</span>
            <div className="flex-1 h-px" style={{ background: "rgba(139,21,21,0.3)" }} />
          </div>
          <h2 className="font-sans text-xs tracking-[0.4em] uppercase" style={{ color: `rgba(226,213,190,0.3)` }}>
            Begin the Dialogue
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="font-japanese text-5xl mb-6" style={{ color: `rgba(196,145,42,0.4)` }}>連</div>
            <h3 className="font-sans text-4xl font-bold mb-6" style={{ color: paper }}>
              Let&apos;s Connect
            </h3>
            <p className="text-base leading-relaxed mb-8 font-sans" style={{ color: `rgba(226,213,190,0.5)` }}>
              Open to new opportunities, collaborations, and conversations.
              Every great project begins with a single message.
            </p>
            <a
              href={`mailto:${personal.email}`}
              className="inline-block px-8 py-4 text-xs tracking-[0.3em] uppercase font-sans font-bold transition-all duration-300"
              style={{ background: gold, color: dark }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#E0A830"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = gold; }}
            >
              Send a Message
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4"
          >
            {[
              { label: "電子メール", en: "Email", value: personal.email, href: `mailto:${personal.email}` },
              { label: "ギットハブ", en: "GitHub", value: `@${personal.githubUsername}`, href: personal.github },
              { label: "リンクトイン", en: "LinkedIn", value: "akshay-biju1557", href: personal.linkedin },
            ].map((link) => (
              <a
                key={link.en}
                href={link.href}
                target={link.en !== "Email" ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="flex items-center justify-between p-5 group transition-all duration-300"
                style={{ border: "1px solid rgba(196,145,42,0.1)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(196,145,42,0.35)"; (e.currentTarget as HTMLElement).style.background = "rgba(196,145,42,0.03)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(196,145,42,0.1)"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}
              >
                <div>
                  <div className="font-japanese text-xs mb-0.5" style={{ color: `rgba(196,145,42,0.5)` }}>{link.label}</div>
                  <div className="text-sm font-medium font-sans" style={{ color: paper }}>{link.value}</div>
                </div>
                <span style={{ color: gold, opacity: 0.4 }} className="group-hover:opacity-100 transition-opacity">↗</span>
              </a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto mt-24 pt-8 flex items-center justify-between flex-wrap gap-4"
        style={{ borderTop: "1px solid rgba(196,145,42,0.1)" }}
      >
        <div className="flex items-center gap-4">
          <span className="font-japanese text-sm" style={{ color: `rgba(196,145,42,0.4)` }}>暁 比壽</span>
          <span className="text-xs font-sans" style={{ color: `rgba(226,213,190,0.2)` }}>© 2026</span>
        </div>
        <button
          onClick={onToggle}
          className="text-xs tracking-[0.3em] uppercase font-sans transition-colors duration-300"
          style={{ color: `rgba(196,145,42,0.4)` }}
          onMouseEnter={(e) => { e.currentTarget.style.color = gold; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = `rgba(196,145,42,0.4)`; }}
        >
          ← Return
        </button>
      </div>
    </section>
  );
}

export default function JapanesePortfolio({ onToggle }: { onToggle: () => void }) {
  return (
    <div style={{ background: dark, color: paper }}>
      <FloatingKanji />
      <JapaneseNav onToggle={onToggle} />
      <JapaneseHero />
      <JapaneseExperience />
      <JapaneseSkills />
      <JapaneseProjects />
      <JapaneseContact onToggle={onToggle} />
    </div>
  );
}
