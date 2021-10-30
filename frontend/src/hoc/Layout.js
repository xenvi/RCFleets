import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    Flex,
} from '@chakra-ui/react';
import { checkAuthenticated, loadUser } from '../actions/auth';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Layout = ({ children, checkAuthenticated, loadUser }) => {
    useEffect(() => {
        checkAuthenticated();
        loadUser();
    }, []);

    return (
        <Flex minH="100vh" direction="column">
            <Navbar />
            <Flex flex="1">
                {children}
            </Flex>
            <Footer />
        </Flex>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default connect(null, { checkAuthenticated, loadUser })(Layout);
