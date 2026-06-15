import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RefreshCw, Swords, Award, AlertCircle, History, User, Clapperboard, Monitor } from 'lucide-react';

type Choice = 'rock' | 'paper' | 'scissors';
type RoundResult = 'win' | 'lose' | 'draw' | null;

interface GameHistoryEntry {
  id: string;
  player: Choice;
  computer: Choice;
  result: 'win' | 'lose' | 'draw';
}

export default function RockPaperScissors() {
  const [playerScore, setPlayerScore] = useState<number>(0);
  const [compScore, setCompScore] = useState<number>(0);
  const [ties, setTies] = useState<number>(0);
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
  const [compChoice, setCompChoice] = useState<Choice | null>(null);
  const [roundResult, setRoundResult] = useState<RoundResult>(null);
  const [isShaking, setIsShaking] = useState<boolean>(false);
  const [history, setHistory] = useState<GameHistoryEntry[]>([]);

  const choicesList: { value: Choice; emoji: string; label: string; beats: Choice; color: string }[] = [
    { value: 'rock', emoji: '✊', label: 'Rock', beats: 'scissors', color: 'from-amber-500 to-rose-500 border-amber-500/20 bg-amber-950/20' },
    { value: 'paper', emoji: '✋', label: 'Paper', beats: 'rock', color: 'from-sky-400 to-indigo-500 border-sky-400/20 bg-sky-950/20' },
    { value: 'scissors', emoji: '✌️', label: 'Scissors', beats: 'paper', color: 'from-purple-500 to-pink-500 border-purple-500/20 bg-purple-950/20' }
  ];

  const handlePlay = (playerPick: Choice) => {
    if (isShaking) return;
    
    setIsShaking(true);
    setPlayerChoice(null);
    setCompChoice(null);
    setRoundResult(null);

    // Simulate animated combat countdown shake
    setTimeout(() => {
      setIsShaking(false);
      
      const compRandomIndex = Math.floor(Math.random() * 3);
      const computedChoice = choicesList[compRandomIndex].value;
      const rule = choicesList.find(c => c.value === playerPick);

      setPlayerChoice(playerPick);
      setCompChoice(computedChoice);

      if (playerPick === computedChoice) {
        setRoundResult('draw');
        setTies(t => t + 1);
        addHistory(playerPick, computedChoice, 'draw');
      } else if (rule && rule.beats === computedChoice) {
        setRoundResult('win');
        setPlayerScore(p => p + 1);
        addHistory(playerPick, computedChoice, 'win');
      } else {
        setRoundResult('lose');
        setCompScore(c => c + 1);
        addHistory(playerPick, computedChoice, 'lose');
      }
    }, 1000);
  };

  const addHistory = (p: Choice, c: Choice, res: 'win' | 'lose' | 'draw') => {
    const entry: GameHistoryEntry = {
      id: Math.random().toString(36).substr(2, 9),
      player: p,
      computer: c,
      result: res
    };
    setHistory(prev => [entry, ...prev.slice(0, 7)]);
  };

  const resetGame = () => {
    setPlayerScore(0);
    setCompScore(0);
    setTies(0);
    setPlayerChoice(null);
    setCompChoice(null);
    setRoundResult(null);
    setHistory([]);
  };

  const getEmoji = (val: Choice) => {
    return choicesList.find(c => c.value === val)?.emoji || '✊';
  };

  const totalRoundCount = playerScore + compScore + ties;
  const winRate = totalRoundCount > 0 ? Math.round((playerScore / totalRoundCount) * 100) : 0;

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between border-b border-slate-800/80 pb-4">
        <div>
          <h3 className="text-lg font-bold text-white">Stage 2: Rock Paper Scissors Game</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm">
            Archiving Javascript math logic, conditions, stats calculations, and trigger state sequences through a fully playable arcade console.
          </p>
        </div>
        <button
          id="rps-reset-btn"
          onClick={resetGame}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5 text-2xs font-mono text-slate-400 hover:text-slate-200 hover:border-slate-700 transition-all cursor-pointer"
        >
          <RefreshCw className="h-3 w-3" />
          <span>Reset Scores</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Game Area */}
        <div className="lg:col-span-8 space-y-6">
          {/* Main Combat Stage */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 flex flex-col items-center justify-center min-h-64 relative overflow-hidden">
            <div className="absolute top-3 left-3 flex items-center gap-1.5 text-3xs font-mono text-slate-500">
              <Swords className="h-3.5 w-3.5 text-slate-600" />
              <span>LOGICAL_BATTLEGROUND</span>
            </div>

            <AnimatePresence mode="wait">
              {isShaking ? (
                <motion.div
                  key="shaking-fists"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-16 text-5xl md:text-6xl"
                >
                  <motion.div
                    animate={{ y: [0, -15, 0] }}
                    transition={{ repeat: Infinity, duration: 0.35, ease: 'easeInOut' }}
                  >
                    ✊
                  </motion.div>
                  <div className="text-sm font-mono text-slate-600 tracking-wider font-bold animate-pulse">VS</div>
                  <motion.div
                    animate={{ y: [0, -15, 0] }}
                    transition={{ repeat: Infinity, duration: 0.35, ease: 'easeInOut' }}
                    className="scale-x-[-1]"
                  >
                    ✊
                  </motion.div>
                </motion.div>
              ) : playerChoice && compChoice ? (
                <motion.div
                  key="results-stage"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-6 w-full"
                >
                  <div className="flex items-center justify-center gap-8 md:gap-16 w-full max-w-sm">
                    {/* Player Result */}
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-3xs font-mono text-slate-500 uppercase flex items-center gap-1">
                        <User className="h-3 w-3 text-slate-600" />
                        You chose
                      </span>
                      <div className="h-16 w-16 bg-gradient-to-br from-indigo-950/40 to-indigo-900/10 border border-indigo-500/25 rounded-2xl flex items-center justify-center text-4xl shadow-md shadow-indigo-500/5">
                        {getEmoji(playerChoice)}
                      </div>
                      <span className="text-xs font-bold text-slate-300 capitalize">{playerChoice}</span>
                    </div>

                    <div className="font-mono text-xs font-bold text-slate-600 uppercase">vs</div>

                    {/* Computer Result */}
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-3xs font-mono text-slate-500 uppercase flex items-center gap-1">
                        <Monitor className="h-3 w-3 text-slate-600" />
                        CPU chose
                      </span>
                      <div className="h-16 w-16 bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-2xl flex items-center justify-center text-4xl shadow-inner">
                        <span className="scale-x-[-1]">{getEmoji(compChoice)}</span>
                      </div>
                      <span className="text-xs font-bold text-slate-300 capitalize">{compChoice}</span>
                    </div>
                  </div>

                  {/* Verdict text banner */}
                  <div className="text-center space-y-1">
                    <h4 className={`text-xl font-extrabold tracking-wide ${
                      roundResult === 'win' 
                        ? 'text-emerald-400' 
                        : roundResult === 'lose' 
                          ? 'text-rose-400' 
                          : 'text-amber-400'
                    }`}>
                      {roundResult === 'win' && 'ROUND WON! 🎉'}
                      {roundResult === 'lose' && 'ROUND LOST! 😢'}
                      {roundResult === 'draw' && 'DRAW STALEMATE! 🤝'}
                    </h4>
                    <p className="text-2xs font-mono text-slate-500 capitalize">
                      {roundResult === 'win' && `${playerChoice} breaks computer's ${compChoice}`}
                      {roundResult === 'lose' && `${compChoice} counter-breaks your ${playerChoice}`}
                      {roundResult === 'draw' && `Both parameters match on ${playerChoice}`}
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="idle-stage"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center space-y-2.5 max-w-xs"
                >
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-indigo-950/40 border border-indigo-500/20 text-indigo-400">
                    <Swords className="h-5 w-5" />
                  </div>
                  <h4 className="text-sm font-bold text-white">Interactive Arcade Host</h4>
                  <p className="text-2xs text-slate-400 font-sans">
                    Pick a weapon below to trigger a handshake and run the random generator!
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Action Choice buttons */}
          <div className="grid grid-cols-3 gap-4">
            {choicesList.map((choice) => (
              <button
                key={choice.value}
                id={`rps-choice-${choice.value}`}
                onClick={() => handlePlay(choice.value)}
                disabled={isShaking}
                className={`group flex flex-col items-center gap-2 rounded-2xl border p-4 transition-all hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-40 select-none cursor-pointer border-slate-800 bg-slate-900/10 hover:border-slate-700 hover:bg-slate-900/20`}
              >
                <span className="text-3xl filter transition-transform group-hover:scale-110">{choice.emoji}</span>
                <span className="text-xs font-bold text-slate-300 group-hover:text-white transition-colors">{choice.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Stats Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          {/* Scoring panel */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/10 p-5 space-y-4">
            <span className="text-3xs font-mono text-slate-500 uppercase tracking-widest block">MATCH STATS</span>
            
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-slate-950 rounded-xl p-2.5 border border-slate-850">
                <div className="text-lg font-bold text-emerald-400 font-mono">{playerScore}</div>
                <div className="text-3xs text-slate-500 font-mono">Wins</div>
              </div>
              <div className="bg-slate-950 rounded-xl p-2.5 border border-slate-850">
                <div className="text-lg font-bold text-rose-400 font-mono">{compScore}</div>
                <div className="text-3xs text-slate-500 font-mono">Losses</div>
              </div>
              <div className="bg-slate-950 rounded-xl p-2.5 border border-slate-850">
                <div className="text-lg font-bold text-amber-500 font-mono">{ties}</div>
                <div className="text-3xs text-slate-500 font-mono">Ties</div>
              </div>
            </div>

            <div className="space-y-2 border-t border-slate-800/60 pt-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-sans">Player Win Rate</span>
                <span className="font-mono text-emerald-400 font-bold">{winRate}%</span>
              </div>
              <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800/80">
                <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${winRate}%` }} />
              </div>
            </div>
          </div>

          {/* Log timeline */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/10 p-5 space-y-3">
            <span className="text-3xs font-mono text-slate-500 uppercase tracking-widest flex items-center gap-1">
              <History className="h-3.5 w-3.5 text-slate-600" />
              ROUND LOG
            </span>

            {history.length === 0 ? (
              <p className="text-3xs text-slate-600 italic py-4 text-center">No rounds registered in current stack.</p>
            ) : (
              <div className="space-y-1.5 max-h-48 overflow-y-auto">
                {history.map((entry) => (
                  <div 
                    key={entry.id}
                    className="flex items-center justify-between text-2xs p-2 rounded-lg bg-slate-950/50 border border-slate-900"
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold">{getEmoji(entry.player)}</span>
                      <span className="text-slate-500 font-mono">vs</span>
                      <span>{getEmoji(entry.computer)}</span>
                    </div>
                    <span className={`font-mono text-3xs font-bold uppercase ${
                      entry.result === 'win' 
                        ? 'text-emerald-400' 
                        : entry.result === 'lose' 
                          ? 'text-rose-400' 
                          : 'text-amber-500'
                    }`}>
                      {entry.result}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
