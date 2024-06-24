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

export default function ModalBackOnClose4() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose("bajingan", isOpen, onOpen, onClose);
  const initialRef = useRef(null);

  return (
    <>
      <Button onClick={onOpen} className="btn-solid clicky">
        Open Modal Nested Again
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
          <ModalHeader ref={initialRef}>Modal Nested Again</ModalHeader>
          <ModalBody className="scrollY" pb={6}>
            <VStack my={"auto"}>
              <Text>Try to back</Text>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
