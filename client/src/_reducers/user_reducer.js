import {
    AUTH_USER,
    LOGIN_USER,
    LOGOUT_USER,
    REGISTER_USER,
    ADD_TEAM
} from '../_actions/types';

export default function(state={}, action) {
    switch(action.type) {
        case REGISTER_USER:
            return { ...state, register: action.payload }
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload }
        case AUTH_USER:
            return { ...state, userData: action.payload }
        case LOGOUT_USER:
            return { ...state }
        case ADD_TEAM:
            return { ...state, userData: { ...state.userData, teams: action.payload } }
        default:
            return state;
    }
}