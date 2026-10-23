import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';
import { Navbar } from '../common/Navbar';
import { BANKING_SERVICES } from '../../data/bankingServices';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  ClipboardCheck, 
  RefreshCw, 
  MessageSquare,
  Building2,
  ShieldCheck,
  Send,
  HelpCircle,
  FileCheck2,
  UserCheck
} from 'lucide-react';
import { playChime, speakText, stopSpeaking } from '../../utils/speech';
import { saveVoiceInteractionToSupabase } from '../../services/supabaseClient';

interface QnAPreset {
  id: string;
  userSpeech: string;
  userSpeechHindi: string;
  shortTitle: string;
  aiResponseHindi: string;
  aiResponseEnglish: string;
  category: string;
  suggestedAction?: {
    label: string;
    screen: 'form-scanner' | 'ai-review' | 'document-checker' | 'visit-planner' | 'sources';
  };
}

const EXTENDED_VOICE_QUERIES: QnAPreset[] = [
  {
    id: 'how-to-fill',
    userSpeech: 'Mujhe ye form kaise bharna hai?',
    userSpeechHindi: 'मुझे यह बैंक फ़ॉर्म कैसे भरना है?',
    shortTitle: 'Form Filling Guidance',
    category: 'Form Help',
    aiResponseHindi: 'फ़ॉर्म भरने के लिए सबसे पहले अपने नाम और पते की स्पेलिंग आधार कार्ड जैसी बड़े अक्षरों में लिखें। जहाँ पैन नंबर मांगा है वहाँ पैन या फ़ॉर्म 60 लिखें, और अंत में नॉमिनी का नाम दर्ज करें। आप चाहें तो फ़ॉर्म स्कैनर से भी सहायता ले सकते हैं।',
    aiResponseEnglish: 'To fill this form, start by writing your full name in BLOCK LETTERS matching your Aadhaar. Provide your date of birth, residential address, mobile number, and PAN. You can also scan your physical form with Jan Sahayak to review each field step-by-step.',
    suggestedAction: {
      label: 'Scan Bank Form Now',
      screen: 'form-scanner'
    }
  },
  {
    id: 'what-to-write-here',
    userSpeech: 'Yahan kya likhna hai?',
    userSpeechHindi: 'यहाँ इस कॉलम में क्या लिखना है?',
    shortTitle: 'Field Explanation',
    category: 'Form Help',
    aiResponseHindi: 'इस कॉलम में आपको अपना स्थायी आवासीय पता और 6 अंकों का सही पिनकोड लिखना है ताकि आपकी पासबुक और डेबिट कार्ड सही पते पर डाक द्वारा पहुँच सकें।',
    aiResponseEnglish: 'In this column, enter your complete residential address including house number, landmark, and 6-digit postal PIN code so your passbook and ATM card reach your home securely.',
    suggestedAction: {
      label: 'Review AI Suggestions',
      screen: 'ai-review'
    }
  },
  {
    id: 'ifsc-location',
    userSpeech: 'IFSC code kahan milega?',
    userSpeechHindi: 'बैंक का IFSC कोड कहाँ मिलेगा?',
    shortTitle: 'Find IFSC Code',
    category: 'Banking Query',
    aiResponseHindi: 'IFSC कोड 11 अक्षरों का होता है। यह आपकी बैंक पासबुक के पहले पन्ने पर, चेकबुक के ऊपर या बैंक शाखा के बाहर बोर्ड पर लिखा होता है (जैसे SBIN0000001)।',
    aiResponseEnglish: 'Your 11-digit IFSC code can be found printed on the first page of your bank passbook, top-left of your cheque leaf, or on the bank branch sign board (e.g., SBIN0000001 for Kolkata Main).',
    suggestedAction: {
      label: 'View Official Sources',
      screen: 'sources'
    }
  },
  {
    id: 'kyc-docs',
    userSpeech: 'KYC ke liye kaunse documents chahiye?',
    userSpeechHindi: 'KYC के लिए कौन-कौन से दस्तावेज़ चाहिए?',
    shortTitle: 'KYC Documents Checklist',
    category: 'KYC & Identity',
    aiResponseHindi: 'KYC के लिए आपको 3 मुख्य दस्तावेज़ चाहिए: 1) पहचान का प्रमाण (आधार कार्ड या वोटर आईडी), 2) पते का प्रमाण (बिजली बिल या आधार), और 3) पैन कार्ड अथवा फ़ॉर्म 60 के साथ 2 पासपोर्ट आकार की फ़ोटो।',
    aiResponseEnglish: 'For standard KYC, you need: 1) Identity Proof (Aadhaar or Voter ID), 2) Address Proof (Electricity bill or Aadhaar), and 3) PAN Card or Form 60 along with 2 recent passport-size photographs.',
    suggestedAction: {
      label: 'Check My Documents Readiness',
      screen: 'document-checker'
    }
  },
  {
    id: 'update-account',
    userSpeech: 'Mera account update karne ke liye kya karna hoga?',
    userSpeechHindi: 'मेरा अकाउंट अपडेट करने के लिए क्या करना होगा?',
    shortTitle: 'Account Updation Procedure',
    category: 'Branch Procedure',
    aiResponseHindi: 'अकाउंट अपडेट (जैसे मोबाइल नंबर, पता या हस्ताक्षर बदलना) के लिए अपनी होम ब्रांच के काउंटर 3 पर जाएं, कस्टमर रिक्वेस्ट फ़ॉर्म भरें और आधार कार्ड की स्व-हस्ताक्षरित प्रति संलग्न करें।',
    aiResponseEnglish: 'To update your account details (like phone number, address, or signature), visit Counter 3 at your home branch with a filled Customer Request Form and a self-attested Aadhaar photocopy.',
    suggestedAction: {
      label: 'Plan Bank Visit',
      screen: 'visit-planner'
    }
  },
  {
    id: 'nominee-meaning',
    userSpeech: 'Is form mein nominee ka kya matlab hai?',
    userSpeechHindi: 'इस फ़ॉर्म में नॉमिनी का क्या मतलब है?',
    shortTitle: 'Nominee Meaning & Importance',
    category: 'Banking Concepts',
    aiResponseHindi: 'नॉमिनी वह भरोसेमंद व्यक्ति (जैसे आपकी माता, पिता, पत्नी या संतान) है जिसे किसी अनहोनी की स्थिति में बैंक खाते की जमा राशि बिना किसी कानूनी परेशानी के सुरक्षित रूप से प्राप्त करने का अधिकार होता है।',
    aiResponseEnglish: 'A Nominee is a trusted family member (e.g. spouse, mother, child) who is legally designated to receive your deposited bank funds safely without court probate delays in case of any unforeseen event.',
    suggestedAction: {
      label: 'View Regulatory Sources',
      screen: 'sources'
    }
  },
  {
    id: 'explain-in-hindi',
    userSpeech: 'Mujhe Hindi mein samjhao.',
    userSpeechHindi: 'मुझे हिंदी में समझाओ।',
    shortTitle: 'Hindi Language Assistance',
    category: 'Language',
    aiResponseHindi: 'नमस्ते! मैं आपको सभी बैंकिंग नियम और फ़ॉर्म भरने के तरीके सरल व शुद्ध हिंदी में समझाऊँगा। आप जो भी पूछना चाहते हैं, बेझिझक बोलकर पूछें।',
    aiResponseEnglish: 'Namaste! I will explain all banking rules and form instructions in simple Hindi. Feel free to speak or ask any question anytime.',
    suggestedAction: {
      label: 'Scan Bank Form',
      screen: 'form-scanner'
    }
  }
];

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  hindiText?: string;
  timestamp: string;
  suggestedAction?: {
    label: string;
    screen: 'form-scanner' | 'ai-review' | 'document-checker' | 'visit-planner' | 'sources';
  };
}

