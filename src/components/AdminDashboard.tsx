import React from 'react';
import { 
  BarChart3, 
  Users, 
  ShieldAlert, 
  Clock, 
  Activity, 
  TrendingUp, 
  MapPin, 
  CheckCircle2, 
  AlertTriangle,
  Server
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider">
            <BarChart3 className="w-4 h-4 text-indigo-400" />
            <span>CENTRAL POLICE & EMERGENCY MONITORING DASHBOARD</span>
          </div>
          <h2 className="text-2xl font-black text-white mt-1">
            Administrative Control & Incident Analytics
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Live command center tracking emergency response speeds, crime hotspot heatmaps, system server health, and user safety statistics.
          </p>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Avg Emergency Response Time</span>
            <Clock className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-white">2.4 Mins</div>
          <p className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> 18% Faster than target
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Active Protected Users</span>
            <Users className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-black text-white">12,480</div>
          <p className="text-[10px] text-blue-400 font-bold">100% Live GPS Sync</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>SOS Dispatches Today</span>
            <ShieldAlert className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-black text-white">14 Incidents</div>
          <p className="text-[10px] text-emerald-400 font-bold">All 14 Safely Resolved</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>System Health & Uptime</span>
            <Server className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black text-white">99.98%</div>
          <p className="text-[10px] text-purple-400 font-bold">All Cloud Nodes Operational</p>
        </div>
      </div>

      {/* Analytics Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Columns: Simulated Incident Trend Bar Graph */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-white flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-indigo-400" />
              <span>Weekly Emergency Incident Dispatches</span>
            </span>
            <span className="text-[10px] text-slate-400">Past 7 Days</span>
          </h3>

          <div className="flex items-end justify-between h-48 pt-6 px-2 gap-3">
            {[
              { day: 'Mon', count: 8, height: '40%' },
              { day: 'Tue', count: 12, height: '60%' },
              { day: 'Wed', count: 5, height: '25%' },
              { day: 'Thu', count: 15, height: '75%' },
              { day: 'Fri', count: 22, height: '95%' },
              { day: 'Sat', count: 18, height: '85%' },
              { day: 'Sun', count: 10, height: '50%' },
            ].map((bar, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <span className="text-[10px] font-mono text-slate-300 font-bold">{bar.count}</span>
                <div
                  style={{ height: bar.height }}
                  className="w-full bg-gradient-to-t from-indigo-600 to-rose-500 rounded-t-lg transition-all"
                />
                <span className="text-[10px] text-slate-400 font-medium">{bar.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right 5 Columns: Crime Hotspots & Police Dispatch Status */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <MapPin className="w-4 h-4 text-rose-400" />
            <span>High Risk Crime Hotspot Monitoring</span>
          </h3>

          <div className="space-y-3 text-xs">
            {[
              { zone: 'Sector 11 Underpass Alley', risk: 'HIGH RISK', policeCount: '3 Patrol Units Active' },
              { zone: 'North Park Outer Perimeter', risk: 'MODERATE RISK', policeCount: '2 Patrol Units Active' },
              { zone: 'Central Metro Junction', risk: 'SAFE ZONE', policeCount: '5 Patrol Units Active' },
            ].map((z, idx) => (
              <div key={idx} className="p-3 bg-slate-800/60 rounded-xl border border-slate-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-200">{z.zone}</span>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                    z.risk === 'HIGH RISK' ? 'bg-red-500/20 text-red-300' : 'bg-emerald-500/20 text-emerald-300'
                  }`}>
                    {z.risk}
                  </span>
                </div>
                <div className="text-[10px] text-indigo-300 font-mono">{z.policeCount}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
