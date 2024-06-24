import {
  Alert,
  AlertDescription,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  ListItem,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
import { RiSlideshow2Fill } from "@remixicon/react";
import { useState } from "react";
import { SelectOption } from "../../constant/interfaces";
import ExampleDedicatedSelect from "../dependent/input/_select/ExampleDedicatedSelect";
import PropsAccordions from "../dependent/PropsAccordions";
import ComponentShowcaseContainer from "./wrapper/ComponentShowcaseContainer";
import ContentContainer from "./wrapper/ContentContainer";

export default function SelectModalShowcase() {
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
      type: "Prefix",
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
      label: "required",
      type: "boolean",
      desc: (
        <Text>
          default is false, if true, then if value is not filled, confirmation
          button is disabled
        </Text>
      ),
    },
  ];

  const [requiredInput, setrequiredInput] = useState<SelectOption | undefined>({
    value: 1,
    label: "Red",
    subLabel: "#FF0000",
  });
  const [input, setInput] = useState<SelectOption | undefined>();

  return (
    <ComponentShowcaseContainer title="Select Modal">
      <VStack px={4} align={"stretch"}>
        <Alert status="warning" mb={2} w={"100%"} maxW={"100%"}>
          <AlertDescription>
            You must create dedicated component for select, it contain options
            variable(constant or async) and list of options
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

        <FormControl mb={2}>
          <FormLabel>Required Single Select Input with Search</FormLabel>
          <ExampleDedicatedSelect
            id="required_example_select"
            name="color"
            onConfirm={(inputValue) => {
              setrequiredInput(inputValue);
            }}
            inputValue={requiredInput}
            placeholder="Pilih Warna"
            required
            withSearch
          />
        </FormControl>

        <FormControl mb={2}>
          <FormLabel>Single Select Input Chip Options Display</FormLabel>
          <ExampleDedicatedSelect
            id="example_select"
            name="color"
            onConfirm={(inputValue) => {
              setInput(inputValue);
            }}
            inputValue={input}
            placeholder="Pilih Warna"
            optionsDisplay="chip"
          />
        </FormControl>

        <FormControl>
          <FormLabel>
            Single Select Input Chip Options Display with Search
          </FormLabel>
          <ExampleDedicatedSelect
            id="example_select"
            name="color"
            onConfirm={(inputValue) => {
              setInput(inputValue);
            }}
            inputValue={input}
            placeholder="Pilih Warna"
            optionsDisplay="chip"
            withSearch
          />
        </FormControl>
      </ContentContainer>
    </ComponentShowcaseContainer>
  );
}
