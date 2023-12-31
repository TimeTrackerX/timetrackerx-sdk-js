import axios, { AxiosInstance } from 'axios';

interface BaseClassParams {
    baseUrl?: string;
    http?: AxiosInstance;
}

interface ClassParamsWithBaseUrl extends BaseClassParams {
    baseUrl: string;
}

interface ClassParamsWithHttp extends BaseClassParams {
    http: AxiosInstance;
}

export type ClassParams = ClassParamsWithHttp | ClassParamsWithBaseUrl;

export class BaseClass {
    defaultBaseUrl = 'http://localhost:4000';
    http: AxiosInstance;

    constructor({ baseUrl, http }: ClassParams) {
        this.http =
            http ||
            axios.create({
                baseURL: baseUrl,
            });
    }
}
