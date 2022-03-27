import { Heading } from "@chakra-ui/react";

import { minigame } from "../minigames";

type GamePlayProps = {
  game: minigame;
};

export default function GamePlay(props: GamePlayProps) {
  return <Heading>Wa! {props.game.name}!</Heading>;
}
