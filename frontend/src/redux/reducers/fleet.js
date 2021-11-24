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
} from '../types';

const initialState = {
    loading: false,
    allFleets: [],
    currentFleet: [],
};

export default (state = initialState, action) => {
    const { type, payload } = action;

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
            currentFleet: payload,
        };
    case CREATE_FLEET_POST_FAIL:
        return {
            ...state,
            loading: false,
            currentFleet: [],
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
            loading: false,
        };
    case DELETE_FLEET_POST_FAIL:
    case UPDATE_FLEET_POST_FAIL:
    default:
        return initialState;
    }
};
