import { instance } from ".";

const BASE_URL = "user";

export const createUser = (user) => {
    return instance.post(`${BASE_URL}/create`, user);
};

export const getUsers = (body) => {
    return instance.post(`${BASE_URL}`, body);
};

export const updateUser = (user) => {
    return instance.put(`${BASE_URL}/${user._id}`, user);
};

export const getUserById = (id) => {
    return instance.get(`${BASE_URL}/${id}`);
};