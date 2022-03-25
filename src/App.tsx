import React from "react";
import "./App.css";
import { ChakraProvider, theme, Box, Grid } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          Hello there.
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
