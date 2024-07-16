import { FormControl, FormLabel, HStack, Icon, Text } from "@chakra-ui/react";
import { RiSlideshow2Fill } from "@remixicon/react";
import { useState } from "react";
import TimePickerModal from "../dependent/input/TimePickerModal";
import PropsAccordions from "../dependent/PropsAccordions";
import ComponentShowcaseContainer from "./wrapper/ComponentShowcaseContainer";
import ContentContainer from "./wrapper/ContentContainer";

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
      label: "onConfirm",
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
      label: "withSeconds",
      type: "boolean",
      desc: <Text>default is false, add seconds to the time picker</Text>,
    },
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
      label: "nonNullable",
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

  const [requiredInput, setrequiredInput] = useState<Date | undefined>(
    dummyTime
  );
  const [input, setInput] = useState<Date | undefined>();

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

        <FormControl mb={2}>
          <FormLabel>Non Nullable Time Input</FormLabel>
          <TimePickerModal
            id="required_time_picker"
            name="required_time"
            onConfirm={(inputValue) => {
              setrequiredInput(inputValue);
            }}
            inputValue={requiredInput}
            nonNullable
          />
        </FormControl>

        <FormControl>
          <FormLabel>Time Input Include Seconds</FormLabel>
          <TimePickerModal
            id="time_picker"
            name="time"
            onConfirm={(inputValue) => {
              setInput(inputValue);
            }}
            inputValue={input}
            withSeconds
          />
        </FormControl>
      </ContentContainer>
    </ComponentShowcaseContainer>
  );
}
