import { useRef } from "react";
import { Mesh } from "three";

import AtomInfo from "../types/AtomInfo";
import { Text } from "@react-three/drei";

interface AtomPillarProps {
  atom: AtomInfo;
  position: [number, number, number];
  height: number;
  color: string;
}

export default function AtomPillar({
  atom,
  position,
  height,
  color,
}: AtomPillarProps) {
  const mesh = useRef<Mesh>();

  return (
    <group>
      <mesh
        position={[position[0], position[1] + height / 2, position[2]]}
        ref={mesh}
      >
        <boxBufferGeometry args={[1, height, 1]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <Text
        position={[position[0], position[1] + height, position[2] + 0.1]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.5}
        depthOffset={-0.1}
      >
        {atom.symbol}
      </Text>

      <Text
        position={[position[0], position[1] + height, position[2] - 0.3]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.2}
        depthOffset={-0.1}
      >
        {atom.number.toString()}
      </Text>
    </group>
  );
}
