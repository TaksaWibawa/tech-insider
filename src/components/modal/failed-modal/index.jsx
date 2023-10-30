/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	Button,
	ModalBody,
} from "@chakra-ui/react";

export function FailedModal({ title, description, isOpen, onClose }) {
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		if (isOpen) {
			setShowModal(true);
		}
	}, [isOpen]);

	return (
		<Modal
			isOpen={showModal}
			onClose={onClose}
			isCentered
			motionPreset="slideInBottom"
			colorScheme={"red"}
		>
			<ModalOverlay
				bg={"blackAlpha.600"}
				backdropFilter={"blur(2px)"}
			>
				<ModalContent>
					<ModalHeader
						fontSize="3xl"
						fontWeight="bold"
						textAlign={"center"}
					>
						{title}
					</ModalHeader>

					<ModalBody
						fontSize="lg"
						fontWeight="normal"
						textAlign={"center"}
					>
						{description}
					</ModalBody>

					<ModalFooter justifyContent="center">
						<Button
							colorScheme={"red"}
							onClick={onClose}
						>
							Close
						</Button>
					</ModalFooter>
				</ModalContent>
			</ModalOverlay>
		</Modal>
	);
}
