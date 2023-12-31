import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { store } from "./store";
import App from "./App.jsx";
import React from "react";
import ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Provider store={store}>
			<ChakraProvider resetCSS>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</ChakraProvider>
		</Provider>
	</React.StrictMode>
);
