export default function Select() {
  return <div>Select</div>;
}

// import {
//   Button,
//   ButtonGroup,
//   ButtonProps,
//   HStack,
//   Icon,
//   Modal,
//   ModalBody,
//   ModalCloseButton,
//   ModalContent,
//   ModalFooter,
//   ModalHeader,
//   ModalOverlay,
//   Text,
//   useColorModeValue,
//   useDisclosure,
//   VStack,
// } from "@chakra-ui/react";
// import { RiArrowDownSLine } from "@remixicon/react";
// import { Dispatch, forwardRef, useImperativeHandle, useRef } from "react";
// import formatNumber from "../../lib/formatNumber";
// import useBackOnClose from "../../lib/useBackOnClose";
// import useScreenHeight from "../../lib/useScreenHeight";
// import SearchComponent from "../dependent/SearchComponent";

// interface Props extends ButtonProps {
//   placeholder: string;
//   children: any;
//   selected: any;
//   initialSelected?: any;
//   formik?: any;
//   name?: string;
//   confirmSelect?: any;
//   noUseBackOnClose?: boolean;
//   noSearch?: boolean;
//   noReset?: boolean;
//   search?: string;
//   setSearch?: Dispatch<string>;
//   modalSize?: string;
//   isMultiSelect?: boolean;
//   setSelected?: Dispatch<any>;
//   maxDisplayed?: number;
//   nullLabel?: string;
// }

// const Select = forwardRef(
//   (
//     {
//       placeholder,
//       children,
//       selected,
//       initialSelected,
//       formik,
//       name,
//       confirmSelect,
//       noUseBackOnClose,
//       noSearch,
//       noReset,
//       search,
//       setSearch,
//       modalSize,
//       isMultiSelect,
//       setSelected,
//       maxDisplayed,
//       nullLabel,
//       ...props
//     }: Props,
//     ref
//   ) => {
//     const { isOpen, onOpen, onClose } = useDisclosure();
//     const backOnCloseHook = useBackOnClose;
//     if (!noUseBackOnClose) {
//       backOnCloseHook(isOpen, onClose);
//     }
//     const handleOnClose = () => {
//       onClose();
//       if (!noUseBackOnClose) {
//         window.history.back();
//       }
//     };
//     const initialRef = useRef(null);

//     useImperativeHandle(ref, () => ({
//       handleOnClose,
//     }));

//     const md = maxDisplayed ? maxDisplayed : 2;

//     // SX
//     const selectOnError = useColorModeValue(
//       "0 0 0 1px #E53E3E",
//       "0 0 0 1px #FC8181"
//     );
//     const sh = useScreenHeight();

//     return (
//       <>
//         <Button
//           className="btn-clear"
//           h={"40px"}
//           px={"16px !important"}
//           border={"1px solid var(--divider3)"}
//           boxShadow={formik && name && formik.errors[name] ? selectOnError : ""}
//           borderRadius={8}
//           gap={3}
//           _focus={{
//             border: "1px solid var(--p500)",
//             boxShadow: "none !important",
//           }}
//           cursor={"pointer"}
//           onClick={onOpen}
//           justifyContent={"space-between"}
//           w={"100%"}
//           pl={
//             isMultiSelect && initialSelected && initialSelected.length > 0
//               ? "6px !important"
//               : ""
//           }
//           role="group"
//           {...props}
//         >
//           {!isMultiSelect && (
//             <Text
//               opacity={
//                 (initialSelected !== null &&
//                   initialSelected !== undefined &&
//                   initialSelected !== "") ||
//                 nullLabel
//                   ? 1
//                   : 0.3
//               }
//               fontSize={14}
//               fontWeight={400}
//               overflow={"hidden"}
//               whiteSpace={"nowrap"}
//               textOverflow={"ellipsis"}
//             >
//               {initialSelected ? (
//                 <>
//                   {initialSelected.label}
//                   {initialSelected.label2 && (
//                     <span style={{ opacity: 0.6 }}>
//                       {` (${initialSelected.label2})`}
//                     </span>
//                   )}
//                 </>
//               ) : (
//                 nullLabel || placeholder
//               )}
//             </Text>
//           )}

