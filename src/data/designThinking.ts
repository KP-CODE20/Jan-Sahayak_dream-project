export interface DesignThinkingData {
  title: string;
  tagline: string;
  problemStatement: {
    coreProblem: string;
    keyPainPoints: string[];
    userQuotes: string[];
  };
  empathyMapping: {
    says: string[];
    thinks: string[];
    does: string[];
    feels: string[];
  };
  personas: {
    name: string;
    role: string;
    age: number;
    location: string;
    background: string;
    frustrations: string[];
    goals: string[];
  }[];
  solutionFramework: {
    pillar: string;
    hindiPillar: string;
    description: string;
    implementation: string;
  }[];
  impactMetrics: {
    metric: string;
    benefit: string;
  }[];
}

export const DESIGN_THINKING_DATA: DesignThinkingData = {
  title: 'JAN SAHAYAK — Design Thinking Case Study',
  tagline: 'Empowering Citizens through Voice-First, Multilingual Digital Inclusivity in Banking & Citizen Services',
  problemStatement: {
    coreProblem: 'Many citizens, particularly elderly, rural, and semi-urban first-time banking users, face severe friction navigating banks and public offices due to language barriers, technical banking jargon, missing document visits, and anxiety over complex forms.',
    keyPainPoints: [
      'Multiple Wasted Visits: Forgetting a photograph, photocopies, or original PAN, leading to 2-3 repeated trips to the branch.',
      'Language & Jargon Barriers: English/formal bank forms use terms like "Nominee", "CIF", "Bearer", "KYC" that confuse regular people.',
      'Dependence on Strangers: Citizens are forced to ask strangers or middlemen to fill forms, risking fraud or privacy breach.',
      'Scheme Obscurity: Millions miss out on Direct Benefit Transfers (DBT) and welfare schemes simply because eligibility criteria are unclear.'
    ],
    userQuotes: [
      '“I travelled 12 km by bus only to be told I forgot a passport photo.” — Ramesh Ji, 64',
      '“The bank officer handed me a 4-page English form. I was embarrassed to admit I couldn’t read it.” — Sunita Devi, 52',
      '“I want to apply for the government solar scheme, but nobody explains how to start without an agent taking a commission.” — Rahul, 23'
    ]
  },
  empathyMapping: {
    says: [
      '“Mera bank wala mobile number change karna hai, kaun sa form bharna hoga?”',
      '“Did I bring the right Xerox copies?”',
      '“Is there someone who can explain what this Nominee box means?”'
    ],
    thinks: [
      '“I hope the bank staff doesn’t scold me for making a mistake on the paper.”',
      '“I don’t want to hand my Aadhaar to an unknown person in the queue.”',
      '“I wish I could just speak to someone in my own language before leaving home.”'
    ],
    does: [
      'Visits bank branch without required photocopies or photographs.',
      'Stands in the wrong counter queue for 45 minutes.',
      'Asks tea-stall vendors or other customers to fill out money deposit slips.'
    ],
    feels: [
      'Anxious about making financial or documentation mistakes.',
      'Intimidated by institutional counters and official procedures.',
      'Relieved when guided step-by-step with clear checklist icons.'
    ]
  },
  personas: [
    {
      name: 'Ramesh Chandra Patel',
      role: 'Small Farmer & Senior Citizen',
      age: 64,
      location: 'Purba Bardhaman, West Bengal',
      background: 'Comfortable speaking Hindi and Bengali. Uses a basic smartphone for WhatsApp and YouTube calls. Has an SBI savings account for PM-Kisan DBT.',
      frustrations: [
        'Finds English bank forms intimidating and confusing.',
        'Struggles with small fonts and complex multi-page paperwork.',
        'Has returned empty-handed twice because of missing photocopies.'
      ],
      goals: [
        'Complete banking visits in a single trip with confidence.',
        'Understand what documents to carry before boarding the village bus.',
        'Use voice assistance instead of complex typing.'
      ]
    },
    {
      name: 'Sunita Devi',
      role: 'Homemaker & Micro-Artisan',
      age: 52,
      location: 'Varanasi, Uttar Pradesh',
      background: 'Runs a small home tailoring business. Wants to open a separate savings account and apply for PM Mudra Shishu loan.',
      frustrations: [
        'Relies on her son or neighbours to fill bank requisition slips.',
        'Doesn’t understand technical banking terms like "Nominee" or "KYC".',
        'Worried about sharing sensitive personal details with strangers.'
      ],
      goals: [
        'Be financially independent and manage her own account.',
        'Scan physical forms with phone and understand what each field requires.',
        'Discover women-centric welfare schemes like Sukanya Samriddhi.'
      ]
    }
  ],
  solutionFramework: [
    {
      pillar: '1. SPEAK',
      hindiPillar: 'बोलें (Natural Voice Input)',
      description: 'Zero typing required. Speak naturally in Hindi, Bengali, Tamil, or any regional language using everyday vernacular phrasing.',
      implementation: 'Simulated multi-lingual voice recognition that detects intents like "Mobile number badalna hai" without needing formal terms.'
    },
    {
      pillar: '2. UNDERSTAND',
      hindiPillar: 'समझें (Jargon-Free Explanations)',
      description: 'Complex financial procedures and forms explained in conversational, clear language with audio readouts.',
      implementation: 'Field-level "? Explain" tooltips breaking down "Nominee", "Form 60", "CIF Code" into relatable analogies.'
    },
    {
      pillar: '3. PREPARE',
      hindiPillar: 'तैयारी करें (Checklist & Pre-Fill)',
      description: 'Interactive Document Readiness Checker (🟢 Ready, 🟡 Check, 🔴 Missing) and AI demo form assistant.',
      implementation: 'Pre-filled demo templates with self-attestation reminders and clear review security warnings.'
    },
    {
      pillar: '4. VISIT',
      hindiPillar: 'बैंक जाएं (Visit Plan & Confidence)',
      description: 'A comprehensive one-page visit plan with exact counter numbers, necessary originals, and departure checks.',
      implementation: 'Downloadable/Printable Bank Visit Slip guiding the user directly to the correct desk.'
    }
  ],
  impactMetrics: [
    {
      metric: 'Zero Repeated Visits',
      benefit: 'Pre-departure checklist ensures 100% of required originals, photocopies, and photographs are packed.'
    },
    {
      metric: 'Dignified Independence',
      benefit: 'Elderly and semi-literate users fill and understand forms independently without relying on middlemen.'
    },
    {
      metric: '12+ Indian Languages',
      benefit: 'Eliminates English language barriers for 80%+ of non-English fluent citizen demographics.'
    },
    {
      metric: 'Accelerated Scheme Onboarding',
      benefit: 'Connects deserving families directly to PM-Kisan, Ayushman Bharat, PMAY, and SSY benefits.'
    }
  ]
};
