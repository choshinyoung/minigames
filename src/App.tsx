import React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import MinigameList from "./components/MinigameList";
import ThemeSwitchable from "./components/ThemeSwitchable";
import { Routes, Route } from "react-router-dom";
import Game from "./components/Game";
import NotFound from "./components/NotFound";

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <Routes>
        <Route element={<ThemeSwitchable />}>
          <Route index element={<MinigameList />} />
          <Route path="/:game" element={<Game />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ChakraProvider>
  );
}
