import { FormControl, FormLabel, HStack, Icon, Text } from "@chakra-ui/react";
import { RiSlideshow2Fill } from "@remixicon/react";
import { useState } from "react";
import DateRangePickerModal from "../dependent/input/DateRangePickerModal";
import PropsAccordions from "../dependent/PropsAccordions";
import ComponentShowcaseContainer from "./wrapper/ComponentShowcaseContainer";
import ContentContainer from "./wrapper/ContentContainer";
import TimePickerModal from "../dependent/input/TimePickerModal";

export default function TimePickerModalShowcase() {
  const requiredProps = [
    {
      label: "id",
      type: "string",
      desc: (
        <Text>
          just unique id accros ur entire project, it will be merge with name
        </Text>
      ),
    },
    {
      label: "name",
      type: "string",
      desc: <Text>name the input, of course it must have name</Text>,
    },
    {
      label: "confirm",
      type: "(inputValue: Date | undefined) => void",
      desc: <Text>function to set controlled input</Text>,
    },
    {
      label: "inputValue",
      type: "Date | undefined",
      desc: <Text>value for the input field</Text>,
    },
  ];

  const optionalProps = [
    {
      label: "isError",
      type: "boolean",
      desc: <Text>tell input if there is a validation error </Text>,
    },
    {
      label: "placeholder",
      type: "string",
      desc: (
        <Text>
          default is false, if true, then if value is not filled, confirmation
          button is disabled
        </Text>
      ),
    },
    {
      label: "nonnullable",
      type: "boolean",
      desc: (
        <Text>
          default is false, if true, then if value is not filled, confirmation
          button is disabled
        </Text>
      ),
    },
  ];

  const dummyTime = new Date();
  dummyTime.setHours(16, 0, 0, 0);

  const [nonNullableInput, setNonNullableInput] = useState<Date | undefined>(
    dummyTime
  );
  const [date, setDate] = useState<
    | {
        from: Date;
        to: Date;
      }
    | undefined
  >();

  return (
    <ComponentShowcaseContainer title="Time Picker Modal">
      <PropsAccordions
        requiredProps={requiredProps}
        optionalProps={optionalProps}
      />

      <ContentContainer>
        <HStack mb={2}>
          <Icon as={RiSlideshow2Fill} fontSize={24} color={"p.500"} />
          <Text fontWeight={600} fontSize={18}>
            Showcase
          </Text>
        </HStack>

        <FormControl>
          <FormLabel>Non-nullable Date Input</FormLabel>
          <TimePickerModal
            id="nonNullable_time_picker"
            name="nonNullable_time"
            confirm={(inputValue) => {
              setNonNullableInput(inputValue);
            }}
            inputValue={nonNullableInput}
            borderRadius={6}
            nonnullable
            mb={2}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Date Input</FormLabel>
          <DateRangePickerModal
            id="dateRangeInput_modal"
            name="date"
            confirm={(inputValue) => {
              setDate(inputValue);
            }}
            inputValue={date}
            borderRadius={6}
          />
        </FormControl>
      </ContentContainer>
    </ComponentShowcaseContainer>
  );
}
