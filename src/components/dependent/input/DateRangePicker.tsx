// import {
//   Box,
//   Button,
//   ButtonGroup,
//   ButtonProps,
//   Center,
//   FormControl,
//   FormLabel,
//   HStack,
//   Icon,
//   Input,
//   Modal,
//   ModalBody,
//   ModalCloseButton,
//   ModalContent,
//   ModalFooter,
//   ModalHeader,
//   ModalOverlay,
//   Stack,
//   Text,
//   useColorModeValue,
//   useDisclosure,
//   VStack,
// } from "@chakra-ui/react";
// import {
//   RiArrowDownLine,
//   RiArrowLeftSLine,
//   RiArrowRightLine,
//   RiArrowRightSLine,
//   RiCalendarLine,
// } from "@remixicon/react";
// import { id } from "date-fns/locale"; // Import locale for Indonesian language
// import { useEffect, useRef, useState } from "react";
// import { DayPicker } from "react-day-picker";
// import "react-day-picker/dist/style.css";
// import { iconSize } from "../../const/sizes";
// import formatDate from "../../lib/formatDate";
// import parseNumber from "../../lib/parseNumber";
// import useBackOnClose from "../../lib/useBackOnClose";
// import useScreenWidth from "../../lib/useScreenWidth";

// interface Props extends ButtonProps {
//   formik?: any;
//   name?: string;
//   placeholder?: string;
//   confirmDate?: (from: Date, to: Date) => void;
//   dateValue?: { from: Date; to: Date };
//   initialDateValue?: { from: Date; to: Date };
//   dateFormatFromOptions?: any;
//   dateFormatToOptions?: any;
//   noBackOnClose?: boolean;
//   nullable?: boolean;
// }

// export default function DateRangePicker({
//   formik,
//   name,
//   placeholder,
//   confirmDate,
//   dateValue,
//   initialDateValue,
//   dateFormatFromOptions,
//   dateFormatToOptions,
//   noBackOnClose,
//   nullable,
//   ...props
// }: Props) {
//   const initialRef = useRef(null);
//   const monthInputRef = useRef<HTMLInputElement>(null);
//   const yearInputRef = useRef<HTMLInputElement>(null);

//   const [date, setDate] = useState<Date>(new Date());
//   const [tahun, setTahun] = useState<number>(date.getFullYear());
//   const [bulan, setBulan] = useState<number>(date.getMonth() + 1);
//   const [selected, setSelected] = useState<any>();
//   const confirmSelect = () => {
//     let action = false;
//     if (nullable) {
//       action = true;
//     } else {
//       if (selected) {
//         action = true;
//       }
//     }

//     if (action && formik && name) {
//       formik.setFieldValue(name, selected);
//     } else if (confirmDate) {
//       confirmDate(selected.from, selected.to);
//     }
//   };

//   useEffect(() => {
//     if (dateValue) {
//       setSelected(dateValue);
//     }
//   }, [dateValue]);

//   const { isOpen, onOpen, onClose } = useDisclosure();
//   useBackOnClose(isOpen, onClose);
//   function handleOnClose() {
//     if (!noBackOnClose) {
//       window.history.back();
//     }
//     onClose();
//   }
//   function todayMonth() {
//     const today = new Date();
//     setDate(today);
//     setSelected(initialDateValue);
//     setBulan(today.getMonth() + 1);
//     setTahun(today.getFullYear());
//   }
//   function nextMonth() {
//     const currentMonth = date.getMonth();
//     const currentyear = date.getFullYear();

//     const nextMonth = new Date(
//       bulan === 12 ? currentyear + 1 : tahun,
//       bulan === 12 ? 0 : currentMonth + 1
//     );
//     setDate(nextMonth);
//     setBulan(nextMonth.getMonth() + 1);
//     setTahun(nextMonth.getFullYear());
//   }
//   function prevMonth() {
//     const currentMonth = date.getMonth();
//     const currentyear = date.getFullYear();

//     const prevMonth = new Date(
//       bulan === 1 ? currentyear - 1 : tahun,
//       bulan === 1 ? 11 : currentMonth - 1
//     );
//     setDate(prevMonth);
//     setBulan(prevMonth.getMonth() + 1);
//     setTahun(prevMonth.getFullYear());
//   }

//   const isBulanValid = (bulan: number) => {
//     return bulan > 0 && bulan <= 12;
//   };
//   const isTahunValid = (tahun: number) => {
//     return tahun >= 100 && tahun <= 270000;
//   };

//   // SX
//   const sw = useScreenWidth();
//   const bnwColor = useColorModeValue("black", "white");
//   const modifiersStyles = {
//     selected: {
//       border: "2px solid var(--p500)",
//       color: bnwColor,
//       opacity: 1,
//     },
//     range_middle: {
//       border: "none",
//       color: bnwColor,
//     },
//     today: {
//       color: "var(--p500)",
//     },
//   };
//   const errorColor = useColorModeValue("#E53E3E", "#FC8181");

//   return (
//     <>
//       <Button
//         className="btn"
//         w={"100%"}
//         justifyContent={"space-between"}
//         borderRadius={8}
//         border={"1px solid var(--divider3)"}
//         boxShadow={
//           formik && name && formik.errors[name]
//             ? `0 0 0px 1px ${errorColor}`
//             : ""
//         }
//         py={2}
//         px={4}
//         h={"40px"}
//         fontWeight={400}
//         cursor={"pointer"}
//         onClick={onOpen}
//         // _focus={{ boxShadow: "0 0 0px 2px var(--p500)" }}
//         _focus={{ border: "1px solid var(--p500)", boxShadow: "none" }}
//         {...props}
//       >
//         <Text
//           opacity={
//             (formik && name && formik.values[name]) || dateValue ? 1 : 0.3
//           }
//           fontSize={14}
//         >
//           {(formik && name && formik.values[name]) || dateValue
//             ? `${formatDate(
//                 (formik && name && formik.values[name].from) || dateValue?.from,
//                 dateFormatFromOptions || {
//                   day: "numeric",
//                   month: "numeric",
//                   year: "numeric",
//                 }
//               )} - ${formatDate(
//                 (formik && name && formik.values[name].to) || dateValue?.to,
//                 dateFormatToOptions || {
//                   day: "numeric",
//                   month: "numeric",
//                   year: "numeric",
//                 }
//               )}`
//             : placeholder || `Pilih periode tanggal`}
//         </Text>

