/* eslint-disable react/prop-types */
import { Button } from "@chakra-ui/button";
import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
} from "@chakra-ui/modal";

export function DeleteModal({ isOpen, onClose, onDelete }) {
	const handleDelete = () => {
		onDelete();
		onClose();
	};

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			isCentered
		>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Delete Article</ModalHeader>
				<ModalCloseButton />
				<ModalBody>Are you sure want to delete this article?</ModalBody>

				<ModalFooter>
					<Button
						colorScheme="blue"
						mr={3}
						onClick={onClose}
					>
						Cancel
					</Button>
					<Button
						colorScheme="red"
						onClick={() => handleDelete()}
					>
						Delete
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
