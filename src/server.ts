import  axios from "axios";

import { TokenInfo, Tokenomics, SocialSentiment, TokenReport } from './interface';
// Define the CryptoDataManager class

class CryptoDataManager {
     /**
     * Fetches token information from Birdseye API.
     * @param tokenName The name of the token to fetch information for.
     * @returns A promise that resolves to a TokenInfo object containing the token's name, price, and volume.
     */
    public async fetchFromBirdseye(tokenName: string): Promise<TokenInfo> {
        const response = await axios.get(`https://api.birdseye.com/${tokenName}`);
         // Uncomment to use a mocked response
        // const response = expectedResponse;
        return {
            name: response.data.name,
            price: response.data.price,
            volume: response.data.volume
        };
    }
    
    /**
     * Fetches token information from both Dexscreener and Birdseye APIs and combines the results.
     * @param tokenName The name of the token to fetch information for.
     * @returns A promise that resolves to a TokenInfo object with averaged price and volume from both sources.
     */
    public async fetchTokenInfo(tokenName: string): Promise<TokenInfo> {
        const [birdseyeData] = await Promise.all([
            this.fetchFromBirdseye(tokenName)
        ]);

        return {
            name: birdseyeData.name,
            price: birdseyeData.price,
            volume: birdseyeData.volume
        };
    }
    
    /**
     * Fetches tokenomics data from the CryptoRank API.
     * @param tokenName The name of the token to fetch tokenomics for.
     * @returns A promise that resolves to a Tokenomics object containing market cap, total supply, and circulating supply.
     */
    public async fetchTokenomics(tokenName: string): Promise<Tokenomics> {
        const response = await axios.get(`https://api.cryptorank.io/${tokenName}/tokenomics`);
        // Uncomment to use a mocked response
        // const response = fetchTokenomicsResponse;
            return {
            marketCap: response.data.marketCap,
            totalSupply: response.data.totalSupply,
            circulatingSupply: response.data.circulatingSupply
        };
    }
    
    /**
     * Fetches social sentiment data from the SocialSentiment API.
     * @param tokenName The name of the token to fetch social sentiment for.
     * @returns A promise that resolves to a SocialSentiment object containing tweet bodies and usernames.
     */
    public async fetchSocialSentiment(tokenName: string): Promise<SocialSentiment> {
        const response = await axios.get(`https://api.socialsentiment.com/${tokenName}`);
        // const response = fetchSocialSentimentResponse;
        return {
            tweetBodies: response.data.tweetBodies,
            usernames: response.data.usernames,
        };
    }
    /**
     * Generates a comprehensive report on the token by fetching its info, tokenomics, and social sentiment.
     * Uses GPT-3 to generate a detailed report based on the collected data.
     * @param tokenName The name of the token to generate a report for.
     * @returns A promise that resolves to a TokenReport object containing the fetched data and GPT-3 generated report.
     */
    public async generateReport(tokenName: string): Promise<TokenReport> {
        const [tokenInfo, tokenomics, socialSentiment] = await Promise.all([
            this.fetchTokenInfo(tokenName),
            this.fetchTokenomics(tokenName),
            this.fetchSocialSentiment(tokenName)
        ]);

        const reportContent = `Token Report for ${tokenInfo.name}:
        - Price: ${tokenInfo.price}
        - Volume: ${tokenInfo.volume}
        - Market Cap: ${tokenomics.marketCap}
        - Total Supply: ${tokenomics.totalSupply}
        - Circulating Supply: ${tokenomics.circulatingSupply}
        - Social Sentiment:
            - Tweets: ${socialSentiment.tweetBodies.join(', ')}
            - Usernames: ${socialSentiment.usernames.join(', ')}`;

        // Simulated call to GPT or another model to generate a report

        return {
            tokenInfo,
            tokenomics,
            socialSentiment,
            gptReport: reportContent
        };
    }
}

(async () => {
    const manager = new CryptoDataManager();
    const report = await manager.generateReport('bitcoin');
    console.log(report);
})();

export default CryptoDataManager;
