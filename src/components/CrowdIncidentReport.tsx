import React, { useState } from 'react';
import { 
  Users, 
  AlertCircle, 
  MapPin, 
  ThumbsUp, 
  ShieldAlert, 
  Plus, 
  Camera, 
  CheckCircle2,
  Clock
} from 'lucide-react';
import { IncidentReport } from '../types';

interface CrowdIncidentReportProps {
  reports: IncidentReport[];
  onAddReport: (report: Omit<IncidentReport, 'id' | 'timestamp' | 'verifiedByCommunity' | 'upvotesCount'>) => void;
  onUpvoteReport: (id: string) => void;
}

export const CrowdIncidentReport: React.FC<CrowdIncidentReportProps> = ({
  reports,
  onAddReport,
  onUpvoteReport,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [type, setType] = useState<IncidentReport['type']>('HARASSMENT');
  const [description, setDescription] = useState('');
  const [locationName, setLocationName] = useState('');
  const [severity, setSeverity] = useState<IncidentReport['severity']>('HIGH');
  const [hasPhoto, setHasPhoto] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !locationName) return;

    onAddReport({
      type,
      description,
      lat: 28.6145,
      lng: 77.2070,
      locationName,
      severity,
      reportedBy: 'Verified SafeGuard User',
      hasPhoto,
    });

    setDescription('');
    setLocationName('');
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
            <Users className="w-4 h-4 text-rose-400" />
            <span>COMMUNITY SAFETY ALERT FEED</span>
          </div>
          <h2 className="text-2xl font-black text-white mt-1">
            Crowd-Sourced Incident Reporting
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Report harassment, stalking, poor lighting, or suspicious activity to keep nearby women informed and generate safety heatmaps.
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-600/30 transition"
        >
          <Plus className="w-4 h-4" />
          <span>{showForm ? 'Cancel' : 'Report New Incident'}</span>
        </button>
      </div>

      {/* Incident Form Modal */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-slate-900 border border-rose-500/40 rounded-2xl p-6 space-y-4 shadow-2xl animate-fade-in">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400" />
            <span>Submit Community Incident Report</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Incident Category</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-rose-500"
              >
                <option value="HARASSMENT">Catcalling / Harassment</option>
                <option value="STALKING">Stalking / Following</option>
                <option value="SUSPICIOUS_PERSON">Suspicious Person</option>
                <option value="UNSAFE_LOCATION">Unsafe / Dark Location</option>
                <option value="THEFT">Theft / Snatching</option>
                <option value="ASSAULT">Physical Threat / Assault</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Location Name / Landmark</label>
              <input
                type="text"
                required
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                placeholder="e.g. Sector 11 Railway Underpass"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Severity Level</label>
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value as any)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-rose-500"
              >
                <option value="HIGH">High Severity (Active Danger)</option>
                <option value="MEDIUM">Medium Severity (Caution Needed)</option>
                <option value="LOW">Low Severity (Infra Issue)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1 text-xs">Description</label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide brief details about what happened..."
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white text-xs focus:outline-none focus:border-rose-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="bg-slate-800 text-slate-300 font-bold px-4 py-2 rounded-xl text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-rose-600 hover:bg-rose-500 text-white font-bold px-5 py-2 rounded-xl text-xs transition shadow-lg"
            >
              Publish Report to Community Feed
            </button>
          </div>
        </form>
      )}

      {/* Incident List Feed */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-rose-400" />
          <span>Active Community Reports & Hazards ({reports.length})</span>
        </h3>

        <div className="space-y-4">
          {reports.map((rep) => (
            <div
              key={rep.id}
              className="p-4 bg-slate-800/60 border border-slate-800 rounded-2xl space-y-3 hover:border-slate-700 transition"
            >
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                    rep.severity === 'HIGH' ? 'bg-red-500/20 text-red-300 border border-red-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}>
                    {rep.type.replace('_', ' ')}
                  </span>
                  <span className="text-xs font-bold text-white flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-400" /> {rep.locationName}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{rep.timestamp}</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{rep.description}</p>

              <div className="flex items-center justify-between border-t border-slate-800/80 pt-3 text-xs">
                <div className="flex items-center gap-3 text-slate-400">
                  <span>Reported by: <strong className="text-slate-200">{rep.reportedBy}</strong></span>
                  {rep.verifiedByCommunity && (
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Community Verified
                    </span>
                  )}
                </div>

                <button
                  onClick={() => onUpvoteReport(rep.id)}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold transition"
                >
                  <ThumbsUp className="w-3.5 h-3.5 text-rose-400" />
                  <span>Upvote ({rep.upvotesCount})</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
