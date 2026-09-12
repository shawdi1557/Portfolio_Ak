import { personal } from "@/data/portfolio";

export default function Footer() {
  return (
    <footer
      className="px-6 py-10"
      style={{ background: "#1A1916", borderTop: "1px solid rgba(247,244,238,0.08)" }}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <span className="font-display text-sm" style={{ color: "rgba(247,244,238,0.6)" }}>
            Akshay Biju
          </span>
          <span className="text-xs" style={{ color: "rgba(247,244,238,0.25)" }}>
            © 2026
          </span>
        </div>

        <div className="flex items-center gap-6">
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-widest uppercase font-medium transition-opacity hover:opacity-100"
            style={{ color: "rgba(247,244,238,0.35)" }}
          >
            GitHub
          </a>
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-widest uppercase font-medium transition-opacity hover:opacity-100"
            style={{ color: "rgba(247,244,238,0.35)" }}
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${personal.email}`}
            className="text-xs tracking-widest uppercase font-medium transition-opacity hover:opacity-100"
            style={{ color: "rgba(247,244,238,0.35)" }}
          >
            Email
          </a>
        </div>

      
      </div>
    </footer>
  );
}
