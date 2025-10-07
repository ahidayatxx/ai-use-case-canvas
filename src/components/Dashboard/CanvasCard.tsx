import { MoreVertical, Trash2, Copy, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import type { CanvasSummary } from '@/types/canvas.types';
import { Card } from '@/components/Common/Card';
import { Badge } from '@/components/Common/Badge';
import { formatDate, formatPhase, formatStatus } from '@/utils/formatting';

interface CanvasCardProps {
  canvas: CanvasSummary;
  onOpen: (id: string) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
}

export function CanvasCard({
  canvas,
  onOpen,
  onDelete,
  onDuplicate,
}: CanvasCardProps) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <Card className="relative" hover>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h3
              className="font-semibold text-gray-900 truncate cursor-pointer hover:text-blue-600"
              onClick={() => onOpen(canvas.id)}
            >
              {canvas.useCaseName}
            </h3>
            <p className="text-sm text-gray-600 truncate mt-1">
              {canvas.owner}
            </p>
          </div>

          {/* Menu */}
          <div className="relative ml-2">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="More options"
            >
              <MoreVertical className="w-4 h-4 text-gray-600" />
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                <button
                  onClick={() => {
                    onOpen(canvas.id);
                    setShowMenu(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open
                </button>
                <button
                  onClick={() => {
                    onDuplicate(canvas.id);
                    setShowMenu(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                >
                  <Copy className="w-4 h-4" />
                  Duplicate
                </button>
                <button
                  onClick={() => {
                    onDelete(canvas.id);
                    setShowMenu(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="primary" size="sm">
            {formatPhase(canvas.phase)}
          </Badge>
          <Badge variant="default" size="sm">
            {formatStatus(canvas.status)}
          </Badge>
        </div>

        {/* Progress */}
        <div className="mb-3">
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-gray-600">Progress</span>
            <span className="font-medium text-gray-900">
              {canvas.completionPercentage}%
            </span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${canvas.completionPercentage}%` }}
            />
          </div>
        </div>

        {/* Readiness */}
        <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-200">
          <span className="text-sm text-gray-600">Readiness</span>
          <div className="flex gap-1">
            {['strategic', 'execution', 'validation'].map((layer) => {
              const level = canvas.readiness[layer as keyof typeof canvas.readiness];
              const colors = {
                red: 'bg-red-500',
                yellow: 'bg-yellow-500',
                green: 'bg-green-500',
              };
              return (
                <div
                  key={layer}
                  className={`w-4 h-4 rounded-full ${colors[level]}`}
                  title={`${layer}: ${level}`}
                />
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Updated {formatDate(canvas.lastUpdated)}</span>
          {canvas.tags.length > 0 && (
            <div className="flex gap-1">
              {canvas.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="px-2 py-0.5 bg-gray-100 rounded">
                  {tag}
                </span>
              ))}
              {canvas.tags.length > 2 && (
                <span className="px-2 py-0.5 bg-gray-100 rounded">
                  +{canvas.tags.length - 2}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Overlay to close menu */}
      {showMenu && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setShowMenu(false)}
        />
      )}
    </Card>
  );
}
