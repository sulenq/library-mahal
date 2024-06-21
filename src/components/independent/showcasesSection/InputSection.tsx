import FileInputShowcase from "../FileInputShowcase";
import ComponentShowcaseMainContainer from "../wrapper/ComponentShowcaseMainContainer";
import ComponentShowcaseTitle from "../wrapper/ComponentShowcaseTitle";
import MasonryContainer from "../wrapper/MassonryContainer";

export default function InputSection() {
  return (
    <ComponentShowcaseMainContainer flex={"1 1 0"}>
      <ComponentShowcaseTitle fontSize={24} mb={4}>
        Input
      </ComponentShowcaseTitle>

      <MasonryContainer>
        <FileInputShowcase />
      </MasonryContainer>
    </ComponentShowcaseMainContainer>
  );
}
