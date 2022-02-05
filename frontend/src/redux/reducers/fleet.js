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
    RESET_STATUS,
} from '../types';

const initialState = {
    loading: false,
    error: null,
    allFleets: [],
    currentFleet: [],
    statusSuccess: false,
    allFleetsLoaded: false,
    allCurrentFleetLoaded: false,
};

export default (state = initialState, action) => {
    const { type, payload, error } = action;

    switch (type) {
    case SET_FLEETS_SUCCESS:
        return {
            ...state,
            loading: false,
            allFleets: [...state.allFleets, ...payload],
        };
    case SET_FLEETS_FAIL:
        return {
            ...state,
            loading: false,
            allFleetsLoaded: error?.response?.data?.detail === 'Invalid page.' && true,
        };
    case SET_FLEET_SUCCESS:
        return {
            ...state,
            loading: false,
            currentFleet: [...state.currentFleet, ...payload],
        };
    case SET_FLEET_FAIL:
        return {
            ...state,
            loading: false,
            allCurrentFleetLoaded: error?.response?.data?.detail === 'Invalid page.' && true,
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
            statusSuccess: true,
            allFleets: [payload, ...state.allFleets],
            currentFleet: [payload, ...state.currentFleet],
        };
    case CREATE_FLEET_POST_FAIL:
        return {
            ...state,
            loading: false,
            error,
        };
    case RESET_STATUS:
        return {
            ...state,
            statusSuccess: false,
            error: null,
            loading: false,
        };
    case UPDATE_FLEET_POST_SUCCESS:
        return {
            ...state,
            statusSuccess: true,
        };
    case UPDATE_FLEET_POST_FAIL:
        return {
            ...state,
            loading: false,
            error,
        };
    case DELETE_FLEET_POST_SUCCESS:
        return {
            ...state,
        };
    case LOADING_FLEET:
        return {
            ...state,
            loading: true,
        };
    case DELETE_FLEET_POST_FAIL:
    default:
        return initialState;
    }
};
