import type { Canvas, CanvasSummary, CanvasFilters } from '@/types/canvas.types';
import type { Template } from '@/types/template.types';

const STORAGE_KEYS = {
  CANVASES: 'ai-canvas-canvases',
  TEMPLATES: 'ai-canvas-templates',
  SETTINGS: 'ai-canvas-settings',
  AUTOSAVE_PREFIX: 'ai-canvas-autosave-',
} as const;

// Generic storage functions
function getFromStorage<T>(key: string): T | null {
  try {
    const item = localStorage.getItem(key);
    if (!item) return null;
    return JSON.parse(item, (_key, value) => {
      // Revive Date objects
      if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(value)) {
        return new Date(value);
      }
      return value;
    });
  } catch (error) {
    console.error(`Error reading from storage (${key}):`, error);
    return null;
  }
}

function setInStorage<T>(key: string, value: T): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error writing to storage (${key}):`, error);
    return false;
  }
}

function removeFromStorage(key: string): boolean {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing from storage (${key}):`, error);
    return false;
  }
}

// Canvas operations
export function getAllCanvases(): Canvas[] {
  return getFromStorage<Canvas[]>(STORAGE_KEYS.CANVASES) || [];
}

export function getCanvasById(id: string): Canvas | null {
  const canvases = getAllCanvases();
  return canvases.find(c => c.id === id) || null;
}

export function saveCanvas(canvas: Canvas): boolean {
  const canvases = getAllCanvases();
  const index = canvases.findIndex(c => c.id === canvas.id);

  if (index >= 0) {
    // Update existing
    canvases[index] = { ...canvas, updatedAt: new Date() };
  } else {
    // Add new
    canvases.push(canvas);
  }

  return setInStorage(STORAGE_KEYS.CANVASES, canvases);
}

export function deleteCanvas(id: string): boolean {
  const canvases = getAllCanvases();
  const filtered = canvases.filter(c => c.id !== id);
  // Also delete autosave
  removeFromStorage(`${STORAGE_KEYS.AUTOSAVE_PREFIX}${id}`);
  return setInStorage(STORAGE_KEYS.CANVASES, filtered);
}

export function duplicateCanvas(id: string, newName?: string): Canvas | null {
  const original = getCanvasById(id);
  if (!original) return null;

  const duplicate: Canvas = {
    ...original,
    id: crypto.randomUUID(),
    name: newName || `${original.name} (Copy)`,
    useCaseName: newName || `${original.useCaseName} (Copy)`,
    createdAt: new Date(),
    updatedAt: new Date(),
    version: 1,
  };

  saveCanvas(duplicate);
  return duplicate;
}

// Canvas filtering and search
export function filterCanvases(filters: CanvasFilters): CanvasSummary[] {
  let canvases = getAllCanvases();

  // Filter by phase
  if (filters.phase && filters.phase.length > 0) {
    canvases = canvases.filter(c => filters.phase!.includes(c.phase));
  }

  // Filter by status
  if (filters.status && filters.status.length > 0) {
    canvases = canvases.filter(c => filters.status!.includes(c.status));
  }

  // Filter by tags
  if (filters.tags && filters.tags.length > 0) {
    canvases = canvases.filter(c =>
      filters.tags!.some(tag => c.tags.includes(tag))
    );
  }

  // Search query
  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase();
    canvases = canvases.filter(c =>
      c.name.toLowerCase().includes(query) ||
      c.useCaseName.toLowerCase().includes(query) ||
      c.useCaseOwner.toLowerCase().includes(query)
    );
  }

  // Convert to summaries
  const summaries: CanvasSummary[] = canvases.map(c => ({
    id: c.id,
    name: c.name,
    useCaseName: c.useCaseName,
    phase: c.phase,
    status: c.status,
    readiness: {
      strategic: c.readiness.strategic,
      execution: c.readiness.execution,
      validation: c.readiness.validation,
    },
    completionPercentage: calculateCompletionPercentage(c),
    lastUpdated: c.updatedAt,
    owner: c.useCaseOwner,
    tags: c.tags,
  }));

  return summaries;
}

