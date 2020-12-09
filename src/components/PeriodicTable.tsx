import React, { useState } from "react";
import { useControl } from "react-three-gui";

import AtomPillar from "./AtomPillar";
import AtomInfo from "../types/AtomInfo";
import AtomInfoBoard from "./AtomInfoBoard";
import { properties } from "../atomData";
interface PeriodicTableProps {
  placement: number[][];
  position: [number, number, number];
  atomData: AtomInfo[];
}

export default function PeriodicTable({
  placement,
  position,
  atomData,
}: PeriodicTableProps) {
  const property: string = useControl("Property", {
    type: "select",
    items: properties.map(p => p.name),
    value: "Electronegativity (Pauling)",
  });

  let heightData: (number | null)[] = properties.find((v) => v.name === property)!.value;

  const [showingAtom, setShowingAtom] = useState<AtomInfo | null>(null);
  function onClickPillar(atom: AtomInfo) {
    setShowingAtom(atom);
  }

  const pillars = [];
  const maxHeight = Math.max(...heightData.map((v) => v || 0));

  for (let i = 0; i < placement.length; i++) { for (let j = 0; j < placement[i].length; j++) {
      const number = placement[i][j];
      if (number !== 0) {
        const height = heightData[number - 1];
        const realHeight = height !== null ? (height / maxHeight) * 4 : 0.01;
        const color =
          height !== null
            ? "hsl(" +
              (120 + (height / maxHeight) * 120).toFixed() +
              ", 89%, 63%)"
            : "#7a7a7a";

        pillars.push(
          <AtomPillar
            key={number}
            atom={atomData[number - 1]}
            position={[position[0] + j, position[1], position[2] + i]}
            height={realHeight}
            color={color}
            onClick={onClickPillar}
          />
        );
      }
    }
  }

  return (
    <group>
      {pillars}
      <AtomInfoBoard atom={showingAtom} onClose={() => setShowingAtom(null)} />
    </group>
  );
}
