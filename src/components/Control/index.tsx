import React, { useState } from "react";
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
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandLess from "@mui/icons-material/ExpandLess";
import { MuiColorInput } from "mui-color-input";

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
      gutterBottom={props.noGutter !== true}
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

// Helper function to convert hex to HSL
function hexToHsl(hex: string): { h: number; s: number; l: number } {
  // Remove the hash if present
  hex = hex.replace(/^#/, "");

  // Parse the hex values
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
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
  const [internalTemp, setInternalTemp] = useState(config.temperature);
  const [expand, setExpand] = useState(true);

  const isMobile = useMediaQuery("(max-width: 400px)");

  let stylerSettings: React.ReactNode = null;

  switch (styler) {
    case "Color by height":
      stylerSettings = (
        <>
          <InlineSetting label="from-color-picker" name="From color">
            <MuiColorInput
              format="hex"
              value={hslToHex(config.fromColor)}
              onChange={(value) => {
                const hsl = hexToHsl(value);
                onUpdateConfig({ ...config, fromColor: hsl });
              }}
              sx={{ width: 100 }}
            />
          </InlineSetting>
          <InlineSetting label="to-color-picker" name="To color">
            <MuiColorInput
              format="hex"
              value={hslToHex(config.toColor)}
              onChange={(value) => {
                const hsl = hexToHsl(value);
                onUpdateConfig({ ...config, toColor: hsl });
              }}
              sx={{ width: 100 }}
            />
          </InlineSetting>
        </>
      );
      break;
    case "Phase":
      stylerSettings = (
        <Setting label="temperature-slider" name="Temperature (K)">
          <Slider
            aria-labelledby="temperature-slider"
            value={internalTemp}
            onChange={(_, v) => setInternalTemp(v as number)}
            onChangeCommitted={(_, v) =>
              onUpdateConfig({ ...config, temperature: v as number })
            }
            valueLabelDisplay="auto"
            step={1}
            min={0}
            max={6000}
          />
        </Setting>
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
        <Grid container alignItems="center" justifyContent="center">
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

      <Setting label="property-select" name="Property">
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
          checked={isLogScale}
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
