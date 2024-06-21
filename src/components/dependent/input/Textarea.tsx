import { Textarea as ChakraTextarea, TextareaProps } from "@chakra-ui/react";
import { useCallback, useEffect, useRef } from "react";

interface Props extends TextareaProps {
  name: string;
  onChangeSetter: (inputValue: string | undefined) => void;
  inputValue: string | undefined;
  isError?: boolean;
  placeholder?: string;
}

export default function Textarea({
  name,
  onChangeSetter,
  inputValue,
  isError,
  placeholder,
  ...props
}: Props) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const autoResize = useCallback(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${
        textareaRef.current.scrollHeight + 5
      }px`;
    }
  }, [textareaRef]);

  useEffect(() => {
    autoResize();
  }, [autoResize, inputValue]);

  return (
    <ChakraTextarea
      ref={textareaRef}
      minH={"80px"}
      name={name}
      placeholder={placeholder || "Masukkan deskripsi singkat"}
      onChange={(e) => {
        onChangeSetter(e.target.value);
      }}
      value={inputValue}
      {...props}
    />
  );
}
