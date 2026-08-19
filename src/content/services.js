// The four productised engagements. Prices and scope are the canonical copy —
// edit here and both the home page cards and the services page follow.
export const services = [
  {
    slug: 'diagnostic',
    name: 'Engineering / CTO Diagnostic',
    price: '$500',
    duration: '90 minutes + written action plan',
    summary:
      'A focused working session on the decision in front of you, followed by a written action plan you can hand to your team.',
    body: [
      'You bring the problem. We spend ninety minutes on it properly — not a sales call, not a discovery call, the actual problem. Afterwards you get a written action plan: what I would do, in what order, and what I would not bother with.',
      'This is the right starting point if you are not sure what you need yet. It is also a fine place to stop.',
    ],
    goodFor: [
      'Architecture decisions',
      'AI strategy',
      'Engineering organization problems',
      'Cloud and infrastructure problems',
      'Scaling problems',
      'Technical due diligence',
      'Rescuing troubled projects',
    ],
  },
  {
    slug: 'ai-automation-sprint',
    name: 'AI Automation Sprint',
    price: '$2,500',
    duration: 'Tightly scoped, 2–3 days',
    summary:
      'Show me a repetitive process that is costing your company time. I will find out whether AI can eliminate it — and build the thing where practical.',
    body: [
      'Show me a repetitive process that is costing your company time. I will determine whether AI or automation can eliminate it, and build a working solution where practical.',
      'The honest version of this offer includes the possibility that the answer is no. If automation is the wrong tool for your process, you will hear that on day one rather than after a quarter of spend — and you will still get the analysis of why, and what would actually help.',
    ],
    goodFor: [
      'Manual processes that scale with headcount',
      'Repetitive internal workflows',
      'Document and data handling that eats analyst time',
      'Deciding whether an AI idea is worth funding',
    ],
  },
  {
    slug: 'engineering-rescue-sprint',
    name: 'Engineering Rescue Sprint',
    price: '$3,500–$5,000',
    duration: 'One week',
    summary:
      'One week aimed at a single technical bottleneck — the one everybody already knows about but nobody has had the room to fix.',
    body: [
      'A week of concentrated attention on one specific bottleneck. I work the problem directly and hands-on, alongside your team rather than around them, and leave behind both the fix and the explanation of it.',
      'Scope is agreed before we start, so the price is known before you commit.',
    ],
    goodFor: [
      'A stalled MVP',
      'An unreliable system',
      'A problematic architecture',
      'A slow development process',
      'A cloud-cost problem',
      'CI/CD problems',
      'An AI prototype that is not production-ready',
    ],
  },
  {
    slug: 'fractional-cto',
    name: 'Fractional CTO / Principal Engineer',
    price: '$6,000–$12,000',
    priceSuffix: '/month',
    duration: 'Roughly 1–2 days per week, depending on scope',
    summary:
      'Ongoing senior technical leadership for companies that need the judgement of a CTO but do not yet need to hire one.',
    body: [
      'Sustained involvement: architecture and technical strategy, engineering practices and delivery, hiring and mentoring, and the translation between what the business wants and what the system can do.',
      'The point is not to add a consultant to your org chart. It is to give you access to the technical judgement of a senior executive without carrying another full-time salary — and to make your existing engineers better while I am there.',
    ],
    goodFor: [
      'Founders carrying technical decisions without a technical co-founder',
      'Teams that outgrew their first architecture',
      'Companies between CTOs',
      'Boards that want a senior technical voice in the room',
    ],
  },
]
