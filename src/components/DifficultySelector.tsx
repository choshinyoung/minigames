import { useContext } from "react";
import { Center, Select } from "@chakra-ui/react";
import { GamePlayContext } from "./GamePlay";
import { difficulty } from "../lib/difficulty";
import If from "../components/If";

type DifficultySelectorProps = {
  isNormalEnabled?: boolean;
};

export default function DifficultySelector({
  isNormalEnabled,
}: DifficultySelectorProps) {
  isNormalEnabled = isNormalEnabled == null ? true : isNormalEnabled;

  const gamePlayContext = useContext(GamePlayContext)!;

  function setDifficulty(selected: any) {
    gamePlayContext.setDifficulty(selected.target.value);
  }

  return (
    <Center w="100px">
      <Select onChange={setDifficulty}>
        <option value={difficulty.easy}>easy</option>
        <If condition={isNormalEnabled}>
          <option value={difficulty.normal}>normal</option>
        </If>
        <option value={difficulty.hard}>hard</option>
      </Select>
    </Center>
  );
}
