import {
  Box,
  Button,
  HStack,
  Icon,
  Text,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import { RiArrowDownSLine } from "@remixicon/react";
import { useState } from "react";
import { useErrorColor } from "../../../constant/colors";
import { Interface__SelectOption } from "../../../constant/interfaces";
import backOnClose from "../../../lib/backOnClose";
import CustomDrawer from "../../independent/wrapper/CustomDrawer";
import DisclosureHeader from "../DisclosureHeader";
import SearchComponent from "./SearchComponent";

interface Props {
  id: string;
  name: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  options: Interface__SelectOption[];
  onConfirm: (inputValue: Interface__SelectOption | undefined) => void;
  inputValue: Interface__SelectOption | undefined;
  withSearch?: boolean;
  optionsDisplay?: "list" | "chip";
  isError?: boolean;
  placement?: "top" | "bottom" | "left" | "right";
  placeholder?: string;
  nonNullable?: boolean;
}

export default function SingleSelectDrawer({
  id,
  name,
  isOpen,
  onOpen,
  onClose,
  options,
  onConfirm,
  inputValue,
  withSearch,
  optionsDisplay = "list",
  isError,
  placement = "bottom",
  placeholder,
  nonNullable,
  ...props
}: Props) {
  const [search, setSearch] = useState<string | undefined>("");
  const [selected, setSelected] = useState<Interface__SelectOption | undefined>(
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
        px={"16px !important"}
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

      <CustomDrawer
        id={id}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        name={name}
        placement={placement}
        header={
          <Box pt={"18px"} pr={5} pb={5} pl={6}>
            <DisclosureHeader title={placeholder || "Multi Pilih"} p={0} />

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
          </Box>
        }
        footer={
          <>
            <Button
              className="btn-solid clicky"
              w={"100%"}
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
          </>
        }
      >
        {optionsDisplay === "list" && (
          <VStack
            align={"stretch"}
            px={6}
            overflowY={"auto"}
            className="scrollY"
          >
            {fo.map((option, i) => (
              <Button
                flexShrink={0}
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
                    ? "var(--p500a4) !important"
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
          <Wrap overflowY={"auto"} px={6} className="scrollY">
            {fo.map((option, i) => (
              <Button
                flexShrink={0}
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
                    ? "var(--p500a4) !important"
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
      </CustomDrawer>
    </>
  );
}
