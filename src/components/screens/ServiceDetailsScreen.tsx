import React from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';
import { Navbar } from '../common/Navbar';
import { 
  CheckCircle2, 
  ArrowRight, 
  Volume2, 
  MapPin, 
  Clock, 
  Scan, 
  HelpCircle, 
  Sparkles,
  ClipboardCheck
} from 'lucide-react';
import { getServiceTitle, getServiceDesc } from '../../data/translations/serviceDataTranslations';
import { getLocalizedText } from '../../utils/i18n';

export const ServiceDetailsScreen: React.FC = () => {
  const { 
    selectedService, 
    selectedLanguage, 
    navigateTo, 
    seniorMode, 
    readAloud 
  } = useApp();

  const isHindi = selectedLanguage === 'hi';
  const serviceTitle = getServiceTitle(selectedService.id, selectedService.title, selectedLanguage);
  const serviceDesc = getServiceDesc(selectedService.id, selectedService.description || selectedService.explanation, selectedLanguage);

  const handleReadDetails = () => {
    const text = `${serviceTitle}। ${serviceDesc}। ${getLocalizedText('viewEligibilityDocs', selectedLanguage, 'Required Documents')}: ${selectedService.documents.map(d => isHindi ? d.hindiName : d.name).join(', ')}।`;
    readAloud(text);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 flex flex-col justify-between">
      <Header title={getLocalizedText('detailsLabel', selectedLanguage, 'Service Details')} showBack={true} />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Service Title Card */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="text-[11px] font-bold text-[#159A9C] uppercase tracking-wider bg-[#159A9C]/10 px-2.5 py-0.5 rounded-full">
                {selectedService.category.toUpperCase()}
              </span>
              <h2 className={`font-extrabold text-[#173B57] mt-1 ${seniorMode ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'}`}>
                {serviceTitle}
              </h2>
            </div>

            <button
              onClick={handleReadDetails}
              className="p-2.5 rounded-full bg-[#159A9C]/10 text-[#159A9C] hover:bg-[#159A9C]/20 transition shrink-0"
              title="Listen to service details"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>

          {/* What is it? Explanation */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <h3 className="text-xs font-bold text-[#173B57] uppercase tracking-wider mb-1">
              {getLocalizedText('detailsLabel', selectedLanguage, 'Overview')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {serviceDesc}
            </p>
          </div>

          {/* Counter and Time info */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-50/70 border border-emerald-100 text-xs text-emerald-900 font-medium">
              <MapPin className="w-4 h-4 text-[#2E8B57] shrink-0" />
              <span>{selectedService.branchCounter}</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-amber-50/70 border border-amber-100 text-xs text-amber-900 font-medium">
              <Clock className="w-4 h-4 text-[#F4A340] shrink-0" />
              <span>{selectedService.approxTime}</span>
            </div>
          </div>
        </div>

        {/* Required Documents Section */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#173B57] uppercase tracking-wider flex items-center gap-2">
              <ClipboardCheck className="w-4 h-4 text-[#159A9C]" />
              <span>{getLocalizedText('viewEligibilityDocs', selectedLanguage, 'Required Documents')}</span>
            </h3>
            <button
              onClick={() => navigateTo('document-checker')}
              className="text-xs text-[#159A9C] font-semibold hover:underline"
            >
              {getLocalizedText('detailsLabel', selectedLanguage, 'Check My Readiness')} →
            </button>
          </div>

          <div className="space-y-2">
            {selectedService.documents.map((doc, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#2E8B57] shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs sm:text-sm text-[#173B57]">
                      {isHindi ? doc.hindiName : doc.name}
                    </span>
                    {doc.required && (
                      <span className="text-[10px] bg-red-100 text-red-700 font-semibold px-2 py-0.5 rounded-full">
                        Required
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">{doc.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Step-by-Step Procedure */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3">
          <h3 className="text-sm font-bold text-[#173B57] uppercase tracking-wider">
            {getLocalizedText('btnContinue', selectedLanguage, 'Step-by-Step Procedure')}
          </h3>

          <div className="space-y-3">
            {selectedService.steps.map((step) => (
              <div key={step.stepNumber} className="flex items-start gap-3 relative">
                {/* Step badge */}
                <div className="w-7 h-7 rounded-full bg-[#173B57] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 shadow-xs">
                  {step.stepNumber}
                </div>

                <div className="flex-1 pb-1">
                  <h4 className="font-bold text-xs sm:text-sm text-[#173B57]">
                    {isHindi ? step.hindiTitle : step.title}
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    {isHindi ? step.hindiInstruction : step.instruction}
                  </p>
                  {step.tip && (
                    <div className="mt-1 text-[11px] bg-amber-50 text-amber-800 p-1.5 rounded-md border border-amber-200/50 flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-[#F4A340] shrink-0" />
                      <span><strong>Tip:</strong> {step.tip}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3 Primary Action Buttons */}
        <div className="space-y-2 pt-1">
          <button
            onClick={() => navigateTo('visit-planner')}
            className="w-full py-3.5 px-4 rounded-xl bg-[#173B57] hover:bg-[#159A9C] text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2 group active:scale-[0.98]"
          >
            <span>{getLocalizedText('btnContinue', selectedLanguage, 'Prepare My Bank Visit Plan')}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => navigateTo('form-scanner')}
              className="py-3 px-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-semibold text-xs transition flex items-center justify-center gap-1.5"
            >
              <Scan className="w-4 h-4 text-[#159A9C]" />
              <span>Scan My Form</span>
            </button>

            <button
              onClick={() => navigateTo('form-explanation')}
              className="py-3 px-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-semibold text-xs transition flex items-center justify-center gap-1.5"
            >
              <HelpCircle className="w-4 h-4 text-[#F4A340]" />
              <span>Explain This Form</span>
            </button>
          </div>
        </div>

      </main>

      <Navbar />
    </div>
  );
};
