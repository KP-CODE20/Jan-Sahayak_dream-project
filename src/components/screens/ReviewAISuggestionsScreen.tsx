import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';
import { Navbar } from '../common/Navbar';
import { 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  Edit3, 
  ArrowRight, 
  ShieldCheck, 
  Volume2, 
  Check, 
  X,
  FileCheck,
  AlertTriangle,
  UserPlus,
  PenTool,
  Info
} from 'lucide-react';
import { playChime } from '../../utils/speech';
import { FieldMappingItem } from '../../types';

export const ReviewAISuggestionsScreen: React.FC = () => {
  const { 
    fieldMappings, 
    updateFieldMapping, 
    confirmFieldMapping, 
    confirmAllFieldMappings,
    navigateTo, 
    selectedLanguage, 
    seniorMode, 
    readAloud,
    userProfile 
  } = useApp();

  const isHindi = selectedLanguage === 'hi';
  const [editingFieldId, setEditingFieldId] = useState<string | null>(null);
  const [tempEditValue, setTempEditValue] = useState<string>('');
  const [missingInfoModalField, setMissingInfoModalField] = useState<FieldMappingItem | null>(null);
  const [manualInputVal, setManualInputVal] = useState<string>('');

  const handleStartInlineEdit = (item: FieldMappingItem) => {
    setEditingFieldId(item.id);
    setTempEditValue(item.userEditedValue !== undefined ? item.userEditedValue : item.profileValue);
    playChime('click');
  };

  const handleSaveInlineEdit = (id: string) => {
    updateFieldMapping(id, {
      userEditedValue: tempEditValue,
      isConfirmed: true
    });
    setEditingFieldId(null);
    playChime('success');
  };

  const handleOpenMissingModal = (item: FieldMappingItem) => {
    setMissingInfoModalField(item);
    setManualInputVal('');
    playChime('click');
  };

  const handleSaveMissingValue = () => {
    if (missingInfoModalField) {
      updateFieldMapping(missingInfoModalField.id, {
        profileValue: manualInputVal,
        userEditedValue: manualInputVal,
        isMissingInProfile: false,
        confidenceLevel: 'high',
        isConfirmed: true
      });
      setMissingInfoModalField(null);
      playChime('success');
    }
  };

  const handleLeaveBlank = () => {
    if (missingInfoModalField) {
      updateFieldMapping(missingInfoModalField.id, {
        profileValue: '',
        userEditedValue: '',
        isMissingInProfile: false,
        confidenceLevel: 'verify',
        isConfirmed: true
      });
      setMissingInfoModalField(null);
      playChime('click');
    }
  };

  const handleGenerateHandwrittenForm = () => {
    playChime('success');
    navigateTo('form-filling');
  };

  const matchedCount = fieldMappings.filter((f) => f.confidenceLevel === 'high').length;
  const verifyCount = fieldMappings.filter((f) => f.confidenceLevel === 'verify').length;
  const missingCount = fieldMappings.filter((f) => f.isMissingInProfile).length;

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 flex flex-col justify-between">
      <Header title={isHindi ? "जानकारी मिलान एवं सत्यापन" : "Information Found"} showBack={true} />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Hero Banner: AI Field Mapping & Confidence Overview (Screen 1 Requirement) */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#159A9C] bg-[#159A9C]/10 px-3 py-1 rounded-full">
                <Sparkles className="w-3.5 h-3.5" />
                <span>STEP 3 • AI FIELD MAPPING & CONFIDENCE</span>
              </span>

              <h2 className={`font-extrabold text-[#173B57] ${seniorMode ? 'text-2xl' : 'text-xl sm:text-2xl'}`}>
                {isHindi ? 'फ़ॉर्म में पाई गई जानकारी की जांच करें' : 'Information Found & Field Mapping'}
              </h2>
            </div>

            <button
              onClick={() => readAloud(
                isHindi
                  ? 'आपके कोरे फ़ॉर्म में नाम, जन्मतिथि और पता आपकी सहेजी गई प्रोफ़ाइल से जोड़ दिया गया है। कृपया जांच लें।'
                  : 'Your blank form fields have been matched with your saved profile. Please review the confidence level and values before generating the handwritten form.'
              )}
              className="p-2.5 rounded-full bg-slate-50 text-slate-500 hover:text-[#159A9C] border border-slate-200 transition shrink-0 self-start sm:self-auto cursor-pointer"
              title="Read Aloud Guidance"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {isHindi 
              ? 'जन सहायक ने कोरे फ़ॉर्म के खाली स्थानों को आपकी प्रोफ़ाइल से मिलाया है। आप किसी भी फ़ील्ड को बदल सकते हैं।'
              : 'Review how the AI mapped each blank form field to your saved profile. You can edit any field before generating the handwriting-style form.'}
          </p>

          {/* AI Confidence Status Indicators (Spec #16 & #17) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500 shrink-0"></span>
              <div>
                <span className="text-xs font-bold text-emerald-950 block">{matchedCount} Matched</span>
                <span className="text-[10px] text-emerald-700">🟢 High Confidence</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-amber-500 shrink-0"></span>
              <div>
                <span className="text-xs font-bold text-amber-950 block">{verifyCount} To Verify</span>
                <span className="text-[10px] text-amber-700">🟡 Please Verify</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-rose-500 shrink-0"></span>
              <div>
                <span className="text-xs font-bold text-slate-900 block">{missingCount} Missing</span>
                <span className="text-[10px] text-slate-600">🟡 Add Manually</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center gap-2.5">
              <PenTool className="w-4 h-4 text-indigo-700 shrink-0" />
              <div>
                <span className="text-xs font-bold text-indigo-950 block">1 Signature</span>
                <span className="text-[10px] text-indigo-700">✍️ Sign Manually</span>
              </div>
            </div>
          </div>
        </div>

        {/* FIELD MAPPING TABLE / LIST (SPEC #7) */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
          
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-[#159A9C]" />
              <h3 className="font-bold text-xs sm:text-sm text-[#173B57] uppercase tracking-wider">
                Form Field ➔ Profile Mapping Table
              </h3>
            </div>

            <button
              onClick={confirmAllFieldMappings}
              className="text-xs font-bold text-[#159A9C] hover:text-[#117A7C] flex items-center gap-1 self-end sm:self-auto cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Confirm All Matches</span>
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {fieldMappings.map((item) => {
              const displayVal = item.userEditedValue !== undefined ? item.userEditedValue : item.profileValue;
              const isEditing = editingFieldId === item.id;
              const isSignature = item.fieldClassification === 'signature_required';

              return (
                <div 
                  key={item.id}
                  className={`p-4 sm:p-5 transition flex flex-col gap-3 ${
                    isSignature 
                      ? 'bg-indigo-50/40' 
                      : item.isMissingInProfile 
                      ? 'bg-amber-50/50' 
                      : 'hover:bg-slate-50/80'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    
                    {/* Left: Form Field & Detected Section */}
                    <div className="space-y-1 sm:max-w-[40%]">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                          {item.section}
                        </span>
                        {item.isRequired && (
                          <span className="text-[10px] text-rose-600 font-bold">*Required</span>
                        )}
                      </div>

                      <h4 className="font-bold text-xs sm:text-sm text-[#173B57]">
                        {item.formFieldLabel}
                      </h4>
                      <p className="text-[11px] text-slate-500 font-medium">
                        {item.hindiFieldLabel}
                      </p>
                    </div>

                    {/* Middle: Profile Value / Handwriting Preview */}
                    <div className="flex-1 min-w-0 sm:px-4">
                      {isEditing ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={tempEditValue}
                            onChange={(e) => setTempEditValue(e.target.value)}
                            className="flex-1 px-3 py-1.5 border border-[#159A9C] rounded-lg text-xs font-bold text-[#173B57] focus:outline-none focus:ring-2 focus:ring-[#159A9C]/20 bg-white"
                            autoFocus
                          />
                          <button
                            onClick={() => handleSaveInlineEdit(item.id)}
                            className="p-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 cursor-pointer"
                            title="Save"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setEditingFieldId(null)}
                            className="p-1.5 rounded-lg bg-slate-200 text-slate-700 hover:bg-slate-300 cursor-pointer"
                            title="Cancel"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : isSignature ? (
                        <div className="p-2.5 rounded-xl border border-indigo-200 bg-white text-xs space-y-1">
                          <span className="font-bold text-indigo-900 flex items-center gap-1.5">
                            <PenTool className="w-3.5 h-3.5 text-indigo-600" />
                            ✍️ Mandatory Manual Signature Policy
                          </span>
                          <p className="text-[11px] text-indigo-700">
                            Left completely blank. AI will NEVER generate fake signatures. Sign with pen after printing.
                          </p>
                        </div>
                      ) : item.isMissingInProfile ? (
                        <div className="p-2.5 rounded-xl border border-amber-200 bg-amber-50 text-xs flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5 text-amber-900 font-semibold">
                            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                            <span>Information missing in saved profile</span>
                          </div>
                          <button
                            onClick={() => handleOpenMissingModal(item)}
                            className="px-2.5 py-1 rounded-md bg-amber-600 hover:bg-amber-700 text-white font-bold text-[11px] shrink-0 cursor-pointer"
                          >
                            Add Info
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-slate-400 font-semibold">Mapped Value:</span>
                            <span className="font-bold text-xs sm:text-sm text-slate-800 font-sans">
                              {displayVal || '—'}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 italic">
                            {item.explanation}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Right: Confidence Status & Action Controls */}
                    <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                      
                      {/* Confidence Tag */}
                      {item.confidenceLevel === 'high' && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100/90 px-2.5 py-1 rounded-full">
                          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                          🟢 Matched ({item.confidenceScore}%)
                        </span>
                      )}

                      {item.confidenceLevel === 'verify' && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-100/90 px-2.5 py-1 rounded-full">
                          <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                          🟡 Please Verify
                        </span>
                      )}

                      {item.confidenceLevel === 'missing' && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-700 bg-slate-200 px-2.5 py-1 rounded-full">
                          🟡 Missing
                        </span>
                      )}

                      {/* Edit / Change Action Button */}
                      {!isSignature && !isEditing && (
                        <button
                          onClick={() => handleStartInlineEdit(item)}
                          className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 hover:text-[#159A9C] text-xs font-semibold flex items-center gap-1 transition cursor-pointer"
                          title="Edit or Change Value"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Change</span>
                        </button>
                      )}

                    </div>

                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* NEVER FABRICATE PERSONAL INFO ASSURANCE BANNER (SPEC #8) */}
        <div className="bg-slate-100 rounded-2xl p-4 border border-slate-200 flex items-start gap-3 text-xs text-slate-700">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <strong className="font-bold text-slate-900 block">
              Strict Accuracy & Verification Guarantee:
            </strong>
            <p className="text-slate-600 leading-relaxed">
              «Jan Sahayak never invents or fabricates personal information. If a field is missing from your profile, you decide whether to enter it or leave it blank on the physical form.»
            </p>
          </div>
        </div>

        {/* PRIMARY ACTION CTA: GENERATE HANDWRITTEN-STYLE FORM */}
        <div className="pt-2">
          <button
            onClick={handleGenerateHandwrittenForm}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#173B57] to-[#159A9C] text-white font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 group active:scale-[0.99] cursor-pointer"
          >
            <span>Confirm Information & Generate Handwritten-Style Form</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </main>

      {/* MISSING INFO HANDLER MODAL (SPEC #8) */}
      {missingInfoModalField && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-scaleUp">
            
            <div className="flex items-center gap-2 text-amber-600">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="font-bold text-sm text-[#173B57]">
                🟡 Information Missing from Profile
              </h3>
            </div>

            <div className="space-y-1.5 text-xs text-slate-600">
              <p>
                <strong>{missingInfoModalField.formFieldLabel}</strong> is not available in your saved profile.
              </p>
              <p className="text-slate-500">
                You can manually provide the value now, or leave it blank to write with a pen later.
              </p>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700">
                Enter Value for this Field:
              </label>
              <input
                type="text"
                value={manualInputVal}
                onChange={(e) => setManualInputVal(e.target.value)}
                placeholder="Type details here..."
                className="w-full p-2.5 border border-slate-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-[#159A9C]/20 focus:border-[#159A9C]"
                autoFocus
              />
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                type="button"
                onClick={handleLeaveBlank}
                className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition cursor-pointer"
              >
                Leave Blank
              </button>

              <button
                type="button"
                onClick={handleSaveMissingValue}
                disabled={!manualInputVal.trim()}
                className="py-2.5 px-4 rounded-xl bg-[#159A9C] hover:bg-[#117A7C] text-white font-bold text-xs transition shadow-xs disabled:opacity-50 cursor-pointer"
              >
                Add Information
              </button>
            </div>

          </div>
        </div>
      )}

      <Navbar />
    </div>
  );
};
