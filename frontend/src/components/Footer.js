import React from 'react';
import {
    Container,
    Flex,
    Text,
    Box,
} from '@chakra-ui/react';

const Footer = () => (
    <Container maxW="container.lg">
        <Box w="100%" pt="4" pb="4">
            <Flex justify="center">
                <Text fontWeight="bold">
                    &copy; 2021 RC Fleets. All Rights Reserved
                </Text>
            </Flex>
        </Box>
    </Container>
);

export default Footer;
