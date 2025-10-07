import type { ReadinessLevel } from '@/types/canvas.types';

interface ReadinessIndicatorProps {
  level: ReadinessLevel;
  onChange?: (level: ReadinessLevel) => void;
  readonly?: boolean;
  label?: string;
}

export function ReadinessIndicator({
  level,
  onChange,
  readonly = false,
  label,
}: ReadinessIndicatorProps) {
  const levels: ReadinessLevel[] = ['red', 'yellow', 'green'];

  const colors = {
    red: 'bg-red-500 hover:bg-red-600',
    yellow: 'bg-yellow-500 hover:bg-yellow-600',
    green: 'bg-green-500 hover:bg-green-600',
  };

  const handleClick = (newLevel: ReadinessLevel) => {
    if (!readonly && onChange) {
      onChange(newLevel);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
      <div className="flex gap-1">
        {levels.map((lvl) => (
          <button
            key={lvl}
            onClick={() => handleClick(lvl)}
            disabled={readonly}
            className={`
              w-6 h-6 rounded-full transition-all
              ${level === lvl ? colors[lvl] : 'bg-gray-300'}
              ${!readonly ? 'cursor-pointer' : 'cursor-default'}
              ${!readonly && 'hover:scale-110'}
              disabled:cursor-not-allowed
            `}
            title={
              lvl === 'red'
                ? 'Not Ready (Red)'
                : lvl === 'yellow'
                ? 'In Progress (Yellow)'
                : 'Ready (Green)'
            }
            aria-label={`Set readiness to ${lvl}`}
          />
        ))}
      </div>
    </div>
  );
}
