import { Text } from "@chakra-ui/react";
import ComponentShowcaseContainer from "./wrapper/ComponentShowcaseContainer";
import ComponentShowcaseTitle from "./wrapper/ComponentShowcaseTitle";

export default function DatePickerShowcase() {
  return (
    <ComponentShowcaseContainer flex={"1 1 0"}>
      <ComponentShowcaseTitle>Date Picker</ComponentShowcaseTitle>
      <Text my={2}>additional props <b>(dateFormatOptions)</b></Text>
    </ComponentShowcaseContainer>
  );
}
