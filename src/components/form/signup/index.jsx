/* eslint-disable react/no-unescaped-entities */
import {
	Button,
	Checkbox,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Grid,
	HStack,
	Input,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { ButtonPrimary } from "../../button";

export function SignUpForm() {
	const {
		handleSubmit,
		register,
		reset,
		formState: { errors },
	} = useForm();

	function onSubmit(data) {
		console.log(data);
		reset();
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="flex flex-col gap-8 w-full"
		>
			<Grid
				templateColumns="repeat(2, 1fr)"
				gap={4}
			>
				<FormControl isInvalid={errors.firstName}>
					<FormLabel htmlFor="first-name">First Name</FormLabel>
					<Input
						type="text"
						id="first-name"
						placeholder="First Name"
						{...register("firstName", {
							required: "This field is required",
							minLength: {
								value: 2,
							},
						})}
					/>
					<FormErrorMessage>
						{errors.firstName && errors.firstName.message}
					</FormErrorMessage>
				</FormControl>

				<FormControl isInvalid={errors.lastName}>
					<FormLabel htmlFor="last-name">Last Name</FormLabel>
					<Input
						type="text"
						id="last-name"
						placeholder="Last Name"
						{...register("lastName", {
							required: "This field is required",
							minLength: {
								value: 2,
							},
						})}
					/>
					<FormErrorMessage>
						{errors.lastName && errors.lastName.message}
					</FormErrorMessage>
				</FormControl>
			</Grid>

			<FormControl isInvalid={errors.username}>
				<FormLabel htmlFor="username">Username</FormLabel>
				<Input
					type="text"
					id="username"
					placeholder="Username"
					{...register("username", {
						required: "This field is required",
						minLength: {
							value: 6,
						},
					})}
				/>
				<FormErrorMessage>
					{errors.username && errors.username.message}
				</FormErrorMessage>
			</FormControl>

			<FormControl isInvalid={errors.email}>
				<FormLabel htmlFor="email">Email</FormLabel>
				<Input
					type="email"
					id="email"
					placeholder="Email"
					{...register("email", {
						required: "This field is required",
						pattern: {
							value: /\S+@\S+\.\S+/,
							message: "Please enter a valid email",
						},
					})}
				/>
				<FormErrorMessage>
					{errors.email && errors.email.message}
				</FormErrorMessage>
			</FormControl>

			<FormControl isInvalid={errors.password}>
				<FormLabel htmlFor="password">Password</FormLabel>
				<Input
					type="password"
					id="password"
					placeholder="Password"
					{...register("password", {
						required: "This field is required",
						minLength: {
							value: 8,
						},
					})}
				/>
				<FormErrorMessage>
					{errors.password && errors.password.message}
				</FormErrorMessage>
			</FormControl>

			<FormControl isInvalid={errors.confirmPassword}>
				<FormLabel htmlFor="confirm-password">Confirm Password</FormLabel>
				<Input
					type="password"
					id="confirm-password"
					placeholder="Confirm Password"
					{...register("confirmPassword", {
						required: "This field is required",
						minLength: {
							value: 8,
							message: "Password must be at least 8 characters",
						},
					})}
				/>
				<FormErrorMessage>
					{errors.confirmPassword && errors.confirmPassword.message}
				</FormErrorMessage>
			</FormControl>

			<FormControl isInvalid={errors.terms}>
				<HStack spacing={4}>
					<Checkbox
						id="terms"
						{...register("terms", {
							required: "This field is required",
						})}
					/>
					<Button
						onClick={(e) => e.preventDefault()}
						as="a"
						color={errors.terms ? "red.500" : "blue.500"}
						variant="link"
						fontSize={{ base: "xs", lg: "md" }}
					>
						I agree to the terms and conditions
					</Button>
				</HStack>
				<FormErrorMessage>
					{errors.terms && errors.terms.message}
				</FormErrorMessage>
			</FormControl>

			<ButtonPrimary
				type="submit"
				w={"full"}
			>
				Sign Up
			</ButtonPrimary>
		</form>
	);
}
