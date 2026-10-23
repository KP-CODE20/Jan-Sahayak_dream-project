import { createClient } from '@supabase/supabase-js';
import { DemoUserProfile, BlankFormTemplate, FieldMappingItem, BankingService, GovernmentScheme } from '../types';

// Supabase Credentials provided by user
export const SUPABASE_PROJECT_ID = 'yntipexindxnbvsuoyeh';
export const SUPABASE_URL = 
  ((import.meta as unknown as { env?: { VITE_SUPABASE_URL?: string } }).env?.VITE_SUPABASE_URL) || 
  `https://${SUPABASE_PROJECT_ID}.supabase.co`;

export const SUPABASE_ANON_KEY = 
  ((import.meta as unknown as { env?: { VITE_SUPABASE_ANON_KEY?: string } }).env?.VITE_SUPABASE_ANON_KEY) || 
  'sb_publishable_-8_gVJK2TbtYTPyburru0g_azX6dftm';

// Initialize Supabase Client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

// Helper to get or create a persistent anonymous session ID
export const getSessionId = (): string => {
  try {
    let sid = localStorage.getItem('jan_sahayak_session_id');
    if (!sid) {
      sid = 'session_' + Math.random().toString(36).substring(2, 10) + '_' + Date.now().toString(36);
      localStorage.setItem('jan_sahayak_session_id', sid);
    }
    return sid;
  } catch {
    return 'session_' + Date.now().toString(36);
  }
};

export interface SyncStatus {
  lastSyncedAt: Date | null;
  totalSyncedCount: number;
  isConnected: boolean;
  lastAction: string;
  error: string | null;
}

// Global sync state tracker for UI
let syncListeners: ((status: SyncStatus) => void)[] = [];
let currentSyncStatus: SyncStatus = {
  lastSyncedAt: null,
  totalSyncedCount: 0,
  isConnected: true,
  lastAction: 'Initialized',
  error: null,
};

const notifySyncListeners = () => {
  syncListeners.forEach(listener => listener({ ...currentSyncStatus }));
};

export const subscribeToSyncStatus = (listener: (status: SyncStatus) => void) => {
  syncListeners.push(listener);
  listener({ ...currentSyncStatus });
  return () => {
    syncListeners = syncListeners.filter(l => l !== listener);
  };
};

const updateSyncState = (action: string, success: boolean, errMessage?: string) => {
  currentSyncStatus = {
    ...currentSyncStatus,
    lastSyncedAt: new Date(),
    totalSyncedCount: success ? currentSyncStatus.totalSyncedCount + 1 : currentSyncStatus.totalSyncedCount,
    isConnected: success,
    lastAction: action,
    error: success ? null : (errMessage || 'Sync failed')
  };
  notifySyncListeners();
};

/**
 * 1. Log General App Usage & Screen Navigation
 */
export const logAppActivityToSupabase = async (payload: {
  action?: string;
  actionType?: string;
  screen?: string;
  screenName?: string;
  language?: string;
  seniorMode?: boolean;
  details?: Record<string, unknown>;
}) => {
  try {
    const sessionId = getSessionId();
    const actionLabel = payload.action || payload.actionType || 'navigation';
    const screenLabel = payload.screen || payload.screenName || 'home';

    // Also cache locally in session/localStorage for immediate Admin viewing
    try {
      const localKey = 'jan_sahayak_local_activities';
      const existing = JSON.parse(localStorage.getItem(localKey) || '[]');
      const newEntry = {
        id: 'local-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5),
        session_id: sessionId,
        screen_name: screenLabel,
        action_type: actionLabel,
        language: payload.language || 'hi',
        senior_mode: !!payload.seniorMode,
        details: payload.details || {},
        created_at: new Date().toISOString()
      };
      existing.unshift(newEntry);
      if (existing.length > 200) existing.pop();
      localStorage.setItem(localKey, JSON.stringify(existing));
    } catch {
      // ignore localStorage quota
    }

    const { error } = await supabase
      .from('jan_sahayak_activities')
      .insert([
        {
          session_id: sessionId,
          screen_name: screenLabel,
          action_type: actionLabel,
          language: payload.language || 'hi',
          senior_mode: !!payload.seniorMode,
          details: payload.details || {},
          created_at: new Date().toISOString(),
        }
      ]);

    if (error) {
      console.warn('[Supabase Activity Log Warning]', error.message);
      updateSyncState(`Activity: ${actionLabel}`, false, error.message);
    } else {
      updateSyncState(`Activity: ${actionLabel}`, true);
    }
  } catch (err) {
    console.warn('[Supabase Activity Log Error]', err);
  }
};

