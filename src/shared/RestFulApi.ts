import { BaseClass } from './BaseClass';

interface BaseParams {
    jwt: string;
}

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

    async list({ jwt, ...params }: ListParams): Promise<ListResponse<Entity>> {
        try {
            const { data } = await this.http.get<PaginatedItems<Entity>>(this.uri, {
                params,
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });

            return { data, error: undefined };
        } catch (e) {
            return { data: undefined, error: e as Error };
        }
    }

    async create({ jwt, payload }: CreateParams<CreatePayload>): Promise<EntityResponse<Entity>> {
        try {
            const { data } = await this.http.post<Entity>(this.uri, payload, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });

            return { data, error: undefined };
        } catch (e) {
            return { data: undefined, error: e as Error };
        }
    }

    async update({ jwt, id, payload }: UpdateParams<UpdatePayload>): Promise<EntityResponse<Entity>> {
        try {
            const { data } = await this.http.patch<Entity>(`${this.uri}/${id}`, payload, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });

            return { data, error: undefined };
        } catch (e) {
            return { data: undefined, error: e as Error };
        }
    }

    async delete({ jwt, id }: WithIdParams): Promise<EntityResponse<Entity>> {
        try {
            const { data } = await this.http.delete<Entity>(`${this.uri}/${id}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });

            return { data, error: undefined };
        } catch (e) {
            return { data: undefined, error: e as Error };
        }
    }
}
