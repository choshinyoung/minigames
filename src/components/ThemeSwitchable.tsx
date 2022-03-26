import { Box, Grid } from "@chakra-ui/react";
import ColorModeSwitcher from "./ColorModeSwitcher";
import React from "react";

type ThemeSwitchableProps = {
  children: React.ReactNode;
};

export default function ThemeSwitchable(props: ThemeSwitchableProps) {
  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        {props.children}
      </Grid>
    </Box>
  );
}
