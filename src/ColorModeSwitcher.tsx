import {
  Icon,
  IconButton,
  IconButtonProps,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { RiMoonLine, RiSunLine } from "@remixicon/react";
import * as React from "react";

type ColorModeSwitcherProps = Omit<IconButtonProps, "aria-label">;

export const ColorModeSwitcher: React.FC<ColorModeSwitcherProps> = (props) => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue("dark", "light");
  const SwitchIcon = useColorModeValue(
    <Icon as={RiMoonLine} fontSize={18} />,
    <Icon as={RiSunLine} fontSize={19} />
  );

  return (
    <IconButton
      size="md"
      className="btn-solid clicky"
      color="current"
      marginLeft="2"
      onClick={toggleColorMode}
      icon={SwitchIcon}
      aria-label={`Switch to ${text} mode`}
      {...props}
    />
  );
};
