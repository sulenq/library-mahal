import { FormControl, FormLabel, Text } from "@chakra-ui/react";
import { useState } from "react";
import SearchComponent from "../dependent/input/SearchComponent";
import PropsAccordions from "../dependent/PropsAccordions";
import ShowcaseTitle from "./ShowcaseTitle";
import ComponentShowcaseContainer from "./wrapper/ComponentShowcaseContainer";
import ContentContainer from "./wrapper/ContentContainer";

export default function SearchComponentShowcase() {
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
    "Hello World!"
  );
  const [input, setInput] = useState<string | undefined>(undefined);

  return (
    <ComponentShowcaseContainer title="Search Component">
      <PropsAccordions
        requiredProps={requiredProps}
        optionalProps={optionalProps}
      />

      <ContentContainer>
        <ShowcaseTitle />

        <FormControl mb={2}>
          <FormLabel>Filled Search Component</FormLabel>
          <SearchComponent
            name="filledInput"
            onChangeSetter={(inputValue) => {
              setFilledInput(inputValue);
            }}
            inputValue={filledInput}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Search Component</FormLabel>
          <SearchComponent
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
