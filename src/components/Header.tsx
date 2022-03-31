import { Divider, SimpleGrid, VStack } from "@chakra-ui/react";
import React from "react";

type HeaderProps = {
  children: React.ReactNode;
};

export default function Header(props: HeaderProps) {
  const childrenCount = Array.isArray(props.children)
    ? props.children.length
    : 1;

  return (
    <VStack w="100%" spacing={0}>
      <Divider />
      <SimpleGrid w="100%" h="50px" columns={childrenCount}>
        {props.children}
      </SimpleGrid>
    </VStack>
  );
}
