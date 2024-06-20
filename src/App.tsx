import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { globalTheme } from "./chakraTheme/globalTheme";
import Showcases from "./pages/Showcases";
import "./globalStyle.css";

export const App = () => (
  <ChakraProvider theme={globalTheme}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Showcases />} />
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
);
