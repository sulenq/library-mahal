import {
  FormControl,
  FormLabel,
  HStack,
  Icon,
  ListItem,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
import { RiSlideshow2Fill } from "@remixicon/react";
import { useState } from "react";
import DatePickerModal from "../dependent/input/DatePickerModal";
import PropsAccordions from "../dependent/PropsAccordions";
import ComponentShowcaseContainer from "./wrapper/ComponentShowcaseContainer";
import ContentContainer from "./wrapper/ContentContainer";

export default function DatePickerModalShowcase() {
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

  const customDateFormatOptionExample = {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "long",
  };
  const optionalProps = [
    {
      label: "isError",
      type: "boolean",
      desc: <Text>tell input if there is a validation error </Text>,
    },
    {
      label: "dateFormatOptions",
      type: "PrefixOption | object",
      desc: (
        <VStack gap={0} align={"stretch"}>
          <Text>Prefix Options :</Text>
          <UnorderedList>
            <ListItem>
              <Text>basic e.g 16 Juli 2024</Text>
            </ListItem>
            <ListItem>
              <Text>basicShort e.g 16 Jul 2024</Text>
            </ListItem>
            <ListItem>
              <Text>long e.g Senin, 16 Juli 2024</Text>
            </ListItem>
            <ListItem>
              <Text>longShort e.g Sen, 16 Jul 2024</Text>
            </ListItem>
            <ListItem>
              <Text>short e.g 16/07/2024</Text>
            </ListItem>
          </UnorderedList>
          <Text wordBreak={"break-all"}>
            for custom date formatting, just pass a date format options object,
            e.g.
          </Text>
          <Text>{JSON.stringify(customDateFormatOptionExample)}</Text>
        </VStack>
      ),
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

  const [requiredInput, setrequiredInput] = useState<Date | undefined>(
    new Date()
  );
  const [date, setDate] = useState<Date | undefined>();

  return (
    <ComponentShowcaseContainer title="Date Picker Modal">
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
          <FormLabel>Non Nullable Date Input</FormLabel>
          <DatePickerModal
            id="requiredDateInput"
            name="required_date"
            onConfirm={(inputValue) => {
              setrequiredInput(inputValue);
            }}
            inputValue={requiredInput}
            nonNullable
          />
        </FormControl>

        <FormControl>
          <FormLabel>Date Input</FormLabel>
          <DatePickerModal
            id="DateInput"
            name="date"
            onConfirm={(inputValue) => {
              setDate(inputValue);
            }}
            inputValue={date}
          />
        </FormControl>
      </ContentContainer>
    </ComponentShowcaseContainer>
  );
}
