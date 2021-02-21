import React from "react";
import { Text, Ring } from "@react-three/drei";
import AtomInfo from "../types/AtomInfo";
import Electron from "./Electron";

interface AtomDisplayProps {
  atom: AtomInfo;
  position: [number, number, number];
}

export default function AtomDisplay({ atom, position }: AtomDisplayProps) {
  const electrons = [];

  let key = 0;

  let destRadius;
  if (atom.number <= 10) destRadius = 0.2;
  else if (atom.number <= 36) destRadius = 0.25;
  else if (atom.number <= 86) destRadius = 0.3;
  else destRadius = 0.35;

  const initialPadding = 0.05;
  const delta = (destRadius - initialPadding) / atom.shells.length;

  for (let i = 0; i < atom.shells.length; i++) {
    const coeff = 0.005 + Math.random() * 0.01;
    const radius = initialPadding + delta * (i + 1);

    electrons.push(
      <Ring
        key={key}
        position={[0, 0, 0.1]}
        args={[radius - 0.005, radius + 0.005, 32]}
      >
        <meshLambertMaterial color="#ced4da" />
      </Ring>
    );

    key++;

    for (let j = 0; j < atom.shells[i]; j++) {
      electrons.push(
        <Electron
          key={key}
          radius={radius}
          initialAngle={((2 * Math.PI) / atom.shells[i]) * j}
          coefficient={coeff}
        />
      );

      key++;
    }
  }

  return (
    <group position={position}>
      <Text
        fontSize={0.07}
        position={[0, 0, 0.1]}
        color="#212529"
        depthOffset={-1}
      >
        {atom.symbol}
      </Text>

      {electrons}
    </group>
  );
}
