/* eslint-disable react/no-unescaped-entities */
import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
} from "@chakra-ui/react";
import { APIAuth } from "@/apis/auth.api";
import { ButtonPrimary } from "@/components/button";
import { setAuthenticated, setUser } from "@/store/users/manageUser";
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

	const onSubmit = async ({ email, password }, e) => {
		e.preventDefault();
		try {
			const user = await APIAuth.login({ email, password });
			dispatch(setAuthenticated());
			dispatch(setUser(user));
			return navigate("/");
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

			<ButtonPrimary
				type="submit"
				w={"full"}
			>
				Sign In
			</ButtonPrimary>
		</form>
	);
}
