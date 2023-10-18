/* eslint-disable react/prop-types */
import { Container, Grid } from "@chakra-ui/react";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";

export function BaseLayout({ children, ...rest }) {
	return (
		<Container
			as="main"
			maxW={"full"}
			p={0}
			{...rest}
		>
			<Navbar />
			{children}
			<Footer />
		</Container>
	);
}

export function GridLayout({ children, templateColumns, ...rest }) {
	return (
		<Container
			as="section"
			maxW={"full"}
			p={0}
			{...rest}
		>
			<Grid
				templateColumns={templateColumns}
				minH={"100vh"}
				gap={6}
				p={6}
			>
				{children}
			</Grid>
		</Container>
	);
}
