import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';
import { Footer } from '../common/Footer';
import { 
  ShieldCheck, 
  Lock, 
  UserCheck, 
  Database, 
  Activity, 
  FileText, 
  Users, 
  Mic, 
  Calendar, 
  ScrollText, 
  RefreshCw, 
  Download, 
  LogOut, 
  CheckCircle2, 
  AlertTriangle, 
  Search, 
  Filter, 
  Eye, 
  Clock, 
  ArrowLeft, 
  KeyRound, 
  ShieldAlert,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ExternalLink,
  Copy,
  Layers
} from 'lucide-react';
import { 
  getAdminSlotStatus, 
  registerSingleAdminAccount, 
  loginAdminUser, 
  getAdminSession, 
  logoutAdminUser,
  fetchAdminActivities,
  fetchAdminFormSubmissions,
  fetchAdminProfiles,
  fetchAdminVoiceLogs,
  fetchAdminVisitPlans,
  fetchAdminSchemeInquiries,
  fetchAdminChecklists,
  testSupabaseConnection,
  SUPABASE_SETUP_SQL,
  SUPABASE_PROJECT_ID,
  AdminUserRecord
} from '../../services/supabaseClient';
import { playChime } from '../../utils/speech';

export const AdminScreen: React.FC = () => {
  const { navigateTo, setSupabaseModalOpen } = useApp();

  // Slot and Auth State
  const [slotStatus, setSlotStatus] = useState<{ isOccupied: boolean; adminUser?: AdminUserRecord }>({ isOccupied: false });
  const [currentAdmin, setCurrentAdmin] = useState<AdminUserRecord | null>(null);
  const [isCheckingSlot, setIsCheckingSlot] = useState(true);

  // Form states for Registration (Single Slot)
  const [regFullName, setRegFullName] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regPin, setRegPin] = useState('');

  // Form states for Login
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // UI state
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<'activities' | 'forms' | 'profiles' | 'voice' | 'visits' | 'schemes' | 'database'>('activities');

  // Loaded Dashboard Data
  const [activities, setActivities] = useState<any[]>([]);
  const [formSubmissions, setFormSubmissions] = useState<any[]>([]);
  const [profiles, setProfiles] = useState<any[]>([]);
  const [voiceLogs, setVoiceLogs] = useState<any[]>([]);
  const [visitPlans, setVisitPlans] = useState<any[]>([]);
  const [schemeInquiries, setSchemeInquiries] = useState<any[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedActivityDetail, setSelectedActivityDetail] = useState<any | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [supabaseConnected, setSupabaseConnected] = useState(true);

  // Check Slot & Session on load
  const loadSlotAndSession = async () => {
    setIsCheckingSlot(true);
    try {
      const status = await getAdminSlotStatus();
      setSlotStatus(status);

      const session = getAdminSession();
      if (session && session.user) {
        setCurrentAdmin(session.user);
        loadAllAdminData();
      }
    } finally {
      setIsCheckingSlot(false);
    }
  };

  useEffect(() => {
    loadSlotAndSession();
    testSupabaseConnection().then(res => setSupabaseConnected(res.success));
  }, []);

  const loadAllAdminData = async () => {
    setIsLoadingData(true);
    try {
      const [acts, forms, profs, voice, visits, schemes] = await Promise.all([
        fetchAdminActivities(),
        fetchAdminFormSubmissions(),
        fetchAdminProfiles(),
        fetchAdminVoiceLogs(),
        fetchAdminVisitPlans(),
        fetchAdminSchemeInquiries()
      ]);

      setActivities(acts);
      setFormSubmissions(forms);
      setProfiles(profs);
      setVoiceLogs(voice);
      setVisitPlans(visits);
      setSchemeInquiries(schemes);
    } catch (err) {
      console.warn('Error loading admin data:', err);
    } finally {
      setIsLoadingData(false);
    }
  };

  // Handle Registration of the ONE master admin account
  const handleRegisterAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthSuccess(null);

    if (!regFullName.trim() || !regUsername.trim() || !regEmail.trim() || !regPassword) {
      setAuthError('Please fill in all required fields to register the admin account.');
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setAuthError('Passwords do not match. Please verify.');
      return;
    }

    if (regPassword.length < 6) {
      setAuthError('Password must be at least 6 characters.');
      return;
    }

    setIsSubmitting(true);
    playChime('click');

    try {
      const result = await registerSingleAdminAccount({
        fullName: regFullName,
        username: regUsername,
        email: regEmail,
        password: regPassword,
        pinCode: regPin.trim() || undefined,
      });

      if (!result.success) {
        setAuthError(result.message);
        playChime('click');
      } else {
        setAuthSuccess('Master Admin account created successfully! Slot is now permanently locked.');
        playChime('success');
        setCurrentAdmin(result.user || null);
        setSlotStatus({ isOccupied: true, adminUser: result.user });
        loadAllAdminData();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthSuccess(null);

    if (!loginIdentifier.trim() || !loginPassword) {
      setAuthError('Please enter your username/email and password.');
      return;
    }

    setIsSubmitting(true);
    playChime('click');

    try {
      const result = await loginAdminUser({
        usernameOrEmail: loginIdentifier,
        password: loginPassword,
      });

      if (!result.success) {
        setAuthError(result.message);
        playChime('click');
      } else {
        playChime('success');
        setCurrentAdmin(result.user || null);
        loadAllAdminData();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    playChime('click');
    logoutAdminUser();
    setCurrentAdmin(null);
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SETUP_SQL);
    setCopySuccess(true);
    playChime('click');
    setTimeout(() => setCopySuccess(false), 3000);
  };

  const handleExportJson = () => {
    const fullAuditDump = {
      exportedAt: new Date().toISOString(),
      adminUser: currentAdmin?.username,
      totalActivities: activities.length,
      activities,
      formSubmissions,
      profiles,
      voiceLogs,
      visitPlans,
      schemeInquiries
    };

    const blob = new Blob([JSON.stringify(fullAuditDump, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `jan_sahayak_audit_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    playChime('success');
  };

  // Filtered activities
  const filteredActivities = activities.filter(a => {
    if (!searchFilter) return true;
    const term = searchFilter.toLowerCase();
    return (
      (a.action_type && a.action_type.toLowerCase().includes(term)) ||
      (a.screen_name && a.screen_name.toLowerCase().includes(term)) ||
      (a.session_id && a.session_id.toLowerCase().includes(term)) ||
      (a.language && a.language.toLowerCase().includes(term))
    );
  });

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between">
      <Header title="Master Admin & Audit Panel" showLanguagePill={false} />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        
        {/* Navigation Breadcrumb / Top Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('home')}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition flex items-center gap-1.5 text-xs font-bold cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to App</span>
            </button>
            <div className="h-5 w-px bg-slate-200 hidden sm:block"></div>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#173B57] text-white flex items-center justify-center font-bold text-xs">
                <ShieldCheck className="w-4 h-4 text-[#F4A340]" />
              </div>
              <h1 className="font-extrabold text-[#173B57] text-base sm:text-lg">
                Jan Sahayak Administrative Control
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className={`px-2.5 py-1 rounded-full font-bold flex items-center gap-1.5 ${
              slotStatus.isOccupied 
                ? 'bg-amber-100 text-amber-800 border border-amber-200' 
                : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
            }`}>
              <span className="w-2 h-2 rounded-full bg-current"></span>
              {slotStatus.isOccupied ? 'Master Admin Slot: 1/1 Occupied' : 'Master Admin Slot: 0/1 Open'}
            </span>

            {currentAdmin && (
              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold border border-rose-200 transition flex items-center gap-1 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            )}
          </div>
        </div>

        {/* LOADING STATE */}
        {isCheckingSlot ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-2xs space-y-3">
            <RefreshCw className="w-8 h-8 text-[#159A9C] animate-spin mx-auto" />
            <p className="text-sm font-bold text-slate-700">Verifying Admin Account Slot & Permissions...</p>
          </div>
        ) : !currentAdmin ? (
          /* ========================================================================= */
          /* AUTHENTICATION / REGISTRATION VIEW (SINGLE SLOT ENFORCED) */
          /* ========================================================================= */
          <div className="max-w-xl mx-auto space-y-6">
            
            {/* Banner: Slot Policy */}
            <div className={`p-5 rounded-2xl border shadow-2xs space-y-2 ${
              slotStatus.isOccupied 
                ? 'bg-amber-50 border-amber-200 text-amber-900' 
                : 'bg-emerald-50 border-emerald-200 text-emerald-900'
            }`}>
              <div className="flex items-center gap-2 font-bold text-sm">
                {slotStatus.isOccupied ? <Lock className="w-5 h-5 text-amber-600" /> : <Sparkles className="w-5 h-5 text-emerald-600" />}
                <span>
                  {slotStatus.isOccupied 
                    ? 'Master Admin Slot Permanently Sealed (1/1 Created)' 
                    : 'Single Slot Admin Account Provisioning'}
                </span>
              </div>
              <p className="text-xs leading-relaxed">
                {slotStatus.isOccupied 
                  ? 'The single allowed administrator slot has been registered. Public admin creation is disabled. Please authenticate with your registered credentials.' 
                  : 'You have a single slot to create the master admin account for Jan Sahayak. Once registered, nobody else will ever be able to create an admin account.'}
              </p>
            </div>

            {/* Error / Success Feedback */}
            {authError && (
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{authError}</span>
              </div>
            )}

            {authSuccess && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{authSuccess}</span>
              </div>
            )}

            {/* 1. SINGLE SLOT REGISTRATION (When no admin exists) */}
            {!slotStatus.isOccupied ? (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <div className="space-y-1">
                  <span className="text-[11px] font-extrabold text-[#159A9C] uppercase tracking-wider">
                    One-Time Deployment Setup
                  </span>
                  <h2 className="text-xl font-bold text-[#173B57]">
                    Create Master Admin Account
                  </h2>
                  <p className="text-xs text-slate-500">
                    This account holds exclusive super-admin rights to inspect all logs, profiles, and form submissions.
                  </p>
                </div>

                <form onSubmit={handleRegisterAdmin} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Full Legal / Administrator Name *
                    </label>
                    <input
                      type="text"
                      value={regFullName}
                      onChange={e => setRegFullName(e.target.value)}
                      placeholder="e.g. Kasak Pandey"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#159A9C] focus:ring-2 focus:ring-[#159A9C]/20 text-sm outline-none transition"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Master Username *
                      </label>
                      <input
                        type="text"
                        value={regUsername}
                        onChange={e => setRegUsername(e.target.value)}
                        placeholder="e.g. admin_kasak"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#159A9C] focus:ring-2 focus:ring-[#159A9C]/20 text-sm outline-none transition font-mono"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Admin Email Address *
                      </label>
                      <input
                        type="email"
                        value={regEmail}
                        onChange={e => setRegEmail(e.target.value)}
                        placeholder="kasakpandey20@gmail.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#159A9C] focus:ring-2 focus:ring-[#159A9C]/20 text-sm outline-none transition"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Secure Master Password *
                      </label>
                      <input
                        type="password"
                        value={regPassword}
                        onChange={e => setRegPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#159A9C] focus:ring-2 focus:ring-[#159A9C]/20 text-sm outline-none transition"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Confirm Password *
                      </label>
                      <input
                        type="password"
                        value={regConfirmPassword}
                        onChange={e => setRegConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#159A9C] focus:ring-2 focus:ring-[#159A9C]/20 text-sm outline-none transition"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Quick 4-Digit Security PIN (Optional for Fast Login)
                    </label>
                    <input
                      type="password"
                      maxLength={6}
                      value={regPin}
                      onChange={e => setRegPin(e.target.value)}
                      placeholder="e.g. 2026"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#159A9C] focus:ring-2 focus:ring-[#159A9C]/20 text-sm outline-none transition font-mono tracking-widest"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#173B57] to-[#159A9C] text-white font-bold text-sm shadow-md hover:opacity-95 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Provisioning Single Admin Account...</span>
                      </>
                    ) : (
                      <>
                        <UserCheck className="w-4 h-4 text-[#F4A340]" />
                        <span>Create Single Admin & Permanently Lock Slot</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            ) : (
              /* 2. ADMIN LOGIN FORM (When admin slot is already occupied) */
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <div className="space-y-1 text-center">
                  <div className="w-12 h-12 rounded-2xl bg-[#173B57] text-white flex items-center justify-center mx-auto mb-2 shadow-xs">
                    <KeyRound className="w-6 h-6 text-[#F4A340]" />
                  </div>
                  <h2 className="text-xl font-bold text-[#173B57]">
                    Master Admin Authentication
                  </h2>
                  <p className="text-xs text-slate-500">
                    Enter the master credentials to enter the activity audit dashboard.
                  </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Username or Admin Email
                    </label>
                    <input
                      type="text"
                      value={loginIdentifier}
                      onChange={e => setLoginIdentifier(e.target.value)}
                      placeholder="admin username or email"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#159A9C] focus:ring-2 focus:ring-[#159A9C]/20 text-sm outline-none transition"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Password or PIN
                    </label>
                    <input
                      type="password"
                      value={loginPassword}
                      onChange={e => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#159A9C] focus:ring-2 focus:ring-[#159A9C]/20 text-sm outline-none transition"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#173B57] to-[#159A9C] text-white font-bold text-sm shadow-md hover:opacity-95 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Verifying Credentials...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4 text-[#F4A340]" />
                        <span>Login as Master Admin</span>
                      </>
                    )}
                  </button>
                </form>

                <div className="pt-4 border-t border-slate-100 text-center">
                  <span className="text-[11px] text-slate-400">
                    Registration is disabled because the master admin slot (1/1) is already registered.
                  </span>
                </div>
              </div>
            )}

          </div>
        ) : (
          /* ========================================================================= */
          /* AUTHENTICATED ADMIN DASHBOARD & ACTIVITY VIEWER */
          /* ========================================================================= */
          <div className="space-y-6">
            
            {/* Top Admin Status & Metrics Bar */}
            <div className="bg-gradient-to-r from-[#173B57] via-[#159A9C] to-[#173B57] text-white p-6 rounded-3xl shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#F4A340]">
                      Master Administrator Session
                    </span>
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-white/20 text-emerald-300">
                      Active
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black tracking-tight">
                    {currentAdmin.fullName}
                  </h2>
                  <p className="text-xs text-white/80 font-mono">
                    @{currentAdmin.username} • {currentAdmin.email}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={loadAllAdminData}
                    disabled={isLoadingData}
                    className="px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isLoadingData ? 'animate-spin' : ''}`} />
                    <span>Refresh Data</span>
                  </button>

                  <button
                    onClick={handleExportJson}
                    className="px-3.5 py-2 rounded-xl bg-[#F4A340] text-[#173B57] hover:bg-[#F4A340]/90 text-xs font-bold transition flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export Audit Report</span>
                  </button>
                </div>
              </div>

              {/* Quick Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
                <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-3 border border-white/10">
                  <span className="text-[10px] text-white/70 block uppercase font-bold">Total Actions</span>
                  <span className="text-xl font-extrabold text-white">{activities.length}</span>
                </div>
                <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-3 border border-white/10">
                  <span className="text-[10px] text-white/70 block uppercase font-bold">Forms Filled</span>
                  <span className="text-xl font-extrabold text-white">{formSubmissions.length}</span>
                </div>
                <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-3 border border-white/10">
                  <span className="text-[10px] text-white/70 block uppercase font-bold">User Profiles</span>
                  <span className="text-xl font-extrabold text-white">{profiles.length}</span>
                </div>
                <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-3 border border-white/10">
                  <span className="text-[10px] text-white/70 block uppercase font-bold">Voice Queries</span>
                  <span className="text-xl font-extrabold text-white">{voiceLogs.length}</span>
                </div>
                <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-3 border border-white/10">
                  <span className="text-[10px] text-white/70 block uppercase font-bold">Visit Plans</span>
                  <span className="text-xl font-extrabold text-white">{visitPlans.length}</span>
                </div>
                <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-3 border border-white/10">
                  <span className="text-[10px] text-white/70 block uppercase font-bold">Schemes Checked</span>
                  <span className="text-xl font-extrabold text-white">{schemeInquiries.length}</span>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-200">
              <button
                onClick={() => setActiveTab('activities')}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition flex items-center gap-2 cursor-pointer ${
                  activeTab === 'activities'
                    ? 'bg-[#173B57] text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-200/60'
                }`}
              >
                <Activity className="w-4 h-4" />
                <span>Live Activity Stream ({activities.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('forms')}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition flex items-center gap-2 cursor-pointer ${
                  activeTab === 'forms'
                    ? 'bg-[#173B57] text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-200/60'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Form Submissions ({formSubmissions.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('profiles')}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition flex items-center gap-2 cursor-pointer ${
                  activeTab === 'profiles'
                    ? 'bg-[#173B57] text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-200/60'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Profiles ({profiles.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('voice')}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition flex items-center gap-2 cursor-pointer ${
                  activeTab === 'voice'
                    ? 'bg-[#173B57] text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-200/60'
                }`}
              >
                <Mic className="w-4 h-4" />
                <span>Voice Queries ({voiceLogs.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('visits')}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition flex items-center gap-2 cursor-pointer ${
                  activeTab === 'visits'
                    ? 'bg-[#173B57] text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-200/60'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Visit Plans ({visitPlans.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('schemes')}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition flex items-center gap-2 cursor-pointer ${
                  activeTab === 'schemes'
                    ? 'bg-[#173B57] text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-200/60'
                }`}
              >
                <ScrollText className="w-4 h-4" />
                <span>Scheme Inquiries ({schemeInquiries.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('database')}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition flex items-center gap-2 cursor-pointer ${
                  activeTab === 'database'
                    ? 'bg-[#173B57] text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-200/60'
                }`}
              >
                <Database className="w-4 h-4 text-emerald-600" />
                <span>Database & SQL (8 Tables)</span>
              </button>
            </div>

            {/* TAB CONTENT AREA */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-2xs min-h-[400px]">
              
              {/* TAB 1: LIVE ACTIVITIES */}
              {activeTab === 'activities' && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-slate-800 text-sm sm:text-base">
                        Real-Time User Action Stream
                      </h3>
                      <p className="text-xs text-slate-500">
                        Tracks screen navigations, form conversions, voice queries, and profile changes.
                      </p>
                    </div>

                    <div className="relative">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        value={searchFilter}
                        onChange={e => setSearchFilter(e.target.value)}
                        placeholder="Search screen, action, language..."
                        className="pl-9 pr-4 py-1.5 rounded-xl border border-slate-200 text-xs outline-none focus:border-[#159A9C] w-full sm:w-64"
                      />
                    </div>
                  </div>

                  {filteredActivities.length === 0 ? (
                    <div className="py-12 text-center text-slate-400 text-xs">
                      No activity records found matching filter.
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="border-b border-slate-200 text-slate-500 font-bold bg-slate-50">
                            <th className="py-2.5 px-3">Timestamp</th>
                            <th className="py-2.5 px-3">Action Type</th>
                            <th className="py-2.5 px-3">Screen</th>
                            <th className="py-2.5 px-3">Language</th>
                            <th className="py-2.5 px-3">Senior Mode</th>
                            <th className="py-2.5 px-3">Session ID</th>
                            <th className="py-2.5 px-3 text-right">Details</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {filteredActivities.map((act, idx) => (
                            <tr key={act.id || idx} className="hover:bg-slate-50 transition">
                              <td className="py-2.5 px-3 text-slate-500 font-mono text-[11px] whitespace-nowrap">
                                {act.created_at ? new Date(act.created_at).toLocaleTimeString() : 'Just now'}
                              </td>
                              <td className="py-2.5 px-3 font-semibold text-[#173B57]">
                                <span className="px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 font-mono">
                                  {act.action_type || 'nav'}
                                </span>
                              </td>
                              <td className="py-2.5 px-3 font-medium text-slate-700">
                                {act.screen_name || 'home'}
                              </td>
                              <td className="py-2.5 px-3">
                                <span className="uppercase font-bold text-[10px] px-1.5 py-0.5 bg-indigo-50 text-indigo-700 rounded">
                                  {act.language || 'hi'}
                                </span>
                              </td>
                              <td className="py-2.5 px-3">
                                {act.senior_mode ? (
                                  <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">
                                    Enabled
                                  </span>
                                ) : (
                                  <span className="text-[10px] text-slate-400">Standard</span>
                                )}
                              </td>
                              <td className="py-2.5 px-3 font-mono text-[10px] text-slate-400 truncate max-w-[100px]">
                                {act.session_id}
                              </td>
                              <td className="py-2.5 px-3 text-right">
                                <button
                                  onClick={() => setSelectedActivityDetail(act)}
                                  className="p-1 text-[#159A9C] hover:bg-[#159A9C]/10 rounded cursor-pointer"
                                  title="Inspect JSON Payload"
                                >
                                  <Eye className="w-3.5 h-3.5 inline" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: FORM SUBMISSIONS */}
              {activeTab === 'forms' && (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm sm:text-base">
                      Generated Handwritten Forms ({formSubmissions.length})
                    </h3>
                    <p className="text-xs text-slate-500">
                      Audit trail of blank forms converted, mapped fields, handwriting styles, and downloads.
                    </p>
                  </div>

                  {formSubmissions.length === 0 ? (
                    <div className="py-12 text-center text-slate-400 text-xs">
                      No form submissions recorded yet. When users populate a form, it appears here automatically.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {formSubmissions.map((form, i) => (
                        <div key={form.id || i} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2.5">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <span className="text-[10px] font-bold text-[#159A9C] uppercase">{form.bank_name || 'Bank Form'}</span>
                              <h4 className="font-bold text-[#173B57] text-sm">{form.form_title}</h4>
                            </div>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                              Verified
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 bg-white p-2.5 rounded-xl border border-slate-100">
                            <div>
                              <span className="text-[10px] text-slate-400 block">Applicant:</span>
                              <span className="font-semibold">{form.applicant_name}</span>
                            </div>
                            <div>
                              <span className="text-[10px] text-slate-400 block">Style & Ink:</span>
                              <span className="font-mono">{form.handwriting_style} • {form.ink_color}</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                            <span>Fields: {Array.isArray(form.field_mappings) ? form.field_mappings.length : Object.keys(form.field_mappings || {}).length} populated</span>
                            <span>{form.submitted_at ? new Date(form.submitted_at).toLocaleDateString() : 'Today'}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: USER PROFILES */}
              {activeTab === 'profiles' && (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm sm:text-base">
                      Synced User Profiles ({profiles.length})
                    </h3>
                    <p className="text-xs text-slate-500">
                      Masked identity profiles created by users for 1-click form auto-filling.
                    </p>
                  </div>

                  {profiles.length === 0 ? (
                    <div className="py-12 text-center text-slate-400 text-xs">
                      No persistent user profiles saved yet.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {profiles.map((prof, i) => (
                        <div key={prof.id || i} className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2 text-xs">
                          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                            <span className="font-bold text-[#173B57] text-sm">{prof.full_name || 'Applicant'}</span>
                            <span className="font-mono text-[10px] text-slate-400">{prof.state || 'India'}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-slate-600">
                            <div><span className="text-slate-400">Mobile:</span> {prof.masked_mobile || prof.mobile}</div>
                            <div><span className="text-slate-400">Aadhaar:</span> {prof.aadhaar_masked || 'XXXX-XXXX-XXXX'}</div>
                            <div><span className="text-slate-400">Bank:</span> {prof.bank_name || 'SBI'}</div>
                            <div><span className="text-slate-400">Nominee:</span> {prof.nominee_name || 'None'}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: VOICE ASSISTANT LOGS */}
              {activeTab === 'voice' && (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm sm:text-base">
                      Multilingual Voice Queries & AI Responses ({voiceLogs.length})
                    </h3>
                    <p className="text-xs text-slate-500">
                      Spoken banking questions asked in regional languages with corresponding AI guidance.
                    </p>
                  </div>

                  {voiceLogs.length === 0 ? (
                    <div className="py-12 text-center text-slate-400 text-xs">
                      No voice logs recorded yet. Spoken conversations with the assistant appear here.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {voiceLogs.map((log, i) => (
                        <div key={log.id || i} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-[#173B57] flex items-center gap-1.5">
                              <Mic className="w-3.5 h-3.5 text-[#159A9C]" />
                              <span>"{log.user_query}"</span>
                            </span>
                            <span className="text-[10px] font-bold uppercase bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded">
                              {log.language || 'hi'}
                            </span>
                          </div>
                          <p className="text-slate-600 bg-white p-3 rounded-xl border border-slate-100 leading-relaxed">
                            {log.assistant_response}
                          </p>
                          <span className="text-[10px] text-slate-400 block text-right">
                            {log.created_at ? new Date(log.created_at).toLocaleString() : 'Recent'}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 5: BANK VISIT PLANS */}
              {activeTab === 'visits' && (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm sm:text-base">
                      Bank Branch Visit Itineraries ({visitPlans.length})
                    </h3>
                    <p className="text-xs text-slate-500">
                      User visit plans with assigned branch counter desks and verified checklist requirements.
                    </p>
                  </div>

                  {visitPlans.length === 0 ? (
                    <div className="py-12 text-center text-slate-400 text-xs">
                      No bank visit plans created yet.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {visitPlans.map((v, i) => (
                        <div key={v.id || i} className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2 text-xs">
                          <div className="flex items-start justify-between">
                            <h4 className="font-bold text-[#173B57]">{v.service_title}</h4>
                            <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-amber-100 text-amber-800">
                              {v.branch_name || 'Main Branch'}
                            </span>
                          </div>
                          <p className="text-slate-500 text-[11px]">
                            Planned Date: <span className="font-bold text-slate-700">{v.visit_date || 'Today'}</span>
                          </p>
                          <div className="text-[11px] text-slate-600">
                            Required Docs: {Array.isArray(v.required_documents) ? v.required_documents.join(', ') : 'Standard KYC'}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 6: GOVERNMENT SCHEME INQUIRIES */}
              {activeTab === 'schemes' && (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm sm:text-base">
                      Government Welfare Scheme Inquiries ({schemeInquiries.length})
                    </h3>
                    <p className="text-xs text-slate-500">
                      Eligibility wizard checks for PM-KISAN, Ayushman Bharat, PM Jan Dhan, APY, etc.
                    </p>
                  </div>

                  {schemeInquiries.length === 0 ? (
                    <div className="py-12 text-center text-slate-400 text-xs">
                      No scheme inquiries recorded yet.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {schemeInquiries.map((s, i) => (
                        <div key={s.id || i} className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2 text-xs">
                          <div className="flex items-center justify-between">
                            <h4 className="font-bold text-[#173B57]">{s.scheme_title}</h4>
                            <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-emerald-100 text-emerald-800 uppercase">
                              {s.eligibility_status || 'Eligible'}
                            </span>
                          </div>
                          <p className="text-slate-500 text-[11px]">
                            Category: {s.category || 'Welfare'} • Age Criteria: {s.user_age || '18-70'}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 7: DATABASE & SQL SCHEMA */}
              {activeTab === 'database' && (
                <div className="space-y-5">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-slate-800 text-sm sm:text-base flex items-center gap-2">
                        <Database className="w-4 h-4 text-emerald-600" />
                        <span>Supabase PostgreSQL Schema & Security Policy (8 Tables)</span>
                      </h3>
                      <p className="text-xs text-slate-500">
                        Project ID: <span className="font-mono font-bold text-slate-800">{SUPABASE_PROJECT_ID}</span>
                      </p>
                    </div>

                    <button
                      onClick={handleCopySql}
                      className="px-3 py-1.5 rounded-xl bg-[#173B57] hover:bg-[#159A9C] text-white text-xs font-bold transition flex items-center gap-1.5 shadow-2xs cursor-pointer"
                    >
                      {copySuccess ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copySuccess ? 'SQL Copied!' : 'Copy SQL Setup Script'}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="text-[10px] text-slate-400 block">Table 1:</span>
                      <span className="font-mono font-bold text-slate-800">jan_sahayak_activities</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="text-[10px] text-slate-400 block">Table 2:</span>
                      <span className="font-mono font-bold text-slate-800">jan_sahayak_profiles</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="text-[10px] text-slate-400 block">Table 3:</span>
                      <span className="font-mono font-bold text-slate-800">jan_sahayak_form_submissions</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="text-[10px] text-slate-400 block">Table 4:</span>
                      <span className="font-mono font-bold text-slate-800">jan_sahayak_visit_plans</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="text-[10px] text-slate-400 block">Table 5:</span>
                      <span className="font-mono font-bold text-slate-800">jan_sahayak_scheme_inquiries</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="text-[10px] text-slate-400 block">Table 6:</span>
                      <span className="font-mono font-bold text-slate-800">jan_sahayak_voice_logs</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="text-[10px] text-slate-400 block">Table 7:</span>
                      <span className="font-mono font-bold text-slate-800">jan_sahayak_document_checklists</span>
                    </div>
                    <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                      <span className="text-[10px] text-emerald-700 block">Table 8 (Admin):</span>
                      <span className="font-mono font-bold text-emerald-900">jan_sahayak_admin_users</span>
                    </div>
                  </div>

                  <div className="bg-slate-900 text-slate-200 rounded-2xl p-4 font-mono text-[11px] overflow-x-auto max-h-64 space-y-1">
                    <pre>{SUPABASE_SETUP_SQL}</pre>
                  </div>
                </div>
              )}

            </div>

          </div>
        )}

      </main>

      {/* JSON Inspector Modal */}
      {selectedActivityDetail && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4 border border-slate-200 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-[#173B57] text-sm flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#159A9C]" />
                <span>Activity JSON Payload</span>
              </h3>
              <button
                onClick={() => setSelectedActivityDetail(null)}
                className="text-slate-400 hover:text-slate-700 p-1 font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto bg-slate-900 text-emerald-400 font-mono text-xs p-4 rounded-2xl">
              <pre>{JSON.stringify(selectedActivityDetail, null, 2)}</pre>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setSelectedActivityDetail(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};
