import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "@/hooks/useLenis";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import GitHubSection from "@/components/GitHubSection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import JapanesePortfolio from "@/themes/japanese/JapanesePortfolio";
import TextLoop from "@/components/TextLoop";
import SplashScreen from "@/components/SplashScreen";

function GrainOverlay() {
  return <div className="grain" aria-hidden="true" />;
}

export default function App() {
  const [isJapanese, setIsJapanese] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [transitioning, setTransitioning] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState<"toJapanese" | "toModern">("toJapanese");
  const [showSplash, setShowSplash] = useState(true);

  useLenis();

  useEffect(() => {
    if (showSplash) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [showSplash]);

  useEffect(() => {
    if (isJapanese) {
      document.body.classList.add("japanese-mode");
    } else {
      document.body.classList.remove("japanese-mode");
    }
  }, [isJapanese]);

  useEffect(() => {
    if (isDark && !isJapanese) {
      document.body.classList.add("modern-dark");
    } else {
      document.body.classList.remove("modern-dark");
    }
  }, [isDark, isJapanese]);

  const handleToggle = () => {
    // The Japanese button now loads the standalone Japanese-themed
    // portfolio (built separately) instead of an in-app theme switch.
    setTransitionDirection("toJapanese");
    setTransitioning(true);

    setTimeout(() => {
      window.location.href = "/jp/index.html";
    }, 900);
  };

  const overlayBg = transitionDirection === "toJapanese" ? "#0B0906" : "#F7F4EE";

  return (
    <>
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}

      <GrainOverlay />

      {/* Theme transition overlay */}
      <AnimatePresence>
        {transitioning && (
          <motion.div
            key="overlay"
            initial={{ clipPath: "circle(0% at 50% 50%)" }}
            animate={{ clipPath: "circle(150% at 50% 50%)" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
            style={{
              position: "fixed",
              inset: 0,
              background: overlayBg,
              zIndex: 99998,
              pointerEvents: "none",
            }}
          >
            {/* Center symbol only during toJapanese transition */}
            {transitionDirection === "toJapanese" && (
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.span
                  initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                  className="font-japanese text-8xl select-none"
                  style={{ color: "rgba(196,145,42,0.4)" }}
                >
                  道
                </motion.span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <AnimatePresence mode="wait">
        {isJapanese ? (
          <motion.div
            key="japanese"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            <JapanesePortfolio onToggle={handleToggle} />
          </motion.div>
        ) : (
          <motion.div
            key="modern"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            <Navigation isJapanese={false} onToggle={handleToggle} isDark={isDark} onDarkToggle={() => setIsDark(d => !d)} />
            <main>
              <Hero isDark={isDark} />
              <div style={{ overflow: "hidden", height: 90, width: "100%", background: "#1a1a1a" }}>
                <TextLoop
                  text="Web Development  ✦  Designing  ✦  Software Development  ✦  Cybersecurity  ✦  Video Editing"
                  shape="line"
                  speed={80}
                  direction="forward"
                  separator="✦"
                  fontSize={28}
                  fontWeight={700}
                  letterSpacing={2}
                  uppercase
                  ribbon
                  ribbonColor="#1a1a1a"
                  ribbonWidth={90}
                  color="#ffffff"
                  pauseOnHover
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
              <About />
              <Experience />
              <Skills />
              <Projects />
              <GitHubSection isDark={isDark} />
              <Contact />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
