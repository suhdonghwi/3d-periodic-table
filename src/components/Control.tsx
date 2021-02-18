import { useState } from "react";
import {
  Paper,
  Typography,
  Slider,
  Select,
  FormControl,
  styled,
} from "@material-ui/core";

import AtomInfo from "../types/AtomInfo";

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

type Prop = { name: string; property: (v: AtomInfo) => number | undefined };
export type Category = { category: string; props: Prop[] };

interface ControlProps {
  initialMaxHeight: number;
  onUpdateMaxHeight: (maxWidth: number) => void;

  categories: Category[];
  property: string;
  onUpdateProperty: (property: string) => void;
}

export default function Control({
  initialMaxHeight,
  onUpdateMaxHeight,
  categories,
  property,
  onUpdateProperty,
}: ControlProps) {
  const [internalMaxHeight, setInternalMaxHeight] = useState(initialMaxHeight);

  return (
    <Container>
      <FormProp>
        <FormLabel id="property-select">Property</FormLabel>
        <Select
          native
          aria-labelledby="property-select"
          value={property}
          onChange={(e) => onUpdateProperty(e.target.value as string)}
        >
          {categories.map((c) => (
            <optgroup key={c.category} label={c.category}>
              {c.props.map((p) => (
                <option key={p.name} value={p.name}>
                  {p.name}
                </option>
              ))}
            </optgroup>
          ))}
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
