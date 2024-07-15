import {
  Box,
  Button,
  ButtonGroup,
  ButtonProps,
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
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { useErrorColor } from "../../../constant/colors";
import backOnClose from "../../../lib/backOnClose";
import formatDate from "../../../lib/formatDate";
import BackOnCloseButton from "../../independent/BackOnCloseButton";
import PeriodPickerDrawer from "./PeriodPickerDrawer";
import CustomDrawer from "../../independent/wrapper/CustomDrawer";
type PrefixOption = "basic" | "basicShort" | "long" | "longShort" | "short";

interface Props extends ButtonProps {
  id: string;
  name: string;
  onConfirm: (inputValue: Date | undefined) => void;
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
  onConfirm,
  inputValue,
  placement = "bottom",
  dateFormatOptions,
  placeholder,
  nonNullable,
  isError,
  ...props
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [date, setDate] = useState<Date>(inputValue || new Date());
  const [bulan, setBulan] = useState<number>(
    inputValue?.getMonth() || date.getMonth()
  );
  const [tahun, setTahun] = useState<number>(
    inputValue?.getFullYear() || date.getFullYear()
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
  function setSelectedToTomorrow() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    setDate(tomorrow);
    setSelected(tomorrow);
    setBulan(tomorrow.getMonth());
    setTahun(tomorrow.getFullYear());
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
        className="btn-clear"
        w={"100%"}
        justifyContent={"space-between"}
        borderRadius={8}
        border={"1px solid var(--divider3)"}
        boxShadow={isError ? `0 0 0px 1px ${errorColor}` : ""}
        px={"16px !important"}
        h={"40px"}
        fontWeight={400}
        cursor={"pointer"}
        onClick={() => {
          onOpen();
          setSelected(inputValue);
          setDate(inputValue || new Date());
          setBulan(inputValue?.getMonth() || new Date().getMonth());
          setTahun(inputValue?.getFullYear() || new Date().getFullYear());
        }}
        // _focus={{ boxShadow: "0 0 0px 2px var(--p500)" }}
        _focus={{ border: "1px solid var(--p500)", boxShadow: "none" }}
        {...props}
      >
        {inputValue ? (
          <Text>{formatDate(inputValue, dateFormatOptions)}</Text>
        ) : (
          <Text opacity={0.3}>{placeholder || `Pilih Tanggal`}</Text>
        )}

        <Icon as={RiCalendarLine} mb={"1px"} />
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
                {placeholder || "Pilih Tanggal"}
              </Text>
              <BackOnCloseButton aria-label="back on close button" />
            </HStack>
          </Box>
        }
        footer={
          <>
            <Button
              w={"100%"}
              className="btn-solid clicky"
              onClick={() => {
                setSelected(undefined);
              }}
            >
              Clear
            </Button>

            <Button
              colorScheme="ap"
              className="btn-ap clicky"
              w={"100%"}
              isDisabled={nonNullable ? (selected ? false : true) : false}
              onClick={confirmSelected}
            >
              Konfirmasi
            </Button>
          </>
        }
      >
        <VStack px={6} gap={0} overflowY={"auto"} w={"100%"} align={"stretch"}>
          <ButtonGroup w={"100%"} mb={3}>
            <Button
              aria-label="Previous Month"
              leftIcon={
                <Icon
                  className="iconButton"
                  as={RiArrowLeftSLine}
                  fontSize={20}
                />
              }
              pr={"10px"}
              className="btn-outline clicky"
              onClick={prevMonth}
              w={"100%"}
              maxW={"50px"}
            ></Button>

            <PeriodPickerDrawer
              id={`period-picker-drawer-${id}`}
              name="set-month-year"
              bulan={bulan}
              tahun={tahun}
              setBulan={setBulan}
              setTahun={setTahun}
              setPeriod={setDate}
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
          <ButtonGroup>
            <Button
              w={"50%"}
              flexShrink={0}
              className="btn-outline clicky"
              onClick={setSelectedToToday}
            >
              Hari Ini
            </Button>

            <Button
              w={"50%"}
              flexShrink={0}
              className="btn-outline clicky"
              onClick={setSelectedToTomorrow}
            >
              Besok
            </Button>
          </ButtonGroup>

          <HStack
            borderRadius={8}
            bg={"var(--divider)"}
            border={"2px dashed var(--divider)"}
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
      </CustomDrawer>
    </>
  );
}
