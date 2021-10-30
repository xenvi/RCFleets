import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const theme = extendTheme({
    initialColorMode: 'light',
    useSystemColorMode: false,
    colors: {
        dark: '#252323',
        slateGray: {
            50: '#ecf2ff',
            100: '#d1d7e2',
            200: '#b7bdc9',
            300: '#9ba2b1',
            400: '#808899',
            500: '#666e80',
            600: '#4e5664',
            700: '#383d49',
            800: '#20252f',
            900: '#050c17',
        },
        light: '#F8F7F9',
        tan: '#DAD2BC',
        brown: '#A99985',
        brand:
        {
            50: '#ffe7ec',
            100: '#f2c2c7',
            200: '#e49ca2',
            300: '#d7757e',
            400: '#ca4f59',
            500: '#b0353f',
            600: '#8a2831',
            700: '#641b22',
            800: '#3e0f14',
            900: '#1c0204',
        },
    },
    styles: {
        global: (props) => ({
            body: {
                fontFamily: 'body',
                color: mode('dark', 'light')(props),
                bg: mode('light', 'dark')(props),
                lineHeight: 'base',
            },
            a: {
                _hover: {
                    textDecoration: 'none !important',
                },
            },
        }),
    },
    components: {
        Input: {
            defaultProps: {
                focusBorderColor: 'brand.500',
            },
        },
        Link: {
            variants: {
                brand: (props) => ({
                    fontWeight: 'bold',
                    color: mode('brand.500', 'brand.300')(props),
                    _hover: {
                        color: mode('brand.600', 'brand.400')(props),
                    },
                }),
            },
        },
    },
});

export default theme;
