/* eslint-disable react/prop-types */
import { authService } from "../../config/auth";
import { BaseImage } from "../icons";
import { Box, Button, ButtonGroup, Flex, Icon, VStack } from "@chakra-ui/react";
import { FaCog, FaUser, FaSignOutAlt, FaHome } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { RiProfileFill } from "react-icons/ri";

const menuItems = [
	{ label: "Dashboard", icon: <RiProfileFill /> },
	{ label: "Profile", icon: <FaUser /> },
	{ label: "Setting", icon: <FaCog /> },
	{ label: "Go to Home", icon: <FaHome /> },
];

export function Sidebar({ state, setState }) {
	const navigate = useNavigate();

	const handleChangeContent = (content) => {
		if (content === state) return;
		if (content === "Go to Home") return navigate("/");
		setState(content);
	};

	const handleLogout = () => {
		authService.logout();
		navigate("/");
	};

	return (
		<Flex
			as="aside"
			bg={"blue.500"}
			flexDirection={"column"}
			gap={4}
			h={"100vh"}
			pos="sticky"
			top={0}
			w={"64"}
			zIndex={1000}
		>
			<Link to="/">
				<Box
					p={4}
					w={"full"}
				>
					<BaseImage />
				</Box>
			</Link>

			<ButtonGroup flexDirection="column">
				{menuItems.map((item) => (
					<Button
						key={item.label}
						leftIcon={item.icon}
						w={"full"}
						justifyContent={"flex-start"}
						borderRadius={"none"}
						color={"white"}
						variant={"ghost"}
						style={{
							margin: "auto",
						}}
						_hover={{ bg: "blue.400" }}
						_active={{
							bg: "white",
							color: "blue.500",
						}}
						onClick={() => handleChangeContent(item.label)}
						isActive={state === item.label}
					>
						{item.label}
					</Button>
				))}
			</ButtonGroup>

			<VStack marginTop="auto">
				<Button
					w={"full"}
					leftIcon={
						<Icon
							as={FaSignOutAlt}
							color={"white"}
						/>
					}
					borderRadius={"none"}
					variant={"solid"}
					color={"white"}
					bgColor={"red.500"}
					border={"none"}
					justifyContent={"flex-start"}
					_hover={{ bgColor: "red.700" }}
					onClick={() => handleLogout()}
				>
					Sign Out
				</Button>
			</VStack>
		</Flex>
	);
}
