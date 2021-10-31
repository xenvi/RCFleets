import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const theme = extendTheme({
    initialColorMode: 'light',
    useSystemColorMode: false,
    colors: {
        dark: {
            50: '#f9f0f0',
            100: '#dad8d8',
            200: '#bebebe',
            300: '#a4a4a4',
            400: '#8a8a8a',
            500: '#717171',
            600: '#585858',
            700: '#403f3f',
            800: '#272525',
            900: '#130a0a',
        },
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
                color: mode('dark.800', 'light')(props),
                bg: mode('light', 'dark.800')(props),
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
        Button: {
            variants: {
                brand: {
                    fontWeight: 'bold',
                    lineHeight: '0',
                    color: 'light',
                    backgroundColor: 'brand.500',
                    _hover: {
                        color: 'light',
                        backgroundColor: 'brand.600',
                    },
                    _loading: {
                        _hover: {
                            backgroundColor: 'brand.500',
                        },
                    },
                },
                ghost: {
                    borderRadius: '50% 25%',
                },
                reveal: (props) => ({
                    backgroundColor: mode('slateGray.50', 'slateGray.300')(props),
                }),
            },
        },
        Input: {
            baseStyle: {
                _autofill: 'brand.500',
            },
            defaultProps: {
                focusBorderColor: 'brand.500',
            },
        },
        Link: {
            variants: {
                brand: (props) => ({
                    fontWeight: 'bold',
                    color: 'brand.500',
                    _hover: {
                        color: mode('brand.600', 'brand.300')(props),
                    },
                }),
            },
        },
        Text: {
            variants: {
                error: (props) => ({
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    fontStyle: 'italic',
                    color: mode('brand.500', 'brand.300')(props),
                }),
            },
        },
    },
});

export default theme;
