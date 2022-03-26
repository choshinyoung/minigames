import { Center, Heading } from "@chakra-ui/react";

type GameNotFoundProps = {
  id: string;
};

export default function GameNotFound(props: GameNotFoundProps) {
  return (
    <Center h="100vh">
      <Heading>No Game. No {props.id}</Heading>
    </Center>
  );
}
