import { useState } from 'react';
import { ChevronDown, ChevronUp, Lightbulb, StickyNote } from 'lucide-react';
import * as Icons from 'lucide-react';
import type { SectionDefinition, SectionContent, Phase } from '@/types/canvas.types';
import { calculateSectionCompletion } from '@/utils/calculations';
import { getRelevance } from '@/data/phaseConfig';

interface CanvasSectionProps {
  section: SectionDefinition;
  content: SectionContent;
  currentPhase: Phase;
  onAnswerChange: (questionIndex: number, answer: string) => void;
  onNotesChange: (notes: string) => void;
}

export function CanvasSection({
  section,
  content,
  currentPhase,
  onAnswerChange,
  onNotesChange,
}: CanvasSectionProps) {
  const [isExpanded, setIsExpanded] = useState(content.expandedByDefault);
  const [showNotes, setShowNotes] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const completion = calculateSectionCompletion(content);
  const relevance = getRelevance(section.id as any, currentPhase);
  const isRelevant = relevance !== 'low';

  // Get icon component
  const IconComponent = (Icons as any)[section.icon] || Icons.Circle;

  // Layer colors
  const layerColors = {
    strategic: 'border-blue-300 bg-blue-50',
    execution: 'border-yellow-300 bg-yellow-50',
    validation: 'border-green-300 bg-green-50',
  };

  return (
    <div
      className={`
        border-2 rounded-lg transition-all
        ${layerColors[section.layer]}
        ${!isRelevant ? 'opacity-50' : 'opacity-100'}
      `}
    >
      {/* Section Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">
            <div className="mt-1">
              <IconComponent className="w-5 h-5 text-gray-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{section.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{section.description}</p>
              {!isRelevant && (
                <p className="text-xs text-orange-600 mt-2">
                  ⚠️ Less relevant for {currentPhase} phase
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Completion Badge */}
            <div className="px-3 py-1 bg-white rounded-full text-sm font-medium">
              {completion}%
            </div>

            {/* Help Button */}
            <button
              onClick={() => setShowHelp(!showHelp)}
              className="p-2 hover:bg-white rounded-lg transition-colors"
              title="Show tips"
            >
              <Lightbulb className="w-4 h-4 text-gray-600" />
            </button>

            {/* Notes Button */}
            <button
              onClick={() => setShowNotes(!showNotes)}
              className="p-2 hover:bg-white rounded-lg transition-colors"
              title="Section notes"
            >
              <StickyNote className="w-4 h-4 text-gray-600" />
            </button>

            {/* Expand/Collapse Button */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 hover:bg-white rounded-lg transition-colors"
            >
              {isExpanded ? (
                <ChevronUp className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Help Tips */}
        {showHelp && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="text-sm font-semibold text-blue-900 mb-2">Tips & Examples</h4>
            <ul className="space-y-2 text-sm text-blue-800">
              {section.tips.map((tip, index) => (
                <li key={index} className="flex gap-2">
                  <span className="text-blue-500">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
            {section.examples.length > 0 && (
              <>
                <h4 className="text-sm font-semibold text-blue-900 mt-3 mb-2">Examples:</h4>
                <ul className="space-y-2 text-sm text-blue-800">
                  {section.examples.map((example, index) => (
                    <li key={index} className="flex gap-2">
                      <span className="text-blue-500">→</span>
                      <span>{example}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}
      </div>

      {/* Section Content */}
      {isExpanded && (
        <div className="p-4 space-y-4">
          {section.questions.map((question, index) => (
            <div key={index} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                {question}
              </label>
              <textarea
                value={content.answers[index] || ''}
                onChange={(e) => onAnswerChange(index, e.target.value)}
                placeholder={`Enter your answer here...`}
                className="textarea-field min-h-[100px]"
                rows={4}
              />
            </div>
          ))}

          {/* Notes Section */}
          {showNotes && (
            <div className="pt-4 border-t border-gray-200">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes
              </label>
              <textarea
                value={content.notes || ''}
                onChange={(e) => onNotesChange(e.target.value)}
                placeholder="Add any additional notes, references, or context here..."
                className="textarea-field min-h-[80px]"
                rows={3}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
