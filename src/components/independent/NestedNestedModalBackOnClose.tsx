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
  VStack,
} from "@chakra-ui/react";
import { useRef } from "react";
import useBackOnClose from "../../hooks/useBackOnClose";
import backOnClose from "../../lib/backOnClose";
import ModalBackOnClose3 from "./ModalBackOnClose3";
import ComponentShowCaseContainer from "./wrapper/ComponentShowCaseContainer";
import ComponentShowCaseTitle from "./wrapper/ComponentShowCaseTitle";

export default function NestedNestedModalBackOnClose() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose("nestedModalBackOnClose_2", isOpen, onOpen, onClose);
  const initialRef = useRef(null);

  return (
    <>
      <ComponentShowCaseContainer>
        <ComponentShowCaseTitle mb={4}>
          Nested Nested Modal Back On Close
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
        size={"full"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader ref={initialRef}>Nested Modal Back On Close</ModalHeader>
          <ModalBody>
            <VStack>
              <ModalBackOnClose3 />
            </VStack>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