/**
 * 2. Save User Profile to Supabase
 */
export const saveUserProfileToSupabase = async (profile: DemoUserProfile) => {
  try {
    const sessionId = getSessionId();
    const { error } = await supabase
      .from('jan_sahayak_profiles')
      .upsert(
        [
          {
            session_id: sessionId,
            full_name: profile.name,
            father_or_spouse: profile.fatherOrSpouseName,
            dob: profile.dob,
            gender: profile.gender,
            mobile: profile.mobile,
            masked_mobile: profile.maskedMobile,
            email: profile.email,
            address: profile.address,
            city: profile.city,
            state: profile.state,
            pincode: profile.pincode,
            pan_masked: profile.maskedPan || profile.pan,
            aadhaar_masked: profile.maskedAadhaar || profile.aadhaarNumber,
            bank_name: profile.bankName,
            account_number_masked: profile.maskedBankAccount || profile.accountNumber,
            ifsc_code: profile.ifscCode,
            branch_name: profile.branchName,
            nominee_name: profile.nomineeName,
            nominee_relation: profile.nomineeRelation,
            documents_available: profile.documentsAvailable,
            raw_profile: profile,
            updated_at: new Date().toISOString(),
          }
        ],
        { onConflict: 'session_id' }
      );

    if (error) {
      // If table doesn't have onConflict constraint, fallback to standard insert
      const insertFallback = await supabase
        .from('jan_sahayak_profiles')
        .insert([
          {
            session_id: sessionId,
            full_name: profile.name,
            mobile: profile.mobile,
            address: profile.address,
            bank_name: profile.bankName,
            raw_profile: profile,
            updated_at: new Date().toISOString(),
          }
        ]);
      if (insertFallback.error) {
        console.warn('[Supabase Profile Save Warning]', insertFallback.error.message);
        updateSyncState('Profile Save', false, insertFallback.error.message);
        return false;
      }
    }

    updateSyncState('Profile Synced', true);
    return true;
  } catch (err) {
    console.warn('[Supabase Profile Save Exception]', err);
    return false;
  }
};

/**
 * 3. Save Completed Form Submission to Supabase
 */
