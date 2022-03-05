import React from 'react';
import { useSelector } from 'react-redux';
import {
    Container,
    Box,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
} from '@chakra-ui/react';

import EditProfile from '../components/EditProfile';

const Settings = () => {
    const user = useSelector((state) => state.auth.user);

    return (
        <Container maxW="container.lg" p="1.5rem">
            <Tabs orientation="vertical" colorScheme="brand" height="100%" variant="variantLine">
                <TabList flexBasis="256px">
                    <Tab fontWeight="500" justifyContent="flex-start" p="1rem 1.5rem">Edit Profile</Tab>
                    <Tab fontWeight="500" justifyContent="flex-start" p="1rem 1.5rem">Change Password</Tab>
                </TabList>

                <TabPanels flex="1 1 400px">
                    <TabPanel p={0}>
                        <Box p={['1rem', '1rem 2rem', '3rem 5rem']}>
                            { user && <EditProfile profileData={user} /> }
                        </Box>
                    </TabPanel>
                    <TabPanel p={0}>
                        <Box p={['1rem', '1rem 2rem', '3rem 5rem']}>
                            <p>Coming Soon!</p>
                        </Box>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Container>
    );
};

export default Settings;
