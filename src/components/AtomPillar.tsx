import { JSX, useState } from "react";
import { CubeTexture } from "three";
import { Text } from "@react-three/drei";
import { animated, useSpring } from "@react-spring/three";

import RawPillar from "./RawPillar";
import AtomInfo from "../types/AtomInfo";
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
}: AtomPillarProps & JSX.IntrinsicElements["group"]) {
  const [hover, setHover] = useState(false);

  const safeHeight = Math.max(height, 0.00001);
  const meshProps = useSpring<{
    scale: [number, number, number];
    position: [number, number, number];
    textPosition: [number, number, number];
  }>({
    scale: [1, safeHeight, 1],
    position: [0, safeHeight / 2, 0],
    textPosition: [0, safeHeight + 0.02, 0],
  });

  return (
    <group
      {...props}
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
    >
      <RawPillar
        hover={hover}
        style={style}
        envMap={envMap}
        length={1}
        scale={meshProps.scale}
        position={meshProps.position}
      />
      <animated.group position={meshProps.textPosition}>
        <Text
          position={[0, 0, 0.05]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.5}
          depthOffset={-1}
        >
          {atom.symbol}
        </Text>

        <Text
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
