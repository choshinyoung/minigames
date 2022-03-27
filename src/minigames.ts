import MineSweeper from "./minigames/MineSweeper";

import logo from "./logo.svg";

export type minigame = {
  id: string;
  name: string;
  logo: string;
  component: () => JSX.Element;
};

export const minigames: minigame[] = [
  {
    id: "minesweeper",
    name: "지뢰찾기",
    logo: logo,
    component: MineSweeper,
  },
];
