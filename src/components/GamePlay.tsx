import { Box, Center, Icon, Text, useColorModeValue } from "@chakra-ui/react";

import { minigame } from "../minigames";
import { getWindowSize, windowSize } from "../lib/windowSize";
import React, {
  createContext,
  createElement,
  useEffect,
  useState,
} from "react";
import { difficulty } from "../lib/difficulty";
import If from "./If";
import { gameStates } from "../lib/gameStates";
import { FaClock } from "react-icons/fa";

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
      gameState: gameStates;
      startGame: () => void;
      gameOver: () => void;
      win: () => void;
      timer: number;
    }
  | undefined;

export const GamePlayContext = createContext<GamePlayContextType>(undefined);

export default function GamePlay(props: GamePlayProps) {
  const [configs, setConfigs] = useState({
    windowSize: windowSize.medium,
    difficulty: difficulty.normal,
    isTimerEnabled: true,
  });

  const [gameState, setGameState] = useState(gameStates.idle);
  const [gameResult, setGameResult] = useState<boolean | null>(null);

  const [timer, setTimer] = useState(0);

  function setSize(size: windowSize) {
    setConfigs({ ...configs, windowSize: size });
  }

  function startGame() {
    setGameState(gameStates.playing);
  }

  function gameOver() {
    setGameState(gameStates.ended);
    setGameResult(false);
  }

  function win() {
    setGameState(gameStates.ended);
    setGameResult(true);
  }

  useEffect(() => {
    if (configs.isTimerEnabled && gameState === gameStates.playing) {
      const timerId = setInterval(() => {
        setTimer(timer + 1);
      }, 1000);

      return () => clearInterval(timerId);
    }
  });

  return (
    <GamePlayContext.Provider
      value={{
        configs,
        setSize,
        gameState,
        startGame,
        gameOver,
        win,
        timer,
      }}
    >
      <Center height="90vh">
        <Box maxW={getWindowSize(configs.windowSize)} w="95vw">
          {createElement(props.game.component)}
        </Box>
        <If condition={gameResult === false}>
          <Box
            maxW={getWindowSize(configs.windowSize)}
            w="250px"
            padding={0}
            bgColor={useColorModeValue("white", "gray.700")}
            borderRadius={5}
            position="absolute"
          >
            <Text fontSize="2xl">GAME OVER!</Text>
          </Box>
        </If>
        <If condition={gameResult === true}>
          <Box
            maxW={getWindowSize(configs.windowSize)}
            w="300px"
            padding={0}
            bgColor={useColorModeValue("white", "gray.700")}
            borderRadius={5}
            position="absolute"
          >
            <Text fontSize="2xl">YOU WIN!</Text>
            <If condition={configs.isTimerEnabled}>
              <Center>
                <Icon as={FaClock} p="4px" />
                <Text p={2}>
                  {Math.floor(timer / 60)} : {timer % 60}
                </Text>
              </Center>
            </If>
          </Box>
        </If>
      </Center>
    </GamePlayContext.Provider>
  );
}
