import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  HStack,
  Icon,
  Text,
  Wrap,
} from "@chakra-ui/react";
import { RiErrorWarningFill, RiSlideshow2Fill } from "@remixicon/react";
import { iconSize } from "../../constant/sizes";
import DrawerBackOnCloseShowCase from "./DrawerBackOnCloseShowCase";
import ModalBackOnCloseShowcase from "./ModalBackOnCloseShowcase";
import NestedModalBackOnCloseShowcase from "./NestedModalBackOnCloseShowcase";
import ComponentShowcaseContainer from "./wrapper/ComponentShowcaseContainer";
import ComponentShowcaseTitle from "./wrapper/ComponentShowcaseTitle";
import ContentContainer from "./wrapper/ContentContainer";

export default function UseBackOnCloseShowcase() {
  const requiredProps = [
    {
      label: "id",
      type: "string",
      desc: "just unique id accros ur entire project",
    },
    {
      label: "isOpen",
      type: "boolean",
      desc: "state is open true or false",
    },
    {
      label: "onOpen",
      type: "() => void",
      desc: "function to open/set isOpen to true",
    },
    {
      label: "isOpen",
      type: "() => void",
      desc: "function to close/set isOpen to false",
    },
  ];

  return (
    <ComponentShowcaseContainer flex={"1 1 0"}>
      <ComponentShowcaseTitle fontSize={20} mb={4}>
        useBackOnClose
      </ComponentShowcaseTitle>

      <ContentContainer bg={"var(--reda3)"} mb={4}>
        <HStack>
          <Icon as={RiErrorWarningFill} fontSize={iconSize} color={"red.400"} />
          <Text fontWeight={600} fontSize={18} color={"red.400"}>
            Required Parameter
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

      <ContentContainer border={"1px solid var(--divider2)"}>
        <HStack mb={2}>
          <Icon as={RiSlideshow2Fill} fontSize={iconSize} color={"p.500"} />
          <Text fontWeight={600} fontSize={18}>
            Showcase
          </Text>
        </HStack>

        <Wrap>
          <ModalBackOnCloseShowcase />

          <NestedModalBackOnCloseShowcase />

          <DrawerBackOnCloseShowCase />
        </Wrap>
      </ContentContainer>
    </ComponentShowcaseContainer>
  );
}
