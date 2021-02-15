import React, { useRef } from "react";
import { useFrame } from "react-three-fiber";
import { Vector3 } from "three";
import { Mesh, BoxBufferGeometry } from "three";
import { animated, useSpring } from "@react-spring/three";
import { Text } from "@react-three/drei";
import AtomInfo from "../types/AtomInfo";

import AtomDisplay from "./AtomDisplay";
import PropertyList from "./PropertyList";

interface AtomInfoBoardProps {
  atom: AtomInfo | null;
  onClose: () => void;
}

export default function AtomInfoBoard({ atom, onClose }: AtomInfoBoardProps) {
  const mesh = useRef<Mesh>();
  const geometry = useRef<BoxBufferGeometry>();

  const opacityProps = useSpring({ opacity: atom !== null ? 1 : 0 });

  useFrame(({ camera }) => {
    const vec = new Vector3(0, 0, -3);
    const pos = camera.localToWorld(vec);

    mesh.current?.position.copy(pos);
    mesh.current?.lookAt(camera.position);
  });

  return (
    <mesh
      ref={mesh}
      onClick={(e) => {
        if (atom !== null) {
          e.stopPropagation();
        }
      }}
    >
      <boxBufferGeometry ref={geometry} args={[2.4, 3.25, 0.1]} />
      <animated.meshStandardMaterial
        color="white"
        transparent
        {...opacityProps}
      />

      <group
        onClick={(e) => {
          if (atom !== null) {
            e.stopPropagation();
            onClose();
          }
        }}
      >
        <mesh
          position={[1, 1.45, 0]}
          rotation={[0, 0, Math.PI / 4]}
          visible={false}
        >
          <boxBufferGeometry ref={geometry} args={[0.2, 0.2, 0.15]} />
        </mesh>

        <mesh position={[1, 1.45, 0]} rotation={[0, 0, Math.PI / 4]}>
          <boxBufferGeometry ref={geometry} args={[0.03, 0.2, 0.15]} />
          <animated.meshStandardMaterial
            color="#fa5252"
            transparent
            {...opacityProps}
          />
        </mesh>

        <mesh position={[1, 1.45, 0]} rotation={[0, 0, -Math.PI / 4]}>
          <boxBufferGeometry ref={geometry} args={[0.03, 0.2, 0.15]} />
          <animated.meshStandardMaterial
            color="#fa5252"
            transparent
            {...opacityProps}
          />
        </mesh>
      </group>

      {atom !== null && (
        <>
          <Text
            position={[0, 1.25, 0.1]}
            fontSize={0.3}
            color="#1c1c1c"
            font="https://fonts.gstatic.com/s/bitter/v16/raxhHiqOu8IVPmnRc6SY1KXhnF_Y8fbfOLjOW3pzveS5Bw.woff"
          >
            {atom.name}
          </Text>

          <Text
            position={[0, 0.75, 0.1]}
            fontSize={0.065}
            color="#1c1c1c"
            maxWidth={2.1}
            font="https://fonts.gstatic.com/s/bitter/v16/raxhHiqOu8IVPmnRc6SY1KXhnF_Y8fbfOLjOW3pzveS5Bw.woff"
            anchorY="middle"
          >
            {atom.summary}
          </Text>

          <AtomDisplay position={[0, 0.05, 0.1]} atom={atom} />
          <PropertyList atom={atom} />
        </>
      )}
    </mesh>
  );
}
