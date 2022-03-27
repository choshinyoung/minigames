import { Button, ButtonProps, Image, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { minigame } from "../minigames";

type MinigameListItemProps = ButtonProps & {
  game: minigame;
};

export default function MinigameListItem(props: MinigameListItemProps) {
  return (
    <Link to={`/${props.game.id}`}>
      <Button w="150px" h="180px" {...props}>
        <VStack spacing="15px">
          <Image src={props.game.logo} w="90vw" draggable={false} />
          <Text>{props.game.name}</Text>
        </VStack>
      </Button>
    </Link>
  );
}
