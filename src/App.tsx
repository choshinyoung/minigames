import { ChakraProvider, theme } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";

import MinigameList from "./components/MinigameList";
import ThemeSwitchable from "./components/ThemeSwitchable";
import GamePlay from "./components/GamePlay";
import IncorrectPage from "./components/IncorrectPage";

import { minigames } from "./minigames";

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <Routes>
        <Route element={<ThemeSwitchable />}>
          <Route index element={<MinigameList />} />
          {minigames.map((g) => (
            <Route path={`/${g.id}`} element={<GamePlay game={g} />} />
          ))}
        </Route>
        <Route path="*" element={<IncorrectPage />} />
      </Routes>
    </ChakraProvider>
  );
}