export const VoiceAssistantScreen: React.FC = () => {
  const { 
    selectedLanguage, 
    seniorMode, 
    navigateTo, 
    readAloud,
    voiceAudioEnabled
  } = useApp();

  const [isListening, setIsListening] = useState<boolean>(false);
  const [customInputText, setCustomInputText] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'assistant',
      text: 'Hello! I am Jan Sahayak. Ask me any question about bank forms, KYC, IFSC code, or branch procedures.',
      hindiText: 'नमस्ते! मैं जन सहायक हूँ। बैंक फ़ॉर्म भरने, KYC, IFSC कोड या शाखा से जुड़ा कोई भी सवाल बोलकर पूछें।',
      timestamp: 'Just now'
    }
  ]);

  const isHindi = selectedLanguage === 'hi';
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isListening]);

  const handleTriggerQuery = (queryItem: QnAPreset) => {
    stopSpeaking();
    setIsListening(true);
    playChime('mic-start');

    // Add user message
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: queryItem.userSpeech,
      hindiText: queryItem.userSpeechHindi,
      timestamp: 'Just now'
    };

    setTimeout(() => {
      setIsListening(false);
      playChime('recognize');

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: queryItem.aiResponseEnglish,
        hindiText: queryItem.aiResponseHindi,
        timestamp: 'Just now',
        suggestedAction: queryItem.suggestedAction
      };

      setChatHistory(prev => [...prev, userMsg, aiMsg]);

      // Automatically sync voice query & response to Supabase
      saveVoiceInteractionToSupabase({
        userQuery: isHindi ? queryItem.userSpeechHindi : queryItem.userSpeech,
        aiResponse: isHindi ? queryItem.aiResponseHindi : queryItem.aiResponseEnglish,
        language: selectedLanguage,
        category: queryItem.category
      });

      if (voiceAudioEnabled) {
        const textToRead = isHindi ? queryItem.aiResponseHindi : queryItem.aiResponseEnglish;
        const voiceCode = isHindi ? 'hi-IN' : 'en-IN';
        speakText(textToRead, voiceCode);
      }
    }, 1200);
  };

  const handleStartListening = () => {
    // Pick the first query or rotate
    const nextQuery = EXTENDED_VOICE_QUERIES[chatHistory.length % EXTENDED_VOICE_QUERIES.length];
    handleTriggerQuery(nextQuery);
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInputText.trim()) return;

    const lower = customInputText.toLowerCase();
    let matched = EXTENDED_VOICE_QUERIES[0];
    if (lower.includes('ifsc') || lower.includes('आईएफएससी') || lower.includes('code')) {
      matched = EXTENDED_VOICE_QUERIES[2];
    } else if (lower.includes('kyc') || lower.includes('document') || lower.includes('कागज़')) {
      matched = EXTENDED_VOICE_QUERIES[3];
    } else if (lower.includes('update') || lower.includes('mobile') || lower.includes('नंबर')) {
      matched = EXTENDED_VOICE_QUERIES[4];
    } else if (lower.includes('nominee') || lower.includes('नॉमिनी')) {
      matched = EXTENDED_VOICE_QUERIES[5];
    } else if (lower.includes('hindi') || lower.includes('हिंदी')) {
      matched = EXTENDED_VOICE_QUERIES[6];
    } else if (lower.includes('yahan') || lower.includes('kya')) {
      matched = EXTENDED_VOICE_QUERIES[1];
    }

    setCustomInputText('');
    handleTriggerQuery(matched);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 flex flex-col justify-between">
      <Header title="Voice Assistant" showBack={true} />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Top Header Card */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#159A9C]/10 text-[#159A9C] text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#F4A340]" />
            <span>Voice-First Multi-Turn Assistant</span>
          </div>

          <h2 className={`font-extrabold text-[#173B57] tracking-tight ${seniorMode ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'}`}>
            {isListening 
              ? (isHindi ? '🎙️ आपकी आवाज़ सुन रहे हैं...' : '🎙️ Listening...') 
              : (isHindi ? '“बोलिए, जन सहायक आपकी क्या मदद करे?”' : '“Speak naturally in your language”')}
          </h2>

          {/* LARGE CIRCULAR MICROPHONE BUTTON */}
          <div className="relative my-3 flex items-center justify-center">
            {isListening && (
              <>
                <div className="absolute w-36 h-36 rounded-full bg-[#F4A340]/20 animate-ping"></div>
                <div className="absolute w-28 h-28 rounded-full bg-[#159A9C]/30 animate-pulse"></div>
              </>
            )}

            <button
              onClick={handleStartListening}
              disabled={isListening}
              className={`relative z-10 w-20 h-20 sm:w-24 sm:h-24 rounded-full flex flex-col items-center justify-center text-white shadow-xl transition-all active:scale-95 cursor-pointer ${
                isListening
                  ? 'bg-gradient-to-tr from-red-500 to-[#F4A340] ring-4 ring-red-300 animate-pulse'
                  : 'bg-gradient-to-tr from-[#173B57] to-[#159A9C] hover:from-[#159A9C] hover:to-[#173B57]'
              }`}
              aria-label="Tap to speak"
            >
              <Mic className={`w-8 h-8 sm:w-10 sm:h-10 ${isListening ? 'text-white' : 'text-[#F4A340]'}`} />
              <span className="text-[9px] font-bold mt-0.5 tracking-wider uppercase">
                {isListening ? 'Listening…' : 'Tap to Speak'}
              </span>
            </button>
          </div>

          {/* Spoken Query Suggestions Pills */}
          <div className="pt-2 text-left space-y-2">
            <span className="text-xs font-bold text-slate-500 block">
              {isHindi ? 'बोलकर पूछें (Frequently Asked Queries):' : 'Try Asking:'}
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {EXTENDED_VOICE_QUERIES.slice(0, 6).map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleTriggerQuery(item)}
                  className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left transition hover:border-[#159A9C] text-xs flex items-center gap-2 group cursor-pointer shadow-2xs"
                >
                  <span className="text-sm">🎙️</span>
                  <div className="min-w-0">
                    <span className="text-slate-800 font-bold group-hover:text-[#173B57] block truncate">
                      {isHindi ? item.userSpeechHindi : item.userSpeech}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">{item.shortTitle}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* MULTI-TURN CONVERSATION THREAD */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-[#173B57] uppercase tracking-wider">
              {isHindi ? 'बातचीत इतिहास (Conversation Thread)' : 'Conversation Thread'}
            </h3>
            {chatHistory.length > 1 && (
              <button
                onClick={() => setChatHistory([chatHistory[0]])}
                className="text-xs text-slate-500 hover:text-rose-600 font-semibold"
              >
                Clear History
              </button>
            )}
          </div>

          <div className="space-y-3">
            {chatHistory.map((msg) => {
              const isUser = msg.sender === 'user';
              const textContent = isHindi ? (msg.hindiText || msg.text) : msg.text;

              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${isUser ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2`}
                >
                  {!isUser && (
                    <div className="w-8 h-8 rounded-full bg-[#173B57] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                      JS
                    </div>
                  )}

                  <div
                    className={`p-4 rounded-2xl max-w-[85%] sm:max-w-[75%] space-y-2 shadow-xs ${
                      isUser
                        ? 'bg-[#173B57] text-white rounded-tr-xs'
                        : 'bg-white text-slate-800 border border-slate-200 rounded-tl-xs'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${isUser ? 'text-[#F4A340]' : 'text-[#159A9C]'}`}>
                        {isUser ? 'You asked:' : 'Jan Sahayak:'}
                      </span>

                      {!isUser && (
                        <button
                          onClick={() => readAloud(textContent)}
                          className="text-[#159A9C] hover:text-[#173B57] flex items-center gap-1 text-xs font-bold"
                          title="Read Aloud"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>Listen</span>
                        </button>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm font-medium leading-relaxed">
                      {textContent}
                    </p>

                    {/* Action Shortcut Button if AI provided one */}
                    {msg.suggestedAction && (
                      <div className="pt-2 border-t border-slate-100">
                        <button
                          onClick={() => navigateTo(msg.suggestedAction!.screen)}
                          className="py-1.5 px-3 rounded-lg bg-[#159A9C]/10 hover:bg-[#159A9C]/20 text-[#159A9C] font-bold text-xs flex items-center gap-1.5 transition"
                        >
                          <span>{msg.suggestedAction.label}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>

                  {isUser && (
                    <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-xs shrink-0">
                      KP
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div ref={chatBottomRef} />
        </div>

        {/* Text Input Fallback Bar */}
        <form onSubmit={handleTextSubmit} className="pt-2 flex items-center gap-2">
          <input
            type="text"
            value={customInputText}
            onChange={(e) => setCustomInputText(e.target.value)}
            placeholder={isHindi ? 'या यहाँ लिखकर पूछें (उदा: IFSC कोड कहाँ मिलेगा)...' : 'Or type your banking question here...'}
            className="flex-1 bg-white border border-slate-300 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#159A9C] shadow-2xs text-slate-900"
          />
          <button
            type="submit"
            className="bg-[#173B57] hover:bg-[#159A9C] text-white p-3 rounded-xl transition shadow-xs shrink-0 cursor-pointer"
            aria-label="Send query"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </main>

      <Navbar />
    </div>
  );
};
