import { Badge, Box, Button, HStack, Icon, Text, Wrap } from "@chakra-ui/react";
import { RiArrowDownSLine } from "@remixicon/react";
import { useState } from "react";
import { useErrorColor } from "../../../constant/colors";
import { Interface__SelectOption } from "../../../constant/interfaces";
import useBackOnClose from "../../../hooks/useBackOnClose";
import backOnClose from "../../../lib/backOnClose";
import CContainer from "../../independent/wrapper/CContainer";
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
  onConfirm: (inputValue: Interface__SelectOption[] | undefined) => void;
  inputValue: Interface__SelectOption[] | undefined;
  withSearch?: boolean;
  optionsDisplay?: "list" | "chip";
  isError?: boolean;
  placement?: "top" | "bottom" | "left" | "right";
  placeholder?: string;
  nonNullable?: boolean;
}

export default function MultipleSelectDrawer({
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
  useBackOnClose(`${id}-${name}`, isOpen, onOpen, onClose);

  const [search, setSearch] = useState<string | undefined>("");
  const [selected, setSelected] = useState<
    Interface__SelectOption[] | undefined
  >(inputValue);
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
        px={inputValue ? "8px !important" : "16px !important"}
        {...props}
      >
        <HStack w={"100%"}>
          {inputValue ? (
            inputValue.map((value, i) => {
              return (
                i < 2 && (
                  <Badge
                    key={i}
                    borderRadius={6}
                    bg={"var(--divider)"}
                    textTransform={"none"}
                    flex={"1 1 100px"}
                    h={"24px"}
                    pt={"5.5px"}
                  >
                    {value.label}
                  </Badge>
                )
              );
            })
          ) : placeholder ? (
            <Text opacity={0.3} fontWeight={400}>
              {placeholder}
            </Text>
          ) : (
            <Text opacity={0.3} fontWeight={400}>
              Multi Pilih
            </Text>
          )}

          {inputValue && inputValue.length - 2 > 0 && (
            <Badge bg={"var(--divider)"} h={"24px"} pt={"5.5px"}>
              +{inputValue.length - 2 > 0 && inputValue.length - 2}
            </Badge>
          )}
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
          <CContainer px={6} gap={2}>
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
                border={
                  selected &&
                  selected.some((item) => item.value === option.value)
                    ? "1px solid var(--p500a2)"
                    : "none"
                }
                bg={
                  selected &&
                  selected.some((item) => item.value === option.value)
                    ? "var(--p500a4) !important"
                    : ""
                }
              >
                <Text>{option.label}</Text>

                <Text opacity={0.4}>{option.subLabel}</Text>
              </Button>
            ))}
          </CContainer>
        )}

        {optionsDisplay === "chip" && (
          <Wrap px={6}>
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
                borderRadius={"full"}
                borderColor={
                  selected &&
                  selected.some((item) => item.value === option.value)
                    ? "var(--p500a2)"
                    : ""
                }
                bg={
                  selected &&
                  selected.some((item) => item.value === option.value)
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
          <HStack px={6} justify={"center"} opacity={0.4} minH={"100px"}>
            <Text textAlign={"center"} fontWeight={600}>
              Opsi tidak ditemukan
            </Text>
          </HStack>
        )}
      </CustomDrawer>
    </>
  );
}
