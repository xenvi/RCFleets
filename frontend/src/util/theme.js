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
                color: mode('dark.700', 'light')(props),
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
            baseStyle: {
                _focus: {
                    outline: '2px solid #b0353f',
                    boxShadow: 'none',
                },
            },
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
                    padding: '0.5rem',
                },
                reveal: (props) => ({
                    backgroundColor: mode('slateGray.50', 'slateGray.300')(props),
                }),
                fullLeftAlign: (props) => ({
                    width: '100%',
                    justifyContent: 'flex-start',
                    padding: '1rem',
                    fontSize: '0.9rem',
                    borderRadius: 'none',
                    _hover: {
                        backgroundColor: mode('slateGray.50', 'slateGray.600')(props),
                    },
                }),
                fullCenterAlign: (props) => ({
                    width: '100%',
                    justifyContent: 'center',
                    padding: '1rem',
                    fontSize: '0.9rem',
                    borderRadius: 'none',
                    _hover: {
                        backgroundColor: mode('slateGray.50', 'slateGray.600')(props),
                    },
                }),
            },
        },
        Input: {
            defaultProps: {
                focusBorderColor: 'brand.500',
            },
        },
        NumberInput: {
            defaultProps: {
                focusBorderColor: 'brand.500',
            },
        },
        Textarea: {
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
                error: {
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    fontStyle: 'italic',
                    color: 'brand.300',
                },
                fullLeftAlign: {
                    width: '100%',
                    justifyContent: 'flex-start',
                    padding: '1rem',
                    fontSize: '0.9rem',
                    borderRadius: 'none',
                },
            },
        },
        Container: {
            variants: {
                nav: (props) => ({
                    backgroundColor: mode('light', 'dark.800')(props),
                    zIndex: 999,
                    position: 'sticky',
                    top: '0',
                }),
            },
        },
        Drawer: {
            baseStyle: (props) => ({
                dialog: {
                    color: mode('dark.800', 'light')(props),
                    backgroundColor: mode('light', 'dark.800')(props),
                },
                closeButton: {
                    borderRadius: '50% 25%',
                    top: 5,
                    insetEnd: 5,
                },
                body: {
                    padding: '1.75rem',
                },
            }),
        },
        Flex: {
            variants: {
                card: {
                    boxShadow: 'lg',
                },
                featuredCard: {
                    boxShadow: '0 0.5rem 1.5rem brand.300',
                },
            },
        },
        Popover: {
            baseStyle: {
                closeButton: {
                    borderRadius: '50% 25%',
                },
            },
        },
        Tabs: {
            variants: {
                variantLine: (props) => ({
                    root: {
                        border: '1px',
                        borderColor: mode('blackAlpha.300', 'whiteAlpha.300')(props),
                        boxShadow: '0 0 0.25rem slateGray.100',
                    },
                    tab: {
                        opacity: 0.7,
                        borderStart: '2px solid',
                        borderColor: 'transparent',
                        _selected: {
                            borderStart: '2px solid',
                            borderColor: 'brand.500',
                            opacity: 1,
                        },
                        _hover: {
                            bg: mode('slateGray.50', 'whiteAlpha.100')(props),
                            borderStart: '2px solid',
                            borderColor: 'brand.500',
                        },
                        _active: {
                            bg: mode('slateGray.50', 'whiteAlpha.100')(props),
                        },
                        _disabled: {
                            opacity: 0.4,
                            cursor: 'not-allowed',
                        },
                    },
                    tablist: {
                        borderEnd: '1px',
                        borderColor: mode('blackAlpha.300', 'whiteAlpha.300')(props),
                    },
                }),
            },
        },
    },
});

export default theme;
