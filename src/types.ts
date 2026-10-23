export type AppScreen =
  | 'welcome'
  | 'language'
  | 'home'
  | 'voice'
  | 'profile'
  | 'blank-upload'
  | 'form-understanding'
  | 'ai-review'
  | 'form-filling'
  | 'final-review'
  | 'form-completed'
  | 'privacy'
  | 'privacy-data'
  | 'sources'
  | 'services'
  | 'service-details'
  | 'document-checker'
  | 'visit-planner'
  | 'form-scanner'
  | 'form-explanation'
  | 'schemes'
  | 'scheme-details'
  | 'scheme-wizard'
  | 'settings'
  | 'design-thinking';

export interface LanguageOption {
  id: string;
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  sampleGreeting: string;
  voiceCode: string;
}

export type AIConfidenceLevel = 'high' | 'verify' | 'unknown' | 'missing';

export type HandwritingStyle = 'neat' | 'simple' | 'formal';
export type InkColor = 'blue' | 'black';

export interface FieldMappingItem {
  id: string;
  formFieldLabel: string;
  hindiFieldLabel: string;
  mappedProfileKey: string;
  profileValue: string;
  userEditedValue?: string;
  confidenceLevel: AIConfidenceLevel;
  confidenceScore: number;
  explanation: string;
  hindiExplanation: string;
  isConfirmed: boolean;
  section: string;
  isRequired: boolean;
  isMissingInProfile?: boolean;
  fieldClassification: 'auto_fillable' | 'user_confirm_required' | 'manual_required' | 'signature_required';
}

export interface BlankFormTemplate {
  id: string;
  code: string;
  title: string;
  hindiTitle: string;
  issuer: string;
  category: 'account_opening' | 'kyc_update' | 'address_change' | 'nomination';
  description: string;
  hindiDescription: string;
  fieldsCount: number;
  sampleBlankImage: string;
}

export interface InformationSourceItem {
  id: string;
  topic: string;
  hindiTopic: string;
  category: 'banking' | 'kyc' | 'pan' | 'aadhaar' | 'schemes' | 'general';
  providedGuidance: string;
  hindiGuidance: string;
  officialSource: string;
  officialSourceUrl?: string;
  lastVerifiedDate: string;
  verificationNotes: string;
}

export interface BankingService {
  id: string;
  title: string;
  hindiTitle: string;
  description: string;
  hindiDescription: string;
  icon: string;
  category: 'account' | 'updates' | 'cards' | 'loans' | 'requests';
  explanation: string;
  hindiExplanation: string;
  documents: {
    name: string;
    hindiName: string;
    type: 'identity' | 'address' | 'pan' | 'photo' | 'bank';
    required: boolean;
    description: string;
    sampleOptions: string[];
  }[];
  steps: {
    stepNumber: number;
    title: string;
    hindiTitle: string;
    instruction: string;
    hindiInstruction: string;
    tip?: string;
  }[];
  branchCounter: string;
  approxTime: string;
  formType?: string;
}

export interface DocumentItem {
  id: string;
  name: string;
  hindiName: string;
  category: string;
  status: 'ready' | 'check' | 'missing';
  notes?: string;
  sampleDoc?: string;
}

export interface FormField {
  id: string;
  fieldName: string;
  hindiName: string;
  sampleValue: string;
  explanation: string;
  hindiExplanation: string;
  audioText: string;
  confidence: number;
  section: string;
  isSensitive?: boolean;
}

export interface GovernmentScheme {
  id: string;
  title: string;
  hindiTitle: string;
  category: 'students' | 'women' | 'seniors' | 'farmers' | 'employment' | 'housing' | 'healthcare' | 'financial' | 'business';
  categoryLabel: string;
  badge: string;
  shortDesc: string;
  hindiShortDesc: string;
  detailedDesc: string;
  benefits: string[];
  eligibility: string[];
  documents: string[];
  applicationSteps: string[];
  officialSourceLabel: string;
  launchYear?: string;
}

export interface DemoUserProfile {
  // Personal Information
  name: string;
  fatherOrSpouseName: string;
  guardianName?: string;
  dob: string;
  gender: string;
  mobile: string;
  maskedMobile: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  
  // Identity Information
  pan: string;
  maskedPan: string;
  aadhaarNumber: string;
  maskedAadhaar: string;
  voterId?: string;
  maskedVoterId?: string;
  
  // Banking Information
  bankName: string;
  accountNumber: string;
  maskedBankAccount: string;
  ifscCode: string;
  branchName: string;
  accountType: string;
  nomineeName: string;
  nomineeRelation: string;
  nomineeDob: string;
  
  // Additional Information
  occupation: string;
  annualIncome: string;
  maritalStatus?: string;
  initialDeposit?: string;
  
  // Settings & Documents
  documentsAvailable: {
    panCard: boolean;
    aadhaarCard: boolean;
    voterId: boolean;
    photographs: boolean;
    electricityBill: boolean;
    rationCard: boolean;
    incomeCertificate: boolean;
  };
}

export interface ConversationTurn {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  hindiText?: string;
  interpretedIntent?: string;
  actionButtons?: {
    label: string;
    hindiLabel?: string;
    action: () => void;
    primary?: boolean;
  }[];
  timestamp: string;
  checklistPreview?: string[];
  serviceId?: string;
}
