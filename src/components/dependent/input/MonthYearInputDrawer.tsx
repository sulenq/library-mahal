import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Icon,
  IconButton,
  Input,
  SimpleGrid,
  StackProps,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react";
import { Dispatch, useRef, useState } from "react";
import { useDarkLightColor, useLightDarkColor } from "../../../constant/colors";
import months from "../../../constant/months";
import { iconSize } from "../../../constant/sizes";
import useBackOnClose from "../../../hooks/useBackOnClose";
import backOnClose from "../../../lib/backOnClose";
import formatDate from "../../../lib/formatDate";
import parseNumber from "../../../lib/parseNumber";
import BackOnCloseButton from "../../independent/BackOnCloseButton";

interface Props extends StackProps {
  id: string;
  bulan: number;
  setBulan: Dispatch<number>;
  tahun: number;
  setTahun: Dispatch<number>;
  setDate: Dispatch<Date>;
  placement?: "top" | "bottom" | "left" | "right";
}

export default function MonthYearInputDrawer({
  id,
  bulan,
  setBulan,
  tahun,
  setTahun,
  setDate,
  placement = "bottom",
  ...props
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  useBackOnClose(
    id || "datepicker_month_year_input_modal",
    isOpen,
    onOpen,
    onClose
  );

  const [startPos, setStartPos] = useState(0);
  const [translate, setTranslate] = useState(0);
  const drawerBodyRef = useRef<HTMLDivElement>(null);
  const isSideDrawer = placement === "left" || placement === "right";
  const isLeftOrTopDrawer = placement === "left" || placement === "top";
  const onTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    setStartPos(
      isSideDrawer ? event.touches[0].clientX : event.touches[0].clientY
    );
  };
  const onTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    const currentPos = isSideDrawer
      ? event.touches[0].clientX
      : event.touches[0].clientY;
    const diffPos = currentPos - startPos;
    if (isLeftOrTopDrawer ? diffPos < 0 : diffPos > 0) {
      // Swipe
      setTranslate(diffPos);
      if (drawerBodyRef.current) {
        drawerBodyRef.current.style.transition = "0ms";
        drawerBodyRef.current.style.transform = isSideDrawer
          ? `translateX(${diffPos}px)`
          : `translateY(${diffPos}px)`;
      }
    }
  };
  const onTouchEnd = () => {
    if (drawerBodyRef.current !== null) {
      const comparison = isSideDrawer
        ? isLeftOrTopDrawer
          ? (drawerBodyRef.current.offsetWidth / 6) * -1
          : drawerBodyRef.current.offsetWidth / 6
        : isLeftOrTopDrawer
        ? (drawerBodyRef.current.offsetHeight / 6) * -1
        : drawerBodyRef.current.offsetHeight / 6;
      if (isLeftOrTopDrawer ? translate < comparison : translate > comparison) {
        onClose();
      } else {
        if (drawerBodyRef.current) {
          drawerBodyRef.current.style.transition = "200ms";
          drawerBodyRef.current.style.transform = isSideDrawer
            ? `translateX(0px)`
            : `translateY(0px)`;
        }
      }
    }

    setTranslate(0);
  };

  const [bulanLocal, setBulanLocal] = useState<number>(bulan);
  const [tahunLocal, setTahunLocal] = useState<number>(tahun);

  const isTahunValid = (tahun: number) => {
    return tahun >= 100 && tahun <= 270000;
  };

  const intervalIncrementRef = useRef<ReturnType<typeof setInterval> | null>(
    null
  );
  const timeoutIncrementRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  const intervalDecrementRef = useRef<ReturnType<typeof setInterval> | null>(
    null
  );
  const timeoutDecrementRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  function handleMouseDownIncrement() {
    if (timeoutIncrementRef.current || intervalIncrementRef.current) return;

    timeoutIncrementRef.current = setTimeout(() => {
      intervalIncrementRef.current = setInterval(() => {
        setTahunLocal((ps) => ps + 1);
      }, 100);
    }, 300);
  }
  function handleMouseUpIncrement() {
    if (timeoutIncrementRef.current) {
      clearTimeout(timeoutIncrementRef.current);
      timeoutIncrementRef.current = null;
    }
    if (intervalIncrementRef.current) {
      clearInterval(intervalIncrementRef.current);
      intervalIncrementRef.current = null;
    }
  }
  function handleMouseDownDecrement() {
    if (timeoutDecrementRef.current || intervalDecrementRef.current) return;

    timeoutDecrementRef.current = setTimeout(() => {
      intervalDecrementRef.current = setInterval(() => {
        if (tahunLocal > 0) {
          setTahunLocal((ps) => ps - 1);
        }
      }, 100);
    }, 300);
  }
  function handleMouseUpDecrement() {
    if (timeoutDecrementRef.current) {
      clearTimeout(timeoutDecrementRef.current);
      timeoutDecrementRef.current = null;
    }
    if (intervalDecrementRef.current) {
      clearInterval(intervalDecrementRef.current);
      intervalDecrementRef.current = null;
    }
  }

  function onConfirm() {
    setBulan(bulanLocal);
    setTahun(tahunLocal);
    setDate(new Date(tahunLocal, bulanLocal));
    backOnClose();
  }

  // SX
  const lightDarkColor = useLightDarkColor();
  const darkLightColor = useDarkLightColor();

  return (
    <>
      <HStack
        as={Button}
        className="btn-outline clicky"
        justify={"center"}
        flex={1}
        _hover={{ bg: "var(--divider)" }}
        onClick={() => {
          onOpen();
          setBulanLocal(bulan);
          setTahunLocal(tahun);
        }}
        {...props}
      >
        <Text fontSize={17} fontWeight={600}>
          {`${formatDate(new Date(tahun, bulan), {
            month: "long",
            year: "numeric",
          })}`}
        </Text>
      </HStack>

      <Drawer
        isOpen={isOpen}
        onClose={() => {
          backOnClose();
        }}
        initialFocusRef={initialRef}
        placement={placement}
        size={placement === "left" || placement === "right" ? "sm" : ""}
      >
        <DrawerOverlay />
        <DrawerContent bg={"transparent"}>
          <DrawerBody ref={drawerBodyRef} px={0}>
            {!isSideDrawer && placement === "bottom" && (
              <VStack
                className="drawerIndicator"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                <Box
                  w={"100px"}
                  h={"6px"}
                  bg={darkLightColor}
                  opacity={0.2}
                  borderRadius={6}
                  flexShrink={0}
                  mx={"auto"}
                  mb={2}
                />
              </VStack>
            )}

            <VStack
              pb={placement === "bottom" ? 8 : 6}
              h={"calc(100% - 14px)"}
              bg={lightDarkColor}
              align={"stretch"}
              gap={0}
              borderRadius={
                isSideDrawer
                  ? ""
                  : placement === "top"
                  ? "0 0 12px 12px"
                  : "12px 12px 0 0"
              }
            >
              <Box pt={"18px"} pr={5} pb={5} pl={6}>
                <HStack justify={"space-between"}>
                  <Text fontSize={20} fontWeight={600}>
                    Set Bulan & Tahun
                  </Text>
                  <BackOnCloseButton aria-label="back on close button" />
                </HStack>
              </Box>

              <VStack
                px={6}
                gap={0}
                overflowX={"auto"}
                w={"100%"}
                align={"stretch"}
              >
                <FormControl mb={4}>
                  <FormLabel>Bulan</FormLabel>
                  <SimpleGrid columns={[2, 3]} gap={2}>
                    {months.map((month, i) => (
                      <Button
                        key={i}
                        borderColor={i === bulanLocal ? "p.500" : ""}
                        bg={i === bulanLocal ? "var(--p500a3) !important" : ""}
                        className="btn-outline"
                        onClick={() => {
                          setBulanLocal(i);
                        }}
                      >
                        {month}
                      </Button>
                    ))}
                  </SimpleGrid>
                </FormControl>

                <FormControl isInvalid={!isTahunValid(tahunLocal)}>
                  <FormLabel>Tahun</FormLabel>
                  <HStack>
                    <IconButton
                      aria-label="year min button"
                      icon={<Icon as={RiArrowLeftSLine} fontSize={iconSize} />}
                      className="btn-outline clicky"
                      isDisabled={tahunLocal <= 0}
                      onClick={() => {
                        if (tahunLocal > 0) {
                          setTahunLocal(tahunLocal - 1);
                        }
                      }}
                      onMouseDown={() => {
                        handleMouseDownDecrement();
                      }}
                      onMouseUp={handleMouseUpDecrement}
                      onMouseLeave={handleMouseUpDecrement}
                      onTouchStart={() => {
                        handleMouseDownDecrement();
                      }}
                      onTouchEnd={handleMouseUpDecrement}
                    />
                    <Input
                      name="tahun"
                      textAlign={"center"}
                      placeholder="Tahun"
                      onChange={(e) => {
                        const value = parseNumber(e.target.value);
                        if (value) {
                          setTahunLocal(value);
                        } else if (value === null) {
                          setTahunLocal(0);
                        }
                      }}
                      value={tahunLocal === 0 ? "" : tahunLocal}
                    />
                    <IconButton
                      aria-label="year plus button"
                      icon={<Icon as={RiArrowRightSLine} fontSize={iconSize} />}
                      className="btn-outline clicky"
                      isDisabled={tahunLocal <= 0}
                      onClick={() => {
                        setTahunLocal(tahunLocal + 1);
                      }}
                      onMouseDown={() => {
                        handleMouseDownIncrement();
                      }}
                      onMouseUp={handleMouseUpIncrement}
                      onMouseLeave={handleMouseUpIncrement}
                      onTouchStart={() => {
                        handleMouseDownIncrement();
                      }}
                      onTouchEnd={handleMouseUpIncrement}
                    />
                  </HStack>
                  <FormErrorMessage>
                    <Text mx={"auto"} textAlign={"center"}>
                      Tahun tidak valid
                    </Text>
                  </FormErrorMessage>
                </FormControl>
              </VStack>

              <VStack gap={0} mt={5} px={6} align={"stretch"} w={"100%"}>
                <Button
                  onClick={onConfirm}
                  w={"100%"}
                  className="btn-ap clicky"
                  isDisabled={!isTahunValid(tahunLocal)}
                  colorScheme="ap"
                >
                  Terapkan
                </Button>
              </VStack>
            </VStack>

            {!isSideDrawer && placement === "top" && (
              <VStack
                className="drawerIndicator"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                <Box
                  w={"100px"}
                  h={"6px"}
                  bg={darkLightColor}
                  opacity={0.2}
                  borderRadius={6}
                  flexShrink={0}
                  mx={"auto"}
                  mt={2}
                />
              </VStack>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
