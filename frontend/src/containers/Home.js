import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    Container,
    Box,
    Grid,
    GridItem,
    Flex,
    Heading,
    Link,
    Text,
} from '@chakra-ui/react';

import ProfileAvatar from '../components/Avatar';
import FleetPost from '../components/FleetPost';
import { setFleets } from '../redux/actions/fleet';

const Home = ({
    allFleets, setFleets, loading, user,
}) => {
    const [fleetsData, setFleetsData] = useState([]);

    useEffect(() => {
        setFleets();
    }, []);

    useEffect(() => {
        if (Object.keys(allFleets).length !== 0) {
            setFleetsData(allFleets);
        }
    }, [allFleets]);

    // TODO: add loading functionality
    // TODO: create lazy loading functionality

    return (
        <Container maxW="container.lg" p="1.5rem">
            <Flex justifyContent="center">
                <Box maxWidth="60%">
                    { fleetsData?.map((vehicle) => (
                        <Box mb="2rem">
                            <FleetPost vehicle={vehicle} showUserDetails />
                        </Box>
                    ))}
                </Box>
            </Flex>
        </Container>
    );
};

const mapStateToProps = (state) => ({
    allFleets: state.fleet.allFleets,
    loading: state.fleet.loading,
    user: state.auth.user,
});

Home.propTypes = {
    allFleets: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    setFleets: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { setFleets })(Home);
