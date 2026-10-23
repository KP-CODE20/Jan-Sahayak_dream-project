import React, { forwardRef } from 'react';
import { BlankFormTemplate, DemoUserProfile, FieldMappingItem, HandwritingStyle, InkColor } from '../../types';
import { PenTool } from 'lucide-react';

export interface CompletedFormDocumentProps {
  activeBlankForm: BlankFormTemplate;
  userProfile: DemoUserProfile;
  fieldMappings: FieldMappingItem[];
  handwritingStyle?: HandwritingStyle;
  inkColor?: InkColor;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const CompletedFormDocument = forwardRef<HTMLDivElement, CompletedFormDocumentProps>(({
  activeBlankForm,
  userProfile,
  fieldMappings,
  handwritingStyle = 'neat',
  inkColor = 'blue',
  id = 'printable-form-canvas',
  className = '',
  style = {}
}, ref) => {
  const getHandwritingFontClass = () => {
    switch (handwritingStyle) {
      case 'neat':
        return 'font-handwriting-neat';
      case 'simple':
        return 'font-handwriting-simple';
      case 'formal':
        return 'font-handwriting-formal';
      default:
        return 'font-handwriting-neat';
    }
  };

  const getInkColorClass = () => {
    return inkColor === 'blue' ? 'text-blue-800' : 'text-slate-900';
  };

  // Helper to extract field value with fallback to profile
  const getFieldValue = (fieldKey: string, fallback: string = '') => {
    const item = fieldMappings.find((m) => 
      m.mappedProfileKey === fieldKey || 
      (m as any).profileFieldKey === fieldKey || 
      m.id.includes(fieldKey)
    );
    if (item) {
      if (item.userEditedValue !== undefined && item.userEditedValue !== '') return item.userEditedValue;
      if (item.profileValue) return item.profileValue;
    }
    return fallback;
  };

  const nameVal = getFieldValue('name', userProfile.name);
  const dobVal = getFieldValue('dob', userProfile.dob);
  const genderVal = getFieldValue('gender', userProfile.gender);
  const fatherVal = getFieldValue('fatherOrSpouseName', userProfile.fatherOrSpouseName);
  const mobileVal = getFieldValue('mobile', userProfile.mobile);
  const emailVal = getFieldValue('email', userProfile.email);
  const addressVal = getFieldValue('address', `${userProfile.address}, ${userProfile.city}, ${userProfile.state}`);
  const pincodeVal = getFieldValue('pincode', userProfile.pincode);
  const ifscVal = getFieldValue('ifscCode', userProfile.ifscCode);
  const nomineeVal = getFieldValue('nomineeName', userProfile.nomineeName);
  const nomineeRelVal = getFieldValue('nomineeRelation', userProfile.nomineeRelation);
  const initialDepositVal = getFieldValue('initialDeposit', userProfile.initialDeposit);

  return (
    <div 
      ref={ref}
      id={id}
      className={`bg-white rounded-2xl p-6 sm:p-10 border-2 border-slate-300 shadow-xl space-y-6 printable-content ${className}`}
      style={style}
    >
      {/* Official Bank Header */}
      <div className="border-b-2 border-slate-900 pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest block">
            REVISED OFFICIAL BANKING INSTRUMENT • CITIZEN ACCESS COPY
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-[#173B57] tracking-tight uppercase">
            {activeBlankForm.issuer}
          </h1>
          <p className="text-xs font-bold text-slate-700">
            {activeBlankForm.title} ({activeBlankForm.code})
          </p>
        </div>

        <div className="flex flex-col items-end gap-1 shrink-0">
          <div className="border-2 border-slate-900 px-3 py-1 text-center bg-white">
            <span className="font-mono text-xs font-extrabold text-slate-900">{activeBlankForm.code}</span>
          </div>
          <span className="text-[10px] text-slate-500 font-medium">Branch: {userProfile.branchName}</span>
        </div>
      </div>

      {/* SECTION 1: APPLICANT DETAILS (Filled in Simulated Natural Handwriting) */}
      <div className="space-y-4">
        <div className="bg-slate-900 text-white px-3 py-1 rounded text-xs font-bold uppercase tracking-wider flex items-center justify-between">
          <span>1. Personal & Contact Particulars</span>
          <span className="text-[10px] text-slate-300">Generated with Jan Sahayak Auto-Fill</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {/* Full Name */}
          <div className="border-b border-slate-400 pb-1 flex flex-col justify-end">
            <span className="text-[10px] font-bold text-slate-600 uppercase">1. Full Name of Applicant:</span>
            <span className={`text-base sm:text-lg font-bold pt-1 ${getHandwritingFontClass()} ${getInkColorClass()}`}>
              {nameVal}
            </span>
          </div>

          {/* Father/Guardian Name */}
          <div className="border-b border-slate-400 pb-1 flex flex-col justify-end">
            <span className="text-[10px] font-bold text-slate-600 uppercase">2. Father's / Guardian's Name:</span>
            <span className={`text-base sm:text-lg font-bold pt-1 ${getHandwritingFontClass()} ${getInkColorClass()}`}>
              {fatherVal}
            </span>
          </div>

          {/* Date of Birth in Digit Boxes */}
          <div className="border-b border-slate-400 pb-1 flex flex-col justify-end">
            <span className="text-[10px] font-bold text-slate-600 uppercase">3. Date of Birth (DD / MM / YYYY):</span>
            <div className="flex items-center gap-1.5 pt-1">
              {dobVal.split('').map((char, i) => (
                <span 
                  key={i} 
                  className={`w-6 h-7 border border-slate-700 flex items-center justify-center text-sm font-bold bg-slate-50/50 ${getHandwritingFontClass()} ${getInkColorClass()}`}
                >
                  {char}
                </span>
              ))}
            </div>
          </div>

          {/* Gender & Marital Status Checkboxes */}
          <div className="border-b border-slate-400 pb-1 flex flex-col justify-end">
            <span className="text-[10px] font-bold text-slate-600 uppercase">4. Gender & Status:</span>
            <div className="flex items-center gap-4 pt-1.5 text-xs font-semibold">
              <span className="flex items-center gap-1">
                <span className={`w-4 h-4 border border-slate-800 flex items-center justify-center font-bold text-xs ${getHandwritingFontClass()} ${getInkColorClass()}`}>
                  {genderVal === 'Male' ? '✓' : ''}
                </span> Male
              </span>
              <span className="flex items-center gap-1">
                <span className={`w-4 h-4 border border-slate-800 flex items-center justify-center font-bold text-xs ${getHandwritingFontClass()} ${getInkColorClass()}`}>
                  {genderVal === 'Female' ? '✓' : ''}
                </span> Female
              </span>
              <span className="flex items-center gap-1">
                <span className={`w-4 h-4 border border-slate-800 flex items-center justify-center font-bold text-xs ${getHandwritingFontClass()} ${getInkColorClass()}`}>
                  {genderVal === 'Other' ? '✓' : ''}
                </span> Other
              </span>
            </div>
          </div>

          {/* Mobile Number Digit Cells */}
          <div className="border-b border-slate-400 pb-1 flex flex-col justify-end">
            <span className="text-[10px] font-bold text-slate-600 uppercase">5. Registered Mobile Number:</span>
            <div className="flex items-center gap-1 pt-1">
              {mobileVal.replace(/\s+/g, '').split('').map((num, idx) => (
                <span 
                  key={idx} 
                  className={`w-5 h-7 border border-slate-700 flex items-center justify-center text-sm font-bold bg-slate-50/50 ${getHandwritingFontClass()} ${getInkColorClass()}`}
                >
                  {num}
                </span>
              ))}
            </div>
          </div>

          {/* Email ID */}
          <div className="border-b border-slate-400 pb-1 flex flex-col justify-end">
            <span className="text-[10px] font-bold text-slate-600 uppercase">6. E-mail Address:</span>
            <span className={`text-sm sm:text-base font-bold pt-1 ${getHandwritingFontClass()} ${getInkColorClass()}`}>
              {emailVal}
            </span>
          </div>
        </div>

        {/* Full Address Block */}
        <div className="border-b border-slate-400 pb-1 flex flex-col justify-end">
          <span className="text-[10px] font-bold text-slate-600 uppercase">7. Permanent Residential Address:</span>
          <span className={`text-base sm:text-lg font-bold pt-1 leading-snug ${getHandwritingFontClass()} ${getInkColorClass()}`}>
            {addressVal} — PIN: {pincodeVal}
          </span>
        </div>
      </div>

      {/* SECTION 2: BANKING & ACCOUNT PARAMETERS */}
      <div className="space-y-4 pt-2">
        <div className="bg-slate-900 text-white px-3 py-1 rounded text-xs font-bold uppercase tracking-wider">
          2. Account & Nomination Particulars (Form DA-1)
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          {/* Account / A/C Type */}
          <div className="border-b border-slate-400 pb-1">
            <span className="text-[10px] font-bold text-slate-600 uppercase">Account Type:</span>
            <span className={`text-sm font-bold block pt-1 ${getHandwritingFontClass()} ${getInkColorClass()}`}>
              {userProfile.accountType}
            </span>
          </div>

          {/* IFSC Code */}
          <div className="border-b border-slate-400 pb-1">
            <span className="text-[10px] font-bold text-slate-600 uppercase">Branch IFSC Code:</span>
            <span className={`text-base font-bold block pt-1 ${getHandwritingFontClass()} ${getInkColorClass()}`}>
              {ifscVal}
            </span>
          </div>

          {/* Initial Deposit */}
          <div className="border-b border-slate-400 pb-1">
            <span className="text-[10px] font-bold text-slate-600 uppercase">Initial Deposit:</span>
            <span className={`text-base font-bold block pt-1 ${getHandwritingFontClass()} ${getInkColorClass()}`}>
              {initialDepositVal}
            </span>
          </div>
        </div>

        {/* Nominee Details */}
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase">Nominee Full Name:</span>
            <span className={`text-base font-bold block pt-0.5 ${getHandwritingFontClass()} ${getInkColorClass()}`}>
              {nomineeVal}
            </span>
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase">Relationship with Applicant:</span>
            <span className={`text-base font-bold block pt-0.5 ${getHandwritingFontClass()} ${getInkColorClass()}`}>
              {nomineeRelVal}
            </span>
          </div>
        </div>
      </div>

      {/* SECTION 3: APPLICANT SIGNATURE BLOCK (STRICTLY BLANK AS PER SPEC #12 & #18) */}
      <div className="pt-3 border-t-2 border-slate-900">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-end">
          {/* Date and Place */}
          <div className="space-y-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-slate-600 uppercase">Date:</span>
              <span className={`text-sm font-bold border-b border-slate-700 px-3 ${getHandwritingFontClass()} ${getInkColorClass()}`}>
                {new Date().toLocaleDateString('en-IN')}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-slate-600 uppercase">Place:</span>
              <span className={`text-sm font-bold border-b border-slate-700 px-3 ${getHandwritingFontClass()} ${getInkColorClass()}`}>
                {userProfile.city}
              </span>
            </div>
          </div>

          {/* STRICT EMPTY SIGNATURE BOX */}
          <div className="border-2 border-dashed border-slate-800 rounded-xl p-4 bg-slate-50/50 flex flex-col items-center justify-center min-h-[110px] text-center relative">
            <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <PenTool className="w-4 h-4 text-indigo-700" />
              ✍️ Signature Required
            </span>
            <p className="text-[11px] text-slate-500 mt-1 max-w-xs leading-tight">
              Please physically sign inside this box with a ballpoint pen after printing.
            </p>
            <span className="text-[9px] font-mono text-slate-400 mt-2">
              [ AI Signature Generator Disabled for Safety ]
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

CompletedFormDocument.displayName = 'CompletedFormDocument';
