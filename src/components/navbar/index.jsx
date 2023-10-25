import {
	Avatar,
	Button,
	ButtonGroup,
	Container,
	Divider,
	Flex,
	Heading,
	HStack,
	Icon,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
	useDisclosure,
} from "@chakra-ui/react";
import { authService } from "../../config/auth";
import { BaseImage } from "../icons";
import { ButtonBasic, ButtonOutlinePrimary, ButtonPrimary } from "../button";
import {
	clearUser,
	currentUser,
	userStatus,
} from "../../store/user/manageUser";
import { menuItems } from "../../constant/menuItems";
import { MobileNavbar } from "./mobile";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { RiMenu2Line } from "react-icons/ri";
import { SearchBar } from "../search-bar";
import { useDispatch, useSelector } from "react-redux";

export function Navbar() {
	const dispatch = useDispatch();
	const location = useLocation();
	const navigate = useNavigate();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const isAuthenticated = useSelector(userStatus);
	const user = useSelector(currentUser);

	const isPathActive = (path) => {
		return location.pathname === path;
	};

	const handleLogout = async () => {
		try {
			await authService.logOut();
			dispatch(clearUser());
			navigate("/");
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<Container
			as="nav"
			bg={"white"}
			borderBottom={"1px solid #E0E0E0"}
			maxW={"100%"}
			pos={"sticky"}
			px={{ base: 4, lg: 12 }}
			py={{ base: 5, lg: 7 }}
			top={0}
			zIndex={1000}
		>
			<MobileNavbar
				isOpen={isOpen}
				onClose={onClose}
				isAuthenticated={isAuthenticated}
				currentUser={user}
				onLogout={handleLogout}
			/>

			<HStack spacing={12}>
				<Flex
					align={"center"}
					flex={{ base: "1 1 100%", lg: "1 1 50%" }}
					gap={20}
					justifyContent={{ base: "space-between", lg: "flex-start" }}
					px={{ base: 2, md: 0 }}
				>
					<Button
						variant={"ghost"}
						display={{ base: "block", md: "none" }}
						w={"2rem"}
						paddingInline={0}
					>
						<Icon
							boxSize={6}
							color={"gray.800"}
							pos={"relative"}
							top={"0.20rem"}
							left={"0.20rem"}
							onClick={onOpen}
						>
							<RiMenu2Line />
						</Icon>
					</Button>
					<NavLink to="/">
						<BaseImage
							w={{ base: "100px", md: "110px", lg: "140px" }}
							h={"auto"}
						/>
					</NavLink>
					<SearchBar display={{ base: "none", md: "block" }} />
				</Flex>

				<Flex
					justifyContent={"space-around"}
					align={"center"}
					display={{ base: "none", md: "flex" }}
				>
					<ButtonGroup gap={3}>
						<NavLink to="/">
							<ButtonBasic
								isActive={isPathActive("/") ? true : false}
								_active={{
									color: "white",
									bgColor: "blue.500",
								}}
							>
								Home
							</ButtonBasic>
						</NavLink>

						{!isAuthenticated ? (
							<>
								<NavLink to="/login">
									<ButtonOutlinePrimary>Sign In</ButtonOutlinePrimary>
								</NavLink>
								<NavLink to="/register">
									<ButtonPrimary>Sign Up</ButtonPrimary>
								</NavLink>
							</>
						) : (
							<>
								<NavLink to="/write">
									<ButtonBasic
										isActive={isPathActive("/write") ? true : false}
										_active={{
											color: "white",
											bgColor: "blue.500",
										}}
									>
										Write
									</ButtonBasic>
								</NavLink>

								<Divider
									orientation="vertical"
									bg={"transparent"}
									mx={3}
								/>

								<Menu isLazy>
									<MenuButton
										as={Button}
										px={4}
										variant="unstyled"
										padding={0}
									>
										<Avatar
											size={"md"}
											position={"absolute"}
											src={user?.photoURL || "bit.ly/dan-abramov"}
											top={-1}
											left={0}
										/>
									</MenuButton>
									<MenuList
										fontSize={"md"}
										fontWeight={"semibold"}
										color={"gray.500"}
										borderRadius={"lg"}
									>
										<Heading
											fontSize={"xl"}
											fontWeight={"bold"}
											letterSpacing={"wide"}
											color={"gray.700"}
											p={3}
										>
											{user?.displayName || "Guest"}

											<Text
												fontSize={"sm"}
												fontWeight={"normal"}
												color={"gray.500"}
												mt={1}
											>
												{user?.email || ""}
											</Text>
										</Heading>

										{menuItems.map((item) => (
											<NavLink
												key={item.path}
												to={item.path}
												onClick={
													item.label === "Sign Out" ? handleLogout : null
												}
											>
												<MenuItem _hover={item._hover}>{item.label}</MenuItem>
											</NavLink>
										))}
									</MenuList>
								</Menu>
							</>
						)}
					</ButtonGroup>
				</Flex>
			</HStack>
		</Container>
	);
}
