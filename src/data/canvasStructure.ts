import type { SectionDefinition, LayerType } from '@/types/canvas.types';

export const CANVAS_STRUCTURE: SectionDefinition[] = [
  // STRATEGIC LAYER (1-3)
  {
    id: 'businessProblem',
    title: '1. Business Problem',
    layer: 'strategic',
    order: 1,
    icon: 'Target',
    description: 'Define the business challenge and its context',
    questions: [
      'What specific pain point are we addressing?',
      'What is the current state and its limitations?',
      'Why is this problem critical now?',
      'What happens if we don\'t solve this?',
    ],
    examples: [
      'High customer churn in subscription services (15% annually)',
      'Manual processing of 10,000 documents per month taking 5 FTEs',
      'Equipment failures causing $2M in downtime annually',
    ],
    tips: [
      'Be specific and quantify the problem where possible',
      'Focus on business impact, not just technical issues',
      'Identify root causes, not just symptoms',
    ],
    relevantPhases: ['ideation', 'poc', 'pilot'],
  },
  {
    id: 'desiredOutcome',
    title: '2. Desired Outcome',
    layer: 'strategic',
    order: 2,
    icon: 'Trophy',
    description: 'Define measurable success outcomes',
    questions: [
      'What is the target outcome we aim to achieve?',
      'How will success be quantified?',
      'What is the expected timeline?',
      'Who benefits from this outcome?',
    ],
    examples: [
      'Reduce churn by 25% within 12 months',
      'Process documents 10x faster with 95% accuracy',
      'Predict failures 48 hours in advance with 80% accuracy',
    ],
    tips: [
      'Use SMART goals (Specific, Measurable, Achievable, Relevant, Time-bound)',
      'Define both leading and lagging indicators',
      'Consider multiple stakeholder perspectives',
    ],
    relevantPhases: ['ideation', 'poc', 'pilot'],
  },
  {
    id: 'valueHypothesis',
    title: '3. Value Hypothesis',
    layer: 'strategic',
    order: 3,
    icon: 'DollarSign',
    description: 'Estimate business value and ROI',
    questions: [
      'What is the estimated financial impact?',
      'What are the key assumptions behind this value?',
      'What is the expected ROI and payback period?',
      'What non-financial benefits exist?',
    ],
    examples: [
      '$5M annual revenue increase from retention improvements',
      '$800K annual cost savings from automation',
      'Improved customer satisfaction (NPS +15 points)',
    ],
    tips: [
      'Include both cost savings and revenue opportunities',
      'Document assumptions clearly',
      'Consider intangible benefits (brand, satisfaction, etc.)',
    ],
    relevantPhases: ['ideation', 'poc', 'pilot', 'optimization'],
  },

  // EXECUTION LAYER (4-9)
  {
    id: 'aiSolutionDesign',
    title: '4. AI Solution Design',
    layer: 'execution',
    order: 4,
    icon: 'Brain',
    description: 'Define the AI/ML approach and architecture',
    questions: [
      'What type of AI/ML approach will be used?',
      'What are the key features and inputs?',
      'What is the model output and prediction target?',
      'What are the performance requirements?',
      'What are the key technical assumptions?',
    ],
    examples: [
      'Gradient Boosting classifier (XGBoost) for churn prediction',
      'Transformer-based NLP model for document classification',
      'Time-series forecasting with LSTM for failure prediction',
    ],
    tips: [
      'Start with simpler models before deep learning',
      'Consider explainability requirements',
      'Define baseline performance to beat',
    ],
    relevantPhases: ['poc', 'pilot', 'production'],
  },
  {
    id: 'dataRequirements',
    title: '5. Data Requirements',
    layer: 'execution',
    order: 5,
    icon: 'Database',
    description: 'Identify data sources, quality, and access',
    questions: [
      'What data sources are needed?',
      'What is the data quality and availability?',
      'What is the minimum data volume required?',
      'What data access and privacy constraints exist?',
      'What data preparation is needed?',
    ],
    examples: [
      '3 years of customer transaction history (2M records)',
      'Document corpus of 50,000 labeled examples',
      'Sensor data from 500 machines (hourly granularity)',
    ],
    tips: [
      'Assess data quality early in the process',
      'Consider data labeling requirements and costs',
      'Document data lineage and access permissions',
    ],
    relevantPhases: ['poc', 'pilot', 'production'],
  },
  {
    id: 'technicalArchitecture',
    title: '6. Technical Architecture',
    layer: 'execution',
    order: 6,
    icon: 'Server',
    description: 'Design infrastructure and integration',
    questions: [
      'What infrastructure is needed (cloud, on-prem, hybrid)?',
      'How does the solution integrate with existing systems?',
      'What are the latency and throughput requirements?',
      'What security and compliance requirements exist?',
      'What monitoring and logging is needed?',
    ],
    examples: [
      'AWS SageMaker for model training and deployment',
      'Real-time API with <100ms latency requirement',
      'Integration with existing CRM via REST API',
    ],
    tips: [
      'Consider both training and inference infrastructure',
      'Plan for scalability from the start',
      'Document security and compliance requirements',
    ],
    relevantPhases: ['poc', 'pilot', 'production'],
  },
  {
    id: 'stakeholderMap',
    title: '7. Stakeholder Map',
    layer: 'execution',
    order: 7,
    icon: 'Users',
    description: 'Identify key stakeholders and their roles',
    questions: [
      'Who are the executive sponsors?',
      'Who are the end users?',
      'Who owns the business outcome?',
      'Who are the technical implementers?',
      'What are the key dependencies and blockers?',
    ],
    examples: [
      'VP Sales (executive sponsor)',
      'Customer success team (primary users)',
      'Data engineering team (technical dependency)',
    ],
    tips: [
      'Map both supporters and potential blockers',
      'Identify RACI (Responsible, Accountable, Consulted, Informed)',
      'Plan stakeholder communication strategy',
    ],
    relevantPhases: ['ideation', 'pilot', 'production'],
  },
  {
    id: 'teamResources',
    title: '8. Team & Resources',
    layer: 'execution',
    order: 8,
    icon: 'UserCheck',
    description: 'Define team composition and resource needs',
    questions: [
      'What team roles and skills are required?',
      'What is the estimated effort and timeline?',
      'What is the budget requirement?',
      'What external vendors or partners are needed?',
      'What skill gaps need to be addressed?',
    ],
    examples: [
      '2 data scientists, 1 ML engineer, 1 product manager',
      '6-month timeline, $500K budget',
      'External NLP expertise for model development',
    ],
    tips: [
      'Include both technical and business resources',
      'Plan for both development and maintenance',
      'Consider training and upskilling needs',
    ],
    relevantPhases: ['poc', 'pilot', 'production'],
  },
  {
    id: 'changeManagement',
    title: '9. Change Management',
    layer: 'execution',
    order: 9,
    icon: 'RefreshCw',
    description: 'Plan for user adoption and organizational change',
    questions: [
      'What behavior changes are required from users?',
      'What training and support is needed?',
      'How will we drive user adoption?',
      'What are the key resistance points?',
      'How do we measure adoption success?',
    ],
    examples: [
      'Train 200 customer service reps on new AI tool',
      'Change review process from manual to AI-assisted',
      'Monthly adoption metrics dashboard',
    ],
    tips: [
      'Start change management early in the process',
      'Involve users in design and testing',
      'Create champions and early adopters',
    ],
    relevantPhases: ['pilot', 'production', 'optimization'],
  },

  // VALIDATION LAYER (10-14)
  {
    id: 'successMetrics',
    title: '10. Success Metrics',
    layer: 'validation',
    order: 10,
    icon: 'TrendingUp',
    description: 'Define KPIs and measurement framework',
    questions: [
      'What are the key model performance metrics?',
      'What are the business outcome metrics?',
      'What are the operational metrics?',
      'How will we track these metrics?',
      'What are the success thresholds?',
    ],
    examples: [
      'Model: F1 score >0.85, AUC >0.90',
      'Business: Churn reduction >20%, Revenue impact >$3M',
      'Operational: 99.9% uptime, <100ms latency',
    ],
    tips: [
      'Balance model metrics with business outcomes',
      'Define both absolute thresholds and relative improvements',
      'Plan measurement cadence (daily, weekly, monthly)',
    ],
    relevantPhases: ['poc', 'pilot', 'production', 'optimization'],
  },
  {
    id: 'testingStrategy',
    title: '11. Testing Strategy',
    layer: 'validation',
    order: 11,
    icon: 'FlaskConical',
    description: 'Plan validation and testing approach',
    questions: [
      'What is the model validation approach?',
      'How will we test with real users?',
      'What A/B testing is planned?',
      'What edge cases need special testing?',
      'What is the UAT (User Acceptance Testing) plan?',
    ],
    examples: [
      'Holdout validation on 6 months of recent data',
      '4-week pilot with 50 users before full rollout',
      'A/B test comparing AI vs. current process',
    ],
    tips: [
      'Test with data as close to production as possible',
      'Include user testing throughout development',
      'Document test results and learnings',
    ],
    relevantPhases: ['poc', 'pilot', 'production'],
  },
  {
    id: 'riskAssessment',
    title: '12. Risk Assessment',
    layer: 'validation',
    order: 12,
    icon: 'AlertTriangle',
    description: 'Identify and mitigate risks',
    questions: [
      'What are the technical risks?',
      'What are the business risks?',
      'What are the ethical/compliance risks?',
      'What mitigation strategies exist for each risk?',
      'What is the fallback plan if the project fails?',
    ],
    examples: [
      'Model performance, data quality, infrastructure issues',
      'Budget overruns, timeline delays, adoption failure',
      'Risk mitigation strategies for each identified risk',
    ],
    tips: [
      'Use a risk matrix (likelihood x impact) to prioritize',
      'Assign risk owners and mitigation plans',
      'Review and update risks throughout the project',
    ],
    relevantPhases: ['ideation', 'poc', 'pilot', 'production'],
  },
  {
    id: 'aiGovernance',
    title: '13. AI Governance & Ethics',
    layer: 'validation',
    order: 13,
    icon: 'Scale',
    description: 'Ensure responsible and ethical AI',
    questions: [
      'What are the explainability requirements?',
      'How do we detect and mitigate bias?',
      'What regulatory compliance is needed?',
      'Where do we need human oversight?',
      'What are the ethical implications?',
    ],
    examples: [
      'Model interpretability needs (SHAP, LIME, etc.)',
      'Bias testing methodology, fairness metrics',
      'GDPR, AI Act, industry regulations',
      'Human-in-the-loop decision points',
    ],
    tips: [
      'Governance is critical for high-stakes applications',
      'Document model decisions and reasoning',
      'Plan regular bias audits',
    ],
    relevantPhases: ['poc', 'pilot', 'production', 'optimization'],
  },
  {
    id: 'scalingOperations',
    title: '14. Scaling & Operations',
    layer: 'validation',
    order: 14,
    icon: 'Rocket',
    description: 'Plan for production operations and scaling',
    questions: [
      'What is the MLOps strategy?',
      'How do we monitor model performance?',
      'What triggers model retraining?',
      'What is the expansion plan?',
      'How do we handle model drift?',
    ],
    examples: [
      'CI/CD pipeline, model versioning, deployment strategy',
      'Performance monitoring, alerting, dashboards',
      'Retraining frequency, triggers, and process',
      'Geographic expansion, new use cases, scaling',
    ],
    tips: [
      'MLOps is critical for long-term success',
      'Plan for the full model lifecycle',
      'Automate monitoring and alerting',
    ],
    relevantPhases: ['pilot', 'production', 'optimization'],
  },
];

// Helper functions
export function getSectionsByLayer(layer: LayerType): SectionDefinition[] {
  return CANVAS_STRUCTURE.filter(section => section.layer === layer)
    .sort((a, b) => a.order - b.order);
}

export function getSectionById(id: string): SectionDefinition | undefined {
  return CANVAS_STRUCTURE.find(section => section.id === id);
}

export function getAllSections(): SectionDefinition[] {
  return [...CANVAS_STRUCTURE].sort((a, b) => a.order - b.order);
}

export const LAYER_INFO = {
  strategic: {
    name: 'Strategic Layer',
    subtitle: 'WHY & WHAT',
    description: 'Define the business case and strategic alignment',
    color: 'strategic',
    icon: 'Target',
    sections: 3,
  },
  execution: {
    name: 'Execution Layer',
    subtitle: 'HOW & WHO',
    description: 'Design the solution and mobilize resources',
    color: 'execution',
    icon: 'Settings',
    sections: 6,
  },
  validation: {
    name: 'Validation Layer',
    subtitle: 'MEASURE & GOVERN',
    description: 'Ensure responsible AI and continuous improvement',
    color: 'validation',
    icon: 'CheckCircle',
    sections: 5,
  },
} as const;
