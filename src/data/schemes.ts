import { GovernmentScheme } from '../types';

export const GOVERNMENT_SCHEMES: GovernmentScheme[] = [
  {
    id: 'pm-kisan-samman-nidhi',
    title: 'PM Kisan Samman Nidhi Yojana',
    hindiTitle: 'प्रधानमंत्री किसान सम्मान निधि योजना',
    category: 'farmers',
    categoryLabel: 'Farmers',
    badge: 'Direct Income Support',
    shortDesc: '₹6,000 per year in three direct installments of ₹2,000 to all eligible landholding farmer families.',
    hindiShortDesc: 'किसानों को प्रतिवर्ष ₹6,000 की आर्थिक मदद सीधे बैंक खाते में (₹2,000 की तीन किस्तें)।',
    detailedDesc: 'Pradhan Mantri Kisan Samman Nidhi is a central sector scheme with 100% funding from Government of India to supplement the financial needs of landholder farmers for inputs and household needs.',
    benefits: [
      '₹6,000 annual direct bank transfer (DBT) into Aadhaar-seeded bank account',
      'Paid in 3 equal four-monthly installments of ₹2,000 each',
      'No middlemen — 100% transparent direct bank credit',
      'Integrated with PM Fasal Bima and Kisan Credit Card (KCC)'
    ],
    eligibility: [
      'Small and marginal landholder farmer families with cultivable land',
      'Land records must be in the farmer family name in state portal',
      'Institutional landholders and high income-tax payers are excluded',
      'Active bank account linked with Aadhaar and mobile number'
    ],
    documents: [
      'Land Holding Documents / Khatian / RoR (खतौनी)',
      'Aadhaar Card of the farmer',
      'Bank Account Passbook (Aadhaar Seeded)',
      'Active Mobile Number linked with Aadhaar for OTP/eKYC'
    ],
    applicationSteps: [
      '1. Complete Farmer Registration on official portal or visit nearest CSC Center.',
      '2. Enter Aadhaar number and verify land registration details.',
      '3. Complete mandatory OTP biometric e-KYC.',
      '4. Sub-district/State level verification and direct DBT credit.'
    ],
    officialSourceLabel: 'pmkisan.gov.in (Official Gov Portal)',
    launchYear: '2019'
  },
  {
    id: 'national-scholarship-portal',
    title: 'Post-Matric Scholarship for Students',
    hindiTitle: 'छात्रों के लिए पोस्ट-मैट्रिक छात्रवृत्ति योजना',
    category: 'students',
    categoryLabel: 'Students',
    badge: 'Education & Tuition',
    shortDesc: 'Financial aid covering complete course fees, maintenance allowance, and book grants for higher studies.',
    hindiShortDesc: 'कॉलेज और उच्च शिक्षा के लिए शिक्षण शुल्क और मासिक भत्ते की छात्रवृत्ति।',
    detailedDesc: 'Central and state government post-matric scholarship schemes empower deserving students from low-income households to pursue Class 11, 12, ITI, Diploma, Graduation, and Post-Graduation without financial burden.',
    benefits: [
      'Full or partial reimbursement of college tuition fees',
      'Monthly maintenance allowance (₹500 to ₹1,200/month)',
      'Special annual book grant and study material subsidy',
      'Direct DBT deposit into student’s personal savings account'
    ],
    eligibility: [
      'Enrolled in recognized school, college, polytechnic, or university',
      'Annual family income below ₹2.5 Lakhs (or state specific threshold)',
      'Passed previous qualifying examination with minimum passing marks',
      'Must have an active individual bank account'
    ],
    documents: [
      'Previous year marksheet / passing certificate',
      'Valid Income Certificate issued by competent revenue authority',
      'Caste / Category Certificate (if applicable)',
      'College Admission Fee receipt and Student ID card',
      'Aadhaar-linked Bank Passbook copy'
    ],
    applicationSteps: [
      '1. Register on National Scholarship Portal (NSP) with Aadhaar.',
      '2. Fill institutional course code and upload income & fee slips.',
      '3. College verification officer verifies records online.',
      '4. State welfare officer approves scholarship amount to bank account.'
    ],
    officialSourceLabel: 'scholarships.gov.in (NSP Portal)',
    launchYear: '2020'
  },
  {
    id: 'sukanya-samriddhi-yojana',
    title: 'Sukanya Samriddhi Yojana (SSY)',
    hindiTitle: 'सुकन्या समृद्धि योजना (बालिका भविष्य खाता)',
    category: 'women',
    categoryLabel: 'Women & Girls',
    badge: 'High Interest & Tax Free',
    shortDesc: 'Small deposit savings scheme for girl child with high government interest rate (8.2%+) and Section 80C tax exemption.',
    hindiShortDesc: 'बेटियों की उच्च शिक्षा और सुरक्षित भविष्य के लिए सर्वाधिक ब्याज वाला सरकारी बचत खाता।',
    detailedDesc: 'A government-backed savings initiative launched under the "Beti Bachao, Beti Padhao" campaign to help parents accumulate dedicated education and marriage funds for girl children.',
    benefits: [
      'Guaranteed high annual compound interest (approx. 8.2% p.a.)',
      'Full tax deduction under Section 80C up to ₹1.5 Lakh/year',
      'Interest earned and maturity proceeds are completely tax-free (EEE status)',
      'Minimum deposit of only ₹250 per year; maximum ₹1.5 Lakh per year'
    ],
    eligibility: [
      'Girl child resident in India under 10 years of age at account opening',
      'Account opened by biological parents or legal guardian',
      'Maximum 2 accounts per family (one for each girl child)'
    ],
    documents: [
      'Birth Certificate of the girl child',
      'Identity & Address Proof of Parent / Legal Guardian (Aadhaar & PAN)',
      '2 Passport size photographs of parent and child',
      'Initial deposit cash/cheque (Minimum ₹250)'
    ],
    applicationSteps: [
      '1. Obtain SSY Account Opening Form from any Post Office or Bank Branch.',
      '2. Attach child birth certificate and parent Aadhaar & PAN.',
      '3. Deposit initial minimum sum of ₹250 or more.',
      '4. Collect dedicated Sukanya Samriddhi passbook for regular deposits.'
    ],
    officialSourceLabel: 'indiapost.gov.in / National Savings',
    launchYear: '2015'
  },
  {
    id: 'pm-atal-pension-yojana',
    title: 'Atal Pension Yojana (APY)',
    hindiTitle: 'अटल पेंशन योजना (गारंटीड मासिक पेंशन)',
    category: 'seniors',
    categoryLabel: 'Senior Citizens',
    badge: 'Retirement Security',
    shortDesc: 'Guaranteed monthly lifelong pension of ₹1,000 to ₹5,000 after age 60 for unorganized sector workers.',
    hindiShortDesc: '60 वर्ष की आयु के बाद ₹1,000 से ₹5,000 की निश्चित मासिक आजीवन पेंशन की सरकारी गारंटी।',
    detailedDesc: 'Atal Pension Yojana is a pension scheme focused on workers in the unorganized sector, providing a social security safety net in old age with government co-contribution and lifetime spouse protection.',
    benefits: [
      'Guaranteed monthly pension (₹1,000 / ₹2,000 / ₹3,000 / ₹4,000 / ₹5,000)',
      'Lifelong pension continues to spouse after subscriber’s death',
      'Full accumulated corpus returned to nominee upon spouse passing',
      'Very affordable monthly auto-debit starting as low as ₹42/month'
    ],
    eligibility: [
      'Any Indian citizen between 18 and 40 years of age',
      'Must hold an active Savings Bank or Post Office account',
      'Should not be an income taxpayer or member of statutory social security'
    ],
    documents: [
      'Savings Bank Account details / Passbook with auto-debit consent',
      'Aadhaar Card',
      'Nominee Details and Spouse Name',
      'Active Mobile number for annual contribution alerts'
    ],
    applicationSteps: [
      '1. Visit your bank branch or access netbanking/UPI portal.',
      '2. Fill simple 1-page APY registration form with chosen pension amount.',
      '3. Provide auto-debit consent on your savings account.',
      '4. Receive Permanent Retirement Account Number (PRAN) confirmation SMS.'
    ],
    officialSourceLabel: 'npscra.nsdl.co.in / PFRDA',
    launchYear: '2015'
  },
  {
    id: 'ayushman-bharat-pmjay',
    title: 'Ayushman Bharat (PM-JAY Health Cover)',
    hindiTitle: 'आयुष्मान भारत (मुफ़्त ₹5 लाख स्वास्थ्य बीमा)',
    category: 'healthcare',
    categoryLabel: 'Healthcare',
    badge: '₹5 Lakh Free Treatment',
    shortDesc: 'Cashless secondary and tertiary hospitalization cover up to ₹5 Lakh per family per year in empaneled hospitals.',
    hindiShortDesc: 'गंभीर बीमारियों के इलाज के लिए सरकारी व प्राइवेट अस्पतालों में प्रति वर्ष ₹5 लाख तक का कैशलेस इलाज।',
    detailedDesc: 'Ayushman Bharat Pradhan Mantri Jan Arogya Yojana is the world’s largest government-funded health assurance scheme covering over 12 crore poor and vulnerable families across India.',
    benefits: [
      '₹5 Lakh cashless medical treatment per eligible family per year',
      'Covers 1,900+ medical procedures including surgeries, ICU, medicines',
      'Pre and post hospitalization expenses covered for 3 and 15 days respectively',
      'Valid across 27,000+ empaneled government and private hospitals pan-India'
    ],
    eligibility: [
      'Families identified in SECC 2011 rural and urban vulnerability criteria',
      'All senior citizens aged 70+ irrespective of family income (New 2024 expansion)',
      'Holders of Antyodaya Anna Yojana (AAY) or priority ration cards'
    ],
    documents: [
      'Aadhaar Card of all family members',
      'Ration Card / Family Samagra ID / Ration Proof',
      'Active Mobile number for Ayushman Card OTP'
    ],
    applicationSteps: [
      '1. Check family eligibility on beneficiary portal (beneficiary.nha.gov.in).',
      '2. Complete e-KYC using Aadhaar OTP or Face Auth in the Ayushman App.',
      '3. Instant download of PVC Ayushman Card with QR code.',
      '4. Show card at hospital Ayushman Mitra desk for cashless admission.'
    ],
    officialSourceLabel: 'pmjay.gov.in (National Health Authority)',
    launchYear: '2018'
  },
  {
    id: 'pm-awas-yojana-gramin',
    title: 'PM Awas Yojana (PMAY Housing)',
    hindiTitle: 'प्रधानमंत्री आवास योजना (पक्का मकान सहायता)',
    category: 'housing',
    categoryLabel: 'Housing',
    badge: '₹1.20 Lakh Grant',
    shortDesc: 'Financial assistance of ₹1.20 Lakh to ₹1.30 Lakh for construction of permanent pucca house with toilet and clean kitchen.',
    hindiShortDesc: 'कच्चे मकानों को पक्के घर में बदलने के लिए ₹1.20 लाख तक की सरकारी आर्थिक सहायता।',
    detailedDesc: 'PMAY provides financial assistance to houseless and those living in dilapidated houses to construct a quality pucca house equipped with basic amenities like electricity, LPG connection, and toilet under Swachh Bharat.',
    benefits: [
      'Direct grant of ₹1,20,000 (Plain areas) or ₹1,30,000 (Hilly/difficult areas)',
      '90-95 days of unskilled labor wages under MGNREGS (approx. ₹20,000 extra)',
      '₹12,000 additional assistance for Swachh Bharat toilet construction',
      'Convergence with PM Ujjwala LPG and Saubhagya power connection'
    ],
    eligibility: [
      'Houseless households or families living in zero/one/two room kutcha houses',
      'Family must not own a pucca house anywhere in India',
      'Selected from prioritized Gram Sabha Socio-Economic census list'
    ],
    documents: [
      'Aadhaar Cards of all adult family members',
      'Job Card number under MGNREGA',
      'Bank Account Passbook (Direct Benefit Transfer enabled)',
      'Land ownership / Gram Panchayat village allotment certificate'
    ],
    applicationSteps: [
      '1. Gram Panchayat registers eligible households in AwaasSoft portal.',
      '2. Geo-tagging and physical verification of kutcha house site.',
      '3. First installment credited directly to bank account to start plinth work.',
      '4. Subsequent installments released following geo-tagged roof level inspection.'
    ],
    officialSourceLabel: 'pmayg.nic.in / MoRD',
    launchYear: '2016'
  },
  {
    id: 'pm-swanidhi-street-vendor',
    title: 'PM SVANidhi (Street Vendor Micro-Credit)',
    hindiTitle: 'पीएम स्वनिधि (रेहड़ी-पटरी विक्रेता लोन)',
    category: 'employment',
    categoryLabel: 'Employment & Vendors',
    badge: 'Working Capital Loan',
    shortDesc: 'Collateral-free working capital loan of ₹10,000 to ₹50,000 with 7% interest subsidy and cashback for digital transactions.',
    hindiShortDesc: 'छोटे ठेले, खोमचे और रेहड़ी-पटरी वालों के लिए ₹10,000 से ₹50,000 तक का आसान लोन।',
    detailedDesc: 'PM Street Vendor’s AtmaNirbhar Nidhi is a special micro-credit facility to support urban street vendors in resuming their livelihood with formal banking credit and digital cashback.',
    benefits: [
      'First tranche loan up to ₹10,000 repayable in 1 year',
      'Second tranche up to ₹20,000 and third tranche up to ₹50,000 on timely repayment',
      '7% per annum interest subsidy directly credited to bank account',
      'Monthly cashback up to ₹100 for receiving digital UPI payments'
    ],
    eligibility: [
      'Street vendors possessing Certificate of Vending / ID Card issued by Urban Local Body',
      'Vendors identified in Municipal survey or recommended with Letter of Recommendation (LoR)',
      'Active savings bank account'
    ],
    documents: [
      'Vending Certificate / Urban Local Body Identity Card / LoR',
      'Aadhaar Card and PAN Card',
      'Bank Account Passbook or cancelled cheque',
      'Active Mobile number linked with Aadhaar'
    ],
    applicationSteps: [
      '1. Check vending survey status or obtain Letter of Recommendation from Municipality.',
      '2. Apply through local Banking Correspondent (BC), CSC Center, or pmsvanidhi.mohua.gov.in.',
      '3. Bank sanctions loan without collateral or processing fees.',
      '4. Cash credited directly to bank account within 7 days.'
    ],
    officialSourceLabel: 'pmsvanidhi.mohua.gov.in / MoHUA',
    launchYear: '2020'
  },
  {
    id: 'standup-india-entrepreneurs',
    title: 'Stand-Up India / PM Mudra Enterprise',
    hindiTitle: 'स्टैंड-अप इंडिया / महिला व उद्यमिता लोन',
    category: 'business',
    categoryLabel: 'Entrepreneurship',
    badge: 'Business Setup',
    shortDesc: 'Bank loans between ₹10 Lakh and ₹1 Crore for setting up greenfield manufacturing, trading, or service enterprises.',
    hindiShortDesc: 'नया उद्योग या व्यापार शुरू करने के लिए ₹10 लाख से ₹1 करोड़ तक की बैंक सहायता।',
    detailedDesc: 'Facilitates bank loans between ₹10 Lakh and ₹1 Crore to at least one SC/ST borrower and at least one woman borrower per bank branch for setting up a greenfield enterprise.',
    benefits: [
      'Loan coverage from ₹10 Lakh up to ₹1 Crore for machinery, premises, and working capital',
      'Repayable in up to 7 years with a moratorium period of up to 18 months',
      'Credit guarantee support through NCGTC',
      'Handholding support with training, DPR preparation, and vendor linkages'
    ],
    eligibility: [
      'SC / ST and/or Woman entrepreneurs above 18 years of age',
      'Greenfield enterprise in manufacturing, services, agri-allied, or trading sector',
      'In non-individual enterprises, 51% shareholding held by SC/ST or woman'
    ],
    documents: [
      'Project Report & Estimated Financial projections (DPR)',
      'Identity & Address Proof (Aadhaar & PAN)',
      'Caste Certificate (for SC/ST category) or proof of enterprise control',
      'Rent Agreement / Land allotment for proposed factory/shop site'
    ],
    applicationSteps: [
      '1. Prepare simple Project Report and register on standupmitra.in.',
      '2. Select preferred scheduled commercial bank branch.',
      '3. Meet branch credit officer for project assessment.',
      '4. Loan sanctioned with direct machinery vendor disbursement.'
    ],
    officialSourceLabel: 'standupmitra.in / DFS',
    launchYear: '2016'
  }
];
