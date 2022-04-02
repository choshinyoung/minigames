import { Box, Center } from "@chakra-ui/react";

import { minigame } from "../minigames";
import { getWindowSize, windowSize } from "../lib/windowSize";
import React, { createContext, createElement, useState } from "react";
import { difficulty } from "../lib/difficulty";
import If from "./If";

type GamePlayProps = {
  game: minigame;
};

type GamePlayContextType =
  | {
      configs: {
        windowSize: windowSize;
        difficulty: difficulty;
      };
      setSize: (size: windowSize) => void;
      isGameEnded: boolean;
      gameOver: () => void;
      win: () => void;
    }
  | undefined;

export const GamePlayContext = createContext<GamePlayContextType>(undefined);

export default function GamePlay(props: GamePlayProps) {
  const [configs, setConfigs] = useState({
    windowSize: windowSize.medium,
    difficulty: difficulty.normal,
  });

  const [isGameEnded, setIsGameEnded] = useState(false);
  const [gameResult, setGameResult] = useState<boolean | null>(null);

  function setSize(size: windowSize) {
    setConfigs({ ...configs, windowSize: size });
  }

  function gameOver() {
    setIsGameEnded(true);
    setGameResult(false);
  }

  function win() {
    setIsGameEnded(true);
    setGameResult(true);
  }

  return (
    <GamePlayContext.Provider
      value={{ configs, setSize, isGameEnded, gameOver, win }}
    >
      <Center height="90vh">
        <Box maxW={getWindowSize(configs.windowSize)} w="95vw">
          {createElement(props.game.component)}
        </Box>
        <If condition={gameResult === false}>
          <Box
            maxW={getWindowSize(configs.windowSize)}
            w="95vw"
            padding={0}
            bgColor="#AAAAAAAA"
            color="red"
            position="absolute"
          >
            <Center>YOU DIED</Center>
          </Box>
        </If>
        <If condition={gameResult === true}>
          <Box
            maxW={getWindowSize(configs.windowSize)}
            w="95vw"
            padding={0}
            bgColor="#AAAAAAAA"
            color="red"
            position="absolute"
          >
            <Center>YOU WON</Center>
          </Box>
        </If>
      </Center>
    </GamePlayContext.Provider>
  );
}
