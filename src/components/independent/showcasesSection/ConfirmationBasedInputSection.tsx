import DatePickerDrawerShowcase from "../DatePickerDrawerShowcase";
import DatePickerModalShowcase from "../DatePickerModalShowcase";
import DateRangePickerDrawerShowcase from "../DateRangePickerDrawerShowcase";
import DateRangePickerModalShowcase from "../DateRangePickerModalShowcase";
import MultipleSelectDrawerShowcase from "../MultipleSelectDrawerShowcase";
import MultipleSelectModalShowcase from "../MultipleSelectModalShowcase";
import SingleSelectDrawerShowcase from "../SingleSelectDrawerShowcase";
import SingleSelectModalShowcase from "../SingleSelectModalShowcase";
import TimePickerDrawerShowcase from "../TimePickerDrawerShowcase";
import TimePickerModalShowcase from "../TimePickerModalShowcase";
import ComponentShowcaseMainContainer from "../wrapper/ComponentShowcaseMainContainer";
import ComponentShowcaseTitle from "../wrapper/ComponentShowcaseTitle";
import MasonryContainer from "../wrapper/MassonryContainer";

export default function ConfirmationBasedInputSection() {
  return (
    <ComponentShowcaseMainContainer flex={"1 1 0"}>
      <ComponentShowcaseTitle fontSize={24} mb={4}>
        Confirmation Based Input
      </ComponentShowcaseTitle>

      <MasonryContainer>
        <DatePickerModalShowcase />

        <DatePickerDrawerShowcase />

        <DateRangePickerModalShowcase />

        <DateRangePickerDrawerShowcase />

        <TimePickerModalShowcase />

        <TimePickerDrawerShowcase />

        <SingleSelectModalShowcase />

        <SingleSelectDrawerShowcase />

        <MultipleSelectModalShowcase />

        <MultipleSelectDrawerShowcase />
      </MasonryContainer>
    </ComponentShowcaseMainContainer>
  );
}