export const saveFormSubmissionToSupabase = async (params: {
  form?: BlankFormTemplate;
  formId?: string;
  formTitle?: string;
  bankName?: string;
  category?: string;
  applicantName?: string;
  fieldMappings?: FieldMappingItem[];
  fieldValues?: Record<string, string>;
  handwritingStyle?: string;
  inkColor?: string;
  signatureStatus?: string;
  manualSignatureStatus?: string;
  userProfile?: DemoUserProfile;
}) => {
  try {
    const sessionId = getSessionId();
    const formId = params.form?.id || params.formId || 'sbi-acc-open-01';
    const formTitle = params.form?.title || params.formTitle || 'Savings Account Opening Form';
    const bankName = params.bankName || (params.form && ('bankName' in params.form ? (params.form as Record<string, unknown>).bankName as string : 'State Bank of India')) || 'State Bank of India';
    const category = params.form?.category || params.category || 'account';
    const applicantName = params.applicantName || params.userProfile?.name || 'Applicant';
    const handwritingStyle = params.handwritingStyle || 'neat';
    const inkColor = params.inkColor || 'blue';
    const signatureStatus = params.manualSignatureStatus || params.signatureStatus || 'pending_physical_sign';

    const fieldData = params.fieldMappings
      ? params.fieldMappings.map(f => ({
          id: f.id,
          label: f.hindiFieldLabel || f.formFieldLabel || f.id,
          value: f.userEditedValue || f.profileValue,
          confidence: f.confidenceScore,
          confirmed: f.isConfirmed
        }))
      : params.fieldValues || {};

    const payload = {
      session_id: sessionId,
      form_id: formId,
      form_title: formTitle,
      bank_name: bankName,
      category: category,
      applicant_name: applicantName,
      handwriting_style: handwritingStyle,
      ink_color: inkColor,
      signature_status: signatureStatus,
      field_mappings: fieldData,
      verified: true,
      submitted_at: new Date().toISOString(),
    };

    // Cache locally for admin panel
    try {
      const existing = JSON.parse(localStorage.getItem('jan_sahayak_local_forms') || '[]');
      existing.unshift({ id: 'form-' + Date.now(), ...payload });
      if (existing.length > 50) existing.pop();
      localStorage.setItem('jan_sahayak_local_forms', JSON.stringify(existing));
    } catch {}

    const { error } = await supabase
      .from('jan_sahayak_form_submissions')
      .insert([payload]);

    if (error) {
      console.warn('[Supabase Form Submission Warning]', error.message);
      updateSyncState(`Form: ${formTitle}`, false, error.message);
      return false;
    }

    updateSyncState(`Form Synced: ${formTitle}`, true);
    return true;
  } catch (err) {
    console.warn('[Supabase Form Submission Exception]', err);
    return false;
  }
};

/**
 * 4. Save Bank Visit Plan to Supabase
 */
export const saveBankVisitPlanToSupabase = async (params: {
  service?: BankingService;
  serviceId?: string;
  serviceTitle?: string;
  category?: string;
  branchName?: string;
  counterDesk?: string;
  visitDate?: string;
  plannedDate?: string;
  selectedDocs?: string[];
  checklistItems?: string[];
  userNotes?: string;
}) => {
  try {
    const sessionId = getSessionId();
    const serviceId = params.service?.id || params.serviceId || 'account-opening';
    const serviceTitle = params.service?.title || params.serviceTitle || 'Banking Service';
    const category = params.service?.category || params.category || 'general';
    const branchName = params.branchName || 'Main Branch';
    const visitDate = params.plannedDate || params.visitDate || new Date().toISOString().split('T')[0];
    const docs = params.selectedDocs || params.checklistItems || [];

    const payload = {
      session_id: sessionId,
      service_id: serviceId,
      service_title: serviceTitle,
      category: category,
      branch_name: branchName,
      visit_date: visitDate,
      required_documents: docs,
      notes: params.userNotes || '',
      created_at: new Date().toISOString(),
    };

    // Cache locally for admin panel
    try {
      const existing = JSON.parse(localStorage.getItem('jan_sahayak_local_visits') || '[]');
      existing.unshift({ id: 'visit-' + Date.now(), ...payload });
      if (existing.length > 50) existing.pop();
      localStorage.setItem('jan_sahayak_local_visits', JSON.stringify(existing));
    } catch {}

    const { error } = await supabase
      .from('jan_sahayak_visit_plans')
      .insert([payload]);

    if (error) {
      console.warn('[Supabase Visit Plan Warning]', error.message);
      updateSyncState(`Visit Plan: ${serviceTitle}`, false, error.message);
      return false;
    }

    updateSyncState(`Visit Plan: ${serviceTitle}`, true);
    return true;
  } catch (err) {
    console.warn('[Supabase Visit Plan Exception]', err);
    return false;
  }
};

/**
 * 5. Save Scheme Inquiry / Eligibility Check to Supabase
 */
