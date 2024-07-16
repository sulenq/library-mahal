import {
  Input as ChakraInput,
  InputProps,
  useColorMode,
} from "@chakra-ui/react";
import { css, Global } from "@emotion/react";

interface Props extends InputProps {
  name: string;
  onChangeSetter: (inputValue: string | undefined) => void;
  inputValue: string | undefined;
  isError?: boolean;
  placeholder?: string;
}

export default function StringInput({
  name,
  onChangeSetter,
  inputValue,
  isError,
  placeholder,
  ...props
}: Props) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChangeSetter(e.target.value);
  }

  console.log("stringInput", inputValue);

  // SX
  const { colorMode } = useColorMode();
  const darkLightColorManual = colorMode === "light" ? "white" : "var(--dark)";

  return (
    <>
      <Global
        styles={css`
          input:-webkit-autofill {
            border: 10px solid var(--divider3) !important;
          }
          input:-webkit-autofill,
          input:-webkit-autofill:hover,
          input:-webkit-autofill:focus,
          input:-webkit-autofill:active {
            -webkit-box-shadow: 0 0 0 30px ${darkLightColorManual} inset !important;
            box-shadow: 0 0 0 30px ${darkLightColorManual} inset !important;
          }
        `}
      />

      <ChakraInput
        name={name}
        border={"1px solid var(--divider3) !important"}
        _focus={{
          border: "1px solid var(--p500) !important",
          boxShadow: "none !important",
        }}
        onChange={handleChange}
        value={inputValue}
        placeholder={placeholder}
        {...props}
      />
    </>
  );
}
