import type { Canvas, LayerType, Phase, ReadinessLevel } from '@/types/canvas.types';
import { CANVAS_STRUCTURE, LAYER_INFO } from '@/data/canvasStructure';
import { CanvasSection } from './CanvasSection';
import { ReadinessIndicator } from './ReadinessIndicator';
import { calculateLayerCompletion } from '@/utils/calculations';

interface CanvasLayerProps {
  canvas: Canvas;
  layer: LayerType;
  currentPhase: Phase;
  onAnswerChange: (layer: LayerType, sectionId: string, questionIndex: number, answer: string) => void;
  onNotesChange: (layer: LayerType, sectionId: string, notes: string) => void;
  onReadinessChange: (layer: LayerType, level: ReadinessLevel) => void;
}

export function CanvasLayer({
  canvas,
  layer,
  currentPhase,
  onAnswerChange,
  onNotesChange,
  onReadinessChange,
}: CanvasLayerProps) {
  const layerInfo = LAYER_INFO[layer];
  const sections = CANVAS_STRUCTURE.filter(s => s.layer === layer);
  const completion = calculateLayerCompletion(canvas, layer);

  const layerColors = {
    strategic: 'from-blue-50 to-blue-100 border-blue-300',
    execution: 'from-yellow-50 to-yellow-100 border-yellow-300',
    validation: 'from-green-50 to-green-100 border-green-300',
  };

  return (
    <div className={`border-2 rounded-xl bg-gradient-to-br ${layerColors[layer]} p-6 space-y-6`}>
      {/* Layer Header */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-gray-900">{layerInfo.name}</h2>
            <span className="px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-700">
              {completion}% Complete
            </span>
          </div>
          <p className="text-lg text-gray-700 mt-1">{layerInfo.subtitle}</p>
          <p className="text-sm text-gray-600 mt-2">{layerInfo.description}</p>
          <p className="text-xs text-gray-500 mt-1">
            {layerInfo.sections} sections
          </p>
        </div>

        <div className="ml-4">
          <ReadinessIndicator
            level={canvas.readiness[layer]}
            onChange={(level) => onReadinessChange(layer, level)}
            label="Readiness"
          />
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-4">
        {sections.map((section) => {
          const sectionContent = canvas[layer][section.id as keyof typeof canvas[typeof layer]];

          return (
            <CanvasSection
              key={section.id}
              section={section}
              content={sectionContent}
              currentPhase={currentPhase}
              onAnswerChange={(questionIndex, answer) =>
                onAnswerChange(layer, section.id, questionIndex, answer)
              }
              onNotesChange={(notes) => onNotesChange(layer, section.id, notes)}
            />
          );
        })}
      </div>
    </div>
  );
}
