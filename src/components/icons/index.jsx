import { Image } from "@chakra-ui/react";
import Hero from "../../assets/hero-illustration.png";
import Logo from "../../assets/logo.png";
import LogoWhite from "../../assets/logo-white.png";
import SignIn from "../../assets/signin-illustration.png";
import SignUp from "../../assets/signup-illustration.png";

export function BaseImage({ ...props }) {
	return (
		<Image
			src={Logo}
			alt="Tech Insider"
			{...props}
		/>
	);
}

export function WhiteImage({ ...props }) {
	return (
		<Image
			src={LogoWhite}
			alt="Tech Insider"
			{...props}
		/>
	);
}

export function SignUpImage({ ...props }) {
	return (
		<Image
			src={SignUp}
			alt="Sign Up"
			loading="lazy"
			{...props}
		/>
	);
}

export function SignInImage({ ...props }) {
	return (
		<Image
			src={SignIn}
			alt="Sign In"
			loading="lazy"
			{...props}
		/>
	);
}

export function HeroImage({ ...props }) {
	return (
		<Image
			src={Hero}
			alt="Hero Image"
			loading="lazy"
			{...props}
		/>
	);
}