export const saveSchemeInquiryToSupabase = async (params: {
  scheme?: GovernmentScheme;
  schemeId?: string;
  schemeTitle?: string;
  ministry?: string;
  category?: string;
  eligible?: boolean;
  eligibilityStatus?: string;
  userAge?: number;
  incomeCategory?: string;
}) => {
  try {
    const sessionId = getSessionId();
    const schemeId = params.scheme?.id || params.schemeId || 'pm-kisan';
    const schemeTitle = params.scheme?.title || params.schemeTitle || 'Government Scheme';
    const category = params.scheme?.category || params.category || 'agriculture';
    const status = params.eligibilityStatus || (params.eligible !== undefined ? (params.eligible ? 'eligible' : 'ineligible') : 'eligible');

    const payload = {
      session_id: sessionId,
      scheme_id: schemeId,
      scheme_title: schemeTitle,
      category: category,
      eligibility_status: status,
      user_age: params.userAge || 35,
      income_category: params.incomeCategory || 'General',
      created_at: new Date().toISOString(),
    };

    // Cache locally for admin panel
    try {
      const existing = JSON.parse(localStorage.getItem('jan_sahayak_local_schemes') || '[]');
      existing.unshift({ id: 'scheme-' + Date.now(), ...payload });
      if (existing.length > 50) existing.pop();
      localStorage.setItem('jan_sahayak_local_schemes', JSON.stringify(existing));
    } catch {}

    const { error } = await supabase
      .from('jan_sahayak_scheme_inquiries')
      .insert([payload]);

    if (error) {
      console.warn('[Supabase Scheme Inquiry Warning]', error.message);
      updateSyncState(`Scheme: ${schemeTitle}`, false, error.message);
      return false;
    }

    updateSyncState(`Scheme: ${schemeTitle}`, true);
    return true;
  } catch (err) {
    console.warn('[Supabase Scheme Inquiry Exception]', err);
    return false;
  }
};

/**
 * 6. Save Voice Assistant Interactions to Supabase
 */
export const saveVoiceInteractionToSupabase = async (params: {
  userQuery: string;
  assistantResponse?: string;
  aiResponse?: string;
  language?: string;
  category?: string;
}) => {
  try {
    const sessionId = getSessionId();
    const responseText = params.aiResponse || params.assistantResponse || '';

    const payload = {
      session_id: sessionId,
      user_query: params.userQuery,
      assistant_response: responseText,
      language: params.language || 'hi',
      created_at: new Date().toISOString(),
    };

    // Cache locally for admin panel
    try {
      const existing = JSON.parse(localStorage.getItem('jan_sahayak_local_voice') || '[]');
      existing.unshift({ id: 'voice-' + Date.now(), ...payload });
      if (existing.length > 50) existing.pop();
      localStorage.setItem('jan_sahayak_local_voice', JSON.stringify(existing));
    } catch {}

    const { error } = await supabase
      .from('jan_sahayak_voice_logs')
      .insert([payload]);

    if (error) {
      console.warn('[Supabase Voice Log Warning]', error.message);
      updateSyncState('Voice Query Logged', false, error.message);
      return false;
    }

    updateSyncState('Voice Query Logged', true);
    return true;
  } catch (err) {
    console.warn('[Supabase Voice Log Exception]', err);
    return false;
  }
};

/**
 * 7. Save Document Readiness Checklist to Supabase
 */
