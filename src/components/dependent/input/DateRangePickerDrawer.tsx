import {
  Alert,
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
import { useErrorColor, useWarningColor } from "../../../constant/colors";
import backOnClose from "../../../lib/backOnClose";
import countDateRange from "../../../lib/countDateRange";
import formatDate from "../../../lib/formatDate";
import BackOnCloseButton from "../../independent/BackOnCloseButton";
import CustomDrawer from "../../independent/wrapper/CustomDrawer";
import MonthYearInputDrawer from "./PeriodPickerDrawer";
type PrefixOption = "basic" | "basicShort" | "long" | "longShort" | "short";

interface Props extends ButtonProps {
  id: string;
  name: string;
  onConfirm: (inputValue: { from: Date; to: Date } | undefined) => void;
  inputValue: { from: Date; to: Date } | undefined;
  dateFormatOptions?: PrefixOption | object;
  placement?: "top" | "bottom" | "left" | "right";
  placeholder?: string;
  nonNullable?: boolean;
  isError?: boolean;
  maxRange?: number;
}

export default function DateRangePickerDrawer({
  id,
  name,
  onConfirm,
  inputValue,
  dateFormatOptions,
  placement = "bottom",
  placeholder,
  nonNullable,
  isError,
  maxRange,
  ...props
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [date, setDate] = useState<Date>(
    inputValue ? inputValue.from : new Date()
  );
  const [bulan, setBulan] = useState<number>(
    inputValue ? inputValue.from?.getMonth() : date.getMonth()
  );
  const [tahun, setTahun] = useState<number>(
    inputValue ? inputValue.from?.getFullYear() : date.getFullYear()
  );
  const [selected, setSelected] = useState<any>(inputValue);

  function handleSelect(range: any) {
    if (maxRange && range?.from && range?.to) {
      const diffTime = Math.abs(range.to - range.from);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays > maxRange - 1) {
        // Handle exceeding max range logic here
        const newTo = new Date(range.from);
        newTo.setDate(newTo.getDate() + maxRange - 1);
        range = { from: range.from, to: newTo };
      }
    }
    setSelected(range);
  }

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
  function setSelectedToThisWeek() {
    const today = new Date();

    // Get the current day of the week (0 - Sunday, 6 - Saturday)
    const dayOfWeek = today.getDay();

    // Calculate the date of the start of the week (Monday)
    const startOfWeek = new Date(today);
    const dayDiffToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // if today is Sunday, set the difference to 6, else subtract 1
    startOfWeek.setDate(today.getDate() - dayDiffToMonday);

    // Calculate the date of the end of the week (Sunday)
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // 6 days after Monday is Sunday

    // Set the state with the calculated dates
    setDate(today);
    setSelected({ from: startOfWeek, to: endOfWeek });
    setBulan(today.getMonth());
    setTahun(today.getFullYear());
  }
  function setSelectedToThisMonth() {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    setDate(today);
    setSelected({ from: startOfMonth, to: endOfMonth });
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
  const warningColor = useWarningColor();

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
          setDate(inputValue ? inputValue.from : new Date());
          setBulan(
            inputValue ? inputValue.from?.getMonth() : new Date().getMonth()
          );
          setTahun(
            inputValue
              ? inputValue.from?.getFullYear()
              : new Date().getFullYear()
          );
        }}
        // _focus={{ boxShadow: "0 0 0px 2px var(--p500)" }}
        _focus={{ border: "1px solid var(--p500)", boxShadow: "none" }}
        {...props}
      >
        {inputValue ? (
          <Text
            overflow={"hidden"}
            whiteSpace={"nowrap"}
            textOverflow={"ellipsis"}
            mr={4}
          >{`${
            inputValue?.from
              ? `${formatDate(inputValue.from, "short")}`
              : "Pilih tanggal awal"
          } - ${
            inputValue?.to
              ? `${formatDate(inputValue.to, "short")}`
              : "Pilih tanggal akhir"
          } ${
            inputValue && inputValue.from && inputValue.to
              ? `(${countDateRange(inputValue.from, inputValue.to)} hari)`
              : ""
          }`}</Text>
        ) : (
          <Text
            opacity={0.3}
            overflow={"hidden"}
            whiteSpace={"nowrap"}
            textOverflow={"ellipsis"}
            mr={4}
          >
            {placeholder || `Pilih Rentang Tanggal`}
          </Text>
        )}

        <Icon as={RiCalendarLine} />
      </Button>

      <CustomDrawer
        id={id}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        name={name}
        header={
          <Box pt={"18px"} pr={5} pb={5} pl={6}>
            <HStack justify={"space-between"}>
              <Text fontSize={20} fontWeight={600}>
                {placeholder || "Pilih Rentang Tanggal"}
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
              isDisabled={
                nonNullable
                  ? selected && selected.from && selected.to
                    ? false
                    : true
                  : (selected && selected.from && selected.to) ||
                    selected === undefined
                  ? false
                  : true
              }
              onClick={confirmSelected}
            >
              Konfirmasi
            </Button>
          </>
        }
      >
        <VStack px={6} gap={0} overflowY={"auto"} w={"100%"} align={"stretch"}>
          {maxRange && (
            <Alert
              status="warning"
              borderRadius={"6px !important"}
              py={"8px !important"}
              mb={4}
              flexShrink={0}
            >
              <Text color={warningColor} w={"100%"} align={"center"}>
                Maksimal rentang tanggal <b>{maxRange}</b> hari
              </Text>
            </Alert>
          )}

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

            <MonthYearInputDrawer
              id={"date_range_picker_input_month_year_drawer"}
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
            mode="range"
            selected={selected}
            onSelect={handleSelect}
            locale={ind}
            month={date}
            showOutsideDays
            fixedWeeks
            disableNavigation
          />

          <VStack mt={4}>
            <ButtonGroup w={"100%"}>
              <Button
                flex={1}
                className="btn-outline clicky"
                onClick={setSelectedToThisMonth}
                isDisabled={!!(maxRange && maxRange < 31)}
              >
                Bulan Ini
              </Button>
              <Button
                flex={1}
                className="btn-outline clicky"
                onClick={setSelectedToThisWeek}
                isDisabled={!!(maxRange && maxRange < 7)}
              >
                Minggu Ini
              </Button>
            </ButtonGroup>

            <VStack
              w={"100%"}
              borderRadius={8}
              bg={"var(--divider)"}
              border={"2px dashed var(--divider)"}
              p={2}
              px={4}
              gap={1}
            >
              <Text textAlign={"center"} opacity={selected?.from ? 1 : 0.6}>
                {`${
                  selected?.from
                    ? `${formatDate(selected.from, "short")}`
                    : "Pilih tanggal awal"
                } - ${
                  selected?.to
                    ? `${formatDate(selected.to, "short")}`
                    : "Pilih tanggal akhir"
                } ${
                  selected && selected.from && selected.to
                    ? `(${countDateRange(selected.from, selected.to)} hari)`
                    : ""
                }`}
              </Text>
            </VStack>
          </VStack>
        </VStack>
      </CustomDrawer>
    </>
  );
}
