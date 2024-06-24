import {
  Center,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputGroupProps,
  InputLeftElement,
} from "@chakra-ui/react";
import { RiCloseLine, RiSearchLine } from "@remixicon/react";
import { Dispatch } from "react";
import { iconSize } from "../../../constant/sizes";

interface Props extends InputGroupProps {
  name: string;
  inputValue: string | undefined;
  onChangeSetter: Dispatch<string | undefined>;
  placeholder?: string;
}

export default function SearchComponent({
  name,
  inputValue,
  onChangeSetter,
  placeholder,
  ...props
}: Props) {
  return (
    <InputGroup flex={"1 1 165px"} minW={"165px"} {...props}>
      <InputLeftElement>
        <Icon as={RiSearchLine} color={"p.500"} fontSize={iconSize} />
      </InputLeftElement>
      <Input
        placeholder={placeholder || "Pencarian"}
        flex={"1 1 0"}
        pr={"36px"}
        onChange={(e) => {
          onChangeSetter(e.target.value);
        }}
        value={inputValue}
      />

      {inputValue && (
        <Center
          flexShrink={0}
          zIndex={3}
          position={"absolute"}
          h={"100%"}
          right={2}
        >
          <IconButton
            aria-label="Reset Search"
            icon={
              <Icon as={RiCloseLine} color={"red.400"} fontSize={iconSize} />
            }
            onClick={() => {
              onChangeSetter("");
            }}
            borderRadius={"full"}
            className="btn"
            size={"xs"}
          />
        </Center>
      )}
    </InputGroup>
  );
}
