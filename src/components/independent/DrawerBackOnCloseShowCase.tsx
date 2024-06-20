import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import useBackOnClose from "../../hooks/useBackOnClose";
import backOnClose from "../../lib/backOnClose";
import ComponentShowcaseContainer from "./wrapper/ComponentShowcaseContainer";
import ComponentShowcaseTitle from "./wrapper/ComponentShowcaseTitle";

export default function DrawerBackOnCloseShowCase() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose("drawerBackOnClose_1", isOpen, onOpen, onClose);
  const initialRef = useRef(null);

  return (
    <>
      <ComponentShowcaseContainer flex={"1 1 0"} justify={"space-between"}>
        <ComponentShowcaseTitle mb={4}>
          Drawer Back On Close
        </ComponentShowcaseTitle>

        <Button onClick={onOpen} className="btn-solid clicky" w={"100%"}>
          Open Drawer
        </Button>
      </ComponentShowcaseContainer>

      <Drawer
        isOpen={isOpen}
        onClose={() => {
          backOnClose(onClose);
        }}
        initialFocusRef={initialRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader ref={initialRef}>Modal Back On Close</DrawerHeader>
          <DrawerBody></DrawerBody>
          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
