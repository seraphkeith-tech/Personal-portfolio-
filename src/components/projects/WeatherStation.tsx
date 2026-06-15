import React, { useState } from 'react';
import { Search, Sun, CloudRain, Cloud, Snowflake, CloudLightning, Wind, Droplets, Thermometer, Compass, Share2 } from 'lucide-react';
import { WeatherData } from '../../types';

export default function WeatherStation() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentWeather, setCurrentWeather] = useState<WeatherData>({
    city: 'San Francisco',
    temp: 64,
    condition: 'cloudy',
    humidity: 78,
    windSpeed: 12,
    description: 'Overcast skies flowing from the Pacific Ocean.'
  });
  const [loading, setLoading] = useState(false);

  // High-fidelity database of preset cities
  const cityPresets: Record<string, WeatherData> = {
    'san francisco': {
      city: 'San Francisco',
      temp: 64,
      condition: 'cloudy',
      humidity: 78,
      windSpeed: 12,
      description: 'Overcast skies flowing from the Pacific Ocean.'
    },
    'london': {
      city: 'London',
      temp: 52,
      condition: 'rainy',
      humidity: 90,
      windSpeed: 15,
      description: 'Drizzling rain and mist across the Thames.'
    },
    'kyoto': {
      city: 'Kyoto',
      temp: 72,
      condition: 'sunny',
      humidity: 45,
      windSpeed: 6,
      description: 'Clear sunny sky framing the maple temples.'
    },
    'nairobi': {
      city: 'Nairobi',
      temp: 78,
      condition: 'sunny',
      humidity: 50,
      windSpeed: 8,
      description: 'Pleasant tropical breeze and high sun index.'
    },
    'vancouver': {
      city: 'Vancouver',
      temp: 28,
      condition: 'snowy',
      humidity: 85,
      windSpeed: 18,
      description: 'Fresh powder snowfall framing the Coastal Mountains.'
    },
    'sydney': {
      city: 'Sydney',
      temp: 68,
      condition: 'thunderstorm',
      humidity: 82,
      windSpeed: 24,
      description: 'Electrical summer thunderstorms warning near the harbour.'
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    const sanitizedInput = searchQuery.trim().toLowerCase();

    setTimeout(() => {
      if (cityPresets[sanitizedInput]) {
        setCurrentWeather(cityPresets[sanitizedInput]);
      } else {
        // Procedural generator: Hash the city name string to calculate realistic values!
        // This ensures the user gets a working card for ANY city they search!
        const hash = sanitizedInput.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        
        const possibleConditions: WeatherData['condition'][] = ['sunny', 'rainy', 'cloudy', 'snowy', 'thunderstorm'];
        const chosenCondition = possibleConditions[hash % possibleConditions.length];
        
        // Logical ranges based on condition
        let temp = 30 + (hash % 60); // 30°F -> 90°F
        if (chosenCondition === 'snowy') temp = 10 + (hash % 22);
        if (chosenCondition === 'sunny') temp = 70 + (hash % 25);

        const humidity = 20 + (hash % 75);
        const windSpeed = 3 + (hash % 22);
        
        const descriptorMap: Record<WeatherData['condition'], string> = {
          sunny: 'A bright high-index sunny sky with gentle air movement.',
          rainy: 'A dense atmosphere bringing consistent light showers.',
          cloudy: 'A calm overcast day with soft charcoal light filters.',
          snowy: 'Colder layers of air bringing serene white snow flurries.',
          thunderstorm: 'Heavy charging clouds accompanied by low rumbling sounds.'
        };

        setCurrentWeather({
          city: searchQuery.trim(),
          temp,
          condition: chosenCondition,
          humidity,
          windSpeed,
          description: descriptorMap[chosenCondition]
        });
      }
      setLoading(false);
      setSearchQuery('');
    }, 600);
  };

  const getWeatherVisuals = (condition: WeatherData['condition']) => {
    switch (condition) {
      case 'sunny':
        return {
          bg: 'from-amber-500/10 via-orange-500/5 to-slate-950 border-amber-500/20',
          badge: 'bg-amber-950/40 text-amber-400 border-amber-500/20',
          icon: <Sun className="h-10 w-10 text-amber-400 animate-[spin_10s_linear_infinite]" />
        };
      case 'rainy':
        return {
          bg: 'from-blue-500/10 via-indigo-500/5 to-slate-950 border-blue-500/20',
          badge: 'bg-blue-950/40 text-blue-400 border-blue-500/20',
          icon: <CloudRain className="h-10 w-10 text-blue-400" />
        };
      case 'snowy':
        return {
          bg: 'from-sky-400/10 via-slate-400/5 to-slate-950 border-sky-400/20',
          badge: 'bg-sky-950/40 text-sky-400 border-sky-400/20',
          icon: <Snowflake className="h-10 w-10 text-sky-400" />
        };
      case 'thunderstorm':
        return {
          bg: 'from-purple-500/10 via-fuchsia-500/5 to-slate-950 border-purple-500/20',
          badge: 'bg-purple-950/40 text-purple-400 border-purple-500/20',
          icon: <CloudLightning className="h-10 w-10 text-purple-400 animate-bounce" />
        };
      case 'cloudy':
      default:
        return {
          bg: 'from-slate-500/15 via-slate-700/5 to-slate-950 border-slate-700/40',
          badge: 'bg-slate-950 text-slate-400 border-slate-800',
          icon: <Cloud className="h-10 w-10 text-slate-400" />
        };
    }
  };

  const theme = getWeatherVisuals(currentWeather.condition);

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between border-b border-slate-800/80 pb-4">
        <div>
          <h3 className="text-lg font-bold text-white">Stage 3: Weather Station App</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm">
            Discovering RESTful communication and formatting JSON buffers. Search presets or try typing your own hometown!
          </p>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-3xs text-slate-500">
          <Compass className="h-3.5 w-3.5 text-slate-600 animate-spin" />
          <span>STAGE_3_API</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Search & Quick selectors */}
        <div className="lg:col-span-5 space-y-5">
          {/* Quick preset chips */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/10 p-5 space-y-3.5">
            <span className="text-3xs font-mono text-slate-500 uppercase tracking-widest block">CHOOSE PRESET TARGETS</span>
            <div className="grid grid-cols-2 gap-2">
              {Object.keys(cityPresets).map((preset) => {
                const cityMeta = cityPresets[preset];
                const isActive = currentWeather.city.toLowerCase() === preset;
                return (
                  <button
                    key={preset}
                    id={`weather-preset-${preset}`}
                    onClick={() => {
                      setLoading(true);
                      setTimeout(() => {
                        setCurrentWeather(cityMeta);
                        setLoading(false);
                      }, 300);
                    }}
                    className={`text-left p-3 rounded-xl border text-xs transition-all cursor-pointer flex flex-col justify-between h-20 ${
                      isActive
                        ? 'bg-indigo-950/20 border-indigo-500/40 text-white font-bold'
                        : 'bg-slate-950/40 border-slate-900 text-slate-400 hover:border-slate-800 hover:bg-slate-900/30 hover:text-slate-200'
                    }`}
                  >
                    <span className="truncate">{cityMeta.city}</span>
                    <span className="text-sm font-bold font-mono text-indigo-400 mt-1">{cityMeta.temp}°F</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="relative">
            <input
              id="weather-search-input"
              type="text"
              placeholder="Query custom city (e.g. New York, Tokyo)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-12 pl-4 py-3 text-sm rounded-xl border border-slate-800 bg-slate-950 placeholder-slate-600 text-slate-200 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-sans"
            />
            <button
              id="weather-search-btn"
              type="submit"
              disabled={loading}
              className="absolute right-2 top-2 h-8 w-8 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center cursor-pointer disabled:opacity-50"
              title="Search city weather"
            >
              <Search className="h-4 w-4" />
            </button>
          </form>
        </div>

        {/* Right Ambient Current Card */}
        <div className="lg:col-span-7">
          <div className={`h-full rounded-2xl border p-6 flex flex-col justify-between bg-gradient-to-br transition-all duration-500 relative overflow-hidden min-h-80 ${theme.bg}`}>
            {/* Top Stats Header */}
            <div className="flex items-start justify-between relative z-10">
              <div className="space-y-1">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-2xs font-mono uppercase border ${theme.badge}`}>
                  {currentWeather.condition}
                </span>
                <h4 className="text-2xl font-black text-white">{currentWeather.city}</h4>
              </div>
              {theme.icon}
            </div>

            {/* Middle Big Temperature reading */}
            {loading ? (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-700 border-t-indigo-400" />
                <span className="text-3xs font-mono text-slate-400 mt-2">Deregistering API payload...</span>
              </div>
            ) : (
              <div className="py-6 flex items-baseline gap-1 relative z-10">
                <span className="text-5xl font-black text-white font-mono tracking-tighter">{currentWeather.temp}</span>
                <span className="text-2xl font-bold text-indigo-400 font-mono">°F</span>
              </div>
            )}

            {/* Bottom Widgets grid */}
            <div className="space-y-4 relative z-10 border-t border-slate-800/50 pt-4">
              <p className="text-xs text-slate-300 leading-normal italic font-sans">
                "{currentWeather.description}"
              </p>

              <div className="grid grid-cols-2 gap-3 text-2xs font-mono">
                <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-900 flex items-center gap-2.5">
                  <Droplets className="h-4 w-4 text-sky-400 shrink-0" />
                  <div>
                    <span className="text-slate-500 block">HUMIDITY</span>
                    <span className="text-slate-200 font-bold font-mono">{currentWeather.humidity}%</span>
                  </div>
                </div>

                <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-900 flex items-center gap-2.5">
                  <Wind className="h-4 w-4 text-emerald-400 shrink-0" />
                  <div>
                    <span className="text-slate-500 block">WIND SPEED</span>
                    <span className="text-slate-200 font-bold font-mono">{currentWeather.windSpeed} mph</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
