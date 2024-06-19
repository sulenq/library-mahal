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
import ComponentShowCaseContainer from "./wrapper/ComponentShowCaseContainer";
import ComponentShowCaseTitle from "./wrapper/ComponentShowCaseTitle";

export default function ModalBackOnClose() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose("modal_1", isOpen, onOpen, onClose);
  const initialRef = useRef(null);

  return (
    <>
      <ComponentShowCaseContainer>
        <ComponentShowCaseTitle mb={4}>
          Modal Back On Close
        </ComponentShowCaseTitle>

        <Button onClick={onOpen} className="btn-solid clicky" w={"100%"}>
          Open Modal
        </Button>
      </ComponentShowCaseContainer>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          backOnClose(onClose);
        }}
        initialFocusRef={initialRef}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader ref={initialRef}></ModalHeader>
          <ModalBody></ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
