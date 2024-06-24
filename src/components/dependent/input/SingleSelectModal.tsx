import {
  Box,
  Button,
  HStack,
  Icon,
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
import { RiArrowDownSLine } from "@remixicon/react";
import { useRef, useState } from "react";
import { useErrorColor } from "../../../constant/colors";
import { SelectOption } from "../../../constant/interfaces";
import useBackOnClose from "../../../hooks/useBackOnClose";
import backOnClose from "../../../lib/backOnClose";
import SearchComponent from "./SearchComponent";

interface Props {
  id: string;
  name: string;
  options: SelectOption[];
  onConfirm: (inputValue: SelectOption | undefined) => void;
  inputValue: SelectOption | undefined;
  withSearch?: boolean;
  optionsDisplay?: "list" | "chip";
  isError?: boolean;
  placeholder?: string;
  required?: boolean;
}

export default function SingleSelectModal({
  id,
  name,
  options,
  onConfirm,
  inputValue,
  withSearch,
  optionsDisplay = "list",
  isError,
  placeholder,
  required,
  ...props
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose(`${id}-[${name}]`, isOpen, onOpen, onClose);
  const initialRef = useRef(null);

  const [search, setSearch] = useState<string | undefined>("");
  const [selected, setSelected] = useState<SelectOption | undefined>(
    inputValue
  );
  const fo = search
    ? options.filter((option) => {
        const searchTerm = search.toLowerCase();
        return (
          option.value.toString().toLowerCase().includes(searchTerm) ||
          option.label.toString().toLowerCase().includes(searchTerm) ||
          option.subLabel?.toString().toLowerCase().includes(searchTerm)
        );
      })
    : options;

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
      if (selected) {
        onConfirm(selected);
      } else {
        onConfirm(undefined);
      }
      backOnClose();
    }
  }

  // SX
  const errorColor = useErrorColor();

  return (
    <>
      <Button
        className="btn-clear"
        px={"16px !important"}
        border={"1px solid var(--divider3)"}
        boxShadow={isError ? errorColor : ""}
        borderRadius={8}
        gap={3}
        _focus={{
          border: "1px solid var(--p500)",
          boxShadow: "none !important",
        }}
        cursor={"pointer"}
        onClick={() => {
          onOpen();
          setSelected(inputValue);
        }}
        justifyContent={"space-between"}
        w={"100%"}
        role="group"
        {...props}
      >
        <HStack>
          <Text
            opacity={inputValue ? 1 : 0.3}
            fontWeight={400}
            overflow={"hidden"}
            whiteSpace={"nowrap"}
            textOverflow={"ellipsis"}
          >
            {inputValue ? inputValue.label : placeholder || "Pilih Salah Satu"}
          </Text>

          <Text fontWeight={400} opacity={0.4}>
            {inputValue && inputValue.subLabel}
          </Text>
        </HStack>

        <Icon as={RiArrowDownSLine} fontSize={18} />
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={backOnClose}
        initialFocusRef={initialRef}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader ref={initialRef}>
            <HStack justify={"space-between"}>
              <Text fontSize={20} fontWeight={600}>
                {placeholder || "Pilih Salah Satu"}
              </Text>
            </HStack>
            {withSearch && (
              <Box mt={4}>
                <SearchComponent
                  name="search select options"
                  inputValue={search}
                  onChangeSetter={(inputValue) => {
                    setSearch(inputValue);
                  }}
                />
              </Box>
            )}
          </ModalHeader>
          <ModalBody>
            {optionsDisplay === "list" && (
              <VStack align={"stretch"}>
                {fo.map((option, i) => (
                  <Button
                    key={i}
                    justifyContent={"space-between"}
                    className="btn-outline"
                    onClick={() => {
                      setSelected(option);
                    }}
                    borderColor={
                      selected && selected.value === option.value ? "p.500" : ""
                    }
                    bg={
                      selected && selected.value === option.value
                        ? "var(--p500a3) !important"
                        : ""
                    }
                  >
                    <Text>{option.label}</Text>

                    <Text opacity={0.4}>{option.subLabel}</Text>
                  </Button>
                ))}
              </VStack>
            )}

            {optionsDisplay === "chip" && (
              <Wrap>
                {fo.map((option, i) => (
                  <Button
                    key={i}
                    justifyContent={"space-between"}
                    className="btn-outline"
                    onClick={() => {
                      setSelected(option);
                    }}
                    borderColor={
                      selected && selected.value === option.value ? "p.500" : ""
                    }
                    bg={
                      selected && selected.value === option.value
                        ? "var(--p500a3) !important"
                        : ""
                    }
                    gap={2}
                  >
                    <Text>{option.label}</Text>
                    {/* <Text opacity={0.4}>{option.subLabel}</Text> */}
                  </Button>
                ))}
              </Wrap>
            )}

            {fo.length === 0 && (
              <HStack justify={"center"} minH={"100px"} opacity={0.4}>
                <Text textAlign={"center"} fontWeight={600}>
                  Opsi tidak ditemukan
                </Text>
              </HStack>
            )}
          </ModalBody>
          <ModalFooter gap={2}>
            <Button
              className="btn-outline clicky"
              w={"100%"}
              onClick={() => {
                setSelected(undefined);
              }}
            >
              Reset
            </Button>

            <Button
              colorScheme="ap"
              className="btn-ap clicky"
              w={"100%"}
              isDisabled={required ? (selected ? false : true) : false}
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
