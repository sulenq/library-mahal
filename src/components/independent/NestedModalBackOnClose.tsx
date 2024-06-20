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
import ModalBackOnClose2 from "./ModalBackOnClose2";
import ComponentShowCaseContainer from "./wrapper/ComponentShowCaseContainer";
import ComponentShowCaseTitle from "./wrapper/ComponentShowCaseTitle";

export default function NestedModalBackOnClose() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose("nestedModalBackOnClose_1", isOpen, onOpen, onClose);
  const initialRef = useRef(null);

  return (
    <>
      <ComponentShowCaseContainer flex={"1 1 0"}>
        <ComponentShowCaseTitle mb={4}>
          Nested Modal Back On Close
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
              <ModalBackOnClose2 />
            </VStack>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
