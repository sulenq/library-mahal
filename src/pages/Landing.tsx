import { Heading, HStack, VStack } from "@chakra-ui/react";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import InputSection from "../components/independent/landingSections/InputSection";
import UseBackOnCloseSection from "../components/independent/landingSections/UseBackOnCloseSection";

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
        <Heading>Library Mahal</Heading>

        <ColorModeSwitcher />
      </HStack>

      <VStack align={"stretch"} gap={6}>
        <UseBackOnCloseSection />

        <InputSection />
      </VStack>
    </VStack>
  );
}
