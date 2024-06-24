import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Radio,
  RadioGroup,
  Text,
  useDisclosure,
  Wrap,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import useBackOnClose from "../../hooks/useBackOnClose";
import backOnClose from "../../lib/backOnClose";

export default function DrawerBackOnCloseShowcase() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose("drawerBackOnClose_1", isOpen, onOpen, onClose);
  const initialRef = useRef(null);

  const [placement, setPlacement] = useState<
    "top" | "bottom" | "left" | "right"
  >("right");
  const handlePlacementChange = (nextValue: string) => {
    if (["top", "bottom", "left", "right"].includes(nextValue)) {
      setPlacement(nextValue as "top" | "bottom" | "left" | "right");
    }
  };

  return (
    <>
      <Button onClick={onOpen} className="btn-solid clicky" w={"100%"}>
        Open Drawer
      </Button>

      <Drawer
        isOpen={isOpen}
        onClose={() => {
          backOnClose();
        }}
        initialFocusRef={initialRef}
        placement={placement}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader ref={initialRef}>Drawer</DrawerHeader>
          <DrawerBody className="scrollY">
            <Text mb={2}>Placement</Text>
            <RadioGroup
              onChange={handlePlacementChange}
              value={placement}
              mb={2}
            >
              <Wrap direction="row" spacing={4}>
                <Radio value="top">Top</Radio>
                <Radio value="bottom">Bottom</Radio>
                <Radio value="left">Left</Radio>
                <Radio value="right">Right</Radio>
              </Wrap>
            </RadioGroup>

            <Text mt={8}>Try to back</Text>
          </DrawerBody>
          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
