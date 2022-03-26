import { Box, Grid } from "@chakra-ui/react";
import ColorModeSwitcher from "./ColorModeSwitcher";
import React from "react";
import { Outlet } from "react-router-dom";

export default function ThemeSwitchable() {
  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <Outlet />
      </Grid>
    </Box>
  );
}
