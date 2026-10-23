import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';
import { Navbar } from '../common/Navbar';
import { Footer } from '../common/Footer';
import { GOVERNMENT_SCHEMES } from '../../data/schemes';
import { GovernmentScheme } from '../../types';
import { getLocalizedText } from '../../utils/i18n';
import { getSchemeTitle, getSchemeDesc, GOVERNMENT_SCHEMES_TRANSLATIONS } from '../../data/translations/serviceDataTranslations';
import { 
  Search, 
  Sparkles, 
  ArrowRight, 
  ChevronRight, 
  Info
} from 'lucide-react';

export const GovernmentSchemesScreen: React.FC = () => {
  const { selectedLanguage, navigateTo, setSelectedScheme, seniorMode } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', key: 'catAll' },
    { id: 'students', key: 'catStudents' },
    { id: 'women', key: 'catWomen' },
    { id: 'farmers', key: 'catFarmers' },
    { id: 'seniors', key: 'catSeniors' },
    { id: 'healthcare', key: 'catHealthcare' },
    { id: 'housing', key: 'catHousing' },
    { id: 'employment', key: 'catEmployment' },
    { id: 'business', key: 'catBusiness' }
  ];

  const filteredSchemes = GOVERNMENT_SCHEMES.filter(scheme => {
    const localizedTitle = getSchemeTitle(scheme.id, scheme.title, selectedLanguage).toLowerCase();
    const localizedDesc = getSchemeDesc(scheme.id, scheme.shortDesc, selectedLanguage).toLowerCase();
    const q = searchQuery.toLowerCase().trim();

    const translationData = GOVERNMENT_SCHEMES_TRANSLATIONS[scheme.id];
    const keywords = translationData?.keywords || [];
    const keywordMatch = keywords.some(k => k.toLowerCase().includes(q) || q.includes(k.toLowerCase()));

    const matchesSearch = 
      !q ||
      scheme.title.toLowerCase().includes(q) ||
      scheme.hindiTitle.toLowerCase().includes(q) ||
      localizedTitle.includes(q) ||
      localizedDesc.includes(q) ||
      keywordMatch;

    const matchesCategory = activeCategory === 'all' || scheme.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleOpenScheme = (scheme: GovernmentScheme) => {
    setSelectedScheme(scheme);
    navigateTo('scheme-details');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 flex flex-col justify-between">
      <Header title={getLocalizedText('schemesHeader', selectedLanguage, 'Government Schemes')} showBack={true} />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Top Title & Demo Badge */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-[11px] font-bold text-[#159A9C] uppercase tracking-wider">
                {getLocalizedText('schemesSubHeadingTag', selectedLanguage, 'Direct Benefit Transfers & Welfare')}
              </span>
              <h2 className={`font-extrabold text-[#173B57] ${seniorMode ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-3xl'}`}>
                {getLocalizedText('schemesHeader', selectedLanguage, 'Government Schemes')}
              </h2>
            </div>

            <span className="text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300 px-2.5 py-1 rounded-full uppercase tracking-wider">
              {getLocalizedText('demoBadgeText', selectedLanguage, 'DEMO INFORMATION')}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-[#667085]">
            {getLocalizedText('schemesSub', selectedLanguage, 'Find schemes and benefits you and your family may qualify for.')}
          </p>
        </div>

        {/* PERSONALIZED DISCOVERY HERO CARD ("Find Schemes For Me") */}
        <div 
          onClick={() => navigateTo('scheme-wizard')}
          className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#173B57] to-[#159A9C] text-white shadow-md cursor-pointer hover:shadow-lg transition-all group active:scale-[0.99] space-y-2.5"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#F4A340] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>{getLocalizedText('schemeFinderTitle', selectedLanguage, 'Smart Recommendation Tool')}</span>
            </span>
            <span className="text-xs text-white/90 group-hover:translate-x-1 transition-transform flex items-center gap-1 font-semibold">
              {getLocalizedText('schemeFinderAction', selectedLanguage, 'Start Finder')} <ArrowRight className="w-4 h-4" />
            </span>
          </div>

          <h3 className="font-extrabold text-lg sm:text-xl">
            {getLocalizedText('schemeFinderMain', selectedLanguage, '🎯 Find Schemes For Me')}
          </h3>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl">
            {getLocalizedText('schemeFinderDesc', selectedLanguage, 'Answer 3 simple questions to discover welfare schemes tailored for you.')}
          </p>
        </div>

        {/* Search Input */}
        <div className="relative max-w-2xl">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={getLocalizedText('searchSchemePlaceholder', selectedLanguage, 'What benefit are you looking for? (e.g. farmer, student, pension)...')}
            className="w-full bg-white border border-slate-300 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#159A9C] shadow-2xs"
          />
        </div>

        {/* Category Scroll Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition border cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#173B57] text-white border-[#173B57] shadow-xs'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {getLocalizedText(cat.key, selectedLanguage, cat.id)}
            </button>
          ))}
        </div>

        {/* Scheme Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredSchemes.map((scheme) => (
            <div
              key={scheme.id}
              onClick={() => handleOpenScheme(scheme)}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 hover:border-[#159A9C] shadow-2xs hover:shadow-xs transition-all cursor-pointer space-y-2.5 group active:scale-[0.99]"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-0.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold bg-[#159A9C]/15 text-[#159A9C] px-2.5 py-0.5 rounded-full">
                      {scheme.categoryLabel}
                    </span>
                    <span className="text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full">
                      {scheme.badge}
                    </span>
                  </div>

                  <h3 className={`font-bold text-[#173B57] group-hover:text-[#159A9C] transition-colors mt-1 ${seniorMode ? 'text-base sm:text-lg' : 'text-sm sm:text-base'}`}>
                    {getSchemeTitle(scheme.id, scheme.title, selectedLanguage)}
                  </h3>
                </div>

                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform shrink-0" />
              </div>

              <p className="text-xs text-[#667085] leading-relaxed">
                {getSchemeDesc(scheme.id, scheme.shortDesc, selectedLanguage)}
              </p>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-[#159A9C] font-semibold">
                <span>{getLocalizedText('viewEligibilityDocs', selectedLanguage, 'View Eligibility & Documents')}</span>
                <span className="flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  {getLocalizedText('detailsLabel', selectedLanguage, 'Details')} <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}

          {filteredSchemes.length === 0 && (
            <div className="bg-white rounded-xl p-8 text-center text-slate-500 border border-slate-200 col-span-full">
              <p className="text-sm font-medium">{getLocalizedText('noSchemesFound', selectedLanguage, 'No matching scheme found.')}</p>
              <p className="text-xs text-slate-400 mt-1">{getLocalizedText('tryAnotherCategory', selectedLanguage, 'Try another category or keyword.')}</p>
            </div>
          )}
        </div>

        {/* Prototype Disclaimer Notice */}
        <div className="p-3 bg-slate-100 rounded-xl border border-slate-200 text-[11px] text-slate-500 flex items-start gap-2">
          <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <p>
            {getLocalizedText('disclaimerNoticeText', selectedLanguage, 'This prototype displays realistic demo summaries for academic simulation. Always verify latest official guidelines with respective government portals.')}
          </p>
        </div>

      </main>

      <Footer />
      <Navbar />
    </div>
  );
};
