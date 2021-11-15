import {
    ALERT_SUCCESS,
    CLEAR_ALERTS,
    CLEAR_ERRORS,
    LOADING_UI,
} from '../types';

const initialState = {
    alert: null,
    error: null,
    loading: false,
};

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
    case LOADING_UI:
        return {
            ...state,
            loading: true,
        };
    case ALERT_SUCCESS:
        return {
            ...state,
            alert: payload,
        };
    case CLEAR_ERRORS:
        return {
            ...state,
            error: null,
        };
    case CLEAR_ALERTS:
        return {
            ...state,
            alert: null,
        };
    default:
        return state;
    }
};
