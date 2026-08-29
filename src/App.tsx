import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"

import heroVideo from "@/imports/hero-samurai.mp4"
import bgMusic   from "@/imports/Old_Sensei_320k.mp3"
import ch2Img    from "@/imports/Chapter_2.png"
import ch3Img    from "@/imports/Chapter_3.png"
import ch4Img    from "@/imports/Chapter_4.png"
import ch5Img    from "@/imports/Chapter_5.png"
import ch6Img    from "@/imports/Chapter_6.png"
import ch7Img    from "@/imports/Chapter_7.png"

// ─── Mobile ───────────────────────────────────────────────────────────────────
function useIsMobile() {
  const [v, set] = useState(() => typeof window !== "undefined" ? window.innerWidth < 768 : false)
  useEffect(() => {
    const fn = () => set(window.innerWidth < 768)
    window.addEventListener("resize", fn)
    return () => window.removeEventListener("resize", fn)
  }, [])
  return v
}

// ─── Katana Cursor ────────────────────────────────────────────────────────────
function KatanaCursor() {
  const isMobile = useIsMobile()
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (isMobile) return
    const move = (e: MouseEvent) => {
      if (ref.current) {
        ref.current.style.transform = `translate(${e.clientX - 2}px, ${e.clientY - 2}px)`
      }
    }
    window.addEventListener("mousemove", move, { passive: true })
    return () => window.removeEventListener("mousemove", move)
  }, [isMobile])
  if (isMobile) return null
  return (
    <div ref={ref} style={{ position:"fixed", top:0, left:0, pointerEvents:"none", zIndex:99999, willChange:"transform" }}>
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <polygon points="1,1 3.5,3 22,21.5 20,23 2.5,4" fill="#D0D0D0" stroke="#aaa" strokeWidth="0.5"/>
        <line x1="2" y1="2" x2="21" y2="21" stroke="#bbb" strokeWidth="0.4" opacity="0.6"/>
        <ellipse cx="19" cy="19" rx="3.2" ry="1.4" fill="#8B6914" transform="rotate(45 19 19)"/>
        <line x1="20.5" y1="20.5" x2="26.5" y2="26.5" stroke="#3d1f08" strokeWidth="2.8" strokeLinecap="round"/>
        <line x1="21.5" y1="22.5" x2="23" y2="24" stroke="#7a5a1a" strokeWidth="0.9" strokeLinecap="round"/>
        <line x1="23" y1="23.8" x2="24.5" y2="25.3" stroke="#7a5a1a" strokeWidth="0.9" strokeLinecap="round"/>
      </svg>
    </div>
  )
}

// ─── Music ────────────────────────────────────────────────────────────────────
function MusicToggle() {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const toggle = () => {
    const a = audioRef.current
    if (!a) return
    if (playing) { a.pause(); setPlaying(false) }
    else a.play().then(() => setPlaying(true)).catch(() => {})
  }
  return (
    <>
      <audio ref={audioRef} src={bgMusic} loop preload="none"/>
      <motion.button onClick={toggle}
        whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.93 }}
        title={playing ? "Pause" : "Play ambient music"}
        className="music-toggle-btn"
        style={{
          position:"fixed", bottom:"1.5rem", right:"1.5rem", zIndex:300,
          width:50, height:50, border:"1px solid var(--border)",
          background:"var(--card-bg)",
          backdropFilter:"blur(10px)",
          display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
          gap:"3px", cursor:"none", outline:"none", padding:0,
        }}
      >
        <span style={{
          fontFamily:"'Noto Serif JP',serif", fontSize:"1rem",
          color: playing ? "var(--gold)" : "var(--gold-dim)", transition:"color 0.3s", lineHeight:1,
        }}>{playing ? "楽" : "静"}</span>
        <div style={{ display:"flex", gap:"2px", alignItems:"center", height:7 }}>
          {[5,9,6,8,4].map((h,i) => (
            <motion.div key={i}
              animate={playing ? { height:[h, h*1.7, h] } : { height:2 }}
              transition={{ duration:0.45+i*0.1, repeat:Infinity, ease:"easeInOut", delay:i*0.06 }}
              style={{ width:2, background:"var(--gold)", borderRadius:1, opacity: playing ? 0.75 : 0.3 }}
            />
          ))}
        </div>
      </motion.button>
    </>
  )
}

// ─── Navigation ───────────────────────────────────────────────────────────────
const CHAPTERS = [
  { id:"hero",       kanji:"序", label:"Preface"     },
  { id:"about",      kanji:"一", label:"Chapter I"   },
  { id:"education",  kanji:"二", label:"Chapter II"  },
  { id:"skills",     kanji:"三", label:"Chapter III" },
  { id:"experience", kanji:"四", label:"Chapter IV"  },
  { id:"projects",   kanji:"五", label:"Chapter V"   },
  { id:"mints",      kanji:"六", label:"Chapter VI"  },
  { id:"contact",    kanji:"七", label:"Chapter VII" },
]

function Navigation({ active }: { active:string }) {
  return (
    <nav className="side-nav" style={{
      position:"fixed", right:"1rem", top:"50%", transform:"translateY(-50%)",
      zIndex:100, flexDirection:"column", gap:"0.8rem", alignItems:"center",
    }}>
      {CHAPTERS.map(ch => (
        <a key={ch.id} href={`#${ch.id}`} title={ch.label} style={{
          display:"flex", flexDirection:"column", alignItems:"center", gap:3,
          textDecoration:"none",
          opacity: active===ch.id ? 1 : 0.25,
          transition:"all 0.3s",
          transform: active===ch.id ? "scale(1.2)" : "scale(1)",
        }}>
          <span style={{
            fontFamily:"'Noto Serif JP',serif",
            fontSize: active===ch.id ? "0.85rem" : "0.6rem",
            color: active===ch.id ? "var(--gold)" : "var(--fg)",
            transition:"all 0.3s", lineHeight:1,
          }}>{ch.kanji}</span>
          <span style={{
            display:"block", height:1,
            width: active===ch.id ? 16 : 4,
            background: active===ch.id ? "var(--gold)" : "var(--fg)",
            opacity: active===ch.id ? 1 : 0.4,
            transition:"all 0.3s",
          }}/>
        </a>
      ))}
    </nav>
  )
}

