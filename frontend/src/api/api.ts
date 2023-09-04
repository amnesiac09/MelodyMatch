import axios from 'axios';
axios.defaults.withCredentials = true

const url = 'http://localhost:8080/api';

// const config = {
//     headers: { 'Content-Type': 'application/json' },
//     withCredentials: true
// };

export const getMessages = async (id1: number, id2: number) => {
    return await axios.get(`${url}/chat/getMessages/${id1}&${id2}`)
}

