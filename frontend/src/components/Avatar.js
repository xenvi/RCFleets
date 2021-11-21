import React from 'react';
import PropTypes from 'prop-types';
import {
    Avatar,
    useColorMode,
} from '@chakra-ui/react';
import { useBreakpointValue } from '@chakra-ui/media-query';
import { AiOutlineUser } from 'react-icons/ai';

const ProfileAvatar = ({ profile, user, size }) => {
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
    default:
        avatarSize = useBreakpointValue({ base: 'lg', sm: 'xl', md: '2xl' });
        avatarIconFontSize = useBreakpointValue({ base: '2.5rem', sm: '3.5rem', md: '4.5rem' });
        break;
    }

    if (profile?.profile?.avatar) {
        return (
            <Avatar size={avatarSize} name={user.handle || 'User Avatar'} src={profile.profile.avatar} mr={['0', '1rem']} />
        );
    }
    return (
        <Avatar size={avatarSize} bg="brand.500" color={colorMode === 'light' ? 'light' : 'dark.800'} icon={<AiOutlineUser fontSize={avatarIconFontSize} />} mr={['0', '1rem']} />
    );
};

ProfileAvatar.propTypes = {
    profile: PropTypes.object.isRequired,
    size: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
};

export default ProfileAvatar;
