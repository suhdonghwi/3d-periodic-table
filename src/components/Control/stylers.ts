import AtomInfo from "../../types/AtomInfo";

export type Config = {
  fromColor: HSL;
  toColor: HSL;
};

export type Styler = (
  atom: AtomInfo,
  height: number,
  maxHeight: number
) => string;

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

type Prop = { name: string; styler: (config: Config) => Styler };

const stylers: Prop[] = [
  {
    name: "By height",
    styler: ({ fromColor, toColor }) => (_, height, maxHeight) =>
      hslToHex(interpolateColor(fromColor, toColor, height / maxHeight)),
  },
];

export default stylers;
