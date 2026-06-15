import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Code, 
  Layers, 
  Cpu, 
  Terminal, 
  BookOpen, 
  ShieldCheck, 
  MonitorPlay
} from 'lucide-react';

// Subcomponents imports
import TrafficLight from './projects/TrafficLight';
import RockPaperScissors from './projects/RockPaperScissors';
import WeatherStation from './projects/WeatherStation';
import TaskDashboard from './projects/TaskDashboard';
import PokemonSearcher from './projects/PokemonSearcher';

type ProjectModuleId = 'traffic' | 'rps' | 'weather' | 'tasks' | 'pokemon';

interface ProjectListItem {
  id: ProjectModuleId;
  title: string;
  stage: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  glow: string;
  icon: React.ReactNode;
  summary: string;
}

export default function Projects() {
  const [activeModule, setActiveModule] = useState<ProjectModuleId>('pokemon'); // Default to stage 5 (latest)

  const modulesList: ProjectListItem[] = [
    {
      id: 'traffic',
      title: 'Traffic Light Seq',
      stage: 'Stage 1: HTML & CSS',
      difficulty: 'Beginner',
      glow: '',
      icon: <Layers className="h-4.5 w-4.5" />,
      summary: 'Focuses on semantic selectors, layout box alignments, and styled margins.'
    },
    {
      id: 'rps',
      title: 'Rock Paper Scissors',
      stage: 'Stage 2: Core JS',
      difficulty: 'Beginner',
      glow: '',
      icon: <Code className="h-4.5 w-4.5" />,
      summary: 'Focuses on random selection arrays, math offsets, and scores increments.'
    },
    {
      id: 'weather',
      title: 'Weather Station',
      stage: 'Stage 3: Fetch APIs',
      difficulty: 'Intermediate',
      glow: '',
      icon: <Cpu className="h-4.5 w-4.5" />,
      summary: 'Focuses on async fetches, parsing outer payload bundles, and ambient cards.'
    },
    {
      id: 'tasks',
      title: 'Task Auth Board',
      stage: 'Stage 4: App Logic',
      difficulty: 'Advanced',
      glow: '',
      icon: <ShieldCheck className="h-4.5 w-4.5" />,
      summary: 'Focuses on separate user database tables, login forms, active categories.'
    },
    {
      id: 'pokemon',
      title: 'PokeAPI Explorer',
      stage: 'Stage 5: Live React',
      difficulty: 'Advanced',
      glow: '',
      icon: <BookOpen className="h-4.5 w-4.5" />,
      summary: 'Focuses on React hooks states, inputs, type chips patterns, artwork renders.'
    }
  ];

  return (
    <div id="projects-section" className="space-y-10">
      {/* Upper header section with active badge */}
      <div className="flex flex-col md:flex-row gap-6 justify-between items-start">
        <div className="space-y-4 max-w-2xl text-left">
          <p className="text-xs font-mono font-bold tracking-[0.3em] text-[#00ff88] uppercase">
            COMPILER WORKBENCH // SIMULATOR SUITE
          </p>
          <h2 className="display-text text-5xl md:text-7xl lg:text-8xl text-white font-normal uppercase leading-none">
            PROJECT<br/>
            <span className="text-[#00ff88]">WORKBENCH</span>
          </h2>
          <p className="text-zinc-400 text-sm leading-relaxed font-sans">
            Choose a tab to compile and mount the executable program in real-time. Toggle between stages to explore how my software abilities evolved over time.
          </p>
        </div>
      </div>

      {/* Responsive tabs deck row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-wrap gap-2.5 pb-2 border-b border-zinc-800">
        {modulesList.map((m) => {
          const isActive = activeModule === m.id;
          return (
            <button
              key={m.id}
              id={`workbench-tab-${m.id}`}
              onClick={() => setActiveModule(m.id)}
              className={`flex-1 min-w-[130px] p-3 rounded-none border text-left transition-all relative cursor-pointer select-none group flex flex-col justify-between ${
                isActive
                  ? 'bg-[#1a1a1a] border-[#00ff88] text-white'
                  : 'bg-[#161616] border-zinc-805 text-zinc-500 hover:border-zinc-700 hover:bg-[#222] hover:text-zinc-350'
              }`}
            >
              <div className="flex items-center justify-between pb-1.5 min-w-0">
                <div className={`p-1.5 rounded-none border transition-all ${
                  isActive ? 'bg-[#00ff88]/10 border-[#00ff88]/40 text-[#00ff88]' : 'bg-black border-zinc-800 text-zinc-650 group-hover:text-zinc-400'
                }`}>
                  {m.icon}
                </div>
                <span className={`text-[8px] font-mono border px-1.5 py-0.5 font-extrabold uppercase ${
                  isActive ? 'border-[#00ff88]/35 bg-[#00ff88]/10 text-[#00ff88]' : 'border-zinc-800 bg-black text-zinc-500'
                }`}>
                  {m.difficulty}
                </span>
              </div>
              
              <div className="min-w-0 pt-0.5">
                <span className="text-[10px] font-mono text-zinc-500 block">{m.stage.split(': ')[0]}</span>
                <span className={`text-xs font-bold font-sans truncate block leading-tight uppercase ${isActive ? 'text-[#00ff88]' : ''}`}>{m.title}</span>
              </div>
              
              {isActive && (
                <span className="absolute bottom-[-1px] left-3 right-3 h-0.5 bg-[#00ff88]" />
              )}
            </button>
          );
        })}
      </div>

      {/* Display Stage Area compiling the selected widget */}
      <div className="relative rounded-none border border-zinc-805 bg-black p-6 md:p-8 group overflow-hidden">
        <div className="relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeModule}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              {activeModule === 'traffic' && <TrafficLight />}
              {activeModule === 'rps' && <RockPaperScissors />}
              {activeModule === 'weather' && <WeatherStation />}
              {activeModule === 'tasks' && <TaskDashboard />}
              {activeModule === 'pokemon' && <PokemonSearcher />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
