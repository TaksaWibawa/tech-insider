/* eslint-disable react/no-unescaped-entities */
import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
} from "@chakra-ui/react";
import { ButtonPrimary } from "../../button";
import { APIAuth } from "../../../apis/auth.api";
import { useForm } from "react-hook-form";

export function SignInForm() {
	const {
		handleSubmit,
		register,
		reset,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data, e) => {
		e.preventDefault();
		try {
			const { email, password } = data;
			console.log(email, password);
			await APIAuth.login({ email, password });
			reset();
			window.location.href = "/";
		} catch (error) {
			throw new Error(error);
		}
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="flex flex-col gap-8 w-full"
		>
			<FormControl isInvalid={errors.email}>
				<FormLabel htmlFor="email">Email</FormLabel>
				<Input
					type="email"
					id="email"
					placeholder="Email"
					{...register("email", {
						required: "This field is required",
						minLength: {
							value: 6,
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

			<ButtonPrimary
				type="submit"
				w={"full"}
			>
				Sign In
			</ButtonPrimary>
		</form>
	);
}
