type Block = "s" | "p" | "d" | "f";
type Phase = "Gas" | "Liquid" | "Solid";
type Structure =
  | "HEX"
  | "TET"
  | "DIA"
  | "CUB"
  | "MCL"
  | "FCC"
  | "BCC"
  | "ORC"
  | "RHL";

export interface AtomInfo {
  name: string;
  symbol: string;
  number: number;
  group?: number;
  period: number;
  abundanceCrust?: number;
  abundanceSea?: number;
  atomicRadius?: number;
  vdwRadius?: number;
  covalentRadius: number;
  atomicVolume?: number;
  atomicWeight: number;
  block: Block;
  boilingPoint?: number;
  meltingPoint?: number;
  discoveryYear?: number;
  electrons: number;
  electronegativity?: number;
  evaporationHeat?: number;
  fusionHeat?: number;
  ionEnergy?: number;
  structure?: Structure;
  massNumber: number;
  neutrons: number;
  protons: number;
  appearance?: string;
  category: string;
  density?: number;
  phase: Phase;
  summary: string;
  shells: number[];
}
