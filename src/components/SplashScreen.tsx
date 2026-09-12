import { useState } from "react";
import { motion } from "framer-motion";
import CountUp from "@/components/CountUp";

interface SplashScreenProps {
  onFinish: () => void;
}

const SHUTTER_DURATION = 0.9;

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const [closing, setClosing] = useState(false);
  const [done, setDone] = useState(false);

  const handleCountEnd = () => {
    // brief pause at 100% before the shutter lifts
    setTimeout(() => setClosing(true), 250);
  };

  if (done) return null;

  return (
    <motion.div
      key="splash"
      initial={{ y: 0 }}
      animate={closing ? { y: "-100%" } : { y: 0 }}
      transition={{ duration: SHUTTER_DURATION, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => {
        if (closing) {
          setDone(true);
          onFinish();
        }
      }}
      style={{
            position: "fixed",
            inset: 0,
            zIndex: 999999,
            background:
              "radial-gradient(circle at 50% 65%, rgba(74,138,66,0.16), transparent 60%), linear-gradient(180deg, #060806 0%, #030402 100%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {/* subtle shutter-slat texture */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              opacity: 0.5,
              backgroundImage:
                "repeating-linear-gradient(180deg, rgba(74,138,66,0.05) 0px, rgba(74,138,66,0.05) 1px, transparent 1px, transparent 34px)",
            }}
          />

        

          <div
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1.25rem",
            }}
          >
            <motion.span
              initial={{ opacity: 0, letterSpacing: "0.5em" }}
              animate={{ opacity: 0.55, letterSpacing: "0.35em" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.7rem",
                textTransform: "uppercase",
                color: "#eff2ee",
              }}
            >
              Loading...
            </motion.span>

            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                fontFamily: "var(--font-display)",
                color: "#EAE6DE",
                lineHeight: 1,
              }}
            >
              <CountUp
                to={100}
                from={0}
                duration={2.2}
                startWhen={true}
                onEnd={handleCountEnd}
                className="splash-count"
              />
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "1.75rem",
                  color: "#4A8A42",
                  marginTop: "0.6rem",
                  marginLeft: "0.2rem",
                }}
              >
                %
              </span>
            </div>

            <div
              style={{
                width: "min(220px, 40vw)",
                height: "1px",
                background: "rgba(234,230,222,0.12)",
                overflow: "hidden",
              }}
            >
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.2, ease: "easeInOut" }}
                style={{ height: "100%", background: "#4A8A42" }}
              />
            </div>
          </div>

          <style>{`
            .splash-count {
              font-size: clamp(3.5rem, 12vw, 7rem);
              font-weight: 500;
            }
          `}</style>
    </motion.div>
  );
}
