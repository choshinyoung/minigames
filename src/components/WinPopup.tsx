import React, { useContext } from "react";
import { Button, Text } from "@chakra-ui/react";
import Popup from "./Popup";
import { GamePlayContext } from "./GamePlay";
import If from "./If";

type WinPopupProps = {
  children?: React.ReactNode;
};

export default function WinPopup(props: WinPopupProps) {
  const gamePlayContext = useContext(GamePlayContext)!;

  return (
    <If condition={gamePlayContext.gameResult === true}>
      <Popup>
        <Text fontSize="2xl">YOU WIN!</Text>
        {props.children}
        <Button
          marginTop={3}
          onClick={gamePlayContext.replay}
          variant="outline"
        >
          Play Again
        </Button>
      </Popup>
    </If>
  );
}
