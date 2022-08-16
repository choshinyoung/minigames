import React, { useContext, useEffect, useState } from "react";
import { GamePlayContext } from "../../components/GamePlay";
import { Box, SimpleGrid, VStack } from "@chakra-ui/react";
import { shuffle } from "../../utils";
import { difficulty } from "../../lib/difficulty";
import { gameStates } from "../../lib/gameStates";
import Header from "../../components/Header";
import DifficultySelector from "../../components/DifficultySelector";
import Clock from "../../components/Clock";
import WinPopup from "../../components/WinPopup";
import GameOverPopup from "../../components/GameOverPopup";
import Tile from "./Tile";
import {
  FaAtom,
  FaBomb,
  FaBreadSlice,
  FaDice,
  FaFeather,
  FaFlag,
  FaGem,
  FaGlobe,
  FaPaintBrush,
  FaPoo,
  FaQuestion,
  FaRegHandPointRight,
  FaRegHeart,
  FaRegMoon,
  FaRegSmile,
  FaRegStar,
  FaRegSun,
  FaRobot,
} from "react-icons/fa";
import { IconType } from "react-icons";

export type tileData = {
  index: number;
  value: IconType;
  isOpen: boolean;
  isPaired: boolean;
};

export default function MemoryTile() {
  const emojis = [
    FaBomb,
    FaFlag,
    FaPoo,
    FaRegSmile,
    FaRegHeart,
    FaRegHandPointRight,
    FaDice,
    FaRegMoon,
    FaRegSun,
    FaRegStar,
    FaRobot,
    FaQuestion,
    FaPaintBrush,
    FaGem,
    FaFeather,
    FaBreadSlice,
    FaAtom,
    FaGlobe,
  ];

  const gamePlayContext = useContext(GamePlayContext)!;

  const [configs, setConfigs] = useState(createConfigs());

  const [tiles, setTiles] = useState<tileData[]>([]);

  const [openedTiles, setOpenedTiles] = useState<number[]>([]);

  const [pairedTileCount, setPairedTileCount] = useState<number>(0);

  useEffect(restart, [gamePlayContext.configs]);

  useEffect(() => {
    setTiles(generateMap());
  }, [configs]);

  useEffect(closeOpenedTiles, [openedTiles]);

  useEffect(checkIsWon, [pairedTileCount]);

  function restart() {
    setConfigs({ ...createConfigs() });

    setOpenedTiles([]);
    setPairedTileCount(0);
  }

  function createConfigs() {
    return {
      value: gamePlayContext.configs.difficulty,
      size: gamePlayContext.configs.difficulty == difficulty.easy ? 4 : 6,
    };
  }

  function generateMap(): tileData[] {
    const array = shuffle(emojis).slice(0, (configs.size * configs.size) / 2);

    return shuffle(array.concat(array)).map<tileData>((value, i) => {
      return { index: i, value: value, isOpen: false, isPaired: false };
    });
  }

  function openTile(index: number) {
    if (
      openedTiles.length >= 2 ||
      gamePlayContext.gameState === gameStates.ended
    ) {
      return;
    }

    if (gamePlayContext.gameState == gameStates.idle) {
      gamePlayContext.startGame();
    }

    tiles[index].isOpen = true;
    setTiles([...tiles]);

    setOpenedTiles([...openedTiles, index]);
  }

  function closeOpenedTiles() {
    if (openedTiles.length == 2) {
      if (tiles[openedTiles[0]].value === tiles[openedTiles[1]].value) {
        setPairedTileCount(pairedTileCount + 2);
        setOpenedTiles([]);
      } else {
        setTimeout(() => {
          tiles[openedTiles[0]].isOpen = false;
          tiles[openedTiles[1]].isOpen = false;

          setTiles([...tiles]);
          setOpenedTiles([]);
        }, 1000);
      }
    }
  }

  function checkIsWon() {
    if (pairedTileCount === configs.size * configs.size) {
      gamePlayContext.endGame(true);
    }
  }

  return (
    <>
      <Box maxW="550px" w="95vw">
        <VStack spacing={0}>
          <Header>
            <DifficultySelector isNormalEnabled={false} />
            <Clock />
            <></>
          </Header>
          <SimpleGrid w="100%" columns={configs.size} spacing={0.5}>
            {tiles.map((tile, i) => (
              <Tile key={i} tile={tile} openTile={openTile} />
            ))}
          </SimpleGrid>
        </VStack>
      </Box>
      <WinPopup>
        <Clock />
      </WinPopup>
      <GameOverPopup />
    </>
  );
}
