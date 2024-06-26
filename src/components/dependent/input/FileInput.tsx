import {
  Box,
  Button,
  ButtonProps,
  HStack,
  Icon,
  Input,
  Text,
  Tooltip,
  Wrap,
} from "@chakra-ui/react";
import {
  RiCloseCircleFill,
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
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useErrorColor } from "../../../constant/colors";
import { iconSize } from "../../../constant/sizes";

interface Props extends ButtonProps {
  name: string;
  onChangeSetter: (inputValue: File | undefined) => void;
  inputValue: File | undefined;
  accept?: string;
  isError?: boolean;
  placeholder?: string;
  initialFilepath?: string;
}

export default function FileInput({
  name,
  onChangeSetter,
  inputValue,
  accept,
  isError,
  placeholder,
  initialFilepath,
  ...props
}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [fileName, setFileName] = useState(inputValue ? inputValue.name : "");
  const [url, setUrl] = useState<string | undefined>(initialFilepath);
  const urlRef = useRef(url);
  useEffect(() => {
    const currentUrl = urlRef.current;
    if (inputValue) {
      setUrl(URL.createObjectURL(inputValue));
    } else {
      setUrl(undefined);
    }

    return () => {
      if (currentUrl) {
        URL.revokeObjectURL(currentUrl);
      }
    };
  }, [inputValue]);

  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = (e: any) => {
    setIsDraggingOver(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setFileName(file.name);
      onChangeSetter(file);
    }
  };

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
          type === "x-zip-compressed" ||
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

      <Button
        px={0}
        w={"100%"}
        fontWeight={400}
        variant={"ghost"}
        className="btn"
        gap={0}
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
        {...props}
      >
        <HStack gap={0} w={"100%"}>
          <Box px={4} py={2} w={"100%"}>
            <Tooltip label={inputValue ? inputValue.name : ""}>
              <HStack justify={"center"} opacity={inputValue ? 1 : 0.3}>
                <Icon
                  as={
                    inputValue ? fileIcons(inputValue.type) : RiUploadCloud2Line
                  }
                  fontSize={iconSize}
                />
                <Text
                  overflow={"hidden"}
                  textOverflow={"ellipsis"}
                  whiteSpace={"nowrap"}
                  textAlign={"left"}
                  fontSize={[12, null, 14]}
                >
                  {fileName ||
                    placeholder ||
                    "Seret & letakkan atau klik untuk telusuri"}
                </Text>
              </HStack>
            </Tooltip>
          </Box>
        </HStack>
      </Button>

      {inputValue && url && (
        <Wrap spacingX={0}>
          <Button
            mt={2}
            leftIcon={<Icon className="iconButton" as={RiEyeFill} />}
            variant={"ghost"}
            colorScheme="ap"
            size={"xs"}
            as={Link}
            to={url}
            target="_blank"
          >
            <Text fontSize={12}>Lihat</Text>
          </Button>

          <Button
            mt={2}
            leftIcon={
              <Icon
                className="iconButton"
                as={RiCloseCircleFill}
                strokeWidth={4}
              />
            }
            variant={"ghost"}
            colorScheme="red"
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
    </>
  );
}
