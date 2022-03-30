import { SimpleGrid, VStack } from "@chakra-ui/react";
import { useState } from "react";
import GamePlayHeader from "../../components/GamePlayHeader";
import Tile from "./Tile";

export type tileData = {
  x: number;
  y: number;
  value: number;
  isOpen: boolean;
};

export default function MineSweeper() {
  const [map, setMap] = useState(generateMap());

  function generateMap(): tileData[][] {
    const map: tileData[][] = Array(15)
      .fill(null)
      .map((_, i) =>
        Array(15)
          .fill(null)
          .map((_, j) => ({
            y: i,
            x: j,
            value: Math.random() < 0.1 ? -1 : 0,
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

    return map;
  }

  function renderMap(): tileData[] {
    let result: tileData[] = [];

    map.forEach((m) => {
      result = result.concat(m);
    });

    return result;
  }

  function openTile(y: number, x: number) {
    const _openTile = (y: number, x: number) => {
      map[y][x].isOpen = true;

      if (map[y][x].value !== 0) {
        return;
      }

      if (y !== 0 && map[y - 1][x].value !== -1 && !map[y - 1][x].isOpen) {
        _openTile(y - 1, x);
      }
      if (x !== 0 && map[y][x - 1].value !== -1 && !map[y][x - 1].isOpen) {
        _openTile(y, x - 1);
      }
      if (
        y !== map.length - 1 &&
        map[y + 1][x].value !== -1 &&
        !map[y + 1][x].isOpen
      ) {
        _openTile(y + 1, x);
      }
      if (
        x !== map.length - 1 &&
        map[y][x + 1].value !== -1 &&
        !map[y][x + 1].isOpen
      ) {
        _openTile(y, x + 1);
      }
    };

    _openTile(y, x);

    setMap([...map]);
  }

  return (
    <VStack spacing={0}>
      <GamePlayHeader />
      <SimpleGrid w="100%" columns={15} spacing={1}>
        {renderMap().map((tile, i) => (
          <Tile key={i} tile={tile} openTile={openTile} />
        ))}
      </SimpleGrid>
    </VStack>
  );
}
