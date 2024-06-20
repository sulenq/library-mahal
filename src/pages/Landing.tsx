import { Heading, HStack, VStack, Wrap } from "@chakra-ui/react";
import ModalBackOnClose from "../components/independent/ModalBackOnClose";
import NestedModalBackOnClose from "../components/independent/NestedModalBackOnClose";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import NestedNestedModalBackOnClose from "../components/independent/NestedNestedModalBackOnClose";

export default function Landing() {
  return (
    <VStack w={"100%"} align={"stretch"} gap={0} p={6}>
      <HStack justify={"space-between"} mb={6}>
        <Heading>Komponen Mahal</Heading>

        <ColorModeSwitcher />
      </HStack>

      <Wrap>
        <ModalBackOnClose />

        <NestedModalBackOnClose />

        <NestedNestedModalBackOnClose />
      </Wrap>
    </VStack>
  );
}
