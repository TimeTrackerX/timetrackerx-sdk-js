import axios, { AxiosInstance } from 'axios';
import chai from 'chai';
import dirtyChai from 'dirty-chai';
import nock from 'nock';

import { HttpBuilder } from '../../src/classes/HttpBuilder';

const expect = chai.expect;

chai.use(dirtyChai);
axios.defaults.adapter = 'http';

const isAxiosInstance = (instance: AxiosInstance): boolean => {
    if (instance.get === undefined) return false;
    if (instance.post === undefined) return false;
    if (instance.patch === undefined) return false;
    if (instance.delete === undefined) return false;
    return instance.defaults !== undefined;
};

describe('HttpBuilder', () => {
    const baseUrl = 'https://123.example456.org';

    describe('->build()', () => {
        it('creates an Axios instance with given configs', () => {
            const http = HttpBuilder.build({
                baseURL: baseUrl,
            });

            expect(isAxiosInstance(http)).to.be.true();
            expect(http.defaults.baseURL).to.equal(baseUrl);
        });
    });

    describe('->applyDefaults()', () => {
        it('returns an Axios', () => {
            const http = HttpBuilder.applyDefaults(axios.create());
            expect(isAxiosInstance(http)).to.be.true();
        });

        it('applies Date Transformations', async () => {
            const dateObj = new Date('1980-03-08T20:53:02.471Z');
            const dateStr = '1980-03-08T20:53:02.471Z';
            const rawResponseBody = {
                numVal: 1,
                dateObj,
                dateStr,
                nullVal: null,
                boolVal: true,
            };
            const jsonResponseBody = JSON.parse(JSON.stringify(rawResponseBody));
            const scope = nock(baseUrl).get('/').reply(200, jsonResponseBody);

            const http = HttpBuilder.applyDefaults(
                axios.create({
                    baseURL: baseUrl,
                }),
            );
            const { data } = await http.get('/');

            expect(isAxiosInstance(http)).to.be.true();
            expect(data).to.deep.equal({
                ...jsonResponseBody,
                dateObj,
                dateStr: new Date(dateStr),
            });
            scope.done();
        });
    });
});
