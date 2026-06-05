import { useState } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, ReferenceLine 
} from 'recharts';

export default function ScienceCalc() {
  const [expr, setExpr] = useState("");
  const [data, setData] = useState(null);
  const [history, setHistory] = useState([]);

  const buttons = [
    ['(', ')', 'x', 'Clear'],
    ['sin(', 'cos(', 'tan(', '/'],
    ['7', '8', '9', '*'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', 'sqrt(', 'Evaluate']
  ];

  const handleAction = async (val) => {
    if (val === 'Clear') return setExpr("");
    if (val === 'Evaluate') {
      try {
        const res = await fetch(`http://localhost:8000/math?expr=${encodeURIComponent(expr)}`);
        const json = await res.json();
        if (json.error) alert(json.error);
        else {
          setData(json);
          setHistory(prev => [`${expr} = ${json.numeric}`, ...prev.slice(0, 4)]);
        }
      } catch { alert("Math Engine Offline"); }
      return;
    }
    setExpr(expr + val);
  };

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in zoom-in duration-500">
      
      {/* KEYPAD & INPUT SECTION */}
      <div className="bg-[#0f0f13] p-8 rounded-[2.5rem] border border-white/10 shadow-2xl">
        <div className="mb-6 bg-black/50 p-6 rounded-2xl border border-white/5">
          <input 
            type="text" 
            value={expr} 
            onChange={(e) => setExpr(e.target.value)}
            className="w-full bg-transparent text-3xl font-mono text-blue-400 outline-none text-right"
            placeholder="0"
          />
          {data && (
            <div className="mt-4 text-right border-t border-white/5 pt-4">
              <div className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Numeric Result</div>
              <div className="text-4xl font-bold text-white tracking-tighter">{data.numeric}</div>
              <div className="text-[10px] text-blue-500 font-mono mt-1 opacity-70 italic">Symbolic: {data.symbolic}</div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-4 gap-2">
          {buttons.flat().map((btn) => (
            <button key={btn} onClick={() => handleAction(btn)}
              className={`p-4 rounded-xl font-bold text-[10px] uppercase transition-all active:scale-95
                ${btn === 'Evaluate' ? 'bg-blue-600 text-white' : 
                  btn === 'Clear' ? 'bg-red-900/20 text-red-400' : 
                  'bg-white/5 hover:bg-white/10 text-gray-300'}`}>
              {btn}
            </button>
          ))}
        </div>
      </div>

      {/* GRAPHING & HISTORY SECTION */}
      <div className="flex flex-col gap-6">
        {data?.graph?.length > 0 ? (
          <div className="bg-black/50 p-6 rounded-[2.5rem] border border-white/10 h-72 shadow-2xl relative">
            <h3 className="absolute top-4 left-6 text-[9px] font-black text-blue-500 uppercase tracking-widest">Function Visualizer</h3>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.graph} margin={{ top: 40, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                <XAxis dataKey="x" hide />
                <YAxis stroke="#444" fontSize={10} />
                <Tooltip contentStyle={{ backgroundColor: '#000', border: 'none', borderRadius: '12px', fontSize: '10px' }} />
                <ReferenceLine y={0} stroke="#444" />
                <ReferenceLine x={0} stroke="#444" />
                <Line type="monotone" dataKey="y" stroke="#3b82f6" strokeWidth={3} dot={false} animationDuration={1000} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="bg-white/5 p-8 rounded-[2.5rem] border border-dashed border-white/10 flex flex-col items-center justify-center h-72 text-center">
             <p className="text-[10px] text-gray-600 uppercase font-bold tracking-widest">Input an equation with 'x' to see graph</p>
             <p className="text-[9px] text-gray-700 mt-2 font-mono italic">Example: sin(x) * 5</p>
          </div>
        )}

        <div className="bg-white/5 p-6 rounded-[2rem] border border-white/5 flex-1">
          <h3 className="text-[9px] text-gray-600 font-black uppercase tracking-[0.3em] mb-4">Calculation Tape</h3>
          <div className="space-y-2">
            {history.map((h, i) => (
              <div key={i} className="text-[11px] font-mono text-gray-500 border-l border-white/10 pl-3 py-1">{h}</div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}