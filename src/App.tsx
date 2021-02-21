import React, { useState } from "react";
import { Canvas } from "react-three-fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import blue from "@material-ui/core/colors/blue";
import colormap from "color-interpolate";

import PeriodicTable from "./components/PeriodicTable";
import AtomInfo from "./types/AtomInfo";
import AtomInfoBoard from "./components/AtomInfoBoard";
import Control, { Category } from "./components/Control";

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

const categories: Category[] = [
  {
    category: "Abundance",
    props: [
      { name: "Abundance in Earth crust", property: (v) => v.abundanceCrust },
      { name: "Abundance in Sea", property: (v) => v.abundanceSea },
    ],
  },
  {
    category: "Radius",
    props: [
      { name: "Atomic Radius", property: (v) => v.atomicRadius },
      { name: "Van der waals Radius", property: (v) => v.vdwRadius },
      { name: "Covalent Radius", property: (v) => v.covalentRadius },
    ],
  },
  {
    category: "Count",
    props: [
      { name: "Electrons Count", property: (v) => v.electrons },
      {
        name: "Outermost Electrons Count",
        property: (v) => v.shells[v.shells.length - 1],
      },
      { name: "Protons Count", property: (v) => v.protons },
      { name: "Neutrons Count", property: (v) => v.neutrons },
    ],
  },
  {
    category: "Atomic properties",
    props: [
      { name: "Atomic Volume", property: (v) => v.atomicVolume },
      { name: "Atomic Weight", property: (v) => v.atomicWeight },
      { name: "Density", property: (v) => v.density },
      { name: "Boiling Point", property: (v) => v.boilingPoint },
      { name: "Melting Point", property: (v) => v.meltingPoint },
      {
        name: "Electronegativity (Pauling)",
        property: (v) => v.electronegativity,
      },
      { name: "Evaporation Heat", property: (v) => v.evaporationHeat },
      { name: "Fusion Heat", property: (v) => v.fusionHeat },
      { name: "First ionization energy", property: (v) => v.ionEnergy },
      { name: "Mass Number", property: (v) => v.massNumber },
      { name: "Group", property: (v) => v.group },
      { name: "Period", property: (v) => v.period },
    ],
  },
];

function App() {
  const [showingAtom, setShowingAtom] = useState<AtomInfo | null>(null);
  const theme = createMuiTheme({
    palette: { type: "dark", primary: { main: blue[500] } },
  });

  const [maxHeight, setMaxHeight] = useState(4);
  const [property, setProperty] = useState("Group");
  const [isLogScale, setIsLogScale] = useState(false);

  const colorRange = colormap(["#4df54d", "#4d4df5"]);

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
          styler={(_, height, maxHeight) => colorRange(height / maxHeight)}
        />

        <OrbitControls minDistance={5} maxDistance={45} />
      </Canvas>
      <Control
        initialMaxHeight={maxHeight}
        onUpdateMaxHeight={(v) => setMaxHeight(v)}
        categories={categories}
        property={property}
        onUpdateProperty={(v) => setProperty(v)}
        isLogScale={isLogScale}
        onUpdateIsLogScale={(v) => setIsLogScale(v)}
      />
    </ThemeProvider>
  );
}

export default App;