// ─── Scroll progress ──────────────────────────────────────────────────────────
function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const w = useTransform(scrollYProgress, [0,1], ["0%","100%"])
  return (
    <div style={{ position:"fixed", top:0, left:0, right:0, height:2, zIndex:200 }}>
      <motion.div style={{ height:"100%", background:"linear-gradient(90deg,var(--crimson),var(--gold),var(--crimson))", width:w }}/>
    </div>
  )
}

// ─── Reveal ───────────────────────────────────────────────────────────────────
function Reveal({ children, delay=0, style={} }:{ children:React.ReactNode; delay?:number; style?:React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once:true, margin:"-50px" })
  return (
    <motion.div ref={ref} style={style}
      initial={{ opacity:0, y:32 }}
      animate={inView ? { opacity:1, y:0 } : {}}
      transition={{ duration:0.85, delay, ease:[0.25,0.1,0.25,1] }}
    >{children}</motion.div>
  )
}

// ─── Seal ─────────────────────────────────────────────────────────────────────
function Seal({ text, size=60 }:{ text:string; size?:number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once:true })
  return (
    <motion.div ref={ref}
      initial={{ scale:1.6, rotate:-8, opacity:0 }}
      animate={inView ? { scale:1, rotate:-4, opacity:1 } : {}}
      transition={{ duration:0.42, delay:0.3, type:"spring", stiffness:240 }}
      style={{ width:size, height:size, border:"2px solid var(--crimson)",
        display:"flex", alignItems:"center", justifyContent:"center",
        position:"relative", flexShrink:0 }}
    >
      <div style={{ position:"absolute", inset:4, border:"1px solid rgba(139,26,26,0.27)" }}/>
      <span style={{ fontFamily:"'Noto Serif JP',serif", fontSize:size*0.24, color:"var(--crimson)",
        letterSpacing:"0.04em", textAlign:"center", lineHeight:1.3, whiteSpace:"pre-line" }}>{text}</span>
    </motion.div>
  )
}

// ─── Brush divider ────────────────────────────────────────────────────────────
function BrushDivider() {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once:true })
  return (
    <svg ref={ref} width="100%" height="8" viewBox="0 0 500 8" style={{ display:"block", overflow:"visible" }}>
      <motion.path d="M0 4 Q125 1 250 4 Q375 7 500 4"
        stroke="var(--gold)" strokeWidth="1" fill="none" strokeLinecap="round"
        initial={{ pathLength:0, opacity:0 }}
        animate={inView ? { pathLength:1, opacity:0.4 } : {}}
        transition={{ duration:1.4, ease:"easeInOut" }}/>
    </svg>
  )
}

// ─── Chapter label ────────────────────────────────────────────────────────────
function ChapterLabel({ roman, kanji, subtitle }:{ roman:string; kanji:string; subtitle:string }) {
  return (
    <Reveal>
      <div style={{ display:"flex", alignItems:"center", gap:"1.2rem", marginBottom:"2.2rem" }}>
        <span style={{ fontFamily:"'Noto Serif JP',serif", fontSize:"2.5rem", color:"var(--gold)",
          opacity:0.2, lineHeight:1, writingMode:"vertical-rl", textOrientation:"mixed" }}>{kanji}</span>
        <div style={{ flex:1 }}>
          <div style={{ fontFamily:"'Noto Sans JP',sans-serif", fontSize:"0.57rem",
            color:"var(--gold-dim)", letterSpacing:"0.45em", textTransform:"uppercase", marginBottom:"0.28rem" }}>{roman}</div>
          <BrushDivider/>
          <div style={{ fontFamily:"'Cinzel Decorative',serif", fontSize:"0.68rem",
            color:"var(--gold)", letterSpacing:"0.28em", marginTop:"0.3rem", opacity:0.62 }}>{subtitle}</div>
        </div>
      </div>
    </Reveal>
  )
}

