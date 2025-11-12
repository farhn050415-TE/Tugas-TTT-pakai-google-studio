import React from 'react';

interface SliderProps {
  label: string;
  name: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  powerOf?: number; // For logarithmic-like scale
}

export const Slider: React.FC<SliderProps> = ({ label, name, value, min, max, step, unit, onChange, powerOf = 1 }) => {

  const toSliderValue = (val: number) => {
    if (powerOf !== 1) {
      return Math.pow(val, 1 / powerOf);
    }
    return val;
  };

  const fromSliderValue = (val: number) => {
    if (powerOf !== 1) {
      return Math.pow(val, powerOf);
    }
    return val;
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sliderVal = parseFloat(e.target.value);
    const actualVal = fromSliderValue(sliderVal);
    
    // Create a new synthetic event to pass up
    const newEvent = {
        ...e,
        target: { ...e.target, value: actualVal.toString() }
    } as React.ChangeEvent<HTMLInputElement>;

    onChange(newEvent);
  };
  
  const displayValue = value >= 1000 ? (value / 1000).toFixed(1) + 'k' : value.toFixed(0);
  const displayUnit = value >= 1000 ? unit.replace('k', '') : unit;

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex justify-between items-center text-sm">
        <label className="font-medium text-slate-300">{label}</label>
        <span className="font-mono text-primary-400 bg-dark-bg px-2 py-1 rounded">
          {displayValue} {displayUnit}
        </span>
      </div>
      <input
        type="range"
        name={name}
        min={toSliderValue(min)}
        max={toSliderValue(max)}
        step={step}
        value={toSliderValue(value)}
        onChange={handleSliderChange}
        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer
                   [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-primary-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:transition-all
                   [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-primary-500 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0
                   "
      />
    </div>
  );
};