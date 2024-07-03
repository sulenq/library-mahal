import {
  Box,
  Button,
  ButtonProps,
  HStack,
  Icon,
  IconButton,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { RiArrowDownSLine, RiArrowUpSLine, RiTimeLine } from "@remixicon/react";
import { useRef, useState } from "react";
import { useErrorColor } from "../../../constant/colors";
import backOnClose from "../../../lib/backOnClose";
import formatTimeFromDate from "../../../lib/formatTimeFromDate";
import BackOnCloseButton from "../../independent/BackOnCloseButton";
import CustomDrawer from "../../independent/wrapper/CustomDrawer";

interface Props extends ButtonProps {
  id: string;
  name: string;
  onConfirm: (inputValue: Date | undefined) => void;
  inputValue: Date | undefined;
  withSeconds?: boolean;
  placement?: "top" | "bottom" | "left" | "right";
  placeholder?: string;
  nonNullable?: boolean;
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
  nonNullable,
  isError,
  ...props
}: Props) {
  const defaultTime = new Date();
  defaultTime.setHours(0, 0, 0, 0);

  const { isOpen, onOpen, onClose } = useDisclosure();

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
    if (!nonNullable) {
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

      <CustomDrawer
        id={id}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        name={name}
        placement={placement}
        header={
          <Box pt={"18px"} pr={5} pb={5} pl={6}>
            <HStack justify={"space-between"}>
              <Text fontSize={20} fontWeight={600}>
                {placeholder || "Pilih Waktu"}
              </Text>
              <BackOnCloseButton aria-label="back on close button" />
            </HStack>
          </Box>
        }
        footer={
          <>
            <Button
              className="btn-outline clicky"
              w={"100%"}
              onClick={() => {
                if (time && hours === 0 && minutes === 0 && seconds === 0) {
                  setTime(undefined);
                  setHours(0);
                  setMinutes(0);
                  setSeconds(0);
                } else {
                  setTime(defaultTime);
                  setHours(0);
                  setMinutes(0);
                  setSeconds(0);
                }
              }}
            >
              {time && hours === 0 && minutes === 0 && seconds === 0
                ? "Clear"
                : "Reset"}
            </Button>

            <Button
              colorScheme="ap"
              className="btn-ap clicky"
              w={"100%"}
              isDisabled={nonNullable ? (time ? false : true) : false}
              onClick={confirmSelected}
            >
              Konfirmasi
            </Button>
          </>
        }
      >
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
                fontSize={64}
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
                fontSize={64}
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
                    fontSize={64}
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
      </CustomDrawer>
    </>
  );
}
