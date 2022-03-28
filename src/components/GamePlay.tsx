import { AspectRatio, Grid, Center, VStack, Divider } from "@chakra-ui/react";

import { minigame } from "../minigames";

type GamePlayProps = {
  game: minigame;
};

export default function GamePlay(props: GamePlayProps) {
  return (
    <Center height="90vh">
      <VStack spacing={0}>
        <Divider />
        <Grid w="100%" h="50px">
          <Center>This is Header</Center>
        </Grid>
        <AspectRatio bgColor="blackAlpha.100" maxW="700px" w="95vw" ratio={1}>
          {props.game.component()}
        </AspectRatio>
      </VStack>
    </Center>
  );
}
