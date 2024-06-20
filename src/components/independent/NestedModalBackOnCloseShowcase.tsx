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
import ModalBackOnClose3 from "./ModalBackOnClose3Showcase";
import ComponentShowcaseContainer from "./wrapper/ComponentShowcaseContainer";
import ComponentShowcaseTitle from "./wrapper/ComponentShowcaseTitle";

export default function NestedNestedModalBackOnCloseShowcase() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose("nestedModalBackOnClose_2", isOpen, onOpen, onClose);
  const initialRef = useRef(null);

  return (
    <>
      <ComponentShowcaseContainer flex={"1 1 0"} justify={"space-between"}>
        <ComponentShowcaseTitle mb={4}>
          Nested2 Modal Back On Close
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
