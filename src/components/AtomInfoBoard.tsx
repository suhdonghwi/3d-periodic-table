import React, { useRef } from "react";
import { useFrame } from "react-three-fiber";
import { Vector3 } from "three";
import { Mesh, BoxBufferGeometry } from "three";
import { animated, useSpring } from "@react-spring/three";
import AtomInfo from "../types/AtomInfo";

import AtomDisplay from "./AtomDisplay";

interface AtomInfoBoardProps {
  atom: AtomInfo | null;
  onClick: () => void;
}

export default function AtomInfoBoard({ atom, onClick }: AtomInfoBoardProps) {
  const mesh = useRef<Mesh>();
  const geometry = useRef<BoxBufferGeometry>();

  const opacityProps = useSpring({ opacity: atom !== null ? 1 : 0 });

  useFrame(({ camera }) => {
    const vec = new Vector3(0, 0, -3);
    const pos = camera.localToWorld(vec);

    mesh.current?.position.copy(pos);
    mesh.current?.lookAt(camera.position);
    mesh.current?.rotateX(-0.2);
  });

  return (
    <mesh
      ref={mesh}
      onClick={(e) => {
        if (atom !== null) {
          e.stopPropagation();
          onClick();
        }
      }}
    >
      <boxBufferGeometry ref={geometry} args={[2.3, 3.25, 0.1]} />
      <animated.meshStandardMaterial
        color="#f8f9fa"
        transparent
        {...opacityProps}
      />

      {atom !== null && <AtomDisplay atom={atom} />}
    </mesh>
  );
}
