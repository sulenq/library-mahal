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
import TimePickerDrawer from "../dependent/input/TimePickerDrawer";
import PropsAccordions from "../dependent/PropsAccordions";
import ComponentShowcaseContainer from "./wrapper/ComponentShowcaseContainer";
import ContentContainer from "./wrapper/ContentContainer";

export default function TimePickerDrawerShowcase() {
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
      label: "onConfirm",
      type: "(inputValue: Date | undefined) => void",
      desc: <Text>function to set controlled input</Text>,
    },
    {
      label: "inputValue",
      type: "Date | undefined",
      desc: <Text>value for the input field</Text>,
    },
  ];

  const optionalProps = [
    {
      label: "withSeconds",
      type: "boolean",
      desc: <Text>default is false, add seconds to the time picker</Text>,
    },
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
      label: "nonNullable",
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

  const dummyTime = new Date();
  dummyTime.setHours(16, 0, 0, 0);

  const [requiredInput, setrequiredInput] = useState<Date | undefined>(
    dummyTime
  );
  const [input, setInput] = useState<Date | undefined>();

  return (
    <ComponentShowcaseContainer title="Time Picker Drawer">
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

        <FormControl mb={2}>
          <FormLabel>Non Nullable Time Input</FormLabel>
          <TimePickerDrawer
            id="required_time_picker_drawer"
            name="required_time"
            onConfirm={(inputValue) => {
              setrequiredInput(inputValue);
            }}
            inputValue={requiredInput}
            nonNullable
            placement={placement}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Time Input Include Seconds</FormLabel>
          <TimePickerDrawer
            id="time_picker_drawer"
            name="time"
            onConfirm={(inputValue) => {
              setInput(inputValue);
            }}
            inputValue={input}
            placement={placement}
            withSeconds
          />
        </FormControl>
      </ContentContainer>
    </ComponentShowcaseContainer>
  );
}
