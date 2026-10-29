// Shared mock data and service layer for NEXUS AI Dashboard

export const initialAutomations = {
  callBot: [
    {
      id: 'bot-1',
      name: 'Q4 Lead Qualification Bot',
      description: 'Outbound voice agent qualifying inbound demo requests.',
      status: 'Active', // Active, Paused, Needs Attention
      lastRun: '12 mins ago',
      successRate: '94.2%',
      totalCalls: 1428,
      type: 'AI Caller Bot',
      health: 'Optimal'
    },
    {
      id: 'bot-2',
      name: 'Enterprise Renewal Outreach',
      description: 'Automated check-ins for accounts up for renewal in 60 days.',
      status: 'Paused',
      lastRun: '2 days ago',
      successRate: '88.5%',
      totalCalls: 412,
      type: 'AI Caller Bot',
      health: 'Stale'
    }
  ],
  email: [
    {
      id: 'email-1',
      name: 'SaaS Onboarding Drip Sequence',
      description: '7-step automated email sequence for new trial signups.',
      status: 'Active',
      lastRun: '4 mins ago',
      deliveryRate: '99.1%',
      openRate: '48.6%',
      totalSent: 8930,
      type: 'Email Automation',
      health: 'Optimal'
    },
    {
      id: 'email-2',
      name: 'Dormant User Re-engagement',
      description: 'Targeted win-back campaign for users inactive for 30+ days.',
      status: 'Needs Attention',
      lastRun: '1 hour ago',
      deliveryRate: '84.2%',
      openRate: '19.4%',
      totalSent: 1250,
      type: 'Email Automation',
      health: 'Bounce Spike'
    }
  ],
  scheduler: [
    {
      id: 'sched-1',
      name: 'Executive Demo Auto-Booking',
      description: 'Coordinates calendar slots for enterprise sales reps based on CRM priority.',
      status: 'Active',
      lastRun: 'Just now',
      bookingRate: '92.0%',
      totalBooked: 342,
      type: 'Smart Scheduler',
      health: 'Optimal'
    },
    {
      id: 'sched-2',
      name: 'Customer Success Quarterly Reviews',
      description: 'Recurring check-in scheduling rule for Tier-1 clients.',
      status: 'Active',
      lastRun: '3 hours ago',
      bookingRate: '96.5%',
      totalBooked: 189,
      type: 'Smart Scheduler',
      health: 'Optimal'
    }
  ]
};

export const initialActivityEvents = [
  {
    id: 'evt-1',
    type: 'Call Completed',
    module: 'AI Caller Bot',
    description: 'Qualified lead confirmed demo for Nov 2',
    timestamp: '2 mins ago',
    status: 'Success',
    client: 'Acme Corp (Sarah Jenkins)'
  },
  {
    id: 'evt-2',
    type: 'Email Sent',
    module: 'Email Automation',
    description: 'Step 3 of SaaS Onboarding sequence delivered',
    timestamp: '14 mins ago',
    status: 'Success',
    client: 'Stellar Tech (alex@stellar.io)'
  },
  {
    id: 'evt-3',
    type: 'Meeting Booked',
    module: 'Smart Scheduler',
    description: 'Enterprise demo slot confirmed with VP of Sales',
    timestamp: '38 mins ago',
    status: 'Success',
    client: 'Global Logistics (david@global.com)'
  },
  {
    id: 'evt-4',
    type: 'Execution Warning',
    module: 'Email Automation',
    description: 'High bounce rate detected on Dormant Campaign',
    timestamp: '1 hour ago',
    status: 'Needs Attention',
    client: 'Dormant Segment'
  },
  {
    id: 'evt-5',
    type: 'Bot Paused',
    module: 'AI Caller Bot',
    description: 'Enterprise Renewal Outreach paused by user',
    timestamp: '2 days ago',
    status: 'Paused',
    client: 'Internal Action'
  }
];

export const initialNotifications = [
  {
    id: 'notif-1',
    category: 'Attention',
    title: 'Email Bounce Rate Elevated',
    message: 'Dormant User Re-engagement campaign experienced an 15.8% bounce rate.',
    timestamp: '1 hour ago',
    read: false
  },
  {
    id: 'notif-2',
    category: 'Completion',
    title: 'Weekly Automation Report Ready',
    message: 'Generated operational summary: 4,682 total actions executed successfully.',
    timestamp: '5 hours ago',
    read: false
  },
  {
    id: 'notif-3',
    category: 'Team',
    title: 'New Team Member Joined',
    message: 'Elena Rostova accepted invitation as Automation Editor.',
    timestamp: '1 day ago',
    read: true
  },
  {
    id: 'notif-4',
    category: 'Security',
    title: 'API Key Rotated',
    message: 'Primary telephony gateway token was successfully rotated.',
    timestamp: '3 days ago',
    read: true
  }
];

export const initialTeamMembers = [
  {
    id: 'team-1',
    name: 'Adarsh Mishra',
    email: 'adarsh@nexus-ai.app',
    role: 'Workspace Owner',
    status: 'Active',
    avatar: 'AM'
  },
  {
    id: 'team-2',
    name: 'Elena Rostova',
    email: 'elena@nexus-ai.app',
    role: 'Automation Editor',
    status: 'Active',
    avatar: 'ER'
  },
  {
    id: 'team-3',
    name: 'Marcus Chen',
    email: 'marcus@nexus-ai.app',
    role: 'Viewer',
    status: 'Invited',
    avatar: 'MC'
  }
];

export const analyticsData = {
  overviewMetrics: {
    totalExecutions: '12,890',
    successRate: '94.8%',
    activeAutomationsCount: 5,
    hoursSaved: '312 hrs'
  },
  usageChart: [
    { day: 'Mon', calls: 320, emails: 1200, scheduler: 80 },
    { day: 'Tue', calls: 450, emails: 1450, scheduler: 95 },
    { day: 'Wed', calls: 380, emails: 1300, scheduler: 110 },
    { day: 'Thu', calls: 520, emails: 1600, scheduler: 130 },
    { day: 'Fri', calls: 490, emails: 1550, scheduler: 125 },
    { day: 'Sat', calls: 210, emails: 890, scheduler: 45 },
    { day: 'Sun', calls: 180, emails: 750, scheduler: 35 }
  ]
};
