import axios from 'axios';

const url = 'http://localhost:8080/api';

const config = {
    headers: { 'Content-Type': 'application/json' },
};

export const getMessages = async (username1: string, username2: string) => {
    return await axios.get(`${url}/chat/getMessages/${username1}&${username2}`, config)
        .then(res => {
            return res.data
        })
}

export const getUser = async (id: number) => {
    return await axios.get(`${url}/user/get/${id}`, config)
}

export const editUser = async (data: any) => {
    return await axios.put(`${url}/user/update`, data)
}

export const addUser = async (data: any) => {
    return await axios.post(`${url}/user/add`, data)
}
export const loginUser = async (data: any) => {
    return await axios.post(`${url}/user/login`, data)
}

export const getMatchedUsers = async (username: string) => {
    return await axios.get(`${url}/user/getMatchedUsers/${username}`, config)
}


