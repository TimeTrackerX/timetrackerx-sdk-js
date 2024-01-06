import axios from 'axios';
import chai from 'chai';
import dirtyChai from 'dirty-chai';
import nock from 'nock';

import { ApiClass } from '../classes/ApiClass';

const expect = chai.expect;

chai.use(dirtyChai);

describe('BaseClass', () => {
    axios.defaults.adapter = 'http';
    const baseUrl = 'https://123.example456.org';
    const apiClass = new ApiClass({ baseUrl });
    describe('->sendAuthorizedRequest()', () => {
        describe('when an JWT has expired', () => {
            it('fetches a new token', async () => {
                const expectedResponse = {
                    items: [2, 3, 4],
                    pagination: { page: 1 },
                };
                const scope = nock(baseUrl)
                    .get('/Items')
                    .reply(401, {
                        name: 'ExpiredTokenError',
                    })
                    .post('/auth/refresh-token')
                    .reply(200, {
                        token: 'newToken',
                        refreshToken: 'newRefreshToken',
                    })
                    .get('/Items')
                    .reply(200, expectedResponse);

                const result = await apiClass.list();

                expect(result.error).to.be.undefined();
                expect(result.data).to.deep.equal(expectedResponse);
                scope.done();
            });
        });
    });
});
