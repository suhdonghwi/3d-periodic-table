import { useRef, useEffect } from "react";
import { MeshProps } from "react-three-fiber";
import { animated, useSpring } from "@react-spring/three";
import { BoxBufferGeometry, CubeTexture } from "three";
import Style from "./Control/Style";

interface RawPillarProps {
  style: Style;
  length: number;
  envMap?: CubeTexture;
  hover?: boolean;
}

export default function RawPillar({
  style,
  length,
  envMap,
  hover,
  ...props
}: RawPillarProps & MeshProps) {
  const geometry = useRef<BoxBufferGeometry>();

  useEffect(() => {
    geometry.current?.translate(0, 0.5, 0);
  }, []);

  const pillarSpring = useSpring({
    color: style.color,
    opacity: style.opacity ?? 1,
    config: {
      tension: 150,
    },
  });

  return (
    <animated.mesh {...props}>
      <boxBufferGeometry ref={geometry} args={[length, 1, length]} />
      <animated.meshStandardMaterial
        color={hover ? "#ff8787" : pillarSpring.color}
        transparent
        opacity={pillarSpring.opacity}
        metalness={style.metalness ?? 0}
        roughness={style.roughness ?? 1}
        envMap={envMap}
      />
      {props.children}
    </animated.mesh>
  );
}
