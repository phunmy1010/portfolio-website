import { motion } from "motion/react";
import blessingProfileImg from "../assets/images/blessing_profile_portrait.png";
import { useRef, useState, useEffect, ChangeEvent } from "react";
import { 
  ArrowRight, 
  CheckCircle, 
  Sparkles, 
  Layout, 
  UserCheck, 
  Blocks, 
  Share2, 
  Search, 
  Briefcase, 
  Layers, 
  Heart,
  ArrowUpRight,
  Camera
} from "lucide-react";

interface HomeViewProps {
  setTab: (tab: "home" | "projects" | "contact") => void;
}

export default function HomeView({ setTab }: HomeViewProps) {
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
  // Service card definitions
  const SERVICES = [
    {
      title: "UI/UX Design",
      description: "Crafting wireframes, responsive mobile-first prototypes, and user interfaces in Figma with pixel-perfect visual execution.",
      icon: Layout,
      color: "from-pink-500/20 to-rose-500/5",
      badge: "Design"
    },
    {
      title: "Virtual Assistance",
      description: "Managing calendars, client communication, and scheduling to keep founders and enterprise leaders optimized daily.",
      icon: UserCheck,
      color: "from-violet-500/20 to-indigo-500/5",
      badge: "Productivity"
    },
    {
      title: "No-Code App Building",
      description: "Deploying rapid, robust web interfaces and operational portals using Webflow, Framer, and integrated database connections.",
      icon: Blocks,
      color: "from-amber-500/20 to-yellow-500/5",
      badge: "Development"
    },
    {
      title: "Social Media Management",
      description: "Curating aesthetic feed designs, scheduling consistent brand posts, and creating high-impact campaign assets.",
      icon: Share2,
      color: "from-teal-500/20 to-emerald-500/5",
      badge: "Growth"
    },
    {
      title: "Product Research",
      description: "Analyzing competitor mechanics, summarizing customer feedback loops, and producing actionable research reports.",
      icon: Search,
      color: "from-blue-500/20 to-cyan-500/5",
      badge: "Analysis"
    },
    {
      title: "Administrative Support",
      description: "Streamlining Notion workflows, structuring corporate folders, and running routine backup checks to ensure flawless delivery.",
      icon: Briefcase,
      color: "from-fuchsia-500/20 to-purple-500/5",
      badge: "Operations"
    }
  ];

  // Professional Core Skills Group
  const SKILLS_GROUP = [
    { name: "Figma", category: "Core Design" },
    { name: "Canva", category: "Graphics" },
    { name: "Notion Workspaces", category: "Organization" },
    { name: "Google Workspace", category: "Admin" },
    { name: "AppSheet", category: "No-Code" },
    { name: "ChatGPT & AI tools", category: "Productivity" },
    { name: "Wireframing", category: "UX Delivery" },
    { name: "UI Research", category: "Figma" },
    { name: "High-level Communication", category: "Soft Skill" },
    { name: "Product Brief", category: "Analysis" },
    { name: "No-code structures", category: "Dev" }
  ];

  // Testimonials
  const TESTIMONIALS = [
    {
      quote: "Working with Blessing has been a really good experience for my business. She helped improve our online presence by designing a clean and professional webpage for AB PRIME MOBILE COMMUNICATION that properly showcases our gadget sales, swapping, and repair services.\n\nShe also assists with managing our social media page, helping us stay active online and present our business in a more organized and attractive way. I appreciate her creativity, communication, and willingness to listen to ideas while still bringing professional suggestions to the table.\n\nSince working with her, our brand looks more polished and trustworthy online. I would definitely recommend her to businesses looking for digital support, UI/UX design, or social media assistance.",
      author: "Ebuka",
      role: "CEO, AB Prime Mobile Communication • Benin City",
      avatar: "/src/assets/images/prime_communication_flyer_1780063457775.png"
    },
    {
      quote: "Blessing transformed how our salon is positioned online. She designed a stunning, modern digital service menu and eye-catching social templates that match the luxury experience at Horizon Mega Unisex Salon. She also helped structure our online scheduling, making bookings incredibly easy for our clients here in Benin City. Her focus on premium aesthetics, clear communication, and operational organization has made a massive difference for our business!",
      role: "Founder, Horizon Mega Unisex Salon • Benin City",
      workDeliverables: [
        {
          title: "Horizon Salon Brand Visual",
          imageUrl: "/src/assets/images/horizon_salon_mockup_1780064689478.png"
        }
      ]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="space-y-20 pb-20 w-full"
    >
      {/* Hero Section */}
      <section className="px-6 pt-12 md:pt-20 pb-12 max-w-5xl mx-auto relative">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-pink-500/10 rounded-full blur-[100px] pointer-events-none z-0"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-violet-600/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7 space-y-6 text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-pink-500/15 border border-pink-500/20 text-[#e493b3] font-sans text-xs font-semibold uppercase tracking-wider rounded-full shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Benin City, Nigeria • Remote Global Deliveries</span>
            </span>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-white">
              Blessing Joshua
            </h1>
            
            <p className="font-sans text-lg sm:text-xl font-medium text-amber-100/90 tracking-wide">
              UI/UX Designer <span className="text-pink-400">•</span> Virtual Assistant <span className="text-pink-400">•</span> No-Code Builder
            </p>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl font-sans">
              I am a multi-talented tech specialist combining high-end visual design precision, seamless administrative operations, and rapid no-code development to help business leaders succeed globally.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => setTab("projects")}
                className="bg-gradient-to-r from-pink-500 to-rose-400 hover:opacity-95 text-white font-sans font-bold text-xs uppercase tracking-widest px-6 py-3.5 rounded-xl shadow-lg shadow-pink-500/20 transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <span>View Portfolio Projects</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setTab("contact")}
                className="bg-white/5 hover:bg-white/10 text-slate-200 font-sans font-bold text-xs uppercase tracking-widest px-6 py-3.5 rounded-xl border border-white/10 transition-all active:scale-95 cursor-pointer"
              >
                Contact Me
              </button>
            </div>
          </div>

          {/* Right side: Elegant Display Headshot matching the uploaded style */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative group/profile w-full aspect-square max-w-[340px] select-none">
              {/* Floating aesthetic badges */}
              <motion.div
                initial={{ scale: 0.95, y: 8 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ repeat: Infinity, repeatType: "reverse", duration: 3.5, ease: "easeInOut" }}
                className="absolute -top-3 -right-3 bg-[#13101e]/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl z-30 border border-pink-500/20 flex items-center gap-2"
              >
                <div className="bg-pink-500/20 p-1 rounded-full">
                  <CheckCircle className="w-4 h-4 text-[#e493b3]" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[9px] font-bold text-white tracking-widest uppercase">Client Joy</span>
                  <span className="text-[8px] text-slate-300">Stellar Support</span>
                </div>
              </motion.div>

              {/* Glowing Gradient Aura Backdrop - Increases intensity & size on hover */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-pink-500/30 to-violet-500/40 rounded-[38px] blur-2xl opacity-70 group-hover/profile:opacity-100 group-hover/profile:scale-[1.04] transition-all duration-500 ease-out z-0"></div>
              
              {/* Thin Glowing Outline Contour Wrapper - Grows brighter on hover */}
              <div className="absolute -inset-[1px] bg-gradient-to-tr from-white/10 via-pink-500/20 to-violet-500/30 rounded-[38px] group-hover/profile:from-pink-500/55 group-hover/profile:to-violet-500/55 transition-all duration-500 ease-out z-10"></div>
              
              {/* Frosted Glass Card Container */}
              <div className="relative z-20 w-full h-full bg-white/[0.04] backdrop-blur-xl rounded-[38px] border border-white/10 p-3 shadow-2xl flex items-center justify-center transform group-hover/profile:-translate-y-2 group-hover/profile:scale-[1.01] transition-all duration-500 ease-out">
                {/* Image Frame Container */}
                <div 
                  onClick={handleAvatarClick}
                  className="w-full h-full rounded-[28px] overflow-hidden bg-black/30 border border-white/5 relative cursor-pointer group/image"
                  title="Click to upload headshot nw.jpeg exactly"
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <img
                    alt="Blessing Joshua Portrait Profile"
                    className="w-full h-full object-cover group-hover/profile:scale-[1.04] group-hover/image:scale-[1.05] transition-all duration-500 ease-out"
                    src={imgSrc}
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle glass reflection overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10 pointer-events-none group-hover/image:from-black/40 transition-all duration-500"></div>
                  {/* Elegant overlay on image hover to prompt uploader */}
                  <div className="absolute inset-0 bg-black/55 opacity-0 group-hover/image:opacity-100 flex flex-col items-center justify-center gap-1.5 transition-opacity duration-300">
                    <Camera className="w-6 h-6 text-pink-300" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#e493b3]">Upload exact photo</span>
                  </div>
                </div>
              </div>

              {/* Infinite glowing accent dot */}
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-pink-500/20 rounded-full blur-2xl z-0 group-hover/profile:bg-pink-500/30 transition-all duration-500"></div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="mx-4 sm:mx-6 lg:mx-auto bg-gradient-to-b from-[#13101a] to-[#0c0a12] rounded-[24px] sm:rounded-[40px] px-6 sm:px-8 py-10 sm:py-14 max-w-5xl border border-white/5 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-500/5 rounded-full blur-2xl"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 relative z-10">
          <div className="md:col-span-4 text-left space-y-3">
            <span className="block text-xs font-bold uppercase tracking-widest text-[#e493b3]">About Blessing</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
              My Creative &amp; Support Philosophy
            </h2>
            <div className="h-0.5 w-16 bg-gradient-to-r from-pink-400 to-amber-200 rounded"></div>
          </div>
          
          <div className="md:col-span-8 text-left text-slate-300 space-y-5 text-sm sm:text-base leading-relaxed font-sans">
            <p>
              I help modern businesses and busy executives improve digital experiences by offering a powerful combination of creative design, structured organization, and technological agility. 
            </p>
            <p>
              My professional interest is rooted in <span className="text-white font-medium">UI/UX Design</span>, <span className="text-white font-medium">productivity workflows</span>, and <span className="text-white font-medium">high-end operations</span>. Whether building an interface mock-up, setting up Notion tracking charts, managing customer engagement, or analyzing product patterns, my goal remains constant: delivering clean, elegant, and functional results.
            </p>
            <p>
              Applying a passionate Nigerian creative tech perspective, I understand how to design for accessibility while maintaining international standards of professionalism. Let’s clean up your layout, sort your admin queues, and elevate your brand presence together.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="px-6 max-w-5xl mx-auto space-y-12">
        <div className="text-left space-y-2">
          <span className="block text-xs font-bold uppercase tracking-widest text-[#e493b3]">My Professional Offerings</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">Services I Provide</h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-lg">
            Versatile digital support designed to take technical and operational tasks off your shoulders.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((srv, index) => {
            const IconComponent = srv.icon;
            return (
              <div 
                key={index}
                className="group relative bg-[#13111c] border border-white/5 rounded-3xl p-6 hover:-translate-y-1 transition-all duration-300 shadow-md hover:shadow-xl hover:border-pink-500/15 overflow-hidden"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                
                <div className="flex justify-between items-start mb-6">
                  <div className={`p-3 rounded-2xl bg-gradient-to-r ${srv.color} text-pink-300`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-widest bg-white/5 px-2.5 py-1 text-slate-300 rounded-md">
                    {srv.badge}
                  </span>
                </div>

                <div className="space-y-2 text-left">
                  <h3 className="font-sans font-bold text-base text-white group-hover:text-pink-300 transition-colors uppercase tracking-wide">
                    {srv.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                    {srv.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Selected Bento Box Workspace Details (Image highlights) */}
      <section className="px-6 w-full max-w-5xl mx-auto space-y-8">
        <h3 className="font-serif text-2xl sm:text-3xl text-left text-white max-w-lg leading-tight">
          Visual Sneak-Peek of My Design Standard:
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {/* Bento Block 1 */}
          <div className="md:col-span-12 lg:col-span-8 bg-[#13111c]/80 border border-white/5 rounded-3xl p-6 text-left flex flex-col justify-between overflow-hidden relative">
            <div className="space-y-2 relative z-10">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Case Study Mockup Overview</span>
              <h4 className="font-sans font-bold text-lg text-white">Grid-Based Product Curations</h4>
              <p className="text-xs text-slate-400 max-w-md">Our high-fidelity design standards focus on spacing, visual trust indicators, and intuitive comparative layouts that elevate conversions.</p>
            </div>
            
            <div className="mt-6 border border-white/10 rounded-2xl overflow-hidden aspect-[16/9] shadow-inner bg-[#0c0a12]">
              <img 
                alt="Product curation specs mockup layout screenshot" 
                src="/src/assets/images/ab_prime_mockup_1780061686438.png"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-300"
              />
            </div>
          </div>

          {/* Bento Block 2 */}
          <div className="md:col-span-12 lg:col-span-4 bg-gradient-to-br from-pink-500/10 via-transparent to-transparent border border-white/5 rounded-3xl p-6 text-left flex flex-col justify-between relative">
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-[#e493b3] uppercase tracking-widest">Fintech Design Clarity</span>
              <h4 className="font-sans font-bold text-lg text-white">NaijaStable High-End UX</h4>
              <p className="text-xs text-slate-400">Simplified, Pidgin-first interface structures designed specifically for accessibility and extreme local user retention.</p>
            </div>
            
            <div className="mt-6 border border-white/15 rounded-2xl overflow-hidden aspect-[4/3] bg-[#0c0a12] shadow-xl">
              <img 
                alt="NaijaStable Mobile Mockup UI screenshot snippet" 
                src="/src/assets/images/naijastable_oga_mockup_1780062604140.png"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Open Source Contribution Section */}
      <section className="px-6 max-w-5xl mx-auto space-y-8">
        <div className="text-left space-y-2">
          <span className="block text-xs font-bold uppercase tracking-widest text-[#e493b3]">Open Source Contribution</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">Community Curation</h2>
        </div>

        <div className="group relative bg-[#13111c] border border-white/5 rounded-3xl p-6 sm:p-8 hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl hover:border-pink-500/15 overflow-hidden text-left">
          {/* Ambient Hover Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6 relative z-10">
            <div className="space-y-1">
              <span className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-widest">
                Organisation
              </span>
              <h4 className="text-sm font-bold text-[#e493b3] uppercase tracking-wider">
                Waldron Lab · Outreachy Program
              </h4>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="text-[9px] font-bold uppercase tracking-widest bg-pink-500/15 border border-pink-500/10 px-2.5 py-1 text-pink-300 rounded-md">
                Open Source
              </span>
              <span className="text-[9px] font-bold uppercase tracking-widest bg-white/5 px-2.5 py-1 text-slate-300 rounded-md">
                Ongoing
              </span>
            </div>
          </div>

          <div className="space-y-4 relative z-10">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                Role &amp; Project
              </span>
              <h3 className="font-sans font-bold text-lg sm:text-xl text-white group-hover:text-pink-300 transition-colors">
                BugSigDB — Open Source Contributor
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              Contributing to BugSigDB, an academic database cataloguing microbial signatures from published research. Work includes curating peer-reviewed studies, extracting experimental metadata, and submitting structured records via GitHub for community review.
            </p>

            {/* Details Tags */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5 items-center">
              <span className="text-[10px] font-bold uppercase text-slate-400 mr-2">Details:</span>
              <span className="bg-white/5 border border-white/5 px-3 py-1 rounded-lg text-xs text-slate-300">
                Literature curation
              </span>
              <span className="bg-white/5 border border-white/5 px-3 py-1 rounded-lg text-xs text-slate-300">
                GitHub contributions
              </span>
              <span className="bg-white/5 border border-white/5 px-3 py-1 rounded-lg text-xs text-slate-300">
                Microbiome research
              </span>
            </div>
          </div>

          <div className="mt-8 flex justify-start relative z-10">
            <a 
              href="https://github.com/waldronlab/BugSigDB/issues?q=author%3Aphunmy1010"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-gradient-to-r from-pink-500/10 to-violet-500/5 hover:from-pink-500/20 hover:to-violet-500/15 border border-pink-500/20 hover:border-pink-500/30 text-slate-200 hover:text-white font-sans font-bold text-xs uppercase tracking-widest px-5 py-3.5 rounded-xl transition-all shadow-sm cursor-pointer"
            >
              <span>View Issue Contributions on GitHub</span>
              <ArrowUpRight className="w-4 h-4 text-[#e493b3]" />
            </a>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="px-6 max-w-5xl mx-auto space-y-12">
        <div className="text-left space-y-2">
          <span className="block text-xs font-bold uppercase tracking-widest text-[#e493b3]">My Toolbox</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">Technologies &amp; Competencies</h2>
          <p className="text-xs sm:text-sm text-slate-400">
            A comprehensive stack of specialized tools and skills that make me a versatile digital remote operator.
          </p>
        </div>

        {/* Custom Bento Pill Group */}
        <div className="flex flex-wrap gap-3.5 justify-start">
          {SKILLS_GROUP.map((skill, index) => (
            <div 
              key={index}
              className="bg-[#13111c]/90 hover:bg-[#1c1929] border border-white/5 py-3 px-4.5 rounded-2xl flex flex-col items-start gap-1 transition-all hover:border-pink-500/20 shadow-sm cursor-default"
            >
              <span className="text-xs sm:text-sm font-semibold text-white tracking-wide">{skill.name}</span>
              <span className="text-[8px] uppercase tracking-widest text-slate-400">{skill.category}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-6 max-w-5xl mx-auto space-y-12">
        <div className="text-left space-y-2">
          <span className="block text-xs font-bold uppercase tracking-widest text-[#e493b3]">Client Love</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">What People Say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((test, idx) => (
            <div 
              key={idx}
              className="bg-[#13111c] border border-white/5 p-6 rounded-3xl flex flex-col justify-between text-left space-y-6 relative overflow-hidden shadow-md font-sans"
            >
              <div className="absolute top-4 right-4 text-[40px] font-serif font-black text-white/5 select-none leading-none">“</div>
              
              <div className="space-y-4">
                <p className="text-slate-300 italic text-xs sm:text-sm leading-relaxed font-sans relative z-10 whitespace-pre-line">
                  "{test.quote}"
                </p>

                {('workDeliverables' in test) && test.workDeliverables?.map((deliverable, dIdx) => (
                  <div key={dIdx} className="relative group rounded-2xl overflow-hidden border border-white/10 aspect-square bg-[#0b0914] mt-2">
                    <img 
                      src={deliverable.imageUrl} 
                      alt={deliverable.title} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
              
              <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                {test.avatar && (
                  <img 
                    src={test.avatar} 
                    alt={test.author || ""} 
                    referrerPolicy="no-referrer"
                    className={`w-9 h-9 ${test.avatar.includes('flyer') || test.avatar.includes('mockup') ? 'rounded-lg' : 'rounded-full'} object-cover border border-pink-400/20`}
                  />
                )}
                <div>
                  {test.author && <h4 className="font-sans font-bold text-xs text-white">{test.author}</h4>}
                  <p className="text-[10px] text-slate-400">{test.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
