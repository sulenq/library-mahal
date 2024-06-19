import { Text, TextProps } from "@chakra-ui/react";

interface Props extends TextProps {
  children?: any;
}

export default function ComponentShowCaseTitle({ children, ...props }: Props) {
  return (
    <Text fontSize={20} fontWeight={600} {...props}>
      {children}
    </Text>
  );
}
