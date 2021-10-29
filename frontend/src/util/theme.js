import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const config = {
    initialColorMode: 'light',
    useSystemColorMode: false,
    colors: {
        dark: '#252323',
        slateGray: '#70798C',
        pale: '#F5F1ED',
        tan: '#DAD2BC',
        brown: '#A99985',
        medRed: '#B6174B',
    },
    global: (props) => ({
        body: {
            fontFamily: 'body',
            color: mode('dark', 'pale')(props),
            bg: mode('pale', 'dark')(props),
            lineHeight: 'base',
        },
    }),
    components: {
        Button: {
            baseStyle: {
                textTransform: 'uppercase',
                fill: 'medRed',
            },
        },
    },
};

const theme = extendTheme({ config });

export default theme;