// Autosave operations
export function saveAutosave(canvasId: string, canvas: Canvas): boolean {
  const key = `${STORAGE_KEYS.AUTOSAVE_PREFIX}${canvasId}`;
  return setInStorage(key, { ...canvas, updatedAt: new Date() });
}

export function getAutosave(canvasId: string): Canvas | null {
  const key = `${STORAGE_KEYS.AUTOSAVE_PREFIX}${canvasId}`;
  return getFromStorage<Canvas>(key);
}

export function clearAutosave(canvasId: string): boolean {
  const key = `${STORAGE_KEYS.AUTOSAVE_PREFIX}${canvasId}`;
  return removeFromStorage(key);
}

// Template operations
export function getAllTemplates(): Template[] {
  return getFromStorage<Template[]>(STORAGE_KEYS.TEMPLATES) || [];
}

export function getTemplateById(id: string): Template | null {
  const templates = getAllTemplates();
  return templates.find(t => t.id === id) || null;
}

export function saveTemplate(template: Template): boolean {
  const templates = getAllTemplates();
  const index = templates.findIndex(t => t.id === template.id);

  if (index >= 0) {
    templates[index] = { ...template, updatedAt: new Date() };
  } else {
    templates.push(template);
  }

  return setInStorage(STORAGE_KEYS.TEMPLATES, templates);
}

export function deleteTemplate(id: string): boolean {
  const templates = getAllTemplates();
  const filtered = templates.filter(t => t.id !== id);
  return setInStorage(STORAGE_KEYS.TEMPLATES, filtered);
}

// Import/Export operations
export function exportAllData(): string {
  const data = {
    canvases: getAllCanvases(),
    templates: getAllTemplates(),
    exportedAt: new Date().toISOString(),
    version: '1.0',
  };
  return JSON.stringify(data, null, 2);
}

export function importData(jsonData: string): boolean {
  try {
    const data = JSON.parse(jsonData);

    if (data.canvases) {
      setInStorage(STORAGE_KEYS.CANVASES, data.canvases);
    }

    if (data.templates) {
      setInStorage(STORAGE_KEYS.TEMPLATES, data.templates);
    }

    return true;
  } catch (error) {
    console.error('Error importing data:', error);
    return false;
  }
}

// Storage stats
export function getStorageStats() {
  const canvases = getAllCanvases();
  const templates = getAllTemplates();

  return {
    canvasCount: canvases.length,
    templateCount: templates.length,
    storageSize: new Blob([exportAllData()]).size,
  };
}

// Clear all data
export function clearAllData(): boolean {
  try {
    removeFromStorage(STORAGE_KEYS.CANVASES);
    removeFromStorage(STORAGE_KEYS.TEMPLATES);
    removeFromStorage(STORAGE_KEYS.SETTINGS);

    // Clear all autosaves
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith(STORAGE_KEYS.AUTOSAVE_PREFIX)) {
        localStorage.removeItem(key);
      }
    });

    return true;
  } catch (error) {
    console.error('Error clearing data:', error);
    return false;
  }
}

// Helper: Calculate completion percentage
function calculateCompletionPercentage(canvas: Canvas): number {
  let totalQuestions = 0;
  let answeredQuestions = 0;

  // Count strategic layer
  Object.values(canvas.strategic).forEach(section => {
    totalQuestions += section.answers.length;
    answeredQuestions += section.answers.filter(a => a && a.trim().length > 0).length;
  });

  // Count execution layer
  Object.values(canvas.execution).forEach(section => {
    totalQuestions += section.answers.length;
    answeredQuestions += section.answers.filter(a => a && a.trim().length > 0).length;
  });

  // Count validation layer
  Object.values(canvas.validation).forEach(section => {
    totalQuestions += section.answers.length;
    answeredQuestions += section.answers.filter(a => a && a.trim().length > 0).length;
  });

  return totalQuestions > 0 ? Math.round((answeredQuestions / totalQuestions) * 100) : 0;
}
