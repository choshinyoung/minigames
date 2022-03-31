import { Center, SimpleGrid, VStack } from "@chakra-ui/react";
import { useState } from "react";
import Header from "../../components/Header";
import Tile from "./Tile";

export type tileData = {
  x: number;
  y: number;
  value: number;
  isOpen: boolean;
};

export default function MineSweeper() {
  const [isMapGenerated, setIsMapGenerated] = useState<boolean>(false);
  const [map, setMap] = useState<tileData[][]>(generateEmptyMap());

  const [mineCount, setMineCount] = useState(0);

  function generateEmptyMap(): tileData[][] {
    return Array(15)
      .fill(null)
      .map((_, i) =>
        Array(15)
          .fill(null)
          .map((_, j) => ({
            y: i,
            x: j,
            value: 0,
            isOpen: false,
          }))
      );
  }

  function generateMap(
    x: number,
    y: number
  ): { map: tileData[][]; mineCount: number } {
    let mineCount = 0;

    const generateValue = (lx: number, ly: number) => {
      if (Math.abs(x - lx) <= 1 && Math.abs(y - ly) <= 1) {
        return 0;
      }

      const value = Math.random() < 0.1 ? -1 : 0;

      if (value === -1) {
        mineCount++;
      }

      return value;
    };

    const map: tileData[][] = Array(15)
      .fill(null)
      .map((_, i) =>
        Array(15)
          .fill(null)
          .map((_, j) => ({
            y: i,
            x: j,
            value: generateValue(j, i),
            isOpen: false,
          }))
      );

    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map.length; x++) {
        if (map[y][x].value === -1) {
          continue;
        }

        let count = 0;

        for (let ly = -1; ly <= 1; ly++) {
          if ((ly === -1 && y === 0) || (ly === 1 && y === map.length - 1)) {
            continue;
          }

          for (let lx = -1; lx <= 1; lx++) {
            if (
              (lx === -1 && x === 0) ||
              (lx === 1 && x === map.length - 1) ||
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

    return { map, mineCount };
  }

  function renderMap(): tileData[] {
    let result: tileData[] = [];

    map.forEach((m) => {
      result = result.concat(m);
    });

    return result;
  }

  function openTile(x: number, y: number) {
    let newMap = map;

    if (!isMapGenerated) {
      const generationResult = generateMap(x, y);
      newMap = generationResult.map;

      setIsMapGenerated(true);
      setMineCount(generationResult.mineCount);
    }

    const _openTile = (x: number, y: number) => {
      newMap[y][x].isOpen = true;

      if (newMap[y][x].value !== 0) {
        return;
      }

      if (
        y !== 0 &&
        newMap[y - 1][x].value !== -1 &&
        !newMap[y - 1][x].isOpen
      ) {
        _openTile(x, y - 1);
      }
      if (
        x !== 0 &&
        newMap[y][x - 1].value !== -1 &&
        !newMap[y][x - 1].isOpen
      ) {
        _openTile(x - 1, y);
      }
      if (
        y !== newMap.length - 1 &&
        newMap[y + 1][x].value !== -1 &&
        !newMap[y + 1][x].isOpen
      ) {
        _openTile(x, y + 1);
      }
      if (
        x !== newMap.length - 1 &&
        newMap[y][x + 1].value !== -1 &&
        !newMap[y][x + 1].isOpen
      ) {
        _openTile(x + 1, y);
      }
    };

    _openTile(x, y);

    setMap([...newMap]);
  }

  return (
    <VStack spacing={0}>
      <Header>
        <Center>Mine Count: {mineCount}</Center>
        <Center>This is Header</Center>
      </Header>
      <SimpleGrid w="100%" columns={15} spacing={1}>
        {renderMap().map((tile, i) => (
          <Tile key={i} tile={tile} openTile={openTile} />
        ))}
      </SimpleGrid>
    </VStack>
  );
}
