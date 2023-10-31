/* eslint-disable react/prop-types */
import {
	FormControl,
	FormErrorIcon,
	FormErrorMessage,
	FormLabel,
	Input,
	InputGroup,
	InputLeftAddon,
	VisuallyHidden,
} from "@chakra-ui/react";
import { ButtonPrimary } from "@/components/button";
import { ErrorTooltip } from "@/components/tooltip";
import { MarkdownEditor } from "@/components/markdown/markdown-editor";
import { RiFile2Fill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import {
	resetUpdateArticle,
	setUpdatedData,
} from "@/store/articles/updateArticleById";
import { categories } from "@/constant/categories";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const imageExtensions = ["image/jpg", "image/jpeg", "image/png"];

const schema = yup.object().shape({
	title: yup
		.string()
		.required("Title is required")
		.max(25, "Title must be less than 25 characters"),
	thumbnail: yup
		.mixed()
		.required("Thumbnail is required")
		.test(
			"type",
			"Thumbnail must be in image format .jpg, .jpeg, .png",
			(value) => {
				return value && imageExtensions.includes(value.type);
			}
		),
	categories: yup
		.array()
		.required("Categories is required")
		.max(3, "Categories must be less than 3"),
	content: yup
		.string()
		.required("Content is required")
		.min(100, "Content must be more than 100 characters"),
});

const formStyles = {
	border: "none",
	boxShadow: "none",
};

const inputStyles = {
	border: "none",
	boxShadow: "none",
	lineHeight: "1.5",
	padding: "30px 0",
	fontFamily: "sans-serif",
	letterSpacing: "1px",
};

export function EditForm({ initialData: updatedData, onSubmit }) {
	const {
		handleSubmit,
		reset,
		control,
		setValue,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const dispatch = useDispatch();
	const fileInputRef = useRef(null);

	const showFilePicker = () => {
		fileInputRef.current.click();
	};

	const handleFormChange = (data) => {
		dispatch(setUpdatedData(data));
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];

		if (file) {
			const imageURL = URL.createObjectURL(file);
			handleFormChange({ thumbnailUrl: imageURL, thumbnailName: file.name });
			setValue("thumbnail", file);
		}
	};

	useEffect(() => {
		setValue("title", updatedData.title);
		if (updatedData.thumbnailUrl) {
			fetch(updatedData.thumbnailUrl)
				.then((res) => res.blob())
				.then((blob) => {
					const file = new File([blob], updatedData.title, {
						type: blob.type,
					});
					setValue("thumbnail", file);
				});
		} else {
			setValue("thumbnail", null);
		}
		setValue("categories", updatedData.categories);
		setValue("content", updatedData.content);
	}, [updatedData, setValue]);

	const submitForm = (data) => {
		onSubmit(data);
		reset();
		dispatch(resetUpdateArticle());
	};

	return (
		<form
			onSubmit={handleSubmit(submitForm)}
			style={{
				display: "flex",
				flexDirection: "column",
				gap: "1.5rem",
			}}
		>
			<ErrorTooltip error={errors.title}>
				<FormControl
					id="title"
					isInvalid={errors.title}
					css={formStyles}
				>
					<VisuallyHidden>
						<FormLabel>Title</FormLabel>
					</VisuallyHidden>
					<Controller
						name="title"
						control={control}
						defaultValue={updatedData.title}
						render={({ field }) => (
							<Input
								value={field.value}
								placeholder="Title here..."
								css={inputStyles}
								fontSize={"48px"}
								fontWeight={"bold"}
								_placeholder={
									errors.title
										? { color: "red.300" }
										: { color: "blackAlpha.800" }
								}
								_focus={{
									...formStyles,
									"&::placeholder": {
										color: "blackAlpha.500",
									},
								}}
								_invalid={formStyles}
								onChange={(e) => {
									field.onChange(e);
									handleFormChange({ title: e.target.value });
								}}
							/>
						)}
					/>
					<FormErrorMessage>
						<FormErrorIcon />
						{errors.title && errors.title.message}
					</FormErrorMessage>
				</FormControl>
			</ErrorTooltip>

			<ErrorTooltip error={errors.thumbnail}>
				<FormControl
					id="thumbnail"
					isInvalid={errors.thumbnail}
					css={formStyles}
				>
					<VisuallyHidden>
						<FormLabel>Thumbnail</FormLabel>
					</VisuallyHidden>
					<Controller
						name="thumbnail"
						control={control}
						render={() => (
							<InputGroup
								cursor={"pointer"}
								onClick={showFilePicker}
							>
								<InputLeftAddon
									bgColor={errors.thumbnail ? "red.300" : "gray.300"}
									color={errors.thumbnail ? "white" : "blackAlpha.600"}
									border="none"
								>
									<RiFile2Fill />
								</InputLeftAddon>
								<Input
									readOnly
									type="text"
									cursor={"pointer"}
									fontSize={"18px"}
									fontWeight={"semibold"}
									height={"auto"}
									placeholder={
										updatedData.thumbnailName ||
										updatedData.thumbnailUrl ||
										"Upload your thumbnail..."
									}
									_placeholder={
										errors.thumbnail
											? { color: "red.300" }
											: { color: "blackAlpha.600" }
									}
									_focus={{
										borderColor: "blackAlpha.500",
									}}
								/>

								<Input
									type="file"
									accept=".jpg, .jpeg, .png"
									style={{ display: "none" }}
									ref={fileInputRef}
									onChange={(e) => handleImageChange(e)}
								/>
							</InputGroup>
						)}
					/>
					<FormErrorMessage>
						<FormErrorIcon />
						{errors.thumbnail && errors.thumbnail.message}
					</FormErrorMessage>
				</FormControl>
			</ErrorTooltip>

			<ErrorTooltip error={errors.categories}>
				<FormControl
					id="categories"
					isInvalid={errors.categories}
					css={formStyles}
				>
					<VisuallyHidden>
						<FormLabel>Categories</FormLabel>
					</VisuallyHidden>
					<Controller
						name="categories"
						control={control}
						defaultValue={updatedData.categories}
						render={({ field }) => (
							<Select
								ref={field.ref}
								value={field.value}
								options={categories}
								isMulti
								onChange={(values) => {
									field.onChange(values);
									if (values) {
										handleFormChange({ categories: values });
									}
								}}
								styles={{
									placeholder: (styles) => ({
										...styles,
										color: errors.categories
											? "#FC8181"
											: "RGBA(0, 0, 0, 0.64)",
										fontWeight: "600",
									}),
									menuList: (styles) => ({
										...styles,
										padding: "0",
									}),
								}}
								placeholder="Select categories..."
							/>
						)}
					/>
					<FormErrorMessage>
						<FormErrorIcon />
						{errors.categories && errors.categories.message}
					</FormErrorMessage>
				</FormControl>
			</ErrorTooltip>

			<ErrorTooltip error={errors.content}>
				<FormControl
					id="content"
					isInvalid={errors.content}
					css={formStyles}
				>
					<VisuallyHidden>
						<FormLabel>Content</FormLabel>
					</VisuallyHidden>
					<Controller
						name="content"
						control={control}
						defaultValue={updatedData.content}
						render={({ field }) => (
							<MarkdownEditor
								ref={field.ref}
								content={updatedData.content}
								onContentChange={(content) => {
									field.onChange(content);
									handleFormChange({ content });
								}}
								css={inputStyles}
								fontSize={"18px"}
								_placeholder={
									errors.content
										? { color: "red.300" }
										: { color: "blackAlpha.600" }
								}
								_focus={{
									...formStyles,
									"&::placeholder": {
										color: "blackAlpha.500",
									},
								}}
								_invalid={formStyles}
							/>
						)}
					/>
					<FormErrorMessage>
						<FormErrorIcon />
						{errors.content && errors.content.message}
					</FormErrorMessage>
				</FormControl>
			</ErrorTooltip>
			<ButtonPrimary
				size="sm"
				type="submit"
			>
				Edit Data
			</ButtonPrimary>
		</form>
	);
}
