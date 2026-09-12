import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { personal } from "@/data/portfolio";
import RotatingText from "@/components/RotatingText";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Message from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.open(`mailto:${personal.email}?subject=${subject}&body=${body}`);
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(247,244,238,0.12)",
    borderRadius: "var(--r-sm)",
    color: "#F7F4EE",
    padding: "0.875rem 1rem",
    fontSize: "0.875rem",
    outline: "none",
    transition: "border-color 0.2s",
  };

  return (
    <section id="contact" className="py-32 px-6" style={{ background: "#1A1916" }} ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-20"
        >
          <span className="text-xs tracking-widest uppercase font-semibold" style={{ color: "rgba(247,244,238,0.3)" }}>
            07 / Contact
          </span>
          <div className="flex-1 h-px" style={{ background: "rgba(247,244,238,0.1)" }} />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Left: heading + links */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] mb-8"
              style={{ color: "#F7F4EE" }}
            >
              Let&apos;s build<br />
              <RotatingText
                texts={["something great.", "the future.", "your vision.", "with purpose.", "something bold."]}
                splitBy="characters"
                staggerDuration={0.03}
                staggerFrom="first"
                rotationInterval={2800}
                transition={{ type: "spring", damping: 28, stiffness: 280 }}
                initial={{ y: "3%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-3%", opacity: 0 }}
                mainClassName="font-display"
                style={{ fontStyle: "italic", color: "rgba(247,244,238,0.4)" }}
              />
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base leading-relaxed mb-10 max-w-md"
              style={{ color: "rgba(247,244,238,0.55)" }}
            >
              Whether you&apos;re looking for a developer, collaborator, or just want to connect —
              I&apos;m always open to meaningful conversations.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-1"
            >
              {[
                { label: "Email", value: personal.email, href: `mailto:${personal.email}` },
                { label: "GitHub", value: `@${personal.githubUsername}`, href: personal.github },
                { label: "LinkedIn", value: "akshay-biju1557", href: personal.linkedin },
              ].map((link, i) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.label !== "Email" ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center justify-between py-4 group transition-colors duration-200"
                  style={{ borderBottom: "1px solid rgba(247,244,238,0.08)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderBottomColor = "rgba(247,244,238,0.3)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderBottomColor = "rgba(247,244,238,0.08)"; }}
                >
                  <div>
                    <div className="text-[10px] tracking-widest uppercase mb-0.5" style={{ color: "rgba(247,244,238,0.3)" }}>{link.label}</div>
                    <div className="text-sm font-medium" style={{ color: "#F7F4EE" }}>{link.value}</div>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    style={{ color: "rgba(247,244,238,0.3)" }}>
                    <path d="M2 14L14 2M14 2H5M14 2V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </a>
              ))}
            </motion.div>
          </div>

          {/* Right: contact form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="p-8 flex flex-col gap-5"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(247,244,238,0.1)",
              borderRadius: "var(--r-lg)",
            }}
          >
            <div>
              <label className="block text-[10px] tracking-widest uppercase mb-2 font-semibold" style={{ color: "rgba(247,244,238,0.35)" }}>
                Name
              </label>
              <input
                type="text"
                required
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                style={inputStyle}
                onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(247,244,238,0.4)"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(247,244,238,0.12)"; }}
              />
            </div>
            <div>
              <label className="block text-[10px] tracking-widest uppercase mb-2 font-semibold" style={{ color: "rgba(247,244,238,0.35)" }}>
                Email
              </label>
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                style={inputStyle}
                onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(247,244,238,0.4)"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(247,244,238,0.12)"; }}
              />
            </div>
            <div>
              <label className="block text-[10px] tracking-widest uppercase mb-2 font-semibold" style={{ color: "rgba(247,244,238,0.35)" }}>
                Message
              </label>
              <textarea
                required
                rows={5}
                placeholder="What's on your mind?"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                style={{ ...inputStyle, resize: "none" }}
                onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(247,244,238,0.4)"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(247,244,238,0.12)"; }}
              />
            </div>
            <button
              type="submit"
              className="w-full py-3.5 text-sm font-semibold tracking-wide transition-all duration-300"
              style={{
                background: sent ? "#2D5A27" : "#F7F4EE",
                color: sent ? "#F7F4EE" : "#1A1916",
                borderRadius: "var(--r-sm)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.2)",
              }}
              onMouseEnter={(e) => { if (!sent) e.currentTarget.style.background = "#e8e3db"; }}
              onMouseLeave={(e) => { if (!sent) e.currentTarget.style.background = "#F7F4EE"; }}
            >
              {sent ? "Message opened ✓" : "Send Message →"}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
