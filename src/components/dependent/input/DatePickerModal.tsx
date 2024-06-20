import {
  Button,
  ButtonGroup,
  ButtonProps,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
  Wrap,
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
import { iconSize } from "../../../constant/sizes";
import useBackOnClose from "../../../hooks/useBackOnClose";
import backOnClose from "../../../lib/backOnClose";
import formatDate from "../../../lib/formatDate";
import parseNumber from "../../../lib/parseNumber";

type PrefixOption = "basic" | "basicShort" | "long" | "longShort" | "short";

interface Props extends ButtonProps {
  id: string;
  name: string;
  confirm: (newInputValue: Date) => void;
  inputValue: Date | null;
  dateFormatOptions?: PrefixOption | object;
  placeholder?: string;
  required?: boolean;
  isError?: boolean;
}

export default function DatePickerModal({
  id,
  name,
  confirm,
  inputValue,
  dateFormatOptions,
  placeholder,
  required,
  isError,
  ...props
}: Props) {
  const initialValue = useRef(inputValue);
  const initialRef = useRef(null);

  function handleOnClose() {
    onClose();
    setBulan((initialValue.current?.getMonth() || date.getMonth()) + 1);
    setTahun(initialValue.current?.getFullYear() || date.getFullYear());
    setDate(initialValue.current || new Date());
  }
  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose(`${id}_${name}`, isOpen, onOpen, handleOnClose);

  const [date, setDate] = useState<Date>(initialValue.current || new Date());
  const [bulan, setBulan] = useState<number>(
    (initialValue.current?.getMonth() || date.getMonth()) + 1
  );
  const [tahun, setTahun] = useState<number>(
    initialValue.current?.getFullYear() || date.getFullYear()
  );
  const [selected, setSelected] = useState<any>(inputValue);

  const isBulanValid = (bulan: number) => {
    return bulan > 0 && bulan <= 12;
  };
  const isTahunValid = (tahun: number) => {
    return tahun >= 100 && tahun <= 270000;
  };

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
      confirm(selected);
      backOnClose();
    }
  }
  function setSelectedToToday() {
    const today = new Date();
    setDate(today);
    setSelected(today);
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
        onClick={onOpen}
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
        onClose={() => {
          backOnClose();
        }}
        initialFocusRef={initialRef}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader ref={initialRef}>
            {placeholder || "Pilih Tanggal"}
          </ModalHeader>

          <ModalBody>
            <Wrap mb={6}>
              <FormControl flex={"1 1 0"}>
                <FormLabel>Bulan</FormLabel>
                <Input
                  name="bulan"
                  placeholder="Bulan ke-"
                  onChange={(e) => {
                    const value = parseNumber(e.target.value);
                    if (value && value <= 12) {
                      setDate(new Date(tahun, value - 1));
                      setBulan(value);
                    }
                  }}
                  value={bulan === 0 ? "" : bulan}
                  // onFocus={() => {
                  //   if (monthInputRef.current) {
                  //     monthInputRef.current.select();
                  //   }
                  // }}
                />
              </FormControl>

              <FormControl flex={"1 1 0"}>
                <FormLabel>Tahun</FormLabel>
                <Input
                  name="tahun"
                  placeholder="Tahun"
                  onChange={(e) => {
                    const value = parseNumber(e.target.value);
                    if (value) {
                      setDate(new Date(value, bulan - 1));
                      setTahun(value);
                    }
                  }}
                  value={tahun === 0 ? "" : tahun}
                  // onFocus={() => {
                  //   if (yearInputRef.current) {
                  //     yearInputRef.current.select();
                  //   }
                  // }}
                />
              </FormControl>
            </Wrap>

            <VStack align={"stretch"} pt={1}>
              {!isBulanValid(bulan) && isTahunValid(tahun) && (
                <HStack h={"448px"} justify={"center"}>
                  <Text textAlign={"center"}>Bulan tidak valid</Text>
                </HStack>
              )}

              {isBulanValid(bulan) && !isTahunValid(tahun) && (
                <HStack h={"360px"} justify={"center"}>
                  <Text textAlign={"center"}>Tahun tidak valid</Text>
                </HStack>
              )}

              {!isBulanValid(bulan) && !isTahunValid(tahun) && (
                <HStack h={"360px"} justify={"center"}>
                  <Text textAlign={"center"}>Bulan dan Tahun tidak valid</Text>
                </HStack>
              )}

              {isBulanValid(bulan) && isTahunValid(tahun) && (
                <>
                  <VStack overflowX={"auto"} w={"100%"} align={"stretch"}>
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

                  <ButtonGroup w={"100%"}>
                    <Button
                      aria-label="Previous Month"
                      leftIcon={
                        <Icon as={RiArrowLeftSLine} fontSize={iconSize} />
                      }
                      pr={"10px"}
                      className="btn-outline clicky"
                      onClick={prevMonth}
                      w={"20%"}
                    ></Button>

                    <Button
                      flex={1}
                      className="btn-outline clicky"
                      onClick={setSelectedToToday}
                    >
                      Hari Ini
                    </Button>

                    <Button
                      aria-label="Next Month"
                      rightIcon={
                        <Icon as={RiArrowRightSLine} fontSize={iconSize} />
                      }
                      pl={"10px"}
                      className="btn-outline clicky"
                      onClick={nextMonth}
                      w={"20%"}
                    ></Button>
                  </ButtonGroup>
                </>
              )}
            </VStack>
          </ModalBody>

          <ModalFooter>
            <VStack align={"stretch"} w={"100%"}>
              <VStack borderRadius={8} bg={"var(--divider)"} p={2} gap={1}>
                <Text opacity={selected ? 1 : 0.6}>
                  {selected ? `${formatDate(selected)}` : "Pilih tanggal"}
                </Text>
              </VStack>

              <Button
                colorScheme="ap"
                className="btn-ap clicky"
                w={"100%"}
                isDisabled={required ? (selected ? false : true) : false}
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
