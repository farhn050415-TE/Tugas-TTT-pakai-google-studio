import React, { useState, useEffect, useRef } from 'react';
import { ParameterControls } from './components/ParameterControls';
import { WaveformChart } from './components/WaveformChart';
import { CircuitDiagram } from './components/CircuitDiagram';
import { Explanation } from './components/Explanation';
import { useImpulseWaveform } from './hooks/useImpulseWaveform';
import type { SimulatorParams, WaveformPoint } from './types';

type SimulationState = 'idle' | 'charging' | 'firing' | 'discharging';

const App: React.FC = () => {
  const [params, setParams] = useState<SimulatorParams>({
    n: 4,
    v_charge: 50, // kV
    c_stage: 200, // nF
    c_load: 2, // nF
    r_front: 400, // Ohms
    r_tail: 4000, // Ohms
  });
  
  const [simulationState, setSimulationState] = useState<SimulationState>('idle');
  const [displayedWaveform, setDisplayedWaveform] = useState<WaveformPoint[]>([]);

  const waveformAnalysis = useImpulseWaveform(params);
  const animationIntervalRef = useRef<number | null>(null);
  const timeoutRefs = useRef<number[]>([]);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (animationIntervalRef.current) clearInterval(animationIntervalRef.current);
      timeoutRefs.current.forEach(clearTimeout);
    };
  }, []);

  useEffect(() => {
    if (simulationState === 'discharging') {
      const allPoints = waveformAnalysis.waveformData;
      const totalPoints = allPoints.length;
      if (totalPoints === 0) {
        setSimulationState('idle');
        return;
      }

      let pointIndex = 0;
      setDisplayedWaveform([]);

      const animationDuration = 2000; // 2 seconds
      const intervalTime = animationDuration / totalPoints;

      animationIntervalRef.current = window.setInterval(() => {
        if (pointIndex < totalPoints) {
          setDisplayedWaveform(prev => [...prev, allPoints[pointIndex]]);
          pointIndex++;
        } else {
          if (animationIntervalRef.current) clearInterval(animationIntervalRef.current);
          const timeout = setTimeout(() => setSimulationState('idle'), 1000);
          timeoutRefs.current.push(timeout);
        }
      }, intervalTime);
    }
  }, [simulationState, waveformAnalysis.waveformData]);

  const handleStartSimulation = () => {
    if (simulationState !== 'idle') return;

    setDisplayedWaveform([]);
    setSimulationState('charging');
    
    const t1 = setTimeout(() => setSimulationState('firing'), 2000);
    const t2 = setTimeout(() => setSimulationState('discharging'), 2400); // 2000ms charge + 400ms fire
    timeoutRefs.current = [t1, t2];
  };

  return (
    <div className="min-h-screen bg-dark-bg text-slate-300 font-sans">
      <div className="flex flex-col md:flex-row">
        <aside className="w-full md:w-96 bg-dark-card/80 backdrop-blur-sm border-r border-dark-border p-4 sm:p-6 flex-shrink-0 min-h-screen">
          <header className="mb-6">
            <h1 className="text-2xl font-bold text-primary-400 text-glow">
              Simulasi Impuls
            </h1>
            <p className="text-sm text-slate-400">Pembangkit Tegangan Tinggi</p>
          </header>
          <div className="flex flex-col gap-6">
            <ParameterControls 
              params={params} 
              setParams={setParams} 
              analysis={waveformAnalysis}
              onStartSimulation={handleStartSimulation}
              isSimulating={simulationState !== 'idle'}
            />
          </div>
        </aside>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 grid grid-cols-1 gap-6">
          <WaveformChart data={displayedWaveform.length > 0 ? displayedWaveform : waveformAnalysis.waveformData} isSimulating={simulationState !== 'idle'} />
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <CircuitDiagram simulationState={simulationState} />
              <Explanation />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;