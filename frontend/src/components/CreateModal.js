import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Grid,
    GridItem,
    Text,
    Checkbox,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Input,
    Flex,
    useDisclosure,
} from '@chakra-ui/react';
import {
    PlusSquareIcon,
} from '@chakra-ui/icons';
import { fleetPostFields, formatFieldLabel } from '../util/schema';
import ProfileAvatar from './Avatar';

const CreateModal = ({ profile, user }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    // TODO create warningmodal to display on modal onOverlayClick

    const renderDynamicInput = (type) => {
        switch (type) {
        case 'number':
            return (
                <NumberInput size="sm" step={1} min={0}>
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            );
        case 'decimal':
            return (
                <NumberInput size="sm" precision={1} step={1} min={0}>
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            );
        case 'checkbox':
            return (
                <Checkbox
                  colorScheme="brand"
                  size="lg"
                />
            );
        default:
            return <Input size="sm" type={type} />;
        }
    };

    return (
        <>
            <Button variant="ghost" onClick={onOpen}>
                <PlusSquareIcon boxSize={5} />
            </Button>

            <Modal onClose={onClose} isOpen={isOpen} size="xl" autoFocus isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create Fleet Post</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex alignItems="center" mb="1rem">
                            <ProfileAvatar user={user} profile={profile} size="sm" />
                            {user?.handle}
                        </Flex>
                        {fleetPostFields.map((field) => {
                            const label = formatFieldLabel(field.label);
                            return (
                                <Grid rowGap={1} columnGap={2} templateColumns={['repeat(2, 1fr)', 'repeat(4, 1fr)']} paddingTop="1rem">
                                    <GridItem colSpan={2} justifySelf="start">
                                        <Text fontWeight="bold" fontSize="0.9rem">
                                            {label}
                                        </Text>
                                    </GridItem>
                                    <GridItem colSpan={2} justifySelf="start" width="100%">
                                        { renderDynamicInput(field.type) }
                                    </GridItem>
                                </Grid>
                            );
                        })}
                    </ModalBody>
                    <ModalFooter>
                        <Button size="sm" variant="brand" onClick={onClose}>Share</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

const mapStateToProps = (state) => ({
    profile: state.auth.profile,
    user: state.auth.user,
});

CreateModal.propTypes = {
    profile: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, null)(CreateModal);
