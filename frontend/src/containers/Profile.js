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
    useDisclosure,
} from '@chakra-ui/react';
import { useBreakpointValue } from '@chakra-ui/media-query';
import { AiOutlineTable } from 'react-icons/ai';

import ProfileAvatar from '../components/Avatar';
import FleetPost from '../components/FleetPost';
import EditProfileModal from '../components/modals/EditProfileModal';
import FleetPostSkeleton from '../components/FleetPostSkeleton';
import { setProfile, unsetProfile } from '../redux/actions/auth';
import { setFleet } from '../redux/actions/fleet';

const Profile = ({
    match, user, loading, profile, setProfile, unsetProfile, currentFleet, setFleet,
}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isAuthProfile, setIsAuthProfile] = useState(false);
    const [error, setError] = useState([]);
    const { handle } = match.params;

    useEffect(() => {
        console.log('hit handle useeffect', handle);
        setProfile(handle);

        return () => {
            unsetProfile();
        };
    }, [handle]);

    useEffect(() => {
        if (handle === user?.handle) {
            setIsAuthProfile(true);
        }
    }, [user, handle]);

    useEffect(() => {
        console.log('hit profile useeffect', profile);
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

    const renderProfile = () => {
        const formattedDate = new Date(profile.created_at).toLocaleDateString('en-US');
        const columnSize = useBreakpointValue({ base: 'repeat(1, 1fr)', sm: 'repeat(3, 1fr)' });

        return (
            <>
                <EditProfileModal profileData={profile} isOpen={isOpen} onClose={onClose} />
                <Grid rowGap={1} columnGap={2} templateColumns={columnSize} margin="1.5rem 0 0.5rem">
                    <GridItem colSpan={1} display="flex" justifyContent={['flex-start', 'center']} alignItems="center">
                        <ProfileAvatar name={profile.handle} src={profile?.profile?.avatar} size="lg" />
                    </GridItem>
                    <GridItem colSpan={2}>
                        <Stack mt={['0.5rem', '0']}>
                            <Flex alignItems="center">
                                <Heading as="h2">
                                    {profile.handle}
                                </Heading>
                                { isAuthProfile
                                    && (
                                    <Button onClick={() => onOpen()} colorScheme="slateGray" ml="1.5rem" size="sm" variant="outline">
                                        Edit Profile
                                    </Button>
                                )}
                            </Flex>
                            <Text whiteSpace="pre-wrap">
                                {profile.profile?.bio}
                            </Text>
                            <Text as="em" fontSize="xs">
                                {`Joined ${formattedDate}`.toUpperCase()}
                            </Text>
                        </Stack>
                    </GridItem>
                </Grid>
            </>
        );
    };

    const renderFleet = () => (
        <SimpleGrid columns={['1', '1', '2']} spacing={10}>
            {
                currentFleet.map((vehicle) => (
                    <FleetPost vehicle={vehicle} isAuthProfile={isAuthProfile} />
                ))
            }
        </SimpleGrid>
    );

    const renderTabs = (currentFleet) => (
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
                        currentFleet ? renderFleet() : <FleetPostSkeleton />
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
                renderTabs(currentFleet)
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
    unsetProfile: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { setProfile, unsetProfile, setFleet })(Profile);
