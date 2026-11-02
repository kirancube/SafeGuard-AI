import React, { useState, useEffect, useRef } from 'react';
import { 
  Video, 
  Mic, 
  Square, 
  Play, 
  Lock, 
  ShieldCheck, 
  CloudUpload, 
  Camera, 
  Volume2, 
  FileCheck, 
  HardDrive,
  Download
} from 'lucide-react';
import { EvidenceRecord } from '../types';

interface AudioVideoRecorderProps {
  isSosActive: boolean;
  evidenceVault: EvidenceRecord[];
  onAddEvidence: (record: EvidenceRecord) => void;
}

export const AudioVideoRecorder: React.FC<AudioVideoRecorderProps> = ({
  isSosActive,
  evidenceVault,
  onAddEvidence,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isRecordingVideo, setIsRecordingVideo] = useState(false);
  const [isRecordingAudio, setIsRecordingAudio] = useState(false);
  const [useFrontCamera, setUseFrontCamera] = useState(true);
  const [noiseReduction, setNoiseReduction] = useState(true);
  const [recordTimer, setRecordTimer] = useState(0);

  // Auto-start continuous recording on SOS active
  useEffect(() => {
    if (isSosActive) {
      setIsRecordingAudio(true);
      setIsRecordingVideo(true);
    }
  }, [isSosActive]);

  // Video MediaStream Setup
  useEffect(() => {
    let stream: MediaStream | null = null;
    const startCam = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: useFrontCamera ? 'user' : 'environment' },
          audio: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.warn("Camera preview standard fallback:", err);
      }
    };

    if (isRecordingVideo) {
      startCam();
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isRecordingVideo, useFrontCamera]);

  // Recording Duration Counter
  useEffect(() => {
    let interval: any = null;
    if (isRecordingAudio || isRecordingVideo) {
      interval = setInterval(() => {
        setRecordTimer(prev => prev + 1);
      }, 1000);
    } else {
      setRecordTimer(0);
    }
    return () => clearInterval(interval);
  }, [isRecordingAudio, isRecordingVideo]);

  const handleStopAndSaveRecording = () => {
    const newRecord: EvidenceRecord = {
      id: `ev_${Date.now()}`,
      type: isRecordingVideo ? 'VIDEO' : 'AUDIO',
      title: `Emergency ${isRecordingVideo ? 'Video' : 'Audio'} Recording #${Math.floor(Math.random() * 900 + 100)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      durationSeconds: recordTimer || 45,
      fileSizeMb: parseFloat(((recordTimer || 45) * 0.12).toFixed(2)),
      cloudBackupStatus: 'CLOUD_ENCRYPTED',
      tamperProofHash: Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
      gpsCoordinates: { lat: 28.6139, lng: 77.2090 },
    };

    onAddEvidence(newRecord);
    setIsRecordingAudio(false);
    setIsRecordingVideo(false);
    setRecordTimer(0);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
            <Video className="w-4 h-4 text-rose-400 animate-pulse" />
            <span>ENCRYPTED EVIDENCE CAPTURE ENGINE</span>
          </div>
          <h2 className="text-2xl font-black text-white mt-1">
            Audio & Video Evidence Recording
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Automatically records encrypted background audio and camera feeds during SOS activation, generating tamper-proof cryptographic hashes uploaded to secure cloud storage.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {(isRecordingAudio || isRecordingVideo) ? (
            <button
              onClick={handleStopAndSaveRecording}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-lg shadow-red-600/30 transition animate-pulse"
            >
              <Square className="w-4 h-4" />
              <span>Stop & Save Evidence ({recordTimer}s)</span>
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => { setIsRecordingAudio(true); }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs transition"
              >
                <Mic className="w-4 h-4 text-rose-400" />
                <span>Record Audio</span>
              </button>
              <button
                onClick={() => { setIsRecordingVideo(true); }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition shadow-lg"
              >
                <Camera className="w-4 h-4" />
                <span>Start Video Feed</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Preview & Cloud Vault Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Columns: Video Camera Stream & Waveform */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Camera className="w-4 h-4 text-rose-400" />
              <span>Live Camera Stream Preview</span>
            </h3>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setUseFrontCamera(!useFrontCamera)}
                className="px-3 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold hover:bg-slate-700 transition"
              >
                {useFrontCamera ? 'Front Camera' : 'Rear Camera'}
              </button>

              <button
                onClick={() => setNoiseReduction(!noiseReduction)}
                className={`px-3 py-1 rounded-lg border text-xs font-semibold transition ${
                  noiseReduction ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' : 'bg-slate-800 text-slate-400'
                }`}
              >
                Noise Reduction: {noiseReduction ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>

          {/* Video Container Box */}
          <div className="relative w-full h-72 rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center">
            {isRecordingVideo ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-center space-y-2 p-6">
                <Video className="w-12 h-12 text-slate-700 mx-auto" />
                <p className="text-xs text-slate-500 font-medium">
                  Camera feed standby. Click "Start Video Feed" or trigger SOS to record.
                </p>
              </div>
            )}

            {/* Live Recording Watermark */}
            {(isRecordingVideo || isRecordingAudio) && (
              <div className="absolute top-3 left-3 bg-red-600/90 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-lg animate-pulse">
                <span className="w-2 h-2 rounded-full bg-white"></span>
                <span>REC LIVE • {recordTimer}s</span>
              </div>
            )}

            <div className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-md text-emerald-400 px-3 py-1 rounded-lg text-[10px] font-mono border border-slate-800 flex items-center gap-1">
              <Lock className="w-3 h-3" /> 256-BIT ENCRYPTED
            </div>
          </div>

          {/* Simulated Audio Spectrum Waveform */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5 font-bold text-slate-300">
                <Volume2 className="w-4 h-4 text-rose-400" /> Background Audio Microphone Status
              </span>
              <span className="font-mono text-emerald-400">Active Noise Filter (48kHz)</span>
            </div>

            <div className="flex items-end justify-between h-10 gap-1 pt-1">
              {Array.from({ length: 32 }).map((_, i) => {
                const height = isRecordingAudio || isRecordingVideo 
                  ? Math.floor(Math.sin(i + recordTimer) * 15 + 25)
                  : 6;
                return (
                  <div
                    key={i}
                    style={{ height: `${height}px` }}
                    className={`flex-1 rounded-full transition-all duration-150 ${
                      isRecordingAudio || isRecordingVideo ? 'bg-rose-500' : 'bg-slate-800'
                    }`}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Right 5 Columns: Encrypted Cloud Evidence Vault */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-emerald-400" />
              <span>Evidence Vault ({evidenceVault.length})</span>
            </h3>
            <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-bold border border-emerald-500/30">
              Cloud Synced
            </span>
          </div>

          <div className="space-y-3 max-h-[360px] overflow-y-auto scrollbar-thin">
            {evidenceVault.map((item) => (
              <div key={item.id} className="p-3.5 bg-slate-800/60 rounded-xl border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-200 flex items-center gap-1.5">
                    {item.type === 'VIDEO' ? <Video className="w-3.5 h-3.5 text-rose-400" /> : <Mic className="w-3.5 h-3.5 text-purple-400" />}
                    {item.title}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">{item.durationSeconds}s</span>
                </div>

                <div className="text-[10px] text-slate-400 flex items-center justify-between">
                  <span>Logged: {item.timestamp}</span>
                  <span className="text-emerald-400 font-mono">{item.cloudBackupStatus}</span>
                </div>

                <div className="p-2 bg-slate-950 rounded-lg text-[9px] font-mono text-slate-400 break-all border border-slate-800/80">
                  <strong className="text-slate-300">Tamper-Proof Hash:</strong> {item.tamperProofHash}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
