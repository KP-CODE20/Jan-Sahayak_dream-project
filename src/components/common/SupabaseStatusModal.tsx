import React, { useState, useEffect } from 'react';
import { 
  Database, 
  CheckCircle2, 
  RefreshCw, 
  Copy, 
  ExternalLink, 
  X, 
  Layers, 
  Zap, 
  AlertCircle, 
  Table,
  Check,
  Activity
} from 'lucide-react';
import { 
  SUPABASE_PROJECT_ID, 
  SUPABASE_URL, 
  SUPABASE_SETUP_SQL, 
  subscribeToSyncStatus, 
  testSupabaseConnection, 
  SyncStatus 
} from '../../services/supabaseClient';

interface SupabaseStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupabaseStatusModal: React.FC<SupabaseStatusModalProps> = ({ isOpen, onClose }) => {
  const [syncStatus, setSyncStatus] = useState<SyncStatus>({
    lastSyncedAt: null,
    totalSyncedCount: 0,
    isConnected: true,
    lastAction: 'Ready',
    error: null
  });

  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'tables' | 'sql'>('overview');

  useEffect(() => {
    const unsubscribe = subscribeToSyncStatus(setSyncStatus);
    return () => unsubscribe();
  }, []);

  if (!isOpen) return null;

  const handleTestConnection = async () => {
    setTesting(true);
    setTestResult(null);
    try {
      const res = await testSupabaseConnection();
      setTestResult(res);
    } catch (e) {
      setTestResult({ success: false, message: String(e) });
    } finally {
      setTesting(false);
    }
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SETUP_SQL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const tables = [
    { name: 'jan_sahayak_activities', desc: 'App usage, screen navigation, user session tracking', icon: '📊' },
    { name: 'jan_sahayak_profiles', desc: 'User profiles, personal & masked bank info, documents status', icon: '👤' },
    { name: 'jan_sahayak_form_submissions', desc: 'Completed & verified handwritten bank form records', icon: '📄' },
    { name: 'jan_sahayak_visit_plans', desc: 'Prepared bank branch visit checklists & schedules', icon: '🏦' },
    { name: 'jan_sahayak_scheme_inquiries', desc: 'Government scheme eligibility checks & queries', icon: '🏛️' },
    { name: 'jan_sahayak_voice_logs', desc: 'Voice assistant multi-turn queries & responses', icon: '🎙️' },
    { name: 'jan_sahayak_document_checklists', desc: 'Readiness checklists for banking services & KYC', icon: '📋' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-slate-200 flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#173B57] via-[#173B57] to-[#159A9C] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300 shadow-inner">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base sm:text-lg">Supabase Backend Connected</h3>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-400/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Live
                </span>
              </div>
              <p className="text-xs text-emerald-100/80 font-mono">
                Project ID: {SUPABASE_PROJECT_ID}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-5 pt-2 gap-2 text-xs font-bold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-2.5 px-3 border-b-2 transition ${
              activeTab === 'overview'
                ? 'border-[#159A9C] text-[#173B57]'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            Sync Overview
          </button>
          <button
            onClick={() => setActiveTab('tables')}
            className={`pb-2.5 px-3 border-b-2 transition ${
              activeTab === 'tables'
                ? 'border-[#159A9C] text-[#173B57]'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            Backend Tables (7)
          </button>
          <button
            onClick={() => setActiveTab('sql')}
            className={`pb-2.5 px-3 border-b-2 transition ${
              activeTab === 'sql'
                ? 'border-[#159A9C] text-[#173B57]'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            SQL Setup Script
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1 text-slate-700">
          
          {activeTab === 'overview' && (
            <div className="space-y-4">
              {/* Project Card */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Connected Endpoint</span>
                  <a
                    href={`https://supabase.com/dashboard/project/${SUPABASE_PROJECT_ID}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-bold text-[#159A9C] hover:underline flex items-center gap-1"
                  >
                    <span>Open Supabase Dashboard</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div className="p-2.5 bg-white rounded-xl border border-slate-200 font-mono text-xs text-slate-800 break-all">
                  {SUPABASE_URL}
                </div>
              </div>

              {/* Realtime Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3.5 bg-emerald-50/70 rounded-2xl border border-emerald-200 space-y-1">
                  <span className="text-[11px] font-bold text-emerald-800 uppercase block">Connection</span>
                  <div className="flex items-center gap-1.5 text-sm font-extrabold text-emerald-900">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Active</span>
                  </div>
                </div>

                <div className="p-3.5 bg-sky-50/70 rounded-2xl border border-sky-200 space-y-1">
                  <span className="text-[11px] font-bold text-sky-800 uppercase block">Events Synced</span>
                  <div className="flex items-center gap-1.5 text-sm font-extrabold text-sky-900">
                    <Activity className="w-4 h-4 text-sky-600" />
                    <span>{syncStatus.totalSyncedCount} Events</span>
                  </div>
                </div>

                <div className="p-3.5 bg-amber-50/70 rounded-2xl border border-amber-200 space-y-1 col-span-2 sm:col-span-1">
                  <span className="text-[11px] font-bold text-amber-800 uppercase block">Last Synced Event</span>
                  <div className="text-xs font-bold text-amber-900 truncate">
                    {syncStatus.lastAction || 'App Active'}
                  </div>
                </div>
              </div>

              {/* What gets saved */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
                <h4 className="font-bold text-xs text-[#173B57] uppercase tracking-wider flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-[#F4A340]" />
                  <span>Automatic Supabase Backend Logging</span>
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Whenever users interact with Jan Sahayak, events are automatically saved directly to your Supabase tables:
                </p>
                <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                  <li><strong className="text-slate-800">User Profiles:</strong> Saved and synced when editing personal, banking, or nominee details.</li>
                  <li><strong className="text-slate-800">Form Submissions:</strong> Saved when generating, verifying, or downloading bank forms.</li>
                  <li><strong className="text-slate-800">Branch Visit Plans:</strong> Saved when preparing checklist and branch visit schedules.</li>
                  <li><strong className="text-slate-800">Voice Queries:</strong> Spoken multi-turn conversations logged for analytics.</li>
                  <li><strong className="text-slate-800">Scheme Inquiries:</strong> Welfare scheme eligibility checks and user selections.</li>
                </ul>
              </div>

              {/* Test Button & Result */}
              <div className="pt-1 flex flex-col gap-2">
                <button
                  onClick={handleTestConnection}
                  disabled={testing}
                  className="w-full py-3 px-4 rounded-xl bg-[#173B57] hover:bg-[#159A9C] text-white font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-98 disabled:opacity-50"
                >
                  <RefreshCw className={`w-4 h-4 ${testing ? 'animate-spin' : ''}`} />
                  <span>{testing ? 'Testing Connection to Supabase...' : 'Test Connection & Ping Supabase'}</span>
                </button>

                {testResult && (
                  <div className={`p-3.5 rounded-xl border text-xs flex items-start gap-2.5 ${
                    testResult.success ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-amber-50 border-amber-200 text-amber-900'
                  }`}>
                    {testResult.success ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <span className="font-bold block">{testResult.success ? 'Connection Successful!' : 'Status Notice'}</span>
                      <span>{testResult.message}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'tables' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-500">
                The Jan Sahayak application saves data across the following 7 Supabase backend tables:
              </p>
              <div className="space-y-2">
                {tables.map((tbl, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                    <span className="text-lg p-1.5 bg-white rounded-lg border border-slate-200">{tbl.icon}</span>
                    <div className="min-w-0 flex-1">
                      <div className="font-mono text-xs font-bold text-[#173B57]">{tbl.name}</div>
                      <div className="text-xs text-slate-600 mt-0.5">{tbl.desc}</div>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full shrink-0">
                      Ready
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'sql' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-500">
                  Run this in your Supabase SQL Editor if you haven't created the tables yet:
                </p>
                <button
                  onClick={handleCopySql}
                  className="px-3 py-1.5 rounded-lg bg-[#159A9C] hover:bg-[#173B57] text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-200" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied SQL!' : 'Copy SQL'}</span>
                </button>
              </div>

              <div className="p-3.5 bg-slate-900 text-emerald-300 font-mono text-[11px] rounded-2xl max-h-60 overflow-y-auto leading-relaxed border border-slate-800 select-all">
                <pre>{SUPABASE_SETUP_SQL}</pre>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
          <span className="text-slate-500 font-medium">Supabase Project: {SUPABASE_PROJECT_ID}</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#173B57] hover:bg-[#159A9C] text-white font-bold transition cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
