import { ButtonProps } from "@chakra-ui/react";
import { SelectOption } from "../../../../constant/interfaces";
import SingleSelectDrawer from "../SingleSelectDrawer";

interface Props extends ButtonProps {
  id: string;
  name: string;
  onConfirm: (inputValue: SelectOption | undefined) => void;
  inputValue: SelectOption | undefined;
  withSearch?: boolean;
  optionsDisplay?: "list" | "chip";
  isError?: boolean;
  placement?: "top" | "bottom" | "left" | "right";
  placeholder?: string;
  required?: boolean;
}

export default function ExampleDedicatedSelectDrawer({
  id,
  name,
  onConfirm,
  inputValue,
  withSearch,
  optionsDisplay,
  isError,
  placement = "bottom",
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
    {
      value: 4,
      label: "Dummy",
      subLabel: "#000000",
    },
    {
      value: 5,
      label: "Dummy",
      subLabel: "#000000",
    },
    {
      value: 6,
      label: "Dummy",
      subLabel: "#000000",
    },
    {
      value: 7,
      label: "Dummy",
      subLabel: "#000000",
    },
    {
      value: 8,
      label: "Dummy",
      subLabel: "#000000",
    },
    {
      value: 9,
      label: "Dummy",
      subLabel: "#000000",
    },
    {
      value: 10,
      label: "Dummy",
      subLabel: "#000000",
    },
    {
      value: 11,
      label: "Dummy",
      subLabel: "#000000",
    },
    {
      value: 12,
      label: "Dummy",
      subLabel: "#000000",
    },
    {
      value: 13,
      label: "Dummy",
      subLabel: "#000000",
    },
    {
      value: 14,
      label: "Dummy",
      subLabel: "#000000",
    },
  ];

  return (
    <SingleSelectDrawer
      id={id}
      name={name}
      options={options}
      onConfirm={onConfirm}
      inputValue={inputValue}
      withSearch={withSearch}
      optionsDisplay={optionsDisplay}
      isError={isError}
      placement={placement}
      placeholder={placeholder}
      required={required}
      {...props}
    />
  );
}
