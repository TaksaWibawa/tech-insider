import { useDisclosure } from "@chakra-ui/react";

export function useModal() {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const showModal = () => {
		onOpen();
	};

	const hideModal = () => {
		onClose();
	};

	const toggleModal = () => {
		if (isOpen) {
			onClose();
		} else {
			onOpen();
		}
	};

	return {
		isModalOpen: isOpen,
		showModal,
		hideModal,
		toggleModal,
	};
}
