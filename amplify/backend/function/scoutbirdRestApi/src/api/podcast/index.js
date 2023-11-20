const { default: axios } = require("axios");
const aws = require("aws-sdk");
const moment = require("moment")
const baseUrl = "https://listen-api.listennotes.com/api/v2/";

module.exports = async () => {
  let apiKey;
  
  if (process.env.MOCK === "true") {
    apiKey = process.env.API_KEY_LISTEN;
  } else {
    const {
      // Null to mock the return random data
      Parameters: [{ Value }],
    } = await new aws.SSM()
      .getParameters({
        Names: ["API_KEY_LISTEN"].map((secretName) => process.env[secretName]),
        WithDecryption: true,
      })
      .promise();
    apiKey = Value;
  }

  console.log("API: ", apiKey)

  const config = {
    headers: { 'X-ListenAPI-Key': apiKey, accept: 'application/json' }
  };

    
  return {
    search: async (ticker) => {
      const path = `${baseUrl}/search?q=${ticker}&sort_by_date=1&type=episode&offset=0&len_min=10&len_max=200&published_after=1662782400000&language=English&safe_mode=0`
      const {
        status,data
      } =  await axios.get(path, config);
      return data
    },
    searchCustom: async (ticker, keywords) => {
      const path = `${baseUrl}/search?q=${ticker} ${keywords}&sort_by_date=1&type=episode&offset=0&len_min=10&len_max=200&published_after=1662782400000&language=English&safe_mode=0`
      const {
        status,data
      } =  await axios.get(path, config);
      return data
    },
    searchDate: async (ticker, date_min, date_max) => {
      const published_before = moment(date_max, "MM/DD/YYYY").valueOf()
      const published_after = moment(date_min, "MM/DD/YYYY").valueOf()
      console.log("date min: ", published_after)
      console.log("date max: ", published_before)
      const path = `${baseUrl}/search?q=${ticker}&published_before=${published_before}&published_after=${published_after}&sort_by_date=1&type=episode&offset=0&len_min=10&len_max=200&published_after=1662782400000&language=English&safe_mode=0`
      const {
        status,data
      } =  await axios.get(path, config);
      return data
    },
    searchCustomDate: async (ticker, keywords, date_min, date_max) => {
      const published_before = moment(date_max, "MM/DD/YYYY").valueOf()
      const published_after = moment(date_min, "MM/DD/YYYY").valueOf()
      console.log("date min: ", published_after)
      console.log("date max: ", published_before)
      const path = `${baseUrl}/search?q=${ticker}${keywords}&published_before=${published_before}&published_after=${published_after}&sort_by_date=1&type=episode&offset=0&len_min=10&len_max=200&published_after=1662782400000&language=English&safe_mode=0`
      const {
        status,data
      } =  await axios.get(path, config);
      return data
    }
  };
}