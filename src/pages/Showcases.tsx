import { Heading, HStack, Image, VStack, Wrap } from "@chakra-ui/react";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import ConfirmationBasedInputSection from "../components/independent/landingSections/ConfirmationBasedInputSection";
import HooksSection from "../components/independent/landingSections/HooksSection";

export default function Showcases() {
  return (
    <VStack bg={"var(--divider)"} minH={"100vh"}>
      <VStack
        w={"100%"}
        maxW={"1440px"}
        mx={"auto"}
        align={"stretch"}
        gap={0}
        p={6}
      >
        <HStack justify={"space-between"} mb={8}>
          <HStack>
            <Image src="/logo192.png" borderRadius={"full"} h={"38px"} mr={2} />
            <Heading>Library Mahal Distro Studio</Heading>
          </HStack>

          <ColorModeSwitcher />
        </HStack>

        <Wrap align={"stretch"} spacing={5}>
          <ConfirmationBasedInputSection />

          <HooksSection />
        </Wrap>
      </VStack>
    </VStack>
  );
}
