import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    Flex,
    Container,
    Grid,
    GridItem,
    SimpleGrid,
    Stack,
    Button,
    Heading,
    Text,
    Skeleton,
    Tabs,
    Tab,
    TabList,
    TabPanels,
    TabPanel,
} from '@chakra-ui/react';
import { useBreakpointValue } from '@chakra-ui/media-query';
import { AiOutlineTable } from 'react-icons/ai';

import ProfileAvatar from '../components/Avatar';
import FleetPost from '../components/FleetPost';
import { setProfile } from '../redux/actions/auth';
import { setFleet } from '../redux/actions/fleet';

const Profile = ({
    match, user, loading, profile, setProfile, currentFleet, setFleet,
}) => {
    const [isAuthProfile, setIsAuthProfile] = useState([]);
    const [error, setError] = useState([]);

    useEffect(() => {
        const { handle } = match.params;
        setProfile(handle);

        if (handle === user?.handle) {
            setIsAuthProfile(true);
        }
    }, []);

    useEffect(() => {
        if (Object.keys(profile).length !== 0) {
            setFleet(profile.id);
        }
    }, [profile]);

    // TODO: add loading state and display loader while data loads in
    // TODO: add error state and display error msg if data fails

    const renderSkeletonProfile = () => (
        <SimpleGrid columns={['1', '1', '2']} spacing={10}>
            <Skeleton height="50px" />
            <Skeleton height="50px" />
        </SimpleGrid>
    );
    const renderSkeletonFleet = () => (
        <SimpleGrid columns={['1', '1', '2']} spacing={10}>
            <Skeleton height="50px" />
            <Skeleton height="50px" />
        </SimpleGrid>
    );

    const renderProfile = () => {
        const formattedDate = new Date(profile.created_at).toLocaleDateString('en-US');
        const columnSize = useBreakpointValue({ base: 'repeat(1, 1fr)', sm: 'repeat(3, 1fr)' });

        const handleEditProfile = () => {
            // TODO
        };

        return (
            <Grid rowGap={1} columnGap={2} templateColumns={columnSize} margin="1.5rem 0 0.5rem">
                <GridItem colSpan={1} display="flex" justifyContent={['flex-start', 'center']} alignItems="center">
                    <ProfileAvatar user={user} profile={profile} size="lg" />
                </GridItem>
                <GridItem colSpan={2}>
                    <Stack mt={['0.5rem', '0']}>
                        <Flex alignItems="center">
                            <Heading as="h2">
                                {profile.handle}
                            </Heading>
                            { isAuthProfile
                                && (
                                <Button onClick={() => handleEditProfile()} colorScheme="slateGray" ml="1.5rem" size="sm" variant="outline">
                                    Edit Profile
                                </Button>
                            )}
                        </Flex>
                        <Text>
                            {profile.profile?.bio}
                        </Text>
                        <Text as="em">
                            {`Joined ${formattedDate}`}
                        </Text>
                    </Stack>
                </GridItem>
            </Grid>
        );
    };

    const renderFleet = () => (
        <SimpleGrid columns={['1', '1', '2']} spacing={10}>
            {
                currentFleet && currentFleet.map((vehicle) => (
                    <FleetPost vehicle={vehicle} isAuthProfile={isAuthProfile} />
                ))
            }
        </SimpleGrid>
    );

    const renderTabs = () => (
        <Tabs align="center" colorScheme="slateGray">
            <TabList mb="1.5rem">
                <Tab>
                    <AiOutlineTable fontSize="1.5rem" />
                    <Text ml="0.5rem" fontSize="0.8rem" letterSpacing="1px" lineHeight="2rem">POSTS</Text>
                </Tab>
            </TabList>

            <TabPanels>
                <TabPanel padding="1rem 0">
                    {
                        currentFleet ? renderFleet() : renderSkeletonFleet()
                    }
                </TabPanel>
            </TabPanels>
        </Tabs>
    );

    return (
        <Container maxW="container.lg" p="1.5rem">
            {
               profile ? renderProfile() : renderSkeletonProfile()
            }
            {
                renderTabs()
            }
        </Container>
    );
};

const mapStateToProps = (state) => ({
    currentFleet: state.fleet.currentFleet,
    loading: state.auth.loading,
    profile: state.auth.profile,
    user: state.auth.user,
});

Profile.propTypes = {
    currentFleet: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    match: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    setFleet: PropTypes.func.isRequired,
    setProfile: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { setProfile, setFleet })(Profile);
