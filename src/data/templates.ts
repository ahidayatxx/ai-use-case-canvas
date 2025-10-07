import type { Template } from '@/types/template.types';
import { createEmptySectionContent } from '@/utils/canvasFactory';

export const TEMPLATES: Template[] = [
  {
    id: 'predictive-maintenance',
    name: 'Predictive Maintenance',
    description: 'AI-powered system to predict equipment failures before they occur',
    category: 'predictive-analytics',
    industry: 'Manufacturing',
    aiType: ['Machine Learning', 'Time Series', 'Predictive Analytics'],
    thumbnail: '/templates/predictive-maintenance.png',
    usageCount: 0,
    createdBy: 'System',
    isPublic: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    prefilledSections: {
      useCaseName: 'Predictive Maintenance for Manufacturing Equipment',
      useCaseOwner: 'Operations Team',
      phase: 'ideation',
      status: 'draft',
      strategic: {
        businessProblem: {
          ...createEmptySectionContent('businessProblem'),
          answers: [
            'Unplanned equipment downtime costs $2M annually in lost production and emergency repairs',
            'Currently using reactive maintenance with 15% equipment failure rate, leading to production delays and safety risks',
            'Equipment age and increasing maintenance costs make predictive approach urgent. Competition adopting AI-driven maintenance',
            'Continued reactive approach will increase downtime costs by 20% annually and risk major safety incidents',
          ],
        },
        desiredOutcome: {
          ...createEmptySectionContent('desiredOutcome'),
          answers: [
            'Predict equipment failures 48 hours in advance with 80% accuracy, enabling proactive maintenance',
            'Reduce unplanned downtime by 40%, lower maintenance costs by 25%, improve equipment lifespan by 15%',
            'Achieve results within 12 months: 6-month POC, 3-month pilot, 3-month rollout',
            'Operations team, maintenance crew, production management, and equipment suppliers benefit',
          ],
        },
        valueHypothesis: {
          ...createEmptySectionContent('valueHypothesis'),
          answers: [
            '$1.2M annual savings (40% downtime reduction × $2M cost) + $400K maintenance cost savings = $1.6M total impact',
            'Based on 100 critical assets, 80% prediction accuracy, and 40% downtime reduction. Industry benchmarks support estimates',
            'ROI: 320% over 3 years. Payback period: 9 months. Investment: $500K (development, sensors, integration)',
            'Improved safety, enhanced equipment lifespan (+15%), better workforce productivity, competitive advantage',
          ],
        },
      },
      execution: {
        aiSolutionDesign: {
          ...createEmptySectionContent('aiSolutionDesign'),
          answers: [
            'Time-series forecasting using LSTM neural networks to predict equipment health and failure probability',
            'Sensor data (temperature, vibration, pressure), maintenance logs, equipment specs, environmental conditions',
            'Failure probability score (0-100%), time-to-failure estimate, recommended actions, confidence level',
            '<100ms response time for real-time monitoring, 95% uptime, handle 1000 sensors simultaneously',
            'Sufficient historical failure data (2+ years), reliable sensor infrastructure, minimal production disruption',
          ],
        },
        dataRequirements: {
          ...createEmptySectionContent('dataRequirements'),
          answers: [
            'IoT sensors on 100 critical assets, 3 years maintenance history, 2 years failure logs, equipment specifications database',
            'Good: Sensor data 95% complete, maintenance logs digitized. Gaps: Some legacy equipment without sensors',
            'Minimum 2 years of failure data across 50+ equipment types (currently have 3 years for 80 types)',
            'GDPR-compliant, no PII. Equipment data proprietary. Secure access via VPN. Data retention: 5 years',
            'Data cleaning (30 days), sensor standardization, feature engineering, time-series formatting',
          ],
        },
        technicalArchitecture: {
          ...createEmptySectionContent('technicalArchitecture'),
          answers: [
            'Hybrid: Edge computing for real-time monitoring + AWS cloud for model training and historical analysis',
            'Real-time data ingestion via IoT Hub → Time-series DB → ML model API → Alert dashboard',
            '<100ms latency for alerts, handle 1000 sensor streams, 99.5% uptime SLA',
            'ISO 27001 compliance, encrypted data transmission, role-based access control, audit logging',
            'Prometheus metrics, CloudWatch dashboards, automated alerting, model performance tracking',
          ],
        },
        stakeholderMap: {
          ...createEmptySectionContent('stakeholderMap'),
          answers: [
            'VP Operations (executive sponsor), CFO (budget approval)',
            'Maintenance technicians (primary users), production supervisors (secondary users)',
            'Director of Operations (owns downtime reduction KPI)',
            'Data science team (model development), IT infrastructure (deployment), IoT vendor (sensors)',
            'Union approval needed, budget constraints Q1-Q2, dependency on sensor vendor timeline',
          ],
        },
        teamResources: {
          ...createEmptySectionContent('teamResources'),
          answers: [
            '2 ML engineers, 1 data scientist, 1 IoT specialist, 1 DevOps engineer, 1 product manager, 2 domain experts',
            '9-month timeline: 3 months POC, 3 months pilot (10 machines), 3 months full rollout',
            '$500K total: $200K personnel, $150K sensors/hardware, $100K cloud infrastructure, $50K contingency',
            'IoT sensor vendor ($150K), ML consulting firm for algorithm optimization ($75K)',
            'Time-series analysis expertise (hire consultant), IoT integration skills (train existing team)',
          ],
        },
        changeManagement: {
          ...createEmptySectionContent('changeManagement'),
          answers: [
            'Maintenance crew shifts from reactive to predictive approach, requires trust in AI recommendations',
            '2-week training program, hands-on workshops, shadow period with data scientists, ongoing support',
            'Phased rollout, early wins communication, maintenance team champions, gamification of predictions',
            'Union concerns about job security, skepticism about AI accuracy, resistance to process changes',
            'Downtime reduction %, maintenance cost savings, user adoption rate, prediction accuracy',
          ],
        },
      },
      validation: {
        successMetrics: {
          ...createEmptySectionContent('successMetrics'),
          answers: [
            'Precision: >75%, Recall: >80%, F1-score: >0.77, False positive rate: <15%',
            'Downtime reduction: >40%, Maintenance cost savings: >25%, Equipment lifespan increase: >15%',
            'System uptime: >99.5%, Alert response time: <5 min, User adoption: >80% of maintenance team',
            'Real-time dashboards, weekly reports, monthly business reviews, automated alert tracking',
            'POC: F1>0.7. Pilot: 30% downtime reduction. Production: 40% reduction + 25% cost savings',
          ],
        },
        testingStrategy: {
          ...createEmptySectionContent('testingStrategy'),
          answers: [
            'Holdout validation: Last 6 months data. Cross-validation on different equipment types',
            '3-month pilot with 10 critical machines, compare predictions vs. actual failures',
            'A/B test: 10 machines with AI vs. 10 control machines with reactive maintenance',
            'Sensor failure scenarios, extreme conditions, missing data, false alarm handling',
            '4-week UAT with 5 maintenance technicians, test all workflows, gather feedback',
          ],
        },
        riskAssessment: {
          ...createEmptySectionContent('riskAssessment'),
          answers: [
            'Model accuracy below 75%, insufficient training data, sensor reliability issues, integration complexity',
            'Budget overruns (20% contingency), delayed ROI, low user adoption, competing priorities',
            'Over-reliance on predictions causing missed human inspections, data privacy breach, algorithmic bias',
            'Fallback to reactive maintenance, regular model retraining, human-in-loop validation, insurance coverage',
            'Continue reactive maintenance, explore alternative vendors, phase approach if needed',
          ],
        },
        aiGovernance: {
          ...createEmptySectionContent('aiGovernance'),
          answers: [
            'Feature importance charts, prediction confidence scores, alert explanations with contributing factors',
            'Regular fairness audits across equipment types, performance monitoring by asset category',
            'ISO 27001, SOC 2, industry safety standards (OSHA), data protection regulations',
            'High-confidence predictions (>90%) auto-alert, medium confidence requires human review',
            'Safety-critical decisions, potential production shutdowns, high-cost maintenance actions',
          ],
        },
        scalingOperations: {
          ...createEmptySectionContent('scalingOperations'),
          answers: [
            'CI/CD pipeline with automated testing, model versioning in MLflow, canary deployments',
            'Real-time accuracy tracking, drift detection, alert dashboards, weekly model performance reports',
            'Monthly retraining with latest data, triggered retraining if accuracy drops below 70%',
            'Scale to 500 machines year 2, expand to 3 additional facilities year 3, new equipment types',
            'Statistical drift detection, automated alerts when data distribution changes >10%',
          ],
        },
      },
    },
  },

  {
    id: 'customer-churn',
    name: 'Customer Churn Prediction',
    description: 'Predict and prevent customer churn with AI-driven insights',
    category: 'predictive-analytics',
    industry: 'SaaS / Subscription Services',
    aiType: ['Machine Learning', 'Predictive Analytics', 'Classification'],
    thumbnail: '/templates/customer-churn.png',
    usageCount: 0,
    createdBy: 'System',
    isPublic: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    prefilledSections: {
      useCaseName: 'Customer Churn Prediction & Retention',
      useCaseOwner: 'VP Customer Success',
      phase: 'ideation',
      status: 'draft',
      strategic: {
        businessProblem: {
          ...createEmptySectionContent('businessProblem'),
          answers: [
            'Monthly churn rate of 5% (150 customers/month) costing $450K in lost MRR. Customer acquisition cost is 3x retention cost',
            'Currently reactive: responding to cancellations after decision made. No early warning system for at-risk customers',
            'Increasing competition and market saturation making retention critical. CAC rising 15% YoY while LTV declining',
            'Continued 5% churn will reduce ARR by $5.4M annually and increase acquisition costs by 20%',
          ],
        },
        desiredOutcome: {
          ...createEmptySectionContent('desiredOutcome'),
          answers: [
            'Predict customer churn 30 days in advance with 85% accuracy, enabling proactive retention interventions',
            'Reduce churn rate from 5% to 3.5% (30% reduction), increase customer LTV by 25%, improve NPS by 10 points',
            'Achieve within 9 months: 3-month POC, 3-month pilot (1000 customers), 3-month full rollout',
            'Customer Success team, Account Management, Product team, and ultimately all customers',
          ],
        },
        valueHypothesis: {
          ...createEmptySectionContent('valueHypothesis'),
          answers: [
            '$1.8M annual revenue retention (30% churn reduction × 150 customers × $3K MRR × 12 months)',
            'Based on 3,000 customers, $100 average MRR, 30% churn reduction via early intervention',
            'ROI: 450% over 2 years. Payback period: 4 months. Investment: $200K (development + integration)',
            'Improved customer satisfaction (NPS +10), reduced CS team burnout, enhanced product insights',
          ],
        },
      },
      execution: {
        aiSolutionDesign: {
          ...createEmptySectionContent('aiSolutionDesign'),
          answers: [
            'Gradient Boosting (XGBoost) classifier for churn prediction with SHAP explanations',
            'Usage metrics, support tickets, payment history, feature adoption, engagement scores, NPS, demographic data',
            'Churn probability (0-100%), risk category (high/medium/low), top risk factors, recommended interventions',
            'Daily batch predictions, <1 second inference per customer, 99.9% uptime, process 10K customers/day',
            'Clean training data (18+ months), stable feature definitions, customer consent for data usage',
          ],
        },
        dataRequirements: {
          ...createEmptySectionContent('dataRequirements'),
          answers: [
            'CRM (Salesforce), Product analytics (Mixpanel), Support tickets (Zendesk), Billing (Stripe), NPS surveys',
            'Good: 2 years of complete data for 80% of customers. Gaps: Early customers missing usage data',
            'Minimum 500 churned customers for training (currently have 900 churned, 2,100 retained)',
            'GDPR/CCPA compliant, customer consent obtained, PII encrypted, data retention 3 years',
            'Data pipeline integration, feature engineering (30+ features), missing value imputation, normalization',
          ],
        },
        technicalArchitecture: {
          ...createEmptySectionContent('technicalArchitecture'),
          answers: [
            'AWS cloud: S3 data lake → ETL via Glue → SageMaker training → Lambda API → Salesforce integration',
            'Nightly batch job updates churn scores in Salesforce, exposed via REST API for real-time queries',
            '<1s API response, process 10K customers nightly, 99.9% uptime',
            'SOC 2 Type II compliance, encryption at rest/transit, API authentication, audit logs, GDPR compliance',
            'CloudWatch dashboards, model performance metrics, alert system for anomalies, weekly reports',
          ],
        },
        stakeholderMap: {
          ...createEmptySectionContent('stakeholderMap'),
          answers: [
            'CEO (executive sponsor), VP Customer Success (project champion), CFO (budget approval)',
            'Customer Success Managers (primary users), Account Executives (secondary users)',
            'VP Customer Success owns churn rate KPI',
            'Data Science team (model), Engineering (integration), CS Ops (process), Product (features)',
            'Salesforce integration dependency, Q4 budget freeze, customer data privacy reviews',
          ],
        },
        teamResources: {
          ...createEmptySectionContent('teamResources'),
          answers: [
            '1 ML engineer, 1 data scientist, 1 full-stack developer, 1 CS ops specialist, 1 product manager',
            '9-month timeline: 3-month POC, 3-month pilot (1000 customers), 3-month full deployment',
            '$200K budget: $120K personnel, $40K infrastructure (AWS), $20K tools/integration, $20K training',
            'Salesforce consulting partner for CRM integration ($25K), ML platform vendor support',
            'Customer success process design (hire CS ops consultant), change management expertise',
          ],
        },
        changeManagement: {
          ...createEmptySectionContent('changeManagement'),
          answers: [
            'CS team shifts from reactive to proactive outreach, requires new playbooks and trust in AI scores',
            '3-week training: AI basics, interpreting churn scores, intervention playbooks, CRM workflow updates',
            'Weekly CS team office hours, success stories newsletter, leaderboard for retention wins, incentive alignment',
            'Fear of automation replacing jobs, skepticism of AI accuracy, workflow disruption concerns',
            'Churn reduction %, CS team adoption rate, intervention success rate, time saved per CSM',
          ],
        },
      },
      validation: {
        successMetrics: {
          ...createEmptySectionContent('successMetrics'),
          answers: [
            'AUC-ROC: >0.85, Precision: >80%, Recall: >75%, Top 10% risk accuracy: >90%',
            'Churn rate: 5% → 3.5%, LTV increase: >25%, Intervention success rate: >40%',
            'CSM adoption: >80%, Average intervention time: <30 min, System uptime: >99.9%',
            'Salesforce dashboard (real-time), weekly churn reports, monthly business reviews',
            'POC: AUC>0.80. Pilot: 20% churn reduction in test cohort. Production: 30% overall reduction',
          ],
        },
        testingStrategy: {
          ...createEmptySectionContent('testingStrategy'),
          answers: [
            'Holdout validation: Last 3 months data. Time-based split to prevent data leakage',
            '3-month pilot with 1000 customers, compare churn rates vs. control group of 1000',
            'A/B test: Pilot group receives proactive interventions, control group receives standard CS approach',
            'New customer onboarding, high-value enterprise accounts, customers with recent support issues',
            '4-week UAT with 10 CSMs testing workflows, dashboards, intervention tracking, and reporting',
          ],
        },
        riskAssessment: {
          ...createEmptySectionContent('riskAssessment'),
          answers: [
            'Model accuracy below target, changing customer behavior, data quality issues, feature drift',
            'Budget overruns (15% contingency), delayed Salesforce integration, low CS adoption',
            'Over-intervention annoying customers, data privacy breach, bias against customer segments',
            'Quarterly model retraining, human review for high-value accounts, privacy-by-design, bias testing',
            'Enhanced CS training without AI, manual customer health scoring, explore alternative vendors',
          ],
        },
        aiGovernance: {
          ...createEmptySectionContent('aiGovernance'),
          answers: [
            'SHAP values show top churn factors per customer, transparent scoring visible to CSMs',
            'Regular fairness audits by customer segment, plan type, geography. Monitor for demographic bias',
            'GDPR, CCPA, SOC 2 Type II, industry best practices for customer data',
            'High churn risk (>80%) triggers immediate CSM alert, medium risk (50-80%) queued for review',
            'Account cancellations, pricing changes, customer data access decisions',
          ],
        },
        scalingOperations: {
          ...createEmptySectionContent('scalingOperations'),
          answers: [
            'CI/CD with GitHub Actions, model versioning in MLflow, automated testing, blue-green deployments',
            'Daily model performance dashboard, weekly accuracy reports, alerting for metric degradation',
            'Monthly retraining with latest data, automatic retraining if AUC drops below 0.82',
            'Expand to enterprise segment (year 1), international markets (year 2), predictive upsell (year 3)',
            'Statistical tests for feature drift, automated alerts, retraining pipeline triggered at >5% drift',
          ],
        },
      },
    },
  },
];

// Helper function to get template by ID
export function getTemplateById(id: string): Template | undefined {
  return TEMPLATES.find(t => t.id === id);
}

// Helper function to get all templates
export function getAllTemplates(): Template[] {
  return TEMPLATES;
}
