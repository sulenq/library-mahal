import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  HStack,
  Icon,
  Text,
} from "@chakra-ui/react";
import {
  RiErrorWarningFill,
  RiQuestionFill,
  RiSlideshow2Fill,
} from "@remixicon/react";
import { iconSize } from "../../constant/sizes";
import ComponentShowcaseContainer from "./wrapper/ComponentShowcaseContainer";
import ComponentShowcaseTitle from "./wrapper/ComponentShowcaseTitle";
import ContentContainer from "./wrapper/ContentContainer";

export default function DatePickerShowcase() {
  const requiredProps = [
    {
      label: "name",
      type: "string",
      desc: "just unique id accros ur entire project",
    },
    {
      label: "onChange",
      type: "() => void",
      desc: "function to set controlled input",
    },
    {
      label: "inputValue",
      type: "Date | string",
      desc: "value for the input field",
    },
  ];

  const optionalProps = [
    {
      label: "required",
      type: "boolean",
      desc: "default is false, if true, then if value is not filled, confirmation button is disabled",
    },
    {
      label: "placeholder",
      type: "string",
      desc: "default is false, if true, then if value is not filled, confirmation button is disabled",
    },
  ];

  return (
    <ComponentShowcaseContainer flex={"1 1 0"}>
      <ComponentShowcaseTitle fontSize={20} mb={4}>
        Date Picker
      </ComponentShowcaseTitle>

      <ContentContainer bg={"var(--reda3)"} mb={4}>
        <HStack>
          <Icon as={RiErrorWarningFill} fontSize={iconSize} color={"red.400"} />
          <Text fontWeight={600} fontSize={18} color={"red.400"}>
            Required Props
          </Text>
        </HStack>

        <Accordion allowMultiple>
          {requiredProps.map((props, i) => (
            <AccordionItem key={i}>
              <h2>
                <AccordionButton>
                  <HStack as="span" fontWeight={500} flex="1" textAlign="left">
                    <Text>{props.label}</Text>
                    <Text opacity={0.5}>{props.type}</Text>
                  </HStack>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>{props.desc}</AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </ContentContainer>

      <ContentContainer bg={"var(--divider)"} mb={4}>
        <HStack mb={2}>
          <Icon as={RiQuestionFill} fontSize={iconSize} />
          <Text fontWeight={600} fontSize={18}>
            Optional Props
          </Text>
        </HStack>

        <Accordion allowMultiple>
          {optionalProps.map((props, i) => (
            <AccordionItem key={i}>
              <h2>
                <AccordionButton>
                  <HStack as="span" fontWeight={500} flex="1" textAlign="left">
                    <Text>{props.label}</Text>
                    <Text opacity={0.5}>{props.type}</Text>
                  </HStack>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>{props.desc}</AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </ContentContainer>

      <ContentContainer border={"1px solid var(--divider3)"}>
        <HStack mb={2}>
          <Icon as={RiSlideshow2Fill} fontSize={iconSize} color={"p.500"} />
          <Text fontWeight={600} fontSize={18}>
            Showcase
          </Text>
        </HStack>
      </ContentContainer>
    </ComponentShowcaseContainer>
  );
}
