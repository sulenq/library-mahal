import formatNumber from "../../../lib/formatNumber";
import parseNumber from "../../../lib/parseNumber";
import StringInput from "./StringInput";

interface Props {
  name: string;
  onChangeSetter: (inputValue: number | undefined) => void;
  inputValue: number | undefined;
  isError?: boolean;
  placeholder?: string;
}

export default function NumberInput({
  name,
  onChangeSetter,
  inputValue,
  isError,
  placeholder,
  ...props
}: Props) {
  return (
    <StringInput
      name="tinggi_badan"
      inputMode="numeric"
      onChangeSetter={(i) => {
        if (i === "") {
          onChangeSetter(undefined);
        } else {
          //@ts-ignore
          onChangeSetter(parseNumber(i));
        }
      }}
      inputValue={formatNumber(inputValue) || ""}
      placeholder={placeholder}
      {...props}
    />
  );
}
