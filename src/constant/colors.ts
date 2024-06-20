import { useColorModeValue } from "@chakra-ui/react";

const useContentBgColor = () => {
  return useColorModeValue("#f9f9f9", "#141414");
};

const usePrimaryAlphaColor = () => {
  return useColorModeValue("teal.100", "rgba(129, 230, 217, 0.16)");
};

const useLightDarkColor = () => {
  return useColorModeValue("white", "dark");
};

const useDarkLightColor = () => {
  return useColorModeValue("dark", "white");
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
  statusKaryawanColorScheme,
};
