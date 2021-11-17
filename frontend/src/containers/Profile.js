import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    Flex,
    Container,
    Box,
    Grid,
    GridItem,
    SimpleGrid,
    SlideFade,
    Button,
    Image,
    Heading,
    Text,
    useColorMode,
} from '@chakra-ui/react';
import {
    EditIcon,
    StarIcon,
} from '@chakra-ui/icons';

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
            console.log('profile', profile);
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

    };

    const toggleFeatured = async (featured) => {
        // await axios.get(`${process.env.REACT_APP_API_URL}/api/users/${handle}`);
    };

    // TODO: add loading state and display loader while data loads in
    // TODO: add error state and display error msg if data fails

    const renderProfile = () => (
        <>

        </>
    );

    const renderFleet = () => (
        <SimpleGrid columns={['1', '1', '2']} spacing={10}>
            {
                currentFleet && currentFleet.map((vehicle) => (
                    <SlideFade in offsetY="4rem">
                        <Flex
                          direction="column"
                          borderRadius="md"
                          padding={['1rem', '1.5rem']}
                          bg={colorMode === 'light' ? 'slateGray.100' : 'slateGray.600'}
                          variant={vehicle.featured ? 'featuredCard' : 'card'}
                        >
                            <Flex justifyContent="space-between" pb="1rem">
                                <Heading as="h3" size="lg">{vehicle.title}</Heading>
                                <Flex alignItems="center">
                                    { vehicle.featured ? (
                                        <Button variant="ghost" onClick={() => toggleFeatured(vehicle.featured)}>
                                            <StarIcon color="brand.400" textShadow="0 0 1rem red" boxSize={5} />
                                        </Button>
                                    ) : (
                                        <Button variant="ghost" onClick={() => toggleFeatured(vehicle.featured)}>
                                            <StarIcon boxSize={5} />
                                        </Button>
                                    )}
                                    { isAuthProfile && (
                                        <Button variant="ghost" onClick={() => toggleEdit()}>
                                            <EditIcon boxSize={5} />
                                        </Button>
                                    )}
                                </Flex>
                            </Flex>
                            { vehicle.thumbnail && <Image src={vehicle.thumbnail} alt={vehicle.title} /> }

                            <Grid rowGap={1} columnGap={2} templateColumns="repeat(4, 1fr)" paddingTop="1rem">
                                { Object.entries(vehicle.info).map((field) => {
                                    const label = formatFieldLabel(field[0]);
                                    const value = formatFieldValue(field[0], field[1]);
                                    return (
                                        <>
                                            <GridItem colSpan={2}>
                                                <Text fontWeight="bold" fontSize="0.9rem">
                                                    {label}
                                                </Text>
                                            </GridItem>
                                            <GridItem colSpan={2}>
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

    return (
        <Container maxW="container.lg" p="1.5rem">
            {
               renderProfile()
            }
            {
               renderFleet()
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
