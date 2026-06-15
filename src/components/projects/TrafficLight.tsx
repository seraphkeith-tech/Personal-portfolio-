import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, FastForward, Activity, AlertOctagon } from 'lucide-react';

export default function TrafficLight() {
  const [activeLight, setActiveLight] = useState<'red' | 'yellow' | 'green'>('red');
  const [isAutomated, setIsAutomated] = useState<boolean>(false);
  const [cycleSpeed, setCycleSpeed] = useState<number>(3000); // ms per step
  const [countdown, setCountdown] = useState<number>(3);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const countRef = useRef<NodeJS.Timeout | null>(null);

  // Pedestrian walk status helper
  const getPedestrianStatus = () => {
    switch (activeLight) {
      case 'red':
        return { text: 'CROSS SAFE', color: 'text-emerald-400 bg-emerald-950/30 border-emerald-500/20', isWalk: true };
      case 'yellow':
        return { text: 'WAIT', color: 'text-amber-400 bg-amber-950/30 border-amber-500/20 animate-pulse', isWalk: false };
      case 'green':
      default:
        return { text: 'DONT WALK', color: 'text-rose-400 bg-rose-950/30 border-rose-500/20', isWalk: false };
    }
  };

  // Automated cycling logic
  useEffect(() => {
    if (isAutomated) {
      setCountdown(cycleSpeed / 1000);
      
      const nextStep = () => {
        setActiveLight((current) => {
          if (current === 'red') return 'green';
          if (current === 'green') return 'yellow';
          return 'red';
        });
        setCountdown(cycleSpeed / 1000);
      };

      timerRef.current = setTimeout(nextStep, cycleSpeed);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [activeLight, isAutomated, cycleSpeed]);

  // Countdown timer clock
  useEffect(() => {
    if (isAutomated) {
      countRef.current = setInterval(() => {
        setCountdown((current) => (current > 1 ? current - 1 : cycleSpeed / 1000));
      }, 1000);
    } else {
      setCountdown(0);
    }

    return () => {
      if (countRef.current) clearInterval(countRef.current);
    };
  }, [isAutomated, activeLight, cycleSpeed]);

  const toggleAutomation = () => {
    setIsAutomated(!isAutomated);
  };

  const handleManualSelect = (light: 'red' | 'yellow' | 'green') => {
    setIsAutomated(false);
    setActiveLight(light);
  };

  const ped = getPedestrianStatus();

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between border-b border-slate-800/80 pb-4">
        <div>
          <h3 className="text-lg font-bold text-white">Stage 1: Traffic Light Simulator</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm">
            My first project from my HTML & CSS era! Updated inside React to showcase modular grid structures, countdown state timers, and conditional layouts.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-orange-950/20 text-orange-400 text-3xs font-mono uppercase tracking-widest px-2.5 py-1 border border-orange-500/10">
            COMPLETED: 100%
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        {/* Lights Device Body (Skeuomorphic digital signal) */}
        <div className="md:col-span-5 flex flex-col items-center justify-center bg-slate-950 border border-slate-800/80 rounded-2xl p-6 shadow-2xl relative">
          <div className="absolute top-3 left-3 flex items-center gap-1">
            <Activity className="h-3 w-3 text-slate-600 animate-pulse" />
            <span className="text-3xs font-mono text-slate-600">UNIT-STG-1</span>
          </div>

          {/* Traffic Pole */}
          <div className="w-24 bg-slate-900 rounded-3xl p-4 flex flex-col gap-4 border border-slate-800 shadow-inner">
            {/* Red Light */}
            <button
              id="light-btn-red"
              onClick={() => handleManualSelect('red')}
              className={`h-16 w-16 rounded-full transition-all duration-300 relative group cursor-pointer ${
                activeLight === 'red'
                  ? 'bg-rose-500 shadow-[0_0_24px_rgba(239,68,68,0.7)] border-2 border-white/20'
                  : 'bg-rose-950/30 hover:bg-rose-950/50 border border-slate-800'
              }`}
            >
              <span className="absolute inset-0 rounded-full bg-rose-500/10 scale-0 group-hover:scale-110 transition-transform duration-300" />
            </button>

            {/* Yellow Light */}
            <button
              id="light-btn-yellow"
              onClick={() => handleManualSelect('yellow')}
              className={`h-16 w-16 rounded-full transition-all duration-300 relative group cursor-pointer ${
                activeLight === 'yellow'
                  ? 'bg-amber-400 shadow-[0_0_24px_rgba(251,191,36,0.7)] border-2 border-white/20'
                  : 'bg-amber-950/30 hover:bg-amber-950/50 border border-slate-800'
              }`}
            >
              <span className="absolute inset-0 rounded-full bg-amber-400/10 scale-0 group-hover:scale-110 transition-transform duration-300" />
            </button>

            {/* Green Light */}
            <button
              id="light-btn-green"
              onClick={() => handleManualSelect('green')}
              className={`h-16 w-16 rounded-full transition-all duration-300 relative group cursor-pointer ${
                activeLight === 'green'
                  ? 'bg-emerald-500 shadow-[0_0_24px_rgba(16,185,129,0.7)] border-2 border-white/20'
                  : 'bg-emerald-950/30 hover:bg-emerald-950/50 border border-slate-800'
              }`}
            >
              <span className="absolute inset-0 rounded-full bg-emerald-500/10 scale-0 group-hover:scale-110 transition-transform duration-300" />
            </button>
          </div>
        </div>

        {/* Console control center */}
        <div className="md:col-span-7 flex flex-col justify-between bg-slate-900/20 border border-slate-800/60 rounded-2xl p-5 md:p-6">
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-2xs font-mono text-slate-500 uppercase tracking-widest">CONTROL PANEL</span>
              <div className="flex items-center gap-1.5 text-2xs font-mono">
                <span className="text-slate-500">Mode:</span>
                <span className={isAutomated ? 'text-emerald-400 font-bold animate-pulse' : 'text-slate-400'}>
                  {isAutomated ? 'AUTOMATIC' : 'MANUAL'}
                </span>
              </div>
            </div>

            {/* Pedestrian indicator box */}
            <div className={`rounded-xl border p-4 flex items-center justify-between transition-colors ${ped.color}`}>
              <div className="space-y-1">
                <span className="text-3xs font-mono uppercase tracking-wider text-slate-400">PEDESTRIAN STATE</span>
                <h4 className="text-sm font-bold tracking-wide">{ped.text}</h4>
              </div>
              <div className="text-right">
                {isAutomated ? (
                  <div className="font-mono text-xl font-extrabold tracking-tighter">
                    {countdown}s
                  </div>
                ) : (
                  <div className="text-3xs font-mono text-slate-500 max-w-24 text-right">
                    Automatic Mode Required
                  </div>
                )}
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-2">
              <label className="text-3xs font-mono text-slate-500 uppercase tracking-widest">Automation Sequence</label>
              <button
                id="light-toggle-auto"
                onClick={toggleAutomation}
                className={`w-full flex items-center justify-center gap-2 rounded-xl p-3 text-xs font-semibold border transition-all cursor-pointer ${
                  isAutomated
                    ? 'bg-rose-950/20 hover:bg-rose-950/30 border-rose-500/20 text-rose-400'
                    : 'bg-indigo-600 hover:bg-indigo-500 border-indigo-500 text-white shadow-lg shadow-indigo-500/10'
                }`}
              >
                {isAutomated ? (
                  <>
                    <Pause className="h-4 w-4" />
                    <span>Freeze Sequence (Go Manual)</span>
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    <span>Initiate Auto-Cycling Sequence</span>
                  </>
                )}
              </button>
            </div>

            {/* Interval slider */}
            <div className="space-y-3 pt-1">
              <div className="flex items-center justify-between text-2xs font-mono">
                <span className="text-slate-400 flex items-center gap-1">
                  <FastForward className="h-3.5 w-3.5 text-slate-500" />
                  Cycle Interval Speed
                </span>
                <span className="text-indigo-400 font-bold">{cycleSpeed / 1000} seconds</span>
              </div>
              <div className="flex gap-2">
                {[1500, 3000, 5000].map((speed) => (
                  <button
                    key={speed}
                    id={`light-speed-btn-${speed}`}
                    onClick={() => setCycleSpeed(speed)}
                    disabled={cycleSpeed === speed}
                    className={`flex-1 rounded-lg py-2 text-2xs font-mono border transition-all font-bold cursor-pointer ${
                      cycleSpeed === speed
                        ? 'bg-indigo-950/30 border-indigo-500/40 text-indigo-400'
                        : 'border-slate-800 hover:border-slate-700 hover:bg-slate-900 text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    {speed / 1000}s ({speed === 1500 ? 'Fast' : speed === 3000 ? 'Normal' : 'Slow'})
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 border-t border-slate-800/60 pt-4 flex gap-2 rounded bg-slate-950/35 p-3.5">
            <AlertOctagon className="h-4.5 w-4.5 text-indigo-400 shrink-0 mt-0.5" />
            <div className="text-3xs text-slate-400 leading-relaxed font-sans">
              <span className="font-bold text-slate-300">Learning Outcome:</span> This widget showcases standard DOM and CSS states. In React, it avoids heavy selector chains and replaces element selectors with declarative, reactive inline attributes.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
