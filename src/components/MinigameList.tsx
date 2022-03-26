import { Center, Wrap } from "@chakra-ui/react";
import React from "react";
import MinigameListItem from "./MinigameListItem";
import { Games } from "../Games";

export default function MinigameList() {
  return (
    <Center minH="90vh">
      <Wrap maxW="700px" spacing="25px" justify="center">
        {Games.map((g) => (
          <MinigameListItem key={g.id} game={g} />
        ))}
      </Wrap>
    </Center>
  );
}
