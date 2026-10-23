import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';
import { Navbar } from '../common/Navbar';
import { 
  ScrollText, 
  CheckCircle2, 
  ExternalLink, 
  Volume2, 
  ShieldCheck, 
  FileText, 
  Sparkles, 
  AlertCircle
} from 'lucide-react';
import { getSchemeTitle, getSchemeDesc } from '../../data/translations/serviceDataTranslations';
import { getLocalizedText } from '../../utils/i18n';
import { saveSchemeInquiryToSupabase } from '../../services/supabaseClient';

export const SchemeDetailsScreen: React.FC = () => {
  const { 
    selectedScheme, 
    selectedLanguage, 
    readAloud, 
    seniorMode 
  } = useApp();

  const [officialModalOpen, setOfficialModalOpen] = useState(false);

  const schemeTitle = getSchemeTitle(selectedScheme.id, selectedScheme.title, selectedLanguage);
  const schemeDesc = getSchemeDesc(selectedScheme.id, selectedScheme.detailedDesc, selectedLanguage);

  useEffect(() => {
    saveSchemeInquiryToSupabase({
      schemeId: selectedScheme.id,
      schemeTitle: selectedScheme.title,
      ministry: selectedScheme.ministry,
      eligible: true
    });
  }, [selectedScheme.id]);

  const handleReadScheme = () => {
    const text = `${schemeTitle}। ${schemeDesc}। ${getLocalizedText('detailsLabel', selectedLanguage, 'Details')}: ${selectedScheme.benefits.join(', ')}।`;
    readAloud(text);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 flex flex-col justify-between">
      <Header title={getLocalizedText('detailsLabel', selectedLanguage, 'Scheme Details')} showBack={true} />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Scheme Header Card */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-[#159A9C] bg-[#159A9C]/10 px-2.5 py-0.5 rounded-full uppercase">
                  {selectedScheme.categoryLabel}
                </span>
                <span className="text-[11px] font-bold bg-amber-50 text-amber-900 border border-amber-200 px-2 py-0.5 rounded-full">
                  {selectedScheme.badge}
                </span>
              </div>
              <h2 className={`font-extrabold text-[#173B57] leading-tight ${seniorMode ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'}`}>
                {schemeTitle}
              </h2>
            </div>

            <button
              onClick={handleReadScheme}
              className="p-2.5 rounded-full bg-[#159A9C]/10 text-[#159A9C] hover:bg-[#159A9C]/20 transition shrink-0"
              title="Listen to Scheme Overview"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <h3 className="text-xs font-bold text-[#173B57] uppercase tracking-wider mb-1">
              {getLocalizedText('govtSchemesTitle', selectedLanguage, 'What is this Scheme?')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {schemeDesc}
            </p>
          </div>
        </div>

        {/* 1. Key Benefits */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3">
          <h3 className="text-xs font-bold text-[#173B57] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#F4A340]" />
            <span>{getLocalizedText('detailsLabel', selectedLanguage, 'Key Benefits')}</span>
          </h3>

          <div className="space-y-2">
            {selectedScheme.benefits.map((benefit, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-100 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#2E8B57] shrink-0 mt-0.5" />
                <span className="text-xs text-emerald-950 font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Who may qualify? (Eligibility) */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3">
          <h3 className="text-xs font-bold text-[#173B57] uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#159A9C]" />
            <span>{getLocalizedText('viewEligibilityDocs', selectedLanguage, 'Who May Qualify & Eligibility')}</span>
          </h3>

          <div className="space-y-2">
            {selectedScheme.eligibility.map((item, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5">
                <span className="w-4 h-4 rounded-full bg-[#173B57] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                  ✓
                </span>
                <span className="text-xs text-slate-700 leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Required Documents */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3">
          <h3 className="text-xs font-bold text-[#173B57] uppercase tracking-wider flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-[#159A9C]" />
            <span>{getLocalizedText('viewEligibilityDocs', selectedLanguage, 'Required Documents')}</span>
          </h3>

          <div className="space-y-2">
            {selectedScheme.documents.map((doc, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center gap-2.5 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-[#2E8B57] shrink-0" />
                <span>{doc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 4. How to Apply */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3">
          <h3 className="text-xs font-bold text-[#173B57] uppercase tracking-wider">
            {getLocalizedText('btnContinue', selectedLanguage, 'How to Apply (Steps)')}
          </h3>

          <div className="space-y-2.5">
            {selectedScheme.applicationSteps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl">
                <span className="font-bold text-[#159A9C] shrink-0">{idx + 1}.</span>
                <span>{step.replace(/^\d+\.\s*/, '')}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Official Source & Mandatory Verification Disclaimer */}
        <div className="bg-amber-50 rounded-2xl p-4 sm:p-5 border border-amber-200 space-y-3 text-xs text-amber-900">
          <div className="flex items-start gap-2.5">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold text-amber-950 block">Important Verification Notice</span>
              <p className="leading-relaxed">
                {getLocalizedText('disclaimerNoticeText', selectedLanguage, 'Always verify latest eligibility and requirements with the official government source.')}
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-2">
            <span className="text-[11px] text-amber-800">Source: {selectedScheme.officialSourceLabel}</span>
            <button
              onClick={() => setOfficialModalOpen(true)}
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#173B57] hover:bg-[#159A9C] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition"
            >
              <span>{getLocalizedText('detailsLabel', selectedLanguage, 'View Official Information')}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </main>

      {/* Official Simulation Modal */}
      {officialModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in zoom-in-95">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 border border-slate-200 shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-indigo-50 text-[#173B57] flex items-center justify-center mx-auto">
              <ScrollText className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-base text-[#173B57]">Government Portal Simulator</h3>
              <p className="text-xs text-slate-500">
                In this prototype, external redirect to <strong>{selectedScheme.officialSourceLabel}</strong> is simulated safely.
              </p>
            </div>
            <button
              onClick={() => setOfficialModalOpen(false)}
              className="w-full py-2.5 rounded-xl bg-[#173B57] text-white font-bold text-xs hover:bg-[#159A9C] transition"
            >
              {getLocalizedText('btnBack', selectedLanguage, 'Return to Scheme')}
            </button>
          </div>
        </div>
      )}

      <Navbar />
    </div>
  );
};
