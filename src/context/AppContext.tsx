import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  AppScreen, 
  BankingService, 
  GovernmentScheme, 
  DemoUserProfile, 
  ConversationTurn, 
  FieldMappingItem, 
  InformationSourceItem,
  BlankFormTemplate,
  HandwritingStyle,
  InkColor
} from '../types';
import { BANKING_SERVICES } from '../data/bankingServices';
import { GOVERNMENT_SCHEMES } from '../data/schemes';
import { 
  DEMO_PREFILL_DATA, 
  BLANK_FORM_TEMPLATES, 
  INITIAL_FIELD_MAPPINGS, 
  OFFICIAL_INFORMATION_SOURCES 
} from '../data/forms';
import { speakText, stopSpeaking, playChime } from '../utils/speech';
import { 
  logAppActivityToSupabase, 
  saveUserProfileToSupabase, 
  saveDocumentChecklistToSupabase 
} from '../services/supabaseClient';

interface AppContextType {
  currentScreen: AppScreen;
  screenHistory: AppScreen[];
  navigateTo: (screen: AppScreen, options?: { replace?: boolean }) => void;
  goBack: () => void;
  selectedLanguage: string;
  setSelectedLanguage: (lang: string) => void;
  seniorMode: boolean;
  setSeniorMode: (enabled: boolean) => void;
  textSize: 'normal' | 'large';
  setTextSize: (size: 'normal' | 'large') => void;
  voiceAudioEnabled: boolean;
  setVoiceAudioEnabled: (enabled: boolean) => void;
  
  // Profile Management
  userProfile: DemoUserProfile;
  updateUserProfile: (data: Partial<DemoUserProfile>) => void;
  isDataDeleted: boolean;
  deleteUserData: () => void;
  restoreDemoData: () => void;
  
  // Blank Form Selection & Upload State
  activeBlankForm: BlankFormTemplate;
  setActiveBlankForm: (form: BlankFormTemplate) => void;
  uploadedBlankImage: string | null;
  setUploadedBlankImage: (img: string | null) => void;
  isAnalyzingForm: boolean;
  setIsAnalyzingForm: (analyzing: boolean) => void;
  
  // AI Field Mapping State
  fieldMappings: FieldMappingItem[];
  updateFieldMapping: (id: string, updates: Partial<FieldMappingItem>) => void;
  confirmFieldMapping: (id: string) => void;
  confirmAllFieldMappings: () => void;
  
  // Handwriting Generation Settings
  handwritingStyle: HandwritingStyle;
  setHandwritingStyle: (style: HandwritingStyle) => void;
  inkColor: InkColor;
  setInkColor: (color: InkColor) => void;
  zoomLevel: number;
  setZoomLevel: (zoom: number | ((prev: number) => number)) => void;
  
  // Signature requirement state (Mandatory manual sign)
  manualSignatureStatus: 'pending' | 'signed_manually' | 'sign_at_counter';
  setManualSignatureStatus: (status: 'pending' | 'signed_manually' | 'sign_at_counter') => void;
  signatureCanvasData: string | null;
  setSignatureCanvasData: (data: string | null) => void;
  
  // Services & Schemes
  selectedService: BankingService;
  setSelectedService: (service: BankingService) => void;
  selectedScheme: GovernmentScheme;
  setSelectedScheme: (scheme: GovernmentScheme) => void;
  documentReadiness: Record<string, 'ready' | 'check' | 'missing'>;
  setDocumentStatus: (docId: string, status: 'ready' | 'check' | 'missing') => void;
  markAllDocsReady: () => void;
  
  // Presentation Deck & Demo
  viewMode: 'mobile' | 'expanded';
  setViewMode: (mode: 'mobile' | 'expanded') => void;
  presentationModalOpen: boolean;
  setPresentationModalOpen: (open: boolean) => void;
  supabaseModalOpen: boolean;
  setSupabaseModalOpen: (open: boolean) => void;
  openPresentation: () => void;
  demoGuideStep: number | null;
  setDemoGuideStep: (step: number | null) => void;
  startDemoPresentationFlow: () => void;
  
  // Voice Assistant
  readAloud: (text: string) => void;
  activeConversation: ConversationTurn[];
  setActiveConversation: React.Dispatch<React.SetStateAction<ConversationTurn[]>>;
  
  // Official Information Sources
  informationSources: InformationSourceItem[];
}

