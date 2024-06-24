import { HStack, Icon, StackProps, Text } from "@chakra-ui/react";
import { RiPuzzle2Fill } from "@remixicon/react";

interface Props extends StackProps {
  children?: any;
}

export default function ComponentShowcaseTitle({ children, ...props }: Props) {
  return (
    <HStack color={"p.500"} {...props}>
      <Icon as={RiPuzzle2Fill} fontSize={28} />
      <Text fontSize={28} fontWeight={700}>
        {children}
      </Text>
    </HStack>
  );
}
