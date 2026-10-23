import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';
import { Navbar } from '../common/Navbar';
import { InformationSourceItem } from '../../types';
import { 
  Building2, 
  ExternalLink, 
  Calendar, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Search, 
  BookOpen, 
  Scale, 
  FileCheck2, 
  Info,
  X,
  Volume2
} from 'lucide-react';
import { playChime } from '../../utils/speech';

export const InformationSourcesScreen: React.FC = () => {
  const { 
    informationSources, 
    selectedLanguage, 
    readAloud,
    seniorMode 
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSourceModal, setSelectedSourceModal] = useState<InformationSourceItem | null>(null);

  const isHindi = selectedLanguage === 'hi';

  const categories = [
    { id: 'all', label: 'All Sources', hindiLabel: 'सभी स्रोत' },
    { id: 'banking', label: 'Banking', hindiLabel: 'बैंकिंग' },
    { id: 'kyc', label: 'KYC & Identity', hindiLabel: 'केवाईसी व पहचान' },
    { id: 'pan', label: 'PAN & Tax', hindiLabel: 'पैन व आयकर' },
    { id: 'aadhaar', label: 'Aadhaar & DBT', hindiLabel: 'आधार व डीबीटी' },
    { id: 'schemes', label: 'Govt Schemes', hindiLabel: 'सरकारी योजनाएं' }
  ];

  const filteredSources = informationSources.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = 
      item.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.officialSource.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.providedGuidance.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleOpenSource = (item: InformationSourceItem) => {
    setSelectedSourceModal(item);
    playChime('click');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 flex flex-col justify-between">
      <Header title="Information & Sources" showBack={true} />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Header Title & Disclaimer Banner */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold">
            <Scale className="w-3.5 h-3.5 text-emerald-700" />
            <span>Official Government & RBI Verified Directives</span>
          </div>

          <h2 className={`font-extrabold text-[#173B57] tracking-tight ${seniorMode ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'}`}>
            {isHindi ? 'आधिकारिक सूचना एवं स्रोत (Information & Sources)' : 'Information & Sources'}
          </h2>

          {/* Mandatory Disclaimers */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-white border border-amber-300 text-amber-950 space-y-2">
            <div className="flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-extrabold text-xs sm:text-sm">
                  “Jan Sahayak provides guidance. Always verify important information with the official bank or government portal before taking action.”
                </p>
                <p className="text-[11px] sm:text-xs text-amber-900/90 leading-relaxed">
                  {isHindi
                    ? '“जन सहायक एक सहायता उपकरण है, आधिकारिक बैंक या सरकारी सेवाओं का विकल्प नहीं। बैंकिंग नियम व सरकारी प्रक्रियाएं समय-समय पर बदल सकती हैं।”'
                    : '“Jan Sahayak is an assistance tool, not a replacement for official bank or government services. Banking requirements and government procedures may change. Always confirm important information through an official source.”'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Category Filter Pills */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isHindi ? 'नियम, योजना या स्रोत खोजें...' : 'Search procedure, circular, or government source...'}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-[#159A9C] outline-none shadow-2xs"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  playChime('click');
                }}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs whitespace-nowrap transition cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#173B57] text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {isHindi ? cat.hindiLabel : cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* SOURCES LIST */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-[#173B57] uppercase tracking-wider">
              {isHindi ? 'सत्यापित नियम एवं दिशानिर्देश सूची' : `Verified Regulatory Sources (${filteredSources.length})`}
            </h3>
            
            <button
              onClick={() => readAloud(isHindi
                ? 'यहाँ सभी सरकारी और आरबीआई के अधिकृत नियमों की सूची दी गई है।'
                : 'Here is the list of verified official government and Reserve Bank of India sources.')}
              className="text-xs font-semibold text-[#159A9C] flex items-center gap-1 hover:underline"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Read Summary</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredSources.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs hover:border-[#159A9C] hover:shadow-xs transition flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                      {item.category}
                    </span>
                    
                    <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md">
                      <Calendar className="w-3 h-3 text-emerald-600" />
                      <span>Verified: {item.lastVerifiedDate}</span>
                    </span>
                  </div>

                  <h4 className="font-extrabold text-sm sm:text-base text-[#173B57] leading-snug">
                    {isHindi ? item.hindiTopic : item.topic}
                  </h4>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {isHindi ? item.hindiGuidance : item.providedGuidance}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="flex items-start gap-1.5 text-xs text-slate-700 font-medium">
                    <Building2 className="w-4 h-4 text-[#159A9C] shrink-0 mt-0.5" />
                    <span className="leading-tight">{item.officialSource}</span>
                  </div>

                  <button
                    onClick={() => handleOpenSource(item)}
                    className="w-full py-2 px-3 rounded-xl bg-slate-50 hover:bg-[#173B57] text-[#173B57] hover:text-white font-bold text-xs border border-slate-200 hover:border-[#173B57] transition flex items-center justify-center gap-1.5 shadow-2xs"
                  >
                    <span>View Official Source Details</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>

      {/* Official Source Details Modal */}
      {selectedSourceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-slate-200 shadow-2xl space-y-5 animate-in zoom-in-95">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <h3 className="font-extrabold text-base text-[#173B57]">Official Source Verification</h3>
              </div>
              <button
                onClick={() => setSelectedSourceModal(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <div className="space-y-0.5">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Topic / Procedure</span>
                <p className="font-bold text-sm text-[#173B57]">
                  {isHindi ? selectedSourceModal.hindiTopic : selectedSourceModal.topic}
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Official Authority & Circular</span>
                <p className="font-semibold text-slate-900">{selectedSourceModal.officialSource}</p>
                {selectedSourceModal.officialSourceUrl && (
                  <p className="text-[11px] text-[#159A9C] font-mono font-medium">{selectedSourceModal.officialSourceUrl}</p>
                )}
              </div>

              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Verification Note</span>
                <p className="text-slate-600">{selectedSourceModal.verificationNotes}</p>
              </div>

              <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Last verified against official published gazette: {selectedSourceModal.lastVerifiedDate}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                onClick={() => setSelectedSourceModal(null)}
                className="px-5 py-2.5 rounded-xl bg-[#173B57] hover:bg-[#159A9C] text-white font-bold text-xs transition"
              >
                Close Verification
              </button>
            </div>

          </div>
        </div>
      )}

      <Navbar />
    </div>
  );
};
