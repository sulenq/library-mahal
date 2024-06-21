import { StackProps, VStack } from "@chakra-ui/react";

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
      p={4}
      borderRadius={12}
      border={"1px solid var(--divider3)"}
      align={"stretch"}
      h={"fit-content"}
      // bg={useLightDarkColor()}
      {...props}
    >
      {children}
    </VStack>
  );
}
