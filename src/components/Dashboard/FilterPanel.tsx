import { Filter } from 'lucide-react';
import { useState } from 'react';
import type { Phase, ReadinessLevel, CanvasStatus } from '@/types/canvas.types';
import { Badge } from '@/components/Common/Badge';
import { formatPhase, formatStatus, formatReadiness } from '@/utils/formatting';

interface FilterPanelProps {
  selectedPhases: Phase[];
  selectedStatuses: CanvasStatus[];
  selectedReadiness: ReadinessLevel[];
  onPhaseChange: (phases: Phase[]) => void;
  onStatusChange: (statuses: CanvasStatus[]) => void;
  onReadinessChange: (readiness: ReadinessLevel[]) => void;
  onClearAll: () => void;
}

export function FilterPanel({
  selectedPhases,
  selectedStatuses,
  selectedReadiness,
  onPhaseChange,
  onStatusChange,
  onReadinessChange,
  onClearAll,
}: FilterPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const phases: Phase[] = ['ideation', 'poc', 'pilot', 'production', 'optimization'];
  const statuses: CanvasStatus[] = ['draft', 'in-progress', 'completed', 'archived'];
  const readinessLevels: ReadinessLevel[] = ['red', 'yellow', 'green'];

  const togglePhase = (phase: Phase) => {
    if (selectedPhases.includes(phase)) {
      onPhaseChange(selectedPhases.filter(p => p !== phase));
    } else {
      onPhaseChange([...selectedPhases, phase]);
    }
  };

  const toggleStatus = (status: CanvasStatus) => {
    if (selectedStatuses.includes(status)) {
      onStatusChange(selectedStatuses.filter(s => s !== status));
    } else {
      onStatusChange([...selectedStatuses, status]);
    }
  };

  const toggleReadiness = (level: ReadinessLevel) => {
    if (selectedReadiness.includes(level)) {
      onReadinessChange(selectedReadiness.filter(r => r !== level));
    } else {
      onReadinessChange([...selectedReadiness, level]);
    }
  };

  const hasFilters = selectedPhases.length > 0 || selectedStatuses.length > 0 || selectedReadiness.length > 0;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-600" />
          <span className="font-medium text-gray-900">Filters</span>
          {hasFilters && (
            <Badge variant="primary" size="sm">
              {selectedPhases.length + selectedStatuses.length + selectedReadiness.length}
            </Badge>
          )}
        </div>
        {hasFilters && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClearAll();
            }}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            Clear all
          </button>
        )}
      </button>

      {/* Filters */}
      {isExpanded && (
        <div className="px-4 pb-4 space-y-4 border-t border-gray-200 pt-4">
          {/* Phase Filter */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Phase</h4>
            <div className="flex flex-wrap gap-2">
              {phases.map((phase) => (
                <button
                  key={phase}
                  onClick={() => togglePhase(phase)}
                  className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                    selectedPhases.includes(phase)
                      ? 'bg-blue-100 border-blue-300 text-blue-800'
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {formatPhase(phase)}
                </button>
              ))}
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Status</h4>
            <div className="flex flex-wrap gap-2">
              {statuses.map((status) => (
                <button
                  key={status}
                  onClick={() => toggleStatus(status)}
                  className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                    selectedStatuses.includes(status)
                      ? 'bg-blue-100 border-blue-300 text-blue-800'
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {formatStatus(status)}
                </button>
              ))}
            </div>
          </div>

          {/* Readiness Filter */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Readiness</h4>
            <div className="flex flex-wrap gap-2">
              {readinessLevels.map((level) => (
                <button
                  key={level}
                  onClick={() => toggleReadiness(level)}
                  className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                    selectedReadiness.includes(level)
                      ? 'bg-blue-100 border-blue-300 text-blue-800'
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {formatReadiness(level)}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
