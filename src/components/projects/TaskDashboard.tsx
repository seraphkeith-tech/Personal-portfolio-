import React, { useState } from 'react';
import { 
  Lock, 
  User, 
  LogOut, 
  Plus, 
  Trash2, 
  CheckSquare, 
  Square, 
  Tag, 
  Filter, 
  Sparkles, 
  ShieldCheck, 
  UserPlus
} from 'lucide-react';
import { Task, TaskUser } from '../../types';

export default function TaskDashboard() {
  // Preconfigured state database of users with user-specific sets of tasks
  const [usersDb, setUsersDb] = useState<Record<string, TaskUser>>({
    keith: {
      username: 'keith',
      displayName: 'Keith Seraph',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&h=80&q=80',
      tasks: [
        { id: 'k1', title: 'Complete React portfolio website compilation', status: 'completed', category: 'learning', createdAt: '2026-06-12' },
        { id: 'k2', title: 'Deploy PokeAPI responsive layout structure', status: 'pending', category: 'work', createdAt: '2026-06-13' },
        { id: 'k3', title: 'Design contact email form validators', status: 'pending', category: 'work', createdAt: '2026-06-14' },
        { id: 'k4', title: 'Daily cardiovascular cardio cardio training', status: 'pending', category: 'health', createdAt: '2026-06-14' }
      ]
    },
    satoshi: {
      username: 'satoshi',
      displayName: 'Satoshi Nakamoto',
      avatarUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=80&h=80&q=80',
      tasks: [
        { id: 's1', title: 'Audit genesis block checksum indices', status: 'completed', category: 'work', createdAt: '2026-06-10' },
        { id: 's2', title: 'Publish peer-to-peer electronics whitepaper update', status: 'pending', category: 'work', createdAt: '2026-06-12' },
        { id: 's3', title: 'Refill cold-storage recovery keys logs', status: 'pending', category: 'personal', createdAt: '2026-06-14' }
      ]
    }
  });

  const [currentUser, setCurrentUser] = useState<TaskUser | null>(null);
  
  // Login credentials form states
  const [inputUsername, setInputUsername] = useState('');
  const [inputPassword, setInputPassword] = useState(''); // Simulated auth check
  const [errMessage, setErrMessage] = useState('');

  // Tasks editor state parameters
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState<Task['category']>('work');
  const [activeFilter, setActiveFilter] = useState<'all' | Task['category']>('all');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const sanitUser = inputUsername.trim().toLowerCase();
    
    if (usersDb[sanitUser]) {
      // In this simulator, any password works for extreme simplicity, but checks "admin123" by default
      setCurrentUser(usersDb[sanitUser]);
      setErrMessage('');
      setInputUsername('');
      setInputPassword('');
    } else {
      setErrMessage('User not registered in local simulator. Try "keith" or "satoshi"');
    }
  };

  const loginAsPreset = (userKey: 'keith' | 'satoshi') => {
    setCurrentUser(usersDb[userKey]);
    setErrMessage('');
  };

  const handleLogout = () => {
    if (currentUser) {
      // Save changes back into local storage database before deregistering!
      setUsersDb(prev => ({
        ...prev,
        [currentUser.username]: { ...currentUser }
      }));
    }
    setCurrentUser(null);
  };

  const addNewTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim() || !currentUser) return;

    const task: Task = {
      id: Math.random().toString(36).substr(2, 9),
      title: newTaskTitle.trim(),
      status: 'pending',
      category: newTaskCategory,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setCurrentUser(prev => {
      if (!prev) return null;
      return {
        ...prev,
        tasks: [...prev.tasks, task]
      };
    });

    setNewTaskTitle('');
  };

  const toggleTaskStatus = (taskId: string) => {
    if (!currentUser) return;
    setCurrentUser(prev => {
      if (!prev) return null;
      return {
        ...prev,
        tasks: prev.tasks.map(t => t.id === taskId ? { ...t, status: t.status === 'completed' ? 'pending' : 'completed' } : t)
      };
    });
  };

  const deleteTask = (taskId: string) => {
    if (!currentUser) return;
    setCurrentUser(prev => {
      if (!prev) return null;
      return {
        ...prev,
        tasks: prev.tasks.filter(t => t.id !== taskId)
      };
    });
  };

  // Calculations
  const userTasks = currentUser?.tasks || [];
  const filteredTasks = activeFilter === 'all' 
    ? userTasks 
    : userTasks.filter(t => t.category === activeFilter);

  const completedCount = userTasks.filter(t => t.status === 'completed').length;
  const ratioPercent = userTasks.length > 0 ? Math.round((completedCount / userTasks.length) * 100) : 0;

  const categoryConfigs: Record<Task['category'], { label: string; bg: string; text: string; dot: string }> = {
    work: { label: 'Work', bg: 'bg-blue-950/40 border-blue-500/20 text-blue-400', text: 'text-blue-400', dot: 'bg-blue-400' },
    personal: { label: 'Personal', bg: 'bg-indigo-950/40 border-indigo-500/20 text-indigo-400', text: 'text-indigo-400', dot: 'bg-indigo-400' },
    learning: { label: 'Learning', bg: 'bg-emerald-950/40 border-emerald-500/20 text-emerald-400', text: 'text-emerald-400', dot: 'bg-emerald-400' },
    health: { label: 'Health', bg: 'bg-rose-950/40 border-rose-500/20 text-rose-400', text: 'text-rose-400', dot: 'bg-rose-400' }
  };

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between border-b border-slate-800/80 pb-4">
        <div>
          <h3 className="text-lg font-bold text-white">Stage 4: Task Dashboard & User Auth</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm">
            Wired separate user authentication structures and CRUD database mock synchronization entirely within React states.
          </p>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-3xs text-slate-500">
          <ShieldCheck className="h-3.5 w-3.5 text-indigo-400" />
          <span>STAGE_4_SECURE</span>
        </div>
      </div>

      {!currentUser ? (
        /* LOGIN PRE-AUTH STATE CARD FORM */
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-slate-950/40 border border-slate-800/80 rounded-2xl p-6 shadow-xl leading-normal">
          <div className="md:col-span-6 space-y-4">
            <span className="text-3xs font-mono uppercase bg-indigo-950/40 text-indigo-400 border border-indigo-500/10 px-2.5 py-0.5 rounded-full inline-block">
              Integrated Auth Simulator
            </span>
            <h4 className="text-lg font-extrabold text-white">Secure Local Login</h4>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              To test the user authentication workflow, select a quick preset user credentials profile below, or type their username directly to enter their unique secure task index.
            </p>

            <div className="space-y-2 border-t border-slate-805 pt-4">
              <span className="text-3xs font-mono text-slate-500 uppercase tracking-widest block">QUICK TESTING PRESETS:</span>
              <div className="flex gap-2.5">
                <button
                  id="auth-preset-keith"
                  onClick={() => loginAsPreset('keith')}
                  type="button"
                  className="flex-1 py-2 px-3.5 rounded-xl border border-indigo-500/20 bg-indigo-950/20 hover:bg-indigo-950/40 text-left text-xs text-indigo-300 transition-colors flex items-center justify-between cursor-pointer"
                >
                  <span className="font-bold">Keith (React Dev)</span>
                  <span className="font-mono text-3xs opacity-60">"keith"</span>
                </button>
                <button
                  id="auth-preset-satoshi"
                  onClick={() => loginAsPreset('satoshi')}
                  type="button"
                  className="flex-1 py-2 px-3.5 rounded-xl border border-emerald-500/15 bg-emerald-950/15 hover:bg-emerald-950/30 text-left text-xs text-emerald-300 transition-colors flex items-center justify-between cursor-pointer"
                >
                  <span className="font-bold">Satoshi (Bitcoin)</span>
                  <span className="font-mono text-3xs opacity-60">"satoshi"</span>
                </button>
              </div>
            </div>
          </div>

          <div className="md:col-span-6">
            <form onSubmit={handleLogin} className="space-y-4 rounded-xl border border-slate-800 bg-slate-950 p-5 shadow-2xl">
              {errMessage && (
                <div id="auth-error-msg" className="rounded-lg bg-rose-950/25 border border-rose-900/40 p-2.5 text-2xs text-rose-300">
                  {errMessage}
                </div>
              )}

              <div className="space-y-1">
                <label className="text-3xs font-mono text-slate-400 uppercase">Username *</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-600" />
                  <input
                    id="auth-input-username"
                    type="text"
                    required
                    placeholder="e.g. keith"
                    value={inputUsername}
                    onChange={(e) => setInputUsername(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 text-xs bg-slate-900 border border-slate-800 rounded-xl text-slate-200 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-sans"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-3xs font-mono text-slate-400 uppercase">Password (simulated)</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-600" />
                  <input
                    id="auth-input-password"
                    type="password"
                    placeholder="password..."
                    value={inputPassword}
                    onChange={(e) => setInputPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 text-xs bg-slate-900 border border-slate-800 rounded-xl text-slate-200 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-sans"
                  />
                </div>
              </div>

              <button
                id="auth-login-btn"
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-4 py-3 text-xs font-semibold text-white shadow-lg shadow-indigo-500/15 cursor-pointer select-none"
              >
                <span>Authorize & Run Terminal</span>
              </button>
            </form>
          </div>
        </div>
      ) : (
        /* AUTHORIZED ACCOUNT STATES DASHBOARD */
        <div className="space-y-6">
          {/* User Profile Bar */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 md:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={currentUser.avatarUrl}
                alt={currentUser.displayName}
                referrerPolicy="no-referrer"
                className="h-12 w-12 rounded-full border border-indigo-500/25 p-0.5 object-cover"
              />
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <span>{currentUser.displayName}</span>
                  <span className="text-3xs font-mono text-slate-500 tracking-wider">@{currentUser.username}</span>
                </h4>
                <div className="flex items-center gap-2 text-3xs text-slate-400 font-mono mt-0.5">
                  <span className="text-emerald-400 font-bold">{ratioPercent}% COMPLETE</span>
                  <span>•</span>
                  <span>{userTasks.length} total tasks</span>
                </div>
              </div>
            </div>

            <button
              id="auth-logout-btn"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-800 hover:border-rose-900/40 hover:bg-rose-950/10 px-3 py-2 text-2xs font-bold text-slate-400 hover:text-rose-400 transition-all cursor-pointer whitespace-nowrap self-start sm:self-auto"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Deregister Lock</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left: Input box & Filter chips */}
            <div className="lg:col-span-5 space-y-5">
              {/* Task creation card */}
              <div className="rounded-2xl border border-slate-850 bg-slate-900/15 p-5">
                <span className="text-3xs font-mono text-slate-500 uppercase tracking-widest block mb-4">Create New Task</span>
                <form onSubmit={addNewTask} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-3xs font-mono text-slate-400 uppercase">Task Name *</label>
                    <input
                      id="dashboard-new-task-title"
                      type="text"
                      required
                      placeholder="e.g. Debug poke API mapping errors"
                      value={newTaskTitle}
                      onChange={(e) => setNewTaskTitle(e.target.value)}
                      className="w-full px-3.5 py-3 text-xs bg-slate-950 border border-slate-800 rounded-xl text-slate-200 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-sans"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-3xs font-mono text-slate-400 uppercase">Classification Tag</label>
                    <div className="grid grid-cols-2 gap-2">
                      {(['work', 'personal', 'learning', 'health'] as Task['category'][]).map(cat => {
                        const isSelected = newTaskCategory === cat;
                        const config = categoryConfigs[cat];
                        return (
                          <button
                            key={cat}
                            id={`dashboard-tag-${cat}`}
                            onClick={() => setNewTaskCategory(cat)}
                            type="button"
                            className={`py-2.5 px-3.5 rounded-xl border text-2xs font-mono text-left transition-all cursor-pointer flex items-center justify-between ${
                              isSelected
                                ? `${config.bg} font-extrabold`
                                : 'bg-slate-950/20 border-slate-900 text-slate-500 hover:border-slate-800 hover:text-slate-300'
                            }`}
                          >
                            <span>{config.label}</span>
                            <span className={`h-2 w-2 rounded-full ${config.dot}`} />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <button
                    id="dashboard-add-task-btn"
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-4 py-3 text-xs font-semibold text-white shadow-md shadow-indigo-500/10 transition-all cursor-pointer"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Compile Task Details</span>
                  </button>
                </form>
              </div>

              {/* Progress Gauges card */}
              <div className="rounded-2xl border border-slate-850 bg-slate-900/15 p-5 space-y-3">
                <span className="text-3xs font-mono text-slate-500 uppercase tracking-widest block">COMPLETION LOG INDEX</span>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-2xs">
                    <span className="text-slate-400">Memory database completion ratio</span>
                    <span className="text-indigo-400 font-bold font-mono">{ratioPercent}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-950 rounded-full border border-slate-800 overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full transition-all" style={{ width: `${ratioPercent}%` }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Active list views with tags */}
            <div className="lg:col-span-7 flex flex-col justify-between bg-slate-900/10 border border-slate-800/80 rounded-2xl p-5">
              <div className="space-y-4">
                {/* Horizontal Category Filtering Row */}
                <div className="flex items-center justify-between border-b border-slate-800/60 pb-3 flex-wrap gap-2">
                  <span className="text-3xs font-mono text-slate-500 uppercase tracking-widest">ACTIVE BACKLOG</span>
                  
                  <div className="flex items-center gap-1.5 bg-slate-950/40 p-1 rounded-lg border border-slate-900">
                    {['all', 'work', 'personal', 'learning', 'health'].map((filter) => {
                      const isActive = activeFilter === filter;
                      return (
                        <button
                          key={filter}
                          id={`dashboard-filter-${filter}`}
                          onClick={() => setActiveFilter(filter as any)}
                          className={`px-2.5 py-1 rounded text-3xs font-mono uppercase cursor-pointer transition-colors ${
                            isActive
                              ? 'bg-indigo-600 font-bold text-white'
                              : 'text-slate-500 hover:text-slate-300'
                          }`}
                        >
                          {filter}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Main List backlog items */}
                {filteredTasks.length === 0 ? (
                  <div className="py-16 text-center text-xs text-slate-600 italic">
                    No active tasks found in classification "{activeFilter}".
                  </div>
                ) : (
                  <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
                    {filteredTasks.map((task) => {
                      const isCompleted = task.status === 'completed';
                      const config = categoryConfigs[task.category];
                      return (
                        <div
                          key={task.id}
                          className="flex items-center justify-between bg-slate-950/60 border border-slate-850 p-3.5 rounded-xl transition-all hover:bg-slate-950 hover:border-slate-850 group gap-4"
                        >
                          <div className="flex items-start gap-3 min-w-0">
                            <button
                              id={`task-toggle-${task.id}`}
                              onClick={() => toggleTaskStatus(task.id)}
                              className="text-slate-500 hover:text-indigo-400 mt-0.5 cursor-pointer shrink-0"
                            >
                              {isCompleted ? (
                                <CheckSquare className="h-4.5 w-4.5 text-emerald-400" />
                              ) : (
                                <Square className="h-4.5 w-4.5" />
                              )}
                            </button>
                            <div className="min-w-0">
                              <p className={`text-xs font-medium leading-relaxed font-sans ${isCompleted ? 'line-through text-slate-500/80' : 'text-slate-200'}`}>
                                {task.title}
                              </p>
                              <div className="flex items-center gap-2 mt-1 px-1 py-0.5 rounded text-2xs uppercase">
                                <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-3xs font-mono border ${config.bg}`}>
                                  <span className={`h-1 w-1 rounded-full ${config.dot}`} />
                                  {config.label}
                                </span>
                                <span className="text-3xs text-slate-600 font-mono">{task.createdAt}</span>
                              </div>
                            </div>
                          </div>

                          <button
                            id={`task-delete-${task.id}`}
                            onClick={() => deleteTask(task.id)}
                            className="text-slate-600 hover:text-rose-400 opacity-60 group-hover:opacity-100 transition-opacity p-1 hover:bg-rose-950/20 rounded-md cursor-pointer shrink-0"
                            title="Delete task"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
