import { Text, TextProps } from "@chakra-ui/react";

interface Props extends TextProps {
  children?: any;
}

export default function ComponentShowcaseTitle({ children, ...props }: Props) {
  return (
    <Text fontSize={18} fontWeight={600} {...props}>
      {children}
    </Text>
  );
}
