import { FormControl, FormLabel, Text } from "@chakra-ui/react";
import { useState } from "react";
import NumberInput from "../dependent/input/NumberInput";
import PropsAccordions from "../dependent/PropsAccordions";
import ShowcaseTitle from "./ShowcaseTitle";
import ComponentShowcaseContainer from "./wrapper/ComponentShowcaseContainer";
import ContentContainer from "./wrapper/ContentContainer";

export default function NumberInputShowcase() {
  const requiredProps = [
    {
      label: "name",
      type: "string",
      desc: <Text>name the input, of course it must have name</Text>,
    },
    {
      label: "onChangeSetter",
      type: "(inputValue: File | undefined) => void",
      desc: <Text>function to set controlled input</Text>,
    },
    {
      label: "inputValue",
      type: "File | undefined",
      desc: <Text>value for the input field</Text>,
    },
  ];

  const optionalProps = [
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
  ];

  const [filledInput, setFilledInput] = useState<number | undefined>(16500);
  const [input, setInput] = useState<number | undefined>(undefined);
  console.log("input", input);

  return (
    <ComponentShowcaseContainer title="Number Input">
      <PropsAccordions
        requiredProps={requiredProps}
        optionalProps={optionalProps}
      />

      <ContentContainer>
        <ShowcaseTitle />

        <FormControl mb={2}>
          <FormLabel>Filled Number Input</FormLabel>
          <NumberInput
            name="filledInput"
            onChangeSetter={(inputValue) => {
              setFilledInput(inputValue);
            }}
            inputValue={filledInput}
            placeholder="123"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Number Input</FormLabel>
          <NumberInput
            name="fileInput"
            onChangeSetter={(inputValue) => {
              setInput(inputValue);
            }}
            inputValue={input}
            placeholder="123"
          />
        </FormControl>
      </ContentContainer>
    </ComponentShowcaseContainer>
  );
}
