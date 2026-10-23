import React from 'react';
import { useApp } from '../../context/AppContext';
import { AppScreen } from '../../types';
import { getLocalizedText } from '../../utils/i18n';
import { 
  Home, 
  Landmark, 
  Mic, 
  ScrollText, 
  User,
  Sparkles
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentScreen, navigateTo, seniorMode, selectedLanguage } = useApp();

  const isTabActive = (screen: AppScreen) => {
    if (screen === 'home' && currentScreen === 'home') return true;
    if (screen === 'services' && (currentScreen === 'services' || currentScreen === 'service-details' || currentScreen === 'document-checker' || currentScreen === 'visit-planner')) return true;
    if (screen === 'voice' && currentScreen === 'voice') return true;
    if (screen === 'schemes' && (currentScreen === 'schemes' || currentScreen === 'scheme-details' || currentScreen === 'scheme-wizard')) return true;
    if (screen === 'profile' && (currentScreen === 'profile' || currentScreen === 'settings')) return true;
    return false;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-lg no-print">
      <div className="max-w-4xl lg:max-w-5xl mx-auto px-4 sm:px-8 py-2 flex items-center justify-around">
        {/* Tab 1: Home */}
        <button
          onClick={() => navigateTo('home')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all ${
            isTabActive('home')
              ? 'text-[#173B57] font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Home className={`w-5 h-5 ${isTabActive('home') ? 'stroke-[2.5px] text-[#173B57]' : 'stroke-2'}`} />
          <span className={`text-[11px] mt-0.5 ${seniorMode ? 'text-xs font-bold' : ''}`}>
            {getLocalizedText('navHome', selectedLanguage, 'Home')}
          </span>
          {isTabActive('home') && <span className="w-1.5 h-1 bg-[#159A9C] rounded-full mt-0.5"></span>}
        </button>

        {/* Tab 2: Banking Services */}
        <button
          onClick={() => navigateTo('services')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all ${
            isTabActive('services')
              ? 'text-[#173B57] font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Landmark className={`w-5 h-5 ${isTabActive('services') ? 'stroke-[2.5px] text-[#173B57]' : 'stroke-2'}`} />
          <span className={`text-[11px] mt-0.5 ${seniorMode ? 'text-xs font-bold' : ''}`}>
            {getLocalizedText('navServices', selectedLanguage, 'Services')}
          </span>
          {isTabActive('services') && <span className="w-1.5 h-1 bg-[#159A9C] rounded-full mt-0.5"></span>}
        </button>

        {/* Tab 3: HERO Mic Assistant */}
        <button
          onClick={() => navigateTo('voice')}
          className="relative -top-3.5 flex flex-col items-center group focus:outline-none"
        >
          <div className="relative">
            {/* Pulsing ring */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#159A9C] to-[#F4A340] opacity-75 blur-xs group-hover:opacity-100 transition animate-pulse"></div>
            <div className="relative w-13 h-13 rounded-full bg-gradient-to-br from-[#173B57] to-[#159A9C] text-white flex items-center justify-center shadow-lg border-2 border-white group-active:scale-95 transition-transform">
              <Mic className="w-6 h-6 text-white" />
            </div>
          </div>
          <span className={`text-[11px] font-bold mt-1 text-[#173B57] ${seniorMode ? 'text-xs' : ''}`}>
            {getLocalizedText('navAssistant', selectedLanguage, 'Assistant')}
          </span>
        </button>

        {/* Tab 4: Government Schemes */}
        <button
          onClick={() => navigateTo('schemes')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all ${
            isTabActive('schemes')
              ? 'text-[#173B57] font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <ScrollText className={`w-5 h-5 ${isTabActive('schemes') ? 'stroke-[2.5px] text-[#173B57]' : 'stroke-2'}`} />
          <span className={`text-[11px] mt-0.5 ${seniorMode ? 'text-xs font-bold' : ''}`}>
            {getLocalizedText('navSchemes', selectedLanguage, 'Schemes')}
          </span>
          {isTabActive('schemes') && <span className="w-1.5 h-1 bg-[#159A9C] rounded-full mt-0.5"></span>}
        </button>

        {/* Tab 5: Profile */}
        <button
          onClick={() => navigateTo('profile')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all ${
            isTabActive('profile')
              ? 'text-[#173B57] font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <User className={`w-5 h-5 ${isTabActive('profile') ? 'stroke-[2.5px] text-[#173B57]' : 'stroke-2'}`} />
          <span className={`text-[11px] mt-0.5 ${seniorMode ? 'text-xs font-bold' : ''}`}>
            {getLocalizedText('navProfile', selectedLanguage, 'Profile')}
          </span>
          {isTabActive('profile') && <span className="w-1.5 h-1 bg-[#159A9C] rounded-full mt-0.5"></span>}
        </button>
      </div>
    </nav>
  );
};
