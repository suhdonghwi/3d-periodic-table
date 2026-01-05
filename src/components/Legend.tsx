import { Text } from "@react-three/drei";

import Style from "./Control/Style";
import RawPillar from "./RawPillar";
import { JSX } from "react";

interface LegendProps {
  data: Record<string, Style>;
  postfix?: string;
}

export default function Legend({
  data,
  postfix,
  ...props
}: LegendProps & JSX.IntrinsicElements["group"]) {
  return (
    <group {...props}>
      {Object.entries(data).map(([name, style], i) => (
        <group key={name}>
          <RawPillar
            style={style}
            length={0.3}
            scale={[1, 0.5, 1]}
            position={[(i % 5) * 2, 0.25, Math.floor(i / 5) * 1.3]}
          >
            <Text
              rotation={[-Math.PI / 2, 0, 0]}
              position={[0, 0, 0.4]}
              fontSize={0.15}
              depthOffset={-1}
            >
              {name} {postfix}
            </Text>
          </RawPillar>
        </group>
      ))}
    </group>
  );
}
