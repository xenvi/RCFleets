import React from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    Box,
} from '@chakra-ui/react';

const Toast = ({
    color, bgColor, text,
}) => (
    <Box p={4} bg={bgColor} borderRadius="md">
        <Text color={color} fontWeight="500">{text}</Text>
    </Box>
);

Toast.propTypes = {
    bgColor: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
};

export default Toast;
