import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    Container,
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

const Login = ({ login }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [show, setShow] = React.useState(false);
    const handleShowPassword = () => setShow(!show);

    const { email, password } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = (e) => {
        e.preventDefault();

        login(email, password);
    };

    // is user authenticated? redirect to homepage

    return (
        <Container maxW="container.sm">
            <Flex direction="column" justify="center">
                <Heading as="h1" mb="5" mt="5" align="center">
                    Log In
                </Heading>
                <form onSubmit={(e) => onSubmit(e)}>
                    <Stack spacing={3}>
                        <FormControl id="email" isRequired>
                            <Input type="email" placeholder="Email" onChange={(e) => onChange(e)} />
                        </FormControl>
                        <FormControl id="password" isRequired>
                            <InputGroup size="md">
                                <Input placeholder="Password" type={show ? 'text' : 'password'} onChange={(e) => onChange(e)} />
                                <InputRightElement width="4.5rem">
                                    <Button h="1.75rem" size="sm" onClick={handleShowPassword}>
                                        {show ? <ViewOffIcon /> : <ViewIcon />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <Button type="submit" loadingText="Logging In" isFullWidth>
                            Log In
                        </Button>
                    </Stack>
                </form>

                <Text mt="5" align="center">
                    <Link to="reset-password">Forgot your Password?</Link>
                </Text>
                <Divider mt="5" mb="5" />
                <Text align="center">
                    New to RC Fleets?
                    <Link as={RouterLink} to="signup" ml="1">Sign Up!</Link>
                </Text>
            </Flex>
        </Container>
    );
};

// const mapStateToProps = state => ({
//     // is authenticated
// });

export default connect(null, { login })(Login);
