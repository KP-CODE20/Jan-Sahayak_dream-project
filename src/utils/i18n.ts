import { COMMON_TRANSLATIONS, TranslationDictionary } from '../data/translations/common';
import { HOME_TRANSLATIONS } from '../data/translations/home';
import { FORM_TRANSLATIONS } from '../data/translations/blankForm';
import { PROFILE_TRANSLATIONS } from '../data/translations/profileAndData';

export const ALL_TRANSLATIONS: TranslationDictionary = {
  ...COMMON_TRANSLATIONS,
  ...HOME_TRANSLATIONS,
  ...FORM_TRANSLATIONS,
  ...PROFILE_TRANSLATIONS
};

export type SupportedLanguage = 
  | 'en' 
  | 'hi' 
  | 'bn' 
  | 'ta' 
  | 'te' 
  | 'mr' 
  | 'kn' 
  | 'gu' 
  | 'pa' 
  | 'as' 
  | 'ml' 
  | 'or';

export function getLocalizedText(
  key: string, 
  lang: string, 
  fallback = ''
): string {
  const targetLang = (lang || 'hi') as SupportedLanguage;
  const dictEntry = ALL_TRANSLATIONS[key];
  
  if (!dictEntry) {
    return fallback || key;
  }
  
  if (dictEntry[targetLang]) {
    return dictEntry[targetLang];
  }
  
  // Fallback to Hindi or English if specific regional language string is missing
  return dictEntry['hi'] || dictEntry['en'] || fallback || key;
}

export function getLanguageName(code: string): string {
  switch (code) {
    case 'hi': return 'हिन्दी (Hindi)';
    case 'en': return 'English';
    case 'bn': return 'বাংলা (Bengali)';
    case 'ta': return 'தமிழ் (Tamil)';
    case 'te': return 'తెలుగు (Telugu)';
    case 'mr': return 'मराठी (Marathi)';
    case 'kn': return 'ಕನ್ನಡ (Kannada)';
    case 'gu': return 'ગુજરાતી (Gujarati)';
    case 'pa': return 'ਪੰਜਾਬੀ (Punjabi)';
    case 'as': return 'অসমীয়া (Assamese)';
    case 'ml': return 'മലയാളം (Malayalam)';
    case 'or': return 'ଓଡ଼ିଆ (Odia)';
    default: return code;
  }
}
