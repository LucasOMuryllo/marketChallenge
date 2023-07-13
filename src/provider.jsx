import axios from "axios";

export const api = axios.create({
    baseURL: 'https://crudcrud.com/api/10400b94d74545d996708e3271eff95a/',
    timeout: 10000,
})