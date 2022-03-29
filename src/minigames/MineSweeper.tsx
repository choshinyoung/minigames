import { AspectRatio, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import GamePlayHeader from "../components/GamePlayHeader";

export default function MineSweeper() {
  const [map, setMap] = useState(generateMap());

  function generateMap(): number[][] {
    const map: number[][] = Array(15)
      .fill(null)
      .map(() =>
        Array(15)
          .fill(null)
          .map(() => (Math.random() < 0.1 ? -1 : 0))
      );

    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map.length; x++) {
        if (map[y][x] === -1) {
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

            if (map[y + ly][x + lx] === -1) {
              count++;
            }
          }
        }

        map[y][x] = count;
      }
    }

    return map;
  }

  function renderMap(): number[] {
    let result: number[] = [];

    map.forEach((m) => {
      result = result.concat(m);
    });

    return result;
  }

  return (
    <VStack spacing={0}>
      <GamePlayHeader />
      <SimpleGrid w="100%" columns={15} spacing={1}>
        {renderMap().map((tile, i) => (
          <AspectRatio
            key={i}
            bgColor={
              tile === 0
                ? "blackAlpha.100"
                : tile === -1
                ? "red.200"
                : tile === 1
                ? "blue.200"
                : tile === 2
                ? "green.200"
                : "yellow.200"
            }
            ratio={1}
          >
            <Text>{tile}</Text>
          </AspectRatio>
        ))}
      </SimpleGrid>
    </VStack>
  );
}
