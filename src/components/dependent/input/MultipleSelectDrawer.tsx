import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  HStack,
  Icon,
  Text,
  useDisclosure,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import { RiArrowDownSLine } from "@remixicon/react";
import { useRef, useState } from "react";
import {
  useDarkLightColor,
  useErrorColor,
  useLightDarkColor,
} from "../../../constant/colors";
import { SelectOption } from "../../../constant/interfaces";
import useBackOnClose from "../../../hooks/useBackOnClose";
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
  placement?: "top" | "bottom" | "left" | "right";
  placeholder?: string;
  required?: boolean;
}

export default function MultipleSelectDrawer({
  id,
  name,
  options,
  onConfirm,
  inputValue,
  withSearch,
  optionsDisplay = "list",
  isError,
  placement = "bottom",
  placeholder,
  required,
  ...props
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose(`${id}-[${name}]`, isOpen, onOpen, onClose);
  const initialRef = useRef(null);

  const [startPos, setStartPos] = useState(0);
  const [translate, setTranslate] = useState(0);
  const drawerBodyRef = useRef<HTMLDivElement>(null);
  const isSideDrawer = placement === "left" || placement === "right";
  const isLeftOrTopDrawer = placement === "left" || placement === "top";
  const onTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    setStartPos(
      isSideDrawer ? event.touches[0].clientX : event.touches[0].clientY
    );
  };
  const onTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    const currentPos = isSideDrawer
      ? event.touches[0].clientX
      : event.touches[0].clientY;
    const diffPos = currentPos - startPos;
    if (isLeftOrTopDrawer ? diffPos < 0 : diffPos > 0) {
      // Swipe
      setTranslate(diffPos);
      if (drawerBodyRef.current) {
        drawerBodyRef.current.style.transition = "0ms";
        drawerBodyRef.current.style.transform = isSideDrawer
          ? `translateX(${diffPos}px)`
          : `translateY(${diffPos}px)`;
      }
    }
  };
  const onTouchEnd = () => {
    if (drawerBodyRef.current !== null) {
      const comparison = isSideDrawer
        ? isLeftOrTopDrawer
          ? (drawerBodyRef.current.offsetWidth / 6) * -1
          : drawerBodyRef.current.offsetWidth / 6
        : isLeftOrTopDrawer
        ? (drawerBodyRef.current.offsetHeight / 6) * -1
        : drawerBodyRef.current.offsetHeight / 6;
      if (isLeftOrTopDrawer ? translate < comparison : translate > comparison) {
        onClose();
      } else {
        if (drawerBodyRef.current) {
          drawerBodyRef.current.style.transition = "200ms";
          drawerBodyRef.current.style.transform = isSideDrawer
            ? `translateX(0px)`
            : `translateY(0px)`;
        }
      }
    }

    setTranslate(0);
  };

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
  const lightDarkColor = useLightDarkColor();
  const darkLightColor = useDarkLightColor();

  return (
    <>
      <Button
        className="btn-clear"
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

      <Drawer
        isOpen={isOpen}
        onClose={backOnClose}
        initialFocusRef={initialRef}
        placement={placement}
      >
        <DrawerOverlay />
        <DrawerContent bg={"transparent"} h={isSideDrawer ? "" : "600px"}>
          <DrawerBody
            ref={drawerBodyRef}
            onTouchStart={isSideDrawer ? onTouchStart : undefined}
            onTouchMove={isSideDrawer ? onTouchMove : undefined}
            onTouchEnd={isSideDrawer ? onTouchEnd : undefined}
            px={0}
          >
            {!isSideDrawer && placement === "bottom" && (
              <VStack
                className="drawerIndicator"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                <Box
                  w={"100px"}
                  h={"6px"}
                  bg={darkLightColor}
                  opacity={0.2}
                  borderRadius={6}
                  flexShrink={0}
                  mx={"auto"}
                  mb={2}
                />
              </VStack>
            )}

            <VStack
              pb={placement === "bottom" ? 8 : 6}
              h={"calc(100% - 14px)"}
              bg={lightDarkColor}
              align={"stretch"}
              gap={0}
              borderRadius={
                isSideDrawer
                  ? ""
                  : placement === "top"
                  ? "0 0 12px 12px"
                  : "12px 12px 0 0"
              }
            >
              <Box pt={"18px"} pr={5} pb={5} pl={6}>
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
              </Box>

              {optionsDisplay === "list" && (
                <VStack
                  align={"stretch"}
                  overflowY={"auto"}
                  px={6}
                  className="scrollY"
                >
                  {fo.map((option, i) => (
                    <Button
                      key={i}
                      flexShrink={0}
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
                <Wrap px={6} overflowY={"auto"}>
                  {fo.map((option, i) => (
                    <Button
                      flexShrink={0}
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
                <HStack justify={"center"} minH={"100px"} opacity={0.4}>
                  <Text textAlign={"center"} fontWeight={600}>
                    Opsi tidak ditemukan
                  </Text>
                </HStack>
              )}

              <ButtonGroup px={6} w={"100%"} pt={5} mt={"auto"}>
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
              </ButtonGroup>
            </VStack>

            {!isSideDrawer && placement === "top" && (
              <VStack
                className="drawerIndicator"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                <Box
                  w={"100px"}
                  h={"6px"}
                  bg={darkLightColor}
                  opacity={0.2}
                  borderRadius={6}
                  flexShrink={0}
                  mx={"auto"}
                  mt={2}
                />
              </VStack>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
