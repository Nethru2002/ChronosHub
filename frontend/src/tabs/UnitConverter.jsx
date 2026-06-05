import { useState } from 'react';

// The Unit & Currency Map
const UNIT_MAP = {
  currency: [
    "USD", "LKR", "INR", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "CNY", "HKD", "NZD", 
    "SEK", "KRW", "SGD", "NOK", "MXN", "RUB", "ZAR", "TRY", "BRL", "TWD", "DKK", "PLN", 
    "THB", "IDR", "HUF", "CZK", "ILS", "CLP", "PHP", "AED", "COP", "SAR", "MYR", "RON", 
    "VND", "ARS", "IQD", "EGP", "KWD", "PKR", "BDT", "UAH", "QAR", "KZT", "OMR", "LBP", 
    "DZD", "MAD", "VUV", "MVR", "AFN", "ALL", "AMD", "ANG", "AOA", "AWG", "AZN", "BAM", 
    "BBD", "BGN", "BHD", "BIF", "BMD", "BND", "BOB", "BSD", "BTN", "BWP", "BYN", "BZD", 
    "CDF", "CRC", "CUP", "CVE", "DJF", "DOP", "ERN", "ETB", "FJD", "FKP", "FOK", "GEL", 
    "GGP", "GHS", "GIP", "GMD", "GNF", "GTQ", "GYD", "HNL", "HRK", "HTG", "ISK", "JEP", 
    "JMD", "JOD", "KES", "KGS", "KHR", "KID", "KMF", "KYD", "LAK", "LRD", "LSL", "LYD", 
    "MDL", "MGA", "MKD", "MMK", "MNT", "MOP", "MRU", "MUR", "MWK", "MZN", "NAD", "NGN", 
    "NIO", "NPR", "PAB", "PEN", "PGK", "PYG", "RSD", "RWF", "SBD", "SCR", "SDG", "SHP", 
    "SLL", "SOS", "SRD", "SSP", "STN", "SYP", "SZL", "TJS", "TMT", "TND", "TOP", "TTD", 
    "TVD", "TZS", "UGX", "UYU", "UZS", "WST", "XAF", "XCD", "XDR", "XOF", "XPF", "YER", "ZMW"
  ],
  length: ["mm", "cm", "m", "km", "in", "ft", "yd", "mi", "nautical_mi", "lightyear", "astronomical_unit"],
  mass: ["mg", "g", "kg", "t", "oz", "lb", "st", "carat"],
  temperature: ["c", "f", "k"],
  area: ["mm2", "cm2", "m2", "km2", "in2", "ft2", "ac", "ha"],
  volume: ["ml", "l", "m3", "tsp", "tbsp", "cup", "pt", "qt", "gal", "barrel"],
  speed: ["m/s", "km/h", "mph", "knot", "mach"],
  data: ["b", "B", "kb", "KB", "mb", "MB", "gb", "GB", "tb", "TB", "pb", "PB"],
  pressure: ["pa", "hpa", "bar", "psi", "atm", "torr"],
  energy: ["j", "kj", "cal", "kcal", "wh", "kwh", "ev", "btu"]
};

