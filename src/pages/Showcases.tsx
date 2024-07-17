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
import { Link } from "react-router-dom";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import ConfirmationBasedInputSection from "../components/independent/showcasesSection/ConfirmationBasedInputSection";
import HooksSection from "../components/independent/showcasesSection/HooksSection";
import InputSection from "../components/independent/showcasesSection/InputSection";
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
        p={[4, 5, 6]}
      >
        <HStack justify={"space-between"} mb={8} align={"start"}>
          <Wrap spacingY={6} align={"center"}>
            <Image src="/logoBg.png" borderRadius={"full"} h={"38px"} mr={2} />
            <Heading>Distro Reusable Components & Library</Heading>
          </Wrap>

          <ColorModeSwitcher borderRadius={"full"} />
        </HStack>

        <Text fontWeight={600} mb={4} opacity={0.6}>
          This library will keep updating
        </Text>

        <Alert status="warning" mb={8} w={"100%"} maxW={"100%"}>
          <Box>
            <HStack gap={0} mb={2}>
              <AlertIcon />
              <Text fontSize={18} fontWeight={600} color={useWarningColor()}>
                Requirement
              </Text>
            </HStack>

            <Text fontWeight={600}>Must have ChakraUI in your project</Text>
            <Text
              color={"p.500"}
              as={Link}
              to={"https://v2.chakra-ui.com/getting-started"}
              target="_blank"
              fontWeight={600}
            >
              Chakra UI Documentation
            </Text>

            <Text mt={2}>and you must install these package :</Text>
            <Text>
              npm install @remixicon/react axios chart.js formik react-chartjs-2
              react-day-picker react-router-dom typescript-cookie yup zustand
            </Text>
            {/* <UnorderedList>
              <ListItem>
                <Text>@remixicon/react</Text>
              </ListItem>
              <ListItem>
                <Text>react-date-picker</Text>
              </ListItem>
            </UnorderedList> */}
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
