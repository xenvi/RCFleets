import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
    Heading,
    Text,
    Checkbox,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Input,
    Image,
    Flex,
    Box,
    useDisclosure,
    useToast,
} from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import {
    fleetPostFields, formatFieldLabel, formatFieldLabelUnit,
} from '../../util/schema';
import CSRFToken from '../../util/csrfToken';
import { createFleetPost, resetStatus } from '../../redux/actions/fleet';
import ProfileAvatar from '../Avatar';
import SpeedbumpModal from './SpeedbumpModal';
import Toast from '../Toast';

const CreateModal = ({
    onClose, isOpen,
}) => {
    const loading = useSelector((state) => state.fleet.loading);
    const statusSuccess = useSelector((state) => state.fleet.statusSuccess);
    const error = useSelector((state) => state.fleet.error);
    const profile = useSelector((state) => state.auth.profile);
    const user = useSelector((state) => state.auth.user);

    const dispatch = useDispatch();

    const toast = useToast();
    const { isOpen: isOpenSpeedbump, onOpen: onOpenSpeedbump, onClose: onCloseSpeedbump } = useDisclosure();
    const [values, setValues] = useState({});
    const [thumbnailFile, setThumbnailFile] = useState([]);

    useEffect(() => {
        // init form fields to state
        setValues((currentValues) => {
            const newValues = fleetPostFields.reduce((obj, field) => {
                let value = '';
                switch (field.type) {
                case 'decimal':
                    value = 0.0;
                    break;
                case 'number':
                    value = 0;
                    break;
                case 'checkbox':
                    value = false;
                    break;
                default:
                    value = '';
                }

                if (field.info) {
                    obj.info = { ...obj.info, [field.label]: value };
                } else {
                    obj[field.label] = value;
                }

                return obj;
            }, {});

            return { ...newValues, ...currentValues };
        });
    }, []);

    useEffect(() => {
        if (user) {
            const userId = user.id;

            setValues((currentValues) => {
                currentValues.user = userId;
                return currentValues;
            });
        }
    }, [user]);

    useEffect(() => {
        if (statusSuccess) {
            toast({
                position: 'bottom-left',
                render: () => (<Toast color="light" bgColor="green.400" text="Post created successfully." />),
                duration: 4000,
            });

            onClose();
            dispatch(resetStatus());
        }
    }, [statusSuccess]);

    useEffect(() => {
        if (error) {
            toast({
                position: 'bottom-left',
                render: () => (<Toast color="light" bgColor="brand.500" text="Oops! Something went wrong." />),
                duration: 5000,
            });
        }
    }, [error]);

    // revokes data uri to avoid memory leak
    useEffect(() => () => {
        URL.revokeObjectURL(thumbnailFile.preview);
    }, [thumbnailFile]);

    const handleChange = (label, value) => {
        setValues((currentValues) => {
            if (label in currentValues?.info) {
                currentValues.info[label] = value;
            } else {
                currentValues[label] = value;
            }
            return currentValues;
        });
    };

    const onDrop = useCallback((acceptedFiles) => {
        const [file] = acceptedFiles;

        setThumbnailFile(Object.assign(file, {
            preview: URL.createObjectURL(file),
        }));
        setValues((currentValues) => {
            currentValues.thumbnail = file;
            return currentValues;
        });
    }, []);

    const {
        acceptedFiles, getRootProps, getInputProps, isDragActive,
    } = useDropzone({
        onDrop,
        accept: 'image/*',
        maxFiles: 1,
    });

    const renderDynamicInput = (field) => {
        switch (field.type) {
        case 'number':
            return (
                <NumberInput size="sm" step={1} min={0}>
                    <NumberInputField onChange={(e) => handleChange(field.label, Number(e.target.value))} />
                    <NumberInputStepper>
                        <NumberIncrementStepper onClick={() => handleChange(field.label, values.info[field.label] + 1)} />
                        <NumberDecrementStepper onClick={() => handleChange(field.label, values.info[field.label] - 1)} />
                    </NumberInputStepper>
                </NumberInput>
            );
        case 'decimal':
            return (
                <NumberInput size="sm" precision={1} step={1} min={0}>
                    <NumberInputField onChange={(e) => handleChange(field.label, Number(e.target.value))} />
                    <NumberInputStepper>
                        <NumberIncrementStepper onClick={() => handleChange(field.label, values.info[field.label] + 1)} />
                        <NumberDecrementStepper onClick={() => handleChange(field.label, values.info[field.label] - 1)} />
                    </NumberInputStepper>
                </NumberInput>
            );
        case 'checkbox':
            return (
                <Checkbox
                  colorScheme="brand"
                  size="lg"
                  value={values[field.label]}
                  onChange={(e) => handleChange(field.label, e.target.checked)}
                />
            );
        case 'file':
            return (
                <Box>
                    <Box {...getRootProps()} cursor="pointer" p="1rem" textAlign="center" borderWidth="2px" borderStyle="dashed" borderColor="slategray.50" backgroundColor="rgba(255,255,255,0.1)" borderRadius="3px">
                        <Input {...getInputProps()} />
                        {
                            isDragActive
                            ? <Text>Drop file here ...</Text>
                            : <Text>Drag and drop or click to add file.</Text>
                        }
                    </Box>
                    <Box mt="0.5rem">
                        <Heading as="h6" size="xs">Uploaded file:</Heading>
                        { acceptedFiles.map((file) => (
                            <Flex alignItems="center" key={file.path} mt="0.5rem">
                                <Image
                                  boxSize="75px"
                                  objectFit="cover"
                                  src={file.preview}
                                  alt="file.path"
                                />
                                <Flex direction="column" justifyContent="center" ml="0.5rem">
                                    <Text fontSize="xs">
                                        {file.path}
                                    </Text>
                                    <Text fontSize="xs">
                                        {`${file.size} bytes`}
                                    </Text>
                                </Flex>
                            </Flex>
                        ))}
                    </Box>
                </Box>
            );
        default:
            return <Input size="sm" type={field.type} onChange={(e) => handleChange(field.label, e.target.value)} />;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
            if (typeof (value) === 'object' && !(value instanceof File)) {
                Object.entries(values[key]).forEach(([subKey, subValue]) => {
                    formData.append(`${key}.${subKey}`, subValue);
                });
            } else {
                formData.append(key, value);
            }
        });

        dispatch(createFleetPost(formData, user.id));
    };

    return (
        <>
            <SpeedbumpModal
              confirmAction={onClose}
              headerText="Are you sure you want to exit?"
              subText="Changes will not be saved."
              isOpen={isOpenSpeedbump}
              onClose={onCloseSpeedbump}
            />

            <Modal onClose={onClose} isOpen={isOpen} size="xl" autoFocus scrollBehavior="inside" closeOnOverlayClick={false} onOverlayClick={onOpenSpeedbump}>
                <ModalOverlay
                  backdropFilter="blur(10px)"
                />
                <ModalContent>
                    <ModalHeader>Create Fleet Post</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex alignItems="center" mb="1rem">
                            <ProfileAvatar name={user?.handle} src={profile?.profile?.avatar} size="sm" />
                            {user?.handle}
                        </Flex>
                        <form onSubmit={handleSubmit}>
                            <CSRFToken />
                            {fleetPostFields.map((field) => {
                            const label = formatFieldLabel(field.label);
                            const unit = formatFieldLabelUnit(field.label);
                            return (
                                <Grid rowGap={1} columnGap={2} templateColumns={['repeat(2, 1fr)', 'repeat(4, 1fr)']} paddingTop="1rem">
                                    <GridItem colSpan={2} justifySelf="start">
                                        <Text fontWeight="bold" fontSize="0.9rem">
                                            {`${label} ${unit}`}
                                        </Text>
                                    </GridItem>
                                    <GridItem colSpan={2} justifySelf="start" width="100%">
                                        { renderDynamicInput(field) }
                                    </GridItem>
                                </Grid>
                            );
                        })}
                            <ModalFooter>
                                <Button isLoading={loading} type="submit" size="md" variant="brand">Share</Button>
                            </ModalFooter>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

CreateModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default CreateModal;
