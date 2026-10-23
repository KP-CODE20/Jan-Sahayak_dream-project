import React from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';
import { Navbar } from '../common/Navbar';
import { 
  CheckCircle2, 
  AlertTriangle, 
  ArrowLeft, 
  ArrowRight, 
  FileCheck, 
  PenTool, 
  ShieldCheck, 
  User, 
  Building2, 
  MapPin, 
  Phone, 
  CreditCard,
  Volume2
} from 'lucide-react';
import { playChime } from '../../utils/speech';

export const FinalReviewScreen: React.FC = () => {
  const { 
    userProfile, 
    aiSuggestions, 
    manualSignatureStatus, 
    signatureCanvasData,
    selectedLanguage, 
    navigateTo, 
    readAloud,
    seniorMode 
  } = useApp();

  const isHindi = selectedLanguage === 'hi';

  const handleComplete = () => {
    playChime('success');
    navigateTo('form-completed');
  };

  const handleEdit = () => {
    navigateTo('form-filling');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 flex flex-col justify-between">
      <Header title="Final Review" showBack={true} />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Step Progress Tracker */}
        <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-2">
            <span className="text-[#173B57] font-bold">Step 5 of 5: Final Review & Confirmation</span>
            <span className="text-emerald-700 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Ready to Complete
            </span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-[#173B57] via-[#159A9C] to-emerald-500 w-full h-full rounded-full"></div>
          </div>
          <div className="flex items-center justify-between text-[10px] sm:text-xs text-slate-400 mt-2 font-medium">
            <span className="text-emerald-700 font-bold">1. Capture ✓</span>
            <span className="text-emerald-700 font-bold">2. AI Analyse ✓</span>
            <span className="text-emerald-700 font-bold">3. Verify ✓</span>
            <span className="text-emerald-700 font-bold">4. Manual Sign ✓</span>
            <span className="text-[#173B57] font-extrabold bg-[#159A9C]/10 text-[#159A9C] px-2 py-0.5 rounded-full">5. Final Review</span>
          </div>
        </div>

        {/* Title & Guidance Header */}
        <div className="space-y-2">
          <h2 className={`font-extrabold text-[#173B57] tracking-tight ${seniorMode ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'}`}>
            {isHindi ? 'फ़ॉर्म की अंतिम समीक्षा (Final Review)' : '✓ Final Review'}
          </h2>

          <p className="text-xs sm:text-sm text-slate-600">
            {isHindi 
              ? '“फ़ॉर्म पूरा करने से पहले कृपया सभी जानकारियों को ध्यानपूर्वक जांच लें।”'
              : '“Please check all information carefully before completing your form.”'}
          </p>

          {/* Mandatory Verification Warning Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-white border border-amber-300 text-amber-950 space-y-1.5">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-extrabold text-xs sm:text-sm">
                  “Verify with your bank/official government portal before submission.”
                </p>
                <p className="text-[11px] sm:text-xs text-amber-900 leading-relaxed">
                  “Banking requirements and government procedures may change. Always confirm important information through an official source. Jan Sahayak is an assistance tool, not a replacement for official bank or government services.”
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* STRUCTURED REVIEW CARDS */}
        <div className="space-y-4">
          
          {/* Card 1: Personal Information */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-indigo-50 text-[#173B57] flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                <h3 className="font-extrabold text-sm text-[#173B57]">
                  {isHindi ? '1. व्यक्तिगत विवरण (Personal Information)' : '1. Personal Information'}
                </h3>
              </div>
              <span className="text-emerald-700 text-xs font-bold bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Verified
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 bg-slate-50 rounded-xl">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Applicant Full Name</span>
                <span className="font-bold text-slate-900 text-sm">{userProfile.name || 'Kanak Pandey'}</span>
              </div>

              <div className="p-2.5 bg-slate-50 rounded-xl">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Date of Birth & Gender</span>
                <span className="font-bold text-slate-900 text-sm">{userProfile.dob || '12/05/2007'} • Female</span>
              </div>

              <div className="p-2.5 bg-slate-50 rounded-xl sm:col-span-2">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Residential Address</span>
                <span className="font-semibold text-slate-900 text-xs">
                  {userProfile.address || 'Plot 42, Shanti Nagar, Station Road, Kolkata - 700001'}
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Bank & Account Details */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-teal-50 text-[#159A9C] flex items-center justify-center">
                  <Building2 className="w-4 h-4" />
                </div>
                <h3 className="font-extrabold text-sm text-[#173B57]">
                  {isHindi ? '2. बैंक विवरण (Bank Information)' : '2. Bank Information'}
                </h3>
              </div>
              <span className="text-emerald-700 text-xs font-bold bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Verified
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-2.5 bg-slate-50 rounded-xl">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Target Account No.</span>
                <span className="font-mono font-bold text-slate-900 text-xs sm:text-sm">XXXXXXXX4582</span>
              </div>

              <div className="p-2.5 bg-slate-50 rounded-xl">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Branch IFSC Code</span>
                <span className="font-mono font-bold text-slate-900 text-xs sm:text-sm">SBIN0000001</span>
              </div>

              <div className="p-2.5 bg-slate-50 rounded-xl">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Target Branch</span>
                <span className="font-semibold text-slate-900 text-xs">Kolkata Main Branch</span>
              </div>
            </div>
          </div>

          {/* Card 3: Form Requirements & Manual Signature Verification */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-amber-50 text-[#F4A340] flex items-center justify-center">
                  <PenTool className="w-4 h-4" />
                </div>
                <h3 className="font-extrabold text-sm text-[#173B57]">
                  {isHindi ? '3. हस्ताक्षर एवं औपचारिकताएं (Signature & Compliance)' : '3. Form Requirements & Signature'}
                </h3>
              </div>
              <span className="text-emerald-700 text-xs font-bold bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Manual Compliance OK
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-200 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-emerald-950 block">All Required Fields Completed</span>
                  <span className="text-[11px] text-emerald-800">Name, DOB, Address, KYC classification all confirmed.</span>
                </div>
              </div>

              <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-200 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-emerald-950 block">Manual Signature Verified</span>
                  <span className="text-[11px] text-emerald-800">
                    {manualSignatureStatus === 'signed_manually' 
                      ? 'Manually drawn by applicant on touchscreen.' 
                      : 'Physical pen signature at bank counter specified.'}
                  </span>
                </div>
              </div>
            </div>

            {/* Signature Preview Thumbnail if drawn */}
            {signatureCanvasData && (
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">Applicant Manual Signature:</span>
                <div className="h-10 px-4 bg-white rounded border border-slate-300 flex items-center">
                  <img src={signatureCanvasData} alt="Applicant manual signature" className="h-8 object-contain" />
                </div>
              </div>
            )}
          </div>

        </div>

        {/* BOTTOM ACTION BUTTONS: [Edit Form] vs [✓ Review & Complete Form] */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={handleEdit}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>← Edit Form</span>
          </button>

          {/* Explicitly "Review & Complete Form", NOT "Submit" */}
          <button
            onClick={handleComplete}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-100" />
            <span>✓ Review & Complete Form</span>
          </button>
        </div>

      </main>

      <Navbar />
    </div>
  );
};
