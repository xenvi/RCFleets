import React, { useState, useEffect } from 'react';
import { Link as RouterLink, Redirect, useHistory } from 'react-router-dom';
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
import { mapFormErrors, formatFormErrors, renderFormErrors } from '../util/errorHandling';

const Login = ({
    login, isAuthenticated, error, loading,
}) => {
    const [formErrors, setFormErrors] = useState([]);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [show, setShow] = useState(false);

    const { email, password } = formData;
    const history = useHistory();

    useEffect(() => {
        if (error) {
            setFormErrors(mapFormErrors(error));
        } else {
            setFormErrors([]);
        }
    }, [error]);

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const onSubmit = (e) => {
        e.preventDefault();

        if (!email) {
            setFormErrors(formatFormErrors('email', 'Email is required.'));
        } else if (!password) {
            setFormErrors(formatFormErrors('password', 'Password is required.'));
        } else {
            login(email, password, history);
        }
    };

    if (isAuthenticated) {
        return <Redirect to="/" />;
    }

    return (
        <Container maxW="container.md" p={['0', '1.5rem']}>
            <Flex h="90%" direction="column" justify="center">
                <Box boxShadow={['0', 'xl']} borderRadius={['0', '25% 12.5%', '50% 25%']} p={['3rem 2rem', '6rem', '10rem']}>
                    <Heading as="h1" mb="1rem" mt="1rem" align="center">
                        Log In
                    </Heading>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <Stack spacing={3}>
                            <FormControl id="email">
                                <Input
                                  type="email"
                                  name="email"
                                  value={email}
                                  placeholder="Email"
                                  onChange={(e) => onChange(e)}
                                  isInvalid={formErrors[0] && formErrors[0][0] === 'email'}
                                  errorBorderColor="brand.300"
                                />
                            </FormControl>
                            <FormControl id="password">
                                <InputGroup size="md">
                                    <Input
                                      type={show ? 'text' : 'password'}
                                      name="password"
                                      value={password}
                                      placeholder="Password"
                                      onChange={(e) => onChange(e)}
                                      isInvalid={formErrors[0] && formErrors[0][0] === 'password'}
                                      errorBorderColor="brand.300"
                                    />
                                    <InputRightElement width={['3.5rem', '4.5rem']}>
                                        <Button variant="reveal" h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                                            {show ? <ViewOffIcon /> : <ViewIcon />}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>

                            { renderFormErrors(formErrors) }

                            <Button variant="brand" type="submit" isLoading={loading} isFullWidth>
                                Log In
                            </Button>
                        </Stack>
                    </form>

                    <Text mt="1rem" align="center">
                        <Link as={RouterLink} to="reset-password">Forgot your Password?</Link>
                    </Text>
                    <Divider mt="1rem" mb="1rem" borderColor="slateGray.200" />
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
    loading: state.auth.loading,
});

Login.propTypes = {
    error: PropTypes.string.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    login: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { login })(Login);
