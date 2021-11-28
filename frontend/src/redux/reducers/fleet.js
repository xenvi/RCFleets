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
    LOADING_FLEET,
    RESET_CREATE_STATUS,
} from '../types';

const initialState = {
    loading: false,
    error: null,
    allFleets: [],
    currentFleet: [],
    createSuccess: false,
};

export default (state = initialState, action) => {
    const { type, payload, error } = action;

    switch (type) {
    case SET_FLEETS_SUCCESS:
        return {
            ...state,
            loading: false,
            allFleets: payload,
        };
    case SET_FLEETS_FAIL:
        return {
            ...state,
            loading: false,
            allFleets: [],
        };
    case SET_FLEET_SUCCESS:
        return {
            ...state,
            loading: false,
            currentFleet: payload,
        };
    case SET_FLEET_FAIL:
        return {
            ...state,
            loading: false,
            currentFleet: [],
        };
    case UNSET_FLEET:
        return {
            ...state,
            currentFleet: [],
        };
    case CREATE_FLEET_POST_SUCCESS:
        return {
            ...state,
            loading: false,
            createSuccess: true,
        };
    case CREATE_FLEET_POST_FAIL:
        return {
            ...state,
            loading: false,
            error,
        };
    case RESET_CREATE_STATUS:
        return {
            ...state,
            createSuccess: false,
        };
    case UPDATE_FLEET_POST_SUCCESS:
        return {
            ...state,
            currentFleet: payload,
        };
    case DELETE_FLEET_POST_SUCCESS:
        return {
            ...state,
            currentFleet: [],
        };
    case LOADING_FLEET:
        return {
            ...state,
            loading: true,
        };
    case DELETE_FLEET_POST_FAIL:
    case UPDATE_FLEET_POST_FAIL:
    default:
        return initialState;
    }
};
