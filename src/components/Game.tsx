import { Heading } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

export default function Game() {
  const name = useParams().game;

  return <Heading>No Game. No {name}.</Heading>;
}
