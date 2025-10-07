import { z } from 'zod';
import type { Phase, ReadinessLevel } from '@/types/canvas.types';

/**
 * Validation schemas using Zod
 */

// Phase schema
export const PhaseSchema = z.enum(['ideation', 'poc', 'pilot', 'production', 'optimization']);

// Readiness level schema
export const ReadinessLevelSchema = z.enum(['red', 'yellow', 'green']);

// Canvas status schema
export const CanvasStatusSchema = z.enum(['draft', 'in-progress', 'completed', 'archived']);

// Canvas name validation
export const CanvasNameSchema = z
  .string()
  .min(3, 'Canvas name must be at least 3 characters')
  .max(100, 'Canvas name must be less than 100 characters')
  .trim();

// Use case name validation
export const UseCaseNameSchema = z
  .string()
  .min(3, 'Use case name must be at least 3 characters')
  .max(200, 'Use case name must be less than 200 characters')
  .trim();

// Owner name validation
export const OwnerNameSchema = z
  .string()
  .min(2, 'Owner name must be at least 2 characters')
  .max(100, 'Owner name must be less than 100 characters')
  .trim();

// Answer validation (for section questions)
export const AnswerSchema = z
  .string()
  .max(5000, 'Answer must be less than 5000 characters');

// Notes validation
export const NotesSchema = z
  .string()
  .max(2000, 'Notes must be less than 2000 characters');

// Comment text validation
export const CommentTextSchema = z
  .string()
  .min(1, 'Comment cannot be empty')
  .max(1000, 'Comment must be less than 1000 characters')
  .trim();

// Tag validation
export const TagSchema = z
  .string()
  .min(2, 'Tag must be at least 2 characters')
  .max(30, 'Tag must be less than 30 characters')
  .regex(/^[a-zA-Z0-9-_\s]+$/, 'Tag can only contain letters, numbers, hyphens, and underscores')
  .trim();

// Email validation
export const EmailSchema = z
  .string()
  .email('Invalid email address')
  .trim();

/**
 * Validation functions
 */

export function validateCanvasName(name: string): {
  isValid: boolean;
  error?: string;
} {
  try {
    CanvasNameSchema.parse(name);
    return { isValid: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { isValid: false, error: error.issues[0].message };
    }
    return { isValid: false, error: 'Invalid canvas name' };
  }
}

export function validateUseCaseName(name: string): {
  isValid: boolean;
  error?: string;
} {
  try {
    UseCaseNameSchema.parse(name);
    return { isValid: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { isValid: false, error: error.issues[0].message };
    }
    return { isValid: false, error: 'Invalid use case name' };
  }
}

export function validateOwnerName(name: string): {
  isValid: boolean;
  error?: string;
} {
  try {
    OwnerNameSchema.parse(name);
    return { isValid: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { isValid: false, error: error.issues[0].message };
    }
    return { isValid: false, error: 'Invalid owner name' };
  }
}

export function validateAnswer(answer: string): {
  isValid: boolean;
  error?: string;
} {
  try {
    AnswerSchema.parse(answer);
    return { isValid: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { isValid: false, error: error.issues[0].message };
    }
    return { isValid: false, error: 'Invalid answer' };
  }
}

export function validateTag(tag: string): {
  isValid: boolean;
  error?: string;
} {
  try {
    TagSchema.parse(tag);
    return { isValid: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { isValid: false, error: error.issues[0].message };
    }
    return { isValid: false, error: 'Invalid tag' };
  }
}

export function validateEmail(email: string): {
  isValid: boolean;
  error?: string;
} {
  try {
    EmailSchema.parse(email);
    return { isValid: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { isValid: false, error: error.issues[0].message };
    }
    return { isValid: false, error: 'Invalid email' };
  }
}

/**
 * Check if a phase transition is valid
 */
export function isValidPhaseTransition(
  currentPhase: Phase,
  newPhase: Phase
): boolean {
  const phaseOrder: Phase[] = ['ideation', 'poc', 'pilot', 'production', 'optimization'];
  const currentIndex = phaseOrder.indexOf(currentPhase);
  const newIndex = phaseOrder.indexOf(newPhase);

  // Allow moving forward, backward, or staying in same phase
  return Math.abs(newIndex - currentIndex) <= 1 || newIndex === currentIndex;
}

/**
 * Check if canvas is ready to advance to next phase
 */
export function canAdvancePhase(
  currentPhase: Phase,
  strategicReadiness: ReadinessLevel,
  executionReadiness: ReadinessLevel,
  validationReadiness: ReadinessLevel
): {
  canAdvance: boolean;
  reason?: string;
} {
  // Can't advance from optimization (final phase)
  if (currentPhase === 'optimization') {
    return { canAdvance: false, reason: 'Already at final phase' };
  }

  // Check readiness requirements
  const hasRedReadiness =
    strategicReadiness === 'red' ||
    executionReadiness === 'red' ||
    validationReadiness === 'red';

  if (hasRedReadiness) {
    return {
      canAdvance: false,
      reason: 'Cannot advance with red readiness indicators. Address blockers first.',
    };
  }

  return { canAdvance: true };
}
