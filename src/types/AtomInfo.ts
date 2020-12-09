export default interface AtomInfo {
  name: string;
  appearance: string | null;
  atomicMass: number;
  boil: number | null;
  category: string;
  color: string | null;
  density: number | null;
  discoveredBy: string | null;
  melt: number | null;
  molarHeat: number | null;
  number: number;
  period: number;
  phase: string;
  source: string;
  summary: string;
  symbol: string;
  group: number;
  shells: number[];
  electronAffinity: number | null;
  electronegativityPauling: number | null;
  ionizationEnergies: number[];
  earthAbundance: number | null;
}
