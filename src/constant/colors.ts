import { useColorModeValue } from "@chakra-ui/react";

const useContentBgColor = () => {
  return useColorModeValue("#f9f9f9", "#161616");
};

const usePrimaryAlphaColor = () => {
  return useColorModeValue("teal.100", "rgba(129, 230, 217, 0.16)");
};

const useLightDarkColor = () => {
  return useColorModeValue("white !important", "dark");
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

const useRedaColor = () => {
  return useColorModeValue("#FED7D7", "#FEB2B229");
};

const statusKaryawanColorScheme = {
  tetap: "orange",
  Tetap: "orange",
  kontrak: "purple",
  Kontrak: "purple",
  magang: "green",
  Magang: "green",
};

export {
  useContentBgColor,
  usePrimaryAlphaColor,
  useLightDarkColor,
  useDarkLightColor,
  useErrorColor,
  useRedaColor,
  useWarningColor,
  statusKaryawanColorScheme,
};
