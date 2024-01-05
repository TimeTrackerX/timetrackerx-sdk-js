import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';

import { handleDates } from '../functions/handleDates';

export class HttpBuilder {
    static build(config: CreateAxiosDefaults): AxiosInstance {
        const http = axios.create(config);
        return this.applyDefaults(http);
    }

    static applyDefaults(instance: AxiosInstance): AxiosInstance {
        return this.dateTransformer(instance);
    }

    protected static dateTransformer(instance: AxiosInstance): AxiosInstance {
        instance.interceptors.response.use(originalResponse => {
            handleDates(originalResponse.data);
            return originalResponse;
        });

        return instance;
    }
}
