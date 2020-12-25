import axios from 'axios';

const baseUrl = '/api/persons';

const fetchAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
};

const create = newItem => {
    const request = axios.post(baseUrl, newItem);
    return request.then(response => response.data);
};

const update = (id, newItem) => {
    const request = axios.put(`${baseUrl}/${id}`, newItem);
    return request.then(response => response.data);
};

const remove = id => {
    const request = axios.delete(`${baseUrl}/${id}`);
    return request.then(response => response.data);
};

const services = { fetchAll, create, update, remove };

export default services;
