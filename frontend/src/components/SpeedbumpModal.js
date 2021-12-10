import React from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Text,
    Flex,
} from '@chakra-ui/react';

const SpeedbumpModal = ({
    confirmAction, headerText, subText, confirmText, cancelText, isOpen, onClose,
}) => (
    <Modal onClose={onClose} isOpen={isOpen} size="xl" autoFocus isCentered scrollBehavior="outside">
        <ModalOverlay />
        <ModalContent>
            <ModalHeader textAlign="center" fontSize="2rem" mt="1rem" pb="0.5rem">{headerText}</ModalHeader>
            <ModalCloseButton />
            <ModalBody p="0 1rem 2rem">
                <Text fontSize="lg" textAlign="center" mb="1.5rem">{subText}</Text>
                <Flex alignItems="center" justifyContent="center">
                    <Button onClick={() => { onClose(); }}>
                        {cancelText}
                    </Button>
                    <Button onClick={() => { confirmAction(); onClose(); }} variant="brand" ml="1rem">
                        {confirmText}
                    </Button>
                </Flex>
            </ModalBody>
        </ModalContent>
    </Modal>
);
SpeedbumpModal.defaultProps = {
    confirmText: 'Yes',
    cancelText: 'No',
    subText: '',
};

SpeedbumpModal.propTypes = {
    cancelText: PropTypes.string,
    confirmAction: PropTypes.func.isRequired,
    confirmText: PropTypes.string,
    headerText: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    subText: PropTypes.string,
};

export default SpeedbumpModal;
