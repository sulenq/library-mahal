import {
  Box,
  Button,
  ButtonGroup,
  ButtonProps,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  HStack,
  Icon,
  IconButton,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { RiArrowDownSLine, RiArrowUpSLine, RiTimeLine } from "@remixicon/react";
import { useRef, useState } from "react";
import { useErrorColor, useLightDarkColor } from "../../../constant/colors";
import useBackOnClose from "../../../hooks/useBackOnClose";
import backOnClose from "../../../lib/backOnClose";
import formatTimeFromDate from "../../../lib/formatTimeFromDate";
import BackOnCloseButton from "../../independent/BackOnCloseButton";

interface Props extends ButtonProps {
  id: string;
  name: string;
  onConfirm: (inputValue: Date | undefined) => void;
  inputValue: Date | undefined;
  withSeconds?: boolean;
  placement?: "top" | "bottom" | "left" | "right";
  placeholder?: string;
  required?: boolean;
  isError?: boolean;
}

export default function TimePickerDrawer({
  id,
  name,
  onConfirm,
  inputValue,
  withSeconds,
  placement = "bottom",
  placeholder,
  required,
  isError,
  ...props
}: Props) {
  const initialRef = useRef(null);

  // const hoursArray = Array.from({ length: 23 }, (_, i) => i + 1);
  // const minutesArray = Array.from({ length: 59 }, (_, i) => i + 1);

  const defaultTime = new Date();
  defaultTime.setHours(0, 0, 0, 0);

  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose(`${id}-[${name}]`, isOpen, onOpen, onClose);

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

  const [time, setTime] = useState<Date | undefined>(inputValue || defaultTime);
  const [hours, setHours] = useState<number>(
    inputValue?.getHours() || defaultTime.getHours()
  );
  const [minutes, setMinutes] = useState<number>(
    inputValue?.getMinutes() || defaultTime.getMinutes()
  );
  const [seconds, setSeconds] = useState<number>(
    inputValue?.getSeconds() || defaultTime.getSeconds()
  );

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

  function handleMouseDownIncrement(type: string) {
    if (timeoutIncrementRef.current || intervalIncrementRef.current) return;

    timeoutIncrementRef.current = setTimeout(() => {
      intervalIncrementRef.current = setInterval(() => {
        if (type === "hours") {
          setHours((ps) => (ps < 23 ? ps + 1 : 0));
        } else if (type === "minutes") {
          setMinutes((ps) => (ps < 59 ? ps + 1 : 0));
        } else if (type === "seconds") {
          setSeconds((ps) => (ps < 59 ? ps + 1 : 0));
        }
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
  function handleMouseDownDecrement(type: string) {
    if (timeoutDecrementRef.current || intervalDecrementRef.current) return;

    timeoutDecrementRef.current = setTimeout(() => {
      intervalDecrementRef.current = setInterval(() => {
        if (type === "hours") {
          setHours((ps) => (ps > 0 ? ps - 1 : 23));
        } else if (type === "minutes") {
          setMinutes((ps) => (ps > 0 ? ps - 1 : 59));
        } else if (type === "seconds") {
          setSeconds((ps) => (ps > 0 ? ps - 1 : 59));
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

  function confirmSelected() {
    let confirmable = false;
    if (!required) {
      confirmable = true;
    } else {
      if (time) {
        confirmable = true;
      }
    }

    if (confirmable) {
      if (time) {
        const confirmedTime = time;
        confirmedTime.setHours(hours);
        confirmedTime.setMinutes(minutes);
        confirmedTime.setSeconds(seconds);
        onConfirm(confirmedTime);
      } else {
        onConfirm(undefined);
      }
      backOnClose();
    }
  }

  // SX
  const errorColor = useErrorColor();
  const lightDarkColor = useLightDarkColor();

  return (
    <>
      <Button
        className="btn"
        w={"100%"}
        justifyContent={"space-between"}
        borderRadius={8}
        border={"1px solid var(--divider3)"}
        boxShadow={isError ? `0 0 0px 1px ${errorColor}` : ""}
        py={2}
        px={4}
        h={"40px"}
        fontWeight={400}
        cursor={"pointer"}
        onClick={() => {
          onOpen();
          setTime(inputValue || defaultTime);
          setHours(inputValue?.getHours() || defaultTime.getHours());
          setMinutes(inputValue?.getMinutes() || defaultTime.getMinutes());
          setSeconds(inputValue?.getSeconds() || defaultTime.getSeconds());
        }}
        // _focus={{ boxShadow: "0 0 0px 2px var(--p500)" }}
        _focus={{ border: "1px solid var(--p500)", boxShadow: "none" }}
        {...props}
      >
        {inputValue ? (
          <Text>{formatTimeFromDate(inputValue, withSeconds)}</Text>
        ) : (
          <Text opacity={0.6}>{placeholder || `Pilih Waktu`}</Text>
        )}

        <Icon as={RiTimeLine} mb={"1px"} fontSize={17} />
      </Button>

      <Drawer
        isOpen={isOpen}
        onClose={backOnClose}
        initialFocusRef={initialRef}
        placement={placement}
      >
        <DrawerOverlay />
        <DrawerContent bg={"transparent"}>
          <DrawerBody
            px={0}
            className="scrollY"
            ref={drawerBodyRef}
            onTouchStart={isSideDrawer ? onTouchStart : undefined}
            onTouchMove={isSideDrawer ? onTouchMove : undefined}
            onTouchEnd={isSideDrawer ? onTouchEnd : undefined}
          >
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
                  bg={lightDarkColor}
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
                    {placeholder || "Pilih Waktu"}
                  </Text>
                  <BackOnCloseButton aria-label="back on close button" />
                </HStack>
              </Box>

              <HStack justify={"space-between"} px={6}>
                <VStack flex={"1 1 0"} align={"stretch"} gap={0}>
                  <IconButton
                    aria-label="add hour button"
                    icon={<Icon as={RiArrowUpSLine} fontSize={20} />}
                    className="btn-outline clicky"
                    onClick={() => {
                      setHours((ps) => (ps < 23 ? ps + 1 : 0));
                      if (!time) {
                        setTime(defaultTime);
                      }
                    }}
                    onMouseDown={() => {
                      handleMouseDownIncrement("hours");
                    }}
                    onMouseUp={handleMouseUpIncrement}
                    onMouseLeave={handleMouseUpIncrement}
                    onTouchStart={() => {
                      handleMouseDownIncrement("hours");
                    }}
                    onTouchEnd={handleMouseUpIncrement}
                  />

                  <VStack my={4}>
                    <Text
                      fontSize={52}
                      fontWeight={600}
                      textAlign={"center"}
                      lineHeight={1}
                      className="num"
                    >
                      {time ? String(hours).padStart(2, "0") : "--"}
                    </Text>
                    <Text textAlign={"center"}>Jam</Text>
                  </VStack>

                  <IconButton
                    aria-label="reduce hour button"
                    icon={<Icon as={RiArrowDownSLine} fontSize={20} />}
                    className="btn-outline clicky"
                    onClick={() => {
                      setHours((ps) => (ps > 0 ? ps - 1 : 23));
                      if (!time) {
                        setTime(defaultTime);
                      }
                    }}
                    onMouseDown={() => {
                      handleMouseDownDecrement("hours");
                    }}
                    onMouseUp={handleMouseUpDecrement}
                    onMouseLeave={handleMouseUpDecrement}
                    onTouchStart={() => {
                      handleMouseDownDecrement("hours");
                    }}
                    onTouchEnd={handleMouseUpDecrement}
                  />
                </VStack>

                <Text fontSize={50} opacity={0.2} mt={-10}>
                  :
                </Text>

                <VStack flex={"1 1 0"} align={"stretch"} gap={0}>
                  <IconButton
                    aria-label="add hour button"
                    icon={<Icon as={RiArrowUpSLine} fontSize={20} />}
                    className="btn-outline clicky"
                    onClick={() => {
                      setMinutes((ps) => (ps < 59 ? ps + 1 : 0));
                      if (!time) {
                        setTime(defaultTime);
                      }
                    }}
                    onMouseDown={() => {
                      handleMouseDownIncrement("minutes");
                    }}
                    onMouseUp={handleMouseUpIncrement}
                    onMouseLeave={handleMouseUpIncrement}
                    onTouchStart={() => {
                      handleMouseDownIncrement("minutes");
                    }}
                    onTouchEnd={handleMouseUpIncrement}
                  />

                  <VStack my={4}>
                    <Text
                      fontSize={52}
                      fontWeight={600}
                      textAlign={"center"}
                      lineHeight={1}
                      className="num"
                    >
                      {time ? String(minutes).padStart(2, "0") : "--"}
                    </Text>
                    <Text textAlign={"center"}>Menit</Text>
                  </VStack>

                  <IconButton
                    aria-label="reduce hour button"
                    icon={<Icon as={RiArrowDownSLine} fontSize={20} />}
                    className="btn-outline clicky"
                    onClick={() => {
                      setMinutes((ps) => (ps > 0 ? ps - 1 : 59));
                      if (!time) {
                        setTime(defaultTime);
                      }
                    }}
                    onMouseDown={() => {
                      handleMouseDownDecrement("minutes");
                    }}
                    onMouseUp={handleMouseUpDecrement}
                    onMouseLeave={handleMouseUpDecrement}
                    onTouchStart={() => {
                      handleMouseDownDecrement("minutes");
                    }}
                    onTouchEnd={handleMouseUpDecrement}
                  />
                </VStack>

                {withSeconds && (
                  <>
                    <Text fontSize={50} opacity={0.2} mt={-10}>
                      :
                    </Text>

                    <VStack flex={"1 1 0"} align={"stretch"} gap={0}>
                      <IconButton
                        aria-label="add hour button"
                        icon={<Icon as={RiArrowUpSLine} fontSize={20} />}
                        className="btn-outline clicky"
                        onClick={() => {
                          setSeconds((ps) => (ps < 59 ? ps + 1 : 0));
                          if (!time) {
                            setTime(defaultTime);
                          }
                        }}
                        onMouseDown={() => {
                          handleMouseDownIncrement("seconds");
                        }}
                        onMouseUp={handleMouseUpIncrement}
                        onMouseLeave={handleMouseUpIncrement}
                        onTouchStart={() => {
                          handleMouseDownIncrement("seconds");
                        }}
                        onTouchEnd={handleMouseUpIncrement}
                      />

                      <VStack my={4}>
                        <Text
                          fontSize={52}
                          fontWeight={600}
                          textAlign={"center"}
                          lineHeight={1}
                          className="num"
                        >
                          {time ? String(seconds).padStart(2, "0") : "--"}
                        </Text>
                        <Text textAlign={"center"}>Detik</Text>
                      </VStack>

                      <IconButton
                        aria-label="reduce hour button"
                        icon={<Icon as={RiArrowDownSLine} fontSize={20} />}
                        className="btn-outline clicky"
                        onClick={() => {
                          setSeconds((ps) => (ps > 0 ? ps - 1 : 59));
                          if (!time) {
                            setTime(defaultTime);
                          }
                        }}
                        onMouseDown={() => {
                          handleMouseDownDecrement("seconds");
                        }}
                        onMouseUp={handleMouseUpDecrement}
                        onMouseLeave={handleMouseUpDecrement}
                        onTouchStart={() => {
                          handleMouseDownDecrement("seconds");
                        }}
                        onTouchEnd={handleMouseUpDecrement}
                      />
                    </VStack>
                  </>
                )}
              </HStack>

              <ButtonGroup px={6} w={"100%"} pt={4} mt={"auto"}>
                <Button
                  className="btn-outline clicky"
                  w={"100%"}
                  onClick={() => {
                    setTime(undefined);
                  }}
                >
                  Reset
                </Button>

                <Button
                  colorScheme="ap"
                  className="btn-ap clicky"
                  w={"100%"}
                  isDisabled={required ? (time ? false : true) : false}
                  onClick={confirmSelected}
                >
                  Konfirmasi
                </Button>
              </ButtonGroup>
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
                  bg={lightDarkColor}
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
