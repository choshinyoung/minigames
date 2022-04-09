import { Button, Center, Icon, Text } from "@chakra-ui/react";

import { minigame } from "../minigames";
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
import Popup from "./Popup";

type GamePlayProps = {
  game: minigame;
};

type GamePlayContextType =
  | {
      configs: {
        difficulty: difficulty;
      };
      setDifficulty: (difficulty: difficulty) => void;
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
    difficulty: difficulty.easy,
    isTimerEnabled: true,
  });

  const [gameState, setGameState] = useState(gameStates.idle);
  const [gameResult, setGameResult] = useState<boolean | null>(null);

  const [timer, setTimer] = useState(0);

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

  function setDifficulty(difficulty: difficulty) {
    setConfigs({ ...configs, difficulty });

    console.log(difficulty);
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
        setDifficulty,
        gameState,
        startGame,
        gameOver,
        win,
        timer,
      }}
    >
      <Center height="90vh">
        {createElement(props.game.component)}
        <If condition={gameResult === false}>
          <Popup>
            <Text fontSize="2xl">GAME OVER!</Text>
            <Button marginTop={3} onClick={replay} variant="outline">
              Try Again
            </Button>
          </Popup>
        </If>
        <If condition={gameResult === true}>
          <Popup>
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
          </Popup>
        </If>
      </Center>
    </GamePlayContext.Provider>
  );
}
