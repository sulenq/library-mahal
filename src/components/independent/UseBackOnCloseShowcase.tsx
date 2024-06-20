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
import ModalBackOnCloseShowcase from "./ModalBackOnCloseShowcase";
import NestedModalBackOnCloseShowcase from "./NestedModalBackOnCloseShowcase";
import ComponentShowcaseContainer from "./wrapper/ComponentShowcaseContainer";
import ComponentShowcaseTitle from "./wrapper/ComponentShowcaseTitle";
import ContentContainer from "./wrapper/ContentContainer";
import DrawerBackOnCloseShowcase from "./DrawerBackOnCloseShowcase";

export default function UseBackOnCloseShowcase() {
  const requiredProps = [
    {
      label: "id",
      type: "string",
      desc: <Text>just unique id accros ur entire project</Text>,
    },
    {
      label: "isOpen",
      type: "boolean",
      desc: <Text>state is open true or false</Text>,
    },
    {
      label: "onOpen",
      type: "() => void",
      desc: <Text>function to open/set isOpen to true</Text>,
    },
    {
      label: "isOpen",
      type: "() => void",
      desc: <Text>function to close/set isOpen to false</Text>,
    },
  ];

  return (
    <ComponentShowcaseContainer flex={"1 1 0"}>
      <ComponentShowcaseTitle fontSize={20} mb={4}>
        useBackOnClose
      </ComponentShowcaseTitle>

      <ContentContainer bg={"var(--p500a3)"} mb={4}>
        <HStack mb={2}>
          <Icon as={RiErrorWarningFill} fontSize={iconSize} color={"p.500"} />
          <Text fontWeight={600} fontSize={18} color={"p.500"}>
            Required Parameter
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
              <AccordionPanel opacity={0.5}>{props.desc}</AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </ContentContainer>

      <ContentContainer p={0}>
        <HStack mb={2}>
          <Icon as={RiSlideshow2Fill} fontSize={iconSize} color={"p.500"} />
          <Text fontWeight={600} fontSize={18}>
            Showcase
          </Text>
        </HStack>

        <Wrap>
          <ModalBackOnCloseShowcase />

          <NestedModalBackOnCloseShowcase />

          <DrawerBackOnCloseShowcase />
        </Wrap>
      </ContentContainer>
    </ComponentShowcaseContainer>
  );
}
