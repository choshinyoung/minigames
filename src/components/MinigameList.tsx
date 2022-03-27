import { Center, Wrap } from "@chakra-ui/react";

import MinigameListItem from "./MinigameListItem";

import { minigames } from "../minigames";

export default function MinigameList() {
  return (
    <Center minH="90vh">
      <Wrap maxW="700px" spacing="25px" justify="center">
        {minigames.map((g) => (
          <MinigameListItem key={g.id} game={g} />
        ))}
      </Wrap>
    </Center>
  );
}
