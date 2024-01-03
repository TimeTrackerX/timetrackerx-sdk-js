import axios, { AxiosInstance } from 'axios';

import { TokenStorageInterface } from './TokenStorageInterface';
import { MemoryTokenStorage } from '../classes/MemoryTokenStorage';
import { TokenManager } from '../classes/TokenManager';

interface BaseClassParams {
    baseUrl?: string;
    http?: AxiosInstance;
    tokenStorage?: TokenStorageInterface;
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
    tokenManager: TokenManager;

    constructor({ baseUrl, http, tokenStorage }: ClassParams) {
        this.tokenManager = new TokenManager(tokenStorage || new MemoryTokenStorage());
        this.http =
            http ||
            axios.create({
                baseURL: baseUrl,
            });
    }
}
