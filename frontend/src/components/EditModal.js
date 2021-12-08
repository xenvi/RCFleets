import React, { useState, useEffect, useCallback } from 'react';
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
    Progress,
    Box,
    Editable,
    EditableInput,
    EditablePreview,
    useDisclosure,
} from '@chakra-ui/react';
import {
    PlusSquareIcon,
} from '@chakra-ui/icons';
import { useDropzone } from 'react-dropzone';
import {
    fleetPostFields, formatFieldLabel, formatFieldLabelUnit,
} from '../util/schema';
import CSRFToken from '../util/csrfToken';
import { updateFleetPost, resetStatus } from '../redux/actions/fleet';
import ProfileAvatar from './Avatar';
import SpeedbumpModal from './SpeedbumpModal';

const EditModal = ({
    profile, user, updateFleetPost, loading, statusSuccess, resetStatus, vehicleData, onClose, isOpen,
}) => {
    const { isOpen: isOpenSpeedbump, onOpen: onOpenSpeedbump, onClose: onCloseSpeedbump } = useDisclosure();
    const [values, setValues] = useState({});
    const [thumbnailFile, setThumbnailFile] = useState([]);

    console.log('values', values);

    useEffect(() => {
        // init vehicleData to state
        setValues((currentValues) => {
            const excludeValues = ['id', 'created_at', 'handle', 'updated_at', 'user'];
            const newValues = Object.entries(vehicleData).reduce((obj, [key, value]) => {
                const isExcludedValue = excludeValues.reduce((a, c) => a + key.includes(c), 0) === 1;
                if (!isExcludedValue) {
                    if (key.info) {
                        obj.info = { ...obj.info, [key]: value };
                    } else {
                        obj[key] = value;
                    }
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
            onClose();
            resetStatus();
        }
    }, [statusSuccess]);

    // revokes data uri to avoid memory leak
    useEffect(() => () => {
        URL.revokeObjectURL(thumbnailFile.preview);
    }, [thumbnailFile]);

    const handleChange = (label, value) => {
        setValues((currentValues) => {
            if (label in currentValues.info) {
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
        const getInputValue = () => {
            if (field.label in values.info) {
                return values.info[field.label];
            }
            return values[field.label];
        };

        switch (field.type) {
        case 'number':
            return (
                <NumberInput defaultValue={values.info[field.label]} size="sm" step={1} min={0}>
                    <NumberInputField onChange={(e) => handleChange(field.label, Number(e.target.value))} />
                    <NumberInputStepper>
                        <NumberIncrementStepper onClick={() => handleChange(field.label, values.info[field.label] + 1)} />
                        <NumberDecrementStepper onClick={() => handleChange(field.label, values.info[field.label] - 1)} />
                    </NumberInputStepper>
                </NumberInput>
            );
        case 'decimal':
            return (
                <NumberInput defaultValue={values.info[field.label]} size="sm" precision={1} step={1} min={0}>
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
                        {
                            values.thumbnail && acceptedFiles.length === 0
                                ? (
                                    <Flex alignItems="center" mt="0.5rem">
                                        <Image
                                          boxSize="75px"
                                          objectFit="cover"
                                          src={values.thumbnail}
                                          alt="file.path"
                                        />
                                    </Flex>
                                    )
                            : acceptedFiles.map((file) => (
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
                                ))
                        }
                    </Box>
                </Box>
            );
        default:
            return <Input defaultValue={getInputValue()} size="sm" type={field.type} onChange={(e) => handleChange(field.label, e.target.value)} />;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('submit values', values);

        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
            if (Object(value) === value) {
                Object.entries(values[key]).forEach(([subKey, subValue]) => {
                    formData.append(`${key}.${subKey}`, subValue);
                });
            } else if (key !== 'thumbnail' && value !== null) {
                formData.append(key, value);
            }
        });

        updateFleetPost(formData, vehicleData.id, user.id);
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

            <Modal onClose={onClose} isOpen={isOpen} size="xl" autoFocus isCentered scrollBehavior="outside" closeOnOverlayClick={false} onOverlayClick={onOpenSpeedbump}>
                <ModalOverlay />
                <ModalContent>
                    { loading && <Progress size="xs" isIndeterminate colorScheme="brand" /> }
                    <ModalHeader>Edit Fleet Post</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex alignItems="center" mb="1rem">
                            <ProfileAvatar user={user} profile={profile} size="sm" />
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
                                            { values.info && renderDynamicInput(field) }
                                        </GridItem>
                                    </Grid>
                                );
                            })}
                            <ModalFooter>
                                <Button disabled={loading} type="submit" size="sm" variant="brand">Save Changes</Button>
                            </ModalFooter>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

const mapStateToProps = (state) => ({
    statusSuccess: state.fleet.statusSuccess,
    loading: state.fleet.loading,
    profile: state.auth.profile,
    user: state.auth.user,
});

EditModal.propTypes = {
    updateFleetPost: PropTypes.func.isRequired,
    statusSuccess: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    profile: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    vehicleData: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { updateFleetPost, resetStatus })(EditModal);
