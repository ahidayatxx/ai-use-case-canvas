import type { Canvas, SectionContent } from '@/types/canvas.types';
import { CANVAS_STRUCTURE } from '@/data/canvasStructure';

/**
 * Create an empty section content
 */
export function createEmptySectionContent(sectionId: string): SectionContent {
  const section = CANVAS_STRUCTURE.find(s => s.id === sectionId);
  const questionCount = section?.questions.length || 0;

  return {
    answers: Array(questionCount).fill(''),
    notes: '',
    comments: [],
    expandedByDefault: true,
  };
}

/**
 * Create a new empty canvas
 */
export function createEmptyCanvas(
  name: string,
  useCaseName: string,
  owner: string
): Canvas {
  const now = new Date();

  return {
    // Metadata
    id: crypto.randomUUID(),
    name,
    owner,
    phase: 'ideation',
    createdAt: now,
    updatedAt: now,
    lastEditedBy: owner,

    // Basic Info
    useCaseName,
    useCaseOwner: owner,

    // Readiness
    readiness: {
      strategic: 'red',
      execution: 'red',
      validation: 'red',
    },

    // Strategic Layer
    strategic: {
      businessProblem: createEmptySectionContent('businessProblem'),
      desiredOutcome: createEmptySectionContent('desiredOutcome'),
      valueHypothesis: createEmptySectionContent('valueHypothesis'),
    },

    // Execution Layer
    execution: {
      aiSolutionDesign: createEmptySectionContent('aiSolutionDesign'),
      dataRequirements: createEmptySectionContent('dataRequirements'),
      technicalArchitecture: createEmptySectionContent('technicalArchitecture'),
      stakeholderMap: createEmptySectionContent('stakeholderMap'),
      teamResources: createEmptySectionContent('teamResources'),
      changeManagement: createEmptySectionContent('changeManagement'),
    },

    // Validation Layer
    validation: {
      successMetrics: createEmptySectionContent('successMetrics'),
      testingStrategy: createEmptySectionContent('testingStrategy'),
      riskAssessment: createEmptySectionContent('riskAssessment'),
      aiGovernance: createEmptySectionContent('aiGovernance'),
      scalingOperations: createEmptySectionContent('scalingOperations'),
    },

    // Additional metadata
    collaborators: [],
    tags: [],
    version: 1,
    status: 'draft',
  };
}
