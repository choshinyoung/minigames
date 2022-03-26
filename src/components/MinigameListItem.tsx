import { Button, ButtonProps, Image, Text, VStack } from "@chakra-ui/react";
import React from "react";

type MinigameListItemProps = ButtonProps & {
  name: string;
  logo: string;
};

export default function MinigameListItem(props: MinigameListItemProps) {
  return (
    <Button w="150px" h="180px" {...props}>
      <VStack spacing="15px">
        <Image src={props.logo} w="90vw" draggable={false} />
        <Text>{props.name}</Text>
      </VStack>
    </Button>
  );
}
