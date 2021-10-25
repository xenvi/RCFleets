import React from 'react';
import PropTypes from 'prop-types';
import Navbar from '../components/Navbar';

const Layout = ({ children }) => (
    <div>
        <Navbar />
        {children}
    </div>
);

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;
