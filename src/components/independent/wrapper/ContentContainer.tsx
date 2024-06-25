import { StackProps, VStack } from "@chakra-ui/react";

interface Props extends StackProps {
  children?: any;
}

export default function ContentContainer({ children, ...props }: Props) {
  return (
    <VStack
      className="contentContainer"
      w={"100%"}
      align={"stretch"}
      gap={0}
      p={5}
      borderRadius={12}
      {...props}
    >
      {children}
    </VStack>
  );
}
