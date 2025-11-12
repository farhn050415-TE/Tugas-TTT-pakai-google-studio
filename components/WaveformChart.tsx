
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import type { WaveformPoint } from '../types';

interface WaveformChartProps {
  data: WaveformPoint[];
  isSimulating: boolean;
}

export const WaveformChart: React.FC<WaveformChartProps> = ({ data, isSimulating }) => {
  const vPeak = data.length > 0 ? Math.max(...data.map(p => p.voltage)) : 0;
  
  return (
    <div className="bg-dark-card border border-dark-border rounded-lg shadow-md p-4 h-96 w-full relative">
      {isSimulating && data.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-dark-card/50 z-10">
              <p className="text-slate-400">Menjalankan simulasi...</p>
          </div>
      )}
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5, right: 30, left: 10, bottom: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.1)" />
            <XAxis 
              dataKey="time" 
              type="number" 
              domain={['dataMin', 'dataMax']} 
              label={{ value: 'Waktu (µs)', position: 'insideBottom', offset: -10, fill: '#94a3b8' }}
              stroke="#64748b"
              className="text-xs"
              tickFormatter={(tick) => (tick as number).toFixed(1)}
            />
            <YAxis 
              label={{ value: 'Tegangan (kV)', angle: -90, position: 'insideLeft', offset: 0, fill: '#94a3b8' }}
              stroke="#64748b"
              className="text-xs"
            />
            <Tooltip
              contentStyle={{
                  backgroundColor: 'rgba(13, 17, 23, 0.9)',
                  borderColor: '#30363d',
                  color: '#e2e8f0',
                  borderRadius: '0.5rem'
              }}
              labelFormatter={(label) => `Waktu: ${(label as number).toFixed(2)} µs`}
              formatter={(value: number, name) => [`${value.toFixed(2)} kV`, 'Tegangan']}
            />
            <Legend verticalAlign="top" height={36} />
            <Line isAnimationActive={false} type="monotone" dataKey="voltage" name="Tegangan Impuls" stroke="#3b82f6" strokeWidth={2} dot={false} />
            
            {!isSimulating && (
              <>
                <ReferenceLine y={vPeak} label={{ value: `Vp: ${vPeak.toFixed(1)} kV`, position: 'insideTopRight', fill: '#60a5fa' }} stroke="#60a5fa" strokeDasharray="3 3" />
                <ReferenceLine y={vPeak * 0.5} stroke="#eab308" strokeDasharray="3 3" />
              </>
            )}
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-slate-500">Sesuaikan parameter dan mulai simulasi untuk melihat hasilnya.</p>
        </div>
      )}
    </div>
  );
};