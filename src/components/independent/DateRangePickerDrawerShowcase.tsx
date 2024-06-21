import {
  FormControl,
  FormLabel,
  HStack,
  Icon,
  ListItem,
  Radio,
  RadioGroup,
  Text,
  UnorderedList,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import { RiSlideshow2Fill } from "@remixicon/react";
import { useState } from "react";
import DateRangePickerDrawer from "../dependent/input/DateRangePickerDrawer";
import PropsAccordions from "../dependent/PropsAccordions";
import ComponentShowcaseContainer from "./wrapper/ComponentShowcaseContainer";
import ContentContainer from "./wrapper/ContentContainer";

export default function DateRangePickerDrawerShowcase() {
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
      label: "confirm",
      type: "(inputValue: Date | null) => void",
      desc: <Text>function to set controlled input</Text>,
    },
    {
      label: "inputValue",
      type: "Date | null",
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
      label: "isError",
      type: "boolean",
      desc: <Text>tell input if there is a validation error </Text>,
    },
    {
      label: "placement",
      type: "PrefixOption",
      desc: (
        <VStack gap={0} align={"stretch"}>
          <Text>Prefix Options :</Text>
          <UnorderedList>
            <ListItem>
              <Text>top</Text>
            </ListItem>
            <ListItem>
              <Text>bottom</Text>
            </ListItem>
            <ListItem>
              <Text>left</Text>
            </ListItem>
            <ListItem>
              <Text>right</Text>
            </ListItem>
          </UnorderedList>
          <Text>default is bottom</Text>
        </VStack>
      ),
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
      label: "nonnullable",
      type: "boolean",
      desc: (
        <Text>
          default is false, if true, then if value is not filled, confirmation
          button is disabled
        </Text>
      ),
    },
  ];

  const [placement, setPlacement] = useState<
    "top" | "bottom" | "left" | "right"
  >("bottom");
  const handlePlacementChange = (nextValue: string) => {
    if (["top", "bottom", "left", "right"].includes(nextValue)) {
      setPlacement(nextValue as "top" | "bottom" | "left" | "right");
    }
  };

  const [nonNullableDate, setNonNullableDate] = useState<{
    from: Date;
    to: Date;
  }>({
    from: new Date(),
    to: new Date(),
  });
  const [date, setDate] = useState<{
    from: Date;
    to: Date;
  } | null>(null);

  return (
    <ComponentShowcaseContainer title="Date Range Picker Drawer">
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

        <Text mb={2}>Placement</Text>
        <RadioGroup
          onChange={handlePlacementChange}
          colorScheme="ap"
          value={placement}
          mb={2}
        >
          <Wrap direction="row" spacing={4}>
            <Radio value="top">Top</Radio>
            <Radio value="bottom">Bottom</Radio>
            <Radio value="left">Left</Radio>
            <Radio value="right">Right</Radio>
          </Wrap>
        </RadioGroup>

        <FormControl>
          <FormLabel>Non-nullable Date Input</FormLabel>
          <DateRangePickerDrawer
            id="nonNullableDateRangeInput_drawer"
            name="nonNullable_date"
            confirm={(inputValue) => {
              setNonNullableDate(inputValue);
            }}
            inputValue={nonNullableDate}
            borderRadius={6}
            nonnullable
            mb={2}
            placement={placement}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Date Input</FormLabel>
          <DateRangePickerDrawer
            id="dateRangeInput_drawer"
            name="date"
            confirm={(inputValue) => {
              setDate(inputValue);
            }}
            inputValue={date}
            borderRadius={6}
            placement={placement}
          />
        </FormControl>
      </ContentContainer>
    </ComponentShowcaseContainer>
  );
}