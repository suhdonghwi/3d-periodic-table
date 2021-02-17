import { useState } from "react";
import {
  Paper,
  Typography,
  Slider,
  Select,
  FormControl,
  styled,
} from "@material-ui/core";

const Container = styled(Paper)({
  position: "absolute",
  top: "2rem",
  right: "2rem",
  padding: "2rem 1.5rem",
  boxSizing: "border-box",
  width: "20rem",
  height: "20rem",
});

function FormLabel(props: { id: string; children: React.ReactNode }) {
  return (
    <Typography id={props.id} gutterBottom color="textSecondary">
      {props.children}
    </Typography>
  );
}

function FormProp(props: { children: React.ReactNode }) {
  return (
    <FormControl fullWidth style={{ marginBottom: "1.7rem" }}>
      {props.children}
    </FormControl>
  );
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
  const [value, setValue] = useState(1);

  return (
    <Container>
      <FormProp>
        <FormLabel id="property-select">Property</FormLabel>
        <Select
          native
          aria-labelledby="property-select"
          value={value}
          onChange={(e) => setValue(e.target.value as number)}
        >
          <option aria-label="None" value="" />
          <optgroup label="Category 1">
            <option value={1}>Option 1</option>
            <option value={2}>Option 2</option>
          </optgroup>
          <optgroup label="Category 2">
            <option value={3}>Option 3</option>
            <option value={4}>Option 4</option>
          </optgroup>
        </Select>
      </FormProp>

      <FormProp>
        <FormLabel id="max-height-slider">Max height</FormLabel>
        <Slider
          aria-labelledby="max-height-slider"
          value={internalMaxHeight}
          onChange={(_, v) => setInternalMaxHeight(v as number)}
          onChangeCommitted={(_, v) => onUpdateMaxHeight(v as number)}
          valueLabelDisplay="auto"
          step={1}
          marks
          min={2}
          max={10}
        />
      </FormProp>
    </Container>
  );
}
