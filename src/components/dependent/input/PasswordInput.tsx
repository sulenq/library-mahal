import { Box, Icon, IconButton, Input } from "@chakra-ui/react";
import { RiEyeLine, RiEyeOffLine } from "@remixicon/react";
import { useState } from "react";

interface Props {
  name: string;
  onChangeSetter: (inputValue: string | undefined) => void;
  inputValue: string | undefined;
  isError?: boolean;
  placeholder?: string;
}

export default function PasswordInput({
  name,
  onChangeSetter,
  inputValue,
  isError,
  placeholder,
  ...props
}: Props) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <Box position={"relative"}>
      <Input
        placeholder={placeholder || "*******"}
        onChange={(e) => {
          onChangeSetter(e.target.value);
        }}
        value={inputValue}
        type={showPassword ? "text" : "password"}
        pr={"40px !important"}
        {...props}
      />

      <IconButton
        aria-label="show password button"
        icon={
          <Icon as={showPassword ? RiEyeOffLine : RiEyeLine} fontSize={20} />
        }
        bg={"transparent"}
        _hover={{ bg: "transparent" }}
        _active={{ bg: "transparent" }}
        position={"absolute"}
        right={0}
        zIndex={2}
        onClick={() => {
          setShowPassword((ps) => !ps);
        }}
      />
    </Box>
  );
}
