import React from 'react';
import { Card } from './ui/Card';

type SimulationState = 'idle' | 'charging' | 'firing' | 'discharging';

interface CircuitDiagramProps {
  simulationState: SimulationState;
}

export const CircuitDiagram: React.FC<CircuitDiagramProps> = ({ simulationState }) => {
  return (
    <Card title="Rangkaian Pembangkit Tegangan Impuls">
      <div className="w-full flex items-center justify-center">
         <svg width="100%" height="100%" viewBox="0 0 400 180" xmlns="http://www.w3.org/2000/svg">
            <style>{`.label { font-family: sans-serif; font-size: 11px; fill: #9ca3af; } .small-label { font-family: sans-serif; font-size: 9px; fill: #9ca3af; }`}</style>
            
            {/* Base Paths */}
            <path d="M 20 140 L 380 140" stroke="#4b5563" strokeWidth="1" fill="none"/>
            
            {/* DC Source and Charging Resistors */}
            <rect x="10" y="70" width="30" height="30" stroke="#4b5563" strokeWidth="1" fill="none" />
            <text x="17" y="90" className="label">DC</text>
            <path d="M 40 77.5 L 60 77.5" stroke="#4b5563" strokeWidth="1"/>
            <rect x="60" y="72.5" width="30" height="10" stroke="#4b5563" strokeWidth="1" fill="none" />
            <text x="72" y="68" className="label">r</text>
            <path d="M 90 77.5 L 100 77.5" stroke="#4b5563" strokeWidth="1" />
            
            <path d="M 40 92.5 L 60 92.5" stroke="#4b5563" strokeWidth="1"/>
            <rect x="60" y="87.5" width="30" height="10" stroke="#4b5563" strokeWidth="1" fill="none" />
            <text x="72" y="112" className="label">r</text>
            <path d="M 90 92.5 L 100 92.5" stroke="#4b5563" strokeWidth="1" />
            
            {/* Capacitor - Corrected Position */}
            <path d="M 100 70 L 100 100" stroke="#4b5563" strokeWidth="2" />
            <path d="M 108 70 L 108 100" stroke="#4b5563" strokeWidth="2" />
            <text x="112" y="88" className="label">C</text>

            {/* Connection from Capacitor to Discharge Circuit */}
            <path d="M 108 77.5 L 120 77.5 L 120 20 L 140 20" stroke="#4b5563" strokeWidth="1"/>
            <path d="M 108 92.5 L 120 92.5 L 120 140" stroke="#4b5563" strokeWidth="1"/>

            {/* Discharge Circuit */}
            <path d="M 120 20 L 140 20" stroke="#4b5563" strokeWidth="1" />
            <circle cx="145" cy="20" r="3" fill="#4b5563"/>
            <circle cx="155"cy="20" r="3" fill="#4b5563"/>
            <text x="147" y="12" className="label">G</text>
            <path d="M 158 20 L 170 20" stroke="#4b5563" strokeWidth="1" />
            <rect x="170" y="15" width="40" height="10" stroke="#4b5563" strokeWidth="1" fill="none" />
            <text x="185" y="12" className="label">Rs</text>
            <path d="M 210 20 L 220 20" stroke="#4b5563" strokeWidth="1" />
            <path d="M 220 20 C 225 30, 230 10, 235 20 C 240 30, 245 10, 250 20" stroke="#4b5563" strokeWidth="1" fill="none"/>
            <text x="232" y="12" className="label">L</text>
            <path d="M 250 20 L 320 20" stroke="#4b5563" strokeWidth="1" />
            
            {/* Tail Resistor (Ro) */}
            <path d="M 270 20 L 270 50" stroke="#4b5563" strokeWidth="1" />
            <rect x="260" y="50" width="20" height="40" stroke="#4b5563" strokeWidth="1" fill="none" />
            <text x="245" y="75" className="label">Ro</text>
            <path d="M 270 90 L 270 140" stroke="#4b5563" strokeWidth="1" />
            
            {/* DUT */}
            <path d="M 300 20 L 300 40" stroke="#4b5563" strokeWidth="1" />
            <rect x="290" y="40" width="20" height="60" stroke="#4b5563" strokeWidth="1" fill="none"/>
            <text x="315" y="65" className="small-label">Benda</text>
            <text x="315" y="77" className="small-label">yang Diuji</text>
            <path d="M 300 100 L 300 140" stroke="#4b5563" strokeWidth="1" />

            {/* Junction Dots */}
            <circle cx="120" cy="140" r="2.5" fill="#64748b" />
            <circle cx="270" cy="20" r="2.5" fill="#64748b" />
            <circle cx="270" cy="140" r="2.5" fill="#64748b" />
            <circle cx="300" cy="20" r="2.5" fill="#64748b" />
            <circle cx="300" cy="140" r="2.5" fill="#64748b" />
            <circle cx="120" cy="20" r="2.5" fill="#64748b" />


            {/* Voltage Measurement */}
            <path d="M 330 20 L 340 20 M 330 140 L 340 140" stroke="#4b5563" strokeWidth="1"/>
            <path d="M 335 25 L 335 55" stroke="#4b5563" strokeWidth="1"/>
            <path d="M 335 115 L 335 135" stroke="#4b5563" strokeWidth="1"/>
            <path d="M 332 30 L 338 25 L 332 20" fill="none" stroke="#4b5563" strokeWidth="1"/>
            <path d="M 332 130 L 338 135 L 332 140" fill="none" stroke="#4b5563" strokeWidth="1"/>
            <text x="345" y="85" className="label">v</text>

            {/* Animated Paths */}
            <path id="charge-path-top" className={simulationState === 'charging' ? 'charge-path' : ''} d="M 40 77.5 L 100 77.5" stroke="#3b82f6" strokeWidth="2" fill="none" />
            <path id="charge-path-bottom" className={simulationState === 'charging' ? 'charge-path' : ''} d="M 40 92.5 L 100 92.5" stroke="#3b82f6" strokeWidth="2" fill="none" />

            <line id="spark-gap" className={simulationState === 'firing' ? 'spark' : ''} x1="145" y1="20" x2="155" y2="20" stroke="#60a5fa" strokeWidth="3" />
            
            <path id="discharge-path-main" className={simulationState === 'discharging' ? 'discharge-path' : ''} d="M 108 77.5 L 120 77.5 L 120 20 L 250 20" stroke="#eab308" strokeWidth="2.5" fill="none" />
            <path id="discharge-path-ro" className={simulationState === 'discharging' ? 'discharge-path' : ''} d="M 250 20 L 270 20 L 270 140" stroke="#eab308" strokeWidth="2.5" fill="none" />
            <path id="discharge-path-dut" className={simulationState === 'discharging' ? 'discharge-path' : ''} d="M 250 20 L 300 20 L 300 140" stroke="#eab308" strokeWidth="2.5" fill="none" />
            <path id="discharge-path-ground" className={simulationState === 'discharging' ? 'discharge-path' : ''} d="M 300 140 L 120 140 L 120 92.5 L 108 92.5" stroke="#eab308" strokeWidth="2.5" fill="none" />

         </svg>
      </div>
    </Card>
  );
};