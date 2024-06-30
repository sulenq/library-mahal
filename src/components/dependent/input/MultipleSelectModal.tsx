import {
  Badge,
  Box,
  Button,
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
  Wrap,
} from "@chakra-ui/react";
import { RiArrowDownSLine } from "@remixicon/react";
import { useRef, useState } from "react";
import { useErrorColor } from "../../../constant/colors";
import { SelectOption } from "../../../constant/interfaces";
import useBackOnClose from "../../../hooks/useBackOnClose";
import useScreenHeight from "../../../hooks/useScreenHeight";
import backOnClose from "../../../lib/backOnClose";
import BackOnCloseButton from "../../independent/BackOnCloseButton";
import SearchComponent from "./SearchComponent";

interface Props {
  id: string;
  name: string;
  options: SelectOption[];
  onConfirm: (inputValue: SelectOption[] | undefined) => void;
  inputValue: SelectOption[] | undefined;
  withSearch?: boolean;
  optionsDisplay?: "list" | "chip";
  isError?: boolean;
  placeholder?: string;
  nonNullable?: boolean;
}

export default function MultipleSelectModal({
  id,
  name,
  options,
  onConfirm,
  inputValue,
  withSearch,
  optionsDisplay = "list",
  isError,
  placeholder,
  nonNullable,
  ...props
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose(`${id}-${name}`, isOpen, onOpen, onClose);
  const initialRef = useRef(null);

  const [search, setSearch] = useState<string | undefined>("");
  const [selected, setSelected] = useState<SelectOption[] | undefined>(
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
    if (!nonNullable) {
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
  const sh = useScreenHeight();

  return (
    <>
      <Button
        className="btn-clear"
        border={"1px solid var(--divider3)"}
        borderColor={isError ? errorColor : ""}
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
        px={inputValue ? "8px !important" : "16px !important"}
        {...props}
      >
        <HStack w={"100%"}>
          {inputValue
            ? inputValue.map((value, i) => {
                return (
                  i < 2 && (
                    <Badge
                      key={i}
                      borderRadius={6}
                      bg={"var(--divider)"}
                      textTransform={"none"}
                      flex={"1 1 100px"}
                    >
                      {value.label}
                    </Badge>
                  )
                );
              })
            : <Text opacity={0.3}>{placeholder}</Text> || (
                <Text opacity={0.3}>Multi Pilih</Text>
              )}

          {inputValue && inputValue.length - 2 > 0 && (
            <Badge bg={"var(--divider)"}>
              +{inputValue.length - 2 > 0 && inputValue.length - 2}
            </Badge>
          )}
        </HStack>

        <Icon as={RiArrowDownSLine} fontSize={18} />
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={backOnClose}
        initialFocusRef={initialRef}
        isCentered
        scrollBehavior={sh < 720 ? "outside" : "inside"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader ref={initialRef}>
            <HStack justify={"space-between"}>
              <Text fontSize={20} fontWeight={600}>
                {placeholder || "Multi Pilih"}
              </Text>
              <BackOnCloseButton aria-label="back on close button" />
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
          <ModalBody
            className="scrollY"
            minH={withSearch ? "360px" : ""}
            maxH={withSearch ? "360px" : ""}
            overflowY={"auto"}
          >
            {optionsDisplay === "list" && (
              <VStack align={"stretch"}>
                {fo.map((option, i) => (
                  <Button
                    key={i}
                    justifyContent={"space-between"}
                    className="btn-outline"
                    onClick={() => {
                      const isSelected =
                        selected &&
                        selected.some((item) => item.value === option.value);
                      let newSelected = selected || [];

                      if (isSelected) {
                        // Filter out the option if it's already selected
                        newSelected = newSelected.filter(
                          (item) => item.value !== option.value
                        );
                      } else {
                        // Add the option to the selected array
                        newSelected = [...newSelected, option];
                      }

                      setSelected(newSelected);
                    }}
                    borderColor={
                      selected &&
                      selected.some((item) => item.value === option.value)
                        ? "var(--p500a1)"
                        : ""
                    }
                    bg={
                      selected &&
                      selected.some((item) => item.value === option.value)
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
                      const isSelected =
                        selected &&
                        selected.some((item) => item.value === option.value);
                      let newSelected = selected || [];

                      if (isSelected) {
                        // Filter out the option if it's already selected
                        newSelected = newSelected.filter(
                          (item) => item.value !== option.value
                        );
                      } else {
                        // Add the option to the selected array
                        newSelected = [...newSelected, option];
                      }

                      setSelected(newSelected);
                    }}
                    borderColor={
                      selected &&
                      selected.some((item) => item.value === option.value)
                        ? "var(--p500a1)"
                        : ""
                    }
                    bg={
                      selected &&
                      selected.some((item) => item.value === option.value)
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
              <HStack justify={"center"} opacity={0.4} minH={"100px"}>
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
              isDisabled={nonNullable ? (selected ? false : true) : false}
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
