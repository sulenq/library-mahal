import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  StackProps,
  VStack,
} from "@chakra-ui/react";
import { useLightDarkColor } from "../../../constant/colors";

interface Props extends StackProps {
  title: string;
  children?: any;
}

export default function ComponentShowcaseContainer({
  title,
  children,
  ...props
}: Props) {
  return (
    <VStack
      gap={0}
      borderRadius={12}
      border={"1px solid var(--divider)"}
      align={"stretch"}
      h={"fit-content"}
      bg={useLightDarkColor()}
      overflow={"clip"}
      {...props}
    >
      <Accordion allowMultiple>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box
                as="span"
                flex={1}
                textAlign={"left"}
                fontSize={20}
                p={2}
                fontWeight={600}
              >
                {title}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>

          <AccordionPanel pb={6} px={6}>
            {children}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </VStack>
  );
}
