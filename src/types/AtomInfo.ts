export default interface AtomInfo {
  name: string;
  atomicMass: number;
  boil: number | null;
  category: string;
  color: string | null;
  density: number | null;
  discoveredBy: string | null;
  melt: number | null;
  number: number;
  period: number;
  phase: string;
  summary: string;
  symbol: string;
  electronAffinity: number | null;
  electronegativityPauling: number | null;
  ionizationEnergies: number[];
}
