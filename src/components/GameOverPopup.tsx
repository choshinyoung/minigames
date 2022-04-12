import React, { useContext } from "react";
import { Button, Text } from "@chakra-ui/react";
import { GamePlayContext } from "./GamePlay";
import If from "./If";
import Popup from "./Popup";

type GameOverPopupProps = {
  children?: React.ReactNode;
};

export default function GameOverPopup(props: GameOverPopupProps) {
  const gamePlayContext = useContext(GamePlayContext)!;

  return (
    <If condition={gamePlayContext.gameResult === false}>
      <Popup>
        <Text fontSize="2xl">GAME OVER!</Text>
        {props.children}
        <Button
          marginTop={3}
          onClick={gamePlayContext.replay}
          variant="outline"
        >
          Try Again
        </Button>
      </Popup>
    </If>
  );
}
