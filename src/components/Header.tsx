import { Sparkles, MessageSquare, Camera } from "lucide-react";
import blessingProfileImg from "../assets/images/blessing_profile_portrait.png";
import { useRef, useState, useEffect, ChangeEvent } from "react";

interface HeaderProps {
  currentTab: "home" | "projects" | "contact";
  setTab: (tab: "home" | "projects" | "contact") => void;
}

export default function Header({ currentTab, setTab }: HeaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imgSrc, setImgSrc] = useState(`${blessingProfileImg}?v=${Date.now()}`);

  useEffect(() => {
    const handleUpdate = () => {
      setImgSrc(`${blessingProfileImg}?v=${Date.now()}`);
    };
    window.addEventListener("profile-picture-updated", handleUpdate);
    return () => {
      window.removeEventListener("profile-picture-updated", handleUpdate);
    };
  }, []);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const arrayBuffer = await file.arrayBuffer();
      const response = await fetch("/api/upload-headshot", {
        method: "POST",
        headers: {
          "Content-Type": file.type || "image/jpeg",
        },
        body: arrayBuffer,
      });

      if (response.ok) {
        window.dispatchEvent(new Event("profile-picture-updated"));
      } else {
        alert("Failed to upload image. Please try again with a valid image file.");
      }
    } catch (err) {
      console.error(err);
      alert("Error uploading image file.");
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] bg-[#0c0a12]/85 backdrop-blur-md px-6 py-4 flex justify-between items-center border-b border-white/5 shadow-lg">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      <button 
        onClick={() => setTab("home")} 
        className="font-serif text-2xl font-bold tracking-tight bg-gradient-to-r from-pink-300 via-rose-200 to-amber-200 bg-clip-text text-transparent hover:opacity-90 transition-opacity cursor-pointer flex items-center gap-2"
        id="header-brand"
      >
        <span>Blessing.J</span>
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

          <div 
            onClick={handleAvatarClick}
            className="w-9 h-9 rounded-full overflow-hidden border border-rose-400/20 shadow-inner group relative cursor-pointer"
            title="Click to upload headshot nw.jpeg exactly"
          >
            <img
              alt="Blessing Joshua Headshot"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              src={imgSrc}
              referrerPolicy="no-referrer"
            />
            {/* Elegant hover camera overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
              <Camera className="w-3.5 h-3.5 text-white/90" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
