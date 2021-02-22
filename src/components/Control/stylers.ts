import AtomInfo, { Block, Phase } from "../../types/AtomInfo";
import Style from "./Style";

export type Config = {
  fromColor: HSL;
  toColor: HSL;
  temperature: number;
};

export type Styler = (
  atom: AtomInfo,
  height: number,
  maxHeight: number
) => Style;

type HSL = { h: number; s: number; l: number };

function interp(from: number, to: number, point: number) {
  return from + (to - from) * point;
}

function interpolateColor(from: HSL, to: HSL, point: number): HSL {
  return {
    h: interp(from.h, to.h, point),
    s: interp(from.s, to.s, point),
    l: interp(from.l, to.l, point),
  };
}

export function hslToHex({ h, s, l }: HSL): string {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

export const categoryColorMap: Record<string, Style> = {
  "diatomic nonmetal": { color: "#7950f2" },
  "polyatomic nonmetal": { color: "#7950f2" },
  "alkali metal": { color: "#fa5252" },
  "alkaline earth metal": { color: "#fd7e14" },
  lanthanide: { color: "#f783ac" },
  actinide: { color: "#e64980" },
  "transition metal": { color: "#fab005" },
  "post-transition metal": { color: "#40c057" },
  metalloid: { color: "#228be6" },
  "noble gas": { color: "#be4bdb" },
};

export const blockColorMap: Record<Block, Style> = {
  s: { color: "#ff922b" },
  d: { color: "#f06595" },
  p: { color: "#5c7cfa" },
  f: { color: "#20c997" },
};

export const phaseColorMap: Record<Phase | "unknown", Style> = {
  unknown: { color: "#ffa8a8" },
  solid: { color: "#20c997" },
  liquid: { color: "#4dabf7", opacity: 0.7 },
  gas: { color: "#ced4da", opacity: 0.3 },
};

type Prop = { name: string; styler: (config: Config) => Styler };

const stylers: Prop[] = [
  {
    name: "Color by height",
    styler: ({ fromColor, toColor }) => (_, height, maxHeight) => ({
      color: hslToHex(interpolateColor(fromColor, toColor, height / maxHeight)),
    }),
  },
  {
    name: "Color by category",
    styler: () => (atom) => categoryColorMap[atom.category],
  },
  {
    name: "Color by block",
    styler: () => (atom) => blockColorMap[atom.block],
  },
  {
    name: "Phase",
    styler: ({ temperature }) => (atom) => {
      if (atom.meltingPoint === undefined || atom.boilingPoint === undefined)
        return phaseColorMap["unknown"];
      else if (temperature < atom.meltingPoint) return phaseColorMap["solid"];
      else if (temperature < atom.boilingPoint) return phaseColorMap["liquid"];
      else return phaseColorMap["gas"];
    },
  },
  {
    name: "Realistic",
    styler: () => (atom, height) =>
      height === undefined || atom.style === undefined
        ? { color: "#ffa8a8" }
        : atom.style,
  },
];

export default stylers;
