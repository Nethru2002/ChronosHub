import { useState } from 'react';

export default function DevTools() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const run = async (act) => {
    const res = await fetch(`http://localhost:8000/dev?action=${act}&text=${input}`);
    const json = await res.json();
    setOutput(json.result);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <textarea value={input} onChange={e=>setInput(e.target.value)} placeholder="Enter string or data..."
        className="w-full bg-black h-32 p-6 rounded-3xl border border-white/10 outline-none font-mono text-orange-500 shadow-inner"/>
      <div className="grid grid-cols-3 gap-3">
        <button onClick={()=>run('hash')} className="bg-orange-600/20 border border-orange-600/30 text-orange-400 p-4 rounded-xl font-bold text-[10px] uppercase">SHA-256 Hash</button>
        <button onClick={()=>run('b64_enc')} className="bg-orange-600/20 border border-orange-600/30 text-orange-400 p-4 rounded-xl font-bold text-[10px] uppercase">Base64 Encode</button>
        <button onClick={()=>run('gen_pass')} className="bg-orange-600 text-black p-4 rounded-xl font-black text-[10px] uppercase">Gen Password</button>
      </div>
      {output && (
        <div className="bg-white/5 p-6 rounded-2xl border border-white/10 font-mono break-all text-xs text-orange-200">
          {output}
        </div>
      )}
    </div>
  );
}