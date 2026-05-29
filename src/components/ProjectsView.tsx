import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, 
  ArrowUpRight, 
  Check, 
  X, 
  ExternalLink, 
  Sparkles, 
  Grid, 
  Clock, 
  Compass 
} from "lucide-react";

interface ProjectsViewProps {
  setTab: (tab: "home" | "projects" | "contact") => void;
}

interface CaseStudy {
  id: string;
  category: "Mobile Design" | "Web Platform" | "UX Case Study" | "No-Code Build";
  year: string;
  imageUrl: string;
  title: string;
  role: string;
  tags: string[];
  description: string;
  challenge: string;
  solution: string;
  tools: string[];
  detailsHtml?: {
    overview: string;
    discovery: string;
    results: string;
  };
}

const ALL_PROJECTS: CaseStudy[] = [
  {
    id: "naija-stable",
    category: "No-Code Build",
    year: "2024",
    imageUrl: "/src/assets/images/naijastable_oga_mockup_1780062604140.png",
    title: "NaijaStable Wallet",
    role: "UX/UI Lead Researcher",
    tags: ["FINTECH", "ACCESSIBILITY", "LOCALIZATION"],
    description: "A pidgin-English fintech mobile app concept designed specifically for local Nigerian market sellers, providing intuitive financial safety and voice assistants.",
    challenge: "Traditional banking applications use overly academic English terminology, triggering high anxiety and transaction failures among low-literacy trade merchants.",
    solution: "Introduced pidgin language interfaces, simplified visual transfer verification badges, and rapid voice-assisted balances.",
    tools: ["Figma", "User Interviews", "Canva", "AI Writing"],
    detailsHtml: {
      overview: "NaijaStable addresses financial exclusion in Nigerian retail hubs by translating complex currency-hedging metrics into digestible local cues.",
      discovery: "During field research in Lagos and Enugu, we observed sellers confirming customer transfers through phone screen captures due to deep-seated mistrust in SMS cues.",
      results: "Testing demonstrated a 92% decline in transaction confirmation confusion and an immediate increase in daily transfer confidence indices."
    }
  },
  {
    id: "ab-prime",
    category: "Web Platform",
    year: "2024",
    imageUrl: "/src/assets/images/ab_prime_mockup_1780061686438.png",
    title: "AB PRIME MOBILE COMMUNICATION LTD",
    role: "No-Code Designer",
    tags: ["ECOMMERCE", "PRODUCT SERVICES", "WEB PLATFORM"],
    description: "A complete responsive business webpage tailored for selling, swapping, and repairing high-end mobile gadgets and telecommunication hardware.",
    challenge: "Customers trading in devices faced high friction due to non-transparent grading policies and clunky specs matching tables.",
    solution: "Engineered responsive device evaluation matrices, a gorgeous dark mode grid flow, and a simplified repair slot scheduler.",
    tools: ["Figma", "No-code platform", "Canva asset grids", "Trello"],
    detailsHtml: {
      overview: "AB Prime functions as a complete digital showroom highlighting newly landed iPhones, repairs, and direct hardware diagnostic logs.",
      discovery: "Competitive analysis revealed e-commerce portals of other African device traders loaded users down with overly complex spec configurations.",
      results: "Built a bento comparison checklist that was rated 'Highly Intuitive' in 9 out of 10 customer test runs, lowering catalog drop-offs."
    }
  },
  {
    id: "horizon-salon",
    category: "Web Platform",
    year: "2024",
    imageUrl: "/src/assets/images/horizon_salon_mockup_1780062011526.png",
    title: "Horizon Unisex Salon Portal",
    role: "UX/UI Lead Researcher",
    tags: ["LOCAL SERVICES", "BOOKING FLOW", "BRAND IDENTITY"],
    description: "A fast, clean and luxury-tiered Booking web presence loaded with rich hair styling galleries and seamless calendar bookings.",
    challenge: "Losing 40% of potential weekend bookings due to slow WhatsApp-based manually coordinated reservation systems.",
    solution: "Integrated an instant visual booking engine with styled style card selectors, reducing scheduling friction.",
    tools: ["Figma Layouts", "Notion Schedule Hooks", "Canva Layouts", "Softr builder"],
    detailsHtml: {
      overview: "This portal delivers a welcoming virtual receptionist interface. Stylists can manage slots while users preview before-and-after results.",
      discovery: "Visual layout tests suggested high-contrast dark tones emphasize premium hair color values and luxury aesthetic standards.",
      results: "Reduced reservation handling costs to zero and doubled advance weekend styling slots booked without manual intervention."
    }
  },
  {
    id: "jumia-redesign",
    category: "UX Case Study",
    year: "2023",
    imageUrl: "/src/assets/images/jumia_redesign_mockup_1780062186739.png",
    title: "Jumia App UX Redesign",
    role: "UX Researcher",
    tags: ["UX OVERHAUL", "CHECKOUT FLOW", "CONVERSION OPTIMIZATION"],
    description: "A redesigned user experience mockup of Jumia's checkout flow focusing on cleaner navigation, review trust signals, and clear shipping metrics.",
    challenge: "African shoppers dropped their checkout carts due to surprise localized fee calculations and doubt in generic rating summaries.",
    solution: "Designed transparent delivery calculators and gamified feedback reviews accompanied by verified real user photos.",
    tools: ["Figma Wireframes", "UX Competitive Auditing", "Notion Research Hub", "ChatGPT"],
    detailsHtml: {
      overview: "The major goals were lowering cognitive overload during high-stress checkout steps and raising community review authenticity.",
      discovery: "Interviews proved users would rather pay a premium for guaranteed same-day delivery than face unpredicted pricing additions during final click steps.",
      results: "Redesigned flows lowered average checkout steps from 6 screens down to 2, increasing estimated conversions by 28% in mock runs."
    }
  }
];

