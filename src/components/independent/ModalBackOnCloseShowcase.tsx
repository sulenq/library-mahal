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
} from "@chakra-ui/react";
import { useRef } from "react";
import useBackOnClose from "../../hooks/useBackOnClose";
import backOnClose from "../../lib/backOnClose";

export default function ModalBackOnCloseShowcase() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose("modalBackOnClose_1", isOpen, onOpen, onClose);
  const initialRef = useRef(null);

  return (
    <>
      <Button onClick={onOpen} className="btn-solid clicky" w={"100%"}>
        Open Modal
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
          <ModalHeader ref={initialRef}>Modal</ModalHeader>
          <ModalBody className="scrollY" pb={6}>
            <Text m={"auto"}>Try to back</Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
