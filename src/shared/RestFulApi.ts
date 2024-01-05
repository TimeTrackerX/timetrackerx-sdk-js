import { BaseClass } from './BaseClass';

interface BaseParams {}

interface ListParams extends BaseParams {
    limit?: number;
    page?: number;
}

interface CreateParams<Entity> extends BaseParams {
    payload: Partial<Entity>;
}

interface UpdateParams<Entity> extends BaseParams {
    id: number;
    payload: Partial<Entity>;
}

export interface WithIdParams extends BaseParams {
    id: number;
}

interface ItemPagination {
    limit: number;
    totalItems: number;
    page: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
}

export interface PaginatedItems<Entity> {
    pagination: ItemPagination;
    items: Entity[];
}

export type ListResponse<Entity> =
    | {
          error: Error;
          data: undefined;
      }
    | {
          error: undefined;
          data: PaginatedItems<Entity>;
      };

export type EntityResponse<Entity> =
    | {
          error: Error;
          data: undefined;
      }
    | {
          error: undefined;
          data: Entity;
      };
export default abstract class RestFulApi<Entity, CreatePayload, UpdatePayload> extends BaseClass {
    abstract uri: string;

    async list(params?: ListParams): Promise<ListResponse<Entity>> {
        try {
            const { data } = await this.sendAuthorizedRequest<PaginatedItems<Entity>>({
                method: 'get',
                url: this.uri,
                params,
            });

            return { data, error: undefined };
        } catch (e) {
            return { data: undefined, error: e as Error };
        }
    }

    async create({ payload }: CreateParams<CreatePayload>): Promise<EntityResponse<Entity>> {
        try {
            const { data } = await this.sendAuthorizedRequest<Entity>({
                method: 'post',
                url: this.uri,
                data: payload,
            });

            return { data, error: undefined };
        } catch (e) {
            return { data: undefined, error: e as Error };
        }
    }

    async update({ id, payload }: UpdateParams<UpdatePayload>): Promise<EntityResponse<Entity>> {
        try {
            const { data } = await this.sendAuthorizedRequest<Entity>({
                method: 'patch',
                url: `${this.uri}/${id}`,
                data: payload,
            });

            return { data, error: undefined };
        } catch (e) {
            return { data: undefined, error: e as Error };
        }
    }

    async delete({ id }: WithIdParams): Promise<EntityResponse<Entity>> {
        try {
            const { data } = await this.sendAuthorizedRequest<Entity>({
                method: 'delete',
                url: `${this.uri}/${id}`,
            });

            return { data, error: undefined };
        } catch (e) {
            return { data: undefined, error: e as Error };
        }
    }
}
