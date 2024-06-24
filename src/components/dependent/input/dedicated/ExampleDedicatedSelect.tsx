import { ButtonProps } from "@chakra-ui/react";
import { SelectOption } from "../../../../constant/interfaces";
import SingleSelect from "../SingleSelect";

interface Props extends ButtonProps {
  id: string;
  name: string;
  confirm: (inputValue: SelectOption | undefined) => void;
  inputValue: SelectOption | undefined;
  withSearch?: boolean;
  optionsDisplay?: "list" | "chip";
  isError?: boolean;
  placeholder?: string;
  required?: boolean;
}

export default function ExampleDedicatedSelect({
  id,
  name,
  confirm,
  inputValue,
  withSearch,
  optionsDisplay,
  isError,
  placeholder,
  required,
  ...props
}: Props) {
  const options = [
    {
      value: 1,
      label: "Red",
      subLabel: "#FF0000",
    },
    {
      value: 2,
      label: "Green",
      subLabel: "#00FF00",
    },
    {
      value: 3,
      label: "Blue",
      subLabel: "#0000FF",
    },
  ];

  return (
    <SingleSelect
      id={id}
      name={name}
      options={options}
      confirm={confirm}
      inputValue={inputValue}
      withSearch={withSearch}
      optionsDisplay={optionsDisplay}
      isError={isError}
      placeholder={placeholder}
      required={required}
      {...props}
    />
  );
}
