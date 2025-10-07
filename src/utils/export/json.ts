import type { Canvas } from '@/types/canvas.types';

/**
 * Export canvas to JSON format
 */
export function exportToJSON(canvas: Canvas): string {
  return JSON.stringify(canvas, null, 2);
}

/**
 * Import canvas from JSON
 */
export function importFromJSON(jsonString: string): Canvas | null {
  try {
    const data = JSON.parse(jsonString, (_key, value) => {
      // Revive Date objects
      if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(value)) {
        return new Date(value);
      }
      return value;
    });

    // Basic validation
    if (!data.id || !data.useCaseName || !data.phase) {
      throw new Error('Invalid canvas data');
    }

    return data as Canvas;
  } catch (error) {
    console.error('Error importing JSON:', error);
    return null;
  }
}

/**
 * Download JSON file
 */
export function downloadJSON(canvas: Canvas): void {
  const json = exportToJSON(canvas);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `${canvas.useCaseName.replace(/[^a-z0-9]/gi, '_')}_canvas.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Upload and import JSON file
 */
export function uploadJSON(): Promise<Canvas | null> {
  return new Promise((resolve) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';

    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) {
        resolve(null);
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        const canvas = importFromJSON(content);
        resolve(canvas);
      };

      reader.onerror = () => {
        resolve(null);
      };

      reader.readAsText(file);
    };

    input.click();
  });
}
