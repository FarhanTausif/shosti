export const ContentSubmissionForm = () => {
  return (
    <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl border border-slate-200/60">
      <h3 className="text-xl font-semibold text-slate-800 mb-6">Submit New Content</h3>
      <form className="space-y-5">
        <input
          type="text"
          placeholder="Title"
          className="w-full px-4 py-2.5 border border-slate-200/60 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all"
        />
        <select className="w-full px-4 py-2.5 border border-slate-200/60 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all">
          <option>Select Category</option>
          <option>Stress Management</option>
          <option>Anxiety</option>
          <option>Mindfulness</option>
        </select>
        <textarea
          rows="4"
          placeholder="Content Description"
          className="w-full px-4 py-2.5 border border-slate-200/60 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all"
        ></textarea>
        <button className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-teal-500 text-white rounded-lg font-medium hover:from-indigo-700 hover:to-teal-600 transition-all transform hover:scale-[1.02] shadow-sm">
          Submit Content
        </button>
      </form>
    </div>
  );
};

export const MhpSessionCard = ({ attendee, datetime, status }) => {
  return (
    <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl border border-slate-200/60 hover:shadow-lg transition-all duration-300">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">{attendee.name}</h3>
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
        <button className="px-4 py-2 bg-gradient-to-r from-green-600 to-teal-500 text-white rounded-lg hover:from-green-700 hover:to-teal-600 transition-all shadow-sm hover:shadow-md">
          Approve
        </button>
        <button className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-all">
          Reject
        </button>
      </div>
    </div>
  );
};
