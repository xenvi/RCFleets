import React from 'react';
import PropTypes from 'prop-types';
import {
    Avatar,
    useColorMode,
} from '@chakra-ui/react';
import { useBreakpointValue } from '@chakra-ui/media-query';
import { AiOutlineUser } from 'react-icons/ai';

const ProfileAvatar = ({
    size, marginRight, name, src, onClick,
}) => {
    const { colorMode } = useColorMode();
    let avatarSize = useBreakpointValue({ base: 'lg', sm: 'xl', md: '2xl' });
    let avatarIconFontSize = useBreakpointValue({ base: '2.5rem', sm: '3.5rem', md: '4.5rem' });

    switch (size) {
    case 'lg':
        avatarSize = useBreakpointValue({ base: 'lg', sm: 'xl', md: '2xl' });
        avatarIconFontSize = useBreakpointValue({ base: '2.5rem', sm: '3.5rem', md: '4.5rem' });
        break;
    case 'sm':
        avatarSize = useBreakpointValue({ base: 'xs', sm: 'sm' });
        avatarIconFontSize = useBreakpointValue({ base: '1rem', sm: '1.5rem' });
        break;
    case 'xs':
        avatarSize = useBreakpointValue({ base: 'xs' });
        avatarIconFontSize = useBreakpointValue({ base: '1rem' });
        break;
    default:
        avatarSize = useBreakpointValue({ base: 'lg', sm: 'xl', md: '2xl' });
        avatarIconFontSize = useBreakpointValue({ base: '2.5rem', sm: '3.5rem', md: '4.5rem' });
        break;
    }

    if (src) {
        return (
            <Avatar size={avatarSize} name={name || 'User Avatar'} src={src} mr={marginRight} onClick={onClick} cursor={onClick && 'pointer'} />
        );
    }
    return (
        <Avatar size={avatarSize} bg="brand.500" color={colorMode === 'light' ? 'light' : 'dark.800'} icon={<AiOutlineUser fontSize={avatarIconFontSize} />} mr={marginRight} onClick={onClick} cursor={onClick && 'pointer'} />
    );
};

ProfileAvatar.defaultProps = {
    marginRight: ['0.5rem', '1rem'],
    name: null,
};

ProfileAvatar.propTypes = {
    marginRight: PropTypes.array,
    name: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    size: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
};

export default ProfileAvatar;
