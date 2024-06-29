import axios from 'axios';
import { API_BASE_URL } from '../constants/constants';

interface IPostRequest {
    url: string;
    body?: Record<string, unknown>;
    headers?: Record<string, string>;
}

interface IPatchRequest {
    url: string;
    body?: Record<string, unknown>;
    headers?: Record<string, string>;
}

interface IGetRequest {
    url: string;
    params?: Record<string, unknown>;
    headers?: Record<string, string>;
}

interface IDeleteRequest {
    url: string;
    params?: Record<string, unknown>;
    headers?: Record<string, string>;
    body?: Record<string, unknown>;
}

export class ApiClient {
    static readonly host: string =  API_BASE_URL;

    constructor() {}

    static get({ url, params, headers }: IGetRequest) {
        return axios({
            method: 'GET',
            url: this.host + url,
            params,
            headers: {
                Authorization: localStorage.token,
                ...headers,
            },
        });
    }

    static post({ url, body, headers }: IPostRequest) {
        return axios({
            method: 'POST',
            url: this.host + url,
            data: body,
            headers: {
                Authorization: localStorage.token,
                ...headers,
            },
        });
    }

    static delete({ url, params, headers, body }: IDeleteRequest) {
        return axios({
            method: 'DELETE',
            url: this.host + url,
            params,
            data: body,
            headers: {
                Authorization: localStorage.token,
                ...headers,
            },
        });
    }

    static patch({ url, body, headers }: IPatchRequest) {
        return axios({
            method: 'PATCH',
            url: this.host + url,
            data: body,
            headers: {
                Authorization: localStorage.token,
                ...headers,
            },
        });
    }
}

