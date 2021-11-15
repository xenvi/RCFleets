import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
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
import { resetPasswordConfirm } from '../redux/actions/auth';
import { mapFormErrors, formatFormErrors, renderFormErrors } from '../util/errorHandling';

const ResetPasswordConfirm = ({
    match, resetPasswordConfirm, error, loading,
}) => {
    const [show, setShow] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [formErrors, setFormErrors] = useState([]);
    const [formData, setFormData] = useState({
        newPassword: '',
        reNewPassword: '',
    });

    const { newPassword, reNewPassword } = formData;
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
        if (!newPassword) {
            setFormErrors(formatFormErrors('password', 'Password is required.'));
        } else if (!reNewPassword) {
            setFormErrors(formatFormErrors('re_new_password', 'Confirm Password is required.'));
        } else if (newPassword !== reNewPassword) {
            setFormErrors(formatFormErrors('passwords', 'Passwords must match.'));
        } else {
            const { uid, token } = match.params;
            resetPasswordConfirm(uid, token, newPassword, reNewPassword, history);
        }
    };

    return (
        <Container maxW="container.md" p={['0', '1.5rem']}>
            <Flex h="90%" direction="column" justify="center">
                <Box boxShadow={['0', 'xl']} borderRadius={['0', '25% 12.5%', '50% 25%']} p={['3rem 2rem', '6rem', '8rem']}>
                    <Heading as="h1" mb="1rem" mt="1rem" align="center">
                        Reset Password
                    </Heading>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <Stack spacing={3}>
                            <FormControl id="password">
                                <InputGroup size="md">
                                    <Input
                                      type={show ? 'text' : 'password'}
                                      name="newPassword"
                                      value={newPassword}
                                      placeholder="New Password"
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
                            <FormControl id="password">
                                <InputGroup size="md">
                                    <Input
                                      type={showConfirm ? 'text' : 'password'}
                                      name="reNewPassword"
                                      value={reNewPassword}
                                      placeholder="Confirm New Password"
                                      onChange={(e) => onChange(e)}
                                      isInvalid={formErrors[0] && (formErrors[0][0] === 're_new_password' || formErrors[0][0] === 'passwords')}
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
                                Reset Password
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </Flex>
        </Container>
    );
};

const mapStateToProps = (state) => ({
    error: state.auth.error,
    loading: state.auth.loading,
});

ResetPasswordConfirm.propTypes = {
    error: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    match: PropTypes.object.isRequired,
    resetPasswordConfirm: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { resetPasswordConfirm })(ResetPasswordConfirm);
