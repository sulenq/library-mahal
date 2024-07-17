import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  HStack,
  Icon,
  StackProps,
  Text,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import ComponentShowcaseContainer from "../independent/wrapper/ComponentShowcaseContainer";
import { RiErrorWarningFill, RiQuestionFill } from "@remixicon/react";

interface Props extends StackProps {
  requiredProps?: any;
  optionalProps?: any;
  type?: "library" | "component";
}

export default function PropsAccordions({
  requiredProps,
  optionalProps,
  type,
  ...props
}: Props) {
  return (
    <VStack align={"stretch"} px={4} {...props}>
      {requiredProps && (
        <ComponentShowcaseContainer
          title={
            <HStack ml={-1}>
              <Icon as={RiErrorWarningFill} fontSize={24} color={"p.500"} />
              <Text fontWeight={600} fontSize={18} color={"p.500"}>
                {type === "library" ? "Required Parameter" : "Required Props"}
              </Text>
            </HStack>
          }
          border={"none"}
          bg={"var(--p500a4)"}
        >
          <Accordion allowMultiple>
            {requiredProps.map((props: any, i: number) => (
              <AccordionItem
                key={i}
                borderBottom={
                  i === requiredProps.length - 1
                    ? "none"
                    : "1px solid var(--divider)"
                }
              >
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
        </ComponentShowcaseContainer>
      )}

      {optionalProps && (
        <ComponentShowcaseContainer
          title={
            <HStack ml={-1}>
              <Icon as={RiQuestionFill} fontSize={24} />
              <Text fontWeight={600} fontSize={18}>
                Optional Props
              </Text>
            </HStack>
          }
          border={"none"}
          bg={"var(--divider)"}
        >
          <Accordion allowMultiple>
            {optionalProps.map((props: any, i: number) => (
              <AccordionItem
                key={i}
                borderBottom={
                  i === optionalProps.length - 1
                    ? "none"
                    : "1px solid var(--divider)"
                }
              >
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
        </ComponentShowcaseContainer>
      )}
    </VStack>
  );
}
