import { useState } from 'react';
import TimeEngine from './tabs/TimeEngine';
import ScienceCalc from './tabs/ScienceCalc';
import UnitConverter from './tabs/UnitConverter';
import Finance from './tabs/Finance';
import DevTools from './tabs/DevTools';
import WorldTime from './tabs/WorldTime';

function App() {
  const [tab, setTab] = useState('time');

  const navItems = [
    { id: 'time', label: 'Chronos', color: 'text-blue-500' },
    { id: 'math', label: 'Math/Graph', color: 'text-cyan-400' },
    { id: 'unit', label: 'Convert/FX', color: 'text-purple-500' },
    { id: 'finance', label: 'Finance', color: 'text-green-500' },
    { id: 'dev', label: 'DevTools', color: 'text-orange-500' },
    { id: 'world', label: 'World', color: 'text-red-500' },
  ];

  return (
    <div className="min-h-screen bg-[#020203] text-white">
      <nav className="flex flex-wrap justify-center gap-4 p-6 bg-black/50 border-b border-white/5 sticky top-0 z-50 backdrop-blur-xl">
        {navItems.map(item => (
          <button key={item.id} onClick={() => setTab(item.id)}
            className={`text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full transition-all 
            ${tab === item.id ? `${item.color} bg-white/5` : 'text-gray-600 hover:text-gray-300'}`}>
            {item.label}
          </button>
        ))}
      </nav>

      <main className="p-4 md:p-10 max-w-7xl mx-auto">
        {tab === 'time' && <TimeEngine />}
        {tab === 'math' && <ScienceCalc />}
        {tab === 'unit' && <UnitConverter />}
        {tab === 'finance' && <Finance />}
        {tab === 'dev' && <DevTools />}
        {tab === 'world' && <WorldTime />}
      </main>
    </div>
  );
}
export default App;