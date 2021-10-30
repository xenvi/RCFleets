import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
    Container,
    Flex,
    Spacer,
    Box,
    Button,
    Heading,
    Link,
    useColorMode,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';

const Navbar = ({ logout, isAuthenticated }) => {
    const { colorMode, toggleColorMode } = useColorMode();

    const guestLinks = () => (
        <>
            <Button variant="ghost" onClick={toggleColorMode} mr="1rem">
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </Button>
            <Button as={RouterLink} to="/login" colorScheme="slateGray" mr="1rem">
                Log In
            </Button>
            <Button as={RouterLink} to="/signup" colorScheme="brand">
                Sign Up
            </Button>
        </>
    );
    const authLinks = () => (
        <>
            <Button variant="ghost" onClick={toggleColorMode} mr="1rem">
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </Button>
            <Button as={Link} onClick={() => logout()} colorScheme="brand">
                Log Out
            </Button>
        </>
    );

    return (
        <Container maxW="container.lg" as="nav">
            <Flex flexWrap="wrap" w="100%" pt="1rem" pb="1rem">
                <Box>
                    <Link as={RouterLink} to="/">
                        <Heading
                          as="h5"
                        >
                            RC Fleets
                        </Heading>
                    </Link>
                </Box>
                <Spacer />
                <Box>
                    { isAuthenticated ? authLinks() : guestLinks() }
                </Box>
            </Flex>
        </Container>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

Navbar.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { logout })(Navbar);
