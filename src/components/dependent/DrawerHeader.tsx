import { Box, BoxProps, HStack, Text } from "@chakra-ui/react";
import BackOnCloseButton from "../independent/BackOnCloseButton";

interface Props extends BoxProps {
  title: string;
  withoutCloseButton?: boolean;
}

export default function DrawerHeader({
  title,
  withoutCloseButton,
  ...props
}: Props) {
  return (
    <Box pt={"18px"} pr={5} pb={5} pl={6} {...props}>
      <HStack justify={"space-between"} align={"start"}>
        <Text fontSize={20} fontWeight={600}>
          {title}
        </Text>

        {!withoutCloseButton && (
          <BackOnCloseButton aria-label="back on close button" />
        )}
      </HStack>
    </Box>
  );
}
