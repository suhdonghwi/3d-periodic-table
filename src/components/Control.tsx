import { useState } from "react";
import { Paper, Typography, Slider, styled } from "@material-ui/core";

const Container = styled(Paper)({
  position: "absolute",
  top: "2rem",
  right: "2rem",
  padding: "2rem 1.5rem",
  boxSizing: "border-box",
  width: "20rem",
  height: "20rem",
});

function SettingName(props: { children: React.ReactNode }) {
  return <Typography gutterBottom>{props.children}</Typography>;
}

interface ControlProps {
  initialMaxHeight: number;
  onUpdateMaxHeight: (maxWidth: number) => void;
}

export default function Control({
  initialMaxHeight,
  onUpdateMaxHeight,
}: ControlProps) {
  const [internalMaxHeight, setInternalMaxHeight] = useState(initialMaxHeight);

  return (
    <Container>
      <SettingName>Max height</SettingName>
      <Slider
        value={internalMaxHeight}
        onChange={(_, v) => setInternalMaxHeight(v as number)}
        onChangeCommitted={(_, v) => onUpdateMaxHeight(v as number)}
        valueLabelDisplay="auto"
        step={1}
        marks
        min={2}
        max={10}
      />
    </Container>
  );
}
