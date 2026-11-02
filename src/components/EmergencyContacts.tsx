import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  PhoneCall, 
  MessageSquare, 
  ShieldAlert, 
  Trash2, 
  CheckCircle2, 
  Star, 
  Heart, 
  Phone, 
  Building2,
  Plus
} from 'lucide-react';
import { EmergencyContact } from '../types';

interface EmergencyContactsProps {
  contacts: EmergencyContact[];
  onAddContact: (contact: Omit<EmergencyContact, 'id'>) => void;
  onDeleteContact: (id: string) => void;
  onTestAlert: (contact: EmergencyContact) => void;
}

export const EmergencyContacts: React.FC<EmergencyContactsProps> = ({
  contacts,
  onAddContact,
  onDeleteContact,
  onTestAlert,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [relation, setRelation] = useState('Family');
  const [priority, setPriority] = useState<1 | 2 | 3>(1);
  const [isFamily, setIsFamily] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    onAddContact({
      name,
      phone,
      relation,
      priority,
      isFamily,
      notifySms: true,
      notifyCall: true,
    });

    setName('');
    setPhone('');
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
            <Users className="w-4 h-4 text-rose-400" />
            <span>PRIORITY EMERGENCY DISPATCH DIRECTORY</span>
          </div>
          <h2 className="text-2xl font-black text-white mt-1">
            Emergency Contacts & Helplines
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Configure priority contacts, family groupings, and official helplines (112 National Police & 1091 Women Protection Cell) notified immediately during SOS activation.
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-600/30 transition"
        >
          <Plus className="w-4 h-4" />
          <span>{showAddForm ? 'Cancel Form' : 'Add New Contact'}</span>
        </button>
      </div>

      {/* Quick Official Helplines Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <a
          href="tel:112"
          className="p-4 bg-gradient-to-r from-amber-600/20 to-amber-900/20 border border-amber-500/40 rounded-2xl flex items-center justify-between text-amber-300 hover:bg-amber-600/30 transition"
        >
          <div>
            <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider">NATIONAL POLICE EMERGENCY</span>
            <div className="text-xl font-black text-white">112 / 100 POLICE</div>
            <p className="text-[11px] text-amber-200/80 mt-0.5">24/7 Police Dispatch Control Room</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 font-black flex items-center justify-center">
            <PhoneCall className="w-5 h-5" />
          </div>
        </a>

        <a
          href="tel:1091"
          className="p-4 bg-gradient-to-r from-rose-600/20 to-rose-900/20 border border-rose-500/40 rounded-2xl flex items-center justify-between text-rose-300 hover:bg-rose-600/30 transition"
        >
          <div>
            <span className="text-[10px] font-black uppercase text-rose-400 tracking-wider">WOMEN HELPLINE CELL</span>
            <div className="text-xl font-black text-white">1091 WOMEN CELL</div>
            <p className="text-[11px] text-rose-200/80 mt-0.5">Specialized Women Protection Squad</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-600 text-white font-black flex items-center justify-center">
            <ShieldAlert className="w-5 h-5" />
          </div>
        </a>

        <a
          href="tel:108"
          className="p-4 bg-gradient-to-r from-emerald-600/20 to-emerald-900/20 border border-emerald-500/40 rounded-2xl flex items-center justify-between text-emerald-300 hover:bg-emerald-600/30 transition"
        >
          <div>
            <span className="text-[10px] font-black uppercase text-emerald-400 tracking-wider">MEDICAL AMBULANCE</span>
            <div className="text-xl font-black text-white">108 / 102 DISPATCH</div>
            <p className="text-[11px] text-emerald-200/80 mt-0.5">Emergency Ambulance Services</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500 text-slate-950 font-black flex items-center justify-center">
            <Phone className="w-5 h-5" />
          </div>
        </a>
      </div>

      {/* Add Contact Modal Form */}
      {showAddForm && (
        <form onSubmit={handleSubmit} className="bg-slate-900 border border-rose-500/40 rounded-2xl p-6 space-y-4 shadow-2xl animate-fade-in">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <UserPlus className="w-4 h-4 text-rose-400" />
            <span>Add Priority Emergency Contact</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Contact Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Sunita Sharma"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Phone Number</label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Relationship</label>
              <input
                type="text"
                value={relation}
                onChange={(e) => setRelation(e.target.value)}
                placeholder="Mother, Sister, Friend"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Priority Order</label>
              <select
                value={priority}
                onChange={(e) => setPriority(Number(e.target.value) as any)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-rose-500"
              >
                <option value={1}>Priority #1 (Immediate Call & SMS)</option>
                <option value={2}>Priority #2 (Secondary SMS)</option>
                <option value={3}>Priority #3 (Group Alert)</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="bg-slate-800 text-slate-300 font-bold px-4 py-2 rounded-xl text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-rose-600 hover:bg-rose-500 text-white font-bold px-5 py-2 rounded-xl text-xs transition shadow-lg"
            >
              Save Emergency Contact
            </button>
          </div>
        </form>
      )}

      {/* Emergency Contacts List */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Users className="w-4 h-4 text-rose-400" />
          <span>Configured Priority Contact List ({contacts.length})</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="p-4 bg-slate-800/60 border border-slate-800 rounded-2xl flex items-center justify-between hover:border-slate-700 transition"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">{contact.name}</span>
                  {contact.isFamily && (
                    <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 text-[10px] font-bold rounded-full border border-purple-500/30 flex items-center gap-1">
                      <Heart className="w-2.5 h-2.5 text-purple-400" /> Family
                    </span>
                  )}
                  <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 text-[10px] font-bold rounded-full border border-amber-500/30">
                    Priority #{contact.priority}
                  </span>
                </div>

                <div className="text-xs font-mono text-slate-300">{contact.phone} • {contact.relation}</div>

                <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-1">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <CheckCircle2 className="w-3 h-3" /> Auto SMS
                  </span>
                  <span className="flex items-center gap-1 text-emerald-400">
                    <CheckCircle2 className="w-3 h-3" /> Auto Call
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onTestAlert(contact)}
                  className="p-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-bold transition flex items-center gap-1"
                  title="Test Alert Dispatch"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-rose-400" />
                  <span className="hidden sm:inline">Test Alert</span>
                </button>

                <button
                  onClick={() => onDeleteContact(contact.id)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition"
                  title="Remove Contact"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
