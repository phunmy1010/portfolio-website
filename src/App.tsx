import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeView from "./components/HomeView";
import ProjectsView from "./components/ProjectsView";
import ContactView from "./components/ContactView";
import { Briefcase, User, Settings, Mail } from "lucide-react";

export default function App() {
  const [currentTab, setTab] = useState<"home" | "projects" | "contact" >("home");

  return (
    <div className="min-h-screen bg-[#0c0a12] text-slate-100 antialiased flex flex-col pt-24 pb-20 sm:pb-8 selection:bg-pink-500/35 selection:text-white">
      {/* Dynamic Header */}
      <Header currentTab={currentTab} setTab={setTab} />

      {/* Primary Layout container */}
      <main className="flex-1 w-full flex flex-col text-slate-100">
        {currentTab === "home" && <HomeView setTab={setTab} />}
        {currentTab === "projects" && <ProjectsView setTab={setTab} />}
        {currentTab === "contact" && <ContactView setTab={setTab} />}
      </main>

      {/* Main Footer */}
      <Footer setTab={setTab} />

      {/* Persistent Bottom Mobile Navigation Bar for premium look */}
      <nav 
        className="fixed bottom-0 left-0 right-0 z-50 bg-[#120f1e]/90 backdrop-blur-md shadow-[0_-8px_30px_rgb(0,0,0,0.5)] border-t border-white/5 px-4 py-3 flex justify-around items-center rounded-t-2xl sm:hidden"
        id="persistent-bottom-nav"
      >
        <button
          onClick={() => setTab("projects")}
          className={`flex flex-col items-center justify-center transition-all cursor-pointer ${
            currentTab === "projects"
              ? "bg-gradient-to-r from-pink-500 to-rose-400 text-white px-4 py-1.5 rounded-full shadow-lg shadow-pink-500/10"
              : "text-slate-400 hover:text-white"
          }`}
          title="Work Highlights"
        >
          <Briefcase className="w-4 h-4" />
          <span className="text-[10px] font-sans font-medium mt-0.5">Work</span>
        </button>

        <button
          onClick={() => {
            setTab("home");
            // Soft-scroll to introduction section after short layout tick
            setTimeout(() => {
              window.scrollTo({ top: 400, behavior: "smooth" });
            }, 50);
          }}
          className={`flex flex-col items-center justify-center transition-all cursor-pointer ${
            currentTab === "home"
              ? "bg-gradient-to-r from-pink-500 to-rose-400 text-white px-4 py-1.5 rounded-full shadow-lg shadow-pink-500/10"
              : "text-slate-400 hover:text-white"
          }`}
          title="About Me background"
        >
          <User className="w-4 h-4" />
          <span className="text-[10px] font-sans font-medium mt-0.5">About</span>
        </button>

        <button
          onClick={() => {
            setTab("home");
            // Soft-scroll to services / capabilities after short layout tick
            setTimeout(() => {
              window.scrollTo({ top: 1200, behavior: "smooth" });
            }, 50);
          }}
          className="flex flex-col items-center justify-center transition-all cursor-pointer text-slate-400 hover:text-white"
          title="Process Design & Services"
        >
          <Settings className="w-4 h-4" />
          <span className="text-[10px] font-sans font-medium mt-0.5">Services</span>
        </button>

        <button
          onClick={() => setTab("contact")}
          className={`flex flex-col items-center justify-center transition-all cursor-pointer ${
            currentTab === "contact"
              ? "bg-gradient-to-r from-pink-500 to-rose-400 text-white px-4 py-1.5 rounded-full shadow-lg shadow-pink-500/10"
              : "text-slate-400 hover:text-white"
          }`}
          title="Get in Touch"
        >
          <Mail className="w-4 h-4" />
          <span className="text-[10px] font-sans font-medium mt-0.5">Contact</span>
        </button>
      </nav>
    </div>
  );
}
