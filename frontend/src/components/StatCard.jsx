const StatCard = ({ title, value, unit, color }) => {
  const colorClasses = {
    blue: "border-blue-500 text-blue-400",
    green: "border-green-500 text-green-400",
    purple: "border-purple-500 text-purple-400",
    orange: "border-orange-500 text-orange-400",
    red: "border-red-500 text-red-400",
    indigo: "border-indigo-500 text-indigo-400"
  };

  return (
    <div className={`p-5 bg-gray-900 rounded-2xl border-l-4 shadow-xl ${colorClasses[color] || "border-gray-700"}`}>
      <h3 className="text-gray-500 text-[10px] uppercase font-black tracking-widest mb-1">{title}</h3>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-mono font-bold text-white leading-none">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </span>
        {unit && <span className="text-gray-600 text-xs font-bold uppercase">{unit}</span>}
      </div>
    </div>
  );
};

export default StatCard;