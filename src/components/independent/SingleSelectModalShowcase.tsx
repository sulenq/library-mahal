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
import { Interface__SelectOption } from "../../constant/interfaces";
import ExampleDedicatedSelectModal from "../dependent/input/select/ExampleDedicatedSelectModal";
import PropsAccordions from "../dependent/PropsAccordions";
import ComponentShowcaseContainer from "./wrapper/ComponentShowcaseContainer";
import ContentContainer from "./wrapper/ContentContainer";

export default function SingleSelectModalShowcase() {
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
    <ComponentShowcaseContainer title="Single Select Modal">
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

        <FormControl mb={2}>
          <FormLabel>
            Non Nullable Filled Single Select Input with Search
          </FormLabel>
          <ExampleDedicatedSelectModal
            id="required_example_select"
            name="color"
            onConfirm={(inputValue) => {
              setrequiredInput(inputValue);
            }}
            inputValue={requiredInput}
            placeholder="Pilih Warna"
            nonNullable
            withSearch
          />
        </FormControl>

        <FormControl mb={2}>
          <FormLabel>Single Select Input Chip Options Display</FormLabel>
          <ExampleDedicatedSelectModal
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
          <ExampleDedicatedSelectModal
            id="example_select2"
            name="color"
            onConfirm={(inputValue) => {
              setInput2(inputValue);
            }}
            inputValue={input2}
            placeholder="Pilih Warna"
            optionsDisplay="chip"
            withSearch
          />
        </FormControl>
      </ContentContainer>
    </ComponentShowcaseContainer>
  );
}
