import UseBackOnCloseShowcase from "../UseBackOnCloseShowcase";
import ComponentShowcaseMainContainer from "../wrapper/ComponentShowcaseMainContainer";
import ComponentShowcaseTitle from "../wrapper/ComponentShowcaseTitle";

export default function HooksSection() {
  return (
    <ComponentShowcaseMainContainer>
      <ComponentShowcaseTitle fontSize={24} mb={4}>
        Hooks
      </ComponentShowcaseTitle>

      <UseBackOnCloseShowcase />
    </ComponentShowcaseMainContainer>
  );
}
