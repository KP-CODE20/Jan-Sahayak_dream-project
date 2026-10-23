import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  ArrowRight, 
  Mic, 
  ShieldCheck, 
  Languages, 
  Scan, 
  CheckCircle2, 
  PlayCircle,
  GraduationCap
} from 'lucide-react';

export const WelcomeScreen: React.FC = () => {
  const { navigateTo, setSelectedLanguage, setPresentationModalOpen } = useApp();

  const handleExploreDemo = () => {
    setSelectedLanguage('hi');
    navigateTo('home');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col justify-between p-4 sm:p-8">
      
      {/* Top Bar / Prototype Banner */}
      <div className="max-w-4xl mx-auto w-full flex items-center justify-between pt-2">
        <div className="flex items-center gap-2 bg-[#173B57]/10 px-3.5 py-1.5 rounded-full border border-[#173B57]/20">
          <GraduationCap className="w-4 h-4 text-[#159A9C]" />
          <span className="text-xs font-bold tracking-wide text-[#173B57]">Design Thinking Prototype</span>
        </div>

        <button
          onClick={() => setPresentationModalOpen(true)}
          className="text-xs font-semibold text-[#159A9C] hover:text-[#173B57] underline underline-offset-2 flex items-center gap-1 cursor-pointer"
        >
          Why Jan Sahayak?
        </button>
      </div>

      {/* Hero Illustration & Branding */}
      <div className="my-auto py-8 max-w-2xl mx-auto text-center space-y-6">
        
        {/* Visual Graphic: Elderly user + Smartphone + AI Assistance */}
        <div className="relative mx-auto w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center">
          {/* Animated Glow Rings */}
          <div className="absolute inset-0 rounded-full bg-[#159A9C]/20 blur-xl animate-pulse"></div>
          <div className="absolute inset-1 rounded-full border-2 border-dashed border-[#F4A340]/60 animate-[spin_20s_linear_infinite]"></div>
          
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-lg">
            {/* Custom SVG Indian Senior Citizen with Smartphone & AI Sparkle */}
            <svg viewBox="0 0 100 100" className="w-16 h-16 sm:w-20 sm:h-20 text-[#173B57] fill-current">
              {/* Senior Citizen Head with Glasses */}
              <circle cx="50" cy="36" r="18" fill="#F4A340" opacity="0.9" />
              {/* Hair / Headgear */}
              <path d="M34 34 Q50 16 66 34 Q50 24 34 34" fill="#173B57" />
              {/* Spectacles / Glasses */}
              <circle cx="44" cy="36" r="4.5" fill="none" stroke="#173B57" strokeWidth="1.5" />
              <circle cx="56" cy="36" r="4.5" fill="none" stroke="#173B57" strokeWidth="1.5" />
              <path d="M48.5 36 L51.5 36" stroke="#173B57" strokeWidth="1.5" />
              {/* Smile */}
              <path d="M46 44 Q50 48 54 44" fill="none" stroke="#173B57" strokeWidth="1.5" strokeLinecap="round" />
              {/* Body / Kurta */}
              <path d="M30 65 C30 52 70 52 70 65 L76 90 L24 90 Z" fill="#159A9C" opacity="0.95" />
              {/* Smartphone Held */}
              <rect x="58" y="52" width="16" height="26" rx="3" fill="#173B57" stroke="#F4A340" strokeWidth="1.2" />
              <circle cx="66" cy="74" r="1.5" fill="#F4A340" />
              {/* AI Voice waves emitting from phone */}
              <path d="M78 58 Q82 65 78 72" fill="none" stroke="#F4A340" strokeWidth="2" strokeLinecap="round" />
              <path d="M82 54 Q88 65 82 76" fill="none" stroke="#159A9C" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>

          <div className="absolute -bottom-1 -right-1 bg-[#F4A340] text-[#173B57] p-2 rounded-full shadow-md">
            <Mic className="w-4 h-4" />
          </div>
        </div>

        {/* Brand Title & Tagline */}
        <div className="space-y-2">
          <div className="inline-block bg-[#159A9C]/10 text-[#159A9C] text-xs font-extrabold px-3.5 py-1 rounded-full border border-[#159A9C]/30 tracking-wider uppercase">
            Digital Inclusion Assistant
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#173B57]">
            JAN SAHAYAK
          </h1>
          <p className="text-base sm:text-xl font-semibold text-[#159A9C]">
            Banking & Government Services, Made Simple.
          </p>
          <p className="text-xs sm:text-base text-slate-600 max-w-lg mx-auto leading-relaxed">
            “Your AI voice assistant for banking procedures, form explanations, document checklists, and government schemes.”
          </p>
        </div>

        {/* Key Feature Pillars Checklist */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-left max-w-xl mx-auto text-xs bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 text-slate-700 font-medium">
            <CheckCircle2 className="w-4 h-4 text-[#2E8B57] shrink-0" />
            <span>12+ Indian Languages</span>
          </div>
          <div className="flex items-center gap-2 text-slate-700 font-medium">
            <CheckCircle2 className="w-4 h-4 text-[#2E8B57] shrink-0" />
            <span>Voice-First AI</span>
          </div>
          <div className="flex items-center gap-2 text-slate-700 font-medium">
            <CheckCircle2 className="w-4 h-4 text-[#2E8B57] shrink-0" />
            <span>Form Scanner & Explain</span>
          </div>
          <div className="flex items-center gap-2 text-slate-700 font-medium">
            <CheckCircle2 className="w-4 h-4 text-[#2E8B57] shrink-0" />
            <span>Bank Visit Planner</span>
          </div>
        </div>

      </div>

      {/* Buttons and Bottom Footer */}
      <div className="max-w-md mx-auto w-full space-y-3 pb-2">
        <button
          onClick={() => navigateTo('language')}
          className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#173B57] to-[#159A9C] hover:from-[#159A9C] hover:to-[#173B57] text-white font-bold text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group active:scale-[0.98] cursor-pointer"
        >
          <span>Get Started</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        <button
          onClick={handleExploreDemo}
          className="w-full py-3 px-6 rounded-xl bg-white hover:bg-slate-50 text-[#173B57] font-semibold text-sm border border-slate-200 shadow-2xs transition-all flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer"
        >
          <PlayCircle className="w-4 h-4 text-[#159A9C]" />
          <span>Explore Demo Directly (Hindi Default)</span>
        </button>

        <p className="text-xs text-slate-500 text-center tracking-wide pt-1">
          Designed to make essential services easy and accessible for everyone.
        </p>
      </div>

    </div>
  );
};
