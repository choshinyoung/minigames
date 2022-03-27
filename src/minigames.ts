import logo from "./logo.svg";

export type minigame = {
  id: string;
  name: string;
  logo: string;
  component: (() => JSX.Element) | null;
};

export const minigames: minigame[] = [
  {
    id: "patrickKR",
    name: "PatrickKR",
    logo: logo,
    component: null,
  },
];
