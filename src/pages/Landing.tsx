import {
  Alert,
  AlertIcon,
  Heading,
  HStack,
  Text,
  VStack,
  Wrap,
} from "@chakra-ui/react";
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

      <ComponentShowCaseTitle>Modal</ComponentShowCaseTitle>

      <Alert
        status="info"
        alignItems={"start"}
        w={"100% !important"}
        maxW={"100% !important"}
        my={2}
      >
        <AlertIcon />
        <Text>
          using <b>useBackOnClose</b> hooks with required props (id, isOpen,
          onOpen, onClose)
        </Text>
      </Alert>

      <Wrap>
        <ModalBackOnClose />

        <NestedModalBackOnClose />

        <NestedNestedModalBackOnClose />
      </Wrap>

      <ComponentShowCaseTitle mt={6}>Input Component</ComponentShowCaseTitle>

      <Alert
        status="info"
        alignItems={"start"}
        w={"100% !important"}
        maxW={"100% !important"}
        my={2}
      >
        <AlertIcon />
        Chakra is going live on August 30th. Get ready!
      </Alert>

      <Wrap></Wrap>
    </VStack>
  );
}
