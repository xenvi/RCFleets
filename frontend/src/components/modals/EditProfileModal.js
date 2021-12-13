import React, {
    useState, useEffect, useCallback,
} from 'react';
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
    Stack,
    Heading,
    Text,
    Textarea,
    Input,
    Flex,
    Progress,
    useDisclosure,
} from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import {
    profileFields, formatFieldLabel,
} from '../../util/schema';
import CSRFToken from '../../util/csrfToken';
import { updateProfile, resetStatus } from '../../redux/actions/auth';
import ProfileAvatar from '../Avatar';
import SpeedbumpModal from './SpeedbumpModal';

const EditProfileModal = ({
    user, updateProfile, loading, statusSuccess, resetStatus, profileData, onClose, isOpen,
}) => {
    const { isOpen: isOpenSpeedbump, onOpen: onOpenSpeedbump, onClose: onCloseSpeedbump } = useDisclosure();
    const [values, setValues] = useState({});
    const [avatarFile, setAvatarFile] = useState([]);

    useEffect(() => {
        // init profileData to state
        if (profileData) {
            setValues((currentValues) => {
                const excludeValues = ['id', 'created_at', 'updated_at'];
                const newValues = Object.entries(profileData).reduce((obj, [key, value]) => {
                    const isExcludedValue = excludeValues.reduce((a, c) => a + key.includes(c), 0) === 1;
                    if (!isExcludedValue) {
                        if (key.profile && key !== 'avatar') {
                            obj.profile = { ...obj.profile, [key]: value };
                        } else {
                            obj[key] = value;
                        }
                    }

                    return obj;
                }, {});

                return { ...newValues, ...currentValues };
            });
        }
    }, [profileData]);

    useEffect(() => {
        if (statusSuccess) {
            onClose();
            resetStatus();
        }
    }, [statusSuccess]);

    // revokes data uri to avoid memory leak
    useEffect(() => () => {
        URL.revokeObjectURL(avatarFile.preview);
    }, [avatarFile]);

    const handleChange = (label, value) => {
        setValues((currentValues) => {
            if (label in currentValues.profile) {
                currentValues.profile[label] = value;
            } else {
                currentValues[label] = value;
            }
            return currentValues;
        });
    };

    const onDrop = useCallback((acceptedFiles) => {
        const [file] = acceptedFiles;

        setAvatarFile(Object.assign(file, {
            preview: URL.createObjectURL(file),
        }));
        setValues((currentValues) => {
            currentValues.profile.avatar = file;
            return currentValues;
        });
    }, []);

    const {
        acceptedFiles, getInputProps, open,
    } = useDropzone({
        onDrop,
        accept: 'image/*',
        maxFiles: 1,
    });

    const renderDynamicInput = (field) => {
        const getInputValue = () => {
            if (field.label in values.profile) {
                return values.profile[field.label];
            }
            return values[field.label];
        };

        switch (field.type) {
        case 'textarea':
            return <Textarea defaultValue={getInputValue()} size="sm" onChange={(e) => handleChange(field.label, e.target.value)} maxLength={field.label === 'bio' && 150} />;
        default:
            return <Input defaultValue={getInputValue()} size="sm" type={field.type} onChange={(e) => handleChange(field.label, e.target.value)} />;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
            if (Object(value) === value && !(value instanceof File)) {
                Object.entries(values[key]).forEach(([subKey, subValue]) => {
                    // if avatar is null or is not a File format, don't pass to server
                    if (subKey === 'avatar' && (subValue === null || !(subValue instanceof File))) {
                        return;
                    }
                    formData.append(`${key}.${subKey}`, subValue);
                });
            } else {
                formData.append(key, value);
            }
        });

        updateProfile(formData, profileData.id, profileData.handle);
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
                    <ModalHeader>Edit Profile</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form onSubmit={handleSubmit}>
                            <CSRFToken />
                            <Flex direction="column" justifyContent="center" alignItems="center" mb="1rem">
                                <Input {...getInputProps()} />
                                <ProfileAvatar name={profileData.handle} src={acceptedFiles.length > 0 ? acceptedFiles[0].preview : profileData.profile?.avatar} size="lg" marginRight={[0]} onClick={open} />
                                <Heading as="h4" size="md" color="brand" mt="0.5rem" cursor="pointer" onClick={open}>Change Avatar</Heading>
                            </Flex>
                            {profileFields.map((field) => {
                                const label = formatFieldLabel(field.label);
                                return (
                                    <Stack pt="1rem">
                                        <Text fontWeight="bold" fontSize="0.9rem">
                                            {label}
                                        </Text>
                                        { values.profile && renderDynamicInput(field) }
                                        { field.label === 'bio' && (
                                            <Text as="em" fontSize="0.9rem" mt="0.25rem !important">
                                                Max characters: 150
                                            </Text>
                                        )}
                                    </Stack>
                                );
                            })}
                            <ModalFooter justifyContent="center" mt="0.5rem">
                                <Button disabled={loading} type="submit" size="md" variant="brand">Save Changes</Button>
                            </ModalFooter>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

const mapStateToProps = (state) => ({
    statusSuccess: state.auth.statusSuccess,
    loading: state.auth.loading,
    user: state.auth.user,
});

EditProfileModal.propTypes = {
    loading: PropTypes.bool.isRequired,
    profileData: PropTypes.object.isRequired,
    statusSuccess: PropTypes.bool.isRequired,
    updateProfile: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { updateProfile, resetStatus })(EditProfileModal);
