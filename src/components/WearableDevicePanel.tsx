import React, { useState, useEffect } from 'react';
import { 
  Radio, 
  Watch, 
  Battery, 
  Heart, 
  Activity, 
  Mic, 
  MicOff, 
  Zap, 
  ShieldCheck, 
  AlertTriangle,
  Volume2
} from 'lucide-react';
import { WearableDevice } from '../types';

interface WearableDevicePanelProps {
  wearables: WearableDevice[];
  onToggleWearable: (id: string) => void;
  onSimulateHeartAnomaly: (id: string) => void;
  onSimulateFall: (id: string) => void;
  onVoicePhraseDetected: (phrase: string) => void;
}

export const WearableDevicePanel: React.FC<WearableDevicePanelProps> = ({
  wearables,
  onToggleWearable,
  onSimulateHeartAnomaly,
  onSimulateFall,
  onVoicePhraseDetected,
}) => {
  const [voiceListening, setVoiceListening] = useState(false);
  const [speechTranscript, setSpeechTranscript] = useState('');
  const [micVolume, setMicVolume] = useState(0);

  // Simulated Mic volume pulsing when voice listening active
  useEffect(() => {
    let interval: any = null;
    if (voiceListening) {
      interval = setInterval(() => {
        setMicVolume(Math.floor(Math.random() * 80 + 20));
      }, 200);
    } else {
      setMicVolume(0);
    }
    return () => clearInterval(interval);
  }, [voiceListening]);

  const handleSimulateVoicePhrase = (phrase: string) => {
    setSpeechTranscript(phrase);
    onVoicePhraseDetected(phrase);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider">
            <Radio className="w-4 h-4 text-cyan-400 animate-ping" />
            <span>BLUETOOTH BLE HARDWARE & VOICE AI ENGINE</span>
          </div>
          <h2 className="text-2xl font-black text-white mt-1">
            Wearables & AI Voice Recognition
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Pairs with Smartwatches, Smart Rings, and BLE Panic Buttons. Monitors heart-rate spikes, fall detection sensors, and offline voice activation phrases.
          </p>
        </div>

        <button
          onClick={() => setVoiceListening(!voiceListening)}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition shadow-lg ${
            voiceListening
              ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/30 animate-pulse'
              : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-cyan-600/30'
          }`}
        >
          {voiceListening ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
          <span>{voiceListening ? 'Background Voice AI: LISTENING' : 'Enable Background Voice AI'}</span>
        </button>
      </div>

      {/* Main Grid: Wearables & Voice Listener */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Columns: Bluetooth Wearable Devices Dashboard */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Watch className="w-4 h-4 text-cyan-400" />
            <span>Connected BLE Wearable Devices ({wearables.length})</span>
          </h3>

          <div className="space-y-4">
            {wearables.map((w) => (
              <div key={w.id} className="p-4 bg-slate-800/60 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-600/20 text-cyan-400 flex items-center justify-center font-bold">
                      <Watch className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-white text-sm">{w.name}</div>
                      <div className="text-[10px] text-slate-400">{w.type} • Bluetooth 5.2 Low Energy</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                      <Battery className="w-4 h-4 text-emerald-400" /> {w.batteryLevel}%
                    </span>
                    <button
                      onClick={() => onToggleWearable(w.id)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold border transition ${
                        w.connected ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-slate-700 text-slate-400'
                      }`}
                    >
                      {w.connected ? 'PAIRED' : 'DISCONNECTED'}
                    </button>
                  </div>
                </div>

                {/* Heart Rate & Fall Detection Test Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800/80 text-xs">
                  <button
                    onClick={() => onSimulateHeartAnomaly(w.id)}
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold transition flex items-center justify-between"
                  >
                    <span className="flex items-center gap-1.5 text-rose-400">
                      <Heart className="w-4 h-4 animate-pulse" /> Pulse: {w.heartRateBpm > 0 ? `${w.heartRateBpm} BPM` : 'N/A'}
                    </span>
                    <span className="text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                      Simulate Spike
                    </span>
                  </button>

                  <button
                    onClick={() => onSimulateFall(w.id)}
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold transition flex items-center justify-between"
                  >
                    <span className="flex items-center gap-1.5 text-purple-400">
                      <Activity className="w-4 h-4" /> Fall Sensor
                    </span>
                    <span className="text-[10px] text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded">
                      Simulate Fall
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 5 Columns: Voice AI Keyword Listener */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Mic className="w-4 h-4 text-rose-400" />
            <span>AI Emergency Voice Trigger Phrases</span>
          </h3>

          <p className="text-xs text-slate-400">
            When Voice AI is enabled, saying any of these emergency phrases triggers immediate SOS panic mode:
          </p>

          <div className="space-y-2">
            {['HELP ME', 'SAVE ME', 'EMERGENCY', 'CALL POLICE'].map((phrase, idx) => (
              <button
                key={idx}
                onClick={() => handleSimulateVoicePhrase(phrase)}
                className="w-full p-3 bg-slate-800 hover:bg-slate-700/80 border border-slate-700 rounded-xl text-left text-xs font-bold text-slate-200 flex items-center justify-between transition"
              >
                <div className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-rose-400" />
                  <span>"{phrase}"</span>
                </div>
                <span className="text-[10px] text-rose-400 font-mono bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                  TEST PHRASE
                </span>
              </button>
            ))}
          </div>

          {/* Live Mic Volume Level Meter */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-bold text-slate-300">Microphone Input Level</span>
              <span className="font-mono text-cyan-400">{micVolume}% Peak</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                style={{ width: `${micVolume}%` }}
                className="h-full bg-gradient-to-r from-cyan-500 to-rose-500 transition-all duration-150"
              />
            </div>
            {speechTranscript && (
              <p className="text-xs text-rose-300 italic pt-1">
                Last Detected Transcript: "{speechTranscript}"
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
