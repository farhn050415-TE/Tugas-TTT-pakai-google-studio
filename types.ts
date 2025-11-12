
export interface SimulatorParams {
  n: number; // Number of stages
  v_charge: number; // Charging voltage per stage in kV
  c_stage: number; // Stage capacitance in nF
  c_load: number; // Load capacitance in nF
  r_front: number; // Front resistor in Ohms
  r_tail: number; // Tail resistor in Ohms
}

export interface WaveformPoint {
  time: number; // in microseconds (µs)
  voltage: number; // in kilovolts (kV)
}

export interface WaveformAnalysis {
  waveformData: WaveformPoint[];
  vPeak: number; // in kV
  tFront: number; // in µs
  tTail: number; // in µs
  efficiency: number; // percentage
}