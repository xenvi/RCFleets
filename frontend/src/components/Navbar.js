import React from 'react';
import {
    Container,
    Flex,
    Spacer,
    Box,
    Button,
    Heading,
    useColorMode,
    useColorModeValue,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    const bg = useColorModeValue('pale', 'dark');
    const color = useColorModeValue('dark', 'pale');

    return (
        <Container maxW="container.lg">
            <Flex>
                <Box bg={bg} w="100%" p="4" color={color}>
                    <Box>
                        <Heading
                          as="h5"
                          color="dark"
                        >
                            RC Fleets
                        </Heading>
                    </Box>
                    <Spacer />
                    <Box>
                        <Button color="dark" variant="ghost" onClick={toggleColorMode}>
                            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                        </Button>
                    </Box>
                </Box>
            </Flex>
        </Container>
    );
};

export default Navbar;
