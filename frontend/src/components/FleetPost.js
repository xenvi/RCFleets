import React from 'react';
import PropTypes from 'prop-types';
import {
    Flex,
    Grid,
    GridItem,
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
import { formatFieldLabel, formatFieldValue } from '../util/schema';

const FleetPost = ({ vehicle, isAuthProfile }) => {
    const { colorMode } = useColorMode();

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

    return (
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
    );
};

FleetPost.propTypes = {
    isAuthProfile: PropTypes.bool.isRequired,
    vehicle: PropTypes.object.isRequired,
};

export default FleetPost;
