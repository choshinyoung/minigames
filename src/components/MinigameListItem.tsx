import { Button, ButtonProps, Image, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { Game } from "../Games";
import { Link } from "react-router-dom";

type MinigameListItemProps = ButtonProps & {
  game: Game;
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
