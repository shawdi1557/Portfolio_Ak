import mintsErpImg from "@/imports/project-mints-erp.png";
import cartifyGngImg from "@/imports/project-cartify-gng.png";
import grabNGoImg from "@/imports/project-grab-n-go.png";
import quizzifyAiImg from "@/imports/project-quizzify-ai.png";

export const personal = {
  name: "Akshay Biju",
  firstName: "Akshay",
  lastName: "Biju",
  title: "Software Developer",
  subtitle: "Creative Technologist",
  tagline: "I build modern web experiences at the intersection of engineering and design.",
  email: "akshaybiju638@gmail.com",
  github: "https://github.com/shawdi1557?tab=repositories",
  githubUsername: "shawdi1557",
  linkedin: "https://linkedin.com/in/akshay-biju1557",
  available: true,
  availabilityNote: "Open to opportunities",
  location: "Kerala, India",
  bio: "I’m a B.Tech Computer Science graduate and Software Developer passionate about building modern, scalable, and user-focused digital experiences. I work with React.js, Python, Django, MySQL, and Git, with a strong interest in full-stack development and solving real-world problems through technology.",
  interests: ["Web Development", "Cybersecurity", "Designing", "Football", "Gaming", "Motorcycles", "Video Editing"],
  languages: ["English", "Malayalam", "Tamil", "Hindi"],
  philosophy: "Code with purpose, design with intent.",
};

export const education = [
  {
    degree: "B.Tech — Computer Science & Engineering",
    institution: "APJ Abdul Kalam Technological University",
    year: "2022 — 2026",
    grade: "CGPA: 7.92",
  },
  {
    degree: "Higher Secondary Education",
    institution: "FJHSS, Puthupady",
    year: "2022",
    grade: "CGPA: 8.30",
  },
  {
    degree: "AISSE — Secondary Education",
    institution: "MMPS, Kothamangalam",
    year: "2020",
    grade: "CGPA: 7.0",
  },
];

export const certifications = [
  {
    name: "Industry Immersion — Frontend Development using Angular",
    issuer: "NeST Digital",
  },
  {
    name: "Programming in Java",
    issuer: "NPTEL",
  },
];

export const experience = [
  {
    role: "Software Developer Intern",
    company: "MINTS GLOBAL",
    duration: "01 July 2026 — Present",
    type: "Full-time Internship",
    highlights: [
      "Developing ShieldDesk SOC — a Security Operations Center platform currently in active development",
      "Built comprehensive Team Task Assignment module in MINTS ERP with subtask management, due dates, and leader/co-leader controls",
      "Implemented task review workflows with Approve / Recheck functionality and task deletion notifications",
      "Created Focus Mode and Kanban views with role-based permissions and priority display",
      "Contributed to manager progress monitoring tools and resolved production bugs",
    ],
    tech: ["React", "JavaScript", "REST APIs", "Firebase"],
    projects: ["ShieldDesk SOC", "MINTS ERP System"],
  },
  {
    role: "Front-End Developer Intern",
    company: "NeST Digital, Kochi",
    duration: "23 March 2025 — 22 April 2025",
    type: "Internship",
    highlights: [
      "Built responsive interfaces in a professional product development environment",
      "Developed eKart application with dynamic product and shopping flows",
      "Created Jewls application featuring dynamic recipe/product content displays",
      "Integrated REST APIs for dynamic content management",
    ],
    tech: ["Angular", "REST APIs", "TypeScript", "HTML", "CSS"],
    projects: ["eKart", "Jewls"],
  },
];

export const skills = {
  Frontend: ["React.js", "Angular", "JavaScript", "TypeScript", "HTML5", "CSS3"],
  Backend: ["Python", "Django", "Flask", "Java", "Spring Boot", "Node.js", "C"],
  Database: ["MySQL", "Firebase"],
  Tools: ["Git", "REST APIs", "Figma"],
  Creative: ["Adobe After Effects", "Photoshop", "Canva", "Video Editing"],
};

