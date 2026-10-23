import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { WelcomeScreen } from './components/screens/WelcomeScreen';
import { LanguageSelectScreen } from './components/screens/LanguageSelectScreen';
import { HomeScreen } from './components/screens/HomeScreen';
import { BlankFormUploadScreen } from './components/screens/BlankFormUploadScreen';
import { FormUnderstandingScreen } from './components/screens/FormUnderstandingScreen';
import { ReviewAISuggestionsScreen } from './components/screens/ReviewAISuggestionsScreen';
import { FormFillingScreen } from './components/screens/FormFillingScreen';
import { FinalVerificationScreen } from './components/screens/FinalVerificationScreen';
import { VoiceAssistantScreen } from './components/screens/VoiceAssistantScreen';
import { BankingServicesScreen } from './components/screens/BankingServicesScreen';
import { ServiceDetailsScreen } from './components/screens/ServiceDetailsScreen';
import { DocumentChecklistScreen } from './components/screens/DocumentChecklistScreen';
import { BankVisitPlannerScreen } from './components/screens/BankVisitPlannerScreen';
import { GovernmentSchemesScreen } from './components/screens/GovernmentSchemesScreen';
import { SchemeDetailsScreen } from './components/screens/SchemeDetailsScreen';
import { SchemeWizardScreen } from './components/screens/SchemeWizardScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { PrivacyDataScreen } from './components/screens/PrivacyDataScreen';
import { InformationSourcesScreen } from './components/screens/InformationSourcesScreen';
import { SettingsScreen } from './components/screens/SettingsScreen';
import { AdminScreen } from './components/screens/AdminScreen';
import { PresentationModal } from './components/common/PresentationModal';
import { SupabaseStatusModal } from './components/common/SupabaseStatusModal';
import { Presentation, Database } from 'lucide-react';

const MainScreenRouter: React.FC = () => {
  const { currentScreen, openPresentation, seniorMode, supabaseModalOpen, setSupabaseModalOpen } = useApp();

  const renderActiveScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen />;
      case 'language':
        return <LanguageSelectScreen />;
      case 'home':
        return <HomeScreen />;
      case 'blank-upload':
      case 'form-scanner':
        return <BlankFormUploadScreen />;
      case 'form-understanding':
      case 'form-explanation':
        return <FormUnderstandingScreen />;
      case 'ai-review':
        return <ReviewAISuggestionsScreen />;
      case 'form-filling':
      case 'form-completed':
        return <FormFillingScreen />;
      case 'final-verification':
        return <FinalVerificationScreen />;
      case 'voice':
        return <VoiceAssistantScreen />;
      case 'services':
        return <BankingServicesScreen />;
      case 'service-details':
        return <ServiceDetailsScreen />;
      case 'document-checker':
        return <DocumentChecklistScreen />;
      case 'visit-planner':
        return <BankVisitPlannerScreen />;
      case 'privacy':
        return <PrivacyDataScreen />;
      case 'sources':
        return <InformationSourcesScreen />;
      case 'schemes':
        return <GovernmentSchemesScreen />;
      case 'scheme-details':
        return <SchemeDetailsScreen />;
      case 'scheme-wizard':
        return <SchemeWizardScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'settings':
        return <SettingsScreen />;
      case 'admin':
        return <AdminScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className={`min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-slate-800 antialiased ${seniorMode ? 'senior-mode text-base' : 'text-sm'}`}>
      
      {/* Main Application Container */}
      <div className="w-full min-h-screen bg-[#F8FAFC] flex flex-col relative">
        {renderActiveScreen()}
      </div>

      {/* Floating Presentation Deck Action for College Reviewers */}
      <div className="fixed bottom-18 sm:bottom-6 right-4 sm:right-6 z-50 flex items-center gap-2 no-print">
        <button
          onClick={openPresentation}
          className="px-4 py-2.5 rounded-full bg-gradient-to-r from-[#173B57] to-[#159A9C] text-white text-xs font-bold shadow-lg hover:shadow-xl border border-white/20 flex items-center gap-2 transition active:scale-95 group cursor-pointer"
        >
          <Presentation className="w-4 h-4 text-[#F4A340] group-hover:rotate-12 transition-transform" />
          <span className="hidden sm:inline">🎓 College Project Deck (Design Thinking)</span>
          <span className="sm:hidden">🎓 Project Deck</span>
        </button>
      </div>

      {/* Global Presentation Deck Modal */}
      <PresentationModal />

      {/* Global Supabase Cloud Backend Status Modal */}
      <SupabaseStatusModal 
        isOpen={supabaseModalOpen} 
        onClose={() => setSupabaseModalOpen(false)} 
      />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainScreenRouter />
    </AppProvider>
  );
}
