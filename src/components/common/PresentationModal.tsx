import React from 'react';
import { useApp } from '../../context/AppContext';
import { DESIGN_THINKING_DATA } from '../../data/designThinking';
import { 
  X, 
  GraduationCap, 
  Users, 
  Compass, 
  Lightbulb, 
  CheckCircle2, 
  Award, 
  Play, 
  ArrowRight, 
  Sparkles, 
  PenTool, 
  FileText, 
  ShieldCheck, 
  Lock,
  Layers
} from 'lucide-react';
import { playChime } from '../../utils/speech';

export const PresentationModal: React.FC = () => {
  const { 
    presentationModalOpen, 
    setPresentationModalOpen, 
    navigateTo, 
    setSelectedLanguage 
  } = useApp();

  if (!presentationModalOpen) return null;

  const runDemoStep = (stepNumber: number) => {
    setPresentationModalOpen(false);
    playChime('click');
    if (stepNumber === 1) {
      navigateTo('language');
    } else if (stepNumber === 2) {
      navigateTo('profile');
    } else if (stepNumber === 3) {
      navigateTo('blank-upload');
    } else if (stepNumber === 4) {
      navigateTo('form-understanding');
    } else if (stepNumber === 5) {
      navigateTo('form-filling');
    } else if (stepNumber === 6) {
      navigateTo('final-verification');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-3xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-slate-200">
        
        {/* Modal Header */}
        <div className="bg-[#173B57] text-white p-4 sm:p-5 flex items-center justify-between border-b border-[#159A9C]/30">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#159A9C] flex items-center justify-center text-white">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#F4A340]">College Project Presentation</span>
                <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-medium">Design Thinking</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold">JAN SAHAYAK — Blank Form Auto-Fill System</h2>
            </div>
          </div>

          <button
            onClick={() => setPresentationModalOpen(false)}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 text-sm text-slate-700">
          
          {/* Quick Interactive Demo Flow Runner */}
          <div className="bg-gradient-to-r from-[#173B57]/5 to-[#159A9C]/10 rounded-xl p-4 border border-[#159A9C]/30">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Play className="w-4 h-4 text-[#159A9C]" />
                <h3 className="font-bold text-[#173B57] text-base">Quick Presentation Flow (6 Core Steps)</h3>
              </div>
              <span className="text-xs text-[#667085]">Click any step to jump live</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { step: 1, title: 'Step 1: Language & Voice', sub: '12 Indian Languages' },
                { step: 2, title: 'Step 2: Saved Profile', sub: '4 Structured Data Groups' },
                { step: 3, title: 'Step 3: Blank Form Scan', sub: 'Paper Form Camera' },
                { step: 4, title: 'Step 4: AI Mapping', sub: 'Confidence & Confirmation' },
                { step: 5, title: 'Step 5: Handwriting Fill', sub: 'Print-Ready Pen Simulation' },
                { step: 6, title: 'Step 6: Paper Sign & Visit', sub: 'Official Submission Guide' }
              ].map((d) => (
                <button
                  key={d.step}
                  onClick={() => runDemoStep(d.step)}
                  className="p-2.5 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-left transition hover:border-[#159A9C] shadow-2xs group flex flex-col justify-between cursor-pointer"
                >
                  <span className="font-bold text-xs text-[#173B57] group-hover:text-[#159A9C]">{d.title}</span>
                  <span className="text-[11px] text-slate-500">{d.sub}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 1. Core Problem & Solution Statement */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#173B57]">
              <Compass className="w-5 h-5 text-[#F4A340]" />
              <h3 className="font-bold text-base">1. Problem & Innovation</h3>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
              <p className="leading-relaxed">
                <strong>Problem:</strong> Many first-time and semi-literate banking users struggle to fill complicated physical bank forms due to dense terminology, language barriers, and fear of mistakes.
              </p>
              <p className="leading-relaxed text-emerald-800">
                <strong>Solution:</strong> Jan Sahayak allows users to take a photo of any blank physical form, recognizes the fields, and populates them using securely saved profile data in a realistic handwriting-style format ready for manual signature.
              </p>
            </div>
          </div>

          {/* 2. Core Principles */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#173B57]">
              <Lightbulb className="w-5 h-5 text-[#159A9C]" />
              <h3 className="font-bold text-base">2. Three Mandatory Product Principles</h3>
            </div>
            <div className="grid sm:grid-cols-3 gap-2.5 text-xs">
              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1">
                <span className="font-bold text-[#173B57] flex items-center gap-1">
                  <PenTool className="w-3.5 h-3.5 text-indigo-600" />
                  Manual Signature Only
                </span>
                <p className="text-slate-500">
                  AI will NEVER imitate or generate digital signatures. Signature box is kept blank for pen signing.
                </p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1">
                <span className="font-bold text-[#173B57] flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-emerald-600" />
                  No Data Fabrication
                </span>
                <p className="text-slate-500">
                  Missing information is never invented. User is prompted to add or leave blank.
                </p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1">
                <span className="font-bold text-[#173B57] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#F4A340]" />
                  Privacy & Data Control
                </span>
                <p className="text-slate-500">
                  1-click permanent deletion dialog and demo masking for PAN and Aadhaar numbers.
                </p>
              </div>
            </div>
          </div>

          {/* 3. The 5-Pillar End-to-End Workflow */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#173B57]">
              <Layers className="w-5 h-5 text-[#2E8B57]" />
              <h3 className="font-bold text-base">3. End-to-End Workflow Pipeline</h3>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-mono text-slate-700 leading-relaxed">
              CREATE PROFILE ➔ SAVE INFORMATION ➔ SCAN BLANK FORM ➔ AI UNDERSTANDS FORM ➔ MATCH FIELDS & CONFIDENCE ➔ USER CONFIRMS ➔ GENERATE HANDWRITING FORM ➔ DOWNLOAD / PRINT ➔ PHYSICAL SIGNATURE ➔ BANK COUNTER SUBMISSION
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-3.5 sm:p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500">College Design Thinking Prototype • Jan Sahayak</span>
          <button
            onClick={() => setPresentationModalOpen(false)}
            className="px-4 py-2 bg-[#173B57] hover:bg-[#159A9C] text-white font-semibold text-xs sm:text-sm rounded-xl transition shadow-sm cursor-pointer"
          >
            Close Presentation Deck
          </button>
        </div>

      </div>
    </div>
  );
};
