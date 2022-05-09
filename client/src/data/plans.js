const plans = {
  specialist: [
    {
      key: 'standard',
      title: 'Standard',
      intro: 'Try out our product for free!',
      price: [0],
      name: ['free'],
      benefits: [
        'Compliance Calendar', 'Project Management'
      ]
    }, {
      key: 'full-access',
      title: 'All Access Membership',
      intro: 'Full access to all features and resources',
      price: [400],
      name: ['specialist_pro'],
      benefits: [
        'Compliance Calendar',
        'Project Management',
        'Job Board',
        'Specialist Marketplace Profile',
        'Automated Billing',
        'Client Account Access'
      ]
    }
  ],
  business: [
    {
      key: 'starter',
      title: 'Starter',
      intro: 'Try out our product for free!',
      price: [0],
      name: [
        'free'
      ],
      users: ['1 free user'],
      benefits: [
        'Compliance Calendar', 'Project Management'
      ]
    }, {
      key: 'team',
      title: 'Team',
      intro: 'Small teams and startups',
      price: [
        125, 150
      ],
      name: [
        'team_tier_annual', 'team_tier_monthly'
      ],
      users: [
        '3 free users plus $120/year per person', '3 free users plus $15/mo per person'
      ],
      freeUsers: 3,
      benefits: [
        'Compliance Calendar',
        'Project Management',
        'Policies and Procedures',
        '<b>1</b> Internal Review per year',
        'Exam Management',
        '<b>5GB</b> storage for books and records'
      ]
    }, {
      key: 'business',
      title: 'Business',
      intro: 'Medium-sized organizations',
      price: [
        210, 250
      ],
      name: [
        'business_tier_annual', 'business_tier_monthly'
      ],
      users: [
        '10 free users plus $120/year per person', '10 free users plus $15/mo per person'
      ],
      freeUsers: 10,
      benefits: [
        'Compliance Calendar',
        'Project Management',
        'Policies and Procedures',
        '<b>Unlimited</b> Internal Reviews',
        'Exam Management',
        'Auditor Portal',
        '<b>10GB</b> storage for books and records',
        '<b>Free</b> personalized onboarding'
      ]
    }
  ]
}

export { plans }
