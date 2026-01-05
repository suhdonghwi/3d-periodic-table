import { Suspense, useEffect, useRef, useState } from "react";
import { Mesh, BoxGeometry } from "three";
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
  const mesh = useRef<Mesh>(null);
  const geometry = useRef<BoxGeometry>(null);
  const [displayAtom, setDisplayAtom] = useState<AtomInfo | null>(atom);
  const isOpenRef = useRef(atom !== null);

  useEffect(() => {
    isOpenRef.current = atom !== null;
    if (atom !== null) setDisplayAtom(atom);
  }, [atom]);

  const boardSpring = useSpring<{
    position: [number, number, number];
    rotationX: number;
  }>({
    position: atom !== null ? [0, 0, -5] : [0, -5, -5],
    rotationX: atom !== null ? 0 : -1,
    onRest: () => {
      if (!isOpenRef.current) setDisplayAtom(null);
    },
  });

  return (
    <animated.mesh
      ref={mesh}
      onClick={(e) => {
        if (displayAtom !== null) {
          e.stopPropagation();
        }
      }}
      position={boardSpring.position}
      rotation-x={boardSpring.rotationX}
    >
      <boxGeometry ref={geometry} args={[2.4, 3.25, 0.1]} />
      <meshLambertMaterial color="white" />

      <group
        onClick={(e) => {
          if (displayAtom !== null) {
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
          <boxGeometry args={[0.2, 0.2, 0.15]} />
        </mesh>

        <mesh position={[1, 1.45, 0]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.03, 0.2, 0.15]} />
          <meshLambertMaterial color="#fa5252" />
        </mesh>

        <mesh position={[1, 1.45, 0]} rotation={[0, 0, -Math.PI / 4]}>
          <boxGeometry args={[0.03, 0.2, 0.15]} />
          <meshLambertMaterial color="#fa5252" />
        </mesh>
      </group>

      {displayAtom !== null && (
        <Suspense fallback={null}>
          <Text
            position={[0, 1.25, 0.1]}
            fontSize={0.3}
            color="#1c1c1c"
            font="https://fonts.gstatic.com/s/bitter/v16/raxhHiqOu8IVPmnRc6SY1KXhnF_Y8fbfOLjOW3pzveS5Bw.woff"
          >
            {displayAtom.name}
          </Text>

          <Text
            position={[0, 0.75, 0.1]}
            fontSize={0.065}
            color="#1c1c1c"
            maxWidth={2.1}
            font="https://fonts.gstatic.com/s/bitter/v16/raxhHiqOu8IVPmnRc6SY1KXhnF_Y8fbfOLjOW3pzveS5Bw.woff"
            anchorY="middle"
          >
            {displayAtom.summary}
          </Text>

          <AtomDisplay position={[0, 0.05, 0.1]} atom={displayAtom} />
          <PropertyList atom={displayAtom} />
        </Suspense>
      )}
    </animated.mesh>
  );
}
