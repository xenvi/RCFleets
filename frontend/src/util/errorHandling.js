/*  Formats form errors to match django auth api error response:
    errorType: matches Input isInvalid check to highlight incorrect input fields
    errorMsg: error message to be displayed to user
*/

import React from 'react';
import {
    Stack,
    Text,
} from '@chakra-ui/react';

export const mapFormErrors = (formErrors) => (
    Object.entries(formErrors)
);

export const formatFormErrors = (errorType, errorMsg) => (
    [[errorType, [errorMsg]]]
);

export const renderFormErrors = (formErrors) => (
    <Stack spacing={1}>
        {formErrors.map((errorType) => {
                if (Array.isArray(errorType[1])) {
                   return errorType[1].map((error) => (
                       <Text variant="error">
                           {error.charAt(0).toUpperCase() + error.slice(1)}
                       </Text>
                    ));
                } if (Array.isArray(errorType[0])) {
                    return (
                        <Text variant="error">
                            {errorType[0].charAt(0).toUpperCase() + errorType[0].slice(1)}
                        </Text>
                    );
                }
                return (
                    <Text variant="error">
                        {errorType[1].charAt(0).toUpperCase() + errorType[1].slice(1)}
                    </Text>
                );
            })}
    </Stack>
);