export const saveDocumentChecklistToSupabase = async (params: {
  serviceId?: string;
  serviceTitle?: string;
  readinessMap?: Record<string, string>;
  readinessStatus?: Record<string, string>;
  allReady?: boolean;
}) => {
  try {
    const sessionId = getSessionId();
    const serviceId = params.serviceId || 'account-opening';
    const readinessMap = params.readinessMap || params.readinessStatus || {};
    const allReady = params.allReady ?? false;

    const payload = {
      session_id: sessionId,
      service_id: serviceId,
      readiness_details: readinessMap,
      all_ready: allReady,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from('jan_sahayak_document_checklists')
      .insert([payload]);

    if (error) {
      console.warn('[Supabase Document Checklist Warning]', error.message);
      updateSyncState('Checklist Updated', false, error.message);
      return false;
    }

    updateSyncState('Checklist Synced', true);
    return true;
  } catch (err) {
    console.warn('[Supabase Document Checklist Exception]', err);
    return false;
  }
};

/**
 * 8. Admin Slot & Security Operations (Single Slot Master Admin)
 */
export interface AdminUserRecord {
  id?: string;
  fullName: string;
  username: string;
  email: string;
  role: string;
  createdAt: string;
  lastLogin?: string;
}

const LOCAL_ADMIN_KEY = 'jan_sahayak_single_admin_slot';
const LOCAL_ADMIN_SESSION_KEY = 'jan_sahayak_admin_auth_token';

// Simple client-side hash function for password protection
const hashString = async (str: string): Promise<string> => {
  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(str + '_jan_sahayak_salt_2026');
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  } catch {
    return btoa(str + '_salt');
  }
};

/**
 * Check if the master admin account slot is occupied
 */
export const getAdminSlotStatus = async (): Promise<{
  isOccupied: boolean;
  adminUser?: AdminUserRecord;
}> => {
  try {
    // 1. Check in Supabase table first
    const { data, error } = await supabase
      .from('jan_sahayak_admin_users')
      .select('id, full_name, username, email, role, created_at, last_login')
      .limit(1);

    if (!error && data && data.length > 0) {
      const row = data[0];
      const adminRecord: AdminUserRecord = {
        id: row.id,
        fullName: row.full_name,
        username: row.username,
        email: row.email,
        role: row.role || 'master_admin',
        createdAt: row.created_at,
        lastLogin: row.last_login,
      };
      // Keep local cache synced
      localStorage.setItem(LOCAL_ADMIN_KEY, JSON.stringify(adminRecord));
      return { isOccupied: true, adminUser: adminRecord };
    }

    // 2. Fallback to local storage
    const local = localStorage.getItem(LOCAL_ADMIN_KEY);
    if (local) {
      const parsed = JSON.parse(local);
      return { isOccupied: true, adminUser: parsed };
    }

    return { isOccupied: false };
  } catch {
    const local = localStorage.getItem(LOCAL_ADMIN_KEY);
    if (local) {
      return { isOccupied: true, adminUser: JSON.parse(local) };
    }
    return { isOccupied: false };
  }
};

/**
 * Register the SINGLE allowed master admin account
 */
export const registerSingleAdminAccount = async (params: {
  fullName: string;
  username: string;
  email: string;
  password: string;
  pinCode?: string;
}): Promise<{ success: boolean; message: string; user?: AdminUserRecord }> => {
  try {
    // Strict Single Slot Enforcement: Check if an admin already exists!
    const slotCheck = await getAdminSlotStatus();
    if (slotCheck.isOccupied) {
      return {
        success: false,
        message: 'Admin account slot is already occupied. Multiple admin accounts are strictly disabled.'
      };
    }

    const passwordHash = await hashString(params.password);
    const pinHash = params.pinCode ? await hashString(params.pinCode) : null;
    const now = new Date().toISOString();

    const newAdminRecord: AdminUserRecord = {
      fullName: params.fullName.trim(),
      username: params.username.trim().toLowerCase(),
      email: params.email.trim().toLowerCase(),
      role: 'master_admin',
      createdAt: now,
      lastLogin: now,
    };

    // Save to local storage immediately
    localStorage.setItem(LOCAL_ADMIN_KEY, JSON.stringify({
      ...newAdminRecord,
      _hash: passwordHash,
      _pinHash: pinHash,
    }));

    // Save to Supabase table
    try {
      const { error } = await supabase
        .from('jan_sahayak_admin_users')
        .insert([
          {
            full_name: newAdminRecord.fullName,
            username: newAdminRecord.username,
            email: newAdminRecord.email,
            password_hash: passwordHash,
            pin_code: pinHash,
            role: 'master_admin',
            created_at: now,
            last_login: now,
          }
        ]);

      if (error) {
        console.warn('[Supabase Admin Registration Warning]', error.message);
      }
    } catch (err) {
      console.warn('[Supabase Admin Registration Exception]', err);
    }

    // Automatically set logged-in session
    setAdminSession(newAdminRecord);

    logAppActivityToSupabase({
      action: 'admin_account_created',
      screen: 'admin',
      details: { username: newAdminRecord.username, email: newAdminRecord.email }
    });

    return {
      success: true,
      message: 'Master Admin Account successfully created and locked (1/1 slot filled).',
      user: newAdminRecord,
    };
  } catch (err) {
    return {
      success: false,
      message: `Failed to create admin account: ${String(err)}`
    };
  }
};

