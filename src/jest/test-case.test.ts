import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import CryptoDataManager from '../server';
import { payloadConfig } from './jest.payload.config';
import { TokenInfo, Tokenomics, SocialSentiment } from '../interface';

describe('cryptoDataManager Functions', () => {
    let mock: MockAdapter;
    let cryptoDataManager: CryptoDataManager;

    beforeAll(() => {
        mock = new MockAdapter(axios);
    });

    beforeEach(() => {
        cryptoDataManager = new CryptoDataManager();
    });

    afterEach(() => {
        mock.reset();
    });

    describe('fetchFromBirdseye', () => {
        it('should return successfully token information', async () => {
            mock.onGet(`https://api.birdseye.com/${payloadConfig.tokenName}`).reply(200, payloadConfig.expectedResponse);
            const result: TokenInfo = await cryptoDataManager.fetchFromBirdseye(payloadConfig.tokenName);
            expect(result).toEqual(payloadConfig.expectedResponse);
        });
    });

    describe('fetchTokenInfo', () => {
        it('should return successfully token information', async () => {
            mock.onGet(`https://api.birdseye.com/${payloadConfig.tokenName}`).reply(200, payloadConfig.expectedResponse);
            const result: TokenInfo = await cryptoDataManager.fetchTokenInfo(payloadConfig.tokenName);
            expect(result).toEqual(payloadConfig.expectedResponse);
        });
    });

    describe('fetchTokenomics', () => {
        it('should return successfully tokenomics information', async () => {
            mock.onGet(`https://api.cryptorank.io/${payloadConfig.tokenName}/tokenomics`).reply(200, payloadConfig.fetchTokenomicsResponse);
            const result: Tokenomics = await cryptoDataManager.fetchTokenomics(payloadConfig.tokenName);
            expect(result).toEqual(payloadConfig.fetchTokenomicsResponse);
        });
    });

    describe('fetchSocialSentiment', () => {
        it('should return successfully social sentiment information', async () => {
            mock.onGet(`https://api.socialsentiment.com/${payloadConfig.tokenName}`).reply(200, payloadConfig.fetchSocialSentimentResponse);
            const result: SocialSentiment = await cryptoDataManager.fetchSocialSentiment(payloadConfig.tokenName);
            expect(result).toEqual(payloadConfig.fetchSocialSentimentResponse);
        });
    });
});
