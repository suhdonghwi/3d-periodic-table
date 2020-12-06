import { useRef } from "react";
import { MeshProps } from "react-three-fiber";
import { Mesh } from "three";

export default function AtomPillar(props: MeshProps) {
  const mesh = useRef<Mesh>();

  return (
    <mesh {...props} ref={mesh}>
      <boxBufferGeometry args={[1, 5, 1]} />
      <meshStandardMaterial color={"orange"} />
    </mesh>
  );
}
