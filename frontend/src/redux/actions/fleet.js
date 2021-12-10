import axios from 'axios';
import {
    SET_FLEETS_SUCCESS,
    SET_FLEETS_FAIL,
    SET_FLEET_SUCCESS,
    SET_FLEET_FAIL,
    UNSET_FLEET,
    CREATE_FLEET_POST_SUCCESS,
    CREATE_FLEET_POST_FAIL,
    UPDATE_FLEET_POST_SUCCESS,
    UPDATE_FLEET_POST_FAIL,
    DELETE_FLEET_POST_SUCCESS,
    DELETE_FLEET_POST_FAIL,
    ALERT_SUCCESS,
    CLEAR_ALERTS,
    CLEAR_ERRORS,
    LOADING_FLEET,
    RESET_STATUS,
} from '../types';
import getCookie from '../../util/getCookie';

export const setFleets = () => async (dispatch) => {
    dispatch({ type: LOADING_FLEET });

    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/fleets/`, config);

        dispatch({
            type: SET_FLEETS_SUCCESS,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: SET_FLEETS_FAIL,
            error: err,
        });
    }
};

export const setFleet = (userId) => async (dispatch) => {
    dispatch({ type: LOADING_FLEET });

    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/fleets/${userId}`, config);

        dispatch({
            type: SET_FLEET_SUCCESS,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: SET_FLEET_FAIL,
            error: err,
        });
    }
};

export const createFleetPost = (fleetData, userId) => async (dispatch) => {
    dispatch({ type: LOADING_FLEET });

    const csrftoken = getCookie('csrftoken');
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken': csrftoken,
        },
    };

    const body = fleetData;

    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/api/fleets/create/`, body, config);

        dispatch({
            type: CREATE_FLEET_POST_SUCCESS,
        });

        dispatch(setFleets());
        dispatch(setFleet(userId));
    } catch (err) {
        dispatch({
            type: CREATE_FLEET_POST_FAIL,
            error: err.response.data,
        });
    }
};

export const updateFleetPost = (fleetData, fleetId, userId, method) => async (dispatch) => {
    dispatch({ type: LOADING_FLEET });

    const csrftoken = getCookie('csrftoken');
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken': csrftoken,
        },
    };

    const body = fleetData;

    try {
        if (method === 'patch') {
            await axios.patch(`${process.env.REACT_APP_API_URL}/api/fleets/update/${fleetId}`, body, config);
        } else {
            await axios.put(`${process.env.REACT_APP_API_URL}/api/fleets/update/${fleetId}`, body, config);
        }

        dispatch({
            type: UPDATE_FLEET_POST_SUCCESS,
        });

        dispatch(setFleets());
        dispatch(setFleet(userId));
    } catch (err) {
        dispatch({
            type: UPDATE_FLEET_POST_FAIL,
            error: err.response.data,
        });
    }
};

export const deleteFleetPost = (fleetId, userId) => async (dispatch) => {
    dispatch({ type: LOADING_FLEET });

    const csrftoken = getCookie('csrftoken');
    const config = {
        headers: {
            'X-CSRFToken': csrftoken,
        },
    };

    try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/fleets/delete/${fleetId}`, config);

        dispatch({
            type: DELETE_FLEET_POST_SUCCESS,
        });

        dispatch(setFleets());
        dispatch(setFleet(userId));
    } catch (err) {
        dispatch({
            type: DELETE_FLEET_POST_FAIL,
            error: err.response.data,
        });
    }
};

export const unsetFleet = () => (dispatch) => {
    dispatch({
        type: UNSET_FLEET,
    });
};

export const resetStatus = () => (dispatch) => {
    dispatch({
        type: RESET_STATUS,
    });
};
