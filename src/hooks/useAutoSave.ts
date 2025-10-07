import { useEffect, useRef, useState } from 'react';
import type { Canvas } from '@/types/canvas.types';
import { saveAutosave } from '@/utils/storage';
import { useDebounce } from './useDebounce';

export type AutoSaveStatus = 'idle' | 'saving' | 'saved' | 'error';

/**
 * Hook for auto-saving canvas data
 */
export function useAutoSave(
  canvas: Canvas | null,
  interval: number = 30000 // 30 seconds
): {
  status: AutoSaveStatus;
  lastSaved: Date | null;
  save: () => void;
} {
  const [status, setStatus] = useState<AutoSaveStatus>('idle');
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const lastCanvasRef = useRef<string>('');

  // Debounced canvas data
  const debouncedCanvas = useDebounce(canvas, 2000); // 2 second debounce

  // Manual save function
  const save = () => {
    if (!canvas) return;

    setStatus('saving');
    try {
      const success = saveAutosave(canvas.id, canvas);
      if (success) {
        setStatus('saved');
        setLastSaved(new Date());
        lastCanvasRef.current = JSON.stringify(canvas);

        // Reset to idle after 3 seconds
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Autosave error:', error);
      setStatus('error');
    }
  };

  // Auto-save when debounced canvas changes
  useEffect(() => {
    if (!debouncedCanvas) return;

    const currentCanvasString = JSON.stringify(debouncedCanvas);

    // Only save if canvas has changed
    if (currentCanvasString !== lastCanvasRef.current) {
      save();
    }
  }, [debouncedCanvas]);

  // Periodic auto-save
  useEffect(() => {
    if (!canvas) return;

    const intervalId = setInterval(() => {
      const currentCanvasString = JSON.stringify(canvas);
      if (currentCanvasString !== lastCanvasRef.current) {
        save();
      }
    }, interval);

    return () => clearInterval(intervalId);
  }, [canvas, interval]);

  return { status, lastSaved, save };
}
