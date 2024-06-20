import { Icon, IconButton, IconButtonProps } from "@chakra-ui/react";
import { RiCloseLine } from "@remixicon/react";
import backOnClose from "../../lib/backOnClose";

interface Props extends IconButtonProps {}

export default function BackOnCloseButton({ ...props }: Props) {
  return (
    <IconButton
      icon={<Icon as={RiCloseLine} fontSize={28} className="custom-icon" />}
      size={"sm"}
      borderRadius={"full"}
      className="btn"
      onClick={backOnClose}
      mr={"-6px"}
      {...props}
    />
  );
}
