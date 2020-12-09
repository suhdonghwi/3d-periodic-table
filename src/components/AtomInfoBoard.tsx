import React, { useRef, useState } from "react";
import { useFrame } from "react-three-fiber";
import { Vector3 } from "three";
import { Mesh, BoxBufferGeometry } from "three";
import { animated, useSpring } from "@react-spring/three";
import { Text } from "@react-three/drei";
import AtomInfo from "../types/AtomInfo";

import AtomDisplay from "./AtomDisplay";

interface AtomInfoBoardProps {
  atom: AtomInfo | null;
  onClose: () => void;
}

function withUnit(value: number | null, unit: string) {
  return value !== null ? value + " " + unit : null;
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

  const properties =
    atom !== null
      ? [
          {
            name: "phase",
            value: atom.phase,
          },
          {
            name: "group",
            value: atom.group.toString(),
          },
          {
            name: "period",
            value: atom.period.toString(),
          },
          {
            name: "category",
            value: atom.category,
          },
          {
            name: "appearance",
            value: atom.appearance,
          },
          {
            name: "boiling point",
            value: withUnit(atom.boil, "K"),
          },
          {
            name: "melting point",
            value: withUnit(atom.melt, "K"),
          },
          {
            name: "atomic mass",
            value: withUnit(atom.melt, "g/mol"),
          },
          {
            name: "density",
            value: withUnit(atom.melt, "g/L (at STP)"),
          },
          {
            name: "discovered by",
            value: atom.discoveredBy,
          },
        ]
      : [];

  const [page, setPage] = useState(0);
  const maxPage = Math.floor((properties.length - 1) / 5);

  return (
    <mesh
      ref={mesh}
      onClick={(e) => {
        if (atom !== null) {
          e.stopPropagation();
        }
      }}
    >
      <boxBufferGeometry ref={geometry} args={[2.3, 3.25, 0.1]} />
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
            color="#2b2b2b"
            maxWidth={1.9}
            font="https://fonts.gstatic.com/s/bitter/v16/raxhHiqOu8IVPmnRc6SY1KXhnF_Y8fbfOLjOW3pzveS5Bw.woff"
            anchorY="middle"
          >
            "{atom.summary}"
          </Text>

          <AtomDisplay position={[0, 0.05, 0.1]} atom={atom} />

          {properties.slice(5 * page, 5 * page + 5).map((property, i) => (
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
                maxWidth={1.2}
              >
                {property.value || "(unknown)"}
              </Text>
            </group>
          ))}

          <mesh
            position={[-0.1, -1.51, 0.1]}
            rotation={[0, 0, Math.PI / 2]}
            scale={[0.4, 0.4, 1]}
            onClick={() => setPage(Math.max(page - 1, 0))}
          >
            <geometry attach="geometry">
              <vector3 attachArray="vertices" args={[0, 0, 0]}></vector3>
              <vector3 attachArray="vertices" args={[0.2, 0, 0]}></vector3>
              <vector3 attachArray="vertices" args={[0.1, 0.17, 0]}></vector3>
              <face3 attachArray="faces" args={[0, 1, 2]}></face3>
            </geometry>
            <meshBasicMaterial
              attach="material"
              color={page === 0 ? "#868e96" : "#495057"}
            />
          </mesh>

          <Text position={[0, -1.47, 0.1]} fontSize={0.08} color="#212529">
            {(page + 1).toString()}
          </Text>

          <mesh
            position={[0.1, -1.43, 0.1]}
            rotation={[0, 0, -Math.PI / 2]}
            scale={[0.4, 0.4, 1]}
            onClick={() => setPage(Math.min(page + 1, maxPage))}
          >
            <geometry attach="geometry">
              <vector3 attachArray="vertices" args={[0, 0, 0]}></vector3>
              <vector3 attachArray="vertices" args={[0.2, 0, 0]}></vector3>
              <vector3 attachArray="vertices" args={[0.1, 0.17, 0]}></vector3>
              <face3 attachArray="faces" args={[0, 1, 2]}></face3>
            </geometry>
            <meshBasicMaterial
              attach="material"
              color={page === maxPage ? "#868e96" : "#495057"}
            />
          </mesh>
        </>
      )}
    </mesh>
  );
}
