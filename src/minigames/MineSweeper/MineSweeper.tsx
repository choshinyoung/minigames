import {
  Box,
  Center,
  Icon,
  Select,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import Header from "../../components/Header";
import Tile from "./Tile";
import { FaClock, FaFlag } from "react-icons/fa";
import { GamePlayContext } from "../../components/GamePlay";
import { gameStates } from "../../lib/gameStates";
import { difficulty } from "../../lib/difficulty";
import { useWindowSizeValue } from "../../utils";

export type tileData = {
  x: number;
  y: number;
  value: number;
  isOpen: boolean;
  isMarked: boolean;
};

export default function MineSweeper() {
  const gamePlayContext = useContext(GamePlayContext)!;

  const smallSize = useWindowSizeValue({ w: 10, h: 10 }, { w: 8, h: 13 });
  const normalSize = useWindowSizeValue({ w: 20, h: 20 }, { w: 16, h: 25 });

  const configs = {
    size:
      gamePlayContext.configs.difficulty === difficulty.easy
        ? smallSize
        : normalSize,
    mineCount:
      gamePlayContext.configs.difficulty === difficulty.easy
        ? 10
        : gamePlayContext.configs.difficulty === difficulty.normal
        ? 50
        : 70,
  };

  const [map, setMap] = useState<tileData[][]>(generateEmptyMap());

  const [mineCount, setMineCount] = useState(0);

  function generateEmptyMap(): tileData[][] {
    return Array(configs.size.h)
      .fill(null)
      .map((_, i) =>
        Array(configs.size.w)
          .fill(null)
          .map((_, j) => ({
            y: i,
            x: j,
            value: 0,
            isOpen: false,
            isMarked: false,
          }))
      );
  }

  function generateMap(x: number, y: number): tileData[][] {
    let mineCount = 0;

    const map: tileData[][] = generateEmptyMap();

    while (mineCount < configs.mineCount) {
      const lx = Math.round(Math.random() * (configs.size.w - 1)),
        ly = Math.round(Math.random() * (configs.size.h - 1));

      if (map[ly][lx].value === -1) {
        continue;
      }

      if (Math.abs(x - lx) <= 1 && Math.abs(y - ly) <= 1) {
        continue;
      }

      map[ly][lx].value = -1;

      mineCount++;
    }

    for (let y = 0; y < configs.size.h; y++) {
      for (let x = 0; x < configs.size.w; x++) {
        if (map[y][x].value === -1) {
          continue;
        }

        let count = 0;

        for (let ly = -1; ly <= 1; ly++) {
          if (
            (ly === -1 && y === 0) ||
            (ly === 1 && y === configs.size.h - 1)
          ) {
            continue;
          }

          for (let lx = -1; lx <= 1; lx++) {
            if (
              (lx === -1 && x === 0) ||
              (lx === 1 && x === configs.size.w - 1) ||
              (lx === 0 && ly === 0)
            ) {
              continue;
            }

            if (map[y + ly][x + lx].value === -1) {
              count++;
            }
          }
        }

        map[y][x].value = count;
      }
    }

    return map;
  }

  function renderMap(): tileData[] {
    let result: tileData[] = [];

    map.forEach((m) => {
      result = result.concat(m);
    });

    return result;
  }

  function openTile(x: number, y: number) {
    if (gamePlayContext.gameState === gameStates.ended) {
      return;
    }

    let newMap = map;

    if (gamePlayContext.gameState === gameStates.idle) {
      newMap = generateMap(x, y);

      setMineCount(configs.mineCount);

      gamePlayContext.startGame();
    }

    if (newMap[y][x].value === -1) {
      gamePlayContext.gameOver();
    } else if (
      mineCount === 0 &&
      getOpenedTilesCount() ===
        configs.size.w * configs.size.h - configs.mineCount - 1
    ) {
      gamePlayContext.win();
    }

    const _openTile = (x: number, y: number) => {
      newMap[y][x].isOpen = true;

      if (newMap[y][x].value !== 0) {
        return;
      }

      for (let ly = -1; ly <= 1; ly++) {
        if ((ly === -1 && y === 0) || (ly === 1 && y === map.length - 1)) {
          continue;
        }

        for (let lx = -1; lx <= 1; lx++) {
          if (
            (lx === -1 && x === 0) ||
            (lx === 1 && x === map[y + ly].length - 1) ||
            (lx === 0 && ly === 0)
          ) {
            continue;
          }

          if (!newMap[y + ly][x + lx].isOpen) {
            _openTile(x + lx, y + ly);
          }
        }
      }
    };

    _openTile(x, y);

    setMap([...newMap]);
  }

  function markTile(x: number, y: number, isMarking: boolean) {
    if (gamePlayContext.gameState !== gameStates.playing) {
      return;
    }

    map[y][x].isMarked = isMarking;

    if (
      mineCount === 1 &&
      getOpenedTilesCount() ===
        configs.size.w * configs.size.h - configs.mineCount
    ) {
      gamePlayContext.win();
    }

    setMap([...map]);
    setMineCount(mineCount + (isMarking ? -1 : 1));
  }

  function getOpenedTilesCount() {
    let count = 0;

    map.forEach((row) =>
      row.forEach((tile) => {
        if (tile.isOpen) {
          count++;
        }
      })
    );

    return count;
  }

  function setDifficulty(selected: any) {
    gamePlayContext.setDifficulty(selected.target.value);
  }

  return (
    <Box maxW="550px" w="95vw">
      <VStack spacing={0}>
        <Header>
          <Center w="100px">
            <Select onChange={setDifficulty}>
              <option value={difficulty.easy}>easy</option>
              <option value={difficulty.normal}>normal</option>
              <option value={difficulty.hard}>hard</option>
            </Select>
          </Center>
          <Center>
            <Icon as={FaClock} p="4px" />
            <Text p={2}>
              {Math.floor(gamePlayContext.timer / 60)} :{" "}
              {gamePlayContext.timer % 60}
            </Text>
          </Center>
          <Center>
            <Icon as={FaFlag} p="4px" />
            <Text p={2}>{mineCount}</Text>
          </Center>
        </Header>
        <SimpleGrid w="100%" columns={configs.size.w} spacing={0.5}>
          {renderMap().map((tile, i) => (
            <Tile key={i} tile={tile} openTile={openTile} markTile={markTile} />
          ))}
        </SimpleGrid>
      </VStack>
    </Box>
  );
}
