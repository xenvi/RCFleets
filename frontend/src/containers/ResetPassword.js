import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
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
import { resetPassword } from '../redux/actions/auth';
import { mapFormErrors, formatFormErrors, renderFormErrors } from '../util/errorHandling';

const ResetPassword = () => {
    const error = useSelector((state) => state.auth.error);
    const loading = useSelector((state) => state.auth.loading);

    const dispatch = useDispatch();

    const [formErrors, setFormErrors] = useState([]);
    const [formData, setFormData] = useState({
        email: '',
    });

    const { email } = formData;
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
        } else {
            dispatch(resetPassword(email, history));
        }
    };

    return (
        <Container maxW="container.md" p={['0', '1.5rem']}>
            <Flex h="90%" direction="column" justify="center">
                <Box boxShadow={['0', 'xl']} borderRadius={['0', '25% 12.5%', '50% 25%']} p={['3rem 2rem', '6rem', '8rem']}>
                    <Heading as="h1" mb="1rem" mt="1rem" align="center">
                        Request Password Reset
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

                            { renderFormErrors(formErrors) }

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

export default ResetPassword;
