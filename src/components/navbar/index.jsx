import {
	Avatar,
	Button,
	ButtonGroup,
	Container,
	Flex,
	HStack,
	Icon,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	useDisclosure,
} from "@chakra-ui/react";
import { authService } from "../../config/auth";
import { BaseImage } from "../icons";
import { ButtonBasic, ButtonOutlinePrimary, ButtonPrimary } from "../button";
import { clearUser, selectUser } from "../../store/user";
import { menuItems } from "../../constant/menuItems";
import { MobileNavbar } from "./mobile";
import { NavLink, useNavigate } from "react-router-dom";
import { RiMenu2Line, RiArrowDropDownLine } from "react-icons/ri";
import { SearchBar } from "../search-bar";
import { useDispatch, useSelector } from "react-redux";

export function Navbar() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { isAuthenticated } = useSelector(selectUser);
	const dispatch = useDispatch();
	const navigate = useNavigate();

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
			zIndex={1}
		>
			<MobileNavbar
				isOpen={isOpen}
				onClose={onClose}
				isAuthenticated={isAuthenticated}
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
					<BaseImage
						w={{ base: "100px", md: "110px", lg: "140px" }}
						h={"auto"}
					/>
					<SearchBar display={{ base: "none", md: "block" }} />
				</Flex>

				<Flex
					justifyContent={"space-around"}
					align={"center"}
					display={{ base: "none", md: "flex" }}
				>
					<ButtonGroup gap={2}>
						<NavLink to="/">
							<ButtonBasic>Home</ButtonBasic>
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
									<ButtonBasic>Write</ButtonBasic>
								</NavLink>
								<Menu>
									<MenuButton
										variant="unstyled"
										px={4}
									>
										<Avatar
											size={"sm"}
											src="https://bit.ly/dan-abramov"
										/>
										<Icon
											boxSize={7}
											pos={"relative"}
											top={"0.55rem"}
											left={"0rem"}
										>
											<RiArrowDropDownLine />
										</Icon>
									</MenuButton>
									<MenuList>
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
