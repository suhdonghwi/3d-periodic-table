import React, { useState } from "react";
import { Text } from "@react-three/drei";

import AtomInfo from "../types/AtomInfo";

interface PropertyListProps {
  atom: AtomInfo;
}

function numeric(value: number | undefined, unit?: string): string | undefined {
  if (value === undefined) return undefined;

  const fixed = Number(value.toFixed(8));
  if (unit !== undefined) return fixed + " " + unit;
  else return fixed.toString();
}

export default function PropertyList({ atom }: PropertyListProps) {
  const properties: { name: string; value?: string }[] =
    atom !== undefined
      ? [
          {
            name: "phase",
            value: atom.phase,
          },
          {
            name: "group",
            value: numeric(atom.group),
          },
          {
            name: "period",
            value: numeric(atom.period),
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
            name: "block",
            value: atom.block + "-block",
          },
          {
            name: "structure",
            value: atom.structure,
          },
          {
            name: "mass number",
            value: numeric(atom.massNumber),
          },
          {
            name: "boiling point",
            value: numeric(atom.boilingPoint, "K"),
          },
          {
            name: "melting point",
            value: numeric(atom.meltingPoint, "K"),
          },
          {
            name: "atomic weight",
            value: numeric(atom.atomicWeight),
          },
          {
            name: "atomic radius",
            value: numeric(atom.atomicRadius, "pm"),
          },
          {
            name: "vdw radius",
            value: numeric(atom.vdwRadius, "pm"),
          },
          {
            name: "covalent radius",
            value: numeric(atom.covalentRadius, "pm"),
          },
          {
            name: "atomic weight",
            value: numeric(atom.atomicWeight),
          },
          {
            name: "electrons",
            value: numeric(atom.electrons),
          },
          {
            name: "protons",
            value: numeric(atom.protons),
          },
          {
            name: "neutrons",
            value: numeric(atom.neutrons),
          },
          {
            name: "atomic volume",
            value: numeric(atom.atomicVolume, "cm3/mol"),
          },
          {
            name: "density",
            value: numeric(atom.density, "g/L (at STP)"),
          },
          {
            name: "electronegativity",
            value: numeric(atom.electronegativity, "(pauling scale)"),
          },
          {
            name: "fusion heat",
            value: numeric(atom.fusionHeat, "kJ/mol"),
          },
          {
            name: "crust abundance",
            value: numeric(atom.abundanceCrust, "mg/kg"),
          },
          {
            name: "sea abundance",
            value: numeric(atom.abundanceSea, "mg/L"),
          },
          {
            name: "evaporation heat",
            value: numeric(atom.evaporationHeat, "kJ/mol"),
          },
          {
            name: "1st ion energy",
            value: numeric(atom.ionEnergy, "eV"),
          },
          {
            name: "discover year",
            value: numeric(atom.discoveryYear),
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
            {property.value || "(no data)"}
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
