import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';
import { Navbar } from '../common/Navbar';
import { Footer } from '../common/Footer';
import { 
  User, 
  ShieldCheck, 
  MapPin, 
  Lock, 
  BookOpen, 
  CheckCircle2, 
  Users,
  Presentation,
  ArrowRight,
  Trash2,
  RotateCcw,
  Sparkles,
  Edit3,
  CreditCard,
  Building,
  FileCheck,
  AlertTriangle,
  X,
  Save,
  Phone,
  Mail,
  Calendar,
  Check
} from 'lucide-react';
import { playChime } from '../../utils/speech';
import { DemoUserProfile } from '../../types';

export const ProfileScreen: React.FC = () => {
  const { 
    userProfile, 
    updateUserProfile, 
    isDataDeleted,
    deleteUserData,
    restoreDemoData,
    selectedLanguage, 
    navigateTo, 
    openPresentation, 
    seniorMode 
  } = useApp();

  const isHindi = selectedLanguage === 'hi';
  const [activeCategory, setActiveCategory] = useState<'all' | 'personal' | 'identity' | 'banking' | 'additional'>('all');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editFormData, setEditFormData] = useState<DemoUserProfile>(userProfile);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [saveToast, setSaveToast] = useState<boolean>(false);

  const demoProfiles = [
    {
      name: 'Kanak Pandey',
      fatherOrSpouseName: 'Rajesh Kumar Pandey',
      guardianName: 'Rajesh Kumar Pandey',
      dob: '12/05/2007',
      gender: 'Female',
      mobile: '98301 23456',
      maskedMobile: '98301 •••••',
      email: 'kanak.pandey.demo@example.com',
      address: 'Plot 42, Shanti Nagar, Station Road',
      city: 'Kolkata',
      state: 'West Bengal',
      pincode: '700001',
      pan: 'XXXXX1234X',
      maskedPan: 'XXXXX1234X',
      aadhaarNumber: 'XXXX XXXX 2381',
      maskedAadhaar: 'XXXX XXXX 2381',
      bankName: 'State Bank of India (SBI)',
      accountNumber: 'XXXXXXXX4582',
      maskedBankAccount: 'XXXXXXXX4582',
      ifscCode: 'SBIN0000001',
      branchName: 'Kolkata Main Branch (0001)',
      accountType: 'Savings Bank Account (Individual)',
      nomineeName: 'Sunita Devi',
      nomineeRelation: 'Mother',
      nomineeDob: '20/08/1978',
      occupation: 'Student / First-time Banking User',
      annualIncome: '₹ 1,20,000',
      maritalStatus: 'Unmarried',
      initialDeposit: '₹ 1,000 (Cash)',
      documentsAvailable: {
        panCard: true,
        aadhaarCard: true,
        voterId: true,
        photographs: true,
        electricityBill: true,
        rationCard: true,
        incomeCertificate: false
      }
    },
    {
      name: 'Ramesh Chandra Patel',
      fatherOrSpouseName: 'Late Harish Patel',
      guardianName: 'Late Harish Patel',
      dob: '12/05/1968',
      gender: 'Male',
      mobile: '94150 78901',
      maskedMobile: '94150 •••••',
      email: 'ramesh.patel.demo@example.com',
      address: 'House No 42, Anand Nagar, G.T. Road',
      city: 'Kolkata',
      state: 'West Bengal',
      pincode: '700028',
      pan: 'ABCDE1234F',
      maskedPan: 'XXXXX1234F',
      aadhaarNumber: 'XXXX XXXX 4892',
      maskedAadhaar: 'XXXX XXXX 4892',
      bankName: 'Punjab National Bank (PNB)',
      accountNumber: 'XXXXXXXX9910',
      maskedBankAccount: 'XXXXXXXX9910',
      ifscCode: 'PUNB0024000',
      branchName: 'Dum Dum Branch (0024)',
      accountType: 'Savings Account (Farmer / Small Business)',
      nomineeName: 'Sunita Patel',
      nomineeRelation: 'Wife',
      nomineeDob: '15/03/1972',
      occupation: 'Small Business / Agriculture',
      annualIncome: '₹ 2,40,000',
      maritalStatus: 'Married',
      initialDeposit: '₹ 500 (Cash)',
      documentsAvailable: {
        panCard: true,
        aadhaarCard: true,
        voterId: true,
        photographs: true,
        electricityBill: true,
        rationCard: true,
        incomeCertificate: true
      }
    },
    {
      name: 'Lakshmi Narayanan',
      fatherOrSpouseName: 'S. Narayanan',
      guardianName: 'S. Narayanan',
      dob: '24/09/1954',
      gender: 'Female',
      mobile: '94440 56789',
      maskedMobile: '94440 •••••',
      email: 'lakshmi.narayanan.demo@example.com',
      address: 'Plot 18, Temple View Layout, Mylapore',
      city: 'Chennai',
      state: 'Tamil Nadu',
      pincode: '600004',
      pan: 'LMNPK7890Q',
      maskedPan: 'XXXXX7890Q',
      aadhaarNumber: 'XXXX XXXX 9912',
      maskedAadhaar: 'XXXX XXXX 9912',
      bankName: 'Canara Bank',
      accountNumber: 'XXXXXXXX7741',
      maskedBankAccount: 'XXXXXXXX7741',
      ifscCode: 'CNRB0001020',
      branchName: 'Mylapore Main Branch',
      accountType: 'Senior Citizen Savings Scheme',
      nomineeName: 'Karthik Narayanan',
      nomineeRelation: 'Son',
      nomineeDob: '10/11/1982',
      occupation: 'Retired Teacher / Senior Citizen',
      annualIncome: '₹ 3,60,000',
      maritalStatus: 'Widowed',
      initialDeposit: '₹ 5,000 (Cheque)',
      documentsAvailable: {
        panCard: true,
        aadhaarCard: true,
        voterId: true,
        photographs: true,
        electricityBill: true,
        rationCard: true,
        incomeCertificate: false
      }
    }
  ];

  const handleSwitchProfile = (p: typeof demoProfiles[0]) => {
    updateUserProfile(p);
    setEditFormData(p);
    playChime('success');
  };

  const handleOpenEdit = () => {
    setEditFormData(userProfile);
    setIsEditing(true);
    playChime('click');
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile(editFormData);
    setIsEditing(false);
    setSaveToast(true);
    playChime('success');
    setTimeout(() => setSaveToast(false), 3000);
  };

  const handleConfirmDelete = () => {
    deleteUserData();
    setShowDeleteModal(false);
    playChime('success');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 flex flex-col justify-between">
      <Header title="My Profile & Saved Data" showBack={true} />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Toast alert on save */}
        {saveToast && (
          <div className="bg-emerald-600 text-white px-4 py-3 rounded-xl shadow-lg flex items-center justify-between animate-fadeIn">
            <span className="text-sm font-semibold flex items-center gap-2">
              <Check className="w-4 h-4" /> Profile information successfully updated!
            </span>
            <button onClick={() => setSaveToast(false)} className="text-white/80 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 1: CREATE / MY PROFILE HERO DASHBOARD */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#173B57] to-[#159A9C] text-white flex items-center justify-center text-2xl font-bold shadow-md shrink-0">
                {userProfile.name ? userProfile.name.charAt(0) : 'U'}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h2 className={`font-extrabold text-[#173B57] ${seniorMode ? 'text-2xl' : 'text-lg sm:text-xl'}`}>
                    {userProfile.name || 'Demo User (Data Cleared)'}
                  </h2>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full shrink-0 ${
                    isDataDeleted ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {isDataDeleted ? 'Data Cleared' : '✓ Active Profile'}
                  </span>
                </div>
                
                <p className="text-xs text-[#667085] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{userProfile.city || '—'}, {userProfile.state || '—'} ({userProfile.pincode || '—'})</span>
                </p>
                
                <p className="text-xs font-semibold text-[#159A9C]">
                  {userProfile.occupation || 'No active profile'}
                </p>
              </div>
            </div>

            {/* Profile Action Buttons */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={handleOpenEdit}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-[#173B57] hover:bg-[#159A9C] text-white font-bold text-xs shadow-sm transition flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Profile</span>
              </button>

              <button
                onClick={() => navigateTo('privacy')}
                className="flex-1 sm:flex-none px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#173B57] font-bold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-emerald-600" />
                <span>Privacy & Data</span>
              </button>
            </div>
          </div>

          {/* 4 Category Status Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-3 border-t border-slate-100">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <div className="min-w-0">
                <span className="text-xs font-bold text-[#173B57] block truncate">Personal Info</span>
                <span className="text-[10px] text-slate-500">Name, DOB, Phone</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <div className="min-w-0">
                <span className="text-xs font-bold text-[#173B57] block truncate">Contact Info</span>
                <span className="text-[10px] text-slate-500">Address & PIN</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <div className="min-w-0">
                <span className="text-xs font-bold text-[#173B57] block truncate">Banking Info</span>
                <span className="text-[10px] text-slate-500">A/C, IFSC, Branch</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <div className="min-w-0">
                <span className="text-xs font-bold text-[#173B57] block truncate">Identity Info</span>
                <span className="text-[10px] text-slate-500">PAN & Aadhaar (Masked)</span>
              </div>
            </div>
          </div>

          {/* Privacy Guarantee Note */}
          <div className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-200 flex items-center justify-between text-xs text-emerald-800">
            <span className="flex items-center gap-2 font-medium">
              <Lock className="w-4 h-4 text-emerald-600 shrink-0" />
              🔐 Your data stays private — stored securely on your device, never shared without your permission.
            </span>
            <button
              onClick={() => navigateTo('privacy')}
              className="text-emerald-700 font-bold hover:underline shrink-0 ml-2"
            >
              Controls →
            </button>
          </div>
        </div>

        {/* PROFILE CATEGORIES TAB SELECTOR */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {[
            { id: 'all', label: 'All Details' },
            { id: 'personal', label: 'Personal Info' },
            { id: 'identity', label: 'Identity Info' },
            { id: 'banking', label: 'Banking Details' },
            { id: 'additional', label: 'Additional Info' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                activeCategory === tab.id
                  ? 'bg-[#173B57] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* STRUCTURED INFORMATION CARDS ACCORDING TO SPEC #2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* CATEGORY 1: PERSONAL INFORMATION */}
          {(activeCategory === 'all' || activeCategory === 'personal') && (
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3.5">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h3 className="font-bold text-sm text-[#173B57] flex items-center gap-2">
                  <User className="w-4 h-4 text-[#159A9C]" />
                  <span>1. Personal Information</span>
                </h3>
                <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md">Verified</span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">Full Name:</span>
                  <span className="font-bold text-slate-800">{userProfile.name || '—'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">Date of Birth:</span>
                  <span className="font-semibold text-slate-800">{userProfile.dob || '—'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">Gender:</span>
                  <span className="font-semibold text-slate-800">{userProfile.gender || '—'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">Father's / Guardian's Name:</span>
                  <span className="font-semibold text-slate-800">{userProfile.fatherOrSpouseName || '—'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">Mobile Number:</span>
                  <span className="font-mono font-bold text-[#173B57]">{userProfile.mobile || '—'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">Email Address:</span>
                  <span className="font-medium text-slate-700">{userProfile.email || '—'}</span>
                </div>
                <div className="py-1">
                  <span className="text-slate-500 block mb-0.5">Permanent Address:</span>
                  <span className="font-medium text-slate-800 block bg-slate-50 p-2 rounded-lg border border-slate-100">
                    {userProfile.address || '—'}, {userProfile.city || '—'}, {userProfile.state || '—'} - {userProfile.pincode || '—'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* CATEGORY 2: IDENTITY INFORMATION */}
          {(activeCategory === 'all' || activeCategory === 'identity') && (
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3.5">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h3 className="font-bold text-sm text-[#173B57] flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-[#159A9C]" />
                  <span>2. Identity Information (Masked)</span>
                </h3>
                <span className="text-[11px] text-slate-500 font-semibold bg-slate-100 px-2 py-0.5 rounded-md">Demo Masked</span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">PAN Number:</span>
                  <span className="font-mono font-bold text-slate-800">{userProfile.maskedPan || '—'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">Aadhaar (Masked):</span>
                  <span className="font-mono font-bold text-slate-800">{userProfile.maskedAadhaar || '—'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">Voter ID / Other ID:</span>
                  <span className="font-mono font-semibold text-slate-800">WB/04/123/456789</span>
                </div>
                <div className="bg-amber-50 p-2.5 rounded-xl border border-amber-200 text-[11px] text-amber-800 mt-2">
                  ⚠️ <strong className="font-bold">Prototype Safety Policy:</strong> Real PAN or Aadhaar numbers are never stored or displayed. Only dummy masked demo references are used.
                </div>
              </div>
            </div>
          )}

          {/* CATEGORY 3: BANKING INFORMATION */}
          {(activeCategory === 'all' || activeCategory === 'banking') && (
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3.5">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h3 className="font-bold text-sm text-[#173B57] flex items-center gap-2">
                  <Building className="w-4 h-4 text-[#159A9C]" />
                  <span>3. Banking Information</span>
                </h3>
                <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md">Active Bank</span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">Bank Name:</span>
                  <span className="font-bold text-slate-800">{userProfile.bankName || '—'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">Account Number:</span>
                  <span className="font-mono font-bold text-slate-800">{userProfile.maskedBankAccount || '—'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">IFSC Code:</span>
                  <span className="font-mono font-bold text-[#159A9C]">{userProfile.ifscCode || '—'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">Branch Name:</span>
                  <span className="font-medium text-slate-800">{userProfile.branchName || '—'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">Account Type:</span>
                  <span className="font-medium text-slate-800">{userProfile.accountType || '—'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">Nominee Name:</span>
                  <span className="font-bold text-slate-800">{userProfile.nomineeName || '—'} ({userProfile.nomineeRelation || '—'})</span>
                </div>
              </div>
            </div>
          )}

          {/* CATEGORY 4: ADDITIONAL INFORMATION */}
          {(activeCategory === 'all' || activeCategory === 'additional') && (
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3.5">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h3 className="font-bold text-sm text-[#173B57] flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-[#159A9C]" />
                  <span>4. Additional Information</span>
                </h3>
                <span className="text-[11px] text-slate-500 font-semibold bg-slate-100 px-2 py-0.5 rounded-md">KYC Data</span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">Occupation / Livelihood:</span>
                  <span className="font-semibold text-slate-800">{userProfile.occupation || '—'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">Annual Income Range:</span>
                  <span className="font-medium text-slate-800">{userProfile.annualIncome || '—'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">Marital Status:</span>
                  <span className="font-medium text-slate-800">{userProfile.maritalStatus || 'Unmarried'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">Initial Deposit Amount:</span>
                  <span className="font-bold text-emerald-700">{userProfile.initialDeposit || '₹ 1,000'}</span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* DANGER ZONE: DELETE MY DATA WITH REQUIRED CONFIRMATION DIALOG */}
        <div className="bg-rose-50/60 rounded-2xl p-5 border border-rose-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="font-bold text-sm text-rose-900 flex items-center gap-1.5">
              <Trash2 className="w-4 h-4 text-rose-600" />
              <span>Delete Saved Information</span>
            </h4>
            <p className="text-xs text-rose-700">
              Permanently wipe all locally stored profile details, bank records, and document caches from this browser.
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {isDataDeleted ? (
              <button
                onClick={restoreDemoData}
                className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restore Demo Profile</span>
              </button>
            ) : (
              <button
                onClick={() => setShowDeleteModal(true)}
                className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete My Data</span>
              </button>
            )}
          </div>
        </div>

        {/* SWITCH PERSONAS FOR COLLEGE DEMONSTRATION */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3">
          <div className="space-y-0.5">
            <span className="text-[10px] font-bold text-[#159A9C] uppercase">College Presentation Sandbox</span>
            <h3 className="text-xs font-bold text-[#173B57] uppercase tracking-wider flex items-center gap-1.5">
              <Users className="w-4 h-4 text-[#F4A340]" />
              <span>Switch User Persona (Demo Data)</span>
            </h3>
          </div>

          <div className="space-y-2">
            {demoProfiles.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSwitchProfile(p)}
                className={`w-full p-3 rounded-xl border text-left transition flex items-center justify-between gap-2 cursor-pointer ${
                  userProfile.name === p.name 
                    ? 'border-[#159A9C] bg-[#159A9C]/10 ring-1 ring-[#159A9C]' 
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="space-y-0.5 min-w-0 flex-1">
                  <span className="font-bold text-xs text-[#173B57] block truncate">{p.name}</span>
                  <span className="text-[11px] text-slate-500 block truncate">{p.occupation} • {p.city}, {p.state}</span>
                </div>
                {userProfile.name === p.name && (
                  <CheckCircle2 className="w-4 h-4 text-[#2E8B57] shrink-0" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* PRIMARY CTA: FILL A BLANK FORM NOW */}
        <div className="pt-2">
          <button
            onClick={() => navigateTo('blank-upload')}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#173B57] to-[#159A9C] text-white font-bold text-sm shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 group active:scale-[0.99] cursor-pointer"
          >
            <span>Proceed to Fill a Blank Form with Saved Profile</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </main>

      {/* EDIT PROFILE MODAL DRAWER */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-4 bg-[#173B57] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-[#F4A340]" />
                <h3 className="font-bold text-sm">Edit Saved Profile Information</h3>
              </div>
              <button 
                onClick={() => setIsEditing(false)}
                className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="p-5 overflow-y-auto space-y-4 text-xs">
              <div className="space-y-3">
                <h4 className="font-bold text-[#173B57] border-b pb-1 text-xs">1. Personal Information</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-600 font-medium mb-1">Full Name</label>
                    <input 
                      type="text" 
                      value={editFormData.name} 
                      onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                      className="w-full p-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#159A9C]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-medium mb-1">Father's / Guardian's Name</label>
                    <input 
                      type="text" 
                      value={editFormData.fatherOrSpouseName} 
                      onChange={(e) => setEditFormData({ ...editFormData, fatherOrSpouseName: e.target.value })}
                      className="w-full p-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#159A9C]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-medium mb-1">Date of Birth (DD/MM/YYYY)</label>
                    <input 
                      type="text" 
                      value={editFormData.dob} 
                      onChange={(e) => setEditFormData({ ...editFormData, dob: e.target.value })}
                      className="w-full p-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#159A9C]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-medium mb-1">Gender</label>
                    <select 
                      value={editFormData.gender} 
                      onChange={(e) => setEditFormData({ ...editFormData, gender: e.target.value })}
                      className="w-full p-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#159A9C]"
                    >
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-600 font-medium mb-1">Mobile Number</label>
                    <input 
                      type="text" 
                      value={editFormData.mobile} 
                      onChange={(e) => setEditFormData({ ...editFormData, mobile: e.target.value })}
                      className="w-full p-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#159A9C]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-medium mb-1">Email</label>
                    <input 
                      type="email" 
                      value={editFormData.email} 
                      onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                      className="w-full p-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#159A9C]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-600 font-medium mb-1">Residential Address</label>
                  <textarea 
                    rows={2}
                    value={editFormData.address} 
                    onChange={(e) => setEditFormData({ ...editFormData, address: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#159A9C]"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-slate-600 font-medium mb-1">City</label>
                    <input 
                      type="text" 
                      value={editFormData.city} 
                      onChange={(e) => setEditFormData({ ...editFormData, city: e.target.value })}
                      className="w-full p-2 border border-slate-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-medium mb-1">State</label>
                    <input 
                      type="text" 
                      value={editFormData.state} 
                      onChange={(e) => setEditFormData({ ...editFormData, state: e.target.value })}
                      className="w-full p-2 border border-slate-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-medium mb-1">PIN Code</label>
                    <input 
                      type="text" 
                      value={editFormData.pincode} 
                      onChange={(e) => setEditFormData({ ...editFormData, pincode: e.target.value })}
                      className="w-full p-2 border border-slate-300 rounded-lg font-mono font-bold"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <h4 className="font-bold text-[#173B57] border-b pb-1 text-xs">2. Banking & Nominee Details</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-600 font-medium mb-1">Bank Name</label>
                    <input 
                      type="text" 
                      value={editFormData.bankName} 
                      onChange={(e) => setEditFormData({ ...editFormData, bankName: e.target.value })}
                      className="w-full p-2 border border-slate-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-medium mb-1">IFSC Code</label>
                    <input 
                      type="text" 
                      value={editFormData.ifscCode} 
                      onChange={(e) => setEditFormData({ ...editFormData, ifscCode: e.target.value })}
                      className="w-full p-2 border border-slate-300 rounded-lg font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-medium mb-1">Nominee Name</label>
                    <input 
                      type="text" 
                      value={editFormData.nomineeName} 
                      onChange={(e) => setEditFormData({ ...editFormData, nomineeName: e.target.value })}
                      className="w-full p-2 border border-slate-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-medium mb-1">Nominee Relation</label>
                    <input 
                      type="text" 
                      value={editFormData.nomineeRelation} 
                      onChange={(e) => setEditFormData({ ...editFormData, nomineeRelation: e.target.value })}
                      className="w-full p-2 border border-slate-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#159A9C] hover:bg-[#117A7C] text-white font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Save className="w-4 h-4" /> Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONFIRMATION DIALOG MODAL: DELETE MY DATA (SPEC #3) */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-scaleUp">
            <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1.5">
              <h3 className="font-bold text-base text-[#173B57]">
                Are you sure you want to delete your saved information?
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                This will clear all personal details, bank references, and local storage data. You can restore sample demo data at any time.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition shadow-sm cursor-pointer"
              >
                Delete My Data
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
      <Navbar />
    </div>
  );
};
