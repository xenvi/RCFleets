import React, { useState, useEffect } from 'react';
import { Link as RouterLink, Redirect, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
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

import { signup } from '../redux/actions/auth';
import { mapFormErrors, formatFormErrors, renderFormErrors } from '../util/errorHandling';

const SignUp = () => {
    const loading = useSelector((state) => state.auth.loading);
    const error = useSelector((state) => state.auth.error);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const dispatch = useDispatch();

    const [formErrors, setFormErrors] = useState([]);
    const [formData, setFormData] = useState({
        handle: '',
        email: '',
        password: '',
        rePassword: '',
    });
    const [show, setShow] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const {
        handle, email, password, rePassword,
    } = formData;
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

        if (!handle) {
            setFormErrors(formatFormErrors('handle', 'Handle is required.'));
        } else if (!email) {
            setFormErrors(formatFormErrors('email', 'Email is required.'));
        } else if (!password) {
            setFormErrors(formatFormErrors('password', 'Password is required.'));
        } else if (!rePassword) {
            setFormErrors(formatFormErrors('re_password', 'Confirm Password is required.'));
        } else if (password !== rePassword) {
            setFormErrors(formatFormErrors('passwords', 'Passwords must match.'));
        } else {
            dispatch(signup(handle, email, password, rePassword, history));
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
                        Sign Up
                    </Heading>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <Stack spacing={3}>
                            <FormControl id="handle">
                                <Input
                                  type="text"
                                  name="handle"
                                  value={handle}
                                  placeholder="Handle"
                                  onChange={(e) => onChange(e)}
                                  isInvalid={formErrors[0] && formErrors[0][0] === 'handle'}
                                  errorBorderColor="brand.300"
                                />
                            </FormControl>
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
                                      isInvalid={formErrors[0] && (formErrors[0][0] === 'password' || formErrors[0][0] === 'passwords')}
                                      errorBorderColor="brand.300"
                                    />
                                    <InputRightElement width={['3.5rem', '4.5rem']}>
                                        <Button variant="reveal" h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                                            {show ? <ViewOffIcon /> : <ViewIcon />}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            <FormControl id="rePassword">
                                <InputGroup size="md">
                                    <Input
                                      type={showConfirm ? 'text' : 'password'}
                                      name="rePassword"
                                      value={rePassword}
                                      placeholder="Confirm Password"
                                      onChange={(e) => onChange(e)}
                                      isInvalid={formErrors[0] && (formErrors[0][0] === 're_password' || formErrors[0][0] === 'passwords')}
                                      errorBorderColor="brand.300"
                                    />
                                    <InputRightElement width={['3.5rem', '4.5rem']}>
                                        <Button variant="reveal" h="1.75rem" size="sm" onClick={() => setShowConfirm(!showConfirm)}>
                                            {showConfirm ? <ViewOffIcon /> : <ViewIcon />}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>

                            { renderFormErrors(formErrors) }

                            <Button variant="brand" type="submit" isLoading={loading} isFullWidth>
                                Register
                            </Button>
                        </Stack>
                    </form>
                    <Divider mt="1.5rem" mb="1rem" borderColor="slateGray.200" />
                    <Text align="center">
                        Already have an account?
                        <Link as={RouterLink} to="login" ml="1" variant="brand">Log In!</Link>
                    </Text>
                </Box>
            </Flex>
        </Container>
    );
};

export default SignUp;
