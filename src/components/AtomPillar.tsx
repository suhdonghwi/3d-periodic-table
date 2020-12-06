import { useRef } from "react";
import { Mesh } from "three";

import AtomInfo from "../types/AtomInfo";
import { Text } from "@react-three/drei";

interface AtomPillarProps {
  atom: AtomInfo;
  position: [number, number, number];
}

export default function AtomPillar({ atom, position }: AtomPillarProps) {
  const mesh = useRef<Mesh>();

  return (
    <group>
      <mesh position={position} ref={mesh}>
        <boxBufferGeometry args={[1, 5, 1]} />
        <meshStandardMaterial color={"orange"} />
      </mesh>
      <Text
        position={[position[0], position[1] + 2.5, position[2] + 0.1]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.5}
        depthOffset={-0.1}
      >
        {atom.shortName}
      </Text>

      <Text
        position={[position[0], position[1] + 2.5, position[2] - 0.3]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.2}
        depthOffset={-0.1}
      >
        {atom.number.toString()}
      </Text>
    </group>
  );
}
