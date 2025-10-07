import { Lightbulb, FlaskConical, Plane, Factory, TrendingUp } from 'lucide-react';
import type { Phase } from '@/types/canvas.types';
import { PHASE_INFO } from '@/data/phaseConfig';

interface PhaseSelectorProps {
  currentPhase: Phase;
  onChange: (phase: Phase) => void;
}

export function PhaseSelector({ currentPhase, onChange }: PhaseSelectorProps) {
  const phases: Phase[] = ['ideation', 'poc', 'pilot', 'production', 'optimization'];

  const icons = {
    ideation: Lightbulb,
    poc: FlaskConical,
    pilot: Plane,
    production: Factory,
    optimization: TrendingUp,
  };

  const colors = {
    ideation: 'bg-blue-500 text-white',
    poc: 'bg-green-500 text-white',
    pilot: 'bg-purple-500 text-white',
    production: 'bg-red-500 text-white',
    optimization: 'bg-orange-500 text-white',
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Project Phase</h3>
      <div className="flex flex-wrap gap-2">
        {phases.map((phase) => {
          const Icon = icons[phase];
          const phaseInfo = PHASE_INFO[phase];
          const isActive = currentPhase === phase;

          return (
            <button
              key={phase}
              onClick={() => onChange(phase)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all
                ${
                  isActive
                    ? colors[phase]
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
              title={phaseInfo.description}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm">{phaseInfo.name}</span>
            </button>
          );
        })}
      </div>
      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
        <p className="text-xs text-gray-600">
          <strong>{PHASE_INFO[currentPhase].name}:</strong>{' '}
          {PHASE_INFO[currentPhase].description}
        </p>
      </div>
    </div>
  );
}
