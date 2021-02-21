import AtomInfo, { Block } from "../../types/AtomInfo";
import Style from "./Style";

export type Config = {
  fromColor: HSL;
  toColor: HSL;
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

const categoryColorMap: Record<string, string> = {
  "diatomic nonmetal": "#7950f2",
  "polyatomic nonmetal": "#7950f2",
  "alkali metal": "#fa5252",
  "alkaline earth metal": "#fd7e14",
  lanthanide: "#f783ac",
  actinide: "#e64980",
  "transition metal": "#fab005",
  "post-transition metal": "#40c057",
  metalloid: "#228be6",
  "noble gas": "#be4bdb",
};

const blockColorMap: Record<Block, string> = {
  s: "#ff922b",
  d: "#f06595",
  p: "#5c7cfa",
  f: "#20c997",
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
    styler: () => (atom) => ({ color: categoryColorMap[atom.category] }),
  },
  {
    name: "Color by block",
    styler: () => (atom) => ({ color: blockColorMap[atom.block] }),
  },
  {
    name: "Realistic",
    styler: () => (atom) => atom.style ?? { color: "white" },
  },
];

export default stylers;
