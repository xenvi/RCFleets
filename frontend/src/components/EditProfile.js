import React, {
    useState, useEffect, useCallback,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
    Button,
    Stack,
    Heading,
    Text,
    Textarea,
    Input,
    Flex,
    useToast,
} from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import {
    profileFields, formatFieldLabel,
} from '../util/schema';
import CSRFToken from '../util/csrfToken';
import { updateProfile, resetStatus } from '../redux/actions/auth';
import ProfileAvatar from './Avatar';
import Toast from './Toast';

const EditProfile = ({
    profileData,
}) => {
    const loading = useSelector((state) => state.auth.loading);
    const statusSuccess = useSelector((state) => state.auth.statusSuccess);
    const error = useSelector((state) => state.auth.error);

    const dispatch = useDispatch();

    const toast = useToast();
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
            toast({
                position: 'bottom-left',
                render: () => (<Toast color="light" bgColor="green.400" text="Profile saved." />),
                duration: 4000,
            });
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
            dispatch(resetStatus());
        }
    }, [error]);

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

        dispatch(updateProfile(formData, profileData.id, profileData.handle));
    };

    return (
        <>
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

                <Button isLoading={loading} type="submit" size="md" variant="brand" mt="1rem">Save Changes</Button>
            </form>
        </>
    );
};

EditProfile.propTypes = {
    profileData: PropTypes.object.isRequired,
};

export default EditProfile;
