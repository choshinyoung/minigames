import { Center, Divider, Grid, VStack } from "@chakra-ui/react";

export default function GamePlayHeader() {
  return (
    <VStack w="100%" spacing={0}>
      <Divider />
      <Grid w="100%" h="50px">
        <Center>This is Header</Center>
      </Grid>
    </VStack>
  );
}
