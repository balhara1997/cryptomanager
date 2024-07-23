export interface TokenInfo {
    name: string;
    price: number;
    volume: number;
  }
  
  export interface Tokenomics {
    marketCap: number;
    totalSupply: number;
    circulatingSupply: number;
  }
  
  export interface SocialSentiment {
    tweetBodies: string[];
    usernames: string[];
  }
  
  export interface TokenReport {
    tokenInfo: TokenInfo;
    tokenomics: Tokenomics;
    socialSentiment: SocialSentiment;
    gptReport: string;
  }
  