export default function UnitConverter() {
  const [val, setVal] = useState(1);
  const [cat, setCat] = useState('currency'); // Default to Currency
  const [from, setFrom] = useState('USD');    // Default Source
  const [to, setTo] = useState('LKR');        // Default Target (USD to LKR)
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to change category and reset units simultaneously
  const handleCategoryChange = (newCat) => {
    setCat(newCat);
    const units = UNIT_MAP[newCat];
    setFrom(units[0]);
    setTo(units[1] || units[0]);
    setResult(null); // Clear old results
  };

  const runConversion = async () => {
    setLoading(true);
    try {
      // Determine which API endpoint to hit
      const isCurrency = cat === 'currency';
      const endpoint = isCurrency ? 'currency' : 'convert';
      const params = isCurrency 
        ? `f=${from}&t=${to}&v=${val}` 
        : `cat=${cat}&val=${val}&f=${from}&t=${to}`;

      const res = await fetch(`http://localhost:8000/${endpoint}?${params}`);
      const json = await res.json();
      
      if (json.error) {
        alert(json.error);
      } else {
        setResult(json.result);
      }
    } catch {
      alert("Conversion Engine Offline. Please check backend connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in zoom-in duration-700">
      <div className="bg-[#08080a] p-8 md:p-12 rounded-[3.5rem] border border-white/10 shadow-2xl">
        
        <h2 className="text-center text-indigo-500 font-black text-[10px] uppercase tracking-[0.5em] mb-10">
          Universal Measurement & Exchange Hub
        </h2>

        {/* CATEGORY NAV */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {Object.keys(UNIT_MAP).map(unitCat => (
            <button 
              key={unitCat} 
              onClick={() => handleCategoryChange(unitCat)}
              className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all
              ${cat === unitCat 
                ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-900/40' 
                : 'bg-white/5 border-white/5 text-gray-500 hover:text-gray-300'}`}
            >
              {unitCat}
            </button>
          ))}
        </div>

        <div className="space-y-8">
          {/* MAGNITUDE INPUT */}
          <div className="bg-black/40 p-8 rounded-3xl border border-white/5">
            <label className="text-[9px] text-gray-600 font-black uppercase tracking-widest block mb-4">Quantity to Convert</label>
            <input 
              type="number" 
              value={val} 
              onChange={(e) => setVal(e.target.value)}
              className="w-full bg-transparent text-5xl font-black text-white outline-none focus:text-indigo-400 transition-all font-mono" 
            />
          </div>

          {/* UNIT SELECTION GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
              <label className="text-[8px] text-gray-600 font-black uppercase block mb-3 italic">Source ({from})</label>
              <select 
                value={from} 
                onChange={(e) => setFrom(e.target.value)} 
                className="w-full bg-transparent outline-none font-mono text-indigo-400 uppercase font-bold text-sm cursor-pointer"
              >
                {UNIT_MAP[cat].map(u => <option key={u} value={u} className="bg-[#08080a]">{u}</option>)}
              </select>
            </div>
            <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
              <label className="text-[8px] text-gray-600 font-black uppercase block mb-3 italic">Target ({to})</label>
              <select 
                value={to} 
                onChange={(e) => setTo(e.target.value)} 
                className="w-full bg-transparent outline-none font-mono text-indigo-400 uppercase font-bold text-sm cursor-pointer"
              >
                {UNIT_MAP[cat].map(u => <option key={u} value={u} className="bg-[#08080a]">{u}</option>)}
              </select>
            </div>
          </div>

          <button 
            onClick={runConversion} 
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 py-7 rounded-[2rem] font-black text-xs uppercase tracking-[0.5em] transition-all transform active:scale-95 shadow-2xl shadow-indigo-900/40"
          >
            {loading ? "SYNCING REAL-TIME DATA..." : "Compute Conversion"}
          </button>

          {/* RESULT DISPLAY */}
          {result !== null && (
            <div className="mt-12 text-center py-10 border-t border-white/5 animate-in slide-in-from-top-6 duration-500">
              <div className="text-[10px] text-gray-600 font-black uppercase tracking-widest mb-4">Calculated Value</div>
              <div className="text-7xl font-black text-white tracking-tighter break-all">
                  {typeof result === 'number' 
                    ? result.toLocaleString(undefined, { maximumFractionDigits: 6 }) 
                    : result}
              </div>
              <div className="text-sm text-indigo-500 font-black uppercase mt-4 tracking-[0.4em]">{to}</div>
            </div>
          )}
        </div>
      </div>

      <footer className="mt-8 text-center text-[8px] text-gray-700 font-bold uppercase tracking-[0.5em]">
        Status: {cat === 'currency' ? 'Live FX Stream Active' : 'Mathematical Constant Engine Active'}
      </footer>
    </div>
  );
}