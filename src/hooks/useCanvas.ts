import { useState, useCallback, useEffect } from 'react';
import type { Canvas, Phase, ReadinessLevel, LayerType, SectionContent } from '@/types/canvas.types';
import {
  getAllCanvases,
  getCanvasById,
  saveCanvas,
  deleteCanvas as deleteCanvasStorage,
  duplicateCanvas as duplicateCanvasStorage,
} from '@/utils/storage';
import { createEmptyCanvas } from '@/utils/canvasFactory';

/**
 * Main hook for managing canvas operations
 */
export function useCanvas(canvasId?: string) {
  const [canvas, setCanvas] = useState<Canvas | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Load canvas
  useEffect(() => {
    if (!canvasId) {
      setCanvas(null);
      setLoading(false);
      return;
    }

    try {
      const loadedCanvas = getCanvasById(canvasId);
      if (loadedCanvas) {
        setCanvas(loadedCanvas);
        setError(null);
      } else {
        setError('Canvas not found');
      }
    } catch (err) {
      setError('Error loading canvas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [canvasId]);

  // Create new canvas
  const createCanvas = useCallback(
    (name: string, useCaseName: string, owner: string): Canvas => {
      const newCanvas = createEmptyCanvas(name, useCaseName, owner);
      saveCanvas(newCanvas);
      setCanvas(newCanvas);
      return newCanvas;
    },
    []
  );

  // Save current canvas
  const save = useCallback(() => {
    if (!canvas) return false;

    try {
      const success = saveCanvas({ ...canvas, updatedAt: new Date() });
      if (success) {
        setCanvas({ ...canvas, updatedAt: new Date() });
      }
      return success;
    } catch (err) {
      console.error('Error saving canvas:', err);
      return false;
    }
  }, [canvas]);

  // Update canvas field
  const updateCanvas = useCallback(
    (updates: Partial<Canvas>) => {
      if (!canvas) return;

      const updated = { ...canvas, ...updates, updatedAt: new Date() };
      setCanvas(updated);
      saveCanvas(updated);
    },
    [canvas]
  );

  // Update section content
  const updateSection = useCallback(
    (layer: LayerType, sectionId: string, content: Partial<SectionContent>) => {
      if (!canvas) return;

      const currentSection = canvas[layer][sectionId as keyof typeof canvas[typeof layer]] as SectionContent;

      const updated = {
        ...canvas,
        [layer]: {
          ...canvas[layer],
          [sectionId]: {
            ...currentSection,
            ...content,
          },
        },
        updatedAt: new Date(),
      };

      setCanvas(updated);
      saveCanvas(updated);
    },
    [canvas]
  );

  // Update answer for a specific question
  const updateAnswer = useCallback(
    (layer: LayerType, sectionId: string, questionIndex: number, answer: string) => {
      if (!canvas) return;

      const section = canvas[layer][sectionId as keyof typeof canvas[typeof layer]] as SectionContent;
      const newAnswers = [...section.answers];
      newAnswers[questionIndex] = answer;

      updateSection(layer, sectionId, { answers: newAnswers });
    },
    [canvas, updateSection]
  );

  // Update notes for a section
  const updateNotes = useCallback(
    (layer: LayerType, sectionId: string, notes: string) => {
      updateSection(layer, sectionId, { notes });
    },
    [updateSection]
  );

  // Update phase
  const updatePhase = useCallback(
    (phase: Phase) => {
      updateCanvas({ phase });
    },
    [updateCanvas]
  );

  // Update readiness
  const updateReadiness = useCallback(
    (layer: LayerType, level: ReadinessLevel) => {
      if (!canvas) return;

      const updated = {
        ...canvas,
        readiness: {
          ...canvas.readiness,
          [layer]: level,
        },
        updatedAt: new Date(),
      };

      setCanvas(updated);
      saveCanvas(updated);
    },
    [canvas]
  );

  // Add tag
  const addTag = useCallback(
    (tag: string) => {
      if (!canvas) return;
      if (canvas.tags.includes(tag)) return;

      updateCanvas({ tags: [...canvas.tags, tag] });
    },
    [canvas, updateCanvas]
  );

  // Remove tag
  const removeTag = useCallback(
    (tag: string) => {
      if (!canvas) return;

      updateCanvas({ tags: canvas.tags.filter(t => t !== tag) });
    },
    [canvas, updateCanvas]
  );

  // Delete canvas
  const deleteCanvas = useCallback(() => {
    if (!canvas) return false;

    try {
      const success = deleteCanvasStorage(canvas.id);
      if (success) {
        setCanvas(null);
      }
      return success;
    } catch (err) {
      console.error('Error deleting canvas:', err);
      return false;
    }
  }, [canvas]);

  // Duplicate canvas
  const duplicateCanvas = useCallback(
    (newName?: string): Canvas | null => {
      if (!canvas) return null;

      try {
        const duplicate = duplicateCanvasStorage(canvas.id, newName);
        return duplicate;
      } catch (err) {
        console.error('Error duplicating canvas:', err);
        return null;
      }
    },
    [canvas]
  );

  return {
    canvas,
    loading,
    error,
    createCanvas,
    save,
    updateCanvas,
    updateSection,
    updateAnswer,
    updateNotes,
    updatePhase,
    updateReadiness,
    addTag,
    removeTag,
    deleteCanvas,
    duplicateCanvas,
  };
}

/**
 * Hook for managing all canvases (for dashboard)
 */
export function useCanvases() {
  const [canvases, setCanvases] = useState<Canvas[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const loadCanvases = useCallback(() => {
    try {
      const allCanvases = getAllCanvases();
      setCanvases(allCanvases);
    } catch (err) {
      console.error('Error loading canvases:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCanvases();
  }, [loadCanvases]);

  const refresh = useCallback(() => {
    setLoading(true);
    loadCanvases();
  }, [loadCanvases]);

  return {
    canvases,
    loading,
    refresh,
  };
}
