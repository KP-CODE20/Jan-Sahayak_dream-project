import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';
import { Navbar } from '../common/Navbar';
import { Footer } from '../common/Footer';
import { BANKING_SERVICES } from '../../data/bankingServices';
import { BankingService } from '../../types';
import { getLocalizedText } from '../../utils/i18n';
import { getServiceTitle, getServiceDesc, BANKING_SERVICES_TRANSLATIONS } from '../../data/translations/serviceDataTranslations';
import { 
  Search, 
  Landmark, 
  Smartphone, 
  UserCheck, 
  CreditCard, 
  ShieldCheck, 
  BookOpen, 
  Layers, 
  MapPin, 
  TrendingUp, 
  XCircle,
  ChevronRight,
  Sparkles,
  Filter
} from 'lucide-react';

const ICON_MAP: Record<string, React.ReactNode> = {
  'Landmark': <Landmark className="w-5 h-5" />,
  'Smartphone': <Smartphone className="w-5 h-5" />,
  'UserCheck': <UserCheck className="w-5 h-5" />,
  'CreditCard': <CreditCard className="w-5 h-5" />,
  'ShieldCheck': <ShieldCheck className="w-5 h-5" />,
  'BookOpen': <BookOpen className="w-5 h-5" />,
  'Layers': <Layers className="w-5 h-5" />,
  'MapPin': <MapPin className="w-5 h-5" />,
  'TrendingUp': <TrendingUp className="w-5 h-5" />,
  'XCircle': <XCircle className="w-5 h-5" />
};

export const BankingServicesScreen: React.FC = () => {
  const { selectedLanguage, navigateTo, setSelectedService, seniorMode } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', key: 'catAll' },
    { id: 'account', key: 'catAccount' },
    { id: 'updates', key: 'catUpdates' },
    { id: 'cards', key: 'catCards' },
    { id: 'requests', key: 'catRequests' },
    { id: 'loans', key: 'catLoans' }
  ];

  const filteredServices = BANKING_SERVICES.filter(service => {
    const localizedTitle = getServiceTitle(service.id, service.title, selectedLanguage).toLowerCase();
    const localizedDesc = getServiceDesc(service.id, service.description, selectedLanguage).toLowerCase();
    const q = searchQuery.toLowerCase().trim();

    const translationData = BANKING_SERVICES_TRANSLATIONS[service.id];
    const keywords = translationData?.keywords || [];
    const keywordMatch = keywords.some(k => k.toLowerCase().includes(q) || q.includes(k.toLowerCase()));

    const matchesSearch = 
      !q ||
      service.title.toLowerCase().includes(q) ||
      service.hindiTitle.toLowerCase().includes(q) ||
      localizedTitle.includes(q) ||
      localizedDesc.includes(q) ||
      keywordMatch;

    const matchesCategory = activeCategory === 'all' || service.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSelectService = (service: BankingService) => {
    setSelectedService(service);
    navigateTo('service-details');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 flex flex-col justify-between">
      <Header title={getLocalizedText('bankingGuideTitle', selectedLanguage, 'Banking Services')} showBack={true} />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Title and Search */}
        <div className="space-y-3">
          <div>
            <h2 className="text-xl sm:text-3xl font-extrabold text-[#173B57]">
              {getLocalizedText('bankingServicesHeader', selectedLanguage, 'Banking Services')}
            </h2>
            <p className="text-xs sm:text-sm text-[#667085] mt-1">
              {getLocalizedText('bankingServicesSub', selectedLanguage, 'Select a banking service to view requirements, steps, counter locations, and forms')}
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={getLocalizedText('searchServicePlaceholder', selectedLanguage, 'What do you want to do? (e.g. open account, mobile number)...')}
              className="w-full bg-white border border-slate-300 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#159A9C] shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar pt-1">
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
        </div>

        {/* Services List in 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              onClick={() => handleSelectService(service)}
              className="bg-white rounded-xl p-4 border border-slate-200 hover:border-[#159A9C] shadow-2xs hover:shadow-xs transition-all cursor-pointer flex items-start gap-3.5 group active:scale-[0.99]"
            >
              <div className="w-10 h-10 rounded-xl bg-[#173B57]/10 text-[#173B57] flex items-center justify-center shrink-0 group-hover:bg-[#159A9C] group-hover:text-white transition-colors">
                {ICON_MAP[service.icon] || <Landmark className="w-5 h-5" />}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className={`font-bold text-[#173B57] group-hover:text-[#159A9C] transition-colors truncate ${seniorMode ? 'text-base sm:text-lg' : 'text-sm sm:text-base'}`}>
                    {getServiceTitle(service.id, service.title, selectedLanguage)}
                  </h3>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform shrink-0 ml-1" />
                </div>

                <p className="text-xs text-[#667085] mt-1 line-clamp-2">
                  {getServiceDesc(service.id, service.description, selectedLanguage)}
                </p>

                <div className="mt-2.5 flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                  <span className="bg-slate-100 px-2 py-0.5 rounded-md font-medium text-slate-700">
                    📍 {service.branchCounter}
                  </span>
                  <span className="bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-md font-medium">
                    ⏱ {service.approxTime}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {filteredServices.length === 0 && (
            <div className="bg-white rounded-xl p-8 text-center text-slate-500 border border-slate-200 col-span-full">
              <p className="text-sm font-medium">{getLocalizedText('noServicesFound', selectedLanguage, 'No matching banking service found.')}</p>
              <p className="text-xs text-slate-400 mt-1">{getLocalizedText('trySearchSimpler', selectedLanguage, 'Try searching with a simpler keyword or ask with voice.')}</p>
            </div>
          )}
        </div>

      </main>

      <Footer />
      <Navbar />
    </div>
  );
};
