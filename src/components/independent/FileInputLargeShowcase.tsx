import { FormControl, FormLabel, HStack, Icon, Text } from "@chakra-ui/react";
import { RiSlideshow2Fill } from "@remixicon/react";
import { useState } from "react";
import FileInputLarge from "../dependent/input/FileInputLarge";
import PropsAccordions from "../dependent/PropsAccordions";
import ComponentShowcaseContainer from "./wrapper/ComponentShowcaseContainer";
import ContentContainer from "./wrapper/ContentContainer";

export default function FileInputLargeShowcase() {
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
      label: "accept",
      type: "string",
      desc: (
        <Text>
          if you wanna limit the input for ms word just pass 'docx', if you want
          multiple file that can be accepted you can write like this '.docx,
          .pdf', but this is not prevent user for drag n drop file, to validate
          allowed file you must use validation schema like formik with yup for
          example
        </Text>
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
      label: "initialFilepath",
      type: "string",
      desc: (
        <Text>
          if the input is filled, for example when editing data, pass the
          filepath
        </Text>
      ),
    },
  ];

  const blob = new Blob(["Dummy file content"], { type: "text/plain" });
  const dummyFile = new File([blob], "dummy.txt", {
    type: "text/plain",
    lastModified: new Date().getTime(),
  });
  const [filledFIleInput, setFilledFileInput] = useState<File | undefined>(
    dummyFile
  );
  const [fileInput, setFileInput] = useState<File | undefined>();

  return (
    <ComponentShowcaseContainer title="File Input Large">
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
          <FormLabel>Filled File Input Large</FormLabel>
          <FileInputLarge
            name="filledFileInputLarge"
            onChangeSetter={(inputValue) => {
              setFilledFileInput(inputValue);
            }}
            inputValue={filledFIleInput}
            initialFilepath="/dummy.txt"
          />
        </FormControl>

        <FormControl>
          <FormLabel>File Input Large </FormLabel>
          <FileInputLarge
            name="fileInputLarge"
            onChangeSetter={(inputValue) => {
              setFileInput(inputValue);
            }}
            inputValue={fileInput}
            placeholder="Mendukung PDF"
          />
        </FormControl>
      </ContentContainer>
    </ComponentShowcaseContainer>
  );
}
