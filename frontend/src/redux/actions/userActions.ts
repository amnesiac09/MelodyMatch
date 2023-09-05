import {GET_USERS, CREATE_USER, LOGIN_USER, EDIT_USER, RESET_PASSWORD, FORGET_PASSWORD, LOGOUT_USER, GET_USER, SET_ACTIVE_USER, FILTER_USERS} from '../constants';
// import * as api from '../../api/usersApi';
import { Action, Dispatch } from 'redux';

export const addUser = (data: IUser) => async (dispatch: Dispatch<Action>) => {
    dispatch({
        type: CREATE_USER,
        payload: data
    })
};

export const logInUser = (data: any) => async (dispatch: Dispatch<Action>) => {
    dispatch({
        type: LOGIN_USER,
        payload: data
    })
};

export const logOutUser = () => async (dispatch: Dispatch<Action>) => {
    dispatch({
        type: LOGOUT_USER,
        payload: null
    })
};

export const forgetPasswordUser = (data: IForgetPasswordUserApiReq) => async (dispatch: Dispatch<Action>) => {
    dispatch({
        type: FORGET_PASSWORD,
        payload: data
    })
};

export const resetPasswordUser = (data: IResetPasswordUserApiReq) => async (dispatch: Dispatch<Action>) => {
    dispatch({
        type: RESET_PASSWORD,
        payload: data
    })
};

export const editUser = (data: IUser) => async (dispatch: Dispatch<Action>) => {
    dispatch({
        type: EDIT_USER,
        payload: data
    });
};

export const getUser = (data: {userInfo: IUser, token: string}) => async (dispatch: Dispatch<Action>) => {
    dispatch({
        type: GET_USER,
        payload: data
    });
};

export const setActiveUser = (data: any) => async (dispatch: Dispatch<Action>) => {
    dispatch({
        type: SET_ACTIVE_USER,
        payload: data
    })
};

export const filterUsers = (data: any) => async (dispatch: Dispatch<Action>) => {
    dispatch({
        type: FILTER_USERS,
        payload: data
    })
};

