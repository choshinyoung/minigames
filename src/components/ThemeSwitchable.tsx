import { Box, Grid } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

import ColorModeSwitcher from "./ColorModeSwitcher";

export default function ThemeSwitchable() {
  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh">
        <ColorModeSwitcher justifySelf="flex-end" mt={3} mr={3} />
        <Outlet />
      </Grid>
    </Box>
  );
}
