import React, {
    useState, useEffect, useLayoutEffect, useMemo,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
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
    Spinner,
} from '@chakra-ui/react';
import { useBreakpointValue } from '@chakra-ui/media-query';
import { AiOutlineTable } from 'react-icons/ai';

import ProfileAvatar from '../components/Avatar';
import FleetPost from '../components/FleetPost';
import FleetPostSkeleton from '../components/FleetPostSkeleton';
import { setProfile, unsetProfile } from '../redux/actions/auth';
import { setFleet } from '../redux/actions/fleet';

const Profile = ({
    match,
}) => {
    const allCurrentFleetLoaded = useSelector((state) => state.fleet.allCurrentFleetLoaded);
    const currentFleet = useSelector((state) => state.fleet.currentFleet);
    const loading = useSelector((state) => state.auth.loading);
    const profile = useSelector((state) => state.auth.profile);
    const user = useSelector((state) => state.auth.user);

    const dispatch = useDispatch();

    const [isAuthProfile, setIsAuthProfile] = useState(false);
    const [page, setPage] = useState(1);

    const history = useHistory();
    const { handle } = match.params;

    useEffect(() => {
        if (profile.length !== 0) {
            const loadPosts = async () => {
                await dispatch(setFleet(profile.id, page));
            };

            loadPosts();
        }
    }, [profile, page]);

    useLayoutEffect(() => {
        const handleScroll = () => {
            // on scroll to bottom of page, load more posts until end of list
            if ((window.innerHeight + window.scrollY) === document.body.offsetHeight) {
                if (!allCurrentFleetLoaded) setPage((prev) => prev + 1);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [allCurrentFleetLoaded]);

    useEffect(() => {
        dispatch(setProfile(handle));

        return () => {
            dispatch(unsetProfile());
        };
    }, [handle]);

    useEffect(() => {
        if (handle === user?.handle) {
            setIsAuthProfile(true);
        }
    }, [user, handle]);

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
                                    <Button onClick={() => history.push('/settings')} colorScheme="slateGray" ml="1.5rem" size="sm" variant="outline">
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
            { loading && <Flex justifyContent="center"><Spinner color="brand" size="md" /></Flex>}
        </Container>
    );
};

Profile.propTypes = {
    match: PropTypes.object.isRequired,
};

export default Profile;
