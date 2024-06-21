import { Box, BoxProps } from "@chakra-ui/react";
import React from "react";
import Masonry from "react-masonry-css";

interface Props extends BoxProps {
  breakpoints?: { [key: number]: number; default?: number };
  children?: React.ReactNode;
}

const MasonryContainer = ({ breakpoints, children, ...props }: Props) => {
  const defaultBreakpoints = {
    default: 3,
    1280: 2,
    700: 1,
    500: 1,
  };

  const breakpointColumnsObj =
    breakpoints && Object.keys(breakpoints).length > 0
      ? breakpoints
      : defaultBreakpoints;

  return (
    <Box w="100%" {...props}>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {children}
      </Masonry>
    </Box>
  );
};

export default MasonryContainer;
