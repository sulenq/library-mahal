import { Button, Icon, Input, Text, VStack, Wrap } from "@chakra-ui/react";
import {
  RiCloseCircleFill,
  RiEyeFill,
  RiFileLine,
  RiUploadCloud2Line,
} from "@remixicon/react";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useErrorColor } from "../../../constant/colors";
import formatBytes from "../../../lib/formatBytes";
import CContainer from "../../independent/wrapper/CContainer";

interface Props {
  name: string;
  onChangeSetter: (inputValue: File | undefined) => void;
  inputValue: File | undefined;
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
  const [fileURL, setFileURL] = useState<string | undefined>(initialFilepath);

  useEffect(() => {
    if (inputValue) {
      setFileName(inputValue.name);
      const objectURL = URL.createObjectURL(inputValue);
      setFileURL(objectURL);
      return () => URL.revokeObjectURL(objectURL);
    }
  }, [inputValue]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    setIsDraggingOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setFileName(file.name);
      onChangeSetter(file);
    }
  };

  const errorColor = useErrorColor();

  // const fileIcons = (fileType: string) => {
  //   const basicType = fileType.split("/")[0];
  //   const type = fileType.split("/")[1];

  //   switch (basicType) {
  //     case "image":
  //       return RiFileImageLine;
  //     case "audio":
  //       return RiFileMusicLine;
  //     case "video":
  //       return RiFileVideoLine;
  //     case "text":
  //       return RiFileTextLine;
  //     case "application":
  //       if (type === "json") {
  //         return RiFileCodeLine;
  //       } else if (
  //         type === "zip" ||
  //         type === "x-rar-compressed" ||
  //         type === "x-7z-compressed"
  //       ) {
  //         return RiFileZipLine;
  //       } else if (type === "pdf") {
  //         return RiFilePdf2Line;
  //       } else if (
  //         type === "msword" ||
  //         type === "vnd.openxmlformats-officedocument.wordprocessingml.document"
  //       ) {
  //         return RiFileWord2Line;
  //       } else if (
  //         type === "vnd.ms-excel" ||
  //         type === "vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  //       ) {
  //         return RiFileExcel2Line;
  //       } else if (
  //         type === "vnd.ms-powerpoint" ||
  //         type ===
  //           "vnd.openxmlformats-officedocument.presentationml.presentation"
  //       ) {
  //         return RiFilePpt2Line;
  //       } else {
  //         return RiFileLine;
  //       }
  //     default:
  //       return RiFileLine;
  //   }
  // };

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

      <CContainer w={"100%"}>
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
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {/* <Icon
          as={inputValue ? fileIcons(inputValue.type) : RiUploadCloud2Line}
          fontSize={124}
          color={"p.500"}
        /> */}

          <Icon
            as={inputValue ? RiFileLine : RiUploadCloud2Line}
            fontSize={72}
          />

          {!fileName && (
            <>
              <VStack gap={1}>
                <Text
                  fontSize={20}
                  fontWeight={600}
                  maxW={"300px"}
                  textAlign={"center"}
                  whiteSpace={"wrap"}
                >
                  Seret & Letakkan atau
                </Text>
                <Text
                  color={"p.500"}
                  fontSize={20}
                  fontWeight={600}
                  maxW={"300px"}
                  textAlign={"center"}
                  whiteSpace={"wrap"}
                  mb={2}
                >
                  Klik untuk telusuri
                </Text>
              </VStack>

              <Text
                fontWeight={400}
                fontSize={14}
                textAlign={"center"}
                opacity={0.4}
              >
                {placeholder || "Mendukung semua tipe file"}
              </Text>
            </>
          )}
          {inputValue && fileName && (
            <>
              <Text fontSize={18}>{fileName}</Text>
              <Text opacity={0.4} fontSize={14}>
                {formatBytes(inputValue.size)}
              </Text>
            </>
          )}
        </VStack>

        {inputValue && fileURL && (
          <Wrap spacingX={0} ml={"auto"}>
            <Button
              mt={2}
              pl={"6px"}
              leftIcon={<Icon className="iconButton" as={RiEyeFill} />}
              className="btn"
              size={"xs"}
              as={Link}
              to={fileURL}
              target="_blank"
            >
              <Text fontSize={12}>Lihat</Text>
            </Button>

            <Button
              mt={2}
              pl={"6px"}
              leftIcon={
                <Icon
                  className="iconButton"
                  as={RiCloseCircleFill}
                  strokeWidth={4}
                />
              }
              variant={"ghost"}
              colorScheme="error"
              size={"xs"}
              onClick={() => {
                onChangeSetter(undefined);
                setFileName("");
              }}
            >
              <Text fontSize={12}>Clear</Text>
            </Button>
          </Wrap>
        )}
      </CContainer>
    </>
  );
}
