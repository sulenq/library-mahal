import { StackProps, VStack } from "@chakra-ui/react";

interface Props extends StackProps {
  children?: any;
}

export default function ContentContainer({ children, ...props }: Props) {
  return (
    <VStack align={"stretch"} gap={0} borderRadius={8} p={4} {...props}>
      {children}
    </VStack>
  );
}
