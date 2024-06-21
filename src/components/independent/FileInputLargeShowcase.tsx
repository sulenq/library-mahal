import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Text,
  Wrap,
} from "@chakra-ui/react";
import {
  RiErrorWarningFill,
  RiQuestionFill,
  RiSlideshow2Fill,
} from "@remixicon/react";
import { useState } from "react";
import FileInputLarge from "../dependent/input/FileInputLarge";
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
      label: "onChange",
      type: "(inputValue: File | null) => void",
      desc: <Text>function to set controlled input</Text>,
    },
    {
      label: "inputValue",
      type: "File | null",
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
  const [filledFIleInput, setFilledFileInput] = useState<File | null>(
    dummyFile
  );
  const [fileInput, setFileInput] = useState<File | null>(null);

  return (
    <ComponentShowcaseContainer title="File Input Large">
      <ContentContainer borderRadius={8} bg={"var(--p500a3)"} mb={4}>
        <HStack mb={2}>
          <Icon as={RiErrorWarningFill} fontSize={24} color={"p.500"} />
          <Text fontWeight={600} fontSize={18} color={"p.500"}>
            Required Props
          </Text>
        </HStack>

        <Accordion allowMultiple>
          {requiredProps.map((props, i) => (
            <AccordionItem key={i}>
              <h2>
                <AccordionButton>
                  <Wrap as="span" fontWeight={500} flex="1" textAlign="left">
                    <Text>{props.label}</Text>
                    <Text opacity={0.5}>{props.type}</Text>
                  </Wrap>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel opacity={0.5}>{props.desc}</AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </ContentContainer>

      <ContentContainer borderRadius={8} bg={"var(--divider)"} mb={4}>
        <HStack mb={2}>
          <Icon as={RiQuestionFill} fontSize={24} />
          <Text fontWeight={600} fontSize={18}>
            Optional Props
          </Text>
        </HStack>

        <Accordion allowMultiple>
          {optionalProps.map((props, i) => (
            <AccordionItem key={i}>
              <h2>
                <AccordionButton>
                  <Wrap as="span" fontWeight={500} flex="1" textAlign="left">
                    <Text>{props.label}</Text>
                    <Text opacity={0.5}>{props.type}</Text>
                  </Wrap>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel opacity={0.5}>{props.desc}</AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </ContentContainer>

      <ContentContainer p={0}>
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
            onChange={(inputValue) => {
              setFilledFileInput(inputValue);
            }}
            inputValue={filledFIleInput}
            initialFilepath="/dummy.txt"
          />
        </FormControl>

        <FormControl>
          <FormLabel>File Input Large Accept PDF</FormLabel>
          <FileInputLarge
            name="fileInputLarge"
            onChange={(inputValue) => {
              setFileInput(inputValue);
            }}
            inputValue={fileInput}
            accept=".pdf"
          />
        </FormControl>
      </ContentContainer>
    </ComponentShowcaseContainer>
  );
}
