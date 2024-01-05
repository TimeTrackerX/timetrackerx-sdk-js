import RestFulApi, { EntityResponse, WithIdParams } from '../shared/RestFulApi';
import { ClientEntity } from '../shared/entities';
import { CreateClientPayload, PatchClientPayload } from '../shared/payloads';

export class ClientApi extends RestFulApi<ClientEntity, CreateClientPayload, PatchClientPayload> {
    uri = '/api/clients';

    async clock({ id }: WithIdParams): Promise<EntityResponse<ClientEntity>> {
        try {
            const { data } = await this.sendAuthorizedRequest<ClientEntity>({
                method: 'get',
                url: `${this.uri}/${id}/clock`,
            });

            return { data, error: undefined };
        } catch (e) {
            return { data: undefined, error: e as Error };
        }
    }
}
