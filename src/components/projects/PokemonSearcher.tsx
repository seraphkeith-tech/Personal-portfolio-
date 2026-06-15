import React, { useState, useEffect } from 'react';
import { Search, Flame, Award, HelpCircle, Star, Sparkles, Activity, Eye, Zap } from 'lucide-react';

interface PokeApiData {
  name: string;
  id: number;
  height: number;
  weight: number;
  base_experience: number;
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  types: {
    slot: number;
    type: {
      name: string;
    };
  }[];
  abilities: {
    ability: {
      name: string;
    };
    is_hidden: boolean;
  }[];
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
}

export default function PokemonSearcher() {
  const [searchTarget, setSearchTarget] = useState('');
  const [pokemon, setPokemon] = useState<PokeApiData | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const quickPresets = ['pikachu', 'charizard', 'gengar', 'mew', 'bulbasaur', 'eevee'];

  const fetchPokemon = async (query: string) => {
    if (!query.trim()) return;
    
    setLoading(true);
    setErrorMessage('');
    
    const sanitizedQuery = query.toLowerCase().trim().replace(/[^a-z0-9-]/g, '');

    try {
      const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${sanitizedQuery}`);
      if (!resp.ok) {
        throw new Error(`Pokemon "${query}" not found in Kanto indices. Verify spelling!`);
      }
      const val = await resp.json() as PokeApiData;
      setPokemon(val);
    } catch (err: any) {
      setErrorMessage(err.message || 'Error occurred during network fetch.');
      setPokemon(null);
    } finally {
      setLoading(false);
    }
  };

  // Fetch initial pokemon on load from external server
  useEffect(() => {
    fetchPokemon('pikachu');
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchPokemon(searchTarget);
  };

  // Color mapper for Kanto elemental types
  const typeColors: Record<string, { bg: string; border: string; text: string; dot: string }> = {
    normal: { bg: 'bg-slate-900/40', border: 'border-slate-800', text: 'text-slate-400', dot: 'bg-slate-400' },
    fire: { bg: 'bg-orange-950/40', border: 'border-orange-500/20', text: 'text-orange-400', dot: 'bg-orange-500' },
    water: { bg: 'bg-blue-950/40 py-0.5', border: 'border-blue-500/20', text: 'text-blue-400', dot: 'bg-blue-500' },
    grass: { bg: 'bg-emerald-950/40', border: 'border-emerald-500/20', text: 'text-emerald-400', dot: 'bg-emerald-500' },
    electric: { bg: 'bg-yellow-950/40', border: 'border-yellow-500/20', text: 'text-yellow-400', dot: 'bg-yellow-400' },
    ice: { bg: 'bg-sky-950/40', border: 'border-sky-500/20', text: 'text-sky-400', dot: 'bg-sky-450' },
    fighting: { bg: 'bg-rose-950/40', border: 'border-rose-500/20', text: 'text-rose-400', dot: 'bg-rose-500' },
    poison: { bg: 'bg-fuchsia-950/40', border: 'border-fuchsia-500/20', text: 'text-fuchsia-400', dot: 'bg-fuchsia-500' },
    ground: { bg: 'bg-amber-950/40', border: 'border-amber-500/20', text: 'text-amber-500', dot: 'bg-amber-600' },
    flying: { bg: 'bg-indigo-950/40', border: 'border-indigo-500/20', text: 'text-indigo-400', dot: 'bg-indigo-400' },
    psychic: { bg: 'bg-pink-950/40', border: 'border-pink-500/20', text: 'text-pink-400', dot: 'bg-pink-500' },
    bug: { bg: 'bg-lime-950/40', border: 'border-lime-500/20', text: 'text-lime-400', dot: 'bg-lime-500' },
    rock: { bg: 'bg-stone-950/40', border: 'border-stone-500/30', text: 'text-stone-400', dot: 'bg-stone-500' },
    ghost: { bg: 'bg-purple-950/40', border: 'border-purple-500/20', text: 'text-purple-400', dot: 'bg-purple-400' },
    dragon: { bg: 'bg-violet-950/40', border: 'border-violet-500/20', text: 'text-violet-400', dot: 'bg-violet-500' },
    steel: { bg: 'bg-zinc-950/40', border: 'border-zinc-500/20', text: 'text-zinc-400', dot: 'bg-zinc-400' },
    fairy: { bg: 'bg-pink-900/20', border: 'border-pink-400/20', text: 'text-pink-350', dot: 'bg-pink-400' }
  };

  const getStatLabel = (statName: string) => {
    switch (statName) {
      case 'hp': return 'HP';
      case 'attack': return 'Attack';
      case 'defense': return 'Defense';
      case 'special-attack': return 'Sp. Attack';
      case 'special-defense': return 'Sp. Defense';
      case 'speed': return 'Speed';
      default: return statName;
    }
  };

  const getStatColor = (statName: string) => {
    switch (statName) {
      case 'hp': return 'bg-rose-500 shadow-[0_0_10px_rgba(239,68,68,0.4)]';
      case 'attack': return 'bg-orange-400 shadow-[0_0_10px_rgba(251,146,60,0.4)]';
      case 'defense': return 'bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.4)]';
      case 'special-attack': return 'bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.4)]';
      case 'special-defense': return 'bg-indigo-400 shadow-[0_0_10px_rgba(129,140,248,0.4)]';
      case 'speed': return 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.4)]';
      default: return 'bg-slate-400';
    }
  };

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between border-b border-slate-800/80 pb-4">
        <div>
          <h3 className="text-lg font-bold text-white">Stage 5: PokeAPI Stats Explorer</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm">
            Wired real-time asynchronous HTTP requests directly into react states and loaded graphical stats bars from the PokeAPI.
          </p>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-3xs text-slate-500">
          <Zap className="h-3.5 w-3.5 text-emerald-400 animate-pulse" />
          <span>STAGE_5_REACT_LIVE</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left column: Search / Presets */}
        <div className="lg:col-span-5 space-y-5">
          {/* Quick chip selects */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/10 p-5 space-y-3.5">
            <span className="text-3xs font-mono text-slate-500 uppercase tracking-widest block">QUICK SELECT TARGETS</span>
            <div className="flex flex-wrap gap-2">
              {quickPresets.map((preset) => (
                <button
                  key={preset}
                  id={`poke-preset-${preset}`}
                  onClick={() => fetchPokemon(preset)}
                  disabled={loading}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-bold capitalize transition-all cursor-pointer select-none ${
                    pokemon?.name === preset
                      ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-400'
                      : 'bg-slate-950/40 border-slate-900 text-slate-400 hover:border-slate-800 hover:text-slate-200'
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          {/* Form searching */}
          <form onSubmit={handleSearch} className="relative">
            <input
              id="poke-search-input"
              type="text"
              placeholder="Query pokedex (e.g. mewtwo, bulbasaur)"
              value={searchTarget}
              onChange={(e) => setSearchTarget(e.target.value)}
              disabled={loading}
              className="w-full pr-12 pl-4 py-3 text-sm rounded-xl border border-slate-800 bg-slate-950 placeholder-slate-600 text-slate-250 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-sans"
            />
            <button
              id="poke-search-btn"
              type="submit"
              disabled={loading}
              className="absolute right-2 top-2 h-8 w-8 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center cursor-pointer disabled:opacity-50"
              title="Search Pokemon databases"
            >
              <Search className="h-4 w-4" />
            </button>
          </form>

          {errorMessage && (
            <div id="poke-error-bar" className="rounded-xl bg-rose-950/20 border border-rose-900/40 p-4 text-xs text-rose-300">
              {errorMessage}
            </div>
          )}
        </div>

        {/* Right column: Interactive display card */}
        <div className="lg:col-span-7">
          {loading ? (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/10 h-full min-h-80 flex flex-col items-center justify-center py-12">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-500/20 border-t-indigo-400" />
              <div className="text-3xs font-mono text-slate-500 mt-3 uppercase tracking-wider">Syncing PokeAPI databases...</div>
            </div>
          ) : pokemon ? (
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 flex flex-col md:flex-row gap-6 items-stretch relative overflow-hidden min-h-80">
              <div className="absolute top-2 right-2 flex items-center gap-1.5 text-3xs font-mono text-slate-600">
                <Star className="h-3 w-3 text-yellow-500" />
                <span>INDEX #{pokemon.id}</span>
              </div>

              {/* Artwork wrapper panel */}
              <div className="md:w-5/12 flex flex-col items-center justify-center bg-slate-900/25 border border-slate-900 rounded-xl p-4 shadow-inner">
                <img
                  src={pokemon.sprites.other['official-artwork'].front_default || ''}
                  alt={pokemon.name}
                  referrerPolicy="no-referrer"
                  className="h-32 w-32 object-contain transition-transform hover:scale-105 duration-300"
                />
                <h4 className="text-lg font-black text-white capitalize mt-3">{pokemon.name}</h4>
                
                {/* Types Chips */}
                <div className="flex gap-1.5 mt-2.5">
                  {pokemon.types.map((t) => {
                    const style = typeColors[t.type.name] || typeColors.normal;
                    return (
                      <span
                        key={t.slot}
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-3xs font-mono uppercase border ${style.bg} ${style.border} ${style.text}`}
                      >
                        <span className={`h-1 w-1 rounded-full ${style.dot}`} />
                        {t.type.name}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Stats values panel */}
              <div className="md:w-7/12 flex flex-col justify-between py-1.5 gap-4">
                {/* Parameters list items */}
                <div className="grid grid-cols-2 gap-3 text-2xs font-mono border-b border-slate-900 pb-3">
                  <div>
                    <span className="text-slate-500 block">HEIGHT</span>
                    <span className="text-slate-300 font-bold font-mono">{(pokemon.height / 10).toFixed(1)} m</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">WEIGHT</span>
                    <span className="text-slate-300 font-bold font-mono">{(pokemon.weight / 10).toFixed(1)} kg</span>
                  </div>
                </div>

                {/* Performance trackers */}
                <div className="space-y-2">
                  <span className="text-3xs font-mono text-slate-500 uppercase tracking-widest block">BASE STATS</span>
                  <div className="space-y-2">
                    {pokemon.stats.map((item, idx) => {
                      const percentage = Math.min(100, Math.round((item.base_stat / 180) * 100));
                      return (
                        <div key={idx} className="space-y-1">
                          <div className="flex items-center justify-between text-3xs font-mono">
                            <span className="text-slate-400 font-bold">{getStatLabel(item.stat.name)}</span>
                            <span className="text-slate-200 font-bold">{item.base_stat}</span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-900 border border-slate-900 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all duration-500 ${getStatColor(item.stat.name)}`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/5 p-6 h-full min-h-80 flex flex-col items-center justify-center text-center">
              <HelpCircle className="h-10 w-10 text-slate-600 mb-2" />
              <h4 className="text-sm font-bold text-white">No Pokémon Compiled</h4>
              <p className="text-xs text-slate-500 max-w-xs mt-1">Search or choose a quick select target to retrieve specifications from the PokeAPI.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
