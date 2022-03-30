import { AspectRatio, Text } from "@chakra-ui/react";
import If from "../../components/If";
import { tileData } from "./MineSweeper";

type TileProps = {
  tile: tileData;
  openTile: (y: number, x: number) => void;
};

export default function Tile(props: TileProps) {
  function onClick() {
    if (props.tile.isOpen) {
      return;
    }

    props.openTile(props.tile.y, props.tile.x);
  }

  return (
    <AspectRatio
      bgColor={
        !props.tile.isOpen
          ? "blackAlpha.100"
          : props.tile.value === 0
          ? "blackAlpha.300"
          : props.tile.value === -1
          ? "red.200"
          : props.tile.value === 1
          ? "blue.200"
          : props.tile.value === 2
          ? "green.200"
          : "yellow.200"
      }
      ratio={1}
      cursor={props.tile.isOpen ? "" : "pointer"}
      onClick={onClick}
    >
      <If condition={props.tile.value !== 0 && props.tile.isOpen}>
        <Text>{props.tile.value}</Text>
      </If>
    </AspectRatio>
  );
}
