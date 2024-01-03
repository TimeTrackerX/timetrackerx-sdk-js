import RestFulApi from '../../src/shared/RestFulApi';

export interface BaseApiItem {
    name: string;
    enabled?: boolean;
}

export interface ApiItem extends BaseApiItem {
    id: string;
    enabled: boolean;
}
export class ApiClass extends RestFulApi<ApiItem, BaseApiItem, BaseApiItem> {
    uri: string = 'Items';
}
