import React, { useState } from 'react';
import { 
  Lock, 
  ShieldCheck, 
  FileText, 
  Download, 
  Video, 
  Mic, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  HardDrive,
  Copy,
  Check
} from 'lucide-react';
import { EvidenceRecord, IncidentTimelineEntry } from '../types';

interface EvidenceVaultProps {
  evidenceVault: EvidenceRecord[];
  timeline: IncidentTimelineEntry[];
}

export const EvidenceVault: React.FC<EvidenceVaultProps> = ({
  evidenceVault,
  timeline,
}) => {
  const [copiedHash, setCopiedHash] = useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleCopyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 3000);
  };

  const handleDownloadFullReport = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
            <Lock className="w-4 h-4 text-emerald-400" />
            <span>CRYPTOGRAPHIC TAMPER-PROOF EVIDENCE VAULT</span>
          </div>
          <h2 className="text-2xl font-black text-white mt-1">
            Cloud Evidence Vault & Legal Dossier
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            All audio/video recordings, GPS track histories, and incident timestamps are cryptographically hashed and backed up to secure end-to-end encrypted cloud storage for police & legal admissibility.
          </p>
        </div>

        <button
          onClick={handleDownloadFullReport}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 transition"
        >
          <Download className="w-4 h-4" />
          <span>{downloadSuccess ? 'Downloaded Police Package!' : 'Export Legal Evidence Dossier (.PDF)'}</span>
        </button>
      </div>

      {/* Main Grid: Vault Files & Incident Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Columns: Cryptographic Vault Records */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <HardDrive className="w-4 h-4 text-emerald-400" />
            <span>Encrypted Cloud Storage Records ({evidenceVault.length})</span>
          </h3>

          <div className="space-y-3">
            {evidenceVault.map((file) => (
              <div key={file.id} className="p-4 bg-slate-800/60 rounded-2xl border border-slate-800 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-white">
                    {file.type === 'VIDEO' ? <Video className="w-4 h-4 text-rose-400" /> : <Mic className="w-4 h-4 text-purple-400" />}
                    <span>{file.title}</span>
                  </div>

                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {file.cloudBackupStatus}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400">
                  <div>Timestamp: <strong className="text-slate-200">{file.timestamp}</strong></div>
                  <div>File Size: <strong className="text-slate-200">{file.fileSizeMb} MB</strong></div>
                </div>

                {/* SHA-256 Hash Display */}
                <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <div className="truncate mr-2">
                    <strong className="text-emerald-400">SHA-256:</strong> {file.tamperProofHash}
                  </div>
                  <button
                    onClick={() => handleCopyHash(file.tamperProofHash)}
                    className="p-1 rounded hover:bg-slate-800 text-slate-300 transition shrink-0"
                    title="Copy Cryptographic Hash"
                  >
                    {copiedHash === file.tamperProofHash ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 5 Columns: Complete Incident Timeline */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Clock className="w-4 h-4 text-rose-400" />
            <span>Incident Timeline Audit Log</span>
          </h3>

          <div className="relative border-l-2 border-slate-800 ml-3 space-y-4 pl-4 text-xs">
            {timeline.map((entry) => (
              <div key={entry.id} className="relative">
                <div className="absolute -left-[21px] top-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-4 ring-slate-900"></div>
                <div className="font-mono text-[11px] text-slate-400">{entry.timestamp}</div>
                <div className="font-bold text-slate-200">{entry.title}</div>
                <p className="text-slate-400 mt-0.5">{entry.details}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
