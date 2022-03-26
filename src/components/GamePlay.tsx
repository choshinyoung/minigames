import { Heading } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { Games } from "../Games";

export default function GamePlay() {
  const id = useParams().id;
  const game = Games.find((g) => g.id === id)!;

  return <Heading>No Game. No {game.name}.</Heading>;
}
