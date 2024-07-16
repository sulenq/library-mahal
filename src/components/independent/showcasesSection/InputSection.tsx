import FileInputLargeShowcase from "../FileInputLargeShowcase";
import FileInputShowcase from "../FileInputShowcase";
import NumberInputShowcase from "../NumberInputShowcase";
import PasswordInputShowcase from "../PasswordInputShowcase";
import SearchComponentShowcase from "../SearchComponentShowcase";
import TextareaShowcase from "../TextareaShowcase";
import ComponentShowcaseMainContainer from "../wrapper/ComponentShowcaseMainContainer";
import ComponentShowcaseTitle from "../wrapper/ComponentShowcaseTitle";
import MasonryContainer from "../wrapper/MassonryContainer";

export default function InputSection() {
  return (
    <ComponentShowcaseMainContainer>
      <ComponentShowcaseTitle fontSize={24} mb={4}>
        Input
      </ComponentShowcaseTitle>

      <MasonryContainer>
        <FileInputShowcase />

        <FileInputLargeShowcase />

        <PasswordInputShowcase />

        <TextareaShowcase />

        <NumberInputShowcase />

        <SearchComponentShowcase />
      </MasonryContainer>
    </ComponentShowcaseMainContainer>
  );
}
