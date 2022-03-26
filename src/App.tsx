import React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import MinigameList from "./components/MinigameList";
import ThemeSwitchable from "./components/ThemeSwitchable";
import MinigameListItem from "./components/MinigameListItem";
import logo from "./logo.svg";

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <ThemeSwitchable>
        <MinigameList>
          <MinigameListItem name="PatrickKR" logo={logo} />
          <MinigameListItem name="PatrickKR" logo={logo} />
          <MinigameListItem name="PatrickKR" logo={logo} />
          <MinigameListItem name="PatrickKR" logo={logo} />
          <MinigameListItem name="PatrickKR" logo={logo} />
          <MinigameListItem name="PatrickKR" logo={logo} />
          <MinigameListItem name="PatrickKR" logo={logo} />
        </MinigameList>
      </ThemeSwitchable>
    </ChakraProvider>
  );
}
