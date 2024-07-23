export const payloadConfig = {
    expectedResponse: {
        name: "sdf",
        price: 2,
        volume: 1,
    },
    fetchTokenomicsResponse : {
        marketCap: 324,
        totalSupply: 2,
        circulatingSupply: 1,
    },
    fetchSocialSentimentResponse : {
        tweetBodies: ["dummy1"],
        usernames: ["jest user"],
    },
    fetchSocialSentimentErrorResponse : {
        tweetBodies: "dummy1",
        usernames: ["jest user"],
    },
    tokenName:"bitcoin"
}