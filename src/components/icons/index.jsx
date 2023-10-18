import { Image } from "@chakra-ui/react";

export function BaseLogo({ ...props }) {
	return (
		<Image
			src="src/assets/logo.png"
			alt="Tech Insider"
			{...props}
		/>
	);
}

export function LogoWhite({ ...props }) {
	return (
		<Image
			src="src/assets/logo-white.png"
			alt="Tech Insider"
			{...props}
		/>
	);
}

export function SignUpIcon({ ...props }) {
	return (
		<Image
			src="src/assets/signup-illustration.png"
			alt="Sign Up"
			{...props}
		/>
	);
}

export function SignInIcon({ ...props }) {
	return (
		<Image
			src="src/assets/logo-gray.svg"
			alt="Sign In"
			{...props}
		/>
	);
}
