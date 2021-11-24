import React from 'react';
import {
    SimpleGrid,
    Skeleton,
} from '@chakra-ui/react';

const FleetPostSkeleton = () => (
    <SimpleGrid columns={['1', '1', '2']} spacing={10}>
        <Skeleton height="50px" />
        <Skeleton height="50px" />
    </SimpleGrid>
);

export default FleetPostSkeleton;
