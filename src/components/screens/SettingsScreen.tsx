import React from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';
import { Navbar } from '../common/Navbar';
import { Footer } from '../common/Footer';
import { LANGUAGES } from '../../data/languages';
import { 
  Settings, 
  Eye, 
  Volume2, 
  Globe, 
  WifiOff, 
  Presentation, 
  RotateCcw, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles,
  Info,
  Database,
  ExternalLink
} from 'lucide-react';
import { playChime } from '../../utils/speech';
import { SUPABASE_PROJECT_ID } from '../../services/supabaseClient';

export const SettingsScreen: React.FC = () => {
  const { 
    seniorMode, 
    setSeniorMode, 
    voiceAudioEnabled, 
    setVoiceAudioEnabled, 
    selectedLanguage, 
    setSelectedLanguage, 
    setPresentationModalOpen,
    setSupabaseModalOpen,
    markAllDocsReady,
    navigateTo 
  } = useApp();

  const isHindi = selectedLanguage === 'hi';

  const handleReset = () => {
    markAllDocsReady();
    playChime('click');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 flex flex-col justify-between">
      <Header title="Settings & Accessibility" showBack={true} />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Title */}
        <div className="space-y-1">
          <h2 className={`font-extrabold text-[#173B57] ${seniorMode ? 'text-2xl' : 'text-xl sm:text-2xl'}`}>
            {isHindi ? 'सेटिंग्स एवं सुगमता (Settings)' : 'Settings & Accessibility'}
          </h2>
          <p className="text-xs text-[#667085]">
            {isHindi ? 'अपनी पसंद के अनुसार भाषा और आसान मोड चुनें' : 'Customize language, audio assistance, and accessibility features'}
          </p>
        </div>

        {/* Accessibility Toggles Card */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-4">
          <h3 className="text-xs font-bold text-[#173B57] uppercase tracking-wider">
            Accessibility & Assistance
          </h3>

          {/* 1. Senior Citizen Mode Toggle */}
          <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <div className="space-y-0.5 flex-1">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-[#159A9C]" />
                <span className="font-bold text-xs sm:text-sm text-[#173B57]">
                  Senior Citizen Friendly Mode
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Enlarges text size and maximizes high contrast for comfortable reading.
              </p>
            </div>

            <button
              onClick={() => setSeniorMode(!seniorMode)}
              className={`w-12 h-6 rounded-full transition-colors relative flex items-center p-0.5 ${
                seniorMode ? 'bg-[#159A9C]' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                  seniorMode ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* 2. Audio Voice Output / TTS Assistance */}
          <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <div className="space-y-0.5 flex-1">
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-[#F4A340]" />
                <span className="font-bold text-xs sm:text-sm text-[#173B57]">
                  Voice Assistance Audio (TTS)
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Plays spoken explanations in your selected regional Indian language.
              </p>
            </div>

            <button
              onClick={() => setVoiceAudioEnabled(!voiceAudioEnabled)}
              className={`w-12 h-6 rounded-full transition-colors relative flex items-center p-0.5 ${
                voiceAudioEnabled ? 'bg-[#159A9C]' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                  voiceAudioEnabled ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

        </div>

        {/* Language Selection Grid */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-[#173B57] uppercase tracking-wider flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-[#159A9C]" />
              <span>Preferred Language (भाषा)</span>
            </h3>
            <span className="text-[11px] text-slate-400">Indian Languages</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {LANGUAGES.slice(0, 8).map((lang) => (
              <button
                key={lang.id}
                onClick={() => setSelectedLanguage(lang.id)}
                className={`p-3 rounded-xl border text-left transition ${
                  selectedLanguage === lang.id
                    ? 'border-[#159A9C] bg-[#159A9C]/10 text-[#173B57] font-bold ring-1 ring-[#159A9C]'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700 font-medium'
                }`}
              >
                <div className="text-sm">{lang.nativeName}</div>
                <div className="text-[10px] text-slate-500">{lang.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Supabase Cloud Backend Database Card */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-[#173B57] uppercase tracking-wider flex items-center gap-1.5">
              <Database className="w-4 h-4 text-[#159A9C]" />
              <span>Supabase Cloud Backend</span>
            </h3>
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Connected
            </span>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">Project ID:</span>
              <span className="font-mono font-bold text-slate-800">{SUPABASE_PROJECT_ID}</span>
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Every form submission, voice interaction, user profile update, and bank visit plan is automatically synced to your Supabase PostgreSQL database tables.
            </p>
          </div>

          <button
            onClick={() => setSupabaseModalOpen(true)}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-[#159A9C]/10 text-[#173B57] hover:text-[#159A9C] font-bold text-xs border border-slate-200 hover:border-[#159A9C]/30 transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <Database className="w-3.5 h-3.5" />
            <span>Manage Supabase Backend & View Tables (7)</span>
          </button>
        </div>

        {/* Offline & System Readiness Card */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3">
          <h3 className="text-xs font-bold text-[#173B57] uppercase tracking-wider flex items-center gap-1.5">
            <WifiOff className="w-4 h-4 text-emerald-600" />
            <span>Offline & Prototype Status</span>
          </h3>

          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-950 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#2E8B57] shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-bold">Offline Client-Side Sandbox</span>
              <p className="text-emerald-800 text-[11px]">
                All voice simulations, forms, and service checklists work 100% locally with zero backend dependencies.
              </p>
            </div>
          </div>
        </div>

        {/* Actions: Presentation Deck & Reset Sandbox */}
        <div className="space-y-2 pt-1">
          <button
            onClick={() => setPresentationModalOpen(true)}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#173B57] to-[#159A9C] text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2 group active:scale-[0.98]"
          >
            <Presentation className="w-4 h-4 text-[#F4A340]" />
            <span>Open College Design Thinking Slides</span>
          </button>

          <button
            onClick={handleReset}
            className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-semibold text-xs transition flex items-center justify-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span>Reset Demo Sandbox State</span>
          </button>
        </div>

      </main>

      <Footer />
      <Navbar />
    </div>
  );
};
