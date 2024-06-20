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
  FormControl,
  FormLabel,
  HStack,
  Icon,
  IconButton,
  Input,
  Text,
  useDisclosure,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import {
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiCalendarLine,
  RiCloseLine,
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
import BackOnCloseButton from "../../independent/BackOnCloseButton";
type PrefixOption = "basic" | "basicShort" | "long" | "longShort" | "short";

interface Props extends ButtonProps {
  id: string;
  name: string;
  confirm: (newInputValue: Date) => void;
  inputValue: Date | null;
  dateFormatOptions?: PrefixOption | object;
  placeholder?: string;
  nonnullable?: boolean;
  isError?: boolean;
}

export default function DatePickerDrawer({
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
        placement="bottom"
      >
        <DrawerOverlay />
        <DrawerContent borderRadius={"12px 12px 0 0"}>
          <DrawerHeader
            ref={initialRef}
            w={"100%"}
            maxW={"720px !important"}
            mx={"auto"}
          >
            <HStack justify={"space-between"}>
              <Text fontSize={20} fontWeight={600}>
                {placeholder || "Pilih Tanggal"}
              </Text>

              <BackOnCloseButton aria-label="close-back-button" />
            </HStack>
          </DrawerHeader>

          <DrawerBody w={"100%"} maxW={"720px !important"} mx={"auto"}>
            <Wrap mb={4}>
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
                    } else if (value === null) {
                      setDate(new Date(tahun));
                      setBulan(0);
                    }
                  }}
                  value={bulan === 0 ? "" : bulan}
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
                    } else if (value === null) {
                      setDate(new Date(bulan - 1));
                      setTahun(0);
                    }
                  }}
                  value={tahun === 0 ? "" : tahun}
                />
              </FormControl>
            </Wrap>

            <VStack align={"stretch"}>
              {!isBulanValid(bulan) && isTahunValid(tahun) && (
                <HStack h={"392px"} justify={"center"}>
                  <Text textAlign={"center"}>Bulan tidak valid</Text>
                </HStack>
              )}

              {isBulanValid(bulan) && !isTahunValid(tahun) && (
                <HStack h={"392px"} justify={"center"}>
                  <Text textAlign={"center"}>Tahun tidak valid</Text>
                </HStack>
              )}

              {!isBulanValid(bulan) && !isTahunValid(tahun) && (
                <HStack h={"392px"} justify={"center"}>
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
          </DrawerBody>

          <DrawerFooter
            pb={12}
            w={"100%"}
            maxW={"720px !important"}
            mx={"auto"}
          >
            <VStack align={"stretch"} w={"100%"}>
              <HStack
                borderRadius={8}
                bg={"var(--divider)"}
                p={2}
                gap={1}
                justify={"center"}
              >
                {selected && (
                  <Icon as={RiCalendarLine} mr={"auto"} w={6} opacity={0.6} />
                )}

                <Text opacity={selected ? 1 : 0.6} fontWeight={600}>
                  {selected
                    ? `${formatDate(selected, "long")}`
                    : "Pilih tanggal"}
                </Text>

                {selected && (
                  <IconButton
                    aria-label="clear date button"
                    icon={<Icon as={RiCloseLine} fontSize={iconSize} />}
                    colorScheme="red"
                    borderRadius={"full"}
                    variant={"ghost"}
                    size={"xs"}
                    className="clicky"
                    ml={"auto"}
                    onClick={() => {
                      setSelected(null);
                    }}
                  />
                )}
              </HStack>

              <Button
                colorScheme="ap"
                className="btn-ap clicky"
                w={"100%"}
                isDisabled={nonnullable ? (selected ? false : true) : false}
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
