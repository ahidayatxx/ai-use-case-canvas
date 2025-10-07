import type { Phase } from '@/types/canvas.types';

export type RelevanceLevel = 'high' | 'medium' | 'low';

type SectionId =
  | 'businessProblem'
  | 'desiredOutcome'
  | 'valueHypothesis'
  | 'aiSolutionDesign'
  | 'dataRequirements'
  | 'technicalArchitecture'
  | 'stakeholderMap'
  | 'teamResources'
  | 'changeManagement'
  | 'successMetrics'
  | 'testingStrategy'
  | 'riskAssessment'
  | 'aiGovernance'
  | 'scalingOperations';

// Maps each section's relevance at each phase
export const PHASE_RELEVANCE: Record<SectionId, Record<Phase, RelevanceLevel>> = {
  // Strategic Layer
  businessProblem: {
    ideation: 'high',
    poc: 'medium',
    pilot: 'medium',
    production: 'low',
    optimization: 'low',
  },
  desiredOutcome: {
    ideation: 'high',
    poc: 'medium',
    pilot: 'medium',
    production: 'low',
    optimization: 'low',
  },
  valueHypothesis: {
    ideation: 'high',
    poc: 'medium',
    pilot: 'medium',
    production: 'low',
    optimization: 'medium',
  },

  // Execution Layer
  aiSolutionDesign: {
    ideation: 'medium',
    poc: 'high',
    pilot: 'high',
    production: 'medium',
    optimization: 'medium',
  },
  dataRequirements: {
    ideation: 'medium',
    poc: 'high',
    pilot: 'high',
    production: 'medium',
    optimization: 'low',
  },
  technicalArchitecture: {
    ideation: 'low',
    poc: 'high',
    pilot: 'high',
    production: 'high',
    optimization: 'medium',
  },
  stakeholderMap: {
    ideation: 'medium',
    poc: 'medium',
    pilot: 'high',
    production: 'high',
    optimization: 'medium',
  },
  teamResources: {
    ideation: 'low',
    poc: 'high',
    pilot: 'high',
    production: 'medium',
    optimization: 'low',
  },
  changeManagement: {
    ideation: 'low',
    poc: 'low',
    pilot: 'high',
    production: 'high',
    optimization: 'medium',
  },

  // Validation Layer
  successMetrics: {
    ideation: 'medium',
    poc: 'high',
    pilot: 'high',
    production: 'high',
    optimization: 'high',
  },
  testingStrategy: {
    ideation: 'low',
    poc: 'high',
    pilot: 'high',
    production: 'medium',
    optimization: 'low',
  },
  riskAssessment: {
    ideation: 'medium',
    poc: 'medium',
    pilot: 'high',
    production: 'high',
    optimization: 'medium',
  },
  aiGovernance: {
    ideation: 'low',
    poc: 'medium',
    pilot: 'high',
    production: 'high',
    optimization: 'high',
  },
  scalingOperations: {
    ideation: 'low',
    poc: 'low',
    pilot: 'medium',
    production: 'high',
    optimization: 'high',
  },
};

export const PHASE_INFO = {
  ideation: {
    id: 'ideation' as Phase,
    name: 'Ideation',
    description: 'Explore and define the AI opportunity',
    icon: 'Lightbulb',
    color: 'blue-500',
    objectives: [
      'Define business problem',
      'Estimate value potential',
      'Assess feasibility',
      'Build stakeholder alignment',
    ],
    deliverables: [
      'Problem statement',
      'Value hypothesis',
      'High-level approach',
    ],
    duration: '2-4 weeks',
  },
  poc: {
    id: 'poc' as Phase,
    name: 'Proof of Concept',
    description: 'Validate technical feasibility',
    icon: 'FlaskConical',
    color: 'green-500',
    objectives: [
      'Explore data quality',
      'Build baseline model',
      'Test algorithms',
      'Validate assumptions',
    ],
    deliverables: [
      'Working prototype',
      'Performance metrics',
      'Technical documentation',
    ],
    duration: '4-8 weeks',
  },
  pilot: {
    id: 'pilot' as Phase,
    name: 'Pilot',
    description: 'Test solution with real users',
    icon: 'Plane',
    color: 'purple-500',
    objectives: [
      'Deploy to pilot users',
      'Collect feedback',
      'Measure impact',
      'Refine solution',
    ],
    deliverables: [
      'Pilot results',
      'User feedback',
      'ROI validation',
      'Go/no-go decision',
    ],
    duration: '8-12 weeks',
  },
  production: {
    id: 'production' as Phase,
    name: 'Production',
    description: 'Deploy solution at scale',
    icon: 'Factory',
    color: 'red-500',
    objectives: [
      'Production deployment',
      'User training',
      'Monitor performance',
      'Support users',
    ],
    deliverables: [
      'Production system',
      'User documentation',
      'Operations playbook',
      'Success metrics dashboard',
    ],
    duration: 'Ongoing',
  },
  optimization: {
    id: 'optimization' as Phase,
    name: 'Optimization',
    description: 'Continuously improve solution',
    icon: 'TrendingUp',
    color: 'orange-500',
    objectives: [
      'Analyze performance',
      'Retrain models',
      'Expand features',
      'Scale to new areas',
    ],
    deliverables: [
      'Performance reports',
      'Improvement roadmap',
      'Expansion plan',
    ],
    duration: 'Ongoing',
  },
} as const;

export function getRelevance(sectionId: SectionId, phase: Phase): RelevanceLevel {
  return PHASE_RELEVANCE[sectionId][phase];
}

export function getPhaseInfo(phase: Phase) {
  return PHASE_INFO[phase];
}

export function getNextPhase(currentPhase: Phase): Phase | null {
  const phases: Phase[] = ['ideation', 'poc', 'pilot', 'production', 'optimization'];
  const currentIndex = phases.indexOf(currentPhase);
  return currentIndex < phases.length - 1 ? phases[currentIndex + 1] : null;
}

export function getPreviousPhase(currentPhase: Phase): Phase | null {
  const phases: Phase[] = ['ideation', 'poc', 'pilot', 'production', 'optimization'];
  const currentIndex = phases.indexOf(currentPhase);
  return currentIndex > 0 ? phases[currentIndex - 1] : null;
}

export const ALL_PHASES: Phase[] = ['ideation', 'poc', 'pilot', 'production', 'optimization'];
