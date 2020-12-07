import React from "react";
import { Text, Circle, Ring } from "@react-three/drei";
import { CircleBufferGeometry } from "three";
import AtomInfo from "../types/AtomInfo";
import Electron from "./Electron";

interface AtomDisplayProps {
  atom: AtomInfo;
}

export default function AtomDisplay({ atom }: AtomDisplayProps) {
  const electrons = [];

  let key = 0;
  for (let i = 0; i < atom.shells.length; i++) {
    const coeff = 0.005 + Math.random() * 0.01;
    const radius = 0.1 + 0.05 * i;

    electrons.push(
      <Ring position={[0, 0, 0.1]} args={[radius - 0.005, radius + 0.005, 32]}>
        <meshStandardMaterial color="#ced4da" />
      </Ring>
    );


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
    <group>
      <Text
        fontSize={0.07}
        position={[0, 0, 0.1]}
        color="white"
        depthOffset={-1}
      >
        {atom.symbol}
      </Text>

      <mesh position={[0, 0, 0.1]}>
        <circleBufferGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#ff6b6b" />
      </mesh>

      {electrons}
    </group>
  );
}
