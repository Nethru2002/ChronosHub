import { useState, useEffect, useMemo } from 'react';

export default function WorldTime() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [search, setSearch] = useState("");

  // 1. Get all supported IANA timezones from the browser
  const allTimezones = useMemo(() => {
    try {
      return Intl.supportedValuesOf('timeZone');
    } catch {
      // Fallback if browser is very old
      return ["UTC", "America/New_York", "Europe/London", "Asia/Tokyo", "Asia/Dubai", "Australia/Sydney"];
    }
  }, []);

  // 2. Live Update Effect
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // 3. Filtered list based on search
  const filteredZones = allTimezones.filter(tz => 
    tz.toLowerCase().includes(search.toLowerCase().replace(" ", "_"))
  ).slice(0, 40); // Limit to 40 for performance, searchable for the rest

  const formatTime = (tz) => {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: tz,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    }).format(currentTime);
  };

  const getOffset = (tz) => {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: tz,
      timeZoneName: 'shortOffset'
    }).formatToParts(currentTime);
    return parts.find(p => p.type === 'timeZoneName')?.value || "";
  };

  const getDate = (tz) => {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: tz,
      month: 'short',
      day: 'numeric'
    }).format(currentTime);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* SEARCH BAR */}
      <div className="relative max-w-md mx-auto">
        <input 
          type="text" 
          placeholder="Search Country or City (e.g. India, Paris, New York)..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white/5 border border-white/10 p-4 pl-12 rounded-2xl outline-none focus:border-red-500 transition-all font-mono text-xs uppercase tracking-widest"
        />
        <span className="absolute left-4 top-4 opacity-30 text-red-500">🔍</span>
      </div>

      {/* CLOCK GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredZones.map(tz => (
          <div key={tz} className="bg-[#0f0f13] p-6 rounded-3xl border border-white/5 hover:border-red-500/30 transition-all group shadow-xl">
            <div className="flex justify-between items-start mb-4">
              <div className="text-[9px] font-black text-red-500 uppercase tracking-widest truncate pr-2">
                {tz.split('/').pop().replace('_', ' ')}
              </div>
              <div className="text-[8px] font-mono text-gray-600 bg-black px-2 py-1 rounded">
                {getOffset(tz)}
              </div>
            </div>
            
            <div className="text-3xl font-bold font-mono tracking-tighter text-white group-hover:text-red-400 transition-colors">
              {formatTime(tz).split(' ')[0]} 
              <span className="text-xs ml-1 opacity-50 uppercase">{formatTime(tz).split(' ')[1]}</span>
            </div>

            <div className="mt-2 flex justify-between items-center border-t border-white/5 pt-3">
              <span className="text-[9px] text-gray-500 font-bold uppercase">{getDate(tz)}</span>
              <span className="text-[8px] text-gray-700 italic font-mono">{tz.split('/')[0]}</span>
            </div>
          </div>
        ))}
      </div>

      {filteredZones.length === 0 && (
        <div className="text-center py-20 text-gray-600 font-mono text-xs uppercase tracking-[0.3em]">
          No location found in database.
        </div>
      )}

      <footer className="text-center text-[8px] text-gray-700 font-black uppercase tracking-[0.5em] pb-10">
        Total Indexed Locations: {allTimezones.length}
      </footer>
    </div>
  );
}