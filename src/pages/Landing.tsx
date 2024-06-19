import { Heading, VStack, Wrap } from "@chakra-ui/react";
import ModalBackOnClose from "../components/independent/ModalBackOnClose";

export default function Landing() {
  return (
    <VStack w={"100%"} align={"stretch"} gap={0} p={6}>
      <Heading mx={"auto"}>Komponen Mahal</Heading>

      <Wrap>
        <ModalBackOnClose />
      </Wrap>
    </VStack>
  );
}
