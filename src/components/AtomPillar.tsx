import { useRef, useEffect, useState } from "react";
import { useFrame } from "react-three-fiber";
import usePrevious from "../hooks/usePrevious";
import { Mesh, BoxBufferGeometry } from "three";
import { Text } from "@react-three/drei";
import { animated, useSpring } from "@react-spring/three";

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

  const meshProps = useSpring({ scale: [1, height, 1] as any });

  const textProps = useSpring({
    position: [position[0], position[1] + height, position[2]] as any,
  });

  useEffect(() => {
    geometry.current?.translate(0, 0.5, 0);

    // @ts-ignore
    //symbolText.current?.position.setY(height);
    // @ts-ignore
    //numberText.current?.position.setY(height);
  }, []);

  return (
    <group>
      <animated.mesh
        ref={mesh}
        position={[position[0], position[1], position[2]]}
        {...meshProps}
      >
        <boxBufferGeometry ref={geometry} args={[1, 1, 1]} />
        <meshStandardMaterial color={color} />
      </animated.mesh>
      <animated.group {...textProps}>
        <Text
          ref={symbolText}
          position={[0, 0, 0.1]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.5}
          depthOffset={-0.1}
        >
          {atom.symbol}
        </Text>

        <Text
          ref={numberText}
          position={[0, 0, -0.25]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.2}
          depthOffset={-0.1}
        >
          {atom.number.toString()}
        </Text>
      </animated.group>
    </group>
  );
}