// ─── Section wrapper ──────────────────────────────────────────────────────────
function Section({ id, children, zIndex }:{ id:string; children:React.ReactNode; zIndex:number }) {
  return (
    <section id={id} style={{ position:"relative", zIndex, marginTop:"-6rem", paddingTop:"6rem" }}>
      {children}
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// MANUSCRIPT IMAGE — old paper scroll unroll animation, no border
// ═══════════════════════════════════════════════════════════════════════════════

// Per-chapter resting rotation so each image looks hand-placed on the manuscript
const CHAPTER_ROTATIONS: Record<string, number> = {
  meditate: -1.5,
  slash:     2.0,
  drift:    -2.5,
  splatter:  3.0,
  fall:     -1.0,
  unfurl:    1.5,
}
type AnimVariant = "meditate"|"slash"|"drift"|"splatter"|"fall"|"unfurl"

function ManuscriptImage({ src, alt, anim }: { src:string; alt:string; anim:AnimVariant }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const inView  = useInView(wrapRef, { once:true, margin:"-80px" })
  const rot     = CHAPTER_ROTATIONS[anim]

  const { scrollYProgress } = useScroll({ target:wrapRef, offset:["start end","end start"] })
  const parallaxY = useTransform(scrollYProgress, [0,1], ["-6%","6%"])

  // Scroll unroll timing constants
  const DELAY   = 0.25   // pause before unrolling starts
  const UNROLL  = 1.6    // time for the paper to fully unroll

  return (
    <div className="chapter-img-col">
      <div ref={wrapRef} className="scroll-img-sizer">

        {/* Drop shadow layer matches the image rotation */}
        <div style={{
          position:"absolute", inset:0, zIndex:0, pointerEvents:"none",
          transform:`rotate(${rot}deg)`,
          boxShadow:"0 16px 56px rgba(0,0,0,0.55), 0 4px 18px rgba(0,0,0,0.3)",
          borderRadius:1,
        }}/>

        {/* ── Scroll wrapper: holds the top rod, paper, and bottom rod ── */}
        <motion.div
          initial={{ opacity:0 }}
          animate={inView ? { opacity:1 } : {}}
          transition={{ duration:0.01, delay:DELAY }}
          style={{ position:"relative", zIndex:1, rotate:rot }}
        >
          {/* TOP ROD — lacquered wooden dowel, always visible once scroll appears */}
          <motion.div
            initial={{ scaleX:0 }}
            animate={inView ? { scaleX:1 } : {}}
            transition={{ duration:0.45, delay:DELAY, ease:[0.4,0,0.2,1] }}
            style={{
              height:10, width:"100%", transformOrigin:"left center",
              background:"linear-gradient(180deg, #5c3a1e 0%, #3b2010 35%, #7a4e28 60%, #2e1a0a 100%)",
              borderRadius:"3px 3px 2px 2px",
              boxShadow:"0 3px 8px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)",
              position:"relative", zIndex:3,
            }}
          >
            {/* Rod end caps */}
            <div style={{ position:"absolute", left:-3, top:0, bottom:0, width:6,
              background:"radial-gradient(ellipse at 40% 50%, #8a5c30, #3b2010)",
              borderRadius:"3px 0 0 3px" }}/>
            <div style={{ position:"absolute", right:-3, top:0, bottom:0, width:6,
              background:"radial-gradient(ellipse at 60% 50%, #8a5c30, #3b2010)",
              borderRadius:"0 3px 3px 0" }}/>
          </motion.div>

          {/* PAPER — clipPath on inner div handles reveal; no overflow hidden here */}
          <div style={{ position:"relative", aspectRatio:"3/4" }}>

            {/* The unrolling clip container */}
            <motion.div
              initial={{ clipPath:"inset(0 0 100% 0)" }}
              animate={inView ? { clipPath:"inset(0 0 0% 0)" } : {}}
              transition={{ duration:UNROLL, delay:DELAY + 0.08, ease:[0.35,0,0.25,1] }}
              style={{ width:"100%", height:"100%", overflow:"hidden" }}
            >
              {/* Aged paper base behind image */}
              <div style={{
                position:"absolute", inset:0, zIndex:0,
                background:"linear-gradient(160deg, #d4b483 0%, #c8a46a 40%, #b8924e 100%)",
              }}/>

              {/* Parallax image */}
              <motion.div style={{ y:parallaxY, height:"118%", marginTop:"-9%", width:"100%", position:"relative", zIndex:1 }}>
                <img
                  src={src} alt={alt} className="ms-img"
                  style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}
                />
              </motion.div>

              {/* Vignette */}
              <div style={{
                position:"absolute", inset:0, zIndex:2, pointerEvents:"none",
                background:"radial-gradient(ellipse at center, transparent 38%, rgba(12,9,5,0.42) 100%)",
              }}/>
              {/* Aged paper edge darkening */}
              <div style={{
                position:"absolute", inset:0, zIndex:2, pointerEvents:"none",
                background:"linear-gradient(180deg, rgba(30,15,5,0.22) 0%, transparent 12%, transparent 85%, rgba(30,15,5,0.28) 100%)",
              }}/>
              {/* Left/right edge shadow */}
              <div style={{
                position:"absolute", inset:0, zIndex:2, pointerEvents:"none",
                background:"linear-gradient(90deg, rgba(30,15,5,0.18) 0%, transparent 8%, transparent 92%, rgba(30,15,5,0.18) 100%)",
              }}/>
            </motion.div>

            {/* ROLLING EDGE — travels past 105% so it fully exits without leaving a dark fringe */}
            <motion.div
              initial={{ top:"0%" }}
              animate={inView ? { top:"105%" } : {}}
              transition={{ duration:UNROLL, delay:DELAY + 0.08, ease:[0.35,0,0.25,1] }}
              style={{
                position:"absolute", left:0, right:0, height:18,
                transform:"translateY(-50%)",
                zIndex:5, pointerEvents:"none",
                background:"linear-gradient(180deg, transparent 0%, rgba(20,10,3,0.0) 20%, rgba(20,10,3,0.55) 48%, rgba(20,10,3,0.65) 54%, rgba(180,140,80,0.25) 72%, transparent 100%)",
                filter:"blur(1.5px)",
              }}
            />
          </div>

          {/* BOTTOM ROD — appears as unroll completes */}
          <motion.div
            initial={{ scaleX:0, opacity:0 }}
            animate={inView ? { scaleX:1, opacity:1 } : {}}
            transition={{ duration:0.4, delay:DELAY + UNROLL * 0.85, ease:[0.4,0,0.2,1] }}
            style={{
              height:12, width:"100%", transformOrigin:"left center",
              background:"linear-gradient(180deg, #6b4422 0%, #3b2010 30%, #8a5c30 55%, #2e1a0a 100%)",
              borderRadius:"2px 2px 4px 4px",
              boxShadow:"0 4px 12px rgba(0,0,0,0.7), 0 8px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
              position:"relative", zIndex:3,
            }}
          >
            <div style={{ position:"absolute", left:-4, top:0, bottom:0, width:8,
              background:"radial-gradient(ellipse at 40% 50%, #9a6840, #3b2010)",
              borderRadius:"4px 0 0 4px" }}/>
            <div style={{ position:"absolute", right:-4, top:0, bottom:0, width:8,
              background:"radial-gradient(ellipse at 60% 50%, #9a6840, #3b2010)",
              borderRadius:"0 4px 4px 4px" }}/>
          </motion.div>
        </motion.div>

      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER SECTION
// ═══════════════════════════════════════════════════════════════════════════════
interface ChapterProps {
  id:string; roman:string; kanji:string; subtitle:string
  image:string; imageAlt:string; anim:AnimVariant; children:React.ReactNode
  contentSide?:"left"|"right"; zIndex:number
}

function ChapterSection({ id,roman,kanji,subtitle,image,imageAlt,anim,children,contentSide="left",zIndex }:ChapterProps) {
  const isLeft = contentSide === "left"
  return (
    <Section id={id} zIndex={zIndex}>
      <div style={{
        position:"relative", overflowX:"hidden", overflowY:"visible",
        background:"linear-gradient(180deg, transparent 0%, var(--section-bg) 10%, var(--section-bg) 90%, transparent 100%)",
      }}>
        <div style={{
          position:"absolute",
          [isLeft ? "right" : "left"]:"4%",
          top:"50%", transform:"translateY(-50%)",
          fontFamily:"'Noto Serif JP',serif",
          fontSize:"clamp(6rem,18vw,22rem)",
          color:"var(--gold)", opacity:0.04,
          writingMode:"vertical-rl", lineHeight:1,
          userSelect:"none", pointerEvents:"none",
        }}>{kanji}</div>

        <div className="chapter-2col">
          {isLeft ? (
            <>
              <div className="chapter-content-col">
                <ChapterLabel roman={roman} kanji={kanji} subtitle={subtitle}/>
                {children}
              </div>
              <ManuscriptImage src={image} alt={imageAlt} anim={anim}/>
            </>
          ) : (
            <>
              <ManuscriptImage src={image} alt={imageAlt} anim={anim}/>
              <div className="chapter-content-col">
                <ChapterLabel roman={roman} kanji={kanji} subtitle={subtitle}/>
                {children}
              </div>
            </>
          )}
        </div>
      </div>
    </Section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// HERO
// ═══════════════════════════════════════════════════════════════════════════════
function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target:ref, offset:["start start","end start"] })
  const vidY  = useTransform(scrollYProgress, [0,1], ["0%","22%"])
  const fadeO = useTransform(scrollYProgress, [0,0.5], [1, 0])
  const fadeY = useTransform(scrollYProgress, [0,0.5], [0,-36])

  return (
    <section id="hero" ref={ref} style={{
      position:"relative", height:"100vh", overflow:"hidden",
      display:"flex", alignItems:"center", justifyContent:"center", zIndex:1,
    }}>
      <motion.div style={{ position:"absolute", inset:0, y:vidY }}>
        <video autoPlay muted loop playsInline style={{
          width:"100%", height:"100%", objectFit:"cover",
          filter:"sepia(0.5) brightness(0.42) contrast(1.1)",
        }}>
          <source src={heroVideo} type="video/mp4"/>
        </video>
        <div style={{ position:"absolute", inset:0, background:"var(--hero-fade)" }}/>
        <div style={{ position:"absolute", inset:0,
          background:"radial-gradient(ellipse at center, transparent 30%, rgba(12,9,5,0.4) 100%)" }}/>
      </motion.div>

      <motion.div style={{ position:"relative", zIndex:2, textAlign:"center",
        padding:"0 1.5rem", maxWidth:"min(900px, 92vw)", opacity:fadeO, y:fadeY }}>

        <motion.div
          initial={{ opacity:0, y:-14 }} animate={{ opacity:1, y:0 }}
          transition={{ delay:0.5, duration:1 }}
          style={{ fontFamily:"'Noto Serif JP',serif", fontSize:"0.66rem",
            color:"var(--gold)", letterSpacing:"0.5em", marginBottom:"2rem", opacity:0.65 }}
        >序章 — 武士の巻物</motion.div>

        <motion.h1
          initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
          transition={{ delay:0.85, duration:1.2, ease:[0.25,0.1,0.25,1] }}
          style={{
            fontFamily:"'Cinzel Decorative',serif",
            fontSize:"clamp(1.75rem, 5.5vw, 4.8rem)",
            fontWeight:700, color:"#f4e8c1",
            lineHeight:1.15, letterSpacing:"0.06em",
            textShadow:"0 0 80px rgba(200,168,75,0.27), 0 2px 40px rgba(12,9,5,0.8)",
            marginBottom:"1.4rem",
            wordBreak:"break-word", overflowWrap:"break-word",
          }}
        >Path<br className="hero-br"/> of Mastery</motion.h1>

        <motion.div
          initial={{ scaleX:0 }} animate={{ scaleX:1 }}
          transition={{ delay:1.6, duration:1.1, ease:[0.25,0.1,0.25,1] }}
          style={{ height:1, background:"linear-gradient(90deg,transparent,rgba(200,168,75,0.53),transparent)",
            marginBottom:"1.3rem", transformOrigin:"center" }}
        />

        <motion.p
          initial={{ opacity:0 }} animate={{ opacity:1 }}
          transition={{ delay:2, duration:1 }}
          style={{ fontFamily:"'IM Fell English',serif", fontStyle:"italic",
            fontSize:"clamp(0.76rem,1.6vw,0.95rem)", color:"var(--gold)",
            letterSpacing:"0.26em", marginBottom:"3rem" }}
        >A record of the path I chose</motion.p>

        <div className="hero-deco-kanji">
          {[{ side:"left", x:"-10rem", text:"武士道" },{ side:"right", x:"10rem", text:"職人技" }].map(d => (
            <motion.div key={d.side}
              initial={{ opacity:0, x: d.side==="left"?-28:28 }}
              animate={{ opacity:0.1, x:0 }}
              transition={{ delay:2.3, duration:1 }}
              style={{
                position:"absolute", [d.side]:d.x, top:"50%", transform:"translateY(-50%)",
                fontFamily:"'Noto Serif JP',serif", fontSize:"5rem",
                writingMode:"vertical-rl", color:"#c8a84b", pointerEvents:"none",
              }}
            >{d.text}</motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity:0 }} animate={{ opacity:1 }}
          transition={{ delay:2.8, duration:1 }}
          style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"0.5rem" }}
        >
          <span style={{ fontFamily:"'Noto Sans JP',sans-serif", fontSize:"0.57rem",
            letterSpacing:"0.36em", color:"var(--gold)", opacity:0.5 }}>巻物を広げる — Unroll the Scroll</span>
          <div className="scroll-float">
            <svg width="17" height="30" viewBox="0 0 17 30" fill="none">
              <rect x="1" y="1" width="15" height="22" rx="7.5" stroke="var(--gold)" strokeWidth="1" opacity="0.4"/>
              <motion.rect x="7.5" y="4" width="2" height="5" rx="1" fill="var(--gold)"
                animate={{ y:[4,11,4] }} transition={{ duration:2, repeat:Infinity, ease:"easeInOut" }}/>
              <path d="M4.5 26 L8.5 30 L12.5 26" stroke="var(--gold)" strokeWidth="1" strokeLinecap="round" opacity="0.35"/>
            </svg>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// ABOUT
// ═══════════════════════════════════════════════════════════════════════════════
function AboutSection() {
  return (
    <Section id="about" zIndex={2}>
      <div className="about-section-inner" style={{
        background:"linear-gradient(180deg, transparent 0%, var(--section-bg) 12%, var(--section-bg) 88%, transparent 100%)",
      }}>
        <div style={{
          position:"absolute", right:"3%", top:"15%",
          fontFamily:"'Noto Serif JP',serif",
          fontSize:"clamp(4rem,16vw,14rem)",
          color:"var(--gold)", opacity:0.04,
          writingMode:"vertical-rl", userSelect:"none", pointerEvents:"none", lineHeight:1,
        }}>自己紹介</div>

        <div style={{ maxWidth:920, margin:"0 auto", width:"100%", position:"relative", zIndex:1 }}>
          <ChapterLabel roman="Chapter I" kanji="一" subtitle="The Wandering Scholar"/>

          <div className="grid-about">
            <div>
              <Reveal>
                <h2 style={{ fontFamily:"'Cinzel Decorative',serif",
                  fontSize:"clamp(1.3rem,2.8vw,2rem)", color:"var(--heading)",
                  marginBottom:"1.2rem", lineHeight:1.3, letterSpacing:"0.04em" }}>About Me</h2>
              </Reveal>
              <Reveal delay={0.14}>
                <p style={{ fontFamily:"'IM Fell English',serif", fontStyle:"italic",
                  fontSize:"0.96rem", color:"var(--text-mid)", lineHeight:1.9, marginBottom:"1.2rem" }}>
                  "A craftsman forged at the intersection of code and creativity, building systems
                  that think, interfaces that breathe, and experiences that endure."
                </p>
              </Reveal>
              <Reveal delay={0.24}>
                <p style={{ fontSize:"0.9rem", color:"var(--text-dim)", lineHeight:1.85, marginBottom:"1.1rem" }}>
                  B.Tech Computer Science & Engineering graduate at APJ Abdul Kalam Technological University,
                  currently honing my craft as a Software Developer Intern at MINTS GLOBAL.
                </p>
              </Reveal>
              <Reveal delay={0.34}>
                <p style={{ fontSize:"0.9rem", color:"var(--text-dim)", lineHeight:1.85 }}>
                  My path winds through software development and cybersecurity, bridged by a passion
                  for design forged through After Effects, Figma, and years of creative direction.
                </p>
              </Reveal>
            </div>

            <div style={{ display:"flex", flexDirection:"column", gap:"1.1rem" }}>
              {[
                { k:"技", l:"Craft",       v:"React · Django · Python · MySQL" },
                { k:"心", l:"Passion",     v:"Web Development · Cybersecurity · Designing" },
                { k:"遊", l:"Beyond Code", v:"Football · Gaming · Motorcycles · Video Editing" },
                { k:"語", l:"Languages",   v:"English · Malayalam · Tamil · Hindi" },
              ].map((item,i) => (
                <Reveal key={item.k} delay={0.2+i*0.1}>
                  <div style={{ display:"flex", gap:"1rem", alignItems:"flex-start",
                    padding:"0.9rem 1rem", border:"1px solid var(--border)",
                    background:"var(--card-bg)" }}>
                    <span style={{ fontFamily:"'Noto Serif JP',serif", fontSize:"1.6rem",
                      color:"var(--gold)", opacity:0.5, lineHeight:1, minWidth:"2rem" }}>{item.k}</span>
                    <div>
                      <div style={{ fontSize:"0.57rem", letterSpacing:"0.4em", color:"var(--gold-dim)",
                        textTransform:"uppercase", marginBottom:"0.2rem" }}>{item.l}</div>
                      <div style={{ fontSize:"0.84rem", color:"var(--text-mid)" }}>{item.v}</div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div style={{ marginTop:"2.5rem", display:"flex", alignItems:"center", gap:"1.4rem", flexWrap:"wrap" }}>
            <Seal text={"学\n生"} size={50}/>
            <Seal text={"開\n発"} size={50}/>
            <Reveal delay={0.45}>
              <p style={{ fontFamily:"'IM Fell English',serif", fontStyle:"italic",
                fontSize:"0.77rem", color:"var(--gold-dim)", lineHeight:1.7 }}>
                CGPA 7.92 · APJ Abdul Kalam Technological University<br/>
                Software Developer Intern · MINTS GLOBAL
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// EDUCATION
// ═══════════════════════════════════════════════════════════════════════════════
function EducationSection() {
  const entries = [
    { k:"大", degree:"B.Tech — Computer Science & Engineering", institution:"APJ Abdul Kalam Technological University", year:"2022 — 2026", grade:"CGPA: 7.92" },
    { k:"高", degree:"Higher Secondary Education",              institution:"FJHSS, Puthupady",                        year:"2022",           grade:"CGPA: 8.30" },
    { k:"中", degree:"AISSE — Secondary Education",             institution:"MMPS, Kothamangalam",                     year:"2020",           grade:"CGPA: 7.0" },
  ]
  return (
    <ChapterSection id="education" roman="Chapter II" kanji="学" subtitle="The Path of Learning"
      image={ch2Img} imageAlt="Education" anim="meditate" contentSide="left" zIndex={3}>
      <div style={{ display:"flex", flexDirection:"column", gap:"1.2rem" }}>
        {entries.map((e,i) => (
          <Reveal key={e.institution} delay={i*0.12}>
            <div style={{ display:"flex", gap:"1rem", padding:"1rem 1rem 1rem 1.2rem",
              border:"1px solid var(--border)",
              background:"var(--card-bg)", position:"relative" }}>
              <div style={{ position:"absolute", left:0, top:0, bottom:0, width:2,
                background:"linear-gradient(to bottom,var(--gold),var(--crimson))" }}/>
              <span style={{ fontFamily:"'Noto Serif JP',serif", fontSize:"1.6rem",
                color:"var(--gold)", opacity:0.4, lineHeight:1, minWidth:"1.8rem" }}>{e.k}</span>
              <div>
                <div style={{ fontFamily:"'Cinzel Decorative',serif", fontSize:"0.7rem",
                  color:"var(--heading)", marginBottom:"0.25rem", letterSpacing:"0.04em" }}>{e.degree}</div>
                <div style={{ fontSize:"0.78rem", color:"var(--gold-dim)", marginBottom:"0.2rem" }}>{e.institution}</div>
                <div style={{ display:"flex", gap:"0.6rem", flexWrap:"wrap" }}>
                  <span style={{ fontSize:"0.67rem", color:"var(--gold-dim)", fontStyle:"italic" }}>{e.year}</span>
                  <span style={{ fontSize:"0.67rem", color:"var(--gold)", padding:"0.06rem 0.4rem", border:"1px solid var(--border)" }}>{e.grade}</span>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
        <Reveal delay={0.4}>
          <div style={{ padding:"0.9rem 1.1rem", borderLeft:"2px solid var(--crimson)", background:"var(--card-bg)" }}>
            <div style={{ fontSize:"0.57rem", letterSpacing:"0.4em", color:"var(--gold-dim)", marginBottom:"0.35rem" }}>CERTIFICATIONS</div>
            <div style={{ fontSize:"0.8rem", color:"var(--text-mid)", marginBottom:"0.18rem" }}>Industry Immersion — Frontend Dev using Angular · NeST Digital</div>
            <div style={{ fontSize:"0.8rem", color:"var(--text-mid)" }}>Programming in Java — NPTEL</div>
          </div>
        </Reveal>
      </div>
    </ChapterSection>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// SKILLS
// ═══════════════════════════════════════════════════════════════════════════════
function SkillsSection() {
  const groups = [
    { k:"言", l:"Languages",  s:["Python","Java","C","JavaScript"] },
    { k:"框", l:"Frameworks", s:["React.js","Angular","Django","Spring Boot","Flask","node.js"] },
    { k:"器", l:"Data & Tools",s:["MySQL","Firebase","Git","REST APIs"] },
    { k:"美", l:"Design",     s:["Figma","After Effects","Photoshop","Canva"] },
  ]
  return (
    <ChapterSection id="skills" roman="Chapter III" kanji="術" subtitle="The Arsenal of the Craft"
      image={ch3Img} imageAlt="Skills" anim="slash" contentSide="right" zIndex={4}>
      <div className="skills-grid">
        {groups.map((g,gi) => (
          <Reveal key={g.k} delay={gi*0.1}>
            <div style={{ padding:"1rem", border:"1px solid var(--border)", background:"var(--card-bg)" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"0.6rem", marginBottom:"0.8rem" }}>
                <span style={{ fontFamily:"'Noto Serif JP',serif", fontSize:"1.3rem",
                  color:"var(--gold)", opacity:0.5 }}>{g.k}</span>
                <span style={{ fontSize:"0.56rem", letterSpacing:"0.35em",
                  color:"var(--gold-dim)", textTransform:"uppercase" }}>{g.l}</span>
              </div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:"0.4rem" }}>
                {g.s.map((sk,si) => (
                  <motion.span key={sk}
                    initial={{ opacity:0, scale:0.82 }}
                    whileInView={{ opacity:1, scale:1 }} viewport={{ once:true }}
                    transition={{ delay:gi*0.08+si*0.04 }}
                    whileHover={{ borderColor:"rgba(200,168,75,0.53)", color:"var(--heading)" }}
                    style={{ fontSize:"0.74rem", padding:"0.2rem 0.5rem",
                      border:"1px solid var(--border)", color:"var(--text-dim)",
                      cursor:"default", transition:"all 0.2s" }}
                  >{sk}</motion.span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.42}>
        <div style={{ marginTop:"1.2rem", padding:"0.9rem 1.1rem", border:"1px solid rgba(139,26,26,0.2)",
          display:"flex", gap:"0.6rem", flexWrap:"wrap", alignItems:"center" }}>
          <span style={{ fontSize:"0.57rem", letterSpacing:"0.4em", color:"var(--gold-dim)",
            textTransform:"uppercase", width:"100%", marginBottom:"0.15rem" }}>IN PRACTICE</span>
          {["Golang","Docker","Cybersecurity Attacks","SOC"].map(t => (
            <span key={t} style={{ fontSize:"0.74rem", color:"var(--gold-dim)",
              borderBottom:"1px solid rgba(139,26,26,0.27)", paddingBottom:"0.1rem" }}>{t}</span>
          ))}
        </div>
      </Reveal>
    </ChapterSection>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// EXPERIENCE
// ═══════════════════════════════════════════════════════════════════════════════
function ExperienceSection() {
  return (
    <ChapterSection id="experience" roman="Chapter IV" kanji="経" subtitle="Trials in the Field"
      image={ch4Img} imageAlt="Experience" anim="drift" contentSide="left" zIndex={5}>
      <div style={{ display:"flex", flexDirection:"column", gap:"1.5rem" }}>
        <Reveal>
          <div style={{ padding:"1.2rem", border:"1px solid var(--border)",
            background:"var(--card-bg)", position:"relative" }}>
            <div style={{ position:"absolute", top:"0.8rem", right:"0.8rem",
              fontFamily:"'Noto Serif JP',serif", fontSize:"2.5rem",
              color:"var(--gold)", opacity:0.07 }}>現</div>
              
            <div style={{ display:"inline-block", fontSize:"0.56rem", letterSpacing:"0.32em",
              color:"var(--crimson)", border:"1px solid var(--crimson)", padding:"0.1rem 0.42rem", marginBottom:"0.6rem" }}>01 July - Present</div>
            <h3 style={{ fontFamily:"'Cinzel Decorative',serif", fontSize:"0.82rem",
              color:"var(--heading)", marginBottom:"0.22rem" }}>Software Developer Intern</h3>
            <div style={{ fontSize:"0.8rem", color:"var(--gold)", marginBottom:"0.8rem" }}>MINTS GLOBAL</div>
            
            <ul style={{ listStyle:"none", padding:0, display:"flex", flexDirection:"column", gap:"0.4rem" }}>
              {[
                "ShieldDesk SOC — security operations center (in development)",
                "Team Task Assignment module with subtasks, due dates, Leader/Co-Leader management",
                "Task review workflows: Approve/Recheck, deletion with notifications",
                "Enhanced Focus Mode, Kanban views, permissions & priority display",
              ].map((t,i) => (
                <li key={i} style={{ fontSize:"0.8rem", color:"var(--text-dim)",
                  paddingLeft:"0.9rem", position:"relative", lineHeight:1.6 }}>
                  <span style={{ position:"absolute", left:0, color:"var(--gold)", opacity:0.5 }}>·</span>{t}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={0.18}>
          <div style={{ padding:"1.2rem", border:"1px solid var(--border)",
            background:"var(--card-bg)", position:"relative" }}>
            <div style={{ position:"absolute", top:"0.8rem", right:"0.8rem",
              fontFamily:"'Noto Serif JP',serif", fontSize:"2.5rem",
              color:"var(--gold)", opacity:0.06 }}>前</div>
            <div style={{ fontSize:"0.66rem", color:"var(--gold-dim)", marginBottom:"0.6rem", letterSpacing:"0.1em" }}>
              23 March – 22 April 2025</div>
            <h3 style={{ fontFamily:"'Cinzel Decorative',serif", fontSize:"0.82rem",
              color:"var(--heading)", marginBottom:"0.22rem" }}>Front-End Developer Intern</h3>
            <div style={{ fontSize:"0.8rem", color:"var(--gold)", marginBottom:"0.8rem" }}>NeST Digital, Kochi</div>
            <ul style={{ listStyle:"none", padding:0, display:"flex", flexDirection:"column", gap:"0.4rem" }}>
              {[
                "Angular & REST APIs in a professional product environment",
                "Responsive interfaces for eKart and Jewls applications",
                "Dynamic product/recipe content displays and shopping flows",
              ].map((t,i) => (
                <li key={i} style={{ fontSize:"0.8rem", color:"var(--text-dim)",
                  paddingLeft:"0.9rem", position:"relative", lineHeight:1.6 }}>
                  <span style={{ position:"absolute", left:0, color:"var(--gold)", opacity:0.5 }}>·</span>{t}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </ChapterSection>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// PROJECTS
// ═══════════════════════════════════════════════════════════════════════════════
function ProjectsSection() {
  const projects = [
    { k:"流", name:"Cartify GnG",            sub:"Smart Shopping Cart",  color:"var(--crimson)",
      tech:["React","HTML","CSS","JavaScript","Figma"],
      desc:"Smart-cart UI/UX with real-time cart tracking, billing visualization, and shopping workflow.",
      link:"https://cartify.afthabrahman.tech/" },
    { k:"網", name:"Grab N Go",              sub:"Supermarket Assistant", color:"var(--gold-dim)",
      tech:["HTML","CSS","JavaScript","Python Flask","Firebase"],
      desc:"Mini-map navigation with layout-based list sorting. 30% reduction in shopping time.",
      link:"https://grabngo.afthabrahman.tech/" },
    { k:"式", name:"AI-Based Quiz Generator",sub:"LLM-Powered Learning",  color:"var(--gold-dim)",
      tech:["Django","Django REST","React.js"],
      desc:"LLM-powered automatic quiz generation with real-time scoring and attempt tracking.",
      link:"https://github.com/shawdi1557/ai-quiz-generator-backend" },
  ]
  return (
    <ChapterSection id="projects" roman="Chapter V" kanji="作" subtitle="Works of the Hand"
      image={ch5Img} imageAlt="Projects" anim="splatter" contentSide="right" zIndex={6}>
      <div style={{ display:"flex", flexDirection:"column", gap:"1.2rem" }}>
        {projects.map((p,i) => (
          <Reveal key={p.name} delay={i*0.12}>
            <motion.a href={p.link} target="_blank" rel="noopener noreferrer"
              whileHover={{ x:4, borderColor:"rgba(200,168,75,0.27)" }}
              style={{ display:"block", textDecoration:"none", padding:"1.1rem",
                border:"1px solid var(--border)",
                background:"var(--card-bg)",
                transition:"all 0.25s", cursor:"none" }}>
              <div style={{ display:"flex", gap:"0.9rem", alignItems:"flex-start" }}>
                <span style={{ fontFamily:"'Noto Serif JP',serif", fontSize:"1.9rem",
                  color:p.color, opacity:0.5, lineHeight:1, minWidth:"2rem" }}>{p.k}</span>
                <div style={{ flex:1 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"0.18rem" }}>
                    <span style={{ fontFamily:"'Cinzel Decorative',serif", fontSize:"0.77rem",
                      color:"var(--heading)", letterSpacing:"0.04em" }}>{p.name}</span>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ opacity:0.35, flexShrink:0 }}>
                      <path d="M1 9 L9 1 M9 1 H4 M9 1 V6" stroke="var(--gold)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div style={{ fontSize:"0.66rem", color:p.color, marginBottom:"0.5rem", letterSpacing:"0.14em" }}>{p.sub}</div>
                  <p style={{ fontSize:"0.79rem", color:"var(--text-dim)", lineHeight:1.6, marginBottom:"0.55rem" }}>{p.desc}</p>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:"0.32rem" }}>
                    {p.tech.map(t => (
                      <span key={t} style={{ fontSize:"0.65rem", padding:"0.08rem 0.42rem",
                        border:"1px solid var(--border)", color:"var(--gold-dim)" }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.a>
          </Reveal>
        ))}
      </div>
    </ChapterSection>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// MINTS ERP
// ═══════════════════════════════════════════════════════════════════════════════
function MintsSection() {
  const mods = [
    { name:"ShieldDesk SOC",    status:"In Development", k:"進", color:"var(--crimson)",
      items:["Security Operations Center dashboard","Real-time threat monitoring & response","Currently under active development"] },
    { name:"MINTS ERP System",  status:"Deployed",        k:"完", color:"var(--gold)",
      items:[
        "Team Task Assignment — individual/team, subtasks, Leader/Co-Leader",
        "Task review flows: Approve/Recheck, deletion with notifications",
        "Focus Mode, Kanban views, permissions & form handling",
        "Priority display, bug fixes, manager progress monitoring",
      ] },
  ]
  return (
    <ChapterSection id="mints" roman="Chapter VI" kanji="蔵" subtitle="The Great Works"
      image={ch6Img} imageAlt="MINTS ERP" anim="fall" contentSide="left" zIndex={7}>
      <div style={{ display:"flex", flexDirection:"column", gap:"1.5rem" }}>
        {mods.map((m,i) => (
          <Reveal key={m.name} delay={i*0.16}>
            <div style={{ padding:"1.2rem", border:"1px solid var(--border)",
              background:"var(--card-bg)" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"0.8rem" }}>
                <div>
                  <h3 style={{ fontFamily:"'Cinzel Decorative',serif", fontSize:"0.8rem",
                    color:"var(--heading)", letterSpacing:"0.04em", marginBottom:"0.22rem" }}>{m.name}</h3>
                  <span style={{ fontSize:"0.58rem", letterSpacing:"0.28em",
                    color:m.color, border:`1px solid ${m.color}`, padding:"0.08rem 0.4rem" }}>{m.status}</span>
                </div>
                <span style={{ fontFamily:"'Noto Serif JP',serif", fontSize:"2.2rem",
                  color:m.color, opacity:0.18, lineHeight:1 }}>{m.k}</span>
              </div>
              <ul style={{ listStyle:"none", padding:0, display:"flex", flexDirection:"column", gap:"0.38rem" }}>
                {m.items.map((item,j) => (
                  <li key={j} style={{ fontSize:"0.79rem", color:"var(--text-dim)",
                    paddingLeft:"0.9rem", position:"relative", lineHeight:1.65 }}>
                    <span style={{ position:"absolute", left:0, color:m.color, opacity:0.55 }}>·</span>{item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </ChapterSection>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// CONTACT
// ═══════════════════════════════════════════════════════════════════════════════
function ContactSection() {
  const nameRef    = useRef<HTMLDivElement>(null)
  const nameInView = useInView(nameRef, { once:true, margin:"-60px" })

  return (
    <ChapterSection id="contact" roman="Chapter VII" kanji="縁" subtitle="The Final Seal"
      image={ch7Img} imageAlt="Contact" anim="unfurl" contentSide="right" zIndex={8}>
      <div style={{ display:"flex", flexDirection:"column", gap:"1.8rem" }}>

        <div ref={nameRef} style={{ overflow:"hidden" }}>
          <motion.h2
            initial={{ clipPath:"inset(0 100% 0 0)", opacity:0 }}
            animate={nameInView ? { clipPath:"inset(0 0% 0 0)", opacity:1 } : {}}
            transition={{ duration:1.5, ease:[0.2,0,0.2,1], delay:0.25 }}
            style={{
              fontFamily:"'Cinzel Decorative',serif",
              fontSize:"clamp(1.5rem,4vw,2.8rem)",
              color:"var(--heading)", letterSpacing:"0.13em",
              lineHeight:1, marginBottom:"0.55rem",
              textShadow:"0 0 60px rgba(200,168,75,0.2)",
            }}
          >AKSHAY BIJU</motion.h2>
          <motion.div
            initial={{ scaleX:0 }} animate={nameInView ? { scaleX:1 } : {}}
            transition={{ duration:1, ease:[0.25,0.1,0.25,1], delay:1.4 }}
            style={{ height:1, background:"linear-gradient(90deg,var(--gold),transparent)", transformOrigin:"left", marginBottom:"0.3rem" }}
          />
          <motion.div
            initial={{ opacity:0 }} animate={nameInView ? { opacity:1 } : {}}
            transition={{ delay:1.8, duration:0.8 }}
            style={{ fontFamily:"'Noto Sans JP',sans-serif", fontSize:"0.58rem",
              letterSpacing:"0.38em", color:"var(--gold-dim)" }}>
            B.TECH CSE · SOFTWARE DEVELOPER · CREATOR
          </motion.div>
        </div>

        <Reveal delay={0.12}>
          <div style={{ display:"flex", gap:"0.6rem", flexWrap:"wrap" }}>
            {[
              { label:"akshaybiju638@gmail.com", href:"mailto:akshaybiju638@gmail.com" },
              { label:"LinkedIn", href:"https://www.linkedin.com/in/akshay-biju1557" },
              { label:"GitHub",   href:"https://github.com/shawdi1557" },
            ].map(lnk => (
              <motion.a key={lnk.label} href={lnk.href} target="_blank" rel="noopener noreferrer"
                whileHover={{ borderColor:"rgba(200,168,75,0.53)", color:"var(--heading)" }}
                style={{ display:"inline-flex", alignItems:"center", gap:"0.35rem",
                  fontSize:"0.74rem", padding:"0.3rem 0.7rem",
                  border:"1px solid var(--border)", color:"var(--text-dim)",
                  textDecoration:"none", transition:"all 0.22s", cursor:"none",
                  letterSpacing:"0.04em" }}
              >{lnk.label}</motion.a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.22}>
          <div style={{ padding:"1.1rem", border:"1px solid var(--border)", background:"var(--card-bg)" }}>
            <div style={{ fontSize:"0.57rem", letterSpacing:"0.4em", color:"var(--gold-dim)", marginBottom:"0.65rem" }}>
              LEADERSHIP & ACHIEVEMENTS</div>
            {[
              "CSI Executive Member — organized 3+ technical workshops",
              "College Magazine Editor — 5-member team, 1,000+ readers",
              "Designed 20+ official posters & visual materials for college events",
            ].map((item,i) => (
              <div key={i} style={{ fontSize:"0.8rem", color:"var(--text-dim)",
                paddingLeft:"0.9rem", position:"relative", lineHeight:1.7, marginBottom:"0.28rem" }}>
                <span style={{ position:"absolute", left:0, color:"var(--gold)", opacity:0.5 }}>·</span>{item}
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.33}>
          <div style={{ padding:"1.1rem", borderLeft:"2px solid rgba(139,26,26,0.4)", background:"var(--card-bg)" }}>
            <p style={{ fontFamily:"'IM Fell English',serif", fontStyle:"italic",
              fontSize:"0.86rem", color:"var(--text-mid)", lineHeight:1.75 }}>
              "Every great creation begins with a single brush stroke.<br/>
              Let us craft something worthy."
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.45}>
          <div style={{ display:"flex", gap:"1.2rem", alignItems:"center", flexWrap:"wrap" }}>
            <Seal text={"阿\n克\n謝"} size={64}/>
            <div>
              <BrushDivider/>
              <div style={{ fontFamily:"'Noto Serif JP',serif", fontSize:"0.68rem",
                color:"var(--gold)", opacity:0.45, marginTop:"0.45rem", letterSpacing:"0.38em" }}>
                巻物の終わり — End of Scroll
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </ChapterSection>
  )
}

// ─── Active section tracker ───────────────────────────────────────────────────
function useActiveSection() {
  const [active, setActive] = useState("hero")
  useEffect(() => {
    const sections = CHAPTERS.map(c => document.getElementById(c.id)).filter(Boolean)
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting && e.intersectionRatio >= 0.2) setActive(e.target.id) }),
      { threshold: 0.2 }
    )
    sections.forEach(s => s && obs.observe(s))
    return () => obs.disconnect()
  }, [])
  return active
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const active = useActiveSection()

  return (
    <div style={{ background:"var(--bg)", minHeight:"100vh", transition:"background 0.55s ease" }}>
      <KatanaCursor/>
      <ScrollProgress/>
      <Navigation active={active}/>
      <MusicToggle/>

      {/* Paper grain — visible only in light mode via CSS */}
      <div className="paper-grain"/>

      {/* Fixed ink/parchment canvas */}
      <div style={{
        position:"fixed", inset:0,
        background:"var(--canvas-bg)",
        zIndex:0, pointerEvents:"none",
        transition:"background 0.55s ease",
      }}/>

      <main style={{ position:"relative", zIndex:1 }}>
        <HeroSection/>
        <AboutSection/>
        <EducationSection/>
        <SkillsSection/>
        <ExperienceSection/>
        <ProjectsSection/>
        <MintsSection/>
        <ContactSection/>
      </main>
    </div>
  )
}
