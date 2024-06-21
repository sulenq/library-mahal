import { HStack, Icon, Text } from "@chakra-ui/react";
import { RiSlideshow2Fill } from "@remixicon/react";

export default function ShowcaseTitle() {
  return (
    <HStack mb={2}>
      <Icon as={RiSlideshow2Fill} fontSize={24} color={"p.500"} />
      <Text fontWeight={600} fontSize={18}>
        Showcase
      </Text>
    </HStack>
  );
}
