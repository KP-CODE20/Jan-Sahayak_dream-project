import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  Lock, 
  FileText, 
  HelpCircle, 
  ExternalLink, 
  Sparkles, 
  GraduationCap, 
  ChevronRight,
  Database,
  UserCheck,
  Building2,
  HeartHandshake
} from 'lucide-react';
import { getLocalizedText } from '../../utils/i18n';
import { getAdminSlotStatus, SUPABASE_PROJECT_ID } from '../../services/supabaseClient';

export const Footer: React.FC = () => {
  const { 
    navigateTo, 
    selectedLanguage, 
    setPresentationModalOpen, 
    setSupabaseModalOpen,
    currentScreen 
  } = useApp();

  const [isAdminOccupied, setIsAdminOccupied] = useState<boolean>(false);

  useEffect(() => {
    getAdminSlotStatus().then(status => {
      setIsAdminOccupied(status.isOccupied);
    });
  }, [currentScreen]);

  return (
    <footer className="mt-12 pt-8 pb-32 border-t border-slate-200/80 bg-gradient-to-b from-slate-50/50 via-slate-100/70 to-slate-200/50 text-slate-600">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Top Grid: App Identity & Navigation Modules */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Col 1: Brand Info */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#173B57] to-[#159A9C] text-white flex items-center justify-center font-black text-sm shadow-xs">
                JS
              </div>
              <div>
                <span className="font-extrabold text-[#173B57] tracking-wider text-base">
                  JAN SAHAYAK
                </span>
                <span className="ml-1.5 px-2 py-0.5 text-[10px] font-bold rounded-full bg-[#F4A340]/20 text-[#173B57] border border-[#F4A340]/30">
                  AI-Powered Digital Inclusion
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
              Empowering rural citizens, seniors, and non-tech users across Bharat with auto handwriting form population, multilingual voice guidance, and verified banking services.
            </p>

            <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-400 font-medium">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Supabase Cloud Connected ({SUPABASE_PROJECT_ID})</span>
            </div>
          </div>

          {/* Col 2: Useful Links */}
          <div className="md:col-span-4 space-y-2.5">
            <h4 className="text-xs font-bold text-[#173B57] uppercase tracking-wider">
              Transparency & Rights
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => navigateTo('privacy')}
                  className="hover:text-[#159A9C] transition flex items-center gap-1.5 cursor-pointer text-slate-600"
                >
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Privacy Policy & Local Data Guarantee</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('sources')}
                  className="hover:text-[#159A9C] transition flex items-center gap-1.5 cursor-pointer text-slate-600"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                  <span>Regulatory Sources (RBI, NPCI, DBT)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setPresentationModalOpen(true)}
                  className="hover:text-[#159A9C] transition flex items-center gap-1.5 cursor-pointer text-slate-600"
                >
                  <GraduationCap className="w-3.5 h-3.5 text-[#F4A340]" />
                  <span>Design Thinking Case Study & Deck</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setSupabaseModalOpen(true)}
                  className="hover:text-[#159A9C] transition flex items-center gap-1.5 cursor-pointer text-slate-600"
                >
                  <Database className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Cloud Database Schema & Health</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Admin Single-Slot Portal Link (Requested in Footer) */}
          <div className="md:col-span-3 space-y-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#173B57] uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#159A9C]" />
                Admin Portal
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                isAdminOccupied 
                  ? 'bg-amber-100 text-amber-800' 
                  : 'bg-emerald-100 text-emerald-800'
              }`}>
                {isAdminOccupied ? '1 Slot Active' : '1 Slot Open'}
              </span>
            </div>

            <p className="text-[11px] text-slate-500 leading-snug">
              {isAdminOccupied 
                ? 'Authorized supervisor login to inspect live application audit trails, forms, and logs.' 
                : 'Initial single slot admin setup is currently open for the deployment owner.'}
            </p>

            <button
              onClick={() => navigateTo('admin')}
              className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-[#173B57] to-[#159A9C] hover:opacity-95 text-white font-bold text-xs shadow-xs transition flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>{isAdminOccupied ? 'Admin Login' : 'Create Master Admin (1 Slot)'}</span>
            </button>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Single Slot Notice */}
        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Jan Sahayak (जन सहायक) • Built for Digital Inclusion across Bharat</p>
          <div className="flex items-center gap-3">
            <span className="text-[11px]">Strict 1-Admin Master Policy Enforced</span>
            <span>•</span>
            <button
              onClick={() => navigateTo('admin')}
              className="text-[#173B57] hover:text-[#159A9C] font-semibold underline underline-offset-2 cursor-pointer"
            >
              Master Admin Access
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
