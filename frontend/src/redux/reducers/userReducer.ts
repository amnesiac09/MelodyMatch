import { GET_USERS, CREATE_USER, LOGIN_USER, EDIT_USER, RESET_PASSWORD, FORGET_PASSWORD, LOGOUT_USER, GET_USER } from '../constants';

const initialState = {
    users: [],
    isLoggedIn: true,
    userInfo: {},
    token: ''
}
const UsersReducer = (state=initialState, action: any) => {
    switch(action.type) {
        case GET_USERS:
            return {
                ...state,
                users: action.payload
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
        // case UPDATE_TASK:
        //     let post1 = state.posts.find(item => item._id === action.payload.postId)
        //     const taskToEdit = post1.tasks.find(item => item._id === action.payload.taskId)
        //     taskToEdit.fixed = action.payload.task.fixed
        // return {
        //     ...state,
        // }
        // case CHANGE_ORDER:
        //     state.posts.find(item => item._id === action.payload.id).tasks = action.payload.newList
        // return {
        //     posts: [...state.posts]
        // }
        // case CREATE_POST:
        // return {
        //     posts: [...state.posts, action.payload]
        // }
        default: return state
    }
}

export default UsersReducer