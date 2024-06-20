import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  HStack,
  Icon,
  Text,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import {
  RiCheckboxCircleFill,
  RiErrorWarningFill,
  RiSlideshow2Fill,
} from "@remixicon/react";
import { iconSize } from "../../../constant/sizes";
import ModalBackOnCloseShowcase from "../ModalBackOnCloseShowcase";
import NestedModalBackOnCloseShowcase from "../NestedModalBackOnCloseShowcase";
import ComponentShowcaseMainContainer from "../wrapper/ComponentShowcaseMainContainer";
import ComponentShowcaseTitle from "../wrapper/ComponentShowcaseTitle";
import DrawerBackOnCloseShowCase from "../DrawerBackOnCloseShowCase";

export default function UseBackOnCloseSection() {
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
    <ComponentShowcaseMainContainer>
      <ComponentShowcaseTitle fontSize={24}>
        useBackOnClose Hooks
      </ComponentShowcaseTitle>

      <HStack my={2}>
        <Icon as={RiErrorWarningFill} fontSize={iconSize} color={"p.500"} />
        <Text>
          using <b>useBackOnClose(id, isOpen, onOpen, onClose)</b> hooks
        </Text>
      </HStack>

      <VStack align={"stretch"} mb={4}>
        <HStack>
          <Icon as={RiCheckboxCircleFill} fontSize={iconSize} color={"p.500"} />
          <Text fontWeight={600} fontSize={18}>
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
      </VStack>

      <HStack mb={2}>
        <Icon as={RiSlideshow2Fill} fontSize={iconSize} color={"p.500"} />
        <Text fontWeight={600} fontSize={18}>
          Demo
        </Text>
      </HStack>

      <Wrap>
        <ModalBackOnCloseShowcase />

        <NestedModalBackOnCloseShowcase />

        <DrawerBackOnCloseShowCase />
      </Wrap>
    </ComponentShowcaseMainContainer>
  );
}
