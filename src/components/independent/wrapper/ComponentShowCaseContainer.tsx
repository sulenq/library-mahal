import { StackProps, VStack } from "@chakra-ui/react";

interface Props extends StackProps {
  children?: any;
}

export default function ComponentShowCaseContainer({
  children,
  ...props
}: Props) {
  return (
    <VStack
      gap={0}
      p={4}
      borderRadius={8}
      border={"1px solid var(--divider2)"}
      {...props}
    >
      {children}
    </VStack>
  );
}
