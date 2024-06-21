import { StackProps, VStack } from "@chakra-ui/react";

interface Props extends StackProps {
  children?: any;
}

export default function ContentContainer({ children, ...props }: Props) {
  return (
    <VStack
      className="contentContainer"
      align={"stretch"}
      gap={0}
      borderRadius={12}
      p={5}
      {...props}
    >
      {children}
    </VStack>
  );
}
