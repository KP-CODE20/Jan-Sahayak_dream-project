import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';
import { Navbar } from '../common/Navbar';
import { DEMO_FORM_FIELDS } from '../../data/forms';
import { 
  Camera, 
  Upload, 
  Scan, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle, 
  Volume2, 
  ArrowRight, 
  FileText, 
  Eye, 
  Check, 
  AlertTriangle,
  Layers,
  X
} from 'lucide-react';
import { playChime, speakText } from '../../utils/speech';

export const FormScannerScreen: React.FC = () => {
  const { 
    selectedLanguage, 
    navigateTo, 
    readAloud, 
    setIsFormPrepared,
    seniorMode 
  } = useApp();

  const [isScanning, setIsScanning] = useState(false);
  const [scanCompleted, setScanCompleted] = useState(false);
  const [selectedFieldForExplanation, setSelectedFieldForExplanation] = useState<typeof DEMO_FORM_FIELDS[0] | null>(null);

  const isHindi = selectedLanguage === 'hi';

  const handleSimulateScan = () => {
    setIsScanning(true);
    setScanCompleted(false);
    playChime('scanner');

    setTimeout(() => {
      setIsScanning(false);
      setScanCompleted(true);
      playChime('recognize');
    }, 2200);
  };

  const handleExplainField = (field: typeof DEMO_FORM_FIELDS[0]) => {
    setSelectedFieldForExplanation(field);
    playChime('click');
    const textToRead = isHindi ? field.hindiExplanation : field.explanation;
    readAloud(textToRead);
  };

  const handleProceedToAISuggestions = () => {
    setIsFormPrepared(true);
    navigateTo('ai-review');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 flex flex-col justify-between">
      <Header title="AI Form Assistant" showBack={true} />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Header Hero */}
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#159A9C]/10 text-[#159A9C] text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#F4A340]" />
            <span>Hero Feature 2 • Physical Form OCR & AI Assistant</span>
          </div>
          <h2 className={`font-extrabold text-[#173B57] ${seniorMode ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'}`}>
            {isHindi ? 'बैंक फ़ॉर्म स्कैनर (AI Form Assistant)' : 'AI Form Assistant'}
          </h2>
          <p className="text-xs sm:text-sm text-[#667085]">
            {isHindi ? '“अपने हाथ के फ़ॉर्म का फ़ोटो लें, हम एक-एक कॉलम समझाएंगे”' : '“Take a photo of your physical bank form or scan our preloaded demo form.”'}
          </p>
        </div>

        {/* SCANNER CAMERA VIEWPORT SIMULATOR */}
        <div className="relative bg-slate-900 rounded-2xl overflow-hidden border-2 border-slate-800 shadow-xl min-h-[300px] flex flex-col justify-between p-4 text-white">
          
          {/* Top Scanner HUD Overlay */}
          <div className="flex items-center justify-between z-10">
            <span className="text-xs bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-md text-emerald-400 font-mono flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              {isScanning ? 'AI SCANNING IN PROGRESS...' : scanCompleted ? 'FORM OCR IDENTIFIED (100%)' : 'CAMERA READY'}
            </span>

            <span className="text-[10px] text-white/70 bg-white/10 px-2 py-0.5 rounded">
              High-Fidelity Demo
            </span>
          </div>

          {/* Center: Physical Form Demo Visual with Laser Scan */}
          <div className="relative my-auto py-4 flex flex-col items-center justify-center">
            
            {/* Visual Paper Form Mockup */}
            <div className="relative w-full max-w-sm bg-[#FFFDF9] text-slate-800 rounded-lg p-4 shadow-2xl border border-slate-300 transform rotate-[-0.5deg]">
              
              {/* Form Watermark Stamp */}
              <div className="absolute top-2 right-2 border border-slate-400/40 text-[9px] text-slate-400 font-bold px-1.5 py-0.5 rounded tracking-tighter uppercase">
                FORM SB-1 (DEMO)
              </div>

              {/* Form Title */}
              <div className="text-center border-b border-slate-300 pb-2 mb-2">
                <div className="text-[10px] font-bold text-[#173B57] tracking-wider uppercase">STATE BANK OF INDIA</div>
                <div className="text-xs font-extrabold text-slate-900">SAVINGS BANK ACCOUNT OPENING FORM</div>
                <div className="text-[9px] text-slate-500">For Resident Individual / Joint Account</div>
              </div>

              {/* Form Mock Fields Layout with bounding boxes */}
              <div className="space-y-1.5 text-[10px] font-mono">
                <div className={`p-1 rounded border transition-colors ${scanCompleted ? 'border-emerald-500 bg-emerald-50/50' : 'border-dashed border-slate-300'}`}>
                  <span className="text-slate-500 text-[9px]">1. APPLICANT FULL NAME:</span>
                  <div className="font-bold text-slate-800">RAMESH CHANDRA PATEL</div>
                </div>

                <div className="grid grid-cols-2 gap-1">
                  <div className={`p-1 rounded border transition-colors ${scanCompleted ? 'border-emerald-500 bg-emerald-50/50' : 'border-dashed border-slate-300'}`}>
                    <span className="text-slate-500 text-[9px]">DOB:</span> 12/05/1968
                  </div>
                  <div className={`p-1 rounded border transition-colors ${scanCompleted ? 'border-emerald-500 bg-emerald-50/50' : 'border-dashed border-slate-300'}`}>
                    <span className="text-slate-500 text-[9px]">MOBILE:</span> 98301 23456
                  </div>
                </div>

                <div className={`p-1 rounded border transition-colors ${scanCompleted ? 'border-emerald-500 bg-emerald-50/50' : 'border-dashed border-slate-300'}`}>
                  <span className="text-slate-500 text-[9px]">3. NOMINEE (DA-1):</span> SUNITA DEVI (Wife)
                </div>
              </div>

              {/* Laser Scanning Bar Animation */}
              {isScanning && (
                <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#F4A340] to-transparent shadow-[0_0_15px_#F4A340] animate-[bounce_2s_infinite]"></div>
              )}
            </div>

            {/* Corner Viewfinder Crosshairs */}
            <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-[#F4A340]"></div>
            <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-[#F4A340]"></div>
            <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-[#F4A340]"></div>
            <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-[#F4A340]"></div>
          </div>

          {/* Scanner Controls / Triggers */}
          <div className="z-10 pt-2 flex flex-col sm:flex-row items-center justify-center gap-2">
            <button
              onClick={handleSimulateScan}
              disabled={isScanning}
              className={`w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition active:scale-95 ${
                isScanning 
                  ? 'bg-slate-700 text-white cursor-wait' 
                  : 'bg-[#F4A340] hover:bg-[#F4A340]/90 text-[#173B57]'
              }`}
            >
              <Camera className="w-4 h-4" />
              <span>{isScanning ? 'Scanning Form...' : '📷 Scan Form (Demo Form)'}</span>
            </button>

            <button
              onClick={handleSimulateScan}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-semibold border border-white/20 transition flex items-center justify-center gap-1.5"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload from Gallery</span>
            </button>
          </div>

        </div>

        {/* DETECTED FIELDS & EXPLANATION CARDS (Shown after scan) */}
        {scanCompleted && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            
            {/* Form Detection Header */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#2E8B57] text-white flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-emerald-950">✓ Form Detected: Savings Account Opening Form</h4>
                  <p className="text-[11px] text-emerald-800">7 essential fields identified with 96% AI confidence</p>
                </div>
              </div>
            </div>

            {/* Fields List with "? Explain" Buttons */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-[#173B57] uppercase tracking-wider">
                  {isHindi ? 'पहचाने गए कॉलम (Detected Form Fields)' : 'Detected Form Fields & Explanations'}
                </h3>
                <span className="text-[11px] text-[#667085]">Click "? Explain" to understand</span>
              </div>

              <div className="space-y-2">
                {DEMO_FORM_FIELDS.map((field) => (
                  <div 
                    key={field.id}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-2 hover:border-[#159A9C] transition"
                  >
                    <div className="space-y-0.5 flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs sm:text-sm text-[#173B57] truncate">
                          {isHindi ? field.hindiName : field.fieldName}
                        </span>
                        <span className="text-[9px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-mono">
                          {field.confidence}% Match
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 truncate">
                        Sample: {field.sampleValue}
                      </p>
                    </div>

                    <button
                      onClick={() => handleExplainField(field)}
                      className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-300 text-xs font-bold text-[#159A9C] flex items-center gap-1 shadow-2xs transition shrink-0"
                    >
                      <HelpCircle className="w-3.5 h-3.5 text-[#F4A340]" />
                      <span>? Explain</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Prompt: Review AI Suggestions */}
            <div className="bg-gradient-to-r from-[#173B57] to-[#159A9C] text-white rounded-2xl p-5 shadow-lg space-y-3">
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#F4A340]">
                  Next Step: Human-in-the-Loop Verification
                </span>
                <h4 className="font-extrabold text-base sm:text-lg">
                  {isHindi ? 'एआई सुझावों की समीक्षा करें (Review AI Suggestions)' : 'Review AI Suggestions with Confidence Scores'}
                </h4>
                <p className="text-xs text-emerald-100">
                  {isHindi 
                    ? '“एआई जानकारियों का पता लगाता है; उपयोगकर्ता हर फ़ील्ड की जांच और पुष्टि करता है।”' 
                    : '“AI detects and suggests information; the user reviews and confirms every field.”'}
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-2">
                <button
                  onClick={handleProceedToAISuggestions}
                  className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-[#F4A340] hover:bg-[#F4A340]/90 text-[#173B57] font-extrabold text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer"
                >
                  <span>Review AI Suggestions</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => navigateTo('form-explanation')}
                  className="w-full sm:w-auto py-3 px-4 rounded-xl bg-white/15 hover:bg-white/25 text-white font-semibold text-xs border border-white/20 transition flex items-center justify-center gap-1"
                >
                  <span>Explain All Fields</span>
                </button>
              </div>
            </div>

          </div>
        )}

      </main>

      {/* Field Explanation Modal Drawer */}
      {selectedFieldForExplanation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 border border-slate-200 shadow-2xl space-y-4 animate-in zoom-in-95">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#159A9C]/15 text-[#159A9C] flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-[#F4A340]" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold">{selectedFieldForExplanation.section}</span>
                  <h3 className="font-bold text-sm sm:text-base text-[#173B57]">
                    {isHindi ? selectedFieldForExplanation.hindiName : selectedFieldForExplanation.fieldName}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setSelectedFieldForExplanation(null)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#173B57] uppercase tracking-wider">
                  Simple Explanation (सरल अर्थ)
                </span>
                <button
                  onClick={() => {
                    const text = isHindi ? selectedFieldForExplanation.hindiExplanation : selectedFieldForExplanation.explanation;
                    readAloud(text);
                  }}
                  className="flex items-center gap-1 text-xs font-bold text-[#159A9C] hover:underline"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Listen</span>
                </button>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                {isHindi ? selectedFieldForExplanation.hindiExplanation : selectedFieldForExplanation.explanation}
              </p>
            </div>

            <div className="bg-amber-50/80 p-3 rounded-xl border border-amber-200 text-xs text-amber-900">
              <span className="font-bold">Sample Value: </span>
              <span>{selectedFieldForExplanation.sampleValue}</span>
            </div>

            <button
              onClick={() => setSelectedFieldForExplanation(null)}
              className="w-full py-2.5 rounded-xl bg-[#173B57] hover:bg-[#159A9C] text-white font-bold text-xs transition"
            >
              Understood / समझ गया
            </button>
          </div>
        </div>
      )}

      <Navbar />
    </div>
  );
};
