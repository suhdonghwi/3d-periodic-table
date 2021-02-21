import { useRef, useEffect, useState } from "react";
import { Mesh, BoxBufferGeometry, CubeTexture } from "three";
import { Text } from "@react-three/drei";
import { animated, useSpring } from "@react-spring/three";

import AtomInfo from "../types/AtomInfo";
import { MeshProps } from "react-three-fiber";
import Style from "./Control/Style";

interface AtomPillarProps {
  atom: AtomInfo;
  height: number;
  style: Style;

  onClick: (atom: AtomInfo) => void;
  envMap: CubeTexture;
}

export default function AtomPillar({
  atom,
  height,
  style,
  onClick,
  envMap,
  ...props
}: AtomPillarProps & MeshProps) {
  const [hover, setHover] = useState(false);

  const mesh = useRef<Mesh>();
  const geometry = useRef<BoxBufferGeometry>();

  const symbolText = useRef<Text>();
  const numberText = useRef<Text>();

  const meshProps = useSpring({
    scale: [1, Math.max(height, 0.00001), 1] as any,
  });

  const colorProps = useSpring({
    to: {
      color: style.color,
    },
    config: {
      tension: 150,
    },
  });

  useEffect(() => {
    geometry.current?.translate(0, 0.5, 0);
  }, []);

  return (
    <animated.mesh
      ref={mesh}
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
      {...props}
    >
      <boxBufferGeometry ref={geometry} args={[1, 1, 1]} />
      <animated.meshStandardMaterial
        color={hover ? "#ff8787" : colorProps.color}
        transparent
        opacity={style.opacity}
        metalness={style.metalness}
        roughness={style.roughness}
        envMap={envMap}
      />

      <animated.group position={[0, 1, 0]}>
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
    </animated.mesh>
  );
}
