import { Center, Wrap } from "@chakra-ui/react";
import { minigames } from "../minigames";
import MinigameListItem from "./MinigameListItem";

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
