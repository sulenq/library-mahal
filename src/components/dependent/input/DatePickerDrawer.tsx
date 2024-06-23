import {
  Button,
  ButtonGroup,
  ButtonProps,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
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
import { useErrorColor } from "../../../constant/colors";
import useBackOnClose from "../../../hooks/useBackOnClose";
import backOnClose from "../../../lib/backOnClose";
import formatDate from "../../../lib/formatDate";
import BackOnCloseButton from "../../independent/BackOnCloseButton";
import DatePickerMonthYearInputDrawer from "./DatePickerMonthYearInputDrawer";
type PrefixOption = "basic" | "basicShort" | "long" | "longShort" | "short";

interface Props extends ButtonProps {
  id: string;
  name: string;
  confirm: (inputValue: Date | undefined) => void;
  inputValue: Date | undefined;
  placement?: "top" | "bottom" | "left" | "right";
  dateFormatOptions?: PrefixOption | object;
  placeholder?: string;
  nonNullable?: boolean;
  isError?: boolean;
}

export default function DatePickerDrawer({
  id,
  name,
  confirm,
  inputValue,
  placement,
  dateFormatOptions,
  placeholder,
  nonNullable,
  isError,
  ...props
}: Props) {
  const initialValue = useRef(inputValue);
  const initialRef = useRef(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose(`${id}_${name}`, isOpen, onOpen, onClose);

  const [date, setDate] = useState<Date>(initialValue.current || new Date());
  const [bulan, setBulan] = useState<number>(
    (initialValue.current?.getMonth() || date.getMonth()) + 1
  );
  const [tahun, setTahun] = useState<number>(
    initialValue.current?.getFullYear() || date.getFullYear()
  );
  const [selected, setSelected] = useState<any>(inputValue);

  function confirmSelected() {
    let confirmable = false;
    if (!nonNullable) {
      confirmable = true;
    } else {
      if (selected) {
        confirmable = true;
      }
    }

    if (confirmable) {
      confirm(selected);
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
        placement={placement || "bottom"}
        size={placement === "left" || placement === "right" ? "sm" : ""}
      >
        <DrawerOverlay />
        <DrawerContent
          borderRadius={
            placement === "left" || placement === "right" ? "" : "12px 12px 0 0"
          }
        >
          <DrawerHeader ref={initialRef}>
            <HStack align={"start"} justify={"space-between"}>
              <Text fontSize={20} fontWeight={600}>
                {placeholder || "Pilih Tanggal"}
              </Text>

              <BackOnCloseButton aria-label="close-back-button" />
            </HStack>
          </DrawerHeader>

          <DrawerBody className="scrollY">
            <VStack align={"stretch"}>
              <VStack gap={0} overflowX={"auto"} w={"100%"} align={"stretch"}>
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

                  <DatePickerMonthYearInputDrawer
                    id={"date_picker_input_month_year_drawer"}
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
            </VStack>
          </DrawerBody>

          <DrawerFooter
            pt={"16px !important"}
            pb={placement === "bottom" ? 8 : 6}
          >
            <VStack align={"stretch"} w={"100%"}>
              <ButtonGroup w={"100%"}>
                <Button
                  flex={1}
                  className="btn-outline clicky"
                  onClick={() => {
                    setSelected(undefined);
                  }}
                >
                  Reset
                </Button>
                <Button
                  flex={1}
                  className="btn-outline clicky"
                  onClick={setSelectedToToday}
                >
                  Hari Ini
                </Button>
              </ButtonGroup>

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

              <Button
                colorScheme="ap"
                className="btn-ap clicky"
                w={"100%"}
                isDisabled={nonNullable ? (selected ? false : true) : false}
                onClick={confirmSelected}
              >
                Konfirmasi
              </Button>
            </VStack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
