import React from "react";
import { Box, useColorModeValue } from "@chakra-ui/react";

type PopupProps = {
  children: React.ReactNode;
};

export default function Popup(props: PopupProps) {
  return (
    <Box
      w="250px"
      p={3}
      bgColor={useColorModeValue("blackAlpha.200", "blackAlpha.500")}
      backdropFilter="auto"
      backdropBlur="2px"
      borderRadius={5}
      position="absolute"
    >
      {props.children}
    </Box>
  );
}
