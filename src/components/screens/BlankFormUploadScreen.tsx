import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';
import { Navbar } from '../common/Navbar';
import { getLocalizedText } from '../../utils/i18n';
import { 
  Camera, 
  Upload, 
  Sparkles, 
  FileText, 
  CheckCircle2, 
  Info, 
  ArrowRight, 
  Eye, 
  ShieldCheck,
  RefreshCw,
  Scan,
  Check
} from 'lucide-react';
import { playChime } from '../../utils/speech';
import { BLANK_FORM_TEMPLATES } from '../../data/forms';
import { BlankFormTemplate } from '../../types';

export const BlankFormUploadScreen: React.FC = () => {
  const { 
    navigateTo, 
    activeBlankForm, 
    setActiveBlankForm, 
    setUploadedBlankImage,
    selectedLanguage, 
    seniorMode 
  } = useApp();

  const [selectedMethod, setSelectedMethod] = useState<'camera' | 'upload'>('camera');
  const [isCapturing, setIsCapturing] = useState<boolean>(false);

  const handleSelectTemplate = (template: BlankFormTemplate) => {
    setActiveBlankForm(template);
    setUploadedBlankImage(template.sampleBlankImage);
    playChime('click');
  };

  const handleProceedToUnderstand = () => {
    setIsCapturing(true);
    playChime('scanner');
    setTimeout(() => {
      setIsCapturing(false);
      navigateTo('form-understanding');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 flex flex-col justify-between">
      <Header title={getLocalizedText('uploadScreenTitle', selectedLanguage, 'Upload Your Blank Form')} showBack={true} />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Core Value Header */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-bold text-[#159A9C] uppercase tracking-wide">
            <Scan className="w-4 h-4 text-[#F4A340]" />
            <span>{getLocalizedText('uploadStepTag', selectedLanguage, 'Step 2: Upload / Photograph Blank Physical Form')}</span>
          </div>
          
          <h2 className={`font-extrabold text-[#173B57] ${seniorMode ? 'text-2xl' : 'text-lg sm:text-xl'}`}>
            {getLocalizedText('uploadHeaderTitle', selectedLanguage, 'Take a photo of any blank physical bank form')}
          </h2>
          
          <p className="text-xs sm:text-sm text-slate-600">
            {getLocalizedText('uploadHeaderDesc', selectedLanguage, 'Jan Sahayak will detect the blank lines, tables, and checkboxes, then fill them using your saved profile data.')}
          </p>
        </div>

        {/* TWO PRIMARY UPLOAD METHODS (SPEC #5) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Method 1: 📷 Take Photo */}
          <div 
            onClick={() => { setSelectedMethod('camera'); playChime('click'); }}
            className={`p-5 rounded-2xl border-2 transition cursor-pointer flex flex-col justify-between gap-3 ${
              selectedMethod === 'camera' 
                ? 'border-[#159A9C] bg-white ring-2 ring-[#159A9C]/20 shadow-md' 
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#173B57] to-[#159A9C] text-white flex items-center justify-center shadow-xs">
                <Camera className="w-6 h-6" />
              </div>
              {selectedMethod === 'camera' && (
                <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                  <Check className="w-3.5 h-3.5" />
                </span>
              )}
            </div>

            <div>
              <h3 className="font-bold text-sm sm:text-base text-[#173B57]">
                {getLocalizedText('takePhotoLabel', selectedLanguage, '📷 Take Photo')}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {getLocalizedText('takePhotoDesc', selectedLanguage, '«Take a clear picture of the blank form using your device camera.»')}
              </p>
            </div>
          </div>

          {/* Method 2: 🖼️ Upload Photo */}
          <div 
            onClick={() => { setSelectedMethod('upload'); playChime('click'); }}
            className={`p-5 rounded-2xl border-2 transition cursor-pointer flex flex-col justify-between gap-3 ${
              selectedMethod === 'upload' 
                ? 'border-[#159A9C] bg-white ring-2 ring-[#159A9C]/20 shadow-md' 
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-xl bg-slate-100 text-[#173B57] flex items-center justify-center">
                <Upload className="w-6 h-6" />
              </div>
              {selectedMethod === 'upload' && (
                <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                  <Check className="w-3.5 h-3.5" />
                </span>
              )}
            </div>

            <div>
              <h3 className="font-bold text-sm sm:text-base text-[#173B57]">
                {getLocalizedText('uploadPhotoLabel', selectedLanguage, '🖼️ Upload Photo')}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {getLocalizedText('uploadPhotoDesc', selectedLanguage, '«Select a photo of the blank form from your device gallery or PDF files.»')}
              </p>
            </div>
          </div>

        </div>

        {/* PHOTOGRAPHY TIP BANNER (SPEC #5) */}
        <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200/80 flex items-start gap-3 text-xs text-amber-900 shadow-2xs">
          <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <strong className="font-bold block">
              {getLocalizedText('photoTipTitle', selectedLanguage, 'Tip for best handwriting alignment:')}
            </strong>
            <p className="text-amber-800 leading-relaxed">
              {getLocalizedText('photoTipDesc', selectedLanguage, '«Place the entire form inside the camera frame, keep lighting even, and make sure the text and blank boxes are clearly visible.»')}
            </p>
          </div>
        </div>

        {/* DEMO BLANK FORM SELECTOR (Select physical blank form template) */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-[10px] font-bold text-[#159A9C] uppercase tracking-wider">{getLocalizedText('demoBlankFormsTitle', selectedLanguage, 'Demo Blank Forms')}</span>
              <h3 className="font-bold text-sm text-[#173B57]">
                {getLocalizedText('selectBlankFormHeading', selectedLanguage, 'Select Blank Form to Populate')}
              </h3>
            </div>
            <span className="text-[11px] text-slate-500 font-medium bg-slate-100 px-2.5 py-1 rounded-full">
              {getLocalizedText('worksWithPaper', selectedLanguage, 'Works with many structured forms')}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {BLANK_FORM_TEMPLATES.map((tmpl) => (
              <button
                key={tmpl.id}
                onClick={() => handleSelectTemplate(tmpl)}
                className={`p-4 rounded-xl border text-left transition flex items-start justify-between gap-3 cursor-pointer ${
                  activeBlankForm.id === tmpl.id
                    ? 'border-[#159A9C] bg-[#159A9C]/5 ring-2 ring-[#159A9C]/20'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#173B57] text-white">
                      {tmpl.code}
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium truncate">{tmpl.issuer}</span>
                  </div>
                  <h4 className="font-bold text-xs sm:text-sm text-[#173B57] leading-snug">
                    {tmpl.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-2">
                    {tmpl.description}
                  </p>
                </div>

                {activeBlankForm.id === tmpl.id && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-1" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* LIVE CAMERA VIEWFINDER SIMULATION OF THE BLANK FORM */}
        <div className="bg-slate-900 rounded-3xl p-5 sm:p-7 text-white shadow-xl relative overflow-hidden space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-300">
            <span className="flex items-center gap-2 font-mono">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              {getLocalizedText('cameraViewfinderStatus', selectedLanguage, 'CAMERA VIEWFINDER • 100% BLANK FORM DETECTED')}
            </span>
            <span className="bg-white/10 px-2.5 py-1 rounded-md text-[11px] font-mono">
              {activeBlankForm.code}
            </span>
          </div>

          {/* Viewfinder Target Area */}
          <div className="relative border-2 border-dashed border-white/40 rounded-2xl bg-white/5 p-4 sm:p-6 overflow-hidden flex flex-col items-center justify-center min-h-[220px]">
            
            {/* Viewfinder Corner Guides */}
            <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[#F4A340]"></div>
            <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[#F4A340]"></div>
            <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-[#F4A340]"></div>
            <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[#F4A340]"></div>

            {/* Simulated Blank Form Visual Wireframe */}
            <div className="w-full max-w-md bg-white text-slate-800 rounded-xl p-4 shadow-md space-y-2.5 text-[10px] sm:text-xs select-none opacity-95">
              <div className="flex items-center justify-between border-b pb-1.5">
                <span className="font-bold text-[#173B57]">{activeBlankForm.issuer}</span>
                <span className="font-mono text-[9px] bg-slate-100 px-1.5 py-0.5 rounded font-bold">{activeBlankForm.code}</span>
              </div>

              <div className="space-y-1 text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="text-slate-700 font-semibold w-24">1. Name:</span>
                  <span className="flex-1 border-b border-dashed border-slate-400 py-0.5 text-slate-300 italic">__________________________</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-700 font-semibold w-24">2. Date of Birth:</span>
                  <span className="flex-1 flex gap-1 font-mono text-[9px] text-slate-300">
                    <span className="border border-slate-300 px-1 rounded">[D]</span><span className="border border-slate-300 px-1 rounded">[D]</span> /
                    <span className="border border-slate-300 px-1 rounded">[M]</span><span className="border border-slate-300 px-1 rounded">[M]</span> /
                    <span className="border border-slate-300 px-1 rounded">[Y]</span><span className="border border-slate-300 px-1 rounded">[Y]</span><span className="border border-slate-300 px-1 rounded">[Y]</span><span className="border border-slate-300 px-1 rounded">[Y]</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-700 font-semibold w-24">3. Address:</span>
                  <span className="flex-1 border-b border-dashed border-slate-400 py-0.5 text-slate-300 italic">__________________________</span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[9px] text-slate-400">{getLocalizedText('blankReadyForMapping', selectedLanguage, 'Status: Blank paper ready for AI mapping')}</span>
                  <span className="text-[9px] font-mono text-rose-500 font-semibold">{getLocalizedText('signatureBoxEmpty', selectedLanguage, '[ ✍️ Signature Box (Empty) ]')}</span>
                </div>
              </div>
            </div>

            {/* Scanning Laser Beam */}
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#F4A340] to-transparent animate-scanLine opacity-75"></div>
          </div>

          {/* Action Trigger Button */}
          <button
            onClick={handleProceedToUnderstand}
            disabled={isCapturing}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#F4A340] to-[#E68A20] text-[#173B57] font-extrabold text-sm sm:text-base shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2.5 active:scale-[0.98] cursor-pointer"
          >
            {isCapturing ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>{getLocalizedText('capturingForm', selectedLanguage, 'Capturing High-Resolution Blank Form...')}</span>
              </>
            ) : (
              <>
                <Camera className="w-5 h-5" />
                <span>{getLocalizedText('scanAndUnderstandBtn', selectedLanguage, 'Scan & Understand Blank Form →')}</span>
              </>
            )}
          </button>
        </div>

      </main>

      <Navbar />
    </div>
  );
};
