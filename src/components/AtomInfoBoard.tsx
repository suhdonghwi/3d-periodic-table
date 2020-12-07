import React, { useRef } from "react";
import { useFrame } from "react-three-fiber";
import { Vector3 } from "three";
import { Mesh, BoxBufferGeometry } from "three";
import { animated, useSpring } from "@react-spring/three";
import AtomInfo from "../types/AtomInfo";

import AtomDisplay from "./AtomDisplay";

interface AtomInfoBoardProps {
  visible: boolean;
  atom: AtomInfo;
}

export default function AtomInfoBoard({ visible, atom }: AtomInfoBoardProps) {
  const mesh = useRef<Mesh>();
  const geometry = useRef<BoxBufferGeometry>();

  const opacityProps = useSpring({ opacity: visible ? 1 : 0 });

  useFrame(({ camera }) => {
    const vec = new Vector3(0, 0, -3);
    const pos = camera.localToWorld(vec);

    mesh.current?.position.copy(pos);
    mesh.current?.lookAt(camera.position);
  });

  return (
    <mesh ref={mesh}>
      <boxBufferGeometry ref={geometry} args={[2.3, 3.25, 0.1]} />
      <animated.meshStandardMaterial color="#f8f9fa" {...opacityProps} />

      <AtomDisplay atom={atom} />
    </mesh>
  );
}
