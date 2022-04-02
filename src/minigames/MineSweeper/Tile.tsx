import { AspectRatio, Text } from "@chakra-ui/react";
import If from "../../components/If";
import { tileData } from "./MineSweeper";
import { FaBomb, FaFlag } from "react-icons/fa";

type TileProps = {
  tile: tileData;
  openTile: (y: number, x: number) => void;
  markTile: (y: number, x: number) => void;
  unmarkTile: (y: number, x: number) => void;
};

export default function Tile(props: TileProps) {
  function openTile() {
    props.openTile(props.tile.x, props.tile.y);
  }

  function toggleIsMarked(event: any) {
    preventRightClick(event);

    if (props.tile.isMarked) {
      props.unmarkTile(props.tile.x, props.tile.y);
    } else {
      props.markTile(props.tile.x, props.tile.y);
    }
  }

  function preventRightClick(event: any) {
    event.preventDefault();
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
        onContextMenu={preventRightClick}
      >
        <If condition={props.tile.value !== 0}>
          <If condition={props.tile.value !== -1}>
            <Text fontSize="sm">{props.tile.value}</Text>
            <FaBomb />
          </If>
        </If>
      </AspectRatio>
      <If condition={props.tile.isMarked}>
        <AspectRatio
          bgColor="blackAlpha.300"
          ratio={1}
          cursor="pointer"
          onContextMenu={toggleIsMarked}
        >
          <FaFlag color="black" />
        </AspectRatio>
        <AspectRatio
          bgColor="blackAlpha.300"
          ratio={1}
          cursor="pointer"
          onClick={openTile}
          onContextMenu={toggleIsMarked}
        >
          <></>
        </AspectRatio>
      </If>
    </If>
  );
}
