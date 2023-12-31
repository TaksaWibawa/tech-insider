import { Button, HStack, Text, VStack } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { WhiteImage } from "../icons";

export function Footer() {
	const links = [
		{
			href: "#",
			text: "FAQ",
		},
		{
			href: "#",
			text: "About Tech Insider",
		},
		{
			href: "#",
			text: "Report",
		},
	];

	return (
		<VStack
			bgColor={"#495375"}
			py={7}
			spacing={4}
		>
			<WhiteImage
				w={{ base: "100px", lg: "150px" }}
				h={"auto"}
			/>
			<HStack spacing={"4"}>
				{links.map((link) => (
					<NavLink
						key={link.text}
						to={link.href}
					>
						<Button
							variant={"link"}
							color={"white"}
							fontSize={"xs"}
							fontWeight={"normal"}
							textDecoration={"underline"}
							_hover={{
								color: "whiteAlpha.700",
							}}
						>
							{link.text}
						</Button>
					</NavLink>
				))}
			</HStack>
			<Text
				color={"white"}
				fontSize={"xs"}
			>
				© 2023 Tech Insider. All rights reserved.
			</Text>
		</VStack>
	);
}
