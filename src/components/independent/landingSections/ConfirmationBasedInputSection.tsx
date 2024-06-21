import { SimpleGrid } from "@chakra-ui/react";
import DatePickerDrawerShowcase from "../DatePickerDrawerShowcase";
import DatePickerModalShowcase from "../DatePickerModalShowcase";
import ComponentShowcaseMainContainer from "../wrapper/ComponentShowcaseMainContainer";
import ComponentShowcaseTitle from "../wrapper/ComponentShowcaseTitle";

export default function ConfirmationBasedInputSection() {
  return (
    <ComponentShowcaseMainContainer flex={"1 1 0"}>
      <ComponentShowcaseTitle fontSize={24} mb={4}>
        Confirmation Based Input
      </ComponentShowcaseTitle>

      <SimpleGrid spacing={5} columns={[1, 2, null, 3]}>
        <DatePickerModalShowcase />

        <DatePickerDrawerShowcase />
      </SimpleGrid>
    </ComponentShowcaseMainContainer>
  );
}
