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
      // p={5}
      borderRadius={8}
      align={"stretch"}
      // bg={useLightDarkColor()}
      {...props}
    >
      {children}
    </VStack>
  );
}
