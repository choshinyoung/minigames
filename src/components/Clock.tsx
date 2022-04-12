import { useContext } from "react";
import { Center, Icon, Text } from "@chakra-ui/react";
import { GamePlayContext } from "./GamePlay";
import { FaClock } from "react-icons/fa";

export default function Clock() {
  const gamePlayContext = useContext(GamePlayContext)!;

  return (
    <Center>
      <Icon as={FaClock} p="4px" />
      <Text p={2}>
        {Math.floor(gamePlayContext.timer / 60)} : {gamePlayContext.timer % 60}
      </Text>
    </Center>
  );
}
