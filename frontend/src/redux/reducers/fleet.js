import {
    SET_FLEETS,
    SET_FLEET,
    UNSET_FLEET,
    CREATE_FLEET_POST_SUCCESS,
    CREATE_FLEET_POST_FAIL,
    UPDATE_FLEET_POST_SUCCESS,
    UPDATE_FLEET_POST_FAIL,
    DELETE_FLEET_POST_SUCCESS,
    DELETE_FLEET_POST_FAIL,
} from '../types';

const initialState = {
    loading: false,
    fleetposts: [],
    fleetpost: [],
};

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
    case SET_FLEETS:
        return {
            ...state,
            loading: false,
            fleetposts: payload,
        };
    case SET_FLEET:
        return {
            ...state,
            loading: false,
            fleetpost: payload,
        };
    case UNSET_FLEET:
        return {
            ...state,
            fleetpost: {},
        };
    case CREATE_FLEET_POST_SUCCESS:
        return {
            ...state,
            loading: false,
            fleetpost: payload,
        };
    case CREATE_FLEET_POST_FAIL:
        return {
            ...state,
            loading: false,
            fleetpost: [],
        };
    case UPDATE_FLEET_POST_SUCCESS:
        return {
            ...state,
            fleetpost: payload,
        };
    case DELETE_FLEET_POST_SUCCESS:
        return {
            ...state,
            fleetpost: [],
        };
    case DELETE_FLEET_POST_FAIL:
    case UPDATE_FLEET_POST_FAIL:
    default:
        return state;
    }
};
