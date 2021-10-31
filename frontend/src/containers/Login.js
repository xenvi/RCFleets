import React, { useState, useEffect } from 'react';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    Container,
    Box,
    Flex,
    Stack,
    FormControl,
    Input,
    InputRightElement,
    InputGroup,
    Heading,
    Text,
    Link,
    Divider,
    Button,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

import { login } from '../actions/auth';

const Login = ({ login, isAuthenticated, error }) => {
    const [loading, setLoading] = useState(false);
    const [formError, setFormError] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [show, setShow] = useState(false);

    const { email, password } = formData;

    useEffect(() => {
        if (error) {
            setLoading(false);
            setFormError(error);
        } else if (isAuthenticated) {
            setLoading(false);
        } else if (loading) {
            login(email, password);
        }
    }, [loading, isAuthenticated, error]);

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const onSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
    };

    if (isAuthenticated) {
        return <Redirect to="/" />;
    }

    return (
        <Container maxW="container.md" p="1.5rem">
            <Flex h="90%" direction="column" justify="center">
                <Box boxShadow="xl" borderRadius={['25% 12.5%', '50% 25%']} p={['3rem 2rem', '6rem', '10rem']}>
                    <Heading as="h1" mb="1rem" mt="1rem" align="center">
                        Log In
                    </Heading>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <Stack spacing={3}>
                            <FormControl id="email" isRequired>
                                <Input
                                  type="email"
                                  name="email"
                                  value={email}
                                  placeholder="Email"
                                  onChange={(e) => onChange(e)}
                                />
                            </FormControl>
                            <FormControl id="password" isRequired>
                                <InputGroup size="md">
                                    <Input
                                      type={show ? 'text' : 'password'}
                                      name="password"
                                      value={password}
                                      placeholder="Password"
                                      onChange={(e) => onChange(e)}
                                    />
                                    <InputRightElement width="4.5rem">
                                        <Button variant="reveal" h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                                            {show ? <ViewOffIcon /> : <ViewIcon />}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>

                            { formError && <Text variant="error" mt="1.5rem" mb="1.5rem" align="center">{formError}</Text> }

                            <Button variant="brand" type="submit" isLoading={loading} isFullWidth>
                                Log In
                            </Button>
                        </Stack>
                    </form>

                    <Text mt="1rem" align="center">
                        <Link as={RouterLink} to="reset-password">Forgot your Password?</Link>
                    </Text>
                    <Divider mt="1rem" mb="1rem" borderColor="slateGray" />
                    <Text align="center">
                        New to RC Fleets?
                        <Link as={RouterLink} to="signup" ml="1" variant="brand">Sign Up!</Link>
                    </Text>
                </Box>
            </Flex>
        </Container>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.auth.error,
});

Login.propTypes = {
    error: PropTypes.string.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    login: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { login })(Login);
