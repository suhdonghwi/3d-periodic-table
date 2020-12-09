import { useRef, useEffect, useState } from "react";
import { Mesh, BoxBufferGeometry } from "three";
import { Text } from "@react-three/drei";
import { animated, useSpring } from "@react-spring/three";

import AtomInfo from "../types/AtomInfo";

interface AtomPillarProps {
  atom: AtomInfo;
  position: [number, number, number];
  height: number;
  color: string;

  onClick: (atom: AtomInfo) => void;
}

export default function AtomPillar({
  atom,
  position,
  height,
  color,
  onClick,
}: AtomPillarProps) {
  const [hover, setHover] = useState(false);

  const mesh = useRef<Mesh>();
  const geometry = useRef<BoxBufferGeometry>();

  const symbolText = useRef<Text>();
  const numberText = useRef<Text>();

  const meshProps = useSpring({
    scale: [1, Math.max(height, 0.00001), 1] as any,
  });

  const textProps = useSpring({
    position: [position[0], position[1] + height, position[2]] as any,
  });
  const colorProps = useSpring({
    to: {
      color: color,
    },
    config: {
      tension: 150,
    },
  });

  useEffect(() => {
    geometry.current?.translate(0, 0.5, 0);
  }, []);

  return (
    <group>
      <animated.mesh
        ref={mesh}
        position={[position[0], position[1], position[2]]}
        onClick={(e) => {
          e.stopPropagation();
          onClick(atom);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHover(true);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHover(false);
        }}
        {...meshProps}
      >
        <boxBufferGeometry ref={geometry} args={[1, 1, 1]} />
        <animated.meshStandardMaterial
          color={hover ? "#ff8787" : colorProps.color}
        />
      </animated.mesh>
      <animated.group {...textProps}>
        <Text
          ref={symbolText}
          position={[0, 0, 0.05]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.5}
          depthOffset={-1}
        >
          {atom.symbol}
        </Text>

        <Text
          ref={numberText}
          position={[0, 0, -0.3]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.15}
          depthOffset={-1}
        >
          {atom.number.toString()}
        </Text>
      </animated.group>
    </group>
  );
}
