import axios from 'axios';

const endpoint = `endpoint removed`;

const getAll = () => {
    const config = {
        method: 'GET',
        url: `${endpoint}`,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config);
};

const getById = (id) => {
    const config = {
        method: 'GET',
        url: `${endpoint}/a route/${id}`,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config);
};

export { getAll, getById };
