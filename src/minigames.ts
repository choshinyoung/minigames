import MineSweeper from "./minigames/MineSweeper";
import MemoryTile from "./minigames/MemoryTile";

import logo from "./logo.svg";

export type minigame = {
  id: string;
  name: string;
  logo: string;
  component: () => JSX.Element;
};

export const minigames: minigame[] = [
  {
    id: "MineSweeper",
    name: "지뢰찾기",
    logo: logo,
    component: MineSweeper,
  },
  {
    id: "MemoryTile",
    name: "메모리 타일",
    logo: logo,
    component: MemoryTile,
  },
];
