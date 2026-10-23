import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';
import { Navbar } from '../common/Navbar';
import confetti from 'canvas-confetti';
import { 
  ClipboardCheck, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  ArrowRight, 
  Sparkles, 
  Plus, 
  Camera, 
  FileText,
  ShieldCheck
} from 'lucide-react';
import { playChime } from '../../utils/speech';

export const DocumentChecklistScreen: React.FC = () => {
  const { 
    selectedLanguage, 
    navigateTo, 
    documentReadiness, 
    setDocumentStatus, 
    markAllDocsReady,
    seniorMode 
  } = useApp();

  const isHindi = selectedLanguage === 'hi';

  const docList = [
    {
      id: 'identity',
      title: 'Identity Proof (पहचान प्रमाण)',
      desc: 'Original Aadhaar Card or Voter ID with 1 self-attested photocopy',
      options: ['Aadhaar Card', 'Voter Card', 'Passport']
    },
    {
      id: 'address',
      title: 'Address Proof (पते का प्रमाण)',
      desc: 'Aadhaar / Recent Electricity Bill (<3 months) / Ration Card',
      options: ['Electricity Bill', 'Ration Card', 'Aadhaar']
    },
    {
      id: 'pan',
      title: 'PAN Card or Form 60 (पैन कार्ड)',
      desc: 'Original PAN Card or signed Form 60 declaration slip',
      options: ['Original PAN Card', 'Form 60']
    },
    {
      id: 'photo',
      title: 'Passport Size Photographs (2 ताज़ा फ़ोटो)',
      desc: '2 Recent color photographs with light background for form and passbook',
      options: ['2 Color Photos']
    },
    {
      id: 'bank',
      title: 'Account Opening Deposit / Passbook',
      desc: '₹500 - ₹1000 cash or NIL for Zero Balance Jan Dhan account',
      options: ['Cash deposit', 'Zero balance']
    }
  ];

  const totalDocs = docList.length;
  const readyDocs = docList.filter(d => documentReadiness[d.id] === 'ready').length;
  const isAllReady = readyDocs === totalDocs;

  const handleAddPhotoDemo = () => {
    setDocumentStatus('photo', 'ready');
    playChime('success');
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  };

  const handleStatusChange = (id: string, newStatus: 'ready' | 'check' | 'missing') => {
    setDocumentStatus(id, newStatus);
    if (newStatus === 'ready' && readyDocs === totalDocs - 1) {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 flex flex-col justify-between">
      <Header title="Document Checklist" showBack={true} />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Readiness Summary Header */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-[#159A9C] uppercase tracking-wider">
                Before You Visit The Bank
              </span>
              <h2 className={`font-extrabold text-[#173B57] ${seniorMode ? 'text-2xl' : 'text-xl sm:text-2xl'}`}>
                {isHindi ? 'दस्तावेज़ तैयारी जाँच (Document Readiness)' : 'Let’s check whether you have everything'}
              </h2>
            </div>

            {/* Score Ring / Pill */}
            <div className={`px-3.5 py-1.5 rounded-full font-bold text-xs flex items-center gap-1.5 shadow-2xs ${
              isAllReady 
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                : 'bg-amber-100 text-amber-900 border border-amber-300'
            }`}>
              <span>{readyDocs} / {totalDocs} Prepared</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 rounded-full ${
                isAllReady ? 'bg-[#2E8B57]' : 'bg-[#159A9C]'
              }`}
              style={{ width: `${(readyDocs / totalDocs) * 100}%` }}
            ></div>
          </div>

          {/* Dynamic Status Notice Card */}
          {isAllReady ? (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center gap-3 animate-in zoom-in-95 duration-200">
              <div className="w-9 h-9 rounded-full bg-[#2E8B57] text-white flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-sm">🎉 You appear ready for your bank visit!</h4>
                <p className="text-xs text-emerald-800">
                  {isHindi ? 'सभी ज़रूरी कागज़ात तैयार हैं। अब आप बैंक विज़िट प्लान देख सकते हैं।' : 'All required documents and photocopies are in order.'}
                </p>
              </div>
            </div>
          ) : (
            <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-900 flex items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-[#F4A340] shrink-0" />
                <span>
                  {isHindi ? 'आपकी चेकलिस्ट में अभी 1 चीज़ बाकी है: ❌ फोटोग्राफ' : 'You may still need: ❌ Photograph'}
                </span>
              </div>
              <button
                onClick={handleAddPhotoDemo}
                className="px-2.5 py-1 rounded-md bg-[#F4A340] hover:bg-[#F4A340]/90 text-[#173B57] font-bold text-xs shrink-0 shadow-2xs transition"
              >
                + Add Photo
              </button>
            </div>
          )}
        </div>

        {/* Interactive Documents List */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-bold text-[#173B57] uppercase tracking-wider">
              {isHindi ? 'दस्तावेज़ों की सूची (Check Each Item)' : 'Document Items Checklist'}
            </h3>
            <button
              onClick={markAllDocsReady}
              className="text-xs text-[#159A9C] font-semibold hover:underline"
            >
              Mark All Ready ✓
            </button>
          </div>

          {docList.map((doc) => {
            const status = documentReadiness[doc.id] || 'missing';

            return (
              <div 
                key={doc.id}
                className={`p-4 rounded-xl bg-white border transition-all shadow-2xs ${
                  status === 'ready' 
                    ? 'border-emerald-200 bg-emerald-50/20' 
                    : status === 'check' 
                    ? 'border-amber-200 bg-amber-50/20' 
                    : 'border-red-200 bg-red-50/20'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-0.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#173B57]">
                        {doc.title}
                      </span>
                    </div>
                    <p className="text-xs text-[#667085] leading-relaxed">{doc.desc}</p>
                  </div>
                </div>

                {/* Status Toggle Buttons */}
                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
                  <span className="text-[11px] font-semibold text-slate-500">Status:</span>

                  <div className="flex items-center gap-1.5">
                    {/* Ready */}
                    <button
                      onClick={() => handleStatusChange(doc.id, 'ready')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition ${
                        status === 'ready'
                          ? 'bg-[#2E8B57] text-white shadow-2xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      <span>🟢 Ready</span>
                    </button>

                    {/* Check */}
                    <button
                      onClick={() => handleStatusChange(doc.id, 'check')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition ${
                        status === 'check'
                          ? 'bg-[#F4A340] text-[#173B57] shadow-2xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      <span>🟡 Check</span>
                    </button>

                    {/* Missing */}
                    <button
                      onClick={() => handleStatusChange(doc.id, 'missing')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition ${
                        status === 'missing'
                          ? 'bg-red-500 text-white shadow-2xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      <span>🔴 Missing</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Button */}
        <div className="pt-2">
          <button
            onClick={() => navigateTo('visit-planner')}
            className="w-full py-3.5 px-4 rounded-xl bg-[#173B57] hover:bg-[#159A9C] text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2 group active:scale-[0.98]"
          >
            <span>Create Visit Plan →</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </main>

      <Navbar />
    </div>
  );
};
