import { useColorModeValue } from "@chakra-ui/react";

const useContentBgColor = () => {
  return useColorModeValue("#f6f6f6", "#151515");
};

const useLightDarkColor = () => {
  return useColorModeValue("white", "#191919");
};

const useDarkLightColor = () => {
  return useColorModeValue("dark", "white");
};

const useErrorColor = () => {
  return useColorModeValue("#E53E3E", "#FC8181");
};

const useWarningColor = () => {
  return useColorModeValue("#C05621", "#FBD38D");
};

const useErrorAlphaColor = () => {
  return useColorModeValue("#FED7D7", "#FEB2B229");
};

const useWarningAlphaColor = () => {
  return useColorModeValue("#FEEBC8", "#FBD38D29");
};

export {
  useContentBgColor,
  useLightDarkColor,
  useDarkLightColor,
  useErrorColor,
  useErrorAlphaColor,
  useWarningColor,
  useWarningAlphaColor,
};
