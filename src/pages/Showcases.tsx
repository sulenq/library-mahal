import {
  Alert,
  AlertIcon,
  Box,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import ConfirmationBasedInputSection from "../components/independent/showcasesSection/ConfirmationBasedInputSection";
import HooksSection from "../components/independent/showcasesSection/HooksSection";
import { useContentBgColor, useWarningColor } from "../constant/colors";
import InputSection from "../components/independent/showcasesSection/InputSection";

export default function Showcases() {
  return (
    <VStack bg={useContentBgColor()} minH={"100vh"}>
      <VStack
        w={"100%"}
        maxW={"1440px"}
        mx={"auto"}
        align={"stretch"}
        gap={0}
        p={[4, 5, 6]}
      >
        <HStack justify={"space-between"} mb={8} align={"start"}>
          <Wrap spacingY={6} align={"center"}>
            <Image src="/logoBg.png" borderRadius={"full"} h={"38px"} mr={2} />
            <Heading>Distro Components + Library</Heading>
          </Wrap>

          <ColorModeSwitcher borderRadius={"full"} />
        </HStack>

        <Alert status="warning" mb={8} w={"100%"} maxW={"100%"}>
          <Box>
            <HStack gap={0} mb={2}>
              <AlertIcon />
              <Text fontSize={18} fontWeight={600} color={useWarningColor()}>
                Requirement
              </Text>
            </HStack>

            <Text fontWeight={600}>Must have ChakraUI in your project</Text>
            <Text>
              must install these package : @remixicon/react react-date-picker
            </Text>
          </Box>
        </Alert>

        <VStack align={"stretch"} spacing={5}>
          <InputSection />

          <ConfirmationBasedInputSection />

          <HooksSection />
        </VStack>
      </VStack>
    </VStack>
  );
}