export const projects = [
  {
    id: "01",
    name: "MINTS ERP System",
    tagline: "Deployed",
    description: "Enterprise resource planning system built at MINTS GLOBAL. Focused on team task management with comprehensive assignment, review, and monitoring workflows.",
    tech: ["React", "JavaScript", "Firebase", "REST APIs"],
    features: [
      "Team Task Assignment — individual/team, subtasks, Leader/Co-Leader",
      "Task review flows: Approve/Recheck, deletion with notifications",
      "Focus Mode, Kanban views, permissions & form handling",
      "Priority display, bug fixes, manager progress monitoring",
    ],
    live: "https://erp.mintsglobal.ae/",
    github: null,
    color: "#1A3A5C",
    image: mintsErpImg,
  },
  {
    id: "02",
    name: "Cartify GnG",
    tagline: "Smart Shopping Cart",
    description: "A smart-cart UI/UX system featuring real-time cart tracking, billing visualization, and a seamless shopping workflow. Designed and developed end-to-end from Figma prototypes to production.",
    tech: ["React", "HTML", "CSS", "JavaScript", "Figma"],
    features: ["Real-time cart tracking", "Billing visualization", "Shopping workflow", "Responsive design"],
    live: "https://cartify.afthabrahman.tech/",
    github: null,
    color: "#2D5A27",
    image: cartifyGngImg,
  },
  {
    id: "03",
    name: "Grab N Go",
    tagline: "Supermarket Assistant",
    description: "A supermarket assistance system that reduced shopping time by 30%. Features a mini-map navigation system, layout-based list sorting, and intelligent shopping assistance.",
    tech: ["HTML", "CSS", "JavaScript", "Python Flask", "Firebase"],
    features: ["Mini-map navigation", "Layout-based list sorting", "30% time reduction", "Firebase backend"],
    live: "https://grabngo.afthabrahman.tech/",
    github: null,
    color: "#4A3728",
    image: grabNGoImg,
  },
  {
    id: "04",
    name: "AI Quiz Generator",
    tagline: "LLM-Powered Learning",
    description: "An AI/LLM-powered quiz generation system with automatic quiz creation, real-time scoring, and attempt tracking. Built with a Django REST backend and React frontend.",
    tech: ["Django", "Django REST", "React.js", "Python"],
    features: ["Automatic quiz generation", "Real-time scoring", "Attempt tracking", "LLM integration"],
    live: null,
    github: "https://github.com/shawdi1557/ai-quiz-generator-backend",
    color: "#1A2D4A",
    image: quizzifyAiImg,
  },
];

export const achievements = [
  {
    title: "CSI Executive Member",
    description: "Organized 3+ technical workshops for the Computer Society of India chapter",
  },
  {
    title: "College Magazine Editor",
    description: "Managed a 5-member editorial team; publication reached 1,000+ readers",
  },
  {
    title: "College Design Lead",
    description: "Designed 20+ official posters and visual materials for college events",
  },
];

