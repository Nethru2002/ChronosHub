import { useState, useEffect } from 'react';
import StatCard from '../components/StatCard';

export default function TimeEngine() {
  const [startDate, setStartDate] = useState("2000-01-01T12:00:00");
  const [endDate, setEndDate] = useState(new Date().toISOString().split('.')[0]);
  const [isLive, setIsLive] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    let interval;
    if (isLive) {
      interval = setInterval(() => {
        const now = new Date();
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
        setEndDate(now.toISOString().split('.')[0]);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isLive]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`http://localhost:8000/calculate?start=${startDate}&end=${endDate}`);
        const json = await res.json();
        if (json.hierarchical) setData(json);
      } catch {
        console.log("Waiting for Engine...");
      }
    };
    fetchStats();
  }, [startDate, endDate]);

  return (
    <div className="animate-in fade-in duration-500 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 bg-white/5 p-6 rounded-3xl border border-white/10">
        <div className="space-y-1">
          <label className="text-gray-500 text-[9px] font-black uppercase ml-2">Start Point</label>
          <input type="datetime-local" step="1" value={startDate} onChange={(e) => {setStartDate(e.target.value); setIsLive(false);}} className="w-full bg-black p-4 rounded-2xl border border-white/10 font-mono text-sm outline-none focus:border-blue-500 transition-all"/>
        </div>
        <div className="space-y-1 relative">
          <label className="text-gray-500 text-[9px] font-black uppercase ml-2">Target Point</label>
          <input type="datetime-local" step="1" value={endDate} onChange={(e) => {setEndDate(e.target.value); setIsLive(false);}} className="w-full bg-black p-4 rounded-2xl border border-white/10 font-mono text-sm outline-none focus:border-blue-500 transition-all"/>
          <button onClick={() => setIsLive(!isLive)} className={`absolute right-3 top-9 text-[9px] px-2 py-1 rounded font-black transition-all ${isLive ? 'bg-blue-600 text-white animate-pulse' : 'bg-gray-800 text-gray-500'}`}>
            {isLive ? "LIVE SYNC" : "MANUAL"}
          </button>
        </div>
      </div>

      {data && (
        <div className="space-y-12">
          <section>
            <h2 className="text-blue-500 text-[10px] font-black uppercase tracking-[0.4em] mb-4">Hierarchical Breakdown</h2>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
              <StatCard title="Years" value={data.hierarchical.years} color="blue" />
              <StatCard title="Months" value={data.hierarchical.months} color="blue" />
              <StatCard title="Days" value={data.hierarchical.days} color="blue" />
              <StatCard title="Hrs" value={data.hierarchical.hours} color="blue" />
              <StatCard title="Min" value={data.hierarchical.minutes} color="blue" />
              <StatCard title="Sec" value={data.hierarchical.seconds} color="blue" />
            </div>
          </section>

          <section className="pb-20">
            <h2 className="text-blue-500 text-[10px] font-black uppercase tracking-[0.4em] mb-4">Total Absolute Accumulation</h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              <StatCard title="Total Weeks" value={data.absolute_totals.total_weeks} color="purple" />
              <StatCard title="Total Days" value={data.absolute_totals.total_days} color="purple" />
              <StatCard title="Total Hours" value={data.absolute_totals.total_hours} color="purple" />
              <StatCard title="Total Minutes" value={data.absolute_totals.total_minutes} color="purple" />
              <StatCard title="Total Seconds" value={data.absolute_totals.total_seconds} color="purple" />
            </div>
          </section>
        </div>
      )}
    </div>
  );
}