//         <Icon as={RiCalendarLine} />
//       </Button>

//       <Modal
//         isOpen={isOpen}
//         onClose={handleOnClose}
//         // size={"lg"}
//         initialFocusRef={initialRef}
//         isCentered
//       >
//         <ModalOverlay />

//         <ModalContent>
//           <ModalCloseButton />

//           <ModalHeader pr={""} ref={initialRef}>
//             <Box>
//               <Text fontSize={20}>Pilih Tanggal</Text>

//               <HStack w={"100%"} mt={6}>
//                 <FormControl>
//                   <FormLabel>Bulan</FormLabel>
//                   <Input
//                     ref={monthInputRef}
//                     name="bulan"
//                     placeholder="Bulan ke-"
//                     onChange={(e) => {
//                       const value = parseNumber(e.target.value);
//                       if (value && value <= 12) {
//                         setDate(new Date(tahun, value - 1));
//                         setBulan(value);
//                       }
//                     }}
//                     value={bulan === 0 ? "" : bulan}
//                     onFocus={() => {
//                       if (monthInputRef.current) {
//                         monthInputRef.current.select();
//                       }
//                     }}
//                   />
//                 </FormControl>

//                 <FormControl>
//                   <FormLabel>Tahun</FormLabel>
//                   <Input
//                     name="tahun"
//                     placeholder="Tahun"
//                     onChange={(e) => {
//                       const value = parseNumber(e.target.value);
//                       if (value) {
//                         setDate(new Date(value, bulan - 1));
//                         setTahun(value);
//                       }
//                     }}
//                     value={tahun === 0 ? "" : tahun}
//                     onFocus={() => {
//                       if (yearInputRef.current) {
//                         yearInputRef.current.select();
//                       }
//                     }}
//                   />
//                 </FormControl>
//               </HStack>
//             </Box>
//           </ModalHeader>

//           <ModalBody>
//             <VStack align={"stretch"} pt={1}>
//               {!isBulanValid(bulan) && isTahunValid(tahun) && (
//                 <HStack h={"360px"} justify={"center"}>
//                   <Text textAlign={"center"}>Bulan tidak valid</Text>
//                 </HStack>
//               )}

//               {isBulanValid(bulan) && !isTahunValid(tahun) && (
//                 <HStack h={"360px"} justify={"center"}>
//                   <Text textAlign={"center"}>Tahun tidak valid</Text>
//                 </HStack>
//               )}

//               {!isBulanValid(bulan) && !isTahunValid(tahun) && (
//                 <HStack h={"360px"} justify={"center"}>
//                   <Text textAlign={"center"}>Bulan dan Tahun tidak valid</Text>
//                 </HStack>
//               )}

//               {isBulanValid(bulan) && isTahunValid(tahun) && (
//                 <>
//                   <VStack overflowX={"auto"} w={"100%"} align={"stretch"}>
//                     <DayPicker
//                       mode="range"
//                       selected={selected}
//                       onSelect={(e) => {
//                         setSelected(e);
//                         // setConfirm(false);
//                       }}
//                       locale={id}
//                       modifiersStyles={modifiersStyles}
//                       month={date}
//                       showOutsideDays
//                       fixedWeeks
//                       disableNavigation
//                     />
//                   </VStack>

//                   <ButtonGroup w={"100%"}>
//                     <Button
//                       aria-label="Previous Month"
//                       leftIcon={
//                         <Icon as={RiArrowLeftSLine} fontSize={iconSize} />
//                       }
//                       pr={"10px"}
//                       className="btn-outline clicky"
//                       onClick={prevMonth}
//                       w={"20%"}
//                     >
//                       {/* Sebelumnya */}
//                     </Button>

//                     <Button
//                       flex={1}
//                       className="btn-outline clicky"
//                       onClick={todayMonth}
//                     >
//                       Minggu Ini
//                     </Button>

//                     <Button
//                       aria-label="Next Month"
//                       rightIcon={
//                         <Icon as={RiArrowRightSLine} fontSize={iconSize} />
//                       }
//                       pl={"10px"}
//                       className="btn-outline clicky"
//                       onClick={nextMonth}
//                       w={"20%"}
//                     >
//                       {/* Selanjutnya */}
//                     </Button>
//                   </ButtonGroup>
//                 </>
//               )}
//             </VStack>
//           </ModalBody>

//           <ModalFooter>
//             <VStack align={"stretch"} w={"100%"}>

//               <Button
//                 colorScheme="ap"
//                 className="btn-ap clicky"
//                 w={"100%"}
//                 isDisabled={
//                   !nullable
//                     ? selected && selected.from && selected.to
//                       ? false
//                       : true
//                     : false
//                 }
//                 onClick={() => {
//                   confirmSelect();
//                   handleOnClose();
//                 }}
//               >
//                 Konfirmasi
//               </Button>
//             </VStack>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     </>
//   );
// }

import React from "react";

export default function DateRangePicker() {
  return <div>DateRangePicker</div>;
}
