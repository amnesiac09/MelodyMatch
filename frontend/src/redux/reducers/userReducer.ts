import { GET_USERS, CREATE_USER, LOGIN_USER, EDIT_USER, RESET_PASSWORD, FORGET_PASSWORD, LOGOUT_USER, GET_USER, SET_ACTIVE_USER, FILTER_USERS } from '../constants';

const initialState = {
    users: [],
    isLoggedIn: true,
    userInfo: {
        // id: 1,
        // username: '2',
        // password: 's',
        // name: 'saba',
        // email: 'sa',
        // bio: '',
        // likedUsers:	[5],
        // matchedUsers:	[11],
        // mediaFilenames:	[],
        // newMatchedUsersCount: 0
    },
    token: '',
    activeUser: null,
    filterData: null
}
const UsersReducer = (state=initialState, action: any) => {
    switch(action.type) {
        case GET_USERS:
            return {
                ...state,
                users: action.payload
            }
        case SET_ACTIVE_USER:
            return {
                ...state,
                activeUser: action.payload
            }
        case CREATE_USER:
            return {
                ...state,
                isLoggedIn: true,
                userInfo: action.payload,
                users: [...state.users, action.payload]
            }
        case LOGIN_USER:
            return {
                ...state,
                isLoggedIn: true,
                userInfo: action.payload,
                users: [...state.users, action.payload]
            }
        case LOGOUT_USER:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: {}
            }
        case EDIT_USER:
            return {
                ...state,
                isLoggedIn: true,
                userInfo: action.payload
            }
        case RESET_PASSWORD:
            return {
                ...state
            }
        case FORGET_PASSWORD:
            return {
                ...state
            }
        case GET_USER:
            return {
                ...state,
                isLoggedIn: true,
                userInfo: action.payload.userInfo,
                token: action.payload.token
            }
        case FILTER_USERS:
            return {
                ...state,
                filterData: action.payload
            }
        default: return state
    }
}

export default UsersReducer