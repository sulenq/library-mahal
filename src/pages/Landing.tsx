import { Heading, HStack, VStack } from "@chakra-ui/react";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import InputSection from "../components/independent/landingSections/InputSection";
import ModalSection from "../components/independent/landingSections/ModalSection";

export default function Landing() {
  return (
    <VStack
      w={"100%"}
      maxW={"1440px"}
      mx={"auto"}
      align={"stretch"}
      gap={0}
      p={6}
    >
      <HStack justify={"space-between"} mb={6}>
        <Heading>Komponen Mahal</Heading>

        <ColorModeSwitcher />
      </HStack>

      <VStack align={"stretch"} gap={6}>
        <ModalSection />

        <InputSection />
      </VStack>
    </VStack>
  );
}
