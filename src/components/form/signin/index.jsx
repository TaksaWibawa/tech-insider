/* eslint-disable react/no-unescaped-entities */
import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { ButtonPrimary } from "../../button";

export function SignInForm() {
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

			<ButtonPrimary
				type="submit"
				w={"full"}
			>
				Sign In
			</ButtonPrimary>
		</form>
	);
}
