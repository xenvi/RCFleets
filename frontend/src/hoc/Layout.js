import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
    Flex,
    useToast,
} from '@chakra-ui/react';
import {
    checkAuthenticated,
    loadUser,
    clearErrors,
    clearAlerts,
} from '../redux/actions/auth';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Layout = ({
    children, checkAuthenticated, loadUser, alert, clearErrors, clearAlerts,
}) => {
    const history = useHistory();
    const toast = useToast();

    useEffect(() => {
        checkAuthenticated();
        loadUser();
        history.listen(() => {
            clearErrors();
            clearAlerts();
        });
    }, []);

    return (
        <Flex minH="100vh" direction="column">
            <Navbar />
            <Flex flex="1">
                { alert && toast({
                    title: alert,
                    status: 'success',
                    position: 'top',
                    isClosable: true,
                })}
                {children}
            </Flex>
            <Footer />
        </Flex>
    );
};

const mapStateToProps = (state) => ({
    alert: state.auth.alert,
    error: state.auth.error,
});

Layout.propTypes = {
    alert: PropTypes.string.isRequired,
    checkAuthenticated: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    clearAlerts: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    loadUser: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
    checkAuthenticated, loadUser, clearErrors, clearAlerts,
})(Layout);
