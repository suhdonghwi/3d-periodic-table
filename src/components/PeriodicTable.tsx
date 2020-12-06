import React from "react";

import AtomPillar from "./AtomPillar";
import atomData from "../atomData";

interface PeriodicTableProps {
  placement: number[][];
  position: [number, number, number];
}

export default function PeriodicTable({
  placement,
  position,
}: PeriodicTableProps) {
  const pillars = [];

  for (let i = 0; i < placement.length; i++) {
    for (let j = 0; j < placement[i].length; j++) {
      const number = placement[i][j];
      if (number !== 0) {
        pillars.push(
          <AtomPillar
            key={number}
            atom={atomData[number - 1]}
            position={[position[0] + j, position[1], position[2] + i]}
          />
        );
      }
    }
  }

  return <group>{pillars}</group>;
}
