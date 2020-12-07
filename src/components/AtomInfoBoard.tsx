import React, { useRef } from "react";
import { useFrame } from "react-three-fiber";
import { Vector3 } from "three";
import { Mesh, BoxBufferGeometry } from "three";
import { animated, useSpring } from "@react-spring/three";
import { Text } from "@react-three/drei";
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
  });

  const properties =
    atom !== null
      ? [
          {
            name: "phase",
            value: atom.phase,
          },
          {
            name: "boiling point",
            value:
              atom.boil !== null ? atom.boil.toFixed(2) + "K" : "(unknown)",
          },
          {
            name: "melting point",
            value:
              atom.melt !== null ? atom.melt.toFixed(2) + "K" : "(unknown)",
          },
          {
            name: "category",
            value: atom.category !== null ? atom.category : "(unknown)",
          },
          {
            name: "appearance",
            value: atom.appearance !== null ? atom.appearance : "(unknown)",
          },
        ]
      : [];

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

      {atom !== null && (
        <>
          <Text
            position={[0, 1.25, 0.1]}
            fontSize={0.3}
            color="#212529"
            font="https://fonts.gstatic.com/s/bitter/v16/raxhHiqOu8IVPmnRc6SY1KXhnF_Y8fbfOLjOW3pzveS5Bw.woff"
          >
            {atom.name}
          </Text>

          <Text
            position={[0, 0.75, 0.1]}
            fontSize={0.065}
            color="#343a40"
            maxWidth={1.9}
            font="https://fonts.gstatic.com/s/bitter/v16/raxhHiqOu8IVPmnRc6SY1KXhnF_Y8fbfOLjOW3pzveS5Bw.woff"
            anchorY="middle"
          >
            "{atom.summary}"
          </Text>

          {properties.map((property, i) => (
            <group key={i}>
              <Text
                position={[-0.3, -0.45 - i * 0.15, 0.1]}
                fontSize={0.08}
                font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
                color="#212529"
                anchorX="right"
                anchorY="top"
              >
                {property.name.toUpperCase()}
              </Text>

              <Text
                position={[-0.2, -0.45 - i * 0.15, 0.1]}
                fontSize={0.08}
                font="https://fonts.gstatic.com/s/bitter/v16/raxhHiqOu8IVPmnRc6SY1KXhnF_Y8fbfOLjOW3pzveS5Bw.woff"
                color="#212529"
                anchorX="left"
                anchorY="top"
                maxWidth={1}
              >
                {property.value}
              </Text>
            </group>
          ))}
          <AtomDisplay position={[0, 0.05, 0.1]} atom={atom} />
        </>
      )}
    </mesh>
  );
}
