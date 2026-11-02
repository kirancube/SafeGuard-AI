import React from 'react';
import { 
  ShieldAlert, 
  MapPin, 
  BrainCircuit, 
  PhoneCall, 
  PhoneIncoming, 
  Bot, 
  FileText, 
  Radio, 
  Users, 
  Lock, 
  BarChart3, 
  UserCheck, 
  Flame,
  Volume2
} from 'lucide-react';
import { SosStatus, UserProfile } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  sosStatus: SosStatus;
  userProfile: UserProfile;
  onOpenProfile: () => void;
  onTriggerSos: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  sosStatus,
  userProfile,
  onOpenProfile,
  onTriggerSos,
}) => {
  const navItems = [
    { id: 'sos', label: 'Smart SOS', icon: ShieldAlert, badge: sosStatus === 'ACTIVE' ? 'ALERT' : null },
    { id: 'map', label: 'Live GPS & Routes', icon: MapPin },
    { id: 'ai-threat', label: 'AI Threat & Sensors', icon: BrainCircuit },
    { id: 'contacts', label: 'Emergency Contacts', icon: PhoneCall },
    { id: 'fake-call', label: 'Fake Call Escape', icon: PhoneIncoming },
    { id: 'ai-chatbot', label: 'AI Safety Chatbot', icon: Bot },
    { id: 'recorder', label: 'Audio/Video Capture', icon: Volume2 },
    { id: 'crowd-report', label: 'Incident Reporting', icon: Users },
    { id: 'wearables', label: 'Wearable & Voice AI', icon: Radio },
    { id: 'vault', label: 'Evidence Vault', icon: Lock },
    { id: 'admin', label: 'Admin Dashboard', icon: BarChart3 },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 text-white shadow-xl">
      {/* Top emergency announcement bar if SOS active */}
      {sosStatus === 'ACTIVE' && (
        <div className="bg-red-600 text-white px-4 py-2 text-sm font-bold flex items-center justify-between animate-pulse">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-yellow-300" />
            <span>EMERGENCY SOS ACTIVE: Live GPS, Video/Audio Recording & Contacts Dispatched!</span>
          </div>
          <button 
            onClick={() => setActiveTab('sos')}
            aria-label="View Emergency SOS details"
            className="bg-white text-red-700 px-3 py-1 rounded text-xs font-black uppercase hover:bg-red-50 transition"
          >
            View Emergency Controls
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand logo & status */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('sos')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-red-500 flex items-center justify-center shadow-lg shadow-rose-900/40 border border-rose-400/30">
              <ShieldAlert className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                  SafeGuard AI
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  WOMEN SECURITY
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                AI Threat Prediction • Live GPS • Wearables • Evidence Vault
              </p>
            </div>
          </div>

          {/* Quick Helpline Direct Buttons & Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* National Helpline 112 */}
            <a 
              href="tel:112" 
              className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold hover:bg-amber-500/20 transition"
              title="National Emergency Helpline"
            >
              <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
              <span>112 POLICE</span>
            </a>

            {/* Women Helpline 1091 */}
            <a 
              href="tel:1091" 
              className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold hover:bg-rose-500/20 transition"
              title="Women Emergency Helpline"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
              <span>1091 WOMEN CELL</span>
            </a>

            {/* Quick Emergency Button */}
            <button
              onClick={onTriggerSos}
              className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs sm:text-sm px-3 sm:px-4 py-2 rounded-xl shadow-lg shadow-red-600/30 border border-red-400/40 flex items-center gap-1.5 transition transform active:scale-95"
            >
              <ShieldAlert className="w-4 h-4 animate-bounce" />
              <span>PANIC SOS</span>
            </button>

            {/* User Profile Button */}
            <button
              onClick={onOpenProfile}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-slate-800 border border-slate-700 hover:border-slate-600 text-slate-200 text-xs font-medium transition"
            >
              <div className="w-6 h-6 rounded-full bg-rose-600 text-white font-bold text-xs flex items-center justify-center">
                {userProfile.name.charAt(0)}
              </div>
              <span className="hidden lg:inline">{userProfile.name.split(' ')[0]}</span>
              <UserCheck className="w-3.5 h-3.5 text-emerald-400 hidden sm:inline" />
            </button>
          </div>
        </div>

        {/* Scrollable Horizontal Navigation Tabs */}
        <nav className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-none border-t border-slate-800/80">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-rose-600/20 text-rose-300 border border-rose-500/40 shadow-sm'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-rose-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-black bg-red-600 text-white animate-pulse">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
