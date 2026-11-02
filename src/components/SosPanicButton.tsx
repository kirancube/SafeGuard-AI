import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  Vibrate, 
  Mic, 
  Radio, 
  Watch, 
  CheckCircle2, 
  XCircle, 
  Volume2, 
  VolumeX, 
  MapPin, 
  Send, 
  PhoneCall, 
  Lock, 
  AlertTriangle,
  History
} from 'lucide-react';
import { SosStatus, TriggerSource, EmergencyContact, GpsLocation, IncidentTimelineEntry } from '../types';

interface SosPanicButtonProps {
  sosStatus: SosStatus;
  triggerSource: TriggerSource | null;
  currentLocation: GpsLocation;
  emergencyContacts: EmergencyContact[];
  countdownSeconds: number;
  onInitiateSos: (source: TriggerSource) => void;
  onCancelSos: (pin: string) => boolean;
  onResolveSos: () => void;
  timeline: IncidentTimelineEntry[];
}

export const SosPanicButton: React.FC<SosPanicButtonProps> = ({
  sosStatus,
  triggerSource,
  currentLocation,
  emergencyContacts,
  countdownSeconds,
  onInitiateSos,
  onCancelSos,
  onResolveSos,
  timeline,
}) => {
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [sirenEnabled, setSirenEnabled] = useState(true);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [sirenOscillator, setSirenOscillator] = useState<OscillatorNode | null>(null);

  // Audio Siren synthesizer when SOS Countdown or Active
  useEffect(() => {
    let osc: OscillatorNode | null = null;
    let ctx: AudioContext | null = null;

    if ((sosStatus === 'COUNTDOWN' || sosStatus === 'ACTIVE') && sirenEnabled) {
      try {
        ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + 0.5);

        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        setSirenOscillator(osc);
        setAudioContext(ctx);
      } catch (err) {
        console.warn("Audio siren synthesis not allowed without user interaction", err);
      }
    }

    return () => {
      if (osc) {
        try { osc.stop(); } catch (e) {}
      }
      if (ctx) {
        try { ctx.close(); } catch (e) {}
      }
    };
  }, [sosStatus, sirenEnabled]);

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onCancelSos(pinInput);
    if (!success) {
      setPinError(true);
    } else {
      setPinInput('');
      setPinError(false);
    }
  };

  const getSourceLabel = (src: TriggerSource | null) => {
    switch (src) {
      case 'ONE_TOUCH_BUTTON': return 'One-Touch Screen SOS Button';
      case 'SHAKE_GESTURE': return 'Phone Accelerometer Shake Gesture';
      case 'VOICE_PHRASE': return 'AI Voice Keyword Activation';
      case 'POWER_BUTTON_MULTI': return 'Multi-Power Button Press (3x)';
      case 'SMARTWATCH_WEARABLE': return 'Smartwatch Emergency Trigger';
      case 'BLUETOOTH_PANIC_BUTTON': return 'Bluetooth BLE Panic Ring';
      case 'FALL_DETECTION_SENSOR': return 'Wearable Fall Detection Sensor';
      case 'AI_ANOMALY_DETECTOR': return 'AI Threat Anomaly Prediction';
      default: return 'Emergency Trigger';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Audio Siren Toggle */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
            <Radio className="w-4 h-4 animate-ping text-rose-500" />
            <span>SMART SOS EMERGENCY RESPONSE HUB</span>
          </div>
          <h2 className="text-2xl font-black text-white mt-1">
            Instant Multi-Trigger Panic System
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            When triggered, SafeGuard AI dispatches live GPS location via SMS/calls to top priority contacts, activates cloud audio/video recording, and alerts local emergency services.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setSirenEnabled(!sirenEnabled)}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold border transition ${
              sirenEnabled 
                ? 'bg-rose-500/20 border-rose-500/40 text-rose-300' 
                : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
          >
            {sirenEnabled ? <Volume2 className="w-4 h-4 text-rose-400" /> : <VolumeX className="w-4 h-4" />}
            <span>{sirenEnabled ? 'Audio Siren ON' : 'Silent Mode'}</span>
          </button>
        </div>
      </div>

      {/* Main SOS Trigger Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Columns: Giant SOS Button & Countdown Modal */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden shadow-2xl min-h-[420px]">
          
          {sosStatus === 'IDLE' && (
            <div className="flex flex-col items-center justify-center space-y-6 w-full py-4">
              <p className="text-xs font-semibold text-rose-400 uppercase tracking-widest">
                Press or Hold to Activate Emergency Response
              </p>

              {/* Huge glowing SOS button */}
              <button
                onClick={() => onInitiateSos('ONE_TOUCH_BUTTON')}
                className="group relative w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-gradient-to-b from-red-500 via-rose-600 to-red-700 text-white font-black text-3xl sm:text-4xl shadow-[0_0_60px_rgba(225,29,72,0.6)] hover:shadow-[0_0_80px_rgba(225,29,72,0.9)] border-4 border-rose-300/40 flex flex-col items-center justify-center gap-2 transition-all transform active:scale-95 cursor-pointer"
              >
                <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping opacity-25"></div>
                <ShieldAlert className="w-16 h-16 sm:w-20 sm:h-20 text-white drop-shadow-md group-hover:scale-110 transition" />
                <span className="tracking-wider">SOS</span>
                <span className="text-[10px] font-bold text-rose-100 uppercase tracking-widest bg-black/30 px-3 py-1 rounded-full">
                  ONE-TOUCH PANIC
                </span>
              </button>

              <div className="text-slate-400 text-xs flex items-center gap-2 bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>Current Location: <strong className="text-slate-200">{currentLocation.addressName}</strong></span>
              </div>
            </div>
          )}

          {sosStatus === 'COUNTDOWN' && (
            <div className="flex flex-col items-center justify-center space-y-5 w-full z-10 py-6 animate-fade-in">
              <div className="w-20 h-20 rounded-full bg-amber-500/20 border-2 border-amber-500 flex items-center justify-center text-amber-400 font-black text-4xl animate-pulse">
                {countdownSeconds}
              </div>

              <div>
                <h3 className="text-2xl font-black text-amber-400">
                  DISPATCHING EMERGENCY ALERTS IN {countdownSeconds}s
                </h3>
                <p className="text-xs text-slate-300 mt-1 max-w-md">
                  Triggered via: <strong className="text-white">{getSourceLabel(triggerSource)}</strong>
                </p>
              </div>

              {/* Enter PIN to Cancel False Alarm */}
              <form onSubmit={handlePinSubmit} className="w-full max-w-sm space-y-3 bg-slate-800/90 p-4 rounded-xl border border-slate-700">
                <div className="text-xs font-semibold text-slate-300 flex items-center justify-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Enter Security PIN to Cancel (Default: 9988)</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="password"
                    maxLength={4}
                    value={pinInput}
                    onChange={(e) => { setPinInput(e.target.value); setPinError(false); }}
                    placeholder="4-Digit PIN"
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-center text-white text-sm font-mono tracking-widest focus:outline-none focus:border-amber-500"
                  />
                  <button
                    type="submit"
                    className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2 rounded-lg text-xs transition"
                  >
                    Cancel Alert
                  </button>
                </div>
                {pinError && (
                  <p className="text-[11px] text-red-400 font-medium">Incorrect Security PIN. Please try 9988.</p>
                )}
              </form>

              <button
                onClick={() => onInitiateSos('ONE_TOUCH_BUTTON')}
                className="bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs px-6 py-2.5 rounded-xl uppercase tracking-wider transition"
              >
                Skip Timer & Dispatch Immediately
              </button>
            </div>
          )}

          {sosStatus === 'ACTIVE' && (
            <div className="flex flex-col items-center justify-center space-y-6 w-full z-10 py-6">
              <div className="w-24 h-24 rounded-full bg-red-600 flex items-center justify-center text-white shadow-[0_0_50px_rgba(225,29,72,0.8)] animate-pulse">
                <ShieldAlert className="w-12 h-12" />
              </div>

              <div>
                <span className="px-3 py-1 rounded-full text-xs font-black bg-red-600 text-white uppercase tracking-widest animate-pulse">
                  CRITICAL EMERGENCY ACTIVE
                </span>
                <h3 className="text-2xl font-black text-white mt-2">
                  Emergency Services & Contacts Notified
                </h3>
                <p className="text-xs text-slate-300 mt-1 max-w-md">
                  Live GPS route streaming, continuous audio/video evidence capture, and phone call dispatch active.
                </p>
              </div>

              {/* Actions during active emergency */}
              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href="tel:112"
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-md"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Call Police (112)</span>
                </a>
                <a
                  href="tel:1091"
                  className="bg-rose-600 hover:bg-rose-500 text-white font-black text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-md"
                >
                  <ShieldAlert className="w-4 h-4" />
                  <span>Women Helpline (1091)</span>
                </a>
              </div>

              {/* Safe Resolve Button */}
              <div className="pt-4 border-t border-slate-800 w-full max-w-sm">
                <form onSubmit={handlePinSubmit} className="space-y-2">
                  <p className="text-xs text-slate-400 font-medium">Safe Now? Enter PIN (9988) to Deactivate Alert:</p>
                  <div className="flex gap-2">
                    <input
                      type="password"
                      maxLength={4}
                      value={pinInput}
                      onChange={(e) => { setPinInput(e.target.value); setPinError(false); }}
                      placeholder="PIN"
                      className="w-28 bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-center text-white text-xs font-mono focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-1.5 rounded-lg transition"
                    >
                      I Am Safe (Resolve Alert)
                    </button>
                  </div>
                  {pinError && <p className="text-[11px] text-red-400">Incorrect PIN. Try 9988.</p>}
                </form>
              </div>
            </div>
          )}
        </div>

        {/* Right 5 Columns: Multi-Trigger Simulators & Live Broadcast Status */}
        <div className="lg:col-span-5 space-y-6">
          {/* Simulated Triggers Box */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Radio className="w-4 h-4 text-rose-400" />
                <span>Simulate Hardware & Sensor Triggers</span>
              </h3>
              <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                Test Mode
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Test how SafeGuard AI responds to various physical triggers:
            </p>

            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <button
                onClick={() => onInitiateSos('SHAKE_GESTURE')}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-medium transition text-left"
              >
                <Vibrate className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <div className="font-bold">Shake Phone</div>
                  <div className="text-[10px] text-slate-400">Accelerometer gesture</div>
                </div>
              </button>

              <button
                onClick={() => onInitiateSos('VOICE_PHRASE')}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-medium transition text-left"
              >
                <Mic className="w-4 h-4 text-rose-400 shrink-0" />
                <div>
                  <div className="font-bold">Voice Keyword</div>
                  <div className="text-[10px] text-slate-400">"Help me" phrase</div>
                </div>
              </button>

              <button
                onClick={() => onInitiateSos('POWER_BUTTON_MULTI')}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-medium transition text-left"
              >
                <Radio className="w-4 h-4 text-purple-400 shrink-0" />
                <div>
                  <div className="font-bold">Power 3-5x</div>
                  <div className="text-[10px] text-slate-400">Hardware button press</div>
                </div>
              </button>

              <button
                onClick={() => onInitiateSos('SMARTWATCH_WEARABLE')}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-medium transition text-left"
              >
                <Watch className="w-4 h-4 text-cyan-400 shrink-0" />
                <div>
                  <div className="font-bold">Smartwatch</div>
                  <div className="text-[10px] text-slate-400">BLE paired trigger</div>
                </div>
              </button>
            </div>
          </div>

          {/* Contact Alert Broadcast List */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Send className="w-4 h-4 text-emerald-400" />
              <span>Emergency Contacts Broadcast Queue</span>
            </h3>

            <div className="space-y-2">
              {emergencyContacts.slice(0, 3).map((contact) => (
                <div key={contact.id} className="flex items-center justify-between p-2.5 bg-slate-800/60 rounded-xl border border-slate-800 text-xs">
                  <div>
                    <div className="font-bold text-slate-200">{contact.name}</div>
                    <div className="text-[10px] text-slate-400">{contact.phone} • Priority #{contact.priority}</div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {sosStatus === 'ACTIVE' ? (
                      <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 font-bold rounded text-[10px] flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" /> DISPATCHED
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 bg-slate-700 text-slate-400 font-medium rounded text-[10px]">
                        READY
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Incident Log Activity Timeline */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-4">
          <History className="w-4 h-4 text-rose-400" />
          <span>Real-Time Emergency Dispatch Timeline Log</span>
        </h3>

        {timeline.length === 0 ? (
          <p className="text-xs text-slate-500 italic">No recent emergency triggers recorded.</p>
        ) : (
          <div className="relative border-l-2 border-slate-800 ml-3 space-y-4 pl-4 text-xs">
            {timeline.map((entry) => (
              <div key={entry.id} className="relative">
                <div className="absolute -left-[21px] top-0 w-2.5 h-2.5 rounded-full bg-rose-500 ring-4 ring-slate-900"></div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] text-slate-400">{entry.timestamp}</span>
                  <span className="font-bold text-slate-200">{entry.title}</span>
                </div>
                <p className="text-slate-400 mt-0.5">{entry.details}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
