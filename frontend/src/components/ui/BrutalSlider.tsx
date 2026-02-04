import { cn } from '@/lib/utils';

interface BrutalSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  color: 'mauve' | 'orange' | 'yellow';
  budgetLabel: string;
}

const thumbColors = {
  mauve: '#B19CD9',
  orange: '#D96846',
  yellow: '#FFF4B5',
};

const bgColors = {
  mauve: 'bg-mauve/20',
  orange: 'bg-dark-orange/20',
  yellow: 'bg-pale-yellow',
};

const badgeColors = {
  mauve: 'bg-mauve',
  orange: 'bg-dark-orange text-white',
  yellow: 'bg-pale-yellow',
};

export function BrutalSlider({
  label,
  value,
  min,
  max,
  onChange,
  color,
  budgetLabel,
}: BrutalSliderProps) {
  return (
    <div className={cn('p-4 rounded-brutal border-3 border-deep-black', bgColors[color])}>
      <div className="flex items-center justify-between mb-3">
        <span className="font-bold text-sm uppercase tracking-wide">{label}</span>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium opacity-70">{budgetLabel}</span>
          <span
            className={cn(
              'inline-flex items-center justify-center w-10 h-10 rounded-full border-3 border-deep-black font-bold text-lg',
              badgeColors[color]
            )}
          >
            {value}
          </span>
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
        style={{
          // @ts-ignore
          '--thumb-color': thumbColors[color],
        }}
      />
      <style>{`
        input[type="range"]::-webkit-slider-thumb {
          background: ${thumbColors[color]};
        }
        input[type="range"]::-moz-range-thumb {
          background: ${thumbColors[color]};
        }
      `}</style>
    </div>
  );
}
