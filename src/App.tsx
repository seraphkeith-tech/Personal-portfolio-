import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Github, Heart, Globe, Terminal, Code2 } from 'lucide-react';
import { ActiveTab } from './types';

// Components
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-200 font-sans selection:bg-[#00ff88]/30 selection:text-white flex flex-col justify-between relative overflow-hidden">
      
      {/* Dynamic background radial glows (Bold Cyber theme) */}
      <div className="absolute top-0 left-1/4 -ml-40 h-[400px] w-[400px] rounded-full bg-[#00ff88]/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-[30%] right-1/4 h-[400px] w-[400px] rounded-full bg-white/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-[10%] h-[300px] w-[300px] rounded-full bg-[#00ff88]/5 blur-[100px] pointer-events-none" />

      {/* Primary header & Navigation */}
      <Navbar activeTab={activeTab} onNavigate={setActiveTab} />

      {/* Main Core Viewport area */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 z-10 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="focus:outline-none"
          >
            {activeTab === 'home' && <Home onNavigate={setActiveTab} />}
            {activeTab === 'about' && <About onNavigate={setActiveTab} />}
            {activeTab === 'projects' && <Projects />}
            {activeTab === 'contact' && <Contact />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Professional High-contrast bold Footer block */}
      <footer className="w-full border-t border-zinc-805 bg-[#0a0a0a] py-8 md:py-10 z-10 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div className="flex flex-wrap gap-8">
            <div className="space-y-1">
              <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-[0.15em]">Contact Channel</p>
              <p className="text-sm font-bold text-white hover:text-[#00ff88] transition-colors">
                <a id="footer-email" href="mailto:seraphkeith@gmail.com">seraphkeith@gmail.com</a>
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-[0.15em]">Github Profile</p>
              <p className="text-sm font-bold text-white hover:text-[#00ff88] transition-colors">
                <a id="footer-github" href="https://github.com/seraphkeith" target="_blank" rel="noreferrer">github.com/seraphkeith</a>
              </p>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-[0.15em] mb-1">Employment Status</p>
            <div className="flex gap-2 sm:justify-end items-center">
              <div className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse"></div>
              <span className="text-xs font-bold text-white uppercase tracking-wider">Available for Hire // Open Projects</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
