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
  Button,
  styled,
} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ExpandLess from "@material-ui/icons/ExpandLess";
import { ColorPicker } from "material-ui-color";

import categories from "./categories";
import stylers, { Config, hslToHex } from "./stylers";

const Container = styled(Paper)({
  position: "absolute",
  padding: "0.7rem 1.5rem",
  boxSizing: "border-box",
  overflow: "scroll",
  transition: "all 0.3s",
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
      gutterBottom={!props.noGutter ?? !props.noGutter}
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

interface SettingProps {
  label: string;
  name: string;
  children: React.ReactNode;
}

function Setting({ label, name, children }: SettingProps) {
  return (
    <FormProp>
      <FormLabel id={label}>{name}</FormLabel>
      {children}
    </FormProp>
  );
}

function InlineSetting({ label, name, children }: SettingProps) {
  return (
    <FormProp>
      <Grid container alignItems="center">
        <Grid item xs>
          <FormLabel id={label} noGutter>
            {name}
          </FormLabel>
        </Grid>
        <Grid item>{children}</Grid>
      </Grid>
    </FormProp>
  );
}

interface ControlProps {
  initialMaxHeight: number;
  onUpdateMaxHeight: (maxWidth: number) => void;

  property: string;
  onUpdateProperty: (property: string) => void;

  isLogScale: boolean;
  onUpdateIsLogScale: (isLogScale: boolean) => void;

  styler: string;
  onUpdateStyler: (styler: string) => void;

  config: Config;
  onUpdateConfig: (config: Config) => void;
}

export default function Control({
  initialMaxHeight,
  onUpdateMaxHeight,
  property,
  onUpdateProperty,
  isLogScale,
  onUpdateIsLogScale,
  styler,
  onUpdateStyler,
  config,
  onUpdateConfig,
}: ControlProps) {
  const [internalMaxHeight, setInternalMaxHeight] = useState(initialMaxHeight);
  const [expand, setExpand] = useState(true);

  const isMobile = useMediaQuery("(max-width: 400px)");

  let stylerSettings: JSX.Element | null = null;

  switch (styler) {
    case "Color by height":
      stylerSettings = (
        <>
          <InlineSetting label="from-color-picker" name="From color">
            <ColorPicker
              aria-labelledby="from-color-select"
              value={hslToHex(config.fromColor)}
              hideTextfield
              deferred
              disableAlpha
              onChange={(v) =>
                onUpdateConfig({
                  ...config,
                  fromColor: { h: v.hsl[0], s: v.hsl[1], l: v.hsl[2] },
                })
              }
            />
          </InlineSetting>
          <InlineSetting label="to-color-picker" name="To color">
            <ColorPicker
              aria-labelledby="to-color-select"
              value={hslToHex(config.toColor)}
              hideTextfield
              deferred
              disableAlpha
              onChange={(v) =>
                onUpdateConfig({
                  ...config,
                  toColor: { h: v.hsl[0], s: v.hsl[1], l: v.hsl[2] },
                })
              }
            />
          </InlineSetting>
        </>
      );
      break;
  }

  return (
    <Container
      elevation={3}
      style={{
        height: expand ? "20rem" : "3.5rem",
        width: expand ? "20rem" : "7rem",
        top: isMobile ? "0.5rem" : "2rem",
        right: isMobile ? "0.5rem" : "2rem",
      }}
    >
      <Box marginBottom={2}>
        <Grid container alignItems="center" justify="center">
          <Grid item>
            <Button
              startIcon={expand ? <ExpandLess /> : <ExpandMore />}
              onClick={() => setExpand(!expand)}
            >
              {expand ? "Collapse" : "Expand"}
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Setting label="property-select" name="property">
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
      </Setting>

      <Setting label="max-height-slider" name="Max height">
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
      </Setting>

      <InlineSetting label="log-scale-check" name="Log scale">
        <Checkbox
          aria-labelledby="log-scale-check"
          value={isLogScale}
          onChange={(_, v) => onUpdateIsLogScale(v)}
          color="primary"
          style={{ padding: 0 }}
        />
      </InlineSetting>

      <Setting label="styler-select" name="Styler">
        <Select
          native
          aria-labelledby="styler-select"
          value={styler}
          onChange={(e) => onUpdateStyler(e.target.value as string)}
        >
          {stylers.map((s) => (
            <option key={s.name} value={s.name}>
              {s.name}
            </option>
          ))}
        </Select>
      </Setting>

      {stylerSettings}
    </Container>
  );
}
