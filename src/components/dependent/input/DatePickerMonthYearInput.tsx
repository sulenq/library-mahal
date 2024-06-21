import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  StackProps,
  Text,
  useDisclosure,
  Wrap,
} from "@chakra-ui/react";
import { Dispatch, useRef } from "react";
import useBackOnClose from "../../../hooks/useBackOnClose";
import backOnClose from "../../../lib/backOnClose";
import formatDate from "../../../lib/formatDate";
import parseNumber from "../../../lib/parseNumber";

interface Props extends StackProps {
  bulan: number;
  setBulan: Dispatch<number>;
  tahun: number;
  setTahun: Dispatch<number>;
  setDate: Dispatch<Date>;
}

export default function DatePickerMonthYearInput({
  bulan,
  setBulan,
  tahun,
  setTahun,
  setDate,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  useBackOnClose("datePickerMonthYearInput", isOpen, onOpen, onClose);

  return (
    <>
      <HStack
        as={Button}
        className="btn clicky"
        justify={"center"}
        flex={1}
        _hover={{ bg: "var(--divider)" }}
        onClick={onOpen}
      >
        <Text fontSize={18} fontWeight={600}>{`${formatDate(
          new Date(tahun, bulan - 1),
          { month: "long" }
        )} ${tahun}`}</Text>
      </HStack>

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
            <HStack justify={"space-between"}>
              <Text fontSize={20} fontWeight={600}>
                Set Bulan & Tahun
              </Text>
            </HStack>
          </ModalHeader>
          <ModalBody>
            <Wrap>
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
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={backOnClose}
              w={"100%"}
              className="btn-ap clicky"
              colorScheme="ap"
            >
              Konfirmasi
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
