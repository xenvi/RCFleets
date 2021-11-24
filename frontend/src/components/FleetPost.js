import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
    Flex,
    Grid,
    GridItem,
    SlideFade,
    Button,
    Image,
    Link,
    Heading,
    Text,
    Divider,
    useColorMode,
} from '@chakra-ui/react';
import {
    EditIcon,
    StarIcon,
} from '@chakra-ui/icons';
import { formatFieldLabel, formatFieldValue, formatTimeAgo } from '../util/schema';
import ProfileAvatar from './Avatar';

const FleetPost = ({
    vehicle, isAuthProfile, showUserDetails,
}) => {
    const { colorMode } = useColorMode();
    const [postProfile, setPostProfile] = useState({});

    useEffect(async () => {
        if (showUserDetails) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            };
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/${vehicle.handle}`, config);
                setPostProfile(res.data);
            } catch {
                console.log('err post profile');
            }
        }
    }, []);

    // TODO: create expandable prop

    const toggleEdit = () => {
        // TODO
    };

    const toggleFeatured = async (featured) => {
        // TODO
    };

    const renderFeaturedButton = (vehicle) => {
        if (vehicle.featured) {
            const handleOnClick = isAuthProfile ? toggleFeatured(vehicle.featured) : null;
            return (
                <Button variant="ghost" onClick={() => handleOnClick}>
                    <StarIcon color="brand.400" textShadow="0 0 1rem red" />
                </Button>
            );
        }
        if (isAuthProfile) {
            return (
                <Button variant="ghost" onClick={() => toggleFeatured(vehicle.featured)}>
                    <StarIcon />
                </Button>
            );
        }

        return null;
    };

    return (
        <SlideFade in offsetY="4rem">
            <Flex
              direction="column"
              borderRadius="md"
              bg={colorMode === 'light' ? 'slateGray.50' : 'slateGray.700'}
              variant={vehicle.featured ? 'featuredCard' : 'card'}
            >
                { showUserDetails && (
                    <>
                        <Flex alignItems="center" justifyContent="space-between" width="100%" p="1rem">
                            <Flex alignItems="center">
                                <Link as={RouterLink} to={`/user/${postProfile.handle}`}>
                                    <ProfileAvatar profile={postProfile} size="sm" />
                                </Link>
                                <Link as={RouterLink} to={`/user/${postProfile.handle}`}>
                                    <Heading as="h6" size="md">
                                        {postProfile.handle}
                                    </Heading>
                                </Link>
                            </Flex>
                            <Text fontSize="xs">
                                { formatTimeAgo(vehicle.created_at) }
                            </Text>
                        </Flex>
                        <Divider colorScheme="brand" />
                    </>
                )}
                <Flex justifyContent="space-between" p="1rem">
                    <Heading as="h3" size="lg">{vehicle.title}</Heading>
                    <Flex alignItems="center">
                        { !showUserDetails && renderFeaturedButton(vehicle) }
                        { isAuthProfile && (
                            <Button variant="ghost" onClick={() => toggleEdit()}>
                                <EditIcon />
                            </Button>
                         )}
                    </Flex>
                </Flex>
                { vehicle.thumbnail && <Image src={vehicle.thumbnail} alt={vehicle.title} /> }

                <Grid rowGap={1} columnGap={2} templateColumns={['repeat(2, 1fr)', 'repeat(4, 1fr)']} p="1rem">
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
    );
};

FleetPost.defaultProps = {
    isAuthProfile: false,
    showUserDetails: false,
};

FleetPost.propTypes = {
    isAuthProfile: PropTypes.bool,
    showUserDetails: PropTypes.bool,
    vehicle: PropTypes.object.isRequired,
};

export default FleetPost;
