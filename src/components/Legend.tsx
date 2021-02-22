import Style from "./Control/Style";

interface LegendProps {
  data: Record<string, Style>;
}

export default function Legend({ data }: LegendProps) {
  return <group>{Object.entries(data).map(([name, color]) => {})}</group>;
}
