import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';
import { Navbar } from '../common/Navbar';
import { 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  Scan, 
  Table, 
  CheckSquare, 
  UserCheck, 
  FileText,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { playChime } from '../../utils/speech';

export const FormUnderstandingScreen: React.FC = () => {
  const { 
    navigateTo, 
    activeBlankForm, 
    selectedLanguage, 
    seniorMode 
  } = useApp();

  const isHindi = selectedLanguage === 'hi';
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const steps = [
    {
      id: 1,
      title: 'Detecting Form Layout & Structure',
      hindiTitle: 'फ़ॉर्म लेआउट और संरचना की पहचान',
      desc: 'Analyzing margins, headers, grids, and official form serial codes.',
      icon: Layers
    },
    {
      id: 2,
      title: 'Identifying Blank Text Fields & Lines',
      hindiTitle: 'खाली टेक्स्ट फ़ील्ड व रिक्त पंक्तियों की पहचान',
      desc: 'Found 14 input rows for Name, DOB, Address, Phone, and A/C numbers.',
      icon: Scan
    },
    {
      id: 3,
      title: 'Identifying Checkboxes & Radio Arrays',
      hindiTitle: 'चेकबॉक्स और चयन विकल्पों की पहचान',
      desc: 'Detected Gender [Male/Female/Other], Account Type, and KYC declarations.',
      icon: CheckSquare
    },
    {
      id: 4,
      title: 'Identifying Tables & Section Headers',
      hindiTitle: 'तालिकाओं और अनुभाग शीर्षकों की पहचान',
      desc: 'Identified Personal Info, Tax Details, Nomination (DA-1), and Signature block.',
      icon: Table
    },
    {
      id: 5,
      title: 'Matching Fields with Saved Profile',
      hindiTitle: 'सहेजी गई प्रोफ़ाइल से फ़ील्ड्स का मिलान',
      desc: 'Auto-mapping Name, DOB, Mobile, Address, PIN, and IFSC from user profile.',
      icon: UserCheck
    }
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => { setCurrentStep(2); playChime('click'); }, 800);
    const timer2 = setTimeout(() => { setCurrentStep(3); playChime('click'); }, 1600);
    const timer3 = setTimeout(() => { setCurrentStep(4); playChime('click'); }, 2400);
    const timer4 = setTimeout(() => { 
      setCurrentStep(5); 
      setIsCompleted(true); 
      playChime('success'); 
    }, 3200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  const handleProceed = () => {
    playChime('click');
    navigateTo('ai-review');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 flex flex-col justify-between">
      <Header title={isHindi ? "फ़ॉर्म को समझ रहे हैं..." : "Understanding Your Form…"} showBack={true} />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Hero Title & Analysis Status */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#159A9C] bg-[#159A9C]/10 px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span>AI FORM UNDERSTANDING ENGINE</span>
            </span>

            <span className="font-mono text-xs text-slate-500 font-bold">
              {activeBlankForm.code}
            </span>
          </div>

          <h2 className={`font-extrabold text-[#173B57] ${seniorMode ? 'text-2xl' : 'text-xl sm:text-2xl'}`}>
            {isCompleted 
              ? (isHindi ? '✓ कोरा फ़ॉर्म सफलतापूर्वक पहचाना गया!' : '✓ Blank Form Structure Identified!')
              : (isHindi ? 'कोरे फ़ॉर्म के खाली खानों की पहचान की जा रही है...' : 'Analyzing Blank Input Areas & Mapping to Profile...')}
          </h2>

          <p className="text-xs sm:text-sm text-slate-600">
            {isHindi
              ? 'जन सहायक ने कोरे फ़ॉर्म के सभी खाली खानों को आपकी सुरक्षित प्रोफ़ाइल के साथ सफलतापूर्वक जोड़ लिया है।'
              : 'Jan Sahayak detects printed labels and automatically matches them to your saved profile before handwriting generation.'}
          </p>

          {/* Progress Bar */}
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-[#159A9C] to-[#2E8B57] h-2 rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* 5-STEP VISUAL PIPELINE (SPEC #6) */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-3.5">
          <h3 className="text-xs font-bold text-[#173B57] uppercase tracking-wider">
            Live Recognition Pipeline
          </h3>

          <div className="space-y-3">
            {steps.map((step) => {
              const Icon = step.icon;
              const isPast = currentStep > step.id || isCompleted;
              const isCurrent = currentStep === step.id && !isCompleted;

              return (
                <div 
                  key={step.id}
                  className={`p-3.5 rounded-xl border transition-all flex items-start gap-3.5 ${
                    isPast 
                      ? 'bg-emerald-50/50 border-emerald-200' 
                      : isCurrent 
                      ? 'bg-white border-[#159A9C] ring-2 ring-[#159A9C]/20 shadow-xs' 
                      : 'bg-slate-50/50 border-slate-200/60 opacity-60'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                    isPast 
                      ? 'bg-emerald-600 text-white' 
                      : isCurrent 
                      ? 'bg-[#159A9C] text-white animate-pulse' 
                      : 'bg-slate-200 text-slate-500'
                  }`}>
                    {isPast ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-4 h-4" />}
                  </div>

                  <div className="space-y-0.5 flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className={`font-bold text-xs sm:text-sm ${isPast ? 'text-emerald-950' : 'text-[#173B57]'}`}>
                        {isHindi ? step.hindiTitle : step.title}
                      </h4>
                      {isPast && (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-md">
                          ✓ Complete
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SAMPLE AI FIELD MAPPING PREVIEW CHIPS (SPEC #6) */}
        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
          <h3 className="text-xs font-bold text-[#173B57] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#F4A340]" />
            <span>Real-time Field Mappings Detected</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
            <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs space-y-1">
              <span className="text-[10px] text-slate-400 font-mono block">Form: Name: ________</span>
              <span className="text-emerald-700 font-bold block">→ Profile: Full Name</span>
              <span className="text-[11px] text-slate-600">Value: Kanak Pandey</span>
            </div>

            <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs space-y-1">
              <span className="text-[10px] text-slate-400 font-mono block">Form: DOB: [D][D]/[M][M]</span>
              <span className="text-emerald-700 font-bold block">→ Profile: Date of Birth</span>
              <span className="text-[11px] text-slate-600">Value: 12/05/2007</span>
            </div>

            <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs space-y-1">
              <span className="text-[10px] text-slate-400 font-mono block">Form: Account No: ________</span>
              <span className="text-emerald-700 font-bold block">→ Profile: Account Number</span>
              <span className="text-[11px] text-slate-600 font-mono">Value: XXXXXXXX4582</span>
            </div>
          </div>
        </div>

        {/* ACTION CTA BUTTON */}
        <div className="pt-2">
          <button
            onClick={handleProceed}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#173B57] to-[#159A9C] text-white font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 group active:scale-[0.99] cursor-pointer"
          >
            <span>Review Information Found & AI Confidence</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </main>

      <Navbar />
    </div>
  );
};
