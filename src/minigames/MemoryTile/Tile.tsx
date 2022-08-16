import { AspectRatio, Icon, useColorModeValue } from "@chakra-ui/react";
import { tileData } from "./MemoryTile";
import ReactCardFlip from "react-card-flip";

type TileProps = {
  tile: tileData;
  openTile: (index: number) => void;
};

export default function Tile(props: TileProps) {
  function openTile() {
    props.openTile(props.tile.index);
  }

  function preventRightClick(event: any) {
    event.preventDefault();
  }

  return (
    <ReactCardFlip isFlipped={props.tile.isOpen}>
      <AspectRatio
        bgColor={useColorModeValue("blackAlpha.300", "blackAlpha.400")}
        ratio={1}
        cursor="pointer"
        onClick={openTile}
      >
        <></>
      </AspectRatio>
      <AspectRatio
        bgColor="blackAlpha.100"
        ratio={1}
        onContextMenu={preventRightClick}
      >
        <Icon as={props.tile.value} p="20px" />
      </AspectRatio>
    </ReactCardFlip>
  );
}
