import { Wrap } from "@chakra-ui/react";
import DatePickerModalShowcase from "../DatePickerModalShowcase";
import ComponentShowcaseMainContainer from "../wrapper/ComponentShowcaseMainContainer";
import ComponentShowcaseTitle from "../wrapper/ComponentShowcaseTitle";
import DatePickerDrawerShowcase from "../DatePickerDrawerShowcase";

export default function ConfirmationBasedInputSection() {
  return (
    <ComponentShowcaseMainContainer flex={"1 1 0"}>
      <ComponentShowcaseTitle fontSize={24} mb={4}>
        Confirmation Based Input
      </ComponentShowcaseTitle>

      <Wrap spacing={5}>
        <DatePickerModalShowcase />

        <DatePickerDrawerShowcase />
      </Wrap>
    </ComponentShowcaseMainContainer>
  );
}
