import { Sparkles, MessageSquare } from "lucide-react";

interface HeaderProps {
  currentTab: "home" | "projects" | "contact";
  setTab: (tab: "home" | "projects" | "contact") => void;
}

export default function Header({ currentTab, setTab }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-[100] bg-[#0c0a12]/85 backdrop-blur-md px-6 py-4 flex justify-between items-center border-b border-white/5 shadow-lg">
      <button 
        onClick={() => setTab("home")} 
        className="font-serif text-2xl font-bold tracking-tight bg-gradient-to-r from-pink-300 via-rose-200 to-amber-200 bg-clip-text text-transparent hover:opacity-90 transition-opacity cursor-pointer flex items-center gap-2"
        id="header-brand"
      >
        <span>Joshua.B</span>
      </button>

      <div className="flex items-center gap-4">
        {/* Navigation links for Desktop */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider">
          <button
            onClick={() => setTab("home")}
            className={`transition-all duration-200 cursor-pointer ${
              currentTab === "home" 
                ? "text-[#e493b3] shadow-[0_1px_0_0_#e493b3]" 
                : "text-slate-400 hover:text-white"
            }`}
          >
            Home / About
          </button>
          <button
            onClick={() => setTab("projects")}
            className={`transition-all duration-200 cursor-pointer ${
              currentTab === "projects" 
                ? "text-[#e493b3] shadow-[0_1px_0_0_#e493b3]" 
                : "text-slate-400 hover:text-white"
            }`}
          >
            Portfolio Work
          </button>
          <button
            onClick={() => setTab("contact")}
            className={`transition-all duration-200 cursor-pointer ${
              currentTab === "contact" 
                ? "text-[#e493b3] shadow-[0_1px_0_0_#e493b3]" 
                : "text-slate-400 hover:text-white"
            }`}
          >
            Get In Touch
          </button>
        </nav>

        {/* Headshot & Contact quick-trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setTab("contact")}
            className="hidden sm:flex items-center gap-1.5 bg-gradient-to-r from-pink-500/20 to-violet-500/10 hover:from-pink-500/30 hover:to-violet-500/20 text-[#f3f1f6] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-xl border border-pink-500/25 transition-all duration-200 active:scale-95 shadow-sm"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#e493b3]" />
            <span>Chat AI</span>
          </button>

          <div className="w-9 h-9 rounded-full overflow-hidden border border-rose-400/20 shadow-inner">
            <img
              alt="Joshua Blessing Headshot"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2HxdExWqCFV6xYDKe_avj19SEuMOAJvfF-bPzxlZH7a1sdY2rrlF73JKkHzSkVw5TQNY_GvsC1GPgLykCxJo7uIumU2x1B-NbvldeNBT24dytZJ2Zoq2STMAWRDJ_m0_vLZzIXXPz--Odz7pXMKSehquK8Z6MT54beLje6oNMlfuS-AByKp3r5TDu2YsUR4_m_F7z2mf5FaipS4cOt2vRn0EoZfp9SNWf5h__CYEOypGtlDjInay82rhu02MJgeUqsgcax-lvYB1H"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
