import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    Container,
    Box,
    Flex,
    Stack,
    FormControl,
    InputGroup,
    Input,
    InputRightElement,
    Heading,
    Button,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { resetPasswordConfirm } from '../actions/auth';

const ResetPasswordConfirm = ({ match, resetPasswordConfirm }) => {
    const [loading, setLoading] = useState(false);
    const [requestSent, setRequestSent] = useState(false);
    const [show, setShow] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [formData, setFormData] = useState({
        newPassword: '',
        reNewPassword: '',
    });

    const { newPassword, reNewPassword } = formData;

    useEffect(() => {
        if (requestSent) {
            setLoading(false);
        } else if (loading) {
            const { uid, token } = match.params;

            resetPasswordConfirm(uid, token, newPassword, reNewPassword);
            setRequestSent(true);
        }
    }, [loading, requestSent]);

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const onSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
    };

    if (requestSent) {
        return <Redirect to="/" />;
    }

    return (
        <Container maxW="container.md" p="1.5rem">
            <Flex h="90%" direction="column" justify="center">
                <Box boxShadow="xl" borderRadius={['25% 12.5%', '50% 25%']} p={['3rem 2rem', '6rem', '8rem']}>
                    <Heading as="h1" mb="1rem" mt="1rem" align="center">
                        Reset Password
                    </Heading>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <Stack spacing={3}>
                            <FormControl id="password" isRequired>
                                <InputGroup size="md">
                                    <Input
                                      type={show ? 'text' : 'password'}
                                      name="newPassword"
                                      value={newPassword}
                                      placeholder="New Password"
                                      onChange={(e) => onChange(e)}
                                    />
                                    <InputRightElement width="4.5rem">
                                        <Button variant="reveal" h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                                            {show ? <ViewOffIcon /> : <ViewIcon />}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            <FormControl id="password" isRequired>
                                <InputGroup size="md">
                                    <Input
                                      type={showConfirm ? 'text' : 'password'}
                                      name="reNewPassword"
                                      value={reNewPassword}
                                      placeholder="Confirm New Password"
                                      onChange={(e) => onChange(e)}
                                    />
                                    <InputRightElement width="4.5rem">
                                        <Button variant="reveal" h="1.75rem" size="sm" onClick={() => setShowConfirm(!showConfirm)}>
                                            {showConfirm ? <ViewOffIcon /> : <ViewIcon />}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            <Button variant="brand" type="submit" isLoading={loading} isFullWidth>
                                Reset Password
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </Flex>
        </Container>
    );
};

ResetPasswordConfirm.propTypes = {
    match: PropTypes.object.isRequired,
    resetPasswordConfirm: PropTypes.func.isRequired,
};

export default connect(null, { resetPasswordConfirm })(ResetPasswordConfirm);
