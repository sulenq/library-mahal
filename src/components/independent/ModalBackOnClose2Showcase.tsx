import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import useBackOnClose from "../../hooks/useBackOnClose";
import backOnClose from "../../lib/backOnClose";
import ComponentShowcaseContainer from "./wrapper/ComponentShowcaseContainer";

export default function ModalBackOnClose2Showcase() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose("modalBackOnClose_2", isOpen, onOpen, onClose);
  const initialRef = useRef(null);

  return (
    <>
      <ComponentShowcaseContainer title="Modal Back On Close">
        <Button onClick={onOpen} className="btn-solid clicky" w={"100%"}>
          Open Modal
        </Button>
      </ComponentShowcaseContainer>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          backOnClose();
        }}
        initialFocusRef={initialRef}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader ref={initialRef}>Modal Back On Close</ModalHeader>
          <ModalBody className="scrollY"></ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
