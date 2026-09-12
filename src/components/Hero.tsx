import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { personal } from "@/data/portfolio";
import profileImg from "@/imports/AK_PROFESSIONAL.png";
import Silk from "@/components/Silk";
import BlurText from "@/components/BlurText";
import ProfileCard from "@/components/ProfileCard";

const greetings = [
  "Hello, I am",
  "ഹലോ, ഞാൻ",
  "नमस्ते, मैं",
  "வணக்கம், நான்",
  "こんにちは、私は",
  "Hola, soy",
  "Bonjour, je suis",
  "Hallo, ich bin",
  "مرحبا، أنا",
];

function CyclingGreeting() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % greetings.length), 1400);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="flex items-center gap-3 mb-10" style={{ height: 32 }}>
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
      <div className="relative" style={{ minWidth: 260, height: 32, overflow: "hidden" }}>
        <AnimatePresence mode="wait">
          <motion.span
            key={index}
            initial={{ y: 20, opacity: 0, filter: "blur(4px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            exit={{ y: -20, opacity: 0, filter: "blur(4px)" }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 flex items-center text-sm font-semibold tracking-wide whitespace-nowrap"
            style={{ color: "var(--c-fg)" }}
          >
            {greetings[index]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}


export default function Hero({ isDark }: { isDark?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  const silkColor = isDark ? "#1a1a1f" : "#ede9e0";

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center py-32 pt-28 px-6 overflow-hidden"
      style={{ background: "var(--c-bg)" }}
    >
      <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.85 }}>
        <Silk
          speed={5}
          scale={0.4}
          color="#7B7481"
          noiseIntensity={1.5}
          rotation={0}
        />
      </div>

      <div className="absolute right-4 top-1/2 -translate-y-1/2 font-display leading-none select-none pointer-events-none hidden lg:block"
        style={{ color: "var(--c-fg03)", fontStyle: "italic", fontSize: "22vw" }}>
        01
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-0 items-center">
          {/* Left */}
          <div className="order-2 lg:order-1">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1, duration: 0.5 }}>
              <CyclingGreeting />
            </motion.div>

            <h1 className="font-display leading-[0.92] tracking-tight mb-6"
              style={{ fontSize: "clamp(3rem,8vw,7rem)" }}>
              <BlurText
                text="Akshay"
                delay={80}
                animateBy="letters"
                direction="top"
                className="block font-display"
                style={{ color: "var(--c-fg)" }}
                stepDuration={0.4}
                animationFrom={{ filter: "blur(12px)", opacity: 0, y: -30 }}
                animationTo={[{ filter: "blur(0px)", opacity: 1, y: 0 }]}
              />
              <div style={{ display: "flex", alignItems: "flex-end" }}>
                <BlurText
                  text="Biju"
                  delay={80}
                  animateBy="letters"
                  direction="top"
                  className="font-display"
                  style={{ color: "var(--c-fg50)", fontStyle: "italic" }}
                  stepDuration={0.4}
                  animationFrom={{ filter: "blur(12px)", opacity: 0, y: -30 }}
                  animationTo={[{ filter: "blur(0px)", opacity: 1, y: 0 }]}
                />
                <BlurText
                  text="."
                  delay={80 * 5}
                  animateBy="letters"
                  direction="top"
                  className="font-display"
                  style={{ color: "var(--c-fg)" }}
                  stepDuration={0.4}
                  animationFrom={{ filter: "blur(12px)", opacity: 0, y: -30 }}
                  animationTo={[{ filter: "blur(0px)", opacity: 1, y: 0 }]}
                />
              </div>
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.6 }}
              className="flex items-center gap-3 mb-8 flex-wrap"
            >
              <span
                className="text-xs tracking-widest font-semibold uppercase px-4 py-2"
                style={{
                  background: "var(--glass-bg)",
                  backdropFilter: "blur(var(--glass-blur))",
                  WebkitBackdropFilter: "blur(var(--glass-blur))",
                  border: "1px solid var(--glass-border)",
                  boxShadow: "var(--glass-shadow)",
                  color: "var(--c-fg)",
                  borderRadius: "var(--r-pill)",
                }}
              >
                Software Developer
              </span>
              <span style={{ color: "var(--c-fg)" }}>·</span>
              <span className="text-xs tracking-widest font-medium uppercase" style={{ color: "var(--c-fg45)" }}>
                Creative Technologist
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16, filter: "blur(3px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.65, duration: 0.7 }}
              className="text-lg leading-relaxed max-w-md mb-12"
              style={{ color: "var(--c-fg65)", fontWeight: 400 }}
            >
              {personal.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.78, duration: 0.6 }}
              className="flex items-center gap-4 flex-wrap"
            >
              <a
                href="#projects"
                onClick={(e) => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }}
                className="group inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold tracking-wide transition-all duration-300"
                style={{ background: "var(--c-fg)", color: "var(--c-bg)", borderRadius: "2px" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "var(--c-accent)"; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "var(--c-fg)"; e.currentTarget.style.color = "var(--c-bg)"; }}
              >
                View Work
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                  className="transition-transform duration-300 group-hover:translate-x-1">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a
                href={`mailto:${personal.email}`}
                className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold tracking-wide transition-all duration-300"
                style={{
                  background: "var(--glass-bg)",
                  backdropFilter: "blur(var(--glass-blur))",
                  WebkitBackdropFilter: "blur(var(--glass-blur))",
                  border: "1px solid var(--glass-border)",
                  color: "var(--c-fg)",
                  borderRadius: "var(--r-md)",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--c-fg)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--glass-border)"; }}
              >
                Get in Touch
              </a>
            </motion.div>
          </div>

          {/* Right: Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.9 }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative">
              <div className="absolute -top-4 -right-4 w-full h-full"
                style={{ border: "1px solid var(--glass-border)", borderRadius: "var(--r-lg)" }} />
              <motion.div
                style={{ width: "clamp(260px, 35vw, 440px)", y: photoY }}
              >
                <ProfileCard
                  avatarUrl={profileImg}
                  name={personal.name}
                  title={personal.title}
                  showUserInfo={false}
                  behindGlowColor="rgba(74,138,66,0.45)"
                />
              </motion.div>

              {/* Glass badge */}
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.85, duration: 0.5 }}
                className="absolute -bottom-5 -left-8 px-5 py-4"
                style={{
                  background: "var(--glass-bg)",
                  backdropFilter: "blur(var(--glass-blur))",
                  WebkitBackdropFilter: "blur(var(--glass-blur))",
                  border: "1px solid var(--glass-border)",
                  boxShadow: "var(--glass-shadow)",
                  borderRadius: "var(--r-md)",
                }}
              >
                <div className="text-xs tracking-widest uppercase mb-0.5" style={{ color: "var(--c-fg40)" }}>Currently at</div>
                <div className="text-sm font-semibold" style={{ color: "var(--c-fg)" }}>MINTS GLOBAL</div>
                <div className="text-xs mt-0.5" style={{ color: "var(--c-accent)" }}>SDE Intern · 2025</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
