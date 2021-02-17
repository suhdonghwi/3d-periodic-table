import React, { useState } from "react";
import { Canvas } from "react-three-fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

import PeriodicTable from "./components/PeriodicTable";
import AtomInfo from "./types/AtomInfo";
import AtomInfoBoard from "./components/AtomInfoBoard";
import Control from "./components/Control";

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
  const [showingAtom, setShowingAtom] = useState<AtomInfo | null>(null);
  const theme = createMuiTheme({ palette: { type: "dark" } });

  return (
    <ThemeProvider theme={theme}>
      <Canvas style={{ background: "#101112" }}>
        <PerspectiveCamera position={[0, 13, 10]} makeDefault>
          <AtomInfoBoard
            atom={showingAtom}
            onClose={() => setShowingAtom(null)}
          />
        </PerspectiveCamera>

        <ambientLight intensity={0.25} />
        <spotLight intensity={0.6} position={[30, 30, 50]} />
        <spotLight intensity={0.2} position={[0, 0, -50]} />

        <PeriodicTable
          position={[0, 0, 0]}
          onClickPillar={(v) => setShowingAtom(v)}
          placement={placement}
        />

        <OrbitControls minDistance={5} maxDistance={25} />
      </Canvas>
      <Control />
    </ThemeProvider>
  );
}

export default App;
