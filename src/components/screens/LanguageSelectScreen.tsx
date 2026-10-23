import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LANGUAGES } from '../../data/languages';
import { Header } from '../common/Header';
import { getLocalizedText } from '../../utils/i18n';
import { 
  Languages, 
  Check, 
  ArrowRight, 
  Volume2, 
  Sparkles,
  Search
} from 'lucide-react';
import { speakText } from '../../utils/speech';

export const LanguageSelectScreen: React.FC = () => {
  const { selectedLanguage, setSelectedLanguage, navigateTo } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const handleLanguagePick = (langId: string, greeting: string, voiceCode: string) => {
    setSelectedLanguage(langId);
    speakText(greeting, voiceCode);
  };

  const handleProceed = () => {
    navigateTo('home');
  };

  const filteredLanguages = LANGUAGES.filter(l => 
    l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.nativeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between">
      <Header title={getLocalizedText('chooseLanguageHeading', selectedLanguage, 'Choose Language')} showBack={true} showLanguagePill={false} />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Title and prompt */}
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#159A9C]/10 text-[#159A9C] text-xs font-semibold">
            <Languages className="w-3.5 h-3.5" />
            <span>{getLocalizedText('multilingualInclusion', selectedLanguage, 'Multilingual Inclusion (12 Indian Languages)')}</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-extrabold text-[#173B57]">
            {getLocalizedText('chooseLanguageHeading', selectedLanguage, 'Which language do you prefer?')}
          </h2>
          <p className="text-sm sm:text-base text-[#667085]">
            {getLocalizedText('chooseLanguageSub', selectedLanguage, 'Select your mother tongue for effortless banking understanding.')}
          </p>
        </div>

        {/* Search Language Bar */}
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search language / ভাষা খুঁজুন / भाषा खोजें..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#159A9C]"
          />
        </div>

        {/* 12 Language Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
          {filteredLanguages.map((lang) => {
            const isSelected = selectedLanguage === lang.id;
            const isDefaultHindi = lang.id === 'hi';

            return (
              <button
                key={lang.id}
                onClick={() => handleLanguagePick(lang.id, lang.sampleGreeting, lang.voiceCode)}
                className={`relative p-3.5 sm:p-4 rounded-xl text-left transition-all border flex flex-col justify-between h-28 group active:scale-[0.98] ${
                  isSelected
                    ? 'bg-[#173B57] text-white border-[#173B57] shadow-md ring-2 ring-[#159A9C]'
                    : 'bg-white text-[#1F2933] border-slate-200 hover:border-[#159A9C]/60 hover:shadow-xs'
                }`}
              >
                {/* Top row: Flag + Check or speaker */}
                <div className="flex items-center justify-between w-full">
                  <span className="text-2xl">{lang.flag}</span>
                  {isSelected ? (
                    <span className="w-5 h-5 rounded-full bg-[#159A9C] flex items-center justify-center text-white">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </span>
                  ) : (
                    <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-[#159A9C] transition-colors" />
                  )}
                </div>

                {/* Bottom row: Native Name + English label */}
                <div>
                  <div className={`text-base sm:text-lg font-bold leading-tight ${isSelected ? 'text-white' : 'text-[#173B57]'}`}>
                    {lang.nativeName}
                  </div>
                  <div className={`text-xs ${isSelected ? 'text-white/80' : 'text-slate-500'}`}>
                    {lang.name}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Informative Note */}
        <div className="bg-white rounded-xl p-3.5 border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5 shadow-2xs">
          <Sparkles className="w-4 h-4 text-[#F4A340] shrink-0 mt-0.5" />
          <p>
            {getLocalizedText('changeAnytimeNote', selectedLanguage, 'You can change your language anytime later from Settings or using the language button in the top header.')}
          </p>
        </div>

      </main>

      {/* Floating Continue Button */}
      <div className="sticky bottom-0 bg-white/95 backdrop-blur-md border-t border-slate-200 p-4 max-w-2xl mx-auto w-full shadow-lg">
        <button
          onClick={handleProceed}
          className="w-full py-3.5 px-6 rounded-xl bg-[#173B57] hover:bg-[#159A9C] text-white font-bold text-base shadow-md transition-all flex items-center justify-center gap-2 group active:scale-[0.98]"
        >
          <span>{getLocalizedText('btnContinue', selectedLanguage, 'Continue')}</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

    </div>
  );
};
