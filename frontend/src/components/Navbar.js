import React from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
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
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    useColorMode,
    useDisclosure,
} from '@chakra-ui/react';
import {
    MoonIcon, SunIcon, HamburgerIcon, SettingsIcon,
} from '@chakra-ui/icons';
import { AiOutlineUser, AiTwotoneThunderbolt } from 'react-icons/ai';
import { connect } from 'react-redux';
import { logout } from '../redux/actions/auth';
import CreateModal from './CreateModal';
import ProfileAvatar from './Avatar';

const Navbar = ({
    logout, isAuthenticated, user, authProfile,
}) => {
    const { colorMode, toggleColorMode } = useColorMode();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const history = useHistory();

    const handleLogout = () => {
        logout(history);
        return isOpen && onClose();
    };

    const handleProfileClick = () => {
        history.push(`/user/${authProfile.handle}`);
        return isOpen && onClose();
    };

    const guestLinks = () => (
        <>
            <Box display={['block', 'inline-block']} m="auto">
                <Button variant="ghost" onClick={toggleColorMode} mr={['0', '1rem']}>
                    {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                </Button>
            </Box>
            <Button as={RouterLink} to="/login" onClick={() => isOpen && onClose()} colorScheme="slateGray" mr={['0', '1rem']} size="sm">
                Log In
            </Button>
            <Button as={RouterLink} to="/signup" onClick={() => isOpen && onClose()} variant="brand" size="sm">
                Sign Up
            </Button>
        </>
    );
    const authLinks = () => (
        <>
            <Box display={['block', 'inline-block']} m={['0.75rem auto !important', '0 0.25rem !important']}>
                <Button variant="ghost" onClick={toggleColorMode}>
                    {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                </Button>
            </Box>
            <Box display={['block', 'inline-block']} m={['0.75rem auto !important', '0 0.25rem !important']}>
                <CreateModal />
            </Box>
            <Box display={['block', 'none']} m={['0.75rem auto !important', '0 0.25rem !important']}>
                <Button variant="ghost" onClick={() => handleProfileClick()}>
                    <ProfileAvatar user={user} profile={authProfile} size="sm" marginRight={['0']} />
                </Button>
            </Box>
            <Box display={['none', 'inline-block']} m={['0.75rem auto !important', '0 0.25rem !important']}>
                <Popover
                  placement="bottom-end"
                  colorScheme="dark"
                >
                    <PopoverTrigger>
                        <Button variant="ghost">
                            <ProfileAvatar user={user} profile={authProfile} size="xs" marginRight={['0']} />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <PopoverArrow />
                        <PopoverBody p="0">
                            <Button onClick={() => handleProfileClick()} variant="fullLeftAlign">
                                <Box mr="1rem">
                                    <AiOutlineUser fontSize="1rem" />
                                </Box>
                                Profile
                            </Button>
                            <Button variant="fullLeftAlign">
                                <SettingsIcon mr="1rem" />
                                Settings
                            </Button>
                        </PopoverBody>
                        <PopoverFooter p="0">
                            <Button onClick={() => handleLogout()} variant="fullLeftAlign">
                                Log Out
                            </Button>
                        </PopoverFooter>
                    </PopoverContent>
                </Popover>
            </Box>
        </>
    );
    return (
        <Container maxW="100%" as="nav" variant="nav">
            <Container maxW="container.lg">
                <Flex flexWrap="wrap" w="100%" pt="1rem" pb="1rem">
                    <Box>
                        <Link as={RouterLink} to="/">
                            <Heading
                              as="h6"
                              display="flex"
                              alignItems="center"
                            >
                                <Box mr="0.5rem">
                                    <AiTwotoneThunderbolt />
                                </Box>
                                RC Fleets
                            </Heading>
                        </Link>
                    </Box>

                    <Spacer />

                    <Box display={{ base: 'block', sm: 'none' }}>
                        <Button variant="ghost" onClick={onOpen}>
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
                                <Stack>
                                    { isAuthenticated ? authLinks() : guestLinks() }
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
    authProfile: state.auth.authProfile,
    user: state.auth.user,
});

Navbar.propTypes = {
    authProfile: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { logout })(Navbar);
