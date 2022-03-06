import React, {
    useState, useEffect, useLayoutEffect, useCallback,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Container,
    Box,
    Flex,
    Spinner,
} from '@chakra-ui/react';

import FleetPost from '../components/FleetPost';
import { setFleets } from '../redux/actions/fleet';

const Home = () => {
    const allFleets = useSelector((state) => state.fleet.allFleets);
    const allFleetsLoaded = useSelector((state) => state.fleet.allFleetsLoaded);
    const loading = useSelector((state) => state.fleet.loading);

    const dispatch = useDispatch();

    const [page, setPage] = useState(1);

    const loadPosts = useCallback(async (page) => {
        dispatch(setFleets(page));
    }, []);

    useEffect(() => {
        loadPosts(page);
    }, [page]);

    useLayoutEffect(() => {
        const handleScroll = () => {
            // on scroll to bottom of page, load more posts until end of list
            if ((window.innerHeight + window.scrollY) === document.body.offsetHeight) {
                if (!allFleetsLoaded) setPage((prev) => prev + 1);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [allFleetsLoaded]);

    return (
        <Container maxW="container.lg" p="1.5rem">
            <Flex justifyContent="center">
                <Box maxWidth="60%" width="100%">
                    { allFleets && allFleets.map((vehicle) => (
                        <Box mb="2rem">
                            <FleetPost vehicle={vehicle} showUserDetails />
                        </Box>
                    ))}
                    { loading && <Flex justifyContent="center"><Spinner color="brand" size="md" /></Flex>}
                </Box>
            </Flex>
        </Container>
    );
};

export default Home;