// ---------------------------------------------------------------------------
// GitHub Contribution Heatmap — 35 weeks (Sep 2025 → May 2026)
// ---------------------------------------------------------------------------
// Cells: [Sun(0), Mon(1), Tue(2), Wed(3), Thu(4), Fri(5), Sat(6)]
// Green squares spell  A · K · S · H · A · Y  starting from col 3.
// Layout: 2 pad | A(3) | Oct gap | K(4) | Nov gap | S(3) | Dec gap |
//         H(3) | Jan gap | A(3) | Feb gap | Y(3) | 9 right pad
// Total: 2+3+1+4+1+3+1+3+1+3+1+3+9 = 35 cols  (35×18px ≈ 630px)
// ---------------------------------------------------------------------------
export const githubContributions: { date: string; cells: (0 | 1 | 2 | 3 | 4)[] }[] = [
  // ── Left padding (cols 1-2) ──
  { date: "Sep", cells: [0,0,0,0,0,0,0] },
  { date: "",    cells: [0,0,0,0,0,0,0] },

  // ══ A (cols 3-5) ══
  // Mon=top of letter, Fri=bottom.  A: _X_ / X_X / XXX / X_X / X_X
  { date: "", cells: [0,0,4,4,4,4,0] },  // left col : Tue-Fri lit
  { date: "", cells: [0,4,0,4,0,0,0] },  // center   : Mon + Wed (peak + crossbar)
  { date: "", cells: [0,0,4,4,4,4,0] },  // right col: Tue-Fri lit

  // ── gap / Oct (col 6) ──
  { date: "Oct", cells: [0,0,0,0,0,0,0] },

  // ══ K (cols 7-10) ══
  // K: X___X / X__X_ / X_X__ / X__X_ / X___X (spine + diagonal arms)
  { date: "", cells: [0,4,4,4,4,4,0] },  // spine  : full Mon-Fri
  { date: "", cells: [0,0,0,4,0,0,0] },  // elbow  : Wed only
  { date: "", cells: [0,0,4,0,4,0,0] },  // arms   : Tue + Thu
  { date: "", cells: [0,4,0,0,0,4,0] },  // tips   : Mon + Fri

  // ── gap / Nov (col 11) ──
  { date: "Nov", cells: [0,0,0,0,0,0,0] },

  // ══ S (cols 12-14) ══
  // S: XXX / X__ / XXX / __X / XXX
  { date: "", cells: [0,4,4,4,0,4,0] },  // left  : Mon Tue Wed Fri
  { date: "", cells: [0,4,0,4,0,4,0] },  // center: Mon Wed Fri
  { date: "", cells: [0,4,0,4,4,4,0] },  // right : Mon Wed Thu Fri

  // ── gap / Dec (col 15) ──
  { date: "Dec", cells: [0,0,0,0,0,0,0] },

  // ══ H (cols 16-18) ══
  // H: X_X / X_X / XXX / X_X / X_X
  { date: "", cells: [0,4,4,4,4,4,0] },  // left  : full Mon-Fri
  { date: "", cells: [0,0,0,4,0,0,0] },  // bridge: Wed only
  { date: "", cells: [0,4,4,4,4,4,0] },  // right : full Mon-Fri

  // ── gap / Jan (col 19) ──
  { date: "Jan", cells: [0,0,0,0,0,0,0] },

  // ══ A (cols 20-22) ══
  { date: "", cells: [0,0,4,4,4,4,0] },
  { date: "", cells: [0,4,0,4,0,0,0] },
  { date: "", cells: [0,0,4,4,4,4,0] },

  // ── gap / Feb (col 23) ──
  { date: "Feb", cells: [0,0,0,0,0,0,0] },

  // ══ Y (cols 24-26) ══
  // Y: X_X / X_X / _X_ / _X_ / _X_
  { date: "", cells: [0,4,4,0,0,0,0] },  // left arm : Mon + Tue
  { date: "", cells: [0,0,0,4,4,4,0] },  // stem     : Wed + Thu + Fri
  { date: "", cells: [0,4,4,0,0,0,0] },  // right arm: Mon + Tue

  // ── Right padding (cols 27-35) ──
  { date: "Mar", cells: [0,0,0,0,0,0,0] },
  { date: "",    cells: [0,0,0,0,0,0,0] },
  { date: "",    cells: [0,0,0,0,0,0,0] },
  { date: "Apr", cells: [0,0,0,0,0,0,0] },
  { date: "",    cells: [0,0,0,0,0,0,0] },
  { date: "",    cells: [0,0,0,0,0,0,0] },
  { date: "May", cells: [0,0,0,0,0,0,0] },
  { date: "",    cells: [0,0,0,0,0,0,0] },
  { date: "",    cells: [0,0,0,0,0,0,0] },
];

// ---------------------------------------------------------------------------
// Pinned Repositories
// ---------------------------------------------------------------------------
export const githubPinnedRepos = [
  {
    name: "MINTS-AI-TestERP",
    description: "AI-integrated ERP system — SOC dashboard, task management & review workflows",
    language: "React",
    languageColor: "#61dafb",
    url: "https://erp.mintsglobal.ae/",
  },
  {
    name: "cartify-gng",
    description: "Real-time smart cart UI/UX — billing visualization & seamless shopping flow",
    language: "JavaScript",
    languageColor: "#f1e05a",
    url: "https://cartify.afthabrahman.tech/",
  },
  {
    name: "temp-cleaner-automation",
    description: "Python automation script to scan and safely purge temp files & system clutter",
    language: "Python",
    languageColor: "#3572A5",
    url: "https://github.com/shawdi1557",
  },
  {
    name: "testcase-validator",
    description: "CLI tool to validate and lint test cases against expected output schemas",
    language: "Python",
    languageColor: "#3572A5",
    url: "https://github.com/shawdi1557",
  },
];
