import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NavigationProps {
  isJapanese: boolean;
  onToggle: () => void;
  isDark: boolean;
  onDarkToggle: () => void;
}

const modernLinks = ["About", "Experience", "Skills", "Projects", "GitHub", "Contact"];
const japaneseLinks = ["序章", "経験", "技術", "作品", "活動", "連絡"];

export default function Navigation({ isJapanese, onToggle, isDark, onDarkToggle }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const sectionIds = ["about", "experience", "skills", "projects", "github", "contact"];

  if (isJapanese) {
    return (
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
        style={{
          background: scrolled ? "rgba(11,9,6,0.95)" : "transparent",
          borderBottom: scrolled ? "1px solid rgba(196,145,42,0.2)" : "none",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          transition: "all 0.4s ease",
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button onClick={() => scrollTo("hero")} className="font-japanese text-sm tracking-widest" style={{ color: "#C4912A" }}>
            暁 AKSHAY
          </button>
          <div className="hidden md:flex items-center gap-8">
            {japaneseLinks.map((link, i) => (
              <button key={link} onClick={() => scrollTo(sectionIds[i])}
                className="font-japanese text-xs tracking-widest hover:opacity-100 transition-opacity"
                style={{ color: "#E2D5BE", opacity: 0.6, fontWeight: 300 }}>{link}</button>
            ))}
          </div>
          <button onClick={onToggle}
            className="text-xs tracking-widest px-4 py-2 border transition-all duration-300"
            style={{ borderColor: "rgba(196,145,42,0.4)", color: "#C4912A", fontFamily: "var(--font-sans)", borderRadius: "var(--r-sm)" }}>
            ✦ 
          </button>
        </div>
      </motion.nav>
    );
  }

  const iconBtn: React.CSSProperties = {
    width: 36, height: 36,
    display: "flex", alignItems: "center", justifyContent: "center",
    background: "var(--glass-bg)",
    backdropFilter: "blur(var(--glass-blur))",
    WebkitBackdropFilter: "blur(var(--glass-blur))",
    border: "1px solid var(--glass-border)",
    borderRadius: "var(--r-sm)",
    color: "var(--c-fg)",
    transition: "all 0.2s ease",
    cursor: "pointer",
  };

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: "var(--glass-bg)",
          backdropFilter: "blur(var(--glass-blur))",
          WebkitBackdropFilter: "blur(var(--glass-blur))",
          borderBottom: "1px solid var(--glass-border)",
          boxShadow: scrolled ? "0 1px 0 var(--glass-border)" : "none",
          transition: "box-shadow 0.4s ease",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => scrollTo("hero")} className="font-display text-lg tracking-tight" style={{ color: "var(--c-fg)" }}>
            AK
          </button>

          <div className="hidden md:flex items-center gap-8">
            {modernLinks.map((link, i) => (
              <button key={link} onClick={() => scrollTo(sectionIds[i])}
                className="text-sm tracking-wide transition-opacity duration-200"
                style={{ color: "var(--c-fg)", opacity: 0.5, fontWeight: 500 }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.5")}>
                {link}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {/* Dark/light toggle */}
            <button
              onClick={onDarkToggle}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              style={iconBtn}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--c-fg)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--glass-border)"; }}
            >
              {isDark ? (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
                </svg>
              ) : (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>

            {/* Japanese toggle */}
            <button
              onClick={onToggle}
              className="hidden md:flex items-center gap-2 text-xs tracking-widest px-4 py-2 transition-all duration-300"
              style={{
                background: "var(--glass-bg)",
                backdropFilter: "blur(var(--glass-blur))",
                WebkitBackdropFilter: "blur(var(--glass-blur))",
                border: "1px solid var(--glass-border)",
                color: "var(--c-fg)",
                fontWeight: 600,
                borderRadius: "var(--r-sm)",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--c-fg)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--glass-border)"; }}
            >
              ⛩ Zen Mode
            </button>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <span className="block w-6 h-px transition-transform" style={{ background: "var(--c-fg)", transform: mobileOpen ? "rotate(45deg) translate(4px, 4px)" : "none" }} />
              <span className="block w-6 h-px transition-opacity" style={{ background: "var(--c-fg)", opacity: mobileOpen ? 0 : 1 }} />
              <span className="block w-6 h-px transition-transform" style={{ background: "var(--c-fg)", transform: mobileOpen ? "rotate(-45deg) translate(4px, -4px)" : "none" }} />
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-16 left-0 right-0 z-40 px-6 py-6 flex flex-col gap-4"
            style={{
              background: "var(--glass-bg)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              borderBottom: "1px solid var(--glass-border)",
            }}
          >
            {modernLinks.map((link, i) => (
              <button key={link} onClick={() => scrollTo(sectionIds[i])}
                className="text-left text-lg font-medium py-2 border-b"
                style={{ color: "var(--c-fg)", borderColor: "var(--c-border)" }}>
                {link}
              </button>
            ))}
            <div className="flex items-center gap-4 mt-2">
              <button onClick={() => { onToggle(); setMobileOpen(false); }}
                className="text-sm px-4 py-2" style={{ color: "var(--c-accent)", border: "1px solid var(--c-border)", borderRadius: "var(--r-sm)" }}>
                ⛩ 和風 Mode
              </button>
              <button onClick={onDarkToggle} className="text-sm px-4 py-2"
                style={{ color: "var(--c-fg50)", border: "1px solid var(--c-border)", borderRadius: "var(--r-sm)" }}>
                {isDark ? "☀ Light" : "◑ Dark"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
