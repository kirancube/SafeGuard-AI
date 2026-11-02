import React, { useState } from 'react';
import { 
  BrainCircuit, 
  AlertOctagon, 
  Activity, 
  Zap, 
  ShieldAlert, 
  Footprints, 
  Moon, 
  Compass, 
  RefreshCw, 
  CheckCircle2
} from 'lucide-react';
import { ThreatAnalysis } from '../types';

interface AiThreatMonitorProps {
  threatData: ThreatAnalysis;
  onUpdateSensorSimulation: (newSensors: Partial<ThreatAnalysis>) => void;
  onRunAiThreatCheck: () => void;
  isLoadingAi: boolean;
}

export const AiThreatMonitor: React.FC<AiThreatMonitorProps> = ({
  threatData,
  onUpdateSensorSimulation,
  onRunAiThreatCheck,
  isLoadingAi,
}) => {
  const getDangerColor = (score: number) => {
    if (score < 30) return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
    if (score < 60) return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
    if (score < 85) return 'text-orange-400 bg-orange-500/10 border-orange-500/30';
    return 'text-rose-400 bg-rose-500/10 border-rose-500/30 animate-pulse';
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-purple-400 font-bold text-xs uppercase tracking-wider">
            <BrainCircuit className="w-4 h-4 text-purple-400 animate-pulse" />
            <span>AI BEHAVIORAL THREAT DETECTION ENGINE</span>
          </div>
          <h2 className="text-2xl font-black text-white mt-1">
            Real-Time AI Anomaly & Motion Analyzer
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Monitors walking pace, sudden running bursts, unexpected direction changes, night travel risks, and suspicious route deviations to predict threats before escalation.
          </p>
        </div>

        <button
          onClick={onRunAiThreatCheck}
          disabled={isLoadingAi}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 transition disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isLoadingAi ? 'animate-spin' : ''}`} />
          <span>{isLoadingAi ? 'Gemini AI Analyzing...' : 'Run Gemini Threat Assessment'}</span>
        </button>
      </div>

      {/* Danger Score Gauge & Live Sensors Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 5 Columns: AI Danger Score Gauge */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-xl">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            Real-Time Threat Level
          </div>

          <div className="relative w-44 h-44 flex items-center justify-center my-2">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="10"
                className="text-slate-800"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="10"
                strokeDasharray={`${threatData.dangerScore * 2.51} 251`}
                strokeLinecap="round"
                className={threatData.dangerScore >= 60 ? 'text-rose-500' : threatData.dangerScore >= 30 ? 'text-amber-500' : 'text-emerald-500'}
                fill="transparent"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-black text-white">{threatData.dangerScore}</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">DANGER SCORE</span>
            </div>
          </div>

          <div className={`px-4 py-1.5 rounded-full text-xs font-black uppercase border mt-2 ${getDangerColor(threatData.dangerScore)}`}>
            STATUS: {threatData.threatLevel}
          </div>

          <p className="text-xs text-slate-300 mt-4 bg-slate-800/80 p-3 rounded-xl border border-slate-700 w-full text-left">
            <strong className="text-purple-400">Gemini Recommendation:</strong> {threatData.recommendation}
          </p>
        </div>

        {/* Right 7 Columns: Interactive Anomaly & Motion Sensor Simulators */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-purple-400" />
              <span>Sensor & Movement Parameter Controls</span>
            </h3>
            <span className="text-[10px] text-slate-400">Toggle values to simulate AI response</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {/* Running Detection */}
            <div 
              onClick={() => onUpdateSensorSimulation({ rapidMovementRunning: !threatData.rapidMovementRunning })}
              className={`p-3.5 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                threatData.rapidMovementRunning ? 'bg-amber-500/10 border-amber-500/40 text-amber-300' : 'bg-slate-800/60 border-slate-800 text-slate-300'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Footprints className="w-5 h-5 text-amber-400" />
                <div>
                  <div className="font-bold">Rapid Running / Sprint</div>
                  <div className="text-[10px] text-slate-400">Pace exceeds 12 km/h</div>
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${threatData.rapidMovementRunning ? 'bg-amber-500 text-slate-950' : 'bg-slate-700 text-slate-400'}`}>
                {threatData.rapidMovementRunning ? 'DETECTED' : 'NORMAL'}
              </span>
            </div>

            {/* Night Travel Risk */}
            <div 
              onClick={() => onUpdateSensorSimulation({ nightTravelRisk: !threatData.nightTravelRisk })}
              className={`p-3.5 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                threatData.nightTravelRisk ? 'bg-purple-500/10 border-purple-500/40 text-purple-300' : 'bg-slate-800/60 border-slate-800 text-slate-300'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Moon className="w-5 h-5 text-purple-400" />
                <div>
                  <div className="font-bold">Night Travel Monitoring</div>
                  <div className="text-[10px] text-slate-400">Late hours (10 PM - 5 AM)</div>
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${threatData.nightTravelRisk ? 'bg-purple-500 text-white' : 'bg-slate-700 text-slate-400'}`}>
                {threatData.nightTravelRisk ? 'HIGH RISK' : 'DAYTIME'}
              </span>
            </div>

            {/* Suspicious Route Deviation */}
            <div 
              onClick={() => onUpdateSensorSimulation({ suspiciousRouteDeviation: !threatData.suspiciousRouteDeviation })}
              className={`p-3.5 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                threatData.suspiciousRouteDeviation ? 'bg-rose-500/10 border-rose-500/40 text-rose-300' : 'bg-slate-800/60 border-slate-800 text-slate-300'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Compass className="w-5 h-5 text-rose-400" />
                <div>
                  <div className="font-bold">Route Deviation</div>
                  <div className="text-[10px] text-slate-400">Off-path movement</div>
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${threatData.suspiciousRouteDeviation ? 'bg-rose-500 text-white' : 'bg-slate-700 text-slate-400'}`}>
                {threatData.suspiciousRouteDeviation ? 'DEVIATED' : 'ON ROUTE'}
              </span>
            </div>

            {/* Following Behavior Detector */}
            <div 
              onClick={() => onUpdateSensorSimulation({ followingBehaviorDetected: !threatData.followingBehaviorDetected })}
              className={`p-3.5 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                threatData.followingBehaviorDetected ? 'bg-rose-500/10 border-rose-500/40 text-rose-300' : 'bg-slate-800/60 border-slate-800 text-slate-300'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <ShieldAlert className="w-5 h-5 text-rose-400" />
                <div>
                  <div className="font-bold">Repeated Following</div>
                  <div className="text-[10px] text-slate-400">Proximity tracking</div>
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${threatData.followingBehaviorDetected ? 'bg-rose-500 text-white' : 'bg-slate-700 text-slate-400'}`}>
                {threatData.followingBehaviorDetected ? 'ALERT' : 'CLEAR'}
              </span>
            </div>
          </div>

          {/* Anomaly Checklist */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-slate-300">Active Anomaly Log:</span>
            <div className="space-y-1.5">
              {threatData.detectedAnomalies.map((anom, idx) => (
                <div key={idx} className="text-xs text-amber-300 flex items-center gap-2 bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-500/20">
                  <AlertOctagon className="w-3.5 h-3.5 text-amber-400" />
                  <span>{anom}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
