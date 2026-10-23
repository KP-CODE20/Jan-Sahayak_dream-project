import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';
import { Navbar } from '../common/Navbar';
import { 
  ShieldCheck, 
  Trash2, 
  Eye, 
  EyeOff, 
  Edit3, 
  Lock, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  FileText, 
  UserCheck, 
  X, 
  Volume2,
  KeyRound,
  Database
} from 'lucide-react';
import { playChime } from '../../utils/speech';

interface DataFieldItem {
  key: string;
  label: string;
  hindiLabel: string;
  value: string;
  maskedValue: string;
  category: string;
  isSensitive: boolean;
}

export const PrivacyDataScreen: React.FC = () => {
  const { 
    userProfile, 
    updateUserProfile, 
    isDataDeleted, 
    deleteUserData, 
    restoreDemoData,
    selectedLanguage, 
    readAloud,
    seniorMode 
  } = useApp();

  const [unmaskedKeys, setUnmaskedKeys] = useState<Record<string, boolean>>({});
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletedNotice, setDeletedNotice] = useState(false);
  const [editingItem, setEditingItem] = useState<{ key: string; label: string; value: string } | null>(null);
  const [editValue, setEditValue] = useState('');

  const isHindi = selectedLanguage === 'hi';

  const dataFields: DataFieldItem[] = [
    {
      key: 'name',
      label: 'Full Name',
      hindiLabel: 'पूरा नाम',
      value: userProfile.name || 'Not provided',
      maskedValue: userProfile.name || 'Not provided',
      category: 'Identity',
      isSensitive: false
    },
    {
      key: 'dob',
      label: 'Date of Birth',
      hindiLabel: 'जन्मतिथि',
      value: userProfile.dob || 'Not provided',
      maskedValue: userProfile.dob || 'Not provided',
      category: 'Identity',
      isSensitive: false
    },
    {
      key: 'address',
      label: 'Residential Address',
      hindiLabel: 'आवासीय पता',
      value: userProfile.address ? `${userProfile.address}, ${userProfile.city} - ${userProfile.pincode}` : 'Not provided',
      maskedValue: userProfile.address ? `${userProfile.address}, ${userProfile.city} - ${userProfile.pincode}` : 'Not provided',
      category: 'Address',
      isSensitive: false
    },
    {
      key: 'bankAccount',
      label: 'Bank Account Number',
      hindiLabel: 'बैंक खाता संख्या',
      value: '109845823901',
      maskedValue: 'XXXXXXXX4582',
      category: 'Banking',
      isSensitive: true
    },
    {
      key: 'aadhaarNumber',
      label: 'Aadhaar Card Reference',
      hindiLabel: 'आधार कार्ड संख्या',
      value: '5482 9102 2381',
      maskedValue: 'XXXX XXXX 2381',
      category: 'Identification',
      isSensitive: true
    },
    {
      key: 'pan',
      label: 'PAN Card Reference',
      hindiLabel: 'पैन कार्ड संख्या',
      value: 'ABCDE1234X',
      maskedValue: 'XXXXX1234X',
      category: 'Tax & KYC',
      isSensitive: true
    },
    {
      key: 'nomineeName',
      label: 'Nominee Details',
      hindiLabel: 'नॉमिनी विवरण',
      value: `${userProfile.nomineeName || 'Sunita Devi'} (${userProfile.nomineeRelation || 'Mother'})`,
      maskedValue: `${userProfile.nomineeName || 'Sunita Devi'} (${userProfile.nomineeRelation || 'Mother'})`,
      category: 'Banking',
      isSensitive: false
    }
  ];

  const toggleMask = (key: string) => {
    setUnmaskedKeys(prev => ({ ...prev, [key]: !prev[key] }));
    playChime('click');
  };

  const handleOpenEdit = (item: DataFieldItem) => {
    setEditingItem({ key: item.key, label: item.label, value: item.value });
    setEditValue(item.value);
    playChime('click');
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    if (editingItem.key === 'name') updateUserProfile({ name: editValue });
    if (editingItem.key === 'dob') updateUserProfile({ dob: editValue });
    if (editingItem.key === 'address') updateUserProfile({ address: editValue });
    if (editingItem.key === 'nomineeName') updateUserProfile({ nomineeName: editValue });

    setEditingItem(null);
    playChime('success');
  };

  const handleDeleteIndividual = (key: string) => {
    if (key === 'name') updateUserProfile({ name: '' });
    if (key === 'dob') updateUserProfile({ dob: '' });
    if (key === 'address') updateUserProfile({ address: '' });
    if (key === 'nomineeName') updateUserProfile({ nomineeName: '' });
    playChime('click');
  };

  const confirmDeleteAll = () => {
    deleteUserData();
    setDeleteModalOpen(false);
    setDeletedNotice(true);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 flex flex-col justify-between">
      <Header title="Privacy & Data" showBack={true} />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Main Privacy Banner */}
        <div className="bg-gradient-to-br from-[#173B57] to-[#159A9C] text-white rounded-2xl p-6 sm:p-7 shadow-lg space-y-3 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
          
          <div className="flex items-center gap-2 text-xs font-bold text-[#F4A340] uppercase tracking-wider">
            <Lock className="w-4 h-4" />
            <span>Privacy by Design & Zero-Tracking Guarantee</span>
          </div>

          <h2 className={`font-extrabold tracking-tight ${seniorMode ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'}`}>
            🔐 {isHindi ? 'आपका डेटा हमेशा सुरक्षित व निजी रहता है' : 'Your data stays private — never shared without your permission.'}
          </h2>

          <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl leading-relaxed">
            {isHindi 
              ? 'जन सहायक आपके किसी भी बैंकिंग या व्यक्तिगत डेटा को बाहरी सर्वर पर स्टोर नहीं करता। सभी संवेदनशील अंक (जैसे खाता संख्या, पैन, आधार) स्क्रीन पर सुरक्षित रूप से मास्क रहते हैं।'
              : 'Jan Sahayak processes your information exclusively on your device. Sensitive details like Aadhaar, PAN, and Bank Account numbers are masked by default to protect your privacy in public spaces.'}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-white/90">
            <span className="flex items-center gap-1 bg-white/10 px-3 py-1.5 rounded-lg">
              <ShieldCheck className="w-3.5 h-3.5 text-[#F4A340]" /> Client-side sandbox only
            </span>
            <span className="flex items-center gap-1 bg-white/10 px-3 py-1.5 rounded-lg">
              <KeyRound className="w-3.5 h-3.5 text-[#F4A340]" /> Masked by default
            </span>
            <span className="flex items-center gap-1 bg-white/10 px-3 py-1.5 rounded-lg">
              <Database className="w-3.5 h-3.5 text-[#F4A340]" /> 100% User-controlled
            </span>
          </div>
        </div>

        {/* Data Deletion Success Banner */}
        {isDataDeleted && (
          <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-950 flex items-center justify-between gap-4 animate-in fade-in">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center shrink-0">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm">“Your saved data has been deleted.”</h4>
                <p className="text-[11px] text-amber-800">All demographic and pre-filled records have been wiped from memory.</p>
              </div>
            </div>

            <button
              onClick={restoreDemoData}
              className="px-3.5 py-2 rounded-xl bg-[#173B57] hover:bg-[#159A9C] text-white text-xs font-bold shrink-0 transition flex items-center gap-1.5 shadow-xs"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Restore Demo Data</span>
            </button>
          </div>
        )}

        {/* SAVED INFORMATION LIST */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-[#173B57]">
                {isHindi ? 'सुरक्षित सहेजी गई जानकारी (Saved Information)' : 'Saved Information'}
              </h3>
              <p className="text-xs text-slate-500">
                Review, mask/unmask, edit, or delete any individual data item.
              </p>
            </div>

            <button
              onClick={() => readAloud(isHindi 
                ? 'यहाँ आपकी सहेजी गई जानकारी है। आप किसी भी समय इसे देख सकते हैं या मिटा सकते हैं।' 
                : 'Here is your saved information. You can view, edit, or delete items anytime.')}
              className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-[#159A9C] transition"
              title="Read aloud"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            {dataFields.map((item) => {
              const isUnmasked = !!unmaskedKeys[item.key];
              const displayVal = isUnmasked ? item.value : item.maskedValue;
              const isEmpty = !item.value || item.value === 'Not provided';

              return (
                <div 
                  key={item.key}
                  className="p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-[#159A9C] transition flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1 flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs sm:text-sm text-[#173B57]">
                        {isHindi ? item.hindiLabel : item.label}
                      </span>
                      <span className="text-[10px] text-slate-400 uppercase font-mono px-1.5 py-0.5 bg-white rounded border border-slate-200">
                        {item.category}
                      </span>
                      {!isEmpty && (
                        <span className="text-emerald-600 font-bold text-xs">✓</span>
                      )}
                    </div>

                    <div className="font-mono text-xs sm:text-sm text-slate-800 font-semibold tracking-wide truncate">
                      {isEmpty ? <span className="text-slate-400 italic">Deleted / Empty</span> : displayVal}
                    </div>
                  </div>

                  {/* Actions: View / Edit / Delete */}
                  <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200/60">
                    
                    {/* View / Toggle Mask */}
                    {item.isSensitive && (
                      <button
                        onClick={() => toggleMask(item.key)}
                        className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 flex items-center gap-1 shadow-2xs transition"
                        title={isUnmasked ? 'Mask details' : 'Unmask details'}
                      >
                        {isUnmasked ? <EyeOff className="w-3.5 h-3.5 text-slate-500" /> : <Eye className="w-3.5 h-3.5 text-slate-500" />}
                        <span>{isUnmasked ? 'Mask' : 'View'}</span>
                      </button>
                    )}

                    {/* Edit Button */}
                    <button
                      onClick={() => handleOpenEdit(item)}
                      className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 flex items-center gap-1 shadow-2xs transition"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-[#159A9C]" />
                      <span>Edit</span>
                    </button>

                    {/* Delete Individual */}
                    <button
                      onClick={() => handleDeleteIndividual(item.key)}
                      className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-rose-50 border border-slate-200 hover:border-rose-200 text-xs font-semibold text-rose-600 flex items-center gap-1 shadow-2xs transition"
                      title="Clear this field"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                      <span>Delete</span>
                    </button>

                  </div>
                </div>
              );
            })}
          </div>

          {/* DANGER ZONE: DELETE ALL SAVED DATA */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-0.5 text-center sm:text-left">
              <h4 className="font-bold text-xs sm:text-sm text-slate-800">
                Permanent Data Removal
              </h4>
              <p className="text-xs text-slate-500">
                Wipe all local session cache and demo records completely.
              </p>
            </div>

            <button
              onClick={() => setDeleteModalOpen(true)}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition active:scale-95 cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              <span>🗑 Delete My Data</span>
            </button>
          </div>
        </div>

      </main>

      {/* Confirmation Modal for Delete My Data */}
      {deleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 border border-slate-200 shadow-2xl space-y-4 text-center animate-in zoom-in-95">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h3 className="font-extrabold text-base text-[#173B57]">
                “Are you sure you want to delete your saved information?”
              </h3>
              <p className="text-xs text-slate-500">
                This will immediately clear all prefilled name, address, and banking references. You will need to re-enter them manually.
              </p>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition"
              >
                Cancel
              </button>
              
              <button
                onClick={confirmDeleteAll}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition"
              >
                Delete My Data
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Single Field Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 border border-slate-200 shadow-2xl space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-[#173B57]">Edit {editingItem.label}</h3>
              <button onClick={() => setEditingItem(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Value:</label>
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 font-mono text-sm focus:ring-2 focus:ring-[#159A9C] outline-none"
                  autoFocus
                />
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#173B57] text-white font-bold text-xs hover:bg-[#159A9C] transition"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-semibold text-xs hover:bg-slate-200 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Navbar />
    </div>
  );
};
