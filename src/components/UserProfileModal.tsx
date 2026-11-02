import React, { useState } from 'react';
import { 
  UserCheck, 
  X, 
  ShieldCheck, 
  Heart, 
  Phone, 
  Mail, 
  CheckCircle2, 
  Lock, 
  Scan, 
  FileText 
} from 'lucide-react';
import { UserProfile } from '../types';

interface UserProfileModalProps {
  userProfile: UserProfile;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
  onClose: () => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  userProfile,
  onUpdateProfile,
  onClose,
}) => {
  const [formData, setFormData] = useState<UserProfile>(userProfile);
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 w-full max-w-2xl text-white shadow-2xl space-y-6 relative my-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-rose-600/20 border border-rose-500/40 text-rose-400 flex items-center justify-center font-bold text-xl">
            {formData.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-xl font-black text-white">{formData.name} Profile</h2>
            <p className="text-xs text-slate-400">User Registration, Medical Safety Details & Emergency Security Settings</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Verified Mobile Number</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-white font-mono focus:outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Blood Group</label>
              <select
                value={formData.bloodGroup}
                onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-white font-bold focus:outline-none focus:border-rose-500"
              >
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Medical Conditions / Required Medication</label>
            <textarea
              rows={2}
              value={formData.medicalNotes}
              onChange={(e) => setFormData({ ...formData, medicalNotes: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-rose-500"
            />
          </div>

          {/* Biometric & Face Authentication Toggles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div 
              onClick={() => setFormData({ ...formData, isBiometricEnabled: !formData.isBiometricEnabled })}
              className={`p-3 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                formData.isBiometricEnabled ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300' : 'bg-slate-800 border-slate-700 text-slate-400'
              }`}
            >
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-400" />
                <span>Biometric / Fingerprint Unlock</span>
              </div>
              <span className="font-bold">{formData.isBiometricEnabled ? 'ENABLED' : 'OFF'}</span>
            </div>

            <div 
              onClick={() => setFormData({ ...formData, isFaceAuthEnabled: !formData.isFaceAuthEnabled })}
              className={`p-3 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                formData.isFaceAuthEnabled ? 'bg-purple-500/10 border-purple-500/40 text-purple-300' : 'bg-slate-800 border-slate-700 text-slate-400'
              }`}
            >
              <div className="flex items-center gap-2">
                <Scan className="w-4 h-4 text-purple-400" />
                <span>Face Recognition Auth</span>
              </div>
              <span className="font-bold">{formData.isFaceAuthEnabled ? 'ENABLED' : 'OFF'}</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            {isSaved ? (
              <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Profile Details Saved!
              </span>
            ) : <span />}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="bg-slate-800 text-slate-300 font-bold px-4 py-2 rounded-xl text-xs"
              >
                Close
              </button>
              <button
                type="submit"
                className="bg-rose-600 hover:bg-rose-500 text-white font-bold px-6 py-2 rounded-xl text-xs transition shadow-lg shadow-rose-600/30"
              >
                Save Profile Updates
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
