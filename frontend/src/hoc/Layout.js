import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { checkAuthenticated, loadUser } from '../actions/auth';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Layout = ({ children, checkAuthenticated, loadUser }) => {
    useEffect(() => {
        checkAuthenticated();
        loadUser();
    }, []);

    return (
        <div>
            <Navbar />
            {children}
            <Footer />
        </div>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default connect(null, { checkAuthenticated, loadUser })(Layout);
