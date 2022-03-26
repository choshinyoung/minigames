import { Heading } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { Games } from "../Games";
import GameNotFound from "./GameNotFound";

export default function GamePlay() {
  const id = useParams().id!;

  const findResult = Games.find((g) => g.id === id);
  if (findResult === undefined) {
    return <GameNotFound id={id} />;
  }

  const game = findResult!;

  return <Heading>Wa! {game.name}!</Heading>;
}
