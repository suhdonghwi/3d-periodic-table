import React from "react";
import { Canvas } from "react-three-fiber";
import { OrbitControls } from "@react-three/drei";

import AtomPillar from "./components/AtomPillar";

function App() {
  return (
    <div className="App">
      <Canvas
        style={{ background: "#212529" }}
        camera={{ position: [0, 5, 5] }}
      >
        <ambientLight intensity={0.25} />
        <spotLight
          intensity={0.6}
          position={[30, 30, 50]}
          angle={0.2}
          penumbra={1}
          castShadow
        />

        <AtomPillar
          position={[-1.2, 0, 0]}
          atom={{ shortName: "H", fullName: "Helium" }}
        />
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default App;
