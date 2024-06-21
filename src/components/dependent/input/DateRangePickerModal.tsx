import {
  Box,
  Button,
  ButtonGroup,
  ButtonProps,
  Center,
  HStack,
  Icon,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import {
  RiArrowDownLine,
  RiArrowLeftSLine,
  RiArrowRightLine,
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
import DatePickerMonthYearInput from "./DatePickerMonthYearInput";
import useScreenWidth from "../../../lib/useScreenWidth";
type PrefixOption = "basic" | "basicShort" | "long" | "longShort" | "short";

interface Props extends ButtonProps {
  id: string;
  name: string;
  confirm: (inputValue: { from: Date; to: Date }) => void;
  inputValue: { from: Date; to: Date } | null;
  dateFormatOptions?: PrefixOption | object;
  placeholder?: string;
  nonnullable?: boolean;
  isError?: boolean;
}

export default function DateRangePickerModal({
  id,
  name,
  confirm,
  inputValue,
  dateFormatOptions,
  placeholder,
  nonnullable,
  isError,
  ...props
}: Props) {
  const initialValue = useRef(inputValue);
  const initialRef = useRef(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose(`${id}_${name}`, isOpen, onOpen, onClose);

  const [date, setDate] = useState<Date>(
    initialValue.current ? initialValue.current.from : new Date()
  );
  const [bulan, setBulan] = useState<number>(
    (initialValue.current
      ? initialValue.current.from?.getMonth()
      : date.getMonth()) + 1
  );
  const [tahun, setTahun] = useState<number>(
    initialValue.current
      ? initialValue.current.from?.getFullYear()
      : date.getFullYear()
  );
  const [selected, setSelected] = useState<any>(inputValue);

  function confirmSelected() {
    let confirmable = false;
    if (!nonnullable) {
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
    setBulan(today.getMonth() + 1);
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
    setBulan(nextMonth.getMonth() + 1);
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
    setBulan(prevMonth.getMonth() + 1);
    setTahun(prevMonth.getFullYear());
  }

  // SX
  const errorColor = useErrorColor();
  const sw = useScreenWidth();

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
          setDate(inputValue ? inputValue.from : new Date());
          setBulan(
            (inputValue ? inputValue.from?.getMonth() : new Date().getMonth()) +
              1
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
          <Text>{`${formatDate(
            inputValue.from,
            dateFormatOptions
          )} - ${formatDate(inputValue.to, dateFormatOptions)}`}</Text>
        ) : (
          <Text opacity={0.6}>{placeholder || `Pilih rentang Tanggal`}</Text>
        )}

        <Icon as={RiCalendarLine} mb={"1px"} />
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={backOnClose}
        initialFocusRef={initialRef}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader ref={initialRef}>
            <HStack justify={"space-between"}>
              <Text fontSize={20} fontWeight={600}>
                {placeholder || "Pilih rentang Tanggal"}
              </Text>

              <BackOnCloseButton aria-label="close-back-button" />
            </HStack>
          </ModalHeader>

          <ModalBody>
            <VStack align={"stretch"}>
              <VStack gap={0} overflowX={"auto"} w={"100%"} align={"stretch"}>
                <ButtonGroup w={"100%"} mb={2}>
                  <Button
                    aria-label="Previous Month"
                    leftIcon={<Icon as={RiArrowLeftSLine} fontSize={20} />}
                    pr={"10px"}
                    className="btn-outline clicky"
                    onClick={prevMonth}
                    w={"100%"}
                    maxW={"50px"}
                  ></Button>

                  <DatePickerMonthYearInput
                    id={"datepicker_modal_datepicker_month_year_input"}
                    bulan={bulan}
                    tahun={tahun}
                    setBulan={setBulan}
                    setTahun={setTahun}
                    setDate={setDate}
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

              <ButtonGroup w={"100%"}>
                <Button
                  flex={1}
                  className="btn-outline clicky"
                  onClick={() => {
                    setSelected(null);
                  }}
                >
                  Reset
                </Button>
                <Button
                  flex={1}
                  className="btn-outline clicky"
                  onClick={setSelectedToThisWeek}
                >
                  Minggu Ini
                </Button>
              </ButtonGroup>
            </VStack>
          </ModalBody>

          <ModalFooter pt={"8px !important"}>
            <VStack align={"stretch"} w={"100%"}>
              <Stack flexDir={["column", "row"]}>
                <Box flex={[null, "1 1 180px"]}>
                  <VStack borderRadius={8} bg={"var(--divider)"} p={2} gap={1}>
                    <Text opacity={selected?.from ? 1 : 0.6}>
                      {selected?.from
                        ? `${formatDate(selected.from, {
                            weekday: "short",
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}`
                        : "Pilih tanggal awal"}
                    </Text>
                  </VStack>
                </Box>

                <Center>
                  <Icon as={sw < 480 ? RiArrowDownLine : RiArrowRightLine} />
                </Center>

                <Box flex={[null, "1 1 180px"]}>
                  <VStack borderRadius={8} bg={"var(--divider)"} p={2} gap={1}>
                    <Text opacity={selected?.to ? 1 : 0.6}>
                      {selected?.to
                        ? `${formatDate(selected.to, {
                            weekday: "short",
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}`
                        : "Pilih tanggal akhir"}
                    </Text>
                  </VStack>
                </Box>
              </Stack>

              <Button
                colorScheme="ap"
                className="btn-ap clicky"
                w={"100%"}
                isDisabled={
                  nonnullable
                    ? selected && selected.from && selected.to
                      ? false
                      : true
                    : (selected && selected.from && selected.to) ||
                      selected === null
                    ? false
                    : true
                }
                onClick={confirmSelected}
              >
                Konfirmasi
              </Button>
            </VStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
