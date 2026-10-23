import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';
import { Navbar } from '../common/Navbar';
import { GOVERNMENT_SCHEMES } from '../../data/schemes';
import { GovernmentScheme } from '../../types';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Filter, 
  ChevronRight, 
  HelpCircle, 
  RotateCcw,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { playChime } from '../../utils/speech';
import { getSchemeTitle, getSchemeDesc } from '../../data/translations/serviceDataTranslations';
import { getLocalizedText } from '../../utils/i18n';
import { saveSchemeInquiryToSupabase } from '../../services/supabaseClient';

export const SchemeWizardScreen: React.FC = () => {
  const { selectedLanguage, navigateTo, setSelectedScheme, seniorMode } = useApp();

  const [ageGroup, setAgeGroup] = useState<string>('50+');
  const [occupation, setOccupation] = useState<string>('farmer');
  const [income, setIncome] = useState<string>('low');
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const isHindi = selectedLanguage === 'hi';

  const handleRunFinder = () => {
    playChime('success');
    setHasSearched(true);
    saveSchemeInquiryToSupabase({
      schemeId: 'wizard-search',
      schemeTitle: `Eligibility Wizard Search: ${occupation} / ${ageGroup} / ${income}`,
      ministry: 'Government of India Multi-Scheme Eligibility',
      eligible: true
    });
  };

  // Filter schemes based on wizard criteria
  const recommendedSchemes = GOVERNMENT_SCHEMES.filter(scheme => {
    if (occupation === 'farmer' && (scheme.category === 'farmers' || scheme.id === 'pm-kisan')) return true;
    if (occupation === 'senior' && (scheme.category === 'seniors' || scheme.id === 'apy' || scheme.id === 'pm-kisan')) return true;
    if (occupation === 'student' && (scheme.category === 'students' || scheme.id === 'mudra-loan')) return true;
    if (occupation === 'business' && (scheme.category === 'business' || scheme.id === 'mudra-loan')) return true;
    if (income === 'low' && (scheme.id === 'pmjay-ayushman' || scheme.id === 'pmay-gramin')) return true;
    return scheme.category === 'healthcare' || scheme.category === 'housing';
  });

  const handleOpenScheme = (scheme: GovernmentScheme) => {
    setSelectedScheme(scheme);
    navigateTo('scheme-details');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 flex flex-col justify-between">
      <Header title="Scheme Finder" showBack={true} />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Intro */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#159A9C]/10 text-[#159A9C] text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#F4A340]" />
            <span>Personalized Eligibility Assistant</span>
          </div>
          <h2 className={`font-extrabold text-[#173B57] ${seniorMode ? 'text-2xl' : 'text-xl sm:text-2xl'}`}>
            {isHindi ? '🎯 मेरे लिए योजना खोजें' : '🎯 Find Schemes For Me'}
          </h2>
          <p className="text-xs text-[#667085]">
            {isHindi ? 'कुछ सामान्य जानकारी चुनकर अपने लिए उपयुक्त योजनाएं देखें।' : 'Select a few simple parameters to discover schemes tailored for you.'}
          </p>
        </div>

        {/* Wizard Form Questionnaire */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-4">
          
          {/* Question 1: Age Group */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#173B57] uppercase tracking-wider block">
              1. Age Group (आयु वर्ग)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'under18', label: 'Under 18' },
                { id: '18-35', label: '18 - 35 Yrs' },
                { id: '36-59', label: '36 - 59 Yrs' },
                { id: '60+', label: '60+ Senior' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setAgeGroup(item.id)}
                  className={`p-2.5 rounded-xl text-xs font-semibold border transition ${
                    ageGroup === item.id 
                      ? 'bg-[#173B57] text-white border-[#173B57]' 
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Question 2: Occupation */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#173B57] uppercase tracking-wider block">
              2. Primary Occupation (व्यवसाय)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { id: 'farmer', label: '👨‍🌾 Farmer / Agriculture' },
                { id: 'senior', label: '👴 Senior / Retired' },
                { id: 'student', label: '🎓 Student' },
                { id: 'business', label: '🚀 Small Business / MSME' },
                { id: 'homemaker', label: '👩 Homemaker / Daily Wage' },
                { id: 'salaried', label: '💼 Salaried Employee' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setOccupation(item.id)}
                  className={`p-2.5 rounded-xl text-xs font-semibold border text-left transition ${
                    occupation === item.id 
                      ? 'bg-[#173B57] text-white border-[#173B57]' 
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Question 3: Annual Household Income Category */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#173B57] uppercase tracking-wider block">
              3. Household Income Category (वार्षिक आय)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { id: 'low', label: 'Below ₹2.5 Lakh / BPL' },
                { id: 'mid', label: '₹2.5 Lakh - ₹5 Lakh' },
                { id: 'high', label: 'Above ₹5 Lakh' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setIncome(item.id)}
                  className={`p-2.5 rounded-xl text-xs font-semibold border transition ${
                    income === item.id 
                      ? 'bg-[#173B57] text-white border-[#173B57]' 
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Run Recommendation CTA */}
          <div className="pt-2">
            <button
              onClick={handleRunFinder}
              className="w-full py-3.5 px-4 rounded-xl bg-[#173B57] hover:bg-[#159A9C] text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2 group active:scale-[0.98]"
            >
              <span>Show Matching Schemes</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>

        {/* RESULTS SECTION */}
        {hasSearched && (
          <div className="space-y-3 animate-in fade-in slide-in-from-bottom-3 duration-300">
            
            {/* Carefully framed qualification notice */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 flex items-start gap-2.5 text-xs text-emerald-950">
              <ShieldCheck className="w-4 h-4 text-[#2E8B57] shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="font-bold block">
                  {isHindi ? 'संभावित योजनाएँ (Potential Matches)' : 'Schemes you may want to check'}
                </span>
                <p className="text-emerald-800">
                  «“You may qualify based on the information provided. Please review detailed criteria below.”»
                </p>
              </div>
            </div>

            {/* Scheme list cards */}
            <div className="space-y-2.5">
              {recommendedSchemes.map((scheme) => (
                <div
                  key={scheme.id}
                  onClick={() => handleOpenScheme(scheme)}
                  className="bg-white rounded-xl p-4 border border-slate-200 hover:border-[#159A9C] shadow-2xs hover:shadow-xs transition cursor-pointer flex items-center justify-between gap-3 group"
                >
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] bg-[#159A9C]/10 text-[#159A9C] font-bold px-2 py-0.5 rounded-full">
                        {scheme.categoryLabel}
                      </span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                        High Match
                      </span>
                    </div>

                    <h4 className="font-bold text-sm text-[#173B57] group-hover:text-[#159A9C] transition-colors truncate">
                      {getSchemeTitle(scheme.id, scheme.title, selectedLanguage)}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-1">{getSchemeDesc(scheme.id, scheme.shortDesc, selectedLanguage)}</p>
                  </div>

                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform shrink-0" />
                </div>
              ))}
            </div>

          </div>
        )}

      </main>

      <Navbar />
    </div>
  );
};
