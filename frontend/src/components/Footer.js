import React from 'react';
import {
    Container,
    Flex,
    Text,
} from '@chakra-ui/react';

const setCopyrightYear = (str, index, chr) => str.substring(0, index) + chr + str.substring(index + 4);

const Footer = () => (
    <Container maxW="container.lg" as="footer">
        <Flex justify="center" w="100%" pt="1rem" pb="1rem">
            <Text fontWeight="bold" align="center">
                { setCopyrightYear('© 2021 RC Fleets. All Rights Reserved', 2, new Date().getFullYear()) }
            </Text>
        </Flex>
    </Container>
);

export default Footer;
