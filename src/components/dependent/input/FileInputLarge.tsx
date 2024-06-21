import { Button, Icon, Input, Text, VStack } from "@chakra-ui/react";
import {
  RiEyeFill,
  RiFileCodeLine,
  RiFileExcel2Line,
  RiFileImageLine,
  RiFileLine,
  RiFileMusicLine,
  RiFilePdf2Line,
  RiFilePpt2Line,
  RiFileTextLine,
  RiFileVideoLine,
  RiFileWord2Line,
  RiFileZipLine,
  RiUploadCloud2Line,
} from "@remixicon/react";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useErrorColor } from "../../../constant/colors";
import { iconSize } from "../../../constant/sizes";
import formatBytes from "../../../lib/formatBytes";

interface Props {
  name: string;
  onChangeSetter: (inputValue: File | null) => void;
  inputValue: File | null;
  accept?: string;
  isError?: boolean;
  placeholder?: string;
  initialFilepath?: string;
}

export default function FileInputLarge({
  name,
  onChangeSetter,
  inputValue,
  accept,
  isError,
  placeholder,
  initialFilepath,
}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [fileName, setFileName] = useState(inputValue ? inputValue.name : "");
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setIsDraggingOver(true); // Set state untuk menandakan sedang ada operasi seret-menyeret
  };

  const handleDragLeave = (e: any) => {
    setIsDraggingOver(false); // Set state untuk menandakan tidak ada operasi seret-menyeret lagi
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setIsDraggingOver(false); // Set state untuk menandakan tidak ada operasi seret-menyeret lagi
    const file = e.dataTransfer.files[0];
    if (file) {
      // console.log(file);
      setFileName(file.name);
      onChangeSetter(file);
    }
  };

  // console.log(inputValue);

  // SX
  const errorColor = useErrorColor();
  const fileIcons = (fileType: string) => {
    const basicType = fileType.split("/")[0];
    const type = fileType.split("/")[1];

    switch (basicType) {
      case "image":
        return RiFileImageLine;
      case "audio":
        return RiFileMusicLine;
      case "video":
        return RiFileVideoLine;
      case "text":
        return RiFileTextLine;
      case "application":
        if (type === "json") {
          return RiFileCodeLine;
        } else if (
          type === "zip" ||
          type === "x-rar-compressed" ||
          type === "x-7z-compressed"
        ) {
          return RiFileZipLine;
        } else if (type === "pdf") {
          return RiFilePdf2Line;
        } else if (
          type === "msword" ||
          type === "vnd.openxmlformats-officedocument.wordprocessingml.document"
        ) {
          return RiFileWord2Line;
        } else if (
          type === "vnd.ms-excel" ||
          type === "vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ) {
          return RiFileExcel2Line;
        } else if (
          type === "vnd.ms-powerpoint" ||
          type ===
            "vnd.openxmlformats-officedocument.presentationml.presentation"
        ) {
          return RiFilePpt2Line;
        } else {
          return RiFileLine;
        }
      default:
        return RiFileLine;
    }
  };

  return (
    <>
      <Input
        ref={inputRef}
        display={"none"}
        name={name}
        type="file"
        accept={accept || "*"}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const files: FileList | null = e.target.files;
          if (files && files.length > 0) {
            const file = files[0];
            setFileName(file.name);
            onChangeSetter(file);
          }
        }}
        mb={4}
      />

      <VStack
        as={Button}
        w={"100%"}
        justify={"center"}
        p={6}
        h={"300px"}
        className="btn"
        border={`2px dashed ${
          isDraggingOver ? "var(--p500) !important" : "var(--divider3)"
        }`}
        borderColor={isError ? errorColor : ""}
        borderRadius={8}
        cursor={"pointer"}
        _focus={{
          borderColor: "p.500",
        }}
        onClick={() => {
          if (inputRef.current) {
            inputRef.current.click();
          }
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave} // Tambahkan event handler untuk menangani event drag leave
        onDrop={handleDrop}
      >
        <Icon
          as={inputValue ? fileIcons(inputValue.type) : RiUploadCloud2Line}
          fontSize={124}
          color={"p.500"}
        />
        {!fileName && (
          <>
            <Text
              fontSize={22}
              fontWeight={600}
              maxW={"300px"}
              textAlign={"center"}
              whiteSpace={"wrap"}
              mb={2}
            >
              Seret & Letakkan atau{" "}
              <span style={{ color: "var(--p500)" }}>Klik untuk telusuri</span>
            </Text>

            <Text
              fontWeight={400}
              fontSize={14}
              textAlign={"center"}
              opacity={0.6}
            >
              {placeholder || "Mendukung semua tipe file"}
            </Text>
          </>
        )}
        {inputValue && fileName && (
          <>
            <Text fontSize={18}>{fileName}</Text>
            <Text opacity={0.6} fontSize={14}>
              {formatBytes(inputValue.size)}
            </Text>
          </>
        )}
      </VStack>

      {inputValue && initialFilepath && (
        <Button
          mt={2}
          leftIcon={<Icon as={RiEyeFill} fontSize={iconSize} />}
          variant={"ghost"}
          colorScheme="ap"
          size={"xs"}
          as={Link}
          to={initialFilepath}
          target="_blank"
        >
          Lihat file
        </Button>
      )}
    </>
  );
}
