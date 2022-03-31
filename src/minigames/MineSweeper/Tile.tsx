import { AspectRatio, Text } from "@chakra-ui/react";
import If from "../../components/If";
import { tileData } from "./MineSweeper";

type TileProps = {
  tile: tileData;
  openTile: (y: number, x: number) => void;
};

export default function Tile(props: TileProps) {
  function onClick() {
    props.openTile(props.tile.x, props.tile.y);
  }

  return (
    <If condition={props.tile.isOpen}>
      <AspectRatio
        bgColor="blackAlpha.100"
        color={
          props.tile.value === 0
            ? "blackAlpha.100"
            : props.tile.value === -1
            ? "red.300"
            : props.tile.value === 1
            ? "blue.300"
            : props.tile.value === 2
            ? "green.300"
            : props.tile.value === 3
            ? "orange.300"
            : "yellow.300"
        }
        ratio={1}
      >
        <If condition={props.tile.value !== 0}>
          <Text>{props.tile.value}</Text>
        </If>
      </AspectRatio>
      <AspectRatio
        bgColor="blackAlpha.300"
        ratio={1}
        cursor="pointer"
        onClick={onClick}
      >
        <></>
      </AspectRatio>
    </If>
  );
}

/*

    <AspectRatio
      color={
        !props.tile.isOpen
          ? "blackAlpha.300"
          : props.tile.value === 0
          ? "blackAlpha.100"
          : props.tile.value === -1
          ? "red.100"
          : props.tile.value === 1
          ? "blue.100"
          : props.tile.value === 2
          ? "green.100"
          : props.tile.value === 3
          ? "orange.100"
          : "yellow.100"
      }
      ratio={1}
      cursor={props.tile.isOpen ? "" : "pointer"}
      onClick={onClick}
    >
      <If condition={props.tile.value !== 0 && props.tile.isOpen}>
        <Text>{props.tile.value}</Text>
      </If>
    </AspectRatio>
 */
