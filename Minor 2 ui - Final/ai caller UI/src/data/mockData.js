export const initialCallHistory = [
  {
    id: 'CALL-1092',
    callerName: 'Eleanor Vance',
    phoneNumber: '+1 (555) 234-5678',
    direction: 'Incoming',
    duration: '3m 42s',
    date: '2026-10-30 14:22',
    outcome: 'Completed',
    agentName: 'Aria (Support Lead)',
    transcript: [
      { speaker: 'AI', text: 'Thank you for calling NEXUS AI Support. My name is Aria. How can I assist you today?', time: '00:01' },
      { speaker: 'Caller', text: 'Hi Aria, I am having trouble resetting my enterprise password and getting locked out.', time: '00:08' },
      { speaker: 'AI', text: 'I can certainly help you with that securely. Could you please confirm the email address on your account?', time: '00:15' },
      { speaker: 'Caller', text: 'Sure, it is eleanor.vance@acmecorp.com', time: '00:22' },
      { speaker: 'AI', text: 'Thank you Eleanor. I have just triggered a secure one-time passcode to your registered recovery device. Please check your phone.', time: '00:35' },
      { speaker: 'Caller', text: 'Got it! Received the code. What next?', time: '00:48' },
      { speaker: 'AI', text: 'Enter that code on your login portal prompt within 5 minutes. You will then be able to set a new secure password.', time: '00:56' },
      { speaker: 'Caller', text: 'Wonderful, it worked! Thanks for the prompt help.', time: '01:10' },
      { speaker: 'AI', text: 'You are very welcome, Eleanor! Have a productive rest of your day.', time: '01:15' }
    ],
    notes: 'Caller successfully authenticated via OTP and reset enterprise credentials. No further action needed.',
    followUpRequired: false
  },
  {
    id: 'CALL-1091',
    callerName: 'Marcus Sterling',
    phoneNumber: '+1 (555) 890-1234',
    direction: 'Outgoing',
    duration: '1m 15s',
    date: '2026-10-30 13:45',
    outcome: 'Follow-up',
    agentName: 'Nexus Sales Outbound',
    transcript: [
      { speaker: 'AI', text: 'Hello Marcus, this is Orion calling on behalf of NEXUS AI following up on your requested API evaluation demo.', time: '00:02' },
      { speaker: 'Caller', text: 'Oh hello! Yes, we have been testing the sandbox environment.', time: '00:10' },
      { speaker: 'AI', text: 'Fantastic. Have you had a chance to review our webhook throughput documentation?', time: '00:18' },
      { speaker: 'Caller', text: 'Partially, but we wanted to schedule a technical deep dive with an engineer next week.', time: '00:30' },
      { speaker: 'AI', text: 'I have noted that preference. I will have our senior solutions engineer reach out to coordinate a slot.', time: '00:45' }
    ],
    notes: 'Expressed interest in technical deep dive. Scheduled follow-up callback for next Tuesday.',
    followUpRequired: true
  },
  {
    id: 'CALL-1090',
    callerName: 'Dr. Harrison Wells',
    phoneNumber: '+1 (555) 432-8765',
    direction: 'Incoming',
    duration: '0m 45s',
    date: '2026-10-30 11:10',
    outcome: 'Missed',
    agentName: 'Aria (Support Lead)',
    transcript: [
      { speaker: 'AI', text: 'Thank you for calling NEXUS AI Support. How can I assist you?', time: '00:01' },
      { speaker: 'Caller', text: 'Hello? Is anyone there?', time: '00:05' },
      { speaker: 'AI', text: 'I am listening! How may I help you today?', time: '00:09' },
      { speaker: 'Caller', text: 'Sorry, wrong number.', time: '00:12' },
      { speaker: 'AI', text: 'No problem at all. Have a wonderful day!', time: '00:14' }
    ],
    notes: 'Caller disconnected immediately after dialing. Marked as missed/abandoned.',
    followUpRequired: false
  },
  {
    id: 'CALL-1089',
    callerName: 'Samantha Brooks',
    phoneNumber: '+1 (555) 345-6789',
    direction: 'Outgoing',
    duration: '2m 10s',
    date: '2026-10-30 09:30',
    outcome: 'Completed',
    agentName: 'Nexus Sales Outbound',
    transcript: [
      { speaker: 'AI', text: 'Good morning Samantha, this is Orion from NEXUS AI checking in on your trial renewal.', time: '00:02' },
      { speaker: 'Caller', text: 'Hi! Yes, we decided to upgrade to the Enterprise Tier yesterday.', time: '00:12' },
      { speaker: 'AI', text: 'That is wonderful news! I see the subscription update in our records. Is there anything else I can assist with?', time: '00:25' },
      { speaker: 'Caller', text: 'Everything is running smoothly. Thanks for checking in!', time: '00:40' }
    ],
    notes: 'Trial upgraded successfully to Enterprise Tier. Customer is extremely satisfied.',
    followUpRequired: false
  },
  {
    id: 'CALL-1088',
    callerName: 'Unknown Caller',
    phoneNumber: '+1 (555) 987-6543',
    direction: 'Incoming',
    duration: '0m 12s',
    date: '2026-10-29 17:05',
    outcome: 'Failed',
    agentName: 'Aria (Support Lead)',
    transcript: [
      { speaker: 'AI', text: 'Thank you for calling NEXUS AI. How can I help?', time: '00:01' },
      { speaker: 'Caller', text: '[Static / Unclear audio]', time: '00:05' },
      { speaker: 'AI', text: 'I am having trouble hearing you clearly. Could you repeat that?', time: '00:08' },
      { speaker: 'Caller', text: '[Call dropped]', time: '00:11' }
    ],
    notes: 'Call dropped due to poor carrier signal quality.',
    followUpRequired: false
  }
];

