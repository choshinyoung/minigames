import React, {
  createContext,
  createElement,
  useEffect,
  useState,
} from "react";
import { Center } from "@chakra-ui/react";
import { minigame } from "../minigames";
import { difficulty } from "../lib/difficulty";
import { gameStates } from "../lib/gameStates";

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
      gameResult: boolean | null;
      startGame: () => void;
      endGame: (result: boolean) => void;
      replay: () => void;
      timer: number;
    }
  | undefined;

export const GamePlayContext = createContext<GamePlayContextType>(undefined);

export default function GamePlay(props: GamePlayProps) {
  const [configs, setConfigs] = useState({
    difficulty: difficulty.easy,
  });

  const [gameState, setGameState] = useState(gameStates.idle);
  const [gameResult, setGameResult] = useState<boolean | null>(null);

  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (gameState === gameStates.playing) {
      const timerId = setInterval(() => {
        setTimer(timer + 1);
      }, 1000);

      return () => clearInterval(timerId);
    }
  });

  useEffect(restart, [configs]);

  function restart() {
    setGameState(gameStates.idle);
    setGameResult(null);
    setTimer(0);
  }

  function startGame() {
    setGameState(gameStates.playing);
  }

  function endGame(result: boolean) {
    setGameState(gameStates.ended);
    setGameResult(result);
  }

  function replay() {
    setConfigs({ ...configs });
  }

  function setDifficulty(difficulty: difficulty) {
    setConfigs({ ...configs, difficulty });
  }

  return (
    <GamePlayContext.Provider
      value={{
        configs,
        setDifficulty,
        gameState,
        gameResult,
        startGame,
        endGame,
        replay,
        timer,
      }}
    >
      <Center height="90vh">{createElement(props.game.component)}</Center>
    </GamePlayContext.Provider>
  );
}
