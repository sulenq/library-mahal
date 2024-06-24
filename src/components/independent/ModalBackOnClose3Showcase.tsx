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
import ModalBackOnClose4 from "./ModalBackOnClose4Showcase";

export default function ModalBackOnClose3Showcase() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose("modalBackOnClose_3", isOpen, onOpen, onClose);
  const initialRef = useRef(null);

  return (
    <>
      <Button onClick={onOpen} className="btn-solid clicky">
        Open Modal Nested
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
          <ModalCloseButton />
          <ModalHeader ref={initialRef}>Modal Nested</ModalHeader>
          <ModalBody className="scrollY" pb={6}>
            <VStack my={"auto"}>
              <Text>Try to back or open modal nested again</Text>
              <ModalBackOnClose4 />
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
