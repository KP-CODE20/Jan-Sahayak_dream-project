import { LanguageOption } from '../types';

export const LANGUAGES: LanguageOption[] = [
  {
    id: 'hi',
    code: 'hi-IN',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    flag: '🇮🇳',
    sampleGreeting: 'नमस्ते! मैं जन सहायक हूँ। मैं आपकी क्या मदद कर सकता हूँ?',
    voiceCode: 'hi-IN'
  },
  {
    id: 'en',
    code: 'en-IN',
    name: 'English',
    nativeName: 'English (India)',
    flag: '🇬🇧',
    sampleGreeting: 'Hello! I am Jan Sahayak. How can I help you today?',
    voiceCode: 'en-IN'
  },
  {
    id: 'bn',
    code: 'bn-IN',
    name: 'Bengali',
    nativeName: 'বাংলা',
    flag: '🇮🇳',
    sampleGreeting: 'নমস্কার! আমি জন সহায়ক। আমি আপনাকে কীভাবে সাহায্য করতে পারি?',
    voiceCode: 'bn-IN'
  },
  {
    id: 'ta',
    code: 'ta-IN',
    name: 'Tamil',
    nativeName: 'தமிழ்',
    flag: '🇮🇳',
    sampleGreeting: 'வணக்கம்! நான் ஜன சகாயக். நான் உங்களுக்கு எவ்வாறு உதவ முடியும்?',
    voiceCode: 'ta-IN'
  },
  {
    id: 'te',
    code: 'te-IN',
    name: 'Telugu',
    nativeName: 'తెలుగు',
    flag: '🇮🇳',
    sampleGreeting: 'నమస్కారం! నేను జన్ సహాయక్. నేను మీకు ఎలా సహాయం చేయగలను?',
    voiceCode: 'te-IN'
  },
  {
    id: 'mr',
    code: 'mr-IN',
    name: 'Marathi',
    nativeName: 'मराठी',
    flag: '🇮🇳',
    sampleGreeting: 'नमस्कार! मी जन सहायक आहे. मी तुम्हाला कशी मदत करू शकतो?',
    voiceCode: 'mr-IN'
  },
  {
    id: 'kn',
    code: 'kn-IN',
    name: 'Kannada',
    nativeName: 'ಕನ್ನಡ',
    flag: '🇮🇳',
    sampleGreeting: 'ನಮಸ್ಕಾರ! ನಾನು ಜನ ಸಹಾಯಕ. ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಲಿ?',
    voiceCode: 'kn-IN'
  },
  {
    id: 'gu',
    code: 'gu-IN',
    name: 'Gujarati',
    nativeName: 'ગુજરાતી',
    flag: '🇮🇳',
    sampleGreeting: 'નમસ્તે! હું જન સહાયક છું. હું તમારી કેવી રીતે મદદ કરી શકું?',
    voiceCode: 'gu-IN'
  },
  {
    id: 'pa',
    code: 'pa-IN',
    name: 'Punjabi',
    nativeName: 'ਪੰਜਾਬੀ',
    flag: '🇮🇳',
    sampleGreeting: 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਜਨ ਸਹਾਇਕ ਹਾਂ। ਮੈਂ ਤੁਹਾਡੀ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ?',
    voiceCode: 'pa-IN'
  },
  {
    id: 'as',
    code: 'as-IN',
    name: 'Assamese',
    nativeName: 'অসমীয়া',
    flag: '🇮🇳',
    sampleGreeting: 'নমস্কাৰ! মই জন সহায়ক। মই আপোনাক কিদৰে সহায় কৰিব পাৰোঁ?',
    voiceCode: 'as-IN'
  },
  {
    id: 'ml',
    code: 'ml-IN',
    name: 'Malayalam',
    nativeName: 'മലയാളം',
    flag: '🇮🇳',
    sampleGreeting: 'നമസ്കാരം! ഞാൻ ജന സഹായക് ആണ്. ഞാൻ നിങ്ങളെ എങ്ങനെ സഹായിക്കണം?',
    voiceCode: 'ml-IN'
  },
  {
    id: 'or',
    code: 'or-IN',
    name: 'Odia',
    nativeName: 'ଓଡ଼ିଆ',
    flag: '🇮🇳',
    sampleGreeting: 'ନମସ୍କାର! ମୁଁ ଜନ ସହାୟକ। ମୁଁ ଆପଣଙ୍କୁ କିପରି ସାହାଯ୍ୟ କରିପାରିବି?',
    voiceCode: 'or-IN'
  }
];

export const COMMON_PHRASES = {
  hi: {
    appTitle: 'जन सहायक',
    tagline: 'बैंकिंग और सरकारी सेवाएँ, अब एकदम सरल',
    goodMorning: 'शुभ प्रभात 👋',
    heroQuestion: 'आज जन सहायक आपकी क्या मदद करे?',
    askJanSahayak: 'जन सहायक से बोलकर पूछें',
    speakNaturally: 'अपनी भाषा में खुलकर बोलें',
    trySaying: 'बोलकर देखें...',
    listen: 'सुनें',
    planVisit: 'बैंक विज़िट प्लान करें →',
    scanForm: 'फ़ॉर्म स्कैन करें',
    explainForm: 'फ़ॉर्म समझें',
    prepareForm: 'फ़ॉर्म तैयार करें',
    readyToGo: '🎉 आप बैंक जाने के लिए तैयार हैं!',
    documentsNeeded: 'ज़रूरी दस्तावेज़ (Documents)',
    whatToDo: 'आपको क्या करना होगा (Steps)',
    reviewWarning: '⚠ बैंक में जमा करने से पहले जाँच लें',
    disclaimer: 'जन सहायक एक सहायक उपकरण है। कभी भी अपना OTP, PIN या पासवर्ड किसी को न बताएं।',
    demoInformation: 'डेमो जानकारी (Demo Prototype)',
    seniorMode: 'सीनियर सिटीज़न मोड',
    searchServices: 'आप क्या काम करवाना चाहते हैं?',
    searchSchemes: 'आप किस सरकारी योजना की तलाश में हैं?'
  },
  en: {
    appTitle: 'Jan Sahayak',
    tagline: 'Banking & Government Services, Made Simple',
    goodMorning: 'Good Morning 👋',
    heroQuestion: 'How can Jan Sahayak help you today?',
    askJanSahayak: 'Ask Jan Sahayak',
    speakNaturally: 'Speak naturally in your language',
    trySaying: 'Try saying...',
    listen: 'Listen',
    planVisit: 'Plan My Bank Visit →',
    scanForm: 'Scan Bank Form',
    explainForm: 'Explain This Form',
    prepareForm: 'Prepare Form',
    readyToGo: "🎉 You're Ready for your Bank Visit!",
    documentsNeeded: 'Documents You May Need',
    whatToDo: 'What to Do (Steps)',
    reviewWarning: '⚠ Review carefully before submitting at bank',
    disclaimer: 'Jan Sahayak is an independent assistance tool. Never share OTP, PIN, CVV or passwords.',
    demoInformation: 'DEMO INFORMATION (Prototype)',
    seniorMode: 'Senior Citizen Mode',
    searchServices: 'What do you want to do at the bank?',
    searchSchemes: 'What benefit or scheme are you looking for?'
  }
};
