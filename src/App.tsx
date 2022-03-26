import React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import MinigameList from "./components/MinigameList";
import ThemeSwitchable from "./components/ThemeSwitchable";
import { Routes, Route } from "react-router-dom";
import GamePlay from "./components/GamePlay";
import IncorrectPage from "./components/IncorrectPage";

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <Routes>
        <Route element={<ThemeSwitchable />}>
          <Route index element={<MinigameList />} />
          <Route path="/:id" element={<GamePlay />} />
        </Route>
        <Route path="*" element={<IncorrectPage />} />
      </Routes>
    </ChakraProvider>
  );
}
