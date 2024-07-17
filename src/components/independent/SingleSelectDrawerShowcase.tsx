import {
  Alert,
  AlertDescription,
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
import { Interface__SelectOption } from "../../constant/interfaces";
import ExampleDedicatedSelectDrawer from "../dependent/input/select/ExampleDedicatedSelectDrawer";
import PropsAccordions from "../dependent/PropsAccordions";
import ComponentShowcaseContainer from "./wrapper/ComponentShowcaseContainer";
import ContentContainer from "./wrapper/ContentContainer";

export default function SingleSelectDrawerShowcase() {
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
      label: "options",
      type: "array{ value: any; label: string; label2?: string }[]",
      desc: (
        <Text>
          select input must have options right? so this is array of options
        </Text>
      ),
    },
    {
      label: "onConfirm",
      type: "(inputValue: { value: any; label: string; label2?: string } | undefined) => void",
      desc: <Text>function to set controlled input</Text>,
    },
    {
      label: "inputValue",
      type: "{ value: any; label: string; label2?: any }",
      desc: (
        <Text>
          value for the input field, label 2 is any because it will be directly
          rendered
        </Text>
      ),
    },
  ];

  const optionalProps = [
    {
      label: "withSearch",
      type: "boolean",
      desc: (
        <Text>
          default is false, if true, it will add search (string match) feature
        </Text>
      ),
    },
    {
      label: "optionsDisplay",
      type: "Prefix Options",
      desc: (
        <VStack gap={0} align={"stretch"}>
          <Text>Prefix Options :</Text>
          <UnorderedList>
            <ListItem>
              <Text>list, vertical list</Text>
            </ListItem>
            <ListItem>
              <Text>chip, flex wrapped list</Text>
            </ListItem>
          </UnorderedList>
          <Text>default is list</Text>
        </VStack>
      ),
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

  const [requiredInput, setrequiredInput] = useState<
    Interface__SelectOption | undefined
  >({
    value: 1,
    label: "Red",
    subLabel: "#FF0000",
  });
  const [input, setInput] = useState<Interface__SelectOption | undefined>();
  const [input2, setInput2] = useState<Interface__SelectOption | undefined>();

  return (
    <ComponentShowcaseContainer title="Single Select Drawer">
      <VStack px={4} align={"stretch"}>
        <Alert status="warning" mb={2} w={"100%"} maxW={"100%"}>
          <AlertDescription>
            {
              "You must create dedicated component for select, it contain array options (constant or async), options type is {value:any, label:string, subLabel?:string}[] and useDisclosure"
            }
          </AlertDescription>
        </Alert>
      </VStack>
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
          <FormLabel>
            Non Nullable Filled Single Select Input with Search
          </FormLabel>
          <ExampleDedicatedSelectDrawer
            id="required_example_select_drawer"
            name="color"
            onConfirm={(inputValue) => {
              setrequiredInput(inputValue);
            }}
            inputValue={requiredInput}
            placeholder="Pilih Warna"
            placement={placement}
            nonNullable
            withSearch
          />
        </FormControl>

        <FormControl mb={2}>
          <FormLabel>Single Select Input Chip Options Display</FormLabel>
          <ExampleDedicatedSelectDrawer
            id="example_select_drawer"
            name="color"
            onConfirm={(inputValue) => {
              setInput(inputValue);
            }}
            inputValue={input}
            placeholder="Pilih Warna"
            placement={placement}
            optionsDisplay="chip"
          />
        </FormControl>

        <FormControl>
          <FormLabel>
            Single Select Input Chip Options Display with Search
          </FormLabel>
          <ExampleDedicatedSelectDrawer
            id="example_select_drawer2"
            name="color"
            onConfirm={(inputValue) => {
              setInput2(inputValue);
            }}
            inputValue={input2}
            placeholder="Pilih Warna"
            placement={placement}
            optionsDisplay="chip"
            withSearch
          />
        </FormControl>
      </ContentContainer>
    </ComponentShowcaseContainer>
  );
}
