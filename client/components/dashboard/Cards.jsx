export const ResourceCard = ({ type, title, category }) => {
    const getIcon = () => {
      switch(type) {
        case 'article': return '📄';
        case 'podcast': return '🎧';
        case 'video': return '📹';
        default: return '📁';
      }
    };
  
    return (
      <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl border border-slate-200/60 hover:border-indigo-200/80 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        <div className="text-4xl mb-4 opacity-80">{getIcon()}</div>
        <h3 className="text-xl font-semibold text-slate-800 mb-2">{title}</h3>
        <span className="inline-block bg-indigo-100/50 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
          {category}
        </span>
      </div>
    );
  };
  
  export const SessionCard = ({ professional, datetime, status }) => (
    <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl border border-slate-200/60 hover:shadow-lg transition-all duration-300">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">{professional.name}</h3>
          <p className="text-slate-600 text-sm mt-1">{professional.specialty}</p>
          <p className="text-sm text-slate-500 mt-2">
            {new Date(datetime).toLocaleString()}
          </p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          status === 'confirmed' 
            ? 'bg-green-100/50 text-green-700' 
            : 'bg-yellow-100/50 text-yellow-700'
        }`}>
          {status}
        </span>
      </div>
      <div className="mt-6 flex gap-3">
        <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-teal-500 text-white rounded-lg hover:from-indigo-700 hover:to-teal-600 transition-all shadow-sm hover:shadow-md">
          Join Session
        </button>
        <button className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-all">
          Cancel
        </button>
      </div>
    </div>
  );
  