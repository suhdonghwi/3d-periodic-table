import React from "react";
import { useControl } from "react-three-gui";

import AtomPillar from "./AtomPillar";
import AtomInfo from "../types/AtomInfo";

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
    items: [
      "Group",
      "Period",
      "Atomic mass",
      "Electronegativity",
      "First ionization energy",
      "Melting point",
      "Boiling point",
      "Molar heat capacity",
    ],
    value: "Electronegativity",
  });

  let heightData: (number | null)[];
  switch (property) {
    case "Group":
      heightData = atomData.map((a) => a.group);
      break;
    case "Period":
      heightData = atomData.map((a) => a.period);
      break;
    case "Atomic mass":
      heightData = atomData.map((a) => a.atomicMass);
      break;
    case "Electronegativity":
      heightData = atomData.map((a) => a.electronegativityPauling);
      break;
    case "First ionization energy":
      heightData = atomData.map((a) => a.ionizationEnergies[0] || null);
      break;
    case "Melting point":
      heightData = atomData.map((a) => a.melt);
      break;
    case "Boiling point":
      heightData = atomData.map((a) => a.boil);
      break;
    case "Molar heat capacity":
      heightData = atomData.map((a) => a.molarHeat);
      break;
    default:
      heightData = [];
  }

  const pillars = [];
  const maxHeight = Math.max(...heightData.map((v) => v || 0));

  for (let i = 0; i < placement.length; i++) {
    for (let j = 0; j < placement[i].length; j++) {
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
          />
        );
      }
    }
  }

  return <group>{pillars}</group>;
}
