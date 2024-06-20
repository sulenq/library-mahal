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
import ComponentShowcaseTitle from "./wrapper/ComponentShowcaseTitle";

export default function ModalBackOnCloseShowcase() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose("modalBackOnClose_1", isOpen, onOpen, onClose);
  const initialRef = useRef(null);

  return (
    <>
      <ComponentShowcaseContainer flex={"1 1 0"} justify={"space-between"}>
        <ComponentShowcaseTitle mb={4}>
          Modal Back On Close
        </ComponentShowcaseTitle>

        <Button onClick={onOpen} className="btn-solid clicky" w={"100%"}>
          Open Modal
        </Button>
      </ComponentShowcaseContainer>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          backOnClose(onClose);
        }}
        initialFocusRef={initialRef}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader ref={initialRef}>Modal Back On Close</ModalHeader>
          <ModalBody></ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
