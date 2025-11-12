
import React from 'react';
import { Card } from './ui/Card';
import { Slider } from './ui/Slider';
import type { SimulatorParams, WaveformAnalysis } from '../types';

interface ParameterControlsProps {
  params: SimulatorParams;
  setParams: React.Dispatch<React.SetStateAction<SimulatorParams>>;
  analysis: WaveformAnalysis;
  onStartSimulation: () => void;
  isSimulating: boolean;
}

const ParameterResult: React.FC<{ label: string; value: string | number; unit: string }> = ({ label, value, unit }) => (
    <div className="flex justify-between items-center text-sm bg-slate-800/50 p-2 rounded-md">
        <span className="text-slate-400">{label}</span>
        <span className="font-semibold text-slate-100">{value} <span className="text-xs text-slate-400">{unit}</span></span>
    </div>
);

export const ParameterControls: React.FC<ParameterControlsProps> = ({ params, setParams, analysis, onStartSimulation, isSimulating }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setParams(prev => ({ ...prev, [name]: Number(value) }));
  };

  return (
    <>
      <button 
        onClick={onStartSimulation}
        disabled={isSimulating}
        className="w-full bg-gradient-to-r from-primary-600 to-primary-500 text-white font-bold py-3 rounded-lg hover:from-primary-700 hover:to-primary-600 transition-all duration-300 transform hover:scale-105 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed disabled:scale-100"
      >
        {isSimulating ? 'Simulasi Berjalan...' : 'Mulai Simulasi'}
      </button>
      <Card title="Parameter Rangkaian">
        <Slider
          label="Jumlah Tingkat (n)"
          name="n"
          value={params.n}
          min={1}
          max={20}
          step={1}
          unit=""
          onChange={handleChange}
        />
        <Slider
          label="Tegangan Pengisian"
          name="v_charge"
          value={params.v_charge}
          min={10}
          max={200}
          step={1}
          unit="kV"
          onChange={handleChange}
        />
        <Slider
          label="Kapasitor Generator"
          name="c_stage"
          value={params.c_stage}
          min={10}
          max={1000}
          step={10}
          unit="nF"
          powerOf={2}
          onChange={handleChange}
        />
        <Slider
          label="Kapasitor Beban"
          name="c_load"
          value={params.c_load}
          min={0.1}
          max={10}
          step={0.1}
          unit="nF"
          powerOf={2}
          onChange={handleChange}
        />
        <Slider
          label="Resistor Muka (Rs)"
          name="r_front"
          value={params.r_front}
          min={10}
          max={2000}
          step={10}
          unit="Ω"
          powerOf={2}
          onChange={handleChange}
        />
        <Slider
          label="Resistor Ekor (Ro)"
          name="r_tail"
          value={params.r_tail}
          min={500}
          max={10000}
          step={50}
          unit="Ω"
          powerOf={2}
          onChange={handleChange}
        />
      </Card>
      <Card title="Hasil Analisis Gelombang">
        <ParameterResult label="Tegangan Puncak (Vp)" value={analysis.vPeak} unit="kV" />
        <ParameterResult label="Waktu Muka (T1)" value={analysis.tFront} unit="µs" />
        <ParameterResult label="Waktu Ekor (T2)" value={analysis.tTail} unit="µs" />
        <ParameterResult label="Efisiensi (η)" value={analysis.efficiency} unit="%" />
      </Card>
    </>
  );
};