export const initialAiProfile = {
  profileName: 'Aria — Enterprise Support Lead',
  description: 'Primary customer support AI agent specialized in secure authentication, billing inquiries, and tier-1 troubleshooting.',
  persona: 'Professional, Empathetic, Concise & Secure',
  voicePreset: 'Nova (Warm, Natural US Female)',
  speechRate: '1.0x (Standard)',
  pitch: 'Medium-High (Calm)',
  interruptSensitivity: 'Medium (Smart Pause Detection)',
  defaultScript: 'Customer Support & Troubleshooting Flow v2',
  status: 'Active & Online'
};

export const initialScripts = [
  {
    id: 'SCRIPT-01',
    title: 'Customer Support & Troubleshooting Flow v2',
    category: 'Support',
    description: 'Standard inbound protocol for verifying identity, diagnosing issues, and resolving technical tickets.',
    steps: [
      { step: 1, name: 'Greeting & Verification', action: 'Greet caller warmly, state AI identity, and request account email or verification code.' },
      { step: 2, name: 'Issue Classification', action: 'Listen actively, categorize issue into Billing, Auth, API, or General, and confirm understanding.' },
      { step: 3, name: 'Resolution / Troubleshooting', action: 'Provide step-by-step instructions or trigger automated secure passcode dispatch.' },
      { step: 4, name: 'Satisfaction Check & Closing', action: 'Confirm issue is fully resolved, offer additional assistance, and close courteously.' }
    ],
    active: true
  },
  {
    id: 'SCRIPT-02',
    title: 'Outbound Sales & Product Demo Follow-up',
    category: 'Sales',
    description: 'Engages inbound trial signups or webinar attendees to book technical deep dives and assess tier suitability.',
    steps: [
      { step: 1, name: 'Contextual Hook', action: 'Mention recent signup or resource download and check current evaluation status.' },
      { step: 2, name: 'Needs Discovery', action: 'Inquire about team size, infrastructure requirements, and primary use cases.' },
      { step: 3, name: 'Call to Action', action: 'Offer a technical walkthrough with a solutions engineer and propose schedule options.' }
    ],
    active: false
  },
  {
    id: 'SCRIPT-03',
    title: 'Billing & Invoice Inquiry Handler',
    category: 'Billing',
    description: 'Handles subscription updates, payment failures, invoice downloads, and receipt verifications.',
    steps: [
      { step: 1, name: 'Secure Authentication', action: 'Verify billing zip code and last 4 digits of payment method.' },
      { step: 2, name: 'Invoice Lookup', action: 'Retrieve statement details and explain recent charges clearly.' },
      { step: 3, name: 'Action Execution', action: 'Process card update or email invoice copy directly.' }
    ],
    active: false
  }
];

