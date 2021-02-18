import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Slider,
  Select,
  Checkbox,
  FormControl,
  Grid,
  styled,
} from "@material-ui/core";
import Layers from "@material-ui/icons/Layers";

import AtomInfo from "../types/AtomInfo";

const Container = styled(Paper)({
  position: "absolute",
  top: "2rem",
  right: "2rem",
  padding: "1.5rem",
  boxSizing: "border-box",
  width: "20rem",
  height: "20rem",
});

function FormLabel(props: {
  id: string;
  children: React.ReactNode;
  noGutter?: boolean;
}) {
  return (
    <Typography
      id={props.id}
      color="textSecondary"
      gutterBottom={props.noGutter === undefined || !props.noGutter}
    >
      {props.children}
    </Typography>
  );
}

function FormProp(props: { children: React.ReactNode }) {
  return (
    <Box marginBottom={3}>
      <FormControl fullWidth>{props.children}</FormControl>
    </Box>
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

  isLogScale: boolean;
  onUpdateIsLogScale: (isLogScale: boolean) => void;
}

export default function Control({
  initialMaxHeight,
  onUpdateMaxHeight,
  categories,
  property,
  onUpdateProperty,
  isLogScale,
  onUpdateIsLogScale,
}: ControlProps) {
  const [internalMaxHeight, setInternalMaxHeight] = useState(initialMaxHeight);

  return (
    <Container>
      <Box marginBottom={4}>
        <Grid container alignItems="center" justify="center">
          <Layers style={{ marginRight: "0.5rem" }} />
          <Typography>3d periodic table</Typography>
        </Grid>
      </Box>

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

      <FormProp>
        <Grid container alignItems="center">
          <Grid item xs>
            <FormLabel id="log-scale-check" noGutter>
              Log scale
            </FormLabel>
          </Grid>
          <Grid item>
            <Checkbox
              aria-labelledby="log-scale-check"
              value={isLogScale}
              onChange={(_, v) => onUpdateIsLogScale(v)}
              color="primary"
              style={{ padding: 0 }}
            />
          </Grid>
        </Grid>
      </FormProp>
    </Container>
  );
}
