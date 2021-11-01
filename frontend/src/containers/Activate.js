import React from 'react';
import { connect } from 'react-redux';
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

import { verify } from '../actions/auth';

const Activate = ({ match, verify, loading }) => {
    const history = useHistory();

    const verifyAccount = () => {
        const { uid, token } = match.params;
        verify(uid, token, history);
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

const mapStateToProps = (state) => ({
    loading: state.auth.loading,
});

Activate.propTypes = {
    loading: PropTypes.bool.isRequired,
    match: PropTypes.object.isRequired,
    verify: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { verify })(Activate);
