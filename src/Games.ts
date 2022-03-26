import logo from "./logo.svg";

export type Game = {
  id: string;
  name: string;
  logo: string;
  component: (() => JSX.Element) | null;
};

export const Games: Game[] = [
  {
    id: "patrickKR",
    name: "PatrickKR",
    logo: logo,
    component: null,
  },
];
