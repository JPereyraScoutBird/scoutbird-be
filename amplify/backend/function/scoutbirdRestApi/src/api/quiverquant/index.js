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
    // lobbying: async (ticker, date_from = undefined, date_to = undefined) => {
    //   if (date_from && date_to)                                    {
    //     const date_from_transform = moment(date_from, "MM/DD/YYYY").format("YYYYMMDD")
    //     const date_to_transform = moment(date_to, "MM/DD/YYYY").format("YYYYMMDD")
    //     config['params'] = {}
    //     config['params']['date_from'] = date_from_transform
    //     config['params']['date_to'] = date_to_transform
    //   }
    //   const path = `${baseUrl}/beta/live/lobbying`
    //   const {
    //     status,data
    //   } =  await axios.get(path, config);
    //   console.log("Data: ", data)
    //   console.log("status: ", status)
    //   return data
    // },
    patents: async (ticker, date_from = undefined, date_to = undefined) => {
        if (date_from && date_to)                                    {
          const date_from_transform = moment(date_from, "MM/DD/YYYY").format("YYYYMMDD")
          const date_to_transform = moment(date_to, "MM/DD/YYYY").format("YYYYMMDD")
          config['params'] = {}
          config['params']['date_from'] = date_from_transform
          config['params']['date_to'] = date_to_transform
        }
        const path = `${baseUrl}/beta/historical/allpatents/${ticker}`
        console.log("config: ", config)
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
    twitter: async (ticker) => {
      const path = `${baseUrl}/beta/historical/twitter/${ticker}`
      const {
        status,data
      } =  await axios.get(path, config);
      console.log("Data: ", data)
      console.log("status: ", status)
      return data
  },
  };
}