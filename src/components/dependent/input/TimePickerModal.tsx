import {
  Button,
  ButtonProps,
  HStack,
  Icon,
  IconButton,
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
import { RiArrowDownSLine, RiArrowUpSLine, RiTimeLine } from "@remixicon/react";
import { useRef, useState } from "react";
import { useErrorColor } from "../../../constant/colors";
import useBackOnClose from "../../../hooks/useBackOnClose";
import backOnClose from "../../../lib/backOnClose";
import formatTimeFromDate from "../../../lib/formatTimeFromDate";
import BackOnCloseButton from "../../independent/BackOnCloseButton";

interface Props extends ButtonProps {
  id: string;
  name: string;
  confirm: (inputValue: Date | undefined) => void;
  inputValue: Date | undefined;
  placeholder?: string;
  nonnullable?: boolean;
  isError?: boolean;
}

export default function TimePickerModal({
  id,
  name,
  confirm,
  inputValue,
  placeholder,
  nonnullable,
  isError,
  ...props
}: Props) {
  const initialValue = useRef(inputValue);
  const initialRef = useRef(null);

  const defaultTime = new Date();
  defaultTime.setHours(12, 0, 0, 0);

  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose(`${id}_${name}`, isOpen, onOpen, onClose);

  const [time, setTime] = useState<Date>(initialValue.current || defaultTime);
  const [hours, setHours] = useState<number>(
    initialValue.current?.getHours() || defaultTime.getHours()
  );
  const [minutes, setMinutes] = useState<number>(
    initialValue.current?.getMinutes() || defaultTime.getMinutes()
  );
  const [seconds, setSeconds] = useState<number>(
    initialValue.current?.getSeconds() || defaultTime.getSeconds()
  );

  function confirmSelected() {
    let confirmable = false;
    if (!nonnullable) {
      confirmable = true;
    } else {
      if (time) {
        confirmable = true;
      }
    }

    if (confirmable) {
      const confirmedTime = time;
      confirmedTime.setHours(hours);
      confirmedTime.setMinutes(minutes);
      confirmedTime.setSeconds(seconds);
      confirm(confirmedTime);
      backOnClose();
    }
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
          setTime(inputValue || defaultTime);
          setHours(initialValue.current?.getHours() || defaultTime.getHours());
          setMinutes(
            initialValue.current?.getMinutes() || defaultTime.getMinutes()
          );
          setSeconds(
            initialValue.current?.getSeconds() || defaultTime.getSeconds()
          );
        }}
        // _focus={{ boxShadow: "0 0 0px 2px var(--p500)" }}
        _focus={{ border: "1px solid var(--p500)", boxShadow: "none" }}
        {...props}
      >
        {inputValue ? (
          <Text>{formatTimeFromDate(inputValue)}</Text>
        ) : (
          <Text opacity={0.6}>{placeholder || `Pilih Waktu`}</Text>
        )}

        <Icon as={RiTimeLine} mb={"1px"} fontSize={17} />
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
                {placeholder || "Pilih Waktu"}
              </Text>

              <BackOnCloseButton aria-label="close-back-button" />
            </HStack>
          </ModalHeader>

          <ModalBody>
            <HStack justify={"space-between"}>
              <VStack flex={"1 1 0"} align={"stretch"} gap={0}>
                <IconButton
                  aria-label="add hour button"
                  icon={<Icon as={RiArrowUpSLine} fontSize={20} />}
                  className="btn-outline clicky"
                  onClick={() => {
                    if (hours < 23) {
                      setHours(hours + 1);
                    } else {
                      setHours(0);
                    }
                  }}
                />

                <VStack my={4}>
                  <Text
                    fontSize={52}
                    fontWeight={600}
                    textAlign={"center"}
                    lineHeight={1}
                    className="num"
                  >
                    {String(hours).padStart(2, "0")}
                  </Text>
                  <Text textAlign={"center"}>Jam</Text>
                </VStack>

                <IconButton
                  aria-label="reduce hour button"
                  icon={<Icon as={RiArrowDownSLine} fontSize={20} />}
                  className="btn-outline clicky"
                  onClick={() => {
                    if (hours > 0) {
                      setHours(hours - 1);
                    } else {
                      setHours(23);
                    }
                  }}
                />
              </VStack>

              <Text fontSize={50} opacity={0.2} mt={-10}>
                :
              </Text>

              <VStack flex={"1 1 0"} align={"stretch"} gap={0}>
                <IconButton
                  aria-label="add hour button"
                  icon={<Icon as={RiArrowUpSLine} fontSize={20} />}
                  className="btn-outline clicky"
                  onClick={() => {
                    if (minutes < 59) {
                      setMinutes(minutes + 1);
                    } else {
                      setMinutes(0);
                    }
                  }}
                />

                <VStack my={4}>
                  <Text
                    fontSize={52}
                    fontWeight={600}
                    textAlign={"center"}
                    lineHeight={1}
                    className="num"
                  >
                    {String(minutes).padStart(2, "0")}
                  </Text>
                  <Text textAlign={"center"}>Menit</Text>
                </VStack>

                <IconButton
                  aria-label="reduce hour button"
                  icon={<Icon as={RiArrowDownSLine} fontSize={20} />}
                  className="btn-outline clicky"
                  onClick={() => {
                    if (minutes > 0) {
                      setMinutes(minutes - 1);
                    } else {
                      setMinutes(59);
                    }
                  }}
                />
              </VStack>

              <Text fontSize={50} opacity={0.2} mt={-10}>
                :
              </Text>

              <VStack flex={"1 1 0"} align={"stretch"} gap={0}>
                <IconButton
                  aria-label="add hour button"
                  icon={<Icon as={RiArrowUpSLine} fontSize={20} />}
                  className="btn-outline clicky"
                  onClick={() => {
                    if (seconds < 59) {
                      setSeconds(seconds + 1);
                    } else {
                      setSeconds(0);
                    }
                  }}
                />

                <VStack my={4}>
                  <Text
                    fontSize={52}
                    fontWeight={600}
                    textAlign={"center"}
                    lineHeight={1}
                    className="num"
                  >
                    {String(seconds).padStart(2, "0")}
                  </Text>
                  <Text textAlign={"center"}>Detik</Text>
                </VStack>

                <IconButton
                  aria-label="reduce hour button"
                  icon={<Icon as={RiArrowDownSLine} fontSize={20} />}
                  className="btn-outline clicky"
                  onClick={() => {
                    if (seconds > 0) {
                      setSeconds(seconds - 1);
                    } else {
                      setSeconds(59);
                    }
                  }}
                />
              </VStack>
            </HStack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="ap"
              className="btn-ap clicky"
              w={"100%"}
              isDisabled={nonnullable ? (time ? false : true) : false}
              onClick={confirmSelected}
            >
              Konfirmasi
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
