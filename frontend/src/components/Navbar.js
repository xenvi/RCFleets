import React from 'react';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
    Container,
    Flex,
    Spacer,
    Box,
    Button,
    Heading,
    Link,
    Drawer,
    DrawerBody,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Stack,
    Avatar,
    AiOutlineUser,
    useColorMode,
    useDisclosure,
} from '@chakra-ui/react';
import {
    MoonIcon, SunIcon, HamburgerIcon,
} from '@chakra-ui/icons';
import { connect } from 'react-redux';
import { logout } from '../redux/actions/auth';

const Navbar = ({ logout, isAuthenticated, user }) => {
    const { colorMode, toggleColorMode } = useColorMode();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toggleMenu = () => onOpen();

    const handleLogout = (drawerOpen) => {
        logout();
        return drawerOpen && toggleMenu();
    };

    const handleProfile = (drawerOpen) => {
        console.log('handle profile');
        return drawerOpen && toggleMenu();
    };

    const guestLinks = (drawerOpen) => (
        <>
            <Box display={['block', 'inline-block']} m="auto">
                <Button variant="ghost" onClick={toggleColorMode} mr={['0', '1rem']}>
                    {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                </Button>
            </Box>
            <Box display={['block', 'inline-block']} m="auto">
                <Button as={RouterLink} to="/login" onClick={() => drawerOpen && toggleMenu()} colorScheme="slateGray" mr={['0', '1rem']}>
                    Log In
                </Button>
            </Box>
            <Button as={RouterLink} to="/signup" onClick={() => drawerOpen && toggleMenu()} variant="brand">
                Sign Up
            </Button>
        </>
    );
    const authLinks = (drawerOpen) => (
        <>
            <Box display={['block', 'inline-block']} m="auto">
                <Button variant="ghost" onClick={toggleColorMode} mr={['0', '0.5rem']}>
                    {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                </Button>
            </Box>
            <Button variant="ghost" onClick={() => handleProfile(drawerOpen)} mr={['0', '1rem']}>
                {/* { hasAvatar ? <Avatar name={user.handle} src={user.avatar} /> : <Avatar bg="brand.500" icon={<AiOutlineUser fontSize="1.5rem" />} />} */}
                {/* <Avatar bg="brand.500" icon={<AiOutlineUser fontSize="1.5rem" />} /> */}
            </Button>
            <Button as={Link} onClick={() => handleLogout(drawerOpen)} variant="brand">
                Log Out
            </Button>
        </>
    );
    return (
        <Container maxW="100%" as="nav" variant="nav">
            <Container maxW="container.lg">
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

                    <Box display={{ base: 'block', sm: 'none' }}>
                        <Button variant="ghost" onClick={() => toggleMenu()}>
                            <HamburgerIcon boxSize={5} />
                        </Button>
                    </Box>

                    <Drawer
                      isOpen={isOpen}
                      placement="right"
                      onClose={onClose}
                      variant="primary"
                    >
                        <DrawerOverlay />
                        <DrawerContent>
                            <DrawerCloseButton />

                            <DrawerBody>
                                <Stack spacing={6}>
                                    { isAuthenticated ? authLinks(true) : guestLinks(true) }
                                </Stack>
                            </DrawerBody>
                        </DrawerContent>
                    </Drawer>

                    <Box display={{ base: 'none', sm: 'block' }}>
                        { isAuthenticated ? authLinks() : guestLinks() }
                    </Box>
                </Flex>
            </Container>
        </Container>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
});

Navbar.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { logout })(Navbar);
