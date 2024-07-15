import {
  Button,
  ButtonGroup,
  ButtonProps,
  HStack,
  Icon,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
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
import DisclosureHeader from "../DisclosureHeader";
import PeriodPickerModal from "./PeriodPickerModal";
type PrefixOption = "basic" | "basicShort" | "long" | "longShort" | "short";

interface Props extends ButtonProps {
  id: string;
  name: string;
  onConfirm: (inputValue: Date | undefined) => void;
  inputValue: Date | undefined;
  dateFormatOptions?: PrefixOption | object;
  placeholder?: string;
  nonNullable?: boolean;
  isError?: boolean;
}

export default function DatePickerModal({
  id,
  name,
  onConfirm,
  inputValue,
  dateFormatOptions,
  placeholder,
  nonNullable,
  isError,
  ...props
}: Props) {
  const initialRef = useRef(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose(`${id}-${name}`, isOpen, onOpen, onClose);

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
          <Text opacity={0.6}>{placeholder || `Pilih Tanggal`}</Text>
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
          <ModalHeader p={0} ref={initialRef}>
            <DisclosureHeader title={placeholder || "Pilih Tanggal"} />
          </ModalHeader>

          <ModalBody className="scrollY">
            <VStack gap={0} overflowX={"auto"} w={"100%"} align={"stretch"}>
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

                <PeriodPickerModal
                  id={`period-picker-modal-${id}`}
                  name="month-year"
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

            <VStack align={"stretch"} mt={3} w={"100%"}>
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
          </ModalBody>

          <ModalFooter pt={5}>
            <VStack align={"stretch"} w={"100%"}>
              <Button
                flexShrink={0}
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
            </VStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
