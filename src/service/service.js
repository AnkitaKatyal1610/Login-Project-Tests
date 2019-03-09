import axios from 'axios'

const baseUrl = 'https://reqres.in/api'
export const baseService = axios.create({ baseURL: baseUrl });

export const login = (user) => {
    return baseService.post('/login', user);
}

export const getUsers = (params) => {
    return baseService.get(`/users?page=${params}`);
}
