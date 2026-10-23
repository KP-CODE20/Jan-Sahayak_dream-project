import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';
import { Navbar } from '../common/Navbar';
import { CompletedFormDocument } from '../common/CompletedFormDocument';
import { generateAndDownloadFormPdf, getFormPdfFileName } from '../../utils/pdfGenerator';
import { saveFormSubmissionToSupabase } from '../../services/supabaseClient';
import { 
  CheckCircle2, 
  Download, 
  Printer, 
  ArrowRight, 
  Building2, 
  ShieldCheck, 
  FileText, 
  Home,
  Clock,
  MapPin,
  HelpCircle,
  Share2
} from 'lucide-react';
import { playChime } from '../../utils/speech';

export const FormCompletedScreen: React.FC = () => {
  const { 
    userProfile, 
    activeBlankForm,
    fieldMappings,
    handwritingStyle,
    inkColor,
    manualSignatureStatus,
    selectedLanguage, 
    navigateTo, 
    seniorMode 
  } = useApp();

  const [downloadNotice, setDownloadNotice] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const isHindi = selectedLanguage === 'hi';

  const handleDownload = async () => {
    setDownloadNotice(true);
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

  const pdfFileName = getFormPdfFileName(activeBlankForm, userProfile);

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 flex flex-col justify-between">
      <Header title="Form Completed" showBack={false} />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Success Hero Banner */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <h2 className={`font-extrabold text-[#173B57] tracking-tight ${seniorMode ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'}`}>
              {isHindi ? 'फ़ॉर्म समीक्षा पूरी हुई (Form Review Completed)' : 'Form Review Completed'}
            </h2>

            {/* Mandatory Instruction Statement */}
            <p className="font-extrabold text-sm sm:text-base text-emerald-800 bg-emerald-50 py-2.5 px-4 rounded-xl border border-emerald-200">
              “Your form is ready. Please verify all information and submit it through the official bank channel.”
            </p>

            <p className="text-xs text-slate-500">
              {isHindi 
                ? 'जन सहायक ने आपका फ़ॉर्म तैयार कर दिया है। अपनी आवश्यक फोटो व पहचान पत्र की प्रति लेकर अधिकृत बैंक शाखा में जाएं।' 
                : 'All fields have been populated and verified with your manual signature instructions. You can download the completed slip below.'}
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-3 no-print">
            <button
              onClick={handleDownload}
              disabled={isGeneratingPdf}
              className="px-6 py-3 rounded-xl bg-[#173B57] hover:bg-[#159A9C] text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center gap-2 active:scale-95 cursor-pointer disabled:opacity-75"
            >
              <Download className="w-4 h-4 text-[#F4A340]" />
              <span>{isGeneratingPdf ? 'Generating PDF...' : 'Download Printable Form (PDF)'}</span>
            </button>

            <button
              onClick={() => navigateTo('visit-planner')}
              className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#173B57] font-bold text-xs sm:text-sm transition flex items-center gap-2"
            >
              <Building2 className="w-4 h-4 text-[#159A9C]" />
              <span>View Branch Visit Guide</span>
            </button>
          </div>
        </div>

        {/* Download Simulation Toast */}
        {downloadNotice && (
          <div className="p-4 rounded-2xl bg-emerald-600 text-white flex items-center justify-between gap-4 animate-in fade-in slide-in-from-top-2 no-print">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-[#F4A340]" />
              <div>
                <h4 className="font-bold text-xs sm:text-sm">“{pdfFileName}” Prepared</h4>
                <p className="text-[11px] text-emerald-100">Ready for physical printing or offline reference.</p>
              </div>
            </div>
            <button 
              onClick={() => setDownloadNotice(false)}
              className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg font-bold"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Printable & Exportable Completed Form Target */}
        <div className="pdf-export-capture-container">
          <CompletedFormDocument
            id="printable-form-canvas"
            activeBlankForm={activeBlankForm}
            userProfile={userProfile}
            fieldMappings={fieldMappings}
            handwritingStyle={handwritingStyle}
            inkColor={inkColor}
          />
        </div>

        {/* Next Steps Guide Checklist */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3">
          <h3 className="font-bold text-sm text-[#173B57] uppercase tracking-wider">
            {isHindi ? 'शाखा में जमा करने हेतु चेकलिस्ट' : 'Next Steps at Your Bank Branch'}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <div className="font-bold text-[#173B57] flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-[#173B57] text-white flex items-center justify-center text-[10px]">1</span>
                <span>Print & Affix Photo</span>
              </div>
              <p className="text-slate-600 text-[11px]">
                Print the verified form and paste 2 recent passport-size photographs.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <div className="font-bold text-[#173B57] flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-[#173B57] text-white flex items-center justify-center text-[10px]">2</span>
                <span>Carry Original ID</span>
              </div>
              <p className="text-slate-600 text-[11px]">
                Bring original Aadhaar and PAN/Form 60 along with one photocopy each.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <div className="font-bold text-[#173B57] flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-[#173B57] text-white flex items-center justify-center text-[10px]">3</span>
                <span>Visit Counter 2</span>
              </div>
              <p className="text-slate-600 text-[11px]">
                Submit at Account Opening Desk at Kolkata Main Branch (10:00 AM - 2:00 PM).
              </p>
            </div>
          </div>
        </div>

        {/* Back to Home CTA */}
        <div className="text-center pt-2">
          <button
            onClick={() => navigateTo('home')}
            className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm transition inline-flex items-center gap-2"
          >
            <Home className="w-4 h-4 text-slate-500" />
            <span>Return to Home Dashboard</span>
          </button>
        </div>

      </main>

      <Navbar />
    </div>
  );
};
