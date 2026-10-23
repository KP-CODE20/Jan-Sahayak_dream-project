import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';
import { Navbar } from '../common/Navbar';
import { DEMO_FORM_FIELDS } from '../../data/forms';
import { 
  HelpCircle, 
  Volume2, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp,
  FileText,
  ShieldCheck,
  BookOpen
} from 'lucide-react';
import { playChime } from '../../utils/speech';

export const FormExplanationScreen: React.FC = () => {
  const { 
    selectedLanguage, 
    navigateTo, 
    readAloud, 
    setIsFormPrepared,
    seniorMode 
  } = useApp();

  const [expandedFieldId, setExpandedFieldId] = useState<string>(DEMO_FORM_FIELDS[5].id); // Nominee expanded by default for demo!
  const isHindi = selectedLanguage === 'hi';

  const toggleField = (id: string) => {
    playChime('click');
    setExpandedFieldId(prev => prev === id ? '' : id);
  };

  const handleReadField = (field: typeof DEMO_FORM_FIELDS[0]) => {
    const text = isHindi 
      ? `${field.hindiName}। ${field.hindiExplanation}`
      : `${field.fieldName}. ${field.explanation}`;
    readAloud(text);
  };

  const handleProceedToFilling = () => {
    setIsFormPrepared(true);
    navigateTo('form-filling');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 flex flex-col justify-between">
      <Header title="Form Explanation" showBack={true} />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Title and Intro */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#159A9C]/10 text-[#159A9C] text-xs font-bold">
            <BookOpen className="w-3.5 h-3.5 text-[#F4A340]" />
            <span>Jargon-Free Banking Dictionary</span>
          </div>
          <h2 className={`font-extrabold text-[#173B57] ${seniorMode ? 'text-2xl' : 'text-xl sm:text-2xl'}`}>
            {isHindi ? 'फ़ॉर्म के कठिन शब्दों का सरल अर्थ' : 'Bank Form Fields Explained in Simple Words'}
          </h2>
          <p className="text-xs text-[#667085]">
            {isHindi ? 'बिना किसी परेशानी के हर कॉलम को समझें और सही जानकारी भरें।' : 'Understand exactly what each section means without banking jargon.'}
          </p>
        </div>

        {/* Accordion List of Fields */}
        <div className="space-y-2.5">
          {DEMO_FORM_FIELDS.map((field) => {
            const isExpanded = expandedFieldId === field.id;

            return (
              <div 
                key={field.id}
                className={`rounded-2xl bg-white border transition-all shadow-2xs overflow-hidden ${
                  isExpanded ? 'border-[#159A9C] ring-1 ring-[#159A9C]/30' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Field Accordion Header */}
                <div 
                  onClick={() => toggleField(field.id)}
                  className="p-4 flex items-center justify-between cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                      isExpanded ? 'bg-[#173B57] text-white' : 'bg-slate-100 text-slate-700'
                    }`}>
                      ?
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{field.section}</span>
                      <h3 className="font-bold text-xs sm:text-sm text-[#173B57] group-hover:text-[#159A9C] transition-colors">
                        {isHindi ? field.hindiName : field.fieldName}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleReadField(field);
                      }}
                      className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-[#159A9C] transition"
                      title="Read Explanation Aloud"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                </div>

                {/* Expanded Explanation Body */}
                {isExpanded && (
                  <div className="px-4 pb-4 pt-1 border-t border-slate-100 bg-slate-50/50 space-y-3 animate-in fade-in duration-200">
                    <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#159A9C] uppercase tracking-wider">
                          What does this mean? (सरल अर्थ)
                        </span>
                        <button
                          onClick={() => handleReadField(field)}
                          className="text-[11px] font-bold text-[#173B57] flex items-center gap-1 hover:underline"
                        >
                          <Volume2 className="w-3.5 h-3.5 text-[#F4A340]" />
                          <span>Listen</span>
                        </button>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                        {isHindi ? field.hindiExplanation : field.explanation}
                      </p>
                    </div>

                    <div className="bg-amber-50 p-2.5 rounded-lg border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#F4A340] shrink-0" />
                      <span><strong>Correct Example:</strong> {field.sampleValue}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Action CTA */}
        <div className="pt-2">
          <button
            onClick={handleProceedToFilling}
            className="w-full py-3.5 px-4 rounded-xl bg-[#173B57] hover:bg-[#159A9C] text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2 group active:scale-[0.98]"
          >
            <span>Proceed to AI Form Preparation</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </main>

      <Navbar />
    </div>
  );
};
