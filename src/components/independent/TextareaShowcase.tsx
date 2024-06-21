import { FormControl, FormLabel, Text } from "@chakra-ui/react";
import { useState } from "react";
import PasswordInput from "../dependent/input/PasswordInput";
import PropsAccordions from "../dependent/PropsAccordions";
import ShowcaseTitle from "./ShowcaseTitle";
import ComponentShowcaseContainer from "./wrapper/ComponentShowcaseContainer";
import ContentContainer from "./wrapper/ContentContainer";
import Textarea from "../dependent/input/Textarea";

export default function TextareaShowcase() {
  const requiredProps = [
    {
      label: "name",
      type: "string",
      desc: <Text>name the input, of course it must have name</Text>,
    },
    {
      label: "onChangeSetter",
      type: "(inputValue: string | undefined) => void",
      desc: <Text>function to set controlled input</Text>,
    },
    {
      label: "inputValue",
      type: "string | undefined",
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

  const [filledInput, setFilledInput] = useState<string | undefined>(
    "This text area is auto resize when you continue write this, just see the magic"
  );
  const [input, setInput] = useState<string | undefined>(undefined);

  return (
    <ComponentShowcaseContainer title="Auto Expand Textarea">
      <PropsAccordions
        requiredProps={requiredProps}
        optionalProps={optionalProps}
      />

      <ContentContainer>
        <ShowcaseTitle />

        <FormControl mb={2}>
          <FormLabel>Filled Textarea</FormLabel>
          <Textarea
            name="filledInput"
            onChangeSetter={(inputValue) => {
              setFilledInput(inputValue);
            }}
            inputValue={filledInput}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Textarea</FormLabel>
          <Textarea
            name="fileInput"
            onChangeSetter={(inputValue) => {
              setInput(inputValue);
            }}
            inputValue={input}
          />
        </FormControl>
      </ContentContainer>
    </ComponentShowcaseContainer>
  );
}
