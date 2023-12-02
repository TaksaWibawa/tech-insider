/* eslint-disable react/no-unescaped-entities */
import {
	Box,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Text,
} from "@chakra-ui/react";
import { APIAuth } from "@/apis/auth.api";
import { ButtonPrimary } from "@/components/button";
import {
	setAuthenticated,
	setUser,
	userStatus,
} from "@/store/users/manageUser";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function SignInForm() {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm();

	const [loginError, setLoginError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const isAuthenticated = useSelector(userStatus);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onSubmit = async ({ email, password }, e) => {
		e.preventDefault();
		try {
			setIsLoading(true);
			const user = await APIAuth.login({ email, password });
			dispatch(setAuthenticated());
			dispatch(setUser(user));
		} catch (error) {
			setLoginError("Failed to login. Please check your credentials.");
			throw new Error(error);
		} finally {
			if (isAuthenticated) {
				setIsLoading(false);
				navigate("/");
			}
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
					type="text"
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
							message: "Password must be at least 8 characters long",
						},
					})}
				/>
				<FormErrorMessage>
					{errors.password && errors.password.message}
				</FormErrorMessage>
			</FormControl>

			{loginError && (
				<Box>
					<Text
						color="red.500"
						textAlign={"center"}
					>
						{loginError}
					</Text>
				</Box>
			)}

			<ButtonPrimary
				type="submit"
				w={"full"}
				isLoading={isLoading}
			>
				Sign In
			</ButtonPrimary>
		</form>
	);
}
