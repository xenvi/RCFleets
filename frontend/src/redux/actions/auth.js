import axios from 'axios';
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
    ALERT_SUCCESS,
    CLEAR_ALERTS,
    CLEAR_ERRORS,
    SET_PROFILE_SUCCESS,
    SET_PROFILE_FAIL,
    SET_AUTH_PROFILE_SUCCESS,
    SET_AUTH_PROFILE_FAIL,
    UNSET_PROFILE,
    LOADING_AUTH,
} from '../types';

export const showAlert = (message) => async (dispatch) => {
    dispatch({
        type: ALERT_SUCCESS,
        payload: message,
    });
};

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    });
};
export const clearAlerts = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ALERTS,
    });
};

export const setProfile = (handle) => async (dispatch) => {
    dispatch({ type: LOADING_AUTH });

    const config = {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/${handle}`, config);

        dispatch({
            type: SET_PROFILE_SUCCESS,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: SET_PROFILE_FAIL,
        });
    }
};

export const unsetProfile = () => async (dispatch) => {
    dispatch({
        type: UNSET_PROFILE,
    });
};

export const checkAuthenticated = () => async (dispatch) => {
    const accessToken = localStorage.getItem('access');
    if (accessToken) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        };

        const body = JSON.stringify({ token: accessToken });

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/verify/`, body, config);
            if (res.data.code !== 'token_not_valid') {
                dispatch({
                    type: AUTHENTICATED_SUCCESS,
                });
            } else {
                dispatch({
                    type: AUTHENTICATED_FAIL,
                });
            }
        } catch (err) {
            dispatch({
                type: AUTHENTICATED_FAIL,
            });
        }
    } else {
        dispatch({
            type: AUTHENTICATED_FAIL,
        });
    }
};

export const loadUser = () => async (dispatch) => {
    const accessToken = localStorage.getItem('access');
    if (accessToken) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `JWT ${accessToken}`,
                Accept: 'application/json',
            },
        };

        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/users/me/`, config);

            dispatch({
                type: USER_LOADED_SUCCESS,
                payload: res.data,
            });
        } catch (err) {
            dispatch({
                type: USER_LOADED_FAIL,
                error: err.response.data,
            });
        }
    } else {
        dispatch({
            type: USER_LOADED_FAIL,
        });
    }
};

export const login = (email, password, history) => async (dispatch) => {
    dispatch({ type: LOADING_AUTH });

    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/create/`, body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
        });

        dispatch(loadUser());

        history.push('/');
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL,
            error: err,
        });
    }
};

export const signup = (handle, email, password, rePassword, history) => async (dispatch) => {
    dispatch({ type: LOADING_AUTH });

    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const body = JSON.stringify({
        handle, email, password, re_password: rePassword,
    });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/`, body, config);

        dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data,
        });

        history.push('/signup/success');
    } catch (err) {
        dispatch({
            type: SIGNUP_FAIL,
            error: err.response.data,
        });
    }
};

export const verify = (uid, token, history) => async (dispatch) => {
    dispatch({ type: LOADING_AUTH });

    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const body = JSON.stringify({ uid, token });

    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/activation/`, body, config);

        dispatch({
            type: ACTIVATION_SUCCESS,
        });

        history.push('/login');

        dispatch({
            type: ALERT_SUCCESS,
            payload: 'Account successfully verified! Bash on!',
        });
    } catch (err) {
        dispatch({
            type: ACTIVATION_FAIL,
        });
    }
};

export const logout = (history) => async (dispatch) => {
    dispatch({
        type: LOGOUT,
    });
    history.push('/');
};

export const resetPassword = (email, history) => async (dispatch) => {
    dispatch({ type: LOADING_AUTH });

    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const body = JSON.stringify({ email });

    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password/`, body, config);
        dispatch({
            type: PASSWORD_RESET_SUCCESS,
        });

        history.push('/reset-password/success');
    } catch (err) {
        dispatch({
            type: PASSWORD_RESET_FAIL,
            error: err.response.data,
        });
    }
};

export const resetPasswordConfirm = (uid, token, newPassword, reNewPassword, history) => async (dispatch) => {
    dispatch({ type: LOADING_AUTH });

    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const body = JSON.stringify({
        uid, token, new_password: newPassword, re_new_password: reNewPassword,
    });

    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password_confirm/`, body, config);
        dispatch({
            type: PASSWORD_RESET_CONFIRM_SUCCESS,
        });

        history.push('/');

        dispatch({
            type: ALERT_SUCCESS,
            payload: 'Password reset successful! Bash on!',
        });
    } catch (err) {
        dispatch({
            type: PASSWORD_RESET_CONFIRM_FAIL,
            error: err.response.data,
        });
    }
};
