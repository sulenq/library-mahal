import { StackProps, VStack } from "@chakra-ui/react";
import { useLightDarkColor } from "../../../constant/colors";

interface Props extends StackProps {
  children?: any;
}

export default function ComponentShowcaseContainer({
  children,
  ...props
}: Props) {
  return (
    <VStack
      gap={0}
      p={5}
      borderRadius={8}
      align={"stretch"}
      border={"1px solid var(--divider2)"}
      bg={useLightDarkColor()}
      {...props}
    >
      {children}
    </VStack>
  );
}
