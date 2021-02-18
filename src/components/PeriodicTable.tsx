import React, { useState } from "react";
import { GroupProps } from "react-three-fiber";
import { useControl } from "react-three-gui";
import BaseBoard from "./BaseBoard";

import AtomPillar from "./AtomPillar";
import AtomInfo from "../types/AtomInfo";
import atomData from "../atomData";

function hslToHex(h: number, s: number, l: number) {
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

const styles: {
  name: string;
  toColor: (a: AtomInfo, maxHeight: number, height?: number) => string;
}[] = [
  {
    name: "By height",
    toColor: (_, maxHeight, height) =>
      height !== undefined
        ? hslToHex(120 + (height / maxHeight) * 120, 89, 63)
        : "#868e96",
  },
];

interface PeriodicTableProps {
  placement: number[][];
  onClickPillar: (v: AtomInfo) => void;

  realMaxHeight: number;
  propGetter: (v: AtomInfo) => number | undefined;
}

export default function PeriodicTable({
  placement,
  onClickPillar,
  realMaxHeight,
  propGetter,
  ...props
}: PeriodicTableProps & GroupProps) {
  const style: string = useControl("Style", {
    type: "select",
    items: styles.map((s) => s.name),
    value: styles[0].name,
  });

  const isLogScale = useControl("Log scale", {
    type: "boolean",
    value: false,
  });

  let heightData: (number | undefined)[] = atomData.map(propGetter);

  if (isLogScale)
    heightData = heightData.map((v) =>
      v === undefined ? undefined : Math.log10(Math.max(v, 0.00001) + 1)
    );

  const pillars = [];
  const maxHeight = Math.max(...heightData.map((v) => v || 0));

  for (let i = 0; i < placement.length; i++) {
    for (let j = 0; j < placement[i].length; j++) {
      const number = placement[i][j];
      if (number !== 0) {
        const atom = atomData[number - 1];
        let height = heightData[number - 1];

        const realHeight = Math.max(
          height !== undefined ? (height / maxHeight) * realMaxHeight : 0,
          0.01
        );

        const color = styles
          .find((s) => s.name === style)!
          .toColor(atom, maxHeight, height);

        pillars.push(
          <AtomPillar
            key={number}
            atom={atom}
            position={[j - 8.5, 0.5, i - 5.7]}
            height={realHeight}
            color={color}
            onClick={() => onClickPillar(atom)}
          />
        );
      }
    }
  }

  return (
    <group {...props}>
      <BaseBoard>
        <group>{pillars}</group>
      </BaseBoard>
    </group>
  );
}