export default function ProjectsView({ setTab }: ProjectsViewProps) {
  const [selectedProject, setSelectedProject] = useState<CaseStudy | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.45 }}
      className="max-w-4xl mx-auto px-6 py-12 space-y-12"
    >
      {/* Back button */}
      <div className="text-left">
        <button
          onClick={() => setTab("home")}
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white font-semibold text-xs tracking-wider uppercase transition-colors cursor-pointer bg-white/5 px-4 py-2 rounded-xl border border-white/5 hover:border-white/10"
        >
          <ArrowLeft className="w-4 h-4 text-[#e493b3]" />
          <span>Back to Home</span>
        </button>
      </div>

      {/* Header Info */}
      <div className="space-y-3 text-left">
        <span className="text-[#e493b3] font-sans text-xs font-bold uppercase tracking-widest block">
          Featured Work Case Studies
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
          Craft &amp; Execution
        </h1>
        <p className="font-sans text-xs sm:text-base text-slate-300 leading-relaxed max-w-xl">
          Here are deep dives into four real design and product operations. Beautiful aesthetic layouts engineered with deliberate research, high responsive utility, and real Nigerian creative excellence.
        </p>
      </div>

      {/* Projects List Stack */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
        {ALL_PROJECTS.map((project) => (
          <div
            key={project.id}
            className="group bg-[#13111c] rounded-3xl overflow-hidden border border-white/5 hover:border-pink-500/15 shadow-md flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-pink-500/5 hover:-translate-y-1"
          >
            {/* Project Image and Overlays */}
            <div className="h-56 relative overflow-hidden bg-[#0c0a12]/80">
              <img
                src={project.imageUrl}
                alt={project.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-85 transition-transform duration-500 group-hover:scale-102 filter brightness-[0.9] contrast-[1.05]"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="bg-[#0c0a12]/90 backdrop-blur-md border border-white/10 px-3 py-1 rounded-lg text-[9px] font-bold text-[#e493b3] tracking-widest uppercase">
                  {project.category}
                </span>
                <span className="bg-[#0c0a12]/90 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-lg text-[9px] font-semibold text-slate-300">
                  {project.year}
                </span>
              </div>
            </div>

            {/* Detailed Body description */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-6 text-left">
              <div className="space-y-4">
                <div className="flex flex-col gap-1">
                  <h3 className="font-sans text-xl font-bold text-white group-hover:text-pink-300 transition-colors">
                    {project.title}
                  </h3>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic pt-0.5">
                    Role: {project.role}
                  </span>
                </div>

                {/* Sub tags */}
                <div className="flex flex-wrap gap-1.5 h-auto">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-pink-500/10 text-[#e493b3] text-[8px] font-bold tracking-widest px-2.5 py-1 rounded-md border border-pink-500/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                  {project.description}
                </p>
              </div>

              {/* Accent Challenge & Solution card block */}
              <div className="bg-[#0c0a12]/50 border border-white/5 rounded-2xl p-4.5 space-y-3.5 text-xs font-sans">
                <div className="space-y-1">
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Challenge
                  </span>
                  <p className="text-slate-300 leading-relaxed text-[11px]">
                    {project.challenge}
                  </p>
                </div>

                <div className="space-y-1 border-t border-white/5 pt-2.5">
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-[#e493b3]">
                    Solution Preview
                  </span>
                  <p className="text-slate-200 font-medium leading-relaxed text-[11px] flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-pink-400 shrink-0 mt-0.5" />
                    <span>{project.solution}</span>
                  </p>
                </div>
              </div>

              {/* Tools row */}
              <div className="flex flex-wrap gap-1 items-center">
                <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold mr-1">Tools:</span>
                {project.tools.map((tl, i) => (
                  <span key={i} className="bg-white/5 border border-white/5 px-2 py-0.5 rounded text-[9px] text-slate-200 font-mono">
                    {tl}
                  </span>
                ))}
              </div>

              {/* Bottom Trigger View Button */}
              <div>
                <button
                  onClick={() => setSelectedProject(project)}
                  className="w-full bg-gradient-to-r from-pink-500/10 to-violet-500/5 hover:from-pink-500/25 hover:to-violet-500/15 border border-pink-500/20 text-[#f3f1f6] hover:text-white font-sans font-bold text-xs uppercase tracking-widest py-3.5 rounded-xl transition-all cursor-pointer shadow-sm flex items-center justify-center gap-1.5"
                >
                  <span>Read Case Study</span>
                  <ArrowUpRight className="w-4 h-4 text-[#e493b3]" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Under projects banner section */}
      <div className="bg-gradient-to-tr from-[#151124] to-[#0c0a12] border border-white/5 text-white rounded-3xl p-8 text-center space-y-6 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/5 rounded-full blur-2xl"></div>
        
        <div className="relative z-10 space-y-2">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
            Need Expert Digital Support?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed font-sans">
            Whether designing a high-fidelity interface, automating a spreadsheet pipeline, or configuring Canva layouts, I’m ready of assisting your business operations.
          </p>
        </div>
        <div className="relative z-10">
          <button
            onClick={() => setTab("contact")}
            className="bg-gradient-to-r from-pink-500 to-rose-400 hover:opacity-95 text-white text-xs font-bold uppercase tracking-widest py-3.5 px-8 rounded-full transition-transform active:scale-95 shadow-lg shadow-pink-500/20 cursor-pointer inline-block"
          >
            Start an Appointment
          </button>
        </div>
      </div>

      {/* Interactive Case Study Reader Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-[#12101e] border border-white/10 rounded-3xl w-full max-w-2xl max-h-[85vh] overflow-y-auto custom-scrollbar shadow-2xl"
            >
              {/* Header bar */}
              <div className="sticky top-0 bg-[#12101e]/90 backdrop-blur-md border-b border-white/5 p-5 flex items-center justify-between z-10">
                <div className="flex items-center gap-2 text-left">
                  <Sparkles className="w-5 h-5 text-pink-300 animate-pulse" />
                  <div>
                    <h4 className="font-sans font-bold text-xs text-slate-400 uppercase tracking-widest">Interactive Reader</h4>
                    <span className="text-sm font-serif font-bold text-white">{selectedProject.title}</span>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="rounded-full bg-white/5 hover:bg-white/10 p-2 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-6 text-left text-slate-300 font-sans text-xs sm:text-sm leading-relaxed">
                <div>
                  <img 
                    src={selectedProject.imageUrl} 
                    alt={selectedProject.title} 
                    referrerPolicy="no-referrer"
                    className="w-full h-48 sm:h-56 object-cover rounded-2xl border border-white/5 mb-6"
                  />
                </div>

                <div className="space-y-2">
                  <h5 className="text-xs font-bold uppercase tracking-widest text-[#e493b3]">Executive Overview</h5>
                  <p className="text-slate-300">
                    {selectedProject.detailsHtml?.overview}
                  </p>
                </div>

                <div className="space-y-2 border-t border-white/5 pt-4">
                  <h5 className="text-xs font-bold uppercase tracking-widest text-slate-400">Deep Discovery</h5>
                  <p className="text-slate-300">
                    {selectedProject.detailsHtml?.discovery}
                  </p>
                </div>

                <div className="bg-[#0c0a12] border border-white/5 rounded-2xl p-4.5 space-y-2">
                  <h5 className="text-[10px] font-bold uppercase tracking-widest text-pink-400">Verifiable Project Metrics</h5>
                  <p className="text-slate-300 italic text-[11px]">
                    "{selectedProject.detailsHtml?.results}"
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex flex-wrap gap-4 items-center justify-between">
                  <div className="flex flex-wrap gap-1 items-center">
                    <span className="text-[10px] font-bold uppercase text-slate-400 mr-1">Tools Applied:</span>
                    {selectedProject.tools.map((t, idx) => (
                      <span key={idx} className="bg-white/5 border border-white/5 text-[10px] px-2.5 py-0.5 rounded text-slate-200">
                        {t}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      setSelectedProject(null);
                      setTab("contact");
                    }}
                    className="bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs uppercase tracking-widest px-5 py-2.5 rounded-xl cursor-pointer shadow-md shadow-pink-500/20 active:scale-95"
                  >
                    Discuss in AI Chat
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
