import { useState } from 'react';
import StatCard from '../components/StatCard';

export default function Finance() {
  const [p, setP] = useState(50000);
  const [r, setR] = useState(8.5);
  const [t, setT] = useState(24);
  const [res, setRes] = useState(null);

  const calc = async () => {
    const response = await fetch(`http://localhost:8000/finance?p=${p}&r=${r}&t=${t}`);
    const json = await response.json();
    setRes(json);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white/5 p-6 rounded-3xl border border-white/10">
        <input type="number" value={p} onChange={e=>setP(e.target.value)} placeholder="Principal" className="bg-black p-4 rounded-xl border border-white/10 outline-none text-green-500 font-mono"/>
        <input type="number" value={r} onChange={e=>setR(e.target.value)} placeholder="Rate %" className="bg-black p-4 rounded-xl border border-white/10 outline-none text-green-500 font-mono"/>
        <input type="number" value={t} onChange={e=>setT(e.target.value)} placeholder="Months" className="bg-black p-4 rounded-xl border border-white/10 outline-none text-green-500 font-mono"/>
        <button onClick={calc} className="bg-green-600 p-4 rounded-xl font-black uppercase text-xs tracking-widest">Calculate EMI</button>
      </div>
      {res && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard title="Monthly EMI" value={res.emi} color="green" />
          <StatCard title="Total Interest" value={res.interest} color="green" />
          <StatCard title="Total Payment" value={res.total} color="green" />
        </div>
      )}
    </div>
  );
}