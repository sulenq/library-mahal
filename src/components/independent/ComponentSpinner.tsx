import { Spinner, SpinnerProps, VStack } from "@chakra-ui/react";

interface Props extends SpinnerProps {}

export default function ComponentSpinner({ ...props }: Props) {
  return (
    <VStack minH={"100px"} justify={"center"}>
      <Spinner {...props} />
    </VStack>
  );
}
