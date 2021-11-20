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
    SlideFade,
    Button,
    Image,
    Heading,
    Text,
    Avatar,
    Skeleton,
    Tabs,
    Tab,
    TabList,
    TabPanels,
    TabPanel,
    useColorMode,
} from '@chakra-ui/react';
import {
    EditIcon,
    StarIcon,
} from '@chakra-ui/icons';
import { useBreakpointValue } from '@chakra-ui/media-query';
import { AiOutlineUser, AiOutlineTable } from 'react-icons/ai';

import { setProfile } from '../redux/actions/auth';
import { setFleet } from '../redux/actions/fleet';

const Profile = ({
    match, user, loading, profile, setProfile, currentFleet, setFleet,
}) => {
    const [isAuthProfile, setIsAuthProfile] = useState([]);
    const [error, setError] = useState([]);

    const { colorMode } = useColorMode();

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

    const formatFieldLabel = (label) => (label.replace(/([A-Z])/g, ' $1').trim().toUpperCase());

    const formatFieldValue = (label, value) => {
        // TODO: create util file to dynamically switch through database fields in one location
        switch (label) {
        case 'personalBestSpeed':
            return `${value} mph`;
        case 'pinionGearSize':
        case 'spurGearSize':
            return `${value}T`;
        case 'avgMotorTemp':
        case 'avgEscTemp':
            return `${value}\u00B0F`;
        case 'lipoCell':
            return `${value}S`;
        case 'shockOilViscosityFront':
        case 'shockOilViscosityRear':
        case 'diffOilViscosityFront':
        case 'diffOilViscosityCenter':
        case 'diffOilViscosityRear':
            return `${value}cSt`;
        default:
            return value;
        }
    };

    const toggleEdit = () => {
        // TODO
    };

    const toggleFeatured = async (featured) => {
        // TODO
    };

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
        const avatarSize = useBreakpointValue({ base: 'lg', sm: 'xl', md: '2xl' });
        const avatarIconFontSize = useBreakpointValue({ base: '2.5rem', sm: '3.5rem', md: '4.5rem' });
        const columnSize = useBreakpointValue({ base: 'repeat(1, 1fr)', sm: 'repeat(3, 1fr)' });

        const handleEditProfile = () => {
            // TODO
        };

        return (
            <Grid rowGap={1} columnGap={2} templateColumns={columnSize} margin="1.5rem 0 0.5rem">
                <GridItem colSpan={1} display="flex" justifyContent={['flex-start', 'center']} alignItems="center">
                    { profile?.profile?.avatar
                        ? (<Avatar size={avatarSize} name={user.handle || 'User Avatar'} src={profile.profile.avatar} mr={['0', '1rem']} />)
                            : (<Avatar size={avatarSize} bg="brand.500" color={colorMode === 'light' ? 'light' : 'dark.800'} icon={<AiOutlineUser fontSize={avatarIconFontSize} />} mr={['0', '1rem']} />)}
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

    const renderFeaturedButton = (vehicle) => {
        if (vehicle.featured) {
            const handleOnClick = isAuthProfile ? toggleFeatured(vehicle.featured) : null;
            return (
                <Button variant="ghost" onClick={() => handleOnClick}>
                    <StarIcon color="brand.400" textShadow="0 0 1rem red" boxSize={5} />
                </Button>
            );
        }
        if (isAuthProfile) {
            return (
                <Button variant="ghost" onClick={() => toggleFeatured(vehicle.featured)}>
                    <StarIcon boxSize={5} />
                </Button>
            );
        }

        return null;
    };

    const renderFleet = () => (
        <SimpleGrid columns={['1', '1', '2']} spacing={10}>
            {
                currentFleet && currentFleet.map((vehicle) => (
                    <SlideFade in offsetY="4rem">
                        <Flex
                          direction="column"
                          borderRadius="md"
                          padding={['1rem', '1.5rem']}
                          bg={colorMode === 'light' ? 'slateGray.50' : 'slateGray.700'}
                          variant={vehicle.featured ? 'featuredCard' : 'card'}
                        >
                            <Flex justifyContent="space-between" pb="1rem">
                                <Heading as="h3" size="lg">{vehicle.title}</Heading>
                                <Flex alignItems="center">
                                    { renderFeaturedButton(vehicle) }
                                    { isAuthProfile && (
                                        <Button variant="ghost" onClick={() => toggleEdit()}>
                                            <EditIcon boxSize={5} />
                                        </Button>
                                    )}
                                </Flex>
                            </Flex>
                            { vehicle.thumbnail && <Image src={vehicle.thumbnail} alt={vehicle.title} /> }

                            <Grid rowGap={1} columnGap={2} templateColumns={['repeat(2, 1fr)', 'repeat(4, 1fr)']} paddingTop="1rem">
                                { Object.entries(vehicle.info).map((field) => {
                                    const label = formatFieldLabel(field[0]);
                                    const value = formatFieldValue(field[0], field[1]);
                                    return (
                                        <>
                                            <GridItem colSpan={2} justifySelf="start">
                                                <Text fontWeight="bold" fontSize="0.9rem">
                                                    {label}
                                                </Text>
                                            </GridItem>
                                            <GridItem colSpan={2} justifySelf="start">
                                                <Text fontSize="0.9rem">
                                                    {value}
                                                </Text>
                                            </GridItem>
                                        </>
                                    );
                                })}

                            </Grid>
                        </Flex>
                    </SlideFade>
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
