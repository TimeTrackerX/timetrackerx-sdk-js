import axios, { AxiosInstance } from 'axios';
import chai from 'chai';
import dirtyChai from 'dirty-chai';
import sinon, { SinonStubbedInstance } from 'sinon';

import { ClientApi } from '../../src';
import { TimeLogEntity } from '../../src/shared/entities';

const expect = chai.expect;
chai.use(dirtyChai);

describe('ClientApi', () => {
    let apiClass: ClientApi;
    let httpStub: SinonStubbedInstance<AxiosInstance>;
    beforeEach(() => {
        httpStub = sinon.stub<AxiosInstance>(axios.create());
        apiClass = new ClientApi({ http: httpStub });
    });

    afterEach(() => {
        sinon.restore();
    });

    describe('ClientApi:clock', () => {
        it('should return a timeLog successfully', async () => {
            const expectedResponse: TimeLogEntity = {
                id: 1,
                user_id: 1,
                date_log_id: 1,
                created: new Date(),
                updated: new Date(),
                clock_in: '10:00:00',
                clock_out: '14:00:00',
                timeDiffMinutes: 240,
                deleted: null,
            };
            httpStub.post.resolves({ data: expectedResponse });
            const result = await apiClass.clock({ id: 1 });

            expect(result.error).to.be.undefined();
            expect(result.data).to.deep.equal(expectedResponse);
        });

        it('should handle clock error', async () => {
            const expectedError = new Error('Clock error');
            httpStub.post.rejects(expectedError);
            const result = await apiClass.clock({ id: 1 });

            expect(result.data).to.be.undefined();
            expect(result.error).to.equal(expectedError);
        });
    });
});
