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

const properties: {
  name: string;
  property: (a: AtomInfo) => number | undefined;
}[] = [
  { name: "Abundance in Earth crust", property: (v) => v.abundanceCrust },
  { name: "Abundance in Sea", property: (v) => v.abundanceSea },
  { name: "Atomic Radius", property: (v) => v.atomicRadius },
  { name: "Van der waals Radius", property: (v) => v.vdwRadius },
  { name: "Covalent Radius", property: (v) => v.covalentRadius },
  { name: "Atomic Volume", property: (v) => v.atomicVolume },
  { name: "Atomic Weight", property: (v) => v.atomicWeight },
  { name: "Boiling Point", property: (v) => v.boilingPoint },
  { name: "Melting Point", property: (v) => v.meltingPoint },
  { name: "Electrons Count", property: (v) => v.electrons },
  {
    name: "Outermost Electrons Count",
    property: (v) => v.shells[v.shells.length - 1],
  },
  { name: "Protons Count", property: (v) => v.protons },
  { name: "Neutrons Count", property: (v) => v.neutrons },
  { name: "Electronegativity (Pauling)", property: (v) => v.electronegativity },
  { name: "Evaporation Heat", property: (v) => v.evaporationHeat },
  { name: "Fusion Heat", property: (v) => v.fusionHeat },
  { name: "First ionization energy", property: (v) => v.ionEnergy },
  { name: "Mass Number", property: (v) => v.massNumber },
  { name: "Density", property: (v) => v.density },
  { name: "Group", property: (v) => v.group },
  { name: "Period", property: (v) => v.period },
];

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
}

export default function PeriodicTable({
  placement,
  onClickPillar,
  realMaxHeight,
  ...props
}: PeriodicTableProps & GroupProps) {
  const property: string = useControl("Property", {
    type: "select",
    items: properties.map((p) => p.name),
    value: properties[13].name,
  });

  const style: string = useControl("Style", {
    type: "select",
    items: styles.map((s) => s.name),
    value: styles[0].name,
  });

  const isLogScale = useControl("Log scale", {
    type: "boolean",
    value: false,
  });

  let heightData: (number | undefined)[] = atomData.map(
    properties.find((v) => v.name === property)!.property
  );

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
