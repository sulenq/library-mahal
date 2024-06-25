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
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import {
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiCalendarLine,
} from "@remixicon/react";
import { id as ind } from "date-fns/locale";
import { useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import {
  useDarkLightColor,
  useErrorColor,
  useLightDarkColor,
} from "../../../constant/colors";
import useBackOnClose from "../../../hooks/useBackOnClose";
import backOnClose from "../../../lib/backOnClose";
import formatDate from "../../../lib/formatDate";
import BackOnCloseButton from "../../independent/BackOnCloseButton";
import MonthYearInputDrawer from "./MonthYearInputDrawer";
type PrefixOption = "basic" | "basicShort" | "long" | "longShort" | "short";

interface Props extends ButtonProps {
  id: string;
  name: string;
  onConfirm: (inputValue: Date | undefined) => void;
  inputValue: Date | undefined;
  placement?: "top" | "bottom" | "left" | "right";
  dateFormatOptions?: PrefixOption | object;
  placeholder?: string;
  required?: boolean;
  isError?: boolean;
}

export default function DatePickerDrawer({
  id,
  name,
  onConfirm,
  inputValue,
  placement = "bottom",
  dateFormatOptions,
  placeholder,
  required,
  isError,
  ...props
}: Props) {
  const initialRef = useRef(null);

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

  const [date, setDate] = useState<Date>(inputValue || new Date());
  const [bulan, setBulan] = useState<number>(
    (inputValue?.getMonth() || date.getMonth()) + 1
  );
  const [tahun, setTahun] = useState<number>(
    inputValue?.getFullYear() || date.getFullYear()
  );
  const [selected, setSelected] = useState<any>(inputValue);

  function confirmSelected() {
    let confirmable = false;
    if (!required) {
      confirmable = true;
    } else {
      if (selected) {
        confirmable = true;
      }
    }

    if (confirmable) {
      onConfirm(selected);
      backOnClose();
    }
  }
  function setSelectedToToday() {
    const today = new Date();
    setDate(today);
    setSelected(today);
    setBulan(today.getMonth());
    setTahun(today.getFullYear());
  }
  function nextMonth() {
    const currentMonth = date.getMonth();
    const currentyear = date.getFullYear();

    const nextMonth = new Date(
      bulan === 12 ? currentyear + 1 : tahun,
      bulan === 12 ? 0 : currentMonth + 1
    );
    setDate(nextMonth);
    setBulan(nextMonth.getMonth());
    setTahun(nextMonth.getFullYear());
  }
  function prevMonth() {
    const currentMonth = date.getMonth();
    const currentyear = date.getFullYear();

    const prevMonth = new Date(
      bulan === 1 ? currentyear - 1 : tahun,
      bulan === 1 ? 11 : currentMonth - 1
    );
    setDate(prevMonth);
    setBulan(prevMonth.getMonth());
    setTahun(prevMonth.getFullYear());
  }

  // SX
  const errorColor = useErrorColor();
  const lightDarkColor = useLightDarkColor();
  const darkLightColor = useDarkLightColor();

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
          setSelected(inputValue);
          setDate(inputValue || new Date());
          setBulan((inputValue?.getMonth() || new Date().getMonth()) + 1);
          setTahun(inputValue?.getFullYear() || new Date().getFullYear());
        }}
        // _focus={{ boxShadow: "0 0 0px 2px var(--p500)" }}
        _focus={{ border: "1px solid var(--p500)", boxShadow: "none" }}
        {...props}
      >
        {inputValue ? (
          <Text>{formatDate(inputValue, dateFormatOptions)}</Text>
        ) : (
          <Text opacity={0.6}>{placeholder || `Pilih Tanggal`}</Text>
        )}

        <Icon as={RiCalendarLine} mb={"1px"} />
      </Button>

      <Drawer
        isOpen={isOpen}
        onClose={backOnClose}
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
                    {placeholder || "Pilih Rentang Tanggal"}
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
                <ButtonGroup w={"100%"} mb={3}>
                  <Button
                    aria-label="Previous Month"
                    leftIcon={<Icon as={RiArrowLeftSLine} fontSize={20} />}
                    pr={"10px"}
                    className="btn-outline clicky"
                    onClick={prevMonth}
                    w={"100%"}
                    maxW={"50px"}
                  ></Button>

                  <MonthYearInputDrawer
                    id={"date_range_picker_input_month_year_drawer"}
                    bulan={bulan}
                    tahun={tahun}
                    setBulan={setBulan}
                    setTahun={setTahun}
                    setDate={setDate}
                    placement={placement}
                  />

                  <Button
                    aria-label="Next Month"
                    rightIcon={<Icon as={RiArrowRightSLine} fontSize={20} />}
                    pl={"10px"}
                    className="btn-outline clicky"
                    onClick={nextMonth}
                    w={"100%"}
                    maxW={"50px"}
                  ></Button>
                </ButtonGroup>

                <DayPicker
                  mode="single"
                  selected={selected}
                  onSelect={(date) => {
                    setSelected(date);
                  }}
                  locale={ind}
                  month={date}
                  showOutsideDays
                  fixedWeeks
                  disableNavigation
                />
              </VStack>

              <VStack align={"stretch"} mt={3} px={6} w={"100%"}>
                <Button
                  flexShrink={0}
                  className="btn-outline clicky"
                  onClick={setSelectedToToday}
                >
                  Hari Ini
                </Button>

                <HStack
                  borderRadius={8}
                  bg={"var(--divider)"}
                  p={2}
                  gap={1}
                  justify={"center"}
                  h={"40px"}
                >
                  <Text opacity={selected ? 1 : 0.6} fontWeight={500}>
                    {selected
                      ? `${formatDate(selected, "longShort")}`
                      : "Pilih tanggal"}
                  </Text>
                </HStack>
              </VStack>

              <VStack gap={0} px={6} align={"stretch"} w={"100%"}>
                <Button
                  mt={5}
                  w={"100%"}
                  className="btn-outline clicky"
                  onClick={() => {
                    setSelected(undefined);
                  }}
                >
                  Reset
                </Button>

                <Button
                  mt={2}
                  colorScheme="ap"
                  className="btn-ap clicky"
                  w={"100%"}
                  isDisabled={required ? (selected ? false : true) : false}
                  onClick={confirmSelected}
                >
                  Konfirmasi
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
