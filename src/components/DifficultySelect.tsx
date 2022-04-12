import { useContext } from "react";
import { Center, Select } from "@chakra-ui/react";
import { GamePlayContext } from "./GamePlay";
import { difficulty } from "../lib/difficulty";

export default function DifficultySelect() {
  const gamePlayContext = useContext(GamePlayContext)!;

  function setDifficulty(selected: any) {
    gamePlayContext.setDifficulty(selected.target.value);
  }

  return (
    <Center w="100px">
      <Select onChange={setDifficulty}>
        <option value={difficulty.easy}>easy</option>
        <option value={difficulty.normal}>normal</option>
        <option value={difficulty.hard}>hard</option>
      </Select>
    </Center>
  );
}
