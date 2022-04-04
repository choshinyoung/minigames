import {
  Box,
  Button,
  Center,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

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

  function replay() {
    window.location.reload();
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
            bgColor={useColorModeValue("blackAlpha.200", "blackAlpha.500")}
            backdropFilter="auto"
            backdropBlur="2px"
            borderRadius={5}
            position="absolute"
            p={3}
          >
            <Text fontSize="2xl">GAME OVER!</Text>
            <Button marginTop={3} onClick={replay} variant="outline">
              Try Again
            </Button>
          </Box>
        </If>
        <If condition={gameResult === true}>
          <Box
            maxW={getWindowSize(configs.windowSize)}
            w="300px"
            padding={0}
            bgColor={useColorModeValue("blackAlpha.200", "blackAlpha.500")}
            backdropFilter="auto"
            backdropBlur="2px"
            borderRadius={5}
            position="absolute"
            p={3}
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
            <Button marginTop={3} onClick={replay} variant="outline">
              Play Again
            </Button>
          </Box>
        </If>
      </Center>
    </GamePlayContext.Provider>
  );
}
