import axios, { AxiosInstance } from 'axios';
import chai from 'chai';
import dirtyChai from 'dirty-chai';
import sinon, { SinonStubbedInstance } from 'sinon';

import { ApiClass, BaseApiItem } from '../classes/ApiClass';

const expect = chai.expect;
chai.use(dirtyChai);

type StubbedAxiosInstance = SinonStubbedInstance<AxiosInstance>;

describe('RestFulApi', () => {
    const id = 4;
    let apiClass: ApiClass;
    let httpStub: StubbedAxiosInstance;
    const payload: BaseApiItem = {
        name: 'John Doe',
    };
    beforeEach(() => {
        httpStub = sinon.stub<AxiosInstance>(axios.create());
        apiClass = new ApiClass({ http: httpStub });
    });

    afterEach(() => {
        sinon.restore();
    });

    describe('->list()', () => {
        it('should list items successfully', async () => {
            const expectedResponse = {
                items: [2, 3, 4],
                pagination: { page: 1 },
            };
            httpStub.request
                .withArgs({
                    method: 'get',
                    url: 'Items',
                    params: undefined,
                    headers: { Authorization: 'Bearer undefined' },
                })
                .resolves({ data: expectedResponse });
            const result = await apiClass.list();

            expect(result.error).to.be.undefined();
            expect(result.data).to.deep.equal(expectedResponse);
        });

        it('should handle list error', async () => {
            const expectedError = new Error('List error');
            httpStub.request
                .withArgs({
                    method: 'get',
                    url: 'Items',
                    params: undefined,
                    headers: { Authorization: 'Bearer undefined' },
                })
                .rejects(expectedError);
            const result = await apiClass.list();

            expect(result.data).to.be.undefined();
            expect(result.error).to.equal(expectedError);
        });
    });

    describe('->create()', () => {
        it('should create items successfully', async () => {
            httpStub.request
                .withArgs({
                    method: 'post',
                    url: 'Items',
                    data: payload,
                    headers: { Authorization: 'Bearer undefined' },
                })
                .resolves({ data: payload });
            const result = await apiClass.create({ payload });

            expect(result.error).to.be.undefined();
            expect(result.data).to.deep.equal(payload);
        });

        it('should handle create error', async () => {
            const expectedError = new Error('Create error');
            httpStub.request
                .withArgs({
                    method: 'post',
                    url: 'Items',
                    data: payload,
                    headers: { Authorization: 'Bearer undefined' },
                })
                .rejects(expectedError);
            const result = await apiClass.create({ payload });

            expect(result.data).to.be.undefined();
            expect(result.error).to.equal(expectedError);
        });
    });

    describe('->update()', () => {
        it('should update items successfully', async () => {
            httpStub.request
                .withArgs({
                    method: 'patch',
                    url: `Items/${id}`,
                    data: payload,
                    headers: { Authorization: 'Bearer undefined' },
                })
                .resolves({ data: payload });
            const result = await apiClass.update({ id, payload });

            expect(result.error).to.be.undefined();
            expect(result.data).to.deep.equal(payload);
        });

        it('should handle update error', async () => {
            const expectedError = new Error('Update error');
            httpStub.request
                .withArgs({
                    method: 'patch',
                    url: `Items/${id}`,
                    data: payload,
                    headers: { Authorization: 'Bearer undefined' },
                })
                .rejects(expectedError);
            const result = await apiClass.update({ id, payload });

            expect(result.data).to.be.undefined();
            expect(result.error).to.equal(expectedError);
        });
    });

    describe('->delete()', () => {
        it('should delete items successfully', async () => {
            httpStub.request
                .withArgs({
                    method: 'delete',
                    url: `Items/${id}`,
                    headers: { Authorization: 'Bearer undefined' },
                })
                .resolves({ data: payload });
            const result = await apiClass.delete({ id });

            expect(result.error).to.be.undefined();
            expect(result.data).to.deep.equal(payload);
        });

        it('should handle delete error', async () => {
            const expectedError = new Error('Delete error');
            httpStub.request
                .withArgs({
                    method: 'delete',
                    url: `Items/${id}`,
                    headers: { Authorization: 'Bearer undefined' },
                })
                .rejects(expectedError);
            const result = await apiClass.delete({ id: 4 });

            expect(result.data).to.be.undefined();
            expect(result.error).to.equal(expectedError);
        });
    });
});
