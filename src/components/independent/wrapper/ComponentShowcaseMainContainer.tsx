import { StackProps, VStack } from "@chakra-ui/react";

interface Props extends StackProps {
  children?: any;
}

export default function ComponentShowcaseMainContainer({
  children,
  ...props
}: Props) {
  return (
    <VStack
      w={"100%"}
      gap={0}
      align={"stretch"}
      p={4}
      borderRadius={8}
      bg={"var(--divider)"}
      {...props}
    >
      {children}
    </VStack>
  );
}
