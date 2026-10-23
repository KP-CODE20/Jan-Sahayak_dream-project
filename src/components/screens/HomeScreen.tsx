import React from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';
import { Navbar } from '../common/Navbar';
import { Footer } from '../common/Footer';
import { getLocalizedText } from '../../utils/i18n';
import { 
  FileText, 
  Mic, 
  User, 
  BookOpen, 
  ScrollText, 
  Lock, 
  ArrowRight, 
  Sparkles, 
  Volume2, 
  GraduationCap,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Camera,
  Printer,
  PenTool,
  SlidersHorizontal,
  Info
} from 'lucide-react';
import { playChime } from '../../utils/speech';

export const HomeScreen: React.FC = () => {
  const { 
    navigateTo, 
    selectedLanguage, 
    seniorMode, 
    readAloud,
    setPresentationModalOpen,
    userProfile,
    isDataDeleted 
  } = useApp();

  const handleFillBlankForm = () => {
    playChime('click');
    navigateTo('blank-upload');
  };

  const handleVoiceAssistant = () => {
    playChime('mic-start');
    navigateTo('voice');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 flex flex-col justify-between">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Welcome Greeting & Purpose */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#159A9C] tracking-wide uppercase flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#159A9C] animate-pulse"></span>
              {getLocalizedText('greeting', selectedLanguage, '👋 Namaste!')}
            </span>

            <button
              onClick={() => readAloud(
                getLocalizedText('speechWelcome', selectedLanguage, 'Namaste! Take a photo of any blank form and let Jan Sahayak fill it using your saved profile information.')
              )}
              className="p-2 rounded-full bg-slate-50 text-slate-500 hover:text-[#159A9C] border border-slate-200 transition cursor-pointer"
              title="Read Aloud"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          <h2 className={`font-extrabold text-[#173B57] leading-tight ${seniorMode ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'}`}>
            {getLocalizedText('whatCanHelp', selectedLanguage, 'What can Jan Sahayak help you with?')}
          </h2>

          <p className="text-xs sm:text-sm text-[#475569] font-medium leading-relaxed max-w-3xl">
            {getLocalizedText('quotePurpose', selectedLanguage, '«“Take a photo of any blank form. Jan Sahayak fills it for you using your securely saved profile information.”»')}
          </p>

          {/* User Profile Quick Status Badge */}
          <div className="pt-2 flex items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium">{getLocalizedText('activeProfile', selectedLanguage, 'Active Profile')}:</span>
            <span className="font-bold text-[#173B57] flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-[#159A9C]" />
              {isDataDeleted ? getLocalizedText('userDataCleared', selectedLanguage, 'User Data Cleared') : (userProfile.name || 'Demo User')}
            </span>
            <button
              onClick={() => navigateTo('profile')}
              className="text-[#159A9C] hover:underline font-semibold ml-2 cursor-pointer"
            >
              {getLocalizedText('viewProfile', selectedLanguage, 'View Profile →')}
            </button>
          </div>
        </div>

        {/* PRIMARY ACTION HERO CARD: 📄 FILL A BLANK FORM */}
        <div 
          onClick={handleFillBlankForm}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#173B57] via-[#173B57] to-[#159A9C] text-white p-6 sm:p-8 shadow-xl border border-white/10 cursor-pointer group active:scale-[0.99] transition-all"
        >
          <div className="absolute -right-8 -bottom-8 w-64 h-64 rounded-full bg-white/5 blur-2xl group-hover:scale-110 transition-transform"></div>
          
          <div className="flex items-center justify-between mb-3">
            <span className="inline-flex items-center gap-1.5 bg-[#F4A340] text-[#173B57] text-xs font-extrabold px-3 py-1 rounded-full shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{getLocalizedText('primaryFeatureBadge', selectedLanguage, 'PRIMARY FEATURE • BLANK FORM AUTO-FILL')}</span>
            </span>

            <span className="text-xs text-white/80 font-mono hidden sm:inline-block">
              {getLocalizedText('handwritingGeneratorBadge', selectedLanguage, 'Handwriting-Style Print Generator')}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white/10 backdrop-blur-md text-[#F4A340] flex items-center justify-center shrink-0 border border-white/20 shadow-lg group-hover:scale-105 transition-transform">
              <FileText className="w-10 h-10 sm:w-12 sm:h-12" />
            </div>

            <div className="space-y-2 text-center sm:text-left flex-1">
              <h3 className={`font-extrabold tracking-tight text-white ${seniorMode ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'}`}>
                {getLocalizedText('heroCardTitle', selectedLanguage, '📄 Fill a Blank Form')}
              </h3>
              
              <p className="text-xs sm:text-sm text-emerald-50 font-medium max-w-2xl leading-relaxed">
                {getLocalizedText('heroCardQuote', selectedLanguage, '«“Take a photo of any blank form and let Jan Sahayak fill it using your saved profile information.”»')}
              </p>

              {/* End-to-End Workflow Flow Ribbon */}
              <div className="pt-3 flex flex-wrap items-center justify-center sm:justify-start gap-1.5 text-[10px] sm:text-[11px] text-white/90">
                <span className="bg-white/15 px-2.5 py-0.5 rounded-md font-medium">{getLocalizedText('step1Workflow', selectedLanguage, '1. Saved Profile')}</span>
                <span className="text-slate-400">→</span>
                <span className="bg-white/15 px-2.5 py-0.5 rounded-md font-medium">{getLocalizedText('step2Workflow', selectedLanguage, '2. Upload Blank Form')}</span>
                <span className="text-slate-400">→</span>
                <span className="bg-white/15 px-2.5 py-0.5 rounded-md font-medium">{getLocalizedText('step3Workflow', selectedLanguage, '3. AI Field Match')}</span>
                <span className="text-slate-400">→</span>
                <span className="bg-white/15 px-2.5 py-0.5 rounded-md font-medium">{getLocalizedText('step4Workflow', selectedLanguage, '4. Handwriting Render')}</span>
                <span className="text-slate-400">→</span>
                <span className="bg-[#F4A340] text-[#173B57] font-bold px-2.5 py-0.5 rounded-md font-medium">{getLocalizedText('step5Workflow', selectedLanguage, '5. Print & Sign Manually')}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/15 flex items-center justify-between text-xs sm:text-sm text-white/90">
            <span className="font-semibold text-[#F4A340] flex items-center gap-1.5">
              <Camera className="w-4 h-4" /> {getLocalizedText('worksWithPaper', selectedLanguage, 'Works with many structured paper forms')}
            </span>
            <span className="flex items-center gap-1.5 group-hover:translate-x-1 transition-transform font-bold text-white">
              {getLocalizedText('startBlankFormFill', selectedLanguage, 'Start Blank Form Fill')} <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>

        {/* SECONDARY ACTION CARDS (As Requested in Spec #23) */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-[#173B57] uppercase tracking-wider">
              {getLocalizedText('additionalAssistantFeatures', selectedLanguage, 'Additional Assistant Features')}
            </h3>
            <span className="text-xs text-[#667085]">{getLocalizedText('selectServiceBelow', selectedLanguage, 'Select any service below')}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            
            {/* 1. 🎙️ Ask Jan Sahayak */}
            <button
              onClick={handleVoiceAssistant}
              className="p-5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-left transition hover:border-[#159A9C] shadow-2xs group flex items-start gap-4 active:scale-[0.98] cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-[#F4A340]/15 text-[#B45309] flex items-center justify-center shrink-0 group-hover:bg-[#F4A340] group-hover:text-[#173B57] transition-colors">
                <Mic className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-[#173B57] text-sm sm:text-base group-hover:text-[#159A9C] transition-colors">
                    {getLocalizedText('cardAskTitle', selectedLanguage, '🎙️ Ask Jan Sahayak')}
                  </h4>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <p className="text-xs text-[#667085] mt-1 line-clamp-2">
                  {getLocalizedText('cardAskDesc', selectedLanguage, 'Ask questions naturally in your language with voice read-aloud.')}
                </p>
              </div>
            </button>

            {/* 2. 👤 My Profile */}
            <button
              onClick={() => navigateTo('profile')}
              className="p-5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-left transition hover:border-[#159A9C] shadow-2xs group flex items-start gap-4 active:scale-[0.98] cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center shrink-0 group-hover:bg-sky-700 group-hover:text-white transition-colors">
                <User className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-[#173B57] text-sm sm:text-base group-hover:text-[#159A9C] transition-colors">
                    {getLocalizedText('cardProfileTitle', selectedLanguage, '👤 My Profile')}
                  </h4>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <p className="text-xs text-[#667085] mt-1 line-clamp-2">
                  {getLocalizedText('cardProfileDesc', selectedLanguage, 'Manage your saved information across 4 structured categories.')}
                </p>
              </div>
            </button>

            {/* 3. 📚 Banking Guide */}
            <button
              onClick={() => navigateTo('services')}
              className="p-5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-left transition hover:border-[#159A9C] shadow-2xs group flex items-start gap-4 active:scale-[0.98] cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-100 text-[#173B57] flex items-center justify-center shrink-0 group-hover:bg-[#173B57] group-hover:text-white transition-colors">
                <BookOpen className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-[#173B57] text-sm sm:text-base group-hover:text-[#159A9C] transition-colors">
                    {getLocalizedText('cardBankingGuideTitle', selectedLanguage, '📚 Banking Guide')}
                  </h4>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <p className="text-xs text-[#667085] mt-1 line-clamp-2">
                  {getLocalizedText('cardBankingGuideDesc', selectedLanguage, 'Understand banking procedures, documents required, and branch counters.')}
                </p>
              </div>
            </button>

            {/* 4. 🏛️ Government Information */}
            <button
              onClick={() => navigateTo('schemes')}
              className="p-5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-left transition hover:border-[#159A9C] shadow-2xs group flex items-start gap-4 active:scale-[0.98] cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0 group-hover:bg-purple-700 group-hover:text-white transition-colors">
                <ScrollText className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-[#173B57] text-sm sm:text-base group-hover:text-[#159A9C] transition-colors">
                    {getLocalizedText('cardGovtTitle', selectedLanguage, '🏛️ Government Information')}
                  </h4>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <p className="text-xs text-[#667085] mt-1 line-clamp-2">
                  {getLocalizedText('cardGovtDesc', selectedLanguage, 'Explore verified government welfare schemes and citizen entitlements.')}
                </p>
              </div>
            </button>

            {/* 5. 🔐 Privacy & Data */}
            <button
              onClick={() => navigateTo('privacy')}
              className="p-5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-left transition hover:border-[#159A9C] shadow-2xs group flex items-start gap-4 active:scale-[0.98] cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <Lock className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-[#173B57] text-sm sm:text-base group-hover:text-[#159A9C] transition-colors">
                    {getLocalizedText('cardPrivacyTitle', selectedLanguage, '🔐 Privacy & Data')}
                  </h4>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <p className="text-xs text-[#667085] mt-1 line-clamp-2">
                  {getLocalizedText('cardPrivacyDesc', selectedLanguage, 'Your data stays private. View, mask, edit, or delete with 1-click.')}
                </p>
              </div>
            </button>

            {/* 6. 🔍 Information & Sources */}
            <button
              onClick={() => navigateTo('sources')}
              className="p-5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-left transition hover:border-[#159A9C] shadow-2xs group flex items-start gap-4 active:scale-[0.98] cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0 group-hover:bg-indigo-700 group-hover:text-white transition-colors">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-[#173B57] text-sm sm:text-base group-hover:text-[#159A9C] transition-colors">
                    {getLocalizedText('cardSourcesTitle', selectedLanguage, 'Official Regulatory Sources')}
                  </h4>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <p className="text-xs text-[#667085] mt-1 line-clamp-2">
                  {getLocalizedText('cardSourcesDesc', selectedLanguage, 'RBI master circulars, banking charters & verified official sources.')}
                </p>
              </div>
            </button>

          </div>
        </div>

        {/* DESIGN THINKING PROBLEM & SOLUTION STATEMENT */}
        <div className="rounded-2xl bg-gradient-to-r from-[#173B57]/5 via-[#159A9C]/10 to-[#F4A340]/10 p-5 sm:p-6 border border-[#159A9C]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-sm font-bold text-[#173B57]">
              <GraduationCap className="w-5 h-5 text-[#F4A340]" />
              <span>{getLocalizedText('dtBannerTitle', selectedLanguage, 'Design Thinking Core Philosophy: AI Does Repetitive Work, User Remains In Control')}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {getLocalizedText('dtBannerDesc', selectedLanguage, '«Jan Sahayak allows users to photograph any blank physical form and automatically populate it using their securely saved profile in a natural handwriting-style, ready to review, manually sign, and submit.»')}
            </p>
          </div>

          <button
            onClick={() => setPresentationModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-[#173B57] hover:bg-[#159A9C] text-white text-xs sm:text-sm font-bold shrink-0 transition flex items-center gap-2 shadow-xs cursor-pointer active:scale-95"
          >
            <span>{getLocalizedText('openDeckBtn', selectedLanguage, 'Open Case Study Deck')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </main>

      <Footer />
      <Navbar />
    </div>
  );
};

