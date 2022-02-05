import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
    Container,
    Box,
    Flex,
    Stack,
    Heading,
    Button,
} from '@chakra-ui/react';

import { verify } from '../redux/actions/auth';

const Activate = ({ match }) => {
    const loading = useSelector((state) => state.auth.loading);
    const dispatch = useDispatch();
    const history = useHistory();

    const verifyAccount = () => {
        const { uid, token } = match.params;
        dispatch(verify(uid, token, history));
    };

    return (
        <Container maxW="container.md" p={['0', '1.5rem']}>
            <Flex h="90%" direction="column" justify="center">
                <Box boxShadow={['0', 'xl']} borderRadius={['0', '25% 12.5%', '50% 25%']} p={['3rem 2rem', '6rem', '10rem']}>
                    <Stack spacing={3}>
                        <Heading as="h1" mb="1rem" mt="1rem" align="center">
                            Verify Your Account
                        </Heading>
                        <Button variant="brand" type="button" onClick={() => verifyAccount()} isLoading={loading} isFullWidth>
                            Verify
                        </Button>
                    </Stack>
                </Box>
            </Flex>
        </Container>
    );
};

Activate.propTypes = {
    match: PropTypes.object.isRequired,
};

export default Activate;
