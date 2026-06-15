import React, { useState } from 'react';
import { Menu, X, Terminal, ArrowUpRight, Code2 } from 'lucide-react';
import { ActiveTab } from '../types';

interface NavbarProps {
  activeTab: ActiveTab;
  onNavigate: (tab: ActiveTab) => void;
}

export default function Navbar({ activeTab, onNavigate }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItemsByTitle: { key: ActiveTab; label: string }[] = [
    { key: 'home', label: 'Home' },
    { key: 'about', label: 'About Journey' },
    { key: 'projects', label: 'Projects Workbench' },
    { key: 'contact', label: 'Contact' }
  ];

  const handleLinkClick = (tabKey: ActiveTab) => {
    onNavigate(tabKey);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-805 bg-[#0a0a0a]/90 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Brand on Left */}
          <div 
            id="nav-logo-mark"
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-2 cursor-pointer group shrink-0 select-none animate-fade-in"
          >
            <span className="text-xl font-black italic tracking-wider text-white uppercase group-hover:text-[#00ff88] transition-colors">
              KEITH<span className="text-[#00ff88]">.DEV</span>
            </span>
          </div>

          {/* Core horizontal links deck (Desktop only) */}
          <div className="hidden md:flex items-center gap-10">
            {navItemsByTitle.map((item) => {
              const isSelected = activeTab === item.key;
              return (
                <button
                  key={item.key}
                  id={`nav-link-${item.key}`}
                  onClick={() => handleLinkClick(item.key)}
                  className={`nav-link cursor-pointer font-bold tracking-widest text-[12px] uppercase transition-all relative py-1 ${
                    isSelected
                      ? 'text-white underline underline-offset-8 decoration-2 decoration-[#00ff88]'
                      : 'text-zinc-500 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Social button or mini action */}
          <div className="hidden md:block shrink-0">
            <a
              id="nav-github-link"
              href="https://github.com/seraphkeith"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-2xs font-mono font-bold text-zinc-500 hover:text-[#00ff88] transition-colors cursor-pointer"
            >
              <span>seraphkeith</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-zinc-650 group-hover:text-[#00ff88]" />
            </a>
          </div>

          {/* Mobile hamburger toggle (Mobile only) */}
          <div className="md:hidden shrink-0">
            <button
              id="nav-mobile-hamburger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-900 cursor-pointer"
              title={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="h-5.5 w-5.5" /> : <Menu className="h-5.5 w-5.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Hamburger Dropdown Panel Drawer (Mobile only) */}
      {mobileMenuOpen && (
        <div id="nav-mobile-dropdown" className="md:hidden border-t border-zinc-805 bg-black p-4 space-y-2">
          {navItemsByTitle.map((item) => {
            const isSelected = activeTab === item.key;
            return (
              <button
                key={item.key}
                id={`nav-mobile-link-${item.key}`}
                onClick={() => handleLinkClick(item.key)}
                className={`w-full text-left p-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  isSelected
                    ? 'text-black bg-[#00ff88]'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          
          <div className="border-t border-zinc-805 pt-3 flex items-center justify-between text-3xs font-mono text-zinc-650">
            <span>Portfolio active timeline</span>
            <a 
              href="https://github.com/seraphkeith" 
              target="_blank" 
              rel="noreferrer"
              className="text-[#00ff88]"
            >
              github.com/seraphkeith
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
