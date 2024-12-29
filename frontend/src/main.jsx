import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ChakraProvider,defaultSystem } from "@chakra-ui/react";
import { BrowserRouter } from "react-router";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
    <ChakraProvider value={defaultSystem}>
        <App />
    </ChakraProvider>
    </BrowserRouter>
  </StrictMode>
);
