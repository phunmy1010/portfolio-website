import React, { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { 
  ArrowLeft, 
  ArrowRight, 
  Clock, 
  Mail, 
  MessageSquare, 
  Code, 
  Send, 
  Sparkles, 
  Check, 
  Copy, 
  Linkedin, 
  PhoneCall 
} from "lucide-react";
import { ChatMessage } from "../types";

interface ContactViewProps {
  setTab: (tab: "home" | "projects" | "contact") => void;
}

export default function ContactView({ setTab }: ContactViewProps) {
  // Chat state management
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "init",
      sender: "ai",
      text: "Hello! I am Joshua's AI Representative Twin. Let's discuss her visual portfolio, project hosting, virtual assistance schedules, Canva asset design, or custom no-code setups. What kind of business support are you looking for?",
      timestamp: new Date(),
    },
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  // Auto-scroll conversational logs
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("Mira4diva@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: inputVal.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            sender: m.sender,
            text: m.text,
          })),
        }),
      });

      const data = await response.json();
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: data.text || "I am experiencing a momentary lag, but Joshua would love to talk service! Please reach out to her corporate email directly at Mira4diva@gmail.com.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error("AI Chat error:", err);
      const aiErrorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: "I am offline right now, but feel free to review Joshua's Case Studies, or drop her a mail at Mira4diva@gmail.com!",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiErrorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.45 }}
      className="max-w-4xl mx-auto px-6 py-12 space-y-8"
    >
      {/* View Header with back trigger */}
      <div className="flex justify-between items-center border-b border-white/5 pb-4">
        <h2 className="font-serif text-white font-bold text-lg md:text-xl">Contact &amp; Assistance</h2>
        <button
          onClick={() => setTab("home")}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white font-bold transition-all uppercase tracking-wider cursor-pointer bg-white/5 border border-white/5 hover:border-white/10 px-3.5 py-1.5 rounded-lg"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#e493b3]" />
          <span>Back</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Communication Links */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-3 text-left">
            <h1 className="font-serif text-3xl sm:text-4xl font-bold bg-gradient-to-r from-pink-300 via-rose-200 to-amber-200 bg-clip-text text-transparent tracking-tight leading-tight">
              Let’s Connect
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              Looking for a project quote, customized virtual assistance schedules, or administrative support? Get in touch and let's configure your operational success.
            </p>
          </div>

          {/* Quick links stacked list */}
          <div className="space-y-4">
            {/* Email Me */}
            <div className="group bg-[#13111c] border border-white/5 rounded-2xl p-4 transition-all duration-200 hover:shadow-lg hover:border-pink-500/10 text-left">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-tr from-pink-500/20 to-rose-400/20 text-pink-300 rounded-xl">
                    <Mail className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-xs text-white">Direct Email</h4>
                    <p className="font-mono text-xs text-slate-400 break-all pt-0.5">
                      Mira4diva@gmail.com
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="text-slate-400 hover:text-white transition-colors p-1"
                  title="Copy email address"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Chat on WhatsApp */}
            <a
              href="https://wa.me/2349033333333"
              target="_blank"
              rel="noreferrer"
              className="block group bg-[#13111c] border border-white/5 rounded-2xl p-4 transition-all duration-200 hover:shadow-lg hover:border-teal-500/10 text-left"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-tr from-teal-500/20 to-emerald-400/20 text-emerald-300 rounded-xl">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-sans font-bold text-xs text-white">WhatsApp chat</h4>
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    </div>
                    <p className="text-xs text-slate-400 pt-0.5">Typically responds instantly</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="block group bg-[#13111c] border border-white/5 rounded-2xl p-4 transition-all duration-200 hover:shadow-lg hover:border-blue-500/10 text-left"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-tr from-blue-500/20 to-sky-400/20 text-sky-300 rounded-xl">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-xs text-white">LinkedIn Hub</h4>
                    <p className="text-xs text-slate-400 pt-0.5">Professional credentials &amp; posts</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="block group bg-[#13111c] border border-white/5 rounded-2xl p-4 transition-all duration-200 hover:shadow-lg hover:border-slate-500/10 text-left"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-tr from-slate-500/20 to-slate-400/20 text-slate-300 rounded-xl">
                    <Code className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-xs text-white">GitHub Showcase</h4>
                    <p className="text-xs text-slate-400 pt-0.5">Review codebase patterns</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
          </div>

          {/* Response metrics warning badge */}
          <div className="flex items-center gap-2 text-xs text-slate-400 font-sans justify-center sm:justify-start">
            <Clock className="w-4 h-4 text-pink-300" />
            <span>Operational within Benin City (UTC+1) hours.</span>
          </div>
        </div>

        {/* Right Column: Interactive AI Twin Portfolio chat widget */}
        <div className="lg:col-span-7 bg-[#13111c] border border-white/5 rounded-3xl p-5 shadow-2xl space-y-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/5 rounded-full blur-2xl pointer-events-none"></div>
          
          <div className="flex items-center gap-2 border-b border-white/5 pb-3">
            <div className="bg-pink-500/20 p-2 rounded-xl text-[#e493b3]">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div className="text-left">
              <h3 className="font-sans font-bold text-sm text-white">Joshua’s AI Twin</h3>
              <p className="text-[10px] text-slate-400">Instant responses regarding services, design, &amp; rates</p>
            </div>
          </div>

          {/* Chat log body */}
          <div className="h-[280px] overflow-y-auto pr-1 space-y-3 custom-scrollbar text-left p-2 rounded-lg bg-[#0c0a12] border border-white/5">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col max-w-[85%] ${
                  msg.sender === "user" ? "ml-auto items-end" : "mr-auto items-start"
                }`}
              >
                <div
                  className={`rounded-2xl p-3 text-xs leading-relaxed font-sans ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-pink-500 to-rose-400 text-white rounded-tr-none shadow-md shadow-pink-500/5"
                      : "bg-[#1c1929] text-slate-200 border border-white/5 rounded-tl-none shadow-sm"
                  }`}
                >
                  <p>{msg.text}</p>
                </div>
                <span className="text-[9px] text-slate-400 mt-1 px-1 font-mono">
                  {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 text-slate-400 p-2">
                <span className="w-1.5 h-1.5 bg-pink-300 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                <span className="w-1.5 h-1.5 bg-pink-300 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                <span className="w-1.5 h-1.5 bg-pink-300 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
              </div>
            )}
            <div ref={scrollRef} />
          </div>

          {/* Chat Input form container */}
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask about Figma designs, rates, hours, or no-code..."
              className="flex-1 bg-[#0c0a12] border border-white/10 text-xs font-sans rounded-xl p-3 text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-pink-400"
              disabled={isTyping}
            />
            <button
              type="submit"
              disabled={isTyping}
              className="bg-gradient-to-r from-pink-500 to-rose-400 hover:opacity-95 text-white p-3.5 rounded-xl transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center shadow-md shadow-pink-500/10"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