/**
 * Login as Admin
 */
export const loginAdminUser = async (credentials: {
  usernameOrEmail: string;
  password: string;
}): Promise<{ success: boolean; message: string; user?: AdminUserRecord }> => {
  try {
    const inputKey = credentials.usernameOrEmail.trim().toLowerCase();
    const inputHash = await hashString(credentials.password);

    // 1. Try checking against Supabase
    try {
      const { data, error } = await supabase
        .from('jan_sahayak_admin_users')
        .select('*')
        .or(`username.eq.${inputKey},email.eq.${inputKey}`)
        .limit(1);

      if (!error && data && data.length > 0) {
        const adminRow = data[0];
        if (adminRow.password_hash === inputHash) {
          const user: AdminUserRecord = {
            id: adminRow.id,
            fullName: adminRow.full_name,
            username: adminRow.username,
            email: adminRow.email,
            role: adminRow.role || 'master_admin',
            createdAt: adminRow.created_at,
            lastLogin: new Date().toISOString(),
          };

          // Update last login
          supabase
            .from('jan_sahayak_admin_users')
            .update({ last_login: new Date().toISOString() })
            .eq('id', adminRow.id);

          setAdminSession(user);

          logAppActivityToSupabase({
            action: 'admin_login_success',
            screen: 'admin',
            details: { username: user.username }
          });

          return { success: true, message: 'Authentication successful', user };
        }
      }
    } catch {
      // Continue to local check
    }

    // 2. Fallback checking against local storage
    const local = localStorage.getItem(LOCAL_ADMIN_KEY);
    if (local) {
      const parsed = JSON.parse(local);
      const isMatch = (parsed.username === inputKey || parsed.email === inputKey) &&
        (parsed._hash === inputHash || parsed._pinHash === inputHash);

      if (isMatch) {
        const user: AdminUserRecord = {
          fullName: parsed.fullName,
          username: parsed.username,
          email: parsed.email,
          role: parsed.role || 'master_admin',
          createdAt: parsed.createdAt,
          lastLogin: new Date().toISOString(),
        };
        setAdminSession(user);
        return { success: true, message: 'Authentication successful', user };
      }
    }

    return {
      success: false,
      message: 'Invalid admin username, email, or password. Please verify your credentials.'
    };
  } catch (err) {
    return {
      success: false,
      message: `Authentication error: ${String(err)}`
    };
  }
};

export const setAdminSession = (user: AdminUserRecord) => {
  localStorage.setItem(LOCAL_ADMIN_SESSION_KEY, JSON.stringify({
    user,
    token: 'admin_' + Date.now().toString(36),
    loginTime: new Date().toISOString()
  }));
};

