import type { JSX, ReactElement } from "react";
import BaseBoard from "./BaseBoard";

import AtomPillar from "./AtomPillar";
import AtomInfo from "../types/AtomInfo";
import atomData from "../atomData";
import { Styler } from "./Control/stylers";
import { CubeTexture } from "three";

interface PeriodicTableProps {
  placement: number[][];
  onClickPillar: (v: AtomInfo) => void;

  realMaxHeight: number;
  propGetter: (v: AtomInfo) => number | undefined;

  isLogScale: boolean;

  styler: Styler;
  envMap: CubeTexture;
}

export default function PeriodicTable({
  placement,
  onClickPillar,
  realMaxHeight,
  propGetter,
  isLogScale,
  styler,
  envMap,
  ...props
}: PeriodicTableProps & JSX.IntrinsicElements["group"]) {
  let heightData: (number | undefined)[] = atomData.map(propGetter);

  if (isLogScale)
    heightData = heightData.map((v) =>
      v === undefined ? undefined : Math.log10(Math.max(v, 0.00001) + 1)
    );

  const pillars: ReactElement[] = [];
  const maxHeight = Math.max(...heightData.map((v) => v || 0));

  for (let i = 0; i < placement.length; i++) {
    for (let j = 0; j < placement[i].length; j++) {
      const number = placement[i][j];
      if (number !== 0) {
        const atom = atomData[number - 1];
        let height = heightData[number - 1];

        const realHeight = Math.max(
          height === undefined ? 0 : (height / maxHeight) * realMaxHeight,
          0.01
        );

        const style =
          height === undefined
            ? { color: "#ff6b6b", opacity: 0.5 }
            : styler(atom, height, maxHeight);

        pillars.push(
          <AtomPillar
            key={number}
            atom={atom}
            position={[j - 8.5, 0.5, i - 5.7]}
            height={realHeight}
            style={style}
            envMap={envMap}
            onClick={() => onClickPillar(atom)}
          />
        );
      }
    }
  }

  return (
    <group {...props}>
      <BaseBoard>
        <group>{pillars}</group>
      </BaseBoard>
    </group>
  );
}
