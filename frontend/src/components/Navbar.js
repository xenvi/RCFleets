import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
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

const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Container maxW="container.lg">
            <Box w="100%" pt="4" pb="4">
                <Flex>
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
                        <Button variant="ghost" onClick={toggleColorMode} mr="5">
                            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                        </Button>
                        <Button colorScheme="slateGray" mr="5">
                            <Link as={RouterLink} to="/login">Log In</Link>
                        </Button>
                        <Button colorScheme="brand">
                            <Link as={RouterLink} to="/signup">Sign Up</Link>
                        </Button>
                    </Box>
                </Flex>
            </Box>
        </Container>
    );
};

export default Navbar;