const INITIAL_PROFILE: DemoUserProfile = {
  name: DEMO_PREFILL_DATA.applicantName,
  fatherOrSpouseName: DEMO_PREFILL_DATA.fatherOrSpouseName,
  guardianName: DEMO_PREFILL_DATA.guardianName,
  dob: DEMO_PREFILL_DATA.dob,
  gender: DEMO_PREFILL_DATA.gender,
  mobile: DEMO_PREFILL_DATA.mobile,
  maskedMobile: DEMO_PREFILL_DATA.maskedMobile,
  email: DEMO_PREFILL_DATA.email,
  address: DEMO_PREFILL_DATA.address,
  city: DEMO_PREFILL_DATA.city,
  state: DEMO_PREFILL_DATA.state,
  pincode: DEMO_PREFILL_DATA.pincode,
  pan: DEMO_PREFILL_DATA.pan,
  maskedPan: DEMO_PREFILL_DATA.maskedPan,
  aadhaarNumber: DEMO_PREFILL_DATA.aadhaar,
  maskedAadhaar: DEMO_PREFILL_DATA.maskedAadhaar,
  bankName: DEMO_PREFILL_DATA.bankName,
  accountNumber: DEMO_PREFILL_DATA.bankAccount,
  maskedBankAccount: DEMO_PREFILL_DATA.maskedBankAccount,
  ifscCode: DEMO_PREFILL_DATA.ifscCode,
  branchName: DEMO_PREFILL_DATA.branchName,
  accountType: DEMO_PREFILL_DATA.accountType,
  nomineeName: DEMO_PREFILL_DATA.nomineeName,
  nomineeRelation: DEMO_PREFILL_DATA.nomineeRelation,
  nomineeDob: DEMO_PREFILL_DATA.nomineeDob,
  occupation: DEMO_PREFILL_DATA.occupation,
  annualIncome: DEMO_PREFILL_DATA.annualIncome,
  maritalStatus: DEMO_PREFILL_DATA.maritalStatus,
  initialDeposit: DEMO_PREFILL_DATA.initialDeposit,
  documentsAvailable: {
    panCard: true,
    aadhaarCard: true,
    voterId: true,
    photographs: true,
    electricityBill: true,
    rationCard: true,
    incomeCertificate: false
  }
};

