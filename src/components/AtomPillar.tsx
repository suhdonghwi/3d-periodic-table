import { useRef, useEffect } from "react";
import { Mesh, BoxBufferGeometry } from "three";
import { Text } from "@react-three/drei";

import AtomInfo from "../types/AtomInfo";

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
  const geometry = useRef<BoxBufferGeometry>();

  const symbolText = useRef<Text>();
  const numberText = useRef<Text>();

  useEffect(() => {
    mesh.current?.position.setY(height / 2);

    // @ts-ignore
    symbolText.current?.position.setY(height);
    // @ts-ignore
    numberText.current?.position.setY(height);
  }, [height]);

  return (
    <group>
      <mesh position={[position[0], position[1], position[2]]} ref={mesh}>
        <boxBufferGeometry ref={geometry} args={[1, height, 1]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <Text
        ref={symbolText}
        position={[position[0], position[1], position[2] + 0.1]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.5}
        depthOffset={-0.1}
      >
        {atom.symbol}
      </Text>

      <Text
        ref={numberText}
        position={[position[0], position[1], position[2] - 0.3]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.2}
        depthOffset={-0.1}
      >
        {atom.number.toString()}
      </Text>
    </group>
  );
}
