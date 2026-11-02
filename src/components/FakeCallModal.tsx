import React, { useState, useEffect } from 'react';
import { 
  PhoneIncoming, 
  PhoneOff, 
  PhoneCall, 
  Clock, 
  User, 
  Volume2, 
  Play, 
  CheckCircle, 
  ShieldCheck, 
  Mic, 
  Sparkles
} from 'lucide-react';
import { FakeCallConfig } from '../types';

interface FakeCallModalProps {
  config: FakeCallConfig;
  onUpdateConfig: (newConfig: Partial<FakeCallConfig>) => void;
  onStartCall: () => void;
  onEndCall: () => void;
}

export const FakeCallModal: React.FC<FakeCallModalProps> = ({
  config,
  onUpdateConfig,
  onStartCall,
  onEndCall,
}) => {
  const [scheduledTimer, setScheduledTimer] = useState<number | null>(null);
  const [callActiveSeconds, setCallActiveSeconds] = useState(0);

  // Scheduled countdown timer
  useEffect(() => {
    let interval: any = null;
    if (scheduledTimer !== null && scheduledTimer > 0) {
      interval = setInterval(() => {
        setScheduledTimer(prev => (prev !== null && prev > 1 ? prev - 1 : 0));
      }, 1000);
    } else if (scheduledTimer === 0) {
      setScheduledTimer(null);
      onStartCall();
    }
    return () => clearInterval(interval);
  }, [scheduledTimer]);

  // Active call length timer
  useEffect(() => {
    let interval: any = null;
    if (config.isCallActive) {
      interval = setInterval(() => {
        setCallActiveSeconds(prev => prev + 1);
      }, 1000);
    } else {
      setCallActiveSeconds(0);
    }
    return () => clearInterval(interval);
  }, [config.isCallActive]);

  const handleScheduleCall = (seconds: number) => {
    if (seconds === 0) {
      onStartCall();
    } else {
      setScheduledTimer(seconds);
      onUpdateConfig({ isCallScheduled: true, delaySeconds: seconds });
    }
  };

  const cancelScheduledCall = () => {
    setScheduledTimer(null);
    onUpdateConfig({ isCallScheduled: false });
  };

  const formatSeconds = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const remainder = sec % 60;
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider">
            <PhoneIncoming className="w-4 h-4 text-cyan-400 animate-bounce" />
            <span>DISCREET ESCAPE SIMULATOR</span>
          </div>
          <h2 className="text-2xl font-black text-white mt-1">
            Fake Call Generator
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Simulate a realistic incoming phone call with realistic voice speech playback to help you excuse yourself from uncomfortable, awkward, or potentially dangerous situations.
          </p>
        </div>

        <button
          onClick={() => handleScheduleCall(0)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-lg shadow-cyan-600/30 transition"
        >
          <PhoneCall className="w-4 h-4" />
          <span>Trigger Instant Fake Call</span>
        </button>
      </div>

      {/* Main Form & Configuration Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Columns: Caller & Audio Script Setup */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-xl">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <User className="w-4 h-4 text-cyan-400" />
            <span>Caller Identity & Voice Script Customization</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Caller Display Name
              </label>
              <input
                type="text"
                value={config.callerName}
                onChange={(e) => onUpdateConfig({ callerName: e.target.value })}
                placeholder="e.g. Mom, Inspector Sharma, Boss"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-white text-xs focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Caller Phone Number
              </label>
              <input
                type="text"
                value={config.callerNumber}
                onChange={(e) => onUpdateConfig({ callerNumber: e.target.value })}
                placeholder="+91 98111 22334"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-white text-xs font-mono focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Voice Script Preset Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Voice Playback Script (Spoken upon answering)
            </label>
            <div className="space-y-2">
              {[
                {
                  id: 'MOM_CHECKING',
                  title: 'Mom Picking You Up',
                  script: '"Priya! Where are you right now? I am waiting outside in the car with your dad, come to the main road immediately!"'
                },
                {
                  id: 'POLICE_OFFICER',
                  title: 'Police Verification Call',
                  script: '"Hello, this is Inspector Sharma from Central Control. Confirming your safety status at your current GPS location."'
                },
                {
                  id: 'FRIEND_PICKUP',
                  title: 'Friend Requesting Urgent Help',
                  script: '"Hey Priya, can you come out right now? My car tire is flat on the corner and I need your help!"'
                }
              ].map(preset => (
                <div
                  key={preset.id}
                  onClick={() => onUpdateConfig({ voiceScript: preset.id as any })}
                  className={`p-3 rounded-xl border cursor-pointer transition text-xs ${
                    config.voiceScript === preset.id
                      ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-300'
                      : 'bg-slate-800/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="font-bold flex items-center justify-between">
                    <span>{preset.title}</span>
                    {config.voiceScript === preset.id && <CheckCircle className="w-4 h-4 text-cyan-400" />}
                  </div>
                  <p className="text-[11px] text-slate-400 italic mt-1">{preset.script}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 5 Columns: Delay Timer Buttons & Active Call Simulator */}
        <div className="lg:col-span-5 space-y-6">
          {/* Scheduled Timer Presets */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Schedule Call Timing</span>
            </h3>

            {scheduledTimer !== null ? (
              <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-center space-y-2">
                <p className="text-xs text-amber-300 font-bold">
                  Fake call scheduled in: <span className="text-xl text-white font-mono">{scheduledTimer}s</span>
                </p>
                <button
                  onClick={cancelScheduledCall}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs px-3 py-1.5 rounded-lg border border-slate-700 font-semibold"
                >
                  Cancel Timer
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => handleScheduleCall(10)}
                  className="p-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-slate-200 font-bold transition flex flex-col items-center gap-1"
                >
                  <span>10 Seconds</span>
                  <span className="text-[10px] text-slate-400 font-normal">Quick escape</span>
                </button>

                <button
                  onClick={() => handleScheduleCall(30)}
                  className="p-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-slate-200 font-bold transition flex flex-col items-center gap-1"
                >
                  <span>30 Seconds</span>
                  <span className="text-[10px] text-slate-400 font-normal">Standard delay</span>
                </button>

                <button
                  onClick={() => handleScheduleCall(60)}
                  className="p-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-slate-200 font-bold transition flex flex-col items-center gap-1"
                >
                  <span>1 Minute</span>
                  <span className="text-[10px] text-slate-400 font-normal">Discreet buffer</span>
                </button>

                <button
                  onClick={() => handleScheduleCall(0)}
                  className="p-3 bg-cyan-600 hover:bg-cyan-500 border border-cyan-400 rounded-xl text-white font-black transition flex flex-col items-center gap-1"
                >
                  <span>INSTANT</span>
                  <span className="text-[10px] text-cyan-100 font-normal">Call right now</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* FULL-SCREEN REALISTIC INCOMING FAKE CALL OVERLAY */}
      {config.isCallActive && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col items-center justify-between p-8 text-white animate-fade-in">
          {/* Top Info */}
          <div className="text-center pt-12 space-y-3">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-cyan-600 to-blue-500 mx-auto flex items-center justify-center text-3xl font-bold shadow-2xl shadow-cyan-500/30 border-2 border-white/20">
              {config.callerName.charAt(0)}
            </div>

            <div>
              <h1 className="text-3xl font-black text-white">{config.callerName}</h1>
              <p className="text-sm font-mono text-cyan-400 mt-1">{config.callerNumber}</p>
              <p className="text-xs text-emerald-400 font-semibold mt-2 flex items-center justify-center gap-1">
                <PhoneCall className="w-3.5 h-3.5 animate-pulse" />
                <span>Call Active • {formatSeconds(callActiveSeconds)}</span>
              </p>
            </div>
          </div>

          {/* Voice Playback Text Visualizer */}
          <div className="max-w-md bg-slate-900/90 border border-slate-800 p-5 rounded-2xl text-center space-y-2 shadow-2xl">
            <div className="flex items-center justify-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
              <Volume2 className="w-4 h-4 animate-bounce" />
              <span>Voice Playback Audio Active</span>
            </div>
            <p className="text-sm text-slate-200 italic font-serif">
              "Priya! I am waiting outside in the car with your dad, come to the main road immediately!"
            </p>
          </div>

          {/* Decline / Hang Up Button */}
          <div className="pb-12 text-center">
            <button
              onClick={onEndCall}
              className="w-20 h-20 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center mx-auto shadow-2xl shadow-red-600/50 border-2 border-white/30 transform active:scale-95 transition"
              title="Decline & End Call"
            >
              <PhoneOff className="w-8 h-8" />
            </button>
            <span className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-3 block">
              End Fake Call
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
