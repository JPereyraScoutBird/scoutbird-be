"use strict";

const aws = require("aws-sdk");
const { default: axios } = require("axios");
const dayjs = require("dayjs");

const baseUrl =
  "https://gnip-api.twitter.com/search/fullarchive/accounts/TheMotleyFool/prod.json";

module.exports = async () => {
  let apiKey;

  // Mock
  if (process.env.MOCK === "true") {
    apiKey = process.env.API_KEY_TWITTER;
  } else {
    const {
      // Null to mock the return random data
      Parameters: [{ Value }],
    } = await new aws.SSM()
      .getParameters({
        Names: ["API_KEY_TWITTER"].map((secretName) => process.env[secretName]),
        WithDecryption: true,
      })
      .promise();
    apiKey = Value;
  }

  return {
    search: async (ticker) => {
      const basicAuth = "Basic " + apiKey;
      const {
        data: { results },
      } = await axios.post(
        baseUrl,
        {
          query: `($${ticker}) - politics - pelosi - dc - law - race - racial - fuck - shit - asshole - bastard - bitch - bullshit - cock - cunt - dick - dyke - religion - christ - kike - jew - motherfucker - pussy - slut  - @trump - trump -politics -has:hashtags -has:hashtags profile_country:US -is:retweet -has:mentions`,
          maxResults: 20,
          fromDate: dayjs().subtract(4, "months").format("YYYYMMDDHHmm"),
          toDate: dayjs().format("YYYYMMDDHHmm"),
        },
        {
          headers: { Authorization: basicAuth },
        }
      );
      return results;
    },
  };
};