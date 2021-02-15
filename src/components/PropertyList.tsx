import React, { useState } from "react";
import { Text } from "@react-three/drei";

import AtomInfo from "../types/AtomInfo";

interface PropertyListProps {
  atom: AtomInfo;
}

function withUnit(value: number | undefined, unit: string) {
  return value !== undefined ? value + " " + unit : undefined;
}

export default function PropertyList({ atom }: PropertyListProps) {
  const properties =
    atom !== undefined
      ? [
          {
            name: "phase",
            value: atom.phase,
          },
          {
            name: "group",
            value: atom.group?.toString(),
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
            value: withUnit(atom.boilingPoint, "K"),
          },
          {
            name: "melting point",
            value: withUnit(atom.meltingPoint, "K"),
          },
          {
            name: "atomic weight",
            value: withUnit(atom.atomicWeight, "g/mol"),
          },
          {
            name: "density",
            value: withUnit(atom.density, "g/L (at STP)"),
          },
          {
            name: "electronegativity",
            value: withUnit(atom.electronegativity, "(pauling scale)"),
          },
          {
            name: "1st ion energy",
            value: withUnit(atom.ionEnergy, "eV"),
          },
          {
            name: "discover year",
            value: atom.discoveryYear,
          },
        ]
      : [];

  const [page, setPage] = useState(0);
  const maxPage = Math.floor((properties.length - 1) / 5);
  return (
    <group>
      {properties.slice(5 * page, 5 * page + 5).map((property, i) => (
        <group key={i}>
          <Text
            position={[-0.23, -0.42 - i * 0.15, 0.1]}
            fontSize={0.08}
            font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
            color="#212529"
            anchorX="right"
            anchorY="top"
          >
            {property.name.toUpperCase()}
          </Text>

          <Text
            position={[-0.16, -0.42 - i * 0.15, 0.1]}
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
    </group>
  );
}
