import type { Canvas } from './canvas.types';

// Template interface
export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  industry: string;
  aiType: string[]; // e.g., 'NLP', 'Computer Vision', 'Predictive'
  prefilledSections: Partial<Canvas>;
  thumbnail: string;
  usageCount: number;
  createdBy: string;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Template category
export type TemplateCategory =
  | 'predictive-analytics'
  | 'nlp'
  | 'computer-vision'
  | 'recommendation'
  | 'automation'
  | 'fraud-detection'
  | 'custom';

// Template filters
export interface TemplateFilters {
  category?: TemplateCategory[];
  industry?: string[];
  aiType?: string[];
  searchQuery?: string;
}

// Template summary (for listing)
export interface TemplateSummary {
  id: string;
  name: string;
  description: string;
  category: string;
  industry: string;
  aiType: string[];
  thumbnail: string;
  usageCount: number;
}