export const initialFaqs = [
  {
    id: 'FAQ-1',
    question: 'How do I reset my enterprise account password securely?',
    category: 'Authentication',
    answer: 'You can request a secure one-time passcode (OTP) via our automated voice assistant or through the web portal login page. The code expires in 5 minutes.'
  },
  {
    id: 'FAQ-2',
    question: 'What are the API rate limits for Enterprise Tier customers?',
    category: 'API & Technical',
    answer: 'Enterprise customers enjoy a default rate limit of 10,000 requests per minute with burst capacity up to 25,000 requests per minute.'
  },
  {
    id: 'FAQ-3',
    question: 'How does NEXUS AI handle data privacy and call recordings?',
    category: 'Security & Compliance',
    answer: 'All audio recordings and transcripts are encrypted at rest (AES-256) and in transit (TLS 1.3). We are SOC 2 Type II and GDPR compliant.'
  },
  {
    id: 'FAQ-4',
    question: 'Can I customize the voice tone and speaking rate of my AI caller bot?',
    category: 'Voice Customization',
    answer: 'Yes! Navigate to the AI Profile tab to adjust voice presets, speech rate, pitch, and persona characteristics.'
  }
];

export const initialDocuments = [
  { id: 'DOC-101', name: 'NEXUS_AI_Enterprise_Security_Whitepaper_2026.pdf', size: '2.4 MB', type: 'PDF Document', updated: '2026-10-15' },
  { id: 'DOC-102', name: 'Caller_Bot_API_Integration_Guide_v3.pdf', size: '1.8 MB', type: 'PDF Document', updated: '2026-10-20' },
  { id: 'DOC-103', name: 'Voice_Persona_Tuning_Best_Practices.docx', size: '840 KB', type: 'Word Document', updated: '2026-10-22' },
  { id: 'DOC-104', name: 'Compliance_and_Data_Retention_Policy.pdf', size: '3.1 MB', type: 'PDF Document', updated: '2026-10-25' }
];

export const reportMetrics = {
  totalCallsToday: 142,
  avgDuration: '2m 18s',
  completionRate: '91.5%',
  failureRate: '2.1%',
  incomingCount: 98,
  outgoingCount: 44,
  outcomesBreakdown: {
    Completed: 118,
    Missed: 14,
    Failed: 3,
    FollowUp: 7
  },
  hourlyActivity: [
    { hour: '08:00', calls: 8 },
    { hour: '09:00', calls: 19 },
    { hour: '10:00', calls: 24 },
    { hour: '11:00', calls: 31 },
    { hour: '12:00', calls: 18 },
    { hour: '13:00', calls: 22 },
    { hour: '14:00', calls: 26 },
    { hour: '15:00', calls: 15 },
    { hour: '16:00', calls: 9 }
  ],
  agentPerformance: [
    { agent: 'Aria (Support Lead)', calls: 84, successRate: '94.0%' },
    { agent: 'Orion (Sales Outbound)', calls: 44, successRate: '88.6%' },
    { agent: 'Echo (Billing Assistant)', calls: 14, successRate: '92.8%' }
  ]
};
