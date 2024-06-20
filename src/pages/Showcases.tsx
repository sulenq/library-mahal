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
import ConfirmationBasedInputSection from "../components/independent/landingSections/ConfirmationBasedInputSection";
import HooksSection from "../components/independent/landingSections/HooksSection";
import { useContentBgColor, useWarningColor } from "../constant/colors";

export default function Showcases() {
  return (
    <VStack bg={useContentBgColor()} minH={"100vh"}>
      <VStack
        w={"100%"}
        maxW={"1440px"}
        mx={"auto"}
        align={"stretch"}
        gap={0}
        p={6}
      >
        <HStack justify={"space-between"} mb={8} align={"start"}>
          <Wrap spacingY={6} align={"center"}>
            <Image src="/logo192.png" borderRadius={"full"} h={"38px"} mr={2} />
            <Heading>Library Mahal Distro Studio</Heading>
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

            <Text>npm i @remixicon/react react-date-picker</Text>
          </Box>
        </Alert>

        <VStack align={"stretch"} spacing={5}>
          <ConfirmationBasedInputSection />

          <HooksSection />
        </VStack>
      </VStack>
    </VStack>
  );
}
