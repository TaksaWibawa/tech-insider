import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App.jsx";
import React from "react";
import ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<ChakraProvider resetCSS>
			<App />
		</ChakraProvider>
	</React.StrictMode>
);