export const getAdminSession = (): { user: AdminUserRecord; token: string } | null => {
  try {
    const raw = localStorage.getItem(LOCAL_ADMIN_SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const logoutAdminUser = () => {
  localStorage.removeItem(LOCAL_ADMIN_SESSION_KEY);
  logAppActivityToSupabase({
    action: 'admin_logout',
    screen: 'admin',
  });
};

/**
 * 9. Activity Data Querying for Admin Dashboard
 */
export const fetchAdminActivities = async (): Promise<any[]> => {
  try {
    const { data, error } = await supabase
      .from('jan_sahayak_activities')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(200);

    const localList = JSON.parse(localStorage.getItem('jan_sahayak_local_activities') || '[]');

    if (error || !data) {
      return localList;
    }

    // Merge Supabase remote with any un-synced local items
    const remoteIds = new Set(data.map(d => d.id));
    const unmergedLocal = localList.filter((l: any) => !remoteIds.has(l.id));
    return [...unmergedLocal, ...data];
  } catch {
    return JSON.parse(localStorage.getItem('jan_sahayak_local_activities') || '[]');
  }
};

export const fetchAdminFormSubmissions = async (): Promise<any[]> => {
  try {
    const { data, error } = await supabase
      .from('jan_sahayak_form_submissions')
      .select('*')
      .order('submitted_at', { ascending: false })
      .limit(100);

    if (error || !data) {
      return JSON.parse(localStorage.getItem('jan_sahayak_local_forms') || '[]');
    }
    return data;
  } catch {
    return [];
  }
};

export const fetchAdminProfiles = async (): Promise<any[]> => {
  try {
    const { data, error } = await supabase
      .from('jan_sahayak_profiles')
      .select('*')
      .order('updated_at', { ascending: false })
      .limit(100);

    if (error || !data) return [];
    return data;
  } catch {
    return [];
  }
};

export const fetchAdminVoiceLogs = async (): Promise<any[]> => {
  try {
    const { data, error } = await supabase
      .from('jan_sahayak_voice_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);

    if (error || !data) return [];
    return data;
  } catch {
    return [];
  }
};

export const fetchAdminVisitPlans = async (): Promise<any[]> => {
  try {
    const { data, error } = await supabase
      .from('jan_sahayak_visit_plans')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);

    if (error || !data) return [];
    return data;
  } catch {
    return [];
  }
};

export const fetchAdminSchemeInquiries = async (): Promise<any[]> => {
  try {
    const { data, error } = await supabase
      .from('jan_sahayak_scheme_inquiries')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);

    if (error || !data) return [];
    return data;
  } catch {
    return [];
  }
};

export const fetchAdminChecklists = async (): Promise<any[]> => {
  try {
    const { data, error } = await supabase
      .from('jan_sahayak_document_checklists')
      .select('*')
      .order('updated_at', { ascending: false })
      .limit(100);

    if (error || !data) return [];
    return data;
  } catch {
    return [];
  }
};

/**
 * Health check & test connectivity with Supabase project
 */
export const testSupabaseConnection = async (): Promise<{ success: boolean; message: string; data?: unknown }> => {
  try {
    // Try a simple ping query on activities table
    const { data, error } = await supabase
      .from('jan_sahayak_activities')
      .select('id, created_at')
      .limit(1);

    if (error) {
      // If table doesn't exist yet, try to reach the auth health endpoint or return helpful message
      return {
        success: false,
        message: `Connected to Supabase Project (${SUPABASE_PROJECT_ID}), but tables are ready to be created: ${error.message}`,
        data: null
      };
    }

    updateSyncState('Connection Verified', true);
    return {
      success: true,
      message: `Successfully connected to Supabase (${SUPABASE_PROJECT_ID})!`,
      data
    };
  } catch (err) {
    return {
      success: false,
      message: `Network or Connection Error: ${String(err)}`
    };
  }
};

/**
 * SQL Schema Script for user's Supabase project SQL Editor
 */
export const SUPABASE_SETUP_SQL = `-- Jan Sahayak Database Schema for Supabase
-- Project: ${SUPABASE_PROJECT_ID}
-- Run this script in your Supabase SQL Editor (https://supabase.com/dashboard/project/${SUPABASE_PROJECT_ID}/sql)

-- 1. App Activities Table
CREATE TABLE IF NOT EXISTS jan_sahayak_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  screen_name TEXT,
  action_type TEXT,
  language TEXT DEFAULT 'hi',
  senior_mode BOOLEAN DEFAULT false,
  details JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. User Profiles Table
CREATE TABLE IF NOT EXISTS jan_sahayak_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT UNIQUE NOT NULL,
  full_name TEXT,
  father_or_spouse TEXT,
  dob TEXT,
  gender TEXT,
  mobile TEXT,
  masked_mobile TEXT,
  email TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  pincode TEXT,
  pan_masked TEXT,
  aadhaar_masked TEXT,
  bank_name TEXT,
  account_number_masked TEXT,
  ifsc_code TEXT,
  branch_name TEXT,
  nominee_name TEXT,
  nominee_relation TEXT,
  documents_available JSONB DEFAULT '{}'::jsonb,
  raw_profile JSONB DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Form Submissions Table
CREATE TABLE IF NOT EXISTS jan_sahayak_form_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  form_id TEXT,
  form_title TEXT,
  bank_name TEXT,
  category TEXT,
  applicant_name TEXT,
  handwriting_style TEXT,
  ink_color TEXT,
  signature_status TEXT,
  field_mappings JSONB DEFAULT '[]'::jsonb,
  verified BOOLEAN DEFAULT true,
  submitted_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Bank Visit Plans Table
CREATE TABLE IF NOT EXISTS jan_sahayak_visit_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  service_id TEXT,
  service_title TEXT,
  category TEXT,
  branch_name TEXT,
  visit_date TEXT,
  required_documents JSONB DEFAULT '[]'::jsonb,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Scheme Inquiries Table
CREATE TABLE IF NOT EXISTS jan_sahayak_scheme_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  scheme_id TEXT,
  scheme_title TEXT,
  category TEXT,
  eligibility_status TEXT,
  user_age INTEGER,
  income_category TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. Voice Assistant Logs Table
CREATE TABLE IF NOT EXISTS jan_sahayak_voice_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  user_query TEXT,
  assistant_response TEXT,
  language TEXT DEFAULT 'hi',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 7. Document Checklists Table
CREATE TABLE IF NOT EXISTS jan_sahayak_document_checklists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  service_id TEXT,
  readiness_details JSONB DEFAULT '{}'::jsonb,
  all_ready BOOLEAN DEFAULT false,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 8. Master Admin Users Table (Single Slot Deployment Enforced)
CREATE TABLE IF NOT EXISTS jan_sahayak_admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  pin_code TEXT,
  role TEXT DEFAULT 'master_admin',
  created_at TIMESTAMPTZ DEFAULT now(),
  last_login TIMESTAMPTZ
);

-- Enable Row Level Security (RLS)
ALTER TABLE jan_sahayak_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE jan_sahayak_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE jan_sahayak_form_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE jan_sahayak_visit_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE jan_sahayak_scheme_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE jan_sahayak_voice_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE jan_sahayak_document_checklists ENABLE ROW LEVEL SECURITY;
ALTER TABLE jan_sahayak_admin_users ENABLE ROW LEVEL SECURITY;

-- Allow anon public inserts & selects
CREATE POLICY IF NOT EXISTS "Allow anon inserts on activities" ON jan_sahayak_activities FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY IF NOT EXISTS "Allow anon inserts on profiles" ON jan_sahayak_profiles FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY IF NOT EXISTS "Allow anon inserts on form submissions" ON jan_sahayak_form_submissions FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY IF NOT EXISTS "Allow anon inserts on visit plans" ON jan_sahayak_visit_plans FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY IF NOT EXISTS "Allow anon inserts on scheme inquiries" ON jan_sahayak_scheme_inquiries FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY IF NOT EXISTS "Allow anon inserts on voice logs" ON jan_sahayak_voice_logs FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY IF NOT EXISTS "Allow anon inserts on checklists" ON jan_sahayak_document_checklists FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY IF NOT EXISTS "Allow anon operations on admin users" ON jan_sahayak_admin_users FOR ALL TO anon USING (true) WITH CHECK (true);
`;
