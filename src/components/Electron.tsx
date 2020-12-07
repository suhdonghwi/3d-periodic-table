import React, { useRef } from "react";
import { useFrame } from "react-three-fiber";
import { Mesh, SphereBufferGeometry } from "three";

interface ElectronProps {
  radius: number;
  initialAngle: number;
  coefficient: number;
}

export default function Electron({
  radius,
  initialAngle,
  coefficient,
}: ElectronProps) {
  const mesh = useRef<Mesh>();
  const geometry = useRef<SphereBufferGeometry>();

  let t = 0;
  useFrame(() => {
    mesh.current?.position.setX(
      Math.cos(t * coefficient + initialAngle) * radius
    );
    mesh.current?.position.setY(
      Math.sin(t * coefficient + initialAngle) * radius
    );
    t++;
  });

  return (
    <mesh ref={mesh} position={[0, 0, 0.1]}>
      <sphereBufferGeometry ref={geometry} args={[0.013, 32, 32]} />
      <meshStandardMaterial color="#228be6" />
    </mesh>
  );
}
