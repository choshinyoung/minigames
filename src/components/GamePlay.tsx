import { AspectRatio, Center } from "@chakra-ui/react";

import { minigame } from "../minigames";

type GamePlayProps = {
  game: minigame;
};

export default function GamePlay(props: GamePlayProps) {
  return (
    <Center height="90vh">
      <AspectRatio bgColor="tomato" maxW="750px" w="95vw" ratio={1}>
        {props.game.component()}
      </AspectRatio>
    </Center>
  );
}
