const { default: axios } = require("axios");
const aws = require("aws-sdk");
const moment = require("moment")
const baseUrl = "https://cloud.iexapis.com/";

module.exports = async () => {
  let apiKey;
  
  if (process.env.MOCK === "true") {
    apiKey = process.env.API_KEY_IEXCLOUD;
  } else {
    const {
      // Null to mock the return random data
      Parameters: [{ Value }],
    } = await new aws.SSM()
      .getParameters({
        Names: ["API_KEY_IEXCLOUD"].map((secretName) => process.env[secretName]),
        WithDecryption: true,
      })
      .promise();
    apiKey = Value;
  }

  console.log("API: ", apiKey)

    
  return {
    
    peers: async (ticker) => {
      const path = `${baseUrl}/stable/stock/${ticker}/peers?token=${apiKey}`
      const {
        status,data
      } =  await axios.get(path);
      console.log("Data: ", data)
      console.log("status: ", status)
      return data
    },
    
  };
}