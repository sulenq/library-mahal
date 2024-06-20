import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
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
import ModalBackOnClose3 from "./ModalBackOnClose3Showcase";

export default function NestedModalBackOnCloseShowcase() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose("nestedModalBackOnClose_2", isOpen, onOpen, onClose);
  const initialRef = useRef(null);

  return (
    <>
      <Button onClick={onOpen} className="btn-solid clicky" w={"100%"}>
        Open Full Modal with Nested Modal
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          backOnClose();
        }}
        initialFocusRef={initialRef}
        size={"full"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader ref={initialRef}>
            Full Modal with Nested Modal
          </ModalHeader>
          <ModalBody pb={6}>
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
