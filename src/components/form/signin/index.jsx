/* eslint-disable react/no-unescaped-entities */
import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
} from "@chakra-ui/react";
import { APIAuth } from "../../../apis/auth.api";
import { ButtonPrimary } from "../../button";
import { setAuthenticated, setUser } from "../../../store/user";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

export function SignInForm() {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm();

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onSubmit = async (data, e) => {
		e.preventDefault();
		try {
			const { email, password } = data;
			const user = await APIAuth.login({ email, password });
			dispatch(setAuthenticated());
			dispatch(setUser(user));
			navigate("/");
		} catch (error) {
			throw new Error(error);
		}
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="flex flex-col gap-8 w-full"
		>
			<FormControl isInvalid={errors.username}>
				<FormLabel htmlFor="username">Username</FormLabel>
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
							message: "Password must be at least 8 characters long",
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
