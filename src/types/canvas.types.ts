// Phase types
export type Phase = 'ideation' | 'poc' | 'pilot' | 'production' | 'optimization';
export type ReadinessLevel = 'red' | 'yellow' | 'green';
export type LayerType = 'strategic' | 'execution' | 'validation';
export type CanvasStatus = 'draft' | 'in-progress' | 'completed' | 'archived';

// Comment interface
export interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: Date;
  resolved: boolean;
}

// Section content interface
export interface SectionContent {
  answers: string[]; // One per question
  notes: string;
  comments: Comment[];
  expandedByDefault: boolean;
}

// Main Canvas interface
export interface Canvas {
  id: string;
  name: string;
  owner: string;
  phase: Phase;
  createdAt: Date;
  updatedAt: Date;
  lastEditedBy: string;

  // Basic Info
  useCaseName: string;
  useCaseOwner: string;

  // Readiness
  readiness: {
    strategic: ReadinessLevel;
    execution: ReadinessLevel;
    validation: ReadinessLevel;
  };

  // Layer 1: Strategic
  strategic: {
    businessProblem: SectionContent;
    desiredOutcome: SectionContent;
    valueHypothesis: SectionContent;
  };

  // Layer 2: Execution
  execution: {
    aiSolutionDesign: SectionContent;
    dataRequirements: SectionContent;
    technicalArchitecture: SectionContent;
    stakeholderMap: SectionContent;
    teamResources: SectionContent;
    changeManagement: SectionContent;
  };

  // Layer 3: Validation
  validation: {
    successMetrics: SectionContent;
    testingStrategy: SectionContent;
    riskAssessment: SectionContent;
    aiGovernance: SectionContent;
    scalingOperations: SectionContent;
  };

  // Metadata
  collaborators: string[];
  tags: string[];
  version: number;
  status: CanvasStatus;
}

// Section definition (for structure/config)
export interface SectionDefinition {
  id: string;
  title: string;
  layer: LayerType;
  description: string;
  icon: string; // Lucide icon name
  questions: string[];
  examples: string[];
  tips: string[];
  relevantPhases: Phase[];
  order: number;
}

// Phase information
export interface PhaseInfo {
  id: Phase;
  name: string;
  description: string;
  icon: string;
  color: string;
  objectives: string[];
  deliverables: string[];
  duration: string;
}

// Readiness assessment
export interface ReadinessAssessment {
  layer: LayerType;
  level: ReadinessLevel;
  notes: string;
  lastUpdated: Date;
  updatedBy: string;
}

// Canvas filter options
export interface CanvasFilters {
  phase?: Phase[];
  status?: CanvasStatus[];
  readiness?: ReadinessLevel[];
  tags?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  searchQuery?: string;
}

// Canvas summary (for dashboard list view)
export interface CanvasSummary {
  id: string;
  name: string;
  useCaseName: string;
  phase: Phase;
  status: CanvasStatus;
  readiness: {
    strategic: ReadinessLevel;
    execution: ReadinessLevel;
    validation: ReadinessLevel;
  };
  completionPercentage: number;
  lastUpdated: Date;
  owner: string;
  tags: string[];
}

// Export format options
export type ExportFormat = 'pdf' | 'json' | 'markdown';

export interface ExportOptions {
  format: ExportFormat;
  includeComments: boolean;
  includeMetadata: boolean;
  includeReadiness: boolean;
}
