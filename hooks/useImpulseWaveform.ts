
import { useMemo } from 'react';
import type { SimulatorParams, WaveformAnalysis, WaveformPoint } from '../types';

// Constants for calculation
const TIME_RESOLUTION = 500; // Number of points to calculate for the waveform

export const useImpulseWaveform = (params: SimulatorParams): WaveformAnalysis => {
  return useMemo(() => {
    // Convert inputs to base SI units for calculation
    const n = params.n;
    const V_charge = params.v_charge * 1e3; // V
    const C_stage = params.c_stage * 1e-9; // F
    const C_load = params.c_load * 1e-9; // F
    const R_front = params.r_front; // Ω
    const R_tail = params.r_tail; // Ω

    const C_gen = C_stage / n; // Equivalent generator capacitance
    const V_total_ideal = V_charge * n;

    // Coefficients for the characteristic equation: s^2 + as + b = 0
    const a = 1 / (R_front * C_load) + 1 / (R_front * C_gen) + 1 / (R_tail * C_gen);
    const b = 1 / (R_front * R_tail * C_gen * C_load);

    const discriminant = a * a - 4 * b;

    if (discriminant < 0) {
      // Damped oscillation case - not a standard impulse
      return { waveformData: [], vPeak: 0, tFront: 0, tTail: 0, efficiency: 0 };
    }

    // Roots of the characteristic equation
    const alpha = (a + Math.sqrt(discriminant)) / 2;
    const beta = (a - Math.sqrt(discriminant)) / 2;

    if (alpha <= 0 || beta <= 0 || alpha === beta) {
      return { waveformData: [], vPeak: 0, tFront: 0, tTail: 0, efficiency: 0 };
    }

    const V0_factor = V_total_ideal / (R_front * C_load * (alpha - beta));

    const V = (t: number) => V0_factor * (Math.exp(-beta * t) - Math.exp(-alpha * t));
    
    // Find peak voltage and time to peak
    const t_peak = Math.log(alpha / beta) / (alpha - beta);
    const v_peak_volts = V(t_peak);

    // Estimate waveform duration for plotting (approx 5 times tail time constant)
    const estimated_t_tail_const = R_tail * (C_gen + C_load);
    const t_max = Math.max(t_peak * 5, estimated_t_tail_const * 1.5, 50e-6);
    const dt = t_max / TIME_RESOLUTION;

    const waveformData: WaveformPoint[] = [];
    for (let i = 0; i <= TIME_RESOLUTION; i++) {
      const t = i * dt;
      waveformData.push({
        time: t * 1e6, // convert to µs for display
        voltage: V(t) * 1e-3, // convert to kV for display
      });
    }
    
    const vPeak = v_peak_volts * 1e-3;

    // Calculate T1 (Front Time) and T2 (Tail Time)
    let t_30 = 0, t_90 = 0, t_50_tail = 0;
    let found_30 = false, found_90 = false, found_peak = false;

    for(const point of waveformData){
        if(!found_peak) {
            if (point.voltage >= 0.3 * vPeak && !found_30) {
                t_30 = point.time;
                found_30 = true;
            }
            if (point.voltage >= 0.9 * vPeak && !found_90) {
                t_90 = point.time;
                found_90 = true;
            }
            if (point.voltage >= vPeak * 0.999) {
                found_peak = true;
            }
        } else {
             if (point.voltage <= 0.5 * vPeak) {
                t_50_tail = point.time;
                break;
            }
        }
    }

    // Standard IEC 60060-1 definition for lightning impulse front time
    const tFront = (t_90 > t_30) ? 1.67 * (t_90 - t_30) : 0;
    const tTail = t_50_tail;
    
    const efficiency = (v_peak_volts / V_total_ideal) * 100;

    return {
      waveformData,
      vPeak: parseFloat(vPeak.toFixed(2)),
      tFront: parseFloat(tFront.toFixed(2)),
      tTail: parseFloat(tTail.toFixed(2)),
      efficiency: parseFloat(efficiency.toFixed(2)),
    };
  }, [params]);
};