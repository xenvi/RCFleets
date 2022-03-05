import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
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
    children,
}) => {
    const alert = useSelector((state) => state.auth.alert);

    const dispatch = useDispatch();

    const history = useHistory();
    const toast = useToast();

    useEffect(() => {
        dispatch(checkAuthenticated());
        dispatch(loadUser());
        history.listen(() => {
            dispatch(clearErrors());
            dispatch(clearAlerts());
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

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;
