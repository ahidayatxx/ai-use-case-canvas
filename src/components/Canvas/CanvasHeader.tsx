import { Save, Download, ArrowLeft, Clock } from 'lucide-react';
import type { Canvas } from '@/types/canvas.types';
import type { AutoSaveStatus } from '@/hooks/useAutoSave';
import { formatTimeAgo } from '@/utils/formatting';
import { calculateOverallCompletion } from '@/utils/calculations';

interface CanvasHeaderProps {
  canvas: Canvas;
  autoSaveStatus: AutoSaveStatus;
  lastSaved: Date | null;
  onSave: () => void;
  onExport: () => void;
  onBack: () => void;
}

export function CanvasHeader({
  canvas,
  autoSaveStatus,
  lastSaved,
  onSave,
  onExport,
  onBack,
}: CanvasHeaderProps) {
  const completion = calculateOverallCompletion(canvas);

  const statusColors = {
    idle: 'text-gray-500',
    saving: 'text-blue-500',
    saved: 'text-green-500',
    error: 'text-red-500',
  };

  const statusText = {
    idle: '',
    saving: 'Saving...',
    saved: 'Saved',
    error: 'Error saving',
  };

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-10" role="banner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4 flex items-center justify-between">
          {/* Left: Back button and title */}
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Back to dashboard"
              aria-label="Back to dashboard"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" aria-hidden="true" />
            </button>

            <div className="min-w-0 flex-1">
              <h1 className="text-xl font-bold text-gray-900 truncate">
                {canvas.useCaseName}
              </h1>
              <p className="text-sm text-gray-600 truncate">
                Owner: {canvas.useCaseOwner}
              </p>
            </div>
          </div>

          {/* Center: Progress and status */}
          <div className="hidden md:flex items-center gap-4 mx-6">
            <div className="flex items-center gap-2" role="status" aria-label={`Canvas completion: ${completion}%`}>
              <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden" aria-hidden="true">
                <div
                  className="h-full bg-blue-600 transition-all duration-300"
                  style={{ width: `${completion}%` }}
                />
              </div>
              <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                {completion}%
              </span>
            </div>

            {autoSaveStatus !== 'idle' && (
              <div className={`flex items-center gap-2 text-sm ${statusColors[autoSaveStatus]}`} role="status" aria-live="polite">
                <Clock className="w-4 h-4" aria-hidden="true" />
                <span>{statusText[autoSaveStatus]}</span>
              </div>
            )}

            {lastSaved && autoSaveStatus === 'idle' && (
              <div className="text-xs text-gray-500" role="status">
                Saved {formatTimeAgo(lastSaved)}
              </div>
            )}
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={onSave}
              className="btn-secondary flex items-center gap-2"
              title="Save canvas (Ctrl+S)"
              aria-label="Save canvas"
            >
              <Save className="w-4 h-4" aria-hidden="true" />
              <span className="hidden sm:inline">Save</span>
            </button>

            <button
              onClick={onExport}
              className="btn-primary flex items-center gap-2"
              title="Export canvas (Ctrl+E)"
              aria-label="Export canvas"
            >
              <Download className="w-4 h-4" aria-hidden="true" />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </div>

        {/* Mobile progress bar */}
        <div className="md:hidden pb-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all duration-300"
                style={{ width: `${completion}%` }}
              />
            </div>
            <span className="text-sm font-medium text-gray-700">{completion}%</span>
          </div>
          {lastSaved && (
            <div className="text-xs text-gray-500">
              Saved {formatTimeAgo(lastSaved)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
