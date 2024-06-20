import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Text,
  Wrap,
} from "@chakra-ui/react";
import {
  RiErrorWarningFill,
  RiQuestionFill,
  RiSlideshow2Fill,
} from "@remixicon/react";
import { useState } from "react";
import ComponentShowcaseContainer from "./wrapper/ComponentShowcaseContainer";
import ComponentShowcaseTitle from "./wrapper/ComponentShowcaseTitle";
import ContentContainer from "./wrapper/ContentContainer";
import DatePickerModal from "../dependent/input/DatePickerModal";

export default function DatePickerModalShowcase() {
  const requiredProps = [
    {
      label: "id",
      type: "string",
      desc: "just unique id accros ur entire project, it will be merge with name",
    },
    {
      label: "name",
      type: "string",
      desc: "name the input, of course it must have name",
    },
    {
      label: "confirm",
      type: "(inputValue: Date) => void",
      desc: "function to set controlled input",
    },
    {
      label: "inputValue",
      type: "Date | null",
      desc: "value for the input field",
    },
  ];

  const optionalProps = [
    {
      label: "dateFormatOptions",
      type: "PrefixOption | object",
      desc: "default is basic, for PrefixOption there is basic(16 Juli 2024), basicShort(16 Jul 2024), long(Senin, 16 Juli 2024), longShort(Sen, 16 Jul 2024), short(16/07/2024), for custom just pass date format options object",
    },
    {
      label: "placeholder",
      type: "string",
      desc: "default is false, if true, then if value is not filled, confirmation button is disabled",
    },
    {
      label: "nonnullable",
      type: "boolean",
      desc: "default is false, if true, then if value is not filled, confirmation button is disabled",
    },
  ];

  const [requiredDate, setRequiredDate] = useState<Date>(new Date());
  const [date, setDate] = useState<Date | null>(null);

  return (
    <ComponentShowcaseContainer flex={"1 1 0"}>
      <ComponentShowcaseTitle fontSize={20} mb={4}>
        Date Picker Modal
      </ComponentShowcaseTitle>

      <ContentContainer bg={"var(--p500a3)"} mb={4}>
        <HStack mb={2}>
          <Icon as={RiErrorWarningFill} fontSize={24} color={"p.500"} />
          <Text fontWeight={600} fontSize={18} color={"p.500"}>
            Required Props
          </Text>
        </HStack>

        <Accordion allowMultiple>
          {requiredProps.map((props, i) => (
            <AccordionItem key={i}>
              <h2>
                <AccordionButton>
                  <Wrap as="span" fontWeight={500} flex="1" textAlign="left">
                    <Text>{props.label}</Text>
                    <Text opacity={0.5}>{props.type}</Text>
                  </Wrap>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={2} opacity={0.5}>
                {props.desc}
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </ContentContainer>

      <ContentContainer bg={"var(--divider)"} mb={4}>
        <HStack mb={2}>
          <Icon as={RiQuestionFill} fontSize={24} />
          <Text fontWeight={600} fontSize={18}>
            Optional Props
          </Text>
        </HStack>

        <Accordion allowMultiple>
          {optionalProps.map((props, i) => (
            <AccordionItem key={i}>
              <h2>
                <AccordionButton>
                  <Wrap as="span" fontWeight={500} flex="1" textAlign="left">
                    <Text>{props.label}</Text>
                    <Text opacity={0.5}>{props.type}</Text>
                  </Wrap>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={2} opacity={0.5}>
                {props.desc}
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </ContentContainer>

      <ContentContainer border={"1px solid var(--divider3)"}>
        <HStack mb={2}>
          <Icon as={RiSlideshow2Fill} fontSize={24} color={"p.500"} />
          <Text fontWeight={600} fontSize={18}>
            Showcase
          </Text>
        </HStack>

        <FormControl>
          <FormLabel>Non-nullable Date Input</FormLabel>
          <DatePickerModal
            id="requiredDateInput"
            name="required_date"
            confirm={(inputValue) => {
              setRequiredDate(inputValue);
            }}
            inputValue={requiredDate}
            borderRadius={6}
            nonnullable
            mb={2}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Date Input</FormLabel>
          <DatePickerModal
            id="DateInput"
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
