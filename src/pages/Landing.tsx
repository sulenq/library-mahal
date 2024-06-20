import { Heading, HStack, VStack, Wrap } from "@chakra-ui/react";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import ModalBackOnClose from "../components/independent/ModalBackOnClose";
import NestedModalBackOnClose from "../components/independent/NestedModalBackOnClose";
import NestedNestedModalBackOnClose from "../components/independent/NestedNestedModalBackOnClose";
import ComponentShowCaseTitle from "../components/independent/wrapper/ComponentShowCaseTitle";

export default function Landing() {
  return (
    <VStack w={"100%"} align={"stretch"} gap={0} p={6}>
      <HStack justify={"space-between"} mb={6}>
        <Heading>Komponen Mahal</Heading>

        <ColorModeSwitcher />
      </HStack>

      <ComponentShowCaseTitle mb={2}>Modal</ComponentShowCaseTitle>
      <Wrap>
        <ModalBackOnClose />

        <NestedModalBackOnClose />

        <NestedNestedModalBackOnClose />
      </Wrap>

      <ComponentShowCaseTitle mt={6} mb={2}>
        Modal
      </ComponentShowCaseTitle>
      <Wrap></Wrap>
    </VStack>
  );
}
