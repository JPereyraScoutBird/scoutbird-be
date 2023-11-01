const { default: axios } = require("axios");
const aws = require("aws-sdk");
const moment = require("moment")
const baseUrl = "https://api.quiverquant.com";

module.exports = async () => {
  let apiKey;
  
  if (process.env.MOCK === "true") {
    apiKey = process.env.API_KEY_QUIVERQUANT;
  } else {
    const {
      // Null to mock the return random data
      Parameters: [{ Value }],
    } = await new aws.SSM()
      .getParameters({
        Names: ["API_KEY_QUIVERQUANT"].map((secretName) => process.env[secretName]),
        WithDecryption: true,
      })
      .promise();
    apiKey = Value;
  }

  console.log("API: ", apiKey)

  const config = {
    headers: { Authorization: `Bearer ${apiKey}` }
  };

    
  return {
    
    govContract: async (ticker) => {
      const path = `${baseUrl}/beta/historical/govcontractsall/${ticker}`
      const {
        status,data
      } =  await axios.get(path, config);
      console.log("Data: ", data)
      console.log("status: ", status)
      return data
    },
    lobbying: async (ticker) => {
        const path = `${baseUrl}/beta/historical/lobbying/${ticker}`
        const {
          status,data
        } =  await axios.get(path, config);
        console.log("Data: ", data)
        console.log("status: ", status)
        return data
    },
    patents: async (ticker) => {
        const path = `${baseUrl}/beta/historical/allpatents/${ticker}`
        const {
          status,data
        } =  await axios.get(path, config);
        console.log("Data: ", data)
        console.log("status: ", status)
        return data
    },
    wikipedia: async (ticker) => {
        const path = `${baseUrl}/beta/historical/wikipedia/${ticker}`
        const {
          status,data
        } =  await axios.get(path, config);
        console.log("Data: ", data)
        console.log("status: ", status)
        return data
    },
  };
}