const INITIAL_DOC_STATUS: Record<string, 'ready' | 'check' | 'missing'> = {
  'identity': 'ready',
  'address': 'ready',
  'pan': 'ready',
  'photo': 'ready',
  'bank': 'ready'
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('home');
  const [screenHistory, setScreenHistory] = useState<AppScreen[]>(['home']);
  const [selectedLanguage, setSelectedLanguageState] = useState<string>('hi');
  const [seniorMode, setSeniorModeState] = useState<boolean>(false);
  const [textSize, setTextSize] = useState<'normal' | 'large'>('normal');
  const [voiceAudioEnabled, setVoiceAudioEnabled] = useState<boolean>(true);
  
  // Profile & Data
  const [userProfile, setUserProfile] = useState<DemoUserProfile>(INITIAL_PROFILE);
  const [isDataDeleted, setIsDataDeleted] = useState<boolean>(false);
  
  // Blank Form State
  const [activeBlankForm, setActiveBlankForm] = useState<BlankFormTemplate>(BLANK_FORM_TEMPLATES[0]);
  const [uploadedBlankImage, setUploadedBlankImage] = useState<string | null>(BLANK_FORM_TEMPLATES[0].sampleBlankImage);
  const [isAnalyzingForm, setIsAnalyzingForm] = useState<boolean>(false);
  
  // AI Field Mapping
  const [fieldMappings, setFieldMappings] = useState<FieldMappingItem[]>(INITIAL_FIELD_MAPPINGS);
  
  // Handwriting Generation Settings
  const [handwritingStyle, setHandwritingStyle] = useState<HandwritingStyle>('neat');
  const [inkColor, setInkColor] = useState<InkColor>('blue');
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  
  // Signature Requirement
  const [manualSignatureStatus, setManualSignatureStatus] = useState<'pending' | 'signed_manually' | 'sign_at_counter'>('pending');
  const [signatureCanvasData, setSignatureCanvasData] = useState<string | null>(null);
  
  // Services & Schemes
  const [selectedService, setSelectedService] = useState<BankingService>(BANKING_SERVICES[0]);
  const [selectedScheme, setSelectedScheme] = useState<GovernmentScheme>(GOVERNMENT_SCHEMES[0]);
  const [documentReadiness, setDocumentReadiness] = useState<Record<string, 'ready' | 'check' | 'missing'>>(INITIAL_DOC_STATUS);
  
  // Deck & Modals
  const [viewMode, setViewMode] = useState<'mobile' | 'expanded'>('mobile');
  const [presentationModalOpen, setPresentationModalOpen] = useState<boolean>(false);
  const [supabaseModalOpen, setSupabaseModalOpen] = useState<boolean>(false);
  const [demoGuideStep, setDemoGuideStep] = useState<number | null>(null);
  
  // Information Sources
  const [informationSources] = useState<InformationSourceItem[]>(OFFICIAL_INFORMATION_SOURCES);

  // Multi-Turn Voice Conversation
  const [activeConversation, setActiveConversation] = useState<ConversationTurn[]>([
    {
      id: 'welcome-msg',
      sender: 'assistant',
      text: 'नमस्ते! मैं जन सहायक हूँ। आप किसी भी कोरे (Blank) बैंक फ़ॉर्म का फोटो खींचिए, मैं आपकी सहेजी गई प्रोफ़ाइल से उसे हस्तलिखित रूप में भर दूँगा।',
      hindiText: 'नमस्ते! मैं जन सहायक हूँ। आप किसी भी कोरे बैंक फ़ॉर्म का फोटो खींचिए, मैं आपकी प्रोफ़ाइल से उसे हस्तलिखित रूप में भर दूँगा।',
      timestamp: 'Just now'
    }
  ]);

  // Initial Supabase session registration & initial profile sync
  useEffect(() => {
    // Log app session startup
    logAppActivityToSupabase({
      action: 'app_launch',
      screen: 'home',
      language: selectedLanguage,
      details: { seniorMode, textSize, timestamp: new Date().toISOString() }
    });

    // Save initial demo profile so user table is seeded in Supabase
    saveUserProfileToSupabase(INITIAL_PROFILE);
  }, []);

  const setSelectedLanguage = (lang: string) => {
    setSelectedLanguageState(lang);
    playChime('click');
    logAppActivityToSupabase({
      action: 'change_language',
      screen: currentScreen,
      language: lang,
      details: { newLanguage: lang }
    });
  };

  const setSeniorMode = (enabled: boolean) => {
    setSeniorModeState(enabled);
    if (enabled) {
      setTextSize('large');
      playChime('success');
    } else {
      setTextSize('normal');
      playChime('click');
    }
    logAppActivityToSupabase({
      action: 'toggle_senior_mode',
      screen: currentScreen,
      language: selectedLanguage,
      details: { seniorMode: enabled }
    });
  };

  const navigateTo = (screen: AppScreen, options?: { replace?: boolean }) => {
    stopSpeaking();
    playChime('click');
    if (options?.replace) {
      setCurrentScreen(screen);
      setScreenHistory((prev) => [...prev.slice(0, -1), screen]);
    } else {
      setCurrentScreen(screen);
      setScreenHistory((prev) => [...prev, screen]);
    }

    // Automatically sync screen navigation to Supabase
    logAppActivityToSupabase({
      action: 'screen_navigation',
      screen,
      language: selectedLanguage,
      details: { from: currentScreen, to: screen }
    });
  };

  const goBack = () => {
    stopSpeaking();
    playChime('click');
    if (screenHistory.length > 1) {
      const newHistory = [...screenHistory];
      newHistory.pop();
      const prevScreen = newHistory[newHistory.length - 1];
      setScreenHistory(newHistory);
      setCurrentScreen(prevScreen);
      logAppActivityToSupabase({
        action: 'go_back',
        screen: prevScreen,
        language: selectedLanguage
      });
    } else {
      setCurrentScreen('home');
    }
  };

  const setDocumentStatus = (docId: string, status: 'ready' | 'check' | 'missing') => {
    const updated = {
      ...documentReadiness,
      [docId]: status
    };
    setDocumentReadiness(updated);
    playChime(status === 'ready' ? 'success' : 'click');

    // Sync document checklist status to Supabase
    saveDocumentChecklistToSupabase({
      serviceId: selectedService.id,
      serviceTitle: selectedService.title,
      readinessStatus: updated
    });
  };

  const markAllDocsReady = () => {
    const allReady: Record<string, 'ready' | 'check' | 'missing'> = {
      'identity': 'ready',
      'address': 'ready',
      'pan': 'ready',
      'photo': 'ready',
      'bank': 'ready'
    };
    setDocumentReadiness(allReady);
    setUserProfile((prev) => ({
      ...prev,
      documentsAvailable: {
        ...prev.documentsAvailable,
        photographs: true
      }
    }));
    playChime('success');

    saveDocumentChecklistToSupabase({
      serviceId: selectedService.id,
      serviceTitle: selectedService.title,
      readinessStatus: allReady
    });
  };

  const updateUserProfile = (data: Partial<DemoUserProfile>) => {
    setUserProfile((prev) => {
      const updated = { ...prev, ...data };
      // Sync field mappings with new profile data
      setFieldMappings((currMappings) =>
        currMappings.map((m) => {
          if (m.mappedProfileKey === 'name' && data.name !== undefined) {
            return { ...m, profileValue: data.name };
          }
          if (m.mappedProfileKey === 'dob' && data.dob !== undefined) {
            return { ...m, profileValue: data.dob };
          }
          if (m.mappedProfileKey === 'mobile' && data.mobile !== undefined) {
            return { ...m, profileValue: data.mobile };
          }
          if (m.mappedProfileKey === 'address' && data.address !== undefined) {
            return { ...m, profileValue: data.address };
          }
          if (m.mappedProfileKey === 'pincode' && data.pincode !== undefined) {
            return { ...m, profileValue: data.pincode };
          }
          if (m.mappedProfileKey === 'nomineeName' && data.nomineeName !== undefined) {
            return { ...m, profileValue: data.nomineeName, isMissingInProfile: !data.nomineeName };
          }
          return m;
        })
      );

      // Automatically sync updated user profile to Supabase backend
      saveUserProfileToSupabase(updated);

      return updated;
    });
    playChime('click');
  };

  const updateFieldMapping = (id: string, updates: Partial<FieldMappingItem>) => {
    setFieldMappings((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
    playChime('click');
  };

  const confirmFieldMapping = (id: string) => {
    setFieldMappings((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isConfirmed: true } : item))
    );
    playChime('click');
  };

  const confirmAllFieldMappings = () => {
    setFieldMappings((prev) =>
      prev.map((item) => ({ ...item, isConfirmed: true }))
    );
    playChime('success');
  };

  const deleteUserData = () => {
    setUserProfile({
      name: '',
      fatherOrSpouseName: '',
      guardianName: '',
      dob: '',
      gender: '',
      mobile: '',
      maskedMobile: '',
      email: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      pan: '',
      maskedPan: '',
      aadhaarNumber: '',
      maskedAadhaar: '',
      bankName: '',
      accountNumber: '',
      maskedBankAccount: '',
      ifscCode: '',
      branchName: '',
      accountType: '',
      nomineeName: '',
      nomineeRelation: '',
      nomineeDob: '',
      occupation: '',
      annualIncome: '',
      maritalStatus: '',
      initialDeposit: '',
      documentsAvailable: {
        panCard: false,
        aadhaarCard: false,
        voterId: false,
        photographs: false,
        electricityBill: false,
        rationCard: false,
        incomeCertificate: false
      }
    });
    setFieldMappings((prev) =>
      prev.map((item) => ({
        ...item,
        profileValue: item.id === 'map-signature' ? item.profileValue : '',
        userEditedValue: '',
        isConfirmed: item.id === 'map-signature',
        isMissingInProfile: item.id !== 'map-signature'
      }))
    );
    setManualSignatureStatus('pending');
    setSignatureCanvasData(null);
    setIsDataDeleted(true);
    playChime('success');
  };

  const restoreDemoData = () => {
    setUserProfile(INITIAL_PROFILE);
    setFieldMappings(INITIAL_FIELD_MAPPINGS);
    setIsDataDeleted(false);
    playChime('success');
  };

  const readAloud = (text: string) => {
    if (voiceAudioEnabled) {
      const voiceCode = selectedLanguage === 'en' ? 'en-IN' : 'hi-IN';
      speakText(text, voiceCode);
    }
  };

  const startDemoPresentationFlow = () => {
    setDemoGuideStep(1);
    navigateTo('language');
  };

  const openPresentation = () => {
    stopSpeaking();
    playChime('click');
    setPresentationModalOpen(true);
  };

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        screenHistory,
        navigateTo,
        goBack,
        selectedLanguage,
        setSelectedLanguage,
        seniorMode,
        setSeniorMode,
        textSize,
        setTextSize,
        voiceAudioEnabled,
        setVoiceAudioEnabled,
        userProfile,
        updateUserProfile,
        isDataDeleted,
        deleteUserData,
        restoreDemoData,
        activeBlankForm,
        setActiveBlankForm,
        uploadedBlankImage,
        setUploadedBlankImage,
        isAnalyzingForm,
        setIsAnalyzingForm,
        fieldMappings,
        updateFieldMapping,
        confirmFieldMapping,
        confirmAllFieldMappings,
        handwritingStyle,
        setHandwritingStyle,
        inkColor,
        setInkColor,
        zoomLevel,
        setZoomLevel,
        manualSignatureStatus,
        setManualSignatureStatus,
        signatureCanvasData,
        setSignatureCanvasData,
        selectedService,
        setSelectedService,
        selectedScheme,
        setSelectedScheme,
        documentReadiness,
        setDocumentStatus,
        markAllDocsReady,
        viewMode,
        setViewMode,
        presentationModalOpen,
        setPresentationModalOpen,
        supabaseModalOpen,
        setSupabaseModalOpen,
        openPresentation,
        demoGuideStep,
        setDemoGuideStep,
        startDemoPresentationFlow,
        readAloud,
        activeConversation,
        setActiveConversation,
        informationSources
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
