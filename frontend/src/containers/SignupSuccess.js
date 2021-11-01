import React from 'react';
import {
    Container,
    Box,
    Flex,
    Stack,
    Heading,
    Text,
    useColorMode,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';

const SignupSuccess = () => {
    const { colorMode } = useColorMode();
    return (
        <Container maxW="container.md" p={['0', '1.5rem']}>
            <Flex h="90%" direction="column" justify="center">
                <Box boxShadow={['0', 'xl']} borderRadius={['0', '25% 12.5%', '50% 25%']} p={['3rem 2rem', '6rem', '10rem']}>
                    <Flex as={Stack} spacing={8} align="center" justify="center">
                        <Flex bg="green.400" w={['4rem', '5rem']} h={['4rem', '5rem']} borderRadius="50%" boxShadow={colorMode === 'light' ? '0 0.1rem 1.5rem #9AE6B4' : '0 0.1rem 1.5rem #48BB78'} align="center" justify="center">
                            <CheckIcon color="white" boxSize={[7, 10]} />
                        </Flex>
                        <Heading as="h1" mb="1rem" mt="1rem" align="center">
                            Account successfully created!
                        </Heading>
                        <Text align="center">
                            Grab a coffee. We&apos;re sending an email to your inbox with a link to verify your account.
                        </Text>
                    </Flex>
                </Box>
            </Flex>
        </Container>
    );
};

export default SignupSuccess;
