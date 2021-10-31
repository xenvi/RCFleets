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
    Input,
    Heading,
    Button,
} from '@chakra-ui/react';
import { resetPassword } from '../actions/auth';

const ResetPassword = ({ resetPassword }) => {
    const [loading, setLoading] = useState(false);
    const [requestSent, setRequestSent] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
    });

    const { email } = formData;

    useEffect(() => {
        if (requestSent) {
            setLoading(false);
        } else if (loading) {
            resetPassword(email);
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
                        Request Password Reset
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

ResetPassword.propTypes = {
    resetPassword: PropTypes.func.isRequired,
};

export default connect(null, { resetPassword })(ResetPassword);
