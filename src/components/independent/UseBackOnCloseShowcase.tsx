import { HStack, Icon, Text, Wrap } from "@chakra-ui/react";
import { RiSlideshow2Fill } from "@remixicon/react";
import { iconSize } from "../../constant/sizes";
import PropsAccordions from "../dependent/PropsAccordions";
import DrawerBackOnCloseShowcase from "./DrawerBackOnCloseShowcase";
import ModalBackOnCloseShowcase from "./ModalBackOnCloseShowcase";
import NestedModalBackOnCloseShowcase from "./NestedModalBackOnCloseShowcase";
import ComponentShowcaseContainer from "./wrapper/ComponentShowcaseContainer";
import ContentContainer from "./wrapper/ContentContainer";

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
      desc: <Text>function to open/set parameter isOpen to true</Text>,
    },
    {
      label: "isOpen",
      type: "() => void",
      desc: <Text>function to close/set parameter isOpen to false</Text>,
    },
  ];

  return (
    <ComponentShowcaseContainer title="useBackOnClose">
      <PropsAccordions type="library" requiredProps={requiredProps} />

      <ContentContainer>
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
