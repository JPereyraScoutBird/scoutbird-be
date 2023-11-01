const { default: axios } = require("axios");
const aws = require("aws-sdk");
const moment = require("moment")
const baseUrl = "https://social-media-data-tt.p.rapidapi.com";
// https://social-media-data-tt.p.rapidapi.com/
module.exports = async () => {
  let apiKey;
  
  if (process.env.MOCK === "true") {
    apiKey = process.env.API_KEY_TIKTOK;
  } else { 
    const {
      // Null to mock the return random data
      Parameters: [{ Value }],
    } = await new aws.SSM()
      .getParameters({
        Names: ["API_KEY_TIKTOK"].map((secretName) => process.env[secretName]),
        WithDecryption: true,
      })
      .promise();
    apiKey = Value;
  }

  const config = {
    headers: { 'X-RapidAPI-Host': 'social-media-data-tt.p.rapidapi.com', 'X-RapidAPI-Key': apiKey, accept: 'application/json' }
  };

    
  return {
    search: async (ticker) => {
      const path = `${baseUrl}/live/hashtag/feed/v2?name=${ticker}&limit=20`
    //   search?q=${ticker}&sort_by_date=0&type=episode&offset=0&len_min=10&len_max=200&published_after=1662782400000&language=English&safe_mode=0`
      const {
        status,data
      } =  await axios.get(path, config);
      return data
    }
  };
}