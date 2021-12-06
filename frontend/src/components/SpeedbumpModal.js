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
    Flex,
} from '@chakra-ui/react';

const SpeedbumpModal = ({
    confirmAction, headerText, confirmText, cancelText, isOpen, onClose,
}) => (
    <Modal onClose={onClose} isOpen={isOpen} size="xl" autoFocus isCentered scrollBehavior="outside">
        <ModalOverlay />
        <ModalContent>
            <ModalHeader textAlign="center" fontSize="1.7rem" mt="1rem">{headerText}</ModalHeader>
            <ModalCloseButton />
            <ModalBody p="1rem 1rem 2rem">
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
};

SpeedbumpModal.propTypes = {
    cancelText: PropTypes.string,
    confirmAction: PropTypes.func.isRequired,
    confirmText: PropTypes.string,
    headerText: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default SpeedbumpModal;
