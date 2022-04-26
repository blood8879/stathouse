import axios from 'axios';
import {
    REGISTER_USER,
    LOGIN_USER,
    AUTH_USER,
    LOGOUT_USER,
    ADD_TEAM
} from './types';
import { USER_SERVER } from '../components/Config';

export function registerUser(dataToSubmit) {
    const request = axios.post(`${USER_SERVER}/register`, dataToSubmit)
        .then(response => response.data);

    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function loginUser(dataToSubmit) {
    const request = axios.post(`${USER_SERVER}/login`, dataToSubmit)
        .then(response => response.data);

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function auth() {
    const request = axios.get(`${USER_SERVER}/auth`)
        .then(response => response.data);

    return {
        type: AUTH_USER,
        payload: request
    }
}

export function logoutUser() {
    const request = axios.get(`${USER_SERVER}/logout`)
    .then(response => response.data);

    return {
        type: LOGOUT_USER,
        payload: request
    }
}

export function addTeam(body) {

    const request = axios.post('/api/teams', body)
    .then(response => response.data);

    return {
        type: ADD_TEAM,
        payload: request
    }
}