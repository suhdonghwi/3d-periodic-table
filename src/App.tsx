import React, { useState } from "react";
import { Canvas } from "react-three-fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  useCubeTexture,
} from "@react-three/drei";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import blue from "@material-ui/core/colors/blue";

import PeriodicTable from "./components/PeriodicTable";
import AtomInfo from "./types/AtomInfo";
import AtomInfoBoard from "./components/AtomInfoBoard";

import Control from "./components/Control";
import categories from "./components/Control/categories";
import stylers, { Config } from "./components/Control/stylers";

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
  const theme = createMuiTheme({
    palette: { type: "dark", primary: { main: blue[500] } },
  });

  const [maxHeight, setMaxHeight] = useState(4);
  const [property, setProperty] = useState("Group");
  const [isLogScale, setIsLogScale] = useState(false);

  const [styler, setStyler] = useState("Color by height");
  const [config, setConfig] = useState<Config>({
    fromColor: { h: 120, s: 89, l: 63 },
    toColor: { h: 240, s: 89, l: 63 },
    temperature: 273.15,
  });

  const envMap = useCubeTexture(
    ["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"],
    { path: "cube/" }
  );

  return (
    <ThemeProvider theme={theme}>
      <Canvas style={{ background: "#101112" }}>
        <PerspectiveCamera position={[0, 17, 14]} makeDefault>
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
          realMaxHeight={maxHeight}
          propGetter={
            categories.flatMap((c) => c.props).find((v) => v.name === property)!
              .property
          }
          isLogScale={isLogScale}
          styler={stylers.find((s) => s.name === styler)!.styler(config)}
          envMap={envMap}
        />

        <OrbitControls minDistance={5} maxDistance={45} enablePan={false} />
      </Canvas>
      <Control
        initialMaxHeight={maxHeight}
        onUpdateMaxHeight={(v) => setMaxHeight(v)}
        property={property}
        onUpdateProperty={(v) => setProperty(v)}
        isLogScale={isLogScale}
        onUpdateIsLogScale={(v) => setIsLogScale(v)}
        styler={styler}
        onUpdateStyler={(v) => setStyler(v)}
        config={config}
        onUpdateConfig={(v) => setConfig(v)}
      />
    </ThemeProvider>
  );
}

export default App;
