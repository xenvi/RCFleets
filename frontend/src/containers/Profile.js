import React, { useState, useEffect } from 'react';
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
import axios from 'axios';

const Profile = ({ match, user }) => {
    const [profile, setProfile] = useState([]);
    const [fleet, setFleet] = useState([]);
    const [isAuthProfile, setIsAuthProfile] = useState([]);
    const [error, setError] = useState([]);

    const { handle } = match.params;
    const { colorMode } = useColorMode();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userRes = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/${handle}`);
                const fleetRes = await axios.get(`${process.env.REACT_APP_API_URL}/api/fleets/${userRes.data.id}`);

                setProfile(userRes.data);
                setFleet(fleetRes.data);

                if (userRes.data.handle === user.handle) {
                    setIsAuthProfile(true);
                }
            } catch (err) {
                setError(err);
            }
        };

        fetchData();
    }, []);

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
        await axios.get(`${process.env.REACT_APP_API_URL}/api/users/${handle}`);
    };

    // TODO: add loading state and display loader while data loads in
    // TODO: add error state and display error msg if data fails

    return (
        <Container maxW="container.lg" p="1.5rem">
            <SimpleGrid columns={['1', '1', '2']} spacing={10}>
                {
                    fleet && fleet.map((vehicle) => (
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
        </Container>
    );
};

export default Profile;
