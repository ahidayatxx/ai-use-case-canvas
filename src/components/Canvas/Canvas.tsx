import { useState } from 'react';
import type { Canvas as CanvasType, Phase, LayerType, ReadinessLevel } from '@/types/canvas.types';
import { CanvasHeader } from './CanvasHeader';
import { PhaseSelector } from './PhaseSelector';
import { CanvasLayer } from './CanvasLayer';
import { useAutoSave } from '@/hooks/useAutoSave';

interface CanvasProps {
  canvas: CanvasType;
  onUpdate: (canvas: CanvasType) => void;
  onSave: () => void;
  onExport: () => void;
  onBack: () => void;
}

export function Canvas({
  canvas,
  onUpdate,
  onSave,
  onExport,
  onBack,
}: CanvasProps) {
  const [localCanvas, setLocalCanvas] = useState<CanvasType>(canvas);

  // Auto-save
  const { status: autoSaveStatus, lastSaved } = useAutoSave(localCanvas);

  // Update local state and notify parent
  const updateLocalCanvas = (updates: Partial<CanvasType>) => {
    const updated = { ...localCanvas, ...updates, updatedAt: new Date() };
    setLocalCanvas(updated);
    onUpdate(updated);
  };

  // Handle phase change
  const handlePhaseChange = (phase: Phase) => {
    updateLocalCanvas({ phase });
  };

  // Handle answer change
  const handleAnswerChange = (
    layer: LayerType,
    sectionId: string,
    questionIndex: number,
    answer: string
  ) => {
    const layerData = localCanvas[layer];
    const section = layerData[sectionId as keyof typeof layerData] as any;
    const newAnswers = [...section.answers];
    newAnswers[questionIndex] = answer;

    const updatedLayer = {
      ...layerData,
      [sectionId]: {
        ...section,
        answers: newAnswers,
      },
    };

    updateLocalCanvas({ [layer]: updatedLayer } as any);
  };

  // Handle notes change
  const handleNotesChange = (layer: LayerType, sectionId: string, notes: string) => {
    const layerData = localCanvas[layer];
    const section = layerData[sectionId as keyof typeof layerData] as any;

    const updatedLayer = {
      ...layerData,
      [sectionId]: {
        ...section,
        notes,
      },
    };

    updateLocalCanvas({ [layer]: updatedLayer } as any);
  };

  // Handle readiness change
  const handleReadinessChange = (layer: LayerType, level: ReadinessLevel) => {
    updateLocalCanvas({
      readiness: {
        ...localCanvas.readiness,
        [layer]: level,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <CanvasHeader
        canvas={localCanvas}
        autoSaveStatus={autoSaveStatus}
        lastSaved={lastSaved}
        onSave={onSave}
        onExport={onExport}
        onBack={onBack}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Phase Selector */}
        <div className="mb-8">
          <PhaseSelector
            currentPhase={localCanvas.phase}
            onChange={handlePhaseChange}
          />
        </div>

        {/* Layers */}
        <div className="space-y-8">
          {/* Strategic Layer */}
          <CanvasLayer
            canvas={localCanvas}
            layer="strategic"
            currentPhase={localCanvas.phase}
            onAnswerChange={handleAnswerChange}
            onNotesChange={handleNotesChange}
            onReadinessChange={handleReadinessChange}
          />

          {/* Execution Layer */}
          <CanvasLayer
            canvas={localCanvas}
            layer="execution"
            currentPhase={localCanvas.phase}
            onAnswerChange={handleAnswerChange}
            onNotesChange={handleNotesChange}
            onReadinessChange={handleReadinessChange}
          />

          {/* Validation Layer */}
          <CanvasLayer
            canvas={localCanvas}
            layer="validation"
            currentPhase={localCanvas.phase}
            onAnswerChange={handleAnswerChange}
            onNotesChange={handleNotesChange}
            onReadinessChange={handleReadinessChange}
          />
        </div>
      </div>
    </div>
  );
}
