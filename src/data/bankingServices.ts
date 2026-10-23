import { BankingService } from '../types';

export const BANKING_SERVICES: BankingService[] = [
  {
    id: 'open-savings-account',
    title: 'Open Bank Account (Savings)',
    hindiTitle: 'नया बचत खाता खोलें (Savings Account)',
    description: 'Complete step-by-step guide and documents required for opening a fresh savings account in any bank.',
    hindiDescription: 'बैंक में नया बचत खाता खुलवाने की पूरी प्रक्रिया और ज़रूरी कागज़ात।',
    icon: 'Landmark',
    category: 'account',
    explanation: 'A savings account allows you to safely store your money, earn interest, make UPI/ATM payments, and receive government subsidy benefits directly.',
    hindiExplanation: 'सेविंग्स अकाउंट में आप अपने पैसे सुरक्षित रख सकते हैं, ब्याज कमा सकते हैं और सरकारी योजनाओं का पैसा (DBT) सीधे खाते में पा सकते हैं।',
    documents: [
      {
        name: 'Identity Proof (Aadhaar / Voter ID / Passport)',
        hindiName: 'पहचान प्रमाण (आधार कार्ड / वोटर आईडी)',
        type: 'identity',
        required: true,
        description: 'Government photo identity card with your clear full name and photo.',
        sampleOptions: ['Aadhaar Card', 'Voter Identity Card', 'Passport', 'Driving License']
      },
      {
        name: 'Address Proof (Electricity bill / Ration card / Aadhaar)',
        hindiName: 'पते का प्रमाण (बिजली बिल / राशन कार्ड / आधार)',
        type: 'address',
        required: true,
        description: 'Document showing your current residential address.',
        sampleOptions: ['Aadhaar Card', 'Recent Electricity Bill (<3 months)', 'Ration Card', 'Rent Agreement']
      },
      {
        name: 'PAN Card or Form 60',
        hindiName: 'पैन कार्ड या फ़ॉर्म 60',
        type: 'pan',
        required: true,
        description: 'Permanent Account Number for tax compliance. If you do not have PAN, fill Form 60.',
        sampleOptions: ['Original PAN Card', 'Form 60 Declaration (Available at bank)']
      },
      {
        name: 'Passport Size Photographs (2 Recent Photos)',
        hindiName: 'पासपोर्ट साइज़ फोटो (2 ताज़ा रंगीन फोटो)',
        type: 'photo',
        required: true,
        description: 'Color photographs taken against a light background.',
        sampleOptions: ['2 Color passport size photos with white background']
      },
      {
        name: 'Initial Minimum Deposit Cash (₹500 - ₹2000)',
        hindiName: 'शुरुआती नकद जमा राशि (₹500 - ₹2000)',
        type: 'bank',
        required: false,
        description: 'Zero balance for Jan Dhan accounts, or nominal deposit for standard savings account.',
        sampleOptions: ['Cash or Cheque for initial balance deposit']
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Get Account Opening Form',
        hindiTitle: 'खाता खोलने का फ़ॉर्म प्राप्त करें',
        instruction: 'Ask the bank reception or helpdesk for "Savings Bank Account Opening Form" (SB Form).',
        hindiInstruction: 'बैंक के हेल्पडेस्क या काउंटर से बचत खाता खोलने का फ़ॉर्म (SB Form) मांगें।',
        tip: 'You can also scan this physical form using Jan Sahayak Form Assistant.'
      },
      {
        stepNumber: 2,
        title: 'Fill Personal & Nominee Details',
        hindiTitle: 'अपनी जानकारी और नॉमिनी का नाम भरें',
        instruction: 'Fill your name, date of birth, permanent address, mobile number, and nominate a trusted family member.',
        hindiInstruction: 'अपना नाम, जन्मतिथि, पता, मोबाइल नंबर और परिवार के किसी सदस्य को नॉमिनी के रूप में भरें।',
        tip: 'Always add a nominee to secure your family rights.'
      },
      {
        stepNumber: 3,
        title: 'Attach Photocopies with Self-Attestation',
        hindiTitle: 'दस्तावेज़ों की फ़ोटोकॉपी संलग्न कर हस्ताक्षर करें',
        instruction: 'Attach self-signed photocopies of Aadhaar and PAN Card. Carry the original documents for physical verification.',
        hindiInstruction: 'आधार और पैन कार्ड की फ़ोटोकॉपी पर अपने हस्ताक्षर (Self-attest) करके फ़ॉर्म के साथ स्टेपल करें। मूल (Original) कागज़ात साथ रखें।',
        tip: 'Never give your original documents to anyone to keep.'
      },
      {
        stepNumber: 4,
        title: 'Submit at New Accounts Counter',
        hindiTitle: 'न्यू अकाउंट्स काउंटर पर जमा करें',
        instruction: 'Hand over the form to the bank officer at Counter No. 1 or "New Accounts Desk".',
        hindiInstruction: 'बैंक के "New Accounts" काउंटर या हेल्पडेस्क अधिकारी को फ़ॉर्म और फ़ोटो सौंपें।',
        tip: 'Ask for the acknowledgement slip / application tracking number.'
      },
      {
        stepNumber: 5,
        title: 'Collect Passbook & Debit Card',
        hindiTitle: 'पासबुक और डेबिट कार्ड प्राप्त करें',
        instruction: 'Your account is usually active within 24 to 48 hours. Collect your passbook and welcome kit with ATM card.',
        hindiInstruction: 'खाता 24 से 48 घंटे में चालू हो जाता है। अपनी पासबुक और एटीएम किट प्राप्त करें।',
        tip: 'Keep your ATM PIN confidential.'
      }
    ],
    branchCounter: 'Counter 1 — New Accounts Desk',
    approxTime: '25-35 minutes at branch',
    formType: 'Account Opening Form (SB-1)'
  },
  {
    id: 'update-mobile-number',
    title: 'Update / Change Mobile Number',
    hindiTitle: 'बैंक खाते में मोबाइल नंबर बदलें या जोड़ें',
    description: 'Procedure to register your new mobile number to receive OTPs, SMS transaction alerts, and activate UPI/GooglePay.',
    hindiDescription: 'ओटीपी, एसएमएस अलर्ट और यूपीआई चालू करने के लिए नया मोबाइल नंबर रजिस्टर करें।',
    icon: 'Smartphone',
    category: 'updates',
    explanation: 'Updating your mobile number ensures all transaction SMS alerts, one-time passwords (OTP), and UPI verification SMS reach your active phone.',
    hindiExplanation: 'मोबाइल नंबर अपडेट करने से खाते की हर गतिविधि का एसएमएस अलर्ट और ओटीपी सुरक्षित तरीके से आपके फ़ोन पर आता है।',
    documents: [
      {
        name: 'Bank Passbook / Cheque Book (For Account Proof)',
        hindiName: 'बैंक पासबुक या चेक बुक',
        type: 'bank',
        required: true,
        description: 'Original passbook showing account number and IFSC code.',
        sampleOptions: ['Physical Bank Passbook', 'Cancelled Cheque']
      },
      {
        name: 'Aadhaar Card (Original & 1 Photocopy)',
        hindiName: 'आधार कार्ड (मूल व 1 फ़ोटोकॉपी)',
        type: 'identity',
        required: true,
        description: 'Used for biometric or signature KYC verification.',
        sampleOptions: ['Aadhaar Card with matching name']
      },
      {
        name: 'Handwritten Application or Bank KYC Update Slip',
        hindiName: 'प्रार्थना पत्र या मोबाइल अपडेट स्लिप',
        type: 'pan',
        required: true,
        description: 'Standard bank requisition slip for customer details modification.',
        sampleOptions: ['Bank Customer Request Form / Plain Paper Application']
      },
      {
        name: 'Active SIM Phone (To receive instant verification OTP)',
        hindiName: 'चालू मोबाइल फ़ोन (ओटीपी के लिए)',
        type: 'photo',
        required: true,
        description: 'Carry the mobile phone with new SIM card inside to receive and verify the test OTP.',
        sampleOptions: ['Working mobile phone with network signal']
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Request Mobile Update Slip',
        hindiTitle: 'मोबाइल अपडेशन स्लिप लें',
        instruction: 'Ask for the "Customer Request / Mobile Updation Form" at the customer service counter.',
        hindiInstruction: 'बैंक काउंटर से "Customer Request Form" या मोबाइल अपडेट स्लिप मांगें।',
        tip: 'Can also be done at Bank ATM if you have an active debit card.'
      },
      {
        stepNumber: 2,
        title: 'Write Old & New Mobile Numbers',
        hindiTitle: 'पुराना और नया मोबाइल नंबर लिखें',
        instruction: 'Clearly write your 10-digit new mobile number. If you recall the old number, write it in the previous column.',
        hindiInstruction: 'अपना 10 अंकों का नया मोबाइल नंबर साफ़ अक्षरों में लिखें।',
        tip: 'Double check every single digit before signing.'
      },
      {
        stepNumber: 3,
        title: 'Sign Matching Bank Signature',
        hindiTitle: 'बैंक रिकॉर्ड के अनुसार हस्ताक्षर करें',
        instruction: 'Sign the form exactly as per your account opening signature.',
        hindiInstruction: 'वही हस्ताक्षर करें जो आपने खाता खोलते समय किया था (अंगूठा लगाने वाले अंगूठा लगाएं)।',
        tip: 'If signature differs, bank may ask for Aadhaar biometric confirmation.'
      },
      {
        stepNumber: 4,
        title: 'Submit with Aadhaar Copy',
        hindiTitle: 'काउंटर पर जमा करें',
        instruction: 'Hand over the form with self-attested Aadhaar photocopy to the single window counter.',
        hindiInstruction: 'काउंटर पर फ़ॉर्म और आधार कॉपी जमा करें। अधिकारी 24 घंटे में नया नंबर एक्टिव कर देंगे।',
        tip: 'You will receive a confirmation SMS on both numbers.'
      }
    ],
    branchCounter: 'Counter 3 — Customer Service & KYC',
    approxTime: '15 minutes',
    formType: 'Customer Requisition Slip (CRF-2)'
  },
  {
    id: 'add-change-nominee',
    title: 'Add or Change Nominee (DA-1 Form)',
    hindiTitle: 'खाते में नॉमिनी का नाम जोड़ें या बदलें (फ़ॉर्म DA-1)',
    description: 'Ensure your savings are safe and legally transferable to your chosen family member in case of any eventuality.',
    hindiDescription: 'अपने खाते में किसी भरोसेमंद परिजन (नॉमिनी) का नाम दर्ज कराएं ताकि आपका पैसा सुरक्षित रहे।',
    icon: 'UserCheck',
    category: 'updates',
    explanation: 'Nomination provides legal authority to your nominated family member to receive account funds smoothly without complex court succession certificates.',
    hindiExplanation: 'नॉमिनी वह व्यक्ति होता है जिसे खातेदार के न रहने पर बैंक का पैसा कानूनी रूप से बिना किसी परेशानी के आसानी से मिल जाता है।',
    documents: [
      {
        name: 'Bank Passbook / Account Number',
        hindiName: 'बैंक पासबुक / खाता संख्या',
        type: 'bank',
        required: true,
        description: 'Your existing account passbook for branch verification.',
        sampleOptions: ['Savings Account Passbook']
      },
      {
        name: 'Nominee Details (Name, DOB, Address, Relationship)',
        hindiName: 'नॉमिनी का पूरा नाम, जन्मतिथि और रिश्ता',
        type: 'identity',
        required: true,
        description: 'Details of the person you want to nominate (Spouse, Son, Daughter, Parent).',
        sampleOptions: ['Aadhaar / Birth Certificate photocopy of the nominee']
      },
      {
        name: 'Account Holder Identity Proof (Aadhaar / Voter ID)',
        hindiName: 'खाताधारक का पहचान पत्र',
        type: 'pan',
        required: true,
        description: 'Your original ID proof to verify your account authority.',
        sampleOptions: ['Aadhaar Card', 'Voter Card']
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Obtain Form DA-1',
        hindiTitle: 'फ़ॉर्म DA-1 (नॉमिनेशन फ़ॉर्म) लें',
        instruction: 'Ask for Nomination Form DA-1 (for fresh nomination) or DA-2 (to change existing nominee).',
        hindiInstruction: 'बैंक से "Form DA-1" (नॉमिनेशन फ़ॉर्म) प्राप्त करें।',
        tip: 'Available free of cost at all branches.'
      },
      {
        stepNumber: 2,
        title: 'Fill Nominee Name & Relationship',
        hindiTitle: 'नॉमिनी का नाम, उम्र और रिश्ता दर्ज करें',
        instruction: 'Provide the exact full name, age/DOB, relationship (e.g. Wife, Son), and address.',
        hindiInstruction: 'नॉमिनी का पूरा नाम, आयु और आपसे रिश्ता (जैसे: पत्नी, पुत्र, माता) साफ़ लिखें।',
        tip: 'If the nominee is a minor (under 18), name an adult guardian as well.'
      },
      {
        stepNumber: 3,
        title: 'Sign and Get Acknowledgement',
        hindiTitle: 'हस्ताक्षर करें और रसीद प्राप्त करें',
        instruction: 'Sign the DA-1 form and ensure the bank officer stamps the acknowledgement receipt.',
        hindiInstruction: 'फ़ॉर्म पर हस्ताक्षर करके जमा करें और बैंक की मोहर लगी पावती (Acknowlegement) ज़रूर लें।',
        tip: 'Check your updated passbook later to verify "Nomination Registered: Yes".'
      }
    ],
    branchCounter: 'Counter 2 — Accounts & Modifications',
    approxTime: '15-20 minutes',
    formType: 'Nomination Form DA-1'
  },
  {
    id: 'lost-debit-card',
    title: 'Lost / Damaged ATM Card & Block',
    hindiTitle: 'खोया हुआ एटीएम कार्ड ब्लॉक करें और नया मंगवाएं',
    description: 'Immediately block a lost or stolen ATM card to protect your money and apply for a new contactless RuPay/Visa card.',
    hindiDescription: 'खोए हुए एटीएम कार्ड को तुरंत ब्लॉक करें ताकि पैसों की चोरी न हो और नया एटीएम कार्ड प्राप्त करें।',
    icon: 'CreditCard',
    category: 'cards',
    explanation: 'Blocking a misplaced card prevents unauthorized swipe, online shopping, or ATM withdrawals. You can then request a fresh card delivered to your address.',
    hindiExplanation: 'कार्ड खो जाने पर सबसे पहले उसे ब्लॉक कराना चाहिए ताकि कोई गलत इस्तेमाल न कर सके। इसके बाद नया कार्ड 7 दिनों में घर पहुंच जाता है।',
    documents: [
      {
        name: 'Account Number & Passbook',
        hindiName: 'खाता संख्या और पासबुक',
        type: 'bank',
        required: true,
        description: 'To look up your card number and initiate card hotlisting.',
        sampleOptions: ['Passbook front page copy']
      },
      {
        name: 'Identity Proof (Aadhaar Card)',
        hindiName: 'पहचान प्रमाण (आधार कार्ड)',
        type: 'identity',
        required: true,
        description: 'Photo identity to verify authorized cardholder.',
        sampleOptions: ['Aadhaar Card', 'Voter Card']
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Immediate Card Block (Toll-Free or Branch)',
        hindiTitle: 'तुरंत कार्ड ब्लॉक करें (टोल-फ्री नंबर या बैंक)',
        instruction: 'Call the bank 24x7 toll-free emergency number (e.g. 1800 1234) or visit branch immediately.',
        hindiInstruction: 'बैंक के टोल-फ्री नंबर पर कॉल करें या तुरंत शाखा में जाकर कार्ड ब्लॉक (Hotlist) करवाएं।',
        tip: 'Never delay card blocking if card is lost.'
      },
      {
        stepNumber: 2,
        title: 'Fill ATM Card Reissue Form',
        hindiTitle: 'नया एटीएम कार्ड आवेदन फ़ॉर्म भरें',
        instruction: 'Complete the ATM Card Application Form specifying your preferred card variant (RuPay Classic is economical).',
        hindiInstruction: 'नया एटीएम कार्ड प्राप्त करने का फ़ॉर्म भरें (RuPay कार्ड सबसे सस्ता और उपयोगी है)।',
        tip: 'Verify that your delivery address is accurate.'
      },
      {
        stepNumber: 3,
        title: 'Receive Card by Speed Post',
        hindiTitle: '7 दिनों में डाक द्वारा कार्ड प्राप्त करें',
        instruction: 'Your new card will arrive at your registered home address via registered Speed Post in 5 to 7 days.',
        hindiInstruction: 'नया कार्ड 5-7 दिनों में आपके घर के पते पर स्पीड पोस्ट से आ जाएगा। एटीएम जाकर पिन सेट करें।',
        tip: 'Never share the green PIN or OTP with anyone claiming to be a bank official.'
      }
    ],
    branchCounter: 'Counter 4 — Cards & Delivery Desk',
    approxTime: '10 minutes',
    formType: 'ATM Card Application & Hotlisting Form'
  },
  {
    id: 'kyc-re-verification',
    title: 'KYC Update / Periodic Re-KYC',
    hindiTitle: 'केवाईसी अपडेट (KYC Update / Re-KYC)',
    description: 'Update your official KYC records to keep your account operational and avoid debit freezes or transaction blocks.',
    hindiDescription: 'खाता बंद या फ्रीज होने से बचाने के लिए अपने ताज़ा पहचान और पते के दस्तावेज़ जमा करें।',
    icon: 'ShieldCheck',
    category: 'updates',
    explanation: 'RBI mandates periodic KYC refresh to maintain verified customer identity and uninterrupted access to ATM, Netbanking, and UPI.',
    hindiExplanation: 'आरबीआई के नियमानुसार खाते को सुचारू रखने के लिए समय-समय पर पहचान और पते का ताज़ा प्रमाण देना अनिवार्य होता है।',
    documents: [
      {
        name: 'Aadhaar Card (Original + Self-attested copy)',
        hindiName: 'आधार कार्ड (मूल व हस्ताक्षरयुक्त फ़ोटोकॉपी)',
        type: 'identity',
        required: true,
        description: 'For biometric or photo KYC verification.',
        sampleOptions: ['Aadhaar Card']
      },
      {
        name: 'PAN Card or Form 60',
        hindiName: 'पैन कार्ड या फ़ॉर्म 60',
        type: 'pan',
        required: true,
        description: 'Tax and financial identity.',
        sampleOptions: ['PAN Card copy']
      },
      {
        name: 'Recent Passport Size Color Photo (1 Photo)',
        hindiName: 'हाल की 1 रंगीन पासपोर्ट फ़ोटो',
        type: 'photo',
        required: true,
        description: 'Latest face photograph.',
        sampleOptions: ['Color passport photo']
      },
      {
        name: 'Bank Passbook (For verification)',
        hindiName: 'बैंक पासबुक',
        type: 'bank',
        required: true,
        description: 'Original passbook to stamp KYC updated status.',
        sampleOptions: ['Original Passbook']
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Obtain Re-KYC Declaration Form',
        hindiTitle: 'केवाईसी फ़ॉर्म प्राप्त करें',
        instruction: 'Collect the 1-page Re-KYC form from the customer helpdesk.',
        hindiInstruction: 'बैंक के हेल्पडेस्क से 1 पेज का केवाईसी घोषणा पत्र (KYC Form) लें।',
        tip: 'If your address has not changed, ask for the simplified "Self Declaration KYC" form.'
      },
      {
        stepNumber: 2,
        title: 'Paste Photo & Fill Account Details',
        hindiTitle: 'फ़ोटो चिपकाएं और खाता विवरण भरें',
        instruction: 'Fill your account number, current address, occupation, and paste your recent photograph.',
        hindiInstruction: 'खाता संख्या, वर्तमान पता, व्यवसाय लिखें और अपनी ताज़ा फ़ोटो चिपकाएं।',
        tip: 'Cross-sign across the bottom of the photograph.'
      },
      {
        stepNumber: 3,
        title: 'Biometric / Counter Verification',
        hindiTitle: 'बायोमेट्रिक या काउंटर पर सत्यापन',
        instruction: 'The officer will verify your Aadhaar fingerprint or signature and update the bank server immediately.',
        hindiInstruction: 'अधिकारी आपके आधार या हस्ताक्षर का मिलान करके तुरंत सिस्टम में केवाईसी अपडेट कर देंगे।',
        tip: 'Your account status updates within a few hours.'
      }
    ],
    branchCounter: 'Counter 3 — KYC & Accounts Desk',
    approxTime: '15 minutes',
    formType: 'Periodic Re-KYC Updation Form'
  },
  {
    id: 'request-cheque-book',
    title: 'Request New Cheque Book',
    hindiTitle: 'नई चेक बुक (Cheque Book) के लिए आवेदन',
    description: 'Apply for a personalized cheque book (20 or 50 leaves) for business payments, school fees, or loan EMIs.',
    hindiDescription: 'फीस, लोन या बड़े भुगतानों के लिए 20 या 50 पन्नों की चेक बुक प्राप्त करें।',
    icon: 'BookOpen',
    category: 'requests',
    explanation: 'A cheque book allows you to write non-cash bank payments safely with payee names, date limits, and account crossing protection.',
    hindiExplanation: 'चेक बुक के ज़रिए आप बिना नकद निकाले किसी भी व्यक्ति या संस्था को सुरक्षित रूप से भुगतान कर सकते हैं।',
    documents: [
      {
        name: 'Passbook or Existing Cheque Requisition Slip',
        hindiName: 'पासबुक या पुरानी चेक बुक का मांग पर्चा',
        type: 'bank',
        required: true,
        description: 'Use the re-order slip at the back of your previous cheque book.',
        sampleOptions: ['Cheque book re-order slip', 'Passbook']
      },
      {
        name: 'Identity Proof (Aadhaar / Voter ID)',
        hindiName: 'पहचान पत्र',
        type: 'identity',
        required: true,
        description: 'To confirm authorized account signer.',
        sampleOptions: ['Aadhaar Card']
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Fill Cheque Requisition Slip',
        hindiTitle: 'चेक बुक मांग पर्ची भरें',
        instruction: 'Fill account number, select 25 or 50 leaves, and sign as per bank records.',
        hindiInstruction: 'पर्ची में खाता संख्या, चेक के पन्नों की संख्या (25 या 50) चुनें और हस्ताक्षर करें।',
        tip: 'Personalized cheques have your name printed on each leaf.'
      },
      {
        stepNumber: 2,
        title: 'Submit at Single Window Counter',
        hindiTitle: 'काउंटर पर जमा करें',
        instruction: 'Hand over the slip. The cheque book is dispatched to your registered address via Speed Post within 4-6 working days.',
        hindiInstruction: 'पर्ची काउंटर पर जमा करें। 4-6 कार्यदिवसों में चेक बुक आपके घर के पते पर पहुंच जाएगी।',
        tip: 'Ensure your postal address in bank records is up to date.'
      }
    ],
    branchCounter: 'Counter 2 — Operations Desk',
    approxTime: '10 minutes',
    formType: 'Cheque Book Requisition Slip'
  },
  {
    id: 'request-passbook',
    title: 'Passbook Update & Duplicate Passbook',
    hindiTitle: 'पासबुक प्रिंटिंग या नई पासबुक (Duplicate Passbook)',
    description: 'Print your latest transaction history or obtain a new physical passbook if the old one is completely filled or lost.',
    hindiDescription: 'खाते का लेन-देन देखने के लिए पासबुक प्रिंट करवाएं या पुरानी पासबुक भर जाने पर नई पासबुक लें।',
    icon: 'Layers',
    category: 'requests',
    explanation: 'A passbook is official physical evidence of all deposits, withdrawals, government subsidies, and balance in your account.',
    hindiExplanation: 'पासबुक आपके खाते में जमा और निकाले गए पैसों का पक्का लिखित प्रमाण होती है।',
    documents: [
      {
        name: 'Existing Completed Passbook (If replacing filled passbook)',
        hindiName: 'पुरानी भरी हुई पासबुक',
        type: 'bank',
        required: false,
        description: 'Surrender filled passbook to receive continuous replacement without fee.',
        sampleOptions: ['Old passbook']
      },
      {
        name: 'Aadhaar Card / ID Proof (If passbook is lost)',
        hindiName: 'पहचान प्रमाण (यदि पासबुक खो गई हो)',
        type: 'identity',
        required: true,
        description: 'Required if issuing a duplicate passbook.',
        sampleOptions: ['Aadhaar Card', 'Voter Card']
      },
      {
        name: '1 Passport Photograph (For new passbook cover)',
        hindiName: '1 पासपोर्ट फोटो (नई पासबुक के लिए)',
        type: 'photo',
        required: false,
        description: 'For stamping on the front page of newly issued duplicate passbook.',
        sampleOptions: ['Color passport photograph']
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'For Printing: Use Automatic Passbook Kiosk',
        hindiTitle: 'प्रिंटिंग के लिए: स्वचालित कियोस्क (Swayam) मशीन',
        instruction: 'Insert passbook into the automatic printing kiosk barcode scanner at the e-corner or branch entrance.',
        hindiInstruction: 'बैंक के प्रवेश द्वार पर लगी "पासबुक प्रिंटर" मशीन में बारकोड वाला पन्ना डालें। मशीन अपने आप प्रिंट कर देगी।',
        tip: 'No human counter queue needed for simple barcode printing.'
      },
      {
        stepNumber: 2,
        title: 'For New Passbook: Approach Counter',
        hindiTitle: 'नई पासबुक के लिए: काउंटर पर जाएं',
        instruction: 'Hand over the filled passbook or fill a duplicate passbook requisition slip.',
        hindiInstruction: 'पुरानी पासबुक काउंटर पर दें। अधिकारी 5 मिनट में नई पासबुक प्रिंट करके दे देंगे।',
        tip: 'Old filled passbooks are replaced free of charge.'
      }
    ],
    branchCounter: 'Passbook Printer Kiosk / Counter 5',
    approxTime: '5-10 minutes',
    formType: 'Passbook Issue Requisition'
  },
  {
    id: 'update-address',
    title: 'Update Residential Address',
    hindiTitle: 'खाते में रहने का पता बदलें (Address Change)',
    description: 'Update your official correspondence address to ensure ATM cards, bank letters, and cheque books reach your new home.',
    hindiDescription: 'नया पता दर्ज करवाएं ताकि चेकबुक और एटीएम कार्ड सही जगह पहुंच सकें।',
    icon: 'MapPin',
    category: 'updates',
    explanation: 'Updating address keeps your postal records accurate for confidential financial deliveries.',
    hindiExplanation: 'मकान बदलने या स्थानांतरण होने पर नया पता दर्ज करना ज़रूरी होता है।',
    documents: [
      {
        name: 'New Address Proof (Aadhaar / Electricity Bill / Rent Agreement)',
        hindiName: 'नए पते का प्रमाण (आधार / बिजली बिल / किरायानामा)',
        type: 'address',
        required: true,
        description: 'Valid government document bearing the new address.',
        sampleOptions: ['Updated Aadhaar Card', 'Recent Utility Bill (<2 months)', 'Voter ID']
      },
      {
        name: 'Original Bank Passbook',
        hindiName: 'बैंक पासबुक',
        type: 'bank',
        required: true,
        description: 'For record reference and updating branch records.',
        sampleOptions: ['Bank Passbook']
      },
      {
        name: 'Address Change Application Form',
        hindiName: 'पता परिवर्तन आवेदन पत्र',
        type: 'pan',
        required: true,
        description: 'Standard bank change request form.',
        sampleOptions: ['Bank Customer Change Form']
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Fill Address Change Form',
        hindiTitle: 'पता परिवर्तन फ़ॉर्म भरें',
        instruction: 'Write your new address with full postal pincode, landmark, and district.',
        hindiInstruction: 'फ़ॉर्म में नया पता, पिनकोड, लैंडमार्क और जिला साफ़-साफ़ भरें।',
        tip: 'Ensure the pincode matches your proof document exactly.'
      },
      {
        stepNumber: 2,
        title: 'Submit with Self-Attested Proof',
        hindiTitle: 'स्व-हस्ताक्षरित प्रमाण के साथ जमा करें',
        instruction: 'Submit along with self-attested photocopy of updated Aadhaar card or utility bill.',
        hindiInstruction: 'आधार कार्ड की फ़ोटोकॉपी पर हस्ताक्षर करके काउंटर पर जमा करें।',
        tip: 'Address changes take 24-48 hours to reflect in system.'
      }
    ],
    branchCounter: 'Counter 3 — Customer Operations',
    approxTime: '15 minutes',
    formType: 'Address Updation Form'
  },
  {
    id: 'government-pm-mudra-loan',
    title: 'PM Mudra / Small Business Loan Guide',
    hindiTitle: 'पीएम मुद्रा योजना / छोटा व्यवसाय लोन जानकारी',
    description: 'Simple guidance on documents, collateral-free benefits, and application steps for small shopkeepers, artisans, and entrepreneurs.',
    hindiDescription: 'दुकानदार, कारीगर और छोटे व्यापारियों के लिए बिना गारंटी लोन की पूरी जानकारी।',
    icon: 'TrendingUp',
    category: 'loans',
    explanation: 'Pradhan Mantri Mudra Yojana offers loans up to ₹10 Lakh without needing property mortgage for setting up or expanding small businesses.',
    hindiExplanation: 'मुद्रा योजना में छोटे कारोबार शुरू करने या बढ़ाने के लिए बिना किसी संपत्ति गारंटी के ₹50,000 से ₹10 लाख तक का लोन मिलता है।',
    documents: [
      {
        name: 'Identity & Address Proof (Aadhaar & PAN)',
        hindiName: 'पहचान और पते का प्रमाण (आधार व पैन)',
        type: 'identity',
        required: true,
        description: 'Valid KYC documents of the business owner.',
        sampleOptions: ['Aadhaar Card', 'PAN Card']
      },
      {
        name: 'Business Proof / Shop License / Udyam Registration',
        hindiName: 'व्यवसाय का प्रमाण / दुकान का गुमास्ता / उद्यम पंजीकरण',
        type: 'address',
        required: true,
        description: 'Document proving business existence or shop address.',
        sampleOptions: ['Udyam Aadhar Registration (Free online)', 'Trade License', 'Shop Rent Agreement']
      },
      {
        name: 'Bank Statement (Last 6 Months)',
        hindiName: 'पिछले 6 महीने का बैंक स्टेटमेंट',
        type: 'bank',
        required: true,
        description: 'Shows active income flow and transaction turnover.',
        sampleOptions: ['Printed 6-month bank statement with branch seal']
      },
      {
        name: 'Quotation of Machinery / Project Estimate',
        hindiName: 'सामान / मशीनरी का कोटेशन या अनुमानित खर्च',
        type: 'photo',
        required: false,
        description: 'Invoice estimate of tools, raw materials or machinery to be purchased.',
        sampleOptions: ['Vendor Quotation / Equipment Price Estimate']
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Choose Mudra Loan Category (Shishu/Kishore/Tarun)',
        hindiTitle: 'लोन श्रेणी चुनें (शिशु: 50K, किशोर: 5L, तरुण: 10L)',
        instruction: 'Select Shishu (up to ₹50,000), Kishore (₹50,000 to ₹5 Lakh), or Tarun (₹5 to ₹10 Lakh) as per your requirement.',
        hindiInstruction: 'अपनी ज़रूरत के हिसाब से श्रेणी चुनें—शिशु (₹50,000 तक), किशोर (₹5 लाख तक) या तरुण (₹10 लाख तक)।',
        tip: 'Shishu loans have the easiest 1-page application.'
      },
      {
        stepNumber: 2,
        title: 'Submit Application to Bank Manager / Loan Desk',
        hindiTitle: 'शाखा प्रबंधक / लोन अधिकारी को आवेदन दें',
        instruction: 'Meet the SME / Agriculture loan officer with your simple business summary.',
        hindiInstruction: 'लोन अधिकारी से मिलें और अपना फ़ॉर्म व कोटेशन जमा करें।',
        tip: 'No processing fee or collateral mortgage is charged for Shishu category.'
      }
    ],
    branchCounter: 'Loan Officer / Branch Manager Desk',
    approxTime: '30 minutes discussion',
    formType: 'Mudra Application Form (Shishu/Kishore)'
  },
  {
    id: 'account-closure',
    title: 'Account Closure & Balance Transfer',
    hindiTitle: 'बैंक खाता बंद करना और बची राशि प्राप्त करना',
    description: 'Proper procedure to close an unused bank account, surrender debit cards/cheque leaves, and receive balance in cash or transfer.',
    hindiDescription: 'पुराना या गैर-ज़रूरी खाता नियमानुसार बंद करें और बचे हुए पैसे प्राप्त करें।',
    icon: 'XCircle',
    category: 'account',
    explanation: 'Closing inactive accounts protects you from minimum balance maintenance penalties and annual SMS/ATM debit charges.',
    hindiExplanation: 'अनावश्यक खाते को बंद करने से मिनिमम बैलेंस चार्ज और एसएमएस शुल्क से मुक्ति मिलती है और बचा हुआ पैसा तुरंत मिल जाता है।',
    documents: [
      {
        name: 'Original Bank Passbook',
        hindiName: 'मूल बैंक पासबुक',
        type: 'bank',
        required: true,
        description: 'To calculate interest and finalize balance settlement.',
        sampleOptions: ['Original Passbook']
      },
      {
        name: 'Unused Cheque Leaves & ATM Card (To Surrender)',
        hindiName: 'बचे हुए चेक और एटीएम कार्ड (जमा करने हेतु)',
        type: 'pan',
        required: true,
        description: 'All unused cheque leaves and debit card must be physically handed over for destruction.',
        sampleOptions: ['Existing ATM card', 'Unused cheques']
      },
      {
        name: 'Identity Proof (Aadhaar Card copy)',
        hindiName: 'पहचान पत्र (आधार कार्ड)',
        type: 'identity',
        required: true,
        description: 'To confirm identity of authorized account holder.',
        sampleOptions: ['Aadhaar Card']
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Fill Account Closure Form',
        hindiTitle: 'खाता बंदी फ़ॉर्म भरें',
        instruction: 'Specify the reason for closure (e.g. Relocated, Multiple accounts) and provide your other active bank account details for NEFT transfer.',
        hindiInstruction: 'फ़ॉर्म में खाता बंद करने का कारण लिखें और बची हुई राशि ट्रांसफर करने के लिए अपना दूसरा खाता नंबर दें।',
        tip: 'You can also receive balances below ₹20,000 in direct cash at the counter.'
      },
      {
        stepNumber: 2,
        title: 'Surrender Card & Cheques',
        hindiTitle: 'कार्ड और चेक सरेंडर करें',
        instruction: 'Hand over the ATM card and leftover cheque leaves to the officer.',
        hindiInstruction: 'एटीएम कार्ड और बचे हुए चेक अधिकारी को सौंपें।',
        tip: 'Collect the account closure acknowledgment receipt.'
      }
    ],
    branchCounter: 'Counter 1 / Accounts Desk',
    approxTime: '20 minutes',
    formType: 'Account Closure Request Form'
  }
];
