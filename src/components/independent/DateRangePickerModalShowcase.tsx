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
import DateRangePickerModal from "../dependent/input/DateRangePickerModal";
import PropsAccordions from "../dependent/PropsAccordions";
import ComponentShowcaseContainer from "./wrapper/ComponentShowcaseContainer";
import ContentContainer from "./wrapper/ContentContainer";

export default function DateRangePickerModalShowcase() {
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
      type: "(inputValue:  {from: Date, to: Date} | undefined) => void",
      desc: <Text>function to set controlled input</Text>,
    },
    {
      label: "inputValue",
      type: " {from: Date, to: Date} | undefined",
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
      label: "maxRange",
      type: "number",
      desc: <Text>max date range allowed</Text>,
    },
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

  const [requiredInput, setrequiredInput] = useState<
    | {
        from: Date;
        to: Date;
      }
    | undefined
  >({
    from: new Date(),
    to: new Date(),
  });
  const [date, setDate] = useState<
    | {
        from: Date;
        to: Date;
      }
    | undefined
  >();

  return (
    <ComponentShowcaseContainer title="Date Range Picker Modal">
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
          <FormLabel>Non Nullable Date Input</FormLabel>
          <DateRangePickerModal
            id="requiredDateRangeInput_modal"
            name="required_date"
            onConfirm={(inputValue) => {
              setrequiredInput(inputValue);
            }}
            inputValue={requiredInput}
            nonNullable
            mb={2}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Date Input With Max Range</FormLabel>
          <DateRangePickerModal
            id="dateRangeInput_modal"
            name="date"
            onConfirm={(inputValue) => {
              setDate(inputValue);
            }}
            inputValue={date}
            maxRange={10}
          />
        </FormControl>
      </ContentContainer>
    </ComponentShowcaseContainer>
  );
}
