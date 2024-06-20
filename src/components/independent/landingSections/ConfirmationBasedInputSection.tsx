import { Wrap } from "@chakra-ui/react";
import DatePickerShowcase from "../DatePickerShowcase";
import ComponentShowcaseMainContainer from "../wrapper/ComponentShowcaseMainContainer";
import ComponentShowcaseTitle from "../wrapper/ComponentShowcaseTitle";

export default function ConfirmationBasedInputSection() {
  return (
    <ComponentShowcaseMainContainer flex={"1 1 0"}>
      <ComponentShowcaseTitle fontSize={24} mb={4}>
        Confirmation Based Input
      </ComponentShowcaseTitle>

      <Wrap>
        <DatePickerShowcase />
      </Wrap>
    </ComponentShowcaseMainContainer>
  );
}
