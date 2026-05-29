import { Heart } from "lucide-react";

interface FooterProps {
  setTab: (tab: "home" | "projects" | "contact") => void;
}

export default function Footer({ setTab }: FooterProps) {
  return (
    <footer className="bg-[#07050a] border-t border-white/5 px-6 py-12 w-full mt-auto">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        {/* Brand column */}
        <div className="flex flex-col gap-3">
          <span className="font-serif text-2xl font-bold bg-gradient-to-r from-pink-300 via-rose-200 to-amber-200 bg-clip-text text-transparent">Joshua.B</span>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm font-sans">
            Lagos-based virtual tech specialist and UI/UX designer. Bridging aesthetics, rapid organization, and no-code operations for fast-growing global brands.
          </p>
        </div>

        {/* Quick Links column */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="block text-xs font-bold uppercase tracking-widest text-[#e493b3] mb-4">Navigation</span>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li>
                <button onClick={() => setTab("home")} className="hover:text-white transition-colors cursor-pointer text-left font-medium">
                  Home (About)
                </button>
              </li>
              <li>
                <button onClick={() => setTab("projects")} className="hover:text-white transition-colors cursor-pointer text-left font-medium">
                  Case Studies
                </button>
              </li>
              <li>
                <button onClick={() => setTab("contact")} className="hover:text-white transition-colors cursor-pointer text-left font-medium">
                  Get in Touch
                </button>
              </li>
            </ul>
          </div>

          <div>
            <span className="block text-xs font-bold uppercase tracking-widest text-[#e493b3] mb-4">Core Craft</span>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>UI/UX Design</li>
              <li>Virtual Assistance</li>
              <li>No-Code App Setup</li>
              <li>Social Media Strategy</li>
              <li>Admin & Digital Support</li>
            </ul>
          </div>
        </div>

        {/* Social / Info column */}
        <div className="flex flex-col gap-4">
          <span className="block text-xs font-bold uppercase tracking-widest text-[#e493b3]">Connect With Me</span>
          <div className="flex flex-wrap gap-4 text-xs sm:text-sm text-slate-400">
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-white transition-colors underline decoration-dotted decoration-pink-400/50"
            >
              LinkedIn
            </a>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-white transition-colors underline decoration-dotted decoration-pink-400/50"
            >
              GitHub
            </a>
            <a 
              href="https://wa.me/2349033333333" 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-white transition-colors underline decoration-dotted decoration-pink-400/50"
            >
              WhatsApp
            </a>
          </div>
          <div className="text-xs text-slate-300 mt-2">
            <span className="block font-medium text-slate-400 mb-0.5">Corporate Email:</span>
            <a href="mailto:Mira4diva@gmail.com" className="text-[#e493b3] font-semibold hover:underline">
              Mira4diva@gmail.com
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <p>© {new Date().getFullYear()} Joshua Blessing. Built for global operational success.</p>
        <p className="font-mono text-[9px] text-[#e493b3]/50 flex items-center gap-1">
          <span>Executed with Passion &amp; Elegance</span>
          <Heart className="w-2.5 h-2.5 text-rose-400 fill-rose-400/20" />
        </p>
      </div>
    </footer>
  );
}
