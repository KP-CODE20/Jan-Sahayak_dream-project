import React from 'react';
import { useApp } from '../../context/AppContext';
import { LANGUAGES } from '../../data/languages';
import { getLocalizedText } from '../../utils/i18n';
import { 
  ArrowLeft, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  GraduationCap, 
  Sliders, 
  Eye,
  Languages,
  Database
} from 'lucide-react';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  showLanguagePill?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ title, showBack = false, showLanguagePill = true }) => {
  const { 
    currentScreen, 
    goBack, 
    selectedLanguage, 
    navigateTo, 
    seniorMode, 
    setSeniorMode, 
    voiceAudioEnabled, 
    setVoiceAudioEnabled,
    setPresentationModalOpen,
    setSupabaseModalOpen
  } = useApp();

  const currentLangObj = LANGUAGES.find(l => l.id === selectedLanguage) || LANGUAGES[0];

  return (
    <header className="sticky top-0 z-30 bg-[#173B57] text-white shadow-md border-b border-[#159A9C]/20 transition-all no-print">
      {/* Senior Mode Indicator Bar if enabled */}
      {seniorMode && (
        <div className="bg-[#F4A340] text-[#173B57] text-xs font-bold px-3 py-1 text-center tracking-wide flex items-center justify-center gap-1.5 shadow-inner">
          <Eye className="w-3.5 h-3.5" />
          <span>{getLocalizedText('seniorModeActive', selectedLanguage, 'Senior Citizen High Contrast Mode Active')}</span>
        </div>
      )}

      <div className="px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-2 max-w-6xl mx-auto w-full">
        {/* Left Side: Back or Brand Logo */}
        <div className="flex items-center gap-2.5">
          {showBack && currentScreen !== 'home' && currentScreen !== 'welcome' ? (
            <button
              onClick={goBack}
              aria-label="Go Back"
              className="p-2 -ml-1 rounded-full hover:bg-white/15 active:bg-white/25 transition-colors focus:outline-none focus:ring-2 focus:ring-[#F4A340]"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
          ) : (
            <button
              onClick={() => navigateTo('home')}
              className="flex items-center gap-2 group text-left"
            >
              <div className="w-8 h-8 rounded-lg bg-[#159A9C] flex items-center justify-center text-white font-bold shadow-sm group-hover:bg-[#159A9C]/90 transition">
                <span className="text-base tracking-tight font-extrabold">জন</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-tight text-white flex items-center gap-1 leading-none">
                  {getLocalizedText('appName', selectedLanguage, 'JAN SAHAYAK')}
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#F4A340]"></span>
                </span>
                <span className="text-[10px] text-white/70 tracking-wider">
                  {currentLangObj.nativeName}
                </span>
              </div>
            </button>
          )}

          {title && (
            <h1 className="text-sm md:text-base font-semibold truncate max-w-[140px] sm:max-w-[200px] text-white">
              {title}
            </h1>
          )}
        </div>

        {/* Right Side: Quick Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Design Thinking Project Presentation Button */}
          <button
            onClick={() => setPresentationModalOpen(true)}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-full bg-[#159A9C]/30 text-emerald-200 border border-[#159A9C]/40 hover:bg-[#159A9C]/50 transition cursor-pointer"
            title="Design Thinking College Project Overview"
          >
            <GraduationCap className="w-3.5 h-3.5 text-[#F4A340]" />
            <span className="hidden sm:inline">{getLocalizedText('designThinkingDeck', selectedLanguage, 'Design Thinking')}</span>
            <span className="sm:hidden">DT</span>
          </button>

          {/* Voice Audio Readout Toggle */}
          <button
            onClick={() => setVoiceAudioEnabled(!voiceAudioEnabled)}
            className={`p-1.5 rounded-full transition ${
              voiceAudioEnabled 
                ? 'bg-white/15 text-[#F4A340] hover:bg-white/25' 
                : 'text-white/40 hover:bg-white/10'
            }`}
            title={voiceAudioEnabled ? 'Voice Readout Enabled' : 'Voice Readout Muted'}
            aria-label="Toggle Voice Audio"
          >
            {voiceAudioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Language Selector Pill */}
          {showLanguagePill && (
            <button
              onClick={() => navigateTo('language')}
              className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/15 hover:bg-white/25 text-xs font-medium transition text-white border border-white/10"
              title="Change Language"
            >
              <Languages className="w-3.5 h-3.5 text-[#F4A340]" />
              <span className="font-semibold">{currentLangObj.nativeName}</span>
            </button>
          )}

          {/* Accessibility / Senior Mode Quick Switch */}
          <button
            onClick={() => setSeniorMode(!seniorMode)}
            className={`p-1.5 rounded-full transition ${
              seniorMode ? 'bg-[#F4A340] text-[#173B57] font-bold shadow' : 'text-white/70 hover:bg-white/15'
            }`}
            title={seniorMode ? 'Disable Senior Mode' : 'Enable Senior Citizen High Contrast'}
            aria-label="Toggle Senior Citizen Mode"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
