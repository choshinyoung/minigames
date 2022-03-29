import { Box, Center } from "@chakra-ui/react";

import { minigame } from "../minigames";
import { getWindowSize, windowSize } from "../lib/windowSize";
import { createContext, useState } from "react";
import { difficulty } from "../lib/difficulty";

type GamePlayProps = {
  game: minigame;
};

type GamePlayContextType = {
  configs: {
    windowSize: windowSize;
    difficulty: difficulty;
  };
  setSize: (size: windowSize) => void;
} | null;

export const GamePlayContext = createContext<GamePlayContextType>(null);

export default function GamePlay(props: GamePlayProps) {
  const [configs, setConfigs] = useState({
    windowSize: windowSize.medium,
    difficulty: difficulty.normal,
  });

  function setSize(size: windowSize) {
    setConfigs({ ...configs, windowSize: size });
  }

  return (
    <GamePlayContext.Provider value={{ configs, setSize }}>
      <Center height="90vh">
        <Box maxW={getWindowSize(configs.windowSize)} w="95vw">
          {props.game.component()}
        </Box>
      </Center>
    </GamePlayContext.Provider>
  );
}
