import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Terminal, 
  Sparkles, 
  ArrowRight, 
  Mail, 
  Code2, 
  Cpu, 
  BookOpen, 
  LucideIcon,
  CheckCircle,
  Smartphone,
  Layers,
  ExternalLink,
  ChevronRight,
  Clipboard,
  Check
} from 'lucide-react';
import { ActiveTab } from '../types';

interface HomeProps {
  onNavigate: (tab: ActiveTab) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('seraphkeith@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 
    ? 'Good Morning' 
    : currentHour < 18 
      ? 'Good Afternoon' 
      : 'Good Evening';

  return (
    <div id="home-section" className="space-y-16">
      {/* Hero Header Section */}
      <section className="relative overflow-hidden rounded-none border border-zinc-805 bg-[#161616] p-8 md:p-12 lg:p-16">
        <div className="absolute top-0 right-0 -mr-24 -mt-24 h-96 w-96 rounded-full bg-[#00ff88]/5 blur-[120px]" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8 md:gap-12">
          <div className="max-w-2xl space-y-6">
            <p className="text-xs tracking-[0.3em] font-extrabold text-[#00ff88] uppercase mb-4">
              SOFTWARE PORTFOLIO // {greeting.toUpperCase()}
            </p>

            <div className="space-y-4">
              <motion.h1 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="display-text text-6xl md:text-8xl lg:text-[110px] text-white font-normal"
              >
                BUILDING<br/>
                <span className="text-[#00ff88]">DIGITAL</span><br/>
                IDEAS
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-zinc-400 text-sm leading-relaxed font-sans mt-6"
              >
                An aspiring full-stack software engineer tracing my steps from writing my very first <code className="font-mono text-[#00ff88] bg-black px-1.5 py-0.5 rounded-none text-xs">&lt;html&gt;</code> tags, surviving pure vanilla JavaScript events, mastering API payloads, and currently engineering interactive components in <span className="text-white font-bold underline decoration-[#00ff88] decoration-2">React</span>.
              </motion.p>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <button
                id="cta-explore-projects"
                onClick={() => onNavigate('projects')}
                className="group inline-flex items-center gap-2 bg-[#00ff88] hover:bg-[#00e277] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-black transition-colors rounded-none cursor-pointer"
              >
                <span>Launch Project Simulators</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                id="cta-contact"
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center gap-2 border border-zinc-750 bg-transparent px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-zinc-900 transition-colors rounded-none cursor-pointer"
              >
                <Mail className="h-4 w-4" />
                <span>Contact Details</span>
              </button>
            </motion.div>
          </div>

          {/* Quick Stats Bento card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full md:w-96 rounded-none border border-zinc-805 bg-black p-6"
          >
            <h3 className="font-mono text-[10px] uppercase tracking-widest text-[#00ff88] mb-4">Milestone Tracker</h3>
            <div className="space-y-4 font-sans text-sm">
              <div className="flex items-center justify-between border-b border-zinc-850 pb-3">
                <span className="text-zinc-400">Learning Stack Progress</span>
                <span className="font-mono text-xs text-[#00ff88] font-bold">100% Core + React</span>
              </div>
              <div className="flex items-center justify-between border-b border-zinc-850 pb-3">
                <span className="text-zinc-400">Build Index</span>
                <span className="font-mono text-xs text-white font-bold">5 Complete Apps</span>
              </div>
              <div className="flex items-center justify-between border-b border-zinc-850 pb-3">
                <span className="text-zinc-400">Live Simulators</span>
                <span className="font-mono text-xs text-white font-bold">Interactive Built-in</span>
              </div>
              <div className="flex items-center justify-between pb-1">
                <span className="text-zinc-400">Theme</span>
                <span className="font-mono text-xs text-zinc-500 uppercase font-bold tracking-tight">Bold Stark (Dark)</span>
              </div>
            </div>

            <div className="mt-6 rounded-none bg-zinc-900/60 p-3.5 border border-zinc-805 flex items-center justify-between">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="h-2 w-2 rounded-full bg-[#00ff88] animate-pulse shrink-0" />
                <span className="text-xs text-zinc-300 font-mono font-medium truncate">seraphkeith@gmail.com</span>
              </div>
              <button 
                id="home-copy-btn"
                onClick={copyEmail}
                className="p-1.5 hover:bg-zinc-800 text-zinc-500 hover:text-white transition-colors cursor-pointer"
                title="Copy developer email"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-[#00ff88]" /> : <Clipboard className="h-3.5 w-3.5" />}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bento Showcase Grid */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-white tracking-widest uppercase flex items-center gap-2">
          <Terminal className="h-5 w-5 text-[#00ff88]" />
          <span>Interactive Project Deck</span>
        </h2>
        <p className="text-zinc-400 text-sm max-w-2xl font-sans">
          Unlike ordinary screenshots, every milestone project is compiled, wired, and directly playable within my dashboard. Pick a card to run the real software!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Traffic Light */}
          <div 
            id="showcase-traffic-light"
            onClick={() => onNavigate('projects')}
            className="group relative cursor-pointer overflow-hidden rounded-none border border-zinc-805 bg-[#161616] p-6 hover:border-[#00ff88] transition-all"
          >
            <div className="flex items-start justify-between">
              <span className="text-[10px] text-[#00ff88] font-mono font-bold uppercase tracking-wider">v1.0 / Stage 1</span>
              <div className="w-2 h-2 rounded-full bg-zinc-700 group-hover:bg-[#00ff88] transition-colors"></div>
            </div>
            <h3 className="mt-4 text-2xl font-bold uppercase text-white group-hover:text-[#00ff88] transition-colors">Traffic Light</h3>
            <p className="mt-2 text-xs text-zinc-400 line-clamp-2 leading-relaxed font-sans">
              Pure HTML & CSS interval sequences with automated timing offsets and pedestrian crossings.
            </p>
            <div className="mt-4 flex gap-2">
              <span className="border border-zinc-850 px-2 py-0.5 text-[9px] text-zinc-500 font-mono">HTML</span>
              <span className="border border-zinc-850 px-2 py-0.5 text-[9px] text-zinc-500 font-mono">CSS3</span>
            </div>
          </div>

          {/* Card 2: Rock Paper Scissors */}
          <div 
            id="showcase-rps"
            onClick={() => onNavigate('projects')}
            className="group relative cursor-pointer overflow-hidden rounded-none border border-zinc-805 bg-[#161616] p-6 hover:border-[#00ff88] transition-all"
          >
            <div className="flex items-start justify-between">
              <span className="text-[10px] text-[#00ff88] font-mono font-bold uppercase tracking-wider">v2.1 / Stage 2</span>
              <div className="w-2 h-2 rounded-full bg-zinc-700 group-hover:bg-[#00ff88] transition-colors"></div>
            </div>
            <h3 className="mt-4 text-2xl font-bold uppercase text-white group-hover:text-[#00ff88] transition-colors">Rock Paper Scissors</h3>
            <p className="mt-2 text-xs text-zinc-400 line-clamp-2 leading-relaxed font-sans">
              Robust automated computations, score increments, and game action state tracking.
            </p>
            <div className="mt-4 flex gap-2">
              <span className="border border-zinc-850 px-2 py-0.5 text-[9px] text-zinc-500 font-mono">JAVASCRIPT</span>
              <span className="border border-zinc-850 px-2 py-0.5 text-[9px] text-zinc-500 font-mono">STATE</span>
            </div>
          </div>

          {/* Card 3: Weather App */}
          <div 
            id="showcase-weather"
            onClick={() => onNavigate('projects')}
            className="group relative cursor-pointer overflow-hidden rounded-none border border-zinc-805 bg-[#161616] p-6 hover:border-[#00ff88] transition-all"
          >
            <div className="flex items-start justify-between">
              <span className="text-[10px] text-[#00ff88] font-mono font-bold uppercase tracking-wider">v3.0 / Stage 3</span>
              <div className="w-2 h-2 rounded-full bg-zinc-700 group-hover:bg-[#00ff88] transition-colors"></div>
            </div>
            <h3 className="mt-4 text-2xl font-bold uppercase text-white group-hover:text-[#00ff88] transition-colors">Weather Station</h3>
            <p className="mt-2 text-xs text-zinc-400 line-clamp-2 leading-relaxed font-sans">
              Authentic remote API integration retrieving humidity, vectors, and temperature indexes.
            </p>
            <div className="mt-4 flex gap-2">
              <span className="border border-zinc-850 px-2 py-0.5 text-[9px] text-zinc-500 font-mono">FETCH</span>
              <span className="border border-zinc-850 px-2 py-0.5 text-[9px] text-zinc-500 font-mono">JSON</span>
            </div>
          </div>

          {/* Card 4: Task Management */}
          <div 
            id="showcase-tasks"
            onClick={() => onNavigate('projects')}
            className="group relative cursor-pointer overflow-hidden rounded-none border border-white bg-white text-black p-6 hover:border-[#00ff88] transition-all md:col-span-2 lg:col-span-1"
          >
            <div className="flex items-start justify-between">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-black/50">v4.0 / Stage 4</span>
              <div className="w-2 h-2 rounded-full bg-black"></div>
            </div>
            <h3 className="mt-4 text-2xl font-bold uppercase text-black">Task Board</h3>
            <p className="mt-2 text-xs text-black/80 line-clamp-2 leading-relaxed font-sans font-normal">
              Centralized user authorizations, category filters, and stateful multi-column lists.
            </p>
            <div className="mt-4 flex gap-2">
              <span className="border border-black/20 px-2 py-0.5 text-[9px] font-mono font-bold text-black/60">REACT</span>
              <span className="border border-black/20 px-2 py-0.5 text-[9px] font-mono font-bold text-black/60">AUTH</span>
            </div>
          </div>

          {/* Card 5: Pokemon Searcher */}
          <div 
            id="showcase-poke"
            onClick={() => onNavigate('projects')}
            className="group relative cursor-pointer overflow-hidden rounded-none border border-zinc-805 bg-[#161616] p-6 hover:border-[#00ff88] transition-all md:col-span-2"
          >
            <div className="flex items-start justify-between">
              <span className="text-[10px] text-[#00ff88] font-mono font-bold uppercase tracking-wider">v5.0 / Stage 5</span>
              <div className="w-2 h-2 rounded-full bg-zinc-700 group-hover:bg-[#00ff88] transition-colors"></div>
            </div>
            <h3 className="mt-4 text-2xl font-bold uppercase text-white group-hover:text-[#00ff88] transition-colors">PokeAPI Explorer</h3>
            <p className="mt-2 text-xs text-zinc-400 line-clamp-2 leading-relaxed font-sans">
              Full live state components rendering high-fidelity artwork and stats meter diagrams.
            </p>
            <div className="mt-4 flex gap-2">
              <span className="border border-zinc-805 px-2 py-0.5 text-[9px] text-zinc-500 font-mono">REACT</span>
              <span className="border border-zinc-805 px-2 py-0.5 text-[9px] text-zinc-500 font-mono">EXTERNAL API</span>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Callout */}
      <section className="rounded-none border border-zinc-850 bg-black p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-white uppercase tracking-wider">"From Standard Boilerplate to Dynamic React Flow"</h3>
            <p className="text-xs text-zinc-400 max-w-xl font-sans leading-relaxed">
              I built every interactive program on this portfolio by hand. It serves as an archive of my mistakes, achievements, and constant evolution as a self-taught engineer.
            </p>
          </div>
          <button 
            id="philosophy-more-btn"
            onClick={() => onNavigate('about')}
            className="inline-flex items-center gap-2 border border-zinc-750 hover:border-[#00ff88] bg-transparent text-white hover:bg-zinc-900 px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors rounded-none cursor-pointer whitespace-nowrap"
          >
            <span>Read About My Journey</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </section>
    </div>
  );
}
