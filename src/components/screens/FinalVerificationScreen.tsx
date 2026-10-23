import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';
import { Navbar } from '../common/Navbar';
import { CompletedFormDocument } from '../common/CompletedFormDocument';
import { generateAndDownloadFormPdf } from '../../utils/pdfGenerator';
import { saveFormSubmissionToSupabase } from '../../services/supabaseClient';
import { 
  CheckCircle2, 
  Printer, 
  Download, 
  ShieldCheck, 
  FileCheck, 
  ArrowRight, 
  PenTool, 
  HelpCircle, 
  Building, 
  Clock, 
  Sparkles,
  AlertCircle,
  Home,
  BookOpen,
  Volume2
} from 'lucide-react';
import { playChime } from '../../utils/speech';

export const FinalVerificationScreen: React.FC = () => {
  const { 
    activeBlankForm, 
    userProfile, 
    fieldMappings,
    handwritingStyle,
    inkColor,
    manualSignatureStatus, 
    setManualSignatureStatus, 
    navigateTo, 
    selectedLanguage, 
    seniorMode, 
    readAloud 
  } = useApp();

  const isHindi = selectedLanguage === 'hi';
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  
  const [checklist, setChecklist] = useState({
    infoVerified: true,
    signatureUnderstood: true,
    photosAttached: false,
    idProofAttached: false,
    addressProofAttached: false,
    cashReady: true
  });

  const toggleCheck = (key: keyof typeof checklist) => {
    setChecklist({ ...checklist, [key]: !checklist[key] });
    playChime('click');
  };

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

  const allReady = Object.values(checklist).filter(Boolean).length >= 4;

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 flex flex-col justify-between">
      <Header title={isHindi ? "अंतिम समीक्षा एवं बैंक जमा चेकलिस्ट" : "Final Review & Verification"} showBack={true} />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Step Indicator & Overview Banner */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-3 no-print">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>STEP 5 • READY FOR PRINT & MANUAL SIGNATURE</span>
              </span>

              <h2 className={`font-extrabold text-[#173B57] ${seniorMode ? 'text-2xl' : 'text-xl sm:text-2xl'}`}>
                {isHindi ? 'फ़ॉर्म प्रिंट करने व बैंक में जमा करने की तैयारी' : 'Final Review & Submission Checklist'}
              </h2>
            </div>

            <button
              onClick={() => readAloud(
                isHindi
                  ? 'आपका फ़ॉर्म तैयार है। इसे प्रिंट करें, खाली जगह पर पेन से हस्ताक्षर करें, और आवश्यक पहचान पत्रों के साथ बैंक काउंटर पर जमा करें।'
                  : 'Your form is ready. Print it, sign with a pen inside the signature box, attach your ID proofs and photos, and submit it at the bank counter.'
              )}
              className="p-2.5 rounded-full bg-slate-50 text-slate-500 hover:text-[#159A9C] border border-slate-200 transition shrink-0 self-start sm:self-auto cursor-pointer"
              title="Read Aloud Checklist"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {isHindi 
              ? 'कृपया बैंक जाने से पहले यह सुनिश्चित कर लें कि आपने फ़ॉर्म पर हस्ताक्षर कर लिए हैं और सभी जरूरी दस्तावेज़ साथ ले लिए हैं।'
              : 'Complete this pre-submission checklist to ensure smooth, zero-rejection processing at your bank branch counter.'}
          </p>
        </div>

        {/* 1. MANDATORY PHYSICAL SIGNATURE CONFIRMATION CARD (SPEC #12 & #18) */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4 no-print">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
              <PenTool className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-[#173B57]">
                1. Mandatory Physical Pen Signature
              </h3>
              <p className="text-xs text-slate-500">
                AI leaves signature area empty. Banks strictly reject digital or printed signatures on paper forms.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-200 space-y-3">
            <div className="flex items-start gap-2 text-xs text-indigo-900">
              <ShieldCheck className="w-4 h-4 text-indigo-700 shrink-0 mt-0.5" />
              <span>
                <strong>Verification Rule:</strong> After printing this PDF, physically sign inside the signature box in front of or before handing it to the bank officer.
              </span>
            </div>

            <button
              onClick={() => {
                setManualSignatureStatus(manualSignatureStatus === 'signed_on_paper' ? 'pending' : 'signed_on_paper');
                playChime('click');
              }}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                manualSignatureStatus === 'signed_on_paper'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              <PenTool className="w-3.5 h-3.5" />
              <span>
                {manualSignatureStatus === 'signed_on_paper'
                  ? '✓ Confirmed: I will physically sign the printed paper form'
                  : 'Click to Acknowledge Physical Signature Requirement'}
              </span>
            </button>
          </div>
        </div>

        {/* 2. REQUIRED SUPPORTING DOCUMENTS CHECKLIST (SPEC #19) */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4 no-print">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                <FileCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base text-[#173B57]">
                  2. Documents to Carry to Bank Branch
                </h3>
                <p className="text-xs text-slate-500">
                  Attach self-attested photocopies along with this completed printed form.
                </p>
              </div>
            </div>

            <span className="text-xs font-bold text-[#159A9C] bg-[#159A9C]/10 px-2.5 py-1 rounded-full hidden sm:inline-block">
              RBI KYC Compliant
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
            
            <button
              onClick={() => toggleCheck('photosAttached')}
              className={`p-3 rounded-xl border text-left transition flex items-center justify-between gap-2 cursor-pointer ${
                checklist.photosAttached ? 'bg-emerald-50 border-emerald-300' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <span className="font-medium text-slate-800">📸 2 Recent Passport Size Photographs</span>
              <span className={`w-5 h-5 rounded-md flex items-center justify-center text-white text-xs ${
                checklist.photosAttached ? 'bg-emerald-600' : 'border border-slate-300 bg-white'
              }`}>
                {checklist.photosAttached && '✓'}
              </span>
            </button>

            <button
              onClick={() => toggleCheck('idProofAttached')}
              className={`p-3 rounded-xl border text-left transition flex items-center justify-between gap-2 cursor-pointer ${
                checklist.idProofAttached ? 'bg-emerald-50 border-emerald-300' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <span className="font-medium text-slate-800">🪪 Identity Proof (PAN Card / Aadhaar Copy)</span>
              <span className={`w-5 h-5 rounded-md flex items-center justify-center text-white text-xs ${
                checklist.idProofAttached ? 'bg-emerald-600' : 'border border-slate-300 bg-white'
              }`}>
                {checklist.idProofAttached && '✓'}
              </span>
            </button>

            <button
              onClick={() => toggleCheck('addressProofAttached')}
              className={`p-3 rounded-xl border text-left transition flex items-center justify-between gap-2 cursor-pointer ${
                checklist.addressProofAttached ? 'bg-emerald-50 border-emerald-300' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <span className="font-medium text-slate-800">🏠 Address Proof (Electricity Bill / Voter ID)</span>
              <span className={`w-5 h-5 rounded-md flex items-center justify-center text-white text-xs ${
                checklist.addressProofAttached ? 'bg-emerald-600' : 'border border-slate-300 bg-white'
              }`}>
                {checklist.addressProofAttached && '✓'}
              </span>
            </button>

            <button
              onClick={() => toggleCheck('cashReady')}
              className={`p-3 rounded-xl border text-left transition flex items-center justify-between gap-2 cursor-pointer ${
                checklist.cashReady ? 'bg-emerald-50 border-emerald-300' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <span className="font-medium text-slate-800">💵 Initial Deposit ({userProfile.initialDeposit || '₹ 1,000 Cash'})</span>
              <span className={`w-5 h-5 rounded-md flex items-center justify-center text-white text-xs ${
                checklist.cashReady ? 'bg-emerald-600' : 'border border-slate-300 bg-white'
              }`}>
                {checklist.cashReady && '✓'}
              </span>
            </button>

          </div>
        </div>

        {/* 3. BRANCH SUBMISSION GUIDANCE & WHAT TO EXPECT (SPEC #20) */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4 no-print">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-[#173B57]">
                3. What to Expect at the Bank Branch
              </h3>
              <p className="text-xs text-slate-500">
                Step-by-step walk-in guidance so you feel confident at the counter.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <span className="text-[10px] font-bold text-[#159A9C] uppercase block">Step 1: Which Desk?</span>
              <h4 className="font-bold text-slate-800">Account Opening / Customer Service Counter</h4>
              <p className="text-slate-600">
                Visit Counter #1 or ask the "May I Help You" desk for Savings Account Opening.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <span className="text-[10px] font-bold text-[#159A9C] uppercase block">Step 2: Verification</span>
              <h4 className="font-bold text-slate-800">Original ID Cross-Check</h4>
              <p className="text-slate-600">
                The officer will match your printed form details and signature against your original ID cards.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <span className="text-[10px] font-bold text-[#159A9C] uppercase block">Step 3: Receipt</span>
              <h4 className="font-bold text-slate-800">Stamped Acknowledgement Slip</h4>
              <p className="text-slate-600">
                Always collect the stamped tear-off slip or reference SMS. Account activates within 24-48 hours.
              </p>
            </div>

          </div>
        </div>

        {/* PRIMARY ACTION BUTTONS */}
        <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3 no-print">
          
          <button
            onClick={handlePrint}
            className="py-4 px-6 rounded-2xl bg-[#173B57] hover:bg-[#159A9C] text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <Printer className="w-4 h-4" />
            <span>Print Form Now</span>
          </button>

          <button
            onClick={handleDownloadPdf}
            disabled={isGeneratingPdf}
            className="py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-75"
          >
            <Download className="w-4 h-4" />
            <span>{isGeneratingPdf ? 'Generating PDF...' : 'Download Form PDF'}</span>
          </button>

          <button
            onClick={() => navigateTo('home')}
            className="py-4 px-6 rounded-2xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-bold text-sm transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </button>

        </div>

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

      </main>

      <Navbar />
    </div>
  );
};
