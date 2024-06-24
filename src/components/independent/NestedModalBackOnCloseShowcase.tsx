import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useRef } from "react";
import useBackOnClose from "../../hooks/useBackOnClose";
import backOnClose from "../../lib/backOnClose";
import BackOnCloseButton from "./BackOnCloseButton";
import ModalBackOnClose3 from "./ModalBackOnClose3Showcase";

export default function NestedModalBackOnCloseShowcase() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose("nestedModalBackOnClose_2", isOpen, onOpen, onClose);
  const initialRef = useRef(null);

  return (
    <>
      <Button onClick={onOpen} className="btn-solid clicky" w={"100%"}>
        Open Nested Modal
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          backOnClose();
        }}
        initialFocusRef={initialRef}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader ref={initialRef}>
            <HStack align={"start"} justify={"space-between"}>
              <Text fontSize={20} fontWeight={600}>
                Modal with Nested Modal
              </Text>

              <BackOnCloseButton aria-label="close-back-button" />
            </HStack>
          </ModalHeader>
          <ModalBody className="scrollY" pb={6}>
            <VStack my={"auto"}>
              <Text>Try to back or open modal nested</Text>
              <ModalBackOnClose3 />
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
