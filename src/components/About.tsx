import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  BookOpen, 
  Code, 
  Layers, 
  Cpu, 
  Terminal, 
  ChevronRight, 
  Award, 
  Flame, 
  Clock, 
  Compass,
  ArrowRight
} from 'lucide-react';
import { ActiveTab } from '../types';

interface AboutProps {
  onNavigate: (tab: ActiveTab) => void;
}

interface TimelineItem {
  stage: string;
  title: string;
  timeframe: string;
  description: string;
  skillsAcquired: string[];
  blockerOvercome: string;
  progressPercent: number;
  icon: React.ReactNode;
}

export default function About({ onNavigate }: AboutProps) {
  const [activeStageIndex, setActiveStageIndex] = useState<number>(4); // Default to React

  const timeline: TimelineItem[] = [
    {
      stage: 'Stage 1: HTML & CSS Fundamentals',
      title: 'Building static structures & visual alignment',
      timeframe: 'The Beginning',
      description: 'Learned the absolute foundation of the open web. Understanding the Document Object Model (DOM) structure, semantic nesting, box model properties, static page styling, responsive media queries, and aligning elements smoothly.',
      skillsAcquired: ['Semantic markup', 'CSS Box Model', 'Flexbox & CSS Grid layouts', 'Media queries for adaptive styling'],
      blockerOvercome: 'Understanding how floats, flexboxes, and inline-blocks align and wrap cards appropriately on mobile viewports.',
      progressPercent: 100,
      icon: <Layers className="h-5 w-5" />
    },
    {
      stage: 'Stage 2: Core JavaScript logic',
      title: 'Injecting interactivity and condition controls',
      timeframe: 'Logic & State',
      description: 'Stepped into functional coding by introducing logical flow. Mastered conditional branches, standard parameters, arrays of configurations, event listeners, dynamic mathematical state (e.g., computers picker score in Rock Paper Scissors), and altering DOM text nodes inline.',
      skillsAcquired: ['Array manipulation', 'Mathematical offsets', 'State tracking', 'DOM event handlers'],
      blockerOvercome: 'Dealing with asynchronous event loops and keeping scoring engines synchronized between random generators.',
      progressPercent: 95,
      icon: <Code className="h-5 w-5" />
    },
    {
      stage: 'Stage 3: Engaging with External APIs',
      title: 'Asynchronous fetch payloads & standard endpoints',
      timeframe: 'Connectivity',
      description: 'Linked local projects to world servers. Implemented robust native HTTP fetches (async/await paradigm, URL parameters search), parsing complex nested JSON buffers, handling network fallbacks, loading spinners, and error alerts.',
      skillsAcquired: ['Native fetch API', 'JSON extraction', 'Async state handling', 'Error catching and notifications'],
      blockerOvercome: 'Handling non-ASCII characters, rate boundaries, and parsing deeply nested objects from PokeAPI and meteorological servers.',
      progressPercent: 90,
      icon: <Cpu className="h-5 w-5" />
    },
    {
      stage: 'Stage 4: Advanced Stateful Applications',
      title: 'Constructing robust, modular dashboards',
      timeframe: 'App Architectures',
      description: 'Graduated to building operational systems. Designed interactive client components that maintain memory-based database arrays, multi-field structures with task sorting, categories distribution, and local configuration logic.',
      skillsAcquired: ['Complex local lists state', 'Multi-attribute data filters', 'Date calculations', 'CRUD workflows'],
      blockerOvercome: 'Synchronizing filter dropdown flags, sorting actions, and persistent user-specific credentials list lists simultaneously.',
      progressPercent: 85,
      icon: <Terminal className="h-5 w-5" />
    },
    {
      stage: 'Stage 5: React Paradigm & Custom Hooks',
      title: 'Mastering modular components & declarative states',
      timeframe: 'Present / Future',
      description: 'Currently learning React. Transitioning from raw DOM manipulation to functional components, centralized states, custom filters, conditional wrapper renders, and leveraging libraries such as Tailwind CSS and Framer Motion for sleek apps.',
      skillsAcquired: ['Declarative UI architectures', 'State management (useState)', 'Effect hooks lifecycle (useEffect)', 'Tailwind CSS visual templates'],
      blockerOvercome: 'Preventing duplicate logic, memoizing callback parameters, and avoiding infinite state re-rendering sequences.',
      progressPercent: 75,
      icon: <BookOpen className="h-5 w-5" />
    }
  ];

  const currentStage = timeline[activeStageIndex];

  return (
    <div id="about-section" className="space-y-16">
      {/* Intro Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 pb-4">
        <div className="space-y-4 max-w-3xl">
          <p className="text-xs font-mono font-bold tracking-[0.3em] text-[#00ff88] uppercase">
            LEARNING TIMELINE // EVOLUTION PATH
          </p>
          <h2 className="display-text text-5xl md:text-7xl lg:text-8xl text-white font-normal uppercase leading-none">
            HOW I<br/>
            <span className="text-[#00ff88]">LEARNED</span><br/>
            TO CODE
          </h2>
          <p className="text-zinc-400 text-sm leading-relaxed font-sans max-w-2xl">
            I started coding by writing single-line styling updates. Gradually, I became obsessed with creating user interfaces that feel alive. Here is a guided breakdown of my progressive milestones as an engineer.
          </p>
        </div>
      </div>

      {/* Two-Column Stage Explorer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left column: List of stages */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-[10px] font-mono uppercase tracking-widest text-[#00ff88] pb-2 border-b border-zinc-800">
            Select a learning stage
          </div>
          {timeline.map((item, index) => {
            const isSelected = index === activeStageIndex;
            return (
              <button
                key={index}
                id={`about-stage-${index}`}
                onClick={() => setActiveStageIndex(index)}
                className={`w-full text-left p-4 rounded-none border transition-all flex items-center justify-between group cursor-pointer ${
                  isSelected 
                    ? 'border-[#00ff88] bg-[#1a1a1a] text-white' 
                    : 'border-zinc-805 bg-[#161616] text-zinc-400 hover:bg-[#222] hover:text-white hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-none border transition-all ${
                    isSelected 
                      ? 'bg-[#00ff88]/10 border-[#00ff88]/40 text-[#00ff88]' 
                      : 'bg-black border-zinc-800 text-zinc-500 group-hover:bg-zinc-900 group-hover:text-zinc-300'
                  }`}>
                    {item.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-tight">{item.timeframe}</div>
                    <div className={`text-sm font-bold truncate transition-colors uppercase ${isSelected ? 'text-[#00ff88]' : ''}`}>
                      {item.stage.split(': ')[1]}
                    </div>
                  </div>
                </div>
                <ChevronRight className={`h-4 w-4 shrink-0 transition-transform ${
                  isSelected ? 'translate-x-0.5 text-[#00ff88]' : 'text-zinc-600 group-hover:text-zinc-400'
                }`} />
              </button>
            );
          })}
        </div>

        {/* Right column: Interactive detail viewer */}
        <div className="lg:col-span-7">
          <motion.div
            key={activeStageIndex}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-none border border-zinc-805 bg-[#161616] p-6 md:p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 h-1.5 w-full bg-[#00ff88]" />
            
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#00ff88] bg-[#00ff88]/10 border border-[#00ff88]/20 px-2.5 py-0.5 uppercase">
                  {currentStage.stage.split(': ')[0]}
                </span>
                <span className="text-xs font-mono text-zinc-500 flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-zinc-600" />
                  {currentStage.timeframe}
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white uppercase tracking-tight leading-none">{currentStage.title}</h3>
                <p className="mt-4 text-sm text-zinc-400 leading-relaxed font-sans">{currentStage.description}</p>
              </div>

              {/* Progress bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-500 font-sans">Proficiency confidence level</span>
                  <span className="text-[#00ff88] font-mono font-bold">{currentStage.progressPercent}%</span>
                </div>
                <div className="h-2 w-full rounded-none bg-black overflow-hidden border border-zinc-805">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${currentStage.progressPercent}%` }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="h-full rounded-none bg-[#00ff88]"
                  />
                </div>
              </div>

              {/* Skills gained grid */}
              <div className="space-y-3">
                <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Award className="h-4 w-4 text-[#00ff88]" />
                  Key takeaways
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {currentStage.skillsAcquired.map((skill, idx) => (
                    <div key={idx} className="flex items-center gap-2 rounded-none bg-black p-2.5 border border-zinc-805">
                      <div className="h-1.5 w-1.5 rounded-full bg-[#00ff88] shrink-0" />
                      <span className="text-xs text-zinc-300 font-sans">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* challenge overcome */}
              <div className="rounded-none border border-rose-950/20 bg-rose-950/5 p-4 space-y-1.5">
                <div className="text-xs font-mono text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Flame className="h-3.5 w-3.5" />
                  Hardest challenge conquered
                </div>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed">{currentStage.blockerOvercome}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Philosophy cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        <div className="rounded-none border border-zinc-805 bg-[#161616] p-5 space-y-3">
          <div className="h-8 w-8 bg-[#00ff88]/10 flex items-center justify-center text-[#00ff88]">
            <Compass className="h-4 w-4" />
          </div>
          <h4 className="text-xs font-bold font-mono uppercase tracking-widest text-[#00ff88]">Clean Structure</h4>
          <p className="text-xs text-zinc-400 leading-relaxed font-sans">
            I believe styling and layout structure matter. A solid code architectural canvas is essential before writing secondary logic.
          </p>
        </div>
        <div className="rounded-none border border-zinc-805 bg-[#161616] p-5 space-y-3">
          <div className="h-8 w-8 bg-[#00ff88]/10 flex items-center justify-center text-[#00ff88]">
            <Terminal className="h-4 w-4" />
          </div>
          <h4 className="text-xs font-bold font-mono uppercase tracking-widest text-[#00ff88]">Real Interaction</h4>
          <p className="text-xs text-zinc-400 leading-relaxed font-sans">
            Every simulation in this portfolio is built with React state and events so you can test them firsthand. I prove skill with dynamic executable code.
          </p>
        </div>
        <div className="rounded-none border border-zinc-805 bg-[#161616] p-5 space-y-3">
          <div className="h-8 w-8 bg-[#00ff88]/10 flex items-center justify-center text-[#00ff88]">
            <Code className="h-4 w-4" />
          </div>
          <h4 className="text-xs font-bold font-mono uppercase tracking-widest text-[#00ff88]">Always Learning</h4>
          <p className="text-xs text-zinc-400 leading-relaxed font-sans">
            From basic elements and JSON layouts to full-featured portals, my journey is driven by an ongoing push to build better software solutions.
          </p>
        </div>
      </section>

      {/* Bottom CTA */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-none border border-zinc-850 bg-black">
        <div className="text-center sm:text-left">
          <p className="text-sm text-zinc-200 font-bold uppercase tracking-wider">Ready to take the projects for a spin?</p>
          <p className="text-xs text-zinc-500 mt-0.5 font-sans">Pick a project and trigger its interactive capabilities inline.</p>
        </div>
        <button
          id="about-cta-projects"
          onClick={() => onNavigate('projects')}
          className="group inline-flex items-center gap-2 bg-[#00ff88] hover:bg-[#00e277] px-6 py-3 text-xs font-bold uppercase tracking-wider text-black transition-colors rounded-none cursor-pointer whitespace-nowrap"
        >
          <span>Open Projects Tab</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
}
