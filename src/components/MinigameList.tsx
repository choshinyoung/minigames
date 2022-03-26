import { Center, Wrap } from "@chakra-ui/react";
import React from "react";

type MinigameListProps = {
  children: React.ReactNode;
};

export default function MinigameList(props: MinigameListProps) {
  return (
    <Center minH="95vh">
      <Wrap maxW="700px" spacing="25px" justify="center">
        {props.children}
      </Wrap>
    </Center>
  );
}
