import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_CONFIRM_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    LOGOUT,
    SET_PROFILE_SUCCESS,
    SET_PROFILE_FAIL,
    UNSET_PROFILE,
} from '../types';

const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: null,
    user: null,
    alert: null,
    error: null,
    loading: false,
    profile: {},
};

export default (state = initialState, action) => {
    const { type, payload, error } = action;

    switch (type) {
    case AUTHENTICATED_SUCCESS:
        return {
            ...state,
            isAuthenticated: true,
        };
    case AUTHENTICATED_FAIL:
        return {
            ...state,
            isAuthenticated: false,
        };
    case LOGIN_SUCCESS:
        localStorage.setItem('access', payload.access);
        return {
            ...state,
            isAuthenticated: true,
            access: payload.access,
            refresh: payload.refresh,
            loading: false,
        };
    case SIGNUP_SUCCESS:
        return {
            ...state,
            isAuthenticated: false,
            loading: false,
        };
    case LOGIN_FAIL:
    case SIGNUP_FAIL:
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        return {
            ...state,
            isAuthenticated: false,
            access: null,
            refresh: null,
            user: null,
            error,
            loading: false,
        };
    case LOGOUT:
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        return initialState;
    case USER_LOADED_SUCCESS:
        return {
            ...state,
            user: payload,
        };
    case USER_LOADED_FAIL:
        return {
            ...state,
            user: null,
        };
    case PASSWORD_RESET_FAIL:
    case PASSWORD_RESET_CONFIRM_FAIL:
    case ACTIVATION_FAIL:
        return {
            ...state,
            loading: false,
            error,
        };
    case PASSWORD_RESET_SUCCESS:
    case PASSWORD_RESET_CONFIRM_SUCCESS:
    case ACTIVATION_SUCCESS:
        return {
            ...state,
            loading: false,
        };
    case SET_PROFILE_SUCCESS:
        return {
            ...state,
            profile: action.payload,
            loading: false,
        };
    case SET_PROFILE_FAIL:
    case UNSET_PROFILE:
        return {
            ...state,
            profile: {},
            loading: false,
        };
    default:
        return state;
    }
};
