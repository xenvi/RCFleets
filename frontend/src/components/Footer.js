import React from 'react';
import {
    Container,
    Flex,
    Text,
} from '@chakra-ui/react';

const Footer = () => (
    <Container maxW="container.lg" as="footer">
        <Flex justify="center" w="100%" pt="1rem" pb="1rem">
            <Text fontWeight="bold" align="center">
                &copy; 2021 RC Fleets. All Rights Reserved
            </Text>
        </Flex>
    </Container>
);

export default Footer;
