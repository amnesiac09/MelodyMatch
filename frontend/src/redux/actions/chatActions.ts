import { SET_ACTIVE_USER } from "../constants";
import { Action, Dispatch } from 'redux';

export const setActiveCHat = (data: any) => async (dispatch: Dispatch<Action>) => {
    dispatch({
        type: SET_ACTIVE_USER,
        payload: data
    })
};