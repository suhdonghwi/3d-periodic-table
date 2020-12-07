import React from "react";
import { Controls } from "react-three-gui";
import { OrbitControls } from "@react-three/drei";

import PeriodicTable from "./components/PeriodicTable";
import atomData from "./atomData";

function range(from: number, to: number) {
  const result = [];
  for (let i = from; i <= to; i++) result.push(i);
  return result;
}

const placement = [
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [3, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 6, 7, 8, 9, 10],
  [11, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 14, 15, 16, 17, 18],
  range(19, 36),
  range(37, 54),
  [55, 56, 0].concat(range(72, 86)),
  [87, 88, 0].concat(range(104, 118)),
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0].concat(range(57, 71)),
  [0, 0, 0].concat(range(89, 103)),
];

function App() {
  return (
    <Controls.Provider>
      <Controls.Canvas
        style={{ background: "#212529" }}
        camera={{ position: [0, 13, 10] }}
      >
        <ambientLight intensity={0.25} />
        <spotLight intensity={0.6} position={[30, 30, 50]} />
        <spotLight intensity={0.2} position={[0, 0, -50]} />

        <PeriodicTable
          position={[-9, 0, -5]}
          placement={placement}
          atomData={atomData}
        />
        <OrbitControls />
      </Controls.Canvas>
      <Controls title="3D Periodic Table" />
    </Controls.Provider>
  );
}

export default App;
