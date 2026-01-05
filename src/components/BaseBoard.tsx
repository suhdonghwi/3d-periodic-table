import { Text } from "@react-three/drei";
import { MeshProps } from "@react-three/fiber";

export default function BaseBoard(props: MeshProps) {
  return (
    <mesh position={[0, -0.5, 0]} {...props}>
      {props.children}
      <boxGeometry args={[21.5, 1, 16]} />
      <meshLambertMaterial color="#495057" />

      <group position={[-7, 0.5, 5.7]}>
        <Text rotation={[-Math.PI / 2, 0, 0]} fontSize={0.6} depthOffset={-1}>
          3D Periodic Table
        </Text>

        <Text
          position={[0.5, 0, 0.7]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.3}
          depthOffset={-1}
          color="#4263eb"
        >
          github.com/suhdonghwi/3d-periodic-table
        </Text>
      </group>

      {Array.from(Array(18).keys()).map((v) => (
        <Text
          rotation={[-Math.PI / 2, 0, 0]}
          key={v}
          fontSize={0.4}
          depthOffset={-1}
          position={[v - 8.5, 0.5, -6.8]}
        >
          {(v + 1).toString()}
        </Text>
      ))}

      {Array.from(Array(7).keys()).map((v) => (
        <Text
          rotation={[-Math.PI / 2, 0, 0]}
          key={v}
          fontSize={0.4}
          depthOffset={-1}
          position={[-9.8, 0.5, -5.7 + v]}
        >
          {(v + 1).toString()}
        </Text>
      ))}
    </mesh>
  );
}
