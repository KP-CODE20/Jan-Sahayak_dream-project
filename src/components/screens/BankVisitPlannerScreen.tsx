import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';
import { Navbar } from '../common/Navbar';
import { 
  Briefcase, 
  CheckCircle2, 
  MapPin, 
  Clock, 
  FileText, 
  ArrowRight, 
  Printer, 
  Share2, 
  Sparkles, 
  ShieldCheck, 
  Phone,
  Scan,
  Download
} from 'lucide-react';
import { playChime } from '../../utils/speech';
import { getServiceTitle } from '../../data/translations/serviceDataTranslations';
import { getLocalizedText } from '../../utils/i18n';
import { saveBankVisitPlanToSupabase } from '../../services/supabaseClient';

export const BankVisitPlannerScreen: React.FC = () => {
  const { 
    selectedService, 
    selectedLanguage, 
    navigateTo, 
    userProfile, 
    seniorMode 
  } = useApp();

  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const isHindi = selectedLanguage === 'hi';

  const beforeLeavingChecks = [
    { id: 1, title: 'Check Original Documents', desc: 'Carry original Aadhaar & PAN in a safe pouch.' },
    { id: 2, title: 'Carry 2 Sets of Photocopies', desc: 'Self-attest each Xerox copy with your signature.' },
    { id: 3, title: 'Keep Mobile Phone Charged', desc: 'Required to receive test OTP from bank server.' },
    { id: 4, title: 'Carry Blue / Black Ballpoint Pen', desc: 'Saves time waiting at the public writing desk.' }
  ];

  const handleSimulatePrint = () => {
    playChime('success');
    saveBankVisitPlanToSupabase({
      serviceId: selectedService.id,
      serviceTitle: selectedService.title,
      branchName: 'State Bank of India (Kolkata Main)',
      counterDesk: selectedService.branchCounter,
      checklistItems: beforeLeavingChecks.map(c => c.title),
      plannedDate: new Date().toISOString().split('T')[0]
    });
    setDownloadModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 flex flex-col justify-between">
      <Header title="Bank Visit Planner" showBack={true} />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Top Overview Banner */}
        <div className="bg-[#173B57] text-white rounded-2xl p-5 shadow-md border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-[#F4A340]">
              <Briefcase className="w-4 h-4" />
              <span>OFFICIAL VISIT PLAN</span>
            </div>
            <span className="text-[10px] bg-white/15 px-2.5 py-0.5 rounded-full text-white/90">
              Demo Slip
            </span>
          </div>

          <div>
            <span className="text-xs text-emerald-200 uppercase tracking-wider font-semibold">{getLocalizedText('bankingServicesHeader', selectedLanguage, 'Service Selected')}</span>
            <h2 className={`font-extrabold text-white mt-0.5 ${seniorMode ? 'text-2xl' : 'text-xl sm:text-2xl'}`}>
              {getServiceTitle(selectedService.id, selectedService.title, selectedLanguage)}
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
            <div className="bg-white/10 p-2.5 rounded-xl flex items-center gap-2 text-white/90">
              <MapPin className="w-4 h-4 text-[#F4A340] shrink-0" />
              <span>{selectedService.branchCounter}</span>
            </div>
            <div className="bg-white/10 p-2.5 rounded-xl flex items-center gap-2 text-white/90">
              <Clock className="w-4 h-4 text-emerald-300 shrink-0" />
              <span>{selectedService.approxTime}</span>
            </div>
          </div>
        </div>

        {/* 1. What to Carry (Originals & Copies) */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3">
          <h3 className="text-xs font-bold text-[#173B57] uppercase tracking-wider flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#2E8B57]" />
            <span>{isHindi ? '1. अपने साथ क्या ले जाएं (What to Carry)' : '1. What to Carry (Documents)'}</span>
          </h3>

          <div className="space-y-2">
            {[
              'Identity Proof (Original Aadhaar / Voter ID + 1 Photocopy)',
              'Address Proof (Aadhaar / Electricity Bill copy)',
              'PAN Card (Original + 1 Photocopy or Form 60)',
              '2 Recent Passport Size Color Photographs',
              'Initial Cash Deposit (₹500 - ₹1000, if applicable)'
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200/70">
                <span className="w-4 h-4 rounded-full bg-[#2E8B57] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                  ✓
                </span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Physical Forms Required */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3">
          <h3 className="text-xs font-bold text-[#173B57] uppercase tracking-wider flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-[#159A9C]" />
            <span>{isHindi ? '2. बैंक फ़ॉर्म (Forms)' : '2. Bank Forms'}</span>
          </h3>

          <div className="flex items-center justify-between p-3 rounded-xl bg-[#159A9C]/10 border border-[#159A9C]/30">
            <div className="space-y-0.5">
              <span className="font-bold text-xs sm:text-sm text-[#173B57]">
                {selectedService.formType || 'Savings Bank Account Opening Form (SB-1)'}
              </span>
              <p className="text-[11px] text-slate-600">Available free of charge at Bank Reception or Entry Helpdesk</p>
            </div>
            <button
              onClick={() => navigateTo('form-scanner')}
              className="px-3 py-1.5 bg-[#173B57] hover:bg-[#159A9C] text-white text-xs font-bold rounded-lg transition shrink-0"
            >
              Scan Form
            </button>
          </div>
        </div>

        {/* 3. Before Leaving Home Checklist */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3">
          <h3 className="text-xs font-bold text-[#173B57] uppercase tracking-wider">
            {isHindi ? '3. घर से निकलने से पहले (Before Leaving Home)' : '3. Before Leaving Home'}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {beforeLeavingChecks.map((item) => (
              <div key={item.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#2E8B57] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-bold text-slate-800 block">{item.title}</span>
                  <span className="text-slate-500 text-[11px]">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FINAL CELEBRATION BADGE: 🎉 You're Ready! */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-500 to-[#159A9C] text-white shadow-lg space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white text-emerald-700 flex items-center justify-center text-2xl font-bold shadow-md shrink-0">
              🎉
            </div>
            <div>
              <h4 className="font-extrabold text-base sm:text-lg">You’re Ready!</h4>
              <p className="text-xs text-emerald-100">
                {isHindi ? 'आपकी चेकलिस्ट का हर दस्तावेज़ और प्रक्रिया तैयार है।' : 'Everything on your checklist has been prepared.'}
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-white/20 flex flex-col sm:flex-row items-center gap-2">
            <button
              onClick={() => navigateTo('form-filling')}
              className="w-full sm:flex-1 py-2.5 px-4 rounded-xl bg-white text-[#173B57] hover:bg-slate-100 font-bold text-xs shadow-xs transition flex items-center justify-center gap-1.5"
            >
              <span>View Pre-Filled Form</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleSimulatePrint}
              className="w-full sm:w-auto py-2.5 px-4 rounded-xl bg-white/20 hover:bg-white/30 text-white font-semibold text-xs border border-white/30 transition flex items-center justify-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Download Slip</span>
            </button>
          </div>
        </div>

      </main>

      {/* Download / Print Slip Modal Simulator */}
      {downloadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 border border-slate-200 shadow-2xl space-y-4 text-center animate-in zoom-in-95">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <Download className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-base text-[#173B57]">Bank Visit Slip Ready</h3>
              <p className="text-xs text-slate-500">
                A handy PDF summary slip with your checklist and counter details has been simulated.
              </p>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-left text-xs space-y-1 text-slate-700">
              <p><strong>Service:</strong> {selectedService.title}</p>
              <p><strong>Counter:</strong> {selectedService.branchCounter}</p>
              <p><strong>Applicant:</strong> {userProfile.name}</p>
              <p><strong>Branch:</strong> State Bank of India (Kolkata Main)</p>
            </div>
            <button
              onClick={() => setDownloadModalOpen(false)}
              className="w-full py-2.5 rounded-xl bg-[#173B57] text-white font-bold text-xs hover:bg-[#159A9C] transition"
            >
              Done / Close
            </button>
          </div>
        </div>
      )}

      <Navbar />
    </div>
  );
};
