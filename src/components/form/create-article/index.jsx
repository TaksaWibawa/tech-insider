/* eslint-disable react/prop-types */
import {
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	InputLeftAddon,
	VisuallyHidden,
} from "@chakra-ui/react";
import { ButtonPrimary } from "../../button";
import { ErrorTooltip } from "../../tooltip";
import { MarkdownEditor } from "../../markdown/markdown-editor";
import { useForm, Controller } from "react-hook-form";
import { useRef } from "react";
import Select from "react-select";
import { RiFile2Fill } from "react-icons/ri";

const availableCategories = [
	{ value: "Computer", label: "Computer" },
	{ value: "Programming", label: "Programming" },
	{ value: "Science", label: "Science" },
	{ value: "Technology", label: "Technology" },
];

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

export function ArticleForm({ formData, onFormChange, onSubmit }) {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: "onSubmit",
	});

	const fileInputRef = useRef(null);

	const handleImageChange = (e) => {
		e.preventDefault();
		const file = e.target.files[0];

		if (file) {
			const imageURL = URL.createObjectURL(file);
			onFormChange({ thumbnail: imageURL, thumbnailName: file });
		}
	};

	const showFilePicker = () => {
		fileInputRef.current.click();
	};

	const handleCategoryChange = (values) => {
		if (values.length > 3) {
			// add error handling in the ui later on
			console.log("Categories must be less than 3");
		} else {
			onFormChange({ selectedCategories: values });
		}
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
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
						defaultValue={formData.title}
						rules={{ required: "Title is required" }}
						render={({ field }) => (
							<Input
								placeholder="Title here..."
								onInput={(e) => onFormChange({ title: e.target.value })}
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
								{...field}
							/>
						)}
					/>
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
						defaultValue={formData.thumbnail}
						rules={{
							required: "Thumbnail is required",
						}}
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
									placeholder="Upload your thumbnail here..."
									_placeholder={
										errors.thumbnail
											? { color: "red.300" }
											: { color: "blackAlpha.600" }
									}
									_focus={{
										borderColor: "blackAlpha.500",
									}}
								/>
								<input
									type="file"
									accept="image/*"
									style={{ display: "none" }}
									ref={fileInputRef}
									onChange={handleImageChange}
								/>
							</InputGroup>
						)}
					/>
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
						defaultValue={formData.selectedCategories}
						rules={{
							required: "Categories is required",
							validate: (value) =>
								value.length <= 3 || "Categories must be less than 3",
						}}
						render={({ field }) => (
							<Select
								ref={field.ref}
								value={field.value}
								options={availableCategories}
								isMulti
								onChange={(values) => {
									if (values.length <= 3) {
										field.onChange(values);
									}
									handleCategoryChange(values);
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
						defaultValue={formData.content}
						rules={{ required: "Content is required" }}
						render={({ field }) => (
							<MarkdownEditor
								ref={field.ref}
								value={formData.content}
								content={formData.content}
								onContentChange={(content) => {
									field.onChange(content);
									onFormChange({ content });
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
				</FormControl>
			</ErrorTooltip>

			<ButtonPrimary
				size="sm"
				type="submit"
			>
				Publish
			</ButtonPrimary>
		</form>
	);
}
