import { Center, Wrap } from "@chakra-ui/react";
import React from "react";
import MinigameListItem from "./MinigameListItem";
import logo from "../logo.svg";

export default function MinigameList() {
  return (
    <Center minH="95vh">
      <Wrap maxW="700px" spacing="25px" justify="center">
        <MinigameListItem name="PatrickKR" logo={logo} />
        <MinigameListItem name="PatrickKR" logo={logo} />
        <MinigameListItem name="PatrickKR" logo={logo} />
        <MinigameListItem name="PatrickKR" logo={logo} />
        <MinigameListItem name="PatrickKR" logo={logo} />
        <MinigameListItem name="PatrickKR" logo={logo} />
        <MinigameListItem name="PatrickKR" logo={logo} />
      </Wrap>
    </Center>
  );
}
