import { useRef } from "react";
import { MeshProps } from "react-three-fiber";
import { Mesh } from "three";

export default function AtomPillar(props: MeshProps) {
  const mesh = useRef<Mesh>();

  return (
    <mesh {...props} ref={mesh}>
      <boxBufferGeometry args={[3, 3, 3]} />
      <meshStandardMaterial color={"orange"} />
    </mesh>
  );
}
