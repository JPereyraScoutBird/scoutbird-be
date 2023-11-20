const { default: axios } = require("axios");
const aws = require("aws-sdk");
const moment = require("moment")
const baseUrl = "https://financialmodelingprep.com/api/v4";

module.exports = async () => {
  let apiKey;
  
  if (process.env.MOCK === "true") {
    apiKey = process.env.API_KEY_FMP;
  } else {
    const {
      // Null to mock the return random data
      Parameters: [{ Value }],
    } = await new aws.SSM()
      .getParameters({
        Names: ["API_KEY_FMP"].map((secretName) => process.env[secretName]),
        WithDecryption: true,
      })
      .promise();
    apiKey = Value;
  }

    
  return {
    
    analystRating: async (ticker) => {
      const path = `${baseUrl}/price-target?symbol=${ticker}&apikey=${apiKey}`
      const {
        status,data
      } =  await axios.get(path);
      return data
    },
    insiderTrading: async (ticker) => {
      const {
        status, data
      } = await axios.get(`${baseUrl}/insider-trading?transactionType=P-Purchase,S-Sale&symbol=${ticker}&page=0&apikey=${apiKey}`)
      return data
    },
    institutionalSymbolOwner: async (ticker) => {
      const {
        status, data
      } = await axios.get(`${baseUrl}/institutional-ownership/symbol-ownership?symbol=${ticker}&includeCurrentQuarter=false&apikey=${apiKey}`);
      return data
    },
    institutionalSymbolOwnerPercent: async (ticker) => {
      console.log(moment().format("yyyy-MM-DD"))
      const {
        status, data
      } = await axios.get(`${baseUrl}/institutional-ownership/institutional-holders/symbol-ownership-percent?date=2023-06-30&symbol=${ticker}&page=0&apikey=${apiKey}`);
      console.log(status)
      console.log(data)
      return data
    },
    esgEnvSocialGovData: async (ticker) => {
      const {
        status, data
      } = await axios.get(`${baseUrl}/esg-environmental-social-governance-data?symbol=${ticker}&apikey=${apiKey}`);
      console.log(status)
      console.log(data)
      return data
    },
    senateDisclosure: async (ticker) => {
      const {
        status, data
      } = await axios.get(`${baseUrl}/senate-disclosure?symbol=${ticker}&apikey=${apiKey}`);
      console.log(status)
      console.log(data)
      return data
    },
    companyOutlook: async (ticker) => {
      const {
        status, data
      } = await axios.get(`${baseUrl}/company-outlook?symbol=${ticker}&apikey=${apiKey}`);
      console.log(status)
      console.log(data)
      return data
    },
    stockNews: async (ticker) => {
      const {
        status, data
      } = await axios.get(`https://financialmodelingprep.com/api/v3/stock_news?tickers=${ticker}&limit=1500&apikey=${apiKey}`);
      console.log(status)
      console.log(data)
      return data
    },
  };
}