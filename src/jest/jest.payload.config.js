"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.payloadConfig = void 0;
exports.payloadConfig = {
    expectedResponse: {
        name: "sdf",
        price: 2,
        volume: 1,
    },
    fetchTokenomicsResponse: {
        marketCap: 324,
        totalSupply: 2,
        circulatingSupply: 1,
    },
    fetchSocialSentimentResponse: {
        tweetBodies: ["dummy1"],
        usernames: ["jest user"],
    },
    fetchSocialSentimentErrorResponse: {
        tweetBodies: "dummy1",
        usernames: ["jest user"],
    },
    tokenName: "bitcoin"
};
