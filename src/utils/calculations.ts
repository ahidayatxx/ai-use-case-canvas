import type { Canvas, SectionContent, LayerType } from '@/types/canvas.types';

/**
 * Calculate completion percentage for a single section
 */
export function calculateSectionCompletion(section: SectionContent): number {
  const totalAnswers = section.answers.length;
  if (totalAnswers === 0) return 0;

  const filledAnswers = section.answers.filter(
    answer => answer && answer.trim().length > 0
  ).length;

  return Math.round((filledAnswers / totalAnswers) * 100);
}

/**
 * Calculate completion percentage for a layer
 */
export function calculateLayerCompletion(
  canvas: Canvas,
  layer: LayerType
): number {
  const sections = Object.values(canvas[layer]);

  if (sections.length === 0) return 0;

  const completions = sections.map(section => calculateSectionCompletion(section));
  const avgCompletion = completions.reduce((sum, c) => sum + c, 0) / completions.length;

  return Math.round(avgCompletion);
}

/**
 * Calculate overall canvas completion percentage
 */
export function calculateOverallCompletion(canvas: Canvas): number {
  const strategicCompletion = calculateLayerCompletion(canvas, 'strategic');
  const executionCompletion = calculateLayerCompletion(canvas, 'execution');
  const validationCompletion = calculateLayerCompletion(canvas, 'validation');

  // Weighted average: strategic (20%), execution (40%), validation (40%)
  const weighted = (
    strategicCompletion * 0.2 +
    executionCompletion * 0.4 +
    validationCompletion * 0.4
  );

  return Math.round(weighted);
}

/**
 * Calculate total number of questions in the canvas
 */
export function calculateTotalQuestions(canvas: Canvas): number {
  let total = 0;

  Object.values(canvas.strategic).forEach(section => {
    total += section.answers.length;
  });

  Object.values(canvas.execution).forEach(section => {
    total += section.answers.length;
  });

  Object.values(canvas.validation).forEach(section => {
    total += section.answers.length;
  });

  return total;
}

/**
 * Calculate number of answered questions in the canvas
 */
export function calculateAnsweredQuestions(canvas: Canvas): number {
  let answered = 0;

  Object.values(canvas.strategic).forEach(section => {
    answered += section.answers.filter(a => a && a.trim().length > 0).length;
  });

  Object.values(canvas.execution).forEach(section => {
    answered += section.answers.filter(a => a && a.trim().length > 0).length;
  });

  Object.values(canvas.validation).forEach(section => {
    answered += section.answers.filter(a => a && a.trim().length > 0).length;
  });

  return answered;
}

/**
 * Check if a section is complete (all questions answered)
 */
export function isSectionComplete(section: SectionContent): boolean {
  return calculateSectionCompletion(section) === 100;
}

/**
 * Check if a layer is complete (all sections complete)
 */
export function isLayerComplete(canvas: Canvas, layer: LayerType): boolean {
  return calculateLayerCompletion(canvas, layer) === 100;
}

/**
 * Get readiness score (0-100) based on traffic light colors
 */
export function getReadinessScore(canvas: Canvas): number {
  const scores = {
    red: 0,
    yellow: 50,
    green: 100,
  };

  const strategicScore = scores[canvas.readiness.strategic];
  const executionScore = scores[canvas.readiness.execution];
  const validationScore = scores[canvas.readiness.validation];

  return Math.round((strategicScore + executionScore + validationScore) / 3);
}

/**
 * Estimate time remaining to complete canvas (in hours)
 */
export function estimateTimeRemaining(canvas: Canvas): number {
  const completion = calculateOverallCompletion(canvas);
  const totalEstimatedHours = 6; // As per PRD

  if (completion === 100) return 0;

  const remainingPercentage = 100 - completion;
  return Math.round((remainingPercentage / 100) * totalEstimatedHours * 10) / 10;
}

/**
 * Get canvas health score (combination of completion and readiness)
 */
export function getCanvasHealthScore(canvas: Canvas): {
  score: number;
  status: 'excellent' | 'good' | 'fair' | 'needs-attention';
} {
  const completion = calculateOverallCompletion(canvas);
  const readiness = getReadinessScore(canvas);

  const healthScore = Math.round((completion * 0.6) + (readiness * 0.4));

  let status: 'excellent' | 'good' | 'fair' | 'needs-attention';
  if (healthScore >= 80) status = 'excellent';
  else if (healthScore >= 60) status = 'good';
  else if (healthScore >= 40) status = 'fair';
  else status = 'needs-attention';

  return { score: healthScore, status };
}
