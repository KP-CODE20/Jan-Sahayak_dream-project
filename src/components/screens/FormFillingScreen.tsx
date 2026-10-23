import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';
import { Navbar } from '../common/Navbar';
import { CompletedFormDocument } from '../common/CompletedFormDocument';
import { generateAndDownloadFormPdf } from '../../utils/pdfGenerator';
import { 
  Printer, 
  Download, 
  ArrowRight, 
  Sparkles, 
  PenTool, 
  Sliders, 
  Eye, 
  SplitSquareVertical, 
  ZoomIn, 
  ZoomOut, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  FileText,
  Check,
  RotateCcw,
  Palette,
  FileCheck
} from 'lucide-react';
import { playChime } from '../../utils/speech';
import { HandwritingStyle, InkColor } from '../../types';
import { saveFormSubmissionToSupabase } from '../../services/supabaseClient';

export const FormFillingScreen: React.FC = () => {
  const { 
    activeBlankForm, 
    fieldMappings, 
    userProfile, 
    handwritingStyle, 
    setHandwritingStyle, 
    inkColor, 
    setInkColor, 
    manualSignatureStatus, 
    setManualSignatureStatus, 
    navigateTo, 
    selectedLanguage, 
    seniorMode 
  } = useApp();

  const isHindi = selectedLanguage === 'hi';
  const [viewMode, setViewMode] = useState<'generated' | 'split' | 'blank'>('generated');
  const [zoomScale, setZoomScale] = useState<number>(100);
  const [isRegenerating, setIsRegenerating] = useState<boolean>(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);
  const formPrintRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    playChime('click');
    saveFormSubmissionToSupabase({
      form: activeBlankForm,
      fieldMappings,
      handwritingStyle,
      inkColor,
      manualSignatureStatus,
      userProfile
    });
    window.print();
  };

  const handleDownloadPdf = async () => {
    setIsGeneratingPdf(true);
    playChime('success');
    saveFormSubmissionToSupabase({
      form: activeBlankForm,
      fieldMappings,
      handwritingStyle,
      inkColor,
      manualSignatureStatus,
      userProfile
    });
    try {
      await generateAndDownloadFormPdf({
        elementId: 'printable-form-canvas',
        activeBlankForm,
        userProfile
      });
    } catch (err) {
      console.error('Failed to generate PDF', err);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleProceedToVerification = () => {
    saveFormSubmissionToSupabase({
      form: activeBlankForm,
      fieldMappings,
      handwritingStyle,
      inkColor,
      manualSignatureStatus,
      userProfile
    });
    navigateTo('final-verification');
  };

  const handleRegenerateStyle = () => {
    setIsRegenerating(true);
    playChime('click');
    setTimeout(() => {
      setIsRegenerating(false);
      playChime('success');
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 flex flex-col justify-between">
      <Header title={isHindi ? "हस्तलिखित रूप में भरा गया फ़ॉर्म" : "Generated Form Preview"} showBack={true} />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Step Indicator & Controls Header */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-4 no-print">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#159A9C] bg-[#159A9C]/10 px-3 py-1 rounded-full">
                <Sparkles className="w-3.5 h-3.5" />
                <span>STEP 4 • HANDWRITING-STYLE FORM GENERATION</span>
              </span>

              <h2 className={`font-extrabold text-[#173B57] ${seniorMode ? 'text-2xl' : 'text-xl sm:text-2xl'}`}>
                {isHindi ? 'प्राकृतिक हस्तलेखन में तैयार फ़ॉर्म' : 'Natural Handwriting-Style Preview'}
              </h2>
            </div>

            {/* Print & Download Action Buttons */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                onClick={handlePrint}
                className="px-4 py-2.5 rounded-xl bg-[#173B57] hover:bg-[#159A9C] text-white font-bold text-xs shadow-xs transition flex items-center gap-1.5 cursor-pointer active:scale-95"
              >
                <Printer className="w-4 h-4" />
                <span>Print Form</span>
              </button>

              <button
                onClick={handleDownloadPdf}
                disabled={isGeneratingPdf}
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition flex items-center gap-1.5 cursor-pointer active:scale-95 disabled:opacity-75"
              >
                <Download className="w-4 h-4" />
                <span>{isGeneratingPdf ? 'Generating PDF...' : 'Download PDF'}</span>
              </button>
            </div>
          </div>

          {/* HANDWRITING & INK CUSTOMIZATION CONTROLS (SPEC #10 & #11) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3 border-t border-slate-100">
            
            {/* Style Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <PenTool className="w-3.5 h-3.5 text-[#159A9C]" />
                <span>Handwriting Style:</span>
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: 'neat', label: '✍️ Neat' },
                  { id: 'simple', label: '✍️ Simple' },
                  { id: 'formal', label: '✍️ Formal' }
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => { setHandwritingStyle(s.id as HandwritingStyle); playChime('click'); }}
                    className={`py-1.5 px-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                      handwritingStyle === s.id
                        ? 'bg-[#173B57] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Ink Color Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-[#159A9C]" />
                <span>Ballpoint Ink Color:</span>
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => { setInkColor('blue'); playChime('click'); }}
                  className={`py-1.5 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                    inkColor === 'blue'
                      ? 'bg-blue-800 text-white shadow-xs ring-2 ring-blue-400/30'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                  <span>🔵 Blue Pen</span>
                </button>

                <button
                  onClick={() => { setInkColor('black'); playChime('click'); }}
                  className={`py-1.5 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                    inkColor === 'black'
                      ? 'bg-slate-900 text-white shadow-xs ring-2 ring-slate-400/30'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-black"></span>
                  <span>⚫ Black Pen</span>
                </button>
              </div>
            </div>

            {/* View Mode & Zoom Controls */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-[#159A9C]" />
                <span>Comparison & View:</span>
              </label>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setViewMode(viewMode === 'split' ? 'generated' : 'split')}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1 transition cursor-pointer ${
                    viewMode === 'split' ? 'bg-[#159A9C] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <SplitSquareVertical className="w-3.5 h-3.5" />
                  <span>{viewMode === 'split' ? 'Single View' : 'Side-by-Side'}</span>
                </button>

                <button
                  onClick={() => setZoomScale(Math.max(80, zoomScale - 10))}
                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="text-[11px] font-mono font-bold text-slate-600 w-9 text-center">{zoomScale}%</span>
                <button
                  onClick={() => setZoomScale(Math.min(130, zoomScale + 10))}
                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* MANDATORY MANUAL SIGNATURE NOTICE (SPEC #12 & #18) */}
        <div className="bg-indigo-50/80 rounded-2xl p-4 border border-indigo-200 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 no-print">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
              <PenTool className="w-5 h-5" />
            </div>
            <div className="space-y-0.5 text-xs text-indigo-950">
              <h4 className="font-bold text-sm">
                Mandatory Physical Signature Policy:
              </h4>
              <p className="text-indigo-800 leading-relaxed">
                «Jan Sahayak leaves signature blocks 100% empty. You will physically sign with your pen after printing this form.»
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setManualSignatureStatus(manualSignatureStatus === 'signed_on_paper' ? 'pending' : 'signed_on_paper');
              playChime('click');
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition shrink-0 cursor-pointer ${
              manualSignatureStatus === 'signed_on_paper'
                ? 'bg-emerald-600 text-white'
                : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-xs'
            }`}
          >
            {manualSignatureStatus === 'signed_on_paper' 
              ? '✓ Signed on Physical Print' 
              : '✍️ Acknowledge Paper Signature'}
          </button>
        </div>

        {/* FORM RENDERING CANVAS / DOCUMENT SIMULATOR */}
        <div className="space-y-4">
          
          {/* Side-by-side or Single View */}
          <div className={`grid gap-6 ${viewMode === 'split' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
            
            {/* BLANK FORM VIEW (when in split mode) */}
            {viewMode === 'split' && (
              <div className="bg-white rounded-2xl p-6 border border-slate-300 shadow-md space-y-4 select-none opacity-85">
                <div className="flex items-center justify-between border-b pb-3">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Original Uploaded</span>
                    <h3 className="font-bold text-sm text-[#173B57]">Blank Physical Form ({activeBlankForm.code})</h3>
                  </div>
                  <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded font-mono font-bold">100% UNFILLED</span>
                </div>

                <div className="space-y-4 text-xs font-mono text-slate-400">
                  <div className="border p-3 rounded-lg bg-slate-50 space-y-2">
                    <p className="font-bold text-slate-600">STATE BANK OF INDIA - ACCOUNT OPENING FORM</p>
                    <p>1. Applicant Full Name: _____________________________________</p>
                    <p>2. Father/Spouse Name: _____________________________________</p>
                    <p>3. Date of Birth: [  ][  ] / [  ][  ] / [  ][  ][  ][  ]</p>
                    <p>4. Mobile: [  ][  ][  ][  ][  ][  ][  ][  ][  ][  ]</p>
                    <p>5. Permanent Address: _____________________________________</p>
                    <p>6. IFSC Code: ____________________ Branch: ________________</p>
                  </div>
                  <div className="border border-dashed border-slate-300 p-4 rounded-lg text-center text-slate-400">
                    [ Specimen Signature of Applicant - Box Empty ]
                  </div>
                </div>
              </div>
            )}

            {/* GENERATED HANDWRITTEN-STYLE FORM CANVAS */}
            <CompletedFormDocument
              ref={formPrintRef}
              id="printable-form-canvas"
              activeBlankForm={activeBlankForm}
              userProfile={userProfile}
              fieldMappings={fieldMappings}
              handwritingStyle={handwritingStyle}
              inkColor={inkColor}
              style={{ transform: `scale(${zoomScale / 100})`, transformOrigin: 'top center' }}
            />

          </div>

        </div>

        {/* BOTTOM ACTION BAR: PROCEED TO FINAL VERIFICATION */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-3 no-print">
          <button
            onClick={() => navigateTo('ai-review')}
            className="w-full sm:w-auto px-5 py-3.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs transition cursor-pointer"
          >
            ← Back to Edit Fields
          </button>

          <button
            onClick={handleProceedToVerification}
            className="w-full sm:flex-1 py-4 px-6 rounded-2xl bg-gradient-to-r from-[#173B57] to-[#159A9C] text-white font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 group active:scale-[0.99] cursor-pointer"
          >
            <span>Proceed to Final Verification & Submission Guide</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </main>

      <Navbar />
    </div>
  );
};