//           {isMultiSelect && initialSelected && initialSelected.length > 0 && (
//             <HStack
//               w={"100%"}
//               overflow={"hidden"}
//               whiteSpace={"nowrap"}
//               spacing={"5px"}
//             >
//               {initialSelected.map((karyawan: any, i: number) => {
//                 const ok = i < md;
//                 return (
//                   ok && (
//                     <HStack
//                       flex={"1 1 0"}
//                       textAlign={"center"}
//                       key={i}
//                       borderRadius={4}
//                       bg={"var(--p500a4)"}
//                       h={26}
//                       px={2}
//                       justify={"center"}
//                       overflow={"hidden"}
//                     >
//                       <Text
//                         fontSize={14}
//                         color={"p.500"}
//                         fontWeight={500}
//                         overflow={"hidden"}
//                         whiteSpace={"nowrap"}
//                         textOverflow={"ellipsis"}
//                       >
//                         {karyawan.label}
//                       </Text>
//                     </HStack>
//                   )
//                 );
//               })}

//               {initialSelected.length > 1 && (
//                 <HStack
//                   textAlign={"center"}
//                   borderRadius={4}
//                   bg={"var(--p500a4)"}
//                   h={26}
//                   px={2}
//                   justify={"center"}
//                   overflow={"hidden"}
//                 >
//                   <Text
//                     fontSize={14}
//                     color={"p.500"}
//                     fontWeight={500}
//                     overflow={"hidden"}
//                     whiteSpace={"nowrap"}
//                     textOverflow={"ellipsis"}
//                   >
//                     +{formatNumber(initialSelected.length - 1)}
//                   </Text>
//                 </HStack>
//               )}
//             </HStack>
//           )}

//           {isMultiSelect && initialSelected && initialSelected.length === 0 && (
//             <Text
//               flexShrink={0}
//               opacity={nullLabel ? 1 : 0.3}
//               fontSize={14}
//               fontWeight={400}
//             >
//               {nullLabel || placeholder}
//             </Text>
//           )}

//           <Icon as={RiArrowDownSLine} />
//         </Button>

//         <Modal
//           isOpen={isOpen}
//           onClose={() => {
//             handleOnClose();
//             if (setSelected) {
//               setSelected(initialSelected);
//             }
//           }}
//           scrollBehavior={sh < 500 ? "outside" : "inside"}
//           initialFocusRef={initialRef}
//           isCentered
//           size={modalSize}
//         >
//           <ModalOverlay />
//           <ModalContent overflow={"clip"} borderRadius={12}>
//             <ModalCloseButton />

//             <ModalHeader pr={6}>
//               <Text fontSize={20}>{placeholder}</Text>
//               {!noSearch && setSearch && (
//                 <SearchComponent
//                   mt={4}
//                   search={search as string}
//                   setSearch={setSearch}
//                 />
//               )}
//             </ModalHeader>

//             <ModalBody className="scrollY">
//               <VStack align={"stretch"} borderRadius={8} overflow={"clip"}>
//                 {children}
//               </VStack>
//             </ModalBody>

//             <ModalFooter
//             // pt={noReset && !isMultiSelect ? "0 !important" : ""}
//             >
//               <ButtonGroup w={"100%"}>
//                 {!noReset && (
//                   <Button
//                     w={"100%"}
//                     className="btn-solid clicky"
//                     onClick={() => {
//                       if (setSelected) {
//                         if (isMultiSelect) {
//                           setSelected([]);
//                         } else {
//                           setSelected("");
//                         }
//                       }
//                     }}
//                   >
//                     Reset
//                   </Button>
//                 )}

//                 <Button
//                   w={"100%"}
//                   className="btn-ap clicky"
//                   colorScheme="ap"
//                   onClick={() => {
//                     if (isMultiSelect) {
//                       if (formik && name) {
//                         formik.setFieldValue(name, selected);
//                       }
//                       if (confirmSelect) {
//                         confirmSelect(selected);
//                       }
//                       handleOnClose();
//                     } else {
//                       if (formik && name) {
//                         formik.setFieldValue(name, selected);
//                       }
//                       if (confirmSelect) {
//                         confirmSelect(selected);
//                       }
//                       handleOnClose();
//                     }
//                   }}
//                 >
//                   Konfirmasi
//                 </Button>
//               </ButtonGroup>
//             </ModalFooter>
//           </ModalContent>
//         </Modal>
//       </>
//     );
//   }
// );

// export default Select;
