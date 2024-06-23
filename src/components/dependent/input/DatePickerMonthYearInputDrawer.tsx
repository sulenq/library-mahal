import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Icon,
  IconButton,
  Input,
  SimpleGrid,
  StackProps,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { RiAddLine, RiSubtractLine } from "@remixicon/react";
import { Dispatch, useRef, useState } from "react";
import months from "../../../constant/months";
import { iconSize } from "../../../constant/sizes";
import useBackOnClose from "../../../hooks/useBackOnClose";
import backOnClose from "../../../lib/backOnClose";
import formatDate from "../../../lib/formatDate";
import parseNumber from "../../../lib/parseNumber";

interface Props extends StackProps {
  id: string;
  bulan: number;
  setBulan: Dispatch<number>;
  tahun: number;
  setTahun: Dispatch<number>;
  setDate: Dispatch<Date>;
  placement?: "top" | "bottom" | "left" | "right";
}

export default function DatePickerMonthYearInputDrawer({
  id,
  bulan,
  setBulan,
  tahun,
  setTahun,
  setDate,
  placement,
  ...props
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  useBackOnClose(
    id || "datepicker_month_year_input_modal",
    isOpen,
    onOpen,
    onClose
  );

  const [bulanLocal, setBulanLocal] = useState<number>(bulan);
  const [tahunLocal, setTahunLocal] = useState<number>(tahun);

  const isTahunValid = (tahun: number) => {
    return tahun >= 100 && tahun <= 270000;
  };

  function confirm() {
    setBulan(bulanLocal);
    setTahun(tahunLocal);
    setDate(new Date(tahunLocal, bulanLocal));
    backOnClose();
  }

  return (
    <>
      <HStack
        as={Button}
        className="btn-outline clicky"
        justify={"center"}
        flex={1}
        _hover={{ bg: "var(--divider)" }}
        onClick={() => {
          onOpen();
          setBulanLocal(bulan);
          setTahunLocal(tahun);
        }}
        {...props}
      >
        <Text fontSize={17} fontWeight={600}>
          {`${formatDate(new Date(tahun, bulan), {
            month: "long",
            year: "numeric",
          })}`}
        </Text>
      </HStack>

      <Drawer
        isOpen={isOpen}
        onClose={() => {
          backOnClose();
        }}
        initialFocusRef={initialRef}
        placement={placement || "bottom"}
        size={placement === "left" || placement === "right" ? "sm" : ""}
      >
        <DrawerOverlay />
        <DrawerContent
          borderRadius={
            placement === "left" || placement === "right"
              ? ""
              : placement === "top"
              ? "0 0 12px 12px "
              : "12px 12px 0 0"
          }
        >
          <DrawerCloseButton />
          <DrawerHeader ref={initialRef}>
            <HStack align={"start"} justify={"space-between"}>
              <Text fontSize={20} fontWeight={600}>
                Set Bulan & Tahun
              </Text>
            </HStack>
          </DrawerHeader>

          <DrawerBody>
            <FormControl mb={4}>
              <FormLabel>Bulan</FormLabel>
              <SimpleGrid columns={[2, 3]} gap={2}>
                {months.map((month, i) => (
                  <Button
                    key={i}
                    borderColor={i === bulanLocal ? "p.500" : ""}
                    bg={i === bulanLocal ? "var(--p500a3) !important" : ""}
                    className="btn-outline"
                    onClick={() => {
                      setBulanLocal(i);
                    }}
                  >
                    {month}
                  </Button>
                ))}
              </SimpleGrid>
            </FormControl>

            <FormControl isInvalid={!isTahunValid(tahunLocal)}>
              <FormLabel>Tahun</FormLabel>
              <HStack>
                <IconButton
                  aria-label="year min button"
                  icon={<Icon as={RiSubtractLine} fontSize={iconSize} />}
                  className="btn-outline clicky"
                  isDisabled={tahunLocal <= 0}
                  onClick={() => {
                    if (tahunLocal > 0) {
                      setTahunLocal(tahunLocal - 1);
                    }
                  }}
                />
                <Input
                  name="tahun"
                  textAlign={"center"}
                  placeholder="Tahun"
                  onChange={(e) => {
                    const value = parseNumber(e.target.value);
                    if (value) {
                      setTahunLocal(value);
                    } else if (value === null) {
                      setTahunLocal(0);
                    }
                  }}
                  value={tahunLocal === 0 ? "" : tahunLocal}
                />
                <IconButton
                  aria-label="year plus button"
                  icon={<Icon as={RiAddLine} fontSize={iconSize} />}
                  className="btn-outline clicky"
                  isDisabled={tahunLocal <= 0}
                  onClick={() => {
                    setTahunLocal(tahunLocal + 1);
                  }}
                />
              </HStack>
              <FormErrorMessage>
                <Text mx={"auto"} textAlign={"center"}>
                  Tahun tidak valid
                </Text>
              </FormErrorMessage>
            </FormControl>
          </DrawerBody>

          <DrawerFooter pb={placement === "bottom" ? 8 : 6}>
            <Button
              onClick={confirm}
              w={"100%"}
              className="btn-ap clicky"
              isDisabled={!isTahunValid(tahunLocal)}
              colorScheme="ap"
            >
              Terapkan
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
